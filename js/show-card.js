'use strict';

window.showCard = (function () {
  var targetPin = null;

  var showDialog = function (targetPinElement, pins, dialog) {
    window.utils.removeClass(pins, 'pin--active');
    targetPinElement.classList.add('pin--active');
    targetPinElement.setAttribute('aria-pressed', 'true');
    dialog.style.display = 'block';
    dialog.setAttribute('aria-hidden', 'false');
  };

  return {
    openDialog: function (pinsE, pinMap, dialogE) {
      pinMap.addEventListener('click', function (evt) {
        targetPin = evt.target.parentNode;
        if (targetPin.classList.contains('pin')) {
          showDialog(evt.target.parentNode, pinsE, dialogE);
        }
      });

      pinMap.addEventListener('keydown', function (evt) {
        targetPin = evt.target;
        if (targetPin.classList.contains('pin') && window.utils.isActivateEvent(evt)) {
          showDialog(evt.target, pinsE, dialogE);
        }
      });
    }
  };
})();
