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

const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const uploadButton = document.querySelector('.img-upload__submit');

// Определяем был ли клик за пределами блока с сообщением
function onBodyClick (evt) {
  if (evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  closeModal();
}

// Функция закрытия сообщения формы по кнопке ESС
function onDocumentKeydownEsc(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

// Закрытие окна сообщения
const closeMessage = () => {
  const messages = document.querySelector('.data-error') || document.querySelector('.success');
  messages.remove();
  window.removeEventListener('keydown', onDocumentKeydownEsc);
  document.removeEventListener('click', onBodyClick);
  // Если сообщение об ошибке закрыто, то возвращаем обработчик закрытия по ESC на саму форму
  window.addEventListener('keydown', onDocumentKeydown);
};

// Показываем сообщение после отправки формы
const showMessage = (message, buttonMessage) => {
  document.body.append(message);
  message.querySelector(buttonMessage).addEventListener('click', closeMessage);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onBodyClick);
};

const showSuccessMessage = () => showMessage(successMessage, ButtonClass.SUCCESS);
const showErrorMessage = () => showMessage(errorMessage, ButtonClass.ERROR);

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

// Отправка данных формы на сервер (+ скрытие формы и показ сообщения об успешной отправке)
const sendDataSuccess = async (formData) => {
  try {
    await sendData(formData);
    closeModal();
    resetValidation(); // Сбрасываем валидацию после успешной отправки
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
    blockUploadButton();
    const formData = getFormData(); // Получаем данные формы
    await sendDataSuccess(formData);
    unblockUploadButton();
  }
};

// Подписываемся на событие отправки формы
const imageUploadForm = document.querySelector('.img-upload__form');
imageUploadForm.addEventListener('submit', onFormSubmit);
