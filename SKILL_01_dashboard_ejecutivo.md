# SKILL 01: Dashboard Ejecutivo con Menú Lateral y KPI Cards

## 1. Propósito y Filosofía
Genera dashboards ejecutivos de alto impacto para presentar métricas, indicadores clave (KPIs) y resúmenes de gestión. Ideal para reportes gerenciales, seguimiento de proyectos y Business Intelligence visual.

- **Enfoque:** Analítico, ejecutivo, orientado a datos y decisiones estratégicas.
- **UX:** Menú lateral retráctil + tarjetas KPI animadas + ventanas flotantes de detalle.
- **Estética:** Corporativo oscuro con acentos neón vibrantes (deep navy + electric blue + emerald).

---

## 2. Sistema de Diseño

### Paleta Corporativa Dark
| Elemento | HEX | Uso |
|---|---|---|
| Fondo principal | `#0A0E1A` | Body y layout base |
| Panel lateral | `#111827` | Sidebar navigation |
| Cards superficie | `#1E2A3A` | Tarjetas KPI |
| Acento primario | `#00D4FF` | Títulos activos, bordes |
| Acento éxito | `#10B981` | Valores positivos |
| Acento alerta | `#F59E0B` | Warnings |
| Acento peligro | `#EF4444` | Valores críticos |
| Texto principal | `#E2E8F0` | Texto general |
| Texto secundario | `#64748B` | Labels y subtítulos |

### Tipografía
- **Familia:** `'Segoe UI', system-ui, sans-serif`
- **Métricas:** Bold `700` para KPIs, Medium `500` para labels, Regular `400` para texto

---

## 3. Reglas UX
1. **Sidebar retráctil:** Menú lateral que colapsa a íconos con toggle animado.
2. **KPI Cards con tendencia:** Cada tarjeta muestra valor, variación % y mini sparkline.
3. **Modales de detalle:** Click en cualquier card abre ventana flotante con gráfico expandido.
4. **Tooltips contextuales:** Hover sobre métricas muestra información adicional.
5. **Animación de entrada:** Valores se "cuentan" al cargar la página (counter animation).

---

## 4. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Dashboard Ejecutivo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0A0E1A;--sidebar:#111827;--card:#1E2A3A;--card-hover:#243447;
  --accent:#00D4FF;--success:#10B981;--warn:#F59E0B;--danger:#EF4444;
  --text:#E2E8F0;--muted:#64748B;--border:rgba(0,212,255,0.15);
}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);display:flex;min-height:100vh;overflow-x:hidden}

