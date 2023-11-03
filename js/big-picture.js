import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const openModal = function () {
  const thumbnails = document.querySelectorAll('.picture');

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
    });
  });
};

const closeModal = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

closeButton.addEventListener('click', () => {
  closeModal();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
});


export { openModal, closeModal };


// import { isEscapeKey } from './util.js';

// const bigPicture = document.querySelector('.big-picture');
// const body = document.querySelector('body');
// const thumbnails = document.querySelectorAll('.picture');
// const closeButton = bigPicture.querySelector('.big-picture__cancel');

// const openModal = function () {
//   bigPicture.classList.remove('hidden');
//   body.classList.add('modal-open');
//   bigPicture.querySelector('.social__comment-count').classList.add('hidden');
//   bigPicture.querySelector('.comments-loader').classList.add('hidden');
// };

// const closeModal = function () {
//   bigPicture.classList.add('hidden');
//   body.classList.remove('modal-open');
// };

// thumbnails.forEach((thumbnail) => {
//   thumbnail.addEventListener('click', () => {
//     openModal();
//   });
// });

// closeButton.addEventListener('click', () => {
//   closeModal();
// });

// document.addEventListener('keydown', (evt) => {
//   if (isEscapeKey(evt)) {
//     evt.preventDefault();
//     closeModal();
//   }
// });

// export { openModal, closeModal };
