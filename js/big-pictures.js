const bigPicture = document.querySelector('.big-picture');

const addBigPictureContent = function (pictures) {
  pictures.forEach((picture) => {
    const image = bigPicture.querySelector('.big-picture__img');
    const likesCount = bigPicture.querySelector('.likes-count');
    // const commentsSwounCount = bigPicture.querySelector('.social__comment-shown-count');
    const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
    const commentsList = bigPicture.querySelector('.social__comments');
    const photoDescription = bigPicture.querySelector('.social__caption');

    image.src = picture.url;
    likesCount.textContent = picture.likes;
    // commentsSwounCount.textContent = picture.comments;
    commentsTotalCount.textContent = picture.comments;
    commentsList.append(picture.comments);
    photoDescription.textContent = picture.description;
  });
};

export { addBigPictureContent };
