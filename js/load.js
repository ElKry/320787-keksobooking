'use strict';

window.load = (function () {

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function (evt) {
      if (evt.target.status >= 400) {
        window.console.log('Failed to load data. Server returned status: ' + evt.target.status);
      } else if (evt.target.status >= 200) {
        onLoad(evt.target.response);
      }
    });

    xhr.responseType = 'json';

    xhr.open('GET', url);
    xhr.send();
  };
})();
