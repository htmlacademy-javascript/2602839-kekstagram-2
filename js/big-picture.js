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

const fullSizePhoto = document.querySelector('.big-picture');
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentsList = fullSizePhoto.querySelector('.social__comments'); // список комметариев
const commentItem = commentsList.querySelector('.social__comment'); // конкретно комментарии в списке


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
 * Функция создания-отрисовки массива-списка комментариев
 * @param {Array} comments - передаем массив комментарием для создания.
 */
const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();
  comments.forEach(({avatar, name, message}) => {
    const comment = commentItem.cloneNode(true);
    const commentPicture = comment.querySelector('.social__picture');
    commentPicture.src = avatar;
    commentPicture.alt = name;
    comment.querySelector('.social__text').innerText = message;
    commentsList.append(comment);
  });
  commentsList.append(commentsListFragment);
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

/**
 * Отрисовка модального окошка. Работаем с классами. Добавляем и убираем.
 * @param {int} id - идентификатор фотографии
 * @param {string} url - ссылка на фотографию
 * @param {string} description - описание фотографии
 * @param {int} likes - количество лайков
 * @param {Array} comments - массив комментариев делали в data.js
 */
const openBigPic = ({url, likes, description, comments}) => {
  fullSizePhoto.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);

  fullSizePhoto.querySelector('.big-picture__img').src = url; // присваивание URL
  fullSizePhoto.querySelector('.likes-count').textContent = likes; // количество лайков
  fullSizePhoto.querySelector('.comments-count').textContent = comments.length; // массив комменатриев
  renderComments(comments);
  fullSizePhoto.querySelector('.social__caption').textContent = description; // описание description
};

/*
Задача
Подключите модуль в проект.
*/

export { openBigPic, closeBigPic };
