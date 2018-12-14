'use strict';

(function () {
  window.cards = {};
  var fragment = document.createDocumentFragment();
  window.cards.fragment = fragment;
  var fragmentCards = document.createDocumentFragment();
  window.cards.fragmentCards = fragmentCards;
  var creatCardsList = function (array) {
    var adArrayList = array;
    for (var i = 0; i < adArrayList.length; i++) {
      fragmentCards.appendChild(generateAd(i, adArrayList));
    }
  };
  window.load(creatCardsList, window.errorHandler);
  var generateAd = function (adNum, adArray) {
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
    var roomString = window.utility.declOfNum(adArray[adNum].offer.rooms, [' комната', ' комнаты', ' комнат']);
    var guestString = window.utility.declOfNum(adArray[adNum].offer.guests, [' гостя', ' гостей', ' гостей']);
    ad.querySelector('.popup__text--capacity').textContent = adArray[adNum].offer.rooms + roomString + ' для ' + adArray[adNum].offer.guests + guestString;
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adArray[adNum].offer.checkin + ', выезд до ' + adArray[adNum].offer.checkout;
    var adFeaturesElements = ad.querySelectorAll('.popup__feature');
    Array.prototype.forEach.call(adFeaturesElements, function (node) {
      node.parentNode.removeChild(node);
    });
    var adFeatures = ad.querySelector('.popup__features');
    for (var i = 0; i < adArray[adNum].offer.features.length; i++) {
      var featureEl = window.utility.createElement('li', ['popup__feature', 'popup__feature--' + adArray[adNum].offer.features[i]]);
      window.cards.fragment.appendChild(featureEl);
    }
    adFeatures.appendChild(window.cards.fragment);
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
    adPhotos.appendChild(window.cards.fragment);
    ad.querySelector('.popup__avatar').src = adArray[adNum].author.avatar;
    return ad;
  };
})();
