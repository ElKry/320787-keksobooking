'use strict';

window.showCard = (function () {
  var targetPin = null;

  var initCard = function (card, newElement) {
    newElement.querySelector('.dialog__title > img').setAttribute('src', card.author.avatar);
    var dialogPanel = newElement.querySelector('.dialog__panel');
    dialogPanel.querySelector('.lodge__title').innerText = card.offer.title;
    dialogPanel.querySelector('.lodge__address').innerText = card.offer.address;
    dialogPanel.querySelector('.lodge__price').innerText = card.offer.price;
    dialogPanel.querySelector('.lodge__type').innerText = card.offer.type;
    dialogPanel.querySelector('.lodge__rooms-and-guests').innerText = card.offer.rooms;
    dialogPanel.querySelector('.lodge__checkin-time').innerText = card.offer.checkin;
    var dialogFeatures = newElement.querySelector('.lodge__features');
    var cardFeatures = card.offer.features;
    var cardFeaturesItems = dialogFeatures.querySelectorAll('.feature__image');
    for (var j = 0; j < cardFeaturesItems.length; j++) {
      cardFeaturesItems[j].style.display = 'block';
    }
    if(cardFeatures.indexOf('wifi') === -1) {
      dialogFeatures.querySelector('.feature__image--wifi').style.display = 'none';
    }
    if(cardFeatures.indexOf('dishwasher') === -1) {
      dialogFeatures.querySelector('.feature__image--dishwasher').style.display = 'none';
    }
    if(cardFeatures.indexOf('parking') === -1) {
      dialogFeatures.querySelector('.feature__image--parking').style.display = 'none';
    }
    if(cardFeatures.indexOf('washer') === -1) {
      dialogFeatures.querySelector('.feature__image--washer').style.display = 'none';
    }
    if(cardFeatures.indexOf('elevator') === -1) {
      dialogFeatures.querySelector('.feature__image--elevator').style.display = 'none';
    }
    if(cardFeatures.indexOf('conditioner') === -1) {
      dialogFeatures.querySelector('.feature__image--conditioner').style.display = 'none';
    }
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
          initCard(data[i], dialog);
        }
        if (imgIdentificator.getAttribute('src') === 'img/main-pin-image.png') {
          initCard(data[data.length - 1], dialog);
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

    initCard: initCard
  };
})();
