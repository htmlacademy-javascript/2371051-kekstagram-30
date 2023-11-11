// import { formElement } from './form.js';

// const smallerButtonElement = formElement.querySelector('.scale__control--smaller');
// const biggerButtonElement = formElement.querySelector('.scale__control--bigger');
// const scaleValueElement = formElement.querySelector('.scale__control--value');
// const imagePreview = formElement.querySelector('.img-upload__preview img');

// let percent = Number(scaleValueElement.value.replace('%', ''));

// const reduceImage = function () {

//   if (percent > 25) {
//     percent -= 25;
//     scaleValueElement.value = `${percent}%`;

//     imagePreview.style.transform = `scale(${percent / 100})`;
//   }
// };

// const enlargeImage = function () {
//   if (percent < 100) {
//     percent += 25;
//     scaleValueElement.value = `${percent}%`;

//     imagePreview.style.transform = `scale(${percent / 100})`;
//   }
// };

// const onSmallerButtonClick = () => {
//   reduceImage();
// };

// const onBiggerButtonClick = () => {
//   enlargeImage();
// };

// smallerButtonElement.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   onSmallerButtonClick();
// });

// biggerButtonElement.addEventListener('click', (evt) => {
//   evt.preventDefault();
//   onBiggerButtonClick();
// });

import { formElement } from './form.js';

const smallerButtonElement = formElement.querySelector('.scale__control--smaller');
const biggerButtonElement = formElement.querySelector('.scale__control--bigger');

const scaleValueElement = formElement.querySelector('.scale__control--value');
const imagePreview = formElement.querySelector('.img-upload__preview img');
const percentStep = 25;

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
  if (currentValue + increment >= 25 && currentValue + increment <= 100) {
    setTransformAndValue(currentValue + increment);
  }
};

smallerButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  onButtonClick(-percentStep);
});

biggerButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  onButtonClick(percentStep);
});

