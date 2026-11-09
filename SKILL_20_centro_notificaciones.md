# SKILL 20: Centro de Notificaciones y Alertas con Feed en Tiempo Real

## 1. Propósito y Filosofía
Genera centros de notificaciones empresariales con inbox prioritizado, alertas categorizadas, toasts animados y panel de configuración. Ideal para dashboards operacionales, plataformas SaaS y sistemas de monitoreo que requieren visibilidad inmediata de eventos críticos.

- **Enfoque:** Visibilidad de eventos + gestión de alertas + UX de bandeja de entrada.
- **UX:** Feed en vivo + toast notifications + panel de detalles + configuración de preferencias.
- **Estética:** Dark ops — negro profundo, acentos de semáforo (rojo/amarillo/verde), tipografía técnica.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Centro de Notificaciones</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0A0C10;--surface:#111318;--card:#1A1D27;--border:rgba(255,255,255,.07);--red:#EF4444;--yellow:#F59E0B;--green:#22C55E;--blue:#3B82F6;--purple:#8B5CF6;--text:#E2E8F0;--muted:#64748B}
body{font-family:'Segoe UI',system-ui,monospace;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}

/* TOAST CONTAINER */
#toastContainer{position:fixed;top:20px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;width:320px}
.toast{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px 16px;display:flex;align-items:flex-start;gap:12px;box-shadow:0 8px 32px rgba(0,0,0,.5);transform:translateX(360px);transition:transform .3s cubic-bezier(.175,.885,.32,1.275);position:relative;overflow:hidden}
.toast.show{transform:translateX(0)}
.toast.hide{transform:translateX(360px)}
.toast-bar{position:absolute;left:0;top:0;bottom:0;width:3px}
.toast-critical .toast-bar{background:var(--red)}
.toast-warning .toast-bar{background:var(--yellow)}
.toast-info .toast-bar{background:var(--blue)}
.toast-success .toast-bar{background:var(--green)}
.toast-icon{font-size:20px;flex-shrink:0;margin-top:1px}
.toast-body{flex:1}
.toast-title{font-size:13px;font-weight:700;margin-bottom:2px}
.toast-msg{font-size:12px;color:var(--muted)}
.toast-time{font-size:10px;color:var(--muted);margin-top:4px}
.toast-close{background:none;border:none;color:var(--muted);cursor:pointer;font-size:14px;flex-shrink:0;padding:0 2px;transition:color .2s}
.toast-close:hover{color:var(--text)}

/* APP LAYOUT */
.app{display:grid;grid-template-columns:60px 280px 1fr 320px;height:100vh;overflow:hidden}
@media(max-width:900px){.app{grid-template-columns:1fr}}

/* ICON NAV */
.icon-nav{background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;padding:16px 0;gap:6px}
.nav-ico{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;cursor:pointer;transition:all .2s;position:relative}
.nav-ico:hover{background:var(--card)}
.nav-ico.active{background:linear-gradient(135deg,var(--purple),var(--blue))}
.nav-badge{position:absolute;top:4px;right:4px;width:16px;height:16px;background:var(--red);border-radius:50%;font-size:9px;font-weight:900;color:#fff;display:flex;align-items:center;justify-content:center;border:2px solid var(--surface)}
.nav-sep{width:32px;height:1px;background:var(--border);margin:6px 0}

/* INBOX SIDEBAR */
.inbox-sidebar{background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden}
.inbox-header{padding:16px;border-bottom:1px solid var(--border)}
.inbox-title{font-size:16px;font-weight:800;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between}
.unread-badge{background:var(--red);color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:30px}
.search-box{position:relative}
.search-box input{width:100%;background:var(--card);border:1px solid var(--border);border-radius:8px;padding:8px 12px 8px 32px;font-size:12px;color:var(--text);outline:none;font-family:inherit;transition:border-color .2s}
.search-box input:focus{border-color:var(--purple)}
.search-box::before{content:'🔍';position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:12px}
.filter-tabs{display:flex;gap:4px;padding:10px 16px;border-bottom:1px solid var(--border)}
.ftab{padding:5px 10px;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;border:none;background:transparent;color:var(--muted);font-family:inherit}
.ftab.active{background:var(--card);color:var(--text)}
.notif-list{flex:1;overflow-y:auto;padding:8px}
.notif-list::-webkit-scrollbar{width:4px}
.notif-list::-webkit-scrollbar-track{background:transparent}
.notif-list::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}

