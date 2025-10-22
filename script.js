// scripts/home.v3.js — dropdown expands from CTA, darker CTA on open, link radiance
(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();

  function init(){
    // ----- Navbar title + drawer -----
    const navTitle=$('#navTitle'), menuBtn=$('#menuBtn'), drawer=$('#drawer');
    function routeName(){
      const p=(location.hash.replace('#/','')||'home').toLowerCase();
      return ({home:'Home',about:'About Me',portfolio:'Portfolio',resume:'Digital Résumé'})[p] || 'Home';
    }
    function setActive(){
      const name=routeName(); if(navTitle) navTitle.textContent=name;
      const path=(location.hash.replace('#/','')||'home').toLowerCase();
      $$('.nav-links a').forEach(a=>{ a.toggleAttribute('aria-current', a.getAttribute('href')===`#/${path}`); });
    }
    window.addEventListener('hashchange', setActive); setActive();

    menuBtn?.addEventListener('click', ()=>{
      const open=!drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      menuBtn.setAttribute('aria-expanded', String(open));
    });
    drawer?.addEventListener('click', e=>{
      if(e.target.matches('[data-route]')){
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden','true');
        menuBtn?.setAttribute('aria-expanded','false');
      }
    });

    // ----- Typewriter -----
    const typedEl=$('#typed');
    const words=['Mechanical Engineer','Car enthusiast','Pet lover'];
    const TYPE=70, ERASE=45, HOLD=1100; const sleep=ms=>new Promise(r=>setTimeout(r,ms));
    async function typeWord(w){
      for(let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(TYPE);} 
      await sleep(HOLD);
      for(let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await sleep(ERASE);} 
    }
    (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w);} } })();

    // ----- CTA expand menu (explicit hidden on load, dropdown open/close) -----
    const cta=$('#ctaLearn'); const menu=$('#learnMenu');
    if(menu && !menu.hasAttribute('hidden')) menu.setAttribute('hidden','');
    if(cta && menu){
      const openMenu=()=>{ cta.setAttribute('aria-expanded','true'); menu.removeAttribute('hidden'); };
      const closeMenu=()=>{ cta.setAttribute('aria-expanded','false'); menu.setAttribute('hidden',''); };
      const toggle=()=> cta.getAttribute('aria-expanded')==='true' ? closeMenu() : openMenu();

      cta.addEventListener('click', toggle);
      cta.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); toggle(); }});

      // Click outside to close
      document.addEventListener('click', e=>{ if(!menu.contains(e.target) && e.target!==cta){ closeMenu(); }});
    }

    // ----- Magnetic field canvas -----
    const cvs=$('#magneticField');
    if(cvs){
      const ctx=cvs.getContext('2d');
      let W=0,H=0,DPR=Math.min(2,window.devicePixelRatio||1);
      let particles=[],mouseX=0.5,time=0;

      function resize(){
        W=cvs.clientWidth; H=cvs.clientHeight; DPR=Math.min(2,window.devicePixelRatio||1);
        cvs.width=Math.floor(W*DPR); cvs.height=Math.floor(H*DPR);
        ctx.setTransform(DPR,0,0,DPR,0,0);
        build();
      }
      function build(){
        const density=Math.max(60,Math.min(240,Math.round((W*H)/13000)));
        particles=new Array(density).fill(0).map(()=>spawn());
      }
      function spawn(){
        const speed=0.25+Math.random()*0.6;
        return { x:Math.random()*W, y:Math.random()*H, vx:(Math.random()*2-1)*speed, vy:(Math.random()*2-1)*speed, s:1+Math.random()*2, a:0.45+Math.random()*0.4, n:Math.random()*1000 };
      }
      function physics(p){
        const cx=W*0.5; const m=Math.max(0,Math.min(1,mouseX));
        const centerBias=Math.abs(m-0.5); const attract=centerBias<0.15;
        const dx=p.x-cx; const dist=Math.hypot(dx, 60); const k=attract?0.12:-0.12; const force=k*(dx/dist);
        const swirl=Math.sin((time*0.002)+p.n)*0.15;
        p.vx+=(-force)+swirl*0.1; p.vx=Math.max(-1.5,Math.min(1.5,p.vx));
        p.vy+=swirl*0.25; p.vy=Math.max(-1.2,Math.min(1.2,p.vy));
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<-10) p.x=W+10; else if(p.x>W+10) p.x=-10;
        if(p.y<-10) p.y=H+10; else if(p.y>H+10) p.y=-10;
      }
      function draw(){
        ctx.fillStyle='rgba(233,227,213,0.25)'; ctx.fillRect(0,0,W,H);
        ctx.beginPath(); ctx.strokeStyle='rgba(43,47,51,0.06)'; ctx.moveTo(W*0.5,0); ctx.lineTo(W*0.5,H); ctx.stroke();
        for(const p of particles){ ctx.globalAlpha=p.a; ctx.fillStyle='#2b2f33'; ctx.fillRect(p.x,p.y,p.s,p.s); }
        ctx.globalAlpha=1;
      }
      function tick(){ time+=16; for(const p of particles) physics(p); draw(); requestAnimationFrame(tick); }
      function onPointer(e){ const rect=cvs.getBoundingClientRect(); mouseX=(e.clientX-rect.left)/rect.width; }

      window.addEventListener('resize', resize);
      window.addEventListener('pointermove', onPointer, {passive:true});
      window.addEventListener('touchmove', e=>{ if(e.touches[0]) onPointer(e.touches[0]); }, {passive:true});
      resize(); tick();
    }
  }
})();
