import { isEscapeKey } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const DESCRIPTION_SYMBOLS_COUNT = 140;
const ErrorText = {
  INVALID_HASHTAG: 'Введён неправильный хэш-тег',
  INVALID_HASHTAGS_COUNT: `Максимум ${MAX_HASHTAGS_COUNT} хэш-тэгов`,
  NOT_UNIQUE_HASHTAG: 'Хэштеги не должны повторяться',
  LONG_COMMENT: `Количество символов должно быть не больше ${DESCRIPTION_SYMBOLS_COUNT}`
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

const openForm = function () {
  imageUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

};

const closeForm = function () {
  imageUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  imageUploadInputElement.value = '';
  hashtagInputElement.value = '';
  descriptionInputElement.value = '';
  pristine.reset();
  formElement.reset();
};

//закрытие при нажатии клавиши esc
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    if (hashtagInputElement === document.activeElement || descriptionInputElement === document.activeElement) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    closeForm();
  }
};

//проверяет валидность хештега
const isHashtagValid = function (value) {
  const tags = value.trim().split(' ');
  let isValid = true;
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;

  if (tags[0].length === 0) {
    return isValid;
  }

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

//проверка длины комментария
const validateCommentLength = function () {
  return descriptionInputElement.value.length <= DESCRIPTION_SYMBOLS_COUNT;
};

pristine.addValidator(hashtagInputElement, isHashtagValid, ErrorText.INVALID_HASHTAG, 1, true);

pristine.addValidator(hashtagInputElement, validateCountHashtags, ErrorText.INVALID_HASHTAGS_COUNT, 3, true);

pristine.addValidator(hashtagInputElement, validateUniqueHashtags, ErrorText.NOT_UNIQUE_HASHTAG, 2, true);

pristine.addValidator(descriptionInputElement, validateCommentLength, ErrorText.LONG_COMMENT, 4, true);

const onUploadInputChange = () => {
  openForm();
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => {
  closeForm();
  document.removeEventListener('keydown', onDocumentKeydown);
};

imageUploadInputElement.addEventListener('change', onUploadInputChange);
closeButtonElement.addEventListener('click', onCloseButtonClick);

formElement.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

export { formElement };
