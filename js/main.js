import { renderGallery } from './gallery.js';
import './form.js';
import './scale.js';
import { getData } from './api.js';
import { showErrorMessage } from './util.js';


const bootstrap = async () => {
  try {
    const pictures = await getData();
    renderGallery(pictures);
  } catch (error) {
    showErrorMessage();
  }
};

bootstrap();
