# SKILL 13: Portal de Equipo con Cards de Miembros y Popups de Perfil

## 1. Propósito y Filosofía
Genera páginas de equipo para presentar integrantes, sus roles y perfiles de forma visual e interactiva. Click en cualquier miembro abre popup de perfil completo con habilidades, proyectos y contacto.

- **Enfoque:** Presentación de personas, transparencia organizacional, networking interno.
- **UX:** Cards de miembros en grid + popup de perfil completo + filtro por departamento + búsqueda.
- **Estética:** Moderno y humano — colores suaves + avatares grandes + tarjetas con hover reveal.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nuestro Equipo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F8FAFC;--white:#fff;--text:#0F172A;--muted:#64748B;--border:#E2E8F0;--indigo:#4F46E5;--shadow:0 4px 20px rgba(0,0,0,.08)}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}

.team-hero{background:linear-gradient(135deg,#0F172A,#1E293B);text-align:center;padding:70px 20px;position:relative;overflow:hidden}
.team-hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:60px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
.hero-eyebrow{font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#94A3B8;margin-bottom:14px}
.hero-title{font-size:clamp(28px,4vw,52px);font-weight:900;color:#fff;margin-bottom:12px}
.hero-title span{background:linear-gradient(135deg,#60A5FA,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-desc{color:#94A3B8;font-size:16px;max-width:500px;margin:0 auto 24px;line-height:1.6}
.hero-stats{display:flex;gap:32px;justify-content:center;flex-wrap:wrap}
.h-stat{text-align:center}<br>.h-stat-num{font-size:28px;font-weight:900;color:#60A5FA}
.h-stat-label{font-size:12px;color:#64748B}

.team-controls{max-width:1100px;margin:40px auto 24px;padding:0 20px;display:flex;align-items:center;gap:14px;flex-wrap:wrap}
.search-team{flex:1;min-width:200px;padding:11px 16px 11px 42px;border:1.5px solid var(--border);border-radius:10px;font-size:14px;outline:none;font-family:inherit;background:var(--white);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2364748B' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.44 1.406a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:14px center;transition:border-color .2s}
.search-team:focus{border-color:var(--indigo);box-shadow:0 0 0 3px rgba(79,70,229,.1)}
.dept-filters{display:flex;gap:6px;flex-wrap:wrap}
.dept-btn{padding:8px 16px;border-radius:30px;border:1px solid var(--border);background:var(--white);color:var(--muted);font-size:13px;cursor:pointer;transition:all .2s;font-family:inherit}
.dept-btn:hover,.dept-btn.active{background:var(--text);color:#fff;border-color:var(--text)}
.members-count{font-size:13px;color:var(--muted);white-space:nowrap}

.team-grid{max-width:1100px;margin:0 auto;padding:0 20px 60px;display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px}

.member-card{background:var(--white);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:all .3s;position:relative}
.member-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.12)}
.member-cover{height:80px;position:relative}
.member-avatar{position:absolute;bottom:-36px;left:20px;width:72px;height:72px;border-radius:50%;border:4px solid var(--white);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#fff;box-shadow:var(--shadow)}
.member-body{padding:48px 20px 20px}
.member-name{font-size:16px;font-weight:700;margin-bottom:2px}
.member-role{font-size:13px;color:var(--muted);margin-bottom:10px}
.member-dept{display:inline-block;font-size:11px;font-weight:700;padding:3px 8px;border-radius:4px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:12px}
.member-skills{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:14px}
.skill-tag{font-size:11px;background:var(--bg);border:1px solid var(--border);color:var(--muted);padding:3px 7px;border-radius:4px}
.member-footer{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--border)}
.member-links{display:flex;gap:8px}
.member-link{width:28px;height:28px;border-radius:6px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:13px;color:var(--muted);transition:all .2s;text-decoration:none}
.member-link:hover{background:var(--indigo);color:#fff;border-color:var(--indigo)}
.view-profile-btn{font-size:12px;color:var(--indigo);font-weight:600;cursor:pointer;padding:5px 10px;border-radius:6px;transition:background .2s}
.view-profile-btn:hover{background:rgba(79,70,229,.08)}

/* PROFILE MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);backdrop-filter:blur(6px);z-index:1000;display:none;align-items:flex-start;justify-content:center;padding:40px 20px;overflow-y:auto}
.modal-overlay.show{display:flex}
.profile-modal{background:var(--white);width:min(680px,100%);border-radius:20px;overflow:hidden;animation:fadeUp .3s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.profile-cover{height:160px;position:relative;display:flex;align-items:flex-end;padding:20px}
.profile-close{position:absolute;top:16px;right:16px;width:36px;height:36px;border-radius:50%;background:rgba(0,0,0,.3);border:none;color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px);transition:background .2s}
.profile-close:hover{background:rgba(0,0,0,.5)}
.profile-avatar{width:96px;height:96px;border-radius:50%;border:4px solid #fff;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:800;color:#fff;position:absolute;bottom:-48px;left:28px;box-shadow:0 8px 24px rgba(0,0,0,.2)}
.profile-body{padding:64px 28px 28px}
.profile-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px;flex-wrap:wrap;gap:12px}
.profile-name{font-size:26px;font-weight:800}
.profile-role{font-size:15px;color:var(--muted);margin-top:2px}
.profile-actions{display:flex;gap:8px}
.pa-btn{padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1.5px solid var(--border);background:transparent;color:var(--text);transition:all .2s;font-family:inherit}
.pa-btn:hover{background:var(--indigo);color:#fff;border-color:var(--indigo)}
.pa-btn.primary{background:var(--indigo);color:#fff;border-color:var(--indigo)}
.pa-btn.primary:hover{background:#3730A3}
.profile-bio{color:var(--muted);font-size:15px;line-height:1.7;margin-bottom:24px}
.profile-section{margin-bottom:24px}
.profile-section-title{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text);margin-bottom:12px;display:flex;align-items:center;gap:6px}
.skills-grid{display:flex;flex-wrap:wrap;gap:8px}
.skill-item{background:rgba(79,70,229,.08);border:1px solid rgba(79,70,229,.2);color:var(--indigo);padding:5px 12px;border-radius:6px;font-size:13px;font-weight:600}
.projects-list{display:flex;flex-direction:column;gap:8px}
.proj-item{background:var(--bg);border-radius:8px;padding:12px 14px;border:1px solid var(--border);display:flex;align-items:center;gap:10px}
.proj-icon{font-size:18px}
.proj-info{flex:1}
.proj-name{font-size:14px;font-weight:600}
.proj-status{font-size:11px;color:var(--muted)}
.proj-status-pill{padding:3px 8px;border-radius:4px;font-size:11px;font-weight:700}
.pill-active{background:rgba(5,150,105,.1);color:#059669}
.pill-done{background:rgba(79,70,229,.1);color:var(--indigo)}
.stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px}
.stat-box{background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:14px;text-align:center}
.stat-box-num{font-size:22px;font-weight:900;color:var(--indigo)}
.stat-box-label{font-size:12px;color:var(--muted);margin-top:2px}
</style>
</head>
<body>

<div class="team-hero">
  <div class="hero-eyebrow">La Gente Detrás del Éxito</div>
  <h1 class="hero-title">Nuestro <span>Equipo</span></h1>
  <p class="hero-desc">Personas talentosas, apasionadas y comprometidas con transformar el mundo digital.</p>
  <div class="hero-stats">
    <div class="h-stat"><div class="h-stat-num">48</div><div class="h-stat-label">Profesionales</div></div>
    <div class="h-stat"><div class="h-stat-num">12</div><div class="h-stat-label">Países</div></div>
    <div class="h-stat"><div class="h-stat-num">6</div><div class="h-stat-label">Departamentos</div></div>
    <div class="h-stat"><div class="h-stat-num">4.9★</div><div class="h-stat-label">Cultura interna</div></div>
  </div>
</div>

<div class="team-controls">
  <input type="text" class="search-team" placeholder="Buscar por nombre, rol o habilidad..." id="searchInput" oninput="searchMembers()">
  <div class="dept-filters">
    <button class="dept-btn active" onclick="filterDept('all',this)">Todos</button>
    <button class="dept-btn" onclick="filterDept('engineering',this)">💻 Ingeniería</button>
    <button class="dept-btn" onclick="filterDept('design',this)">🎨 Diseño</button>
    <button class="dept-btn" onclick="filterDept('data',this)">📊 Data</button>
    <button class="dept-btn" onclick="filterDept('product',this)">🚀 Producto</button>
    <button class="dept-btn" onclick="filterDept('ops',this)">⚙️ Operaciones</button>
  </div>
  <span class="members-count" id="membersCount">8 miembros</span>
</div>

<div class="team-grid" id="teamGrid">
  <!-- Cards generadas dinámicamente por JS -->
</div>

<!-- PROFILE MODAL -->
<div class="modal-overlay" id="profileModal">
  <div class="profile-modal" onclick="event.stopPropagation()">
    <div class="profile-cover" id="profileCover">
      <button class="profile-close" onclick="closeProfile()">✕</button>
      <div class="profile-avatar" id="profileAvatar"></div>
    </div>
    <div class="profile-body">
      <div class="profile-top">
        <div><div class="profile-name" id="profileName"></div><div class="profile-role" id="profileRole"></div></div>
        <div class="profile-actions"><button class="pa-btn">💬 Mensaje</button><button class="pa-btn primary">📧 Email</button></div>
      </div>
      <p class="profile-bio" id="profileBio"></p>
      <div class="stats-row">
        <div class="stat-box"><div class="stat-box-num" id="pStat1">0</div><div class="stat-box-label">Proyectos</div></div>
        <div class="stat-box"><div class="stat-box-num" id="pStat2">0</div><div class="stat-box-label">Años exp.</div></div>
        <div class="stat-box"><div class="stat-box-num" id="pStat3">0</div><div class="stat-box-label">Certificaciones</div></div>
      </div>
      <div class="profile-section">
        <div class="profile-section-title">🛠️ Habilidades</div>
        <div class="skills-grid" id="profileSkills"></div>
      </div>
      <div class="profile-section">
        <div class="profile-section-title">📋 Proyectos Actuales</div>
        <div class="projects-list" id="profileProjects"></div>
      </div>
    </div>
  </div>
</div>

<script>
const members=[
  {name:'Ana García',role:'Tech Lead',dept:'engineering',emoji:'👩‍💻',color:'linear-gradient(135deg,#4F46E5,#7C3AED)',coverColor:'linear-gradient(135deg,#312e81,#4F46E5)',deptColor:'background:rgba(79,70,229,.1);color:#4F46E5',skills:['React','Node.js','AWS','Docker','TypeScript'],projects:[{icon:'🌐',name:'Portal B2B Bancolombia',status:'active'},{icon:'🤖',name:'IA Motor de Recomendaciones',status:'active'}],bio:'Arquitecta de software con 9 años de experiencia liderando equipos de alto rendimiento. Especialista en arquitecturas cloud-native y sistemas distribuidos.',stats:['12','9','5']},
  {name:'Marco Reyes',role:'UX/UI Senior Designer',dept:'design',emoji:'🎨',color:'linear-gradient(135deg,#EC4899,#A855F7)',coverColor:'linear-gradient(135deg,#831843,#EC4899)',deptColor:'background:rgba(236,72,153,.1);color:#EC4899',skills:['Figma','Design Systems','User Research','Prototyping','Motion'],projects:[{icon:'📱',name:'App Mobile AhorraYa',status:'active'},{icon:'🎯',name:'DS Corporativo v2.0',status:'done'}],bio:'Diseñador de experiencias con enfoque en la intersección de belleza funcional y accesibilidad. Creador de sistemas de diseño para +20 empresas latinoamericanas.',stats:['24','7','3']},
  {name:'Laura Díaz',role:'Frontend Developer',dept:'engineering',emoji:'👩‍🎤',color:'linear-gradient(135deg,#06B6D4,#0891B2)',coverColor:'linear-gradient(135deg,#0C4A6E,#06B6D4)',deptColor:'background:rgba(6,182,212,.1);color:#0891B2',skills:['Vue.js','CSS/SASS','Storybook','Testing','Performance'],projects:[{icon:'📊',name:'Dashboard Analytics Real-Time',status:'active'},{icon:'🔔',name:'Sistema Notificaciones Push',status:'done'}],bio:'Frontend engineer enfocada en rendimiento y accesibilidad web. Contribuidora activa de proyectos open source y speaker en conferencias de CSS.',stats:['18','5','4']},
  {name:'Pedro Luna',role:'Data Scientist',dept:'data',emoji:'🧪',color:'linear-gradient(135deg,#F97316,#EA580C)',coverColor:'linear-gradient(135deg,#431407,#F97316)',deptColor:'background:rgba(249,115,22,.1);color:#F97316',skills:['Python','ML/AI','SQL','Spark','TensorFlow'],projects:[{icon:'📈',name:'Pipeline ETL Ventas',status:'active'},{icon:'🤖',name:'Modelo Predicción Churn',status:'active'}],bio:'Científico de datos con PhD en Matemáticas Computacionales. Especialista en ML aplicado a negocios, con modelos en producción que generan $12M USD de valor anual.',stats:['31','8','7']},
  {name:'Sara Vargas',role:'Product Manager',dept:'product',emoji:'🚀',color:'linear-gradient(135deg,#22C55E,#16A34A)',coverColor:'linear-gradient(135deg,#14532D,#22C55E)',deptColor:'background:rgba(34,197,94,.1);color:#16A34A',skills:['Agile','OKRs','Roadmapping','SQL','Mixpanel'],projects:[{icon:'📱',name:'App Fintech v3.0',status:'active'},{icon:'🌐',name:'Portal Enterprise',status:'active'}],bio:'Product manager con trayectoria en startups y enterprise. Launché 8 productos digitales que han superado el millón de usuarios activos combinados.',stats:['8','6','2']},
  {name:'Carlos Mejía',role:'DevOps Engineer',dept:'ops',emoji:'⚙️',color:'linear-gradient(135deg,#EAB308,#CA8A04)',coverColor:'linear-gradient(135deg,#422006,#EAB308)',deptColor:'background:rgba(234,179,8,.1);color:#CA8A04',skills:['Kubernetes','Terraform','CI/CD','AWS','Security'],projects:[{icon:'☁️',name:'Migration to K8s',status:'done'},{icon:'🔐',name:'Zero-Trust Security',status:'active'}],bio:'Ingeniero de infraestructura cloud con certificaciones AWS Solutions Architect y CKA. Responsable de la infraestructura que soporta 2M de transacciones diarias.',stats:['22','7','6']},
  {name:'Valentina Cruz',role:'Backend Developer',dept:'engineering',emoji:'👩‍🔬',color:'linear-gradient(135deg,#8B5CF6,#6D28D9)',coverColor:'linear-gradient(135deg,#2E1065,#8B5CF6)',deptColor:'background:rgba(139,92,246,.1);color:#6D28D9',skills:['Java','Spring Boot','PostgreSQL','Kafka','Redis'],projects:[{icon:'💳',name:'Payment Gateway',status:'active'},{icon:'📊',name:'API Microservices',status:'done'}],bio:'Desarrolladora backend especializada en sistemas de alta disponibilidad y pagos digitales. 7 años construyendo APIs que procesan millones de transacciones.',stats:['15','7','4']},
  {name:'Andrés Herrera',role:'Data Engineer',dept:'data',emoji:'🏗️',color:'linear-gradient(135deg,#EF4444,#B91C1C)',coverColor:'linear-gradient(135deg,#450A0A,#EF4444)',deptColor:'background:rgba(239,68,68,.1);color:#B91C1C',skills:['Airflow','dbt','Snowflake','Python','Spark'],projects:[{icon:'🏛️',name:'Data Warehouse Modernization',status:'active'},{icon:'📊',name:'Real-time Analytics Platform',status:'active'}],bio:'Data engineer con 6 años construyendo pipelines de datos para empresas Fortune 500 en LatAm. Experto en arquitecturas de datos lakehouse.',stats:['27','6','5']}
];

let activeDept='all';let searchQuery='';

function renderGrid(){
  const grid=document.getElementById('teamGrid');
  const filtered=members.filter(m=>{
    const deptOk=activeDept==='all'||m.dept===activeDept;
    const q=searchQuery.toLowerCase();
    const searchOk=!q||m.name.toLowerCase().includes(q)||m.role.toLowerCase().includes(q)||m.skills.some(s=>s.toLowerCase().includes(q));
    return deptOk&&searchOk;
  });
  document.getElementById('membersCount').textContent=`${filtered.length} miembros`;
  grid.innerHTML=filtered.map((m,i)=>`
    <div class="member-card" onclick="openProfile(${members.indexOf(m)})" style="animation:fadeUp .3s ease ${i*.05}s both">
      <div class="member-cover" style="background:${m.coverColor}"></div>
      <div class="member-avatar" style="background:${m.color}">${m.emoji}</div>
      <div class="member-body">
        <div class="member-name">${m.name}</div>
        <div class="member-role">${m.role}</div>
        <div class="member-dept" style="${m.deptColor}">${m.dept.toUpperCase()}</div>
        <div class="member-skills">${m.skills.slice(0,3).map(s=>`<span class="skill-tag">${s}</span>`).join('')}${m.skills.length>3?`<span class="skill-tag">+${m.skills.length-3}</span>`:''}</div>
        <div class="member-footer">
          <div class="member-links">
            <a class="member-link" onclick="event.stopPropagation()" title="LinkedIn">in</a>
            <a class="member-link" onclick="event.stopPropagation()" title="GitHub">gh</a>
            <a class="member-link" onclick="event.stopPropagation()" title="Email">@</a>
          </div>
          <span class="view-profile-btn">Ver perfil →</span>
        </div>
      </div>
    </div>
  `).join('');
}

function openProfile(idx){
  const m=members[idx];
  document.getElementById('profileCover').style.background=m.coverColor;
  document.getElementById('profileAvatar').style.background=m.color;
  document.getElementById('profileAvatar').textContent=m.emoji;
  document.getElementById('profileName').textContent=m.name;
  document.getElementById('profileRole').textContent=m.role+' · '+m.dept.toUpperCase();
  document.getElementById('profileBio').textContent=m.bio;
  document.getElementById('pStat1').textContent=m.stats[0];
  document.getElementById('pStat2').textContent=m.stats[1];
  document.getElementById('pStat3').textContent=m.stats[2];
  document.getElementById('profileSkills').innerHTML=m.skills.map(s=>`<span class="skill-item">${s}</span>`).join('');
  document.getElementById('profileProjects').innerHTML=m.projects.map(p=>`<div class="proj-item"><span class="proj-icon">${p.icon}</span><div class="proj-info"><div class="proj-name">${p.name}</div><div class="proj-status">${p.status==='active'?'En progreso':'Completado'}</div></div><span class="proj-status-pill ${p.status==='active'?'pill-active':'pill-done'}">${p.status==='active'?'Activo':'✓ Listo'}</span></div>`).join('');
  document.getElementById('profileModal').classList.add('show');
  document.body.style.overflow='hidden';
}
function closeProfile(){document.getElementById('profileModal').classList.remove('show');document.body.style.overflow=''}
document.getElementById('profileModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeProfile()});

function filterDept(dept,btn){
  activeDept=dept;
  document.querySelectorAll('.dept-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}
function searchMembers(){searchQuery=document.getElementById('searchInput').value;renderGrid()}

renderGrid();
</script>
</body>
</html>
```
