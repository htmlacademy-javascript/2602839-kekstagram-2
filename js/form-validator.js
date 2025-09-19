import {onDocumentKeydown} from './form.js';

/**
 * КОНСТАНТЫ для валидации формы
 * @namespace
 */
/** @constant {number} Максимальное количество хэштегов */
const MAX_HASHTAG_COUNT = 5;
/** @constant {number} Максимальная длина описания в символах */
const MAX_DESCRIPTION_LENGTH = 140;
/** @constant {RegExp} Регулярное выражение для валидации хэштегов */
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

/**
 * Основные DOM-элементы формы
 * @namespace
 */
/** @constant {HTMLFormElement} Форма. Точка входа в форму загрузки изображения */
const imageUploadForm = document.querySelector('.img-upload__form');
/** @constant {HTMLElement} Контейнер текстовых полей формы */
const imageUploadText = document.querySelector('.img-upload__text');
/** @constant {HTMLInputElement} Поле ввода хэштегов */
const formHashtag = imageUploadText.querySelector('.text__hashtags');
/** @constant {HTMLTextAreaElement} Поле ввода описания */
const formDescription = imageUploadText.querySelector ('.text__description');


/**
 * Создаёт экземпляр Pristine для валидации формы
 * @type {Pristine}
 */
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

/**
 * Нормализует строку хэштегов: удаляет пробелы по краям и пустые элементы
 * @param {string} value - Строка хэштегов из input
 * @returns {string[]} Массив нормализованных хэштегов
 */
const normalizeString = (value) => {
  const noNormalizeArray = value.trim().split(' ');
  return noNormalizeArray.filter((tag) => tag.length > 0);
};

/**
 * Проверяет валидность формата хэштегов
 * @param {string} textHashtag - Строка с хэштегами из input
 * @returns {boolean} true если все хэштеги соответствуют формату, иначе false
 */
const isValidateTextHashtag = (textHashtag) => normalizeString(textHashtag).every((tag) => VALID_SYMBOLS.test(tag));

// Добавляем валидатор формата хэштегов
pristine.addValidator(
  formHashtag,
  isValidateTextHashtag,
  'Хэштег должен начинаться с #, состоять из букв и чисел и содержать 20 символов, включая #'
);

/**
 * Проверяет количество хэштегов
 * @param {string} textHashtag - Строка с хэштегами из input
 * @returns {boolean} true если количество хэштегов не превышает лимит, иначе false
 */
const isValidCountHashtag = (textHashtag) => normalizeString(textHashtag).length <= MAX_HASHTAG_COUNT;

// Добавляем валидатор количества хэштегов
pristine.addValidator(
  formHashtag,
  isValidCountHashtag,
  'Максимальное количество хэштегов - 5'
);

/**
 * Проверяет уникальность хэштегов (регистронезависимо)
 * @param {string} textHashtag - Строка с хэштегами из input
 * @returns {boolean} true если все хэштеги уникальны, иначе false
 */
const isUniqueHashtag = (textHashtag) => {
  const lowerCase = normalizeString(textHashtag).map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

// Добавляем валидатор уникальности хэштегов
pristine.addValidator(
  formHashtag,
  isUniqueHashtag,
  'Хэштеги должны быть уникальными'
);

/**
 * Проверяет длину описания
 * @param {string} textDescription - Текст описания из textarea
 * @returns {boolean} true если длина описания не превышает лимит, иначе false
 */
const checkDescriptionLength = (textDescription) => textDescription.length <= MAX_DESCRIPTION_LENGTH;

// Добавляем валидатор длины описания
pristine.addValidator(
  formDescription,
  checkDescriptionLength,
  'Длина должна быть меньше 140 символов'
);

/**
 * Отключает обработку клавиши Esc при фокусе на элементе (чтобы не закрыть форму при редактировании)
 * @param {HTMLElement} element - DOM-элемент, для которого отключается обработка Esc
 */
const cancelEsc = (item) => {
  item.addEventListener('focus', () => {
    window.removeEventListener('keydown', onDocumentKeydown);
  });
  item.addEventListener('blur', () => {
    window.addEventListener('keydown', onDocumentKeydown);
  });
};
cancelEsc(formHashtag);
cancelEsc(formDescription);

/**
 * Нормализует хэштеги перед отправкой
 * @returns {void}
 */
const normalizeHashtags = () => {
  formHashtag.value = formHashtag.value.trim().replaceAll(/\s+/g, ' ');
};

/**
 * Проверяет валидность формы
 * @returns {boolean} true если форма валидна, иначе false
 */
const validateForm = () => pristine.validate();

/**
 * Получает данные формы
 * @returns {FormData} Данные формы
 */
const getFormData = () => {
  normalizeHashtags();
  return new FormData(imageUploadForm);
};

/**
 * Сбрасывает валидацию формы
 * @returns {void}
 */
const resetValidation = () => {
  pristine.reset();
};

/**
 * Экспортируемые элементы формы и валидатор
 * @namespace
 */
export {
  imageUploadForm,
  pristine,
  validateForm,
  getFormData,
  resetValidation,
  normalizeHashtags
};
