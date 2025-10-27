(function(){
  "use strict";

  const DEFAULT_VIEWER_STATUS = 'Use mouse, trackpad, or touch to orbit, zoom, and inspect the component.';
  
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

    const overlayApi = createViewerOverlay();
    
    if (Array.isArray(project.gallery) && project.gallery.length && gridEl){
      const counts = { image: 0, model: 0 };
      project.gallery.forEach((item, index) => {
        const card = createGalleryItem(item, index, project, overlayApi);
        if (!card) return;
        gridEl.appendChild(card);
        const type = (item && item.type) || 'image';
        if (type === 'model'){
          counts.model += 1;
        } else {
          counts.image += 1;
        }
      });
      const total = counts.image + counts.model;
      gridEl.dataset.empty = total ? 'false' : 'true';
      if (total){
        showStatus(statusEl, formatGalleryStatus(counts));
      } else {
        showStatus(statusEl, 'This project gallery does not have media yet.');
      }
    } else if (gridEl){
      gridEl.dataset.empty = 'true';
      showStatus(statusEl, 'This project gallery does not have media yet.');
    }
  }

  function createGalleryItem(item, index, project, overlayApi){
    if (!item || typeof item !== 'object') return null;
    const type = item.type || 'image';
    if (type === 'model'){
      return createModelCard(item, index, project, overlayApi);
    }
    return createImageCard(item, index, project);
  }

  function createImageCard(item, index, project){
    if (!item.src) return null;
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
    return figure;
  }

  function createModelCard(item, index, project, overlayApi){
    if (!item.src) return null;
    const figure = document.createElement('figure');
    figure.className = 'gallery-card gallery-card--viewer';
    const viewer = document.createElement('model-viewer');
    applyModelAttributes(viewer, item, project, index);
    viewer.setAttribute('reveal', 'auto');
    viewer.setAttribute('interaction-prompt', 'auto');
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('touch-action', 'pan-y');
    viewer.setAttribute('shadow-intensity', item.shadowIntensity || project?.model?.shadowIntensity || '0.8');
    viewer.setAttribute('exposure', item.exposure || project?.model?.exposure || '1.0');
    if (item.autoRotate || (item.autoRotate === undefined && project?.model?.autoRotate)){
      viewer.setAttribute('auto-rotate', '');
    }
    const rotation = item.rotationPerSecond || project?.model?.rotationPerSecond;
    if (rotation){
      viewer.setAttribute('rotation-per-second', rotation);
    }
    if (item.poster){
      viewer.setAttribute('poster', item.poster);
    } else if (project?.model?.poster){
      viewer.setAttribute('poster', project.model.poster);
    }
    viewer.setAttribute('loading', 'lazy');
    viewer.addEventListener('error', () => {
      viewer.remove();
      const fallback = document.createElement('div');
      fallback.className = 'gallery-viewer__status';
      fallback.textContent = 'Unable to load this 3D component. Confirm the GLB file exists in assets/models.';
      figure.appendChild(fallback);
    }, { once: true });
    figure.appendChild(viewer);

    const captionText = item.caption || item.alt || `${project.title} component ${index + 1}`;
    if (captionText){
      const caption = document.createElement('figcaption');
      caption.textContent = captionText;
      figure.appendChild(caption);
    }

    figure.tabIndex = 0;
    figure.setAttribute('role', 'button');
    figure.setAttribute('aria-expanded', 'false');
    figure.setAttribute('aria-label', `Expand ${captionText}`);

    const openViewer = event => {
      event.preventDefault();
      overlayApi.open({ item, project, trigger: figure, index });
    };

    figure.addEventListener('click', openViewer);
    figure.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' '){
        event.preventDefault();
        openViewer(event);
      }
    });

    return figure;
  }

  function applyModelAttributes(viewer, spec, project, index){
    if (!viewer) return;
    viewer.setAttribute('src', spec.src);
    const fallbackAlt = project?.title ? `${project.title} component ${index + 1}` : '3D component';
    viewer.setAttribute('alt', spec.alt || fallbackAlt);
  }

  function formatGalleryStatus(counts){
    const parts = [];
    if (counts.image){
      parts.push(`${counts.image} photo${counts.image === 1 ? '' : 's'}`);
    }
    if (counts.model){
      parts.push(`${counts.model} interactive part${counts.model === 1 ? '' : 's'}`);
    }
    if (!parts.length) return 'Gallery loaded.';
    if (parts.length === 1) return `${parts[0]} loaded.`;
    if (parts.length === 2) return `${parts[0]} and ${parts[1]} loaded.`;
    return `${parts.slice(0, -1).join(', ')}, and ${parts[parts.length - 1]} loaded.`;
  }

  function createViewerOverlay(){
    const existing = document.getElementById('galleryViewerOverlay');
    if (existing){
      return existing.__api;
    }

    const root = document.createElement('div');
    root.id = 'galleryViewerOverlay';
    root.className = 'gallery-viewer-overlay';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-hidden', 'true');

    const panel = document.createElement('div');
    panel.className = 'gallery-viewer';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'gallery-viewer__close';
    closeBtn.setAttribute('aria-label', 'Close viewer');
    closeBtn.innerHTML = '<span aria-hidden="true">×</span>';

    const content = document.createElement('div');
    content.className = 'gallery-viewer__content';

    const caption = document.createElement('p');
    caption.className = 'gallery-viewer__caption';

    const status = document.createElement('p');
    status.className = 'gallery-viewer__status';
    status.textContent = DEFAULT_VIEWER_STATUS;

    panel.append(closeBtn, content, caption, status);
    root.appendChild(panel);
    document.body.appendChild(root);

    let activeTrigger = null;
    let keyHandler = null;

    const api = {
      open({ item, project, trigger, index = 0 } = {}){
        if (!item) return;
        content.innerHTML = '';
        const viewer = document.createElement('model-viewer');
        applyModelAttributes(viewer, item, project, index);
        viewer.setAttribute('reveal', 'auto');
        viewer.setAttribute('interaction-prompt', 'auto');
        viewer.setAttribute('camera-controls', '');
        viewer.setAttribute('touch-action', 'pan-y');
        viewer.setAttribute('shadow-intensity', item.shadowIntensity || project?.model?.shadowIntensity || '0.8');
        viewer.setAttribute('exposure', item.exposure || project?.model?.exposure || '1.0');
        if (item.autoRotate || (item.autoRotate === undefined && project?.model?.autoRotate)){
          viewer.setAttribute('auto-rotate', '');
        }
        const rotation = item.rotationPerSecond || project?.model?.rotationPerSecond;
        if (rotation){
          viewer.setAttribute('rotation-per-second', rotation);
        }
        if (item.poster){
          viewer.setAttribute('poster', item.poster);
        } else if (project?.model?.poster){
          viewer.setAttribute('poster', project.model.poster);
        } else {
          viewer.removeAttribute('poster');
        }
        viewer.setAttribute('loading', 'eager');
        viewer.addEventListener('error', () => {
          content.innerHTML = '';
          const message = document.createElement('p');
          message.className = 'gallery-viewer__status';
          message.textContent = 'Unable to load this 3D component. Confirm the GLB file exists in assets/models.';
          content.appendChild(message);
        }, { once: true });
        content.appendChild(viewer);

        caption.textContent = item.caption || item.alt || (project?.title ? `${project.title} component ${index + 1}` : '');
        status.textContent = item.helper || DEFAULT_VIEWER_STATUS;

        activeTrigger = trigger instanceof HTMLElement ? trigger : null;
        if (activeTrigger){
          activeTrigger.setAttribute('aria-expanded', 'true');
        }

        root.classList.add('is-open');
        root.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        closeBtn.focus();

        if (keyHandler){
          document.removeEventListener('keydown', keyHandler);
        }
        keyHandler = event => {
          if (event.key === 'Escape' && root.classList.contains('is-open')){
            api.close();
          }
        };
        document.addEventListener('keydown', keyHandler);
      },
      close(){
        if (!root.classList.contains('is-open')) return;
        root.classList.remove('is-open');
        root.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        if (activeTrigger){
          activeTrigger.setAttribute('aria-expanded', 'false');
          activeTrigger.focus();
        }
        activeTrigger = null;
        if (keyHandler){
          document.removeEventListener('keydown', keyHandler);
          keyHandler = null;
        }
      }
    };

    closeBtn.addEventListener('click', () => api.close());
    root.addEventListener('click', event => {
      if (event.target === root){
        api.close();
      }
    });

    root.__api = api;
    return api;
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
