'use strict';

window.hideCard = (function () {
  var hideDialog = function (dialog, cb) {
    var pinActive = document.querySelector('.pin--active');
    dialog.style.display = 'none';
    if (typeof cb === 'function') {
      cb();
    }
    pinActive.classList.remove('pin--active');
    dialog.setAttribute('aria-hidden', 'true');
  };

  return {
    closeDialog: function (dialogE, dialogClose, cb) {
      dialogClose.addEventListener('click', function () {
        hideDialog(dialogE);
      });

      dialogClose.addEventListener('keydown', function (evt) {
        if (window.utils.isActivateEvent(evt)) {
          hideDialog(dialogE, cb);
        }
      });
    }
  };
})();
