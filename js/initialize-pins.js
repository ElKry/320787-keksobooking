'use strict';

window.hideCard = (function () {
  var hideDialog = function (pins, dialog, cb) {
    dialog.style.display = 'none';
    if (typeof cb === 'function') {
      cb();
    }
    window.utils.removeClass(pins, 'pin--active');
    dialog.setAttribute('aria-hidden', 'true');
  };

  return {
    closeDialog: function (pinsE, dialogE, dialogClose, cb) {
      dialogClose.addEventListener('click', function () {
        hideDialog(pinsE, dialogE);
      });

      dialogClose.addEventListener('keydown', function (evt) {
        if (window.utils.isActivateEvent(evt)) {
          hideDialog(pinsE, dialogE, cb);
        }
      });
    }
  };
})();
