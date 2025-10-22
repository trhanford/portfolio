
document.getElementById('year').textContent = new Date().getFullYear();

// Portfolio rail loader
async function loadRail(){
  const rail = document.getElementById('rail');
  if(!rail) return;
  try{
    const res = await fetch('gallery.json');
    const data = await res.json();
    data.forEach(item=>{
      const tile = document.createElement('div');
      tile.className='tile';
      const img = document.createElement('img');
      const src = (typeof item === 'string') ? item : item.src;
      img.src = 'images/' + src;
      img.alt = (typeof item === 'string') ? 'Portfolio image' : (item.caption || 'Portfolio image');
      img.loading='lazy';
      const cap = document.createElement('div');
      cap.className='cap';
      cap.textContent = (typeof item === 'string') ? '' : (item.caption || '');
      tile.appendChild(img); tile.appendChild(cap);
      rail.appendChild(tile);
    });
  }catch(e){
    const p=document.createElement('p'); p.textContent='Add your images in /images and list them in gallery.json'; p.style.color='#a0acc0';
    rail.parentElement.appendChild(p);
  }
  const prev=document.getElementById('prev');
  const next=document.getElementById('next');
  const step = ()=> rail.clientWidth * 0.9;
  prev?.addEventListener('click', ()=> rail.scrollBy({left:-step(), behavior:'smooth'}));
  next?.addEventListener('click', ()=> rail.scrollBy({left: step(), behavior:'smooth'}));
}
loadRail();
