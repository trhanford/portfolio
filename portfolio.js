(function(){
  "use strict";

  const RAW_PROJECTS = (function(){
    if (typeof window === 'undefined') return {};
    const source = window.ProjectData;
    if (!source || typeof source !== 'object') return {};
    return source;
  })();

  const Projects = (() => {
    const entries = Object.entries(RAW_PROJECTS).map(([id, data]) => [id, Object.freeze({ id, ...data })]);
    const map = new Map(entries);
    const counts = entries.reduce((acc, [, project]) => {
      const key = project.category;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return {
      get(id){ return map.get(id); },
      has(id){ return map.has(id); },
      all(){ return map.values(); },
      toArray(){ return entries.map(([, project]) => project); },
      countByCategory(category){ return counts[category] || 0; }
    };
  })();

  const SLATE_TINT = [112 / 255, 128 / 255, 144 / 255, 1];
  const WHITE_THRESHOLD = 0.9;

  function whenModelViewerReady(){
    if (typeof window === 'undefined' || typeof customElements === 'undefined' || typeof customElements.whenDefined !== 'function'){
      return Promise.resolve();
    }
    try {
      return customElements.whenDefined('model-viewer');
    } catch (error){
      return Promise.resolve();
    }
  }

  function registerSlateTint(viewer){
    if (!(viewer instanceof HTMLElement) || viewer.__slateTintReady) return;
    viewer.__slateTintReady = true;

    const tintMaterials = () => {
      const model = viewer.model;
      if (!model || !model.materials || !model.materials.length) return;

      Array.from(model.materials).forEach(material => {
        const pbr = material?.pbrMetallicRoughness;
        if (!pbr || typeof pbr.setBaseColorFactor !== 'function') return;
        if (pbr.baseColorTexture) return;

        const baseColor = pbr.baseColorFactor ? Array.from(pbr.baseColorFactor) : [1, 1, 1, 1];

        const [r = 1, g = 1, b = 1, a = 1] = baseColor;
        if (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD){
          pbr.setBaseColorFactor([SLATE_TINT[0], SLATE_TINT[1], SLATE_TINT[2], a]);
        }
      });
    };

    viewer.addEventListener('load', tintMaterials);
    if (viewer.model) tintMaterials();
  }

  function tintExistingModelViewers(root = document){
    selectAll('model-viewer', root).forEach(registerSlateTint);
  }
  
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init(){
    ensureModelViewer();
    initialiseHeroField();
    animateHeroStats();
    const modal = createModal();
    setupRails(modal);
    setupProjectButtons(modal);
    whenModelViewerReady().then(() => tintExistingModelViewers());
  }

  function ensureModelViewer(){
    if (typeof customElements === 'undefined') return;
    if (customElements.get('model-viewer')) return;
    const scripts = Array.from(document.querySelectorAll('script[src]'));
    const hasModule = scripts.some(script => script.src.includes('model-viewer.min.js'));
    const hasLegacy = scripts.some(script => script.src.includes('model-viewer-legacy.js'));
    if (!hasModule){
      const loader = document.createElement('script');
      loader.type = 'module';
      loader.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
      loader.defer = true;
      document.head.appendChild(loader);
    }
    if (!hasLegacy){
      const legacy = document.createElement('script');
      legacy.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js';
      legacy.setAttribute('nomodule', '');
      legacy.dataset.modelViewer = 'legacy';
      document.head.appendChild(legacy);
    }
  }

  function initialiseHeroField(){
    const canvas = document.getElementById('portfolioField');
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const factory = window.createFluxField;
    if (typeof factory !== 'function') return;
    const exclusionElement = document.querySelector('[data-field-exclusion]');
    factory(canvas, {
      density: 150,
      maxDensity: 320,
      baseConnection: 140,
      enhancedConnection: 240,
      pointerRadius: 230,
      pointerForce: 0.052,
      pointerLineOpacity: 0.6,
      driftScale: 0.28,
      backgroundStops: [
        ['rgba(255,255,255,0.98)', 0],
        ['rgba(231,225,209,0.28)', 1]
      ],
      lineColor: 'rgba(43,47,51,0.45)',
      dotColor: 'rgba(43,47,51,0.35)',
      exclusionElement,
      exclusionPadding: 36,
      exclusionMargin: 64,
      exclusionForce: 0.026,
      exclusionStep: 10
    });
  }

  function animateHeroStats(){
    const statElements = document.querySelectorAll('.hero-stats [data-stat]');
    if (!statElements.length) return;
    const mapping = {
      automotive: 'Automotive',
      cad: 'CAD',
      electrical: 'Computer & Electrical'
    };

    statElements.forEach(stat => {
      const key = mapping[stat.dataset.stat] || stat.dataset.stat;
      const target = Projects.countByCategory(key);
      const valueEl = stat.querySelector('.stat-value');
      if (!valueEl) return;
      animateNumber(valueEl, target);
    });
  }

  function animateNumber(element, target){
    const duration = 900;
    const startTime = performance.now();
    const startValue = 0;
    const endValue = Number.isFinite(target) ? target : 0;

    function frame(now){
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(startValue + (endValue - startValue) * eased);
      element.textContent = value.toString();
      if (progress < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }

  function setupRails(modal){
    const rails = document.querySelectorAll('[data-project-rail]');
    rails.forEach((rail, index) => initialiseRail(rail, modal, index));
  }

  function initialiseRail(rail, modal, index){
    const windowEl = rail.querySelector('.rail-window');
    const track = rail.querySelector('.rail-track');
    if (!(windowEl instanceof HTMLElement) || !(track instanceof HTMLElement)) return;

    const cards = Array.from(track.querySelectorAll('.project-card'));
    if (!cards.length) return;

    cards.forEach((card, idx) => {
      card.setAttribute('tabindex', idx === 0 ? '0' : '-1');
      card.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');
      if (idx === 0) card.classList.add('is-active');
    });

    let controls = rail.querySelector('.rail-controls');
    if (!(controls instanceof HTMLElement)){
      controls = document.createElement('div');
      controls.className = 'rail-controls';
      const label = document.createElement('div');
      label.className = 'rail-label';
      label.textContent = rail.dataset.railLabel || `Collection ${index + 1}`;
      if (!rail.hasAttribute('role')){
        rail.setAttribute('role', 'region');
      }
      rail.setAttribute('aria-label', label.textContent);
      const progress = document.createElement('div');
      progress.className = 'rail-progress';
      const bar = document.createElement('div');
      bar.className = 'rail-progress__bar';
      progress.appendChild(bar);
      const buttons = document.createElement('div');
      buttons.className = 'rail-buttons';
      const prev = document.createElement('button');
      prev.type = 'button';
      prev.innerHTML = '←';
      prev.setAttribute('aria-label', 'Scroll backward');
      prev.dataset.dir = 'prev';
      const next = document.createElement('button');
      next.type = 'button';
      next.innerHTML = '→';
      next.setAttribute('aria-label', 'Scroll forward');
      next.dataset.dir = 'next';
      buttons.append(prev, next);
      controls.append(label, progress, buttons);
      rail.insertBefore(controls, rail.firstChild);
    }

    let live = rail.querySelector('.rail-live-region');
    if (!(live instanceof HTMLElement)){
      live = document.createElement('div');
      live.className = 'visually-hidden rail-live-region';
      live.setAttribute('aria-live', 'polite');
      rail.appendChild(live);
    }

    const progressBar = controls.querySelector('.rail-progress__bar');
    const prevBtn = controls.querySelector('button[data-dir="prev"]');
    const nextBtn = controls.querySelector('button[data-dir="next"]');

    const getGap = () => {
      const style = window.getComputedStyle(track);
      return parseFloat(style.columnGap || style.gap || '0');
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const card = entry.target;
        if (!(card instanceof HTMLElement)) return;
        if (entry.isIntersecting){
          card.classList.add('is-active');
          card.setAttribute('tabindex', '0');
          card.setAttribute('aria-hidden', 'false');
          const title = card.querySelector('.project-kicker');
          if (title){
            live.textContent = `${title.textContent.trim()} visible`;
          }
        } else {
          card.classList.remove('is-active');
          card.setAttribute('tabindex', '-1');
          card.setAttribute('aria-hidden', 'true');
        }
      });
    }, {
      root: windowEl,
      threshold: 0.6
    });

    cards.forEach(card => observer.observe(card));

    function updateProgress(){
      const maxScroll = Math.max(1, windowEl.scrollWidth - windowEl.clientWidth);
      const ratio = Math.min(1, Math.max(0, windowEl.scrollLeft / maxScroll));
      if (progressBar) progressBar.style.transform = `scaleX(${ratio || 0})`;
      if (prevBtn) prevBtn.disabled = windowEl.scrollLeft <= 2;
      if (nextBtn) nextBtn.disabled = windowEl.scrollLeft >= maxScroll - 2;
    }

    const handleScroll = () => requestAnimationFrame(updateProgress);
    windowEl.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    updateProgress();

    const scrollByCard = direction => {
      const first = cards[0];
      if (!first) return;
      const gap = getGap();
      const cardWidth = first.getBoundingClientRect().width + gap;
      const distance = direction * cardWidth;
      windowEl.scrollBy({ left: distance, behavior: 'smooth' });
    };

    prevBtn?.addEventListener('click', () => scrollByCard(-1));
    nextBtn?.addEventListener('click', () => scrollByCard(1));

    rail.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft'){
        event.preventDefault();
        scrollByCard(-1);
      } else if (event.key === 'ArrowRight'){
        event.preventDefault();
        scrollByCard(1);
      }
    });
  }

  function setupProjectButtons(modal){
    const buttons = document.querySelectorAll('button.project-action[data-project]');
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const id = button.dataset.project;
        if (!id || !Projects.has(id) || !modal) return;
        const project = Projects.get(id);
        const context = collectContext(button.closest('.project-card'));
        modal.open(project, context);
      });
    });
  }

  function collectContext(card){
    if (!(card instanceof HTMLElement)) return { collection: [] };
    const rail = card.closest('[data-project-rail]');
    if (!rail) return { collection: [] };
    const cards = Array.from(rail.querySelectorAll('.project-card'));
    const collection = cards
      .map(entry => {
        const id = entry.dataset.projectId || entry.querySelector('[data-project]')?.dataset.project;
        const label = entry.querySelector('.project-kicker')?.textContent?.trim() || '';
        return id ? { id, label } : null;
      })
      .filter(Boolean);
    return { collection };
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
        if (body){
          body.innerHTML = '';
          const hasGallery = Array.isArray(project.gallery) && project.gallery.length > 0;
          if (hasGallery){
            body.appendChild(renderGallery(project.gallery, project.title));
          }
          if (Array.isArray(project.description) && project.description.length){
            const description = renderDescription(project.description);
            if (description) body.appendChild(description);
          }
          const actionLinks = [];
          const reportLink = renderReportCTA(project);
          if (reportLink) actionLinks.push(reportLink);
          if (hasGallery && shouldShowGalleryCTA(project)){
            actionLinks.push(renderGalleryCTA(project));
          }
          if (actionLinks.length){
            const actionsWrapper = document.createElement('div');
            actionsWrapper.className = 'modal-actions';
            actionLinks.forEach(link => actionsWrapper.appendChild(link));
            body.appendChild(actionsWrapper);
          }
          if (project.model){
            body.appendChild(renderModel(project));
          }
          if (project.note){
            const note = document.createElement('div');
            note.className = 'modal-note';
            note.textContent = project.note;
            body.appendChild(note);
          }
          if (context.collection && context.collection.length > 1){
            body.appendChild(renderCollectionNav(context.collection, project.id, api));
          }
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

  function renderGallery(items, title){
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-gallery';
    items.forEach(item => {
      const figure = document.createElement('figure');
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt || title || '';
      img.loading = 'lazy';
      figure.appendChild(img);
      wrapper.appendChild(figure);
    });
    return wrapper;
  }

  function renderDescription(paragraphs){
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-description';
    paragraphs.forEach(copy => {
      if (!copy) return;
      const paragraph = document.createElement('p');
      paragraph.textContent = copy;
      wrapper.appendChild(paragraph);
    });
    return wrapper.childElementCount ? wrapper : null;
  }

  function renderGalleryCTA(project){
    const link = document.createElement('a');
    link.className = 'btn-primary modal-gallery-link';
    link.href = `gallery.html?id=${encodeURIComponent(project.id)}`;
    link.textContent = 'View full gallery';
    link.setAttribute('aria-label', `View the full gallery for ${project.title}`);
    return link;
  }

  function renderReportCTA(project){
    const spec = project?.report;
    if (!spec || !spec.href) return null;
    const link = document.createElement('a');
    link.className = 'btn-primary modal-report-link';
    link.href = `report.html?id=${encodeURIComponent(project.id)}`;
    link.textContent = spec.label || 'View full report';
    const label = spec.label || 'View full report';
    link.setAttribute('aria-label', `${label} for ${project.title}`);
    return link;
  }

  function shouldShowGalleryCTA(project){
    if (!project) return false;
    if (project.showGalleryCTA === false) return false;
    if (project.showGalleryCTA === true) return true;
    return Array.isArray(project.gallery) && project.gallery.length > 0;
  }
  
  function renderModel(project){
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-viewer';
    const spec = project.model;
    if (!spec || !spec.src){
      const placeholder = document.createElement('div');
      placeholder.className = 'viewer-placeholder';
      placeholder.innerHTML = '<strong>3D model coming soon</strong>';
      wrapper.appendChild(placeholder);
      return wrapper;
    }

    const inlineViewer = project.id ? document.querySelector(`[data-project-id="${project.id}"] model-viewer`) : null;
    const viewer = inlineViewer ? inlineViewer.cloneNode(false) : document.createElement('model-viewer');
    viewer.setAttribute('src', spec.src);
    viewer.setAttribute('camera-controls', '');
    viewer.setAttribute('touch-action', 'pan-y');
    viewer.setAttribute('loading', 'eager');
    viewer.setAttribute('reveal', 'auto');
    viewer.setAttribute('interaction-prompt', 'auto');
    viewer.setAttribute('shadow-intensity', spec.shadowIntensity || '0.8');
    viewer.setAttribute('exposure', spec.exposure || '1.0');
    viewer.setAttribute('alt', spec.alt || project.title);
    if (spec.poster) viewer.setAttribute('poster', spec.poster); else viewer.removeAttribute('poster');
    if (spec.autoRotate) viewer.setAttribute('auto-rotate', ''); else viewer.removeAttribute('auto-rotate');
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
      wrapper.innerHTML = '';
      wrapper.appendChild(placeholder);
    }, { once: true });

    registerSlateTint(viewer);
    
    wrapper.appendChild(viewer);
    return wrapper;
  }

  function renderCollectionNav(collection, activeId, modalApi){
    const wrapper = document.createElement('div');
    wrapper.className = 'modal-collection';
    const label = document.createElement('span');
    label.className = 'modal-collection__label';
    label.textContent = 'More from this set';
    wrapper.appendChild(label);
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
      wrapper.appendChild(btn);
    });
    return wrapper;
  }

  function getFocusableElements(root){
    if (!(root instanceof HTMLElement)) return [];
    const focusableSelectors = [
      'a[href]', 'button:not([disabled])', 'textarea', 'input', 'select', '[tabindex]:not([tabindex="-1"])'
    ];
    const focusables = Array.from(root.querySelectorAll(focusableSelectors.join(',')));
    return focusables.filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
  }
})();
