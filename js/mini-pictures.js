// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
import { createPhotosArray } from './data.js';

const photoArray = createPhotosArray();
const picturesTemplate = document.querySelector('#picture').content;
const pictureLink = picturesTemplate.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

photoArray.forEach((photo) => {
  const newPhoto = pictureLink.cloneNode(true);
  const newPhotoImage = newPhoto.querySelector('.picture__img');
  newPhotoImage.src = photo.url;
  picturesContainer.append(newPhoto);
});

