import { EscKey } from './utils.js';
/*
Задача

Каждый объект с описанием фотографии содержит массив с комментариями. Данные из этого массива мы вывели в соответствующую область окна полноразмерного просмотра. Все бы хорошо, но для популярных фотографий комментариев может быть много. Если вывести их разом, то пользователю будет неудобно взаимодействовать с окном просмотра. Улучшить пользовательский интерфейс поможет кнопка «Загрузить ещё».

    Покажите блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, убрав у них класс hidden.

    В модуле, который отвечает за отрисовку окна с полноразмерным изображением, доработайте код по выводу списка комментариев таким образом, чтобы список показывался не полностью, а по 5 элементов, и следующие 5 элементов добавлялись бы по нажатию на кнопку «Загрузить ещё». Не забудьте реализовать обновление числа показанных комментариев в блоке .social__comment-count.

    Обратите внимание, хотя кнопка называется «Загрузить ещё», никакой загрузки с сервера не происходит. Просто показываются следующие 5 комментариев из списка.


*/


const COMMENTS_PER_PORTION = 5; // порция комментов по сколько будем выводить

const fullSizePhoto = document.querySelector('.big-picture');//Большое всплывающее окно
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel'); // кнопка закрытия
const commentsList = fullSizePhoto.querySelector('.social__comments'); // список комметариев
const commentItem = commentsList.querySelector('.social__comment'); // конкретно комментарий в списке

const socialCommentShownCount = fullSizePhoto.querySelector('.social__comment-shown-count'); // сколько показано комментов в данный момент
const socialCommentTotalCount = fullSizePhoto.querySelector('.social__comment-total-count'); // сколько всего комментов в карточке
const socialCommentCount = fullSizePhoto.querySelector('.social__comment-count'); // место показывания кол-ва коммментов на модалке
const commentsLoader = fullSizePhoto.querySelector('.comments-loader'); // кнопка "Загрузить ещё". Понадобиться для показывания порций комментов.


let comments = []; // переменная для комментариев в этом модуле
let commentsShown = 0; // счётчик комментов для модалки

/**
 * функция закрытия картинок
 * добавляем класс .hidden обычным фото
 * убираем класс overflow-hidden
 *
 */

const closeBigPic = () => {
  fullSizePhoto.classList.add('hidden'); // дабавляем открытой модалке класс скрытый чтобы она изчезла
  document.body.classList.remove('overflow-hidden'); // убираем класс чтобы можно было скроллить страницу
  document.body.classList.remove('modal-open'); // убираем у body класс что модалка открыта
  document.removeEventListener('keydown', onDocumentKeydown); // убираем отслеживание нажатия кнопки
  closeButton.removeEventListener('click', onCloseButtonClick); // убираем отслеживание клика на крестик закрытия
  commentsShown = 0; // обнуляем счётчик показываемый комментов для следующей фото
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

  // Надо что-то подумать с кнопкой, когда её показывать, а когда не надо показывать

  // показанные комменты количество
  commentsShown += COMMENTS_PER_PORTION;

  // проверяем сколько кол-во показанных больше или равно длине массива комментов
  if (commentsShown >= comments.length) { // если количество показаннх больше чем длина ммассива комментов, то например длина массива комментов 3, а порция 5
    commentsLoader.classList.add('hidden'); // прячем кнопку "Загрузить ещё"
    commentsShown = comments.length; // количесов показанных равно длине массива комментов.
  } else {
    commentsLoader.classList.remove('hidden'); // иначе убираем скрытие кнопки "Загрузить ещё"
  }

  const commentsFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';
  for (let i = 0; i < commentsShown; i++) { // теперь перебираем до длины кол-ва показанных
    const comment = createComment(comments[i]); // вызываем функцию создания комментов
    commentsFragment.append(comment); // дообавляем коммент в конец списка комментов
  }

  commentsList.append(commentsFragment); // добавляем единовременно весь список комментов

  // надо присваивать значения. Сколько мы показываем и сколько всего комментов.
  // как мы поймём что нужно выводить-показывать новые комменты взамен старых ?

  socialCommentShownCount.textContent = commentsShown; // сколько показываем
  socialCommentTotalCount.textContent = comments.length; // общая длина массива комментов для этой фото

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
  // commentsList.innerHTML = '';
  comments = data.comments;
  fullSizePhoto.classList.remove('hidden'); // убираем у большой фото класс hidden
  document.body.classList.add('modal-open'); // добавляем для body класс модалка открыта

  // socialCommentCount.classList.add('hidden'); // прячем данные  по количеству комментов
  // commentsLoader.classList.add('hidden'); // ПОКА прячем кнопку загрузки комментов


  document.addEventListener('keydown', onDocumentKeydown); // ожидаем нажатия кнопки
  closeButton.addEventListener('click', onCloseButtonClick); // ожидаем клика по кнопке закрытия модалки

  renderPictureInformation(data); // рендер картинок перенести в отельную фнкцию
  renderComments(data.comments); // рендер комментариев перенести в отджельную функцию

  socialCommentCount.textContent = `${socialCommentShownCount.textContent} из ${socialCommentTotalCount.textContent} комментариев`; // формирование вывода по кол-ву комментов
};

// не работает загрузка по кнопке "Загрузить ещё" - надо исправлять

export { openBigPic, closeBigPic };
