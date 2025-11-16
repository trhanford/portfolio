// home-hero-wireframes.js
// Three.js-driven hero wireframe system for the homepage
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
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function cssColor(variable, fallback) {
    const value = getComputedStyle(document.documentElement).getPropertyValue(variable);
    return value ? value.trim() : fallback;
  }

  onReady(function () {
    if (prefersReducedMotion()) return;
    if (typeof window.THREE === "undefined") return;

    const container = document.querySelector("[data-home-wireframe]");
    if (!container) return;

    setupWireframeScene(container);
  });

  function setupWireframeScene(container) {
    const THREE = window.THREE;
    const hero = container.closest(".hero") || container.parentElement;
    const connections = document.querySelector(".hero-connections");

    const accentColor = new THREE.Color(cssColor("--accent-strong", "#b1122b"));
    const secondaryColor = new THREE.Color("#4e5669");

    container.innerHTML = "";

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1.5, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050608, 0.035);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
    camera.position.set(0, 0, 54);

    const group = new THREE.Group();
    scene.add(group);

    const bodies = createWireBodies(THREE);
    bodies.forEach(body => group.add(body.mesh));

    const connectors = createConnectors(bodies, secondaryColor, accentColor);
    group.add(connectors.line);

    const state = {
      rotationX: -0.08,
      rotationY: 0.32,
      targetX: 0.18,
      targetY: -0.15,
      pointerActive: false,
    };

    const pointerSurface = hero || container;
    let glowTimeout = null;

    function activateConnectionsGlow() {
      if (!connections) return;
      connections.classList.add("hero-connections--active");
      if (glowTimeout) window.clearTimeout(glowTimeout);
      glowTimeout = window.setTimeout(() => {
        connections.classList.remove("hero-connections--active");
      }, 900);
    }

    function handlePointer(event) {
      const rect = pointerSurface.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;

      state.targetX = nx * 0.6;
      state.targetY = ny * 0.45;
      state.pointerActive = true;
      connectors.glowTarget = 1;
      activateConnectionsGlow();
    }

    pointerSurface.addEventListener("pointermove", handlePointer);
    pointerSurface.addEventListener("pointerdown", handlePointer);
    pointerSurface.addEventListener("pointerleave", () => {
      state.pointerActive = false;
      state.targetX = 0.18;
      state.targetY = -0.15;
      connectors.glowTarget = 0;
      if (connections) connections.classList.remove("hero-connections--active");
    });

    function resize() {
      const rect = container.getBoundingClientRect();
      const width = rect.width || container.clientWidth || window.innerWidth;
      const height = rect.height || container.clientHeight || window.innerHeight * 0.5;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", resize);
    resize();

    let last = performance.now();

    function render(now) {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;

      state.rotationX += (state.targetY - state.rotationX) * 2.2 * delta;
      state.rotationY += (state.targetX - state.rotationY) * 2.2 * delta;

      group.rotation.x = state.rotationX;
      group.rotation.y = state.rotationY;
      group.rotation.z += 0.1 * delta;

      bodies.forEach(body => {
        body.mesh.rotation.x += body.spin.x * delta;
        body.mesh.rotation.y += body.spin.y * delta;
        body.mesh.position.z = body.baseZ + Math.sin(now * 0.0006 + body.offset) * body.float;
      });

      updateConnectors(connectors, bodies);
      updateConnectorGlow(connectors, delta);

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }

  function createWireBodies(THREE) {
    const configs = [
      {
        geometry: new THREE.IcosahedronGeometry(8, 0),
        color: 0xbfc8dd,
        position: [-15, 8, -6],
        spin: { x: 0.08, y: 0.14 },
        float: 3.2,
        offset: 0.3,
      },
      {
        geometry: new THREE.BoxGeometry(9, 9, 9),
        color: 0x8f99b8,
        position: [16, -4, 3],
        spin: { x: 0.06, y: 0.18 },
        float: 2.4,
        offset: 1.2,
      },
      {
        geometry: new THREE.TorusKnotGeometry(4.6, 1.2, 96, 8),
        color: 0x66708d,
        position: [2, 3, -2],
        spin: { x: 0.12, y: -0.08 },
        float: 1.8,
        offset: 2.2,
        wire: true,
      },
    ];

    return configs.map(config => {
      const wireGeometry = config.wire
        ? new THREE.WireframeGeometry(config.geometry)
        : new THREE.EdgesGeometry(config.geometry);

      const material = new THREE.LineBasicMaterial({
        color: config.color,
        transparent: true,
        opacity: 0.88,
      });

      const mesh = new THREE.LineSegments(wireGeometry, material);
      mesh.position.set(config.position[0], config.position[1], config.position[2] || 0);

      return {
        mesh,
        spin: config.spin || { x: 0.05, y: 0.05 },
        float: config.float || 0,
        offset: config.offset || 0,
        baseZ: mesh.position.z,
      };
    });
  }

  function createConnectors(bodies, baseColor, accentColor) {
    const pairs = [
      [0, 1],
      [1, 2],
      [0, 2],
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(pairs.length * 6), 3)
    );

    const material = new THREE.LineBasicMaterial({
      color: baseColor.clone(),
      transparent: true,
      opacity: 0.45,
    });

    const line = new THREE.LineSegments(geometry, material);

    return {
      line,
      geometry,
      material,
      pairs,
      baseColor: baseColor.clone(),
      accentColor: accentColor.clone(),
      glow: 0,
      glowTarget: 0,
    };
  }

  function updateConnectors(connectors, bodies) {
    const array = connectors.line.geometry.attributes.position.array;
    connectors.pairs.forEach((pair, index) => {
      const start = bodies[pair[0]].mesh.position;
      const end = bodies[pair[1]].mesh.position;
      const offset = index * 6;
      array[offset] = start.x;
      array[offset + 1] = start.y;
      array[offset + 2] = start.z;
      array[offset + 3] = end.x;
      array[offset + 4] = end.y;
      array[offset + 5] = end.z;
    });
    connectors.line.geometry.attributes.position.needsUpdate = true;
  }

  function updateConnectorGlow(connectors, delta) {
    const factor = Math.min(1, delta * 4.5);
    connectors.glow += (connectors.glowTarget - connectors.glow) * factor;
    connectors.glow = Math.max(0, Math.min(1, connectors.glow));
    const color = connectors.baseColor.clone().lerp(connectors.accentColor, connectors.glow);
    connectors.material.color.copy(color);
    connectors.material.opacity = 0.35 + connectors.glow * 0.45;
  }
})();
