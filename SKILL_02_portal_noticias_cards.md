# SKILL 02: Portal de Noticias con Cards Masonry y Popups de Artículo

## 1. Propósito y Filosofía
Genera portales de contenido editorial — noticias internas, boletines corporativos, comunicados, newsletters — con arquitectura de tarjetas tipo masonry y lectura inmersiva via popup. Ideal para comunicación interna, intranets y portales de conocimiento.

- **Enfoque:** Editorial, informativo, lectura fluida sin recargas de página.
- **UX:** Grid masonry de cards + filtros por categoría + popup inmersivo de artículo.
- **Estética:** Editorial moderno — blanco roto, tipografía fuerte, acentos en tinta y magenta.

---

## 2. Sistema de Diseño

### Paleta Editorial
| Elemento | HEX | Uso |
|---|---|---|
| Fondo | `#F8F7F4` | Body canvas |
| Cards | `#FFFFFF` | Superficie de tarjetas |
| Acento tinta | `#1A1A2E` | Headers y texto principal |
| Magenta editorial | `#E91E8C` | Tags, acentos, hover |
| Oro editorial | `#F4A100` | Categoría destacada |
| Texto cuerpo | `#3D3D3D` | Párrafos |
| Muted | `#9E9E9E` | Metadatos, fechas |

---

## 3. Reglas UX
1. **Cards masonry:** Altura variable según contenido, sin truncamiento artificial.
2. **Filtros animados:** Botones de categoría filtran cards con transición fade/scale.
3. **Popup artículo:** Click en card abre modal de lectura full con imagen, cuerpo y share.
4. **Scroll infinito simulado:** Botón "Cargar más" con animación de entrada escalonada.
5. **Card hover 3D:** Efecto sutil de perspectiva 3D al hacer hover sobre tarjetas.

---

## 4. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portal de Noticias</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F8F7F4;--white:#FFFFFF;--ink:#1A1A2E;--magenta:#E91E8C;
  --gold:#F4A100;--body-text:#3D3D3D;--muted:#9E9E9E;--border:#E8E8E8;
}
body{font-family:'Georgia',serif;background:var(--bg);color:var(--body-text);min-height:100vh}

/* HEADER */
.site-header{background:var(--ink);color:#fff;padding:0 40px}
.header-top{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.1)}
.site-logo{font-size:28px;font-weight:900;letter-spacing:-1px;font-family:system-ui,sans-serif}
.site-logo span{color:var(--magenta)}
.header-meta{font-size:12px;color:rgba(255,255,255,0.5);font-family:system-ui,sans-serif}
.header-nav{display:flex;gap:24px;padding:14px 0}
.nav-link{color:rgba(255,255,255,0.7);font-size:13px;text-decoration:none;font-family:system-ui,sans-serif;letter-spacing:.5px;text-transform:uppercase;cursor:pointer;transition:color .2s}
.nav-link:hover,.nav-link.active{color:var(--magenta)}

