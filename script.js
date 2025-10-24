// script.js — full site logic (typewriter, nav fade-in, smooth scroll, particles, drawer, skills bubbles)

(function(){
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));
  const sleep = ms => new Promise(r=>setTimeout(r,ms));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  function init(){
    // -------------------- Footer year --------------------
    const y=$('#year'); if (y) y.textContent = new Date().getFullYear();

    // -------------------- Typewriter (robust) --------------------
    (function typewriter(){
      const el = $('#typed'); if (!el) return;
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
      const TYPE=70, ERASE=45, HOLD=1100;

      async function typeOne(word){
        for (let i=1;i<=word.length;i++){ el.textContent = word.slice(0,i); await sleep(TYPE); }
        await sleep(HOLD);
        for (let i=word.length-1;i>=0;i--){ el.textContent = word.slice(0,i); await sleep(ERASE); }
      }
      // Ensure caret visible even if CSS loads late
      el.style.borderRight = '2px solid rgba(31,35,39,.95)';
      el.style.paddingRight = '8px';

      (async function loop(){ while(true){ for(const w of words) await typeOne(w); } })();
    })();

    // -------------------- Smooth Scroll (subtract fixed nav height) --------------------
    document.addEventListener('click', (e)=>{
      const a = e.target.closest('[data-scroll]');
      if (!a) return;
      const href = a.getAttribute('href')||'';
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const nav = $('#mainNav');
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior:'smooth' });
    });

    // -------------------- Navbar fade-in on scroll (fixed at top) --------------------
    const nav = $('#mainNav');
    if (nav){
      nav.removeAttribute('hidden');           // prevent display:none from HTML attr
       
      if (nav.hasAttribute('data-instant')){
        nav.style.opacity = '1';
        nav.classList.add('nav-active');
      } else {
        nav.style.willChange = 'opacity';

        let ticking = false;
        let revealEnd   = calcRevealEnd();       // responsive to viewport

        function calcRevealEnd(){
          // ~28% of viewport height; clamp for small/large screens
          return clamp(Math.round(window.innerHeight * 0.28), 120, 260);
        }

        function updateNavFade(){
          ticking=false;
          const y = window.scrollY || 0;
          let t = (y) / Math.max(1, revealEnd);
          t = clamp(t, 0, 1);
          const op = Math.max(0.0, t); // start from 0 and ramp to 1
          nav.style.opacity = op.toFixed(3);
          if (op > 0.2) nav.classList.add('nav-active'); else nav.classList.remove('nav-active');
        }

        function onScroll(){ if (!ticking){ ticking=true; requestAnimationFrame(updateNavFade); } }
        function onResize(){ revealEnd = calcRevealEnd(); updateNavFade(); }
        requestAnimationFrame(updateNavFade);
        window.addEventListener('scroll', onScroll, {passive:true});
        window.addEventListener('resize', onResize);
      }
    }

    // -------------------- Mobile Drawer --------------------
    const drawer=$('#drawer'); const menuBtn=$('#menuBtn');
    menuBtn?.addEventListener('click', ()=>{
      const open = !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    drawer?.addEventListener('click', e=>{
      if (e.target.matches('[data-scroll], a[href^="/"]')){
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
        menuBtn?.setAttribute('aria-expanded','false');
      }
    });

    // -------------------- Background Particles (hero) --------------------
    ['introField','portfolioField']
      .map(id=>document.getElementById(id))
      .filter(Boolean)
      .forEach(initFieldBackground);

    initRevealAnimations();

    function initFieldBackground(bg){
      const ctx = bg.getContext('2d');
      const pointerSurface = bg.closest('[data-field-surface]') || bg.parentElement?.parentElement || bg;
      const pointer = {
        x: 0,
        y: 0,
        targetX: 0,
        targetY: 0,
        inside: false,
        strength: 0,
        targetStrength: 0,
        lastMove: 0
      };

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let reduceMotion = mediaQuery.matches;
      mediaQuery.addEventListener?.('change', e => { reduceMotion = e.matches; });

      let W = 0, H = 0, DPR = 1;
      let pts = [];
      let columns = 0, rows = 0, cellSize = 160, buckets = [];
      let lastFrame = performance.now();
      let firstResize = true;

      const exclusionSelectors = (bg.dataset.exclusions || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      let exclusionZones = [];

       const disableMagnetSelectors = [pointerSurface?.dataset.disableMagnet, bg.dataset.disableMagnet]
        .filter(Boolean)
        .join(',')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean);
      
      const taupe = () => getComputedStyle(document.documentElement).getPropertyValue('--taupe').trim() || '#e4ddcc';

      function createParticle(){
        const speed = (Math.random()*2 - 1) * 0.1;
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: speed,
          vy: (Math.random()*2 - 1) * 0.12,
          baseSize: 1.2 + Math.random() * 1.9,
          pulse: Math.random() * Math.PI * 2,
          flowX: Math.random() * 0.6 + 0.25,
          flowY: Math.random() * 0.6 + 0.25,
          jitter: Math.random() * 0.4 + 0.1,
          seed: Math.random() * 1000
        };
      }

      function updatePointerTarget(clientX, clientY){
        const rect = bg.getBoundingClientRect();
        pointer.targetX = clamp(clientX - rect.left, 0, rect.width);
        pointer.targetY = clamp(clientY - rect.top, 0, rect.height);
        pointer.lastMove = performance.now();
        pointer.lastMove = performance.now();
      }

      function handlePointerMove(e){
        updatePointerTarget(e.clientX, e.clientY);
        const suppressed = shouldDisableMagnet(e.target);
        pointer.inside = !suppressed;
        pointer.targetStrength = suppressed ? 0 : 1;
        if (suppressed) pointer.strength *= 0.35;
      }
      
      function handlePointerLeave(){
        pointer.inside = false;
        pointer.targetStrength = 0;
        pointer.strength *= 0.5;
      }

      function computeExclusionZones(){
        if (!exclusionSelectors.length){
          exclusionZones = [];
          return;
        }
        const canvasRect = bg.getBoundingClientRect();
        const zones = [];
        for (const selector of exclusionSelectors){
          const elements = Array.from(document.querySelectorAll(selector));
          for (const el of elements){
            if (!(el instanceof Element)) continue;
            const rect = el.getBoundingClientRect();
            const zone = {
              x: rect.left - canvasRect.left,
              y: rect.top - canvasRect.top,
              w: rect.width,
              h: rect.height
            };
            if (zone.w <= 0 || zone.h <= 0) continue;
            zones.push(zone);
          }
        }
        exclusionZones = zones;
      }
  
      function isInsideExclusion(x, y){
        if (!exclusionZones.length) return false;
        for (const zone of exclusionZones){
          if (x >= zone.x && x <= zone.x + zone.w && y >= zone.y && y <= zone.y + zone.h) return true;
        }
        return false;
      }
  
      function resolveExclusions(p){
        if (!exclusionZones.length) return;
        for (const zone of exclusionZones){
          if (p.x >= zone.x && p.x <= zone.x + zone.w && p.y >= zone.y && p.y <= zone.y + zone.h){
            const left = Math.abs(p.x - zone.x);
            const right = Math.abs(zone.x + zone.w - p.x);
            const top = Math.abs(p.y - zone.y);
            const bottom = Math.abs(zone.y + zone.h - p.y);
            const min = Math.min(left, right, top, bottom);
            if (min === left){
              p.x = zone.x - 1;
              p.vx = -Math.abs(p.vx);
            } else if (min === right){
              p.x = zone.x + zone.w + 1;
              p.vx = Math.abs(p.vx);
            } else if (min === top){
              p.y = zone.y - 1;
              p.vy = -Math.abs(p.vy);
            } else {
              p.y = zone.y + zone.h + 1;
              p.vy = Math.abs(p.vy);
            }
          }
        }
      }
  
      function segmentHitsExclusion(ax, ay, bx, by){
        if (!exclusionZones.length) return false;
        for (const zone of exclusionZones){
          if (segmentIntersectsRect(ax, ay, bx, by, zone)) return true;
        }
        return false;
      }
  
      function segmentIntersectsRect(ax, ay, bx, by, rect){
        const minX = rect.x;
        const maxX = rect.x + rect.w;
        const minY = rect.y;
        const maxY = rect.y + rect.h;
  
        if (ax >= minX && ax <= maxX && ay >= minY && ay <= maxY) return true;
        if (bx >= minX && bx <= maxX && by >= minY && by <= maxY) return true;
  
        const dx = bx - ax;
        const dy = by - ay;
        let t0 = 0;
        let t1 = 1;
        const p = [-dx, dx, -dy, dy];
        const q = [ax - minX, maxX - ax, ay - minY, maxY - ay];
        for (let i = 0; i < 4; i++){
          const pi = p[i];
          const qi = q[i];
          if (pi === 0){
            if (qi < 0) return false;
          } else {
            const t = qi / pi;
            if (pi < 0){
              if (t > t1) return false;
              if (t > t0) t0 = t;
            } else {
              if (t < t0) return false;
              if (t < t1) t1 = t;
            }
          }
        }
        return t1 > t0 && t1 >= 0 && t0 <= 1;
      }

      function shouldDisableMagnet(target){
        if (!target || !disableMagnetSelectors.length) return false;
        for (const selector of disableMagnetSelectors){
          if (!selector) continue;
          try {
            if (target.closest(selector)) return true;
          } catch (err) {
            continue;
          }
        }
        return false;
      }
      
      function resize(){
        W = bg.clientWidth;
        H = bg.clientHeight;
        DPR = Math.min(2, window.devicePixelRatio || 1);
        bg.width = Math.floor(W * DPR);
        bg.height = Math.floor(H * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        const area = Math.max(1, W * H);
        const desired = reduceMotion ? Math.round(area / 36000) : Math.round(area / 14000);
        const count = clamp(desired, 80, 260);
        pts = Array.from({ length: count }, createParticle);

        cellSize = clamp(Math.sqrt(area / count) * 1.6, 110, 200);
        columns = Math.max(1, Math.ceil(W / cellSize));
        rows = Math.max(1, Math.ceil(H / cellSize));
        buckets = Array.from({ length: columns * rows }, () => []);

        computeExclusionZones();
        
        if (firstResize){
          pointer.x = W * 0.5;
          pointer.y = H * 0.5;
          pointer.targetX = pointer.x;
          pointer.targetY = pointer.y;
          firstResize = false;
        }
        }

      function clearBuckets(){
        for (let i = 0; i < buckets.length; i++) buckets[i].length = 0;
      }

      function pushToBucket(p){
        const cx = clamp(Math.floor(p.x / cellSize), 0, columns - 1);
        const cy = clamp(Math.floor(p.y / cellSize), 0, rows - 1);
        buckets[cx + cy * columns].push(p);
      }

      const neighbourOffsets = [
        [1, 0],
        [0, 1],
        [1, 1],
        [-1, 1],
        [1, -1]
      ];

      function drawConnections(maxDistSq, maxDist){
        ctx.lineWidth = 0.45;
        for (let cy = 0; cy < rows; cy++){
          for (let cx = 0; cx < columns; cx++){
            const bucketIndex = cx + cy * columns;
            const here = buckets[bucketIndex];
            if (!here.length) continue;

            for (let i = 0; i < here.length; i++){
              const a = here[i];
              for (let j = i + 1; j < here.length; j++){
                const b = here[j];
                renderPair(a, b, maxDistSq, maxDist);
              }
            }

            for (const [ox, oy] of neighbourOffsets){
              const nx = cx + ox;
              const ny = cy + oy;
              if (nx < 0 || ny < 0 || nx >= columns || ny >= rows) continue;
              const neighbour = buckets[nx + ny * columns];
              if (!neighbour.length) continue;
              for (const a of here){
                for (const b of neighbour){
                  renderPair(a, b, maxDistSq, maxDist);
                }
              }
            }
          }
        }
      }

      function renderPair(a, b, maxDistSq, maxDist){
        if (isInsideExclusion(a.x, a.y) || isInsideExclusion(b.x, b.y)) return;
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        if (segmentHitsExclusion(a.x, a.y, b.x, b.y)) return;
        const distSq = dx * dx + dy * dy;
        if (distSq > maxDistSq) return;
        const dist = Math.sqrt(distSq) || 1;
        const closeness = 1 - (dist / maxDist);
        const alpha = Math.max(0, Math.min(0.4, closeness * 0.6));
        if (alpha <= 0.01) return;
        ctx.strokeStyle = `rgba(102,108,115,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      
      function loop(now){
        const dt = Math.min(0.033, (now - lastFrame) / 1000 || 0.016);
        lastFrame = now;

        const background = taupe();
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, W, H);

        const vignette = ctx.createRadialGradient(W * 0.5, H * 0.5, Math.max(W, H) * 0.1, W * 0.5, H * 0.5, Math.max(W, H) * 0.9);
        vignette.addColorStop(0, 'rgba(255,255,255,0.08)');
        vignette.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, W, H);

        pointer.targetStrength = pointer.inside ? 1 : 0;
        pointer.strength += (pointer.targetStrength - pointer.strength) * 0.22;
        const pointerEase = reduceMotion ? 0.25 : 0.18;
        pointer.x += (pointer.targetX - pointer.x) * pointerEase;
        pointer.y += (pointer.targetY - pointer.y) * pointerEase;

        clearBuckets();

        const magnetRadius = clamp(Math.max(W, H) * 0.22, 100, 280);
        const magnetRadiusSq = magnetRadius * magnetRadius;
        const magnetStrength = reduceMotion ? 0.04 : 0.13;
        const pointerLinks = [];

        const baseFlow = now * 0.00018;

        for (const p of pts){
          const flowX = Math.sin(baseFlow * p.flowX + p.seed) * 0.22;
          const flowY = Math.cos(baseFlow * p.flowY + p.seed * 1.35) * 0.22;
          p.vx += flowX * dt;
          p.vy += flowY * dt;

          if (!reduceMotion && pointer.strength > 0.01){
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distSq = dx * dx + dy * dy;
            if (distSq < magnetRadiusSq){
              const dist = Math.sqrt(distSq) || 1;
              const influence = (1 - dist / magnetRadius) * pointer.strength;
              const pull = magnetStrength * influence;
              p.vx += (dx / dist) * pull;
              p.vy += (dy / dist) * pull;
              if (!isInsideExclusion(p.x, p.y)) pointerLinks.push({ particle: p, influence });
            }
          }

          p.vx *= 0.985;
          p.vy *= 0.985;

          const jitter = p.jitter * dt;
          p.vx += (Math.random() - 0.5) * jitter;
          p.vy += (Math.random() - 0.5) * jitter;

          p.x += p.vx + flowX;
          p.y += p.vy + flowY;

          if (p.x < -20) p.x = W + 20;
          else if (p.x > W + 20) p.x = -20;
          if (p.y < -20) p.y = H + 20;
          else if (p.y > H + 20) p.y = -20;

          resolveExclusions(p);
          
          pushToBucket(p);
        }

        const connectDist = clamp(Math.max(W, H) * 0.24, 140, 260);
        drawConnections(connectDist * connectDist, connectDist);
        
        ctx.fillStyle = 'rgba(43,47,51,0.85)';
        for (const p of pts){
          if (isInsideExclusion(p.x, p.y)) continue;
          const size = p.baseSize + Math.sin(baseFlow + p.pulse) * 0.7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.65, size), 0, Math.PI * 2);
          ctx.fill();
        }

        const pointerInsideExclusion = isInsideExclusion(pointer.x, pointer.y);
        
        if (!reduceMotion && pointer.strength > 0.02 && !pointerInsideExclusion){
          ctx.save();
          ctx.globalCompositeOperation = 'lighter';
          const halo = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, magnetRadius * 0.9);
          halo.addColorStop(0, `rgba(255,255,255,${0.16 * pointer.strength})`);
          halo.addColorStop(0.45, `rgba(255,255,255,${0.08 * pointer.strength})`);
          halo.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = halo;
          ctx.beginPath();
          ctx.arc(pointer.x, pointer.y, magnetRadius * 0.9, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          
          ctx.lineWidth = 0.55;
          for (const link of pointerLinks){
            if (link.influence <= 0) continue;
            const alpha = clamp(link.influence * pointer.strength * 1.4, 0, 0.85);
            if (alpha < 0.05) continue;
            ctx.strokeStyle = `rgba(74,78,84,${alpha.toFixed(3)})`;
            ctx.beginPath();
            const lx = link.particle.x;
            const ly = link.particle.y;
            if (segmentHitsExclusion(pointer.x, pointer.y, lx, ly)) continue;
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(lx, ly);
            ctx.stroke();
          }
        }

        if (document.visibilityState !== 'hidden'){
          requestAnimationFrame(loop);
        } else {
          lastFrame = performance.now();
          requestAnimationFrame(loop);
        }
      }

      window.addEventListener('resize', resize);
      pointerSurface?.addEventListener('pointermove', handlePointerMove, { passive: true });
      pointerSurface?.addEventListener('pointerdown', handlePointerMove);
      pointerSurface?.addEventListener('pointerenter', handlePointerMove);
      pointerSurface?.addEventListener('pointerleave', handlePointerLeave);
      pointerSurface?.addEventListener('pointerup', handlePointerMove);

      requestAnimationFrame(() => { resize(); loop(performance.now()); });
    }

    function initRevealAnimations(){
      const groups = [
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

      const selector = groups.join(',');
      const nodes = selector ? $$(selector) : [];
      if (!nodes.length) return;

      document.body.classList.add('has-reveal');

      nodes.forEach((el, i) => {
        el.classList.add('reveal-item');
        const delay = Math.min(480, (i % 10) * 60 + (Math.random() * 40));
        el.style.setProperty('--reveal-delay', `${delay.toFixed(0)}ms`);
      });

      if (!('IntersectionObserver' in window)){
        nodes.forEach(el => el.classList.add('is-visible'));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, {
        rootMargin: '0px 0px -5% 0px',
        threshold: 0.12
      });

      nodes.forEach(el => observer.observe(el));
    }

    // -------------------- Bubble Network (skills/interests) --------------------
    (function skillsNetwork(){
      const cvs = document.getElementById('skillsGraph'); if (!cvs) return;
      const ctx = cvs.getContext('2d');

      // Labels + radii (bigger for readability)
      const center = { label:'Tristan', r: 60 };
      const nodes = [
        { label:'CAD (NX / Creo)', r: 40 },
        { label:'Automotive', r: 36 },
        { label:'Wiring & PDM', r: 34 },
        { label:'Cooling & Thermals', r: 36 },
        { label:'Testing & Docs', r: 34 },
        { label:'MATLAB / Python', r: 36 },
        { label:'Snowboarding', r: 32 },
        { label:'Pets', r: 30 },
        { label:'Tinkering', r: 32 },
      ];

      let DPR=1, W=0, H=0, CX=0, CY=0, hoverIndex=-1;
      const P = [{...center, x:0,y:0, baseX:0, baseY:0, center:true, wobX:0, wobY:0, seedX:Math.random()*1000, seedY:Math.random()*1000}]
        .concat(nodes.map(n=>({ ...n, x:0,y:0, baseX:0, baseY:0, center:false, wobX:0, wobY:0, seedX:Math.random()*1000, seedY:Math.random()*1000 })));

      function fit(){
        DPR = Math.min(2, window.devicePixelRatio||1);
        const cssW = cvs.clientWidth, cssH = cvs.clientHeight;
        cvs.width = Math.floor(cssW*DPR); cvs.height = Math.floor(cssH*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);
        W = cssW; H = cssH;
        CX = W*0.5; CY = H*0.5;

        // place center
        P[0].baseX = CX; P[0].baseY = CY;

        // satellites: random non-overlapping-ish positions (relax if too close)
        const pad = 26;
        measureNodes();
        for(let i=1;i<P.length;i++){
          let placed=false, tries=0;
          while(!placed && tries<500){
            const x = pad + Math.random()*(W - pad*2);
            const y = pad + Math.random()*(H - pad*2);
            const r = P[i].r;
            let ok = true;
            for(let j=0;j<i;j++){
              const dx = x - (P[j].baseX||P[j].x), dy = y - (P[j].baseY||P[j].y);
              const min = r + (P[j].r) + 20;
              if (dx*dx + dy*dy < min*min){ ok=false; break; }
            }
            if (ok){ P[i].baseX = x; P[i].baseY = y; placed=true; }
            tries++;
          }
          // fallback if too many tries
          if (!placed){ P[i].baseX = pad + Math.random()*(W - pad*2); P[i].baseY = pad + Math.random()*(H - pad*2); }
        }
      }

      const perfNow = ()=> (performance && performance.now ? performance.now() : Date.now());

      function step(){
        const t = perfNow()*0.001;

        // gentle wobble around base positions (do NOT reorganize into a ring)
        for(let i=0;i<P.length;i++){
          const p = P[i];
          const amp = p.center ? 2.5 : 4.5;        // wobble amplitude
          const spdX = 0.25 + (p.seedX % 0.35);     // slower variation
          const spdY = 0.25 + (p.seedY % 0.35);
          p.wobX = Math.sin(t * (0.6 + spdX) + p.seedX) * amp;
          p.wobY = Math.cos(t * (0.55 + spdY) + p.seedY) * amp;
          p.x = p.baseX + p.wobX;
          p.y = p.baseY + p.wobY;
        }

        // light repulsion to keep separation if they drift too close
        for(let i=0;i<P.length;i++){
          for(let j=i+1;j<P.length;j++){
            const a = P[i], b = P[j];
            const rx = a.x - b.x, ry = b ? (a.y - b.y) : 0;
            const d2 = rx*rx + ry*ry;
            const min = (a.r + b.r) + 16;
            if (d2 > 0 && d2 < (min*min)){
              const d = Math.sqrt(d2) || 1;
              const push = (min - d) * 0.02;
              const ux = rx/d, uy = ry/d;
              a.baseX += ux * push; a.baseY += uy * push;
              b.baseX -= ux * push; b.baseY -= uy * push;
            }
          }
        }

        // clamp bases to canvas (keep padding)
        const pad = 20;
        for(const p of P){
          p.baseX = clamp(p.baseX, pad, W - pad);
          p.baseY = clamp(p.baseY, pad, H - pad);
        }
      }

      function draw(){
        ctx.clearRect(0,0,W,H);
        ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(43,47,51,.22)';

        // edges from center to satellites (branch-like)
        for(let i=1;i<P.length;i++) line(P[0], P[i]);

        // nodes
        for(let i=0;i<P.length;i++){
          const p = P[i];
          const isHover = (i===hoverIndex);
          const fill = p.center ? '#e9e4d7' : '#ffffff';
          const stroke = 'rgba(43,47,51,.28)';
          const weight = isHover ? 700 : (p.center ? 600 : 700);
          const metrics = measureLabel(p, weight);
          const boxX = p.x - metrics.boxW/2;
          const boxY = p.y - metrics.boxH/2;
          roundedRect(boxX, boxY, metrics.boxW, metrics.boxH, 18, fill, stroke, isHover ? 1.0 : 0.95);
          drawLabel(p, metrics.lines, weight, isHover);
        }
      }

      function line(a,b){
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
      function roundedRect(x,y,width,height,radius,fill,stroke,alpha){
        const r = Math.min(radius, width/2, height/2);
        ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = fill; ctx.strokeStyle = stroke;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + width - r, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + r);
        ctx.lineTo(x + width, y + height - r);
        ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
        ctx.lineTo(x + r, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill(); ctx.stroke(); ctx.restore();
      }

      function measureLabel(p, weight){
        const MAX_WIDTH = 140;
        const LINE_HEIGHT = 16;
        const PAD_X = 18;
        const PAD_Y = 12;
        const baseFont = `${weight} 13px Inter, system-ui, sans-serif`;
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.font = baseFont;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const lines = wrapLines(p.label, MAX_WIDTH);
        let maxWidth = 0;
        for (const line of lines){
          maxWidth = Math.max(maxWidth, ctx.measureText(line).width);
        }
        const minWidth = p.center ? 170 : 150;
        const boxW = Math.max(minWidth, maxWidth + PAD_X*2);
        const boxH = lines.length * LINE_HEIGHT + PAD_Y*2;
        ctx.restore();
        p.boxW = boxW;
        p.boxH = boxH;
        p.r = Math.max(boxW, boxH) * 0.5;
        return { lines, boxW, boxH, lineHeight: LINE_HEIGHT, font: baseFont };
      }
      
      function drawLabel(p, lines, weight, isHover){
        const LINE_HEIGHT = 16;
        ctx.save();
        ctx.fillStyle = isHover ? '#1f2327' : '#2b2f33';
        ctx.font = `${weight} 13px Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const totalHeight = (lines.length - 1) * LINE_HEIGHT;
        let yy = p.y - totalHeight / 2;
        for (const line of lines){
          ctx.fillText(line, p.x, yy);
          yy += LINE_HEIGHT;
        }
        ctx.restore();
      }
      
      function wrapLines(text, maxWidth){
        const words = text.split(' ');
        const lines = [];
        let line = '';
        for (const word of words){
          const test = line ? `${line} ${word}` : word;
          if (line && ctx.measureText(test).width > maxWidth){
            lines.push(line);
            line = word;
          } else {
            line = test;
          }
        }
        if (line) lines.push(line);
        return lines;
      }

      function measureNodes(){
        for(const p of P){
          const weight = p.center ? 600 : 700;
          const metrics = measureLabel(p, weight);
          p.boxW = metrics.boxW;
          p.boxH = metrics.boxH;
          p.r = Math.max(metrics.boxW, metrics.boxH) * 0.5;
        }
      }

      function pointer(e){
        const r = cvs.getBoundingClientRect();
        const mx = (e.clientX - r.left);
        const my = (e.clientY - r.top);
        hoverIndex = -1;
        for(let i=0;i<P.length;i++){
          const p = P[i];
          const halfW = (p.boxW || (p.r*2)) / 2;
          const halfH = (p.boxH || (p.r*2)) / 2;
          if (mx >= p.x - halfW && mx <= p.x + halfW && my >= p.y - halfH && my <= p.y + halfH) {
            hoverIndex = i;
            break;
          }
        }
        cvs.style.cursor = (hoverIndex>0 ? 'pointer' : 'default');
      }

      function loop(){
        step(); draw(); requestAnimationFrame(loop);
      }

      window.addEventListener('resize', fit);
      cvs.addEventListener('pointermove', pointer);
      fit(); loop();
    })();

    // -------------------- (Optional) Refractive hover  --------------------
    // Disabled for panel links since you’re using the subtle fade effect via CSS.
  }
})();
