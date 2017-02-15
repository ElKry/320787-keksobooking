'use strict';

window.syncFields = (function () {

  var synchronizeTime = function (timeElement, timeoutElement) {
    timeElement.addEventListener('click', function () {
      var timeoutIndex = timeElement.options.selectedIndex;
      timeoutElement.options[timeoutIndex].selected = true;
    });
  };

  return {
  synchronizeFields: function (firstField, secondField, firstValuesArr, secondValuesArr, property) {

    if (property === 'index') {
      synchronizeTime(firstField, secondField);
      synchronizeTime(secondField, firstField);
    }

    if (property === 'min') {
      firstField.addEventListener('click', function () {
        var typeSelectedText = firstField.options[firstField.options.selectedIndex].text;

        if (typeSelectedText === firstValuesArr[0]) {
          secondField.setAttribute('min', secondValuesArr[0]);
          secondField.placeholder = secondValuesArr[0];
        }
        if (typeSelectedText === firstValuesArr[1]) {
          secondField.setAttribute('min', secondValuesArr[1]);
          secondField.placeholder = secondValuesArr[1];
        }
        if (typeSelectedText === firstValuesArr[2]) {
          secondField.setAttribute('min', secondValuesArr[2]);
          secondField.placeholder = secondValuesArr[2];
        }
      });
    }

    if (property === 'value') {
      firstField.addEventListener('click', function () {
        var numberOfSelectedRoom = firstField.options[firstField.options.selectedIndex].value;

        if (numberOfSelectedRoom === firstValuesArr[0]) {
          secondField.querySelector('[value="' + secondValuesArr[0] + '"]').selected = true;
        }
        if (numberOfSelectedRoom === firstValuesArr[1] || numberOfSelectedRoom === firstValuesArr[2]) {
          secondField.querySelector('[value="' + secondValuesArr[1] + '"]').selected = true;
        }
      });
    }
  }
};
})();
