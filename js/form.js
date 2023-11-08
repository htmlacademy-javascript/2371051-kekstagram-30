import { isEscapeKey } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const DESCRIPTION_SYMBOLS_COUNT = 140;
const ErrorText = {
  INVALID_HASHTAG: 'Введён неправильный хэш-тег',
  INVALID_HASHTAGS_COUNT: `Максимум ${MAX_HASHTAGS_COUNT} хэш-тэгов`,
  NOT_UNIQUE: 'Хэштеги не должны повторяться'
};

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const imageUploadInputElement = formElement.querySelector('.img-upload__input');
const imageUploadOverlayElement = formElement.querySelector('.img-upload__overlay');
const closeButtonElement = formElement.querySelector('.img-upload__cancel');
const hashtagInputElement = formElement.querySelector('.text__hashtags');
const descriptionInputElement = formElement.querySelector('.text__description');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div'
});

const closeForm = function () {
  imageUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imageUploadInputElement.value = '';
};

const openForm = function () {
  imageUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
};

//проверяет валидность хештега
const isHashtagValid = function (value) {
  const tags = value.trim().split(' ');
  let isValid = true;
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

  for (let i = 0; i < tags.length; i++) {
    if (tags[i].slice(0).match(hashtagPattern) === null) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

//проверка на кол-во хештегов
const validateCountHashtags = (value) => {
  const hashtagsArray = value.split(' ');
  return hashtagsArray.length <= MAX_HASHTAGS_COUNT;
};

//проверка на одинаковые хештеги
const validateUniqueHashtags = (value) => {
  const tags = value.trim().split(' ');

  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return tags.length === new Set(lowerCaseTags).size;
};

pristine.addValidator(hashtagInputElement, isHashtagValid, ErrorText.INVALID_HASHTAG);

pristine.addValidator(hashtagInputElement, validateCountHashtags, ErrorText.INVALID_HASHTAGS_COUNT);

pristine.addValidator(hashtagInputElement, validateUniqueHashtags, ErrorText.NOT_UNIQUE);

const onUploadInputChange = () => {
  openForm();
};

const onCloseButtonClick = () => {
  closeForm();
};

imageUploadInputElement.addEventListener('change', onUploadInputChange);
closeButtonElement.addEventListener('click', onCloseButtonClick);

formElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
  hashtagInputElement.value = '';
});

//получить массив хештегов
//проверить каждый хештег на валидность
//проверить нет ли одинаковых хештегов
//проверить колличество хештегов


// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды;
// нельзя указать больше пяти хэш-тегов;
// хэш-теги необязательны;
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения.
