'use strict';

(function () {

  var MIN_Y_COORDINATE = 130;
  var MAX_Y_COORDINATE = 630;
  var ESC_CODE = 27;
  var PIN_HALF_HEIGHT = 22;

  window.map = {};
  window.map.map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  window.map.mapOverlay = document.querySelector('.map__overlay');
  window.map.advertisements = [];

  window.makeAdvertisements = function (advertisements) {
    window.map.advertisements = advertisements;
    var copyOfAdvertisements = window.map.advertisements.map(function (item) {
      return item;
    });
    window.render.renderPins(copyOfAdvertisements);
  };

  window.load(window.makeAdvertisements, window.errorHandler);

  var firstMovement = true;

  mainPin.addEventListener('mousedown', function (evt) {
    if (firstMovement) {
      firstMovement = false;
      enablePage();
    }
    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (e) {
      e.preventDefault();

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
      if (!(mainPinX < 0) && !(mainPinX > window.map.map.offsetWidth - mainPin.offsetWidth)) {
        mainPin.style.left = (mainPinX) + 'px';
      }
      if (!(mainPinY < MIN_Y_COORDINATE) && !(mainPinY > MAX_Y_COORDINATE)) {
        mainPin.style.top = (mainPinY) + 'px';
      }
      window.map.calculateAddress();
    };
    var onMouseUp = function (e) {
      e.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.map.calculateAddress();
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  Array.prototype.forEach.call(adFormFieldsets, function (elem) {
    elem.disabled = true;
  });
  window.map.mapOverlay.classList.add('map__overlay--start');
  window.map.map.position = 'relative';
  adFormAddress.disabled = true;
  window.map.calculateAddress = function () {
    window.form.mainPinTop = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + PIN_HALF_HEIGHT);
    window.form.mainPinLeft = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    adFormAddress.value = window.form.mainPinLeft + ', ' + window.form.mainPinTop;
  };

  var enablePage = function () {
    adForm.classList.remove('ad-form--disabled');
    window.map.map.classList.remove('map--faded');
    window.map.mapOverlay.classList.remove('map__overlay--start');
    Array.prototype.forEach.call(adFormFieldsets, function (elem) {
      elem.disabled = false;
    });
  };
  window.map.map.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.className === 'popup__close') {
      target.parentNode.classList.add('hidden');
      target.parentNode.classList.remove('active');
    }
  });
  document.addEventListener('keydown', function (evt) {
    var activeAdCard = window.map.map.querySelector('.active');
    if (evt.keyCode === ESC_CODE && activeAdCard) {
      activeAdCard.classList.remove('active');
      activeAdCard.classList.add('hidden');
    }
  });
})();
