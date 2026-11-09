# SKILL 08: Galería Multimedia con Lightbox, Filtros y Vista Masonry

## 1. Propósito y Filosofía
Genera galerías visuales de alto impacto para portfolios, catálogos de productos, galerías fotográficas y showcases de proyectos. Lightbox inmersivo con navegación fluida y zoom.

- **Enfoque:** Visual-first, exploración de contenido sin fricciones, experiencia inmersiva.
- **UX:** Grid masonry + filtros animados + lightbox con zoom + navegación por teclado.
- **Estética:** Dark gallery — negro profundo + acentos blancos + hover revelar información.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Galería Multimedia</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0A0A0A;color:#fff;min-height:100vh}

.gallery-header{padding:40px;text-align:center;position:relative}
.gallery-header::after{content:'';position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:60px;height:2px;background:linear-gradient(90deg,transparent,#fff,transparent)}
.gallery-title{font-size:clamp(28px,4vw,52px);font-weight:900;letter-spacing:-2px;margin-bottom:8px}
.gallery-title span{background:linear-gradient(135deg,#FF6B6B,#FFE66D);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.gallery-sub{color:rgba(255,255,255,.5);font-size:15px}

.filter-bar{display:flex;gap:8px;justify-content:center;padding:28px 20px;flex-wrap:wrap}
.filter-chip{padding:8px 20px;border-radius:30px;border:1px solid rgba(255,255,255,.2);background:transparent;color:rgba(255,255,255,.6);font-size:13px;cursor:pointer;transition:all .3s;font-family:inherit}
.filter-chip:hover{background:rgba(255,255,255,.1);color:#fff}
.filter-chip.active{background:#fff;color:#000;border-color:#fff;font-weight:700}

.gallery-grid{padding:0 20px 60px;columns:4;column-gap:12px}
@media(max-width:1200px){.gallery-grid{columns:3}}
@media(max-width:768px){.gallery-grid{columns:2}}
@media(max-width:480px){.gallery-grid{columns:1}}

.gallery-item{break-inside:avoid;margin-bottom:12px;cursor:pointer;position:relative;border-radius:10px;overflow:hidden;group:true}
.gallery-item-inner{position:relative;overflow:hidden;border-radius:10px}
.item-thumb{width:100%;display:block;border-radius:10px;transition:transform .4s ease}
.gallery-item:hover .item-thumb{transform:scale(1.05)}
.item-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.85) 0%,transparent 50%);opacity:0;transition:opacity .3s;display:flex;flex-direction:column;justify-content:flex-end;padding:16px;border-radius:10px}
.gallery-item:hover .item-overlay{opacity:1}
.item-category{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,.7);margin-bottom:4px}
.item-title{font-size:14px;font-weight:600;margin-bottom:4px}
.item-desc{font-size:12px;color:rgba(255,255,255,.6);line-height:1.4}
.item-expand{position:absolute;top:12px;right:12px;width:28px;height:28px;background:rgba(255,255,255,.2);backdrop-filter:blur(4px);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;opacity:0;transition:opacity .2s}
.gallery-item:hover .item-expand{opacity:1}

/* Color blocks for demo */
.thumb-block{width:100%;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:50px;font-weight:900;color:rgba(0,0,0,.2)}

/* LIGHTBOX */
.lightbox{position:fixed;inset:0;background:rgba(0,0,0,.96);z-index:1000;display:none;flex-direction:column;align-items:center;justify-content:center}
.lightbox.show{display:flex}
.lb-toolbar{position:absolute;top:0;left:0;right:0;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;background:linear-gradient(to bottom,rgba(0,0,0,.7),transparent);z-index:10}
.lb-info{font-size:14px;color:rgba(255,255,255,.7)}
.lb-controls{display:flex;gap:10px}
.lb-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.lb-btn:hover{background:rgba(255,255,255,.25)}
.lb-nav{position:absolute;top:50%;transform:translateY(-50%);display:flex;gap:16px;width:100%;padding:0 20px;justify-content:space-between;pointer-events:none;z-index:10}
.lb-nav-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;width:48px;height:48px;border-radius:50%;cursor:pointer;font-size:20px;display:flex;align-items:center;justify-content:center;transition:all .2s;pointer-events:all;backdrop-filter:blur(10px)}
.lb-nav-btn:hover{background:rgba(255,255,255,.25)}
.lb-main{max-width:min(900px,90vw);max-height:70vh;position:relative}
.lb-visual{max-width:100%;max-height:60vh;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:120px;min-height:300px;min-width:500px;transition:transform .3s ease}
.lb-visual.zoomed{transform:scale(1.5);cursor:zoom-out}
.lb-visual:not(.zoomed){cursor:zoom-in}
.lb-caption{position:absolute;bottom:-80px;left:0;right:0;text-align:center}
.lb-category{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:rgba(255,255,255,.5);margin-bottom:6px}
.lb-title{font-size:20px;font-weight:700;margin-bottom:4px}
.lb-description{font-size:14px;color:rgba(255,255,255,.6);line-height:1.5}
.lb-thumbs{position:absolute;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:6px;padding:8px;background:rgba(0,0,0,.5);border-radius:8px;backdrop-filter:blur(10px)}
.lb-thumb-item{width:40px;height:28px;border-radius:4px;cursor:pointer;border:2px solid transparent;transition:all .2s;display:flex;align-items:center;justify-content:center;font-size:14px;opacity:.6}
.lb-thumb-item.active{border-color:#fff;opacity:1}
.lb-thumb-item:hover{opacity:1}
</style>
</head>
<body>

<div class="gallery-header">
  <h1 class="gallery-title">VISUAL<span>STUDIO</span></h1>
  <p class="gallery-sub">Colección de proyectos creativos · 2024–2026</p>
</div>

<div class="filter-bar">
  <button class="filter-chip active" onclick="filterGallery('all',this)">✦ Todo</button>
  <button class="filter-chip" onclick="filterGallery('design',this)">🎨 Diseño</button>
  <button class="filter-chip" onclick="filterGallery('photo',this)">📸 Fotografía</button>
  <button class="filter-chip" onclick="filterGallery('branding',this)">🏷️ Branding</button>
  <button class="filter-chip" onclick="filterGallery('web',this)">🌐 Web</button>
  <button class="filter-chip" onclick="filterGallery('video',this)">🎬 Video</button>
</div>

<div class="gallery-grid" id="galleryGrid">

  <div class="gallery-item" data-cat="design" data-idx="0" onclick="openLightbox(0)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#667eea,#764ba2);height:280px">🎨</div>
      <div class="item-overlay"><div class="item-category">Diseño</div><div class="item-title">Identidad Visual Corporativa</div><div class="item-desc">Sistema completo de identidad para startup fintech</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

  <div class="gallery-item" data-cat="photo" data-idx="1" onclick="openLightbox(1)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#f093fb,#f5576c);height:200px">📸</div>
      <div class="item-overlay"><div class="item-category">Fotografía</div><div class="item-title">Sesión Producto Premium</div><div class="item-desc">Fotografía comercial para colección de lujo</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

  <div class="gallery-item" data-cat="branding" data-idx="2" onclick="openLightbox(2)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#4facfe,#00f2fe);height:360px">🏷️</div>
      <div class="item-overlay"><div class="item-category">Branding</div><div class="item-title">Rebrand Avianca Digital</div><div class="item-desc">Transformación de identidad para la era digital</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

  <div class="gallery-item" data-cat="web" data-idx="3" onclick="openLightbox(3)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#43e97b,#38f9d7);height:240px">🌐</div>
      <div class="item-overlay"><div class="item-category">Web</div><div class="item-title">Portal E-Commerce Premium</div><div class="item-desc">UX optimizado para conversión máxima</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

  <div class="gallery-item" data-cat="video" data-idx="4" onclick="openLightbox(4)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#fa709a,#fee140);height:200px">🎬</div>
      <div class="item-overlay"><div class="item-category">Video</div><div class="item-title">Motion Graphics Corporativo</div><div class="item-desc">Animación 3D para campaña de lanzamiento</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

  <div class="gallery-item" data-cat="design" data-idx="5" onclick="openLightbox(5)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#a18cd1,#fbc2eb);height:300px">✍️</div>
      <div class="item-overlay"><div class="item-category">Diseño</div><div class="item-title">Packaging Artesanal</div><div class="item-desc">Diseño sostenible para marca ecológica</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

  <div class="gallery-item" data-cat="photo" data-idx="6" onclick="openLightbox(6)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#ffecd2,#fcb69f);height:220px">🌅</div>
      <div class="item-overlay"><div class="item-category">Fotografía</div><div class="item-title">Arquitectura Urbana</div><div class="item-desc">Serie fotográfica · Bogotá 2026</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

  <div class="gallery-item" data-cat="branding" data-idx="7" onclick="openLightbox(7)">
    <div class="gallery-item-inner">
      <div class="thumb-block" style="background:linear-gradient(135deg,#2d3561,#c05c7e);height:260px">💎</div>
      <div class="item-overlay"><div class="item-category">Branding</div><div class="item-title">Lujo & Lifestyle Brand</div><div class="item-desc">Identidad para marca de joyería exclusiva</div></div>
      <div class="item-expand">⤢</div>
    </div>
  </div>

</div>

<!-- LIGHTBOX -->
<div class="lightbox" id="lightbox">
  <div class="lb-toolbar">
    <div class="lb-info" id="lbInfo">1 / 8</div>
    <div class="lb-controls">
      <button class="lb-btn" onclick="toggleZoom()" title="Zoom">🔍</button>
      <button class="lb-btn" title="Descargar">⬇</button>
      <button class="lb-btn" onclick="closeLightbox()" title="Cerrar">✕</button>
    </div>
  </div>

  <div class="lb-nav">
    <button class="lb-nav-btn" onclick="lbNav(-1)">◀</button>
    <button class="lb-nav-btn" onclick="lbNav(1)">▶</button>
  </div>

  <div class="lb-main">
    <div class="lb-visual" id="lbVisual" onclick="toggleZoom()"></div>
    <div class="lb-caption">
      <div class="lb-category" id="lbCategory">Categoría</div>
      <div class="lb-title" id="lbTitle">Título</div>
      <div class="lb-description" id="lbDesc">Descripción</div>
    </div>
  </div>

  <div class="lb-thumbs" id="lbThumbs"></div>
</div>

<script>
const items=[
  {cat:'Diseño',emoji:'🎨',bg:'linear-gradient(135deg,#667eea,#764ba2)',title:'Identidad Visual Corporativa',desc:'Sistema completo de identidad visual para startup fintech colombiana. Incluye logotipo, tipografía, paleta y guía de uso.'},
  {cat:'Fotografía',emoji:'📸',bg:'linear-gradient(135deg,#f093fb,#f5576c)',title:'Sesión Producto Premium',desc:'Fotografía comercial de producto para colección de lujo. Iluminación de estudio y retoque profesional.'},
  {cat:'Branding',emoji:'🏷️',bg:'linear-gradient(135deg,#4facfe,#00f2fe)',title:'Rebrand Avianca Digital',desc:'Transformación completa de identidad para la era digital. Sistema de diseño con más de 200 componentes.'},
  {cat:'Web',emoji:'🌐',bg:'linear-gradient(135deg,#43e97b,#38f9d7)',title:'Portal E-Commerce Premium',desc:'Plataforma de comercio electrónico con UX optimizado para máxima conversión. +40% en ventas post-lanzamiento.'},
  {cat:'Video',emoji:'🎬',bg:'linear-gradient(135deg,#fa709a,#fee140)',title:'Motion Graphics Corporativo',desc:'Animación 3D para campaña de lanzamiento de producto. Producción completa en 3 semanas.'},
  {cat:'Diseño',emoji:'✍️',bg:'linear-gradient(135deg,#a18cd1,#fbc2eb)',title:'Packaging Artesanal',desc:'Diseño de empaque sostenible para marca ecológica. Materiales 100% reciclados y tintas naturales.'},
  {cat:'Fotografía',emoji:'🌅',bg:'linear-gradient(135deg,#ffecd2,#fcb69f)',title:'Arquitectura Urbana',desc:'Serie fotográfica documental sobre la transformación urbana de Bogotá. 48 fotografías de edición limitada.'},
  {cat:'Branding',emoji:'💎',bg:'linear-gradient(135deg,#2d3561,#c05c7e)',title:'Lujo & Lifestyle Brand',desc:'Identidad visual completa para marca de joyería exclusiva de alta gama. Posicionamiento premium internacional.'}
];

let currentLb=0;let zoomed=false;

function openLightbox(idx){
  currentLb=idx;zoomed=false;
  document.getElementById('lightbox').classList.add('show');
  renderLightbox();
  renderThumbs();
}

function renderLightbox(){
  const item=items[currentLb];
  const visual=document.getElementById('lbVisual');
  visual.style.background=item.bg;visual.textContent=item.emoji;visual.classList.remove('zoomed');
  document.getElementById('lbCategory').textContent=item.cat;
  document.getElementById('lbTitle').textContent=item.title;
  document.getElementById('lbDesc').textContent=item.desc;
  document.getElementById('lbInfo').textContent=`${currentLb+1} / ${items.length}`;
  document.querySelectorAll('.lb-thumb-item').forEach((t,i)=>t.classList.toggle('active',i===currentLb));
}

function renderThumbs(){
  const thumbs=document.getElementById('lbThumbs');
  thumbs.innerHTML=items.map((item,i)=>`<div class="lb-thumb-item${i===currentLb?' active':''}" onclick="currentLb=${i};renderLightbox()" style="background:${item.bg}">${item.emoji}</div>`).join('');
}

function closeLightbox(){document.getElementById('lightbox').classList.remove('show')}
function lbNav(dir){currentLb=(currentLb+dir+items.length)%items.length;zoomed=false;renderLightbox()}
function toggleZoom(){zoomed=!zoomed;document.getElementById('lbVisual').classList.toggle('zoomed',zoomed)}

document.getElementById('lightbox').addEventListener('click',e=>{if(e.target===e.currentTarget)closeLightbox()});
document.addEventListener('keydown',e=>{
  if(!document.getElementById('lightbox').classList.contains('show'))return;
  if(e.key==='ArrowRight')lbNav(1);
  if(e.key==='ArrowLeft')lbNav(-1);
  if(e.key==='Escape')closeLightbox();
  if(e.key===' '){e.preventDefault();toggleZoom()}
});

function filterGallery(cat,btn){
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach((item,i)=>{
    const show=cat==='all'||item.dataset.cat===cat;
    item.style.transition=`opacity .3s ${i*.04}s,transform .3s ${i*.04}s`;
    item.style.opacity=show?'1':'0.1';
    item.style.transform=show?'scale(1)':'scale(0.95)';
    item.style.pointerEvents=show?'auto':'none';
  });
}
</script>
</body>
</html>
```
