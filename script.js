// script.js — Navbar fades in as you scroll; stays fixed at top
// Copy/paste over your existing script.js

(function(){
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  function init(){
    // -------------------- Footer year --------------------
    const y=$('#year'); if (y) y.textContent = new Date().getFullYear();

    // -------------------- Typewriter --------------------
    const typedEl=$('#typed');
    const words=['Mechanical Engineer','Car enthusiast','Pet lover'];
    const TYPE=70, ERASE=45, HOLD=1100; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    async function typeWord(w){ for(let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(TYPE);} await sleep(HOLD); for(let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(ERASE);} }
    (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w);} } })();

    // -------------------- Smooth Scroll (subtract fixed nav height) --------------------
    document.addEventListener('click', (e)=>{
      const a = e.target.closest('[data-scroll]');
      if (!a) return;
      const href = a.getAttribute('href')||'';
      if (!href.startsWith('#')) return; // external
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const nav = $('#mainNav');
      const navH = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior:'smooth' });
    });

    // -------------------- Navbar fade-in on scroll --------------------
    // Behavior: Hidden on load (opacity 0, pointer-events none). As user scrolls
    // from 0px to revealEnd, opacity ramps 0 -> 1. Nav is position:fixed so no layout shift.
    const nav = $('#mainNav');
    let ticking=false;
    const revealStart = 0;     // start fading immediately when leaving top
    const revealEnd   = 220;   // px scrolled where nav is fully opaque (tweak to taste)

    function updateNavFade(){
      ticking=false;
      if (!nav) return;
      const y = window.scrollY;
      const t = clamp((y - revealStart) / Math.max(1, (revealEnd - revealStart)), 0, 1);
      nav.style.opacity = t.toFixed(3);
      // Enable interactions only when mostly visible
      if (t > 0.2) nav.classList.add('nav-active'); else nav.classList.remove('nav-active');
    }
    function onScroll(){ if (!ticking){ ticking=true; requestAnimationFrame(updateNavFade); } }
    window.addEventListener('scroll', onScroll, {passive:true});
    // Initial state
    updateNavFade();

    // -------------------- Mobile Drawer --------------------
    const drawer=$('#drawer'); const menuBtn=$('#menuBtn');
    menuBtn?.addEventListener('click', ()=>{ const open=!drawer.classList.contains('open'); drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); menuBtn.setAttribute('aria-expanded', String(open)); });
    drawer?.addEventListener('click', e=>{ if (e.target.matches('[data-scroll], a[href^="/"]')){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); menuBtn?.setAttribute('aria-expanded','false'); } });

    // -------------------- Panel refractive hover --------------------
    const panel = $('#panelLinks'); const filterNode = document.querySelector('#refract');
    if (panel && filterNode){
      document.body.classList.add('refract-armed');
      const turb = filterNode.querySelector('feTurbulence');
      const disp = filterNode.querySelector('feDisplacementMap');
      let animId=0, running=false, t0=0, seed=2;
      function animate(now){ if(!running) return; if(!t0) t0=now; const t=(now-t0)/1000; seed=(seed+0.05)%1000; turb?.setAttribute('seed', String(seed)); const scale=3.5+Math.sin(t*3.2)*1.5; disp?.setAttribute('scale', String(scale.toFixed(2))); animId=requestAnimationFrame(animate); }
      panel.addEventListener('pointerenter', ()=>{ running=true; t0=0; cancelAnimationFrame(animId); animId=requestAnimationFrame(animate); });
      panel.addEventListener('pointerleave', ()=>{ running=false; cancelAnimationFrame(animId); disp?.setAttribute('scale','0'); });
    }

    // -------------------- Intro particles (denser + livelier) --------------------
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
        const count = Math.max(100, Math.min(280, Math.round((W*H)/14000))); // a bit denser
        pts = Array.from({length:count}, ()=>({ x: Math.random()*W, y: Math.random()*H, vx:(Math.random()*2-1)*0.18, vy:(Math.random()*2-1)*0.18, s: 1 + Math.random()*1.2, a: 0.35 + Math.random()*0.45, phase: Math.random()*Math.PI*2, fx: 0.15 + Math.random()*0.25, fy: 0.15 + Math.random()*0.25 }));
      }
      function tick(){
        t += 0.016;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--_bgTaupe') || '#e4ddcc';
        ctx.fillRect(0,0,W,H);
        const g=ctx.createRadialGradient(W*0.5,H*0.5,0, W*0.5,H*0.5, Math.max(W,H)*0.7);
        g.addColorStop(0,'rgba(255,255,255,0.02)'); g.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
        ctx.fillStyle='#2b2f33';
        for(const p of pts){ const flowX = Math.sin(t*p.fx + p.phase) * 0.35; const flowY = Math.cos(t*p.fy + p.phase*1.3) * 0.35; p.x += p.vx + flowX; p.y += p.vy + flowY; if(p.x<0){p.x=0; p.vx*=-1;} else if(p.x>W){p.x=W; p.vx*=-1;} if(p.y<0){p.y=0; p.vy*=-1;} else if(p.y>H){p.y=H; p.vy*=-1;} ctx.globalAlpha=p.a; ctx.fillRect(p.x,p.y,p.s,p.s); }
        ctx.globalAlpha=1; requestAnimationFrame(tick);
      }
      window.addEventListener('resize', resize);
      requestAnimationFrame(()=>{ resize(); tick(); });
    }
  }
})();
