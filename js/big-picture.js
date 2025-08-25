import { EscKey } from './utils.js';
/*
Задача

Каждый объект с описанием фотографии содержит массив с комментариями. Данные из этого массива мы вывели в соответствующую область окна полноразмерного просмотра. Все бы хорошо, но для популярных фотографий комментариев может быть много. Если вывести их разом, то пользователю будет неудобно взаимодействовать с окном просмотра. Улучшить пользовательский интерфейс поможет кнопка «Загрузить ещё».

    Покажите блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, убрав у них класс hidden.

    В модуле, который отвечает за отрисовку окна с полноразмерным изображением, доработайте код по выводу списка комментариев таким образом, чтобы список показывался не полностью, а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё». Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.

    Обратите внимание, хотя кнопка называется «Загрузить ещё», никакой загрузки с сервера не происходит. Просто показываются следующие 5 комментариев из списка.
*/

const fullSizePhoto = document.querySelector('.big-picture');//Большое всплывающее окно
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentsList = fullSizePhoto.querySelector('.social__comments'); // список комметариев
const commentItem = commentsList.querySelector('.social__comment'); // конкретно комментарий в списке

const socialCommentShownCount = fullSizePhoto.querySelector('.social__comment-shown-count'); // сколько показано комментов в данный момент
const socialCommentTotalCount = fullSizePhoto.querySelector('.social__comment-total-count'); // сколько всего комментов в карточке
const socialCommentCount = fullSizePhoto.querySelector('.social__comment-count');
const commentsLoader = fullSizePhoto.querySelector('.comments-loader');

let comments = []; // переменная для комментариев в этом модуле

/**
 * функция закрытия картинок
 * добавляем класс .hidden обычным фото
 * убираем класс overflow-hidden
 *
 */

const closeBigPic = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
};

/**
 * Функция закрытия большой картинки при нажатии Esc
 * @param {Event} evt - событие нажатие кнопки Esc
 */
function onDocumentKeydown(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
}

/**
 * Функция закрытия закрытия модального окна
 */
function onCloseButtonClick() {
  closeBigPic();
}

/*
        Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

        <li class="social__comment">
          <img
            class="social__picture"
            src="{{аватар}}"
            alt="{{имя комментатора}}"
            width="35" height="35">
          <p class="social__text">{{текст комментария}}</p>
        </li>
*/

/**
 * Функция создания одного комментария
 * @param {object}
 * @returns {object}
*/
const createComment = ({ avatar, name, message }) => {
  const comment = commentItem.cloneNode(true);
  const avatarPicture = comment.querySelector('.social__picture');
  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};


/**
 * Функция создания-отрисовки массива-списка комментариев
 *
 */
const renderComments = () => {

  const commentsFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  for (let i = 0; i < comments.length; i++) {
    const comment = createComment(comments[i]);
    commentsFragment.append(comment);
  }

  commentsList.append(commentsFragment);

  socialCommentShownCount.textContent = comments.length;
  socialCommentTotalCount.textContent = comments.length;

};

/**Функция по отрисовки карточки при открытии в модалке
 *
 * @param {string} url - ссылка на фотографию
 * @param {string} description - описание фотографии
 * @param {int} likes - количество лайков
  */

const renderPictureInformation = ({url, likes, description}) => {
  fullSizePhoto.querySelector('.big-picture__img img').src = url;
  fullSizePhoto.querySelector('.big-picture__img img').alt = description;
  fullSizePhoto.querySelector('.likes-count').textContent = likes;
  fullSizePhoto.querySelector('.social__caption').textContent = description;
};


/**
 * Отрисовка модального окошка. Работаем с классами. Добавляем и убираем.
 * @param {int} id - идентификатор фотографии
 * @param {Array} comments - массив комментариев делали в data.js
 */
const openBigPic = (data) => {
  commentsList.innerHTML = '';
  comments = data.comments;
  fullSizePhoto.classList.remove('hidden'); // убираем у большой фото класс hidden
  document.body.classList.add('modal-open'); // добавляем для body класс модалка открыта

  // socialCommentCount.classList.add('hidden'); // прячем данные  по количеству комментов
  // commentsLoader.classList.add('hidden'); // прячем кнопку загрузки комментов


  document.addEventListener('keydown', onDocumentKeydown); // ожидаем нажатия кнопки
  closeButton.addEventListener('click', onCloseButtonClick); // ожидаем клика по кнопке закрытия модалки

  renderPictureInformation(data); // рендер картинок перенести в отельную фнкцию
  renderComments(data.comments); // рендер комментариев перенести в отджельную функцию

  socialCommentCount.textContent = `${socialCommentShownCount.textContent} из ${socialCommentTotalCount.textContent} комментариев`;
};

/*
Задача
Подключите модуль в проект.
*/

export { openBigPic, closeBigPic };
