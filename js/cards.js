'use strict';

(function () {
  window.renderCards = function (advertisements) {
    var renderedCards = document.createDocumentFragment();
    var fragment = document.createDocumentFragment();

    var setType = function (ad) {
      var Types = {
        palace: 'Дворец',
        flat: 'Квартира',
        house: 'Дом',
        bungalo: 'Бунгало'

      };

      return Types[ad.offer.type];
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

    for (var i = 0; i < advertisements.length; i++) {
      var ad = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
      ad.querySelector('.popup__title').textContent = advertisements[i].offer.title;
      ad.querySelector('.popup__text--address').textContent = advertisements[i].offer.address;
      ad.querySelector('.popup__text--price').textContent = advertisements[i].offer.price + '₽/ночь';
      ad.querySelector('.popup__type').textContent = setType(advertisements[i]);
      var roomString = window.utility.declOfNum(advertisements[i].offer.rooms, [' комната', ' комнаты', ' комнат']);
      var guestString = window.utility.declOfNum(advertisements[i].offer.guests, [' гостя', ' гостей', ' гостей']);
      ad.querySelector('.popup__text--capacity').textContent = advertisements[i].offer.rooms + roomString + ' для ' + advertisements[i].offer.guests + guestString;
      ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertisements[i].offer.checkin + ', выезд до ' + advertisements[i].offer.checkout;
      ad.querySelector('.popup__description').textContent = advertisements[i].offer.description;
      generateFeatures(advertisements[i].offer.features, ad);
      renderPhotos(advertisements[i].offer.photos, ad);
      ad.querySelector('.popup__avatar').src = advertisements[i].author.avatar;
      renderedCards.appendChild(ad);
    }

    return renderedCards;
  };
})();
