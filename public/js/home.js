/* Home page: draws the hero illustration. */
(function (SIG) {
  'use strict';
  var host = document.getElementById('hero-art');
  if (host && SIG.heroArt) host.innerHTML = SIG.heroArt();
})(window.SIG);
