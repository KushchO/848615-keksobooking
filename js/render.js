'use strict';

(function () {
  window.render = {};
  var start = true;
  var pinBlock = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');

  var renderPinsAndCards = function (advertisements) {
    pinBlock.appendChild(window.generatePins(advertisements));
    window.map.map.insertBefore(window.renderCards(advertisements), mapFilters);
    bindPinsAndCards();
  };

  window.render.renderAds = function (advertisements) {
    var cropedAdvertisements = window.filter.cropArray(advertisements, window.filter.MAX_NUMPER_OF_PINS);
    if (start) {
      start = false;
      renderPinsAndCards(cropedAdvertisements);
      window.filter.filterData(advertisements);
    } else {
      window.map.removePins();
      renderPinsAndCards(cropedAdvertisements);
    }
    return advertisements;
  };

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

  var bindPinsAndCards = function () {
    var adCards = document.querySelectorAll('.map__card');
    Array.prototype.forEach.call(adCards, function (elem) {
      elem.classList.add('hidden');
    });

    var pins = document.querySelectorAll('.map__pin');
    for (var j = 1; j < pins.length; j++) {
      addPinClickHandler(pins[j], adCards[j - 1]);
    }
  };
})();

