import { EscKey } from './utils.js';
import {pristine} from './form-validator.js';
import {changeOriginalEffect, onEffectListChange} from './form-slider.js';

/**
 * Допустимые типы файлов для загрузки
 * @type {string[]}
 * @constant
 */
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Находим форму и необходимые элементы DOM

/**
 * Модальное окно редактирования изображения
 * @type {HTMLElement}
 */
const overlay = document.querySelector('.img-upload__overlay');

/**
 * Кнопка закрытия модального окна
 * @type {HTMLElement}
 */
const cancelButton = document.querySelector('.img-upload__cancel');

/**
 * Поле ввода для выбора файла
 * @type {HTMLInputElement}
 */
const fileInput = document.querySelector('.img-upload__input');

/**
 * Контейнер предпросмотра изображения
 * @type {HTMLElement}
 */
const scaleImage = document.querySelector('.img-upload__preview');

/**
 * Элемент изображения для предпросмотра
 * @type {HTMLImageElement}
 */
const preview = scaleImage.querySelector('img');

/**
 *  Список эффектов
 *
 */
const effecstList = document.querySelector('.effects__list');


/**
 * Открывает модальное окно редактирования изображения
 * Добавляет классы для отображения и блокировки прокрутки body
 * Добавляет обработчик события нажатия клавиш
 * @returns {void}
 */
const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  changeOriginalEffect();
  effecstList.addEventListener('change', onEffectListChange);
};

/**
 * Закрывает модальное окно редактирования изображения
 * Скрывает окно, разблокирует прокрутку body
 * Удаляет обработчик события нажатия клавиш
 * @returns {void}
 */
const closeModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onDocumentKeydown);
  pristine.reset();
  effecstList.removeEventListener('change', onEffectListChange);
};

/**
 * Обработчик нажатия клавиши Esc для закрытия модального окна
 * @param {KeyboardEvent} evt - Событие клавиатуры
 * @returns {void}
 */
function onDocumentKeydown(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

/**
 * Обработчик клика по кнопке закрытия модального окна
 * @returns {void}
 */
cancelButton.addEventListener('click', () => {
  closeModal();
});

/**
 * Обработчик клика по overlay (вне области модального окна)
 * Закрывает модальное окно при клике на затемненную область вокруг него
 * @param {MouseEvent} evt - Событие клика мыши
 * @returns {void}
 */
overlay.addEventListener('click', (evt) => {
  if (evt.target === overlay) {
    closeModal();
  }
});


/**
 * Обработчик изменения значения в поле выбора файла
 * Открывает модальное окно при выборе файла
 * @returns {void}
 */
fileInput.addEventListener('change', () => {
  openModal();
});

/**
 * Обработчик изменения значения в поле выбора файла
 * Загружает и отображает выбранное изображение если тип файла поддерживается
 * @returns {void}
 */
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

export {onDocumentKeydown, closeModal};
