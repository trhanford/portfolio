// scripts/site.v2.js — Interactions update
// Updates from your list:
// 1) Typewriter unchanged
// 2) Smooth-scroll unchanged
// 3) Sticky nav refined: acts like divider; appears when About enters, sticks only while About is engaged; hides again when back to hero
// 4) Mobile drawer unchanged
// 5) Refractive hover unchanged
// 6) Background particles: slight density increase

(function(){
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  function init(){
    // Footer year
    const y=$('#year'); if (y) y.textContent = new Date().getFullYear();

    // ==================== TYPEWRITER ====================
    const typedEl=$('#typed');
    const words=['Mechanical Engineer','Car enthusiast','Pet lover'];
    const TYPE=70, ERASE=45, HOLD=1100;
    const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    async function typeWord(w){ for(let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(TYPE);} await sleep(HOLD); for(let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(ERASE);} }
    (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w);} } })();

    // ==================== SMOOTH SCROLL ====================
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

    // ==================== STICKY NAV: divider then stick ====================
    const mainNav = $('#mainNav');
    const navTitle = $('#navTitle');
    const intro = $('#intro');
    const about = $('#about');

    if (mainNav && intro && about){
      // Reveal nav when About header reaches viewport top (as divider)
      const dividerObs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          // If About is entering the viewport from below, show nav.
          if (entry.isIntersecting){
            mainNav.removeAttribute('hidden');
          } else {
            // If About header leaves upwards (we're back in hero), hide nav.
            // Check if the top of About is below the top of viewport
            const rect = about.getBoundingClientRect();
            if (rect.top > 0) mainNav.setAttribute('hidden','');
          }
        });
      }, { root:null, threshold:0, rootMargin:`-${stickyBuffer()}px 0px 0px 0px` });
      dividerObs.observe(about);

      // Stickiness: we add/remove a class depending on whether About is fully engaged in view
      const stickObs = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          if (entry.isIntersecting){
            document.documentElement.classList.add('nav-stuck');
            if (navTitle) navTitle.textContent = 'About Me';
            highlight('#about');
          } else {
            document.documentElement.classList.remove('nav-stuck');
            // If we're scrolling back to hero, update title
            const introRect = intro.getBoundingClientRect();
            if (introRect.top <= 0 && introRect.bottom >= 0) { if (navTitle) navTitle.textContent = 'Home'; highlight('#intro'); }
          }
        });
      }, { root:null, threshold:0.8 });
      stickObs.observe(about);

      function highlight(id){
        $$('.nav-links a', mainNav).forEach(a=> a.toggleAttribute('aria-current', a.getAttribute('href')===id));
      }
    }

    // ==================== MOBILE DRAWER ====================
    const drawer=$('#drawer'); const menuBtn=$('#menuBtn');
    menuBtn?.addEventListener('click', ()=>{ const open=!drawer.classList.contains('open'); drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); menuBtn.setAttribute('aria-expanded', String(open)); });
    drawer?.addEventListener('click', e=>{ if (e.target.matches('[data-scroll], a[href^="/"]')){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); menuBtn?.setAttribute('aria-expanded','false'); } });

    // ==================== REFRACTIVE HOVER ====================
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

    // ==================== INTRO PARTICLES (slightly denser) ====================
    const cvs=$('#introField');
    if (cvs){
      const ctx=cvs.getContext('2d');
      let W=0,H=0,DPR=1, pts=[], time=0;
      function resize(){
        W=cvs.clientWidth; H=cvs.clientHeight; DPR=Math.min(2, window.devicePixelRatio||1);
        cvs.width=Math.floor(W*DPR); cvs.height=Math.floor(H*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);
        const count = clamp(Math.round((W*H)/20000), 60, 160); // denser than v1
        pts = Array.from({length:count}, ()=>({
          x: Math.random()*W, y: Math.random()*H,
          vx:(Math.random()*2-1)*0.1, vy:(Math.random()*2-1)*0.1,
          s: 1 + Math.random()*1.1, a: 0.35 + Math.random()*0.4
        }));
      }
      function tick(){
        time+=16;
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--taupe').trim() || '#e4ddcc';
        ctx.fillRect(0,0,W,H);
        // faint vignette
        const g=ctx.createRadialGradient(W*0.5,H*0.5,0, W*0.5,H*0.5, Math.max(W,H)*0.7);
        g.addColorStop(0,'rgba(255,255,255,0.02)'); g.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

        ctx.fillStyle='#2b2f33';
        for(const p of pts){ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1; ctx.globalAlpha=p.a; ctx.fillRect(p.x,p.y,p.s,p.s); }
        ctx.globalAlpha=1;
        requestAnimationFrame(tick);
      }
      window.addEventListener('resize', resize);
      resize(); tick();
    }
  }

  function stickyBuffer(){
    // Buffer equals nav height; keeps divider feel before sticking
    const nav=$('#mainNav'); return nav ? nav.offsetHeight : 72;
  }
})();
