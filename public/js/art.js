/* Story illustrations drawn as inline SVG (no image downloads, fast on
   mobile data). SIG.art(key, label) returns an accessible SVG string. */
(function (SIG) {
  'use strict';

  var RED = '#d63a2f', RED_DARK = '#9e2219', RED_LIGHT = '#f07a6c', SICKLE = '#7a1d16';

  function rbc(x, y, r, opacity) {
    return '<g transform="translate(' + x + ' ' + y + ')" opacity="' + (opacity || 1) + '">' +
      '<circle r="' + r + '" fill="' + RED + '"/>' +
      '<circle r="' + (r * 0.55) + '" fill="' + RED_LIGHT + '" opacity=".55"/>' +
      '<circle r="' + r + '" fill="none" stroke="' + RED_DARK + '" stroke-width="1.5"/></g>';
  }

  function sickle(x, y, s, rot) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ')">' +
      '<path d="M' + (-s) + ' 0 A' + s + ' ' + s + ' 0 0 1 ' + s + ' 0 Q0 ' + (-s * 0.45) + ' ' + (-s) + ' 0 Z" fill="' + SICKLE + '" stroke="#4d100c" stroke-width="1.2"/></g>';
  }

  /* The player character: a cell with a friendly face. */
  function hero(x, y, r, mood) {
    var mouth = mood === 'sad'
      ? '<path d="M-7 9 Q0 3 7 9" fill="none" stroke="#3a0d09" stroke-width="2.2" stroke-linecap="round"/>'
      : mood === 'worried'
        ? '<path d="M-6 8 L6 8" stroke="#3a0d09" stroke-width="2.2" stroke-linecap="round"/>'
        : '<path d="M-7 5 Q0 12 7 5" fill="none" stroke="#3a0d09" stroke-width="2.2" stroke-linecap="round"/>';
    return '<g transform="translate(' + x + ' ' + y + ')">' +
      '<circle r="' + r + '" fill="' + RED + '" stroke="' + RED_DARK + '" stroke-width="2"/>' +
      '<circle r="' + (r * 0.6) + '" fill="' + RED_LIGHT + '" opacity=".45"/>' +
      '<circle cx="-7" cy="-4" r="3" fill="#3a0d09"/><circle cx="7" cy="-4" r="3" fill="#3a0d09"/>' +
      '<circle cx="-6" cy="-5" r="1" fill="#fff"/><circle cx="8" cy="-5" r="1" fill="#fff"/>' + mouth + '</g>';
  }

  function heroSickle(x, y, mood) {
    return '<g transform="translate(' + x + ' ' + y + ')">' + sickle(0, 8, 34, 0) +
      '<circle cx="-8" cy="-2" r="2.6" fill="#ffd9d4"/><circle cx="8" cy="-2" r="2.6" fill="#ffd9d4"/>' +
      (mood === 'sad'
        ? '<path d="M-6 6 Q0 2 6 6" fill="none" stroke="#ffd9d4" stroke-width="2" stroke-linecap="round"/>'
        : '<path d="M-5 5 L5 5" stroke="#ffd9d4" stroke-width="2" stroke-linecap="round"/>') + '</g>';
  }

  function bg(c1, c2) {
    return '<defs><linearGradient id="g' + c1.slice(1) + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect width="400" height="260" fill="url(#g' + c1.slice(1) + ')"/>';
  }

  function vesselWalls(narrow) {
    var top = narrow ? 'M0 60 C120 60 150 105 200 105 C250 105 280 60 400 60' : 'M0 70 L400 70';
    var bot = narrow ? 'M0 200 C120 200 150 155 200 155 C250 155 280 200 400 200' : 'M0 190 L400 190';
    return '<path d="' + top + ' L400 0 L0 0 Z" fill="#f3c4b9"/><path d="' + bot + ' L400 260 L0 260 Z" fill="#f3c4b9"/>' +
      '<path d="' + top + '" fill="none" stroke="#d9897a" stroke-width="4"/><path d="' + bot + '" fill="none" stroke="#d9897a" stroke-width="4"/>';
  }

  function label(x, y, text, color) {
    text = SIG.escape(SIG.t ? SIG.t(text) : text);
    return '<text x="' + x + '" y="' + y + '" font-family="Atkinson Hyperlegible, sans-serif" font-size="13" font-weight="700" fill="' + (color || '#5e554f') + '" text-anchor="middle">' + text + '</text>';
  }

  var scenes = {
    marrow: function () {
      var dots = '';
      var pts = [[60, 60], [110, 200], [330, 70], [350, 190], [80, 130], [300, 130], [160, 50], [250, 215]];
      pts.forEach(function (p, i) { dots += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (10 + (i % 3) * 4) + '" fill="#f6d6a8" stroke="#e2b77a" stroke-width="2"/>'; });
      return bg('#fde9cf', '#f8d3a6') + dots +
        '<circle cx="200" cy="130" r="70" fill="#fff3e2" opacity=".7"/>' +
        hero(200, 130, 34, 'happy') + rbc(120, 90, 14, .8) + rbc(285, 175, 16, .8) +
        label(200, 240, 'Bone marrow: where you begin');
    },
    dna: function () {
      var rungs = '';
      for (var i = 0; i < 13; i++) {
        var x = 40 + i * 26, y1 = 130 + Math.sin(i * 0.7) * 55, y2 = 130 - Math.sin(i * 0.7) * 55;
        var hi = i === 6;
        rungs += '<line x1="' + x + '" y1="' + y1 + '" x2="' + x + '" y2="' + y2 + '" stroke="' + (hi ? '#c98a12' : '#9bc9c6') + '" stroke-width="' + (hi ? 7 : 4) + '" stroke-linecap="round"/>';
        rungs += '<circle cx="' + x + '" cy="' + y1 + '" r="6" fill="#0f6e6e"/><circle cx="' + x + '" cy="' + y2 + '" r="6" fill="#0f6e6e"/>';
      }
      return bg('#e7f4f3', '#cfe9e7') + rungs +
        '<circle cx="196" cy="130" r="22" fill="none" stroke="#c98a12" stroke-width="3" stroke-dasharray="5 4"/>' +
        '<rect x="98" y="200" width="204" height="34" rx="17" fill="#fff"/>' + label(200, 222, 'A → T: one letter changed', '#7a5208');
    },
    vessel: function () {
      var cells = rbc(60, 110, 16) + rbc(110, 160, 15) + rbc(300, 105, 15) + rbc(345, 160, 16) + rbc(250, 165, 14) + rbc(150, 95, 13);
      return bg('#fff1ec', '#ffe2d9') + vesselWalls(false) + cells + hero(200, 130, 28, 'happy') + label(200, 240, 'Flowing through a blood vessel');
    },
    lungs: function () {
      var air = '';
      [[90, 70], [130, 50], [270, 55], [310, 80], [200, 40]].forEach(function (p) { air += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="12" fill="#fff" stroke="#9bc9c6" stroke-width="2"/>' + '<text x="' + p[0] + '" y="' + (p[1] + 4) + '" font-size="10" font-family="sans-serif" fill="#0f6e6e" text-anchor="middle" font-weight="700">O₂</text>'; });
      return bg('#e8f3fb', '#cfe5f5') +
        '<path d="M150 90 C90 100 70 190 110 215 C140 230 175 210 180 180 L185 110 Z" fill="#f4b8c0" stroke="#dd8b97" stroke-width="3"/>' +
        '<path d="M250 90 C310 100 330 190 290 215 C260 230 225 210 220 180 L215 110 Z" fill="#f4b8c0" stroke="#dd8b97" stroke-width="3"/>' +
        '<path d="M200 40 L200 110 M200 110 L185 125 M200 110 L215 125" stroke="#dd8b97" stroke-width="6" stroke-linecap="round" fill="none"/>' +
        air + hero(200, 175, 26, 'happy') + label(200, 245, 'Loading up with oxygen');
    },
    sickle: function () {
      return bg('#fff4d6', '#ffe0a3') +
        '<circle cx="340" cy="50" r="28" fill="#ffc542"/><g stroke="#ffc542" stroke-width="4" stroke-linecap="round"><line x1="340" y1="8" x2="340" y2="0"/><line x1="382" y1="50" x2="392" y2="50"/><line x1="370" y1="20" x2="377" y2="13"/><line x1="298" y1="50" x2="290" y2="50"/></g>' +
        rbc(80, 90, 18) + sickle(110, 180, 22, 20) + sickle(300, 170, 20, -15) + rbc(250, 90, 15, .9) +
        heroSickle(195, 135, 'worried') + label(200, 240, 'Low oxygen + heat + no water');
    },
    calm: function () {
      return bg('#eef0fb', '#dde1f6') +
        '<path d="M130 70 C130 30 270 30 270 70 C300 80 300 130 270 140 C260 180 150 180 135 145 C100 135 100 85 130 70 Z" fill="#f1c7d3" stroke="#d99aad" stroke-width="3"/>' +
        '<path d="M160 70 Q180 90 165 110 M200 55 Q215 85 200 115 M240 70 Q225 95 240 120" stroke="#d99aad" stroke-width="3" fill="none"/>' +
        hero(200, 205, 24, 'happy') + rbc(120, 210, 13, .8) + rbc(280, 210, 13, .8) + label(200, 250, 'A steady day');
    },
    recover: function () {
      return bg('#e7f6ea', '#cdebd4') +
        '<rect x="40" y="70" width="18" height="140" rx="6" fill="#8a5a33"/><circle cx="49" cy="70" r="55" fill="#4f9d5d"/><circle cx="90" cy="95" r="35" fill="#5fb06c"/>' +
        '<rect x="300" y="110" width="34" height="80" rx="10" fill="#bfe3f5" stroke="#6fb3d6" stroke-width="3"/><rect x="308" y="96" width="18" height="16" rx="4" fill="#6fb3d6"/><rect x="304" y="150" width="26" height="36" rx="6" fill="#7cc4e8"/>' +
        hero(200, 135, 32, 'happy') + label(200, 240, 'Water and rest: back to round');
    },
    blocked: function () {
      var jam = sickle(185, 125, 20, 30) + sickle(205, 140, 20, -20) + sickle(195, 115, 18, 70) + sickle(215, 120, 17, 120) + sickle(180, 145, 17, -60) + sickle(220, 145, 16, 10);
      return bg('#fde8e6', '#f8cfcb') + vesselWalls(true) + rbc(60, 120, 15) + rbc(90, 150, 14) + rbc(120, 115, 14) + jam +
        '<g fill="#c98a12"><path d="M268 72 l8 -16 l4 12 l10 -14 l-4 22 z"/><path d="M290 190 l12 -6 l-2 10 l14 -2 l-18 12 z"/></g>' +
        label(335, 135, 'No oxygen', '#8c1c16') + label(200, 240, 'Blocked vessel: a pain crisis');
    },
    warning: function () {
      return bg('#fff0e3', '#ffd9bd') +
        '<path d="M200 40 L300 200 L100 200 Z" fill="#ffc542" stroke="#c98a12" stroke-width="6" stroke-linejoin="round"/>' +
        '<rect x="192" y="90" width="16" height="64" rx="8" fill="#5a3b00"/><circle cx="200" cy="176" r="9" fill="#5a3b00"/>' +
        label(200, 240, 'Fever + chest pain + hard to breathe');
    },
    hospital: function () {
      return bg('#eef6fb', '#d8eaf6') +
        '<rect x="70" y="80" width="260" height="130" rx="12" fill="#fff" stroke="#b9d3e6" stroke-width="3"/>' +
        '<rect x="180" y="40" width="40" height="40" rx="6" fill="#fff" stroke="#b9d3e6" stroke-width="3"/><rect x="194" y="48" width="12" height="24" fill="#d63a2f"/><rect x="188" y="54" width="24" height="12" fill="#d63a2f"/>' +
        '<line x1="300" y1="100" x2="300" y2="190" stroke="#8aa6bb" stroke-width="4"/><rect x="285" y="96" width="30" height="40" rx="8" fill="#cfeaff" stroke="#6fb3d6" stroke-width="2"/>' +
        '<path d="M300 136 Q280 170 245 165" stroke="#6fb3d6" stroke-width="3" fill="none"/>' +
        hero(170, 150, 28, 'happy') + rbc(115, 150, 14, .9) + label(200, 240, 'Fluids, pain relief and oxygen');
    },
    spleen: function () {
      return bg('#f5ecf7', '#e7d5ec') +
        '<path d="M120 80 C170 40 300 50 300 120 C300 190 210 215 150 190 C100 170 80 110 120 80 Z" fill="#b5577a" stroke="#8a3a59" stroke-width="4"/>' +
        '<path d="M160 120 Q200 100 240 125 M170 155 Q210 140 250 160" stroke="#8a3a59" stroke-width="3" fill="none" opacity=".6"/>' +
        '<g opacity=".85">' + sickle(150, 115, 14, 30) + sickle(260, 140, 13, -40) + '</g>' +
        '<g transform="translate(205 140)">' + sickle(0, 6, 26, 10) + '<circle cx="-6" cy="0" r="2.2" fill="#ffd9d4"/><circle cx="6" cy="0" r="2.2" fill="#ffd9d4"/></g>' +
        label(200, 240, 'The spleen: the blood’s filter');
    },
    medicine: function () {
      return bg('#eaf6f4', '#d2ece8') +
        '<g transform="translate(110 120) rotate(-30)"><rect x="-40" y="-16" width="80" height="32" rx="16" fill="#fff" stroke="#0f6e6e" stroke-width="3"/><path d="M0 -16 L24 -16 A16 16 0 0 1 24 16 L0 16 Z" fill="#0f6e6e"/></g>' +
        '<g fill="#0f6e6e" opacity=".85"><circle cx="300" cy="80" r="6"/><circle cx="320" cy="110" r="4"/><circle cx="280" cy="115" r="5"/></g>' +
        hero(220, 140, 28, 'happy') + rbc(290, 175, 16) + rbc(330, 150, 13) + label(200, 240, 'Medicines that reduce sickling');
    },
    ending: function () {
      var confetti = '';
      var cols = ['#d63a2f', '#0f6e6e', '#c98a12', '#4f9d5d'];
      for (var i = 0; i < 22; i++) {
        var x = (i * 53) % 380 + 10, y = (i * 37) % 120 + 10;
        confetti += '<rect x="' + x + '" y="' + y + '" width="8" height="4" rx="1" fill="' + cols[i % 4] + '" transform="rotate(' + (i * 29) + ' ' + x + ' ' + y + ')"/>';
      }
      return bg('#fff7e8', '#fde8c4') + confetti +
        '<circle cx="200" cy="140" r="58" fill="#fff" opacity=".7"/>' + hero(200, 140, 36, 'happy') +
        rbc(110, 170, 16) + rbc(290, 170, 16) + label(200, 240, 'Journey complete!');
    }
  };

  SIG.art = function (key, labelText) {
    var draw = scenes[key] || scenes.vessel;
    return '<svg viewBox="0 0 400 260" role="img" aria-label="' + SIG.escape(labelText || 'Story illustration') + '" xmlns="http://www.w3.org/2000/svg">' + draw() + '</svg>';
  };

  /* Small hero illustration for the home page. */
  SIG.heroArt = function () {
    return '<svg viewBox="0 0 400 260" role="img" aria-label="' + SIG.escape(SIG.t('A smiling red blood cell travelling through a blood vessel alongside a sickle-shaped cell')) + '" xmlns="http://www.w3.org/2000/svg">' +
      bg('#fff1ec', '#ffe0d6') + vesselWalls(false) + rbc(70, 105, 16) + rbc(320, 165, 16) + rbc(120, 165, 14) + sickle(300, 100, 22, -15) +
      hero(205, 130, 34, 'happy') + '</svg>';
  };
})(window.SIG);
