import { EscKey } from './utils.js';
import { validateForm, getFormData, resetValidation, showValidationErrors } from './form-validator.js';
import { sendData } from './api.js';
import { closeModal, resetForm } from './form.js';

const ButtonClass = {
  ERROR: '.error__button',
  SUCCESS: '.success__button',
};

const MESSAGE_TIMEOUT = 5000;

const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const uploadButton = document.querySelector('.img-upload__submit');

let successTimer = null;
let errorTimer = null;

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

// ИЗМЕНЕНИЕ: Функция закрытия только сообщения (не формы)
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
  // Убираем только обработчики сообщения
  document.removeEventListener('keydown', onMessageKeydown);
  document.removeEventListener('click', onBodyClick);
};

// ИЗМЕНЕНИЕ: Отдельный обработчик Esc для сообщений
function onMessageKeydown(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation(); // Важно: предотвращаем всплытие
    closeMessage();
  }
}

function onBodyClick(evt) {
  if (evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  closeMessage();
}

const showMessage = (template, buttonSelector) => {
  const messageElement = template.content.cloneNode(true);
  document.body.append(messageElement);

  const button = document.querySelector(buttonSelector);
  if (button) {
    button.addEventListener('click', closeMessage);
  }

  // ИЗМЕНЕНИЕ: Используем отдельный обработчик для сообщений
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onBodyClick);
};

const showSuccessMessage = () => {
  showMessage(successTemplate, ButtonClass.SUCCESS);
  successTimer = setTimeout(closeMessage, MESSAGE_TIMEOUT);
};

const showErrorMessage = () => {
  showMessage(errorTemplate, ButtonClass.ERROR);
  errorTimer = setTimeout(closeMessage, MESSAGE_TIMEOUT);
};

const blockUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Отправляю...';
};

const unblockUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};

// ИЗМЕНЕНИЕ: Обработка успешной отправки
const sendDataSuccess = async (formData) => {
  try {
    blockUploadButton();
    await sendData(formData);
    closeModal(); // Закрываем форму при успехе
    resetForm();
    resetValidation();
    showSuccessMessage();
  } catch (error) {
    // ИЗМЕНЕНИЕ: При ошибке форма НЕ закрывается
    showErrorMessage();
  } finally {
    unblockUploadButton();
  }
};

const onFormSubmit = async (evt) => {
  evt.preventDefault();

  showValidationErrors();

  const isValid = validateForm();
  if (isValid) {
    const formData = getFormData();
    await sendDataSuccess(formData);
  }
};

const imageUploadForm = document.querySelector('.img-upload__form');
imageUploadForm.addEventListener('submit', onFormSubmit);

export { showSuccessMessage, showErrorMessage, closeMessage, MESSAGE_TIMEOUT };
