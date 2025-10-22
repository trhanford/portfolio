/* ============================================
   Tristan Hanford — Portfolio Interactions
   No dependencies. Accessible. Motion-aware.
   ============================================ */

(() => {
  // ---------- Utilities ----------
  const $  = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp  = (a, b, t) => a + (b - a) * t;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Mobile drawer ----------
  const burger = $('#burger');
  const drawer = $('#drawer');
  if (burger && drawer) {
    burger.addEventListener('click', () => {
      const open = drawer.classList.toggle('open');
      drawer.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-expanded', String(open));
    });
    // Close drawer when clicking any link inside it
    $$('#drawer a').forEach(a => a.addEventListener('click', () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
    }));
  }

  // ---------- Footer year ----------
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  // ---------- Smooth anchor scrolling with header offset ----------
  const header = $('.header');
  const HEADER_OFFSET = () => (header ? header.getBoundingClientRect().height : 64);

  $$('.nav a, .drawer a, .hero__cta a, a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (!href.startsWith('#') || href === '#') return;

    a.addEventListener('click', e => {
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET() + 1;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', href);
    });
  });

  // ---------- Scroll progress bar + Scrollspy ----------
  // Create progress bar once
  const bar = document.createElement('div');
  bar.className = 'progressbar';
  document.body.appendChild(bar);

  const sections = ['home','work','showcase','gallery','contact'].map(id => $('#'+id)).filter(Boolean);
  const navLinks = new Map();
  $$('.nav a').forEach(a => {
    const id = (a.getAttribute('href')||'').replace('#','');
    if (id) navLinks.set(id, a);
  });

  function setActive(id) {
    $$('.nav a, .drawer a').forEach(a => a.classList.remove('is-active'));
    const link = navLinks.get(id);
    if (link) {
      link.classList.add('is-active');
      // mirror active class in drawer, if matching link exists
      const drawerLink = $(`.drawer a[href="#${id}"]`);
      if (drawerLink) drawerLink.classList.add('is-active');
    }
  }

  function updateProgress() {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const p = docH > 0 ? clamp(window.scrollY / docH, 0, 1) : 0;
    bar.style.transform = `scaleX(${p})`;
  }

  // Scrollspy using viewport center
  function updateSpy() {
    const center = window.scrollY + window.innerHeight * 0.45;
    let current = sections[0]?.id;
    for (const sec of sections) {
      const top = sec.offsetTop - HEADER_OFFSET() - 4;
      const bottom = top + sec.offsetHeight;
      if (center >= top && center < bottom) { current = sec.id; break; }
    }
    if (current) setActive(current);
  }

  // ---------- Reveal-on-scroll ----------
  if ('IntersectionObserver' in window && !prefersReduced) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    $$('[data-reveal]').forEach(el => io.observe(el));
  } else {
    $$('[data-reveal]').forEach(el => el.classList.add('is-visible'));
  }

  // ---------- Cursor FX (moves .fx layers with easing) ----------
  const fxGrad = $('.fx--gradient');
  const fxMesh = $('.fx--mesh');
  if (fxGrad || fxMesh) {
    let targetX = 0.5, targetY = 0.5;
    let curX = targetX, curY = targetY;
    let rafId = null;

    const onMove = (e) => {
      const t = (e.touches && e.touches[0]) || e;
      targetX = clamp((t.clientX || innerWidth/2) / innerWidth, 0, 1);
      targetY = clamp((t.clientY || innerHeight/2)/ innerHeight, 0, 1);
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    function loop() {
      curX = lerp(curX, targetX, 0.12);
      curY = lerp(curY, targetY, 0.12);
      const dx = (curX - 0.5);
      const dy = (curY - 0.5);
      // subtle parallax transforms
      if (fxGrad) fxGrad.style.transform = `translate3d(${dx*30}px, ${dy*30}px, 0)`;
      if (fxMesh) fxMesh.style.transform = `translate3d(${dx*15}px, ${dy*15}px, 0)`;
      if (Math.hypot(targetX - curX, targetY - curY) > 0.001) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }

    addEventListener('mousemove', onMove, { passive: true });
    addEventListener('touchmove', onMove, { passive: true });
  }

  // ---------- Parallax on [data-parallax] ----------
  const parallaxes = $$('[data-parallax]');
  if (parallaxes.length && !prefersReduced) {
    const parallaxLoop = () => {
      const vh = window.innerHeight;
      parallaxes.forEach(el => {
        const rect = el.getBoundingClientRect();
        const pct = clamp((vh - rect.top) / (vh + rect.height), 0, 1); // 0..1 in view
        const y = (pct - 0.5) * 20; // translate range ~ -10..10
        el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      });
      requestAnimationFrame(parallaxLoop);
    };
    requestAnimationFrame(parallaxLoop);
  }

  // ---------- Card hover tilt ----------
  if (!prefersReduced) {
    $$('.card').forEach(card => {
      let r = null;
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;  // 0..1
        const y = (e.clientY - rect.top)  / rect.height; // 0..1
        const rx = lerp(4, -4, y);
        const ry = lerp(-6, 6, x);
        card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      };
      const reset = () => { card.style.transform = ''; };
      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', reset);
      card.addEventListener('focus', () => card.style.transform = 'translateY(-4px)');
      card.addEventListener('blur', reset);
    });
  }

  // ---------- Masonry Lightbox ----------
  (function lightbox() {
    const items = $$('.masonry__item');
    if (!items.length) return;

    // Build overlay
    const overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML = `
      <button class="lightbox__close" aria-label="Close">×</button>
      <img class="lightbox__img" alt="">
      <div class="lightbox__caption"></div>
      <button class="lightbox__nav prev" aria-label="Previous">‹</button>
      <button class="lightbox__nav next" aria-label="Next">›</button>
    `;
    document.body.appendChild(overlay);
    const imgEl = $('.lightbox__img', overlay);
    const capEl = $('.lightbox__caption', overlay);
    const btnClose = $('.lightbox__close', overlay);
    const btnPrev = $('.lightbox__nav.prev', overlay);
    const btnNext = $('.lightbox__nav.next', overlay);

    let index = 0;
    const open = (i) => {
      index = i;
      const link = items[index];
      const src = link.getAttribute('href') || $('img', link)?.src;
      const alt = $('img', link)?.alt || '';
      imgEl.src = src;
      imgEl.alt = alt;
      capEl.textContent = alt;
      overlay.classList.add('open');
      document.documentElement.style.overflow = 'hidden';
      btnClose.focus();
      preload(index+1); preload(index-1);
    };
    const close = () => {
      overlay.classList.remove('open');
      document.documentElement.style.overflow = '';
    };
    const next = () => open((index + 1 + items.length) % items.length);
    const prev = () => open((index - 1 + items.length) % items.length);
    const preload = (i) => {
      if (i < 0 || i >= items.length) return;
      const src = items[i].getAttribute('href') || $('img', items[i])?.src;
      if (src) { const im = new Image(); im.src = src; }
    };

    items.forEach((a, i) => {
      a.addEventListener('click', e => {
        // Allow normal open in new tab with meta/ctrl click
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1) return;
        e.preventDefault();
        open(i);
      });
    });
    overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
    btnClose.addEventListener('click', close);
    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);
    window.addEventListener('keydown', e => {
      if (!overlay.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });
  })();

  // ---------- Lazy-load images ----------
  // If your markup uses <img loading="lazy"> this is optional; we upgrade with data-src if found.
  (function lazy() {
    const lazyImgs = $$('img[data-src]');
    if (!lazyImgs.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px 0px' });
    lazyImgs.forEach(img => io.observe(img));
  })();

  // ---------- Main scroll loop ----------
  const onScroll = () => { updateProgress(); updateSpy(); };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { updateProgress(); updateSpy(); });
  // kick
  updateProgress(); updateSpy();
})();
