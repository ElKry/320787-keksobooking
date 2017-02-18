'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;

  return {
    isActivateEvent: function (evt) {
      return evt.keyCode && evt.keyCode === ENTER_KEY_CODE;
    },

    removeClass: function (pinsElements, className) {
      for (var j = 0; j < pinsElements.length; j++) {
        pinsElements[j].classList.remove(className);
        pinsElements[j].setAttribute('aria-pressed', 'false');
      }
    }
  };
})();
