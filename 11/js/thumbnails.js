const picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = function ({ url, description, likes, comments, id }) {
  const thumbnail = picturesTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = function (photos, container) {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    picturesFragment.append(thumbnail);
  });
  container.append(picturesFragment);
};

export { renderThumbnails };

