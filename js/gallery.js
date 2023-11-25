import { renderThumbnails } from './thumbnails.js';
import { showPicture } from './big-pictures.js';


const picturesContainer = document.querySelector('.pictures');

const openBigPicture = (evt, pictures) => {
  const thumbnail = evt.target.closest('[data-thumbnail-id]');

  if (!thumbnail) {
    return;
  }

  evt.preventDefault();
  const thumbnailId = +thumbnail.dataset.thumbnailId;
  const pictureData = pictures.find(({
    id
  }) => id === thumbnailId);
  showPicture(pictureData);
};

let photos;

function onPictureClick(evt) {
  openBigPicture(evt, photos);
  picturesContainer.removeEventListener('click', this);
}

const renderGallery = (pictures) => {
  photos = pictures;
  renderThumbnails(pictures, picturesContainer);

  picturesContainer.addEventListener('click', onPictureClick);
};

export {
  renderGallery
};