/* HERO ARTICLE */
.hero{position:relative;overflow:hidden;cursor:pointer;margin-bottom:40px}
.hero-img{width:100%;height:420px;background:linear-gradient(135deg,var(--ink),#16213e);display:flex;align-items:flex-end}
.hero-overlay{padding:40px;background:linear-gradient(to top,rgba(0,0,0,.85),transparent)}
.hero-tag{display:inline-block;background:var(--magenta);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:3px;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;font-family:system-ui,sans-serif}
.hero-title{font-size:36px;color:#fff;line-height:1.2;margin-bottom:10px;max-width:720px}
.hero-excerpt{color:rgba(255,255,255,0.7);font-size:16px;max-width:600px;line-height:1.6}
.hero-meta{margin-top:12px;color:rgba(255,255,255,0.5);font-size:13px;font-family:system-ui,sans-serif}
.hero:hover .hero-img{filter:brightness(1.1)}

/* FILTERS */
.filters-wrap{padding:0 40px;margin-bottom:28px}
.filters{display:flex;gap:8px;flex-wrap:wrap}
.filter-btn{padding:8px 18px;border:2px solid var(--border);background:var(--white);border-radius:30px;font-size:13px;cursor:pointer;transition:all .2s;font-family:system-ui,sans-serif;color:var(--muted)}
.filter-btn:hover,.filter-btn.active{background:var(--ink);color:#fff;border-color:var(--ink)}
.filter-btn.active.magenta{background:var(--magenta);border-color:var(--magenta)}

/* CARDS GRID */
.cards-grid{padding:0 40px;columns:3;column-gap:20px;margin-bottom:40px}
@media(max-width:900px){.cards-grid{columns:2}}
@media(max-width:600px){.cards-grid{columns:1}}
.news-card{break-inside:avoid;background:var(--white);border-radius:10px;overflow:hidden;margin-bottom:20px;border:1px solid var(--border);cursor:pointer;transition:all .3s;transform-style:preserve-3d}
.news-card:hover{transform:translateY(-6px) rotateX(2deg);box-shadow:0 20px 50px rgba(0,0,0,0.12)}
.card-img{width:100%;aspect-ratio:16/9;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:40px}
.card-img.c2{background:linear-gradient(135deg,#f093fb,#f5576c)}
.card-img.c3{background:linear-gradient(135deg,#4facfe,#00f2fe)}
.card-img.c4{background:linear-gradient(135deg,#43e97b,#38f9d7)}
.card-img.c5{background:linear-gradient(135deg,#fa709a,#fee140)}
.card-img.c6{background:linear-gradient(135deg,#a18cd1,#fbc2eb)}
.card-body{padding:16px}
.card-tag{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--magenta);font-family:system-ui,sans-serif;margin-bottom:8px}
.card-title{font-size:17px;line-height:1.3;margin-bottom:8px;color:var(--ink)}
.card-excerpt{font-size:14px;color:var(--body-text);line-height:1.6;margin-bottom:12px}
.card-meta{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--muted);font-family:system-ui,sans-serif;border-top:1px solid var(--border);padding-top:10px}
.card-author{display:flex;align-items:center;gap:6px}
.avatar{width:24px;height:24px;border-radius:50%;background:linear-gradient(135deg,var(--magenta),var(--gold));display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;font-family:system-ui,sans-serif}
.card-like{cursor:pointer;transition:color .2s;padding:4px}
.card-like:hover{color:var(--magenta)}

/* LOAD MORE */
.load-more-wrap{text-align:center;padding:20px 0 60px}
.load-more-btn{padding:14px 40px;background:transparent;border:2px solid var(--ink);color:var(--ink);font-size:15px;border-radius:30px;cursor:pointer;font-family:system-ui,sans-serif;font-weight:600;transition:all .3s}
.load-more-btn:hover{background:var(--ink);color:#fff}

/* ARTICLE MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px);z-index:1000;display:none;overflow-y:auto;padding:40px 20px}
.modal-overlay.show{display:block}
.article-modal{background:var(--white);max-width:760px;margin:0 auto;border-radius:12px;overflow:hidden;animation:slideIn .35s ease}
@keyframes slideIn{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.article-hero{height:360px;background:linear-gradient(135deg,var(--ink),#16213e);display:flex;align-items:center;justify-content:center;font-size:80px;position:relative}
.article-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:18px;backdrop-filter:blur(4px)}
.article-close:hover{background:var(--magenta)}
.article-body{padding:36px}
.article-tag{display:inline-block;background:var(--magenta);color:#fff;font-size:11px;font-weight:700;padding:4px 10px;border-radius:3px;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;font-family:system-ui,sans-serif}
.article-title{font-size:30px;line-height:1.2;color:var(--ink);margin-bottom:16px}
.article-meta{display:flex;align-items:center;gap:16px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid var(--border);font-size:13px;color:var(--muted);font-family:system-ui,sans-serif}
.article-text{font-size:17px;line-height:1.8;color:var(--body-text)}
.article-text p{margin-bottom:16px}
.article-share{margin-top:28px;padding-top:20px;border-top:1px solid var(--border);display:flex;gap:10px;align-items:center;font-family:system-ui,sans-serif;font-size:13px;color:var(--muted)}
.share-btn{padding:8px 16px;border-radius:20px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:13px;transition:all .2s}
.share-btn:hover{background:var(--ink);color:#fff;border-color:var(--ink)}

/* Fade filter animation */
.news-card{opacity:1;transform:scale(1);transition:opacity .3s,transform .3s,box-shadow .3s,translateY .3s}
.news-card.hidden{opacity:0;transform:scale(0.9);pointer-events:none;position:absolute}
</style>
</head>
<body>

<header class="site-header">
  <div class="header-top">
    <div class="site-logo">PRESS<span>HUB</span></div>
    <div class="header-meta">Lunes, 9 de Noviembre de 2026 · Edición Digital</div>
  </div>
  <nav class="header-nav">
    <span class="nav-link active">Portada</span>
    <span class="nav-link">Economía</span>
    <span class="nav-link">Tecnología</span>
    <span class="nav-link">Innovación</span>
    <span class="nav-link">Cultura</span>
    <span class="nav-link">Opinión</span>
  </nav>
</header>

<div class="hero" onclick="openArticle('hero')">
  <div class="hero-img">
    <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:120px;opacity:.15">🌐</div>
    <div class="hero-overlay" style="width:100%">
      <div class="hero-tag">🔥 Destacado</div>
      <h1 class="hero-title">La Transformación Digital que Está Redefiniendo el Futuro Empresarial Latinoamericano</h1>
      <p class="hero-excerpt">Las organizaciones líderes de la región están adoptando IA y automatización para competir en el mercado global con resultados sin precedentes.</p>
      <div class="hero-meta">Por Ana García · 9 Nov 2026 · 8 min de lectura</div>
    </div>
  </div>
</div>

<div class="filters-wrap">
  <div class="filters">
    <button class="filter-btn active magenta" onclick="filterCards('all',this)">📰 Todos</button>
    <button class="filter-btn" onclick="filterCards('tech',this)">💻 Tecnología</button>
    <button class="filter-btn" onclick="filterCards('economy',this)">📈 Economía</button>
    <button class="filter-btn" onclick="filterCards('innovation',this)">🚀 Innovación</button>
    <button class="filter-btn" onclick="filterCards('culture',this)">🎭 Cultura</button>
  </div>
</div>

<div class="cards-grid" id="cardsGrid">
  <div class="news-card" data-cat="tech" onclick="openArticle('a1')">
    <div class="card-img c2">🤖</div>
    <div class="card-body">
      <div class="card-tag">💻 Tecnología</div>
      <h3 class="card-title">GPT-5 llega a Colombia: Impacto en el sector financiero y laboral</h3>
      <p class="card-excerpt">Los grandes bancos ya implementan modelos de lenguaje para automatizar procesos que antes tomaban semanas.</p>
      <div class="card-meta"><div class="card-author"><div class="avatar">JM</div>Juan Mesa</div><span>4 min · ♡ 142</span></div>
    </div>
  </div>
  <div class="news-card" data-cat="economy" onclick="openArticle('a2')">
    <div class="card-img c3">📊</div>
    <div class="card-body">
      <div class="card-tag">📈 Economía</div>
      <h3 class="card-title">PIB Colombia crece 3.8% en Q3: Sector tecnológico lidera la recuperación</h3>
      <p class="card-excerpt">Los datos del DANE confirman una reactivación sostenida impulsada por startups tecnológicas y exportaciones de servicios digitales.</p>
      <div class="card-meta"><div class="card-author"><div class="avatar">SR</div>Sandra Ríos</div><span>6 min · ♡ 89</span></div>
    </div>
  </div>
  <div class="news-card" data-cat="innovation" onclick="openArticle('a3')">
    <div class="card-img c4">🚀</div>
    <div class="card-body">
      <div class="card-tag">🚀 Innovación</div>
      <h3 class="card-title">Startup bogotana recibe $40M USD para revolucionar la logística con drones</h3>
      <p class="card-excerpt">AeroLog Colombia supera la ronda Serie B gracias a su sistema de entregas autónomas en zonas de difícil acceso.</p>
      <div class="card-meta"><div class="card-author"><div class="avatar">PL</div>Pedro Luna</div><span>3 min · ♡ 215</span></div>
    </div>
  </div>
  <div class="news-card" data-cat="culture" onclick="openArticle('a4')">
    <div class="card-img c5">🎨</div>
    <div class="card-body">
      <div class="card-tag">🎭 Cultura</div>
      <h3 class="card-title">El renacimiento del diseño colombiano en los mercados internacionales</h3>
      <p class="card-excerpt">Diseñadores locales conquistan pasarelas en Milán, París y Nueva York con colecciones que fusionan tradición y modernidad.</p>
      <div class="card-meta"><div class="card-author"><div class="avatar">CV</div>Clara V.</div><span>5 min · ♡ 67</span></div>
    </div>
  </div>
  <div class="news-card" data-cat="tech" onclick="openArticle('a5')">
    <div class="card-img c6">🔐</div>
    <div class="card-body">
      <div class="card-tag">💻 Tecnología</div>
      <h3 class="card-title">Ciberseguridad 2026: Las 5 amenazas que mantienen en alerta a los CISOs</h3>
      <p class="card-excerpt">Ransomware cuántico, deepfakes corporativos y ataques a infraestructura crítica dominan el panorama de riesgos digitales.</p>
      <div class="card-meta"><div class="card-author"><div class="avatar">MR</div>Marco R.</div><span>7 min · ♡ 193</span></div>
    </div>
  </div>
  <div class="news-card" data-cat="economy" onclick="openArticle('a6')">
    <div class="card-img" style="background:linear-gradient(135deg,#f7971e,#ffd200)">💰</div>
    <div class="card-body">
      <div class="card-tag">📈 Economía</div>
      <h3 class="card-title">Remesas 2026: $10B USD fluyen hacia Latinoamérica vía criptomonedas</h3>
      <p class="card-excerpt">Bitcoin y stablecoins desplazan a Western Union en el envío de remesas hacia México, Colombia y El Salvador.</p>
      <div class="card-meta"><div class="card-author"><div class="avatar">AH</div>Andrés H.</div><span>5 min · ♡ 304</span></div>
    </div>
  </div>
</div>

<div class="load-more-wrap">
  <button class="load-more-btn" onclick="loadMore()">Cargar más artículos</button>
</div>

<!-- MODAL -->
<div class="modal-overlay" id="articleModal">
  <div class="article-modal">
    <div class="article-hero" id="modalHeroIcon">📰</div>
    <div class="article-body">
      <span class="article-tag" id="modalTag">Categoría</span>
      <h2 class="article-title" id="modalTitle">Título del Artículo</h2>
      <div class="article-meta">
        <span>✍️ <span id="modalAuthor">Autor</span></span>
        <span>📅 <span id="modalDate">Fecha</span></span>
        <span>⏱️ <span id="modalRead">X min de lectura</span></span>
      </div>
      <div class="article-text" id="modalBody"></div>
      <div class="article-share">
        <span>Compartir:</span>
        <button class="share-btn">📤 LinkedIn</button>
        <button class="share-btn">🐦 Twitter</button>
        <button class="share-btn">📋 Copiar enlace</button>
        <button class="share-btn" style="margin-left:auto" onclick="closeArticle()">✕ Cerrar</button>
      </div>
    </div>
  </div>
</div>

<script>
const articles={
  hero:{icon:'🌐',tag:'🔥 Destacado',title:'La Transformación Digital que Redefine el Futuro Empresarial',author:'Ana García',date:'9 Nov 2026',read:'8 min',body:'<p>La transformación digital ya no es una opción estratégica: es una condición de supervivencia para las empresas latinoamericanas. Los líderes que hace cinco años dudaban en invertir en tecnología hoy lideran sus mercados, mientras quienes postergaron la decisión luchan por mantenerse relevantes.</p><p>Según el último informe de IDC para Latinoamérica, el gasto en tecnología de la región superará los $400 mil millones de dólares en 2027, impulsado principalmente por inteligencia artificial, automatización y computación en la nube.</p><p><strong>El caso de las empresas colombianas es paradigmático.</strong> Organizaciones como Bancolombia, Éxito y Avianca han transformado sus modelos operativos completamente, logrando eficiencias superiores al 35% en sus procesos core en los últimos 24 meses.</p>'},
  a1:{icon:'🤖',tag:'💻 Tecnología',title:'GPT-5 llega a Colombia: Impacto en el sector financiero',author:'Juan Mesa',date:'9 Nov 2026',read:'4 min',body:'<p>La llegada de GPT-5 a Colombia marca un antes y un después en la industria financiera del país. Los principales bancos han comenzado a implementar el modelo en sus operaciones de back-office, logrando automatizar el 60% de los procesos de análisis de crédito.</p><p>Davivienda reportó una reducción del 72% en el tiempo de aprobación de créditos hipotecarios, mientras Bancolombia automatizó completamente su proceso de onboarding digital para clientes personas naturales.</p>'},
  a3:{icon:'🚀',tag:'🚀 Innovación',title:'Startup bogotana recibe $40M USD para drones logísticos',author:'Pedro Luna',date:'8 Nov 2026',read:'3 min',body:'<p>AeroLog Colombia cerró exitosamente su ronda Serie B por $40 millones de dólares, liderada por fondos de Silicon Valley y el Fondo Nacional de Garantías. La startup, fundada en 2023 por egresados de los Andes y el ITBA, opera actualmente en 12 departamentos colombianos.</p><p>Su sistema de drones autónomos permite entregar medicamentos, alimentos y documentos en zonas rurales con costos 80% menores a los de operadores tradicionales.</p>'}
};

function openArticle(id){
  const a=articles[id]||{icon:'📰',tag:'Artículo',title:'Contenido del Artículo',author:'Redacción',date:'Nov 2026',read:'5 min',body:'<p>Contenido completo del artículo disponible en esta vista de lectura inmersiva.</p>'};
  document.getElementById('modalHeroIcon').textContent=a.icon;
  document.getElementById('modalTag').textContent=a.tag;
  document.getElementById('modalTitle').textContent=a.title;
  document.getElementById('modalAuthor').textContent=a.author;
  document.getElementById('modalDate').textContent=a.date;
  document.getElementById('modalRead').textContent=a.read;
  document.getElementById('modalBody').innerHTML=a.body;
  document.getElementById('articleModal').classList.add('show');
  document.body.style.overflow='hidden';
}
function closeArticle(){
  document.getElementById('articleModal').classList.remove('show');
  document.body.style.overflow='';
}
document.getElementById('articleModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeArticle()});

function filterCards(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active','magenta'));
  btn.classList.add('active','magenta');
  document.querySelectorAll('.news-card').forEach(c=>{
    if(cat==='all'||c.dataset.cat===cat){c.style.opacity='1';c.style.transform='scale(1)';c.style.pointerEvents='auto'}
    else{c.style.opacity='0.2';c.style.transform='scale(0.95)';c.style.pointerEvents='none'}
  });
}

let loadCount=0;
function loadMore(){
  loadCount++;
  const grid=document.getElementById('cardsGrid');
  const emojis=['🌍','💡','🔬','📱','🎯','🏆'];
  const tags=[['tech','💻 Tecnología'],['economy','📈 Economía'],['innovation','🚀 Innovación']];
  const t=tags[loadCount%3];
  const card=document.createElement('div');
  card.className='news-card';card.dataset.cat=t[0];card.style.opacity='0';card.style.transform='translateY(20px)';
  card.innerHTML=`<div class="card-img" style="background:linear-gradient(135deg,hsl(${loadCount*60},70%,50%),hsl(${loadCount*60+60},70%,40%))">${emojis[loadCount%6]}</div><div class="card-body"><div class="card-tag">${t[1]}</div><h3 class="card-title">Nuevo artículo cargado dinámicamente #${loadCount}</h3><p class="card-excerpt">Este artículo fue cargado de forma dinámica al hacer clic en el botón de cargar más.</p><div class="card-meta"><div class="card-author"><div class="avatar">NN</div>Redacción</div><span>3 min · ♡ ${Math.floor(Math.random()*200)}</span></div></div>`;
  card.onclick=()=>openArticle('generic');
  grid.appendChild(card);
  setTimeout(()=>{card.style.transition='opacity .4s,transform .4s';card.style.opacity='1';card.style.transform='translateY(0)'},50);
}
</script>
</body>
</html>
```
