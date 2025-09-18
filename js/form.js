import { EscKey } from './utils.js';
import {pristine} from './form-validator.js';
import {changeOriginalEffect, onEffectListChange} from './form-slider.js';

/**Допустимые типы файлов для загрузки
 * @type {string[]}
 * @constant
 */
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

/**Шаг изменения масштаба изображения в процентах
 * @type {number}
 * @constant
 */
const SCALE_STEP = 25;

/**Минимальный допустимый масштаб изображения в процентах
 * @type {number}
 * @constant
 */
const SCALE_MIN = 25;

/**Максимальный допустимый масштаб изображения в процентах
 * @type {number}
 * @constant
 */
const SCALE_MAX = 100;

/**Модальное окно редактирования изображения
 * @type {HTMLElement}
 */
const overlay = document.querySelector('.img-upload__overlay');

/**Кнопка закрытия модального окна
 * @type {HTMLElement}
 */
const cancelButton = document.querySelector('.img-upload__cancel');

/**Поле ввода для выбора файла
 * @type {HTMLInputElement}
 */
const fileInput = document.querySelector('.img-upload__input');

/**Контейнер предпросмотра изображения
 * @type {HTMLElement}
 */
const scaleImage = document.querySelector('.img-upload__preview');

/**Элемент изображения для предпросмотра
 * @type {HTMLImageElement}
 */
const preview = scaleImage.querySelector('img');

/**Список элементов выбора эффектов для изображения
 * @type {HTMLElement}
 */
const effectsList = document.querySelector('.effects__list');

/**Коллекция элементов предпросмотра эффектов (маленькие превью)
 * @type {NodeList}
 */
const smallPreviews = document.querySelectorAll('.effects__preview');


/**Кнопка уменьшения масштаба изображения
 * @type {HTMLElement}
 */
const scaleSmaller = document.querySelector('.scale__control--smaller');

/**Кнопка увеличения масштаба изображения
 * @type {HTMLElement}
 */
const scaleBigger = document.querySelector('.scale__control--bigger');

/**Поле значения масштаба изображения
 * @type {HTMLInputElement}
 */
const scaleValue = document.querySelector('.scale__control--value');

/**Текущее числовое значение масштаба изображения
 * @type {number}
 */
let scaleNumber;

/**Извлекает числовое значение масштаба из строкового значения поля ввода
 * @param {HTMLInputElement} scaleString - Поле ввода значения масштаба
 * @returns {number} Числовое значение масштаба
 */
const getScaleNumber = (scaleString) => parseInt(scaleString.value, 10);

/**Обработчик клика по кнопке уменьшения масштаба
 * Уменьшает масштаб изображения на значение SCALE_STEP, если не достигнут минимум
 * @returns {void}
 */
const onMinButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber > SCALE_MIN) {
    scaleValue.value = `${scaleNumber - SCALE_STEP}%`;
    preview.style.transform = `scale(${(scaleNumber - SCALE_STEP) / 100})`;
  }
};

/**Обработчик клика по кнопке увеличения масштаба
 *
 * Увеличивает масштаб изображения на значение SCALE_STEP, если не достигнут максимум
 * @returns {void}
 */
const onMaxButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber < SCALE_MAX) {
    scaleValue.value = `${scaleNumber + SCALE_STEP}%`;
    preview.style.transform = `scale(${(scaleNumber + SCALE_STEP) / 100})`;
  }
};


/**Открывает модальное окно редактирования изображения
 *
 * Добавляет классы для отображения и блокировки прокрутки body
 *
 * Добавляет обработчик события нажатия клавиш
 * @returns {void}
 */
const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onDocumentKeydown);
  overlay.addEventListener('click', onOverlayClick); // Добавляем обработчик клика по overlay
  changeOriginalEffect();
  effectsList.addEventListener('change', onEffectListChange);
  scaleSmaller.addEventListener('click', onMinButtonClick);
  scaleBigger.addEventListener('click', onMaxButtonClick);
};

/**Закрывает модальное окно редактирования изображения
 *
 * Скрывает окно, разблокирует прокрутку body
 *
 * Удаляет обработчик события нажатия клавиш
 * @returns {void}
 */
const closeModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onDocumentKeydown);
  overlay.removeEventListener('click', onOverlayClick); // Удаляем обработчик клика по overlay
  pristine.reset();
  effectsList.removeEventListener('change', onEffectListChange);
  scaleSmaller.removeEventListener('click', onMinButtonClick);
  scaleBigger.removeEventListener('click', onMaxButtonClick);
  fileInput.value = '';
};

/**Обработчик события нажатия клавиши на документе
 * Закрывает модальное окно при нажатии клавиши Escape
 * @param {KeyboardEvent} evt - Объект события клавиатуры
 * @returns {void}
 */
function onDocumentKeydown(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}


/**Обработчик клика по overlay (фоновой области модального окна)
 * Закрывает модальное окно при клике вне области контента
 * @param {MouseEvent} evt - Объект события мыши
 * @returns {void}
 */
function onOverlayClick(evt) {
  if (evt.target === overlay) {
    closeModal();
  }
}

/**Обработчик клика по кнопке закрытия модального окна
 * @returns {void}
 */
cancelButton.addEventListener('click', () => {
  closeModal();
});


/**Обработчик изменения поля выбора файла (загрузка и отображение изображения)
 *
 * Проверяет тип файла и отображает preview если тип поддерживается
 * @returns {void}
*/
fileInput.addEventListener('change', () => {
  openModal();
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    preview.src = URL.createObjectURL(file);
    smallPreviews.forEach((smallPreview) => {
      smallPreview.style.backgroundImage = `  url('${preview.src}')`;
    });
  } else {
    closeModal();
  }
});


export {onDocumentKeydown, closeModal};
