'use strict';

(function () {
  window.filter = {};

  var adFiltersform = document.querySelector('.map__filters');
  var filterForm = document.querySelector('.map__filters');

  var checkboxes = Array.from(adFiltersform.querySelectorAll('[type=checkbox]'));

  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = document.querySelector('#housing-price');
  var roomSelect = document.querySelector('#housing-rooms');
  var guestSelect = document.querySelector('#housing-guests');

  window.filter.MAX_NUMPER_OF_PINS = 5;

  var selectType = function (ad) {
    switch (typeSelect.value) {
      case 'any':
        return true;
      default:
        return ad.offer.type === typeSelect.value;
    }
  };

  var MIN_PRICE_VALUE = 10000;
  var MAX_PRICE_VALUE = 50000;

  var selectPrice = function (ad) {
    switch (priceSelect.value) {
      case 'any':
        return true;

      case 'middle':
        return ad.offer.price >= MIN_PRICE_VALUE && ad.offer.price <= MAX_PRICE_VALUE;

      case 'low':
        return ad.offer.price < MIN_PRICE_VALUE;

      default:
        return ad.offer.price > MAX_PRICE_VALUE;
    }
  };

  var selectRooms = function (ad) {
    switch (roomSelect.value) {
      case 'any':
        return true;

      default:
        return ad.offer.rooms === +roomSelect.value;
    }
  };
  var selectGuests = function (ad) {
    switch (guestSelect.value) {
      case 'any':
        return true;

      default:
        return ad.offer.guests === +guestSelect.value;
    }
  };

  var selectFeatures = function (features, ad) {
    if (features.length) {
      return features.every(function (feature) {
        return ad.offer.features.include(feature);
      });
    }
    return true;
  };

  var filteringData = function (adArray) {
    console.log(adArray);
    var requiredFeatures = checkboxes.filter(function (item) {
      return item.checked;
    });
    console.log(requiredFeatures);

    var filteredPins = adArray.filter(function (item) {
      console.log(selectType(item));
      console.log(selectPrice(item));
      console.log(selectRooms(item));
      console.log(selectGuests(item));
      console.log(selectFeatures(requiredFeatures, item));
      return selectType(item) &&
             selectPrice(item) &&
             selectRooms(item) &&
             selectGuests(item) &&
             selectFeatures(requiredFeatures, item);
    });
    console.log(filteredPins);
    return window.filter.cropArray(filteredPins, window.filter.MAX_NUMPER_OF_PINS);
  };

  window.filter.cropArray = function (anyArray, number) {
    if (anyArray.length > number) {
      anyArray.length = number;
      return anyArray;
    }

    return anyArray;
  };

  var filterHandler = function (adArray) {
    var timerID;
    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = window.setTimeout(function () {
      window.render.renderPins(filteringData(adArray));
    }, 700);
  };

  window.filter.filterData = function (adArray) {
    filterForm.addEventListener('change', filterHandler(adArray));
  };

  // window.sort = {};
  // window.sort.sortData = function (adArray) {
  //   var sortFormElements = document.querySelector('.map__filters').elements;
  //   var sortForm = document.querySelector('.map__filters');
  //   var sortFormList = {};
  //   var filteredArray = [];

  //   sortForm.addEventListener('change', function () {
  //     filteredArray = adArray;
  //     var features = [];
  //     for (var i = 0; i < sortFormElements.length; i++) {
  //       switch (sortFormElements[i].type) {
  //         case 'checkbox':
  //           if (sortFormElements[i].checked) {
  //             features.push(sortFormElements[i].value);
  //           }
  //           break;
  //         case 'select-one':
  //           var name = sortFormElements[i].name.substring(sortFormElements[i].name.indexOf('-') + 1);
  //           sortFormList[name] = sortFormElements[i].value;
  //           break;
  //         default:
  //           break;
  //       }
  //     }
  //     sortFormList.features = features;

  //     var compareType = function (adVAlue, formVAlue, formKey) {
  //       switch (formKey) {
  //         case 'type':
  //           if (formVAlue === 'any') {
  //             return true;
  //           }
  //           return adVAlue.toString() === formVAlue.toString() ? true : false;
  //         case 'guests':
  //           if (formVAlue === 'any') {
  //             return true;
  //           }
  //           return adVAlue.toString() === formVAlue.toString() ? true : false;
  //         case 'rooms':
  //           if (formVAlue === 'any') {
  //             return true;
  //           }
  //           return adVAlue.toString() === formVAlue.toString() ? true : false;
  //         case 'price':
  //           if (formVAlue === 'any') {
  //             return true;
  //           }
  //           switch (formVAlue) {
  //             case 'low':
  //               return adVAlue < 10000 && adVAlue >= 0 ? true : false;
  //             case 'middle':
  //               return adVAlue >= 10000 && adVAlue <= 50000 ? true : false;
  //             case 'high':
  //               return adVAlue > 50000 ? true : false;
  //           }
  //           return false;
  //         case 'features':
  //           if (formVAlue.length === 0) {
  //             return true;
  //           }
  //           return formVAlue.every(function (item) {
  //             return (adVAlue.indexOf(item) !== -1);
  //           });
  //         default:
  //           return false;
  //       }
  //     };

  //     for (var key in sortFormList) {
  //       if (sortFormList.hasOwnProperty(key)) {
  //         filteredArray = filteredArray.filter(function (item) {
  //           return compareType(item.offer[key], sortFormList[key], key);
  //         });
  //       }
  //     }


  //   });
  // };
})();
