'use strict';

(function () {
  window.variables = {};
  /* Создаем переменные и  */
  window.variables.fragment = document.createDocumentFragment();
  window.variables.pinBlock = document.querySelector('.map__pins');
  window.variables.map = document.querySelector('.map');
  window.variables.mapFilters = document.querySelector('.map__filters-container');
  window.variables.mainPin = document.querySelector('.map__pin--main');
  window.variables.adFormAddress = document.querySelector('#address');
  window.variables.adForm = document.querySelector('.ad-form');
  window.variables.mapOverlay = document.querySelector('.map__overlay');
  window.variables.adFormFieldsets = window.variables.adForm.querySelectorAll('fieldset');
})();
