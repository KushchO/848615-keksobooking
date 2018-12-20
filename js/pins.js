'use strict';

(function () {
  window.pins = {};
  window.pins.pinFragment = document.createDocumentFragment();
  window.pins.generatePins = function (array, pinsNumber) {
    for (var i = 0; i < pinsNumber; i++) {
      var pin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
      pin.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px';
      var pinImg = pin.querySelector('img');
      pinImg.src = array[i].author.avatar;
      pinImg.alt = array[i].offer.title;
      pinImg.draggable = false;
      pinImg.width = 40;
      pinImg.height = 40;
      window.pins.pinFragment.appendChild(pin);
    }
    return window.pins.pinFragment;
  };
})();
