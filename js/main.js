import { createPhotosArray } from './data.js';
import { renderGallery } from './gallery.js';
import './form.js';

const pictures = createPhotosArray();
renderGallery(pictures);