/* SIDEBAR */
#sidebar{width:260px;background:var(--sidebar);border-right:1px solid var(--border);display:flex;flex-direction:column;transition:width .3s ease;position:fixed;height:100vh;z-index:100;overflow:hidden}
#sidebar.collapsed{width:68px}
.sidebar-header{padding:20px 16px;display:flex;align-items:center;gap:12px;border-bottom:1px solid var(--border);min-height:70px}
.logo-icon{width:36px;height:36px;background:linear-gradient(135deg,var(--accent),#0066FF);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.logo-text{font-size:16px;font-weight:700;color:var(--accent);white-space:nowrap;overflow:hidden}
#sidebar.collapsed .logo-text,.sidebar-label{opacity:0;width:0;overflow:hidden;white-space:nowrap;transition:opacity .2s}
#sidebar:not(.collapsed) .sidebar-label{opacity:1;width:auto;transition:opacity .3s .1s}
.sidebar-nav{flex:1;padding:12px 8px;overflow-y:auto}
.nav-item{display:flex;align-items:center;gap:14px;padding:12px 10px;border-radius:8px;cursor:pointer;transition:all .2s;margin-bottom:4px;text-decoration:none;color:var(--muted)}
.nav-item:hover,.nav-item.active{background:rgba(0,212,255,0.1);color:var(--accent)}
.nav-item.active{border-left:3px solid var(--accent)}
.nav-icon{font-size:20px;flex-shrink:0;width:28px;text-align:center}
.sidebar-label{font-size:14px;font-weight:500}
.toggle-btn{position:fixed;top:22px;left:232px;width:28px;height:28px;background:var(--accent);border:none;border-radius:50%;cursor:pointer;color:#000;font-size:12px;font-weight:bold;transition:left .3s;z-index:200;display:flex;align-items:center;justify-content:center}
#sidebar.collapsed~.toggle-btn,body.collapsed .toggle-btn{left:54px}

/* MAIN */
#main{margin-left:260px;flex:1;padding:28px;transition:margin-left .3s}
body.collapsed #main{margin-left:68px}
.top-bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.page-title{font-size:24px;font-weight:700;color:var(--text)}
.page-title span{color:var(--accent)}
.top-actions{display:flex;gap:10px}
.btn{padding:8px 16px;border-radius:6px;border:1px solid var(--border);background:var(--card);color:var(--text);cursor:pointer;font-size:13px;transition:all .2s}
.btn:hover{background:var(--card-hover);border-color:var(--accent)}
.btn-primary{background:var(--accent);color:#000;border-color:var(--accent);font-weight:600}
.btn-primary:hover{background:#00b8e0}

/* KPI GRID */
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;margin-bottom:28px}
.kpi-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.kpi-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--accent),transparent)}
.kpi-card.success::before{background:linear-gradient(90deg,var(--success),transparent)}
.kpi-card.warn::before{background:linear-gradient(90deg,var(--warn),transparent)}
.kpi-card.danger::before{background:linear-gradient(90deg,var(--danger),transparent)}
.kpi-card:hover{transform:translateY(-4px);box-shadow:0 12px 40px rgba(0,212,255,0.15);border-color:var(--accent)}
.kpi-label{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
.kpi-value{font-size:36px;font-weight:700;line-height:1;margin-bottom:8px}
.kpi-value.success{color:var(--success)}.kpi-value.warn{color:var(--warn)}.kpi-value.danger{color:var(--danger)}
.kpi-trend{display:flex;align-items:center;gap:6px;font-size:13px}
.trend-up{color:var(--success)}.trend-down{color:var(--danger)}
.kpi-mini-chart{margin-top:12px;height:40px;display:flex;align-items:flex-end;gap:3px}
.bar{flex:1;border-radius:2px 2px 0 0;background:rgba(0,212,255,0.3);transition:height .5s ease}
.bar.active{background:var(--accent)}

/* CONTENT GRID */
.content-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px}
.panel{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.panel-title{font-size:16px;font-weight:600;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center}
.panel-title .badge{font-size:11px;background:rgba(0,212,255,0.1);color:var(--accent);padding:3px 8px;border-radius:20px;border:1px solid var(--border)}

/* TABLE */
.data-table{width:100%;border-collapse:collapse;font-size:14px}
.data-table th{padding:10px;text-align:left;color:var(--muted);font-weight:500;border-bottom:1px solid var(--border);font-size:12px;text-transform:uppercase}
.data-table td{padding:12px 10px;border-bottom:1px solid rgba(255,255,255,0.03)}
.data-table tr:hover td{background:rgba(255,255,255,0.02)}
.status-pill{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600}
.pill-green{background:rgba(16,185,129,0.15);color:var(--success)}
.pill-yellow{background:rgba(245,158,11,0.15);color:var(--warn)}
.pill-red{background:rgba(239,68,68,0.15);color:var(--danger)}

/* ACTIVITY LIST */
.activity-item{display:flex;gap:12px;padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04)}
.activity-dot{width:8px;height:8px;border-radius:50%;margin-top:6px;flex-shrink:0}
.activity-info{flex:1}
.activity-title{font-size:14px;margin-bottom:2px}
.activity-time{font-size:12px;color:var(--muted)}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(4px);z-index:1000;display:none;align-items:center;justify-content:center}
.modal-overlay.show{display:flex}
.modal-box{background:#1a2538;border:1px solid var(--border);border-radius:16px;width:min(600px,90vw);max-height:85vh;overflow-y:auto;padding:28px;position:relative;animation:slideUp .3s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.modal-close{position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.1);border:none;color:var(--text);width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}
.modal-close:hover{background:var(--danger);color:#fff}
.modal-title{font-size:20px;font-weight:700;margin-bottom:20px;color:var(--accent)}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
.detail-item{background:rgba(255,255,255,0.03);padding:14px;border-radius:8px;border:1px solid var(--border)}
.detail-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.detail-value{font-size:22px;font-weight:700}

/* CHART BARS */
.chart-container{margin-top:16px}
.chart-row{display:flex;align-items:center;gap:10px;margin-bottom:10px;font-size:13px}
.chart-label{width:80px;color:var(--muted);text-align:right;flex-shrink:0}
.chart-bar-wrap{flex:1;background:rgba(255,255,255,0.05);border-radius:4px;height:24px;overflow:hidden}
.chart-bar-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--accent),#0066FF);display:flex;align-items:center;padding-left:8px;font-size:12px;font-weight:600;transition:width 1s ease}
</style>
</head>
<body>

<button class="toggle-btn" onclick="toggleSidebar()" id="toggleBtn">☰</button>

<nav id="sidebar">
  <div class="sidebar-header">
    <div class="logo-icon">📊</div>
    <span class="logo-text">ExecBoard</span>
  </div>
  <div class="sidebar-nav">
    <div class="nav-item active"><span class="nav-icon">🏠</span><span class="sidebar-label">Dashboard</span></div>
    <div class="nav-item"><span class="nav-icon">📈</span><span class="sidebar-label">Analytics</span></div>
    <div class="nav-item"><span class="nav-icon">👥</span><span class="sidebar-label">Equipo</span></div>
    <div class="nav-item"><span class="nav-icon">📋</span><span class="sidebar-label">Proyectos</span></div>
    <div class="nav-item"><span class="nav-icon">💰</span><span class="sidebar-label">Finanzas</span></div>
    <div class="nav-item"><span class="nav-icon">🎯</span><span class="sidebar-label">Objetivos</span></div>
    <div class="nav-item"><span class="nav-icon">⚙️</span><span class="sidebar-label">Configuración</span></div>
  </div>
</nav>

<main id="main">
  <div class="top-bar">
    <div>
      <div class="page-title">Dashboard <span>Ejecutivo</span></div>
      <div style="color:var(--muted);font-size:13px;margin-top:4px">Reporte mensual · Noviembre 2026</div>
    </div>
    <div class="top-actions">
      <button class="btn">📥 Exportar</button>
      <button class="btn btn-primary">+ Nuevo Reporte</button>
    </div>
  </div>

  <div class="kpi-grid">
    <div class="kpi-card" onclick="openModal('revenue')">
      <div class="kpi-label">Ingresos Totales</div>
      <div class="kpi-value success" data-target="4820000">$0</div>
      <div class="kpi-trend"><span class="trend-up">▲ 12.4%</span> vs mes anterior</div>
      <div class="kpi-mini-chart">
        <div class="bar" style="height:40%"></div><div class="bar" style="height:55%"></div>
        <div class="bar" style="height:35%"></div><div class="bar" style="height:70%"></div>
        <div class="bar" style="height:60%"></div><div class="bar" style="height:80%"></div>
        <div class="bar active" style="height:100%"></div>
      </div>
    </div>
    <div class="kpi-card warn" onclick="openModal('clients')">
      <div class="kpi-label">Clientes Activos</div>
      <div class="kpi-value warn" data-target="1247">0</div>
      <div class="kpi-trend"><span class="trend-up">▲ 8.1%</span> nuevos clientes</div>
      <div class="kpi-mini-chart">
        <div class="bar" style="height:60%"></div><div class="bar" style="height:65%"></div>
        <div class="bar" style="height:72%"></div><div class="bar" style="height:68%"></div>
        <div class="bar" style="height:80%"></div><div class="bar" style="height:88%"></div>
        <div class="bar active" style="height:100%"></div>
      </div>
    </div>
    <div class="kpi-card success" onclick="openModal('projects')">
      <div class="kpi-label">Proyectos Activos</div>
      <div class="kpi-value" data-target="34">0</div>
      <div class="kpi-trend"><span class="trend-down">▼ 2.3%</span> carga reducida</div>
      <div class="kpi-mini-chart">
        <div class="bar" style="height:90%"></div><div class="bar" style="height:85%"></div>
        <div class="bar" style="height:95%"></div><div class="bar" style="height:88%"></div>
        <div class="bar" style="height:92%"></div><div class="bar" style="height:80%"></div>
        <div class="bar active" style="height:75%"></div>
      </div>
    </div>
    <div class="kpi-card danger" onclick="openModal('satisfaction')">
      <div class="kpi-label">Satisfacción NPS</div>
      <div class="kpi-value" data-target="87">0</div>
      <div class="kpi-trend"><span class="trend-up">▲ 3.2pts</span> mejora mensual</div>
      <div class="kpi-mini-chart">
        <div class="bar" style="height:70%"></div><div class="bar" style="height:72%"></div>
        <div class="bar" style="height:68%"></div><div class="bar" style="height:75%"></div>
        <div class="bar" style="height:82%"></div><div class="bar" style="height:88%"></div>
        <div class="bar active" style="height:100%"></div>
      </div>
    </div>
  </div>

  <div class="content-grid">
    <div class="panel">
      <div class="panel-title">Proyectos Recientes <span class="badge">Activos</span></div>
      <table class="data-table">
        <thead><tr><th>Proyecto</th><th>Cliente</th><th>Progreso</th><th>Estado</th></tr></thead>
        <tbody>
          <tr><td>Portal BI Corporativo</td><td>Bancolombia</td><td>78%</td><td><span class="status-pill pill-green">En Curso</span></td></tr>
          <tr><td>App Mobile Pagos</td><td>Davivienda</td><td>45%</td><td><span class="status-pill pill-yellow">Revisión</span></td></tr>
          <tr><td>Automatización ERP</td><td>Grupo Éxito</td><td>92%</td><td><span class="status-pill pill-green">Cierre</span></td></tr>
          <tr><td>Dashboard Analytics</td><td>Avianca</td><td>12%</td><td><span class="status-pill pill-yellow">Inicio</span></td></tr>
          <tr><td>Sistema Nómina Cloud</td><td>ISA Corp</td><td>5%</td><td><span class="status-pill pill-red">Retrasado</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="panel">
      <div class="panel-title">Actividad Reciente</div>
      <div class="activity-item"><div class="activity-dot" style="background:var(--success)"></div><div class="activity-info"><div class="activity-title">Hito completado en Portal BI</div><div class="activity-time">Hace 2 horas</div></div></div>
      <div class="activity-item"><div class="activity-dot" style="background:var(--warn)"></div><div class="activity-info"><div class="activity-title">Revisión requerida: App Mobile</div><div class="activity-time">Hace 4 horas</div></div></div>
      <div class="activity-item"><div class="activity-dot" style="background:var(--accent)"></div><div class="activity-info"><div class="activity-title">Nuevo cliente: Avianca</div><div class="activity-time">Ayer 3:30 PM</div></div></div>
      <div class="activity-item"><div class="activity-dot" style="background:var(--danger)"></div><div class="activity-info"><div class="activity-title">Alerta: Nómina Cloud retrasado</div><div class="activity-time">Ayer 9:00 AM</div></div></div>
    </div>
  </div>
</main>

<!-- MODAL -->
<div class="modal-overlay" id="detailModal">
  <div class="modal-box">
    <button class="modal-close" onclick="closeModal()">✕</button>
    <div class="modal-title" id="modalTitle">Detalle del KPI</div>
    <div class="detail-grid" id="modalDetails"></div>
    <div class="chart-container" id="modalChart"></div>
  </div>
</div>

<script>
const kpiData={
  revenue:{title:'Ingresos Totales — Detalle',details:[{l:'Este Mes',v:'$4.82M',c:'var(--success)'},{l:'Mes Anterior',v:'$4.29M',c:'var(--text)'},{l:'Crecimiento',v:'+12.4%',c:'var(--success)'},{l:'Meta Anual',v:'87% ✓',c:'var(--warn)'}],bars:[{l:'Ene',p:62},{l:'Feb',p:58},{l:'Mar',p:70},{l:'Abr',p:65},{l:'May',p:78},{l:'Jun',p:72},{l:'Jul',p:88},{l:'Ago',p:82},{l:'Sep',p:90},{l:'Oct',p:85},{l:'Nov',p:100}]},
  clients:{title:'Clientes Activos — Detalle',details:[{l:'Total Activos',v:'1,247',c:'var(--warn)'},{l:'Nuevos',v:'+94',c:'var(--success)'},{l:'Churn Rate',v:'2.1%',c:'var(--danger)'},{l:'Retención',v:'97.9%',c:'var(--success)'}],bars:[{l:'Sector A',p:85},{l:'Sector B',p:72},{l:'Sector C',p:60},{l:'Sector D',p:45},{l:'Sector E',p:30}]},
  projects:{title:'Proyectos — Detalle',details:[{l:'En Curso',v:'34',c:'var(--text)'},{l:'Completados',v:'128',c:'var(--success)'},{l:'En Riesgo',v:'5',c:'var(--danger)'},{l:'Backlog',v:'18',c:'var(--muted)'}],bars:[{l:'Q1',p:90},{l:'Q2',p:95},{l:'Q3',p:88},{l:'Q4',p:75}]},
  satisfaction:{title:'NPS — Satisfacción del Cliente',details:[{l:'Score NPS',v:'87/100',c:'var(--success)'},{l:'Promotores',v:'72%',c:'var(--success)'},{l:'Pasivos',v:'21%',c:'var(--warn)'},{l:'Detractores',v:'7%',c:'var(--danger)'}],bars:[{l:'Calidad',p:92},{l:'Tiempo',p:78},{l:'Soporte',p:88},{l:'Precio',p:65}]}
};

function openModal(key){
  const d=kpiData[key];
  document.getElementById('modalTitle').textContent=d.title;
  document.getElementById('modalDetails').innerHTML=d.details.map(i=>`<div class="detail-item"><div class="detail-label">${i.l}</div><div class="detail-value" style="color:${i.c}">${i.v}</div></div>`).join('');
  document.getElementById('modalChart').innerHTML='<div style="font-size:13px;color:var(--muted);margin-bottom:10px;text-transform:uppercase;letter-spacing:1px">Distribución</div>'+d.bars.map(b=>`<div class="chart-row"><div class="chart-label">${b.l}</div><div class="chart-bar-wrap"><div class="chart-bar-fill" style="width:0%" data-w="${b.p}%">${b.p}%</div></div></div>`).join('');
  document.getElementById('detailModal').classList.add('show');
  setTimeout(()=>{document.querySelectorAll('.chart-bar-fill').forEach(el=>el.style.width=el.dataset.w)},50);
}
function closeModal(){document.getElementById('detailModal').classList.remove('show')}
document.getElementById('detailModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeModal()});

function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('collapsed');
  document.body.classList.toggle('collapsed');
}

// Counter animation
document.querySelectorAll('[data-target]').forEach(el=>{
  const target=parseInt(el.dataset.target);
  const isPrice=el.textContent.includes('$');
  let current=0;const step=target/60;
  const timer=setInterval(()=>{
    current+=step;if(current>=target){current=target;clearInterval(timer)}
    el.textContent=isPrice?'$'+Math.floor(current).toLocaleString():Math.floor(current).toLocaleString();
  },16);
});
</script>
</body>
</html>
```
