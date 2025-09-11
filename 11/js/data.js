import { getRandomElements, getRandomInteger } from './utils.js';


/**тексты
 * отсюда мы должны будем брать тексты комментария и использовать
 *
 * Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
 */
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

/**количество загруженных фотографий
 * устанавливаем количество загружаемых фотографий.
 * Количество по заданию
 *
 * создания массива из 25 сгенерированных объектов. Каждый объект массива — описание фотографии, опубликованной пользователем.
 *
 */
const NUMBER_OF_ALL_PHOTO = 25;

/**количество лайков
 * пределы выбраны по заданию
 *
 * likes, число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
*/
const NUMBER_OF_LIKES = {
  MIN: 15,
  MAX: 200,
};

/**количество комментариев
 * пределы выбраны по заданию
 *
 */
const NUMBER_OF_ALL_COMMENTS = {
  MIN: 0,
  MAX: 30,
};

/**Количество аватарок
 * пределы выбраны по заданию
 *
 * Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
*/
const NUMBER_OF_ALL_AVATAR = {
  MIN: 1,
  MAX: 6,
};

/**имя пользователя
 * отсюда берем для структуры
 *
 * Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле name.
 */
const USERS_NAME = [
  'Ромка',
  'Нюрка',
  'Ксюха',
  'Лёша',
  'Саша',
  'Шурка',
  'Инна',
  'Алиса',
  'Борис'
];

/**описание фотографий
 * отсуда берем описания фото
*
* description, строка — описание фотографии. Описание придумайте самостоятельно.
*/
const DESCRIPTIONS_PHOTO = [
  'Дождь',
  'Закат',
  'Море',
  'Шашлык',
  'Радость',
  'Животинка',
  'В пути',
  'Есть ли смысл?',
  'Смысла нет!'
];


/**Функция для генерации порядкого номера
 * @return {function(): number} Функция-генератор, при каждом вызове возвращает следующий целый номер, начиная с 0
 * @example
 * const generateId = getIdGenerator();
 * generateId(); // 1
 * generateId(); // 2
 */
const getIdGenerator = () => {
  let firstGenerateId = 0;
  return function () {
    firstGenerateId += 1;
    return firstGenerateId;
  };
};

// console.log(getIdGenerator());


/**Вызов функций для генерации порядкового номера
 * Надо вызвать функции для присвоения id
 * для Фото - номер фото
 * для URL - так как адрес будет отличаться только числом
 * для комментариев - номер комментария
*/

/**Генератор ID для фотографий
 * @type {function(): number}
 * @example
 * generatePhotoId(); // 1
 * generatePhotoId(); // 2
 */
const generatePhotoId = getIdGenerator();

/**Генератор URL для фотографий (генерирует числовую часть URL)
 * @type {function(): number}
 * @example
 * generatePhotoUrl(); // 1
 * generatePhotoUrl(); // 2
 */
const generatePhotoUrl = getIdGenerator();

/** Генератор ID для комментариев
 * @type {function(): number}
 * @example
 * generateCommentsId(); // 1
 * generateCommentsId(); // 2
 */
const generateCommentsId = getIdGenerator();

/** Функция для создания комментария к фото
  * @param {int} id - идентификатор комментария
  * @param {string} avatar - это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg
  * @param {string} message - сам комментарий
  * @param {string} name - имя пользователя оставившего комментарий
  *
  * @return {arrayComments[]} - возвращает массив комментариев
  *
  * @example
  * // Возвращает массив вида:
  * [{
  *   id: 135,
  *   avatar: 'img/avatar-6.svg',
  *   message: 'В целом всё неплохо. Но не всё.',
  *   name: 'Артём'
  * }]
  *
  * @description
      1. У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.
      2. Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.
      3. Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных
      4. Имя автора выбирается случайно из доступных имен

*/
const generateCommentsPhoto = () => {
  const arrayComments = [];
  for (let i = 0; i < getRandomInteger(NUMBER_OF_ALL_COMMENTS.MIN, NUMBER_OF_ALL_COMMENTS.MAX); i++) {
    arrayComments.push({
      id: generateCommentsId(),
      avatar: `img/avatar-${getRandomInteger(NUMBER_OF_ALL_AVATAR.MIN, NUMBER_OF_ALL_AVATAR.MAX)}.svg`,
      message: getRandomElements(MESSAGES),
      name: getRandomElements(USERS_NAME),
    });
  }
  return arrayComments;
};

// console.table(generateCommentsPhoto());


/** Функция для создания объекта с описанием фотографии
  * @param {int} id - идентификатор фотографии
  * @param {string} url - ссылка на фотографию
  * @param {string} description - описание фотографии
  * @param {int} likes - количество лайков
  * @param {Array} generateCommentsToPhoto() - массив комментариев
  *
  * @example
  * // Возвращает объект вида:
  * {
  *   id: 5,
  *   url: 'photos/5.jpg',
  *   description: 'Прекрасный закат на море',
  *   likes: 42,
  *   comments: [
  *     {
  *       id: 135,
  *       avatar: 'img/avatar-6.svg',
  *       message: 'В целом всё неплохо. Но не всё.',
  *       name: 'Артём'
  *     }
  *   ]
  * }
  *
  * @description
  * 1. ID фотографии генерируется последовательно (1-25)
  * 2. URL формируется по шаблону 'photos/{{id}}.jpg'
  * 3. Описание выбирается случайно из доступных вариантов
  * 4. Лайки - случайное число в заданном диапазоне
  * 5. Комментарии генерируются функцией generateCommentsPhoto()
*/
const getPhotoUsers = () => ({
  id: generatePhotoId(),
  url: `photos/${generatePhotoUrl()}.jpg`,
  description: getRandomElements(DESCRIPTIONS_PHOTO),
  likes: getRandomInteger(NUMBER_OF_LIKES.MIN, NUMBER_OF_LIKES.MAX),
  comments: generateCommentsPhoto(),
});

// console.table(getPhotoUsers());
// console.table(getPhotoUsers());
// console.table(getPhotoUsers());
// console.table(getPhotoUsers());
// console.table(getPhotoUsers());


/**Генерирует массив объектов с описаниями фотографий пользователей
 * @return {getAllPhotoUsers[]} Массив объектов-фотографий длиной NUMBER_OF_ALL_PHOTO
 * @example
 * // Возвращает массив вида:
 * [
 *   {
 *     id: 1,
 *     url: 'photos/1.jpg',
 *     description: 'Прекрасный пейзаж',
 *     likes: 42,
 *     comments: [...]
 *   },
 *   ...
 * ]
 *
 * @description
 * 1. Создает массив из NUMBER_OF_ALL_PHOTO элементов
 * 2. Каждый элемент генерируется функцией getPhotoUsers()
 * 3. Все фотографии имеют уникальные ID (1-25)
 * 4. Каждая фотография содержит:
 *    - Уникальный URL
 *    - Случайное описание
 *    - Случайное количество лайков
 *    - Массив комментариев (0-30)
*/
const getAllPhotoUsers = () => Array.from({ length: NUMBER_OF_ALL_PHOTO }, getPhotoUsers);

// console.table(getAllPhotoUsers());

//getAllPhotoUsers();

export {getAllPhotoUsers};
