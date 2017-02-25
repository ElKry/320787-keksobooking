'use strict';

window.initializeFilter = (function () {
  var filterForm = document.querySelector('.tokyo__filters');

  var contains = function (where, what) {
    for (var jj = 0; jj < what.length; jj++) {
      if (where.indexOf(what[jj]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filter = function (filterObject, pinsArray) {
    var resultPinArray = [];

    for (jj = 0; jj < pinsArray.length; jj++) {
      if (filterObject.type === pinsArray[jj].offer.type || filterObject.type === 'any') {
        if ((filterObject.price === 'middle' && ((pinsArray[jj].offer.price >= 10000) && (pinsArray[jj].offer.price <= 50000))) ||
            (filterObject.price === 'low' && pinsArray[jj].offer.price < 10000) ||
            (filterObject.price === 'hight' && pinsArray[jj].offer.price > 50000)) {
          if (+filterObject.rooms === pinsArray[jj].offer.rooms || filterObject.rooms === 'any') {
            if (+filterObject.guests === pinsArray[jj].offer.guests || filterObject.guests === 'any') {
              if (contains(pinsArray[jj].offer.features, filterObject.features)) {
                resultPinArray.push(pinsArray[jj]);
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
      var filterRooms = filterForm.elements['housing_room-number'];
      currentFilter.rooms = filterRooms.options[filterRooms.selectedIndex].value;
      var filterGuests = filterForm.elements['housing_guests-number'];
      currentFilter.guests = filterGuests.options[filterGuests.selectedIndex].value;
      var filterFeatures = filterForm.querySelector('#housing_features').elements;
      currentFilter.features = [];
      for (jj = 0; jj < filterFeatures.length; jj++) {
        if (filterFeatures[jj].checked) {
          currentFilter.features.push(filterFeatures[jj].value);
        }
      }
      window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
        var pinMapEll = document.querySelector('.tokyo__pin-map');
        var removedPins = document.querySelectorAll('.pin:not(.pin__main)');
        for (jj = 0; jj < removedPins.length; jj++) {
          pinMapEll.removeChild(removedPins[jj]);
        }
        var filterData = filter(currentFilter, data);
        window.initializePins(pinMapEll, filterData, filterData.length);
      });
    });
  };
})();
