// scripts/panel.glass.fx.js
// Adds: 
// 1) More vertical spacing for the hero "Explore" links (no CSS file edits needed)
// 2) A lightweight "liquid glass" hover effect that follows the cursor
//    (works with your existing refract filter; degrades gracefully)
//
// Usage: include this AFTER your main script.js OR paste it at the end of script.js
// <script src="scripts/panel.glass.fx.js" defer></script>

(function(){
  const $  = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  function init(){
    // --- 1) Inject minimal CSS for spacing + glass blob ---
    const css = `
      /* Spacing: spread Explore links vertically */
      .panel-links{ gap: 26px !important; margin-top: 10px; }
      .panel-link{ padding: 18px 20px; }
      /* Ensure the panel can clip the blob */
      .panel{ overflow: hidden; }
      /* Liquid glass blob that follows the cursor */
      .glass-blob{ position:absolute; width: 240px; height: 240px; border-radius: 999px;
        pointer-events: none; opacity: 0; transform: translate(-50%, -50%) scale(0.98);
        background: radial-gradient(32% 32% at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.55) 25%, rgba(255,255,255,0.15) 62%, rgba(255,255,255,0.0) 72%),
                    radial-gradient(50% 50% at 70% 60%, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.0) 70%);
        backdrop-filter: blur(12px) saturate(1.18);
        -webkit-backdrop-filter: blur(12px) saturate(1.18);
        filter: drop-shadow(0 18px 40px rgba(0,0,0,.16));
        transition: opacity .22s ease, transform .25s cubic-bezier(.18,.9,.15,1);
        mix-blend-mode: screen;
      }
      .glass-blob.is-active{ opacity: 1; transform: translate(-50%, -50%) scale(1); }
      /* Smaller blob on narrow screens */
      @media (max-width: 640px){
        .glass-blob{ width: 180px; height: 180px; }
      }
    `;
    const tag = document.createElement('style');
    tag.id = 'panel-glass-fx-css';
    tag.textContent = css;
    document.head.appendChild(tag);

    // --- 2) Create a single blob per panel, track pointer, ease movement ---
    const panel = $('#panelLinks')?.closest('.panel');
    if (!panel) return;

    // Create the blob
    const blob = document.createElement('div');
    blob.className = 'glass-blob';
    panel.appendChild(blob);

    // Track target position and ease towards it
    let targetX = 0, targetY = 0;  // desired (pointer)
    let x = 0, y = 0;              // rendered
    let raf = 0, active = false;

    function loop(){
      // Ease factor (higher = snappier)
      const k = 0.18;
      x += (targetX - x) * k;
      y += (targetY - y) * k;
      blob.style.left = x + 'px';
      blob.style.top  = y + 'px';
      // Subtle parallax squish
      const dx = targetX - x, dy = targetY - y;
      const speed = Math.min(1, Math.hypot(dx, dy) / 120);
      const scale = 1 + speed * 0.03;
      blob.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      if (active) raf = requestAnimationFrame(loop);
    }

    function boundsPos(e){
      const r = panel.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    }

    panel.addEventListener('pointerenter', (e)=>{
      const p = boundsPos(e);
      targetX = x = p.x; targetY = y = p.y;
      blob.classList.add('is-active');
      if (!active){ active = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    });

    panel.addEventListener('pointermove', (e)=>{
      const p = boundsPos(e);
      targetX = p.x; targetY = p.y;
    });

    panel.addEventListener('pointerleave', ()=>{
      blob.classList.remove('is-active');
      active = false; cancelAnimationFrame(raf);
    });

    // Also show a small pulse when focusing links with keyboard
    $$('.panel-link', panel).forEach(link=>{
      link.addEventListener('focus', (e)=>{
        const r = link.getBoundingClientRect();
        const p = panel.getBoundingClientRect();
        targetX = x = (r.left + r.width/2) - p.left;
        targetY = y = (r.top  + r.height/2) - p.top;
        blob.classList.add('is-active');
        if (!active){ active = true; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
        // brief emphasize
        blob.style.transition = 'opacity .22s ease, transform .1s ease';
        blob.style.transform  = 'translate(-50%, -50%) scale(1.04)';
        setTimeout(()=>{ blob.style.transition = ''; }, 120);
      });
      link.addEventListener('blur', ()=>{
        blob.classList.remove('is-active');
        active = false; cancelAnimationFrame(raf);
      });
    });
  }
})();
