'use strict';

(function () {
  window.map = {};
  window.map.map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adFormAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  window.map.mapOverlay = document.querySelector('.map__overlay');
  window.load(window.render.renderPins, window.errorHandler);


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
      if (!(mainPinX < 0) && !(mainPinX > window.map.map.offsetWidth - mainPin.offsetWidth)) {
        mainPin.style.left = (mainPinX) + 'px';
      }
      if (!(mainPinY < 130) && !(mainPinY > 630)) {
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
  window.map.mapOverlay.style.zIndex = '10';
  mainPin.style.zIndex = '15';
  window.map.map.position = 'relative';
  adFormAddress.disabled = true;
  window.map.calculateAddress = function () {
    window.form.mainPinTop = Math.floor(mainPin.offsetTop + mainPin.offsetHeight + 22);
    window.form.mainPinLeft = Math.floor(mainPin.offsetLeft + mainPin.offsetWidth / 2);
    adFormAddress.value = window.form.mainPinLeft + ', ' + window.form.mainPinTop;
  };

  var enablePage = function () {
    adForm.classList.remove('ad-form--disabled');
    window.map.map.classList.remove('map--faded');
    window.map.mapOverlay.style.zIndex = '0';
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
    if (evt.keyCode === 27 && activeAdCard) {
      activeAdCard.classList.remove('active');
      activeAdCard.classList.add('hidden');
    }
  });
})();
