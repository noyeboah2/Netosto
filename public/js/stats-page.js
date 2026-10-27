/* Private project dashboard (/stats). Asks for the ADMIN_TOKEN password,
   keeps it only for this browser tab, and shows totals from /api/stats. */
(function (SIG) {
  'use strict';

  var form = document.getElementById('stats-login');
  var out = document.getElementById('stats-out');
  var status = document.getElementById('stats-status');
  if (!form) return;

  function fmt(v, suffix) { return v == null ? '–' : v + (suffix || ''); }

  function tile(label, value) {
    return '<div class="stat"><div class="stat-label">' + SIG.escape(label) + '</div><div class="stat-value">' + SIG.escape(value) + '</div></div>';
  }

  function render(d) {
    var maxDay = Math.max.apply(null, [1].concat(d.last7Days.map(function (x) { return x.visits; })));
    out.innerHTML =
      '<div class="sim-stats">' +
        tile('Page views', fmt(d.visits)) +
        tile('Story starts', fmt(d.chapterStarts)) +
        tile('Story completions', fmt(d.chapterCompletions)) +
        tile('Completion rate', fmt(d.completionRate, '%')) +
        tile('Quiz attempts', fmt(d.quizAttempts)) +
        tile('Average quiz score', fmt(d.averageQuizScore, '%')) +
        tile('Feedback responses', fmt(d.feedback.count)) +
        tile('Average rating', fmt(d.feedback.averageRating, ' / 5')) +
      '</div>' +
      '<div class="grid grid-2 mt-2">' +
        '<div class="card"><h3>Page views, last 7 days</h3>' +
          (d.last7Days.length ? '<div class="result-bars">' + d.last7Days.map(function (x) {
            return '<div class="result-bar"><div class="bar-label"><span>' + SIG.escape(x.day) + '</span><span>' + x.visits + '</span></div>' +
              '<div class="bar-track"><div class="bar-fill fill-AS" data-pct="' + Math.round((x.visits / maxDay) * 100) + '"></div></div></div>';
          }).join('') + '</div>' : '<p class="muted">No visits recorded yet.</p>') +
        '</div>' +
        '<div class="card"><h3>“Did you learn something new?”</h3>' +
          '<p>Yes: <strong>' + d.feedback.learned.yes + '</strong><br>Somewhat: <strong>' + d.feedback.learned.somewhat + '</strong><br>No: <strong>' + d.feedback.learned.no + '</strong></p>' +
          '<h3>Most visited pages</h3>' +
          (d.topPages.length ? '<ol>' + d.topPages.map(function (p) { return '<li>' + SIG.escape(p.page) + ': ' + p.visits + '</li>'; }).join('') + '</ol>' : '<p class="muted">No data yet.</p>') +
        '</div>' +
      '</div>' +
      '<p class="muted mt-2">Updated ' + new Date(d.generatedAt).toLocaleString() + '. Use these numbers in your activities list and essays.</p>';
    out.querySelectorAll('.bar-fill').forEach(function (el) { el.style.width = el.getAttribute('data-pct') + '%'; });
  }

  function load(token) {
    status.className = 'form-status';
    status.textContent = 'Loading…';
    fetch('/api/stats', { headers: { Authorization: 'Bearer ' + token } })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        if (!res.ok || !res.d.ok) throw new Error(res.d.error || 'Could not load stats');
        try { sessionStorage.setItem('sig:admin', token); } catch (e) { /* ignore */ }
        status.textContent = '';
        render(res.d);
      })
      .catch(function (err) {
        status.className = 'form-status err';
        status.textContent = err.message || 'Could not load stats.';
      });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    load(form.elements.token.value.trim());
  });

  try {
    var saved = sessionStorage.getItem('sig:admin');
    if (saved) load(saved);
  } catch (e) { /* ignore */ }
})(window.SIG);
