/* SOUP site behavior: nav, timeline state, reveals, and the stirrable broth. */
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Nav: mobile toggle, close dropdown on outside click, hairline once scrolled */
  var nav = document.getElementById('site-nav');
  if (nav) {
    var toggle = nav.querySelector('.nav-toggle');
    toggle.addEventListener('click', function () {
      var open = root.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('click', function (e) {
      nav.querySelectorAll('details[open]').forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute('open'); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      nav.querySelectorAll('details[open]').forEach(function (d) { d.removeAttribute('open'); });
      root.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false');
    });
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Registration timeline: fill passed dates, mark the next one, swap the CTA */
  var steps = document.getElementById('steps');
  if (steps) {
    var now = Date.now(), next = null, closed = false;
    steps.querySelectorAll('li').forEach(function (li) {
      var t = Date.parse(li.dataset.date);
      if (t < now) { li.classList.add('done'); if (li.hasAttribute('data-closes')) closed = true; }
      else if (!next) { next = li; li.classList.add('next'); li.setAttribute('aria-current', 'step'); }
    });
    var reg = document.getElementById('cta-register');
    var opens = Date.parse(steps.querySelector('li').dataset.date);
    if (reg && now >= opens && !closed) {
      reg.hidden = false;
      var info = document.getElementById('cta-info');
      if (info) info.classList.add('secondary');
    }
  }

  /* Scroll reveals + bowls filling */
  var targets = document.querySelectorAll('.reveal, .pots');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  } else {
    targets.forEach(function (t) { t.classList.add('in'); });
  }
  if (root.classList.contains('shot')) targets.forEach(function (t) { t.classList.add('in'); });

  /* Coaches' guide: date list states, registration window, in-page index */
  document.querySelectorAll('[data-timeline]').forEach(function (list) {
    var now = Date.now(), marked = false;
    list.querySelectorAll('li[data-date]').forEach(function (li) {
      if (Date.parse(li.dataset.date) < now) li.classList.add('done');
      else if (!marked) { li.classList.add('next'); marked = true; }
    });
  });
  document.querySelectorAll('[data-window-from]').forEach(function (el) {
    var now = Date.now(), from = Date.parse(el.dataset.windowFrom), until = Date.parse(el.dataset.windowUntil);
    el.dataset.state = now < from ? 'before' : now > until ? 'after' : 'open';
  });
  var rail = document.querySelector('.rail');
  if (rail && 'IntersectionObserver' in window) {
    var links = {};
    rail.querySelectorAll('a[href^="#"]').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        Object.keys(links).forEach(function (k) { links[k].classList.toggle('active', k === en.target.id); });
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(links).forEach(function (id) { var sec = document.getElementById(id); if (sec) spy.observe(sec); });
  }
  /* Sponsor tabs: keyboard support (click handling lives in main.js) */
  document.querySelectorAll('.tabs .tab').forEach(function (t) {
    t.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); } });
  });

  /* The broth inside the O: alphabet pasta circling a slanted pill, stirred by pointer */
  var c = document.getElementById('broth');
  if (!c) return;
  var x = c.getContext('2d'), S = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
  function size() { S = c.offsetWidth; c.width = S * dpr; c.height = S * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  size(); window.addEventListener('resize', size);

  var word = 'SOUPENNSCIOLYMPIADRWX';
  var P = [];
  for (var i = 0; i < 18; i++) {
    P.push({ th: Math.random() * 6.283, k: .25 + Math.random() * .75, ch: word[i % word.length], rot: Math.random() * 6.28, vr: (Math.random() - .5) * .03, w: .85 + Math.random() * .35 });
  }
  var mouse = null, last = null, stir = 0, running = true, looping = false;
  function start() { if (!looping) { looping = true; requestAnimationFrame(draw); } }
  var A = Math.PI / 4;
  function toPill(e) {
    var r = c.getBoundingClientRect(), px = (e.clientX - r.left) - S / 2, py = (e.clientY - r.top) - S / 2;
    return { u: px * Math.cos(A) - py * Math.sin(A), v: px * Math.sin(A) + py * Math.cos(A) };
  }
  c.addEventListener('pointermove', function (e) {
    var m = toPill(e);
    if (last) stir = Math.min(1.2, stir + Math.hypot(m.u - last.u, m.v - last.v) / 60);
    last = m; mouse = m;
  });
  c.addEventListener('pointerleave', function () { mouse = null; last = null; });
  c.addEventListener('pointerdown', function (e) { c.setPointerCapture && c.setPointerCapture(e.pointerId); });

  // Pause when the hero is off screen or the tab is hidden
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { running = en[0].isIntersecting; if (running) start(); }).observe(c);
  }

  function draw(t) {
    if (!S) { looping = false; return; }
    var L = S * .854, T = S * .276;
    x.clearRect(0, 0, S, S);
    x.save(); x.translate(S / 2, S / 2); x.rotate(-A);
    var g = x.createLinearGradient(0, -T / 2, 0, T / 2);
    g.addColorStop(0, '#B5651D'); g.addColorStop(.3, '#DE9440'); g.addColorStop(.75, '#E9A853'); g.addColorStop(1, '#D48A38');
    x.fillStyle = g; x.fillRect(-S / 2, -S / 2, S, S);
    var sh = x.createLinearGradient(0, -T / 2, 0, -T / 2 + T * .38);
    sh.addColorStop(0, 'rgba(70,20,0,.55)'); sh.addColorStop(1, 'rgba(70,20,0,0)');
    x.fillStyle = sh; x.fillRect(-S / 2, -T / 2, S, T * .38);
    var hl = x.createRadialGradient(L * .12, T * .18, 1, L * .12, T * .18, L * .35);
    hl.addColorStop(0, 'rgba(255,230,170,.45)'); hl.addColorStop(1, 'rgba(255,230,170,0)');
    x.fillStyle = hl; x.fillRect(-S / 2, -S / 2, S, S);
    // fat droplets
    x.fillStyle = 'rgba(255,240,205,.45)';
    for (var j = 0; j < 7; j++) {
      var a = (t || 0) / 5200 + j * .9;
      x.beginPath(); x.ellipse(Math.cos(a) * L * .32, Math.sin(a * 1.3) * T * .3, 1.6 + (j % 3), 1.2 + (j % 2), 0, 0, 6.28); x.fill();
    }
    stir *= .97;
    var sp = reduce ? 0 : .004 + stir * .05;
    x.textAlign = 'center'; x.textBaseline = 'middle';
    for (var n = 0; n < P.length; n++) {
      var p = P[n];
      p.th += sp * (1.25 - p.k * .5);
      p.rot += reduce ? 0 : p.vr * (1 + stir * 6);
      var u = Math.cos(p.th) * (L / 2 - T * .42) * p.k, v = Math.sin(p.th) * (T / 2 - T * .17) * p.k;
      if (mouse && Math.hypot(u - mouse.u, v - mouse.v) < T * .45) {
        p.k = Math.max(.15, Math.min(1, p.k + (Math.random() - .5) * .08)); p.vr += (Math.random() - .5) * .02;
      }
      x.save(); x.translate(u, v); x.rotate(p.rot);
      x.font = '500 ' + Math.round(T * .3 * p.w) + 'px Newsreader, Georgia, serif';
      x.fillStyle = 'rgba(90,35,0,.45)'; x.fillText(p.ch, 1, 1.6);
      x.fillStyle = '#FFEFC8'; x.fillText(p.ch, 0, 0);
      x.restore();
    }
    x.restore();
    if (running && !reduce) requestAnimationFrame(draw); else looping = false;
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  else start();
})();
