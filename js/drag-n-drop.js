'use strict';

window.variables.mainPin.addEventListener('mousedown', function (evt) {
  var startCoordinats = {
    x: evt.clientX,
    y: evt.clientY
  };

  var firstMovement = false;

  var onMouseMove = function (e) {
    e.preventDefault();
    if (!firstMovement) {
      firstMovement = true;
      window.utilitiStartPage.enablePage();
    }
    var shift = {
      x: startCoordinats.x - e.clientX,
      y: startCoordinats.y - e.clientY
    };

    startCoordinats = {
      x: e.clientX,
      y: e.clientY
    };
    var mainPinY = window.variables.mainPin.offsetTop - shift.y;
    var mainPinX = window.variables.mainPin.offsetLeft - shift.x;
    if (!(mainPinX < 0) && !(mainPinX > window.variables.map.offsetWidth - window.variables.mainPin.offsetWidth)) {
      window.variables.mainPin.style.left = (mainPinX) + 'px';
    }
    if (!(mainPinY < 130) && !(mainPinY > 630)) {
      window.variables.mainPin.style.top = (mainPinY) + 'px';
    }


    window.utilitiStartPage.calculateAddress();
  };

  var onMouseUp = function (e) {
    e.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    window.utilitiStartPage.calculateAddress();
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
