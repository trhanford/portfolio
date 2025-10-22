// app.enhanced.js — adds mouse-parallax background + professional scroll showcase for skill chips
// Drop-in replacement for app.js. No HTML edits required; this script injects any needed CSS.

(function(){
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  // ===== Inject supporting CSS (so we don't have to edit index.html) =====
  const css = `
    /* Mouse parallax subtlety */
    .bg-gradient{ will-change: transform, filter; transition: transform .08s linear; }

    /* Pro showcase layout for chips */
    .quick{ position: relative; }
    .chips{ transition: all .35s ease; }
    .chips.pro{ position: sticky; top: 84px; align-items: flex-start; justify-content: flex-start; gap: 10px; padding-right: 320px; min-height: 320px; }
    .chips.pro .chip{ width: 240px; text-align: left; }
    .chip{ cursor: default; transform-origin: left center; transition: transform .28s ease, background .28s ease, border-color .28s ease, opacity .28s ease; }
    .chip.is-dim{ opacity: .45; }
    .chip.is-focus{ transform: scale(1.06); background: #ffffff; border-color: rgba(20,90,67,.35); }

    /* Right-side sticky showcase */
    .skill-showcase{ position: absolute; right: 24px; top: 12px; width: min(48%, 460px); max-width: 460px; border-radius: 14px; background: rgba(255,255,255,.9); box-shadow: 0 12px 36px rgba(0,0,0,.12); border: 1px solid rgba(12,13,14,.1); padding: 14px; display: none; }
    .chips.pro + .skill-showcase{ display: block; }
    .skill-media{ width: 100%; height: 220px; object-fit: cover; border-radius: 10px; border: 1px solid rgba(12,13,14,.08); }
    .skill-title{ margin: 10px 0 6px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; font-size: .94rem; }
    .skill-copy{ margin: 0; color: #5c6269; font-size: .95rem; }

    @media (max-width: 980px){
      .chips.pro{ position: relative; top: 0; padding-right: 0; }
      .chips.pro + .skill-showcase{ position: relative; right: auto; top: auto; width: 100%; margin-top: 14px; }
    }
  `;
  const styleTag = document.createElement('style');
  styleTag.textContent = css; document.head.appendChild(styleTag);

  // ===== Footer year (idempotent) =====
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  // ===== Mouse-responsive background (parallax) =====
  const bg = document.querySelector('.bg-gradient');
  let targetX = 0, targetY = 0, curX = 0, curY = 0;
  function onMouse(e){
    const vw = window.innerWidth, vh = window.innerHeight;
    const x = (e.clientX / vw - 0.5); // -0.5..0.5
    const y = (e.clientY / vh - 0.5);
    targetX = x * 18; // px translate
    targetY = y * 14;
  }
  function onDeviceTilt(e){
    const { beta=0, gamma=0 } = e; // tilt axes
    targetX = (gamma/45) * 18;
    targetY = (beta/90) * 14;
  }
  function raf(){
    // ease towards target for smoothness
    curX += (targetX - curX) * 0.08;
    curY += (targetY - curY) * 0.08;
    if (bg) bg.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
    requestAnimationFrame(raf);
  }
  window.addEventListener('mousemove', onMouse, { passive:true });
  window.addEventListener('deviceorientation', onDeviceTilt, { passive:true });
  requestAnimationFrame(raf);

  // ===== Simple hash router parity (if main script removed) =====
  const routes = ['home','portfolio','resume'];
  function setActiveLink(hash){
    const path = hash.replace('#/','') || 'home';
    $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#/`+path));
  }
  function render(){
    const path = location.hash.replace('#/','') || 'home';
    routes.forEach(id => { const el = document.getElementById(id); if (el) el.classList.toggle('active', id===path); });
    setActiveLink(location.hash);
  }
  window.addEventListener('hashchange', render);
  if (!location.hash) location.hash = '#/home';
  render();

  // ===== Typed headline (kept lightweight) =====
  const typedEl = document.getElementById('typed');
  const words = ['Mechanical Engineer','Car enthusiast','Pet lover'];
  const TYPE = 70, ERASE = 45, HOLD = 1200;
  async function typeWord(w){
    for (let i=1;i<=w.length;i++){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await new Promise(r=>setTimeout(r,TYPE)); }
    await new Promise(r=>setTimeout(r,HOLD));
    for (let i=w.length;i>=0;i--){ if(!typedEl) return; typedEl.textContent=w.slice(0,i); await new Promise(r=>setTimeout(r,ERASE)); }
  }
  (async function loop(){ if(!typedEl) return; while(true){ for(const w of words){ await typeWord(w); } } })();

  // ===== Professional scroll showcase for skill chips =====
  const chips = document.querySelector('.chips');
  if (chips){
    // Build showcase panel
    const showcase = document.createElement('aside');
    showcase.className = 'skill-showcase';
    showcase.innerHTML = `
      <img class="skill-media" alt="Skill media" src="project-electrical.jpg" />
      <div class="skill-title">Systems Integration</div>
      <p class="skill-copy">Harness design, PDM layout, and tidy routing with serviceability in mind.</p>
    `;
    chips.after(showcase);

    const media = $('.skill-media', showcase);
    const title = $('.skill-title', showcase);
    const copy  = $('.skill-copy', showcase);

    // Map each chip to an image + blurb
    const mapping = [
      {
        match: /Creo|NX/i,
        img:'project-chassis.jpg',
        title:'CAD • Creo / NX',
        copy:'Packaging, prints, BOMs, and tolerance-minded assembly planning.'
      },
      {
        match: /MATLAB|Python/i,
        img:'project-commission.jpg',
        title:'MATLAB • Python',
        copy:'Data capture & analysis, control scripts, and test automation.'
      },
      {
        match: /Harness|PDM/i,
        img:'project-electrical.jpg',
        title:'Harness & PDM',
        copy:'Distribution strategy, grounding, noise mitigation, clear labeling.'
      },
      {
        match: /ECU|CAN/i,
        img:'project-wiring.jpg',
        title:'ECU / CAN Integration',
        copy:'Sensors, relays, CAN-based logic, and neat loom management.'
      },
      {
        match: /Thermals|Cooling/i,
        img:'project-cooling.jpg',
        title:'Thermals & Cooling',
        copy:'Fan/shroud selection, flow paths, ECU temperature triggers.'
      }
    ];

    // Intersection to toggle pro layout
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting){ chips.classList.add('pro'); cycleFocus(); }
      else { chips.classList.remove('pro'); clearFocus(); }
    }, { rootMargin:'-20% 0px -55% 0px', threshold: 0.1 });
    io.observe(chips);

    let cycleTimer = null; let idx = 0;
    function clearFocus(){
      $$('.chip', chips).forEach(ch=>ch.classList.remove('is-focus','is-dim'));
      if (cycleTimer) { clearInterval(cycleTimer); cycleTimer = null; }
    }
    function applyShowcaseFor(ch){
      const txt = ch.textContent || '';
      const m = mapping.find(m=>m.match.test(txt)) || mapping[0];
      if (media) media.src = m.img;
      if (title) title.textContent = m.title;
      if (copy)  copy.textContent  = m.copy;
    }
    function cycleFocus(){
      const list = $$('.chip', chips);
      if (!list.length) return;
      clearFocus();
      cycleTimer = setInterval(()=>{
        list.forEach((ch,i)=>{
          ch.classList.toggle('is-focus', i===idx);
          ch.classList.toggle('is-dim', i!==idx);
        });
        applyShowcaseFor(list[idx]);
        idx = (idx + 1) % list.length;
      }, 1600);
    }

    // Hover overrides the automatic cycle for direct control
    chips.addEventListener('mouseenter', ()=>{ if(cycleTimer){ clearInterval(cycleTimer); cycleTimer=null; } });
    chips.addEventListener('mouseleave', ()=>{ cycleFocus(); });
    chips.addEventListener('mousemove', (e)=>{
      const ch = e.target.closest('.chip');
      if (!ch) return;
      $$('.chip', chips).forEach(c=>c.classList.toggle('is-focus', c===ch));
      $$('.chip', chips).forEach(c=>c.classList.toggle('is-dim', c!==ch));
      applyShowcaseFor(ch);
    });
  }
})();
