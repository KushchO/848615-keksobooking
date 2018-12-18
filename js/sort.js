'use strict';

(function () {
  window.sort = {};
  window.sort.sortData = function (adArray) {
    var sortFormElements = document.querySelector('.map__filters').elements;
    var sortForm = document.querySelector('.map__filters');
    var sortFormList = {};
    var filteredArray = [];

    sortForm.addEventListener('change', function () {
      filteredArray = adArray;
      var features = [];
      for (var i = 0; i < sortFormElements.length; i++) {
        switch (sortFormElements[i].type) {
          case 'checkbox':
            if (sortFormElements[i].checked) {
              features.push(sortFormElements[i].value);
            }
            break;
          case 'select-one':
            var name = sortFormElements[i].name.substring(sortFormElements[i].name.indexOf('-') + 1);
            sortFormList[name] = sortFormElements[i].value;
            break;
          default:
            break;
        }
      }
      sortFormList.features = features;

      var compareType = function (adVAlue, formVAlue, formKey) {
        switch (formKey) {
          case 'type':
            if (formVAlue === 'any') {
              return true;
            }
            return adVAlue.toString() === formVAlue.toString() ? true : false;
          case 'guests':
            if (formVAlue === 'any') {
              return true;
            }
            return adVAlue.toString() === formVAlue.toString() ? true : false;
          case 'rooms':
            if (formVAlue === 'any') {
              return true;
            }
            return adVAlue.toString() === formVAlue.toString() ? true : false;
          case 'price':
            if (formVAlue === 'any') {
              return true;
            }
            switch (formVAlue) {
              case 'low':
                return adVAlue < 10000 && adVAlue >= 0 ? true : false;
              case 'middle':
                return adVAlue >= 10000 && adVAlue <= 50000 ? true : false;
              case 'high':
                return adVAlue > 50000 ? true : false;
            }
            return false;
          case 'features':
            if (formVAlue.length === 0) {
              return true;
            }
            return formVAlue.every(function (item) {
              return (adVAlue.indexOf(item) !== -1);
            });
          default:
            return false;
        }
      };

      for (var key in sortFormList) {
        if (sortFormList.hasOwnProperty(key)) {
          filteredArray = filteredArray.filter(function (item) {
            return compareType(item.offer[key], sortFormList[key], key);
          });
        }
      }
      var timerID;
      if (timerID) {
        clearTimeout(timerID);
      }
      timerID = window.setTimeout(function () {
        window.render.renderPins(filteredArray);
      }, 700);

    });
  };
})();
