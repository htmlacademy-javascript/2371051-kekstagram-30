import { isEscapeKey } from './util.js';
import { init as initFilters, reset as resetFilters } from './filters.js';
import { reset as resetScale } from './scale.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const HASHTAG_PATTERN = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS_COUNT = 5;
const DESCRIPTION_SYMBOLS_COUNT = 140;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
const submitButtonElement = formElement.querySelector('.img-upload__submit');
const previewElement = formElement.querySelector('.img-upload__preview img');

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
};

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
  pristine.reset();
  formElement.reset();
  resetFilters();
  resetScale();

  document.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));
const isTextFieldFocused = () => hashtagInputElement === document.activeElement || descriptionInputElement === document.activeElement;

//закрытие при нажатии клавиши esc
function onDocumentKeydown(evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused() && !isErrorMessageExists()) {
    evt.preventDefault();
    closeForm();
  }
}

const normilizeTags = (tagString) =>
  tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

//проверяет валидность хештега
const isHashtagValid = (value) => normilizeTags(value).every((tag) => HASHTAG_PATTERN.test(tag));

//проверка на кол-во хештегов
const validateCountHashtags = (value) => normilizeTags(value).length <= MAX_HASHTAGS_COUNT;

//проверка на одинаковые хештеги
const validateUniqueHashtags = (value) => {
  const tags = normilizeTags(value);

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
  const file = imageUploadInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewElement.src = URL.createObjectURL(file);
  }

  openForm();
  document.addEventListener('keydown', onDocumentKeydown);
};

function onCloseButtonClick() {
  closeForm();
}

const sendForm = async (form) => {
  if (!pristine.validate()) {
    return;
  }
  try {
    toggleSubmitButton(true);
    await sendData(new FormData(form));
    toggleSubmitButton(false);
    closeForm();
    showSuccessMessage();
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

imageUploadInputElement.addEventListener('change', onUploadInputChange);
closeButtonElement.addEventListener('click', onCloseButtonClick);
formElement.addEventListener('submit', onFormSubmit);
initFilters();

