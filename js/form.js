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
  var DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';

  var HouseTypePrice = {
    FLAT: 1000,
    BUNGALO: 0,
    HOUSE: 5000,
    PALACE: 10000
  };

  var form = window.map.form;


  var formTitle = form.querySelector('#title');
  var formHousePrice = form.querySelector('#price');
  var formAddress = form.querySelector('#address');
  var formHouseType = form.querySelector('#type');
  var formRoomNumber = form.querySelector('#room_number');
  var formTimeIn = form.querySelector('#timein');
  var formTimeOut = form.querySelector('#timeout');
  formAddress.readOnly = true;
  formTitle.required = true;
  formHousePrice.required = true;
  var fistTimePriceFlag;

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
      formHousePrice.placeholder = HouseTypePrice[formHouseType.value.toUpperCase()];
    }
    if (evt) {
      formHousePrice.min = HouseTypePrice[evt.target.value];
      formHousePrice.placeholder = HouseTypePrice[evt.target.value.toUpperCase()];
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
    var optionNumber = 0;
    guestNumOptions.forEach(function (item) {
      if (item.value <= evt.target.value && +evt.target.value !== NOT__FOR_GUESTS && +item.value !== NO_GUESTS) {
        item.disabled = false;
        if (item.value === evt.target.value) {
          item.selected = true;
        }
      }
      if (+item.value === NO_GUESTS && +evt.target.value === NOT__FOR_GUESTS) {
        activateField(optionNumber, guestNumOptions);
      }
      optionNumber++;
    });

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
    var adFormData = new FormData(form);
    window.send(adFormData, submitFormHandler, window.errorHandler);
  });

  var main = document.querySelector('main');
  var promo = document.querySelector('.promo');

  var deleteUploadedImages = function () {
    window.upload.avatar.src = DEFAULT_AVATAR_IMAGE;
    var uploadedAdImages = form.querySelectorAll('.ad-form__photo');
    if (uploadedAdImages.length !== 0) {
      uploadedAdImages.forEach(function (item) {
        window.upload.uploadContainer.removeChild(item);
      });
      var emptyadImagesBlock = window.upload.adImagesBlock.cloneNode();
      window.upload.uploadContainer.appendChild(emptyadImagesBlock);

    }
  };

  var submitFormHandler = function () {
    var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    main.insertBefore(success, promo);
    setTimeout(function () {
      main.removeChild(success);
    }, SHOW_FORM_SEND_RESULT_PAUSE);
    resetForm();
  };

  var resetForm = function () {
    form.reset();
    window.map.disablePage();
    setFormDefault();
    deleteUploadedImages();
    window.map.calculateAddress();
  };

  var resetFormButton = document.querySelector('.ad-form__reset');
  resetFormButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetForm();
  });

  window.errorHandler = function (errorText) {
    var error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    var errorButton = error.querySelector('.error__button');
    error.querySelector('.error__message').textContent = errorText;
    main.insertBefore(error, promo);
    errorButton.addEventListener('click', function () {
      main.removeChild(error);
    });
  };
})();

