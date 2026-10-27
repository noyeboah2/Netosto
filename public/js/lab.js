/* Inheritance Lab: a live Punnett square for the sickle cell gene.
   Each parent passes ONE of their two alleles (A or S) to each child,
   with equal chance. The 2x2 grid shows all four equally likely outcomes. */
(function (SIG) {
  'use strict';
  var t = SIG.t;

  var form = document.getElementById('lab-form');
  if (!form) return;

  var INFO = {
    AA: { name: t('Usual haemoglobin'), short: t('No sickle gene') },
    AS: { name: t('Sickle cell trait'), short: t('Carrier, usually healthy') },
    SS: { name: t('Sickle cell disease'), short: t('Has the disease') }
  };

  function sortGeno(a, b) {
    // Always write A before S so "SA" becomes "AS".
    return [a, b].sort().join('');
  }

  function cross(p1, p2) {
    var cells = [];
    for (var i = 0; i < 2; i++) {          // rows: parent 2 alleles
      for (var j = 0; j < 2; j++) {        // cols: parent 1 alleles
        cells.push(sortGeno(p1[j], p2[i]));
      }
    }
    return cells;
  }
  SIG.punnettCross = cross; // exposed for testing

  function explain(p1, p2, counts) {
    var parts = [];
    var ss = counts.SS, as = counts.AS, aa = counts.AA;
    // {n} = number of boxes out of 4, {pct} = percentage
    if (ss === 0 && as === 0) {
      parts.push(t('Neither parent carries the sickle gene, so <strong>none of their children can inherit sickle cell disease or trait</strong> from them.'));
    } else if (ss === 0) {
      parts.push(t('<strong>No child can have sickle cell disease</strong>, because only one parent can pass on an S gene.'));
      parts.push(t('Each child has a {n} in 4 ({pct}%) chance of having sickle cell trait (AS), like a carrier parent.', { n: as, pct: as * 25 }));
    } else if (ss === 4) {
      parts.push(t('Both parents can only pass on S, so <strong>every child will have sickle cell disease (SS)</strong>.'));
    } else {
      parts.push(t('Each child has a <strong>{n} in 4 ({pct}%) chance of sickle cell disease (SS)</strong>.', { n: ss, pct: ss * 25 }));
      if (as) parts.push(t('There is a {n} in 4 ({pct}%) chance of sickle cell trait (AS).', { n: as, pct: as * 25 }));
      if (aa) parts.push(t('There is a {n} in 4 ({pct}%) chance of usual haemoglobin (AA).', { n: aa, pct: aa * 25 }));
    }
    if (ss > 0 && ss < 4) {
      parts.push(t('These chances apply to <em>every pregnancy separately</em>. Having one child with SS does not change the odds for the next child, just as flipping heads does not make the next coin toss tails.'));
    }
    if (p1 === 'AS' && p2 === 'AS') {
      parts.push(t('This is the most common way a child with sickle cell disease is born: both parents are healthy carriers and may not even know they carry S.'));
    }
    return parts.map(function (p) { return '<p>' + p + '</p>'; }).join('');
  }

  function render() {
    var p1 = form.elements.parent1.value;
    var p2 = form.elements.parent2.value;
    var cells = cross(p1, p2);
    var counts = { AA: 0, AS: 0, SS: 0 };
    cells.forEach(function (c) { counts[c]++; });

    var grid = document.getElementById('punnett');
    grid.setAttribute('aria-label', t('Punnett square for parent 1 {p1} and parent 2 {p2}. Outcomes: {list}', { p1: p1, p2: p2, list: cells.join(', ') }));
    grid.innerHTML =
      '<div class="p-head p-corner" aria-hidden="true">' + t('Parent 2') + ' ↓<br>' + t('Parent 1') + ' →</div>' +
      '<div class="p-head" aria-hidden="true">' + p1[0] + '</div><div class="p-head" aria-hidden="true">' + p1[1] + '</div>' +
      '<div class="p-head" aria-hidden="true">' + p2[0] + '</div>' +
      '<div class="p-cell g-' + cells[0] + '"><span class="geno">' + cells[0] + '</span><span class="geno-desc">' + INFO[cells[0]].short + '</span></div>' +
      '<div class="p-cell g-' + cells[1] + '"><span class="geno">' + cells[1] + '</span><span class="geno-desc">' + INFO[cells[1]].short + '</span></div>' +
      '<div class="p-head" aria-hidden="true">' + p2[1] + '</div>' +
      '<div class="p-cell g-' + cells[2] + '"><span class="geno">' + cells[2] + '</span><span class="geno-desc">' + INFO[cells[2]].short + '</span></div>' +
      '<div class="p-cell g-' + cells[3] + '"><span class="geno">' + cells[3] + '</span><span class="geno-desc">' + INFO[cells[3]].short + '</span></div>';

    document.getElementById('result-bars').innerHTML = ['AA', 'AS', 'SS'].map(function (g) {
      return '<div class="result-bar"><div class="bar-label"><span>' + g + ': ' + INFO[g].name + '</span><span>' + counts[g] * 25 + '%</span></div>' +
        '<div class="bar-track" role="img" aria-label="' + g + ' ' + counts[g] * 25 + '%"><div class="bar-fill fill-' + g + '" data-pct="' + counts[g] * 25 + '"></div></div></div>';
    }).join('');
    document.querySelectorAll('#result-bars .bar-fill').forEach(function (el) {
      requestAnimationFrame(function () { el.style.width = el.getAttribute('data-pct') + '%'; });
    });

    document.getElementById('lab-explain').innerHTML =
      '<h3 class="mt-0">' + t('What this means') + '</h3>' + explain(p1, p2, counts);
    document.getElementById('lab-summary').textContent =
      t('Parent 1 is {p1} and parent 2 is {p2}. Chances for each child: AA {aa}%, AS {as}%, SS {ss}%.', { p1: p1, p2: p2, aa: counts.AA * 25, as: counts.AS * 25, ss: counts.SS * 25 });

    SIG.store.set('lab', { p1: p1, p2: p2 });
  }

  form.addEventListener('change', render);

  document.querySelectorAll('[data-preset]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pair = btn.getAttribute('data-preset').split('-');
      form.elements.parent1.value = pair[0];
      form.elements.parent2.value = pair[1];
      render();
    });
  });

  var saved = SIG.store.get('lab', null);
  if (saved && INFO[saved.p1] && INFO[saved.p2]) {
    form.elements.parent1.value = saved.p1;
    form.elements.parent2.value = saved.p2;
  }
  render();
})(window.SIG);
