/* Interactive story engine.
   Works for any chapter registered with SIG.registerChapter().
   URL options:  /story?chapter=sickle-cell            (resume or start)
                 /story?chapter=sickle-cell&scene=lungs (jump to a scene, e.g. from search) */
(function (SIG) {
  'use strict';

  var root = document.getElementById('story-root');
  if (!root) return;

  var chapterId = SIG.qs('chapter') || 'sickle-cell';
  var chapter = SIG.chapters[chapterId];
  if (!chapter) {
    root.innerHTML = '<div class="card"><h2>Chapter not found</h2><p>This chapter is not available yet.</p><a class="btn btn-primary" href="/chapters">See all chapters</a></div>';
    return;
  }

  var KEY = 'progress:' + chapterId;
  var state = SIG.store.get(KEY, null);
  var jumpTo = SIG.qs('scene');

  if (jumpTo && chapter.scenes[jumpTo]) {
    state = { history: [jumpTo], completedRun: false };
  } else if (state && state.history && state.history.length && state.history.every(function (id) { return chapter.scenes[id]; })) {
    if (state.history.length > 1) setTimeout(function () { SIG.toast('Welcome back! Your progress was restored.'); }, 400);
  } else {
    state = { history: [chapter.start], completedRun: false };
    SIG.track('chapter_start', { chapter: chapterId });
  }

  document.title = chapter.storyTitle + ' · Stories in Our Genes';
  var titleEl = document.getElementById('story-title');
  if (titleEl) titleEl.textContent = chapter.title + ': ' + chapter.storyTitle;

  var progressFill = document.getElementById('progress-fill');
  var progressTrack = document.getElementById('progress-track');
  var progressText = document.getElementById('progress-text');
  var progressPct = document.getElementById('progress-pct');

  function save() { SIG.store.set(KEY, state); }

  function current() { return state.history[state.history.length - 1]; }

  function updateProgress(scene) {
    var pct = Math.round((scene.step / chapter.totalSteps) * 100);
    progressFill.style.width = pct + '%';
    progressTrack.setAttribute('aria-valuenow', String(pct));
    progressText.textContent = scene.ending ? 'Story complete' : 'Scene ' + state.history.length;
    progressPct.textContent = pct + '%';
  }

  function render(moveFocus) {
    var id = current();
    var scene = chapter.scenes[id];
    var paragraphs = scene.text.map(function (p) { return '<p>' + SIG.renderTerms(p) + '</p>'; }).join('');
    var note = '';
    if (scene.note) {
      note = '<details class="science-note" open><summary>What’s really happening: ' + SIG.escape(scene.note.title) + '</summary><div class="note-content">' +
        scene.note.text.map(function (p) { return '<p>' + SIG.renderTerms(p) + '</p>'; }).join('') +
        (scene.note.link ? '<p><a href="' + scene.note.link.href + '">' + SIG.escape(scene.note.link.label) + ' →</a></p>' : '') +
        '</div></details>';
    }

    var choices;
    if (scene.ending) {
      choices = '<div class="choices"><a class="btn btn-primary" href="/quiz?chapter=' + chapterId + '">Take the quiz (10 questions) →</a>' +
        '<a class="btn btn-secondary" href="/summary?chapter=' + chapterId + '">See what you learned</a></div>';
    } else {
      choices = '<div class="choices" role="group" aria-label="Choose what happens next">' + scene.choices.map(function (c, i) {
        return '<button type="button" class="choice-btn" data-choice="' + i + '"><span>' + SIG.escape(c.label) + '</span><span class="arrow" aria-hidden="true">→</span></button>';
      }).join('') + '</div>';
    }

    root.innerHTML =
      '<article class="story-card">' +
        '<div class="story-art">' + SIG.art(scene.art, scene.title) + '</div>' +
        '<div class="story-body">' +
          (scene.ending ? '<span class="story-ending-badge">' + SIG.escape(scene.ending.label) + '</span>' : '') +
          '<h2 id="scene-heading" tabindex="-1">' + SIG.escape(scene.title) + '</h2>' +
          '<div class="story-text">' + paragraphs + '</div>' + note + choices +
        '</div>' +
      '</article>';

    updateProgress(scene);
    document.getElementById('btn-back').disabled = state.history.length <= 1;

    if (scene.ending && !state.completedRun) {
      state.completedRun = true;
      var done = SIG.store.get('completed', {});
      done[chapterId] = { at: Date.now(), ending: id };
      SIG.store.set('completed', done);
      SIG.track('chapter_complete', { chapter: chapterId, value: id });
    }
    save();

    if (moveFocus) {
      var h = document.getElementById('scene-heading');
      if (h) h.focus({ preventScroll: true });
      var top = document.getElementById('story-top');
      if (top) top.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  root.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-choice]');
    if (!btn) return;
    var scene = chapter.scenes[current()];
    var choice = scene.choices[parseInt(btn.getAttribute('data-choice'), 10)];
    var next = choice.route ? choice.route(state.history) : choice.to;
    if (!chapter.scenes[next]) return;
    state.history.push(next);
    render(true);
  });

  document.getElementById('btn-back').addEventListener('click', function () {
    if (state.history.length <= 1) return;
    state.history.pop();
    render(true);
  });

  document.getElementById('btn-restart').addEventListener('click', function () {
    state = { history: [chapter.start], completedRun: false };
    SIG.track('chapter_start', { chapter: chapterId });
    render(true);
    SIG.toast('Story restarted from the beginning.');
  });

  render(false);
})(window.SIG);
