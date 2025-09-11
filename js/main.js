import { getAllPhotoUsers } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import './form-validator.js';

//генерируем миниатюры с данными юзеров
const photos = getAllPhotoUsers();
renderThumbnails(photos);
