import { renderThumbnails } from './thumbnails.js';
import './form.js';
import { getData } from './api.js';
import './form-message.js';
import { initFilters, showFilters } from './filter-sorting.js';
import { showAlert } from './utils.js';

// Ожидаем загрузку данных перед рендерингом
getData()
  .then((data) => {
    renderThumbnails(data);
    initFilters(data);
    showFilters(); // Показываем фильтры после загрузки данных
  })
  .catch((error) => {
    // Показываем сообщение об ошибке
    const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
    const dataErrorElement = dataErrorTemplate.cloneNode(true);
    document.body.appendChild(dataErrorElement);

    // Убираем сообщение через 5 секунд
    setTimeout(() => {
      dataErrorElement.remove();
    }, 5000);
    //console.error('Ошибка загрузки данных:', error);
    showAlert(`Ошибка загрузки данных: ${ error}`);
  });
