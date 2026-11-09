# SKILL 04: Portfolio Creativo con Ventanas Flotantes y Efecto Glassmorphism

## 1. Propósito y Filosofía
Genera portfolios visuales de alta gama para presentar proyectos, productos o servicios con ventanas flotantes drag-able y efectos glassmorphism. Ideal para presentaciones de propuestas, showcases de productos y portfolios profesionales.

- **Enfoque:** Visual, creativo, impact-first. Los proyectos "hablan" antes de leer.
- **UX:** Grid de proyectos + ventanas flotantes arrastrables + filtros animados + zoom en imágenes.
- **Estética:** Glassmorphism premium — fondo degradado oscuro + vidrio translúcido + bordes luz.

---

## 2. Sistema de Diseño

### Paleta Glassmorphism
| Elemento | HEX / Valor | Uso |
|---|---|---|
| Fondo degradado | `135deg, #0f0c29, #302b63, #24243e` | Background body |
| Glass surface | `rgba(255,255,255,0.08)` | Tarjetas y ventanas |
| Glass border | `rgba(255,255,255,0.15)` | Bordes translúcidos |
| Acento cyan | `#00FFC6` | Hover, selección activa |
| Acento magenta | `#FF006E` | Tags, badges |
| Texto claro | `#FFFFFF` | Títulos |
| Texto muted | `rgba(255,255,255,0.6)` | Descripciones |

---

## 3. Reglas UX
1. **Ventanas flotantes drag-able:** Click en proyecto abre ventana flotante reposicionable.
2. **Múltiples ventanas:** Pueden abrirse varias simultáneamente, z-index dinámico por foco.
3. **Minimizar/maximizar:** Cada ventana tiene controles de minimize y maximize al estilo macOS.
4. **Filtros de categoría:** Animación de entrada escalonada al filtrar proyectos.
5. **Partículas de fondo:** Canvas de partículas animadas como fondo dinámico.

---

