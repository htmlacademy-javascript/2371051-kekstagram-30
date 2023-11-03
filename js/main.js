import { createPhotosArray } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openModal, closeModal } from './big-picture.js';

const pictures = createPhotosArray();
renderThumbnails(pictures);
openModal();
closeModal();
