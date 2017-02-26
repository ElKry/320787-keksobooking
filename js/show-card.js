'use strict';

window.showCard = (function () {
  var targetPin = null;

  var checkAvailabilityOfFeature = function (featureElements, featureArr, classOfEl, propertyOfArr) {
    if(featureArr.indexOf(classOfEl) === -1) {
      featureElements.querySelector(propertyOfArr).style.display = 'none';
    }
  }

  var fillCard = function (card, newElement) {
    newElement.querySelector('.dialog__title > img').setAttribute('src', card.author.avatar);
    var dialogPanel = newElement.querySelector('.dialog__panel');
    dialogPanel.querySelector('.lodge__title').innerText = card.offer.title;
    dialogPanel.querySelector('.lodge__address').innerText = card.offer.address;
    dialogPanel.querySelector('.lodge__price').innerText = card.offer.price;
    dialogPanel.querySelector('.lodge__type').innerText = card.offer.type;
    dialogPanel.querySelector('.lodge__rooms').innerText = card.offer.rooms;
    dialogPanel.querySelector('.lodge__guests').innerText = card.offer.guests;
    dialogPanel.querySelector('.lodge__checkin-time').innerText = card.offer.checkin;
    var dialogFeatures = newElement.querySelector('.lodge__features');
    var cardFeatures = card.offer.features;
    var cardFeaturesItems = dialogFeatures.querySelectorAll('.feature__image');
    for (var j = 0; j < cardFeaturesItems.length; j++) {
      cardFeaturesItems[j].style.display = 'block';
    }
    checkAvailabilityOfFeature(dialogFeatures, cardFeatures, 'wifi', '.feature__image--wifi');
    checkAvailabilityOfFeature(dialogFeatures, cardFeatures, 'dishwasher', '.feature__image--dishwasher');
    checkAvailabilityOfFeature(dialogFeatures, cardFeatures, 'parking', '.feature__image--parking');
    checkAvailabilityOfFeature(dialogFeatures, cardFeatures, 'washer', '.feature__image--washer');
    checkAvailabilityOfFeature(dialogFeatures, cardFeatures, 'elevator', '.feature__image--elevator');
    checkAvailabilityOfFeature(dialogFeatures, cardFeatures, 'conditioner', '.feature__image--conditioner');

    newElement.querySelector('.lodge__description').innerText = card.offer.description;
  };

  var showDialog = function (targetPinElement, dialog) {
    var pins = document.querySelectorAll('.pin');
    window.utils.removeClass(pins, 'pin--active');
    targetPinElement.classList.add('pin--active');
    targetPinElement.setAttribute('aria-pressed', 'true');
    dialog.style.display = 'block';
    window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
      var imgIdentificator = targetPinElement.querySelector('img');
      for (var i = 0; i < data.length; i++) {
        if (data[i].author.avatar === imgIdentificator.getAttribute('src')) {
          fillCard(data[i], dialog);
        }
        if (imgIdentificator.getAttribute('src') === 'img/main-pin-image.png') {
          fillCard(data[data.length - 1], dialog);
        }
      }
    });
    dialog.setAttribute('aria-hidden', 'false');
  };

  return {
    openDialog: function (pinMap, dialogE) {
      pinMap.addEventListener('click', function (evt) {
        targetPin = evt.target.parentNode;
        if (targetPin.classList.contains('pin')) {
          showDialog(evt.target.parentNode, dialogE);
        }
      });

      pinMap.addEventListener('keydown', function (evt) {
        targetPin = evt.target;
        if (targetPin.classList.contains('pin') && window.utils.isActivateEvent(evt)) {
          showDialog(evt.target, dialogE);
        }
      });
    },

    fillCard: fillCard,

    initCard: function () {
      var templateCard = document.querySelector('#dialog-template');
      var elementToClone = templateCard.content.querySelector('.dialog');
      var newCard = elementToClone.cloneNode(true);

      return newCard;
    }
  };
})();
