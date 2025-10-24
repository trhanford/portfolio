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

   // -------------------- Background Particles (hero + portfolio) --------------------
    const introCanvas = document.getElementById('introField');
    if (introCanvas) createFluxField(introCanvas, {
      density: 140,
      maxDensity: 300,
      pointerRadius: 220,
      pointerForce: 0.048,
      enhancedConnection: 220,
      backgroundStops: [
        ['rgba(255,255,255,0.96)', 0],
        ['rgba(231,225,209,0.32)', 1]
      ]
    });

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
            const rx = a.x - b.x, ry = a.y - b.y;
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
  function createFluxField(canvas, options = {}){
    if (!(canvas instanceof HTMLCanvasElement)) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const settings = {
      density: 130,
      maxDensity: 260,
      baseConnection: 130,
      enhancedConnection: 210,
      pointerRadius: 210,
      pointerForce: 0.04,
      pointerLineOpacity: 0.55,
      pointerHaloOpacity: 0.18,
      driftScale: 0.25,
      velocityDamp: 0.992,
      backgroundStops: [
        ['rgba(255,255,255,0.96)', 0],
        ['rgba(231,225,209,0.28)', 1]
      ],
      dotColor: 'rgba(43,47,51,0.35)',
      lineColor: 'rgba(43,47,51,0.45)',
      haloColor: 'rgba(47,50,54,0.18)',
      exclusionElement: null,
      exclusionPadding: 32,
      exclusionMargin: 46,
      exclusionForce: 0.022,
      exclusionStep: 12
    };

    Object.assign(settings, options || {});

    const pointer = { x: 0, y: 0, active: false };
    const particles = [];
    let width = 0;
    let height = 0;
    let dpr = Math.min(2, window.devicePixelRatio || 1);
    let gradient = null;
    let exclusionZone = null;

    const pointerRadiusSq = settings.pointerRadius * settings.pointerRadius;
    const baseConnectionSq = settings.baseConnection * settings.baseConnection;
    const enhancedConnectionSq = settings.enhancedConnection * settings.enhancedConnection;

    function updateGradient(){
      gradient = ctx.createLinearGradient(0, 0, width, height);
      settings.backgroundStops.forEach(([color, stop]) => gradient.addColorStop(stop, color));
    }

    function updateExclusionZone(){
      const element = settings.exclusionElement;
      if (!(element instanceof HTMLElement)){
        exclusionZone = null;
        return;
      }
      const pad = settings.exclusionPadding || 0;
      const canvasRect = canvas.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();
      exclusionZone = {
        left: elementRect.left - canvasRect.left - pad,
        right: elementRect.right - canvasRect.left + pad,
        top: elementRect.top - canvasRect.top - pad,
        bottom: elementRect.bottom - canvasRect.top + pad
      };
    }

    function spawnParticle(){
      const particle = {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() * 2 - 1) * 0.32,
        vy: (Math.random() * 2 - 1) * 0.32,
        radius: 1 + Math.random() * 1.8,
        alpha: 0.25 + Math.random() * 0.45,
        noise: Math.random() * Math.PI * 2,
        driftX: 0.18 + Math.random() * 0.32,
        driftY: 0.18 + Math.random() * 0.32,
        pointerNear: false,
        pointerDistSq: Infinity
      };

      let attempts = 0;
      while (exclusionZone && isInsideExclusion(particle.x, particle.y) && attempts < 14){
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
      updateGradient();
      updateExclusionZone();
      particles.length = 0;
      const area = width * height;
      const base = settings.density;
      const max = settings.maxDensity;
      const count = Math.max(base, Math.min(max, Math.floor(area / 9000)));
      for (let i = 0; i < count; i++) particles.push(spawnParticle());
    }

    function isInsideExclusion(x, y){
      if (!exclusionZone) return false;
      return x > exclusionZone.left && x < exclusionZone.right && y > exclusionZone.top && y < exclusionZone.bottom;
    }

    function applyExclusionForces(particle){
      if (!exclusionZone) return;
      const margin = settings.exclusionMargin || 0;
      const left = exclusionZone.left - margin;
      const right = exclusionZone.right + margin;
      const top = exclusionZone.top - margin;
      const bottom = exclusionZone.bottom + margin;

      if (particle.x < left || particle.x > right || particle.y < top || particle.y > bottom) return;

      const distLeft = particle.x - left;
      const distRight = right - particle.x;
      const distTop = particle.y - top;
      const distBottom = bottom - particle.y;
      const minDist = Math.min(distLeft, distRight, distTop, distBottom);

      const penetration = Math.max(0, margin - minDist);
      if (penetration <= 0 && !isInsideExclusion(particle.x, particle.y)) return;

      let nx = 0;
      let ny = 0;
      switch (minDist){
        case distLeft: nx = -1; break;
        case distRight: nx = 1; break;
        case distTop: ny = -1; break;
        default: ny = 1; break;
      }

      const strength = (penetration / Math.max(1, margin)) + (isInsideExclusion(particle.x, particle.y) ? 0.35 : 0);
      const push = strength * settings.exclusionForce;
      particle.vx += nx * push;
      particle.vy += ny * push;
      particle.x += nx * strength * settings.exclusionStep;
      particle.y += ny * strength * settings.exclusionStep;
    }

    function step(){
      ctx.clearRect(0, 0, width, height);
      if (gradient){
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.lineWidth = 0.7;
      ctx.strokeStyle = settings.lineColor;
      ctx.fillStyle = settings.dotColor;

      const pointerActive = pointer.active;
      const magnetStrength = pointerActive ? settings.pointerRadius : settings.baseConnection;
      const pointerNeighbours = [];

      for (const particle of particles){
        const drift = performance.now() * 0.00022;
        particle.x += particle.vx + Math.sin(particle.noise + drift * particle.driftX) * settings.driftScale;
        particle.y += particle.vy + Math.cos(particle.noise + drift * particle.driftY) * settings.driftScale;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        if (pointerActive){
          const dx = pointer.x - particle.x;
          const dy = pointer.y - particle.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq) || 1;
          if (dist < magnetStrength){
            const force = (1 - dist / magnetStrength) * settings.pointerForce;
            particle.vx -= dx / dist * force;
            particle.vy -= dy / dist * force;
          }
          particle.pointerDistSq = distSq;
          particle.pointerNear = distSq < pointerRadiusSq;
          if (particle.pointerNear) pointerNeighbours.push(particle);
        } else {
          particle.pointerDistSq = Infinity;
          particle.pointerNear = false;
        }

        particle.vx *= settings.velocityDamp;
        particle.vy *= settings.velocityDamp;
        applyExclusionForces(particle);
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
          const limit = nearPointerPair ? enhancedConnectionSq : baseConnectionSq;
          if (distSq > limit) continue;
          if (exclusionZone && intersectsExclusion(p.x, p.y, q.x, q.y)) continue;
          const dist = Math.sqrt(distSq);
          const alpha = 1 - dist / (nearPointerPair ? settings.enhancedConnection : settings.baseConnection);
          ctx.globalAlpha = alpha * (nearPointerPair ? 0.55 : 0.35);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1;
      for (const particle of particles){
        const dot = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.radius * 3);
        dot.addColorStop(0, `rgba(43,47,51,${0.3 + particle.alpha})`);
        dot.addColorStop(1, 'rgba(43,47,51,0)');
        ctx.fillStyle = dot;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2.4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointerActive && pointerNeighbours.length){
        ctx.globalAlpha = settings.pointerLineOpacity;
        ctx.lineWidth = 0.9;
        ctx.strokeStyle = settings.lineColor;
        for (const particle of pointerNeighbours){
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(particle.x, particle.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        const halo = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, settings.pointerRadius);
        halo.addColorStop(0, `rgba(47,50,54,${settings.pointerHaloOpacity})`);
        halo.addColorStop(1, 'rgba(47,50,54,0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(pointer.x, pointer.y, settings.pointerRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(step);
    }

    function intersectsExclusion(x1, y1, x2, y2){
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

    function updatePointer(event){
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    }

    function deactivatePointer(){ pointer.active = false; }

    const resizeObserver = (settings.exclusionElement && 'ResizeObserver' in window)
      ? new ResizeObserver(() => updateExclusionZone())
      : null;
    resizeObserver?.observe(settings.exclusionElement);

    window.addEventListener('resize', resize);

    canvas.addEventListener('pointermove', updatePointer);
    canvas.addEventListener('pointerdown', updatePointer);
    canvas.addEventListener('pointerup', deactivatePointer);
    canvas.addEventListener('pointerleave', deactivatePointer);
    canvas.addEventListener('pointercancel', deactivatePointer);

    resize();
    requestAnimationFrame(step);

    return {
      destroy(){
        resizeObserver?.disconnect();
        canvas.removeEventListener('pointermove', updatePointer);
        canvas.removeEventListener('pointerdown', updatePointer);
        canvas.removeEventListener('pointerup', deactivatePointer);
        canvas.removeEventListener('pointerleave', deactivatePointer);
        canvas.removeEventListener('pointercancel', deactivatePointer);
      }
    };
  }

  window.createFluxField = window.createFluxField || createFluxField;
})();
