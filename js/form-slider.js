/**
 * Контейнер слайдера уровня эффекта
 * @type {HTMLElement}
 */
const sliderContainer = document.querySelector('.img-upload__effect-level');

/**
 * Элемент слайдера для управления интенсивностью эффекта
 * @type {HTMLElement}
 */
const sliderElement = document.querySelector('.effect-level__slider');

/**
 * Элемент для отображения значения уровня эффекта
 * @type {HTMLElement}
 */
const effectLevelValue = document.querySelector('.effect-level__value');

/**
 * Контейнер предпросмотра изображения
 * @type {HTMLElement}
 */
const imagePreview = document.querySelector('.img-upload__preview');

/**
 * Элемент изображения для применения фильтров
 * @type {HTMLImageElement}
 */
const preview = imagePreview.querySelector('img');

/**
 * Инициализация слайдера noUiSlider с базовыми настройками
 * @type {noUiSlider}
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
 * Обновляет параметры слайдера
 * @param {Object} opts - Объект с параметрами слайдера
 * @param {number} opts.min - Минимальное значение слайдера
 * @param {number} opts.max - Максимальное значение слайдера
 * @param {number} opts.step - Шаг изменения значения
 * @param {number} opts.start - Начальное значение слайдера
 */
const changeSlider = (opts) => {
  const {min, max, step, start} = opts;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: start,
    format: {
      to: function (value) {
        // Форматируем значение с одним знаком после запятой
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  });
};

/**
 * Применяет эффект "Оригинал" - удаляет фильтры и скрывает слайдер
 */
const changeOriginalEffect = () => {
  preview.style.filter = '';
  sliderContainer.classList.add('hidden');
  effectLevelValue.value = ''; // Сбрасываем значение
};

/**
 * Объект с параметрами всех доступных эффектов
 * @type {Object}
 * @property {Object} PARAMETRS_EFFECTS - Параметры эффектов
 * @property {Object} PARAMETRS_EFFECTS.'effect-chrome' - Параметры эффекта "Хром"
 * @property {Object} PARAMETRS_EFFECTS.'effect-chrome'.opts - Настройки слайдера
 * @property {string} PARAMETRS_EFFECTS.'effect-chrome'.effectName - CSS-свойство фильтра
 * @property {string} PARAMETRS_EFFECTS.'effect-chrome'.unitMeasurement - Единица измерения
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
 * Форматирует значение слайдера в нужный формат
 * @param {number} value - Числовое значение
 * @param {number} step - Шаг слайдера
 * @returns {string} Отформатированное значение
 */
const formatSliderValue = (value, step) => {
  // Если шаг целочисленный (1), возвращаем целое число
  if (step === 1) {
    return Math.round(value).toString();
  }

  // Для дробных шагов округляем до одного знака после запятой
  const roundedValue = Math.round(value * 10) / 10;

  // Преобразуем в строку и убираем лишний ".0" в конце
  let formattedValue = roundedValue.toFixed(1);

  // Если значение целое (например, 1.0), убираем .0
  if (formattedValue.endsWith('.0')) {
    formattedValue = formattedValue.slice(0, -2);
  }

  return formattedValue;
};

/**
 * Обрабатывает изменение значения слайдера и применяет эффект к изображению
 * @param {string} effectName - Название CSS-фильтра
 * @param {string} unitMeasurement - Единица измерения для значения фильтра
 * @param {number} step - Шаг слайдера
 */
const changeValueEffect = (effectName, unitMeasurement, step) => {
  sliderElement.noUiSlider.off();
  sliderElement.noUiSlider.on('update', () => {
    const rawValue = sliderElement.noUiSlider.get();
    const numericValue = parseFloat(rawValue);

    // Форматируем значение согласно требованиям
    effectLevelValue.value = formatSliderValue(numericValue, step);

    // Для применения фильтра используем числовое значение
    preview.style.filter = `${effectName}(${numericValue}${unitMeasurement})`;
  });
};

/**
 * Обработчик изменения выбранного эффекта в списке
 * @param {Event} evt - Событие изменения элемента списка эффектов
 * @returns {void}
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
  changeValueEffect(effectName, unitMeasurement, opts.step); // Передаем step
};

export {changeOriginalEffect, onEffectListChange};
