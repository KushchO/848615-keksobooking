'use strict';

(function () {
  var pinFragment = document.createDocumentFragment();
  window.generatePins = function (array) {
    array.forEach(function (item) {
      var pin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
      pin.style = 'left: ' + item.location.x + 'px; top: ' + item.location.y + 'px';
      var pinImg = pin.querySelector('img');
      pinImg.src = item.author.avatar;
      pinImg.alt = item.offer.title;
      pinImg.draggable = false;
      pinFragment.appendChild(pin);
    });
    return pinFragment;
  };
})();
