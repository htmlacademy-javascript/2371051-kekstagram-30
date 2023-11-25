const DEFAULT_SCALE = 100;
const PERCENT_STEP = 25;
const PERCENT_MAX = 100;
const PERCENT_MIN = 25;

const formElement = document.querySelector('.img-upload__form');
const smallerButtonElement = formElement.querySelector('.scale__control--smaller');
const biggerButtonElement = formElement.querySelector('.scale__control--bigger');

const scaleValueElement = formElement.querySelector('.scale__control--value');
const imagePreview = formElement.querySelector('.img-upload__preview img');


//получаем значение процентов
const getPercentValue = () => Number(scaleValueElement.value.replace('%', ''));

//установка значени в инпут и трансформация картинки
const setTransformAndValue = (newValue) => {
  scaleValueElement.value = `${newValue}%`;
  imagePreview.style.transform = `scale(${newValue / 100})`;
};

//осуществляет увеличение или уменьшение значения при нажатии на кнопки.
const onButtonClick = (increment) => {
  const currentValue = getPercentValue();
  const newValue = currentValue + increment;
  if (newValue >= PERCENT_MIN && newValue <= PERCENT_MAX) {
    setTransformAndValue(newValue);
  }
};

const reset = () => {
  setTransformAndValue(DEFAULT_SCALE);
};

smallerButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  onButtonClick(-PERCENT_STEP);
});

biggerButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  onButtonClick(PERCENT_STEP);
});

export { reset };
