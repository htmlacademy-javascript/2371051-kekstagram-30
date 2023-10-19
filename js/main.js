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
  'Новое фото',
  'Не жалейте лайки',
  'Рекламирую питание Кэт Энерджи',
  'Похудел. До и после',
  'Долгожданный отпуск',
  'Потолстел. Буду худеть'
];

const getRandomInteger = function (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

function createRandomId(min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);

    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);

    return currentValue;

  };

}

const randomPhotoId = createRandomId(1, 25);
const randomUrlPhotoId = createRandomId(1, 25);

const getRandomArrayElement = function (elements) {
  return elements[getRandomInteger(0, elements.length - 1)];
};

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


const createPhotoDescription = function () {
  return {
    id: randomPhotoId(), // число — идентификатор опубликованной фотографии. Это число от 1 до 25. Идентификаторы не должны повторяться.
    url: `photos/${randomUrlPhotoId()}.jpg`, // строка — адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
    description: getRandomArrayElement(DESCRIPTIONS),//строка — описание фотографии. Описание придумайте самостоятельно.
    likes: getRandomInteger(LIKES_MIN, LIKES_MAX),//число — количество лайков, поставленных фотографии. Случайное число от 15 до 200.
    comments: createCommentsArray() // массив объектов — список комментариев, оставленных другими пользователями к этой фотографии. Количество комментариев к каждой фотографии — случайное число от 0 до 30. Все комментарии генерируются случайным образом.
  };
};

const createPhotosArray = function () {
  return Array.from({ length: PHOTOS_COUNT }, createPhotoDescription);
};


(createPhotosArray());
