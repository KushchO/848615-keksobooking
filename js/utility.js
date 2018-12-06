'use strict';

(function () {
  window.utility = {};
  window.utility.getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.utility.shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  window.utility.declOfNum = function (number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  };

  window.utility.createElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    if (className.constructor.name === 'Array') {
      for (var i = 0; i < className.length; i++) {
        element.classList.add(className[i]);
      }
    } else {
      element.classList.add(className);
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  };
})();
