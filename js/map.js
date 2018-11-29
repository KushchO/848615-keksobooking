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
var fragmentCards = document.createDocumentFragment();
var pinBlock = document.querySelector('.map__pins');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');
var mainPin = document.querySelector('.map__pin--main');
var adFormAddress = document.querySelector('#address');

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

var generateArryasForadObject = function () {
  for (var i = 1; i < 9; i++) {
    /* Генерируем массив ссылок на авторов объявлений */
    var authorId = i;
    if (i < 10) {
      authorId = '0' + i;
    }
    AuthorList.push('img/avatars/user' + authorId + '.png');
    /* Генерируем массив коородинат локаций и заполняем массив адресов */
    var addressX = getRandomInRange(25, map.offsetWidth - 25);
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
    pin.style = 'left: ' + (locationListX[i] + 25) + 'px; top: ' + (locationListY[i]) + 'px';
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

var pins = document.querySelectorAll('.map__pin');

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
  var ad = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
  ad.querySelector('.popup__title').textContent = adArray[adNum].offer.title;
  ad.querySelector('.popup__text--address').textContent = adArray[adNum].offer.address;
  ad.querySelector('.popup__text--price').textContent = adArray[adNum].offer.price + '₽/ночь';
  var adType = ad.querySelector('.popup__type');
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
  ad.querySelector('.popup__text--capacity').textContent = adArray[adNum].offer.rooms + roomString + ' для ' + adArray[adNum].offer.guests + guestString;
  ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adArray[adNum].offer.checkin + ', выезд до ' + adArray[adNum].offer.checkout;
  var adFeaturesElements = ad.querySelectorAll('.popup__feature');
  Array.prototype.forEach.call(adFeaturesElements, function (node) {
    node.parentNode.removeChild(node);
  });
  var adFeatures = ad.querySelector('.popup__features');
  for (var i = 0; i < adArray[adNum].offer.features.length; i++) {
    var featureEl = createElement('li', ['popup__feature', 'popup__feature--' + adArray[adNum].offer.features[i]]);
    fragment.appendChild(featureEl);
  }
  adFeatures.appendChild(fragment);
  ad.querySelector('.popup__description').textContent = adArray[adNum].offer.description;
  var adPhotos = ad.querySelector('.popup__photos');
  for (i = 0; i < adArray[adNum].offer.photos.length; i++) {
    var photoEl;
    if (i === adArray[adNum].offer.photos.length - 1) {
      photoEl = ad.querySelector('.popup__photo');
    } else {
      photoEl = ad.querySelector('.popup__photo').cloneNode(true);
    }
    photoEl.src = adArray[adNum].offer.photos[i];
    fragment.appendChild(photoEl);
  }
  adPhotos.appendChild(fragment);
  ad.querySelector('.popup__avatar').src = adArray[adNum].author.avatar;
  return ad;
};
/* Генерим разные карточки */

for (var i = 0; i < adArray.length; i++) {
  fragmentCards.appendChild(generateAd(i));
}
map.insertBefore(fragmentCards, mapFilters);

var adCards = document.querySelectorAll('.map__card');

/* Переводим все элементы в неактивное состояние */
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
Array.prototype.forEach.call(adFormFieldsets, function (elem) {
  elem.disabled = true;
});
Array.prototype.forEach.call(adCards, function (elem) {
  elem.classList.add('hidden');
});
var mapOverlay = document.querySelector('.map__overlay');
mapOverlay.style.zIndex = '10';
mainPin.style.zIndex = '15';

/* Определяем начальный адрес метки */
map.position = 'relative';
adFormAddress.disabled = true;
var calculateAddress = function (left, top) {
  adFormAddress.placeholder = left + ', ' + top;
};
var mainPinLeft = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
var mainPinTop = Math.floor(mainPin.offsetTop + mainPin.offsetHeight / 2);
calculateAddress(mainPinLeft, mainPinTop);

/* Добовляем обработчики на метки и карточку */

var addPinClickHandler = function (pin, card) {
  pin.addEventListener('click', function () {
    var activPin = document.querySelector('.active');
    if (activPin) {
      activPin.classList.add('hidden');
      activPin.classList.remove('active');
    }
    card.classList.remove('hidden');
    card.classList.add('active');
  });
};

for (var j = 1; j < pins.length; j++) {
  addPinClickHandler(pins[j], adCards[j - 1]);
}

map.addEventListener('click', function (evt) {
  var target = evt.target;
  if (target.className === 'popup__close') {
    target.parentNode.classList.add('hidden');
    target.parentNode.classList.remove('hidden active');
  }
});

document.addEventListener('keydown', function (evt) {
  var activeAdCard = map.querySelector('.active');
  if (evt.keyCode === 27 && activeAdCard) {
    activeAdCard.classList.remove('active');
    activeAdCard.classList.add('hidden');
  }
});

/* Вешаем обработчик на mouse up*/
mainPin.addEventListener('mouseup', function () {
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  mapOverlay.style.zIndex = '0';
  Array.prototype.forEach.call(adFormFieldsets, function (elem) {
    elem.disabled = false;
  });
  mainPinTop = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + 22);
  calculateAddress(mainPinLeft, mainPinTop);
});
