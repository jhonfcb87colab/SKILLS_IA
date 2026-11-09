# SKILL 03: Plataforma Academia / E-Learning con Acordeones y Progreso

## 1. Propósito y Filosofía
Genera plataformas de aprendizaje en línea — cursos, talleres, capacitaciones corporativas — con módulos en acordeón, barra de progreso gamificada y sistema de logros. Ideal para onboarding, formación interna y academias digitales.

- **Enfoque:** Educativo, motivacional, aprendizaje activo con gamificación.
- **UX:** Acordeones de módulos + barra de progreso animada + badges de logros + sidebar de curso.
- **Estética:** Moderno edu-tech — púrpura vibrante + verde lima + degradados dinámicos.

---

## 2. Sistema de Diseño

### Paleta Edu-Tech
| Elemento | HEX | Uso |
|---|---|---|
| Fondo | `#F0F2FF` | Canvas principal |
| Purple primary | `#6C63FF` | CTA, botones, activo |
| Green success | `#22C55E` | Completado, éxito |
| Orange accent | `#F97316` | Badges, alertas |
| Cards | `#FFFFFF` | Superficie módulos |
| Text | `#1E293B` | Texto principal |
| Muted | `#64748B` | Descripciones |

---

## 3. Reglas UX
1. **Acordeones animados:** Módulos se expanden/colapsan con animación fluida de altura.
2. **Progreso persistente:** Checkbox por lección guarda estado en localStorage.
3. **Sidebar sticky:** Panel lateral con índice del curso siempre visible al hacer scroll.
4. **Badges animados:** Al completar módulo aparece badge con animación bounce.
5. **Video placeholder:** Lecciones de video muestran thumbnail con play button overlay.

---

## 4. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Academia Digital</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F0F2FF;--purple:#6C63FF;--green:#22C55E;--orange:#F97316;
  --white:#FFFFFF;--text:#1E293B;--muted:#64748B;--border:#E2E8F0;
  --purple-light:#EEF2FF;--card-shadow:0 4px 20px rgba(108,99,255,0.1);
}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text)}

