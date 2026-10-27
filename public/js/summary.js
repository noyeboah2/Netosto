/* "What you learned" page: key lessons, the visitor's progress, share buttons. */
(function (SIG) {
  'use strict';
  var t = SIG.t;

  var root = document.getElementById('summary-root');
  if (!root) return;

  var chapterId = SIG.qs('chapter') || 'sickle-cell';
  var chapter = SIG.chapters[chapterId];
  if (!chapter) {
    root.innerHTML = '<div class="card"><h2>' + t('Chapter not found') + '</h2><a class="btn btn-primary" href="/chapters">' + t('See all chapters') + '</a></div>';
    return;
  }

  document.getElementById('summary-title').textContent = t('What you learned: {title}', { title: chapter.title });

  var completed = (SIG.store.get('completed', {}) || {})[chapterId];
  var quiz = SIG.store.get('quiz:' + chapterId, null);

  var status =
    '<div class="grid grid-3">' +
      '<div class="stat"><div class="stat-label">' + t('Story') + '</div><div class="stat-value">' + t(completed ? 'Completed ✓' : 'Not finished') + '</div></div>' +
      '<div class="stat"><div class="stat-label">' + t('Best quiz score') + '</div><div class="stat-value">' + (quiz ? quiz.best + '/' + quiz.total : t('Not taken')) + '</div></div>' +
      '<div class="stat"><div class="stat-label">' + t('Key lessons') + '</div><div class="stat-value">' + chapter.summary.length + '</div></div>' +
    '</div>';

  var next =
    '<div class="btn-row mt-2">' +
      (completed ? '' : '<a class="btn btn-primary" href="/story?chapter=' + chapterId + '">' + t('Play the story') + '</a>') +
      (quiz ? '' : '<a class="btn btn-primary" href="/quiz?chapter=' + chapterId + '">' + t('Take the quiz') + '</a>') +
      '<a class="btn btn-secondary" href="/lab">' + t('Try the Inheritance Lab') + '</a>' +
      '<a class="btn btn-secondary" href="/learn#simulation">' + t('Watch the blood flow simulation') + '</a>' +
    '</div>';

  root.innerHTML = status + next +
    '<section class="section-tight" aria-labelledby="lessons-h"><h2 id="lessons-h">' + t('Key lessons') + '</h2>' +
    '<ol class="learned-list">' + chapter.summary.map(function (s) { return '<li>' + SIG.escape(s) + '</li>'; }).join('') + '</ol></section>' +
    '<section class="section-tight" aria-labelledby="share-h"><h2 id="share-h">' + t('Teach someone else') + '</h2>' +
    '<p>' + t('The best way to remember something is to explain it. Share this story with a friend or family member.') + '</p><div id="share-host"></div></section>';

  var text = quiz
    ? t('I just learned how sickle cell disease works and scored {score}/{total} on the quiz. Try the story on Stories in Our Genes!', { score: quiz.best, total: quiz.total })
    : t('I just learned how sickle cell disease works by playing as a red blood cell. Try it on Stories in Our Genes!');
  SIG.renderShare(document.getElementById('share-host'), text, window.location.origin + '/story?chapter=' + chapterId + (SIG.lang !== 'en' ? '&lang=' + SIG.lang : ''));
})(window.SIG);
