const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = function ({ url, description, likes, comments }) {
  const thumbnail = picturesTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__img').alt = description;

  return thumbnail;
};

const renderThumbnails = function (photos) {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    picturesFragment.append(thumbnail);
  });
  picturesContainer.append(picturesFragment);
};

export { renderThumbnails };

