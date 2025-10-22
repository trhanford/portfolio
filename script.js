(function(){
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
