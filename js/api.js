import { showAlert } from './utils.js';

const URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  POST: '/',
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
    const response = await fetch(`${URL}${route}`, {
      method,
      body,
    });

    if (!response.ok) {
      throw new Error(`${errorText}. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    showAlert(`${errorText}. ${error.message}`);
    throw error;
  }
};

const getData = () => load(Route.GET, ErrorText.GET);

const sendData = (body) => load(Route.POST, ErrorText.POST, Method.POST, body);

export { getData, sendData };
