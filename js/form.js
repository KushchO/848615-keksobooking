'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var validateForm = function () {
    window.form = form;
    var formTitle = form.querySelector('#title');
    var formHousePrice = form.querySelector('#price');
    var formAddress = form.querySelector('#address');
    var formHouseType = form.querySelector('#type');
    var formRoomNumber = form.querySelector('#room_number');
    var formTimeIn = form.querySelector('#timein');
    var formTimeOut = form.querySelector('#timeout');
    formTitle.required = true;
    var fistTimePriceFlag = true;

    var HouseTypePrice = {
      flat: 1000,
      bungalo: 0,
      house: 5000,
      palace: 10000
    };

    var titleChangeHandler = function () {
      formTitle.minLength = 30;
      formTitle.maxLength = 100;
    };

    var typeChangeHandler = function (evt) {
      setMinPrice(evt);
    };

    var roomChangeHandler = function (evt) {
      setGuestsNumber(evt);
    };

    var syncTime = function (evt) {
      formTimeIn.value = formTimeOut.value = evt.target.value;
    };

    var timeInChangeHandler = function (evt) {
      syncTime(evt);
    };

    var timeOutChangeHandler = function (evt) {
      syncTime(evt);
    };

    var setMinPrice = function (evt) {
      formHousePrice.min = 1000;
      if (fistTimePriceFlag) {
        fistTimePriceFlag = false;
        formHousePrice.value = HouseTypePrice[formHouseType.value];
      }
      if (evt) {
        formHousePrice.min = HouseTypePrice[evt.target.value];
      }
    };

    var setGuestsNumber = function (evt) {
      var guestNumOptions = document.querySelectorAll('#capacity option');
      guestNumOptions.forEach(function (item) {
        item.disabled = true;
      });
      for (var i = 0; i < guestNumOptions.length; i++) {
        if (guestNumOptions[i].value <= evt.target.value && evt.target.value !== '100' && guestNumOptions[i].value !== '0') {
          guestNumOptions[i].disabled = false;
          if (guestNumOptions[i].value === evt.target.value) {
            guestNumOptions[i].selected = true;
          }
        }
        if (+guestNumOptions[i].value === 0 && evt.target.value === '100') {

          guestNumOptions[i].selected = true;
          guestNumOptions[i].disabled = false;
        }
      }
    };

    setMinPrice();
    formTitle.addEventListener('change', titleChangeHandler);
    formTimeIn.addEventListener('change', timeInChangeHandler);
    formTimeOut.addEventListener('change', timeOutChangeHandler);
    formHouseType.addEventListener('change', typeChangeHandler);
    formRoomNumber.addEventListener('change', roomChangeHandler);

    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      formAddress.disabled = false;
      var adFormData = new FormData(window.form);
      window.send(adFormData, resetForm, window.errorHandler);
    });

    var main = document.querySelector('main');
    var promo = document.querySelector('.promo');

    var resetForm = function () {
      var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
      main.insertBefore(success, promo);
      form.reset();
      setTimeout(function () {
        main.removeChild(success);
      }, 2000);
      window.map.calculateAddress();
    };

    window.errorHandler = function (errorText) {
      var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      error.querySelector('.error__message').textContent = errorText;
      main.insertBefore(error, promo);
    };
  };
  validateForm();
})();

