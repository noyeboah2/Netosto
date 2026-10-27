/* ==========================================================================
   Language support (English + Twi). Loaded FIRST on every page.

   How it works
   - The language comes from ?lang=tw in the link, or the visitor's last choice
     (saved in their browser). English is the default.
   - UI and page text: one dictionary per language, keyed by the ENGLISH text.
     SIG.t('Start the story →') returns the Twi version, or the English if no
     translation exists yet. Variables: SIG.t('Question {n} of {total}', {n: 1, total: 10}).
   - Static HTML pages are translated by applyI18n(), which swaps every text
     node, placeholder and aria-label that has a dictionary entry.
   - Story, quiz and glossary content have their own translation files
     (js/data/*.tw.js) keyed by scene and term id.

   To add another language later (e.g. Ewe 'ee' or Ga 'gaa'): add it to
   SIG.languages, create js/i18n/<code>.js and js/data/*.<code>.js files.
   ========================================================================== */
(function () {
  'use strict';

  var SIG = (window.SIG = window.SIG || {});

  SIG.languages = { en: 'English', tw: 'Twi' };
  SIG.strings = SIG.strings || {};          // SIG.strings.tw = { 'English text': 'Twi text' }
  SIG.translations = SIG.translations || {}; // chapter content, by chapter id then language
  SIG.glossaryTranslations = SIG.glossaryTranslations || {};

  function pickLang() {
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(window.location.search).get('lang'); } catch (e) { /* old browser */ }
    if (fromUrl && SIG.languages[fromUrl]) {
      try { localStorage.setItem('sig:lang', JSON.stringify(fromUrl)); } catch (e) { /* ignore */ }
      return fromUrl;
    }
    try {
      var saved = JSON.parse(localStorage.getItem('sig:lang'));
      if (saved && SIG.languages[saved]) return saved;
    } catch (e) { /* ignore */ }
    return 'en';
  }

  SIG.lang = pickLang();
  document.documentElement.lang = SIG.lang;
  if (SIG.lang !== 'en') document.documentElement.classList.add('lang-' + SIG.lang);

  function clean(s) { return String(s).replace(/\s+/g, ' ').trim(); }

  /** Translate an English UI string. Unknown strings fall back to English. */
  SIG.t = function (english, vars) {
    var out = english;
    if (SIG.lang !== 'en') {
      var dict = SIG.strings[SIG.lang] || {};
      var hit = dict[english] || dict[clean(english)];
      if (hit) out = hit;
    }
    if (vars) {
      out = out.replace(/\{(\w+)\}/g, function (m, k) { return k in vars ? vars[k] : m; });
    }
    return out;
  };

  SIG.setLang = function (code) {
    if (!SIG.languages[code]) return;
    try { localStorage.setItem('sig:lang', JSON.stringify(code)); } catch (e) { /* ignore */ }
    var url = new URL(window.location.href);
    if (code === 'en') url.searchParams.delete('lang'); else url.searchParams.set('lang', code);
    window.location.href = url.toString();
  };

  /** Copy of a chapter with the current language's text merged in. */
  SIG.localizeChapter = function (ch) {
    var tr = (SIG.translations[ch.id] || {})[SIG.lang];
    if (SIG.lang === 'en' || !tr) return ch;
    var out = Object.assign({}, ch, {
      title: tr.title || ch.title,
      storyTitle: tr.storyTitle || ch.storyTitle,
      summary: tr.summary || ch.summary,
      scenes: {}
    });
    Object.keys(ch.scenes).forEach(function (id) {
      var s = ch.scenes[id], t = (tr.scenes || {})[id] || {};
      var note = s.note && Object.assign({}, s.note, t.note ? {
        title: t.note.title || s.note.title,
        text: t.note.text || s.note.text,
        link: s.note.link && Object.assign({}, s.note.link, { label: t.note.link || s.note.link.label })
      } : {});
      out.scenes[id] = Object.assign({}, s, {
        title: t.title || s.title,
        text: t.text || s.text,
        note: note,
        ending: s.ending && { label: t.ending || s.ending.label },
        choices: (s.choices || []).map(function (c, i) {
          return Object.assign({}, c, { label: (t.choices || [])[i] || c.label });
        })
      });
    });
    out.quiz = (ch.quiz || []).map(function (q, i) {
      var t = (tr.quiz || [])[i];
      return t ? Object.assign({}, q, { q: t.q, options: t.options, explain: t.explain }) : q;
    });
    return out;
  };

  /** Translate the static text already in the page's HTML. */
  SIG.applyI18n = function (root) {
    if (SIG.lang === 'en') return;
    var dict = SIG.strings[SIG.lang] || {};
    root = root || document.body;

    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|TEXTAREA)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('[data-no-i18n]')) return NodeFilter.FILTER_REJECT;
        return /[A-Za-z]/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      var key = clean(n.nodeValue);
      if (dict[key]) {
        var lead = /^\s/.test(n.nodeValue) ? ' ' : '';
        var trail = /\s$/.test(n.nodeValue) ? ' ' : '';
        n.nodeValue = lead + dict[key] + trail;
      }
    });

    root.querySelectorAll('[placeholder],[aria-label]').forEach(function (el) {
      ['placeholder', 'aria-label'].forEach(function (attr) {
        var v = el.getAttribute(attr);
        if (v && dict[clean(v)]) el.setAttribute(attr, dict[clean(v)]);
      });
    });

    var parts = document.title.split(' · ');
    document.title = parts.map(function (p) { return dict[p] || p; }).join(' · ');
    var desc = document.querySelector('meta[name="description"]');
    if (desc && dict[desc.content]) desc.content = dict[desc.content];
  };
})();
