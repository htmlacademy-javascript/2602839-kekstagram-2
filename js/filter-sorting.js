import { debounce } from './utils.js';
import { renderThumbnails } from './thumbnails.js';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const RANDOM_PHOTOS_COUNT = 10;
const FILTER_DEBOUNCE_DELAY = 500;

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const filterButtons = filtersForm.querySelectorAll('.img-filters__button');
const container = document.querySelector('.pictures');

let currentFilter = Filter.DEFAULT;

/** Показывает блок фильтров */
const showFilters = () => {
  filtersContainer.classList.remove('img-filters--inactive');
};

/** Очищает миниатюры */
const clearThumbnails = () => {
  const pictures = container.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

/** Применяет фильтр "По умолчанию" */
const applyDefaultFilter = (photos) => photos;

/** Применяет фильтр "Случайные" */
const applyRandomFilter = (photos) => {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

/** Применяет фильтр "Обсуждаемые" */
const applyDiscussedFilter = (photos) => [...photos].sort((a, b) => b.comments.length - a.comments.length);

/** Применяет выбранный фильтр */
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

/** Обновляет активную кнопку */
const updateActiveButton = (activeFilterId) => {
  filterButtons.forEach((button) => {
    const isActive = button.id === activeFilterId;
    button.classList.toggle('img-filters__button--active', isActive);
  });
};

/** Рендерит отфильтрованные фотографии с debounce */
const renderFilteredPhotos = debounce((photos, filterType) => {
  clearThumbnails();
  const filteredPhotos = applyFilter(photos, filterType);
  renderThumbnails(filteredPhotos);
}, FILTER_DEBOUNCE_DELAY);

/** Обработчик изменения фильтра */
const onFilterChange = (photos, filterType) => {
  updateActiveButton(filterType);
  currentFilter = filterType;
  renderFilteredPhotos(photos, filterType);
};

/** Инициализирует фильтры */
const initFilters = (photos) => {
  showFilters();
  updateActiveButton(Filter.DEFAULT);

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (button.id !== currentFilter) {
        onFilterChange(photos, button.id);
      }
    });
  });
};

export { initFilters, showFilters };
