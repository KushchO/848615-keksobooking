'use strict';

(function () {
  var Types = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  window.renderCards = function (advertisements) {
    var renderedCards = document.createDocumentFragment();
    var fragment = document.createDocumentFragment();


    var setType = function (adElement) {
      return Types[adElement.offer.type.toUpperCase()];
    };

    var generateFeatures = function (features, ad) {
      var adFeatures = ad.querySelector('.popup__features');
      adFeatures.innerHTML = '';
      features.forEach(function (item) {
        var featureEl = window.utility.createElement('li', ['popup__feature', 'popup__feature--' + item]);
        fragment.appendChild(featureEl);
      });
      adFeatures.appendChild(fragment);
      if (adFeatures.children.length === 0) {
        adFeatures.classList.add('hidden');
      }
    };
    var renderPhotos = function (photos, ad) {
      var adPhotos = ad.querySelector('.popup__photos');
      var photoElement = ad.querySelector('.popup__photo').cloneNode(true);
      adPhotos.innerHTML = '';
      if (photos.length === 0) {
        adPhotos.style.display = 'none';
      } else {
        photos.forEach(function (item) {
          var photo = photoElement.cloneNode(true);
          photo.src = item;
          fragment.appendChild(photo);
        });
      }
      return adPhotos.appendChild(fragment);
    };

    advertisements.forEach(function (item) {
      var ad = document.querySelector('#card').content.querySelector('.map__card').cloneNode(true);
      ad.querySelector('.popup__title').textContent = item.offer.title;
      ad.querySelector('.popup__text--address').textContent = item.offer.address;
      ad.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
      ad.querySelector('.popup__type').textContent = setType(item);
      var roomString = window.utility.pluralize(item.offer.rooms, [' комната', ' комнаты', ' комнат']);
      var guestString = window.utility.pluralize(item.offer.guests, [' гостя', ' гостей', ' гостей']);
      ad.querySelector('.popup__text--capacity').textContent = item.offer.rooms + roomString + ' для ' + item.offer.guests + guestString;
      ad.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;
      ad.querySelector('.popup__description').textContent = item.offer.description;
      generateFeatures(item.offer.features, ad);
      renderPhotos(item.offer.photos, ad);
      ad.querySelector('.popup__avatar').src = item.author.avatar;
      renderedCards.appendChild(ad);
    });

    return renderedCards;
  };
})();