/* NOTIFICATION ITEM */
.notif-item{padding:12px;border-radius:10px;cursor:pointer;transition:all .2s;margin-bottom:4px;border:1px solid transparent;position:relative}
.notif-item:hover{background:var(--card);border-color:var(--border)}
.notif-item.active{background:var(--card);border-color:rgba(139,92,246,.3)}
.notif-item.unread::before{content:'';position:absolute;left:8px;top:50%;transform:translateY(-50%);width:6px;height:6px;background:var(--blue);border-radius:50%}
.notif-item.unread{padding-left:22px}
.ni-top{display:flex;align-items:center;gap:8px;margin-bottom:4px}
.ni-icon{font-size:16px;flex-shrink:0}
.ni-source{font-size:11px;font-weight:700;color:var(--muted);flex:1}
.ni-time{font-size:10px;color:var(--muted)}
.severity-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}
.sev-critical{background:var(--red);box-shadow:0 0 6px var(--red)}
.sev-warning{background:var(--yellow);box-shadow:0 0 6px rgba(245,158,11,.5)}
.sev-info{background:var(--blue)}
.sev-success{background:var(--green)}
.ni-title{font-size:12px;font-weight:600;color:var(--text);margin-bottom:2px;line-height:1.3}
.ni-preview{font-size:11px;color:var(--muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}

/* DETAIL PANEL */
.detail-panel{background:var(--bg);display:flex;flex-direction:column;overflow:hidden}
.detail-header{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:14px}
.dh-icon{font-size:32px}
.dh-info{flex:1}
.dh-title{font-size:18px;font-weight:800;margin-bottom:4px;line-height:1.3}
.dh-meta{display:flex;align-items:center;gap:10px;font-size:12px;color:var(--muted)}
.severity-tag{padding:2px 10px;border-radius:30px;font-size:11px;font-weight:700}
.st-critical{background:rgba(239,68,68,.15);color:var(--red)}
.st-warning{background:rgba(245,158,11,.15);color:var(--yellow)}
.st-info{background:rgba(59,130,246,.15);color:var(--blue)}
.st-success{background:rgba(34,197,94,.15);color:var(--green)}
.dh-actions{display:flex;gap:8px;flex-shrink:0}
.action-btn{padding:7px 14px;border-radius:8px;border:1px solid var(--border);background:var(--card);color:var(--text);font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}
.action-btn:hover{border-color:var(--purple)}
.action-btn.primary{background:var(--purple);border-color:var(--purple);color:#fff}
.detail-body{flex:1;overflow-y:auto;padding:24px}
.detail-section{margin-bottom:24px}
.ds-label{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
.ds-content{font-size:14px;color:var(--text);line-height:1.7;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px}
.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.dg-item{background:var(--card);border:1px solid var(--border);border-radius:8px;padding:12px}
.dg-label{font-size:11px;color:var(--muted);margin-bottom:3px}
.dg-value{font-size:13px;font-weight:700;color:var(--text)}
.timeline-mini{display:flex;flex-direction:column;gap:0}
.tl-item{display:flex;gap:12px;padding:8px 0;position:relative}
.tl-item::before{content:'';position:absolute;left:12px;top:24px;bottom:-8px;width:1px;background:var(--border)}
.tl-item:last-child::before{display:none}
.tl-dot{width:24px;height:24px;border-radius:50%;background:var(--card);border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;z-index:1}
.tl-text{font-size:12px;color:var(--muted);padding-top:4px}
.tl-text strong{color:var(--text);font-weight:600}
.empty-detail{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:var(--muted);text-align:center;gap:12px}
.empty-detail span:first-child{font-size:48px;filter:grayscale(1) opacity(.4)}

/* SETTINGS PANEL */
.settings-panel{background:var(--surface);border-left:1px solid var(--border);display:flex;flex-direction:column;overflow:hidden}
.sp-header{padding:16px;border-bottom:1px solid var(--border);font-size:14px;font-weight:800;display:flex;justify-content:space-between;align-items:center}
.sp-body{flex:1;overflow-y:auto;padding:12px}
.setting-group{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px;margin-bottom:12px}
.sg-title{font-size:12px;font-weight:700;color:var(--muted);letter-spacing:.5px;text-transform:uppercase;margin-bottom:12px}
.sg-item{display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)}
.sg-item:last-child{border-bottom:none;padding-bottom:0}
.sg-info{flex:1}
.sg-label{font-size:13px;font-weight:600;color:var(--text);margin-bottom:1px}
.sg-desc{font-size:11px;color:var(--muted)}
.toggle{width:40px;height:22px;border-radius:11px;background:var(--border);cursor:pointer;transition:background .2s;position:relative;flex-shrink:0;border:none}
.toggle.on{background:var(--green)}
.toggle::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;background:#fff;border-radius:50%;transition:transform .2s}
.toggle.on::after{transform:translateX(18px)}
.simulate-btn{width:100%;padding:10px;background:linear-gradient(135deg,var(--red),#DC2626);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit;margin-bottom:8px}
.simulate-btn:hover{transform:translateY(-1px);box-shadow:0 4px 15px rgba(239,68,68,.3)}
.sim-warning{width:100%;padding:10px;background:linear-gradient(135deg,var(--yellow),#D97706);color:#000;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit;margin-bottom:8px}
.sim-warning:hover{transform:translateY(-1px)}
.sim-success{width:100%;padding:10px;background:linear-gradient(135deg,var(--green),#16A34A);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.sim-success:hover{transform:translateY(-1px)}
</style>
</head>
<body>

<div id="toastContainer"></div>

<div class="app">
  <!-- ICON NAV -->
  <nav class="icon-nav">
    <div class="nav-ico active" title="Notificaciones">🔔<div class="nav-badge" id="mainBadge">5</div></div>
    <div class="nav-ico" title="Alertas Críticas">🚨</div>
    <div class="nav-ico" title="Monitoreo">📊</div>
    <div class="nav-sep"></div>
    <div class="nav-ico" title="Integraciones">🔗</div>
    <div class="nav-ico" title="Configuración">⚙️</div>
    <div style="flex:1"></div>
    <div class="nav-ico" title="Perfil">👤</div>
  </nav>

  <!-- INBOX SIDEBAR -->
  <aside class="inbox-sidebar">
    <div class="inbox-header">
      <div class="inbox-title">Bandeja <span class="unread-badge" id="unreadBadge">5</span></div>
      <div class="search-box"><input type="text" placeholder="Buscar notificaciones..." oninput="filterNotifs(this.value)"></div>
    </div>
    <div class="filter-tabs">
      <button class="ftab active" onclick="filterByType('all',this)">Todas</button>
      <button class="ftab" onclick="filterByType('critical',this)">🚨</button>
      <button class="ftab" onclick="filterByType('warning',this)">⚠️</button>
      <button class="ftab" onclick="filterByType('info',this)">ℹ️</button>
      <button class="ftab" onclick="filterByType('success',this)">✅</button>
    </div>
    <div class="notif-list" id="notifList"></div>
  </aside>

  <!-- DETAIL PANEL -->
  <main class="detail-panel">
    <div id="emptyDetail" class="empty-detail" style="height:100%;display:flex">
      <span>🔔</span>
      <div><strong style="color:var(--text)">Selecciona una notificación</strong><br><small>para ver los detalles completos</small></div>
    </div>
    <div id="detailContent" style="display:none;flex-direction:column;height:100%">
      <div class="detail-header">
        <div class="dh-icon" id="dhIcon">🚨</div>
        <div class="dh-info">
          <div class="dh-title" id="dhTitle">Título</div>
          <div class="dh-meta"><span id="dhSevTag" class="severity-tag st-critical">CRÍTICO</span><span id="dhSource">Sistema</span><span>•</span><span id="dhTime">ahora</span></div>
        </div>
        <div class="dh-actions">
          <button class="action-btn" onclick="markCurrentRead()">✓ Marcar leída</button>
          <button class="action-btn primary" onclick="resolveAlert()">Resolver</button>
        </div>
      </div>
      <div class="detail-body">
        <div class="detail-section"><div class="ds-label">Descripción</div><div class="ds-content" id="dhDesc">-</div></div>
        <div class="detail-section"><div class="ds-label">Detalles</div><div class="detail-grid" id="dhGrid"></div></div>
        <div class="detail-section"><div class="ds-label">Historial de Eventos</div><div class="timeline-mini" id="dhTimeline"></div></div>
      </div>
    </div>
  </main>

  <!-- SETTINGS PANEL -->
  <aside class="settings-panel">
    <div class="sp-header">⚙️ Configuración <span style="font-size:11px;color:var(--muted);font-weight:400">Alertas</span></div>
    <div class="sp-body">
      <div class="setting-group">
        <div class="sg-title">🚨 Canales de Alerta</div>
        <div class="sg-item"><div class="sg-info"><div class="sg-label">Toast en pantalla</div><div class="sg-desc">Popups en tiempo real</div></div><button class="toggle on" onclick="toggleThis(this)"></button></div>
        <div class="sg-item"><div class="sg-info"><div class="sg-label">Email</div><div class="sg-desc">Alertas críticas por correo</div></div><button class="toggle on" onclick="toggleThis(this)"></button></div>
        <div class="sg-item"><div class="sg-info"><div class="sg-label">SMS</div><div class="sg-desc">Solo incidentes P1</div></div><button class="toggle" onclick="toggleThis(this)"></button></div>
        <div class="sg-item"><div class="sg-info"><div class="sg-label">Slack</div><div class="sg-desc">Canal #alertas-ops</div></div><button class="toggle on" onclick="toggleThis(this)"></button></div>
      </div>
      <div class="setting-group">
        <div class="sg-title">🎛️ Filtros de Severidad</div>
        <div class="sg-item"><div class="sg-info"><div class="sg-label" style="color:var(--red)">🔴 Crítico (P1)</div><div class="sg-desc">Acción inmediata requerida</div></div><button class="toggle on" onclick="toggleThis(this)"></button></div>
        <div class="sg-item"><div class="sg-info"><div class="sg-label" style="color:var(--yellow)">🟡 Warning (P2)</div><div class="sg-desc">Atender en 4 horas</div></div><button class="toggle on" onclick="toggleThis(this)"></button></div>
        <div class="sg-item"><div class="sg-info"><div class="sg-label" style="color:var(--blue)">🔵 Info (P3)</div><div class="sg-desc">Revisión en próxima iteración</div></div><button class="toggle" onclick="toggleThis(this)"></button></div>
      </div>
      <div class="setting-group">
        <div class="sg-title">🧪 Simulador de Alertas</div>
        <button class="simulate-btn" onclick="simulateAlert('critical')">🔴 Simular Alerta Crítica</button>
        <button class="sim-warning" onclick="simulateAlert('warning')">🟡 Simular Warning</button>
        <button class="sim-success" onclick="simulateAlert('success')">✅ Simular Éxito</button>
      </div>
    </div>
  </aside>
</div>

<script>
const NOTIFS=[
  {id:1,sev:'critical',icon:'🔴',source:'Database Cluster',title:'Alta latencia en DB Producción',preview:'P95 latencia > 2000ms detectado',time:'hace 2 min',unread:true,
   desc:'El cluster de base de datos principal está experimentando latencias anómalas superiores a 2000ms en el percentil 95. Esto está afectando a todos los endpoints que realizan consultas pesadas.',
   details:[{l:'Servidor',v:'db-prod-01'},{l:'P95 Latencia',v:'2,340ms'},{l:'Umbral',v:'200ms'},{l:'Afectados',v:'~1,200 usuarios'}],
   timeline:[{d:'🔴','t':'hace 2 min','m':'<strong>Alerta disparada</strong> — latencia supera umbral'},{'d':'📊','t':'hace 2 min','m':'<strong>Pagerduty</strong> notificado'},{'d':'🔍','t':'hace 1 min','m':'<strong>On-call</strong> revisando logs'}]},
  {id:2,sev:'critical',icon:'🚨',source:'API Gateway',title:'Tasa de error 5xx > 15%',preview:'503 Service Unavailable en /api/v2/checkout',time:'hace 5 min',unread:true,
   desc:'El endpoint /api/v2/checkout está devolviendo errores 503 al 15.7% de las solicitudes. El upstream service tiene capacidad degradada.',
   details:[{l:'Endpoint',v:'/api/v2/checkout'},{l:'Error Rate',v:'15.7%'},{l:'RPS',v:'4,320 req/s'},{l:'Inicio',v:'11:43:22 UTC'}],
   timeline:[{'d':'🚨','t':'hace 5 min','m':'<strong>Error rate supera umbral</strong> del 5%'},{'d':'📧','t':'hace 4 min','m':'<strong>Email enviado</strong> al equipo on-call'}]},
  {id:3,sev:'warning',icon:'⚠️',source:'Kubernetes',title:'Pod memory pressure en worker-03',preview:'85% uso de memoria, threshold 80%',time:'hace 12 min',unread:true,
   desc:'El nodo worker-03 está experimentando presión de memoria. El uso actual está en 85%, superando el umbral de alerta del 80%. Se recomienda revisar los pods en ejecución.',
   details:[{l:'Nodo',v:'worker-03'},{l:'Memoria',v:'85% / 128GB'},{l:'Pods activos',v:'47'},{l:'OOM kills',v:'0'}],
   timeline:[{'d':'⚠️','t':'hace 12 min','m':'<strong>Warning</strong> — memoria supera 80%'},{'d':'🔍','t':'hace 10 min','m':'<strong>Auto-diagnóstico</strong> iniciado'}]},
  {id:4,sev:'warning',icon:'🔒',source:'Security Scanner',title:'Certificado SSL expira en 7 días',preview:'api.empresa.com — vence 2026-11-16',time:'hace 1 h',unread:true,
   desc:'El certificado SSL del dominio api.empresa.com expirará en 7 días. Es necesario renovar antes del vencimiento para evitar interrupciones de servicio.',
   details:[{l:'Dominio',v:'api.empresa.com'},{l:'Vence',v:'2026-11-16'},{l:'Emisor',v:'DigiCert'},{l:'Días restantes',v:'7'}],
   timeline:[{'d':'🔒','t':'hace 1 h','m':'<strong>Alerta 7 días</strong> generada automáticamente'},{'d':'📧','t':'hace 1 h','m':'<strong>Ticket creado</strong> en JIRA-4421'}]},
  {id:5,sev:'info',icon:'ℹ️',source:'CI/CD Pipeline',title:'Deploy a producción iniciado',preview:'Release v2.14.3 — rama: main',time:'hace 25 min',unread:true,
   desc:'El pipeline de deployment ha iniciado el proceso de release v2.14.3 a producción. El proceso completo toma aproximadamente 12 minutos.',
   details:[{l:'Versión',v:'v2.14.3'},{l:'Rama',v:'main (a3f92bc)'},{l:'Ambiente',v:'Producción'},{l:'Duración est.',v:'~12 min'}],
   timeline:[{'d':'🚀','t':'hace 25 min','m':'<strong>Pipeline iniciado</strong> por John Cruz'},{'d':'🧪','t':'hace 22 min','m':'<strong>Tests pasados</strong> (247/247)'},{'d':'⏳','t':'hace 20 min','m':'<strong>Rolling update</strong> en progreso'}]},
  {id:6,sev:'success',icon:'✅',source:'Backup Service',title:'Backup nocturno completado',preview:'24.7 GB respaldados correctamente',time:'hace 3 h',unread:false,
   desc:'El proceso de backup nocturno completó exitosamente. Se respaldaron 24.7 GB de datos críticos en el storage S3 con verificación de integridad aprobada.',
   details:[{l:'Tamaño',v:'24.7 GB'},{l:'Duración',v:'2h 14min'},{l:'Destino',v:'s3://prod-backups'},{l:'Integridad',v:'✓ Verificada'}],
   timeline:[{'d':'⏰','t':'hace 5 h','m':'<strong>Backup iniciado</strong> (programado)'},{'d':'💾','t':'hace 3 h','m':'<strong>Backup completado</strong> — OK'}]}
];

const simulatedAlerts={
  critical:{sev:'critical',icon:'🔴',source:'Monitor Sintético',title:'CRÍTICO: Downtime detectado en checkout',preview:'Fallo total en endpoint de pago',time:'ahora mismo',unread:true,
    desc:'El monitor sintético ha detectado un fallo total en el endpoint de pago. Los usuarios no pueden completar compras.',
    details:[{l:'Endpoint',v:'/api/checkout'},{l:'Error',v:'Connection timeout'},{l:'Detectado',v:'ahora mismo'},{l:'Impacto',v:'TOTAL'}],
    timeline:[{'d':'🔴','t':'ahora','m':'<strong>Downtime detectado</strong> por monitor'}]},
  warning:{sev:'warning',icon:'⚠️',source:'Performance Monitor',title:'CPU elevado en server-web-02',preview:'92% CPU — umbral: 85%',time:'ahora mismo',unread:true,
    desc:'El servidor web-02 está experimentando carga de CPU por encima del umbral configurado.',
    details:[{l:'Servidor',v:'web-02'},{l:'CPU',v:'92%'},{l:'Umbral',v:'85%'},{l:'Duración',v:'3 min'}],
    timeline:[{'d':'⚠️','t':'ahora','m':'<strong>CPU supera umbral</strong>'}]},
  success:{sev:'success',icon:'✅',source:'Health Check',title:'Servicio de pagos recuperado',preview:'Latencia normalizada — P95: 180ms',time:'ahora mismo',unread:true,
    desc:'El servicio de pagos se ha recuperado completamente. Las métricas volvieron a niveles normales.',
    details:[{l:'Estado',v:'Operational'},{l:'P95',v:'180ms'},{l:'Uptime',v:'99.98%'},{l:'Desde',v:'hace 2 min'}],
    timeline:[{'d':'✅','t':'ahora','m':'<strong>Servicio recuperado</strong>'}]}
};

let notifs=[...NOTIFS];let activeId=null;let activeFilter='all';let searchQ='';

function renderList(){
  const list=document.getElementById('notifList');list.innerHTML='';
  let visible=notifs.filter(n=>{
    if(activeFilter!=='all'&&n.sev!==activeFilter)return false;
    if(searchQ&&!n.title.toLowerCase().includes(searchQ)&&!n.preview.toLowerCase().includes(searchQ))return false;
    return true;
  });
  visible.forEach(n=>{
    const cls=`notif-item${n.unread?' unread':''}${n.id===activeId?' active':''}`;
    const dot=`sev-${n.sev}`;
    list.innerHTML+=`<div class="${cls}" onclick="openNotif(${n.id})">
      <div class="ni-top"><span class="ni-icon">${n.icon}</span><span class="ni-source">${n.source}</span><div class="severity-dot ${dot}"></div><span class="ni-time">${n.time}</span></div>
      <div class="ni-title">${n.title}</div>
      <div class="ni-preview">${n.preview}</div>
    </div>`;
  });
  updateBadges();
}

function openNotif(id){
  activeId=id;
  const n=notifs.find(x=>x.id===id);
  if(!n)return;
  n.unread=false;
  document.getElementById('emptyDetail').style.display='none';
  const dc=document.getElementById('detailContent');dc.style.display='flex';
  document.getElementById('dhIcon').textContent=n.icon;
  document.getElementById('dhTitle').textContent=n.title;
  document.getElementById('dhSource').textContent=n.source;
  document.getElementById('dhTime').textContent=n.time;
  const sevTag=document.getElementById('dhSevTag');
  const sevMap={critical:['CRÍTICO','st-critical'],warning:['WARNING','st-warning'],info:['INFO','st-info'],success:['SUCCESS','st-success']};
  sevTag.textContent=sevMap[n.sev][0];sevTag.className='severity-tag '+sevMap[n.sev][1];
  document.getElementById('dhDesc').textContent=n.desc;
  document.getElementById('dhGrid').innerHTML=n.details.map(d=>`<div class="dg-item"><div class="dg-label">${d.l}</div><div class="dg-value">${d.v}</div></div>`).join('');
  document.getElementById('dhTimeline').innerHTML=n.timeline.map(t=>`<div class="tl-item"><div class="tl-dot">${t.d}</div><div class="tl-text"><span style="color:var(--muted)">${t.t}</span> — ${t.m}</div></div>`).join('');
  renderList();
}

function markCurrentRead(){if(activeId){const n=notifs.find(x=>x.id===activeId);if(n)n.unread=false;renderList()}}
function resolveAlert(){if(activeId){notifs=notifs.filter(x=>x.id!==activeId);activeId=null;document.getElementById('emptyDetail').style.display='flex';document.getElementById('detailContent').style.display='none';renderList()}}
function filterByType(type,btn){activeFilter=type;document.querySelectorAll('.ftab').forEach(t=>t.classList.remove('active'));btn.classList.add('active');renderList()}
function filterNotifs(q){searchQ=q.toLowerCase();renderList()}
function updateBadges(){
  const unread=notifs.filter(n=>n.unread).length;
  document.getElementById('unreadBadge').textContent=unread;
  document.getElementById('mainBadge').textContent=unread;
  document.getElementById('mainBadge').style.display=unread?'flex':'none';
}
function toggleThis(btn){btn.classList.toggle('on')}

function showToast(type,title,msg){
  const icons={critical:'🔴',warning:'🟡',info:'🔵',success:'✅'};
  const toast=document.createElement('div');
  toast.className=`toast toast-${type}`;
  toast.innerHTML=`<div class="toast-bar"></div><div class="toast-icon">${icons[type]}</div><div class="toast-body"><div class="toast-title">${title}</div><div class="toast-msg">${msg}</div><div class="toast-time">ahora mismo</div></div><button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>`;
  document.getElementById('toastContainer').appendChild(toast);
  setTimeout(()=>toast.classList.add('show'),10);
  setTimeout(()=>{toast.classList.add('hide');setTimeout(()=>toast.remove(),400)},6000);
}

function simulateAlert(type){
  const data={...simulatedAlerts[type],id:Date.now()};
  notifs.unshift(data);renderList();
  showToast(type,data.title,data.preview);
}

renderList();
// Initial toast demo
setTimeout(()=>showToast('warning','Recordatorio: Certificado SSL','api.empresa.com expira en 7 días'),1000);
</script>
</body>
</html>
```
