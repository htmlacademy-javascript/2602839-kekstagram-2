/**Функция для создания случайного числа в диапозоне от а до b (включительно) */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**Функция для генерации случайного элемента массива */
const getRandomElements = (elements) => elements[getRandomInteger(0, elements.length - 1)];

/**Фуннкция обнаружения нажатия клавиши "Esc" */
const EscKey = (evt) => evt.key === 'Escape';

const ALERT_SHOW_TIME = 5000;

/** Показываем ошибку на главной странице */
const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.zIndex = '100';
  alert.style.top = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.background = 'red';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

/** Функция debounce для оптимизации частых вызовов */
const debounce = (callback, timeoutDelay = 600) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export { getRandomElements, getRandomInteger, EscKey, showAlert, debounce };
