(function(){
  const PROJECT_DATA = {
    'bronco-289': {
      title: '1968 Ford Bronco — 289 CID',
      category: 'Automotive',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Illustration standing in for drivetrain work on the 1968 Bronco 289 build.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for the refreshed chassis of the 1968 Bronco.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for interior refinishing on the 1968 Bronco.' }
      ],
      note: 'Swap these placeholders with build photos (minimum 1280px wide) to showcase the restoration stages. Add as many images as you like; they will display in a scrollable row.'
    },
    'bronco-coyote': {
      title: '1968 Ford Bronco — 5.0L Gen 4x Coyote',
      category: 'Automotive',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for the finished Bronco exterior.' }
      ],
      note: 'Drop high-resolution images into an appropriate folder (for example images/bronco-coyote/) and update the entries in portfolio.js to point to them.'
    },
    'jeep-cj5': {
      title: '1974 Jeep CJ5 — 304 CID',
      category: 'Automotive',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder view showing the Jeep CJ5 frame-off restoration.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image of the CJ5 powertrain.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image highlighting the CJ5 suspension updates.' }
      ],
      note: 'Add fabrication and trail-testing photos here to emphasize durability upgrades.'
    },
    'nissan-350z': {
      title: '2003 Nissan 350Z — VQ35',
      category: 'Automotive',
      gallery: [
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image for the Nissan 350Z exterior refinements.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image showing the VQ35 engine bay updates.' },
        { src: 'images/placeholders/automotive-default.svg', alt: 'Placeholder image representing the 350Z suspension tuning.' }
      ],
      note: 'Replace with track-day shots, detail photos, and instrumentation close-ups to tell the full story.'
    },
    'cad-1': {
      title: 'Custom Horn Assembly',
      category: 'CAD',
      model: {
        src: 'assets/models/horn.glb',
        alt: 'Interactive preview of the custom horn assembly placeholder mesh',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Keep horn.gltf and its exported .bin companions together in assets/models so the viewer can load the CAD preview.',
        rotationPerSecond: '15deg',
        shadowIntensity: '0.8',
        exposure: '1.1'
      },
      note: 'Model exported as GLTF for use with the <model-viewer> component. Additional exploded views can be added as separate entries if needed.'
    },
    'cad-2': {
      title: 'Placeholder 2',
      category: 'CAD',
      model: {
        src: '',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Upload the finished CAD export (GLB/GLTF) and update this slot to preview it interactively.'
      },
      note: 'Include exploded positions or configurations by exporting separate GLB files if needed.'
    },
    'cad-3': {
      title: 'Placeholder 3',
      category: 'CAD',
      model: {
        src: '',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Once your GLB/GLTF is ready, reference it here to enable the interactive viewer.'
      },
      note: 'Keep polygon counts reasonable for smooth browser playback (generally < 200k faces).' 
    },
    'cad-4': {
      title: 'Placeholder 4',
      category: 'CAD',
      model: {
        src: '',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Link a GLB or GLTF file to give visitors a real-time view of this concept.'
      },
      note: 'Add optional annotation images to the gallery array if you want supporting callouts.'
    },
    'timer-police': {
      title: '555 Timer Police Light Circuit',
      category: 'Computer & Electrical',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder art for the 555 timer police light circuit board.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder showing the alternating light output of the 555 timer build.' }
      ],
      note: 'Show schematic captures, breadboard iterations, and final enclosure shots for extra clarity.'
    },
    'smart-mirror': {
      title: 'Alexa Integrated Smart Mirror',
      category: 'Computer & Electrical',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image for the smart mirror front panel.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image representing the electronics tray behind the mirror.' }
      ],
      note: 'Swap in UI states and wiring photos to highlight the Alexa integration and light diffusion.'
    },
    'led-eq': {
      title: 'Sound Reactive LED Equalizer',
      category: 'Computer & Electrical',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image for the sound reactive LED equalizer in action.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image showing the controller enclosure for the LED equalizer.' }
      ],
      note: 'Include short clips or sequential stills to demonstrate the FFT response once assets are available.'
    }
  };

  const modal = document.getElementById('projectModal');
  if (!modal) return;

  if (typeof customElements !== 'undefined' && !customElements.get('model-viewer')){
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
      const legacyLoader = document.createElement('script');
      legacyLoader.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer-legacy.js';
      legacyLoader.setAttribute('nomodule', '');
      legacyLoader.dataset.modelViewer = 'legacy';
      document.head.appendChild(legacyLoader);
    }
  }

  const desktopMq = window.matchMedia('(max-width: 900px)');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const gltfInspectionCache = new Map();

  function collectGltfUris(manifest){
    const entries = [];
    if (!manifest || typeof manifest !== 'object') return entries;
    const seen = new Set();
    const push = (uri, type) => {
      if (typeof uri !== 'string') return;
      const clean = uri.trim();
      if (!clean || clean.startsWith('data:') || seen.has(clean)) return;
      seen.add(clean);
      entries.push({ uri: clean, type });
    };
    if (Array.isArray(manifest.buffers)){
      manifest.buffers.forEach((buffer, index) => {
        if (buffer && typeof buffer === 'object') push(buffer.uri, `buffer #${index + 1}`);
      });
    }
    if (Array.isArray(manifest.images)){
      manifest.images.forEach((image, index) => {
        if (image && typeof image === 'object') push(image.uri, `image #${index + 1}`);
      });
    }
    return entries;
  }

  function inspectGltfManifest(src){
    if (typeof src !== 'string' || !src.trim() || !/\.gltf(?:[?#].*)?$/i.test(src)) return Promise.resolve(null);
    if (gltfInspectionCache.has(src)) return gltfInspectionCache.get(src);

    const task = (async () => {
      let gltfUrl;
      try {
        gltfUrl = new URL(src, window.location.href);
      } catch (err){
        return { references: [], basePath: '', error: 'invalid-url' };
      }

      const basePath = gltfUrl.href.replace(/[^/]+$/, '');

      if (window.location.protocol === 'file:'){
        return { references: [], basePath, error: 'file-protocol' };
      }

      let manifest;
      try {
        const response = await fetch(gltfUrl.href, { cache: 'no-store' });
        if (!response.ok) return { references: [], basePath, error: 'fetch-failed' };
        manifest = await response.json();
      } catch (err){
        return { references: [], basePath, error: 'fetch-failed' };
      }

      const refs = collectGltfUris(manifest);
      if (!refs.length) return { references: [], basePath, error: null };

      const results = await Promise.all(refs.map(async ref => {
        let absolute;
        try {
          absolute = new URL(ref.uri, gltfUrl);
        } catch (err){
          return { ...ref, status: 'invalid' };
        }

        try {
          const response = await fetch(absolute.href, { method: 'HEAD' });
          if (response.status >= 200 && response.status < 300){
            return { ...ref, status: 'found' };
          }
          if (response.status === 401 || response.status === 403 || response.status === 405){
            return { ...ref, status: 'unknown' };
          }
          return { ...ref, status: 'missing' };
        } catch (err){
          return { ...ref, status: 'missing' };
        }
      }));

      return { references: results, basePath, error: null };
    })();

    gltfInspectionCache.set(src, task);
    return task;
  }

  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const closeButtons = modal.querySelectorAll('[data-close]');

  const projectButtons = Array.from(document.querySelectorAll('.project-more'));
  let activeModalObserver = null;
  let activeModalScrollHandler = null;
  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.project;
      if (!id || btn.dataset.animating === 'true') return;
      btn.dataset.animating = 'true';
      const card = btn.closest('.project-card');
      const carousel = card?.closest('[data-carousel]');
      const shouldAnimate = !!card && !!carousel && carousel.classList.contains('carousel-active') && !desktopMq.matches;

      const summaryText = card?.querySelector('.project-summary')?.textContent?.trim() || '';
      const collection = carousel ? Array.from(carousel.querySelectorAll('.project-card')).map(projectCard => {
        const projectId = projectCard.dataset.projectId || projectCard.querySelector('.project-more')?.dataset.project;
        if (!projectId) return null;
        return {
          id: projectId,
          summary: projectCard.querySelector('.project-summary')?.textContent?.trim() || ''
        };
      }).filter(Boolean) : [];


      const done = () => {
        delete btn.dataset.animating;
      };

      const modalOptions = {
        collection,
        summary: summaryText
      };

      if (shouldAnimate){
        animateCardToModal(card).then(() => {
          openModal(id, modalOptions);
          done();
        });
      } else {
        openModal(id, modalOptions);
        done();
      }
    });
  });

  closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', evt => {
    if (evt.target instanceof HTMLElement && evt.target.dataset.close !== undefined){
      closeModal();
    }
  });

  document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  function normaliseCollection(collection, fallbackId, fallbackSummary){
    const output = [];
    const seen = new Set();

    if (Array.isArray(collection)){
      collection.forEach(entry => {
        if (!entry || typeof entry !== 'object') return;
        const key = entry.id;
        if (!key || seen.has(key) || !PROJECT_DATA[key]) return;
        seen.add(key);
        output.push({
          id: key,
          summary: typeof entry.summary === 'string' ? entry.summary : ''
        });
      });
    }

    if (fallbackId && PROJECT_DATA[fallbackId] && !seen.has(fallbackId)){
      output.unshift({ id: fallbackId, summary: typeof fallbackSummary === 'string' ? fallbackSummary : '' });
    }

    return output;
  }

  function appendProjectContent(target, project){
    if (!project) return;


    if (Array.isArray(project.gallery) && project.gallery.length){
      const gallery = document.createElement('div');
      gallery.className = 'modal-gallery';

      project.gallery.forEach(item => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.alt || project.title;
        img.loading = 'lazy';
        figure.appendChild(img);
        if (item.caption){
          const cap = document.createElement('figcaption');
          cap.textContent = item.caption;
          cap.style.padding = '12px 16px';
          cap.style.fontSize = '.92rem';
          cap.style.background = 'rgba(255,255,255,.88)';
          cap.style.color = 'var(--slate)';
          figure.appendChild(cap);
        }
        gallery.appendChild(figure);
      });

      target.appendChild(gallery);
    }

    if (project.model){
      const viewerShell = document.createElement('div');
      viewerShell.className = 'modal-viewer';

      if (project.model.src){
        const viewer = document.createElement('model-viewer');
        viewer.setAttribute('src', project.model.src);
        viewer.setAttribute('camera-controls', '');
        viewer.setAttribute('shadow-intensity', project.model.shadowIntensity || '0.75');
        viewer.setAttribute('touch-action', 'pan-y');
        viewer.setAttribute('exposure', project.model.exposure || '1.1');
        viewer.setAttribute('interaction-prompt', 'auto');
        viewer.setAttribute('reveal', 'auto');
        viewer.setAttribute('camera-orbit', project.model.cameraOrbit || 'auto auto auto');
        viewer.setAttribute('alt', project.model.alt || project.title || 'Interactive 3D model');
        if (project.model.alt) viewer.setAttribute('alt', project.model.alt);
        if (project.model.autoRotate) viewer.setAttribute('auto-rotate', '');
        if (project.model.rotationPerSecond) viewer.setAttribute('rotation-per-second', project.model.rotationPerSecond);
        if (project.model.poster) viewer.setAttribute('poster', project.model.poster);
        viewer.addEventListener('error', () => {
          const placeholder = document.createElement('div');
          placeholder.className = 'viewer-placeholder';
          const heading = document.createElement('strong');
          heading.textContent = '3D model unavailable';
          const description = document.createElement('p');
          description.className = 'viewer-placeholder__status';
          description.textContent = project.model.message || 'Link a .glb or .gltf file to enable the viewer.';
          placeholder.appendChild(heading);
          placeholder.appendChild(description);

          const src = project.model.src;
          inspectGltfManifest(src).then(info => {
            if (!info) return;
            const status = document.createElement('p');
            status.className = 'viewer-placeholder__status';

            if (info.error === 'file-protocol'){
              status.textContent = 'Open this page through a local web server (http:// or https://) so companion files can be inspected automatically.';
              placeholder.appendChild(status);
              return;
            }

            if (info.error === 'invalid-url'){
              status.textContent = 'The GLTF path could not be resolved. Double-check the src attribute for typos or unsupported characters.';
              placeholder.appendChild(status);
              return;
            }

            if (info.error === 'fetch-failed'){
              status.textContent = 'The GLTF manifest could not be downloaded to verify its companion files. Make sure the file path is correct.';
              placeholder.appendChild(status);
              return;
            }

            if (info.error){
              status.textContent = 'The GLTF manifest could not be parsed. Ensure the export is valid JSON.';
              placeholder.appendChild(status);
              return;
            }

            const references = Array.isArray(info.references) ? info.references : [];
            if (!references.length){
              status.textContent = 'This GLTF does not reference external buffers or textures. If loading still fails, re-export the asset.';
              placeholder.appendChild(status);
              return;
            }

            status.textContent = 'The GLTF references these companion files:';
            placeholder.appendChild(status);

            const list = document.createElement('ul');
            list.className = 'viewer-placeholder__refs';
            const missing = [];
            const statusLabels = {
              found: 'found',
              missing: 'missing',
              unknown: 'check manually',
              invalid: 'invalid path'
            };

            references.forEach(ref => {
              const item = document.createElement('li');
              const file = document.createElement('code');
              file.textContent = ref.uri;
              item.appendChild(file);
              if (ref.type){
                const type = document.createElement('span');
                type.className = 'viewer-placeholder__ref-type';
                type.textContent = ` (${ref.type})`;
                item.appendChild(type);
              }
              item.appendChild(document.createTextNode(' — '));
              const key = statusLabels[ref.status] ? ref.status : 'unknown';
              if (key === 'missing') missing.push(ref.uri);
              const statusTag = document.createElement('span');
              statusTag.dataset.status = key;
              statusTag.className = 'viewer-placeholder__ref-status';
              statusTag.textContent = statusLabels[key];
              item.appendChild(statusTag);
              list.appendChild(item);
            });

            placeholder.appendChild(list);

            const baseDir = (src.split('/').slice(0, -1).join('/') || '.') + '/';
            const followUp = document.createElement('p');
            followUp.className = 'viewer-placeholder__status';
            if (missing.length){
              followUp.appendChild(document.createTextNode(`Upload the missing file${missing.length > 1 ? 's' : ''} `));
              missing.forEach((name, index) => {
                if (index > 0) followUp.appendChild(document.createTextNode(', '));
                const code = document.createElement('code');
                code.textContent = name;
                followUp.appendChild(code);
              });
              followUp.appendChild(document.createTextNode(' to '));
              const dirCode = document.createElement('code');
              dirCode.textContent = baseDir;
              followUp.appendChild(dirCode);
              followUp.appendChild(document.createTextNode(' so the viewer can stream the geometry.'));
            } else {
              followUp.appendChild(document.createTextNode('Deploy each companion file alongside '));
              const fileCode = document.createElement('code');
              fileCode.textContent = src.split('/').pop() || src;
              followUp.appendChild(fileCode);
              followUp.appendChild(document.createTextNode(' (folder: '));
              const dirCode = document.createElement('code');
              dirCode.textContent = baseDir;
              followUp.appendChild(dirCode);
              followUp.appendChild(document.createTextNode(').'));
            }
            placeholder.appendChild(followUp);
          }).catch(() => {
            const status = document.createElement('p');
            status.className = 'viewer-placeholder__status';
            status.textContent = 'Unable to inspect the GLTF manifest for companion assets.';
            placeholder.appendChild(status);
          });
          viewer.replaceWith(placeholder);
        }, { once: true });
        viewerShell.appendChild(viewer);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'viewer-placeholder';
        placeholder.innerHTML = `<strong>3D model coming soon</strong>${project.model.message || 'Link a .glb or .gltf file to enable the viewer.'}`;
        viewerShell.appendChild(placeholder);
      }

      target.appendChild(viewerShell);
    }

    if (project.note){
      const note = document.createElement('div');
      note.className = 'modal-note';
      note.innerHTML = `<strong>Next steps</strong>${project.note}`;
      target.appendChild(note);
    }
  }

  function openModal(id, options = {}){
    const project = PROJECT_DATA[id];
    if (!project) return;

    if (activeModalObserver){
      activeModalObserver.disconnect();
      activeModalObserver = null;
    }

    if (typeof activeModalScrollHandler === 'function'){
      modalBody.removeEventListener('scroll', activeModalScrollHandler);
      activeModalScrollHandler = null;
    }

    const collection = normaliseCollection(options.collection, id, options.summary);
    const hasCollection = collection.length > 1;
    const categoryLabel = project.category || 'Projects';
    const instructionsTail = hasCollection ? ` Scroll to explore the rest of the ${(categoryLabel || 'project').toLowerCase()} collection.` : '';

    modalTitle.textContent = hasCollection ? `${categoryLabel} Collection` : project.title;
    const subtitle = hasCollection ? `Currently viewing ${project.title}.${instructionsTail}` : (project.category || project.subtitle || `Currently viewing ${project.title}.`);
    modalSubtitle.textContent = subtitle;
    modalSubtitle.hidden = !subtitle;

    modalBody.innerHTML = '';
    modalBody.scrollTop = 0;

    const navButtons = new Map();
    const sectionById = new Map();

    if (hasCollection){
      const nav = document.createElement('div');
      nav.className = 'modal-collection-nav';
      collection.forEach(entry => {
        const proj = PROJECT_DATA[entry.id];
        if (!proj) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'modal-collection-chip';
        button.textContent = proj.title;
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => {
          const target = sectionById.get(entry.id);
          if (target){
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
        nav.appendChild(button);
        navButtons.set(entry.id, button);
      });
      modalBody.appendChild(nav);
    }

    const collectionWrap = document.createElement('div');
    collectionWrap.className = 'modal-collection';

    collection.forEach(entry => {
      const proj = PROJECT_DATA[entry.id];
      if (!proj) return;

      const section = document.createElement('article');
      section.className = 'modal-project';
      section.dataset.projectId = entry.id;
      section.id = `modal-${entry.id}`;

      const head = document.createElement('header');
      head.className = 'modal-project-head';
      const heading = document.createElement('h3');
      heading.textContent = proj.title;
      head.appendChild(heading);

      const summaryText = entry.summary || '';
      if (summaryText){
        const summaryEl = document.createElement('p');
        summaryEl.className = 'modal-project-summary';
        summaryEl.textContent = summaryText;
        head.appendChild(summaryEl);
      }

      section.appendChild(head);
      appendProjectContent(section, proj);
      collectionWrap.appendChild(section);
      sectionById.set(entry.id, section);
    });

    modalBody.appendChild(collectionWrap);

    const setActive = projectId => {
      const currentProject = PROJECT_DATA[projectId];
      sectionById.forEach((section, key) => {
        const isActive = key === projectId;
        section.classList.toggle('is-active', isActive);
      });
      navButtons.forEach((button, key) => {
        const isActive = key === projectId;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
      if (currentProject && hasCollection){
        modalSubtitle.textContent = `Currently viewing ${currentProject.title}.${instructionsTail}`;
        modalSubtitle.hidden = false;
      }
    };

    setActive(id);

    if (hasCollection){
      const activeSection = sectionById.get(id);
      if (activeSection){
        activeSection.scrollIntoView({ block: 'start' });
      }

      if ('IntersectionObserver' in window){
        const observer = new IntersectionObserver(entries => {
          const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => a.target.offsetTop - b.target.offsetTop)
            .shift();
          if (!visible || !visible.target.dataset.projectId) return;
          setActive(visible.target.dataset.projectId);
        }, {
          root: modalBody,
          threshold: 0.45
        });
        sectionById.forEach(section => observer.observe(section));
        activeModalObserver = observer;
      } else {
        const onScroll = () => {
          let closestId = id;
          let closestDistance = Number.POSITIVE_INFINITY;
          sectionById.forEach(section => {
            const bounds = section.getBoundingClientRect();
            const containerBounds = modalBody.getBoundingClientRect();
            const distance = Math.abs(bounds.top - containerBounds.top - 100);
            if (distance < closestDistance){
              closestDistance = distance;
              closestId = section.dataset.projectId || closestId;
            }
          });
          setActive(closestId);
        };
        modalBody.addEventListener('scroll', onScroll, { passive: true });
        activeModalScrollHandler = onScroll;
      }
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    const closeButton = modal.querySelector('.modal-close');
    closeButton?.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (activeModalObserver){
      activeModalObserver.disconnect();
      activeModalObserver = null;
    }
    if (typeof activeModalScrollHandler === 'function'){
      modalBody.removeEventListener('scroll', activeModalScrollHandler);
      activeModalScrollHandler = null;
    }
  }

  initProjectCarousels();

  function initProjectCarousels(){
    const carousels = Array.from(document.querySelectorAll('[data-carousel]'));
    if (!carousels.length) return;

    const mq = desktopMq;

    const mqListener = () => {
      carousels.forEach(instance => instance.dispatchEvent(new CustomEvent('carousel:refresh')));
    };

    if (typeof mq.addEventListener === 'function') mq.addEventListener('change', mqListener);
    else if (typeof mq.addListener === 'function') mq.addListener(mqListener);

    carousels.forEach(grid => setupCarousel(grid, mq));
  }

  function setupCarousel(grid, mq){
    const cards = Array.from(grid.querySelectorAll('.project-card'));
    if (cards.length <= 1) return;

    grid.setAttribute('tabindex', '0');
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-roledescription', '3D carousel of projects');
    
    const controls = document.createElement('div');
    controls.className = 'carousel-controls';

    const prevBtn = document.createElement('button');
    prevBtn.type = 'button';
    prevBtn.className = 'carousel-control carousel-control--prev';
    prevBtn.innerHTML = '<span aria-hidden="true">←</span><span class="visually-hidden">Previous project</span>';

    const status = document.createElement('div');
    status.className = 'carousel-status';
    status.setAttribute('aria-live', 'polite');
    status.setAttribute('aria-atomic', 'true');

    const nextBtn = document.createElement('button');
    nextBtn.type = 'button';
    nextBtn.className = 'carousel-control carousel-control--next';
    nextBtn.innerHTML = '<span class="visually-hidden">Next project</span><span aria-hidden="true">→</span>';

    controls.appendChild(prevBtn);
    controls.appendChild(status);
    controls.appendChild(nextBtn);

    grid.insertAdjacentElement('afterend', controls);

    let state = {
      index: 0,
      total: cards.length
    };

    const AUTO_INTERVAL = 5200;
    const RESUME_DELAY = 9000;
    let autoRotateTimer = null;
    let resumeTimer = null;
    const WHEEL_THROTTLE_MS = 360;
    let lastWheelEventTime = 0;
    
    function stopAutoRotate(){
      if (autoRotateTimer !== null){
        window.clearInterval(autoRotateTimer);
        autoRotateTimer = null;
      }
    }

    function clearResumeTimer(){
      if (resumeTimer !== null){
        window.clearTimeout(resumeTimer);
        resumeTimer = null;
      }
    }

    function startAutoRotate(){
      if (prefersReducedMotion.matches) return;
      if (mq.matches || !grid.classList.contains('carousel-active')) return;
      stopAutoRotate();
      clearResumeTimer();
      autoRotateTimer = window.setInterval(() => {
        if (mq.matches || !grid.classList.contains('carousel-active')) return;
        goTo(state.index + 1, { source: 'auto' });
      }, AUTO_INTERVAL);
    }

    function scheduleAutoResume(){
      clearResumeTimer();
      resumeTimer = window.setTimeout(() => {
        resumeTimer = null;
        startAutoRotate();
      }, RESUME_DELAY);
    }

    function pauseAutoRotate(){
      stopAutoRotate();
      scheduleAutoResume();
    }

    function updateAutoRotationState(){
      if (mq.matches || !grid.classList.contains('carousel-active') || prefersReducedMotion.matches){
        stopAutoRotate();
        clearResumeTimer();
        return;
      }
      if (autoRotateTimer === null && resumeTimer === null){
        startAutoRotate();
      }
    }

    const updateStatus = () => {
      const total = state.total;
      if (!total) return;
      const activeIndex = ((state.index % total) + total) % total;
      const label = cards[activeIndex]?.querySelector('h3')?.textContent?.trim();
      const fallback = `Project ${activeIndex + 1}`;
      status.textContent = label ? `${label} (${activeIndex + 1} of ${total})` : `${fallback} (${activeIndex + 1} of ${total})`;
    };

    const resizeObserver = ('ResizeObserver' in window) ? new ResizeObserver(() => {
      applyTransforms();
    }) : null;

    if (resizeObserver){
      resizeObserver.observe(grid);
      cards.forEach(card => resizeObserver.observe(card));
    } else {
      window.addEventListener('resize', () => {
        applyTransforms();
      });
    }

    grid.addEventListener('carousel:refresh', applyTransforms);

    grid.addEventListener('mouseenter', () => grid.classList.add('carousel-hover'));
    grid.addEventListener('mouseleave', () => grid.classList.remove('carousel-hover'));

    grid.addEventListener('wheel', evt => {
      if (mq.matches || !grid.classList.contains('carousel-active')) return;
      if (!grid.classList.contains('carousel-hover')) return;
      evt.preventDefault();
      const delta = Math.abs(evt.deltaY) > Math.abs(evt.deltaX) ? evt.deltaY : evt.deltaX;
      if (Math.abs(delta) < 12) return;
      const now = Date.now();
      if (now - lastWheelEventTime < WHEEL_THROTTLE_MS) return;
      lastWheelEventTime = now;
      const direction = delta > 0 ? 1 : -1;
      pauseAutoRotate();
      goTo(state.index + direction);
    }, { passive: false });

    grid.addEventListener('keydown', evt => {
      if (mq.matches || !grid.classList.contains('carousel-active')) return;
      if (evt.key === 'ArrowRight' || evt.key === 'PageDown'){
        evt.preventDefault();
        pauseAutoRotate();
        goTo(state.index + 1);
      } else if (evt.key === 'ArrowLeft' || evt.key === 'PageUp'){
        evt.preventDefault();
        pauseAutoRotate();
        goTo(state.index - 1);
      }
    });

    grid.addEventListener('pointerdown', () => {
      if (!mq.matches) pauseAutoRotate();
    });

    grid.addEventListener('focusin', () => {
      if (!mq.matches) pauseAutoRotate();
    });

    const focusGrid = () => {
      if (typeof grid.focus === 'function'){
        try {
          grid.focus({ preventScroll: true });
        } catch (err){
          grid.focus();
        }
      }
    };

    prevBtn.addEventListener('click', () => {
      pauseAutoRotate();
      goTo(state.index - 1);
      focusGrid();
    });

    nextBtn.addEventListener('click', () => {
      pauseAutoRotate();
      goTo(state.index + 1);
      focusGrid();
    });

    let touchStartX = null;
    let touchStartY = null;
    let touchActive = false;

    grid.addEventListener('touchstart', evt => {
      if (!mq.matches) return;
      if (evt.touches.length !== 1) return;
      const touch = evt.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchActive = true;
    }, { passive: true });

    grid.addEventListener('touchmove', evt => {
      if (!mq.matches || !touchActive) return;
      if (evt.touches.length !== 1 || touchStartX === null || touchStartY === null) return;
      const touch = evt.touches[0];
      const deltaX = touch.clientX - touchStartX;
      const deltaY = touch.clientY - touchStartY;
      if (Math.abs(deltaX) < 28 || Math.abs(deltaX) < Math.abs(deltaY)) return;
      evt.preventDefault();
      touchActive = false;
      pauseAutoRotate();
      if (deltaX < 0) goTo(state.index + 1);
      else if (deltaX > 0) goTo(state.index - 1);
      touchStartX = null;
      touchStartY = null;
    }, { passive: false });

    const resetTouch = () => {
      touchActive = false;
      touchStartX = null;
      touchStartY = null;
    };

    grid.addEventListener('touchend', resetTouch);
    grid.addEventListener('touchcancel', resetTouch);
    
    function goTo(nextIndex, options = {}){
      const total = state.total;
      state.index = (nextIndex % total + total) % total;
      applyTransforms();
      if (options.source !== 'auto' && !mq.matches) scheduleAutoResume();
    }

    function applyTransforms(){
      if (mq.matches){
        grid.classList.add('carousel-active');
        grid.classList.add('carousel-mobile');
        grid.style.overflow = 'visible';
        const containerWidth = grid.clientWidth || grid.offsetWidth || 0;
        const cardWidth = Math.min(Math.max(containerWidth * 0.78, 230), 460);
        const gap = Math.min(Math.max(containerWidth * 0.05, 14), 36);
        const heights = [];

        cards.forEach((card, idx) => {
          let relative = idx - state.index;
          relative = ((relative % state.total) + state.total) % state.total;
          if (relative > state.total / 2) relative -= state.total;
          const distance = Math.abs(relative);
          const isFront = distance === 0;
          const isNeighbor = distance === 1;
          const translateX = relative * (cardWidth + gap);

          card.style.transform = `translate(-50%, 0) translateX(${translateX.toFixed(1)}px)`;
          card.style.opacity = isFront ? '1' : isNeighbor ? '0.52' : '0';
          card.style.zIndex = String(isFront ? 900 : isNeighbor ? 600 : 200 - distance);
          card.style.filter = isFront ? 'brightness(1.02)' : 'brightness(0.82)';
          card.style.pointerEvents = (isFront || isNeighbor) ? 'auto' : 'none';
          card.style.width = `${Math.round(cardWidth)}px`;
          card.style.boxShadow = isFront ? 'var(--shadow-2)' : 'var(--shadow-1)';
          card.style.height = '';
          card.classList.toggle('is-front', isFront);
          card.classList.toggle('is-side', isNeighbor);
          if (isFront){
            card.removeAttribute('aria-hidden');
          } else {
            card.setAttribute('aria-hidden', 'true');
          }
          heights[idx] = card.scrollHeight;
        });
        
        const tallest = Math.max(...heights, 0);
        if (tallest){
          const heightPx = `${Math.ceil(tallest)}px`;
          grid.style.height = heightPx;
          cards.forEach(card => {
            card.style.height = heightPx;
          });
        } else {
          grid.style.height = '';
          cards.forEach(card => {
            card.style.height = '';
          });
        }

        updateStatus();
        return;
      }

      grid.classList.add('carousel-active');
      grid.classList.remove('carousel-mobile');
      grid.style.overflow = 'hidden';
      grid.style.height = '';

      const containerWidth = grid.clientWidth || grid.offsetWidth || 960;
      const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);
      const frontWidth = clampValue(containerWidth * 0.42, 300, 480);
      const sideWidth = clampValue(containerWidth * 0.22, 190, frontWidth * 0.7);
      const gap = clampValue(containerWidth * 0.028, 20, 40);
      const baseOffset = (frontWidth / 2) + (sideWidth / 2) + gap;

      const heights = [];
      
      cards.forEach((card, idx) => {
        let relative = idx - state.index;
        relative = ((relative % state.total) + state.total) % state.total;
        if (relative > state.total / 2) relative -= state.total;
        const absRelative = Math.abs(relative);
        const isFront = absRelative === 0;
        const isSide = absRelative === 1;
        const direction = relative === 0 ? 0 : (relative > 0 ? 1 : -1);

        let widthPx = frontWidth;
        let opacity = 0;
        let filter = 'brightness(0.76) saturate(0.9)';
        let rotateY = 0;
        let translateX = 0;
        let scale = 1;
        
        if (isFront){
          widthPx = frontWidth;
          opacity = 1;
          filter = 'brightness(1.02) saturate(1.01)';
          rotateY = 0;
          translateX = 0;
          scale = 1.01;
        } else if (isSide){
          widthPx = sideWidth;
          opacity = 0.58;
          filter = 'brightness(0.9) saturate(0.95)';
          rotateY = direction * -20;
          translateX = direction * (baseOffset - gap * 0.35);
          scale = 0.93;
        } else {
          widthPx = sideWidth * 0.8;
          opacity = 0.22;
          rotateY = direction * -32;
          const extra = baseOffset + (sideWidth * 0.7 + gap * 0.55) * (absRelative - 1);
          translateX = direction * extra;
          scale = 0.88;
        }

        const translate = `translate3d(-50%, -50%, 0) translateX(${translateX.toFixed(1)}px) rotateY(${rotateY}deg) scale(${scale.toFixed(3)})`;
        card.style.transform = translate;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = String(isFront ? 900 : isSide ? 600 : 200 - absRelative);
        card.style.filter = filter;
        card.style.pointerEvents = isFront || isSide ? 'auto' : 'none';
        card.style.width = `${Math.round(widthPx)}px`;
        card.style.boxShadow = isFront ? 'var(--shadow-2)' : 'var(--shadow-1)';
        card.classList.toggle('is-front', isFront);
        card.classList.toggle('is-side', isSide);
        if (isFront){
          card.style.pointerEvents = 'auto';
          card.removeAttribute('aria-hidden');
        } else if (isSide){
          card.style.pointerEvents = 'auto';
          card.removeAttribute('aria-hidden');
        } else {
          card.style.pointerEvents = 'none';
          card.setAttribute('aria-hidden', 'true');
        }
        card.style.height = 'auto';
        heights[idx] = card.scrollHeight;
      });
      const tallest = Math.max(...heights, 0);
      if (tallest){
        cards.forEach(card => {
          card.style.height = `${Math.ceil(tallest)}px`;
        });
      }
      updateStatus();
    }

    updateStatus();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden'){
        stopAutoRotate();
        clearResumeTimer();
      } else {
        updateAutoRotationState();
      }
    };

    const handleMotionPreference = () => {
      if (prefersReducedMotion.matches){
        stopAutoRotate();
        clearResumeTimer();
      } else {
        updateAutoRotationState();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    if (typeof prefersReducedMotion.addEventListener === 'function'){
      prefersReducedMotion.addEventListener('change', handleMotionPreference);
    } else if (typeof prefersReducedMotion.addListener === 'function'){
      prefersReducedMotion.addListener(handleMotionPreference);
    }

    goTo(0, { source: 'auto' });

    updateAutoRotationState();

    if (!prefersReducedMotion.matches){
      window.setTimeout(() => {
        updateAutoRotationState();
      }, 400);
    }

    cards.forEach((card, idx) => {
      card.addEventListener('click', evt => {
        if (evt.target instanceof HTMLElement && evt.target.closest('.project-more')) return;
        if (mq.matches){
          if (state.index === idx) return;
          evt.preventDefault();
          pauseAutoRotate();
          goTo(idx);
          return;
        }
        if (state.index === idx) return;
        evt.preventDefault();
        pauseAutoRotate();
        goTo(idx);
      });
    });
  }

  function animateCardToModal(card){
    return new Promise(resolve => {
      if (!(card instanceof HTMLElement)){
        resolve();
        return;
      }

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
        resolve();
        return;
      }

      const rect = card.getBoundingClientRect();
      const ghost = card.cloneNode(true);
      ghost.classList.add('project-card-ghost');
      ghost.style.top = `${rect.top}px`;
      ghost.style.left = `${rect.left}px`;
      ghost.style.width = `${rect.width}px`;
      ghost.style.height = `${rect.height}px`;
      ghost.style.transform = 'none';
      ghost.style.opacity = '1';
      ghost.style.transformOrigin = 'center center';
      const computedRadius = window.getComputedStyle(card).borderRadius || '24px';
      ghost.style.borderRadius = computedRadius;
      ghost.style.transition = 'top .62s cubic-bezier(.22, 1, .36, 1), left .62s cubic-bezier(.22, 1, .36, 1), width .62s cubic-bezier(.22, 1, .36, 1), height .62s cubic-bezier(.22, 1, .36, 1), transform .62s cubic-bezier(.22, 1, .36, 1), border-radius .62s ease, opacity .32s ease .42s';
      document.body.appendChild(ghost);
      card.classList.add('is-animating');

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        ghost.removeEventListener('transitionend', onTransitionEnd);
        ghost.remove();
        card.classList.remove('is-animating');
        resolve();
      };

      const onTransitionEnd = evt => {
        if (evt.target === ghost) finish();
      };

      ghost.addEventListener('transitionend', onTransitionEnd);

      requestAnimationFrame(() => {
        const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
        const maxWidth = Math.max(Math.min(window.innerWidth - 64, 920), 420);
        const maxHeight = Math.max(Math.min(window.innerHeight - 80, 640), 340);
        const targetWidth = clamp(Math.max(rect.width * 1.35, 420), 420, maxWidth);
        const targetHeight = clamp(Math.max(rect.height * 1.35, 360), 320, maxHeight);
        const targetLeft = Math.max((window.innerWidth - targetWidth) / 2, 32);
        const targetTop = Math.max((window.innerHeight - targetHeight) / 2, 32);

        ghost.style.top = `${targetTop}px`;
        ghost.style.left = `${targetLeft}px`;
        ghost.style.width = `${targetWidth}px`;
        ghost.style.height = `${targetHeight}px`;
        ghost.style.transform = 'translate3d(0, 0, 0) scale(1.03)';
        ghost.style.borderRadius = '28px';

        window.setTimeout(() => {
          ghost.style.opacity = '0';
          ghost.style.transform = 'translate3d(0, 0, 0) scale(1.01)';
        }, 420);
      });

      window.setTimeout(finish, 760);
    });
  }
})();
