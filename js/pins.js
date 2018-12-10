'use strict';

(function () {
  window.generatePins = {};
  var generatePins = function () {
    for (var i = 0; i < 8; i++) {
      var pin = document.createElement('button');
      var pinImg = document.createElement('img');
      /* Генерим button */
      pin.classList.add('map__pin');
      pin.style = 'left: ' + (window.data.locationListX[i] + 25) + 'px; top: ' + (window.data.locationListY[i]) + 'px';
      pin.setAttribute('type', 'button');
      /* Генерим img */
      pinImg.src = window.data.adArray[i].author.avatar;
      pinImg.alt = window.data.adArray[i].offer.title;
      pinImg.draggable = false;
      pinImg.width = 40;
      pinImg.height = 40;
      pin.appendChild(pinImg);
      window.cards.fragment.appendChild(pin);
    }
  };
  generatePins();
  var pinBlock = document.querySelector('.map__pins');
  pinBlock.appendChild(window.cards.fragment);
})();
