# 3D model assets

Place your exported `.glb` or `.gltf` files in this folder. If a `.gltf` references external buffer or texture files (for example `result.bin`), copy those companions into the same directory so the `<model-viewer>` component can fetch them at runtime.

The default `horn.gltf` sample expects a `result.bin` buffer created during export. When deploying your own model, include both files (and any textures) or re-export as a self-contained `.glb`.
portfolio.css
