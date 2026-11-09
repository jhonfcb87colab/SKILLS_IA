# SKILL 07: Presentación tipo Slides con Transiciones Cinematográficas

## 1. Propósito y Filosofía
Genera presentaciones interactivas estilo PowerPoint/Keynote en HTML puro, con transiciones cinematográficas, speaker notes y controles de navegación. Reemplaza herramientas externas para presentaciones ejecutivas de alto impacto.

- **Enfoque:** Presentación ejecutiva, narrativa visual, storytelling de datos.
- **UX:** Navegación por teclado/click + transiciones fluidas + modo presentación fullscreen + timer.
- **Estética:** Corporativo premium — fondo negro profundo + tipografía hero + acentos dorados.

---

## 2. Sistema de Diseño

### Paleta Presentación
| Elemento | HEX | Uso |
|---|---|---|
| Fondo slide | `#0D0D0D` | Background oscuro |
| Gold accent | `#D4A017` | Títulos destacados |
| Silver | `#C0C0C0` | Subtítulos |
| White | `#FFFFFF` | Texto principal |
| Blue neon | `#00A8E8` | Datos, stats |
| Red accent | `#E84855` | Alertas, énfasis |

---

## 3. Reglas UX
1. **Navegación:** Flechas de teclado + botones + touch swipe en mobile.
2. **Transiciones:** Fade, slide, zoom configurables por slide.
3. **Modo fullscreen:** Botón para presentación inmersiva a pantalla completa.
4. **Contador/Timer:** Cronómetro de presentación y contador de slides.
5. **Thumbnail nav:** Barra inferior con miniaturas de slides para saltar directamente.

---

## 4. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Presentación Ejecutiva</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--gold:#D4A017;--silver:#C0C0C0;--blue-neon:#00A8E8;--red:#E84855;--bg:#0D0D0D;--white:#fff}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#000;color:var(--white);overflow:hidden;height:100vh;display:flex;flex-direction:column}

/* CONTROLS */
.pres-controls{background:rgba(255,255,255,.05);backdrop-filter:blur(10px);padding:8px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid rgba(255,255,255,.1);flex-shrink:0}
.ctrl-left{display:flex;align-items:center;gap:12px}
.pres-logo{font-size:14px;font-weight:800;color:var(--gold);letter-spacing:1px}
.slide-counter{font-size:13px;color:var(--silver)}
.ctrl-center{display:flex;gap:8px;align-items:center}
.ctrl-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:var(--white);width:34px;height:34px;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.ctrl-btn:hover{background:rgba(255,255,255,.2)}
.ctrl-btn.primary{background:var(--gold);border-color:var(--gold);color:#000;font-weight:700}
.timer{font-size:16px;font-weight:700;font-variant-numeric:tabular-nums;color:var(--gold);min-width:50px;text-align:center}
.ctrl-right{display:flex;gap:8px;align-items:center}
.theme-btn{padding:5px 12px;border-radius:4px;border:1px solid rgba(255,255,255,.2);background:transparent;color:var(--silver);font-size:12px;cursor:pointer;transition:all .2s}
.theme-btn:hover{background:rgba(255,255,255,.1);color:var(--white)}

/* SLIDE AREA */
.slide-area{flex:1;position:relative;overflow:hidden}
.slide{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:60px;opacity:0;transform:translateX(100%);transition:all .6s cubic-bezier(.4,0,.2,1);pointer-events:none}
.slide.active{opacity:1;transform:translateX(0);pointer-events:auto}
.slide.exit-left{opacity:0;transform:translateX(-100%)}
.slide.enter-right{opacity:0;transform:translateX(100%)}

/* SLIDE TYPES */
.slide-cover{background:linear-gradient(135deg,#0D0D0D 0%,#1a1a2e 50%,#16213e 100%);text-align:center}
.slide-cover::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(ellipse at center,rgba(212,160,23,.1) 0%,transparent 60%);animation:glow 4s ease-in-out infinite alternate}
@keyframes glow{from{opacity:.5}to{opacity:1}}
.cover-eyebrow{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:var(--gold);margin-bottom:20px}
.cover-title{font-size:clamp(32px,5vw,72px);font-weight:900;line-height:1.1;margin-bottom:16px;background:linear-gradient(135deg,var(--white),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.cover-subtitle{font-size:clamp(14px,2vw,22px);color:var(--silver);margin-bottom:40px;max-width:600px}
.cover-meta{display:flex;gap:24px;justify-content:center;font-size:13px;color:rgba(255,255,255,.5)}
.cover-dot{color:var(--gold)}

.slide-content{background:var(--bg)}
.slide-label{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:var(--gold);margin-bottom:16px}
.slide-title{font-size:clamp(24px,3.5vw,52px);font-weight:800;line-height:1.2;margin-bottom:24px;max-width:900px;text-align:center}
.slide-body{max-width:900px;width:100%}

.stats-row{display:flex;gap:24px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.stat-box{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:24px 32px;text-align:center;min-width:160px;position:relative;overflow:hidden}
.stat-box::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--blue-neon))}
.stat-num{font-size:clamp(28px,4vw,52px);font-weight:900;color:var(--gold)}
.stat-label{font-size:12px;color:var(--silver);margin-top:4px;text-transform:uppercase;letter-spacing:.5px}

.bullets{display:flex;flex-direction:column;gap:12px;width:100%;max-width:700px}
.bullet{display:flex;align-items:flex-start;gap:14px;padding:14px 18px;background:rgba(255,255,255,.04);border-left:3px solid var(--gold);border-radius:0 8px 8px 0;font-size:16px;line-height:1.5}
.bullet-icon{font-size:20px;flex-shrink:0}

.two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px;width:100%;max-width:900px}
.col-panel{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:24px}
.panel-title{font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.1)}
.panel-title.gold{color:var(--gold)}
.panel-title.blue{color:var(--blue-neon)}
.panel-list{list-style:none;display:flex;flex-direction:column;gap:8px}
.panel-list li{font-size:14px;color:var(--silver);display:flex;align-items:center;gap:8px}

