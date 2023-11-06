const bigPictureElement = document.querySelector('.big-picture');
const commentElement = bigPictureElement.querySelector('.social__comment');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
// const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

const createComment = function ({ avatar, message, name }) {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = function (comments) {
  commentsListElement.innerHTML = '';
  const fragment = document.createDocumentFragment();

  comments.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });
  commentsListElement.append(fragment);
};

const initCommentList = function () {
  commentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

export { renderComments, initCommentList };

// const bigPicture = document.querySelector('.big-picture');
// const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
// const commentsList = bigPicture.querySelector('.social__comments');

// const getCommentsCount = function (commentsAll) {
//   const comments = commentsAll.length;
//   commentsTotalCount.textContent = comments.toString();
// };

// const createComments = function (comment) {
//   const elementLi = document.createElement('li');
//   const elementImage = document.createElement('img');
//   const elementText = document.createElement('p');
//   elementLi.appendChild(elementImage);
//   elementText.classList.add('social__text');
//   elementText.textContent = comment.message;
//   elementLi.appendChild(elementText);
//   commentsList.appendChild(elementLi);
//   elementLi.classList.add('social__comment');
//   elementImage.classList.add('social__picture');
//   elementImage.src = comment.avatar;
//   elementImage.alt = comment.name;
//   elementImage.width = 35;
//   elementImage.height = 35;
// };

// export {
//   getCommentsCount,
//   createComments
// };
