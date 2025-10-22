// scripts/site.js — Home + About interactions
// • Typewriter on hero
// • Smooth-scroll for in-page links
// • Sticky nav reveals once About is entered
// • Mobile drawer
// • Refractive hover on hero quick-nav (SVG filter w/ graceful fallback)
// • Subtle intro background particles (calming, low motion)

(function(){
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  function init(){
    // Footer year
    const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

    // ==================== TYPEWRITER ====================
    const typedEl = $('#typed');
    const words = ['Mechanical Engineer','Car enthusiast','Pet lover'];
    const TYPE=70, ERASE=45, HOLD=1100;
    const sleep = ms => new Promise(r=>setTimeout(r,ms));
    async function typeWord(w){
      for(let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(TYPE);} 
      await sleep(HOLD);
      for(let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(ERASE);} 
    }
    (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w);} } })();

    // ==================== SMOOTH SCROLL ====================
    document.addEventListener('click', (e)=>{
      const a = e.target.closest('[data-scroll]');
      if (!a) return;
      const href = a.getAttribute('href')||'';
      if (!href.startsWith('#')) return; // leave external alone
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - navOffset();
      window.scrollTo({ top, behavior: 'smooth' });
    });
    function navOffset(){
      // Add sticky nav height when visible
      const nav = $('#mainNav');
      if (nav && !nav.hasAttribute('hidden')) return nav.offsetHeight;
      return 0;
    }

    // ==================== STICKY NAV REVEAL ====================
    const mainNav = $('#mainNav');
    const navTitle = $('#navTitle');
    const aboutSection = $('#about');
    if (mainNav && aboutSection){
      const io = new IntersectionObserver((entries)=>{
        for (const entry of entries){
          if (entry.isIntersecting){
            // Fully in About → show and stick nav
            mainNav.removeAttribute('hidden');
            if (navTitle) navTitle.textContent = 'About Me';
          }
        }
      }, { root: null, threshold: 0.2 }); // 20% of About visible
      io.observe(aboutSection);
    }

    // Keep nav highlight in sync when scrolling within page
    const sections = [ ['#intro','Home'], ['#about','About Me'] ];
    const so = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting){
          const id = '#'+entry.target.id;
          const label = sections.find(s=>s[0]===id)?.[1]||'Home';
          if (navTitle) navTitle.textContent = label;
          $$('.nav-links a', mainNav).forEach(a=>{
            a.toggleAttribute('aria-current', a.getAttribute('href')===id);
          });
        }
      });
    }, { threshold: 0.55 });
    sections.forEach(([sel])=>{ const el=$(sel); if(el) so.observe(el); });

    // ==================== MOBILE DRAWER ====================
    const drawer = $('#drawer');
    const menuBtn = $('#menuBtn');
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

    // ==================== REFRACTIVE HOVER (hero panel) ====================
    // Uses the <filter id="refract"> in the page; we animate its turbulence + scale for a glassy ripple.
    const panel = $('#panelLinks');
    const filterNode = document.querySelector('#refract');
    if (panel && filterNode){
      document.body.classList.add('refract-armed');
      const turb = filterNode.querySelector('feTurbulence');
      const disp = filterNode.querySelector('feDisplacementMap');
      let animId = 0; let running=false; let t0=0; let seed = 2;

      function animate(now){
        if (!running) return; if (!t0) t0 = now; const t = (now - t0)/1000;
        // Animate turbulence slightly and modulate scale for shimmer
        seed = (seed + 0.05) % 1000; // drift seed to move pattern
        turb && turb.setAttribute('seed', String(seed));
        const scale = 3.5 + Math.sin(t*3.2)*1.5; // 2.0 .. 5.0
        disp && disp.setAttribute('scale', String(scale.toFixed(2)));
        animId = requestAnimationFrame(animate);
      }

      panel.addEventListener('pointerenter', ()=>{ running=true; t0=0; cancelAnimationFrame(animId); animId=requestAnimationFrame(animate); });
      panel.addEventListener('pointerleave', ()=>{ running=false; cancelAnimationFrame(animId); disp && disp.setAttribute('scale','0'); });
    }

    // Fallback: if SVG filter not supported, lightly scale links on hover via CSS already

    // ==================== INTRO BACKGROUND PARTICLES ====================
    // Calm, subtle points drifting softly (no heavy interactions)
    const cvs = $('#introField');
    if (cvs){
      const ctx = cvs.getContext('2d');
      let W=0,H=0, DPR=1, points=[], time=0;
      function resize(){
        W = cvs.clientWidth; H = cvs.clientHeight; DPR = Math.min(2, window.devicePixelRatio||1);
        cvs.width = Math.floor(W*DPR); cvs.height = Math.floor(H*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);
        const count = clamp(Math.round((W*H)/24000), 40, 140);
        points = Array.from({length:count}, ()=>({
          x: Math.random()*W, y: Math.random()*H,
          vx: (Math.random()*2-1)*0.12, vy:(Math.random()*2-1)*0.12,
          s: 1 + Math.random()*1.2, a: 0.35 + Math.random()*0.4
        }));
      }
      function tick(){
        time += 16;
        ctx.fillStyle = '#e9e3d5'; // taupe background
        ctx.fillRect(0,0,W,H);
        // Very faint center vignette
        const g = ctx.createRadialGradient(W*0.5,H*0.5,0, W*0.5,H*0.5, Math.max(W,H)*0.7);
        g.addColorStop(0,'rgba(255,255,255,0.02)'); g.addColorStop(1,'rgba(255,255,255,0)');
        ctx.fillStyle=g; ctx.fillRect(0,0,W,H);

        ctx.fillStyle = '#2b2f33';
        for(const p of points){
          p.x += p.vx; p.y += p.vy;
          // gentle boundary bounce
          if (p.x<0||p.x>W) p.vx*=-1; if (p.y<0||p.y>H) p.vy*=-1;
          ctx.globalAlpha = p.a; ctx.fillRect(p.x, p.y, p.s, p.s);
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(tick);
      }
      window.addEventListener('resize', resize);
      resize(); tick();
    }
  }
})();
