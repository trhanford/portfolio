// hero-particles-3d.js
(function () {
  "use strict";

  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  }

  onReady(function () {
    // Respect reduced motion preferences
    const prefersReducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Stay light on touch/small viewports to match the 2D particle behaviour
    const isCoarse = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
    const isNarrow = window.matchMedia && window.matchMedia("(max-width: 1024px)").matches;
    if (isCoarse || isNarrow) return;

    // Bail if Three.js isn't available
    if (typeof window.THREE === "undefined") return;

    const layers = document.querySelectorAll("[data-hero-3d-layer]");
    if (!layers.length) return;

    layers.forEach(setupHeroScene);
  });

  function setupHeroScene(layer) {
    const THREE = window.THREE;
    const root = layer.parentElement || layer;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1.5, 2));
    renderer.setClearColor(0x000000, 0); // transparent
    renderer.domElement.className = "hero-3d-canvas";

    layer.innerHTML = "";
    layer.appendChild(renderer.domElement);

    // -----------------------------
    // Particle cloud (pseudo-3D)
    // -----------------------------
    const group = new THREE.Group();
    scene.add(group);

    const params = getSceneParams(layer);
    const particles = createParticleLayer(params.particleCount, 46, 0.18, THREE);
    const particlesFar = createParticleLayer(
      Math.round(params.particleCount * 0.5),
      60,
      0.09,
      THREE,
      0x9fa7bc,
      0.5
    );

    group.add(particles.points);
    group.add(particlesFar.points);

    const state = {
      mouseX: 0,
      mouseY: 0,
      targetX: 0,
      targetY: 0,
      spinVelocity: new THREE.Vector3(),
      spinTarget: new THREE.Vector3(),
    };

    // Pointer parallax + hover spin
    root.addEventListener("pointermove", function (event) {
      const rect = root.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      state.targetX = nx * 2;
      state.targetY = ny * 2;

      // guide the spin to feel responsive to the pointer path
      state.spinTarget.x = ny * 1.4;
      state.spinTarget.y = 0.8 + Math.abs(nx) * 0.8;
      state.spinTarget.z = nx * 0.9;
    });

    root.addEventListener("pointerenter", function () {
      // kick off a deeper 3D spin when hovering
      const jitter = () => (Math.random() - 0.5) * 0.5;
      state.spinTarget.x += jitter();
      state.spinTarget.y += 0.8 + Math.random() * 0.6;
      state.spinTarget.z += jitter();
    });

    root.addEventListener("pointerleave", function () {
      state.targetX = 0;
      state.targetY = 0;
      state.spinTarget.set(0, 0, 0);
    });

    // Resize handling
    function resize() {
      const rect = layer.getBoundingClientRect();
      const width = rect.width || root.clientWidth || window.innerWidth;
      const height = rect.height || root.clientHeight || window.innerHeight * 0.5;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
    resize();

    let lastTime = performance.now();

    function animate(now) {
      const dt = Math.min(0.06, (now - lastTime) / 1000);
      lastTime = now;

      state.mouseX += (state.targetX - state.mouseX) * 3 * dt;
      state.mouseY += (state.targetY - state.mouseY) * 3 * dt;

      const spinLerp = Math.max(0.02, Math.min(1, 5 * dt));
      state.spinVelocity.lerp(state.spinTarget, spinLerp);
      state.spinVelocity.multiplyScalar(0.995);

      // pointer parallax keeps base tilt, spin adds real 3D orbiting
      const targetRotX = state.mouseY * 0.25;
      const targetRotY = state.mouseX * 0.4;
      group.rotation.x += (targetRotX - group.rotation.x) * 4 * dt;
      group.rotation.y += (targetRotY - group.rotation.y) * 4 * dt;
      group.rotation.x += state.spinVelocity.x * dt;
      group.rotation.y += state.spinVelocity.y * dt;
      group.rotation.z += state.spinVelocity.z * dt;

      // Soft drifting in depth
      advanceParticles(particles, dt);
      advanceParticles(particlesFar, dt * 0.5);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  function getSceneParams(layer) {
    const rect = layer.getBoundingClientRect();
    const area = (rect.width || 800) * (rect.height || 400);
    const base = area / 9000; // density
    const isMobile = window.matchMedia &&
      window.matchMedia("(max-width: 768px)").matches;

    let particleCount = Math.round(base);
    particleCount = Math.max(60, Math.min(particleCount, isMobile ? 140 : 260));

    return { particleCount };
  }

  function createParticleLayer(
    count,
    depthRadius,
    speedScale,
    THREE,
    colorHex = 0x737b90,
    opacity = 0.85
  ) {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 70;
      positions[i3 + 1] = (Math.random() - 0.5) * 36;
      positions[i3 + 2] = (Math.random() - 0.5) * depthRadius;
      speeds[i] = (0.2 + Math.random() * 0.8) * speedScale;
    }

    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const material = new THREE.PointsMaterial({
      size: 1.2,
      color: colorHex,
      transparent: true,
      opacity: opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);

    return { geometry, material, points, speeds, depthRadius };
  }

  function advanceParticles(layer, dt) {
    const { geometry, speeds, depthRadius } = layer;
    const pos = geometry.attributes.position.array;
    const count = speeds.length;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3 + 2] += speeds[i] * dt * 60; // move along z

      if (pos[i3 + 2] > depthRadius * 0.5) {
        // recycle to back
        pos[i3 + 2] = -depthRadius * 0.5;
        pos[i3 + 0] = (Math.random() - 0.5) * 70;
        pos[i3 + 1] = (Math.random() - 0.5) * 36;
      }
    }

    geometry.attributes.position.needsUpdate = true;
  }
})();
