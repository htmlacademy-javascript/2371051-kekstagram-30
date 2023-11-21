import { renderThumbnails } from './thumbnails';
import { showPicture } from './big-pictures.js';

const picturesContainer = document.querySelector('.pictures');


const renderGallery = (pictures) => {
  picturesContainer.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');

    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const thumbnailId = +thumbnail.dataset.thumbnailId;
    const pictureData = pictures.find(({ id }) => id === thumbnailId);
    showPicture(pictureData);
  });
  renderThumbnails(pictures, picturesContainer);
};

export { renderGallery };
