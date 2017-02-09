'use strict';
var pins = document.querySelectorAll('.pin');
var pinMap = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');

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


