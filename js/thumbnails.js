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

/*  #picture
    разметка в index.html
    смотри строчки с 200 по 209

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

/**Функция для отрисовки мини-фото
 * @param {Array} массив фотографий, каждая должная содержать все необходимые параметры
 * @returns {Element} возврат готового элемента для вставки в DOM
 */
const generateThumbnails = () => {

};

export { generateThumbnails };
