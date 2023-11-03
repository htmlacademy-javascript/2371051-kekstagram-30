import { createPhotosArray } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openModal, closeModal } from './modal.js';
import { addBigPictureContent } from './big-pictures.js';

const pictures = createPhotosArray();
renderThumbnails(pictures);
openModal();
closeModal();
addBigPictureContent(pictures);
