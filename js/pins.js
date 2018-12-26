'use strict';

(function () {
  var pinFragment = document.createDocumentFragment();
  window.generatePins = function (array) {
    for (var i = 0; i < array.length; i++) {
      var pin = document.querySelector('#pin').content.querySelector('.map__pin').cloneNode(true);
      pin.style = 'left: ' + array[i].location.x + 'px; top: ' + array[i].location.y + 'px';
      var pinImg = pin.querySelector('img');
      pinImg.src = array[i].author.avatar;
      pinImg.alt = array[i].offer.title;
      pinImg.draggable = false;
      pinFragment.appendChild(pin);
    }
    return pinFragment;
  };
})();