.timeline{display:flex;flex-direction:column;gap:0;width:100%;max-width:700px}
.tl-item{display:flex;gap:16px;position:relative}
.tl-line{display:flex;flex-direction:column;align-items:center;width:40px;flex-shrink:0}
.tl-dot{width:14px;height:14px;border-radius:50%;background:var(--gold);border:2px solid var(--gold);flex-shrink:0}
.tl-track{flex:1;width:2px;background:rgba(212,160,23,.3);min-height:40px}
.tl-item:last-child .tl-track{display:none}
.tl-content{padding-bottom:24px;flex:1}
.tl-label{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:var(--gold);margin-bottom:4px}
.tl-title{font-size:16px;font-weight:600;margin-bottom:4px}
.tl-desc{font-size:13px;color:var(--silver);line-height:1.5}

.cta-box{background:linear-gradient(135deg,rgba(212,160,23,.15),rgba(0,168,232,.15));border:1px solid rgba(212,160,23,.3);border-radius:16px;padding:40px;text-align:center;max-width:700px}
.cta-title{font-size:clamp(22px,3vw,42px);font-weight:900;margin-bottom:12px;background:linear-gradient(135deg,var(--white),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.cta-desc{color:var(--silver);font-size:16px;margin-bottom:28px;line-height:1.6}
.cta-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.cta-btn{padding:14px 32px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;transition:all .3s;border:none}
.cta-primary{background:linear-gradient(135deg,var(--gold),#b8860b);color:#000}
.cta-primary:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(212,160,23,.4)}
.cta-secondary{background:transparent;border:2px solid rgba(255,255,255,.3);color:var(--white)}
.cta-secondary:hover{border-color:var(--white)}

/* THUMBNAIL NAV */
.thumb-nav{background:rgba(0,0,0,.8);backdrop-filter:blur(10px);padding:10px 16px;display:flex;gap:8px;overflow-x:auto;border-top:1px solid rgba(255,255,255,.1);flex-shrink:0}
.thumb-nav::-webkit-scrollbar{height:4px}.thumb-nav::-webkit-scrollbar-thumb{background:rgba(255,255,255,.2);border-radius:2px}
.thumb-item{min-width:90px;height:56px;border-radius:6px;border:2px solid rgba(255,255,255,.1);cursor:pointer;overflow:hidden;position:relative;flex-shrink:0;transition:all .2s;background:rgba(255,255,255,.05)}
.thumb-item:hover{border-color:rgba(212,160,23,.5)}
.thumb-item.active{border-color:var(--gold);box-shadow:0 0 10px rgba(212,160,23,.3)}
.thumb-label{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:9px;color:rgba(255,255,255,.6);text-align:center;padding:4px}
.thumb-num{position:absolute;top:3px;right:5px;font-size:9px;color:var(--gold);font-weight:700}

/* PROGRESS BAR */
.slide-progress{position:absolute;bottom:0;left:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--blue-neon));transition:width .4s ease;z-index:10}
</style>
</head>
<body>

<div class="pres-controls">
  <div class="ctrl-left">
    <span class="pres-logo">▶ PRESENTIA</span>
    <span class="slide-counter" id="slideCounter">1 / 5</span>
  </div>
  <div class="ctrl-center">
    <button class="ctrl-btn" onclick="prevSlide()" title="Anterior (←)">◀</button>
    <button class="ctrl-btn primary" onclick="toggleTimer()" id="timerBtn">▶</button>
    <span class="timer" id="timer">0:00</span>
    <button class="ctrl-btn" onclick="nextSlide()" title="Siguiente (→)">▶</button>
  </div>
  <div class="ctrl-right">
    <button class="theme-btn" onclick="toggleFullscreen()">⛶ Pantalla completa</button>
    <button class="theme-btn">📋 Notas</button>
  </div>
</div>

<div class="slide-area" id="slideArea">
  <div class="slide-progress" id="slideProgress"></div>

  <!-- SLIDE 1: COVER -->
  <div class="slide slide-cover active" id="slide-0">
    <div class="cover-eyebrow">Presentación Estratégica · Noviembre 2026</div>
    <h1 class="cover-title">Transformación Digital<br>para el Liderazgo</h1>
    <p class="cover-subtitle">Estrategia, tecnología e innovación para posicionar tu organización en la economía digital del futuro</p>
    <div class="cover-meta">
      <span>🏢 Empresa XYZ</span><span class="cover-dot">·</span>
      <span>👤 CEO / Equipo Directivo</span><span class="cover-dot">·</span>
      <span>📅 Noviembre 2026</span>
    </div>
  </div>

  <!-- SLIDE 2: STATS -->
  <div class="slide slide-content" id="slide-1">
    <div class="slide-label">El Contexto Global</div>
    <h2 class="slide-title">La Transformación Digital es<br><span style="color:var(--gold)">Ya Una Realidad</span></h2>
    <div class="stats-row">
      <div class="stat-box"><div class="stat-num">$6.8T</div><div class="stat-label">Gasto mundial en TI 2026</div></div>
      <div class="stat-box"><div class="stat-num">87%</div><div class="stat-label">Empresas líderes digitales</div></div>
      <div class="stat-box"><div class="stat-num">3.2x</div><div class="stat-label">Crecimiento vs análogos</div></div>
      <div class="stat-box"><div class="stat-num">2027</div><div class="stat-label">Punto de no retorno</div></div>
    </div>
  </div>

  <!-- SLIDE 3: BULLETS -->
  <div class="slide slide-content" id="slide-2">
    <div class="slide-label">Nuestra Propuesta</div>
    <h2 class="slide-title">Los 4 Pilares de Nuestra<br><span style="color:var(--blue-neon)">Estrategia Digital</span></h2>
    <div class="bullets">
      <div class="bullet"><div class="bullet-icon">🤖</div><div><strong>Inteligencia Artificial Aplicada:</strong> IA en cada proceso core para eficiencia operativa y experiencia de cliente sin precedentes.</div></div>
      <div class="bullet"><div class="bullet-icon">☁️</div><div><strong>Arquitectura Cloud-First:</strong> Migración total a la nube con resiliencia, escalabilidad y reducción de costos de infraestructura del 40%.</div></div>
      <div class="bullet"><div class="bullet-icon">📊</div><div><strong>Data-Driven Decision Making:</strong> Cada decisión respaldada por datos en tiempo real. BI integrado en todos los niveles de la organización.</div></div>
      <div class="bullet"><div class="bullet-icon">🔐</div><div><strong>Ciberseguridad de Clase Mundial:</strong> Protección zero-trust que salvaguarda activos digitales y genera confianza con clientes y reguladores.</div></div>
    </div>
  </div>

  <!-- SLIDE 4: TIMELINE -->
  <div class="slide slide-content" id="slide-3">
    <div class="slide-label">Hoja de Ruta</div>
    <h2 class="slide-title">Roadmap de Implementación <span style="color:var(--gold)">2026–2028</span></h2>
    <div class="timeline">
      <div class="tl-item"><div class="tl-line"><div class="tl-dot"></div><div class="tl-track"></div></div><div class="tl-content"><div class="tl-label">Q4 2026</div><div class="tl-title">Fase 1 — Fundación Digital</div><div class="tl-desc">Auditoría tecnológica, cloud migration plan y formación del equipo de transformación.</div></div></div>
      <div class="tl-item"><div class="tl-line"><div class="tl-dot" style="background:var(--blue-neon);border-color:var(--blue-neon)"></div><div class="tl-track"></div></div><div class="tl-content"><div class="tl-label" style="color:var(--blue-neon)">Q1-Q2 2027</div><div class="tl-title">Fase 2 — Implementación Core</div><div class="tl-desc">Despliegue de plataformas IA, migración de sistemas críticos y nuevo modelo de datos.</div></div></div>
      <div class="tl-item"><div class="tl-line"><div class="tl-dot" style="background:#E84855;border-color:#E84855"></div><div class="tl-track"></div></div><div class="tl-content"><div class="tl-label" style="color:#E84855">Q3-Q4 2027</div><div class="tl-title">Fase 3 — Escala y Optimización</div><div class="tl-desc">Expansión a todas las unidades de negocio, optimización por datos y primeros resultados medibles.</div></div></div>
      <div class="tl-item"><div class="tl-line"><div class="tl-dot" style="background:#22C55E;border-color:#22C55E"></div></div><div class="tl-content"><div class="tl-label" style="color:#22C55E">2028</div><div class="tl-title">Fase 4 — Liderazgo Digital</div><div class="tl-desc">Organización completamente digitalizada, posicionada como líder sectorial en economía digital.</div></div></div>
    </div>
  </div>

  <!-- SLIDE 5: CTA -->
  <div class="slide slide-content" id="slide-4">
    <div class="cta-box">
      <div class="slide-label" style="text-align:center;margin-bottom:16px">El Próximo Paso</div>
      <h2 class="cta-title">¿Listos para Liderar<br>el Cambio?</h2>
      <p class="cta-desc">La transformación digital no espera. Cada mes de demora es terreno perdido ante competidores que ya están actuando. El momento es ahora.</p>
      <div class="cta-actions">
        <button class="cta-btn cta-primary">📅 Agendar Workshop</button>
        <button class="cta-btn cta-secondary">📄 Descargar Propuesta</button>
      </div>
    </div>
    <div style="margin-top:28px;font-size:13px;color:rgba(255,255,255,.4);text-align:center">contacto@empresa.com · +57 (1) 234-5678 · www.empresa.com</div>
  </div>
</div>

<!-- THUMBNAIL NAV -->
<div class="thumb-nav" id="thumbNav">
  <div class="thumb-item active" onclick="goToSlide(0)"><div class="thumb-label">Cover</div><div class="thumb-num">1</div></div>
  <div class="thumb-item" onclick="goToSlide(1)"><div class="thumb-label">Estadísticas</div><div class="thumb-num">2</div></div>
  <div class="thumb-item" onclick="goToSlide(2)"><div class="thumb-label">Estrategia</div><div class="thumb-num">3</div></div>
  <div class="thumb-item" onclick="goToSlide(3)"><div class="thumb-label">Roadmap</div><div class="thumb-num">4</div></div>
  <div class="thumb-item" onclick="goToSlide(4)"><div class="thumb-label">Cierre</div><div class="thumb-num">5</div></div>
</div>

<script>
const slides=document.querySelectorAll('.slide');const thumbs=document.querySelectorAll('.thumb-item');
let current=0;
function goToSlide(n){
  if(n<0||n>=slides.length)return;
  slides[current].classList.remove('active');
  thumbs[current].classList.remove('active');
  current=n;
  slides[current].classList.add('active');
  thumbs[current].classList.add('active');
  document.getElementById('slideCounter').textContent=`${current+1} / ${slides.length}`;
  document.getElementById('slideProgress').style.width=`${((current+1)/slides.length)*100}%`;
}
function nextSlide(){goToSlide(current+1)}
function prevSlide(){goToSlide(current-1)}
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowDown')nextSlide();if(e.key==='ArrowLeft'||e.key==='ArrowUp')prevSlide();if(e.key==='F5'||e.key==='f')toggleFullscreen()});

// Timer
let timerInterval=null;let timerRunning=false;let seconds=0;
function toggleTimer(){
  timerRunning=!timerRunning;
  document.getElementById('timerBtn').textContent=timerRunning?'⏸':'▶';
  if(timerRunning){timerInterval=setInterval(()=>{seconds++;const m=Math.floor(seconds/60);const s=seconds%60;document.getElementById('timer').textContent=`${m}:${s.toString().padStart(2,'0')}`;},1000)}
  else{clearInterval(timerInterval)}
}
function toggleFullscreen(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(()=>{})}

// Touch swipe
let touchX=0;
document.getElementById('slideArea').addEventListener('touchstart',e=>touchX=e.touches[0].clientX);
document.getElementById('slideArea').addEventListener('touchend',e=>{const diff=touchX-e.changedTouches[0].clientX;if(Math.abs(diff)>50){diff>0?nextSlide():prevSlide()}});

// Init progress
document.getElementById('slideProgress').style.width=`${(1/slides.length)*100}%`;
</script>
</body>
</html>
```