## 4. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portfolio Creativo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --glass:rgba(255,255,255,0.08);--glass-border:rgba(255,255,255,0.15);
  --cyan:#00FFC6;--magenta:#FF006E;--text:#fff;--muted:rgba(255,255,255,.6);
  --shadow:0 8px 32px rgba(0,0,0,.4);
}
body{font-family:'Segoe UI',system-ui,sans-serif;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);min-height:100vh;color:var(--text);overflow-x:hidden}
canvas#particles{position:fixed;inset:0;z-index:0;pointer-events:none}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 40px;display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,.2);backdrop-filter:blur(20px);border-bottom:1px solid var(--glass-border)}
.nav-logo{font-size:22px;font-weight:800;letter-spacing:-1px}.nav-logo span{color:var(--cyan)}
.nav-links{display:flex;gap:24px}
.nav-link{color:var(--muted);font-size:14px;text-decoration:none;cursor:pointer;transition:color .2s}
.nav-link:hover{color:var(--cyan)}
.nav-cta{background:linear-gradient(135deg,var(--cyan),#00A8FF);color:#000;border:none;padding:8px 20px;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s}
.nav-cta:hover{transform:scale(1.05);box-shadow:0 0 20px rgba(0,255,198,.4)}

/* HERO */
.hero-section{padding:160px 40px 80px;text-align:center;position:relative;z-index:1}
.hero-tag{display:inline-block;background:linear-gradient(135deg,var(--magenta),#8B00FF);padding:6px 16px;border-radius:20px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px}
.hero-title{font-size:clamp(40px,6vw,80px);font-weight:900;line-height:1.1;margin-bottom:16px;background:linear-gradient(135deg,#fff,var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-sub{color:var(--muted);font-size:18px;max-width:500px;margin:0 auto 32px}
.hero-actions{display:flex;gap:12px;justify-content:center}
.btn-glass{background:var(--glass);border:1px solid var(--glass-border);color:#fff;padding:12px 24px;border-radius:10px;font-size:14px;cursor:pointer;backdrop-filter:blur(10px);transition:all .3s}
.btn-glass:hover{background:rgba(255,255,255,.15);border-color:var(--cyan);box-shadow:0 0 20px rgba(0,255,198,.2)}

/* FILTERS */
.filters-section{padding:0 40px 32px;text-align:center;position:relative;z-index:1}
.filter-pills{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.pill{background:var(--glass);border:1px solid var(--glass-border);color:var(--muted);padding:8px 20px;border-radius:30px;font-size:13px;cursor:pointer;backdrop-filter:blur(10px);transition:all .3s}
.pill:hover,.pill.active{background:linear-gradient(135deg,var(--cyan),#00A8FF);border-color:transparent;color:#000;font-weight:700}

/* PROJECT GRID */
.projects-grid{padding:0 40px 100px;display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:24px;position:relative;z-index:1}
.project-card{background:var(--glass);border:1px solid var(--glass-border);border-radius:16px;overflow:hidden;cursor:pointer;transition:all .4s;backdrop-filter:blur(20px);position:relative}
.project-card::before{content:'';position:absolute;inset:0;border-radius:16px;background:linear-gradient(135deg,rgba(0,255,198,.1),transparent);opacity:0;transition:opacity .3s}
.project-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 60px rgba(0,255,198,.2);border-color:rgba(0,255,198,.4)}
.project-card:hover::before{opacity:1}
.project-thumb{height:220px;display:flex;align-items:center;justify-content:center;font-size:70px;position:relative;overflow:hidden}
.project-thumb::after{content:'🔍';position:absolute;inset:0;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;font-size:36px;opacity:0;transition:opacity .3s;display:grid;place-items:center}
.project-card:hover .project-thumb::after{opacity:1}
.project-info{padding:20px}
.project-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
.tag{background:rgba(255,0,110,.2);border:1px solid rgba(255,0,110,.4);color:var(--magenta);font-size:10px;font-weight:700;padding:3px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.5px}
.tag.cyan{background:rgba(0,255,198,.1);border-color:rgba(0,255,198,.3);color:var(--cyan)}
.project-title{font-size:18px;font-weight:700;margin-bottom:8px}
.project-desc{color:var(--muted);font-size:14px;line-height:1.5;margin-bottom:14px}
.project-meta{display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--muted)}
.project-year{background:var(--glass);padding:4px 10px;border-radius:4px;border:1px solid var(--glass-border)}

/* FLOATING WINDOWS */
.float-window{position:fixed;background:rgba(15,12,41,.92);border:1px solid var(--glass-border);border-radius:12px;min-width:460px;max-width:600px;box-shadow:0 20px 60px rgba(0,0,0,.8);z-index:500;display:none;overflow:hidden;backdrop-filter:blur(30px)}
.float-window.visible{display:block}
.win-titlebar{display:flex;align-items:center;gap:10px;padding:12px 16px;background:rgba(255,255,255,.05);cursor:move;user-select:none;border-bottom:1px solid var(--glass-border)}
.win-controls{display:flex;gap:6px}
.win-btn{width:14px;height:14px;border-radius:50%;border:none;cursor:pointer;font-size:0;transition:filter .2s}
.win-btn:hover{filter:brightness(1.3)}
.win-close{background:#FF5F57}
.win-min{background:#FEBC2E}
.win-max{background:#28C840}
.win-title{flex:1;text-align:center;font-size:13px;color:var(--muted);margin-left:-46px}
.win-content{padding:24px;overflow-y:auto;max-height:70vh}
.win-hero{height:200px;border-radius:8px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;font-size:80px}
.win-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.win-title-h2{font-size:22px;font-weight:800;margin-bottom:10px;background:linear-gradient(135deg,#fff,var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.win-desc{color:var(--muted);font-size:15px;line-height:1.7;margin-bottom:20px}
.win-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px}
.win-stat{background:var(--glass);border:1px solid var(--glass-border);border-radius:8px;padding:12px;text-align:center}
.win-stat-val{font-size:20px;font-weight:800;color:var(--cyan)}
.win-stat-label{font-size:11px;color:var(--muted);margin-top:2px}
.win-actions{display:flex;gap:10px}
.win-action-btn{flex:1;padding:10px;border-radius:8px;border:1px solid var(--glass-border);background:var(--glass);color:#fff;font-size:13px;cursor:pointer;transition:all .2s;text-align:center}
.win-action-btn:hover{background:linear-gradient(135deg,var(--cyan),#00A8FF);color:#000;border-color:transparent;font-weight:700}
</style>
</head>
<body>
<canvas id="particles"></canvas>

<nav>
  <div class="nav-logo">CREA<span>TIVE</span></div>
  <div class="nav-links">
    <span class="nav-link">Proyectos</span>
    <span class="nav-link">Servicios</span>
    <span class="nav-link">Equipo</span>
    <span class="nav-link">Blog</span>
  </div>
  <button class="nav-cta">✉️ Contactar</button>
</nav>

<section class="hero-section">
  <div class="hero-tag">✦ Estudio de Innovación Digital</div>
  <h1 class="hero-title">Creamos<br>Experiencias<br>Extraordinarias</h1>
  <p class="hero-sub">Diseño, tecnología y estrategia para marcas que quieren diferenciarse.</p>
  <div class="hero-actions">
    <button class="btn-glass">Ver Proyectos ↓</button>
    <button class="nav-cta">Hablemos →</button>
  </div>
</section>

<div class="filters-section">
  <div class="filter-pills">
    <span class="pill active" onclick="filterProjects('all',this)">✦ Todos</span>
    <span class="pill" onclick="filterProjects('web',this)">🌐 Web</span>
    <span class="pill" onclick="filterProjects('app',this)">📱 Apps</span>
    <span class="pill" onclick="filterProjects('branding',this)">🎨 Branding</span>
    <span class="pill" onclick="filterProjects('data',this)">📊 Data</span>
  </div>
</div>

<div class="projects-grid" id="projectsGrid">
  <div class="project-card" data-cat="web" data-id="p1" onclick="openWindow('p1',event)">
    <div class="project-thumb" style="background:linear-gradient(135deg,#667eea,#764ba2)">🌐</div>
    <div class="project-info">
      <div class="project-tags"><span class="tag cyan">Web</span><span class="tag">UX/UI</span></div>
      <h3 class="project-title">Portal B2B Bancolombia</h3>
      <p class="project-desc">Rediseño completo del portal empresarial con arquitectura headless y micro-frontends.</p>
      <div class="project-meta"><span>Ana García · Lead Designer</span><span class="project-year">2026</span></div>
    </div>
  </div>
  <div class="project-card" data-cat="app" data-id="p2" onclick="openWindow('p2',event)">
    <div class="project-thumb" style="background:linear-gradient(135deg,#f093fb,#f5576c)">📱</div>
    <div class="project-info">
      <div class="project-tags"><span class="tag cyan">App</span><span class="tag">Mobile</span></div>
      <h3 class="project-title">App Fintech AhorraYa</h3>
      <p class="project-desc">Aplicación de ahorro gamificado con IA para jóvenes millennials y Gen Z colombianos.</p>
      <div class="project-meta"><span>Marco Reyes · Product Lead</span><span class="project-year">2025</span></div>
    </div>
  </div>
  <div class="project-card" data-cat="branding" data-id="p3" onclick="openWindow('p3',event)">
    <div class="project-thumb" style="background:linear-gradient(135deg,#43e97b,#38f9d7)">🎨</div>
    <div class="project-info">
      <div class="project-tags"><span class="tag">Branding</span><span class="tag">Identity</span></div>
      <h3 class="project-title">Rebrand Avianca Digital</h3>
      <p class="project-desc">Sistema de identidad visual completo para la transformación digital de la aerolínea.</p>
      <div class="project-meta"><span>Laura Díaz · Art Director</span><span class="project-year">2026</span></div>
    </div>
  </div>
  <div class="project-card" data-cat="data" data-id="p4" onclick="openWindow('p4',event)">
    <div class="project-thumb" style="background:linear-gradient(135deg,#4facfe,#00f2fe)">📊</div>
    <div class="project-info">
      <div class="project-tags"><span class="tag cyan">Data Viz</span><span class="tag">BI</span></div>
      <h3 class="project-title">BI Dashboard Éxito Corp</h3>
      <p class="project-desc">Centro de inteligencia de negocio en tiempo real para 1,200 tiendas en 3 países.</p>
      <div class="project-meta"><span>Santiago V. · Data Architect</span><span class="project-year">2026</span></div>
    </div>
  </div>
  <div class="project-card" data-cat="web" data-id="p5" onclick="openWindow('p5',event)">
    <div class="project-thumb" style="background:linear-gradient(135deg,#fa709a,#fee140)">🛍️</div>
    <div class="project-info">
      <div class="project-tags"><span class="tag cyan">E-Commerce</span><span class="tag">Web</span></div>
      <h3 class="project-title">Marketplace Artesanías CO</h3>
      <p class="project-desc">Plataforma de comercio electrónico para artesanos colombianos con pagos internacionales.</p>
      <div class="project-meta"><span>Valentina Cruz · Dev Lead</span><span class="project-year">2025</span></div>
    </div>
  </div>
  <div class="project-card" data-cat="app" data-id="p6" onclick="openWindow('p6',event)">
    <div class="project-thumb" style="background:linear-gradient(135deg,#a18cd1,#fbc2eb)">🏥</div>
    <div class="project-info">
      <div class="project-tags"><span class="tag cyan">HealthTech</span><span class="tag">App</span></div>
      <h3 class="project-title">SaludApp — Telemedicina</h3>
      <p class="project-desc">Plataforma de teleconsulta médica con IA diagnóstica para 500K pacientes en Colombia.</p>
      <div class="project-meta"><span>Dr. Mejía · Healthcare Lead</span><span class="project-year">2026</span></div>
    </div>
  </div>
</div>

<!-- FLOATING WINDOWS -->
<div class="float-window" id="win-p1" style="top:120px;left:200px">
  <div class="win-titlebar" id="tb-p1">
    <div class="win-controls"><button class="win-btn win-close" onclick="closeWindow('p1')"></button><button class="win-btn win-min" onclick="minWindow('p1')"></button><button class="win-btn win-max"></button></div>
    <div class="win-title">Portal B2B Bancolombia</div>
  </div>
  <div class="win-content">
    <div class="win-hero" style="background:linear-gradient(135deg,#667eea,#764ba2)">🌐</div>
    <div class="win-tags"><span class="tag cyan">Web App</span><span class="tag">UX/UI</span><span class="tag">Headless</span></div>
    <h2 class="win-title-h2">Portal B2B Bancolombia</h2>
    <p class="win-desc">Rediseño completo del portal empresarial de Bancolombia con arquitectura headless CMS y micro-frontends React. El proyecto redujo el tiempo de onboarding empresarial de 15 días a 2 horas.</p>
    <div class="win-stats"><div class="win-stat"><div class="win-stat-val">-87%</div><div class="win-stat-label">Tiempo Onboarding</div></div><div class="win-stat"><div class="win-stat-val">+42%</div><div class="win-stat-label">Conversión</div></div><div class="win-stat"><div class="win-stat-val">4.8★</div><div class="win-stat-label">Rating UX</div></div></div>
    <div class="win-actions"><button class="win-action-btn">🔗 Ver Live</button><button class="win-action-btn">📋 Case Study</button><button class="win-action-btn" onclick="closeWindow('p1')">✕ Cerrar</button></div>
  </div>
</div>

<div class="float-window" id="win-p2" style="top:150px;left:260px">
  <div class="win-titlebar" id="tb-p2">
    <div class="win-controls"><button class="win-btn win-close" onclick="closeWindow('p2')"></button><button class="win-btn win-min" onclick="minWindow('p2')"></button><button class="win-btn win-max"></button></div>
    <div class="win-title">App Fintech AhorraYa</div>
  </div>
  <div class="win-content">
    <div class="win-hero" style="background:linear-gradient(135deg,#f093fb,#f5576c)">📱</div>
    <div class="win-tags"><span class="tag cyan">Mobile</span><span class="tag">Fintech</span><span class="tag">IA</span></div>
    <h2 class="win-title-h2">App Fintech AhorraYa</h2>
    <p class="win-desc">App de ahorro inteligente con motor de IA que analiza patrones de gasto y genera metas personalizadas. 150K usuarios activos en sus primeros 6 meses.</p>
    <div class="win-stats"><div class="win-stat"><div class="win-stat-val">150K</div><div class="win-stat-label">Usuarios</div></div><div class="win-stat"><div class="win-stat-val">4.9★</div><div class="win-stat-label">App Store</div></div><div class="win-stat"><div class="win-stat-val">$2M</div><div class="win-stat-label">Seed Round</div></div></div>
    <div class="win-actions"><button class="win-action-btn">📱 App Store</button><button class="win-action-btn">📋 Case Study</button><button class="win-action-btn" onclick="closeWindow('p2')">✕ Cerrar</button></div>
  </div>
</div>

<!-- Repite win-p3 a win-p6 con contenido similar... -->

<script>
// Particles
const canvas=document.getElementById('particles');const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;canvas.height=window.innerHeight;
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight});
const particles=Array.from({length:80},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+.5,dx:(Math.random()-.5)*.4,dy:(Math.random()-.5)*.4,o:Math.random()*.5+.1}));
function drawParticles(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.x+=p.dx;p.y+=p.dy;if(p.x<0||p.x>canvas.width)p.dx*=-1;if(p.y<0||p.y>canvas.height)p.dy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,255,198,${p.o})`;ctx.fill()});requestAnimationFrame(drawParticles)}
drawParticles();

// Window management
let zTop=600;
function openWindow(id,e){
  if(e)e.stopPropagation();
  const win=document.getElementById('win-'+id);
  if(!win)return;
  win.classList.add('visible');
  bringToFront(id);
}
function closeWindow(id){document.getElementById('win-'+id).classList.remove('visible')}
function minWindow(id){const w=document.getElementById('win-'+id);const content=w.querySelector('.win-content');content.style.display=content.style.display==='none'?'':'none'}
function bringToFront(id){zTop++;document.getElementById('win-'+id).style.zIndex=zTop}

// Drag
document.querySelectorAll('.win-titlebar').forEach(tb=>{
  const id=tb.id.replace('tb-','');
  let dragging=false,ox=0,oy=0;
  tb.addEventListener('mousedown',e=>{
    dragging=true;const win=document.getElementById('win-'+id);
    bringToFront(id);
    ox=e.clientX-win.offsetLeft;oy=e.clientY-win.offsetTop;
  });
  document.addEventListener('mousemove',e=>{
    if(dragging){const win=document.getElementById('win-'+id);win.style.left=(e.clientX-ox)+'px';win.style.top=(e.clientY-oy)+'px'}
  });
  document.addEventListener('mouseup',()=>dragging=false);
});

// Filter
function filterProjects(cat,btn){
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-card').forEach((c,i)=>{
    const show=cat==='all'||c.dataset.cat===cat;
    c.style.transition=`opacity .3s ${i*.05}s, transform .3s ${i*.05}s`;
    c.style.opacity=show?'1':'0.2';
    c.style.transform=show?'scale(1)':'scale(0.95)';
    c.style.pointerEvents=show?'auto':'none';
  });
}
</script>
</body>
</html>
```
