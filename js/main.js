import { getAllPhotoUsers } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import { getData } from './api.js';

//генерируем миниатюры с данными юзеров
const photos = getAllPhotoUsers();
renderThumbnails(photos);
getData();
