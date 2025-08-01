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
 * @param {int} result - порядковый номер
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
const generatePhotoId = getIdGenerator();
const generatePhotoUrl = getIdGenerator();
const generateCommentsId = getIdGenerator();

/** Функция для создания комментария к фото
  * @param {int} id - идентификатор комментария
  * @param {string} avatar - это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg
  * @param {string} message - сам комментарий
  * @param {string} name - имя пользователя оставившего комментарий
  * @param {Array} return arrayComments[] - возвращает массив комментариев
  *
  * Пример описания объекта с комментарием:
  *     {
      id: 135,
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём',
      }

      У каждого комментария есть идентификатор — id — любое число. Идентификаторы не должны повторяться.

      Поле avatar — это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img.

      Для формирования текста комментария — message — вам необходимо взять одно или два случайных предложения из представленных ниже:
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
 * Структура каждого объекта должна быть следующей:

   - id, число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.

   - url, строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.

   - description, строка — описание фотографии. Описание придумайте самостоятельно.

   - comments, массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом. Пример описания объекта с комментарием:
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


/** Функция для создания массива объектов длиной NUMBER_OF_ALL_PHOTO с описанием фотографий
 *
 *
*/
const getAllPhotoUsers = () => Array.from({ length: NUMBER_OF_ALL_PHOTO }, getPhotoUsers);

// console.table(getAllPhotoUsers());

//getAllPhotoUsers();

export {getAllPhotoUsers};
