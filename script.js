/* ===== Cursor-reactive background ===== */
(() => {
  const root = document.documentElement;
  let raf = null, px = 0.5, py = 0.5;

  function onMove(e) {
    const t = (e.touches && e.touches[0]) || e;
    const x = t.clientX ?? innerWidth / 2;
    const y = t.clientY ?? innerHeight / 2;
    px = x / innerWidth;
    py = y / innerHeight;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      root.style.setProperty("--mx", String(px));
      root.style.setProperty("--my", String(py));
      raf = null;
    });
  }
  addEventListener("mousemove", onMove, { passive: true });
  addEventListener("touchmove", onMove, { passive: true });
})();

/* ===== Typing / untyping loop ===== */
(() => {
  const el = document.getElementById("type-target");
  if (!el) return;

  const words = ["Mechanical Engineer", "Purdue ASME Member", "Car Enthusiast"];
  const TYPE = 70, ERASE = 45, HOLD_T = 900, HOLD_E = 300;

  let i = 0, p = 0, typing = true;

  function step() {
    const w = words[i];

    if (typing) {
      el.textContent = w.slice(0, ++p);
      if (p === w.length) {
        typing = false;
        return setTimeout(step, HOLD_T);
      }
      return setTimeout(step, TYPE);
    } else {
      el.textContent = w.slice(0, --p);
      if (p === 0) {
        i = (i + 1) % words.length;
        typing = true;
        return setTimeout(step, HOLD_E);
      }
      return setTimeout(step, ERASE);
    }
  }

  setTimeout(step, 300);
})();
