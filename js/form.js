'use strict';

(function () {
  var pinMapEl = document.querySelector('.tokyo__pin-map');
  var tokyo = document.querySelector('section.tokyo');
  tokyo.appendChild(window.showCard.initCard());

  var dialogEl = document.querySelector('.dialog');
  var dialogCloseEl = document.querySelector('.dialog__close');

  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
    window.initializePins(pinMapEl, data, 3);
    window.showCard.fillCard(data[data.length - 1], dialogEl);
  });

  window.showCard.openDialog(pinMapEl, dialogEl);
  window.hideCard.closeDialog(dialogEl, dialogCloseEl, function () {
    document.querySelector('.pin--active').focus();
  });

  window.initializeFilter();

  var time = document.querySelector('#time');
  var timeout = document.querySelector('#timeout');

  var syncTimeTimeout = function (timeEl, timeoutEl, timeArr, timeoutArr) {
    var synchronizeTime = function (timeElement, timeoutElement) {
      timeElement.addEventListener('click', function () {
        var timeoutIndex = timeElement.options.selectedIndex;
        timeoutElement.options[timeoutIndex].selected = true;
      });
    };

    synchronizeTime(timeEl, timeoutEl);
    synchronizeTime(timeoutEl, timeEl);
  };

  window.syncFields.synchronizeFields(time, timeout, [], [], syncTimeTimeout);

  var type = document.querySelector('#type');
  var price = document.querySelector('#price');

  var syncTypePrice = function (typeEl, priceEl, typeArr, priceArr) {
    priceEl.addEventListener('input', function () {
      var priceValue = +priceEl.value;

      if (priceValue >= +priceArr[0] && priceValue < +priceArr[2]) {
        typeEl.value = typeArr[0];
      }
      if (priceValue < +priceArr[0]) {
        typeEl.value = typeArr[1];
      }
      if (priceValue >= +priceArr[2]) {
        typeEl.value = typeArr[2];
      }
    });

    typeEl.addEventListener('click', function () {
      var typeSelectedText = typeEl.options[typeEl.options.selectedIndex].text;

      if (typeSelectedText === typeArr[0]) {
        priceEl.setAttribute('min', priceArr[0]);
        priceEl.value = priceArr[0];
      }
      if (typeSelectedText === typeArr[1]) {
        priceEl.setAttribute('min', priceArr[1]);
        priceEl.value = priceArr[1];
      }
      if (typeSelectedText === typeArr[2]) {
        priceEl.setAttribute('min', priceArr[2]);
        priceEl.value = priceArr[2];
      }
    });
  };

  window.syncFields.synchronizeFields(type, price, ['Квартира', 'Лачуга', 'Дворец'], ['1000', '0', '10000'], syncTypePrice);

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var syncRoomNumberCapacity = function (roomNumberEl, capacityEl, roomNumberArr, capacityArr) {
    roomNumberEl.addEventListener('click', function () {
      var numberOfSelectedRoom = roomNumberEl.options[roomNumberEl.options.selectedIndex].value;

      if (numberOfSelectedRoom === roomNumberArr[0]) {
        capacityEl.querySelector('[value="' + capacityArr[0] + '"]').selected = true;
      }
      if (numberOfSelectedRoom === roomNumberArr[1] || numberOfSelectedRoom === roomNumberArr[2]) {
        capacityEl.querySelector('[value="' + capacityArr[1] + '"]').selected = true;
      }
    });

    capacityEl.addEventListener('click', function () {
      var capacityIndex = capacityEl.options.selectedIndex;
      if (capacityIndex === 0) {
        roomNumberEl.options[1].selected = true;
      } else {
        roomNumberEl.options[0].selected = true;
      }
    });
  };

  window.syncFields.synchronizeFields(roomNumber, capacity, ['1', '2', '100'], [0, 3], syncRoomNumberCapacity);
})();

