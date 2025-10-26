(function(){
  "use strict";

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init(){
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const source = (typeof window !== 'undefined' && window.ProjectData) || {};
    const project = projectId && typeof source === 'object' ? source[projectId] : null;

    const titleEl = document.getElementById('galleryTitle');
    const summaryEl = document.getElementById('gallerySummary');
    const categoryEl = document.getElementById('galleryCategory');
    const crumbEl = document.getElementById('galleryCrumb');
    const statusEl = document.getElementById('galleryStatus');
    const gridEl = document.getElementById('galleryGrid');
    const backLinkEl = document.getElementById('galleryBackLink');
    const navTitleEl = document.getElementById('navTitle');

    if (!project){
      updateText(titleEl, 'Gallery unavailable');
      updateText(summaryEl, 'We could not find a matching project. Return to the portfolio to choose another build.');
      if (categoryEl) categoryEl.textContent = '';
      if (crumbEl) crumbEl.textContent = 'Unavailable';
      if (gridEl) gridEl.dataset.empty = 'true';
      showStatus(statusEl, 'No gallery found for that project identifier.');
      document.title = 'Gallery — Tristan Hanford';
      return;
    }

    document.title = `Gallery — ${project.title}`;
    updateText(titleEl, project.title);
    updateText(summaryEl, project.summary || '');
    if (categoryEl) categoryEl.textContent = project.category || '';
    if (crumbEl) crumbEl.textContent = project.title;
    if (navTitleEl) navTitleEl.textContent = 'Gallery';

    const anchorTargets = {
      'Automotive': '#automotive',
      'CAD': '#cad',
      'Computer & Electrical': '#electrical'
    };
    if (backLinkEl){
      const anchor = anchorTargets[project.category] || '#';
      const href = anchor === '#' ? 'portfolio.html' : `portfolio.html${anchor}`;
      backLinkEl.href = href;
    }

    if (Array.isArray(project.gallery) && project.gallery.length && gridEl){
      project.gallery.forEach((item, index) => {
        const figure = document.createElement('figure');
        figure.className = 'gallery-card';
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || `${project.title} photo ${index + 1}`;
        img.loading = 'lazy';
        figure.appendChild(img);
        const captionText = item.caption || item.alt || '';
        if (captionText){
          const caption = document.createElement('figcaption');
          caption.textContent = captionText;
          figure.appendChild(caption);
        }
        gridEl.appendChild(figure);
      });
      gridEl.dataset.empty = 'false';
      showStatus(statusEl, `${project.gallery.length} photo${project.gallery.length === 1 ? '' : 's'} loaded.`);
    } else if (gridEl){
      gridEl.dataset.empty = 'true';
      showStatus(statusEl, 'This project gallery does not have photos yet.');
    }
  }

  function showStatus(element, message){
    if (!(element instanceof HTMLElement)) return;
    element.textContent = message;
    element.classList.add('is-visible');
  }

  function updateText(element, value){
    if (!(element instanceof HTMLElement)) return;
    element.textContent = value;
    if (!value){
      element.setAttribute('hidden', '');
    } else {
      element.removeAttribute('hidden');
    }
  }
})();
