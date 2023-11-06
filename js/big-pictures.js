import { isEscapeKey } from './util.js';
import { renderComments, initCommentList } from './comment.js';

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const hidePicture = function () {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      hidePicture();
    }
  });
};

const onCloseButtonClick = function () {
  hidePicture();
};

const renderPicture = function ({ url, description, likes }) {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showPicture = function (pictureData) {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      hidePicture();
    }
  });
  renderComments(pictureData.comments);
  initCommentList();

  renderPicture(pictureData);
};

closeButtonElement.addEventListener('click', onCloseButtonClick);

export { showPicture };
