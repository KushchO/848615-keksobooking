'use strict';

(function () {
  window.cards = {};
  window.cards.cardsFragment = document.createDocumentFragment();
  var fragment = document.createDocumentFragment();

  window.cards.generateAd = function (adArray, cardsNum) {
    for (var i = 0; i < cardsNum; i++) {
      var ad = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
      ad.querySelector('.popup__title').textContent = adArray[i].offer.title;
      ad.querySelector('.popup__text--address').textContent = adArray[i].offer.address;
      ad.querySelector('.popup__text--price').textContent = adArray[i].offer.price + '₽/ночь';
      var adType = ad.querySelector('.popup__type');
      if (adArray[i].offer.type === 'flat') {
        adType.textContent = 'Квартира';
      }
      if (adArray[i].offer.type === 'bungalo') {
        adType.textContent = 'Бунгало';
      }
      if (adArray[i].offer.type === 'house') {
        adType.textContent = 'Дом';
      }
      if (adArray[i].offer.type === 'palace') {
        adType.textContent = 'Дворец';
      }
      var roomString = window.utility.declOfNum(adArray[i].offer.rooms, [' комната', ' комнаты', ' комнат']);
      var guestString = window.utility.declOfNum(adArray[i].offer.guests, [' гостя', ' гостей', ' гостей']);
      ad.querySelector('.popup__text--capacity').textContent = adArray[i].offer.rooms + roomString + ' для ' + adArray[i].offer.guests + guestString;
      ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adArray[i].offer.checkin + ', выезд до ' + adArray[i].offer.checkout;
      var adFeaturesElements = ad.querySelectorAll('.popup__feature');
      Array.prototype.forEach.call(adFeaturesElements, function (node) {
        node.parentNode.removeChild(node);
      });
      var adFeatures = ad.querySelector('.popup__features');
      for (var j = 0; j < adArray[i].offer.features.length; j++) {
        var featureEl = window.utility.createElement('li', ['popup__feature', 'popup__feature--' + adArray[i].offer.features[j]]);
        fragment.appendChild(featureEl);
      }
      adFeatures.appendChild(fragment);
      if (adFeatures.children.length === 0) {
        adFeatures.classList.add('hidden');
      }
      ad.querySelector('.popup__description').textContent = adArray[i].offer.description;
      var adPhotos = ad.querySelector('.popup__photos');

      if (adArray[i].offer.photos.length === 0) {
        adPhotos.style.display = 'none';
      } else {
        for (j = 0; j < adArray[i].offer.photos.length; j++) {
          var photoEl = ad.querySelector('.popup__photo').cloneNode(true);
          if (j === adArray[i].offer.photos.length - 1) {
            photoEl = ad.querySelector('.popup__photo');
          } else {
            photoEl = ad.querySelector('.popup__photo').cloneNode(true);
          }
          photoEl.src = adArray[i].offer.photos[j];
          fragment.appendChild(photoEl);
        }
        adPhotos.appendChild(fragment);
      }

      ad.querySelector('.popup__avatar').src = adArray[i].author.avatar;
      window.cards.cardsFragment.appendChild(ad);
    }
    return window.cards.cardsFragment;
  };
})();
