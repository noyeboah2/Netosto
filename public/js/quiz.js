/* End-of-chapter quiz: one question at a time, instant explanations,
   final score with a review, best score saved in the browser. */
(function (SIG) {
  'use strict';
  var t = SIG.t;

  var root = document.getElementById('quiz-root');
  if (!root) return;

  var chapterId = SIG.qs('chapter') || 'sickle-cell';
  var chapter = SIG.chapters[chapterId];
  if (!chapter || !chapter.quiz) {
    root.innerHTML = '<div class="card"><h2>' + t('Quiz not found') + '</h2><a class="btn btn-primary" href="/chapters">' + t('See all chapters') + '</a></div>';
    return;
  }

  var heading = document.getElementById('quiz-title');
  if (heading) heading.textContent = t('{title} Quiz', { title: chapter.title });

  var questions = chapter.quiz;
  var index = 0;
  var answers = [];

  function renderQuestion() {
    var q = questions[index];
    root.innerHTML =
      '<div class="card quiz-card">' +
        '<p class="quiz-progress" aria-live="polite">' + t('Question {n} of {total}', { n: index + 1, total: questions.length }) + '</p>' +
        '<div class="progress-track" aria-hidden="true"><div class="progress-fill" id="quiz-fill"></div></div>' +
        '<h2 class="quiz-question mt-2" id="q-heading" tabindex="-1">' + SIG.escape(q.q) + '</h2>' +
        '<div class="quiz-options" role="group" aria-labelledby="q-heading">' +
          q.options.map(function (opt, i) {
            return '<button type="button" class="quiz-option" data-opt="' + i + '">' + String.fromCharCode(65 + i) + '. ' + SIG.escape(opt) + '</button>';
          }).join('') +
        '</div>' +
        '<div id="quiz-feedback" aria-live="polite"></div>' +
      '</div>';
    document.getElementById('quiz-fill').style.width = Math.round((index / questions.length) * 100) + '%';
    var h = document.getElementById('q-heading');
    if (h && index > 0) h.focus({ preventScroll: false });
  }

  function choose(i) {
    var q = questions[index];
    var correct = i === q.answer;
    answers[index] = i;
    root.querySelectorAll('.quiz-option').forEach(function (b, idx) {
      b.disabled = true;
      if (idx === q.answer) b.classList.add('correct');
      else if (idx === i) b.classList.add('incorrect');
    });
    var last = index === questions.length - 1;
    document.getElementById('quiz-feedback').innerHTML =
      '<div class="quiz-feedback ' + (correct ? 'is-correct' : 'is-incorrect') + '">' +
        '<strong>' + (correct ? t('Correct!') : t('Not quite. The answer is {letter}.', { letter: String.fromCharCode(65 + q.answer) })) + '</strong>' +
        '<p class="mb-0">' + SIG.escape(q.explain) + '</p>' +
      '</div>' +
      '<div class="btn-row mt-2"><button type="button" class="btn btn-primary" id="quiz-next">' + t(last ? 'See my score' : 'Next question →') + '</button></div>';
    document.getElementById('quiz-next').focus();
  }

  function renderResults() {
    var score = answers.reduce(function (s, a, i) { return s + (a === questions[i].answer ? 1 : 0); }, 0);
    var total = questions.length;
    var pct = Math.round((score / total) * 100);

    var prev = SIG.store.get('quiz:' + chapterId, null);
    var best = prev ? Math.max(prev.best, score) : score;
    SIG.store.set('quiz:' + chapterId, { last: score, best: best, total: total, at: Date.now() });
    SIG.track('quiz_score', { chapter: chapterId, value: pct });

    var message = t(pct === 100 ? 'Perfect score! You really understand how sickle cell works.'
      : pct >= 70 ? 'Great work! You understood most of the science.'
      : pct >= 40 ? 'Good start! Review the explanations below and try again.'
      : 'Keep going! Replay the story and you will get there.');

    root.innerHTML =
      '<div class="card quiz-card center">' +
        '<h2 id="result-heading" tabindex="-1">' + t('Your score') + '</h2>' +
        '<div class="score-ring" aria-label="' + t('{score} out of {total}', { score: score, total: total }) + '">' + score + '/' + total + '</div>' +
        '<p class="lead">' + message + '</p>' +
        (prev ? '<p class="muted">' + t('Your best score:') + ' ' + best + '/' + total + '</p>' : '') +
        '<div class="btn-row justify-center"></div>' +
      '</div>' +
      '<section class="mt-2" aria-labelledby="share-h"><h2 id="share-h">' + t('Share your result') + '</h2><div id="share-host"></div></section>' +
      '<section class="mt-2" aria-labelledby="review-h"><h2 id="review-h">' + t('Review your answers') + '</h2><ol class="review-list">' +
        questions.map(function (q, i) {
          var ok = answers[i] === q.answer;
          return '<li class="' + (ok ? 'ok' : 'miss') + '"><strong>' + (ok ? '✓ ' : '✗ ') + SIG.escape(q.q) + '</strong><br>' +
            '<span class="muted">' + t('Answer:') + ' ' + SIG.escape(q.options[q.answer]) + '.</span> ' + SIG.escape(q.explain) + '</li>';
        }).join('') +
      '</ol></section>';

    var row = root.querySelector('.btn-row');
    row.innerHTML =
      '<a class="btn btn-primary" href="/summary?chapter=' + chapterId + '">' + t('See what you learned →') + '</a>' +
      '<button type="button" class="btn btn-secondary" id="quiz-retry">' + t('Try the quiz again') + '</button>';

    SIG.renderShare(document.getElementById('share-host'),
      t('I scored {score}/{total} on the {title} quiz on Stories in Our Genes! Can you beat me?', { score: score, total: total, title: chapter.title }),
      window.location.origin + '/story?chapter=' + chapterId + (SIG.lang !== 'en' ? '&lang=' + SIG.lang : ''));

    document.getElementById('result-heading').focus();
  }

  root.addEventListener('click', function (e) {
    var opt = e.target.closest('[data-opt]');
    if (opt && !opt.disabled) { choose(parseInt(opt.getAttribute('data-opt'), 10)); return; }
    if (e.target.closest('#quiz-next')) {
      if (index < questions.length - 1) { index++; renderQuestion(); } else { renderResults(); }
      return;
    }
    if (e.target.closest('#quiz-retry')) {
      index = 0; answers = []; renderQuestion();
      root.scrollIntoView({ behavior: 'smooth' });
    }
  });

  renderQuestion();
})(window.SIG);
