/*Задача

Отобразить фотографии других пользователей.

    Заведите модуль, который будет отвечать за отрисовку миниатюр.

    На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:
        Адрес изображения url подставьте как атрибут src изображения.
        Описание изображения description подставьте в атрибут alt изображения.
        Количество лайков likes выведите в блок .picture__likes.
        Количество комментариев comments выведите в блок .picture__comments.

    Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

    Подключите модуль в проект.
*/

const pictureTemplate = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');


// 3.Как и чем заполнить данными для фотографии
/**
 * Функция для создания DOM-элемента миниатюры фотографии
 * @param {object} photo - объект с данными фотографии
 * @param {number} photo.id - идентификатор фотографии
 * @param {string} photo.url - URL изображения
 * @param {string} photo.description - описание фотографии
 * @param {number} photo.likes - количество лайков
 * @param {Array} photo.comments - массив комментариев
 * @returns {DocumentFragment} - клонированный шаблон с заполненными данными
 */
const createThumbnail = ({id, url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const picture = pictureElement.querySelector('.picture');
  const pictureImg = pictureElement.querySelector('.picture__img');

  picture.dataset.photoId = id; // Лучше использовать data-атрибут для ID
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

/**
 *Рендерит миниатюры фотографий в указанный контейнер
 *
 * @function
 * @param {Object[]} pictures - Массив объектов с данными фотографий
 * @param {number} pictures[].id - Уникальный идентификатор фотографии
 * @param {string} pictures[].url - URL изображения (относительный путь)
 * @param {string} pictures[].description - Описание фотографии (для атрибута alt)
 * @param {number} pictures[].likes - Количество лайков
 * @param {Object[]} pictures[].comments - Массив комментариев
 * @example
 * // Пример вызова
 * const photos = [
 *   {
 *     id: 1,
 *     url: 'photos/1.jpg',
 *     description: 'Красивый закат',
 *     likes: 42,
 *     comments: [
 *       {
 *         id: 101,
 *         avatar: 'img/avatar-3.svg',
 *         message: 'Отличное фото!',
 *         name: 'Анна'
 *       }
 *     ]
 *   }
 * ];
 * renderThumbnails(photos);
 *
 * @description
 * 1. Использует шаблон для id="picture" из файла index.html
 * 2. Создает DocumentFragment для вставки
 * 3. Для каждой фотографии создает DOM-элемент на основе шаблона #picture
 * 4. Отображает количество лайков и комментариев
 * 5. Добавляет data-атрибут с ID фотографии, но это не обязательно
 */
const renderThumbnails = (pictures) => {

  const fragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
