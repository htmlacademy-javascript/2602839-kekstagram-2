import {onDocumentKeydown} from './form.js';

/**
 * КОНСТАНТЫ для валидации формы
 */
const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

/**
 * Основные DOM-элементы формы
 */
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadText = document.querySelector('.img-upload__text');
const formHashtag = imageUploadText.querySelector('.text__hashtags');
const formDescription = imageUploadText.querySelector('.text__description');

/**
 * Создаёт экземпляр Pristine для валидации формы
 */
const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

/**
 * Нормализует строку хэштегов
 */
const normalizedString = (value) => {
  const noNormalizedArray = value.trim().split(' ');
  return noNormalizedArray.filter((tag) => tag.length > 0);
};

/**
 * Проверяет валидность формата хэштегов
 */
const isValidateTextHashtag = (textHashtag) => {
  const tags = normalizedString(textHashtag);
  if (tags.length === 0) {
    return true;
  } // Пустое поле - валидно
  return tags.every((tag) => VALID_SYMBOLS.test(tag));
};

// Валидатор формата хэштегов
pristine.addValidator(
  formHashtag,
  isValidateTextHashtag,
  'Хэштег должен начинаться с #, состоять из букв и чисел и содержать до 20 символов'
);

/**
 * Проверяет количество хэштегов
 */
const isValidCountHashtag = (textHashtag) => {
  const tags = normalizedString(textHashtag);
  return tags.length <= MAX_HASHTAG_COUNT;
};

// Валидатор количества хэштегов
pristine.addValidator(
  formHashtag,
  isValidCountHashtag,
  `Максимальное количество хэштегов - ${MAX_HASHTAG_COUNT}`
);

/**
 * Проверяет уникальность хэштегов
 */
const isUniqueHashtag = (textHashtag) => {
  const lowerCase = normalizedString(textHashtag).map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

// Валидатор уникальности хэштегов
pristine.addValidator(
  formHashtag,
  isUniqueHashtag,
  'Хэштеги не должны повторяться'
);

/**
 * Проверяет длину описания
 */
const checkDescriptionLength = (textDescription) => textDescription.length <= MAX_DESCRIPTION_LENGTH;

// Валидатор длины описания
pristine.addValidator(
  formDescription,
  checkDescriptionLength,
  `Длина комментария не должна превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

/**
 * Отключает обработку клавиши Esc при фокусе
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
 */
const normalizeHashtags = () => {
  formHashtag.value = formHashtag.value.trim().replaceAll(/\s+/g, ' ');
};

/**
 * Проверяет валидность формы
 */
const validateForm = () => pristine.validate();

/**
 * Получает данные формы
 */
const getFormData = () => {
  normalizeHashtags();
  return new FormData(imageUploadForm);
};

/**
 * Сбрасывает валидацию формы
 */
const resetValidation = () => {
  pristine.reset();
};

/**
 * Показывает ошибки валидации
 */
const showValidationErrors = () => {
  pristine.validate();
};

export {
  imageUploadForm,
  pristine,
  validateForm,
  getFormData,
  resetValidation,
  normalizeHashtags,
  showValidationErrors
};
