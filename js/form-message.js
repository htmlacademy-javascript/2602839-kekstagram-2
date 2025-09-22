import { EscKey } from './utils.js';
import { validateForm, getFormData, resetValidation, showValidationErrors } from './form-validator.js';
import { sendData } from './api.js';
import { closeModal, onDocumentKeydown, resetForm } from './form.js';

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

/** Обработчик клика по телу документа */
const onBodyClick = (evt) => {
  if (evt.target.closest('.error__inner') || evt.target.closest('.success__inner')) {
    return;
  }
  closeMessage();
};

/** Обработчик нажатия клавиши Esc для сообщений */
const onDocumentKeydownEsc = (evt) => {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

/** Очищает таймеры сообщений */
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

/** Закрывает сообщение */
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

/** Показывает сообщение */
const showMessage = (template, buttonSelector) => {
  const messageElement = template.content.cloneNode(true);
  document.body.append(messageElement);

  const button = document.querySelector(buttonSelector);
  if (button) {
    button.addEventListener('click', closeMessage);
  }

  document.addEventListener('keydown', onDocumentKeydownEsc);
  document.addEventListener('click', onBodyClick);
};

/** Показывает сообщение об успехе */
const showSuccessMessage = () => {
  showMessage(successTemplate, ButtonClass.SUCCESS);
  successTimer = setTimeout(closeMessage, MESSAGE_TIMEOUT);
};

/** Показывает сообщение об ошибке */
const showErrorMessage = () => {
  showMessage(errorTemplate, ButtonClass.ERROR);
  errorTimer = setTimeout(closeMessage, MESSAGE_TIMEOUT);
};

/** Блокирует кнопку отправки */
const blockUploadButton = () => {
  uploadButton.disabled = true;
  uploadButton.textContent = 'Отправляю...';
};

/** Разблокирует кнопку отправки */
const unblockUploadButton = () => {
  uploadButton.disabled = false;
  uploadButton.textContent = 'Опубликовать';
};

/** Обработчик успешной отправки данных */
const sendDataSuccess = async (formData) => {
  try {
    blockUploadButton();
    await sendData(formData);
    closeModal();
    resetForm();
    resetValidation();
    showSuccessMessage();
  } catch (error) {
    showErrorMessage();
  } finally {
    unblockUploadButton();
  }
};

/** Обработчик отправки формы */
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
