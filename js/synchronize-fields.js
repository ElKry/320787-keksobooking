'use strict';

window.syncFields = (function () {

  return {
    synchronizeFields: function (firstField, secondField, firstValuesArr, secondValuesArr, cb) {
      if (typeof cb === 'function') {
        cb(firstField, secondField, firstValuesArr, secondValuesArr);
      }
    }
  };
})();
