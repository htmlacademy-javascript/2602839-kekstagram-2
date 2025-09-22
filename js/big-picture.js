import { EscKey } from './utils.js';

// Константы
const COMMENTS_PER_PORTION = 5;

// DOM элементы
const fullSizePhoto = document.querySelector('.big-picture');
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel');
const commentsList = fullSizePhoto.querySelector('.social__comments');
const commentItem = commentsList.querySelector('.social__comment');

const socialCommentShownCount = fullSizePhoto.querySelector('.social__comment-shown-count');
const socialCommentTotalCount = fullSizePhoto.querySelector('.social__comment-total-count');
const socialCommentCount = fullSizePhoto.querySelector('.social__comment-count');
const commentsLoader = fullSizePhoto.querySelector('.comments-loader');

// Состояние приложения
let comments = [];
let commentsShown = 0;

/**Создает DOM-элемент комментария */
const createComment = ({ avatar, name, message }) => {
  const comment = commentItem.cloneNode(true);
  const avatarPicture = comment.querySelector('.social__picture');
  avatarPicture.src = avatar;
  avatarPicture.alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

/**Рендерит порцию комментариев */
const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  // Управление видимостью кнопки загрузки
  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  // Создание фрагмента с комментариями
  const commentsFragment = document.createDocumentFragment();

  // Обновление DOM
  for (let i = 0; i < commentsShown; i++) {
    const comment = createComment(comments[i]);
    commentsFragment.append(comment);
  }

  commentsList.innerHTML = '';
  commentsList.append(commentsFragment);

  // Обновление счетчиков - ИСПРАВЛЕНИЕ ЗДЕСЬ
  socialCommentShownCount.textContent = commentsShown;
  socialCommentTotalCount.textContent = comments.length;
};

/**Рендерит информацию о фотографии */
const renderPictureInformation = ({url, likes, description}) => {
  const imgElement = fullSizePhoto.querySelector('.big-picture__img img');
  imgElement.src = url;
  imgElement.alt = description;
  fullSizePhoto.querySelector('.likes-count').textContent = likes;
  fullSizePhoto.querySelector('.social__caption').textContent = description;
};

/**Обработчик клика по кнопке "Загрузить ещё" */
const onCommentsLoadClick = () => {
  renderComments();
};

/**Закрывает модальное окно */
const closeBigPic = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  commentsShown = 0;
  commentsLoader.removeEventListener('click', onCommentsLoadClick);
};

/**Обработчик нажатия клавиши Esc */
function onDocumentKeydown(evt) {
  if (EscKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
}

/**Обработчик клика по кнопке закрытия */
function onCloseButtonClick() {
  closeBigPic();
}

/**Открывает модальное окно */
const openBigPic = (data) => {
  comments = data.comments;

  // Настройка модального окна
  fullSizePhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');

  // Добавление обработчиков событий
  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', onCloseButtonClick);

  // Рендер контента
  renderPictureInformation(data);
  renderComments(); // Рендерим комментарии
  commentsLoader.addEventListener('click', onCommentsLoadClick);
};

export { openBigPic, closeBigPic };
