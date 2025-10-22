/* ==========================================================
   Tristan Hanford — Site JS (no dependencies)
   - Sets current year
   - Smooth anchor scrolling (with sticky header offset)
   - Active nav highlighting on scroll
   - Optional fade-in via IntersectionObserver
   ========================================================== */

(function () {
  // ---------- Utilities ----------
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

  // Sticky header height guess (px). Tweak if your header size changes.
  const HEADER_OFFSET = 80;

  // Get section nodes in order (match your HTML IDs)
  const sectionSelectors = ["#hero", "#about", "#skills", "#projects", "#contact"];
  const sections = sectionSelectors
    .map(sel => document.querySelector(sel))
    .filter(Boolean);

  // Map section id -> nav <li> element
  const navMap = {
    hero: document.getElementById("nav-hero"),
    about: document.getElementById("nav-about"),
    skills: document.getElementById("nav-skills"),
    projects: document.getElementById("nav-projects"),
    contact: document.getElementById("nav-contact"),
  };

  // ---------- 1) Year ----------
  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  // ---------- 2) Smooth anchor scrolling ----------
  // Intercept clicks on in-page anchors in the primary nav and hero CTA
  const anchorLinks = Array.from(
    document.querySelectorAll('a[href^="#"]')
  ).filter(a => sectionSelectors.includes(a.getAttribute("href")));

  function smoothScrollTo(targetEl) {
    if (!targetEl) return;
    const rect = targetEl.getBoundingClientRect();
    const absoluteTop = window.pageYOffset + rect.top;
    const offsetTop = Math.max(absoluteTop - HEADER_OFFSET, 0);

    window.history.pushState(null, "", `#${targetEl.id}`);

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }

  anchorLinks.forEach(a => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        smoothScrollTo(target);
      }
    });
  });

  // If page loads with a hash, offset-correct it
  window.addEventListener("load", () => {
    if (location.hash) {
      const initialTarget = document.querySelector(location.hash);
      if (initialTarget) {
        // Delay to let layout settle
        setTimeout(() => smoothScrollTo(initialTarget), 0);
      }
    }
  });

  // ---------- 3) Active nav highlighting on scroll ----------
  let ticking = false;

  function setActiveNav(sectionId) {
    Object.values(navMap).forEach(li => {
      if (li) li.classList.remove("navigation__item--active");
    });
    const li = navMap[sectionId];
    if (li) li.classList.add("navigation__item--active");
  }

  // Compute “current section” by the vertical center of the viewport
  function onScroll() {
    if (ticking) return;
    ticking = true;

    window.requestAnimationFrame(() => {
      const viewportCenter = window.pageYOffset + (window.innerHeight / 2);

      let currentId = sections[0] ? sections[0].id : null;

      for (const sec of sections) {
        const top = sec.offsetTop - HEADER_OFFSET - 1;
        const bottom = top + sec.offsetHeight;
        if (viewportCenter >= top && viewportCenter < bottom) {
          currentId = sec.id;
          break;
        }
      }

      if (currentId) setActiveNav(currentId);
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  // Kick once on load
  onScroll();

  // ---------- 4) Optional: Fade-in on scroll ----------
  // Adds 'is-visible' class when elements enter viewport.
  // Safe even if your CSS doesn’t style it yet.
  const fadeTargets = document.querySelectorAll(
    ".profile__picture, .project, .skills__item, .section-heading"
  );

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      }
    );
    fadeTargets.forEach(el => io.observe(el));
  } else {
    // Fallback: show everything immediately
    fadeTargets.forEach(el => el.classList.add("is-visible"));
  }

  // ---------- 5) Defensive guards for missing elements ----------
  // Avoid console errors if some elements are not found.
  // (No-op by design.)
})();
