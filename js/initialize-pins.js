'use strict';

window.initializePins = (function () {
  var createElementFromTemplate = function (similarApartment) {
    var templateElement = document.querySelector('#pin-template');
    var elementToClone = templateElement.content.querySelector('.pin');
    var newElement = elementToClone.cloneNode(true);
    newElement.querySelector('img').setAttribute('src', similarApartment.author.avatar);
    newElement.style.left = similarApartment.location.x + 'px';
    newElement.style.top = similarApartment.location.y + 'px';

    return newElement;
  };

  return function (pinMap, similarApartments, numberOfPins) {
    for (var i = 0; i < numberOfPins; i++) {
      pinMap.appendChild(createElementFromTemplate(similarApartments[i]));
    }
  };
})();


