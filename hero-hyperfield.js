// hero-hyperfield.js
// Three.js powered "hyperfield" for the landing hero. A layered 3D particle
// sculpture with ribbons and crystalline shards that respond to pointer motion.
(function () {
  "use strict";

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  function prefersReducedMotion() {
    return (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  const isSmallViewport = () =>
    typeof window.matchMedia === "function" &&
    window.matchMedia("(max-width: 1024px)").matches;

  onReady(() => {
    const mount = document.querySelector("[data-hero-hyperfield]");
    if (!mount) return;

    if (prefersReducedMotion() || isSmallViewport()) {
      mount.classList.add("is-fallback");
      return;
    }

    if (typeof window.THREE === "undefined") {
      mount.classList.add("is-fallback");
      return;
    }

    try {
      setupHyperfield(mount, window.THREE);
      mount.classList.add("is-active");
    } catch (error) {
      console.error("Hyperfield failed, falling back to CSS glow", error);
      mount.classList.add("is-fallback");
    }
  });

  function setupHyperfield(mount, THREE) {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f18, 0.016);

    const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 240);
    camera.position.set(0, 2.2, 34);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    if (renderer.outputColorSpace !== undefined) {
      renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else {
      renderer.outputEncoding = THREE.sRGBEncoding;
    }
    renderer.domElement.className = "hero-hyperfield__canvas";
    mount.appendChild(renderer.domElement);

    const root = new THREE.Group();
    scene.add(root);

    const palette = [
      new THREE.Color("#d4f5ff"),
      new THREE.Color("#7fa9ff"),
      new THREE.Color("#9b7bff"),
      new THREE.Color("#ffb07a"),
    ];

    const lights = new THREE.Group();
    lights.add(new THREE.AmbientLight(0x9db7ff, 0.32));
    const pulseLight = new THREE.PointLight(0x84b3ff, 1.8, 160, 2);
    pulseLight.position.set(0, 0, 18);
    lights.add(pulseLight);
    const ember = new THREE.PointLight(0xff9f6c, 1.2, 120, 2);
    ember.position.set(-6, 4, -12);
    lights.add(ember);
    scene.add(lights);

    const layers = [];
    const sparkLayer = createSparkSwirl(1800, palette, THREE);
    root.add(sparkLayer.points);
    layers.push(sparkLayer);

    const shardLayer = createShardHalo(140, palette, THREE);
    root.add(shardLayer.mesh);
    layers.push(shardLayer);

    const ribbonA = createRibbon(28, 0.46, palette[1], THREE);
    const ribbonB = createRibbon(34, 0.58, palette[3], THREE, 1.7);
    root.add(ribbonA.line, ribbonB.line);
    layers.push(ribbonA, ribbonB);

    const state = {
      width: 0,
      height: 0,
      tiltX: 0,
      tiltY: 0,
      targetTiltX: 0,
      targetTiltY: 0,
    };

    const handlePointerMove = event => {
      const rect = mount.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      state.targetTiltX = nx * 0.8;
      state.targetTiltY = -ny * 0.6;
    };

    const resetTilt = () => {
      state.targetTiltX = 0;
      state.targetTiltY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", resetTilt);

    function resize() {
      const rect = mount.getBoundingClientRect();
      state.width = rect.width || mount.clientWidth || window.innerWidth;
      state.height = rect.height || mount.clientHeight || window.innerHeight;
      renderer.setSize(state.width, state.height, false);
      camera.aspect = state.width / state.height;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
    resize();

    const clock = new THREE.Clock();

    renderer.setAnimationLoop(() => {
      const time = clock.getElapsedTime();

      state.tiltX += (state.targetTiltX - state.tiltX) * 0.08;
      state.tiltY += (state.targetTiltY - state.tiltY) * 0.08;

      root.rotation.y = time * 0.04 + state.tiltX;
      root.rotation.x = Math.sin(time * 0.3) * 0.07 + state.tiltY;
      root.position.y = Math.sin(time * 0.6) * 0.35;

      pulseLight.intensity = 1.2 + Math.sin(time * 2.1) * 0.6;
      pulseLight.position.x = Math.sin(time * 0.9) * 6;
      pulseLight.position.y = Math.cos(time * 0.7) * 4;

      layers.forEach(layer => {
        if (typeof layer.update === "function") {
          layer.update(time);
        }
      });

      renderer.render(scene, camera);
    });
  }

  function createSparkSwirl(count, palette, THREE) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const radii = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ring = 12 + Math.random() * 14;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 10;
      positions[i3] = Math.cos(angle) * ring;
      positions[i3 + 1] = y;
      positions[i3 + 2] = Math.sin(angle) * ring * 0.66;
      radii[i] = ring;

      const color = palette[i % palette.length].clone();
      const warmth = 0.25 + Math.random() * 0.6;
      color.lerp(new THREE.Color("#ffffff"), warmth * 0.2);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute("aRadius", new THREE.BufferAttribute(radii, 1));

    const material = new THREE.PointsMaterial({
      size: 0.42,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    const points = new THREE.Points(geometry, material);

    function update(time) {
      const pos = geometry.attributes.position.array;
      const phase = geometry.attributes.aPhase.array;
      const radius = geometry.attributes.aRadius.array;
      const len = phase.length;

      for (let i = 0; i < len; i++) {
        const i3 = i * 3;
        const baseR = radius[i];
        const swirl = Math.sin(time * 0.8 + phase[i]) * 0.8;
        const y = pos[i3 + 1];
        const wobble = Math.sin(time * 1.6 + y * 0.3 + phase[i]) * 0.4;

        pos[i3] = Math.cos(phase[i] + time * 0.22 + wobble * 0.08) * (baseR + swirl);
        pos[i3 + 2] = Math.sin(phase[i] + time * 0.22 + wobble * 0.04) * (baseR * 0.66 + swirl * 0.4);
        pos[i3 + 1] = y + Math.sin(time * 0.9 + phase[i]) * 0.12;
      }

      geometry.attributes.position.needsUpdate = true;
    }

    return { points, update };
  }

  function createShardHalo(count, palette, THREE) {
    const geometry = new THREE.IcosahedronGeometry(0.24, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#dff1ff"),
      metalness: 0.45,
      roughness: 0.18,
      transmission: 0.42,
      transparent: true,
      opacity: 0.86,
      emissive: new THREE.Color("#8bb7ff"),
      emissiveIntensity: 0.6,
      clearcoat: 0.6,
    });

    const mesh = new THREE.InstancedMesh(geometry, material, count);
    const dummy = new THREE.Object3D();
    const seeds = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      const seedIndex = i * 4;
      const radius = 10 + Math.random() * 10;
      const tilt = (Math.random() - 0.5) * 0.9;
      const speed = 0.6 + Math.random() * 0.8;
      const colorBlend = palette[Math.floor(Math.random() * palette.length)];
      seeds[seedIndex] = radius;
      seeds[seedIndex + 1] = tilt;
      seeds[seedIndex + 2] = speed;
      seeds[seedIndex + 3] = Math.random() * Math.PI * 2;

      const c = colorBlend.clone().lerp(new THREE.Color("#ffffff"), 0.3);
      mesh.setColorAt(i, c);
    }
    mesh.instanceColor.needsUpdate = true;

    function update(time) {
      for (let i = 0; i < count; i++) {
        const seedIndex = i * 4;
        const radius = seeds[seedIndex];
        const tilt = seeds[seedIndex + 1];
        const speed = seeds[seedIndex + 2];
        const offset = seeds[seedIndex + 3];

        const angle = time * 0.45 * speed + offset;
        const height = Math.sin(angle * 1.7) * 3.8;
        const pulse = 1 + Math.sin(time * 1.4 + offset) * 0.28;

        dummy.position.set(
          Math.cos(angle) * radius,
          height + tilt * 6,
          Math.sin(angle) * radius * 0.7
        );
        dummy.rotation.set(angle * 0.3, angle * 1.1, angle * 0.8);
        dummy.scale.setScalar(0.7 + pulse * 0.5);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;
    }

    return { mesh, update };
  }

  function createRibbon(radius, amplitude, color, THREE, timeOffset = 0) {
    const segments = 220;
    const positions = new Float32Array(segments * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.42,
      linewidth: 2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const line = new THREE.Line(geometry, material);
    line.position.z = -6;

    function update(time) {
      const t = time + timeOffset;
      const pos = geometry.attributes.position.array;
      for (let i = 0; i < segments; i++) {
        const pct = i / segments;
        const angle = pct * Math.PI * 2;
        const wave = Math.sin(t * 1.2 + angle * 2.6) * amplitude * 2.6;
        const wobble = Math.cos(t * 0.8 + angle * 4.4) * 0.9;
        const r = radius * (18 + wave + wobble * 2.2);

        const i3 = i * 3;
        pos[i3] = Math.cos(angle + t * 0.2) * r;
        pos[i3 + 1] = Math.sin(angle * 3 + t * 1.4) * (4.6 + wave * 0.8);
        pos[i3 + 2] = Math.sin(angle * 1.4 + t * 0.6) * r * 0.3;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeBoundingSphere();
    }

    return { line, update };
  }
})();
