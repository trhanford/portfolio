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
    'cad-butterfly-valve': {
      title: 'Butterfly Valve Assembly',
      category: 'CAD',
      summary: 'Inspect the complete butterfly valve assembly with interchangeable hardware and seals.',
      model: {
        src: 'assets/models/Butterfly_assembly.glb',
        alt: 'Interactive preview of the butterfly valve assembly',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '15deg',
        shadowIntensity: '0.85',
        exposure: '1.05',
        message: 'Place Butterfly_assembly.glb alongside its supporting parts in assets/models to enable the viewer.'
      },
      gallery: [
        { type: 'model', src: 'assets/models/Handle_arm.glb', alt: 'Handle arm component for the butterfly valve assembly', caption: 'Handle arm' },
        { type: 'model', src: 'assets/models/handle_seal_plate.glb', alt: 'Handle seal plate for the butterfly valve assembly', caption: 'Handle seal plate' },
        { type: 'model', src: 'assets/models/M10_nut.glb', alt: 'M10 nut from the butterfly valve assembly', caption: 'M10 nut' },
        { type: 'model', src: 'assets/models/m12Bolt.glb', alt: 'M12 bolt for the butterfly valve assembly', caption: 'M12 bolt' },
        { type: 'model', src: 'assets/models/m12Nut.glb', alt: 'M12 nut for the butterfly valve assembly', caption: 'M12 nut' },
        { type: 'model', src: 'assets/models/m3screw.glb', alt: 'M3 screw for the butterfly valve assembly', caption: 'M3 screw' },
        { type: 'model', src: 'assets/models/panhead_m5.glb', alt: 'Pan head M5 fastener for the butterfly valve assembly', caption: 'Pan head M5 screw' },
        { type: 'model', src: 'assets/models/Pipe.glb', alt: 'Pipe section for the butterfly valve assembly', caption: 'Pipe section' },
        { type: 'model', src: 'assets/models/valve_blade.glb', alt: 'Valve blade component of the butterfly valve', caption: 'Valve blade' },
        { type: 'model', src: 'assets/models/valve_body.glb', alt: 'Valve body for the butterfly valve assembly', caption: 'Valve body' },
        { type: 'model', src: 'assets/models/valve_shaft.glb', alt: 'Valve shaft for the butterfly valve assembly', caption: 'Valve shaft' },
        { type: 'model', src: 'assets/models/Woodruff_key.glb', alt: 'Woodruff key for the butterfly valve assembly', caption: 'Woodruff key' }
      ],
      showGalleryCTA: true,
      note: 'Upload each supporting GLB part listed here into assets/models/ so the mini viewers can render in the gallery overlay.'
    },
    'cad-spindle-assembly': {
      title: 'Spindle Assembly',
      category: 'CAD',
      summary: 'Review the full spindle stack-up with its bearings, collar, and base ready for fabrication.',
      model: {
        src: 'assets/models/spindle_assembly.glb',
        alt: 'Interactive preview of the spindle assembly',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '12deg',
        shadowIntensity: '0.85',
        exposure: '1.04',
        message: 'Store spindle_assembly.glb in assets/models with the supporting part exports so the viewer can load every piece.'
      },
      gallery: [
        { type: 'model', src: 'assets/models/spindle_base.glb', alt: 'Spindle base component of the assembly', caption: 'Spindle base' },
        { type: 'model', src: 'assets/models/spindle_bearing.glb', alt: 'Spindle bearing used in the assembly', caption: 'Spindle bearing' },
        { type: 'model', src: 'assets/models/spindle_collar.glb', alt: 'Collar component from the spindle assembly', caption: 'Spindle collar' },
        { type: 'model', src: 'assets/models/spindle_pin.glb', alt: 'Locking pin for the spindle assembly', caption: 'Spindle pin' },
        { type: 'model', src: 'assets/models/spindle_shaft.glb', alt: 'Shaft component for the spindle assembly', caption: 'Spindle shaft' }
      ],
      showGalleryCTA: true,
      note: 'Add each spindle part GLB listed above into assets/models/ to activate the mini previews within the gallery overlay.'
    },
    'cad-cart-assembly': {
      title: 'Utility Cart Assembly',
      category: 'CAD',
      summary: 'Explore the complete utility cart build with modular casters, bumpers, and removable handle hardware.',
      model: {
        src: 'assets/models/Cart_assembly.glb',
        alt: 'Interactive preview of the utility cart assembly',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '12deg 0deg 0deg',
        shadowIntensity: '0.85',
        exposure: '1.05',
        message: 'Place Cart_assembly.glb and each supporting component listed below in assets/models to enable the gallery viewers.'
      },
      gallery: [
        { type: 'model', src: 'assets/models/Cart_assembly.glb', alt: 'Complete utility cart assembly', caption: 'Cart assembly' },
        { type: 'model', src: 'assets/models/bumper.glb', alt: 'Protective bumper for the utility cart', caption: 'Bumper' },
        { type: 'model', src: 'assets/models/caste_axle_bushing.glb', alt: 'Caster axle bushing for the utility cart', caption: 'Caster axle bushing' },
        { type: 'model', src: 'assets/models/caster_axle_nut.glb', alt: 'Caster axle nut for the utility cart', caption: 'Caster axle nut' },
        { type: 'model', src: 'assets/models/caster_axle_washer.glb', alt: 'Caster axle washer for the utility cart', caption: 'Caster axle washer' },
        { type: 'model', src: 'assets/models/caster_wheel_frame.glb', alt: 'Caster wheel frame for the utility cart', caption: 'Caster wheel frame' },
        { type: 'model', src: 'assets/models/caster_wheel_subassembly.glb', alt: 'Caster wheel subassembly for the utility cart', caption: 'Caster wheel subassembly' },
        { type: 'model', src: 'assets/models/caster_wheel.glb', alt: 'Caster wheel for the utility cart', caption: 'Caster wheel' },
        { type: 'model', src: 'assets/models/frame_subassembly.glb', alt: 'Frame subassembly for the utility cart', caption: 'Frame subassembly' },
        { type: 'model', src: 'assets/models/frame.glb', alt: 'Main frame for the utility cart', caption: 'Frame' },
        { type: 'model', src: 'assets/models/handle_carrier.glb', alt: 'Handle carrier component for the utility cart', caption: 'Handle carrier' },
        { type: 'model', src: 'assets/models/handle_cart.glb', alt: 'Handle for the utility cart', caption: 'Handle' },
        { type: 'model', src: 'assets/models/handle_subassembly.glb', alt: 'Handle subassembly for the utility cart', caption: 'Handle subassembly' },
        { type: 'model', src: 'assets/models/mounting_nut.glb', alt: 'Mounting nut for the utility cart assembly', caption: 'Mounting nut' },
        { type: 'model', src: 'assets/models/platform.glb', alt: 'Platform deck for the utility cart', caption: 'Platform' },
        { type: 'model', src: 'assets/models/swivel_caster_frame.glb', alt: 'Swivel caster frame for the utility cart', caption: 'Swivel caster frame' },
        { type: 'model', src: 'assets/models/swivel_caster_wheel.glb', alt: 'Swivel caster wheel for the utility cart', caption: 'Swivel caster wheel' }
      ],
      showGalleryCTA: true,
      note: 'Upload Cart_assembly.glb plus each component listed to assets/models/ so every part renders within the gallery overlay viewers.'
    },
    'cad-engine-tla': {
      title: 'TLA Engine Assembly',
      category: 'CAD',
      summary: 'Rotate through the TLA engine concept with piston, crank, and fuel subsystems exported for review.',
      model: {
        src: 'assets/models/Engine_TLA_assembly.glb',
        alt: 'Interactive preview of the complete TLA engine assembly',
        poster: 'images/placeholders/cad-default.svg',
        autoRotate: true,
        rotationPerSecond: '12deg',
        shadowIntensity: '0.88',
        exposure: '1.05',
        message: 'Copy Engine_TLA_assembly.glb and each supporting component listed below into assets/models/ so the viewer can load the full engine.'
      },
      gallery: [
        { type: 'model', src: 'assets/models/Engine_TLA_assembly.glb', alt: 'Full assembly view of the TLA engine', caption: 'Engine assembly' },
        { type: 'model', src: 'assets/models/cam_roller.glb', alt: 'Cam roller component from the TLA engine assembly', caption: 'Cam roller' },
        { type: 'model', src: 'assets/models/connecting_pin.glb', alt: 'Connecting pin for the TLA engine', caption: 'Connecting pin' },
        { type: 'model', src: 'assets/models/connecting_pin_subassembly.glb', alt: 'Connecting pin subassembly', caption: 'Connecting pin subassembly' },
        { type: 'model', src: 'assets/models/crank_bushing.glb', alt: 'Crank bushing used in the TLA engine', caption: 'Crank bushing' },
        { type: 'model', src: 'assets/models/crank_cam_subassembly.glb', alt: 'Crank cam subassembly for the TLA engine', caption: 'Crank cam subassembly' },
        { type: 'model', src: 'assets/models/crank_washer.glb', alt: 'Crank washer component for the TLA engine', caption: 'Crank washer' },
        { type: 'model', src: 'assets/models/crank.glb', alt: 'Crank component for the TLA engine', caption: 'Crank' },
        { type: 'model', src: 'assets/models/crankshaft.glb', alt: 'Crankshaft of the TLA engine', caption: 'Crankshaft' },
        { type: 'model', src: 'assets/models/engine_base.glb', alt: 'Engine base for the TLA assembly', caption: 'Engine base' },
        { type: 'model', src: 'assets/models/engine_body.glb', alt: 'Engine body structure for the TLA assembly', caption: 'Engine body' },
        { type: 'model', src: 'assets/models/engine_cylinder.glb', alt: 'Engine cylinder component for the TLA assembly', caption: 'Engine cylinder' },
        { type: 'model', src: 'assets/models/fuel_container_subassembly.glb', alt: 'Fuel container subassembly for the TLA engine', caption: 'Fuel container subassembly' },
        { type: 'model', src: 'assets/models/Fuel_tank_base.glb', alt: 'Fuel tank base for the TLA engine', caption: 'Fuel tank base' },
        { type: 'model', src: 'assets/models/Fuel_tank_body.glb', alt: 'Fuel tank body for the TLA engine', caption: 'Fuel tank body' },
        { type: 'model', src: 'assets/models/Fuel_tank_lid.glb', alt: 'Fuel tank lid for the TLA engine', caption: 'Fuel tank lid' },
        { type: 'model', src: 'assets/models/Fuel_tank_spout.glb', alt: 'Fuel tank spout for the TLA engine', caption: 'Fuel tank spout' },
        { type: 'model', src: 'assets/models/Fuel_tank_subassembly.glb', alt: 'Fuel tank subassembly for the TLA engine', caption: 'Fuel tank subassembly' },
        { type: 'model', src: 'assets/models/piston.glb', alt: 'Piston component for the TLA engine', caption: 'Piston' },
        { type: 'model', src: 'assets/models/push_rod.glb', alt: 'Push rod for the TLA engine', caption: 'Push rod' },
        { type: 'model', src: 'assets/models/roller_bushing.glb', alt: 'Roller bushing used in the TLA engine', caption: 'Roller bushing' },
        { type: 'model', src: 'assets/models/roller_fork.glb', alt: 'Roller fork component for the TLA engine', caption: 'Roller fork' },
        { type: 'model', src: 'assets/models/valve.glb', alt: 'Valve component for the TLA engine', caption: 'Valve' },
        { type: 'model', src: 'assets/models/valve_spring_new.glb', alt: 'Updated valve spring for the TLA engine', caption: 'Valve spring (new)' },
        { type: 'model', src: 'assets/models/Valve_spring.glb', alt: 'Valve spring option for the TLA engine', caption: 'Valve spring' },
        { type: 'model', src: 'assets/models/valve_subassembly.glb', alt: 'Valve subassembly for the TLA engine', caption: 'Valve subassembly' },
        { type: 'model', src: 'assets/models/valve_base.glb', alt: 'Valve base component for the TLA engine', caption: 'Valve base' },
        { type: 'model', src: 'assets/models/wrist_pin.glb', alt: 'Wrist pin component for the TLA engine', caption: 'Wrist pin' }
      ],
      showGalleryCTA: true,
      note: 'Upload Engine_TLA_assembly.glb with the listed companion parts into assets/models/ so each piece renders within the gallery overlay viewers.'
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
    'timer-analysis': {
      title: '555 Timer Circuit Analysis and Applications',
      category: 'Computer & Electrical',
      summary: 'Design, simulate, and validate LMC555 monostable and astable configurations across precise duty cycles.',
      description: [
        'This project explored the design, simulation, and implementation of monostable and astable 555 timer configurations using the LMC555 IC.',
        'Timing constants and RC networks were calculated to dial in 3-second monostable pulses alongside 2-second and 1-second astable oscillators at 60% and 75% duty cycles, respectively, with results confirmed in LTSpice and on the bench.',
        'A dual-timer “police light” flasher further demonstrated waveform generation, reinforcing real-world verification of integrated circuit theory.'
      ],
      report: {
        href: 'assets/reports/555_Timer.pdf',
        label: 'View Full Report'
      },
      gallery: [
        { src: 'assets/reports/LMC555 Internal Circuit Diagram.png', alt: 'Internal block diagram detailing the LMC555 timer architecture.' },
        { src: 'assets/reports/Astable Configuration General Operation Diagram.png', alt: 'General operation diagram explaining the astable 555 timer configuration.' },
        { src: 'assets/reports/Monotstable Configuration General Operation Diagram.png', alt: 'General operation diagram outlining the monostable 555 timer configuration.' },
        { src: 'assets/reports/Spice Circuit Schematic for Astable LMC555.png', alt: 'SPICE schematic for the astable LMC555 circuit used in analysis.' },
        { src: 'assets/reports/Spice Circuit Schematic for Astable LMC555 with 1 Second Time period.png', alt: 'SPICE schematic of the astable LMC555 tuned for a one second period.' },
        { src: 'assets/reports/Spice Circuit Schematic for Monostable LMC555 with 3 Second Time Period.png', alt: 'SPICE schematic of the monostable LMC555 generating a three second pulse.' },
        { src: 'assets/reports/LTSpice Circuit Schematic for Police & Emergency Light Flasher’s.png', alt: 'LTSpice schematic for the dual 555 police light flasher circuit.' },
        { src: 'assets/reports/LTSpice Simulation of Astable LMC555 Circuit 1 sec 75 percent dc.png', alt: 'LTSpice simulation output of the astable LMC555 circuit at 75 percent duty cycle.' },
        { src: 'assets/reports/LTSpice Simulation of Astable LMC555 Circuit |.png', alt: 'Additional LTSpice simulation results for the astable LMC555 circuit.' },
        { src: 'assets/reports/LTSpice Simulation of Monostable LMC555 Circuit With 3 Second Pulse.png', alt: 'LTSpice simulation of the monostable LMC555 delivering a three second pulse.' },
        { src: 'assets/reports/LTSpice Simulation of Police Lights Astable Dual Circuit.png', alt: 'LTSpice simulation showing alternating outputs for the police light flasher.' },
        { src: 'assets/reports/Oscilloscope Measurment of Astable LMC555 Circuit 1 sec 75 percent dc.png', alt: 'Oscilloscope capture of the astable LMC555 circuit with a 1 second period and 75 percent duty cycle.' },
        { src: 'assets/reports/Oscilloscope Measurment of Astable LMC555 Circuit 2 sec 60 percent dc.png', alt: 'Oscilloscope capture of the astable LMC555 circuit at a 2 second period and 60 percent duty cycle.' },
        { src: 'assets/reports/Oscilloscope Measurment of Monostable LMC555 Circuit With 3 Second Pulse.png', alt: 'Oscilloscope capture of the monostable LMC555 circuit producing a three second pulse.' },
        { src: 'assets/reports/Oscilloscope Measurment of Police Lights Astable Dual Circuit.png', alt: 'Oscilloscope capture of the alternating police light dual astable circuit.' },
        { src: 'assets/reports/Police Lights LED Flasher Circuit Diagram from Elonics. Org.png', alt: 'Reference LED flasher circuit diagram from Elonics.org used for comparison.' }
      ],
      note: 'Swap in oscilloscope captures, LTSpice plots, and breadboard images to complement the written analysis.'
    },
    'audio-eq': {
      title: '3-Band Audio Equalizer and Power Amplifier',
      category: 'Computer & Electrical',
      summary: 'Shape bass, mids, and treble with LM324 filters before delivering over 400 mW through an LM386 output stage.',
      description: [
        'This project designed and built a fully functional 3-band audio equalizer and power amplifier capable of driving an 8Ω speaker.',
        'Low-, band-, and high-pass filters isolate frequency ranges with LM324 op-amps providing individual gain control, while a master volume feeds an LM386 power amplifier for clean output.',
        'Frequency response sweeps and RMS power measurements verified the -3 dB targets and showcased the system’s adjustable tone balancing.'
      ],
      report: {
        href: 'assets/reports/Final_Report.pdf',
        label: 'View Full Report'
      },
      gallery: [
        { src: 'assets/reports/320mV_input_maxVolume.png', alt: 'Oscilloscope capture showing the equalizer handling a 320 mV input at maximum volume.' },
        { src: 'assets/reports/320mV_input_Mid_Volume.png', alt: 'Oscilloscope capture of the 320 mV input at mid volume output level.' },
        { src: 'assets/reports/320mV_input_Min_Volume.png', alt: 'Oscilloscope capture of the 320 mV input running through the equalizer at minimum volume.' },
        { src: 'assets/reports/AC_RMS_output_MidVolume.png', alt: 'True RMS AC output measurement while the equalizer operates at mid volume.' },
        { src: 'assets/reports/amp_output_schematic.png', alt: 'Amplifier output schematic detailing the LM386 stage.' },
        { src: 'assets/reports/BPF_frequencyResponseAnalysis.png', alt: 'Band-pass filter frequency response analysis plot.' },
        { src: 'assets/reports/BPF_schematic.png', alt: 'Band-pass filter schematic used in the equalizer.' },
        { src: 'assets/reports/equalizer_schematic.png', alt: 'Overall schematic of the three-band equalizer signal chain.' },
        { src: 'assets/reports/gain_adjustment_schematic.png', alt: 'Gain adjustment circuit schematic for the equalizer filters.' },
        { src: 'assets/reports/HPF_frequencyResponseAnalysis.png', alt: 'High-pass filter frequency response analysis plot.' },
        { src: 'assets/reports/HPF_schematic.png', alt: 'High-pass filter schematic showing component values.' },
        { src: 'assets/reports/LPF_frequencyResponseAnalysis.png', alt: 'Low-pass filter frequency response analysis plot.' },
        { src: 'assets/reports/LPF_schematic.png', alt: 'Low-pass filter schematic with component references.' },
        { src: 'assets/reports/LF356_pinout.png', alt: 'LF356 op-amp pinout reference used during design.' },
        { src: 'assets/reports/LM334_pinout.png', alt: 'LM334 pinout diagram supporting the bias network.' },
        { src: 'assets/reports/LM386_pinout.png', alt: 'LM386 power amplifier pinout reference.' },
        { src: 'assets/reports/LM386_schematic.png', alt: 'LM386 amplifier schematic for the power stage.' },
        { src: 'assets/reports/Max_gain_AC_Output_100Hz.png', alt: 'Maximum gain AC output measurement at 100 Hz.' },
        { src: 'assets/reports/Max_gain_AC_Output_1000Hz.png', alt: 'Maximum gain AC output measurement at 1 kHz.' },
        { src: 'assets/reports/Max_gain_AC_Output_10000Hz.png', alt: 'Maximum gain AC output measurement at 10 kHz.' },
        { src: 'assets/reports/Min_gain_AC_Output_100Hz.png', alt: 'Minimum gain AC output measurement at 100 Hz.' },
        { src: 'assets/reports/Min_gain_AC_Output_1000Hz.png', alt: 'Minimum gain AC output measurement at 1 kHz.' },
        { src: 'assets/reports/Min_gain_AC_Output_10000Hz.png', alt: 'Minimum gain AC output measurement at 10 kHz.' },
        { src: 'assets/reports/Signal_RMS_100Hz.png', alt: 'Signal RMS measurement taken at 100 Hz.' },
        { src: 'assets/reports/Signal_RMS_768Hz.png', alt: 'Signal RMS measurement taken at 768 Hz.' },
        { src: 'assets/reports/Signal_summer_schematic.png', alt: 'Signal summer schematic combining the three bands.' }
      ],
      note: 'Add enclosure photos, filter response plots, and wiring close-ups to illustrate tuning decisions.'
    },
    'timer-police': {
      title: '555 Timer Police Light Circuit',
      category: 'Computer & Electrical',
      summary: 'Classic timing IC driving alternating beacons with adjustable pulse widths.',
      gallery: [
        { src: 'assets/reports/Oscilloscope Measurment of Police Lights Astable Dual Circuit.png', alt: 'Oscilloscope capture of the dual LMC555 astable police light circuit.' },
        { src: 'assets/reports/Astable Configuration General Operation Diagram.png', alt: 'General operation diagram for the astable 555 timer configuration.' },
        { src: 'assets/reports/Astable Internal Circuit Diagram.png', alt: 'Internal schematic illustrating the astable LMC555 timer circuit.' },
        { src: 'assets/reports/LTSpice Circuit Schematic of Police & Emergency Light Flasher’s Astable Circuit.png', alt: 'LTSpice schematic for the police and emergency light flasher astable circuit.' },
        { src: 'assets/reports/LTSpice Simulation of Astable LMC555 Circuit 1 sec 75 percent dc.png', alt: 'LTSpice waveform of the astable LMC555 circuit with a 1 second period at 75 percent duty cycle.' },
        { src: 'assets/reports/LTSpice Simulation of Monostable LMC555 Circuit 3 sec 75 percent dc.png', alt: 'LTSpice results for the monostable LMC555 circuit producing a 3 second pulse at 75 percent duty cycle.' },
        { src: 'assets/reports/LTSpice Simulation of Police Lights Astable Dual Circuit.png', alt: 'LTSpice dual astable simulation of the alternating police light circuit.' },
        { src: 'assets/reports/Monostable Configuration General Operation Diagram.png', alt: 'General operation diagram for the monostable 555 timer configuration.' },
        { src: 'assets/reports/Oscilloscope Measurment of Astable LMC555 Circuit 1 sec 60 percent dc.png', alt: 'Oscilloscope capture of the astable LMC555 circuit at a 1 second period and 60 percent duty cycle.' },
        { src: 'assets/reports/Oscilloscope Measurment of Monostable LMC555 Circuit with 3 Second Pulse.png', alt: 'Oscilloscope capture of the monostable LMC555 circuit delivering a 3 second pulse.' },
        { src: 'assets/reports/Police Lights LED Flasher Circuit Diagram from Elonics.org.png', alt: 'Reference LED flasher schematic for the police light circuit from Elonics.org.' },
        { src: 'assets/reports/Timing Circuit Schematic for Astable LMC555.png', alt: 'Timing circuit schematic detailing the astable LMC555 configuration.' },
        { src: 'assets/reports/Timing Circuit Schematic for Monostable LMC555 with 1 Second Time Period.png', alt: 'Timing circuit schematic for the monostable LMC555 producing a 1 second pulse.' },
        { src: 'assets/reports/Timing Circuit Schematic for Monostable LMC555 with 3 Second Time Period.png', alt: 'Timing circuit schematic for the monostable LMC555 producing a 3 second pulse.' }
      ],
      note: 'Gallery now includes measurement plots, schematics, and oscilloscope captures that document the equalizer build.'
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
