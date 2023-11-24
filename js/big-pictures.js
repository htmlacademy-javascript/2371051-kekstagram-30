import { isEscapeKey } from './util.js';

const COMMENTS_COUNT_TO_SHOW = 5;


const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closeButtonElement = bigPictureElement.querySelector('.big-picture__cancel');

const commentElement = bigPictureElement.querySelector('.social__comment');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let commentsCountShown = 0;
let comments = [];

const createComment = function ({ avatar, message, name }) {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = function () {
  commentsCountShown += COMMENTS_COUNT_TO_SHOW;

  if (commentsCountShown >= comments.length) {
    commentsLoaderElement.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  console.log(commentsCountShown);

  commentsListElement.innerHTML = '';
  commentsListElement.append(fragment);

  commentCountElement.textContent = commentsCountShown;
  totalCommentCountElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();

const hidePicture = function () {
  commentsCountShown = 0;
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
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
  document.addEventListener('keydown', onDocumentKeydown);

  comments = pictureData.comments;
  if (comments.length > 0) {
    commentsCountShown = 0;
    renderComments();
  }

  renderPicture(pictureData);
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

closeButtonElement.addEventListener('click', onCloseButtonClick);

commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);

export { showPicture };
