// Показывает сообщения после отправки формы
import { EscKey } from './utils.js';
import { validateForm, getFormData, resetValidation } from './form-validator.js';
import { sendData } from './api.js';
import { closeModal, onDocumentKeydown } from './form.js';

// КОНСТАНТЫ
const ButtonClass = {
  ERROR: '.error__button',
  SUCCESS: '.success__button',
};

const MESSAGE_TIMEOUT = 5000;

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const uploadButton = document.querySelector('.img-upload__submit');

// Таймеры для автоматического скрытия
let successTimer = null;
let errorTimer = null;

// Переменная для хранения данных формы при ошибке
let formDataBackup = null;

// Определяем был ли клик за пределами блока с сообщением
function onBodyClick (evt) {
  if (evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  closeMessage();
}

// Функция закрытия сообщения формы по кнопке ESС
function onDocumentKeydownEsc(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

// Очистка таймеров
const clearMessageTimers = () => {
  if (successTimer) {
    clearTimeout(successTimer);
    successTimer = null;
  }
  if (errorTimer) {
    clearTimeout(errorTimer);
    errorTimer = null;
  }
};

// Закрытие окна сообщения
const closeMessage = () => {
  const successElement = document.querySelector('.success');
  const errorElement = document.querySelector('.error');

  if (successElement) {
    successElement.remove();
  }
  if (errorElement) {
    errorElement.remove();
  }

  clearMessageTimers();
  window.removeEventListener('keydown', onDocumentKeydownEsc);
  document.removeEventListener('click', onBodyClick);
  window.addEventListener('keydown', onDocumentKeydown);
};

// Восстановление данных формы после ошибки
const restoreFormData = () => {
  if (!formDataBackup) {
    return;
  }

  const { hashtags, description, effect, scale } = formDataBackup;

  // Восстанавливаем хэштеги и описание
  const hashtagsInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');

  if (hashtagsInput && hashtags) {
    hashtagsInput.value = hashtags;
  }

  if (descriptionInput && description) {
    descriptionInput.value = description;
  }

  // Восстанавливаем эффект (если нужно)
  if (effect) {
    const effectInput = document.querySelector(`#effect-${effect}`);
    if (effectInput) {
      effectInput.checked = true;
    }
  }

  // Восстанавливаем масштаб (если нужно)
  if (scale) {
    const scaleInput = document.querySelector('.scale__control--value');
    if (scaleInput) {
      scaleInput.value = scale;
    }
  }

  // Очищаем backup
  formDataBackup = null;
};

// Сохранение данных формы перед отправкой
const saveFormData = () => {
  const hashtagsInput = document.querySelector('.text__hashtags');
  const descriptionInput = document.querySelector('.text__description');
  const effectInput = document.querySelector('input[name="effect"]:checked');
  const scaleInput = document.querySelector('.scale__control--value');

  formDataBackup = {
    hashtags: hashtagsInput ? hashtagsInput.value : '',
    description: descriptionInput ? descriptionInput.value : '',
    effect: effectInput ? effectInput.value : 'none',
    scale: scaleInput ? scaleInput.value : '100%'
  };
};

// Показываем сообщение после отправки формы
const showMessage = (message, buttonMessage) => {
  document.body.append(message);
  message.querySelector(buttonMessage).addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydownEsc);
  document.addEventListener('click', onBodyClick);
};

const showSuccessMessage = () => {
  showMessage(successMessage, ButtonClass.SUCCESS);
  successTimer = setTimeout(closeMessage, MESSAGE_TIMEOUT);
};

const showErrorMessage = () => {
  showMessage(errorMessage, ButtonClass.ERROR);
  // Восстанавливаем данные формы при ошибке
  restoreFormData();
  errorTimer = setTimeout(closeMessage, MESSAGE_TIMEOUT);
};

// Блокировка кнопки отправки формы
const blockUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Отправляю...';
};

// Отмена блокировки кнопки отправки формы
const unblockUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};

// Отправка данных формы на сервер
const sendDataSuccess = async (formData) => {
  try {
    await sendData(formData);
    closeModal();
    resetValidation();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
};

// Обработчик отправки формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();

  // Проверяем валидность формы
  const isValid = validateForm();
  if (isValid) {
    // Сохраняем данные формы перед отправкой
    saveFormData();

    blockUploadButton();
    const formData = getFormData();
    await sendDataSuccess(formData);
    unblockUploadButton();
  }
};

// Подписываемся на событие отправки формы
const imageUploadForm = document.querySelector('.img-upload__form');
imageUploadForm.addEventListener('submit', onFormSubmit);

// Экспортируем функции для тестирования
export {
  showSuccessMessage,
  showErrorMessage,
  closeMessage,
  MESSAGE_TIMEOUT,
  saveFormData,
  restoreFormData
};
