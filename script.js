/* ==========================================
   Home page JS
   - Cursor-reactive background (updates CSS vars)
   - Typing / untyping loop for rotating roles
   ========================================== */

/* -------- Cursor-reactive background -------- */
(() => {
  const root = document.documentElement;
  let raf = null;
  let px = 0.5, py = 0.5;

  function onMove(e) {
    const x = (e.clientX ?? (e.touches && e.touches[0]?.clientX)) ?? window.innerWidth / 2;
    const y = (e.clientY ?? (e.touches && e.touches[0]?.clientY)) ?? window.innerHeight / 2;
    px = x / window.innerWidth;
    py = y / window.innerHeight;

    if (raf) return;
    raf = requestAnimationFrame(() => {
      root.style.setProperty("--mx", String(px));
      root.style.setProperty("--my", String(py));
      raf = null;
    });
  }

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
})();

/* -------- Typing / untyping effect -------- */
(() => {
  const el = document.getElementById("type-target");
  if (!el) return;

  const words = [
    "Mechanical Engineer",
    "Purdue ASME Member",
    "Car Enthusiast"
  ];

  const TYPE_SPEED = 70;      // ms per character typed
  const ERASE_SPEED = 45;     // ms per character erased
  const HOLD_AFTER_TYPE = 900; // ms to hold when fully typed
  const HOLD_AFTER_ERASE = 300; // ms to hold when fully erased

  let idx = 0;       // which word
  let pos = 0;       // which char within that word
  let dir = 1;       // 1 = typing, -1 = erasing

  function loop() {
    const word = words[idx];

    if (dir === 1) {
      // Typing
      pos++;
      el.textContent = word.slice(0, pos);

      if (pos === word.length) {
        // fully typed; hold then start erasing
        setTimeout(() => {
          dir = -1;
          requestAnimationFrame(loop);
        }, HOLD_AFTER_TYPE);
      } else {
        setTimeout(loop, TYPE_SPEED);
      }
    } else {
      // Erasing
      pos--;
      el.textContent = word.slice(0, Math.max(0, pos));

      if (pos <= 0) {
        // fully erased; next word, hold then type
        idx = (idx + 1) % words.length;
        dir = 1;
        setTimeout(loop, HOLD_AFTER_ERASE);
      } else {
        setTimeout(loop, ERASE_SPEED);
      }
    }
  }

  // Start after a brief delay to avoid abrupt paint
  setTimeout(loop, 300);
})();
