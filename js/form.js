'use strict';
var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

var removeClass = function (pinsElements, className) {
  for (var j = 0; j < pinsElements.length; j++) {
    pinsElements[j].classList.remove(className);
  }
};

for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', function (evt) {
    removeClass(pins, 'pin--active');
    evt.target.parentNode.classList.add('pin--active');
    dialog.style.display = 'block';
  });
}

dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
  removeClass(pins, 'pin--active');
});

var time = document.querySelector('#time');
var timeout = document.querySelector('#timeout');

var synchronizeTime = function (timeElement, timeoutElement) {
  timeElement.addEventListener('click', function () {
    var timeoutIndex = timeElement.options.selectedIndex;
    timeoutElement.options[timeoutIndex].selected = true;
  });
};

synchronizeTime(time, timeout);
synchronizeTime(timeout, time);

var type = document.querySelector('#type');
var price = document.querySelector('#price');

type.addEventListener('click', function () {
  var typeSelectedText = type.options[type.options.selectedIndex].text;

  if (typeSelectedText === 'Квартира') {
    price.setAttribute('min', '1000');
    price.placeholder = '1000';
  }
  if (typeSelectedText === 'Лачуга') {
    price.setAttribute('min', '0');
    price.placeholder = '0';
  }
  if (typeSelectedText === 'Дворец') {
    price.setAttribute('min', '10000');
    price.placeholder = '10000';
  }
});

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

roomNumber.addEventListener('click', function () {
  var numberOfSelectedRoom = roomNumber.options[roomNumber.selectedIndex].value;
  if (numberOfSelectedRoom === '1') {
    capacity.querySelector('[value="0"]').selected = true;
  }
  if (numberOfSelectedRoom === '2' || numberOfSelectedRoom === '100') {
    capacity.querySelector('[value="3"]').selected = true;
  }
});


