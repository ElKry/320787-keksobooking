'use strict';

window.initializeFilter = (function () {
  var filterForm = document.querySelector('.tokyo__filters');
  var index;
  var jj;

  var contains = function (where, what) {
    for (var index = 0; index < what.length; index++) {
      if (where.indexOf(what[index]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filter = function (filterObject, pinsArray) {
    var resultPinArray = [];

    for (index = 0; index < pinsArray.length; index++) {
      if (filterObject.type === pinsArray[index].offer.type || filterObject.type === 'any') {
        if ((filterObject.price === 'middle' && ((pinsArray[index].offer.price >= 10000) && (pinsArray[index].offer.price <= 50000))) ||
            (filterObject.price === 'low' && pinsArray[index].offer.price < 10000) ||
            (filterObject.price === 'hight' && pinsArray[index].offer.price > 50000)) {
          if (+filterObject.rooms === pinsArray[index].offer.rooms || filterObject.rooms === 'any') {
            if (+filterObject.guests === pinsArray[index].offer.guests || filterObject.guests === 'any') {
              if (contains(pinsArray[index].offer.features, filterObject.features)) {
                resultPinArray.push(pinsArray[index]);
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
        for (index = 0; index < removedPins.length; index++) {
          pinMapEll.removeChild(removedPins[index]);
        }
        var filterData = filter(currentFilter, data);
        window.initializePins(pinMapEll, filterData, filterData.length);
      });
    });
  };
})();
