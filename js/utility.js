'use strict';

(function () {
  window.utility = {};

  window.utility.pluralize = function (value, args) {
    var cases = [2, 0, 1, 1, 1, 2];
    var isMany = value % 100 > 4 && value % 100 < 20;

    if (isMany) {
      return args[2];
    }

    var positionInCases = value % 10 < 5 ? value % 10 : 5;

    return args[cases[positionInCases]];
  };

  window.utility.createElement = function (tagName, className, text) {
    var element = document.createElement(tagName);
    if (className.constructor.name === 'Array') {
      className.forEach(function (item) {
        element.classList.add(item);
      });
    } else {
      element.classList.add(className);
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  };
})();
