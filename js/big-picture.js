/*
Задача

Реализовать сценарий просмотра фотографий в полноразмерном режиме. В таком режиме пользователь получает несколько дополнительных возможностей: детально рассмотреть изображение, поставить «лайк», почитать комментарии, оставленные другими пользователями.

    Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.
*/

/*
Как связать модули миниатюр и полноразмерного режима?

Задача не имеет одного верного решения, поэтому будет правильным как использование третьего модуля для связки двух других, так и импорт модуля полноразмерных изображений в модуль миниатюр и дальнейшая работа с интерфейсом этого модуля, addEventListener и замыканиями. Последнее решение похоже на демонстрацию по учебному проекту. А первое — с третьим модулем — более сложное из-за отсутствия примера, но самостоятельное. В качестве третьего модуля можно выбрать точку входа, а можно завести отдельный модуль, например «Галерея». Решение за вами.
*/

import { EscKey } from './utils.js';

const fullSizePhoto = document.querySelector('.big-picture');//Большое всплывающее окно
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentsList = fullSizePhoto.querySelector('.social__comments'); // список комметариев
const commentItem = commentsList.querySelector('.social__comment'); // конкретно комментарий в списке

const socialCommentShownCount = fullSizePhoto.querySelector('.social__comment-shown-count'); // сколько показано комментов в данный момент
const socialCommentTotalCount = fullSizePhoto.querySelector('.social__comment-total-count'); // сколько всего комментов в карточке
const socialCommentCount = fullSizePhoto.querySelector('.social__comment-count');

let comments = []; // переменная для комментариев в этом модуле

/*
Задача
Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
*/

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


/*
Задача

После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

    Описание фотографии description вставьте строкой в блок .social__caption.

        Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

        Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

        Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

        Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.

        Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.

        После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.


*/


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
