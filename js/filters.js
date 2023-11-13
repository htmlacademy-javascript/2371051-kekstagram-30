const Effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

const effectsToFilter = {
  [Effect.CHROME]: {
    style: 'grayscale',
    unit: ''
  },
  [Effect.SEPIA]: {
    style: 'sepia',
    unit: ''
  },
  [Effect.MARVIN]: {
    style: 'invert',
    unit: '%'
  },
  [Effect.PHOBOS]: {
    style: 'blur',
    unit: 'px'
  },
  [Effect.HEAT]: {
    style: 'brightness',
    unit: '',
  },
};

const effectToSliderOption = {
  [Effect.DEFAULT]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.CHROME]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.SEPIA]: {
    min: 0,
    max: 1,
    step: 0.1
  },
  [Effect.MARVIN]: {
    min: 0,
    max: 100,
    step: 1
  },
  [Effect.PHOBOS]: {
    min: 0,
    max: 3,
    step: 0.1
  },
  [Effect.HEAT]: {
    min: 1,
    max: 3,
    step: 0.1
  },
};

const formElement = document.querySelector('.img-upload');
const imageElement = formElement.querySelector('.img-upload__preview img');
const effectElement = formElement.querySelector('.effects');
const sliderElement = formElement.querySelector('.effect-level__slider');
const sliderContainerElement = formElement.querySelector('.img-upload__effect-level');
const effectLevelElement = formElement.querySelector('.effect-level__value');

let choosenEffect = Effect.DEFAULT;

const isDefault = () => choosenEffect === Effect.DEFAULT;

const setImageStyle = () => {
  if (isDefault()) {
    imageElement.style.filter = null;
    return;
  }

  const { value } = effectLevelElement;
  const { style, unit } = effectsToFilter[choosenEffect];
  imageElement.style.filter = `${style}(${value}${unit})`;
};

const showSlider = function () {
  sliderContainerElement.classList.remove('hidden');
};

const hideSlider = function () {
  sliderContainerElement.classList.add('hidden');
};

const onSliderUpdate = () => {
  effectLevelElement.value = sliderElement.noUiSlider.get();
  setImageStyle();
};

const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    range: {
      min, max
    },
    start: max,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value)
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider();
};

const updateSlider = ({ min, max, step }) => {
  sliderElement.noUiSlider.updateOptions({
    range: { min, max },
    step,
    start: max,
  });
};

const setSlider = () => {
  if (isDefault()) {
    hideSlider();
  } else {
    updateSlider(effectToSliderOption[choosenEffect]);
    showSlider();
  }
};

const setEffect = (effect) => {
  choosenEffect = effect;
  setSlider();
  setImageStyle();
};

const reset = () => {
  setEffect(Effect.DEFAULT);
};

const onEffectsChange = (evt) => {
  setEffect(evt.target.value);
};

const init = () => {
  createSlider(effectToSliderOption[choosenEffect]);
  effectElement.addEventListener('change', onEffectsChange);
};

export { init, reset }; //в form.js

