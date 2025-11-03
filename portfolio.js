(function(){
  "use strict";

  const RAW_PROJECTS = (function(){
    if (!Array.isArray(window.PORTFOLIO_PROJECTS)) return [];
    return window.PORTFOLIO_PROJECTS;
  })();

  const Projects = new Map();
  RAW_PROJECTS.forEach(entry => {
    if (!entry || !entry.id) return;
    Projects.set(entry.id, entry);
  });

  function initPortfolio(){
    const rails = document.querySelectorAll('[data-project-rail]');
    rails.forEach(setupRail);

    const modal = createModal();
    const projectCards = document.querySelectorAll('[data-project-id]');
    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-project-id');
        const proj = Projects.get(id);
        if (!proj) return;
        const collectionName = card.getAttribute('data-collection');
        const collection = resolveCollection(collectionName, id);
        modal.open(proj, { collection });
      });
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' '){
          event.preventDefault();
          card.click();
        }
      });
    });
  }

  function resolveCollection(name, activeId){
    if (!name) return null;
    const collection = [];
    Projects.forEach(project => {
      if (project.collection === name){
        collection.push({ id: project.id, label: project.title });
      }
    });
    if (!collection.length) return null;
    return collection;
  }

  function setupRail(rail){
    const windowEl = rail.querySelector('[data-project-window]');
    const track = rail.querySelector('[data-project-track]');
    const prevBtn = rail.querySelector('[data-rail-prev]');
    const nextBtn = rail.querySelector('[data-rail-next]');
    const progressBar = rail.querySelector('[data-rail-progress]');
    if (!(windowEl instanceof HTMLElement) || !(track instanceof HTMLElement)) return;

    function updateProgress(){
      if (!(windowEl instanceof HTMLElement) || !(track instanceof HTMLElement) || !(progressBar instanceof HTMLElement)) return;
      const maxScroll = windowEl.scrollWidth - windowEl.clientWidth;
      const currentScroll = windowEl.scrollLeft;
      const ratio = maxScroll > 0 ? currentScroll / maxScroll : 0;
      progressBar.style.transform = `scaleX(${ratio})`;
    }

    windowEl.addEventListener('scroll', () => {
      updateProgress();
      toggleButtons();
    }, { passive: true });

    function toggleButtons(){
      const maxScroll = windowEl.scrollWidth - windowEl.clientWidth;
      if (prevBtn){
        prevBtn.disabled = windowEl.scrollLeft <= 4;
      }
      if (nextBtn){
        nextBtn.disabled = windowEl.scrollLeft >= maxScroll - 4;
      }
    }

    function scrollByCard(direction){
      const cards = track.querySelectorAll('[data-project-id]');
      if (!cards.length) return;
      const cardWidth = cards[0].getBoundingClientRect().width + 18;
      const delta = direction === 'next' ? cardWidth : -cardWidth;
      windowEl.scrollBy({ left: delta, behavior: 'smooth' });
    }

    if (prevBtn){
      prevBtn.addEventListener('click', () => scrollByCard('prev'));
    }
    if (nextBtn){
      nextBtn.addEventListener('click', () => scrollByCard('next'));
    }

    updateProgress();
    toggleButtons();
  }

  function createModal(){
    const root = document.getElementById('projectModal');
    if (!(root instanceof HTMLElement)) return null;
    const body = root.querySelector('#projectModalBody');
    const title = root.querySelector('#projectModalTitle');
    const summary = root.querySelector('#projectModalSummary');
    const category = root.querySelector('#projectModalCategory');
    const closeButtons = root.querySelectorAll('[data-close]');
    let focusTrapHandler = null;
    let previouslyFocused = null;

    const api = {
      open(project, context = {}){
        if (!project) return;
        previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        root.classList.add('open');
        root.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (title) title.textContent = project.title;
        if (summary) summary.textContent = project.summary || '';
        if (category) category.textContent = project.category || '';
        const categorySlug = toCategorySlug(project.category);
        if (categorySlug){
          root.dataset.category = categorySlug;
        } else {
          delete root.dataset.category;
        }
        if (body){
          body.innerHTML = '';
          // NOTE: keep hasGallery logic but do NOT set data-has-gallery on body
          const hasGallery = categorySlug !== 'cad' && Array.isArray(project.gallery) && project.gallery.length > 0;

          const cards = [];

          if (hasGallery){
            const gallery = renderGallery(project.gallery, project.title);
            if (gallery) cards.push(gallery);
          }

          const prioritizeModel = categorySlug === 'cad' && project.model;
          if (prioritizeModel){
            const prioritizedModel = renderModel(project);
            if (prioritizedModel) cards.push(prioritizedModel);
          }

          if (Array.isArray(project.description) && project.description.length){
            const description = renderDescription(project.description);
            if (description) cards.push(description);
          }

          const actionLinks = [];
          const reportLink = renderReportCTA(project);
          if (reportLink) actionLinks.push(reportLink);
          if (hasGallery && shouldShowGalleryCTA(project)){
            const galleryCTA = renderGalleryCTA(project);
            if (galleryCTA) actionLinks.push(galleryCTA);
          }
          if (actionLinks.length){
            const actionsCard = renderActionsCard(actionLinks);
            if (actionsCard) cards.push(actionsCard);
          }

          if (project.model && !prioritizeModel){
            const modelCard = renderModel(project);
            if (modelCard) cards.push(modelCard);
          }

          if (context.collection && context.collection.length > 1){
            const collectionCard = renderCollectionNav(context.collection, project.id, api);
            if (collectionCard) cards.push(collectionCard);
          }

          cards.forEach(card => body.appendChild(card));
        }

        const focusable = getFocusableElements(root);
        const firstFocusable = focusable[0];
        firstFocusable?.focus();

        if (focusTrapHandler){
          document.removeEventListener('keydown', focusTrapHandler);
        }
        focusTrapHandler = event => {
          if (event.key !== 'Tab') return;
          const elements = getFocusableElements(root);
          if (!elements.length) return;
          const first = elements[0];
          const last = elements[elements.length - 1];
          if (event.shiftKey && document.activeElement === first){
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last){
            event.preventDefault();
            first.focus();
          }
        };

        document.addEventListener('keydown', focusTrapHandler);
      },
      close(){
        root.classList.remove('open');
        root.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        delete root.dataset.category;
        if (focusTrapHandler){
          document.removeEventListener('keydown', focusTrapHandler);
          focusTrapHandler = null;
        }
        previouslyFocused?.focus();
      }
    };

    closeButtons.forEach(btn => btn.addEventListener('click', api.close));
    root.addEventListener('click', event => {
      if (event.target instanceof HTMLElement && event.target.dataset.close !== undefined){
        api.close();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && root.classList.contains('open')) api.close();
    });

    return api;
  }

  function createModalCard({ modifier = '', label, title, intro } = {}){
    const classes = ['modal-card'];
    if (modifier) classes.push(modifier);
    const card = document.createElement('section');
    card.className = classes.join(' ');
    card.setAttribute('role', 'group');

    if (label || title || intro){
      const header = document.createElement('header');
      header.className = 'modal-card__header';

      if (label){
        const labelEl = document.createElement('p');
        labelEl.className = 'modal-card__label';
        labelEl.textContent = label;
        header.appendChild(labelEl);
      }

      if (title){
        const heading = document.createElement('h3');
        heading.className = 'modal-card__title';
        heading.textContent = title;
        header.appendChild(heading);
      }

      if (intro){
        const introCopy = document.createElement('p');
        introCopy.className = 'modal-card__intro';
        introCopy.textContent = intro;
        header.appendChild(introCopy);
      }

      card.appendChild(header);
    }

    return card;
  }
  
  function renderGallery(items, title){
    if (!Array.isArray(items) || !items.length) return null;
    const card = createModalCard({
      modifier: 'modal-gallery',
      label: 'Project gallery',
      title: 'Highlights',
      intro: 'Swipe or drag to explore hero shots and detail photography.'
    });
    const rail = document.createElement('div');
    rail.className = 'modal-gallery__rail';
    const slides = [];
    items.forEach(item => {
      if (!item || !item.src) return;
      const figure = document.createElement('figure');
      figure.className = 'modal-gallery__item';
      const img = document.createElement('img');
      img.className = 'modal-gallery__image';
      img.src = item.src;
      img.alt = item.alt || title || '';
      img.loading = 'lazy';
      figure.appendChild(img);
      rail.appendChild(figure);
      slides.push(figure);
    });
    if (!rail.childElementCount) return null;
    card.appendChild(rail);

    // add prev/next controls if more than one slide
    if (slides.length > 1){
      let index = 0;
      const scrollToIndex = newIndex => {
        index = (newIndex + slides.length) % slides.length;
        const target = slides[index];
        target?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      };

      const createControl = (direction, label, symbol) => {
        const control = document.createElement('button');
        control.type = 'button';
        control.className = `modal-gallery__control modal-gallery__control--${direction}`;
        control.setAttribute('aria-label', label);
        control.textContent = symbol;
        control.addEventListener('click', () => {
          const delta = direction === 'prev' ? -1 : 1;
          scrollToIndex(index + delta);
        });
        return control;
      };

      const prev = createControl('prev', 'View previous highlight', '‹');
      const next = createControl('next', 'View next highlight', '›');

      card.append(prev, next);
    }
    return card;
  }

  function renderDescription(paragraphs){
    if (!Array.isArray(paragraphs) || !paragraphs.length) return null;
    const card = createModalCard({
      modifier: 'modal-description',
      label: 'Project overview',
      title: 'In context'
    });
    const copyWrapper = document.createElement('div');
    copyWrapper.className = 'modal-description__content';
    paragraphs.forEach(copy => {
      if (!copy) return;
      const paragraph = document.createElement('p');
      paragraph.textContent = copy;
      copyWrapper.appendChild(paragraph);
    });
    if (!copyWrapper.childElementCount) return null;
    card.appendChild(copyWrapper);
    return card;
  }

  function renderActionsCard(actions){
    if (!Array.isArray(actions) || !actions.length) return null;
    const card = createModalCard({
      modifier: 'modal-actions',
      label: 'Explore more',
      title: 'Continue the journey'
    });
    const list = document.createElement('div');
    list.className = 'modal-actions__list';
    actions.forEach(action => {
      if (!action) return;
      list.appendChild(action);
    });
    if (!list.childElementCount) return null;
    card.appendChild(list);
    return card;
  }

  function renderReportCTA(project){
    if (!project || !project.report) return null;
    const link = document.createElement('a');
    link.href = project.report;
    link.target = '_blank';
    link.rel = 'noreferrer noopener';
    link.className = 'btn btn-primary';
    link.textContent = 'View full report';
    return link;
  }

  function shouldShowGalleryCTA(project){
    return Array.isArray(project.gallery) && project.gallery.length > 4;
  }

  function renderGalleryCTA(project){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn';
    btn.textContent = 'Open gallery';
    // placeholder; could later open a dedicated gallery view
    btn.addEventListener('click', () => {
      if (!Array.isArray(project.gallery) || !project.gallery.length) return;
      const first = project.gallery[0];
      if (first && first.src){
        window.open(first.src, '_blank', 'noopener,noreferrer');
      }
    });
    return btn;
  }

  function renderModel(project){
    if (!project || !project.model) return null;
    const card = createModalCard({
      modifier: 'modal-viewer',
      label: 'Interactive model',
      title: project.title || '3D viewer',
      intro: project.model.description || 'Explore the CAD model from multiple angles.'
    });
    const stage = document.createElement('div');
    stage.className = 'modal-viewer__stage';

    const viewer = document.createElement('model-viewer');
    viewer.setAttribute('src', project.model.src);
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('shadow-intensity', '1');
    viewer.setAttribute('auto-rotate', '');
    viewer.setAttribute('ar', '');
    viewer.setAttribute('touch-action', 'pan-y');

    const spec = project.model;
    if (spec.poster) viewer.setAttribute('poster', spec.poster);
    if (spec.environmentImage) viewer.setAttribute('environment-image', spec.environmentImage);
    if (spec.exposure) viewer.setAttribute('exposure', spec.exposure);
    if (spec.autoRotateDelay) viewer.setAttribute('auto-rotate-delay', spec.autoRotateDelay);
    if (spec.rotationPerSecond) viewer.setAttribute('rotation-per-second', spec.rotationPerSecond); else viewer.removeAttribute('rotation-per-second');
    viewer.addEventListener('error', () => {
      const placeholder = document.createElement('div');
      placeholder.className = 'viewer-placeholder';
      const headline = document.createElement('strong');
      headline.textContent = '3D model unavailable';
      const message = document.createElement('p');
      message.className = 'viewer-placeholder__status';
      message.textContent = spec.message || 'Link a .glb or .gltf file to enable the viewer.';
      placeholder.append(headline, message);
      stage.innerHTML = '';
      stage.appendChild(placeholder);
    }, { once: true });

    registerSlateTint(viewer);
    
    stage.appendChild(viewer);
    card.appendChild(stage);
    return card;
  }

  function renderCollectionNav(collection, activeId, modalApi){
    if (!Array.isArray(collection)) return null;
    const card = createModalCard({
      modifier: 'modal-collection',
      label: 'More from this build',
      title: 'More from this build'
    });
    const list = document.createElement('div');
    list.className = 'modal-collection__list';
    collection.forEach(entry => {
      if (!entry || entry.id === activeId || !Projects.has(entry.id)) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'modal-collection__btn';
      btn.textContent = entry.label || Projects.get(entry.id).title;
      btn.addEventListener('click', () => {
        const project = Projects.get(entry.id);
        if (!project) return;
        modalApi.open(project, { collection });
      });
      list.appendChild(btn);
    });
    if (!list.childElementCount) return null;
    card.appendChild(list);
    return card;
  }

  function getFocusableElements(root){
    if (!(root instanceof HTMLElement)) return [];
    const focusableSelectors = [
      'a[href]', 'button:not([disabled])', 'textarea', 'input', 'select', '[tabindex]:not([tabindex="-1"])'
    ];
    const nodes = Array.from(root.querySelectorAll(focusableSelectors.join(',')));
    return nodes.filter(el => !el.hasAttribute('disabled') && (el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement));
  }

  function toCategorySlug(value){
    if (typeof value !== 'string') return '';
    return value.trim().toLowerCase().replace(/\s+/g, '-');
  }

  function registerSlateTint(viewer){
    if (!viewer || !(viewer instanceof HTMLElement)) return;
    viewer.addEventListener('load', () => {
      viewer.style.setProperty('--viewer-bg', 'rgba(14, 16, 18, .08)');
    }, { once: true });
  }

  // bootstrap
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', initPortfolio);
  } else {
    initPortfolio();
  }

})();
