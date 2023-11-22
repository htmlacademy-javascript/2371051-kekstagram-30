import { renderGallery } from './gallery.js';
import './form.js';
import './scale.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';
import { initFilter } from './sort.js';


const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderGallery(pictures);
    initFilter(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
