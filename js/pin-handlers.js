'use strict';

(function () {
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
    addPinClickHandler(pins[j], window.generatePins.adCards[j - 1]);
  }
  window.variables.map.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className === 'popup__close') {
      target.parentNode.classList.add('hidden');
      target.parentNode.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (evt) {
    var activeAdCard = window.variables.map.querySelector('.active');
    if (evt.keyCode === 27 && activeAdCard) {
      activeAdCard.classList.remove('active');
      activeAdCard.classList.add('hidden');
    }
  });
})();
