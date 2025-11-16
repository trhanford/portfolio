// script.js — rebuilt site interactions
// -----------------------------------------------------------------------------
// This script rebuilds the interactive behaviours for the site from the ground
// up while keeping the existing visual design intact. It provides:
//   • Automatic year stamping in the footer
//   • Typewriter copy for the hero headline
//   • Smooth-scrolling anchor navigation with a fading sticky nav bar
//   • Mobile drawer toggling
//   • Intersection powered reveal effects
//   • Background particle canvas with soft exclusion borders around hero copy
//   • Skills network canvas rendering
// The code favours readability and clear separation of concerns so future
// maintenance is straightforward.
// -----------------------------------------------------------------------------

(() => {
  const ready = () =>
    new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve, { once: true });
      } else {
        resolve();
      }
  });

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
  const sleep = ms => new Promise(res => setTimeout(res, ms));

  function select(selector, root = document) {
    return root.querySelector(selector);
  }

  function selectAll(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
  }

  function parseList(value = '') {
    return value
      .split(',')
      .map(item => item.trim())
      .filter(Boolean);
  }

  function prefersReducedMotion() {
    if (!('matchMedia' in window)) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  const PARTICLE_PREF_KEY = 'particle-effect-preference';
  
  function setYear() {
    const yearEl = select('#year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  function initMobilePreface() {
    const preface = select('#mobilePreface');
    const continueButton = select('#mobilePrefaceContinue');
    const siteContent = select('#siteContent');
    if (!preface || !continueButton || !siteContent) return;

    const STORAGE_KEY = 'mobile-preface-dismissed';

    const getDismissed = () => {
      try {
        return window.sessionStorage.getItem(STORAGE_KEY) === 'true';
      } catch (error) {
        return false;
      }
    };

    const storeDismissed = () => {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, 'true');
      } catch (error) {
        /* no-op */
      }
    };

    let dismissed = getDismissed();
    if (dismissed) {
      document.body.classList.add('preface-dismissed');
    }

    const coarseQuery = 'matchMedia' in window ? window.matchMedia('(pointer: coarse)') : null;
    const widthQuery = 'matchMedia' in window ? window.matchMedia('(max-width: 600px)') : null;

    const isCoarse = () => {
      if (!coarseQuery) return 'ontouchstart' in window;
      return coarseQuery.matches;
    };

    const isSmallWidth = () => {
      if (!widthQuery) return window.innerWidth <= 600;
      return widthQuery.matches;
    };

    const shouldShow = () => !dismissed && isSmallWidth() && isCoarse();

    const show = () => {
      if (!shouldShow()) return;
      preface.removeAttribute('hidden');
      preface.setAttribute('aria-hidden', 'false');
      document.body.classList.add('preface-active');
      siteContent.setAttribute('aria-hidden', 'true');

      requestAnimationFrame(() => {
        if (typeof continueButton.focus === 'function') {
          continueButton.focus({ preventScroll: true });
        }
      });
    };

    const hide = () => {
      preface.setAttribute('hidden', '');
      preface.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('preface-active');
      siteContent.removeAttribute('aria-hidden');
    };

    const evaluate = () => {
      if (shouldShow()) show();
      else hide();
    };

    continueButton.addEventListener('click', () => {
      dismissed = true;
      document.body.classList.add('preface-dismissed');
      storeDismissed();
      hide();
    });

    preface.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        continueButton.click();
      }
    });

    const bindMedia = mediaQuery => {
      if (!mediaQuery) return;
      if ('addEventListener' in mediaQuery) {
        mediaQuery.addEventListener('change', evaluate);
      } else if ('addListener' in mediaQuery) {
        mediaQuery.addListener(evaluate);
      }
    };

    bindMedia(coarseQuery);
    bindMedia(widthQuery);

    evaluate();
  }

  async function initTypewriter() {
    const target = select('#typed');
    if (!target) return;

    const words = [
      'Mechanical Engineer',
      'Team Player',
      'Car enthusiast',
      'CAD Specialist',
      'Design Engineer',
      'Constant Innovator',
      'Problem Solver',
      'Curious Mind',
      'Doer'
      ];

    const typeDelay = 70;
    const eraseDelay = 45;
    const holdDelay = 1100;

    target.style.borderRight = '2px solid rgba(31,35,39,.95)';
    target.style.paddingRight = '8px';

    async function typeWord(word) {
      for (let i = 1; i <= word.length; i++) {
        target.textContent = word.slice(0, i);
        await sleep(typeDelay);
      }
      await sleep(holdDelay);
      for (let i = word.length - 1; i >= 0; i--) {
        target.textContent = word.slice(0, i);
        await sleep(eraseDelay);
      }
    }

    while (true) {
      for (const word of words) {
        await typeWord(word);
      }
    }
  }

  function initSmoothScroll() {
    document.addEventListener('click', event => {
      const anchor = event.target.closest('[data-scroll]');
      if (!anchor) return;
      const href = anchor.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      event.preventDefault();
      const nav = select('#mainNav');
      const offset = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  function initNavFade() {
    const nav = select('#mainNav');
    if (!nav) return;
    
    nav.removeAttribute('hidden');

    if (nav.hasAttribute('data-instant')) {
      nav.style.opacity = '1';
      nav.classList.add('nav-active');
      return;
    }

    const revealRatio = () => clamp(window.innerHeight * 0.28, 120, 260);
    let revealEnd = revealRatio();
    let ticking = false;
    
    function update() {
      ticking = false;
      const progress = clamp((window.scrollY || 0) / Math.max(1, revealEnd), 0, 1);
      nav.style.opacity = progress.toFixed(3);
      if (progress > 0.2) nav.classList.add('nav-active');
      else nav.classList.remove('nav-active');
    }

    function requestTick() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

   window.addEventListener('scroll', requestTick, { passive: true });
   window.addEventListener('resize', () => {
      revealEnd = revealRatio();
      update();
    });

    requestAnimationFrame(update);
  }

  function initDrawer() {
    const drawer = select('#drawer');
    const button = select('#menuBtn');
    if (!drawer || !button) return;

    button.addEventListener('click', () => {
      const open = !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      button.setAttribute('aria-expanded', String(open));
    });
    
    drawer.addEventListener('click', event => {
      if (!event.target.closest('[data-scroll], a[href^="/"]')) return;
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      button.setAttribute('aria-expanded', 'false');
    });
  }

  function initReveals() {
    const selectors = [
      '.hero-inner > .hero-col',
      '.panel',
      '.panel-link',
      '.about-grid > *',
      '.about-highlights > *',
      '.workflow-steps .step',
      '.skills-panel .info-card',
      '.interests-section .interests-surface',
      '.interests-section .interest-chip',
      '.portfolio-page .hero-content',
      '.portfolio-page .hero-stats > *',
      '.portfolio-page .project-card',
      '.portfolio-page .section-heading',
      '.resume-body .resume-hero__copy',
      '.resume-body .resume-hero__meta',
      '.resume-body .resume-toc__inner',
      '.resume-body .resume-section'
    ];

    const elements = selectAll(selectors.join(','));
    if (!elements.length) return;

    document.body.classList.add('has-reveal');

    elements.forEach((el, index) => {
      el.classList.add('reveal-item');
      const delay = Math.min(480, (index % 10) * 60 + Math.random() * 40);
      el.style.setProperty('--reveal-delay', `${delay.toFixed(0)}ms`);
    });

   if (!('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.12
      }
    );

    elements.forEach(el => observer.observe(el));
  }

  // ---------------------------------------------------------------------------
  // Mobile dock navigation (app-like bottom nav)
  // ---------------------------------------------------------------------------

  function initMobileDock() {
    const dock = select('.mobile-dock');
    if (!dock) return;

    const links = selectAll('.mobile-dock__link', dock);
    if (!links.length) return;

    const setActiveLink = targetLink => {
      if (!targetLink) return;
      links.forEach(link => {
        if (link === targetLink) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };
    
    const sections = links
      .map(link => {
        const hash = link.hash || '';
        if (!hash || !hash.startsWith('#')) return null;
        const section = select(hash);
        if (!section) return null;
        return { link, hash, section };
      })
      .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        entries => {
          const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (!visible.length) return;
          const top = visible[0];
          const match = sections.find(item => item.section === top.target);
          if (match) setActiveLink(match.link);
        },
        { rootMargin: '-35% 0px -45%', threshold: [0.25, 0.5, 0.65] }
      );

      sections.forEach(item => observer.observe(item.section));
    }

    links.forEach(link => {
      link.addEventListener('click', () => {
        if (link.hash && link.hash.startsWith('#')) {
          setActiveLink(link);
        } else if (!sections.length) {
          setActiveLink(link);
        }
      });
    });

    const preset = links.find(link => link.getAttribute('aria-current') === 'page');
    if (preset) {
      setActiveLink(preset);
    } else if (sections.length) {
      setActiveLink(sections[0].link);
    }
  }

  // ---------------------------------------------------------------------------
  // Background particles with soft exclusions
  // ---------------------------------------------------------------------------

  function initParticleFields() {
    const canvases = selectAll('canvas.magnetic-field');
    if (!canvases.length) {
      initParticleToggle([]);
      return;
    }

    const disableForSmallScreens = window.matchMedia('(max-width: 1024px)').matches;
    const disableForTouch = window.matchMedia('(pointer: coarse)').matches;

    if (disableForSmallScreens || disableForTouch) {
      canvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width || 0, canvas.height || 0);
        }
        canvas.width = 0;
        canvas.height = 0;
            canvas.classList.add('particles-disabled');
      });
      initParticleToggle([]);
      return;
    }

    const controllers = canvases
      .map(canvas => setupField(canvas))
      .filter(Boolean);

    initParticleToggle(controllers);
  }

  function setupField(canvas) {
    const ctx = canvas.getContext('2d');
    const reduceMotion = prefersReducedMotion();

    // NEW: theme-aware colors for particles (≈25% brand red)
    const brandRed = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent-soft')
      .trim() || '#b45858';
    const slateDot = 'rgba(43,47,51,0.9)';

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      particles: [],
      fadeZones: [],
      zoneElements: new Set(),
      zoneObserver: null,
      enabled: false,
      animationId: null,
      pointer: {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        active: false,
        strength: 0,
        lastMove: 0,
        releaseAt: 0
      },
      frame: 0
    };

    const fadeSelectors = parseList(canvas.dataset.fadeZones || canvas.dataset.fadezones || '');
    const fadeDefaultMargin = Number.isFinite(parseFloat(canvas.dataset.fadeMargin))
      ? Math.max(0, parseFloat(canvas.dataset.fadeMargin))
      : 28;

    const surface = canvas.closest('[data-field-surface]') || canvas.parentElement || canvas;

    function createParticle() {
      const baseSpeed = reduceMotion ? 22 : 40;
      const direction = Math.random() * Math.PI * 2;
      const speed = baseSpeed * (0.4 + Math.random() * 0.8);
      const baseSize = 0.7 + Math.random() * 1.2;
      const sizeBoost = Math.random() < 0.22 ? 1.2 + Math.random() * 1.4 : 0;
      
      return {
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        vx: Math.cos(direction) * speed,
        vy: Math.sin(direction) * speed,
        size: baseSize + sizeBoost,
        pulse: Math.random() * Math.PI * 2,
        fade: 1,
        // NEW: per-particle color — ~25% brand red
        color: Math.random() < 0.25 ? brandRed : slateDot
      };
    }

    function gatherZoneElements() {
      const elements = new Set();
      fadeSelectors.forEach(selector => {
        selectAll(selector).forEach(el => {
          if (el instanceof Element) elements.add(el);
        });
      });
      return elements;
    }

    function measureFadeZones() {
      const rect = canvas.getBoundingClientRect();
      const zones = [];
      state.zoneElements.forEach(el => {
        const zoneRect = el.getBoundingClientRect();
        const marginAttr = parseFloat(el.getAttribute('data-particle-fade-margin'));
        const margin = Number.isFinite(marginAttr) ? Math.max(0, marginAttr) : fadeDefaultMargin;
        zones.push({
          innerX: zoneRect.left - rect.left,
          innerY: zoneRect.top - rect.top,
          innerW: zoneRect.width,
          innerH: zoneRect.height,
          margin
        });
      });
      state.fadeZones = zones;
    }

    function bindZoneObserver() {
      const elements = gatherZoneElements();
      state.zoneElements = elements;
      if (!elements.size) {
        if (state.zoneObserver) state.zoneObserver.disconnect();
        state.zoneObserver = null;
        state.fadeZones = [];
        return;
      }

      if (!state.zoneObserver && 'ResizeObserver' in window) {
        state.zoneObserver = new ResizeObserver(() => measureFadeZones());
      }

      if (state.zoneObserver) {
        state.zoneObserver.disconnect();
        elements.forEach(el => state.zoneObserver.observe(el));
      }

       measureFadeZones();
    }
    
    function updateDimensions() {
      if (!state.enabled) return;
      state.dpr = Math.min(2, window.devicePixelRatio || 1);
      state.width = canvas.clientWidth;
      state.height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(state.width * state.dpr));
      canvas.height = Math.max(1, Math.floor(state.height * state.dpr));
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      const area = state.width * state.height;
      const targetCount = clamp(Math.round(area / (reduceMotion ? 17000 : 10000)), 90, 260);
      state.particles = Array.from({ length: targetCount }, createParticle);

      bindZoneObserver();
      measureFadeZones();
    }

    function onPointerMove(event) {
      if (!state.enabled) return;
      const bounds = canvas.getBoundingClientRect();
      state.pointer.targetX = event.clientX - bounds.left;
      state.pointer.targetY = event.clientY - bounds.top;
      state.pointer.active = true;
      const nowStamp = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
      const eventStamp = event.timeStamp || nowStamp;
      state.pointer.lastMove = eventStamp;
      state.pointer.releaseAt = eventStamp + 1000;
    }

    function onPointerLeave() {
      if (!state.enabled) return;
      state.pointer.active = false;
      state.pointer.lastMove = 0;
      state.pointer.releaseAt = 0;
    }

    function computeFade(x, y) {
      if (!state.fadeZones.length) return 1;
      let alpha = 1;
      for (const zone of state.fadeZones) {
        const { innerX, innerY, innerW, innerH, margin } = zone;
        if (
          x >= innerX &&
          x <= innerX + innerW &&
          y >= innerY &&
          y <= innerY + innerH
        ) {
          return 0;
        }
        if (margin <= 0) continue;
        const outerX = innerX - margin;
        const outerY = innerY - margin;
        const outerW = innerW + margin * 2;
        const outerH = innerH + margin * 2;
        if (
          x >= outerX &&
          x <= outerX + outerW &&
          y >= outerY &&
          y <= outerY + outerH
        ) {
          const dx = Math.max(innerX - x, 0, x - (innerX + innerW));
          const dy = Math.max(innerY - y, 0, y - (innerY + innerH));
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ratio = clamp(dist / Math.max(1, margin), 0, 1);
          alpha = Math.min(alpha, ratio * ratio);
        }
      }
      return alpha;
    }

    function tick(now) {
      if (!state.enabled) {
        state.animationId = null;
        return;
      }
      const delta = (now - state.frame) / 1000 || 0.016;
      const dt = Math.min(0.05, delta);
      state.frame = now;

      const background = getComputedStyle(document.documentElement).getPropertyValue('--taupe').trim() || '#e4ddcc';
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, state.width, state.height);

      const gradient = ctx.createRadialGradient(
        state.width * 0.5,
        state.height * 0.5,
        Math.max(state.width, state.height) * 0.08,
        state.width * 0.5,
        state.height * 0.5,
        Math.max(state.width, state.height) * 0.9
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.07)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, state.width, state.height);

      const pointerEase = reduceMotion ? 0.18 : 0.12;
      state.pointer.x += (state.pointer.targetX - state.pointer.x) * pointerEase;
      state.pointer.y += (state.pointer.targetY - state.pointer.y) * pointerEase;
      if (state.pointer.active && now >= state.pointer.releaseAt) {
        state.pointer.active = false;
      }
      const pointerStrengthTarget = state.pointer.active ? 1 : 0;
      state.pointer.strength += (pointerStrengthTarget - state.pointer.strength) * 0.28;
      if (state.pointer.strength < 0.001) state.pointer.strength = 0;

      const pointerRadius = clamp(Math.max(state.width, state.height) * 0.22, 120, 280);
      const pointerRadiusSq = pointerRadius * pointerRadius;
      const pointerForce = reduceMotion ? 110 : 210;

      const baseTime = now * 0.00018;

      for (const particle of state.particles) {
        // Subtle flow noise
        particle.vx += Math.cos(baseTime + particle.pulse) * 32 * dt;
        particle.vy += Math.sin(baseTime * 0.8 + particle.pulse * 1.2) * 32 * dt;
        
        if (state.pointer.strength > 0.01) {
          const dx = state.pointer.x - particle.x;
          const dy = state.pointer.y - particle.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < pointerRadiusSq) {
            const dist = Math.sqrt(distSq) || 1;
            const influence = (1 - dist / pointerRadius) * state.pointer.strength;

            // Magnetic pull toward the pointer (with a slight speed boost)
            const accel = pointerForce * influence * 1.12;
            particle.vx += (dx / dist) * accel * dt;
            particle.vy += (dy / dist) * accel * dt;
          }
        }

        const drag = reduceMotion ? 0.965 : 0.99;
        const dragFactor = Math.pow(drag, dt * 60);
        particle.vx *= dragFactor;
        particle.vy *= dragFactor;

        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;

        if (particle.x < -20) particle.x = state.width + 20;
        else if (particle.x > state.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = state.height + 20;
        else if (particle.y > state.height + 20) particle.y = -20;

        particle.fade = computeFade(particle.x, particle.y);
      }

      // Connections
      const connectionBoost = 1 + state.pointer.strength * 0.35;
      const maxDistance = clamp(Math.max(state.width, state.height) * 0.24, 130, 260) * connectionBoost;
      const maxDistanceSq = maxDistance * maxDistance;
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = 'rgba(74,78,84,0.22)';
      for (let i = 0; i < state.particles.length; i++) {
        const a = state.particles[i];
        if (a.fade <= 0.01) continue;
        for (let j = i + 1; j < state.particles.length; j++) {
          const b = state.particles[j];
          if (b.fade <= 0.01) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq > maxDistanceSq) continue;
          const ratio = 1 - distSq / maxDistanceSq;
          const alpha = Math.min(a.fade, b.fade) * ratio * 0.65;
          if (alpha < 0.02) continue;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw dots (per-particle color; ~25% brand red)
      for (const particle of state.particles) {
        if (particle.fade <= 0.01) continue;
        const size = particle.size + Math.sin(baseTime + particle.pulse) * 0.5;
        ctx.save();
        ctx.globalAlpha = clamp(particle.fade, 0, 1);
        ctx.fillStyle = particle.color;             // ← use per-particle color
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, Math.max(0.6, size), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      state.animationId = requestAnimationFrame(tick);
    }

    window.addEventListener('resize', updateDimensions);
    if (surface) {
      surface.addEventListener('pointermove', onPointerMove, { passive: true });
      surface.addEventListener('pointerdown', onPointerMove);
      surface.addEventListener('pointerenter', onPointerMove);
      surface.addEventListener('pointerleave', onPointerLeave);
    }

    function activate() {
      if (state.enabled) return;
      state.enabled = true;
      canvas.classList.remove('particles-disabled');
      updateDimensions();
      state.frame = typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now();
      state.animationId = requestAnimationFrame(tick);
    }

    function deactivate() {
      if (!state.enabled) return;
      state.enabled = false;
      state.pointer.active = false;
      state.pointer.strength = 0;
      state.particles = [];
      if (state.zoneObserver) state.zoneObserver.disconnect();
      if (state.animationId) {
        cancelAnimationFrame(state.animationId);
        state.animationId = null;
      }
      ctx.clearRect(0, 0, state.width, state.height);
      canvas.width = 0;
      canvas.height = 0;
      canvas.classList.add('particles-disabled');
    }

    activate();

    return {
      activate,
      deactivate,
      setEnabled(value) {
        if (value) activate();
        else deactivate();
      },
      isActive() {
        return state.enabled;
      }
    };
  }

  function initParticleToggle(controllers) {
    const toggle = select('#particleToggle');
    if (!toggle) return;

    if (!controllers.length) {
      toggle.hidden = true;
      return;
    }

    const label = select('.particle-toggle__text', toggle);

    const getStoredPreference = () => {
      if (typeof window === 'undefined' || !('localStorage' in window)) return null;
      try {
        return window.localStorage.getItem(PARTICLE_PREF_KEY);
      } catch (error) {
        return null;
      }
    };

    const setStoredPreference = value => {
      if (typeof window === 'undefined' || !('localStorage' in window)) return;
      try {
        window.localStorage.setItem(PARTICLE_PREF_KEY, value);
      } catch (error) {
        /* no-op */
      }
    };

    const applyState = enabled => {
      toggle.setAttribute('aria-pressed', String(enabled));
      toggle.classList.toggle('is-off', !enabled);
      const labelText = enabled ? 'Particles On' : 'Particles Off';
      toggle.setAttribute('aria-label', `Toggle particle background (currently ${enabled ? 'on' : 'off'})`);
      toggle.setAttribute('title', enabled ? 'Turn particle background off' : 'Turn particle background on');
      if (label) label.textContent = labelText;
    };

    let enabled = controllers.some(controller => controller.isActive());

    const stored = getStoredPreference();
    if (stored === 'off') enabled = false;
    else if (stored === 'on') enabled = true;

    controllers.forEach(controller => controller.setEnabled(enabled));

    applyState(enabled);
    toggle.hidden = false;
    toggle.removeAttribute('hidden');

    toggle.addEventListener('click', () => {
      enabled = !enabled;
      controllers.forEach(controller => controller.setEnabled(enabled));
      applyState(enabled);
      setStoredPreference(enabled ? 'on' : 'off');
    });
  }

  ready().then(() => {
    setYear();
    initMobilePreface();
    initTypewriter();
    initSmoothScroll();
    initNavFade();
    initDrawer();
    initReveals();
    initMobileDock();
    initParticleFields();
  });
})();
