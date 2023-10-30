import { getRandomInteger } from './util.js';
import { createRandomId } from './util.js';
import { getRandomArrayElement } from './util.js';

const PHOTOS_COUNT = 25;
const MAX_COMMENTS_COUNT = 30;
const AVATARS_COUNT = 6;
const LIKES_MIN = 15;
const LIKES_MAX = 200;

const COMMENTATORS_NAMES = [
  'Лилия',
  'Роза',
  'Мариана',
  'Василий',
  'Катерина'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Пляж',
  'Указатель прохода на пляж',
  'Вид на песчаный пляж со стороны валунов',
  'Новый купальник',
  'Оригинальная подача том-яма',
  'Черный спорткар',
  'Клубника на деревянной тарелке',
  'Виноградный сок',
  'Девушка пытается поймать самолет',
  'Семейная обувница',
  'Огороженная заборчиком дорога к пляжу',
  'Белая ауди',
  'Кусочки красной рыбы с огурцом',
  'Кото-суши',
  'Домашние тапочки Робокопа',
  'Вид из иллюминатора самолета на горы',
  'Выступление оркестра',
  'Ретро автомобиль',
  'Тапочки для перемещения по дому ночью',
  'Пальмы на фоне вечерних огней',
  'Курица и кусочек лайма',
  'Потрясающий вид заката на фоне моря',
  'Милый крабик',
  'Концерт Руки Вверх',
  'Бегемот смеется над машиной'
];


const randomPhotoId = createRandomId(1, 25);
const randomUrlPhoto = createRandomId(1, 25);


const createMessage = function () {
  return Array.from({ length: getRandomInteger(1, 2) },
    () => getRandomArrayElement(MESSAGES)).join(' ');
};


const createComment = function () {
  return {
    id: getRandomInteger(1, 1000),
    avatar: `img/avatar-${getRandomInteger(1, AVATARS_COUNT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(COMMENTATORS_NAMES),
  };
};

const createCommentsArray = function () {
  return Array.from({ length: getRandomInteger(0, MAX_COMMENTS_COUNT) }, createComment);
};

const createPhotoObject = function () {
  const photoUrl = randomUrlPhoto();
  return {
    id: randomPhotoId(), // число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
    url: `photos/${photoUrl}.jpg`, // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: DESCRIPTIONS[photoUrl - 1],
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),//число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
    comments: createCommentsArray() // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом.
  };
};

const createPhotosArray = function () {
  return Array.from({ length: PHOTOS_COUNT }, createPhotoObject);
};


export { createPhotosArray };
