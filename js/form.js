'use strict';

var pinsEl = document.querySelectorAll('.pin');
var pinMapEl = document.querySelector('.tokyo__pin-map');
var dialogEl = document.querySelector('.dialog');
var dialogCloseEl = document.querySelector('.dialog__close');

window.initializePins(pinsEl, pinMapEl, dialogEl, dialogCloseEl);

var time = document.querySelector('#time');
var timeout = document.querySelector('#timeout');

window.synchronizeFields(time, timeout, [], [], 'index');

var type = document.querySelector('#type');
var price = document.querySelector('#price');

window.synchronizeFields(type, price, ['Квартира', 'Лачуга', 'Дворец'], ['1000', '0', '10000'], 'min');

var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

window.synchronizeFields(roomNumber, capacity, ['1', '2', '100'], [0, 3], 'value');


