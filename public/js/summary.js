/* "What you learned" page: key lessons, the visitor's progress, share buttons. */
(function (SIG) {
  'use strict';

  var root = document.getElementById('summary-root');
  if (!root) return;

  var chapterId = SIG.qs('chapter') || 'sickle-cell';
  var chapter = SIG.chapters[chapterId];
  if (!chapter) {
    root.innerHTML = '<div class="card"><h2>Chapter not found</h2><a class="btn btn-primary" href="/chapters">See all chapters</a></div>';
    return;
  }

  document.getElementById('summary-title').textContent = 'What you learned: ' + chapter.title;

  var completed = (SIG.store.get('completed', {}) || {})[chapterId];
  var quiz = SIG.store.get('quiz:' + chapterId, null);

  var status =
    '<div class="grid grid-3">' +
      '<div class="stat"><div class="stat-label">Story</div><div class="stat-value">' + (completed ? 'Completed ✓' : 'Not finished') + '</div></div>' +
      '<div class="stat"><div class="stat-label">Best quiz score</div><div class="stat-value">' + (quiz ? quiz.best + '/' + quiz.total : 'Not taken') + '</div></div>' +
      '<div class="stat"><div class="stat-label">Key lessons</div><div class="stat-value">' + chapter.summary.length + '</div></div>' +
    '</div>';

  var next =
    '<div class="btn-row mt-2">' +
      (completed ? '' : '<a class="btn btn-primary" href="/story?chapter=' + chapterId + '">Play the story</a>') +
      (quiz ? '' : '<a class="btn btn-primary" href="/quiz?chapter=' + chapterId + '">Take the quiz</a>') +
      '<a class="btn btn-secondary" href="/lab">Try the Inheritance Lab</a>' +
      '<a class="btn btn-secondary" href="/learn#simulation">Watch the blood flow simulation</a>' +
    '</div>';

  root.innerHTML = status + next +
    '<section class="section-tight" aria-labelledby="lessons-h"><h2 id="lessons-h">Key lessons</h2>' +
    '<ol class="learned-list">' + chapter.summary.map(function (s) { return '<li>' + SIG.escape(s) + '</li>'; }).join('') + '</ol></section>' +
    '<section class="section-tight" aria-labelledby="share-h"><h2 id="share-h">Teach someone else</h2>' +
    '<p>The best way to remember something is to explain it. Share this story with a friend or family member.</p><div id="share-host"></div></section>';

  var text = quiz
    ? 'I just learned how sickle cell disease works and scored ' + quiz.best + '/' + quiz.total + ' on the quiz. Try the story on Stories in Our Genes!'
    : 'I just learned how sickle cell disease works by playing as a red blood cell. Try it on Stories in Our Genes!';
  SIG.renderShare(document.getElementById('share-host'), text, window.location.origin + '/story?chapter=' + chapterId);
})(window.SIG);
