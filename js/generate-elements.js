'use strict';

(function () {
  var generateAd = function (adNum) {
    var ad = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
    ad.querySelector('.popup__title').textContent = window.generateArryas.adArray[adNum].offer.title;
    ad.querySelector('.popup__text--address').textContent = window.generateArryas.adArray[adNum].offer.address;
    ad.querySelector('.popup__text--price').textContent = window.generateArryas.adArray[adNum].offer.price + '₽/ночь';
    var adType = ad.querySelector('.popup__type');
    if (window.generateArryas.adArray[adNum].offer.type === 'flat') {
      adType.textContent = 'Квартира';
    }
    if (window.generateArryas.adArray[adNum].offer.type === 'bungalo') {
      adType.textContent = 'Бунгало';
    }
    if (window.generateArryas.adArray[adNum].offer.type === 'house') {
      adType.textContent = 'Дом';
    }
    if (window.generateArryas.adArray[adNum].offer.type === 'palace') {
      adType.textContent = 'Дворец';
    }
    var roomString = window.utility.declOfNum(window.generateArryas.adArray[adNum].offer.rooms, [' комната', ' комнаты', ' комнат']);
    var guestString = window.utility.declOfNum(window.generateArryas.adArray[adNum].offer.guests, [' гостя', ' гостей', ' гостей']);
    ad.querySelector('.popup__text--capacity').textContent = window.generateArryas.adArray[adNum].offer.rooms + roomString + ' для ' + window.generateArryas.adArray[adNum].offer.guests + guestString;
    ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + window.generateArryas.adArray[adNum].offer.checkin + ', выезд до ' + window.generateArryas.adArray[adNum].offer.checkout;
    var adFeaturesElements = ad.querySelectorAll('.popup__feature');
    Array.prototype.forEach.call(adFeaturesElements, function (node) {
      node.parentNode.removeChild(node);
    });
    var adFeatures = ad.querySelector('.popup__features');
    for (var i = 0; i < window.generateArryas.adArray[adNum].offer.features.length; i++) {
      var featureEl = window.utility.createElement('li', ['popup__feature', 'popup__feature--' + window.generateArryas.adArray[adNum].offer.features[i]]);
      window.variables.fragment.appendChild(featureEl);
    }
    adFeatures.appendChild(window.variables.fragment);
    ad.querySelector('.popup__description').textContent = window.generateArryas.adArray[adNum].offer.description;
    var adPhotos = ad.querySelector('.popup__photos');
    for (i = 0; i < window.generateArryas.adArray[adNum].offer.photos.length; i++) {
      var photoEl;
      if (i === window.generateArryas.adArray[adNum].offer.photos.length - 1) {
        photoEl = ad.querySelector('.popup__photo');
      } else {
        photoEl = ad.querySelector('.popup__photo').cloneNode(true);
      }
      photoEl.src = window.generateArryas.adArray[adNum].offer.photos[i];
      window.variables.fragment.appendChild(photoEl);
    }
    adPhotos.appendChild(window.variables.fragment);
    ad.querySelector('.popup__avatar').src = window.generateArryas.adArray[adNum].author.avatar;
    return ad;
  };
  /* Генерим разные карточки */
  var fragmentCards = document.createDocumentFragment();
  for (var i = 0; i < window.generateArryas.adArray.length; i++) {
    fragmentCards.appendChild(generateAd(i));
  }
  window.variables.map.insertBefore(fragmentCards, window.variables.mapFilters);
})();
