// На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Описание изображения description подставьте в атрибут alt изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
import { createPhotosArray } from './data.js';

const photosArray = createPhotosArray();
const picturesTemplate = document.querySelector('#picture').content;
const pictureLink = picturesTemplate.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const picturesFragment = document.createDocumentFragment();

photosArray.forEach((photo) => {
  const newPhoto = pictureLink.cloneNode(true);
  const newPhotoImage = newPhoto.querySelector('.picture__img');
  const newPhotoLikes = newPhoto.querySelector('.picture__likes');
  const newPhotoComments = newPhoto.querySelector('.picture__comments');

  newPhotoImage.src = photo.url;
  newPhotoImage.alt = photo.description;
  newPhotoLikes.textContent = photo.likes;
  newPhotoComments.textContent = photo.comments.length;

  picturesFragment.append(newPhoto);
});

picturesContainer.append(picturesFragment);

