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

  async function initTypewriter() {
    const target = select('#typed');
    if (!target) return;

    const words = [
      'Mechanical Engineer',
      'Team Player',
      'Car enthusiast',
      'CAD Specialist',
      'Design Engineer',
      'Innovator',
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
      '.about-lower > *',
      '.workflow-steps .step',
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
            const accel = pointerForce * influence;
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
      const maxDistance = clamp(Math.max(state.width, state.height) * 0.24, 130, 260);
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

  // ---------------------------------------------------------------------------
  // Skills network canvas
  // ---------------------------------------------------------------------------

  function initSkillsNetwork() {
    const canvas = select('#skillsGraph');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = prefersReducedMotion();

    const nodes = [
  // 0 — center
      { label: 'Tristan', weight: 700, radius: 64, center: true, id: 0 },
    
      // 1 — categories
      { label: 'Core skills', weight: 700, radius: 40, id: 1, parent: 0 },
      { label: 'Interests',  weight: 700, radius: 40, id: 2, parent: 0 },
    
      // 1.x — core skills children (parent: 1)
      { label: 'CAD (NX / Creo)',    weight: 700, radius: 34, parent: 1 },
      { label: 'Automotive',         weight: 700, radius: 32, parent: 1 },
      { label: 'Wiring & PDM',       weight: 700, radius: 30, parent: 1 },
      { label: 'Cooling & Thermals', weight: 700, radius: 30, parent: 1 },
      { label: 'Testing & Docs',     weight: 700, radius: 30, parent: 1 },
      { label: 'MATLAB / Python',    weight: 700, radius: 30, parent: 1 },
    
      // 2.x — interests children (parent: 2)
      { label: 'Placeholder_1', weight: 700, radius: 30, parent: 2 },
      { label: 'Placeholder_2',         weight: 700, radius: 28, parent: 2 },
      { label: 'Placeholder_3',    weight: 700, radius: 30, parent: 2 }
    ];

    const state = {
      width: 0,
      height: 0,
      dpr: 1,
      nodes: [],
      pointer: { x: 0, y: 0, over: -1 }
    };

    function cloneNodes() {
      state.nodes = nodes.map((node, index) => ({
        ...node,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        wobbleSeed: Math.random() * 1000,
        hoverable: index !== 0
      }));
    }

    function layoutNodes(){
      cloneNodes();
    
      const center = state.nodes.find(n => n.center);
      center.x = state.width / 2;
      center.y = state.height / 2;
    
      // category anchors (left / right of center)
      const span = Math.min(state.width, state.height) * 0.28;
      const leftAnchor  = { x: center.x - span, y: center.y - 6 };
      const rightAnchor = { x: center.x + span, y: center.y + 6 };
    
      // helper to get children of a parent id
      const childrenOf = pid => state.nodes.filter(n => n.parent === pid);
    
      // place the two category nodes near anchors with small jitter
      const nodeCore = state.nodes.find(n => n.id === 1);
      const nodeInt  = state.nodes.find(n => n.id === 2);
    
      const jitter = (amt=18) => (Math.random() * 2 - 1) * amt;
    
      nodeCore.x = leftAnchor.x  + jitter(12);
      nodeCore.y = leftAnchor.y  + jitter(12);
    
      nodeInt.x  = rightAnchor.x + jitter(12);
      nodeInt.y  = rightAnchor.y + jitter(12);
    
      // arrange children in loose clusters around their category
      function placeCluster(parentNode, kids, radiusBase){
        const angleStep = (Math.PI * 2) / Math.max(4, kids.length);
        kids.forEach((kid, i) => {
          const angle = angleStep * i + Math.random() * 0.6;
          const r = radiusBase * (0.9 + Math.random() * 0.3);
          kid.x = parentNode.x + Math.cos(angle) * r + jitter(10);
          kid.y = parentNode.y + Math.sin(angle) * r + jitter(10);
        });
      }
    
      placeCluster(nodeCore, childrenOf(1), Math.min(state.width, state.height) * 0.16);
      placeCluster(nodeInt,  childrenOf(2), Math.min(state.width, state.height) * 0.16);
    }

    function updateSize() {
      state.dpr = Math.min(2, window.devicePixelRatio || 1);
      state.width = canvas.clientWidth;
      state.height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(state.width * state.dpr));
      canvas.height = Math.max(1, Math.floor(state.height * state.dpr));
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
      layoutNodes();
    }
    
    function wrapLines(text, font) {
      const words = text.split(' ');
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = font;
      const maxWidth = 160;
      const lines = [];
      let line = '';
      let widest = 0;
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        const width = ctx.measureText(next).width;
        if (width > maxWidth && line) {
          const lineWidth = ctx.measureText(line).width;
          widest = Math.max(widest, lineWidth);
          lines.push(line);
          line = word;
        } else {
          line = next;
          widest = Math.max(widest, width);
        }
      }
      
      if (line) {
        widest = Math.max(widest, ctx.measureText(line).width);
        lines.push(line);
      }
      ctx.restore();
      return { lines, widest };
    }

    function drawNode(node, index, time) {
      const font = `${node.weight} 13px Inter, system-ui, sans-serif`;
      const wrapped = wrapLines(node.label, font);
      const lines = wrapped.lines;
      const lineHeight = 16;
      const paddingX = 20;
      const paddingY = 12;
      const boxWidth = Math.max(node.center ? 180 : 150, wrapped.widest + paddingX * 2);
      const boxHeight = lines.length * lineHeight + paddingY * 2;

      const wobble = reduceMotion ? 0 : Math.sin(time * 0.001 + node.wobbleSeed) * 4;
      const wobbleY = reduceMotion ? 0 : Math.cos(time * 0.001 + node.wobbleSeed) * 4;

      const x = node.x + wobble;
      const y = node.y + wobbleY;

      const isHover = state.pointer.over === index && node.hoverable;

      const radius = Math.min(22, Math.min(boxWidth, boxHeight) / 2);
      ctx.save();
      ctx.fillStyle = isHover ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.9)';
      ctx.strokeStyle = 'rgba(43,47,51,0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      const left = x - boxWidth / 2;
      const top = y - boxHeight / 2;
      const right = left + boxWidth;
      const bottom = top + boxHeight;
      ctx.moveTo(left + radius, top);
      ctx.lineTo(right - radius, top);
      ctx.quadraticCurveTo(right, top, right, top + radius);
      ctx.lineTo(right, bottom - radius);
      ctx.quadraticCurveTo(right, bottom, right - radius, bottom);
      ctx.lineTo(left + radius, bottom);
      ctx.quadraticCurveTo(left, bottom, left, bottom - radius);
      ctx.lineTo(left, top + radius);
      ctx.quadraticCurveTo(left, top, left + radius, top);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.fillStyle = '#2b2f33';
      ctx.font = font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let textY = y - ((lines.length - 1) * lineHeight) / 2;
      for (const line of lines) {
        ctx.fillText(line, x, textY);
        textY += lineHeight;
      }
      ctx.restore();

      node.renderX = x;
      node.renderY = y;
      node.renderWidth = boxWidth;
      node.renderHeight = boxHeight;
    }

    function drawConnections(time){
      const byId = new Map(state.nodes.map(n => [n.id ?? n.label, n]));
      ctx.save();
      ctx.strokeStyle = 'rgba(74,78,84,0.2)';
      ctx.lineWidth = 1;
    
      state.nodes.forEach(node => {
        if (node.parent == null) return;
        const parent = byId.get(node.parent);
        if (!parent) return;
    
        // small wobble for organic feel (not a perfect circle layout)
        const wobble = reduceMotion ? 0 : Math.sin(time * 0.001 + (node.wobbleSeed || 0)) * 3;
        const wobbleY = reduceMotion ? 0 : Math.cos(time * 0.001 + (node.wobbleSeed || 0)) * 3;
    
        ctx.beginPath();
        ctx.moveTo(parent.x, parent.y);
        ctx.lineTo(node.x + wobble, node.y + wobbleY);
        ctx.stroke();
      });
    
      ctx.restore();
    }


    function draw(time) {
      ctx.clearRect(0, 0, state.width, state.height);
      drawConnections(time);
      state.nodes.forEach((node, index) => drawNode(node, index, time));
      requestAnimationFrame(draw);
    }

    function pointer(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      state.pointer.x = x;
      state.pointer.y = y;
      state.pointer.over = -1;
      state.nodes.forEach((node, index) => {
        const w = node.renderWidth || node.radius * 2;
        const h = node.renderHeight || node.radius * 2;
        const left = (node.renderX || node.x) - w / 2;
        const top = (node.renderY || node.y) - h / 2;
        if (x >= left && x <= left + w && y >= top && y <= top + h && node.hoverable) {
          state.pointer.over = index;
        }
      });
      canvas.style.cursor = state.pointer.over > 0 ? 'pointer' : 'default';
    }


    window.addEventListener('resize', updateSize);
    canvas.addEventListener('pointermove', pointer);
    canvas.addEventListener('pointerleave', () => {
      state.pointer.over = -1;
      canvas.style.cursor = 'default';
    });
    updateSize();
    requestAnimationFrame(draw);
  }

  ready().then(() => {
    setYear();
    initTypewriter();
    initSmoothScroll();
    initNavFade();
    initDrawer();
    initReveals();
    initParticleFields();
    initSkillsNetwork();
  });
})();
