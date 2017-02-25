'use strict';

window.initializeFilter = (function () {
  var filterForm = document.querySelector('.tokyo__filters');
  var ind;
  var jj;

  var contains = function (where, what) {
    for (var ind = 0; ind < what.length; ind++) {
      if (where.indexOf(what[ind]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filter = function (filterObject, pinsArray) {
    var resultPinArray = [];

    for (ind = 0; ind < pinsArray.length; ind++) {
      if (filterObject.type === pinsArray[ind].offer.type || filterObject.type === 'any') {
        if ((filterObject.price === 'middle' && ((pinsArray[ind].offer.price >= 10000) && (pinsArray[ind].offer.price <= 50000))) ||
            (filterObject.price === 'low' && pinsArray[ind].offer.price < 10000) ||
            (filterObject.price === 'hight' && pinsArray[ind].offer.price > 50000)) {
          if (+filterObject.rooms === pinsArray[ind].offer.rooms || filterObject.rooms === 'any') {
            if (+filterObject.guests === pinsArray[ind].offer.guests || filterObject.guests === 'any') {
              if (contains(pinsArray[ind].offer.features, filterObject.features)) {
                resultPinArray.push(pinsArray[ind]);
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
        for (ind = 0; ind < removedPins.length; ind++) {
          pinMapEll.removeChild(removedPins[ind]);
        }
        var filterData = filter(currentFilter, data);
        window.initializePins(pinMapEll, filterData, filterData.length);
      });
    });
  };
})();
