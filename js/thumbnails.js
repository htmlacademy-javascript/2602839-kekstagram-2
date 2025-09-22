const pictureTemplate = document.querySelector('#picture').content;
const container = document.querySelector('.pictures');

/**Функция для создания DOM-элемента миниатюры фотографии */
const createThumbnail = ({ id, url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const picture = pictureElement.querySelector('.picture');
  const pictureImg = pictureElement.querySelector('.picture__img');

  picture.dataset.photoId = id;
  pictureImg.src = url;
  pictureImg.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureImg.addEventListener('click', () => {
    openBigPic({ id, url, likes, description, comments });
  });

  return pictureElement;
};

/**Рендерит миниатюры фотографий в указанный контейнер */
const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
