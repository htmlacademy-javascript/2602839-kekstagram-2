/**Функция для создания случайного числа в диапозоне от а до b (включительно)
 * @param {number} a - нижняя граница диапозона (целое число)
 * @param {number} b - верхняя граница диапозона (целое число)
 * @return {number} result - возвращает случайное число в диапозоне от а до b (включительно)
 * @example
 * getRandomInteger(1, 5); // Возможные значения: 1, 2, 3, 4, 5
 */
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// console.log(getRandomInteger(1,6));
// console.log(getRandomInteger(15,200));
// console.log(getRandomInteger(0,30));
// console.log(getRandomInteger());


/**Функция для генерации случайного элемента массива
 * @param {Array} element - сам входной массив
 * @return {*} result - элемент массива element
 */
const getRandomElements = (elements) => elements[getRandomInteger(0, elements.length - 1)];


/*
Задача
Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
*/

/**Фуннкция обнаружения нажатия клавиши "Esc"
 * @param {key} evt - нажата клавиша
 * @returns {boolean} - ИСТИНА если клавиша "Esc"
*/
const EscKey = (evt) => evt.key === 'Escape';

const ALERT_SHOW_TIME = 5000;

// Показываем ошибку на главной странице
function showAlert (message) {
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
}

export {getRandomElements, getRandomInteger, EscKey, showAlert};
