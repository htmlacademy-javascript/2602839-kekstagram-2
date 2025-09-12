import {onDocumentKeydown} from './form.js';

/**
 * КОНСТАНТЫ для валидации формы
 * @namespace
 */
/** Максимальное количество хэштегов */
const MAX_HASHTAG_COUNT = 5;
/** Максимальная длина описания в символах */
const MAX_DESCRIPTION_LENGTH = 140;
/** Регулярное выражение для валидации хэштегов */
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

/**
 * Основные DOM-элементы формы
 * @namespace
 */

const imageUploadForm = document.querySelector('.img-upload__form'); // Форма.Точка входа в Форму
const imageUploadText = document.querySelector('.img-upload__text');
const formHashtag = imageUploadText.querySelector('.text__hashtags');
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
 * Нормализует строку хэштегов: удаляет пробелы и пустые элементы
 * @param {string} value - Строка хэштегов
 * @returns {string[]} Массив нормализованных хэштегов
 */
const normalizeString = (value) => {
  const noNormalizeArray = value.trim().split(' ');
  return noNormalizeArray.filter((tag) => tag.length > 0);
};

/**
 * Проверяет валидность формата хэштегов
 * @param {string} textHashtag - Строка с хэштегами
 * @returns {boolean} true если все хэштеги соответствуют формату
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
 * @param {string} textHashtag - Строка с хэштегами
 * @returns {boolean} true если количество хэштегов не превышает лимит
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
 * @param {string} textHashtag - Строка с хэштегами
 * @returns {boolean} true если все хэштеги уникальны
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
 * @param {string} textDescription - Текст описания
 * @returns {boolean} true если длина описания не превышает лимит
 */
const checkDescriptionLength = (textDescription) => textDescription.length <= MAX_DESCRIPTION_LENGTH;

// Добавляем валидатор длины описания
pristine.addValidator(
  formDescription,
  checkDescriptionLength,
  'Длина должна быть меньше 140 символов'
);

/**
 * Отключает обработку клавиши Esc при фокусе на элементе
 * @param {HTMLElement} element - DOM-элемент, для которого отключается Esc
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
 * Проверка на выполнение проверки формы иначе не отправит
 * При этом удаляем лишние пробелы. Ну по идее должно.
 * @param {*} evt
 */
const onFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()){
    formHashtag.value = formHashtag.value.trim().replaceAll(/\s+/g, ' ');
    imageUploadForm.submit();
  }
};

imageUploadForm.addEventListener('submit', onFormSubmit);

/**
 * Экспортируемые элементы формы и валидатор
 * @namespace
 */
export {imageUploadForm, pristine};
