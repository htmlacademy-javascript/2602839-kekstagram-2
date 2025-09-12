import { EscKey } from './utils.js';
import {pristine} from './form-validator.js';
import {changeOriginalEffect, onEffectListChange} from './form-slider.js';

/**
 * Допустимые типы файлов для загрузки
 * @type {string[]}
 * @constant
 */
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// КОНСТАНТЫ работы с размером
const SCALE_STEP = 25; // шаг размера %
const SCALE_MIN = 25; // размер минимальный % от начального
const SCALE_MAX = 100; // максимовальный размер в %

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
 *  Маленькое превью
 */
const smallPreviews = document.querySelectorAll('.effects__preview');


/**
 * Масштаб изображения
 */
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');

let scaleNumber; // объявляем переменную для размера

// Получаем число из строки для работы с размером
const getScaleNumber = (scaleString) => parseInt(scaleString.value, 10);

// Уменьшение изображения
const onMinButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber > SCALE_MIN) {
    scaleValue.value = `${scaleNumber - SCALE_STEP}%`;
    preview.style.transform = `scale(${(scaleNumber - SCALE_STEP) / 100})`;
  }
};

// Увеличение изображения
const onMaxButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber < SCALE_MAX) {
    scaleValue.value = `${scaleNumber + SCALE_STEP}%`;
    preview.style.transform = `scale(${(scaleNumber + SCALE_STEP) / 100})`;
  }
};


/**
 * Открывает модальное окно редактирования изображения
 * Добавляет классы для отображения и блокировки прокрутки body
 * Добавляет обработчик события нажатия клавиш
 * @returns {void}
 */
const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onDocumentKeydown);
  changeOriginalEffect();
  effecstList.addEventListener('change', onEffectListChange);
  scaleSmaller.addEventListener('click', onMinButtonClick);
  scaleBigger.addEventListener('click', onMaxButtonClick);
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
  scaleSmaller.addEventListener('click', onMinButtonClick);
  scaleBigger.addEventListener('click', onMaxButtonClick);
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
    smallPreviews.forEach((smallPreview) => {
      smallPreview.style.backgroundImage = `  url('${preview.src}')`;
    });
  }
});


export {onDocumentKeydown, closeModal};