/* TOPBAR */
.topbar{background:var(--white);border-bottom:1px solid var(--border);padding:0 24px;position:sticky;top:0;z-index:50;box-shadow:0 2px 8px rgba(0,0,0,0.05)}
.topbar-inner{display:flex;align-items:center;justify-content:space-between;height:60px;max-width:1200px;margin:0 auto}
.course-brand{display:flex;align-items:center;gap:12px}
.brand-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--purple),#A855F7);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px}
.brand-name{font-weight:700;font-size:16px;color:var(--text)}
.brand-course{font-size:12px;color:var(--muted)}
.topbar-progress{display:flex;align-items:center;gap:12px;flex:1;max-width:400px;margin:0 auto}
.progress-label{font-size:12px;color:var(--muted);white-space:nowrap}
.progress-bar-wrap{flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,var(--purple),var(--green));border-radius:4px;transition:width .5s ease;width:0%}
.progress-pct{font-size:12px;font-weight:700;color:var(--purple);white-space:nowrap}
.topbar-actions{display:flex;gap:8px}
.btn-sm{padding:7px 14px;border-radius:6px;border:1px solid var(--border);background:var(--white);font-size:12px;cursor:pointer;color:var(--text);transition:all .2s}
.btn-primary{background:var(--purple);color:#fff;border-color:var(--purple)}
.btn-sm:hover{transform:translateY(-1px);box-shadow:0 3px 8px rgba(0,0,0,0.1)}

/* LAYOUT */
.layout{display:grid;grid-template-columns:320px 1fr;gap:0;min-height:calc(100vh - 60px);max-width:1200px;margin:0 auto;padding:24px;gap:24px}
@media(max-width:900px){.layout{grid-template-columns:1fr}}

/* SIDEBAR */
.course-sidebar{position:sticky;top:84px;height:fit-content}
.sidebar-card{background:var(--white);border-radius:12px;padding:20px;box-shadow:var(--card-shadow);border:1px solid var(--border)}
.sidebar-card+.sidebar-card{margin-top:16px}
.sidebar-title{font-size:14px;font-weight:700;color:var(--text);margin-bottom:14px;text-transform:uppercase;letter-spacing:.5px}
.module-index{list-style:none}
.module-index li{display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;cursor:pointer;font-size:14px;color:var(--muted);transition:all .2s}
.module-index li:hover{background:var(--purple-light);color:var(--purple)}
.module-index li.done{color:var(--green)}
.module-index li .idx-icon{width:24px;height:24px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0}
.module-index li.done .idx-icon{background:var(--green);border-color:var(--green);color:#fff}
.module-index li.active .idx-icon{background:var(--purple);border-color:var(--purple);color:#fff}

/* BADGES */
.badges-wrap{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.badge-item{background:var(--purple-light);border:1px solid rgba(108,99,255,0.2);border-radius:8px;padding:10px;text-align:center;transition:all .3s}
.badge-item.earned{background:linear-gradient(135deg,rgba(108,99,255,0.1),rgba(34,197,94,0.1));border-color:var(--green)}
.badge-item.earned .badge-icon{filter:none}
.badge-icon{font-size:28px;filter:grayscale(1) opacity(.4);transition:filter .3s}
.badge-name{font-size:11px;color:var(--muted);margin-top:4px}
.badge-item.earned .badge-name{color:var(--purple);font-weight:600}

/* MAIN CONTENT */
.course-main{}
.course-header{background:linear-gradient(135deg,var(--purple),#A855F7);border-radius:12px;padding:28px;color:#fff;margin-bottom:20px}
.course-title{font-size:24px;font-weight:700;margin-bottom:8px}
.course-desc{opacity:.85;font-size:15px;line-height:1.6;margin-bottom:16px}
.course-stats{display:flex;gap:20px;flex-wrap:wrap}
.stat-item{background:rgba(255,255,255,0.15);padding:8px 14px;border-radius:8px;font-size:13px;backdrop-filter:blur(4px)}

/* ACORDEONES */
.modules-wrap{display:flex;flex-direction:column;gap:12px}
.module-accordion{background:var(--white);border-radius:12px;border:1px solid var(--border);overflow:hidden;box-shadow:var(--card-shadow);transition:box-shadow .2s}
.module-accordion.completed{border-color:rgba(34,197,94,.3)}
.module-header{display:flex;align-items:center;gap:12px;padding:18px 20px;cursor:pointer;user-select:none;transition:background .2s}
.module-header:hover{background:var(--bg)}
.module-num{width:36px;height:36px;border-radius:50%;background:var(--purple-light);color:var(--purple);font-weight:700;font-size:14px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid rgba(108,99,255,0.2)}
.module-accordion.completed .module-num{background:rgba(34,197,94,.1);color:var(--green);border-color:rgba(34,197,94,.3)}
.module-info{flex:1}
.module-title{font-weight:600;font-size:15px;color:var(--text)}
.module-meta{font-size:12px;color:var(--muted);margin-top:2px}
.module-status{display:flex;align-items:center;gap:8px}
.status-pill{font-size:11px;padding:3px 8px;border-radius:20px;background:var(--purple-light);color:var(--purple);font-weight:600}
.status-pill.done{background:rgba(34,197,94,.1);color:var(--green)}
.chevron{color:var(--muted);font-size:12px;transition:transform .3s}
.module-accordion.open .chevron{transform:rotate(180deg)}
.module-body{max-height:0;overflow:hidden;transition:max-height .4s ease}
.module-body-inner{padding:0 20px 20px;border-top:1px solid var(--border)}
.lesson-list{margin-top:16px;display:flex;flex-direction:column;gap:8px}
.lesson-item{display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:8px;border:1px solid var(--border);background:var(--bg);cursor:pointer;transition:all .2s}
.lesson-item:hover{border-color:var(--purple);background:var(--purple-light)}
.lesson-item.completed{border-color:rgba(34,197,94,.3);background:rgba(34,197,94,.05)}
.lesson-check{width:22px;height:22px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;transition:all .2s}
.lesson-item.completed .lesson-check{background:var(--green);border-color:var(--green);color:#fff}
.lesson-type{font-size:16px;width:28px;text-align:center}
.lesson-title{flex:1;font-size:14px;color:var(--text)}
.lesson-dur{font-size:12px;color:var(--muted)}
.complete-btn{margin-top:16px;width:100%;padding:12px;border:none;background:linear-gradient(135deg,var(--purple),#A855F7);color:#fff;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s}
.complete-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(108,99,255,.4)}
.complete-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}

/* BADGE POPUP */
.badge-popup{position:fixed;bottom:30px;right:30px;background:linear-gradient(135deg,var(--purple),#A855F7);color:#fff;border-radius:16px;padding:16px 20px;display:none;align-items:center;gap:14px;box-shadow:0 10px 40px rgba(108,99,255,.5);z-index:200;animation:badgePop .5s cubic-bezier(.175,.885,.32,1.275)}
@keyframes badgePop{from{opacity:0;transform:translateX(100px) scale(0.5)}to{opacity:1;transform:translateX(0) scale(1)}}
.badge-popup.show{display:flex}
.popup-icon{font-size:36px}
.popup-text{font-size:13px;opacity:.85}
.popup-title{font-size:15px;font-weight:700}
</style>
</head>
<body>

<nav class="topbar">
  <div class="topbar-inner">
    <div class="course-brand">
      <div class="brand-icon">🎓</div>
      <div><div class="brand-name">AcademIA</div><div class="brand-course">Transformación Digital Pro</div></div>
    </div>
    <div class="topbar-progress">
      <span class="progress-label">Progreso:</span>
      <div class="progress-bar-wrap"><div class="progress-fill" id="globalProgress"></div></div>
      <span class="progress-pct" id="progressPct">0%</span>
    </div>
    <div class="topbar-actions">
      <button class="btn-sm">📋 Notas</button>
      <button class="btn-sm btn-primary">🏆 Certificado</button>
    </div>
  </div>
</nav>

<div class="layout">
  <aside class="course-sidebar">
    <div class="sidebar-card">
      <div class="sidebar-title">Índice del Curso</div>
      <ul class="module-index" id="moduleIndex">
        <li class="active" onclick="scrollToModule(0)"><div class="idx-icon">1</div>Fundamentos Digitales</li>
        <li onclick="scrollToModule(1)"><div class="idx-icon">2</div>IA y Automatización</li>
        <li onclick="scrollToModule(2)"><div class="idx-icon">3</div>Cloud Computing</li>
        <li onclick="scrollToModule(3)"><div class="idx-icon">4</div>Data & Analytics</li>
        <li onclick="scrollToModule(4)"><div class="idx-icon">5</div>Proyecto Final</li>
      </ul>
    </div>
    <div class="sidebar-card">
      <div class="sidebar-title">Mis Logros</div>
      <div class="badges-wrap">
        <div class="badge-item" id="badge-starter"><div class="badge-icon">🚀</div><div class="badge-name">Starter</div></div>
        <div class="badge-item" id="badge-tech"><div class="badge-icon">💻</div><div class="badge-name">Tech Ready</div></div>
        <div class="badge-item" id="badge-cloud"><div class="badge-icon">☁️</div><div class="badge-name">Cloud Pro</div></div>
        <div class="badge-item" id="badge-expert"><div class="badge-icon">🏆</div><div class="badge-name">Digital Expert</div></div>
      </div>
    </div>
  </aside>

  <main class="course-main">
    <div class="course-header">
      <h1 class="course-title">🚀 Transformación Digital Profesional</h1>
      <p class="course-desc">Domina las herramientas, metodologías y mindset para liderar proyectos de transformación digital en cualquier organización.</p>
      <div class="course-stats">
        <span class="stat-item">📚 5 Módulos</span>
        <span class="stat-item">⏱️ 18 horas</span>
        <span class="stat-item">🎯 42 Lecciones</span>
        <span class="stat-item">🏅 4 Badges</span>
      </div>
    </div>

    <div class="modules-wrap" id="modulesWrap">

      <div class="module-accordion" id="mod0">
        <div class="module-header" onclick="toggleModule(0)">
          <div class="module-num">1</div>
          <div class="module-info"><div class="module-title">Fundamentos de la Transformación Digital</div><div class="module-meta">8 lecciones · 3h 20min</div></div>
          <div class="module-status"><span class="status-pill" id="status0">En progreso</span><span class="chevron">▼</span></div>
        </div>
        <div class="module-body" id="body0">
          <div class="module-body-inner">
            <div class="lesson-list">
              <div class="lesson-item" id="l0_0" onclick="toggleLesson(0,0)"><div class="lesson-check">✓</div><div class="lesson-type">▶️</div><div class="lesson-title">¿Qué es la Transformación Digital?</div><div class="lesson-dur">12min</div></div>
              <div class="lesson-item" id="l0_1" onclick="toggleLesson(0,1)"><div class="lesson-check">✓</div><div class="lesson-type">📄</div><div class="lesson-title">Los 4 pilares del cambio digital</div><div class="lesson-dur">8min</div></div>
              <div class="lesson-item" id="l0_2" onclick="toggleLesson(0,2)"><div class="lesson-check">✓</div><div class="lesson-type">▶️</div><div class="lesson-title">Casos de éxito: Amazon, Netflix y Disney</div><div class="lesson-dur">22min</div></div>
              <div class="lesson-item" id="l0_3" onclick="toggleLesson(0,3)"><div class="lesson-check">✓</div><div class="lesson-type">✍️</div><div class="lesson-title">Quiz: Evalúa tu organización</div><div class="lesson-dur">15min</div></div>
            </div>
            <button class="complete-btn" onclick="completeModule(0,'starter')" id="btn0">✅ Marcar módulo como completado</button>
          </div>
        </div>
      </div>

      <div class="module-accordion" id="mod1">
        <div class="module-header" onclick="toggleModule(1)">
          <div class="module-num">2</div>
          <div class="module-info"><div class="module-title">Inteligencia Artificial y Automatización</div><div class="module-meta">10 lecciones · 4h 15min</div></div>
          <div class="module-status"><span class="status-pill" id="status1">Pendiente</span><span class="chevron">▼</span></div>
        </div>
        <div class="module-body" id="body1">
          <div class="module-body-inner">
            <div class="lesson-list">
              <div class="lesson-item" id="l1_0" onclick="toggleLesson(1,0)"><div class="lesson-check">✓</div><div class="lesson-type">▶️</div><div class="lesson-title">Machine Learning para no técnicos</div><div class="lesson-dur">18min</div></div>
              <div class="lesson-item" id="l1_1" onclick="toggleLesson(1,1)"><div class="lesson-check">✓</div><div class="lesson-type">▶️</div><div class="lesson-title">RPA: Automatización de procesos</div><div class="lesson-dur">25min</div></div>
              <div class="lesson-item" id="l1_2" onclick="toggleLesson(1,2)"><div class="lesson-check">✓</div><div class="lesson-type">📄</div><div class="lesson-title">GPT y LLMs en el trabajo diario</div><div class="lesson-dur">20min</div></div>
              <div class="lesson-item" id="l1_3" onclick="toggleLesson(1,3)"><div class="lesson-check">✓</div><div class="lesson-type">🔧</div><div class="lesson-title">Taller: Automatiza tu primer proceso</div><div class="lesson-dur">45min</div></div>
            </div>
            <button class="complete-btn" onclick="completeModule(1,'tech')" id="btn1">✅ Marcar módulo como completado</button>
          </div>
        </div>
      </div>

      <div class="module-accordion" id="mod2">
        <div class="module-header" onclick="toggleModule(2)">
          <div class="module-num">3</div>
          <div class="module-info"><div class="module-title">Cloud Computing Empresarial</div><div class="module-meta">9 lecciones · 3h 45min</div></div>
          <div class="module-status"><span class="status-pill" id="status2">Pendiente</span><span class="chevron">▼</span></div>
        </div>
        <div class="module-body" id="body2">
          <div class="module-body-inner">
            <div class="lesson-list">
              <div class="lesson-item" id="l2_0" onclick="toggleLesson(2,0)"><div class="lesson-check">✓</div><div class="lesson-type">▶️</div><div class="lesson-title">AWS, Azure y GCP: ¿Cuál elegir?</div><div class="lesson-dur">30min</div></div>
              <div class="lesson-item" id="l2_1" onclick="toggleLesson(2,1)"><div class="lesson-check">✓</div><div class="lesson-type">📄</div><div class="lesson-title">Estrategia de migración a la nube</div><div class="lesson-dur">22min</div></div>
              <div class="lesson-item" id="l2_2" onclick="toggleLesson(2,2)"><div class="lesson-check">✓</div><div class="lesson-type">🔧</div><div class="lesson-title">Seguridad y compliance en la nube</div><div class="lesson-dur">28min</div></div>
            </div>
            <button class="complete-btn" onclick="completeModule(2,'cloud')" id="btn2">✅ Marcar módulo como completado</button>
          </div>
        </div>
      </div>

    </div>
  </main>
</div>

<!-- BADGE POPUP -->
<div class="badge-popup" id="badgePopup">
  <div class="popup-icon" id="popupIcon">🏅</div>
  <div><div class="popup-title" id="popupTitle">¡Nuevo Logro!</div><div class="popup-text" id="popupText">Has desbloqueado un badge</div></div>
</div>

<script>
const moduleCount=3;const totalLessons=11;let completedLessons=0;
const badgeMap={starter:{el:'badge-starter',icon:'🚀',name:'¡Badge Starter desbloqueado!',text:'Completaste el primer módulo'},tech:{el:'badge-tech',icon:'💻',name:'¡Badge Tech Ready!',text:'Dominas IA y automatización'},cloud:{el:'badge-cloud',icon:'☁️',name:'¡Badge Cloud Pro!',text:'Dominaste Cloud Computing'}};

function toggleModule(idx){
  const acc=document.getElementById('mod'+idx);
  const body=document.getElementById('body'+idx);
  const isOpen=acc.classList.contains('open');
  document.querySelectorAll('.module-accordion').forEach(a=>a.classList.remove('open'));
  document.querySelectorAll('.module-body').forEach(b=>b.style.maxHeight='');
  if(!isOpen){acc.classList.add('open');body.style.maxHeight=body.scrollHeight+'px'}
}

function toggleLesson(mod,les){
  const item=document.getElementById(`l${mod}_${les}`);
  if(!item.classList.contains('completed')){
    item.classList.add('completed');
    completedLessons++;
    updateProgress();
  }
}

function completeModule(idx,badgeKey){
  const acc=document.getElementById('mod'+idx);
  const btn=document.getElementById('btn'+idx);
  const statusEl=document.getElementById('status'+idx);
  const idxItems=document.querySelectorAll('#moduleIndex li');
  acc.classList.add('completed');
  btn.disabled=true;btn.textContent='✅ Módulo Completado';
  statusEl.textContent='Completado';statusEl.classList.add('done');
  idxItems[idx].classList.add('done');idxItems[idx].querySelector('.idx-icon').textContent='✓';
  if(badgeMap[badgeKey]){
    const b=badgeMap[badgeKey];
    document.getElementById(b.el).classList.add('earned');
    showBadge(b.icon,b.name,b.text);
  }
  updateProgress();
}

function showBadge(icon,title,text){
  const p=document.getElementById('badgePopup');
  document.getElementById('popupIcon').textContent=icon;
  document.getElementById('popupTitle').textContent=title;
  document.getElementById('popupText').textContent=text;
  p.classList.add('show');
  setTimeout(()=>p.classList.remove('show'),4000);
}

function updateProgress(){
  const completed=document.querySelectorAll('.module-accordion.completed').length;
  const pct=Math.round((completed/moduleCount)*100);
  document.getElementById('globalProgress').style.width=pct+'%';
  document.getElementById('progressPct').textContent=pct+'%';
}

function scrollToModule(idx){toggleModule(idx);document.getElementById('mod'+idx).scrollIntoView({behavior:'smooth',block:'start'})}

// Open first module by default
toggleModule(0);
</script>
</body>
</html>
```
