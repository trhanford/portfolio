/* =====================
   styles/home.v4.css
   Changes:
   • Bigger + colored typewriter line with extra side padding
   • Hero gets more side padding so text isn’t on the edge
   • (keeps v3 dropdown CTA styles)
   ===================== */
:root{
  --paper:#ffffff;
  --slate:#2b2f33;          /* base text */
  --slate-strong:#1f2327;   /* deeper slate for emphasis */
  --taupe:#e9e3d5;          /* light sand background */
  --muted:#6f7680;
  --line:rgba(15,17,19,.12);
  --focus:#0a6cff;
  --radius:14px; --radius-lg:18px;
  --shadow-1:0 10px 28px rgba(0,0,0,.08);
  --shadow-2:0 16px 44px rgba(0,0,0,.14);
  --nav-h:76px; --maxw:1200px;
}

/* —— Base / shared (same as v3 where not overridden) —— */
*{box-sizing:border-box} html,body{height:100%}
body{margin:0;background:var(--taupe);color:var(--slate);font-family:'Inter',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block} a{text-decoration:none;color:inherit}

/* Navbar */
.navbar{position:sticky;top:0;z-index:50;backdrop-filter:saturate(1.1) blur(8px)}
.navbar::before{content:"";position:absolute;inset:0;background:rgba(255,255,255,.86)}
.nav-inner{position:relative;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:var(--nav-h);border-bottom:1px solid var(--line)}
.nav-title{justify-self:start;font-weight:800;letter-spacing:.08em;text-transform:uppercase;padding-left:12px}
.nav-links{position:relative;z-index:1;list-style:none;display:flex;gap:18px;margin:0;padding:0}
.nav-links a{padding:10px 12px;border-radius:999px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:.9rem}
.nav-links a[aria-current="page"]{background:var(--paper);box-shadow:var(--shadow-1)}
.menu-btn{justify-self:end;background:transparent;border:0;font-size:1.6rem;padding:8px;display:none}
@media (max-width:920px){.nav-inner{grid-template-columns:auto 1fr auto}.nav-links{display:none}.menu-btn{display:block}}
.drawer{position:fixed;inset:var(--nav-h) 0 auto 0;background:#fff;display:none;border-top:1px solid var(--line);box-shadow:0 10px 24px rgba(0,0,0,.08)}
.drawer.open{display:block}
.drawer ul{list-style:none;margin:0;padding:12px}
.drawer li{border-bottom:1px solid var(--line)}
.drawer a{display:block;padding:14px 8px;font-weight:800;letter-spacing:.06em;text-transform:uppercase}

/* —— Hero —— */
.main{min-height:100dvh}
.hero{position:relative;padding:calc(var(--nav-h) + 40px) 0 80px}
/* Add inner side padding so content isn’t right on the viewport edge */
.hero-inner{display:grid;grid-template-columns:1.1fr .9fr;gap:28px;align-items:center;padding-inline:24px}
@media (max-width:520px){.hero-inner{padding-inline:28px}}

.eyebrow{letter-spacing:.26em;text-transform:uppercase;font-weight:800;font-size:.86rem;color:#495059}
.hero-title{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:clamp(2.4rem,5.8vw,4.4rem)}

/* Typewriter line: bigger + distinct color + breathing room */
.typed-wrap{margin-top:12px;font-weight:800;font-size:clamp(1.2rem,3.2vw,1.7rem)}
.typed{display:inline-block;min-width:14ch;border-right:2px solid rgba(31,35,39,.95);padding-right:8px;white-space:nowrap;color:var(--slate-strong)}

/* Portrait card */
.portrait{margin:0;border-radius:var(--radius-lg);overflow:hidden;background:var(--paper);box-shadow:var(--shadow-1);border:1px solid var(--line)}
.portrait img{width:100%;height:auto}

/* —— CTA cluster (keeps v3 look) —— */
.hero-cta{display:flex;flex-direction:column;align-items:center;margin-top:28px}
.cta-learn{position:relative;isolation:isolate;padding:16px 26px;border-radius:999px;border:1px solid rgba(43,47,51,.18);background:var(--paper);color:var(--slate);font-weight:800;letter-spacing:.04em;box-shadow:var(--shadow-1);cursor:pointer;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease,background .18s ease,color .18s ease,border-color .18s ease}
.cta-learn:hover{transform:translateY(-1px);box-shadow:var(--shadow-2);filter:brightness(1.02)}
.cta-learn::before,.cta-learn::after{content:"";position:absolute;inset:0;border-radius:12px;pointer-events:none;border:2px solid rgba(43,47,51,.18);opacity:0;transform:scale(.9)}
.cta-learn:hover::before{animation:burst 900ms ease-out forwards}
.cta-learn:hover::after{animation:burst 1200ms 90ms ease-out forwards}
@keyframes burst{0%{opacity:0;transform:scale(.9)}35%{opacity:.65}100%{opacity:0;transform:scale(1.25)}}
#ctaLearn[aria-expanded="true"]{background:#3a3f44;color:#fff;border-color:rgba(0,0,0,.22);padding:18px 30px}

.learn-menu{display:none;gap:10px;justify-content:center;margin-top:12px;transform-origin:top center}
#ctaLearn[aria-expanded="true"] + #learnMenu{display:flex;animation:dropdown .28s cubic-bezier(.2,.7,.2,1) both}
@keyframes dropdown{from{opacity:0;transform:translateY(-8px) scaleY(.92)}to{opacity:1;transform:translateY(0) scaleY(1)}}
.learn-link{position:relative;padding:12px 16px;border:1px solid rgba(43,47,51,.18);border-radius:999px;background:var(--paper);box-shadow:var(--shadow-1);font-weight:700;letter-spacing:.02em;transition:transform .18s ease,box-shadow .18s ease,filter .18s ease}
.learn-link:hover{transform:translateY(-1px);box-shadow:var(--shadow-2);filter:brightness(1.02)}
.learn-link::before,.learn-link::after{content:"";position:absolute;inset:0;border-radius:12px;pointer-events:none;border:2px solid rgba(43,47,51,.18);opacity:0;transform:scale(.9)}
.learn-link:hover::before{animation:burst 800ms ease-out forwards}
.learn-link:hover::after{animation:burst 1100ms 80ms ease-out forwards}

/* —— Magnetic Field Background —— */
.hero-bg{position:absolute;inset:0;overflow:hidden;z-index:-1}
.magnetic-field{position:absolute;inset:0;width:100%;height:100%;display:block}

/* Footer */
.footer{background:var(--paper);border-top:1px solid var(--line);margin-top:48px}
.footer-inner{max-width:var(--maxw);margin:0 auto;padding:18px 24px;display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:space-between;color:#737a82}

/* Responsive tweaks */
@media (max-width:980px){.hero-inner{grid-template-columns:1fr}.portrait{max-width:520px;margin:10px auto 0}.learn-menu{flex-wrap:wrap}}
:focus-visible{outline:3px solid var(--focus);outline-offset:2px}
@media (prefers-reduced-motion:reduce){*{transition:none !important;animation:none !important}}


/* =====================
   scripts/home.v4.js
   Changes:
   • Radial magnetism: particles attract/repel to the **center point** based on mouse distance from center
   • Captures mouse X + Y; attract near center, repel toward edges
   (Keeps typewriter/CTA/menu/drawer behaviors)
   ===================== */

(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();

  function init(){
    // ----- Navbar title + drawer -----
    const navTitle=$('#navTitle'), menuBtn=$('#menuBtn'), drawer=$('#drawer');
    function routeName(){ const p=(location.hash.replace('#/','')||'home').toLowerCase(); return ({home:'Home',about:'About Me',portfolio:'Portfolio',resume:'Digital Résumé'})[p]||'Home'; }
    function setActive(){ const name=routeName(); if(navTitle) navTitle.textContent=name; const path=(location.hash.replace('#/','')||'home').toLowerCase(); $$('.nav-links a').forEach(a=>a.toggleAttribute('aria-current', a.getAttribute('href')===`#/${path}`)); }
    window.addEventListener('hashchange', setActive); setActive();

    menuBtn?.addEventListener('click', ()=>{ const open=!drawer.classList.contains('open'); drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); menuBtn.setAttribute('aria-expanded', String(open)); });
    drawer?.addEventListener('click', e=>{ if(e.target.matches('[data-route]')){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); menuBtn?.setAttribute('aria-expanded','false'); } });

    // ----- Typewriter -----
    const typedEl=$('#typed');
    const words=['Mechanical Engineer','Car enthusiast','Pet lover'];
    const TYPE=70, ERASE=45, HOLD=1100; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    async function typeWord(w){ for(let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(TYPE);} await sleep(HOLD); for(let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(ERASE);} }
    (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w);} } })();

    // ----- CTA expand menu -----
    const cta=$('#ctaLearn'); const menu=$('#learnMenu');
    if(menu && !menu.hasAttribute('hidden')) menu.setAttribute('hidden','');
    if(cta && menu){
      const openMenu=()=>{ cta.setAttribute('aria-expanded','true'); menu.removeAttribute('hidden'); };
      const closeMenu=()=>{ cta.setAttribute('aria-expanded','false'); menu.setAttribute('hidden',''); };
      const toggle=()=> cta.getAttribute('aria-expanded')==='true' ? closeMenu() : openMenu();
      cta.addEventListener('click', toggle);
      cta.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); }});
      document.addEventListener('click', e=>{ if(!menu.contains(e.target) && e.target!==cta){ closeMenu(); } });
    }

    // ----- Radial Magnetic Field (center point) -----
    const cvs=$('#magneticField');
    if(cvs){
      const ctx=cvs.getContext('2d');
      let W=0,H=0,DPR=Math.min(2,window.devicePixelRatio||1);
      let particles=[], mouseX=0.5, mouseY=0.5, time=0;

      function resize(){ W=cvs.clientWidth; H=cvs.clientHeight; DPR=Math.min(2,window.devicePixelRatio||1); cvs.width=Math.floor(W*DPR); cvs.height=Math.floor(H*DPR); ctx.setTransform(DPR,0,0,DPR,0,0); build(); }
      function build(){ const density=Math.max(60,Math.min(260,Math.round((W*H)/12000))); particles=new Array(density).fill(0).map(()=>spawn()); }
      function spawn(){ const speed=0.25+Math.random()*0.6; return { x:Math.random()*W, y:Math.random()*H, vx:(Math.random()*2-1)*speed, vy:(Math.random()*2-1)*speed, s:1+Math.random()*2, a:0.45+Math.random()*0.4, n:Math.random()*1000 }; }

      function physics(p){
        const cx=W*0.5, cy=H*0.5;
        const dx=cx - p.x, dy=cy - p.y; // vector toward center
        const dist=Math.hypot(dx, dy) + 0.0001;

        // Mouse distance from center in 0..1 (0=center, 1=edges)
        const mx=(mouseX-0.5)/0.5, my=(mouseY-0.5)/0.5; // -1..1
        const radial=Math.min(1, Math.hypot(mx, my));
        const attract = radial < 0.35; // near center => attract, further => repel

        // Force magnitude tapers with distance (softened)
        const k = attract ? 0.18 : -0.14; // attraction stronger than repulsion for a pleasing collapse
        const f = k / Math.max(40, dist); // avoid blow-up at small r

        // Add gentle swirl noise so it feels organic
        const swirl = Math.sin((time*0.002) + p.n) * 0.15;

        // Apply forces
        p.vx += f * dx + swirl * 0.12;
        p.vy += f * dy + swirl * 0.18;

        // Clamp and integrate
        p.vx = clamp(p.vx, -1.6, 1.6);
        p.vy = clamp(p.vy, -1.6, 1.6);
        p.x += p.vx; p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = W+10; else if (p.x > W+10) p.x = -10;
        if (p.y < -10) p.y = H+10; else if (p.y > H+10) p.y = -10;
      }

      function draw(){
        // Soft taupe trail
        ctx.fillStyle = 'rgba(233,227,213,0.25)';
        ctx.fillRect(0,0,W,H);
        // Subtle center dot hint
        ctx.beginPath(); ctx.arc(W*0.5, H*0.5, 2.2, 0, Math.PI*2); ctx.fillStyle='rgba(43,47,51,0.12)'; ctx.fill();
        // Particles as tiny squares
        for (const p of particles){ ctx.globalAlpha=p.a; ctx.fillStyle='#2b2f33'; ctx.fillRect(p.x, p.y, p.s, p.s); }
        ctx.globalAlpha=1;
      }

      function tick(){ time += 16; for(const p of particles) physics(p); draw(); requestAnimationFrame(tick); }

      function onPointer(e){ const rect=cvs.getBoundingClientRect(); mouseX = (e.clientX - rect.left) / rect.width; mouseY = (e.clientY - rect.top) / rect.height; }
      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointer, {passive:true});
      window.addEventListener('touchmove', e=>{ if(e.touches[0]) onPointer(e.touches[0]); }, {passive:true});

      resize(); tick();
    }
  }
})();
