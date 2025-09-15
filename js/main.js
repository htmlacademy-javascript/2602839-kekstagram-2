import { getAllPhotoUsers } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import { getData } from './api.js';

getData().then((data) => {
  console.log(data);
});
//генерируем миниатюры с данными юзеров
const photos = getAllPhotoUsers();
renderThumbnails(photos);
