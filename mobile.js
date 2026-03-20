(function(){
  const ready = document.readyState === 'loading'
    ? new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }))
    : Promise.resolve();

  ready.then(() => {
    document.documentElement.classList.add('mobile-enhancements-ready');
    syncMobileDockState();
    syncSectionAwareMobileLinks();
  });

  function syncMobileDockState(){
    const links = Array.from(document.querySelectorAll('.mobile-dock__link'));
    if (!links.length) return;

    const path = normalizePath(window.location.pathname);
    links.forEach(link => {
      const href = link.getAttribute('href') || '';
      const url = new URL(href, window.location.href);
      const linkPath = normalizePath(url.pathname);
      const isSamePageHash = linkPath === path && url.hash;
      const isCurrent = (!url.hash && linkPath === path) || (path === '/' && linkPath === '/index.html' && !url.hash);
      link.toggleAttribute('aria-current', !!isCurrent && !isSamePageHash);
      if (!isCurrent || isSamePageHash) link.removeAttribute('aria-current');
    });
  }

  function syncSectionAwareMobileLinks(){
    const homeLink = document.querySelector('.mobile-dock__link--home[href^="#"], .mobile-dock__link--home[href*="#intro"]');
    const aboutLink = document.querySelector('.mobile-dock__link--about[href^="#"], .mobile-dock__link--about[href*="#about"]');
    const intro = document.querySelector('#intro');
    const about = document.querySelector('#about');

    if (!homeLink || !aboutLink || !intro || !about || !('IntersectionObserver' in window)) return;

    const setActive = target => {
      homeLink.removeAttribute('aria-current');
      aboutLink.removeAttribute('aria-current');
      target.setAttribute('aria-current', 'page');
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target === about) setActive(aboutLink);
        if (entry.target === intro) setActive(homeLink);
      });
    }, {
      threshold: 0.5,
      rootMargin: '-10% 0px -35% 0px'
    });

    observer.observe(intro);
    observer.observe(about);
  }

  function normalizePath(path){
    if (!path || path === '/') return '/index.html';
    return path.endsWith('/') ? path + 'index.html' : path;
  }
})();
