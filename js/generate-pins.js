'use strict';

(function () {
  window.generatePins = {};
  var generatePins = function () {
    for (var i = 0; i < 8; i++) {
      var pin = document.createElement('button');
      var pinImg = document.createElement('img');
      /* Генерим button */
      pin.classList.add('map__pin');
      pin.style = 'left: ' + (window.generateArryas.locationListX[i] + 25) + 'px; top: ' + (window.generateArryas.locationListY[i]) + 'px';
      pin.setAttribute('type', 'button');
      /* Генерим img */
      pinImg.src = window.generateArryas.adArray[i].author.avatar;
      pinImg.alt = window.generateArryas.adArray[i].offer.title;
      pinImg.draggable = false;
      pinImg.width = 40;
      pinImg.height = 40;
      pin.appendChild(pinImg);
      window.variables.fragment.appendChild(pin);
    }
  };
  generatePins();
  window.variables.pinBlock.appendChild(window.variables.fragment);
  window.generatePins.adCards = document.querySelectorAll('.map__card');
})();
