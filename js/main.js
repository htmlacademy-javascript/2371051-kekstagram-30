import { createPhotosArray } from './data.js';
import { renderGallery } from './gallery.js';
import './form.js';
import './scale.js';
// import './filters.js';

const pictures = createPhotosArray();
renderGallery(pictures);
