(function(){
  "use strict";

  const RAW_PROJECTS = {
    'bronco-289': {
      title: '1968 Ford Bronco — 289 CID',
      category: 'Automotive',
      summary: 'Baseline restoration with period-correct power, refreshed drivetrain, and safety upgrades.',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Illustration standing in for drivetrain work on the 1968 Bronco 289 build.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for the refreshed chassis of the 1968 Bronco.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for interior refinishing on the 1968 Bronco.' }
      ],
      note: 'Swap these placeholders with build photos (minimum 1280px wide) to showcase the restoration stages. Add as many images as you like; they will display in a scrollable row.'
    },
    'bronco-coyote': {
      title: '1968 Ford Bronco — 5.0L Gen 4x Coyote',
      category: 'Automotive',
      summary: 'Modernized restomod featuring a late-model Coyote swap, new wiring, and instrumentation.',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for the finished Bronco exterior.' }
      ],
      note: 'Drop high-resolution images into an appropriate folder (for example images/bronco-coyote/) and update the entries in portfolio.js to point to them.'
    },
    'jeep-cj5': {
      title: '1974 Jeep CJ5 — 304 CID',
      category: 'Automotive',
      summary: 'Frame-off rebuild focused on off-road reliability, cooling, and clean packaging.',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder view showing the Jeep CJ5 frame-off restoration.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image of the CJ5 powertrain.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image highlighting the CJ5 suspension updates.' }
      ],
      note: 'Add fabrication and trail-testing photos here to emphasize durability upgrades.'
    },
    'nissan-350z': {
      title: '2003 Nissan 350Z — VQ35',
      category: 'Automotive',
      summary: 'Street-tuned coupe with aero tweaks, suspension refresh, and track-ready instrumentation.',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for the Nissan 350Z exterior refinements.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image showing the VQ35 engine bay updates.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image representing the 350Z suspension tuning.' }
      ],
      note: 'Replace with track-day shots, detail photos, and instrumentation close-ups to tell the full story.'
    },
    'cad-1': {
      title: 'Custom Horn Assembly',
      category: 'CAD',
      summary: 'Orbit the in-progress horn assembly concept directly within the carousel.',
      model: {
        src: 'assets/models/horn.glb',
        alt: 'Interactive preview of the custom horn assembly placeholder mesh',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '15deg',
        shadowIntensity: '0.8',
        exposure: '1.1',
        message: 'Keep horn.glb and its exported companions together in assets/models so the viewer can load the CAD preview.'
      },
      note: 'Model exported as GLB for use with the <model-viewer> component. Additional exploded views can be added as separate entries if needed.'
    },
    'cad-2': {
      title: 'Precision Bench Vice',
      category: 'CAD',
      summary: 'Explore the multi-part jaw assembly, screw drive, and mounting hardware ready for machining.',
      model: {
        src: 'assets/models/bench_vice.glb',
        alt: 'Interactive preview of the precision bench vice assembly',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '12deg',
        shadowIntensity: '0.9',
        exposure: '1.05',
        message: 'Place bench_vice.glb in assets/models. Include any separate texture files or .bin companions alongside the GLB if exported as GLTF.'
      },
      note: 'Highlight jaw inserts, guide rails, or stress relieved components by adding still renders to the gallery array if desired.'
    },
    'cad-3': {
      title: 'RC Car Chassis Study',
      category: 'CAD',
      summary: 'View suspension pickup points, battery placement, and aero details for a performance RC platform.',
      model: {
        src: 'assets/models/rc_car.glb',
        alt: 'Interactive preview of the RC car chassis concept',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '14deg',
        shadowIntensity: '0.7',
        exposure: '1.0',
        message: 'Copy rc_car.glb into assets/models. If your export references textures, keep them in the same folder for seamless loading.'
      },
      note: 'Consider appending suspension detail shots or annotated callouts via the gallery array to explain tuning decisions.'
    },
    'cad-4': {
      title: 'Cow Bell Casting Pattern',
      category: 'CAD',
      summary: 'Inspect the split pattern and draft considerations for a cast aluminum cow bell concept.',
      model: {
        src: 'assets/models/cow_bell.glb',
        alt: 'Interactive preview of the cow bell casting pattern',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '10deg',
        shadowIntensity: '0.65',
        exposure: '1.05',
        message: 'Drop cow_bell.glb into assets/models. Pair halves, cores, and gating as needed; <model-viewer> reads a single GLB bundle.'
      },
      note: 'Supplement with photos of the sand mold or finished casting by extending the gallery array for this entry.'
    },
    'cad-5': {
      title: 'Can Stamper Mechanism',
      category: 'CAD',
      summary: 'Follow the linkage-driven head that embosses beverage cans with a custom brand mark.',
      model: {
        src: 'assets/models/can_stamper.glb',
        alt: 'Interactive preview of the can stamper mechanism',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '11deg',
        shadowIntensity: '0.8',
        exposure: '1.08',
        message: 'Add can_stamper.glb to assets/models to animate the punch head and linkage in the viewer.'
      },
      note: 'Use the gallery to contrast exploded linkage positions or prototype photos that inspired the mechanism.'
    },
    'cad-6': {
      title: 'Modular Organizer System',
      category: 'CAD',
      summary: 'Rotate through interchangeable bins and covers tailored for workshop fasteners.',
      model: {
        src: 'assets/models/organizer.glb',
        alt: 'Interactive preview of the modular organizer tray system',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '13deg',
        shadowIntensity: '0.75',
        exposure: '1.04',
        message: 'Save organizer.glb in assets/models. Keep any additional textures beside it so inserts display correctly.'
      },
      note: 'Document alternative bin layouts or FDM print settings in the gallery to showcase modularity and ease of fabrication.'
    },
    'timer-police': {
      title: '555 Timer Police Light Circuit',
      category: 'Computer & Electrical',
      summary: 'Classic timing IC driving alternating beacons with adjustable pulse widths.',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder art for the 555 timer police light circuit board.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder showing the alternating light output of the 555 timer build.' }
      ],
      note: 'Show schematic captures, breadboard iterations, and final enclosure shots for extra clarity.'
    },
    'smart-mirror': {
      title: 'Alexa Integrated Smart Mirror',
      category: 'Computer & Electrical',
      summary: 'Voice-enabled display with embedded LEDs, microphone array, and responsive UI.',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image for the smart mirror front panel.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image representing the electronics tray behind the mirror.' }
      ],
      note: 'Swap in UI states and wiring photos to highlight the Alexa integration and light diffusion.'
    },
    'led-eq': {
      title: 'Sound Reactive LED Equalizer',
      category: 'Computer & Electrical',
      summary: 'FFT-driven light bar that maps audio frequencies to cascading color bands.',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image for the sound reactive LED equalizer in action.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image showing the controller enclosure for the LED equalizer.' }
      ],
      note: 'Include short clips or sequential stills to demonstrate the FFT response once assets are available.'
    }
  };

  const Projects = (() => {
    const entries = Object.entries(RAW_PROJECTS).map(([id, data]) => [id, Object.freeze({ id, ...data })]);
    const map = new Map(entries);
    const counts = entries.reduce((acc, [, project]) => {
      const key = project.category;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return {
      get(id){ return map.get(id); },
      has(id){ return map.has(id); },
      all(){ return map.values(); },
      toArray(){ return entries.map(([, project]) => project); },
      countByCategory(category){ return counts[category] || 0; }
    };
  })();

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init(){
    ensureModelViewer();
    initialiseHeroField();
    animateHeroStats();
    const modal = createModal();
    setupRails(modal);
    setupProjectButtons(modal);
  }

  function ensureModelViewer(){
    if (typeof customElements === 'undefined') return;
    if (customElements.get('model-viewer')) return;
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const hasModule = scripts.some(script => script.src.includes('model-viewer.min.js'));
    const hasLegacy = scripts.some(script => script.src.includes('model-viewer-legacy.js'));
    if (!hasModule){
      const loader = document.createElement('script');
      loader.type = 'module';
      loader.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      loader.defer = true;
      document.head.appendChild(loader);
    }
    if (!hasLegacy){
      const legacy = document.createElement('script');
      legacy.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js';
      legacy.setAttribute('nomodule', '');
      legacy.dataset.modelViewer = 'legacy';
      document.head.appendChild(legacy);
    }
  }

  function initialiseHeroField(){
    const canvas = document.getElementById('portfolioField');
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    const particles = [];
    const PARTICLE_COUNT = 120;
    const pointer = { x: 0, y: 0, active: false };
    const exclusionElement = document.querySelector('[data-field-exclusion]');
    const exclusionPadding = 32;
    let exclusionZone = null;
    const POINTER_RADIUS = 210;
    const BASE_CONNECTION = 130;
    const ENHANCED_CONNECTION = 210;

    const pointerRadiusSq = POINTER_RADIUS * POINTER_RADIUS;
    const baseConnectionSq = BASE_CONNECTION * BASE_CONNECTION;
    const enhancedConnectionSq = ENHANCED_CONNECTION * ENHANCED_CONNECTION;

    function updateExclusionZone(){
      if (!(exclusionElement instanceof HTMLElement)){
        exclusionZone = null;
        return;
      }
      const elementRect = exclusionElement.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      exclusionZone = {
        left: elementRect.left - canvasRect.left - exclusionPadding,
        top: elementRect.top - canvasRect.top - exclusionPadding,
        right: elementRect.right - canvasRect.left + exclusionPadding,
        bottom: elementRect.bottom - canvasRect.top + exclusionPadding
      };
    }

    function isInsideExclusion(x, y){
      if (!exclusionZone) return false;
      return x > exclusionZone.left && x < exclusionZone.right && y > exclusionZone.top && y < exclusionZone.bottom;
    }

    function pushOutOfExclusion(p){
      if (!exclusionZone || !isInsideExclusion(p.x, p.y)) return;
      const distances = [
        { side: 'left', value: p.x - exclusionZone.left },
        { side: 'right', value: exclusionZone.right - p.x },
        { side: 'top', value: p.y - exclusionZone.top },
        { side: 'bottom', value: exclusionZone.bottom - p.y }
      ];
      let nearest = distances[0];
      for (const candidate of distances){
        if (candidate.value < nearest.value) nearest = candidate;
      }
      const buffer = 8;
      switch (nearest.side){
        case 'left':
          p.x = exclusionZone.left - buffer;
          p.vx = Math.abs(p.vx);
          break;
        case 'right':
          p.x = exclusionZone.right + buffer;
          p.vx = -Math.abs(p.vx);
          break;
        case 'top':
          p.y = exclusionZone.top - buffer;
          p.vy = Math.abs(p.vy);
          break;
        case 'bottom':
          p.y = exclusionZone.bottom + buffer;
          p.vy = -Math.abs(p.vy);
          break;
        default:
          break;
      }
    }

    function orientation(ax, ay, bx, by, cx, cy){
      const value = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
      return Math.abs(value) < 1e-6 ? 0 : value;
    }

    function onSegment(ax, ay, bx, by, cx, cy){
      return cx >= Math.min(ax, bx) && cx <= Math.max(ax, bx) && cy >= Math.min(ay, by) && cy <= Math.max(ay, by);
    }

    function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy){
      const o1 = orientation(ax, ay, bx, by, cx, cy);
      const o2 = orientation(ax, ay, bx, by, dx, dy);
      const o3 = orientation(cx, cy, dx, dy, ax, ay);
      const o4 = orientation(cx, cy, dx, dy, bx, by);

      if (o1 === 0 && onSegment(ax, ay, bx, by, cx, cy)) return true;
      if (o2 === 0 && onSegment(ax, ay, bx, by, dx, dy)) return true;
      if (o3 === 0 && onSegment(cx, cy, dx, dy, ax, ay)) return true;
      if (o4 === 0 && onSegment(cx, cy, dx, dy, bx, by)) return true;

      return (o1 > 0 && o2 < 0 || o1 < 0 && o2 > 0) && (o3 > 0 && o4 < 0 || o3 < 0 && o4 > 0);
    }

    function lineIntersectsExclusion(x1, y1, x2, y2){
      if (!exclusionZone) return false;
      const { left, right, top, bottom } = exclusionZone;
      if ((x1 < left && x2 < left) || (x1 > right && x2 > right) || (y1 < top && y2 < top) || (y1 > bottom && y2 > bottom)){
        return false;
      }
      if (isInsideExclusion(x1, y1) || isInsideExclusion(x2, y2)) return true;
      const edges = [
        [left, top, right, top],
        [right, top, right, bottom],
        [right, bottom, left, bottom],
        [left, bottom, left, top]
      ];
      return edges.some(([ax, ay, bx, by]) => segmentsIntersect(x1, y1, x2, y2, ax, ay, bx, by));
    }

    function spawnParticle(){
      const particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() * 2 - 1) * 0.32,
        vy: (Math.random() * 2 - 1) * 0.32,
        radius: 1 + Math.random() * 2,
        alpha: 0.25 + Math.random() * 0.4,
        hueOffset: Math.random() * 360,
        noise: Math.random() * Math.PI * 2,
        pointerDistSq: Infinity,
        pointerNear: false
      };
      let attempts = 0;
      while (isInsideExclusion(particle.x, particle.y) && attempts < 12){
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
        attempts++;
      }
      return particle;
    }

    function resize(){
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      updateExclusionZone();
      particles.length = 0;
      const count = Math.max(PARTICLE_COUNT, Math.floor((width * height) / 9000));
      for (let i = 0; i < count; i++) particles.push(spawnParticle());
    }

    function step(){
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, 'rgba(255,255,255,0.96)');
      gradient.addColorStop(1, 'rgba(231,225,209,0.28)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(43,47,51,0.6)';
      ctx.lineWidth = 0.6;

      const magnetStrength = pointer.active ? 180 : 130;
      const pointerActive = pointer.active;

      for (let i = 0; i < particles.length; i++){
        const p = particles[i];
        p.x += p.vx + Math.sin(p.noise + performance.now() * 0.00025) * 0.25;
        p.y += p.vy + Math.cos(p.noise + performance.now() * 0.0002) * 0.25;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (pointerActive){
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq) || 1;
          if (dist < magnetStrength){
            const force = (1 - dist / magnetStrength) * 0.035;
            p.vx -= dx / dist * force;
            p.vy -= dy / dist * force;
          }
          p.pointerDistSq = distSq;
          p.pointerNear = distSq < pointerRadiusSq;
        } else {
          p.pointerDistSq = Infinity;
          p.pointerNear = false;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;
        pushOutOfExclusion(p);
      }

      ctx.globalAlpha = 0.65;
      for (let i = 0; i < particles.length; i++){
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++){
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const distSq = dx * dx + dy * dy;
          const nearPointerPair = pointerActive && (p.pointerNear || q.pointerNear);
          const maxDist = nearPointerPair ? ENHANCED_CONNECTION : BASE_CONNECTION;
          const maxDistSq = nearPointerPair ? enhancedConnectionSq : baseConnectionSq;
          if (distSq < maxDistSq){
            if (lineIntersectsExclusion(p.x, p.y, q.x, q.y)) continue;
            const dist = Math.sqrt(distSq);
            const alpha = 1 - dist / maxDist;
            ctx.globalAlpha = alpha * (nearPointerPair ? 0.55 : 0.35);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = 'rgba(43,47,51,0.45)';
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      for (const p of particles){
        const gradientDot = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        gradientDot.addColorStop(0, `rgba(43,47,51,${0.3 + p.alpha})`);
        gradientDot.addColorStop(1, 'rgba(43,47,51,0)');
        ctx.fillStyle = gradientDot;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointerActive){
        const halo = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, POINTER_RADIUS);
        halo.addColorStop(0, 'rgba(47,50,54,0.18)');
        halo.addColorStop(1, 'rgba(47,50,54,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, POINTER_RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(step);
    }

    resize();
    step();

    window.addEventListener('resize', resize);

    const updatePointer = event => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    canvas.addEventListener('pointermove', updatePointer);
    canvas.addEventListener('pointerdown', updatePointer);
    canvas.addEventListener('pointerleave', () => { pointer.active = false; });
    canvas.addEventListener('pointerup', () => { pointer.active = false; });
    canvas.addEventListener('pointercancel', () => { pointer.active = false; });

    if (exclusionElement && 'ResizeObserver' in window){
      const observer = new ResizeObserver(() => updateExclusionZone());
      observer.observe(exclusionElement);
    }
  }

  function animateHeroStats(){
    const statElements = document.querySelectorAll('.hero-stats [data-stat]');
    if (!statElements.length) return;
    const mapping = {
      automotive: 'Automotive',
      cad: 'CAD',
      electrical: 'Computer & Electrical'
    };

    statElements.forEach(stat => {
      const key = mapping[stat.dataset.stat] || stat.dataset.stat;
      const target = Projects.countByCategory(key);
      const valueEl = stat.querySelector('.stat-value');
      if (!valueEl) return;
      animateNumber(valueEl, target);
    });
  }

  function animateNumber(element, target){
    const duration = 900;
    const startTime = performance.now();
    const startValue = 0;
    const endValue = Number.isFinite(target) ? target : 0;

    function frame(now){
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startValue + (endValue - startValue) * eased);
      element.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function setupRails(modal){
    const rails = document.querySelectorAll('[data-project-rail]');
    rails.forEach((rail, index) => initialiseRail(rail, modal, index));
  }

  function initialiseRail(rail, modal, index){
    const windowEl = rail.querySelector('.rail-window');
    const track = rail.querySelector('.rail-track');
    if (!(windowEl instanceof HTMLElement) || !(track instanceof HTMLElement)) return;

    const cards = Array.from(track.querySelectorAll('.project-card'));
    if (!cards.length) return;

    cards.forEach((card, idx) => {
      card.setAttribute('tabindex', idx === 0 ? '0' : '-1');
      card.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');
      if (idx === 0) card.classList.add('is-active');
    });

    let controls = rail.querySelector('.rail-controls');
    if (!(controls instanceof HTMLElement)){
      controls = document.createElement('div');
      controls.className = 'rail-controls';
      const label = document.createElement('div');
      label.className = 'rail-label';
      label.textContent = rail.dataset.railLabel || `Collection ${index + 1}`;
      if (!rail.hasAttribute('role')){
        rail.setAttribute('role', 'region');
      }
      rail.setAttribute('aria-label', label.textContent);
      const progress = document.createElement('div');
      progress.className = 'rail-progress';
      const bar = document.createElement('div');
      bar.className = 'rail-progress__bar';
      progress.appendChild(bar);
      const buttons = document.createElement('div');
      buttons.className = 'rail-buttons';
      const prev = document.createElement('button');
      prev.type = 'button';
      prev.innerHTML = '←';
      prev.setAttribute('aria-label', 'Scroll backward');
      prev.dataset.dir = 'prev';
      const next = document.createElement('button');
      next.type = 'button';
      next.innerHTML = '→';
      next.setAttribute('aria-label', 'Scroll forward');
      next.dataset.dir = 'next';
      buttons.append(prev, next);
      controls.append(label, progress, buttons);
      rail.insertBefore(controls, rail.firstChild);
    }

    let live = rail.querySelector('.rail-live-region');
    if (!(live instanceof HTMLElement)){
      live = document.createElement('div');
      live.className = 'visually-hidden rail-live-region';
      live.setAttribute('aria-live', 'polite');
      rail.appendChild(live);
    }

    const progressBar = controls.querySelector('.rail-progress__bar');
    const prevBtn = controls.querySelector('button[data-dir="prev"]');
    const nextBtn = controls.querySelector('button[data-dir="next"]');

    const getGap = () => {
      const style = window.getComputedStyle(track);
      return parseFloat(style.columnGap || style.gap || '0');
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const card = entry.target;
        if (!(card instanceof HTMLElement)) return;
        if (entry.isIntersecting){
          card.classList.add('is-active');
          card.setAttribute('tabindex', '0');
          card.setAttribute('aria-hidden', 'false');
          const title = card.querySelector('.project-kicker');
          if (title){
            live.textContent = `${title.textContent.trim()} visible`;
          }
        } else {
          card.classList.remove('is-active');
          card.setAttribute('tabindex', '-1');
          card.setAttribute('aria-hidden', 'true');
        }
      });
    }, {
      root: windowEl,
      threshold: 0.6
    });

    cards.forEach(card => observer.observe(card));

    function updateProgress(){
      const maxScroll = Math.max(1, windowEl.scrollWidth - windowEl.clientWidth);
      const ratio = Math.min(1, Math.max(0, windowEl.scrollLeft / maxScroll));
      if (progressBar) progressBar.style.transform = `scaleX(${ratio || 0})`;
      if (prevBtn) prevBtn.disabled = windowEl.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = windowEl.scrollLeft >= maxScroll - 2;
    }

    const handleScroll = () => requestAnimationFrame(updateProgress);
    windowEl.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateProgress();

    const scrollByCard = direction => {
      const first = cards[0];
      if (!first) return;
      const gap = getGap();
      const cardWidth = first.getBoundingClientRect().width + gap;
      const distance = direction * cardWidth;
      windowEl.scrollBy({ left: distance, behavior: 'smooth' });
    };

    prevBtn?.addEventListener('click', () => scrollByCard(-1));
    nextBtn?.addEventListener('click', () => scrollByCard(1));

    rail.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft'){
        event.preventDefault();
        scrollByCard(-1);
      } else if (event.key === 'ArrowRight'){
        event.preventDefault();
        scrollByCard(1);
      }
    });
  }

  function setupProjectButtons(modal){
    const buttons = document.querySelectorAll('.project-action');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.project;
        if (!id || !Projects.has(id) || !modal) return;
        const project = Projects.get(id);
        const context = collectContext(button.closest('.project-card'));
        modal.open(project, context);
      });
    });
  }

  function collectContext(card){
    if (!(card instanceof HTMLElement)) return { collection: [] };
    const rail = card.closest('[data-project-rail]');
    if (!rail) return { collection: [] };
    const cards = Array.from(rail.querySelectorAll('.project-card'));
    const collection = cards
      .map(entry => {
        const id = entry.dataset.projectId || entry.querySelector('[data-project]')?.dataset.project;
        const label = entry.querySelector('.project-kicker')?.textContent?.trim() || '';
        return id ? { id, label } : null;
      })
      .filter(Boolean);
    return { collection };
  }

  function createModal(){
    const root = document.getElementById('projectModal');
    if (!(root instanceof HTMLElement)) return null;
    const body = root.querySelector('#projectModalBody');
    const title = root.querySelector('#projectModalTitle');
    const summary = root.querySelector('#projectModalSummary');
    const category = root.querySelector('#projectModalCategory');
    const closeButtons = root.querySelectorAll('[data-close]');
    let focusTrapHandler = null;
    let previouslyFocused = null;

    const api = {
      open(project, context = {}){
        if (!project) return;
        previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        root.classList.add('open');
        root.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (title) title.textContent = project.title;
        if (summary) summary.textContent = project.summary || '';
        if (category) category.textContent = project.category || '';
        if (body){
          body.innerHTML = '';
          if (project.gallery && project.gallery.length){
            body.appendChild(renderGallery(project.gallery, project.title));
          }
          if (project.model){
            body.appendChild(renderModel(project));
          }
          if (project.note){
            const note = document.createElement('div');
            note.className = 'modal-note';
            note.textContent = project.note;
            body.appendChild(note);
          }
          if (context.collection && context.collection.length > 1){
            body.appendChild(renderCollectionNav(context.collection, project.id, api));
          }
        }

        const focusable = getFocusableElements(root);
        const firstFocusable = focusable[0];
        firstFocusable?.focus();

        if (focusTrapHandler){
          document.removeEventListener('keydown', focusTrapHandler);
        }
        focusTrapHandler = event => {
          if (event.key !== 'Tab') return;
          const elements = getFocusableElements(root);
          if (!elements.length) return;
          const first = elements[0];
          const last = elements[elements.length - 1];
          if (event.shiftKey && document.activeElement === first){
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last){
            event.preventDefault();
            first.focus();
          }
        };

        document.addEventListener('keydown', focusTrapHandler);
      },
      close(){
        root.classList.remove('open');
        root.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (focusTrapHandler){
          document.removeEventListener('keydown', focusTrapHandler);
          focusTrapHandler = null;
        }
        previouslyFocused?.focus();
      }
    };

    closeButtons.forEach(btn => btn.addEventListener('click', api.close));
    root.addEventListener('click', event => {
      if (event.target instanceof HTMLElement && event.target.dataset.close !== undefined){
        api.close();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && root.classList.contains('open')) api.close();
    });

    return api;
  }

  function renderGallery(items, title){
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-gallery';
    items.forEach(item => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || title || '';
      img.loading = 'lazy';
      figure.appendChild(img);
      wrapper.appendChild(figure);
    });
    return wrapper;
  }

  function renderModel(project){
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-viewer';
    const spec = project.model;
    if (!spec || !spec.src){
      const placeholder = document.createElement('div');
      placeholder.className = 'viewer-placeholder';
      placeholder.innerHTML = '<strong>3D model coming soon</strong>';
      wrapper.appendChild(placeholder);
      return wrapper;
    }

    const inlineViewer = project.id ? document.querySelector(`[data-project-id="${project.id}"] model-viewer`) : null;
    const viewer = inlineViewer ? inlineViewer.cloneNode(false) : document.createElement('model-viewer');
    viewer.setAttribute('src', spec.src);
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('touch-action', 'pan-y');
    viewer.setAttribute('loading', 'eager');
    viewer.setAttribute('reveal', 'auto');
    viewer.setAttribute('interaction-prompt', 'auto');
    viewer.setAttribute('shadow-intensity', spec.shadowIntensity || '0.8');
    viewer.setAttribute('exposure', spec.exposure || '1.0');
    viewer.setAttribute('alt', spec.alt || project.title);
    if (spec.poster) viewer.setAttribute('poster', spec.poster); else viewer.removeAttribute('poster');
    if (spec.autoRotate) viewer.setAttribute('auto-rotate', ''); else viewer.removeAttribute('auto-rotate');
    if (spec.rotationPerSecond) viewer.setAttribute('rotation-per-second', spec.rotationPerSecond); else viewer.removeAttribute('rotation-per-second');
    viewer.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'viewer-placeholder';
      const headline = document.createElement('strong');
      headline.textContent = '3D model unavailable';
      const message = document.createElement('p');
      message.className = 'viewer-placeholder__status';
      message.textContent = spec.message || 'Link a .glb or .gltf file to enable the viewer.';
      placeholder.append(headline, message);
      wrapper.innerHTML = '';
      wrapper.appendChild(placeholder);
    }, { once: true });

    wrapper.appendChild(viewer);
    return wrapper;
  }

  function renderCollectionNav(collection, activeId, modalApi){
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-collection';
    const label = document.createElement('span');
    label.className = 'modal-collection__label';
    label.textContent = 'More from this set';
    wrapper.appendChild(label);
    collection.forEach(entry => {
      if (!entry || entry.id === activeId || !Projects.has(entry.id)) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal-collection__btn';
      btn.textContent = entry.label || Projects.get(entry.id).title;
      btn.addEventListener('click', () => {
        const project = Projects.get(entry.id);
        if (!project) return;
        modalApi.open(project, { collection });
      });
      wrapper.appendChild(btn);
    });
    return wrapper;
  }

  function getFocusableElements(root){
    if (!(root instanceof HTMLElement)) return [];
    const focusableSelectors = [
      'a[href]', 'button:not([disabled])', 'textarea', 'input', 'select', '[tabindex]:not([tabindex="-1"])'
    ];
    const focusables = Array.from(root.querySelectorAll(focusableSelectors.join(',')));
    return focusables.filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
  }
})();
