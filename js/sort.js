import { renderGallery } from './gallery.js';
import { debounce } from './util.js';

const MAX_RANDOM_FILTER = 10;

const Filters = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed',
};

const filterElement = document.querySelector('.img-filters');
const filterFormElement = filterElement.querySelector('.img-filters__form');
const randomButtonElement = filterFormElement.querySelector('#filter-random');
const defaultButtonElement = filterFormElement.querySelector('#filter-default');
const discussedButtonElement = filterFormElement.querySelector('#filter-discussed');

const getRandomIndex = (min, max) => Math.floor(Math.random() * (max - min));

const filterHandlers = {
  [Filters.DEFAULT]: (data) => data,

  [Filters.RANDOM]: (data) => {
    const randomIndexList = [];
    const max = Math.min(MAX_RANDOM_FILTER, data.length);

    while (randomIndexList.length < max) {
      const index = getRandomIndex(0, data.length);
      if (!randomIndexList.includes(index)) {
        randomIndexList.push(index);
      }
    }
    return randomIndexList.map((index) => data[index]);
  },

  [Filters.DISCUSSED]: (data) =>
    [...data].sort((item1, item2) => item2.comments.length - item1.comments.length)
};

const changeActiveButtonClass = (evt) => {
  const currentActiveFilter = filterFormElement.querySelector('.img-filters__button--active');
  currentActiveFilter.classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
};

const repaint = (filter, data) => {
  const filterData = filterHandlers[filter](data);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((item) => item.remove());
  renderGallery(filterData);
};


const debouncedRepaint = debounce(repaint);

const initFilter = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  defaultButtonElement.addEventListener('click', (evt) => {
    changeActiveButtonClass(evt);
    debouncedRepaint(Filters.DEFAULT, data);
  });

  discussedButtonElement.addEventListener('click', (evt) => {
    changeActiveButtonClass(evt);
    debouncedRepaint(Filters.DISCUSSED, data);
  });

  randomButtonElement.addEventListener('click', (evt) => {
    changeActiveButtonClass(evt);
    debouncedRepaint(Filters.RANDOM, data);
  });
};

export { initFilter };
