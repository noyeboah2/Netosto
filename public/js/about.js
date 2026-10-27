/* About page: lists the science sources for every chapter. */
(function (SIG) {
  'use strict';
  var list = document.getElementById('sources-list');
  if (!list) return;
  var seen = {};
  var items = [];
  Object.keys(SIG.chapters).forEach(function (id) {
    (SIG.chapters[id].sources || []).forEach(function (s) {
      if (seen[s.url]) return;
      seen[s.url] = true;
      items.push('<li><a href="' + SIG.escape(s.url) + '" target="_blank" rel="noopener">' + SIG.escape(s.label) + '</a></li>');
    });
  });
  list.innerHTML = items.join('');
})(window.SIG);
