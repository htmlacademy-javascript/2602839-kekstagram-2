import { openBigPic } from '../js/big-picture.js';

/* Ищем в DOM элемент с id="picture" (шаблон <template>)
      получаем ссылку на элемент-шаблон
    .content:
        Обращается к специальному свойству элемента <template>
        Возвращает DocumentFragment с содержимым шаблона
        Это "виртуальный контейнер" с HTML-структурой внутри шаблона
    Результат:
        pictureTemplate теперь содержит "заготовку" для будущих миниатюр
        Это не DOM-элемент, а специальный объект, который можно клонировать
*/
const pictureTemplate = document.querySelector('#picture').content;

/*  Ищем в DOM первый элемент с классом pictures
    container становится точкой вставки для будущих миниатюр
*/
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
 *
 *   <!-- Шаблон изображения случайного пользователя -->
  <template id="picture">
    <a href="#" class="picture">
      <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография">
      <p class="picture__info">
        <span class="picture__comments"></span>
        <span class="picture__likes"></span>
      </p>
    </a>
  </template>
 */
const createThumbnail = ({id, url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true); // Полная копия DOM узла
  const picture = pictureElement.querySelector('.picture'); // Первый элемент из шаблона
  const pictureImg = pictureElement.querySelector('.picture__img');

  picture.dataset.photoId = id; // Лучше использовать data-атрибут для ID
  pictureImg.src = url; // URL изображения
  pictureImg.alt = description; // атрибут alt изображения
  pictureElement.querySelector('.picture__likes').textContent = likes; // количество лайков
  pictureElement.querySelector('.picture__comments').textContent = comments.length; // количество комментариев

  /*
  Задача

    Окно должно открываться при клике на миниатюру. Данные для окна (изображение, комментарии, лайки и так далее) берите из того же объекта, который использовался для отрисовки соответствующей миниатюры.

  */

  pictureImg.addEventListener('click', () => {
    openBigPic({url, likes, description, comments});
  });

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

  const fragment = document.createDocumentFragment(); //Создаёт "виртуальный контейнер" (DocumentFragment) в памяти. Временная коробка.

  pictures.forEach((photo) => { // Перебор фотографий по каждому элементу массива photo. Т.е. для каждой фотографии будем выполнять
    fragment.appendChild(createThumbnail(photo)); //Создание и добавление миниатюры.
    /*
      createThumbnail(photo) - создаёт DOM-элемент миниатюры на основе данных
      fragment.appendChild() - добавляет созданную миниатюру в "виртуальный контейнер". Т.е. кладём в коробку.
    */
  });

  container.appendChild(fragment); // container - существующий DOM-элемент (получен через querySelector ранее). Добавляет все собранные миниатюры из фрагмента в реальный DOM одной операцией. Т.е. всё содержимое коробки переместили в DOM
};

export { renderThumbnails };
