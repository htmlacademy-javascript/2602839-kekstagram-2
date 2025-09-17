// Получение данных
import { showAlert } from './utils';
import { initFilters } from './filer-sorting';

const URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  POST: '',
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST: 'Не удалось отправить форму. Попробуйте еще раз',
};

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${URL}${route}`, {method, body});
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch {
    showAlert(errorText);
    throw new Error(errorText);
  }
};

const getData = () => load(Route.GET, ErrorText.GET);

const sendData = (body) => load(Route.POST, ErrorText.POST, Method.POST, body);

const data = await getData();
// Инициализируем фильтры после загрузки данных
initFilters(data);

export {getData, sendData, data};

