import { getAllPhotoUsers } from './data.js';
import { renderThumbnails } from './thumbnails.js';

//генерируем миниатюры с данными юзеров
const photos = getAllPhotoUsers();
renderThumbnails(photos);
