// script.js — Home + About interactions (with smoother sticky nav + denser, livelier particles)
// Copy/paste this over your existing script.js

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
    const TYPE=70, ERASE=45, HOLD=1100;
    const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    async function typeWord(w){ for(let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(TYPE);} await sleep(HOLD); for(let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(ERASE);} }
    (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w);} } })();

    // -------------------- Smooth Scroll --------------------
    document.addEventListener('click', (e)=>{
      const a = e.target.closest('[data-scroll]');
      if (!a) return;
      const href = a.getAttribute('href')||'';
      if (!href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - stickyOffset();
      window.scrollTo({ top, behavior:'smooth' });
    });
    function stickyOffset(){ const nav=$('#mainNav'); return (nav && !nav.hasAttribute('hidden')) ? nav.offsetHeight : 0; }

    // -------------------- Sticky Nav (stable, non-jitter) --------------------
    const mainNav = $('#mainNav');
    const navTitle = $('#navTitle');
    const intro = $('#intro');
    const about = $('#about');

    if (mainNav && intro && about){
      let aboutTop=0, aboutHeight=0, navH=0; let ticking=false; let navVisible=false; let navStuck=false;

      function measure(){
        const rect = about.getBoundingClientRect();
        aboutTop = rect.top + window.scrollY; // absolute offset from page top
        aboutHeight = rect.height || about.offsetHeight;
        navH = mainNav.offsetHeight || 72;
      }

      function update(){
        ticking=false;
        const y = window.scrollY;
        const viewportTop = y;
        const viewportBottom = y + window.innerHeight;

        // Divider behavior: show nav once bottom of viewport crosses About top
        if (viewportBottom > aboutTop + 1){
          if (!navVisible){ mainNav.removeAttribute('hidden'); navVisible=true; }
        } else {
          if (navVisible){ mainNav.setAttribute('hidden',''); navVisible=false; }
        }

        // Stick when ~55% of About is visible
        const visibleTop = Math.max(aboutTop, viewportTop);
        const visibleBottom = Math.min(aboutTop + aboutHeight, viewportBottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const engaged = (visibleHeight / Math.max(1, aboutHeight)) >= 0.55;

        if (engaged){
          if (!navStuck){ document.documentElement.classList.add('nav-stuck'); navStuck=true; if (navTitle) navTitle.textContent='About Me'; highlight('#about'); }
        } else {
          if (navStuck){ document.documentElement.classList.remove('nav-stuck'); navStuck=false; }
          const introRect = intro.getBoundingClientRect();
          if (introRect.top <= 0 && introRect.bottom >= 0){ if (navTitle) navTitle.textContent='Home'; highlight('#intro'); }
        }
      }

      function onScroll(){ if (!ticking){ ticking=true; requestAnimationFrame(update); } }
      function onResize(){ measure(); update(); }

      function highlight(id){ $$('.nav-links a', mainNav).forEach(a=> a.toggleAttribute('aria-current', a.getAttribute('href')===id)); }

      requestAnimationFrame(()=>{ measure(); update(); });
      window.addEventListener('scroll', onScroll, {passive:true});
      window.addEventListener('resize', onResize);
    }

    // -------------------- Mobile Drawer --------------------
    const drawer=$('#drawer'); const menuBtn=$('#menuBtn');
    menuBtn?.addEventListener('click', ()=>{ const open=!drawer.classList.contains('open'); drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); menuBtn.setAttribute('aria-expanded', String(open)); });
    drawer?.addEventListener('click', e=>{ if (e.target.matches('[data-scroll], a[href^="/"]')){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); menuBtn?.setAttribute('aria-expanded','false'); } });

    // -------------------- Refractive Hover (hero quick-nav) --------------------
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

    // -------------------- Intro Particles (denser + livelier) --------------------
    const cvs=$('#introField');
    if (cvs){
      const ctx=cvs.getContext('2d');
      let W=0,H=0,DPR=1, pts=[], t=0;

      function resize(){
        W=cvs.clientWidth; H=cvs.clientHeight; DPR=Math.min(2, window.devicePixelRatio||1);
        cvs.width=Math.floor(W*DPR); cvs.height=Math.floor(H*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);

        // Slightly denser than before, but still subtle
        const count = clamp(Math.round((W*H)/15000), 90, 220);
        pts = Array.from({length:count}, ()=>({
          x: Math.random()*W,
          y: Math.random()*H,
          vx: (Math.random()*2-1)*0.18,      // a touch more motion
          vy: (Math.random()*2-1)*0.18,
          s: 1 + Math.random()*1.2,
          a: 0.35 + Math.random()*0.45,
          phase: Math.random()*Math.PI*2,     // per-point phase for flow
          fx: 0.15 + Math.random()*0.25,      // flow frequency x
          fy: 0.15 + Math.random()*0.25       // flow frequency y
        }));
      }

      function tick(){
        t += 0.016; // ~60fps seconds
        // Fill with current --taupe so theme changes propagate
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--taupe').trim() || '#e4ddcc';
        ctx.fillRect(0,0,W,H);

        // Soft vignette
        const g=ctx.createRadialGradient(W*0.5,H*0.5,0, W*0.5,H*0.5, Math.max(W,H)*0.7);
        g.addColorStop(0,'rgba(255,255,255,0.02)'); g.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

        // Draw particles with gentle flow + bounce
        ctx.fillStyle='#2b2f33';
        for(const p of pts){
          // Add a tiny sinusoidal flow so motion feels organic, not just linear
          const flowX = Math.sin(t*p.fx + p.phase) * 0.35;
          const flowY = Math.cos(t*p.fy + p.phase*1.3) * 0.35;
          p.x += p.vx + flowX;
          p.y += p.vy + flowY;
          if(p.x<0){p.x=0; p.vx*=-1;} else if(p.x>W){p.x=W; p.vx*=-1;}
          if(p.y<0){p.y=0; p.vy*=-1;} else if(p.y>H){p.y=H; p.vy*=-1;}
          ctx.globalAlpha=p.a;
          ctx.fillRect(p.x, p.y, p.s, p.s);
        }
        ctx.globalAlpha=1;
        requestAnimationFrame(tick);
      }

      window.addEventListener('resize', resize);
      requestAnimationFrame(()=>{ resize(); tick(); });
    }
  }
})();
