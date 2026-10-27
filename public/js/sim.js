/* Blood flow simulation (the engineering element).

   A simplified model of red blood cells flowing through a vessel that narrows
   into a capillary. Normal cells bend and squeeze through. Sickled cells are
   rigid and sticky, so some get trapped in the narrow section. Trapped cells
   reduce the space for blood to pass, which slows flow for every cell.

   Model (kept simple on purpose so it can be explained):
     s           = fraction of sickled cells (slider, 0 to 1)
     targetBlock = min(1, 1.15 * s^1.2)      how full the narrow part tends to get
     flow        = 1 - 0.85 * (trapped / maxTrapped)
   Cell speed = baseSpeed * flow. "Cells delivered" counts cells that exit
   on the right per second, a stand-in for oxygen delivered downstream.
   This is an educational model, not a medical prediction. */
(function (SIG) {
  'use strict';
  var t = SIG.t;

  var canvas = document.getElementById('sim-canvas');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  var slider = document.getElementById('sim-slider');
  var sliderOut = document.getElementById('sim-slider-value');
  var playBtn = document.getElementById('sim-play');
  var resetBtn = document.getElementById('sim-reset');
  var flowOut = document.getElementById('sim-flow');
  var blockOut = document.getElementById('sim-block');
  var rateOut = document.getElementById('sim-rate');
  var liveOut = document.getElementById('sim-live');

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var W = 600, H = 260, cx = 300;
  var WIDE = 82, NARROW = 20;
  var MAX_TRAPPED = 14;
  var BASE_SPEED = 95;       // px per second at full flow
  var CELL_R = 9;

  var cells = [];
  var trapped = 0;
  var flow = 1;
  var sickledFraction = 0;
  var running = !reduceMotion;
  var lastT = 0;
  var spawnAcc = 0;
  var exitTimes = [];
  var churnTimer = 0;
  var releaseTimer = 0;

  function halfWidth(x) {
    var d = (x - cx) / (W * 0.13);
    return WIDE - (WIDE - NARROW) * Math.exp(-d * d);
  }

  function targetTrapped() {
    var s = sickledFraction;
    if (s <= 0) return 0;
    return Math.round(Math.min(1, 1.15 * Math.pow(s, 1.2)) * MAX_TRAPPED);
  }

  function resize() {
    var rect = canvas.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    W = Math.max(300, Math.round(rect.width));
    H = 260;
    cx = W / 2;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (!running) draw();
  }

  function makeCell(x) {
    return {
      x: x,
      lane: (Math.random() * 2 - 1) * 0.75,   // position across the vessel, -1..1
      sickled: Math.random() < sickledFraction,
      trapped: false,
      wobble: Math.random() * Math.PI * 2,
      speedJitter: 0.85 + Math.random() * 0.3,
      rot: Math.random() * 360
    };
  }

  function seed() {
    cells = [];
    trapped = 0;
    flow = 1;
    exitTimes = [];
    var count = Math.round(W / 22);
    for (var i = 0; i < count; i++) cells.push(makeCell(Math.random() * W));
  }

  function step(dt, now) {
    var target = targetTrapped();

    // Spawn new cells on the left, proportional to flow.
    spawnAcc += dt * flow * (W / 22) * (BASE_SPEED / W);
    while (spawnAcc >= 1) { spawnAcc -= 1; cells.push(makeCell(-CELL_R * 2)); }

    // Release trapped cells if the slider went down, plus slow natural churn.
    releaseTimer += dt;
    churnTimer += dt;
    if (trapped > target && releaseTimer > 0.25) { releaseOne(); releaseTimer = 0; }
    if (trapped > 0 && churnTimer > 2.5) { releaseOne(); churnTimer = 0; }

    var speed = BASE_SPEED * flow;
    for (var i = cells.length - 1; i >= 0; i--) {
      var c = cells[i];
      c.wobble += dt * 2;
      if (c.trapped) continue;
      c.x += speed * c.speedJitter * dt;
      // A rigid sickled cell entering the narrow section may get stuck.
      if (c.sickled && Math.abs(c.x - cx) < 22 && trapped < target) {
        c.trapped = true;
        c.trapX = cx - 18 + Math.random() * 36;
        c.lane = (Math.random() * 2 - 1);
        trapped++;
      }
      if (c.x > W + CELL_R * 2) {
        cells.splice(i, 1);
        exitTimes.push(now);
      }
    }
    while (exitTimes.length && now - exitTimes[0] > 3000) exitTimes.shift();

    // Flow eases toward the value set by how many cells are trapped.
    var targetFlow = 1 - 0.85 * (trapped / MAX_TRAPPED);
    flow += (targetFlow - flow) * Math.min(1, dt * 2.5);
  }

  function releaseOne() {
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].trapped) {
        cells[i].trapped = false;
        cells[i].x = cx + 24;
        trapped--;
        return;
      }
    }
  }

  function drawVessel() {
    // Tissue around the vessel; it turns bluish downstream when flow drops.
    ctx.fillStyle = '#f6d3c9';
    ctx.fillRect(0, 0, W, H);
    var starve = Math.max(0, 1 - flow);
    if (starve > 0.05) {
      var g = ctx.createLinearGradient(cx, 0, W, 0);
      g.addColorStop(0, 'rgba(110, 90, 160, 0)');
      g.addColorStop(0.3, 'rgba(110, 90, 160,' + (starve * 0.55).toFixed(2) + ')');
      g.addColorStop(1, 'rgba(110, 90, 160,' + (starve * 0.55).toFixed(2) + ')');
      ctx.fillStyle = g;
      ctx.fillRect(cx, 0, W - cx, H);
    }
    var mid = H / 2;
    ctx.beginPath();
    for (var x = 0; x <= W; x += 6) ctx.lineTo(x, mid - halfWidth(x));
    for (var x2 = W; x2 >= 0; x2 -= 6) ctx.lineTo(x2, mid + halfWidth(x2));
    ctx.closePath();
    ctx.fillStyle = '#fff6f3';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#d9897a';
    ctx.stroke();

    ctx.fillStyle = '#7a4a40';
    ctx.font = '700 12px "Atkinson Hyperlegible", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(t('Narrow capillary'), cx, mid - NARROW - 14);
    ctx.textAlign = 'left';
    ctx.fillText(t('Blood in →'), 10, 18);
    ctx.textAlign = 'right';
    ctx.fillText(t(starve > 0.3 ? 'Tissue low on oxygen' : 'Oxygen reaches tissue'), W - 10, 18);
  }

  function drawCell(c) {
    var mid = H / 2;
    var hw = halfWidth(c.x) - CELL_R - 2;
    var y = mid + c.lane * Math.max(0, hw);
    var x = c.x;
    if (c.trapped) {
      // Pile trapped cells into the narrow section.
      y = mid + c.lane * (halfWidth(c.trapX) - CELL_R);
      x = c.trapX;
    }
    ctx.save();
    ctx.translate(x, y);
    if (c.sickled) {
      ctx.rotate(((c.rot + (c.trapped ? 0 : Math.sin(c.wobble) * 8)) * Math.PI) / 180);
      ctx.beginPath();
      ctx.moveTo(-CELL_R * 1.2, 0);
      ctx.arc(0, 0, CELL_R * 1.2, Math.PI, 0, false);
      ctx.quadraticCurveTo(0, -CELL_R * 0.55, -CELL_R * 1.2, 0);
      ctx.closePath();
      ctx.fillStyle = '#6e1a14';
      ctx.fill();
      if (c.trapped) { ctx.strokeStyle = '#c98a12'; ctx.lineWidth = 2; ctx.stroke(); }
    } else {
      // Normal cells squash a little in the narrow part (they bend).
      var squeeze = Math.min(1, (halfWidth(c.x) - 4) / (CELL_R * 2.2));
      ctx.scale(1 / Math.max(0.6, squeeze), Math.max(0.6, squeeze));
      ctx.beginPath();
      ctx.arc(0, 0, CELL_R, 0, Math.PI * 2);
      ctx.fillStyle = '#d63a2f';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, CELL_R * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240, 122, 108, .6)';
      ctx.fill();
    }
    ctx.restore();
  }

  function draw() {
    drawVessel();
    for (var i = 0; i < cells.length; i++) drawCell(cells[i]);
    if (!running) {
      ctx.fillStyle = 'rgba(31, 26, 23, .55)';
      ctx.fillRect(W / 2 - 80, H - 44, 160, 30);
      ctx.fillStyle = '#fff';
      ctx.font = '700 13px "Atkinson Hyperlegible", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(t('Paused: press Play'), W / 2, H - 24);
    }
  }

  var statTimer = 0;
  function updateStats(dt) {
    statTimer += dt;
    if (statTimer < 0.3) return;
    statTimer = 0;
    flowOut.textContent = Math.round(flow * 100) + '%';
    blockOut.textContent = Math.round((trapped / MAX_TRAPPED) * 100) + '%';
    rateOut.textContent = (exitTimes.length / 3).toFixed(1);
  }

  function loop(t) {
    if (!running) return;
    var dt = lastT ? Math.min(0.05, (t - lastT) / 1000) : 0.016;
    lastT = t;
    step(dt, t);
    draw();
    updateStats(dt);
    requestAnimationFrame(loop);
  }

  function setRunning(on) {
    running = on;
    playBtn.textContent = t(on ? 'Pause' : 'Play');
    playBtn.setAttribute('aria-pressed', on ? 'false' : 'true');
    if (on) { lastT = 0; requestAnimationFrame(loop); } else { draw(); }
  }

  function describe() {
    var pct = Math.round(sickledFraction * 100);
    var expectedFlow = Math.round((1 - 0.85 * (targetTrapped() / MAX_TRAPPED)) * 100);
    var v = { pct: pct, flow: expectedFlow };
    var msg;
    if (pct === 0) msg = t('With no sickled cells, every cell bends through the capillary and blood flows freely.');
    else if (expectedFlow > 80) msg = t('With {pct}% sickled cells, a few rigid cells get trapped. Flow drops to about {flow}% of normal.', v);
    else if (expectedFlow > 45) msg = t('With {pct}% sickled cells, the capillary is partly blocked. Flow drops to about {flow}% of normal, and tissue downstream gets less oxygen.', v);
    else msg = t('With {pct}% sickled cells, the capillary is mostly blocked. Flow drops to about {flow}% of normal. This is what causes a pain crisis.', v);
    liveOut.textContent = msg;
  }

  function applySlider() {
    sickledFraction = parseInt(slider.value, 10) / 100;
    sliderOut.textContent = slider.value + '%';
    // Re-roll which existing free cells are sickled so the change shows quickly.
    cells.forEach(function (c) { if (!c.trapped && c.x < cx - 40) c.sickled = Math.random() < sickledFraction; });
    describe();
    if (!running) { flow = 1 - 0.85 * (targetTrapped() / MAX_TRAPPED); draw(); updateStatsNow(); }
  }

  function updateStatsNow() { statTimer = 1; updateStats(0); }

  slider.addEventListener('input', applySlider);
  playBtn.addEventListener('click', function () { setRunning(!running); });
  resetBtn.addEventListener('click', function () {
    slider.value = 0;
    applySlider();
    seed();
    draw();
    updateStatsNow();
  });
  window.addEventListener('resize', function () { resize(); });

  resize();
  applySlider();
  seed();
  draw();
  updateStatsNow();
  setRunning(running);
})(window.SIG);
