'use strict';

(function () {
  window.utilitiStartPage = {};

  Array.prototype.forEach.call(window.variables.adFormFieldsets, function (elem) {
    elem.disabled = true;
  });
  Array.prototype.forEach.call(window.generatePins.adCards, function (elem) {
    elem.classList.add('hidden');

  });
  window.variables.mapOverlay.style.zIndex = '10';
  window.variables.mainPin.style.zIndex = '15';
  window.variables.map.position = 'relative';
  window.variables.adFormAddress.disabled = true;
  window.utilitiStartPage.calculateAddress = function () {
    var mainPinTop = Math.floor(window.variables.mainPin.offsetTop + window.variables.mainPin.offsetHeight + 22);
    var mainPinLeft = Math.floor(window.variables.mainPin.offsetLeft + window.variables.mainPin.offsetWidth / 2);
    window.variables.adFormAddress.placeholder = mainPinLeft + ', ' + mainPinTop;
  };

  window.utilitiStartPage.enablePage = function () {
    window.variables.adForm.classList.remove('ad-form--disabled');
    window.variables.map.classList.remove('map--faded');
    window.variables.mapOverlay.style.zIndex = '0';
    Array.prototype.forEach.call(window.variables.adFormFieldsets, function (elem) {
      elem.disabled = false;
    });
  };
})();
