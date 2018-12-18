'use strict';

(function () {
  window.render = {};
  var start = true;
  var pinBlock = document.querySelector('.map__pins');
  var mapFilters = document.querySelector('.map__filters-container');
  window.render.renderPins = function (adArray) {
    var pinsNumber = adArray.length > 5 ? 5 : adArray.length;
    if (start) {
      start = false;
      pinBlock.appendChild(window.pins.generatePins(adArray, pinsNumber));
      window.map.map.insertBefore(window.cards.generateAd(adArray, pinsNumber), mapFilters);
      bindPinsAndCards();
      window.sort.sortData(adArray);
    } else {
      var pins = window.map.map.querySelectorAll('.map__pin');
      pins.forEach(function (item) {
        if (!item.classList.contains('map__pin--main')) {
          var mapPins = document.querySelector('.map__pins');
          mapPins.removeChild(item);
        }
      });
      var cards = window.map.map.querySelectorAll('.map__card');
      cards.forEach(function (item) {
        window.map.map.removeChild(item);
      });
      pinBlock.appendChild(window.pins.generatePins(adArray, pinsNumber));
      window.map.map.insertBefore(window.cards.generateAd(adArray, pinsNumber), mapFilters);
      bindPinsAndCards();
    }
    return adArray;
  };

  var bindPinsAndCards = function () {
    var adCards = document.querySelectorAll('.map__card');
    Array.prototype.forEach.call(adCards, function (elem) {
      elem.classList.add('hidden');
    });
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
    var pins = document.querySelectorAll('.map__pin');
    for (var j = 1; j < pins.length; j++) {
      addPinClickHandler(pins[j], adCards[j - 1]);
    }
  };
})();

