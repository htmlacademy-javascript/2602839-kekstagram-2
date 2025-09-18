import { debounce } from './utils.js';
import { renderThumbnails } from './thumbnails.js';

// Константы для фильтрации
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const RANDOM_PHOTOS_COUNT = 10;

// DOM элементы для фильтров
const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');

const container = document.querySelector('.pictures');

// Переменная для хранения текущего фильтра
let currentFilter = Filter.DEFAULT;

// Функция для скрытия всех фотографий
const clearThumbnails = () => {
  const pictures = container.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

// Функция для применения фильтра "По умолчанию"
const applyDefaultFilter = (photos) => photos;

// Функция для применения фильтра "Случайные"
const applyRandomFilter = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

// Функция для применения фильтра "Обсуждаемые"
const applyDiscussedFilter = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

// Функция для применения выбранного фильтра
const applyFilter = (photos, filterType) => {
  switch (filterType) {
    case Filter.RANDOM:
      return applyRandomFilter(photos);
    case Filter.DISCUSSED:
      return applyDiscussedFilter(photos);
    default:
      return applyDefaultFilter(photos);
  }
};

// Функция для рендеринга отфильтрованных фотографий
const renderFilteredPhotos = debounce((photos, filterType) => {
  clearThumbnails();
  const filteredPhotos = applyFilter(photos, filterType);
  renderThumbnails(filteredPhotos);
}, 500);

// Функция для обработки изменения фильтра
const onFilterChange = (photos, filterType) => {
  // Обновляем активную кнопку
  filterButtons.forEach((button) => {
    button.classList.toggle('img-filters__button--active', button.id === filterType);
  });

  // Сохраняем текущий фильтр
  currentFilter = filterType;

  // Рендерим отфильтрованные фото
  renderFilteredPhotos(photos, filterType);
};

// Функция для инициализации фильтров
const initFilters = (photos) => {
  // // Показываем блок фильтров после загрузки данных
  // showFilters();

  // Добавляем обработчики на кнопки фильтров
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.id !== currentFilter) {
        onFilterChange(photos, button.id);
      }
    });
  });
};

// Функция для показа блока фильтров
const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};


export { initFilters, showFilters};
