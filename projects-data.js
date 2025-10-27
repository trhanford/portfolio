(function(){
  "use strict";

  const data = {
    'bronco-289': {
      title: '1968 Ford Bronco — 289 CID',
      category: 'Automotive',
      summary: 'Baseline restoration with period-correct power, refreshed drivetrain, and safety upgrades.',
      gallery: [
        { src: 'images/placeholders/bb1.JPG', alt: 'Photo bb1 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb2.JPG', alt: 'Photo bb2 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb3.JPG', alt: 'Photo bb3 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb4.JPG', alt: 'Photo bb4 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb5.JPG', alt: 'Photo bb5 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb6.JPG', alt: 'Photo bb6 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb7.JPG', alt: 'Photo bb7 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb8.JPG', alt: 'Photo bb8 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb9.JPG', alt: 'Photo bb9 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb10.JPG', alt: 'Photo bb10 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb11.JPG', alt: 'Photo bb11 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb12.JPG', alt: 'Photo bb12 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb13.JPG', alt: 'Photo bb13 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb14.JPG', alt: 'Photo bb14 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb15.JPG', alt: 'Photo bb15 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb16.JPG', alt: 'Photo bb16 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb17.JPG', alt: 'Photo bb17 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb18.JPG', alt: 'Photo bb18 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb19.JPG', alt: 'Photo bb19 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb20.JPG', alt: 'Photo bb20 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb21.JPG', alt: 'Photo bb21 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb22.JPG', alt: 'Photo bb22 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb23.JPG', alt: 'Photo bb23 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb24.JPG', alt: 'Photo bb24 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb25.JPG', alt: 'Photo bb25 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb26.JPG', alt: 'Photo bb26 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb27.JPG', alt: 'Photo bb27 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb28.JPG', alt: 'Photo bb28 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb29.JPG', alt: 'Photo bb29 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb30.JPG', alt: 'Photo bb30 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb31.JPG', alt: 'Photo bb31 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb32.JPG', alt: 'Photo bb32 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb33.JPG', alt: 'Photo bb33 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb34.JPG', alt: 'Photo bb34 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb35.JPG', alt: 'Photo bb35 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb36.JPG', alt: 'Photo bb36 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb37.JPG', alt: 'Photo bb37 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb38.JPG', alt: 'Photo bb38 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb39.JPG', alt: 'Photo bb39 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb40.JPG', alt: 'Photo bb40 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb41.JPG', alt: 'Photo bb41 from the 1968 Ford Bronco 289 project.' },
        { src: 'images/placeholders/bb42.JPG', alt: 'Photo bb42 from the 1968 Ford Bronco 289 project.' }
      ],
      note: 'Gallery updated with build photos provided for the 1968 Bronco 289 restoration. Additional shots can be appended as needed; the viewer will accommodate them in the scrollable row.'
    },
    'bronco-coyote': {
      title: '1968 Ford Bronco — 5.0L Gen 4x Coyote',
      category: 'Automotive',
      summary: 'Modernized restomod featuring a late-model Coyote swap, new wiring, and instrumentation.',
      gallery: [
        { src: 'images/placeholders/cj5.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj52.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj53.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj54.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj55.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj56.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj57.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj58.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj59.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj510.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj511.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj512.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj513.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' }
      ],
      note: 'Drop high-resolution images into an appropriate folder (for example images/bronco-coyote/) and update the entries in projects-data.js to point to them.'
    },
    'jeep-cj5': {
      title: '1974 Jeep CJ5 — 304 CID',
      category: 'Automotive',
      summary: 'Frame-off rebuild focused on off-road reliability, cooling, and clean packaging.',
      gallery: [
        { src: 'images/placeholders/cj5.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj52.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj53.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj54.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj55.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj56.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj57.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj58.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj59.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj510.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' },
        { src: 'images/placeholders/cj511.JPG', alt: 'Placeholder image for wiring harness routing in the Coyote Bronco build.' },
        { src: 'images/placeholders/cj512.JPG', alt: 'Placeholder image for the finished Bronco exterior.' },
        { src: 'images/placeholders/cj513.JPG', alt: 'Placeholder artwork representing the 5.0L Coyote-swapped Bronco.' }
      ],
      note: 'Add fabrication and trail-testing photos here to emphasize durability upgrades.'
    },
    'nissan-350z': {
      title: '2003 Nissan 350Z — VQ35',
      category: 'Automotive',
      summary: 'Street-tuned coupe with aero tweaks, suspension refresh, and track-ready instrumentation.',
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
      summary: 'Orbit the in-progress horn assembly concept directly within the carousel.',
      model: {
        src: 'assets/models/horn.glb',
        alt: 'Interactive preview of the custom horn assembly placeholder mesh',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '15deg',
        shadowIntensity: '0.8',
        exposure: '1.1',
        message: 'Keep horn.glb and its exported companions together in assets/models so the viewer can load the CAD preview.'
      },
      note: 'Model exported as GLB for use with the <model-viewer> component. Additional exploded views can be added as separate entries if needed.'
    },
    'cad-2': {
      title: 'Precision Bench Vice',
      category: 'CAD',
      summary: 'Explore the multi-part jaw assembly, screw drive, and mounting hardware ready for machining.',
      model: {
        src: 'assets/models/bench_vice.glb',
        alt: 'Interactive preview of the precision bench vice assembly',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '12deg',
        shadowIntensity: '0.9',
        exposure: '1.05',
        message: 'Place bench_vice.glb in assets/models. Include any separate texture files or .bin companions alongside the GLB if exported as GLTF.'
      },
      note: 'Highlight jaw inserts, guide rails, or stress relieved components by adding still renders to the gallery array if desired.'
    },
    'cad-3': {
      title: 'RC Car Chassis Study',
      category: 'CAD',
      summary: 'View suspension pickup points, battery placement, and aero details for a performance RC platform.',
      model: {
        src: 'assets/models/rc_car.glb',
        alt: 'Interactive preview of the RC car chassis concept',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '14deg',
        shadowIntensity: '0.7',
        exposure: '1.0',
        message: 'Copy rc_car.glb into assets/models. If your export references textures, keep them in the same folder for seamless loading.'
      },
      note: 'Consider appending suspension detail shots or annotated callouts via the gallery array to explain tuning decisions.'
    },
    'cad-4': {
      title: 'Cow Bell Casting Pattern',
      category: 'CAD',
      summary: 'Inspect the split pattern and draft considerations for a cast aluminum cow bell concept.',
      model: {
        src: 'assets/models/cow_bell.glb',
        alt: 'Interactive preview of the cow bell casting pattern',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '10deg',
        shadowIntensity: '0.65',
        exposure: '1.05',
        message: 'Drop cow_bell.glb into assets/models. Pair halves, cores, and gating as needed; <model-viewer> reads a single GLB bundle.'
      },
      note: 'Supplement with photos of the sand mold or finished casting by extending the gallery array for this entry.'
    },
    'cad-5': {
      title: 'Can Stamper Mechanism',
      category: 'CAD',
      summary: 'Follow the linkage-driven head that embosses beverage cans with a custom brand mark.',
      model: {
        src: 'assets/models/can_stamper.glb',
        alt: 'Interactive preview of the can stamper mechanism',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '11deg',
        shadowIntensity: '0.8',
        exposure: '1.08',
        message: 'Add can_stamper.glb to assets/models to animate the punch head and linkage in the viewer.'
      },
      note: 'Use the gallery to contrast exploded linkage positions or prototype photos that inspired the mechanism.'
    },
    'cad-6': {
      title: 'Modular Organizer System',
      category: 'CAD',
      summary: 'Rotate through interchangeable bins and covers tailored for workshop fasteners.',
      model: {
        src: 'assets/models/organizer.glb',
        alt: 'Interactive preview of the modular organizer tray system',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '13deg',
        shadowIntensity: '0.75',
        exposure: '1.04',
        message: 'Save organizer.glb in assets/models. Keep any additional textures beside it so inserts display correctly.'
      },
      note: 'Document alternative bin layouts or FDM print settings in the gallery to showcase modularity and ease of fabrication.'
    },
    'timer-police': {
      title: '555 Timer Police Light Circuit',
      category: 'Computer & Electrical',
      summary: 'Classic timing IC driving alternating beacons with adjustable pulse widths.',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder art for the 555 timer police light circuit board.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder showing the alternating light output of the 555 timer build.' }
      ],
      note: 'Show schematic captures, breadboard iterations, and final enclosure shots for extra clarity.'
    },
    'smart-mirror': {
      title: 'Alexa Integrated Smart Mirror',
      category: 'Computer & Electrical',
      summary: 'Voice-enabled display with embedded LEDs, microphone array, and responsive UI.',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image for the smart mirror front panel.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image representing the electronics tray behind the mirror.' }
      ],
      note: 'Swap in UI states and wiring photos to highlight the Alexa integration and light diffusion.'
    },
    'led-eq': {
      title: 'Sound Reactive LED Equalizer',
      category: 'Computer & Electrical',
      summary: 'FFT-driven light bar that maps audio frequencies to cascading color bands.',
      gallery: [
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image for the sound reactive LED equalizer in action.' },
        { src: 'images/placeholders/electrical-default.svg', alt: 'Placeholder image showing the controller enclosure for the LED equalizer.' }
      ],
      note: 'Include short clips or sequential stills to demonstrate the FFT response once assets are available.'
    }
  };

  window.ProjectData = Object.freeze(data);
})();
