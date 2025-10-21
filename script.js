// Minimal JS: lazy-load gallery from gallery.json and a simple lightbox.
const grid = document.getElementById('grid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
document.getElementById('year').textContent = new Date().getFullYear();

async function loadGallery() {
  try {
    const res = await fetch('gallery.json');
    const images = await res.json();
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = 'images/' + src;
      img.alt = 'Portfolio photo';
      img.loading = 'lazy';
      img.className = 'thumb';
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.showModal();
      });
      grid.appendChild(img);
    });
  } catch (e) {
    const p = document.createElement('p');
    p.textContent = 'Add your image filenames to gallery.json to populate the gallery.';
    p.style.color = '#a0acc0';
    grid.parentElement.appendChild(p);
  }
}
closeBtn.addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.close();
});
loadGallery();
