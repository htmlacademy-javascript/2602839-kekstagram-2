// Показывает сообщения после отправки формы
import { EscKey } from './utils.js';
import { pristine, imageUploadForm } from './form-validator.js';
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
// А onDocumentKeydown это функция закрытия самой формы по кнопке ESC
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
  // Разметку сообщения, которая находится в блоке #success внутри шаблона template, нужно разместить перед закрывающим тегом </body>
  document.body.append(message);
  // Сообщение должно исчезать после нажатия на кнопку .success__button
  message.querySelector(buttonMessage).addEventListener('click', closeMessage);
  // Сообщение должно исчезать по нажатию на клавишу Esc
  document.addEventListener('keydown', onDocumentKeydown);
  // Сообщение должно исчезать по клику на произвольную область экрана за пределами блока с сообщением
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
const sendDataSuccess = async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
};

// Отправка формы или показ ошибки (проверка валидации, показ соответствующего окна, сбор информации с формы в formData)
imageUploadForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    blockUploadButton();
    const formData = new FormData(evt.target);
    await sendDataSuccess(formData);
    unblockUploadButton();
  }
});
