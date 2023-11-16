
const BASE_URL = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные',
  SEND_DATA: '',
};

//функция отправляющая запросы
const request = async (url, method = Method.GET, body = null) => {
  const response = await fetch(url, { method, body });
  if (!response.ok) {
    throw new Error(ErrorText.GET_DATA);
  }
  return response.json();
};

const getData = async () => request(BASE_URL + Route.GET_DATA);


const sendData = async (pictureData) =>
  request(
    BASE_URL + Route.SEND_DATA,
    Method.POST,
    pictureData,
  );

export { getData, sendData };
