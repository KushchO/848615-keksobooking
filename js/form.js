'use strict';

(function () {
  var validateForm = function () {
    var form = document.querySelector('.ad-form');
    var formTitle = form.querySelector('#title');
    var formPrice = form.querySelector('#price');
    var formType = form.querySelector('#type');
    var formRoomNumber = form.querySelector('#room_number');
    var formGuestNumber = form.querySelector('#capacity');
    var formTimeIn = form.querySelector('#timein');
    var formTimeOut = form.querySelector('#timeout');
    formTitle.required = true;
    formTitle.min = 30;
    formTitle.max = 100;
    formPrice.required = true;
    formPrice.type = 'number';
    formPrice.max = 1000000;
    formPrice.min = 0;
    formPrice.value = 0;
    var setFormTypePresets = function () {
      if (formType.value === 'flat') {
        formPrice.min = 1000;
      }
      if (formType.value === 'house') {
        formPrice.min = 5000;
      }
      if (formType.value === 'palace') {
        formPrice.min = 10000;
      }
      if (formType.value === 'bungalo') {
        formPrice.min = 0;
      }
    };
    setFormTypePresets();
    formType.addEventListener('input', function () {
      setFormTypePresets();
    });
    var setGuestCapacity = function () {
      if (formRoomNumber.value === '1') {
        formGuestNumber.value = '1';
      }
      if (formRoomNumber.value === '2') {
        formGuestNumber.value = '2';
      }
      if (formRoomNumber.value === '3') {
        formGuestNumber.value = '3';
      }
      if (formRoomNumber.value === '100') {
        formGuestNumber.value = '0';
      }
    };
    setGuestCapacity();
    formRoomNumber.addEventListener('input', function () {
      setGuestCapacity();
    });
    formGuestNumber.addEventListener('input', function () {
      var validateInfo = '';
      switch (formRoomNumber.value) {
        case '1':
          if (formGuestNumber.value !== '1') {
            validateInfo = 'В одной комнате может проживать только один гость';
            formGuestNumber.setCustomValidity('validateInfo');
          }
          break;
        case '2':
          if (formGuestNumber.value === '3' || formGuestNumber.value === '0') {
            validateInfo = 'Две комнаты расчитаны для одного или двух гостей';
            formGuestNumber.setCustomValidity('validateInfo');
          }
          break;
        case '3':
          if (formGuestNumber.value === '0') {
            validateInfo = 'В трех комнтах могут проживать от 1 до 3 гостей';
            formGuestNumber.setCustomValidity('validateInfo');
          }
          break;
        case '100':
          if (formGuestNumber.value !== '0') {
            validateInfo = '100 не для гостей';
            formGuestNumber.setCustomValidity('validateInfo');
          }
          break;
      }
      formGuestNumber.setCustomValidity(validateInfo);
    });
    formTimeIn.addEventListener('input', function () {
      if (formTimeIn.value === '12:00') {
        formTimeOut.value = '12:00';
      }
      if (formTimeIn.value === '13:00') {
        formTimeOut.value = '13:00';
      }
      if (formTimeIn.value === '14:00') {
        formTimeOut.value = '14:00';
      }
    });
    formTimeOut.addEventListener('input', function () {
      if (formTimeOut.value === '12:00') {
        formTimeIn.value = '12:00';
      }
      if (formTimeOut.value === '13:00') {
        formTimeIn.value = '13:00';
      }
      if (formTimeOut.value === '14:00') {
        formTimeIn.value = '14:00';
      }
    });
  };
  validateForm();
})();
