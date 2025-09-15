//import { getAllPhotoUsers } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './form.js';
import { data, getData } from './api.js';

getData().then((data) => {
  console.log(data);
}).catch((error) => {
  console.log(error);
});
//генерируем миниатюры с данными юзеров
//const photos = getAllPhotoUsers();
renderThumbnails(data);
