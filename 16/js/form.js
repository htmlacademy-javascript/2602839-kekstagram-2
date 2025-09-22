import { EscKey } from './utils.js';
import { resetValidation} from './form-validator.js';
import {changeOriginalEffect, onEffectListChange} from './form-slider.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const overlay = document.querySelector('.img-upload__overlay');
const cancelButton = document.querySelector('.img-upload__cancel');
const fileInput = document.querySelector('.img-upload__input');
const scaleImage = document.querySelector('.img-upload__preview');
const preview = scaleImage.querySelector('img');
const effectsList = document.querySelector('.effects__list');
const smallPreviews = document.querySelectorAll('.effects__preview');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

let scaleNumber;

// ИЗМЕНЕНИЕ: Проверяем, открыто ли сообщение об ошибке
const isErrorMessageOpen = () => !!document.querySelector('.error');

const getScaleNumber = (scaleString) => parseInt(scaleString.value, 10);

const onMinButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber > SCALE_MIN) {
    scaleValue.value = `${scaleNumber - SCALE_STEP}%`;
    preview.style.transform = `scale(${(scaleNumber - SCALE_STEP) / 100})`;
  }
};

const onMaxButtonClick = () => {
  scaleNumber = getScaleNumber(scaleValue);
  if(scaleNumber < SCALE_MAX) {
    scaleValue.value = `${scaleNumber + SCALE_STEP}%`;
    preview.style.transform = `scale(${(scaleNumber + SCALE_STEP) / 100})`;
  }
};

const resetForm = () => {
  scaleValue.value = '100%';
  preview.style.transform = 'scale(1)';
  changeOriginalEffect();
  const originalEffect = document.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }
  hashtagsInput.value = '';
  descriptionInput.value = '';
  fileInput.value = '';
  resetValidation();
  preview.src = 'img/upload-default-image.jpg';
  smallPreviews.forEach((smallPreview) => {
    smallPreview.style.backgroundImage = 'url("img/upload-default-image.jpg")';
  });
};

const openModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  window.addEventListener('keydown', onDocumentKeydown);
  overlay.addEventListener('click', onOverlayClick);
  changeOriginalEffect();
  effectsList.addEventListener('change', onEffectListChange);
  scaleSmaller.addEventListener('click', onMinButtonClick);
  scaleBigger.addEventListener('click', onMaxButtonClick);
};

const closeModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  window.removeEventListener('keydown', onDocumentKeydown);
  overlay.removeEventListener('click', onOverlayClick);
  effectsList.removeEventListener('change', onEffectListChange);
  scaleSmaller.removeEventListener('click', onMinButtonClick);
  scaleBigger.removeEventListener('click', onMaxButtonClick);
  resetForm();
};

// ИЗМЕНЕНИЕ: Улучшенный обработчик Esc
function onDocumentKeydown(evt) {
  if (EscKey(evt)) {
    // Если открыто сообщение об ошибке - не закрываем форму
    if (isErrorMessageOpen()) {
      return; // Позволяем сообщению об ошибке обработать Esc
    }

    evt.preventDefault();
    closeModal();
  }
}

function onOverlayClick(evt) {
  if (evt.target === overlay) {
    closeModal();
  }
}

cancelButton.addEventListener('click', () => {
  closeModal();
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    preview.src = URL.createObjectURL(file);
    smallPreviews.forEach((smallPreview) => {
      smallPreview.style.backgroundImage = `url('${preview.src}')`;
    });
    openModal();
  }
});

export {onDocumentKeydown, closeModal, resetForm};
