'use strict';

(function () {
  var MIN_TITLE_SIZE = 30;
  var MAX_TITLE_SIZE = 100;
  var FLAT_MIN_PRICE = 1000;
  var HOUSE_MAX_PRICE = 1000000;
  var NO_GUESTS = 0;
  var NOT__FOR_GUESTS = 100;
  var DEFAULT_NUMBER_OF_GUESTS = 2;
  var SHOW_FORM_SEND_RESULT_PAUSE = 2000;

  var form = document.querySelector('.ad-form');
  window.form = form;
  var validateForm = function () {
    var formTitle = form.querySelector('#title');
    var formHousePrice = form.querySelector('#price');
    var formAddress = form.querySelector('#address');
    var formHouseType = form.querySelector('#type');
    var formRoomNumber = form.querySelector('#room_number');
    var formTimeIn = form.querySelector('#timein');
    var formTimeOut = form.querySelector('#timeout');
    formTitle.required = true;
    var fistTimePriceFlag;

    var HouseTypePrice = {
      flat: 1000,
      bungalo: 0,
      house: 5000,
      palace: 10000
    };

    var titleChangeHandler = function () {
      formTitle.minLength = MIN_TITLE_SIZE;
      formTitle.maxLength = MAX_TITLE_SIZE;
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
      formHousePrice.min = FLAT_MIN_PRICE;
      if (fistTimePriceFlag) {
        fistTimePriceFlag = false;
        formHousePrice.value = HouseTypePrice[formHouseType.value];
      }
      if (evt) {
        formHousePrice.min = HouseTypePrice[evt.target.value];
      }
    };

    var activateField = function (fieldNumber, field) {
      field[fieldNumber].selected = true;
      field[fieldNumber].disabled = false;
    };

    var setGuestsNumber = function (evt) {
      var guestNumOptions = document.querySelectorAll('#capacity option');
      guestNumOptions.forEach(function (item) {
        item.disabled = true;
      });
      if (fistTimePriceFlag) {
        activateField(DEFAULT_NUMBER_OF_GUESTS, guestNumOptions);
        return;
      }
      for (var i = 0; i < guestNumOptions.length; i++) {
        if (guestNumOptions[i].value <= evt.target.value && +evt.target.value !== NOT__FOR_GUESTS && +guestNumOptions[i].value !== NO_GUESTS) {
          guestNumOptions[i].disabled = false;
          if (guestNumOptions[i].value === evt.target.value) {
            guestNumOptions[i].selected = true;
          }
        }
        if (+guestNumOptions[i].value === NO_GUESTS && +evt.target.value === NOT__FOR_GUESTS) {
          activateField(i, guestNumOptions);
        }
      }
    };

    var setFormDefault = function () {
      formHousePrice.max = HOUSE_MAX_PRICE;
      fistTimePriceFlag = true;
      setGuestsNumber();
      setMinPrice();
    };

    setFormDefault();
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
      }, SHOW_FORM_SEND_RESULT_PAUSE);
      window.map.calculateAddress();
      setFormDefault();
    };

    window.errorHandler = function (errorText) {
      var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
      var errorButton = error.querySelector('.error__button');
      error.querySelector('.error__message').textContent = errorText;
      main.insertBefore(error, promo);
      errorButton.addEventListener('click', function () {
        main.removeChild(error);
      });

    };
  };
  validateForm();
})();

