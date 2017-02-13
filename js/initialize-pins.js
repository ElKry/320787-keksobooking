'use strict';

window.initializePins = function (pins, pinMap, dialog, dialogClose) {
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

  var showDialog = function (targetPinElement) {
    removeClass(pins, 'pin--active');
    targetPinElement.classList.add('pin--active');
    targetPinElement.setAttribute('aria-pressed', 'true');
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', 'false');
  };

  var hideDialog = function () {
    dialog.style.display = 'none';
    removeClass(pins, 'pin--active');
    dialog.setAttribute('aria-hidden', 'true');
  };

  pinMap.addEventListener('click', function (evt) {
    var targetPin = evt.target.parentNode;
    if (targetPin.classList.contains('pin')) {
      showDialog(evt.target.parentNode);
    }
  });

  pinMap.addEventListener('keydown', function (evt) {
    var targetPin = evt.target;
    if (targetPin.classList.contains('pin') && isActivateEvent(evt)) {
      showDialog(evt.target);
    }
  });

  dialogClose.addEventListener('click', function () {
    hideDialog();
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (isActivateEvent(evt)) {
      hideDialog();
    }
  });
};
