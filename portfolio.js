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
        exposure: '1.1',
        autoRotate: true
      },
      note: 'Model exported as GLTF for use with the <model-viewer> component. Additional exploded views can be added as separate entries if needed.'
    },
    'cad-2': {
      title: 'Precision Bench Vice',
      category: 'CAD',
      model: {
        src: 'assets/models/bench_vice.glb',
        alt: 'Interactive preview of the precision bench vice assembly',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Place bench_vice.glb in assets/models. Include any separate texture files or .bin companions alongside the GLB if exported as GLTF.',
        shadowIntensity: '0.9',
        rotationPerSecond: '12deg',
        autoRotate: true,
        exposure: '1.05'
      },
      note: 'Highlight jaw inserts, guide rails, or stress relieved components by adding still renders to the gallery array if desired.'
    },
    'cad-3': {
      title: 'RC Car Chassis Study',
      category: 'CAD',
      model: {
        src: 'assets/models/rc_car.glb',
        alt: 'Interactive preview of the RC car chassis concept',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Copy rc_car.glb into assets/models. If your export references textures, keep them in the same folder for seamless loading.',
        shadowIntensity: '0.7',
        rotationPerSecond: '14deg',
        autoRotate: true,
        exposure: '1.0'
      },
      note: 'Consider appending suspension detail shots or annotated callouts via the gallery array to explain tuning decisions.'
    },
    'cad-4': {
      title: 'Cow Bell Casting Pattern',
      category: 'CAD',
      model: {
        src: 'assets/models/cowbell.glb',
        alt: 'Interactive preview of the cow bell casting pattern',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Drop cow_bell.glb into assets/models. Pair halves, cores, and gating as needed; <model-viewer> reads a single GLB bundle.',
        shadowIntensity: '0.65',
        rotationPerSecond: '10deg',
        autoRotate: true,
        exposure: '1.05'
      },
      note: 'Supplement with photos of the sand mold or finished casting by extending the gallery array for this entry.'
    },
    'cad-5': {
      title: 'Can Stamper Mechanism',
      category: 'CAD',
      model: {
        src: 'assets/models/can_stamper.glb',
        alt: 'Interactive preview of the can stamper mechanism',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Add can_stamper.glb to assets/models to animate the punch head and linkage in the viewer.',
        shadowIntensity: '0.8',
        rotationPerSecond: '11deg',
        autoRotate: true,
        exposure: '1.08'
      },
      note: 'Use the gallery to contrast exploded linkage positions or prototype photos that inspired the mechanism.'
    },
    'cad-6': {
      title: 'Modular Organizer System',
      category: 'CAD',
      model: {
        src: 'assets/models/organizer.glb',
        alt: 'Interactive preview of the modular organizer tray system',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Save organizer.glb in assets/models. Keep any additional textures beside it so inserts display correctly.',
        shadowIntensity: '0.75',
        rotationPerSecond: '13deg',
        autoRotate: true,
        exposure: '1.04'
      },
      note: 'Document alternative bin layouts or FDM print settings in the gallery to showcase modularity and ease of fabrication.'
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
      const slider = card?.closest('[data-slider]');

      const summaryText = card?.querySelector('.project-summary')?.textContent?.trim() || '';
      const collection = slider ? Array.from(slider.querySelectorAll('.project-card')).map(projectCard => {
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

      openModal(id, modalOptions);
      done();
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

  initProjectSliders();

  function initProjectSliders(){
    const sliders = Array.from(document.querySelectorAll('[data-slider]'));
    if (!sliders.length) return;
    let sequence = 0;
    sliders.forEach(slider => setupSlider(slider, ++sequence));
  }

  function setupSlider(root, sequence){
    if (!(root instanceof HTMLElement)) return;
    const track = root.querySelector('.slider-track');
    const windowEl = root.querySelector('.slider-window');
    if (!(track instanceof HTMLElement) || !(windowEl instanceof HTMLElement)) return;
    const slides = Array.from(track.querySelectorAll('.project-card')).filter(card => card instanceof HTMLElement);
    if (!slides.length) return;

    const sliderId = root.id || `project-slider-${sequence}`;
    if (!root.id) root.id = sliderId;
    root.dataset.sliderReady = 'true';

    let menu = root.querySelector('.slider-menu');
    if (!(menu instanceof HTMLElement)){
      menu = document.createElement('nav');
      menu.className = 'slider-menu';
      root.insertBefore(menu, windowEl);
    } else if (!menu.classList.contains('slider-menu')){
      menu.classList.add('slider-menu');
    }
    const menuLabel = root.dataset.sliderLabel || 'Projects';
    menu.setAttribute('aria-label', menuLabel);
    menu.setAttribute('role', 'tablist');
    menu.innerHTML = '';

    const menuViewport = document.createElement('div');
    menuViewport.className = 'slider-menu-viewport';
    menu.appendChild(menuViewport);
    
    let controls = root.querySelector('.slider-controls');
    if (!(controls instanceof HTMLElement)){
      controls = document.createElement('div');
      controls.className = 'slider-controls';
      controls.innerHTML = [
        '<button class="slider-arrow slider-arrow--prev" type="button" aria-label="Previous project"><span aria-hidden="true">←</span></button>',
        '<div class="slider-progress" role="presentation"><div class="slider-progress-bar"></div></div>',
        '<button class="slider-arrow slider-arrow--next" type="button" aria-label="Next project"><span aria-hidden="true">→</span></button>'
      ].join('');
      root.appendChild(controls);
    }

    const prevBtn = controls.querySelector('.slider-arrow--prev');
    const nextBtn = controls.querySelector('.slider-arrow--next');
    const progressBar = controls.querySelector('.slider-progress-bar');

    let liveRegion = root.querySelector('.slider-live');
    if (!(liveRegion instanceof HTMLElement)){
      liveRegion = document.createElement('div');
      liveRegion.className = 'visually-hidden slider-live';
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      root.appendChild(liveRegion);
    }

    const orientationMq = window.matchMedia('(min-width: 900px)');
    const updateOrientation = () => {
      menu.setAttribute('aria-orientation', orientationMq.matches ? 'vertical' : 'horizontal');
    };
    updateOrientation();
    if (typeof orientationMq.addEventListener === 'function'){
      orientationMq.addEventListener('change', updateOrientation);
    } else if (typeof orientationMq.addListener === 'function'){
      orientationMq.addListener(updateOrientation);
    }

    if (!root.hasAttribute('role')){
      root.setAttribute('role', 'group');
      root.setAttribute('aria-label', menuLabel);
    }

    const tabs = [];
    const total = slides.length;

    slides.forEach((slide, index) => {
      slide.style.flex = '0 0 100%';
      slide.style.maxWidth = '100%';
      slide.setAttribute('role', 'tabpanel');
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
      slide.tabIndex = index === 0 ? 0 : -1;

      const heading = slide.querySelector('h3');
      const title = heading?.textContent?.trim() || `Project ${index + 1}`;
      const panelId = slide.id || `${sliderId}-panel-${index + 1}`;
      slide.id = panelId;

      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'slider-menu-btn';
      tab.id = `${sliderId}-tab-${index + 1}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', panelId);
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
      tab.textContent = title;
      tab.setAttribute('aria-label', title);
      menuViewport.appendChild(tab);
      tabs.push(tab);

      slide.setAttribute('aria-labelledby', tab.id);
    });

    let activeIndex = 0;
    let pointerId = null;
    let startX = 0;
    let startY = 0;
    let dragOffset = 0;
    let dragging = false;

    const clampIndex = value => {
      if (!total) return 0;
      const remainder = value % total;
      return remainder < 0 ? remainder + total : remainder;
    };

    const announce = () => {
      if (!(liveRegion instanceof HTMLElement)) return;
      const activeSlide = slides[activeIndex];
      const title = activeSlide?.querySelector('h3')?.textContent?.trim() || `Project ${activeIndex + 1}`;
      liveRegion.textContent = `${title} (${activeIndex + 1} of ${total})`;
    };

    const syncHeight = () => {
      const activeSlide = slides[activeIndex];
      if (!(activeSlide instanceof HTMLElement)) return;
      const height = activeSlide.offsetHeight;
      if (height > 0){
        windowEl.style.height = `${height}px`;
      }
    };

    const setTransform = immediate => {
      const offset = -activeIndex * 100;
      if (immediate) track.classList.add('no-transition');
      track.style.transform = `translateX(${offset}%)`;
      if (immediate){
        requestAnimationFrame(() => {
          track.classList.remove('no-transition');
        });
      }
    };

    const updateActiveStates = () => {
      slides.forEach((slide, index) => {
        const isActive = index === activeIndex;
        slide.setAttribute('aria-hidden', isActive ? 'false' : 'true');
        slide.classList.toggle('is-active', isActive);
        slide.tabIndex = isActive ? 0 : -1;
      });

      tabs.forEach((tab, index) => {
        const isActive = index === activeIndex;
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.classList.toggle('is-active', isActive);
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      if (menuViewport instanceof HTMLElement){
        const activeTab = tabs[activeIndex];
        if (activeTab instanceof HTMLElement){
          const viewportTop = menuViewport.scrollTop;
          const viewportHeight = menuViewport.clientHeight;
          const tabTop = activeTab.offsetTop;
          const tabHeight = activeTab.offsetHeight;
          const padding = 32;
          const behavior = lastUpdateImmediate ? 'auto' : 'smooth';
          const scrollMenu = value => {
            if (typeof menuViewport.scrollTo === 'function'){
              try {
                menuViewport.scrollTo({ top: value, behavior });
                return;
              } catch (err){}
            }
            menuViewport.scrollTop = value;
          };
          if (tabTop < viewportTop + padding){
            const target = Math.max(0, tabTop - padding);
            scrollMenu(target);
          } else if ((tabTop + tabHeight) > (viewportTop + viewportHeight - padding)){
            const target = tabTop - viewportHeight + tabHeight + padding;
            scrollMenu(target);
          }
        }
      }

      if (progressBar instanceof HTMLElement){
        const percent = ((activeIndex + 1) / total) * 100;
        progressBar.style.width = `${percent}%`;
      }

      root.dataset.sliderIndex = String(activeIndex + 1);
      root.dataset.sliderTotal = String(total);
      announce();
      syncHeight();
    };

    const focusTab = index => {
      const target = tabs[index];
      if (!(target instanceof HTMLElement)) return;
      try {
        target.focus({ preventScroll: true });
      } catch (err){
        target.focus();
      }
    };

    const goTo = (index, options = {}) => {
      if (!total) return;
      const nextIndex = clampIndex(index);
      const immediate = options.immediate === true;
      if (nextIndex === activeIndex && !options.force){
        if (immediate){
          setTransform(true);
          syncHeight();
        }
        return;
      }
      activeIndex = nextIndex;
      setTransform(immediate);
      lastUpdateImmediate = immediate;
      updateActiveStates();
      if (options.focusTab) focusTab(activeIndex);
    };

    const goBy = (delta, options = {}) => {
      goTo(activeIndex + delta, options);
    };

    let autoPlayStopped = false;
    let autoPlayTimer = null;
    let autoPlayStartTimer = null;
    let autoPlayObserver = null;
    let autoPlayInView = false;
    const autoPlayDelay = 3600;
    const autoPlayInterval = 6000;
    const prefersReducedMotion = (typeof window.matchMedia === 'function') ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    let motionPreferenceListenerAttached = false;

    const clearAutoplayTimers = () => {
      if (autoPlayTimer !== null){
        window.clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
      if (autoPlayStartTimer !== null){
        window.clearTimeout(autoPlayStartTimer);
        autoPlayStartTimer = null;
      }
    };

    const scheduleAutoplay = () => {
      if (autoPlayStopped) return;
      clearAutoplayTimers();
      if (prefersReducedMotion && prefersReducedMotion.matches) return;
      autoPlayStartTimer = window.setTimeout(() => {
        if (autoPlayStopped) return;
        if (prefersReducedMotion && prefersReducedMotion.matches) return;
        autoPlayTimer = window.setInterval(() => {
          if (autoPlayStopped) return;
          if (typeof document !== 'undefined' && document.hidden) return;
          goBy(1);
        }, autoPlayInterval);
      }, autoPlayDelay);
    };

    const pauseAutoplay = () => {
      clearAutoplayTimers();
    };

    const onVisibilityChange = () => {
      if (autoPlayStopped) return;
      if (typeof document !== 'undefined' && document.hidden){
        pauseAutoplay();
      } else if (autoPlayInView){
        scheduleAutoplay();
      }
    };

    const disableAutoplay = () => {
      if (autoPlayStopped) return;
      autoPlayStopped = true;
      clearAutoplayTimers();
      if (autoPlayObserver){
        autoPlayObserver.disconnect();
        autoPlayObserver = null;
      }
      if (typeof document !== 'undefined'){
        document.removeEventListener('visibilitychange', onVisibilityChange);
      }
      removeMotionPreferenceListener();
      root.classList.add('slider-manual');
    };

    const noteManualControl = () => {
      disableAutoplay();
    };

    if (typeof document !== 'undefined'){
      document.addEventListener('visibilitychange', onVisibilityChange);
    }

    const handleMotionPreference = event => {
      if (!event) return;
      if (event.matches){
        clearAutoplayTimers();
      } else if (!autoPlayStopped && autoPlayInView){
        scheduleAutoplay();
      }
    };

    const addMotionPreferenceListener = () => {
      if (!prefersReducedMotion || motionPreferenceListenerAttached) return;
      if (typeof prefersReducedMotion.addEventListener === 'function'){
        prefersReducedMotion.addEventListener('change', handleMotionPreference);
        motionPreferenceListenerAttached = true;
      } else if (typeof prefersReducedMotion.addListener === 'function'){
        prefersReducedMotion.addListener(handleMotionPreference);
        motionPreferenceListenerAttached = true;
      }
    };

    const removeMotionPreferenceListener = () => {
      if (!prefersReducedMotion || !motionPreferenceListenerAttached) return;
      if (typeof prefersReducedMotion.removeEventListener === 'function'){
        prefersReducedMotion.removeEventListener('change', handleMotionPreference);
      } else if (typeof prefersReducedMotion.removeListener === 'function'){
        prefersReducedMotion.removeListener(handleMotionPreference);
      }
      motionPreferenceListenerAttached = false;
    };

    if ('IntersectionObserver' in window){
      autoPlayObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.target !== root) return;
          if (autoPlayStopped) return;
          autoPlayInView = entry.isIntersecting && entry.intersectionRatio > 0;
          if (autoPlayInView){
            scheduleAutoplay();
          } else {
            clearAutoplayTimers();
          }
        });
      }, { threshold: 0.4 });
      autoPlayObserver.observe(root);
    } else {
      autoPlayInView = true;
      scheduleAutoplay();
    }

    addMotionPreferenceListener();

    const attachManualListeners = () => {
      if (menuViewport instanceof HTMLElement){
        const passiveOptions = { passive: true };
        menuViewport.addEventListener('wheel', noteManualControl, passiveOptions);
        menuViewport.addEventListener('touchstart', noteManualControl, passiveOptions);
        menuViewport.addEventListener('pointerdown', noteManualControl, passiveOptions);
        menuViewport.addEventListener('keydown', noteManualControl);
      }
      root.addEventListener('focusin', noteManualControl);
    };

    attachManualListeners();
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        disableAutoplay();
        goTo(index);
        focusTab(index);
      });

      tab.addEventListener('keydown', evt => {
        if (!evt || typeof evt.key !== 'string') return;
        if (evt.key === 'ArrowRight' || evt.key === 'ArrowDown'){
          evt.preventDefault();
          disableAutoplay();
          goTo(index + 1, { focusTab: true });
        } else if (evt.key === 'ArrowLeft' || evt.key === 'ArrowUp'){
          evt.preventDefault();
          disableAutoplay();
          goTo(index - 1, { focusTab: true });
        } else if (evt.key === 'Home'){
          evt.preventDefault();
          disableAutoplay();
          goTo(0, { focusTab: true });
        } else if (evt.key === 'End'){
          evt.preventDefault();
          disableAutoplay();
          goTo(total - 1, { focusTab: true });
        }
      });
    });

    if (prevBtn instanceof HTMLElement){
      prevBtn.addEventListener('click', () => {
        disableAutoplay();
        goBy(-1);
        focusTab(activeIndex);
      });
    }

    if (nextBtn instanceof HTMLElement){
      nextBtn.addEventListener('click', () => {
        disableAutoplay();
        goBy(1);
        focusTab(activeIndex);
      });
    }

    const onPointerDown = evt => {
      if (!evt || typeof evt.pointerId !== 'number') return;
      if (evt.pointerType === 'mouse' && evt.button !== 0) return;
      noteManualControl();
      if (evt.target instanceof HTMLElement && evt.target.closest('button, a, [role="tab"]')) return;
      pointerId = evt.pointerId;
      startX = evt.clientX;
      startY = evt.clientY;
      dragOffset = 0;
      dragging = false;
      windowEl.classList.add('is-dragging');
      track.classList.add('is-dragging');
      if (typeof windowEl.setPointerCapture === 'function'){
        try {
          windowEl.setPointerCapture(pointerId);
        } catch (err){}
      }
    };

    const onPointerMove = evt => {
      if (pointerId === null || !evt || typeof evt.pointerId !== 'number' || evt.pointerId !== pointerId) return;
      const deltaX = evt.clientX - startX;
      const deltaY = evt.clientY - startY;
      if (!dragging){
        if (Math.abs(deltaX) < 12 || Math.abs(deltaX) < Math.abs(deltaY)) return;
        dragging = true;
      }
      if (typeof evt.preventDefault === 'function') evt.preventDefault();
      dragOffset = deltaX;
      const percent = windowEl.clientWidth ? (dragOffset / windowEl.clientWidth) * 100 : 0;
      track.style.transform = `translateX(${(-activeIndex * 100) + percent}%)`;
    };

    const finishDrag = commit => {
      if (pointerId === null) return;
      if (typeof windowEl.releasePointerCapture === 'function'){
        try {
          windowEl.releasePointerCapture(pointerId);
        } catch (err){}
      }
      pointerId = null;
      windowEl.classList.remove('is-dragging');
      track.classList.remove('is-dragging');
      if (!dragging){
        if (commit) setTransform(false);
        dragging = false;
        dragOffset = 0;
        return;
      }
      const threshold = windowEl.clientWidth * 0.22;
      if (commit && Math.abs(dragOffset) > threshold){
        goBy(dragOffset < 0 ? 1 : -1);
      } else {
        setTransform(false);
        syncHeight();
      }
      dragging = false;
      dragOffset = 0;
    };

    const onPointerUp = evt => {
      if (pointerId === null || !evt || typeof evt.pointerId !== 'number' || evt.pointerId !== pointerId) return;
      finishDrag(true);
    };

    const onPointerCancel = evt => {
      if (pointerId === null || !evt || typeof evt.pointerId !== 'number' || evt.pointerId !== pointerId) return;
      finishDrag(false);
    };

    if ('onpointerdown' in windowEl){
      windowEl.addEventListener('pointerdown', onPointerDown, { passive: true });
      windowEl.addEventListener('pointermove', onPointerMove);
      windowEl.addEventListener('pointerup', onPointerUp);
      windowEl.addEventListener('pointercancel', onPointerCancel);
    }

    windowEl.addEventListener('keydown', evt => {
      if (!evt || typeof evt.key !== 'string') return;
      if (evt.target instanceof HTMLElement && evt.target.matches('input, textarea')) return;
      if (evt.key === 'ArrowRight' || evt.key === 'PageDown'){
        evt.preventDefault();
        disableAutoplay();
        goBy(1);
      } else if (evt.key === 'ArrowLeft' || evt.key === 'PageUp'){
        evt.preventDefault();
        disableAutoplay();
        goBy(-1);
      }
    });

    const resizeObserver = ('ResizeObserver' in window) ? new ResizeObserver(syncHeight) : null;
    if (resizeObserver){
      resizeObserver.observe(windowEl);
      slides.forEach(slide => resizeObserver.observe(slide));
    } else {
      window.addEventListener('resize', syncHeight);
    }

    goTo(0, { immediate: true, force: true });
  }
})();
