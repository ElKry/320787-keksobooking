'use strict';

window.initializeFilter = (function () {
  var filterForm = document.querySelector('.tokyo__filters');
  var i;
  var j;

  var contains = function (where, what) {
    for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) === -1) {
        return false;
      }
    }
    return true;
  }

  var filter = function (filterObject, pinsArray) {
    var resultPinArray = [];

    for (i = 0; i < pinsArray.length; i++) {
      if (filterObject.type === pinsArray[i].offer.type || filterObject.type === 'any') {
        if ((filterObject.price === 'middle' &&  (10000 <= pinsArray[i].offer.price <= 50000)) ||
            (filterObject.price === 'low' && pinsArray[i].offer.price < 10000) ||
            (filterObject.price === 'hight' && pinsArray[i].offer.price > 50000)) {
          if (+filterObject.rooms === pinsArray[i].offer.rooms || filterObject.rooms === 'any') {
            if (+filterObject.guests === pinsArray[i].offer.guests || filterObject.guests === 'any') {
              if(contains(pinsArray[i].offer.features, filterObject.features)) {
                resultPinArray.push(pinsArray[i]);
              }
            }
          }
        }
      }
    }
    return resultPinArray;
  };

  return function () {
    filterForm.addEventListener('click', function () {
      var currentFilter = {};
      var filterType = filterForm.elements.housing_type;
      currentFilter.type = filterType.options[filterType.selectedIndex].value;
      var filterPrice = filterForm.elements.housing_price;
      currentFilter.price = filterPrice.options[filterPrice.selectedIndex].value;
      var filterRooms = filterForm.elements[name = 'housing_room-number'];
      currentFilter.rooms = filterRooms.options[filterRooms.selectedIndex].value;
      var filterGuests = filterForm.elements[name = 'housing_guests-number'];
      currentFilter.guests = filterGuests.options[filterGuests.selectedIndex].value;
      var filterFeatures = filterForm.querySelector("#housing_features").elements;
      currentFilter.features = [];
      for (j = 0; j < filterFeatures.length; j++) {
        if (filterFeatures[j].checked) {
          currentFilter.features.push(filterFeatures[j].value);
        }
      }
      window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
        var pinMapEll = document.querySelector('.tokyo__pin-map');
        var removedPins = document.querySelectorAll('.pin:not(.pin__main)');
        for (i = 0; i < removedPins.length; i++) {
          pinMapEll.removeChild(removedPins[i]);
        }
        var filterData = filter(currentFilter, data);
        window.initializePins(pinMapEll, filterData, filterData.length);
      });
    });
  };
})();
