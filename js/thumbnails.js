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

import { getAllPhotoUsers } from './data.js';

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

/**Функция для отрисовки мини-фото
 * @param {Array} массив фотографий, каждая должная содержать все необходимые параметры
 * @returns {Element} возврат готового элемента для вставки в DOM
 */
const renderThumbnails = (pictures) => {

  const fragment = document.createDocumentFragment();

  pictures.forEach((photo) => {
    fragment.appendChild(createThumbnail(photo));
  });

  container.appendChild(fragment);
};

export { renderThumbnails };
