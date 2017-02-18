'use strict';

window.syncFields = (function () {

  return {
    synchronizeFields: function (firstField, secondField, firstValuesArr, secondValuesArr, cb) {

      firstField.addEventListener('click', function () {
        if (typeof cb === 'function') {
          cb(firstField, secondField, firstValuesArr, secondValuesArr);
        }
      });
    }
  };
})();
