'use strict';

(function () {
  window.filter = {};

  var filterForm = document.querySelector('.map__filters');
  var checkboxes = Array.from(filterForm.querySelectorAll('[type=checkbox]'));

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomSelect = document.querySelector('#housing-rooms');
  var guestSelect = document.querySelector('#housing-guests');

  window.filter.MAX_NUMPER_OF_PINS = 5;

  var selectType = function (ad) {
    switch (typeSelect.value) {
      case 'any':
        return true;
      default:
        return ad.offer.type === typeSelect.value;
    }
  };

  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;
  var DEBOUNCE_PAUSE = 700;

  var selectPrice = function (ad) {
    switch (priceSelect.value) {
      case 'any':
        return true;

      case 'middle':
        return ad.offer.price >= MIN_PRICE_VALUE && ad.offer.price <= MAX_PRICE_VALUE;

      case 'low':
        return ad.offer.price < MIN_PRICE_VALUE;

      default:
        return ad.offer.price > MAX_PRICE_VALUE;
    }
  };

  var selectRooms = function (ad) {
    switch (roomSelect.value) {
      case 'any':
        return true;

      default:
        return ad.offer.rooms === +roomSelect.value;
    }
  };
  var selectGuests = function (ad) {
    switch (guestSelect.value) {
      case 'any':
        return true;

      default:
        return ad.offer.guests === +guestSelect.value;
    }
  };

  var selectFeatures = function (features, ad) {
    if (features.length) {
      return features.every(function (feature) {
        return ad.offer.features.includes(feature.value);
      });
    }
    return true;
  };

  var filteringData = function (advertisements) {
    var requiredFeatures = checkboxes.filter(function (item) {
      return item.checked;
    });
    var filteredPins = advertisements.filter(function (item) {
      return selectType(item) &&
             selectPrice(item) &&
             selectRooms(item) &&
             selectGuests(item) &&
             selectFeatures(requiredFeatures, item);
    });

    return window.filter.cropArray(filteredPins, window.filter.MAX_NUMPER_OF_PINS);
  };

  window.filter.cropArray = function (anyArray, number) {
    if (anyArray.length > number) {
      anyArray.length = number;
      return anyArray;
    }

    return anyArray;
  };

  var filterHandler = function () {
    var advertisements = window.map.advertisements.map(function (item) {
      return item;
    });
    var timerID;
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = window.setTimeout(function () {
      window.render.renderPins(filteringData(advertisements));
    }, DEBOUNCE_PAUSE);
  };

  window.filter.filterData = function () {
    filterForm.addEventListener('change', filterHandler);
  };
})();
