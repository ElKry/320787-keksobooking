'use strict';

window.initPins = (function () {
  var ENTER_KEY_CODE = 13;

  var isActivateEvent = function (evt) {
    return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
  };

  var removeClass = function (pinsElements, className) {
    for (var j = 0; j < pinsElements.length; j++) {
      pinsElements[j].classList.remove(className);
      pinsElements[j].setAttribute('aria-pressed', 'false');
    }
  };

  var showDialog = function (targetPinElement, pins, dialog) {
    removeClass(pins, 'pin--active');
    targetPinElement.classList.add('pin--active');
    targetPinElement.setAttribute('aria-pressed', 'true');
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', 'false');
  };

  var hideDialog = function (pins, dialog) {
    dialog.style.display = 'none';
    removeClass(pins, 'pin--active');
    dialog.setAttribute('aria-hidden', 'true');
  };

  return {
    initializePins: function (pinsE, pinMap, dialogE, dialogClose) {

      pinMap.addEventListener('click', function (evt) {
        var targetPin = evt.target.parentNode;
        if (targetPin.classList.contains('pin')) {
          showDialog(evt.target.parentNode, pinsE, dialogE);
        }
      });

      pinMap.addEventListener('keydown', function (evt) {
        var targetPin = evt.target;
        if (targetPin.classList.contains('pin') && isActivateEvent(evt)) {
          showDialog(evt.target, pinsE, dialogE);
        }
      });

      dialogClose.addEventListener('click', function () {
        hideDialog(pinsE, dialogE);
      });

      dialogClose.addEventListener('keydown', function (evt) {
        if (isActivateEvent(evt)) {
          hideDialog(pinsE, dialogE);
        }
      });
    }
  };
})();
