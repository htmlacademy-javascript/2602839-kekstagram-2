import { onDocumentKeydown } from './form.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadText = document.querySelector('.img-upload__text');
const formHashtag = imageUploadText.querySelector('.text__hashtags');
const formDescription = imageUploadText.querySelector('.text__description');

/** Нормализует строку хэштегов */
const normalizeString = (value) => {
  const noNormalizeArray = value.trim().split(' ');
  return noNormalizeArray.filter((tag) => tag.length > 0);
};

/** Проверяет валидность формата хэштегов */
const isValidateTextHashtag = (textHashtag) => {
  const tags = normalizeString(textHashtag);
  if (tags.length === 0) {
    return true;
  }
  return tags.every((tag) => VALID_SYMBOLS.test(tag));
};

/** Проверяет количество хэштегов */
const isValidCountHashtag = (textHashtag) => {
  const tags = normalizeString(textHashtag);
  return tags.length <= MAX_HASHTAG_COUNT;
};

/** Проверяет уникальность хэштегов */
const isUniqueHashtag = (textHashtag) => {
  const lowerCase = normalizeString(textHashtag).map((tag) => tag.toLowerCase());
  return lowerCase.length === new Set(lowerCase).size;
};

/** Проверяет длину описания */
const checkDescriptionLength = (textDescription) => textDescription.length <= MAX_DESCRIPTION_LENGTH;

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

// Добавление валидаторов
pristine.addValidator(
  formHashtag,
  isValidateTextHashtag,
  'Хэштег должен начинаться с #, состоять из букв и чисел и содержать до 20 символов'
);

pristine.addValidator(
  formHashtag,
  isValidCountHashtag,
  `Максимальное количество хэштегов - ${MAX_HASHTAG_COUNT}`
);

pristine.addValidator(
  formHashtag,
  isUniqueHashtag,
  'Хэштеги не должны повторяться'
);

pristine.addValidator(
  formDescription,
  checkDescriptionLength,
  `Длина комментария не должна превышать ${MAX_DESCRIPTION_LENGTH} символов`
);

/** Отключает обработку клавиши Esc при фокусе */
const cancelEsc = (item) => {
  const onFocus = () => {
    window.removeEventListener('keydown', onDocumentKeydown);
  };

  const onBlur = () => {
    window.addEventListener('keydown', onDocumentKeydown);
  };

  item.addEventListener('focus', onFocus);
  item.addEventListener('blur', onBlur);
};

cancelEsc(formHashtag);
cancelEsc(formDescription);

/** Нормализует хэштеги перед отправкой */
const normalizeHashtags = () => {
  formHashtag.value = formHashtag.value.trim().replaceAll(/\s+/g, ' ');
};

/** Проверяет валидность формы */
const validateForm = () => pristine.validate();

/** Получает данные формы */
const getFormData = () => {
  normalizeHashtags();
  return new FormData(imageUploadForm);
};

/** Сбрасывает валидацию формы */
const resetValidation = () => {
  pristine.reset();
};

/** Показывает ошибки валидации */
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
