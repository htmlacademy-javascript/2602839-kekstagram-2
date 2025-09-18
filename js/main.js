//import { getAllPhotoUsers } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import { data } from './api.js';
import './form-message.js';
import { showAlert } from './utils.js';

try {
  renderThumbnails(data);
} catch {
  showAlert('Ошибка загрузки изображения');
}
