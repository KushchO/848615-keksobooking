'use strict';

(function () {
  window.map = {};
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapOverlay = document.querySelector('.map__overlay');
  var mapFilters = document.querySelector('.map__filters-container');
  map.insertBefore(window.cards.fragmentCards, mapFilters);
  var adCards = document.querySelectorAll('.map__card');
  mainPin.addEventListener('mousedown', function (evt) {
    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY
    };
    var firstMovement = false;
    var onMouseMove = function (e) {
      e.preventDefault();
      if (!firstMovement) {
        firstMovement = true;
        enablePage();
      }
      var shift = {
        x: startCoordinats.x - e.clientX,
        y: startCoordinats.y - e.clientY
      };
      startCoordinats = {
        x: e.clientX,
        y: e.clientY
      };
      var mainPinY = mainPin.offsetTop - shift.y;
      var mainPinX = mainPin.offsetLeft - shift.x;
      if (!(mainPinX < 0) && !(mainPinX > map.offsetWidth - mainPin.offsetWidth)) {
        mainPin.style.left = (mainPinX) + 'px';
      }
      if (!(mainPinY < 130) && !(mainPinY > 630)) {
        mainPin.style.top = (mainPinY) + 'px';
      }
      window.utilitiStartPage.calculateAddress();
    };
    var onMouseUp = function (e) {
      e.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.utilitiStartPage.calculateAddress();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.utilitiStartPage = {};

  Array.prototype.forEach.call(adFormFieldsets, function (elem) {
    elem.disabled = true;
  });
  Array.prototype.forEach.call(adCards, function (elem) {
    elem.classList.add('hidden');

  });
  mapOverlay.style.zIndex = '10';
  mainPin.style.zIndex = '15';
  map.position = 'relative';
  adFormAddress.disabled = true;
  window.utilitiStartPage.calculateAddress = function () {
    var mainPinTop = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + 22);
    var mainPinLeft = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    adFormAddress.placeholder = mainPinLeft + ', ' + mainPinTop;
  };

  var enablePage = function () {
    adForm.classList.remove('ad-form--disabled');
    map.classList.remove('map--faded');
    mapOverlay.style.zIndex = '0';
    Array.prototype.forEach.call(adFormFieldsets, function (elem) {
      elem.disabled = false;
    });
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
  var pins = document.querySelectorAll('.map__pin');
  for (var j = 1; j < pins.length; j++) {
    addPinClickHandler(pins[j], adCards[j - 1]);
  }
  map.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className === 'popup__close') {
      target.parentNode.classList.add('hidden');
      target.parentNode.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (evt) {
    var activeAdCard = map.querySelector('.active');
    if (evt.keyCode === 27 && activeAdCard) {
      activeAdCard.classList.remove('active');
      activeAdCard.classList.add('hidden');
    }
  });
})();
