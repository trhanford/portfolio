// script.js — full site logic (typewriter, nav fade-in, smooth scroll, particles, drawer)
// Replace your current script.js with this file.

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
      const words = ['Mechanical Engineer','Car enthusiast','Pet lover'];
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
      nav.removeAttribute('hidden');           // make sure CSS can't force display:none
      nav.style.willChange = 'opacity';

      let ticking = false;
      let revealStart = 0;
      let revealEnd   = calcRevealEnd();       // responsive to viewport

      function calcRevealEnd(){
        // ~28% of viewport height; clamp so it works on small/large screens
        return clamp(Math.round(window.innerHeight * 0.28), 120, 260);
      }

      function updateNavFade(){
        ticking=false;
        const y = window.scrollY || 0;
        let t = (y - revealStart) / Math.max(1, (revealEnd - revealStart));
        t = clamp(t, 0, 1);
        const minHint = (y > 1 ? 0.06 : 0.0);  // subtle visibility after 1px scroll
        const op = Math.max(minHint, t);
        nav.style.opacity = op.toFixed(3);
        if (op > 0.2) nav.classList.add('nav-active'); else nav.classList.remove('nav-active');
      }

      function onScroll(){ if (!ticking){ ticking=true; requestAnimationFrame(updateNavFade); } }
      function onResize(){ revealEnd = calcRevealEnd(); updateNavFade(); }
      requestAnimationFrame(updateNavFade);
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', onResize);
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
    const cvs=$('#introField');
    if (cvs){
      const ctx=cvs.getContext('2d');
      let W=0,H=0,DPR=1, pts=[], t=0;

      function resize(){
        W=cvs.clientWidth; H=cvs.clientHeight; DPR=Math.min(2, window.devicePixelRatio||1);
        cvs.width=Math.floor(W*DPR); cvs.height=Math.floor(H*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);
        const taupe = getComputedStyle(document.documentElement).getPropertyValue('--taupe').trim() || '#e4ddcc';
        document.documentElement.style.setProperty('--_bgTaupe', taupe);
        // Subtle but present density
        const count = Math.max(110, Math.min(300, Math.round((W*H)/14000)));
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

    // -------------------- (Optional) Refractive hover  --------------------
    // Disabled by default since you’re switching to the CSS radial-fill effect.
    // If you want it back, add the 'refract-armed' class to <body> and include the filter in your HTML.
  }
})();
