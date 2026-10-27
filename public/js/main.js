/* ==========================================================================
   Stories in Our Genes: shared site script (loaded on every page)
   - Safe localStorage helpers
   - Anonymous analytics (page views, chapter starts/completions, quiz scores)
   - Mobile navigation toggle
   - Glossary term pop-ups  ([[term-id]] markup -> clickable definition)
   - Live search across glossary, chapters, science notes and pages
   - Chapter cards, share buttons and feedback forms
   ========================================================================== */
(function () {
  'use strict';

  var SIG = (window.SIG = window.SIG || {});
  var t = SIG.t || function (s, v) { return v ? s.replace(/\{(\w+)\}/g, function (m, k) { return k in v ? v[k] : m; }) : s; };
  SIG.t = t;

  /* ---------- Utilities ---------- */
  SIG.escape = function (str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  SIG.store = {
    get: function (key, fallback) {
      try {
        var v = window.localStorage.getItem('sig:' + key);
        return v === null ? fallback : JSON.parse(v);
      } catch (e) { return fallback; }
    },
    set: function (key, value) {
      try { window.localStorage.setItem('sig:' + key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
    },
    remove: function (key) {
      try { window.localStorage.removeItem('sig:' + key); } catch (e) { /* ignore */ }
    }
  };

  SIG.qs = function (name) {
    try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
  };

  SIG.toast = function (message) {
    var el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(function () { el.remove(); }, 3200);
  };

  /* ---------- Anonymous analytics ----------
     Sends only an event name, the page path and (for quizzes) a score.
     No names, no accounts, no health information. */
  SIG.track = function (event, data) {
    try {
      var payload = Object.assign({ event: event, page: window.location.pathname, lang: SIG.lang || 'en' }, data || {});
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function () { /* offline or local preview: ignore */ });
    } catch (e) { /* ignore */ }
  };

  /* ---------- Chapter registry ---------- */
  SIG.chapters = SIG.chapters || {};
  SIG.registerChapter = SIG.registerChapter || function (chapter) { SIG.chapters[chapter.id] = chapter; };

  /* ---------- Apply the visitor's language to all content ---------- */
  if (SIG.lang && SIG.lang !== 'en') {
    Object.keys(SIG.chapters).forEach(function (id) { SIG.chapters[id] = SIG.localizeChapter(SIG.chapters[id]); });
    var gt = SIG.glossaryTranslations[SIG.lang] || {};
    SIG.glossary = (SIG.glossary || []).map(function (g) {
      var tr = gt[g.id];
      if (!tr) return g;
      // Keep the English word searchable even when the page is in Twi.
      return Object.assign({}, g, { term: tr.term || g.term, def: tr.def || g.def, aliases: (g.aliases || []).concat([g.term], tr.aliases || []) });
    });
    SIG.chapterList = (SIG.chapterList || []).map(function (c) {
      return Object.assign({}, c, { title: t(c.title), tagline: t(c.tagline) });
    });
    SIG.pages = (SIG.pages || []).map(function (p) {
      return Object.assign({}, p, { title: t(p.title), text: t(p.text) });
    });
  }

  /* ---------- Glossary helpers ---------- */
  SIG.glossaryById = {};
  (SIG.glossary || []).forEach(function (g) { SIG.glossaryById[g.id] = g; });

  var TERM_RE = /\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g;

  /* "Haemoglobin" -> "haemoglobin" inside a sentence, but keep "HBB gene". */
  function inlineTerm(term) {
    return /^[A-Z][a-z]/.test(term) ? term.charAt(0).toLowerCase() + term.slice(1) : term;
  }

  /** Turn "[[term-id|label]]" markup into accessible pop-up buttons. */
  SIG.renderTerms = function (text) {
    return SIG.escape(text).replace(TERM_RE, function (_, id, label) {
      var entry = SIG.glossaryById[id];
      if (!entry) return label || id;
      var shown = label || inlineTerm(entry.term);
      return '<button type="button" class="term" data-term="' + id + '" aria-expanded="false" aria-haspopup="dialog">' + shown + '</button>';
    });
  };

  /** Plain text version of term markup (used by search). */
  SIG.stripTerms = function (text) {
    return String(text || '').replace(TERM_RE, function (_, id, label) {
      var entry = SIG.glossaryById[id];
      return label || (entry ? entry.term : id);
    });
  };

  /* ---------- Term pop-up ---------- */
  var popover = null;
  var activeTerm = null;

  function closePopover(returnFocus) {
    if (!popover || popover.hidden) return;
    popover.hidden = true;
    if (activeTerm) {
      activeTerm.setAttribute('aria-expanded', 'false');
      if (returnFocus) activeTerm.focus();
    }
    activeTerm = null;
  }

  function openPopover(btn) {
    var entry = SIG.glossaryById[btn.getAttribute('data-term')];
    if (!entry) return;
    if (!popover) {
      popover = document.createElement('div');
      popover.className = 'term-popover';
      popover.id = 'term-popover';
      popover.setAttribute('role', 'dialog');
      popover.setAttribute('tabindex', '-1');
      popover.hidden = true;
      document.body.appendChild(popover);
    }
    if (activeTerm === btn && !popover.hidden) { closePopover(true); return; }
    closePopover(false);

    popover.setAttribute('aria-label', t('Definition of {term}', { term: entry.term }));
    popover.innerHTML =
      '<strong>' + SIG.escape(entry.term) + '</strong>' +
      '<p>' + SIG.escape(entry.def) + '</p>' +
      '<div class="pop-actions"><a href="/glossary#' + entry.id + '">' + t('See in glossary') + '</a>' +
      '<button type="button" class="pop-close" aria-label="' + t('Close definition') + '">' + t('Close') + ' &times;</button></div>';
    popover.hidden = false;

    var rect = btn.getBoundingClientRect();
    var width = popover.offsetWidth;
    var left = rect.left + window.scrollX;
    var maxLeft = document.documentElement.clientWidth - width - 12 + window.scrollX;
    popover.style.left = Math.max(12, Math.min(left, maxLeft)) + 'px';
    popover.style.top = rect.bottom + window.scrollY + 8 + 'px';

    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-controls', 'term-popover');
    activeTerm = btn;
    popover.focus();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.term');
    if (btn) { e.preventDefault(); openPopover(btn); return; }
    if (e.target.closest('.pop-close')) { closePopover(true); return; }
    if (popover && !e.target.closest('.term-popover')) closePopover(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closePopover(true);
  });

  /* Upgrade static HTML: elements with data-term-markup contain [[...]] text. */
  function upgradeStaticTerms(root) {
    (root || document).querySelectorAll('[data-term-markup]').forEach(function (el) {
      el.innerHTML = SIG.renderTerms(el.textContent);
      el.removeAttribute('data-term-markup');
    });
  }
  SIG.upgradeStaticTerms = upgradeStaticTerms;

  /* ---------- Mobile navigation ---------- */
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- Search ---------- */
  // Normalise British/American spellings so "hemoglobin" finds "haemoglobin".
  function norm(s) {
    return String(s || '').toLowerCase()
      .replace(/haem/g, 'hem').replace(/anaem/g, 'anem').replace(/foet/g, 'fet')
      .replace(/isation/g, 'ization').replace(/ise\b/g, 'ize')
      .replace(/ɛ/g, 'e').replace(/ɔ/g, 'o')            // Twi letters also match plain e / o
      .replace(/[^\p{L}\p{N}\s-]/gu, ' ');
  }

  var searchIndex = null;
  function buildIndex() {
    var items = [];
    (SIG.glossary || []).forEach(function (g) {
      items.push({ type: t('Glossary'), title: g.term, text: g.def, url: '/glossary#' + g.id, extra: (g.aliases || []).join(' ') });
    });
    (SIG.chapterList || []).forEach(function (c) {
      items.push({
        type: t('Chapter'),
        title: c.title,
        text: c.tagline + (c.status === 'available' ? '' : ' (' + t('coming soon') + ')'),
        url: c.status === 'available' ? c.url : '/chapters#' + c.id,
        extra: c.system + ' ' + c.inheritance + ' ' + t(c.system) + ' ' + t(c.inheritance)
      });
    });
    Object.keys(SIG.chapters).forEach(function (cid) {
      var ch = SIG.chapters[cid];
      Object.keys(ch.scenes).forEach(function (sid) {
        var sc = ch.scenes[sid];
        if (!sc.note) return;
        items.push({
          type: t('Science note'),
          title: sc.note.title || sc.title,
          text: SIG.stripTerms(sc.note.text.join(' ')),
          url: '/story?chapter=' + cid + '&scene=' + sid,
          extra: sc.title
        });
      });
    });
    (SIG.pages || []).forEach(function (p) {
      items.push({ type: t('Page'), title: p.title, text: p.text, url: p.url, extra: p.keywords || '' });
    });
    items.forEach(function (it) {
      it._title = norm(it.title);
      it._all = norm(it.title + ' ' + it.text + ' ' + (it.extra || ''));
    });
    return items;
  }

  function scoreItem(item, q, tokens) {
    for (var i = 0; i < tokens.length; i++) {
      if (item._all.indexOf(tokens[i]) === -1) return 0;
    }
    var s = 1;
    if (item._title === q) s += 100;
    else if (item._title.indexOf(q) === 0) s += 70;
    else if ((' ' + item._title).indexOf(' ' + q) !== -1) s += 50;
    else if (item._title.indexOf(q) !== -1) s += 35;
    if (item.type === t('Glossary')) s += 5;
    if (item.type === t('Chapter')) s += 8;
    return s;
  }

  function highlight(text, query) {
    var safe = SIG.escape(text);
    if (!query) return safe;
    var tokens = query.trim().split(/\s+/).filter(function (t) { return t.length > 1; })
      .map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); });
    if (!tokens.length) return safe;
    return safe.replace(new RegExp('(' + tokens.join('|') + ')', 'gi'), '<mark>$1</mark>');
  }

  function snippet(text, query) {
    var t = String(text);
    if (t.length <= 110) return t;
    var idx = t.toLowerCase().indexOf(String(query).toLowerCase().split(/\s+/)[0]);
    var start = Math.max(0, idx - 30);
    return (start > 0 ? '… ' : '') + t.slice(start, start + 110) + '…';
  }

  SIG.search = function (query, limit) {
    if (!searchIndex) searchIndex = buildIndex();
    var q = norm(query).trim();
    if (q.length < 2) return [];
    var tokens = q.split(/\s+/).filter(Boolean);
    return searchIndex
      .map(function (it) { return { item: it, score: scoreItem(it, q, tokens) }; })
      .filter(function (r) { return r.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, limit || 8)
      .map(function (r) { return r.item; });
  };

  function initSearch() {
    var input = document.getElementById('site-search');
    var list = document.getElementById('search-results');
    if (!input || !list) return;
    var results = [];
    var active = -1;

    function setActive(i) {
      var opts = list.querySelectorAll('[role="option"]');
      opts.forEach(function (o, idx) { o.setAttribute('aria-selected', idx === i ? 'true' : 'false'); });
      active = i;
      if (i >= 0 && opts[i]) {
        input.setAttribute('aria-activedescendant', opts[i].id);
        opts[i].scrollIntoView({ block: 'nearest' });
      } else {
        input.removeAttribute('aria-activedescendant');
      }
    }

    function close() {
      list.hidden = true;
      input.setAttribute('aria-expanded', 'false');
      setActive(-1);
    }

    function render() {
      var q = input.value;
      if (q.trim().length < 2) { list.innerHTML = ''; close(); return; }
      results = SIG.search(q, 8);
      if (!results.length) {
        list.innerHTML = '<li class="no-results" role="presentation">' + SIG.escape(t('No results for “{q}”. Try “haemoglobin”, “genotype” or “crisis”.', { q: q })) + '</li>';
      } else {
        list.innerHTML = results.map(function (r, i) {
          return '<li role="option" id="sr-' + i + '" aria-selected="false"><a href="' + r.url + '" tabindex="-1">' +
            '<span class="result-type">' + SIG.escape(r.type) + '</span>' +
            '<span class="result-title">' + highlight(r.title, q) + '</span>' +
            '<span class="result-text">' + highlight(snippet(r.text, q), q) + '</span></a></li>';
        }).join('');
      }
      list.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      setActive(-1);
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', function () { if (input.value.trim().length >= 2) render(); });
    input.addEventListener('keydown', function (e) {
      if (list.hidden) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(active + 1, results.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(active - 1, 0)); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        var target = results[active >= 0 ? active : 0];
        if (target) window.location.href = target.url;
      } else if (e.key === 'Escape') { close(); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search')) close();
    });
  }

  /* ---------- Chapter cards (home + chapters page) ---------- */
  function renderChapterCards() {
    document.querySelectorAll('[data-chapter-list]').forEach(function (host) {
      var limit = parseInt(host.getAttribute('data-limit') || '0', 10);
      var list = SIG.chapterList || [];
      if (limit) list = list.slice(0, limit);
      host.innerHTML = list.map(function (c, i) {
        var live = c.status === 'available';
        var progress = live ? SIG.store.get('progress:' + c.id, null) : null;
        var best = live ? SIG.store.get('quiz:' + c.id, null) : null;
        var action = live
          ? '<a class="btn btn-primary btn-small" href="' + c.url + '">' + t(progress && progress.history && progress.history.length > 1 ? 'Continue story' : 'Play now') + '</a>'
          : '<span class="btn btn-secondary btn-small" aria-disabled="true">' + t('Coming soon') + '</span>';
        return '<article class="card chapter-card' + (live ? '' : ' is-soon') + '" id="' + c.id + '">' +
          '<span class="chapter-number">' + t('Chapter {n}', { n: i + 1 }) + '</span>' +
          '<h3>' + SIG.escape(c.title) + '</h3>' +
          '<div class="chapter-meta"><span class="badge ' + (live ? 'badge-live' : 'badge-soon') + '">' + t(live ? 'Available' : 'Coming soon') + '</span>' +
          '<span class="badge">' + SIG.escape(t(c.system)) + '</span><span class="badge">' + SIG.escape(t(c.inheritance)) + '</span></div>' +
          '<p>' + SIG.escape(c.tagline) + '</p>' +
          (best ? '<p class="muted mb-0">' + t('Your best quiz score:') + ' <strong>' + best.best + '/' + best.total + '</strong></p>' : '') +
          '<div class="card-actions">' + action + '</div></article>';
      }).join('');
    });
  }

  /* ---------- Share buttons ---------- */
  SIG.renderShare = function (host, text, url) {
    if (!host) return;
    var shareUrl = url || (window.location.origin + '/');
    var full = text + ' ' + shareUrl;
    var html = '';
    if (navigator.share) html += '<button type="button" class="btn btn-primary btn-small" data-share="native">' + t('Share') + '</button>';
    html +=
      '<a class="btn btn-secondary btn-small" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent(full) + '">WhatsApp</a>' +
      '<a class="btn btn-secondary btn-small" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=' + encodeURIComponent(text) + '&url=' + encodeURIComponent(shareUrl) + '">X / Twitter</a>' +
      '<a class="btn btn-secondary btn-small" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl) + '">Facebook</a>' +
      '<button type="button" class="btn btn-secondary btn-small" data-share="copy">' + t('Copy text') + '</button>';
    host.innerHTML = html;
    host.classList.add('share-row');
    host.addEventListener('click', function (e) {
      var b = e.target.closest('[data-share]');
      if (!b) return;
      if (b.getAttribute('data-share') === 'native') {
        navigator.share({ title: 'Stories in Our Genes', text: text, url: shareUrl }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(full).then(function () { SIG.toast(t('Copied! Paste it anywhere to share.')); });
      }
    });
  };

  /* ---------- Feedback forms ----------
     Collects only: a 1–5 rating, whether they learned something, and an
     optional comment. Never names, contact details or health information. */
  function initFeedbackForms() {
    document.querySelectorAll('form[data-feedback]').forEach(function (form) {
      var status = form.querySelector('.form-status');
      var chapter = form.getAttribute('data-chapter') || '';
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var fd = new FormData(form);
        var rating = parseInt(fd.get('rating'), 10);
        var learned = fd.get('learned');
        if (!rating || !learned) {
          status.className = 'form-status err';
          status.textContent = t('Please choose a rating and answer “Did you learn something new?”.');
          return;
        }
        var btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        status.className = 'form-status';
        status.textContent = t('Sending…');
        fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rating: rating,
            learned: learned,
            comment: String(fd.get('comment') || '').slice(0, 500),
            chapter: chapter,
            website: fd.get('website') || ''
          })
        }).then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            if (!res.ok || data.ok === false) throw new Error(data.error || 'Request failed');
          });
        }).then(function () {
          SIG.store.set('feedback-sent', Date.now());
          form.reset();
          status.className = 'form-status ok';
          status.textContent = t('Thank you! Your feedback helps improve this project.');
        }).catch(function () {
          status.className = 'form-status err';
          status.textContent = t('Sorry, we couldn’t send that right now. Please try again later.');
        }).finally(function () {
          btn.disabled = false;
        });
      });
    });
  }

  /* ---------- Language switch + review notice ---------- */
  function initLang() {
    document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
      var target = SIG.lang === 'en' ? 'tw' : 'en';
      btn.textContent = target === 'tw' ? 'Twi' : 'English';
      btn.setAttribute('lang', target);
      btn.setAttribute('aria-label', target === 'tw' ? 'Kenkan wɔ Twi mu (Read in Twi)' : 'Read in English');
      btn.addEventListener('click', function () { SIG.setLang(target); });
    });
    if (SIG.lang === 'tw') {
      var main = document.getElementById('main');
      if (main) {
        var note = document.createElement('div');
        note.className = 'lang-notice';
        note.innerHTML = '<div class="container">' + SIG.escape(t('This Twi translation is being reviewed by fluent speakers. If something reads wrongly, tell us in the feedback form.')) +
          ' <a href="#" data-lang-en lang="en">Read in English</a></div>';
        main.insertBefore(note, main.firstChild);
        note.querySelector('[data-lang-en]').addEventListener('click', function (e) { e.preventDefault(); SIG.setLang('en'); });
      }
    }
  }

  /* ---------- Boot ---------- */
  function boot() {
    if (SIG.applyI18n) SIG.applyI18n(document.body);
    initLang();
    initNav();
    initSearch();
    renderChapterCards();
    upgradeStaticTerms(document);
    initFeedbackForms();
    if (!document.body.hasAttribute('data-no-track')) SIG.track('page_view');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
