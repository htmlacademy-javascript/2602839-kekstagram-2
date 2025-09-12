/**
 *Задача

* ? В этом задании мы продолжим реализацию сценария загрузки изображения и его редактирования на примере заглушки.

 * TODO  Напишите код, который позволит пользователю редактировать масштаб изображения. Кроме визуального применения эффекта необходимо записывать значение в поле формы с масштабом, доступное только для чтения, для дальнейшей отправки на сервер.

  * TODO  С помощью библиотеки noUiSlider (скрипт и стили находятся в директории /vendor/nouislider) реализуйте применение эффекта для изображения. Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для дальнейшей отправки на сервер.

  * !  Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния, т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера, но и при переключении фильтров.
 */

/**
 * Работаем с DOM
 */
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const imagePreview = document.querySelector('.img-upload__preview');
const preview = imagePreview.querySelector('img');

/**
 * Вызов слайдера
 */
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});


/**
 * Изменяем параметры слайдера
 * @param {*} opts
 */
const changeSlider = (opts) => {
  const {min, max, step, start} = opts;
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: start,
  });
};

/**
 * Для эффекта «Оригинал» CSS-стили filter удаляются, слайдер и его контейнер (элемент .img-upload__effect-level) скрываются.
 */
const changeOriginalEffect = () => {
  preview.style.filter = '';
  sliderContainer.classList.add('hidden');
};

/**
 * Объект с фильтрами
 */
const PARAMETRS_EFFECTS = {
  'effect-chrome': {
    opts: {
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    effectName: 'grayscale',
    unitMeasurement: '',
  },
  'effect-sepia': {
    opts: {
      min: 0,
      max: 1,
      step: 0.1,
      start: 1,
    },
    effectName: 'sepia',
    unitMeasurement: '',
  },
  'effect-marvin': {
    opts: {
      min: 0,
      max: 100,
      step: 1,
      start: 100,
    },
    effectName: 'invert',
    unitMeasurement: '%',
  },
  'effect-phobos': {
    opts: {
      min: 0,
      max: 3,
      step: 0.1,
      start: 3,
    },
    effectName: 'blur',
    unitMeasurement: 'px',
  },
  'effect-heat': {
    opts: {
      min: 1,
      max: 3,
      step: 0.1,
      start: 3,
    },
    effectName: 'brightness',
    unitMeasurement: '',
  }
};

/**
 * Изменяем интенсивность применяемого фильтра в зависимости от передвижения слайдера
 * @param {*} effectName
 * @param {*} unitMeasurement
 */
const changeValueEffect = (effectName, unitMeasurement) => {
  sliderElement.noUiSlider.off();
  sliderElement.noUiSlider.on('update', () => {
    effectLevelValue.value = sliderElement.noUiSlider.get();
    preview.style.filter = `${effectName}(${effectLevelValue.value}${unitMeasurement})`;
  });
};

/**
 * Определяем какой элемент выбрали и применяем необходимый тип фильтра + значение
 * @param {*} evt
 * @returns
 */
const onEffectListChange = (evt) => {
  const effect = evt.target.id;
  if (effect === 'effect-none') {
    changeOriginalEffect();
    return;
  }
  sliderContainer.classList.remove('hidden');
  const opts = PARAMETRS_EFFECTS[effect].opts;
  const effectName = PARAMETRS_EFFECTS[effect].effectName;
  const unitMeasurement = PARAMETRS_EFFECTS[effect].unitMeasurement;
  changeSlider(opts);
  changeValueEffect(effectName, unitMeasurement);
};

export {changeOriginalEffect, onEffectListChange};
