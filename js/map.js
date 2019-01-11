'use strict';

(function () {

  var MIN_Y_COORDINATE = 60;
  var MAX_Y_COORDINATE = 560;
  var ESC_CODE = 27;
  var PIN_HALF_WIDTH = 32;
  var PIN_HEIGHT = 70;

  window.map = {};
  window.map.map = document.querySelector('.map');
  window.map.filterForm = document.querySelector('.map__filters');
  var filterFormElements = window.map.filterForm.querySelectorAll('input, select');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  window.map.mapOverlay = document.querySelector('.map__overlay');
  window.map.form = document.querySelector('.ad-form');
  window.map.advertisements = [];
  var mainPinComputedStyle = getComputedStyle(mainPin);
  var mainPinStartX = mainPinComputedStyle.left;
  var mainPinStartY = mainPinComputedStyle.top;

  window.map.calculateAddress = function () {
    window.map.form.mainPinTop = Math.floor(mainPin.offsetTop + PIN_HEIGHT);
    window.map.form.mainPinLeft = Math.floor(mainPin.offsetLeft + PIN_HALF_WIDTH);
    adFormAddress.value = window.map.form.mainPinLeft + ', ' + window.map.form.mainPinTop;
  };

  window.map.calculateAddress();

  window.makeAdvertisements = function (advertisements) {
    window.map.advertisements = advertisements;
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
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  Array.prototype.forEach.call(adFormFieldsets, function (elem) {
    elem.disabled = true;
  });
  window.map.mapOverlay.classList.add('map__overlay--start');
  window.map.filterForm.disabled = true;
  window.map.map.position = 'relative';
  filterFormElements.forEach(function (item) {
    item.disabled = true;
  });

  var enablePage = function () {
    adForm.classList.remove('ad-form--disabled');
    window.map.map.classList.remove('map--faded');
    window.map.mapOverlay.classList.remove('map__overlay--start');
    filterFormElements.forEach(function (item) {
      item.disabled = false;
    });
    Array.prototype.forEach.call(adFormFieldsets, function (elem) {
      elem.disabled = false;
    });
    var copyOfAdvertisements = window.map.advertisements.map(function (item) {
      return item;
    });
    window.render.renderAds(copyOfAdvertisements);
  };

  window.map.removePins = function () {
    var cards = window.map.map.querySelectorAll('.map__card');
    cards.forEach(function (item) {
      window.map.map.removeChild(item);
    });
    var pins = window.map.map.querySelectorAll('.map__pin');
    pins.forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        var mapPins = document.querySelector('.map__pins');
        mapPins.removeChild(item);
      }
    });
  };

  var hideActiveCard = function (activeAdCard) {
    activeAdCard.classList.remove('active');
    activeAdCard.classList.add('hidden');
  };

  window.map.disablePage = function () {
    mainPin.style.left = mainPinStartX;
    mainPin.style.top = mainPinStartY;
    var activeAdCard = window.map.map.querySelector('.active');
    if (activeAdCard) {
      hideActiveCard(activeAdCard);
    }
    adForm.classList.add('ad-form--disabled');
    window.map.map.classList.add('map--faded');
    window.map.mapOverlay.classList.add('map__overlay--start');
    firstMovement = true;
    window.map.removePins();
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
      hideActiveCard(activeAdCard);
    }
  });
})();
