import { getAllPhotoUsers } from './data.js';
import { generateThumbnails } from './thumbnails.js';

//генерируем миниатюры с данными юзеров
generateThumbnails(getAllPhotoUsers());
