// scripts/home.v5.js — "constellation car" background + UI
// Changes vs v4:
// • Particles are mostly static (tiny jitter) and pre-arranged to outline a car silhouette + sparse background points
// • When the pointer is within a radius of car points, we connect nearby points with thin fading lines
// • Lines fade after a lifespan, so you can "draw" the wireframe by moving quickly
// • Photo sizing handled via CSS tweaks (see chat)

(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
  const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();

  function init(){
    // ----- Navbar: title + drawer -----
    const navTitle=$('#navTitle'), menuBtn=$('#menuBtn'), drawer=$('#drawer');
    function routeName(){ const p=(location.hash.replace('#/','')||'home').toLowerCase(); return ({home:'Home',about:'About Me',portfolio:'Portfolio',resume:'Digital Résumé'})[p]||'Home'; }
    function setActive(){ const name=routeName(); if(navTitle) navTitle.textContent=name; const path=(location.hash.replace('#/','')||'home').toLowerCase(); $$('.nav-links a').forEach(a=>a.toggleAttribute('aria-current', a.getAttribute('href')===`#/${path}`)); }
    window.addEventListener('hashchange', setActive); setActive();
    menuBtn?.addEventListener('click', ()=>{ const open=!drawer.classList.contains('open'); drawer.classList.toggle('open', open); drawer.setAttribute('aria-hidden', String(!open)); menuBtn.setAttribute('aria-expanded', String(open)); });
    drawer?.addEventListener('click', e=>{ if(e.target.matches('[data-route]')){ drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true'); menuBtn?.setAttribute('aria-expanded','false'); } });

    // ----- Typewriter (unchanged behavior; style handled in CSS) -----
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

    // ----- Constellation Car Background -----
    const cvs=$('#magneticField'); if(!cvs) return;
    const ctx=cvs.getContext('2d');

    let W=0,H=0,DPR=1, time=0;
    /** @type {{x:number,y:number,ox:number,oy:number,j:number}[]} */
    let carPts=[]; // outline points
    /** @type {{x:number,y:number,ox:number,oy:number,j:number}[]} */
    let bgPts=[];  // random background points

    /** @type {{x1:number,y1:number,x2:number,y2:number,t:number}[]} */
    let lines=[];  // fading line segments

    const MOUSE_RADIUS = 120;   // px influence radius to seek connections
    const LINK_DIST    = 28;    // px max distance to connect two points
    const FADE_MS      = 1800;  // lifespan of a line
    const MAX_LINES    = 4000;  // memory cap

    let mouse = {x:0.5, y:0.5}; // normalized 0..1

    function resize(){
      W = cvs.clientWidth; H = cvs.clientHeight; DPR = Math.min(2, window.devicePixelRatio||1);
      cvs.width  = Math.floor(W*DPR); cvs.height = Math.floor(H*DPR);
      ctx.setTransform(DPR,0,0,DPR,0,0);
      buildScene();
    }

    function buildScene(){
      // Build a stylized car silhouette roughly centered
      const cx=W*0.5, cy=H*0.5;
      const cw=Math.min(W,H)*0.62;       // car width
      const ch=cw*0.36;                  // car height
      const wheelR = ch*0.35;            // arch radius
      const frontWheelX = cx - cw*0.23;
      const rearWheelX  = cx + cw*0.24;
      const baseY = cy + ch*0.18;
      const roofY = cy - ch*0.42;

      const outline = [];
      // Upper outline (front bumper -> hood -> windshield -> roof -> rear window -> trunk -> rear bumper)
      outline.push([cx - cw*0.46, baseY - ch*0.22]);                 // front bumper top
      outline.push([cx - cw*0.40, baseY - ch*0.26]);                 // hood start
      outline.push([cx - cw*0.22, baseY - ch*0.32]);                 // hood mid
      outline.push([cx - cw*0.10, baseY - ch*0.36]);                 // hood end
      outline.push([cx - cw*0.02, baseY - ch*0.42]);                 // windshield base
      outline.push([cx - cw*0.00, roofY]);                           // roof front
      outline.push([cx + cw*0.18, roofY]);                           // roof mid
      outline.push([cx + cw*0.26, roofY + ch*0.06]);                 // C-pillar
      outline.push([cx + cw*0.34, baseY - ch*0.28]);                 // trunk top
      outline.push([cx + cw*0.43, baseY - ch*0.24]);                 // rear deck
      outline.push([cx + cw*0.47, baseY - ch*0.20]);                 // rear bumper top

      // Lower outline (rear bumper -> rocker -> front bumper), plus wheel arches as arcs
      const lower = [];
      lower.push([cx + cw*0.47, baseY - ch*0.10]);                   // rear bumper lower
      // Rear wheel arch (top half arc)
      const rearArchC=[rearWheelX, baseY];
      for(let a=Math.PI*0.05; a<Math.PI-0.05; a+=Math.PI/14){
        lower.push([rearArchC[0] + Math.cos(a)*wheelR, rearArchC[1] + Math.sin(a)*wheelR]);
      }
      lower.push([cx + cw*0.10, baseY + ch*0.03]);                   // rocker mid
      // Front wheel arch (top half arc)
      const frontArchC=[frontWheelX, baseY];
      for(let a=Math.PI*0.05; a<Math.PI-0.05; a+=Math.PI/14){
        lower.push([frontArchC[0] + Math.cos(a)*wheelR, frontArchC[1] + Math.sin(a)*wheelR]);
      }
      lower.push([cx - cw*0.46, baseY - ch*0.12]);                   // front bumper lower

      // Sample polyline into evenly-spaced points
      const carStep = Math.max(4, Math.round(cw/180));
      const carOutlinePts = samplePolyline(outline, carStep).concat(samplePolyline(lower, carStep));

      // Add a few interior details (windows line)
      const windowLine = samplePolyline([
        [cx - cw*0.05, baseY - ch*0.40], [cx + cw*0.18, baseY - ch*0.40]
      ], carStep);

      // Combine and jitter slightly so points look organic
      carPts = carOutlinePts.concat(windowLine).map(([x,y])=>({
        x, y, ox:x, oy:y, j: Math.random()*2 // jitter amplitude
      }));

      // Background points
      const bgCount = Math.max(80, Math.round((W*H)/38000));
      bgPts = Array.from({length:bgCount}, ()=>{
        const x = Math.random()*W, y=Math.random()*H;
        return {x, y, ox:x, oy:y, j: Math.random()*0.6};
      });

      lines.length = 0; // clear any old lines
    }

    function samplePolyline(pts, step){
      const out=[]; if(pts.length<2) return out;
      for(let i=0;i<pts.length-1;i++){
        const [x1,y1]=pts[i], [x2,y2]=pts[i+1];
        const dx=x2-x1, dy=y2-y1; const len=Math.hypot(dx,dy);
        const n = Math.max(1, Math.round(len/step));
        for(let k=0;k<=n;k++) out.push([x1 + dx*(k/n), y1 + dy*(k/n)]);
      }
      return out;
    }

    function tick(){
      time += 16;
      draw();
      requestAnimationFrame(tick);
    }

    function draw(){
      // Clean background (no trails for dots, lines manage their own fade)
      ctx.fillStyle = '#e9e3d5'; // taupe
      ctx.fillRect(0,0,W,H);

      // Draw fading lines
      const now = performance.now();
      const next=[]; // keep survivors
      for(const L of lines){
        const age = now - L.t;
        if (age < FADE_MS){
          const a = 1 - age/FADE_MS;
          ctx.strokeStyle = `rgba(43,47,51,${0.55*a})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(L.x1, L.y1); ctx.lineTo(L.x2, L.y2); ctx.stroke();
          next.push(L);
        }
      }
      lines = next;

      // Tiny jitter to keep alive
      const jitter = (p)=>{
        const t = time*0.001 + p.j;
        const amp = p.j * 0.4; // subtle
        return {x: p.ox + Math.sin(t*1.7)*amp, y: p.oy + Math.cos(t*1.3)*amp};
      };

      // Draw background points (very small)
      ctx.fillStyle = '#2b2f33';
      for(const p of bgPts){ const jp=jitter(p); ctx.fillRect(jp.x, jp.y, 1, 1); }
      // Draw car points (a bit brighter/stronger)
      for(const p of carPts){ const jp=jitter(p); ctx.fillRect(jp.x, jp.y, 1.2, 1.2); }
    }

    function onPointer(e){
      const rect = cvs.getBoundingClientRect();
      const mx = (e.clientX - rect.left);
      const my = (e.clientY - rect.top);
      mouse.x = mx / rect.width; mouse.y = my / rect.height;

      // Build connections near mouse among nearby car points
      const R2 = MOUSE_RADIUS*MOUSE_RADIUS;
      // Collect candidate indices around mouse to reduce work
      const candidates = [];
      for(let i=0;i<carPts.length;i++){
        const p = carPts[i]; const dx = p.ox - mx; const dy = p.oy - my; if (dx*dx + dy*dy <= R2) candidates.push(i);
      }
      if (candidates.length){
        for(let i=0;i<candidates.length;i++){
          const a = carPts[candidates[i]];
          for(let j=i+1;j<candidates.length;j++){
            const b = carPts[candidates[j]];
            const dx = a.ox - b.ox, dy = a.oy - b.oy; const d2 = dx*dx + dy*dy;
            if (d2 <= LINK_DIST*LINK_DIST){
              lines.push({x1:a.ox, y1:a.oy, x2:b.ox, y2:b.oy, t: performance.now()});
            }
          }
        }
        // Cap the number of stored lines
        if (lines.length > MAX_LINES) lines.splice(0, lines.length - MAX_LINES);
      }
    }

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onPointer, {passive:true});
    window.addEventListener('touchmove', e=>{ if(e.touches[0]) onPointer(e.touches[0]); }, {passive:true});

    resize(); tick();
  }
})();
