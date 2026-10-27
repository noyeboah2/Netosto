/* Glossary page: A–Z list, quick filter, and "Appears in" links that point
   to every story scene and science note where the term is used. */
(function (SIG) {
  'use strict';
  var tr = SIG.t;

  var root = document.getElementById('glossary-root');
  var nav = document.getElementById('alpha-nav');
  var filter = document.getElementById('glossary-filter');
  if (!root) return;

  // Find where each term is used in every chapter.
  var usage = {};
  Object.keys(SIG.chapters).forEach(function (cid) {
    var ch = SIG.chapters[cid];
    Object.keys(ch.scenes).forEach(function (sid) {
      var sc = ch.scenes[sid];
      var all = sc.text.join(' ') + ' ' + (sc.note ? sc.note.text.join(' ') : '');
      var re = /\[\[([a-z0-9-]+)/g, m;
      while ((m = re.exec(all))) {
        usage[m[1]] = usage[m[1]] || [];
        if (!usage[m[1]].some(function (u) { return u.sid === sid; })) {
          usage[m[1]].push({ cid: cid, sid: sid, title: sc.title });
        }
      }
    });
  });

  var terms = (SIG.glossary || []).slice().sort(function (a, b) { return a.term.localeCompare(b.term); });

  function render(query) {
    var q = (query || '').trim().toLowerCase();
    var shown = terms.filter(function (t) {
      if (!q) return true;
      return (t.term + ' ' + t.def + ' ' + (t.aliases || []).join(' ')).toLowerCase().indexOf(q) !== -1;
    });

    var groups = {};
    shown.forEach(function (t) {
      var letter = t.term.charAt(0).toUpperCase();
      (groups[letter] = groups[letter] || []).push(t);
    });

    var letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    nav.innerHTML = letters.map(function (L) {
      return '<li>' + (groups[L] ? '<a href="#letter-' + L + '">' + L + '</a>' : '<span aria-hidden="true">' + L + '</span>') + '</li>';
    }).join('');

    if (!shown.length) {
      root.innerHTML = '<p class="muted">' + SIG.escape(tr('No terms match “{q}”.', { q: query })) + '</p>';
      return;
    }

    root.innerHTML = Object.keys(groups).sort().map(function (L) {
      return '<section class="glossary-group" id="letter-' + L + '" aria-labelledby="h-' + L + '"><h2 id="h-' + L + '">' + L + '</h2>' +
        groups[L].map(function (t) {
          var uses = usage[t.id] || [];
          return '<div class="glossary-entry" id="' + t.id + '"><h3>' + SIG.escape(t.term) + '</h3>' +
            '<p class="mb-0">' + SIG.escape(t.def) + '</p>' +
            (uses.length
              ? '<p class="appears">' + tr('Appears in:') + ' ' + uses.map(function (u) {
                  return '<a href="/story?chapter=' + u.cid + '&amp;scene=' + u.sid + '">' + SIG.escape(u.title) + '</a>';
                }).join(' · ') + '</p>'
              : '') +
            '</div>';
        }).join('') + '</section>';
    }).join('');
  }

  render('');
  if (filter) filter.addEventListener('input', function () { render(filter.value); });

  // Re-apply the #hash highlight after rendering.
  if (window.location.hash) {
    var target = document.getElementById(window.location.hash.slice(1));
    if (target) setTimeout(function () { target.scrollIntoView(); }, 50);
  }
})(window.SIG);
