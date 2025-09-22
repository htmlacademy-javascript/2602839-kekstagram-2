const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview');
const preview = imagePreview.querySelector('img');

/** Инициализация слайдера noUiSlider */
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

/** Обновляет параметры слайдера */
const changeSlider = (opts) => {
  const { min, max, step, start } = opts;
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start,
  });
};

/** Применяет эффект "Оригинал" */
const changeOriginalEffect = () => {
  preview.style.filter = 'none';
  sliderContainer.classList.add('hidden');
  effectLevelValue.value = '';
};

/** Параметры эффектов */
const PARAMETRS_EFFECTS = {
  'effect-chrome': {
    opts: { min: 0, max: 1, step: 0.1, start: 1 },
    effectName: 'grayscale',
    unitMeasurement: '',
  },
  'effect-sepia': {
    opts: { min: 0, max: 1, step: 0.1, start: 1 },
    effectName: 'sepia',
    unitMeasurement: '',
  },
  'effect-marvin': {
    opts: { min: 0, max: 100, step: 1, start: 100 },
    effectName: 'invert',
    unitMeasurement: '%',
  },
  'effect-phobos': {
    opts: { min: 0, max: 3, step: 0.1, start: 3 },
    effectName: 'blur',
    unitMeasurement: 'px',
  },
  'effect-heat': {
    opts: { min: 1, max: 3, step: 0.1, start: 3 },
    effectName: 'brightness',
    unitMeasurement: '',
  }
};

/** Обработчик изменения эффекта */
const onEffectListChange = (evt) => {
  const effect = evt.target.id;
  if (effect === 'effect-none') {
    changeOriginalEffect();
    return;
  }

  sliderContainer.classList.remove('hidden');
  const { opts, effectName, unitMeasurement } = PARAMETRS_EFFECTS[effect];
  changeSlider(opts);

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    effectLevelValue.value = value;
    preview.style.filter = `${effectName}(${value}${unitMeasurement})`;
  });
};

export { changeOriginalEffect, onEffectListChange };
