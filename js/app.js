(function () {
  "use strict";

  // ====== SCROLL REVEALS (IntersectionObserver) ======
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-visible");
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "40px 0px" },
    );
    document
      .querySelectorAll(
        ".reveal, .reveal-fade-scale, .section-reveal, .stag-grid",
      )
      .forEach(function (e) {
        observer.observe(e);
      });
    document.querySelectorAll(".stag-grid > *").forEach(function (e, i) {
      e.style.opacity = "0";
      e.style.transform = "translateY(24px)";
    });
    requestAnimationFrame(function () {
      var nav = document.querySelector(".nav-entrance");
      if (nav) nav.style.opacity = "1";
    });
  }

  // ====== IMAGE ERROR HANDLER ======
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
    });
  });

  // ====== 3D HERO CAROUSEL (requestAnimationFrame) ======
  (function () {
    var _c = document.querySelector('[aria-label="Hero image carousel"]');
    if (!_c) return;
    var _inner = _c.querySelector(".cursor-grab");
    if (!_inner || !_inner.children.length) return;
    var _figs = Array.from(_inner.children);
    var _cnt = _figs.length;
    var _prog = 0,
      _run = true,
      _last = performance.now();

    function _anim(now) {
      if (!_run) return;
      var dt = now - _last;
      _last = now;
      if (!_c.matches(":active")) {
        _prog = (_prog + 45e-6 * dt) % 1;
      }
      for (var _i = 0; _i < _cnt; _i++) {
        var _a = (_i / _cnt + _prog) % 1;
        if (_a <= 0 || _a >= 0.72) {
          _figs[_i].style.opacity = "0";
          continue;
        }
        var _l = _a / 0.72;
        var _edg = Math.min(
          Math.min(1, Math.max(0, _l / 0.06)),
          Math.min(1, Math.max(0, (1 - _l) / 0.08)),
        );
        var _s = Math.sin(
          (_l < 0.35 ? _l / 0.7 : 0.5 + (_l - 0.35) / 1.3) * Math.PI,
        );
        _s = _s > 0 ? _s : 0;
        var _zi = (20 + 80 * _s) | 0;
        var _op = _edg * (0.4 + 0.6 * _s);
        var _n, _r;
        var _mf = 280 / (280 + 240 + 90);
        var _mg = (280 + 90) / (280 + 240 + 90);
        if (_l < _mf) {
          _n = -10;
          _r = -300 + (_l / _mf) * 280;
        } else if (_l < _mg) {
          var _ang = (180 + ((_l - _mf) / (_mg - _mf)) * 90) * (Math.PI / 180);
          _n = 80 + 90 * Math.cos(_ang);
          _r = -20 - 90 * Math.sin(_ang);
        } else {
          _n = 80 + ((_l - _mg) / (1 - _mg)) * 240;
          _r = 70;
        }
        _figs[_i].style.zIndex = _zi;
        _figs[_i].style.opacity = _op;
        _figs[_i].style.transform =
          "translate3d(calc(-50% + " +
          _n +
          "%), calc(-50% + " +
          _r +
          "%), " +
          (-1000 + 1280 * _s) +
          "px) rotateX(" +
          (4 - 2 * _s) +
          "deg) rotateY(" +
          (-3 + 6 * _l) +
          "deg) rotateZ(0deg) scale(" +
          (0.44 + 0.74 * _s) +
          ")";
        _figs[_i].style.pointerEvents = _s > 0.72 ? "auto" : "none";
      }
      requestAnimationFrame(_anim);
    }
    requestAnimationFrame(_anim);
    _c.addEventListener("pointerdown", function () {
      _run = false;
    });
    _c.addEventListener("pointerup", function () {
      _run = true;
      _last = performance.now();
      requestAnimationFrame(_anim);
    });
    _c.addEventListener("pointercancel", function () {
      _run = true;
      _last = performance.now();
      requestAnimationFrame(_anim);
    });
  })();
})();
