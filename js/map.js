'use strict';
/* Создаем массивы данных для генерации объектов Объявлений */
var AuthorList = [];
var tittleList = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var addressList = [];
var locationListX = [];
var locationListY = [];
var priceList = [];
var typeOfAparts = ['palace', 'flat', 'house', 'bungalo'];
var checkinList = ['12:00', '13:00', '14:00'];
var checkoutList = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosList = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
/* Создаем переменные и  */
var fragment = document.createDocumentFragment();
var pinBlock = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

/* Служебные функции */
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

function declOfNum(number, titles) {
  var cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

/* Определяем размер блока карты */
map.classList.remove('map--faded');

var generateArryasForadObject = function () {
  for (var i = 1; i < 9; i++) {
    /* Генерируем массив ссылок на авторов объявлений */
    var authorId = i;
    if (i < 10) {
      authorId = '0' + i;
    }
    AuthorList.push('img/avatars/user' + authorId + '.png');
    /* Генерируем массив коородинат локаций и заполняем массив адресов */
    var addressX = getRandomInRange(0, map.offsetWidth - 50);
    var addressY = getRandomInRange(130, 630);
    var address = addressX + ', ' + addressY;
    locationListX.push(addressX);
    locationListY.push(addressY);
    addressList.push(address);
    /* Генерируем массив цен на апартаменты */
    priceList.push(getRandomInRange(1000, 1000000));
  }
};

generateArryasForadObject();

var createAdArray = function () {
  var roomAdsList = [];
  for (var i = 0; i < 8; i++) {
    var ad = {};
    var apartsNum = getRandomInRange(0, 3);
    var checiinNum = getRandomInRange(0, 2);
    var checioutNum = getRandomInRange(0, 2);
    var tempFeatureArray = featuresList.slice();
    tempFeatureArray.length = getRandomInRange(1, featuresList.length);
    var tempphotoArray = shuffleArray(photosList).slice();
    ad.offer = {};
    ad.offer.title = tittleList[i];
    ad.offer.address = addressList[i];
    ad.offer.price = priceList[i];
    ad.offer.type = typeOfAparts[apartsNum];
    ad.offer.guests = getRandomInRange(1, 10);
    ad.offer.rooms = getRandomInRange(1, 5);
    ad.offer.checkin = checkinList[checiinNum];
    ad.offer.checkout = checkoutList[checioutNum];
    ad.offer.features = tempFeatureArray;
    ad.offer.description = 'Описание';
    ad.offer.photos = tempphotoArray;
    ad.author = {};
    ad.author.avatar = AuthorList[i];

    roomAdsList.push(ad);
  }

  return roomAdsList;
};

var adArray = createAdArray();

var generatePins = function () {
  for (var i = 0; i < 8; i++) {
    var pin = document.createElement('button');
    var pinImg = document.createElement('img');
    /* Генерим button */
    pin.classList.add('map__pin');
    pin.style = 'left: ' + (locationListX[i] + 25) + 'px; top: ' + (locationListY[i] + 70) + 'px';
    pin.setAttribute('type', 'button');
    /* Генерим img */
    pinImg.src = adArray[i].author.avatar;
    pinImg.alt = adArray[i].offer.title;
    pinImg.draggable = false;
    pinImg.width = 40;
    pinImg.height = 40;
    pin.appendChild(pinImg);
    fragment.appendChild(pin);
  }
};
generatePins();
pinBlock.appendChild(fragment);

var createElement = function (tagName, className, text) {
  var element = document.createElement(tagName);
  if (className.constructor.name === 'Array') {
    for (var i = 0; i < className.length; i++) {
      element.classList.add(className[i]);
    }
  } else {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

var generateAd = function (adNum) {
  /* Генерим елементы и наполняем их */
  var ad = createElement('article', ['map__card', 'popup']);
  var adTitle = createElement('h3', 'popup__title', adArray[adNum].offer.title);
  var adAddress = createElement('p', ['popup__text', 'popup__text--address'], adArray[adNum].offer.address);
  var adPrice = createElement('p', ['popup__text', 'popup__text--price'], adArray[adNum].offer.price + '₽/ночь');
  var adType = createElement('h4', 'popup__type');
  if (adArray[adNum].offer.type === 'flat') {
    adType.textContent = 'Квартира';
  }
  if (adArray[adNum].offer.type === 'bungalo') {
    adType.textContent = 'Бунгало';
  }
  if (adArray[adNum].offer.type === 'house') {
    adType.textContent = 'Дом';
  }
  if (adArray[adNum].offer.type === 'palace') {
    adType.textContent = 'Дворец';
  }
  var roomString = declOfNum(adArray[adNum].offer.rooms, [' комната', ' комнаты', ' комнат']);
  var guestString = declOfNum(adArray[adNum].offer.guests, [' гостя', ' гостей', ' гостей']);
  var adCapacity = createElement('p', ['popup__text', 'popup__text--capacity'], adArray[adNum].offer.rooms + roomString + ' для ' + adArray[adNum].offer.guests + guestString);
  var adTime = createElement('p', ['popup__text', 'popup__text--capacity'], 'Заезд после ' + adArray[adNum].offer.checkin + ', выезд до ' + adArray[adNum].offer.checkout);
  var adFeatures = createElement('ul', 'popup__features');
  for (var i = 0; i < adArray[adNum].offer.features.length; i++) {
    var featureEl = createElement('li', ['popup__feature', 'popup__feature--' + adArray[adNum].offer.features[i]]);
    fragment.appendChild(featureEl);
  }
  adFeatures.appendChild(fragment);
  var adDescription = document.createElement('p');
  adDescription.textContent = adArray[adNum].offer.description;
  adDescription.classList.add('popup__description');
  var adPhotos = document.createElement('div');
  for (i = 0; i < adArray[adNum].offer.photos.length; i++) {
    var photoEl = document.createElement('img');
    photoEl.src = adArray[adNum].offer.photos[i];
    photoEl.width = 45;
    photoEl.height = 40;
    photoEl.alt = 'Фотография жилья';
    photoEl.classList.add('popup__photo');
    fragment.appendChild(photoEl);
  }
  adPhotos.appendChild(fragment);
  var adAvatar = createElement('img', 'popup__avatar');
  adAvatar.src = adArray[adNum].author.avatar;
  adAvatar.width = 70;
  adAvatar.height = 70;
  adAvatar.alt = 'Аватар пользователя';
  var adClose = createElement('button', 'popup__close', 'Закрыть');
  adClose.type = 'button';
  /* Добавляе элементы в объявление */
  fragment.appendChild(adAvatar);
  fragment.appendChild(adClose);
  fragment.appendChild(adTitle);
  fragment.appendChild(adAddress);
  fragment.appendChild(adPrice);
  fragment.appendChild(adType);
  fragment.appendChild(adCapacity);
  fragment.appendChild(adTime);
  fragment.appendChild(adFeatures);
  fragment.appendChild(adDescription);
  fragment.appendChild(adPhotos);
  ad.appendChild(fragment);
  return ad;
};

map.insertBefore(generateAd(0), mapFilters);
