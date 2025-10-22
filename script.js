// scripts/home.js — Home page interactivity
// Features: current-page title, mobile drawer, typewriter, CTA expand, magnetic field canvas

(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  // Run after DOM ready (works with or without `defer`)
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  function init(){
    // ----- Navbar: current page title & mobile drawer -----
    const navTitle = $('#navTitle');
    const menuBtn = $('#menuBtn');
    const drawer  = $('#drawer');

    function routeName(){
      const path = (location.hash.replace('#/','') || 'home').toLowerCase();
      const map = {home:'Home', about:'About Me', portfolio:'Portfolio', resume:'Digital Résumé'};
      return map[path] || 'Home';
    }
    function setActive(){
      const name = routeName();
      if (navTitle) navTitle.textContent = name;
      const path = (location.hash.replace('#/','') || 'home').toLowerCase();
      $$('.nav-links a').forEach(a=>{
        const here = a.getAttribute('href') === `#/${path}`;
        a.toggleAttribute('aria-current', here);
      });
    }
    window.addEventListener('hashchange', setActive);
    setActive();

    menuBtn?.addEventListener('click', ()=>{
      const open = !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    drawer?.addEventListener('click', e=>{
      if (e.target.matches('[data-route]')){
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
        menuBtn?.setAttribute('aria-expanded','false');
      }
    });

    // ----- Typewriter -----
    const typedEl = $('#typed');
    const words = ['Mechanical Engineer','Car enthusiast','Pet lover'];
    const TYPE=70, ERASE=45, HOLD=1100;
    async function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
    async function typeWord(w){
      for(let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(TYPE);} 
      await sleep(HOLD);
      for(let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(ERASE);} 
    }
    (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w);} } })();

    // ----- CTA expand menu -----
    const cta = $('#ctaLearn');
    const menu = $('#learnMenu');
    if (cta && menu){
      const toggle = ()=>{
        const expanded = cta.getAttribute('aria-expanded') === 'true';
        cta.setAttribute('aria-expanded', String(!expanded));
        if (expanded){ menu.setAttribute('hidden',''); }
        else { menu.removeAttribute('hidden'); }
      };
      cta.addEventListener('click', toggle);
      cta.addEventListener('keydown', e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); toggle(); }});
    }

    // ----- Magnetic field canvas -----
    const cvs = $('#magneticField');
    if (cvs){
      const ctx = cvs.getContext('2d');
      let W=0,H=0, DPR=Math.min(2, window.devicePixelRatio||1);
      let particles=[]; let mouseX = 0.5; let time=0; let rafId=0;

      function resize(){
        W = cvs.clientWidth; H = cvs.clientHeight; DPR = Math.min(2, window.devicePixelRatio||1);
        cvs.width = Math.floor(W*DPR); cvs.height = Math.floor(H*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);
        build();
      }

      function build(){
        const density = clamp(Math.round((W*H)/14000), 60, 220); // responsive particle count
        particles = new Array(density).fill(0).map(()=>spawn());
      }

      function spawn(){
        const speed = 0.25 + Math.random()*0.6; // px/frame
        return {
          x: Math.random()*W,
          y: Math.random()*H,
          vx: (Math.random()*2-1)*speed,
          vy: (Math.random()*2-1)*speed,
          s: 1 + Math.random()*2,                  // size
          a: 0.45 + Math.random()*0.4,             // alpha
          n: Math.random()*1000                    // noise seed
        };
      }

      function physics(p){
        // Center vertical line
        const cx = W*0.5;
        // Mouse determines attract vs repel: near center -> attract, edges -> repel
        const m = clamp(mouseX, 0, 1);
        const centerBias = Math.abs(m - 0.5); // 0 near center, -> 0.5 at edges
        const attract = centerBias < 0.15;    // threshold zone for attraction
        const dx = p.x - cx;
        const dist = Math.hypot(dx, 60);      // softened
        const k = attract ? 0.12 : -0.12;     // sign flips
        const force = k * (dx / dist);        // horizontal force along x

        // Gentle vertical drift with time-varying swirl
        const swirl = Math.sin((time*0.002) + p.n) * 0.15;

        p.vx += (-force) + swirl*0.1; // push towards/away from center line
        p.vx = clamp(p.vx, -1.5, 1.5);
        p.vy += swirl*0.25;
        p.vy = clamp(p.vy, -1.2, 1.2);

        p.x += p.vx; p.y += p.vy;

        // Wrap around edges for an infinite field feel
        if (p.x < -10) p.x = W+10; else if (p.x > W+10) p.x = -10;
        if (p.y < -10) p.y = H+10; else if (p.y > H+10) p.y = -10;
      }

      function draw(){
        // Soft taupe paper fade
        ctx.fillStyle = 'rgba(233,227,213,0.25)';
        ctx.fillRect(0,0,W,H);

        // Subtle centerline hint
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(43,47,51,0.06)';
        ctx.moveTo(W*0.5,0); ctx.lineTo(W*0.5,H); ctx.stroke();

        // Particles (tiny squares)
        for (const p of particles){
          ctx.globalAlpha = p.a;
          ctx.fillStyle = '#2b2f33'; // slate
          ctx.fillRect(p.x, p.y, p.s, p.s);
          ctx.globalAlpha = 1;
        }
      }

      function tick(){
        time += 16;
        for (const p of particles) physics(p);
        draw();
        rafId = requestAnimationFrame(tick);
      }

      function onPointer(e){
        const rect = cvs.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width; // 0..1
        mouseX = x;
      }

      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointer, {passive:true});
      window.addEventListener('touchmove', (e)=>{ if(e.touches[0]) onPointer(e.touches[0]); }, {passive:true});

      resize(); tick();
    }
  }
})();
