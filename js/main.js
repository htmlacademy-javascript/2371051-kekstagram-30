import { createPhotosArray } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import './big-picture.js';

const pictures = createPhotosArray();
renderThumbnails(pictures);

