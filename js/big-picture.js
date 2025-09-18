import { EscKey } from './utils.js';

// Константы
const COMMENTS_PER_PORTION = 5; // порция комментов по сколько будем выводить


// DOM элементы
const fullSizePhoto = document.querySelector('.big-picture');//Большое всплывающее окно
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentsList = fullSizePhoto.querySelector('.social__comments'); // список комметариев
const commentItem = commentsList.querySelector('.social__comment'); // конкретно комментарий в списке

const socialCommentShownCount = fullSizePhoto.querySelector('.social__comment-shown-count'); // сколько показано комментов в данный момент
const socialCommentTotalCount = fullSizePhoto.querySelector('.social__comment-total-count'); // сколько всего комментов в карточке
const socialCommentCount = fullSizePhoto.querySelector('.social__comment-count'); // место показывания кол-ва коммментов на модалке
const commentsLoader = fullSizePhoto.querySelector('.comments-loader'); // кнопка "Загрузить ещё". Понадобиться для показывания порций комментов.

// Состояние приложения
let comments = []; // переменная для комментариев в этом модуле
let commentsShown = 0; // счётчик комментов для модалки


/**Создает DOM-элемент комментария на основе данных
 * @param {Object} commentData - Данные комментария
 * @param {string} commentData.avatar - URL аватара пользователя
 * @param {string} commentData.name - Имя пользователя
 * @param {string} commentData.message - Текст комментария
 * @returns {HTMLElement} Элемент комментария
 *
 * @example
 * // Возвращает такой HTML:
 * // <li class="social__comment">
 * //   <img class="social__picture" src="avatar.jpg" alt="John Doe" width="35" height="35">
 * //   <p class="social__text">Отличная фотография!</p>
 * // </li>
 *
 * @example
 * createComment({
 *   avatar: 'avatar.jpg',
 *   name: 'John Doe',
 *   message: 'Отличная фотография!'
 * });
*/
const createComment = ({ avatar, name, message }) => {
  const comment = commentItem.cloneNode(true);
  const avatarPicture = comment.querySelector('.social__picture');
  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};


/**Рендерит порцию комментариев с учетом текущего состояния
 * Управляет видимостью кнопки "Загрузить ещё" и счетчиками
*/
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  // Управление видимостью кнопки загрузки
  if (commentsShown >= comments.length) { // если количество показаннх больше чем длина ммассива комментов, то например длина массива комментов 3, а порция 5
    commentsLoader.classList.add('hidden'); // прячем кнопку "Загрузить ещё"
    commentsShown = comments.length; // количество показанных равно длине массива комментов
  } else {
    commentsLoader.classList.remove('hidden'); // иначе убираем скрытие кнопки "Загрузить ещё"
  }

  // Создание фрагмента с комментариями
  const commentsFragment = document.createDocumentFragment();

  // Обновление DOM
  for (let i = 0; i < commentsShown; i++) { // теперь перебираем до длины кол-ва показанных
    const comment = createComment(comments[i]); // вызываем функцию создания коммента
    commentsFragment.append(comment); // дообавляем коммент в конец списка комментов
  }

  commentsList.innerHTML = ''; // удаляем все комментарии что были ранее выведены
  commentsList.append(commentsFragment); // добавляем единовременно весь список комментов

  // Обновление счетчиков
  socialCommentShownCount.textContent = commentsShown; // сколько показываем
  socialCommentTotalCount.textContent = comments.length; // общая длина массива комментов для этой фото

};

/**Рендерит информацию о фотографии в модальном окне
 * @param {Object} photoData - Данные фотографии
 * @param {string} photoData.url - URL изображения
 * @param {number} photoData.likes - Количество лайков
 * @param {string} photoData.description - Описание фотографии
  */

const renderPictureInformation = ({url, likes, description}) => {
  const imgElement = fullSizePhoto.querySelector('.big-picture__img img'); // облегчаем читаемость

  imgElement.src = url;
  imgElement.alt = description;
  fullSizePhoto.querySelector('.likes-count').textContent = likes;
  fullSizePhoto.querySelector('.social__caption').textContent = description;
};

/**
 * Обработчик клика по кнопке "Загрузить ещё"
 * Загружает следующую порцию комментариев и обновляет счетчик
 */

/**
 * Обновляет текстовое представление счетчика комментариев
 */
const updateCommentsCounter = () => {
  socialCommentCount.textContent =
    `${socialCommentShownCount.textContent} из ${socialCommentTotalCount.textContent} комментариев`;
};

/**Обработчик клика по кнопке "Загрузить ещё"
 * Загружает следующую порцию комментариев и обновляет счетчик
 */
const onCommentsLoadClick = () => {
  renderComments();
  updateCommentsCounter();
};


/**Закрывает модальное окно с полноразмерным изображением
 * Восстанавливает скролл страницы и удаляет обработчики событий
 */

const closeBigPic = () => {
  fullSizePhoto.classList.add('hidden'); // дабавляем открытой модалке класс скрытый чтобы она изчезла
  document.body.classList.remove('overflow-hidden'); // убираем класс чтобы можно было скроллить страницу
  document.body.classList.remove('modal-open'); // убираем у body класс что модалка открыта
  document.removeEventListener('keydown', onDocumentKeydown); // убираем отслеживание нажатия кнопки
  closeButton.removeEventListener('click', onCloseButtonClick); // убираем отслеживание клика на крестик закрытия
  commentsShown = 0; // обнуляем счётчик показываемый комментов для следующей фото
  commentsLoader.removeEventListener('click', onCommentsLoadClick);
};


/**Обработчик нажатия клавиши Esc для закрытия модального окна
 * @param {Event} evt - Событие клавиатуры
 */
function onDocumentKeydown(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
}


/**Обработчик клика по кнопке закрытия модального окна
 */
function onCloseButtonClick() {
  closeBigPic();
}

/**Открывает модальное окно с полноразмерным изображением и комментариями
 * @param {Object} data - Данные для отображения
 * @param {Array} data.comments - Массив комментариев
 */
const openBigPic = (data) => {
  comments = data.comments;

  // Настройка модального окна
  fullSizePhoto.classList.remove('hidden'); // убираем у большой фото класс hidden
  document.body.classList.add('modal-open'); // добавляем для body класс модалка открыта

  // Добавление обработчиков событий
  document.addEventListener('keydown', onDocumentKeydown); // ожидаем нажатия кнопки
  closeButton.addEventListener('click', onCloseButtonClick); // ожидаем клика по кнопке закрытия модалки

  // Рендер контента
  renderPictureInformation(data); // рендер картинок перенести в отельную фнкцию
  renderComments(data.comments); // рендер комментариев перенести в отдельную функцию
  updateCommentsCounter(); // формирование вывода по кол-ву комментов
  commentsLoader.addEventListener('click', onCommentsLoadClick);
};

export { openBigPic, closeBigPic };
