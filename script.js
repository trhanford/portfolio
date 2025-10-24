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

    function initFieldBackground(bg){
      const ctx=bg.getContext('2d');
      let W=0,H=0,DPR=1, pts=[], t=0;

      function resize(){
        W=bg.clientWidth; H=bg.clientHeight; DPR=Math.min(2, window.devicePixelRatio||1);
        bg.width=Math.floor(W*DPR); bg.height=Math.floor(H*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);
        const taupe = getComputedStyle(document.documentElement).getPropertyValue('--taupe').trim() || '#e4ddcc';
        document.documentElement.style.setProperty('--_bgTaupe', taupe);
        const count = Math.max(120, Math.min(320, Math.round((W*H)/14000)));
        pts = Array.from({length:count}, ()=>({
          x: Math.random()*W,
          y: Math.random()*H,
          vx: (Math.random()*2-1)*0.18,
          vy: (Math.random()*2-1)*0.18,
          s: 1 + Math.random()*1.2,
          a: 0.35 + Math.random()*0.45,
          phase: Math.random()*Math.PI*2,
          fx: 0.15 + Math.random()*0.25,
          fy: 0.15 + Math.random()*0.25
        }));
      }

      function tick(){
        t += 0.016;
        // background fill (taupe)
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--_bgTaupe') || '#e4ddcc';
        ctx.fillRect(0,0,W,H);
        // soft vignette
        const g=ctx.createRadialGradient(W*0.5,H*0.5,0, W*0.5,H*0.5, Math.max(W,H)*0.7);
        g.addColorStop(0,'rgba(255,255,255,0.02)');
        g.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
        // particles
        ctx.fillStyle='#2b2f33';
        for(const p of pts){
          const flowX = Math.sin(t*p.fx + p.phase) * 0.35;
          const flowY = Math.cos(t*p.fy + p.phase*1.3) * 0.35;
          p.x += p.vx + flowX;
          p.y += p.vy + flowY;
          if(p.x<0){p.x=0; p.vx*=-1;} else if(p.x>W){p.x=W; p.vx*=-1;}
          if(p.y<0){p.y=0; p.vy*=-1;} else if(p.y>H){p.y=H; p.vy*=-1;}
          ctx.globalAlpha=p.a;
          ctx.fillRect(p.x,p.y,p.s,p.s);
        }
        ctx.globalAlpha=1;
        requestAnimationFrame(tick);
      }

      window.addEventListener('resize', resize);
      requestAnimationFrame(()=>{ resize(); tick(); });
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
