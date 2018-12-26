'use strict';

(function () {
  window.renderCards = function (adArray) {
    var renderedCards = document.createDocumentFragment();
    var fragment = document.createDocumentFragment();

    var setType = function (ad) {
      var TYPES = {
        palace: 'Дворец',
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'

      };

      return TYPES[ad.offer.type];
    };

    var generateFeatures = function (features) {
      var adFeatures = ad.querySelector('.popup__features');
      adFeatures.innerHTML = '';
      for (var j = 0; j < features.length; j++) {
        var featureEl = window.utility.createElement('li', ['popup__feature', 'popup__feature--' + features[j]]);
        fragment.appendChild(featureEl);
      }
      adFeatures.appendChild(fragment);
      if (adFeatures.children.length === 0) {
        adFeatures.classList.add('hidden');
      }
    };
    var renderPhotos = function (photos) {
      var adPhotos = ad.querySelector('.popup__photos');
      var photoElement = ad.querySelector('.popup__photo').cloneNode(true);
      adPhotos.innerHTML = '';
      if (photos.length === 0) {
        adPhotos.style.display = 'none';
      } else {
        for (var j = 0; j < photos.length; j++) {
          var photo = photoElement.cloneNode(true);
          photo.src = photos[j];
          fragment.appendChild(photo);
        }
      }
      return adPhotos.appendChild(fragment);
    };

    for (var i = 0; i < adArray.length; i++) {
      var ad = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
      ad.querySelector('.popup__title').textContent = adArray[i].offer.title;
      ad.querySelector('.popup__text--address').textContent = adArray[i].offer.address;
      ad.querySelector('.popup__text--price').textContent = adArray[i].offer.price + '₽/ночь';
      ad.querySelector('.popup__type').textContent = setType(adArray[i]);
      var roomString = window.utility.declOfNum(adArray[i].offer.rooms, [' комната', ' комнаты', ' комнат']);
      var guestString = window.utility.declOfNum(adArray[i].offer.guests, [' гостя', ' гостей', ' гостей']);
      ad.querySelector('.popup__text--capacity').textContent = adArray[i].offer.rooms + roomString + ' для ' + adArray[i].offer.guests + guestString;
      ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + adArray[i].offer.checkin + ', выезд до ' + adArray[i].offer.checkout;
      ad.querySelector('.popup__description').textContent = adArray[i].offer.description;
      generateFeatures(adArray[i].offer.features, ad);
      renderPhotos(adArray[i].offer.photos, ad);
      ad.querySelector('.popup__avatar').src = adArray[i].author.avatar;
      renderedCards.appendChild(ad);
    }

    return renderedCards;
  };
})();
