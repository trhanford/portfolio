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
        src: 'assets/models/horn.gltf',
        poster: 'images/placeholders/cad-default.svg',
        message: 'Explore the interactive CAD preview of the horn assembly. Drag to orbit, scroll to zoom, and right-click to pan.'
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

  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const closeButtons = modal.querySelectorAll('[data-close]');

  const projectButtons = Array.from(document.querySelectorAll('.project-more'));
  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.project;
      if (!id) return;
      openModal(id);
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

  function openModal(id){
    const project = PROJECT_DATA[id];
    if (!project) return;

    modalTitle.textContent = project.title;
    const subtitle = project.category || project.subtitle || '';
    modalSubtitle.textContent = subtitle;
    modalSubtitle.hidden = !subtitle;

    modalBody.innerHTML = '';

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

      modalBody.appendChild(gallery);
    }

    if (project.model){
      const viewerShell = document.createElement('div');
      viewerShell.className = 'modal-viewer';

      if (project.model.src){
        const viewer = document.createElement('model-viewer');
        viewer.setAttribute('src', project.model.src);
        viewer.setAttribute('camera-controls', '');
        viewer.setAttribute('shadow-intensity', '0.75');
        viewer.setAttribute('touch-action', 'pan-y');
        viewer.setAttribute('exposure', '1.1');
        viewer.setAttribute('interaction-prompt', 'auto');
        if (project.model.poster) viewer.setAttribute('poster', project.model.poster);
        viewerShell.appendChild(viewer);
      } else {
        const placeholder = document.createElement('div');
        placeholder.className = 'viewer-placeholder';
        placeholder.innerHTML = `<strong>3D model coming soon</strong>${project.model.message || 'Link a .glb or .gltf file to enable the viewer.'}`;
        viewerShell.appendChild(placeholder);
      }

      modalBody.appendChild(viewerShell);
    }

    if (project.note){
      const note = document.createElement('div');
      note.className = 'modal-note';
      note.innerHTML = `<strong>Next steps</strong>${project.note}`;
      modalBody.appendChild(note);
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
  }

  initProjectCarousels();

  function initProjectCarousels(){
    const carousels = Array.from(document.querySelectorAll('[data-carousel]'));
    if (!carousels.length) return;

    const mq = window.matchMedia('(max-width: 900px)');

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

    let state = {
      index: 0,
      total: cards.length
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
      if (delta === 0) return;
      const direction = delta > 0 ? 1 : -1;
      goTo(state.index + direction);
    }, { passive: false });

    grid.addEventListener('keydown', evt => {
      if (mq.matches || !grid.classList.contains('carousel-active')) return;
      if (evt.key === 'ArrowRight' || evt.key === 'PageDown'){
        evt.preventDefault();
        goTo(state.index + 1);
      } else if (evt.key === 'ArrowLeft' || evt.key === 'PageUp'){
        evt.preventDefault();
        goTo(state.index - 1);
      }
    });

    function goTo(nextIndex){
      const total = state.total;
      state.index = (nextIndex % total + total) % total;
      applyTransforms();
    }

    function applyTransforms(){
      if (mq.matches){
        grid.classList.remove('carousel-active');
        cards.forEach(card => {
          card.style.transform = '';
          card.style.opacity = '';
          card.style.zIndex = '';
          card.style.filter = '';
          card.style.pointerEvents = '';
          card.style.width = '';
          card.style.boxShadow = '';
          card.removeAttribute('aria-hidden');
          card.classList.remove('is-front');
        });
        return;
      }

      grid.classList.add('carousel-active');

      const containerWidth = grid.clientWidth || grid.offsetWidth || 960;
      const clampValue = (value, min, max) => Math.min(Math.max(value, min), max);
      const frontWidth = clampValue(containerWidth * 0.45, 320, 560);
      const sideWidth = clampValue(containerWidth * 0.2, 180, frontWidth * 0.65);
      const gap = clampValue(containerWidth * 0.05, 36, 72);
      const baseOffset = (frontWidth / 2) + (sideWidth / 2) + gap;
      
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
        let filter = 'brightness(0.7) saturate(0.85)';
        let rotateY = 0;
        let translateX = 0;
        let scale = 1;
        
        if (isFront){
          widthPx = frontWidth;
          opacity = 1;
          filter = 'brightness(1.05) saturate(1.05)';
          rotateY = 0;
          translateX = 0;
          scale = 1.02;
        } else if (isSide){
          widthPx = sideWidth;
          opacity = 0.5;
          filter = 'brightness(0.85) saturate(0.92)';
          rotateY = direction * -28;
          translateX = direction * baseOffset;
          scale = 0.94;
        } else {
          widthPx = sideWidth;
          opacity = 0;
          rotateY = direction * -40;
          const extra = baseOffset + (sideWidth + gap) * (absRelative - 1);
          translateX = direction * extra;
          scale = 0.88;
        }

        const translate = `translate(-50%, -50%) translateX(${translateX.toFixed(1)}px) rotateY(${rotateY}deg) scale(${scale.toFixed(3)})`;
        card.style.transform = translate;
        card.style.transform = translate;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = String(isFront ? 900 : isSide ? 600 : 200 - absRelative);
        card.style.filter = filter;
        card.style.width = `${Math.round(widthPx)}px`;
        card.style.boxShadow = isFront ? 'var(--shadow-2)' : 'var(--shadow-1)';
        card.classList.toggle('is-front', isFront);
        if (isFront){
          card.style.pointerEvents = 'auto';
          card.removeAttribute('aria-hidden');
        } else {
          card.style.pointerEvents = 'none';
          card.setAttribute('aria-hidden', 'true');
        }
      });
    }

    goTo(0);
  }
})();
