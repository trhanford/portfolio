// resume.js — Digital résumé enhancements (section highlighting, progress)
(function(){
  const ready = document.readyState === 'loading'
    ? new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, {once:true}))
    : Promise.resolve();

  ready.then(init);

  function init(){
    const tocLinks = Array.from(document.querySelectorAll('.resume-toc a[data-scroll]'));
    const progressBar = document.querySelector('.resume-progress__bar');
    const sections = tocLinks
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (sections.length && 'IntersectionObserver' in window){
      const observer = new IntersectionObserver(onIntersect, {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.5, 1]
      });
      sections.forEach(sec => observer.observe(sec));

      function onIntersect(entries){
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = '#' + entry.target.id;
          tocLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === id));
        });
      }
    }

    if (progressBar){
      const onScroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
        progressBar.style.width = pct.toFixed(2) + '%';
      };
      onScroll();
      window.addEventListener('scroll', onScroll, {passive:true});
    }
  }
})();
