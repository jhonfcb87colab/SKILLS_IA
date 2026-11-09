# SKILL 06: Tablero Kanban Interactivo con Popups de Tarea y Drag Visual

## 1. Propósito y Filosofía
Genera tableros Kanban interactivos para gestión de proyectos, sprints y flujos de trabajo. Perfecto para equipos de desarrollo, marketing y operaciones que necesitan visibilidad del estado de tareas en tiempo real.

- **Enfoque:** Gestión visual de trabajo, claridad del flujo, colaboración de equipo.
- **UX:** Columnas Kanban + cards arrastrables (simulado) + popups de detalle + filtros por persona.
- **Estética:** Moderno SaaS — blanco limpio + columnas de color + acentos vibrantes por estado.

---

## 2. Sistema de Diseño

### Paleta Kanban
| Elemento | HEX | Uso |
|---|---|---|
| Fondo | `#F4F5F7` | Canvas board |
| Columna | `#EBECF0` | Background columna |
| Card | `#FFFFFF` | Superficie tarea |
| Todo | `#6B778C` | Estado pendiente |
| In Progress | `#0052CC` | En progreso |
| Review | `#FF991F` | En revisión |
| Done | `#00875A` | Completado |

---

## 3. Reglas UX
1. **Drag visual simulado:** Cards cambian de columna con botones inline y animación de movimiento.
2. **Popup de tarea:** Click en card abre modal completo con descripción, checklist y comentarios.
3. **Filtros de equipo:** Avatares clicables filtran cards por asignado.
4. **Contador de columna:** Cada columna muestra el conteo actualizado en tiempo real.
5. **Quick add:** Botón "+" al final de cada columna para agregar tarea rápida.

---

## 4. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tablero Kanban</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F4F5F7;--col:#EBECF0;--white:#FFFFFF;--text:#172B4D;--muted:#6B778C;
  --todo:#6B778C;--inprog:#0052CC;--review:#FF991F;--done:#00875A;
  --border:#DFE1E6;--shadow:0 2px 8px rgba(0,0,0,0.1);
}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;flex-direction:column}

/* TOPBAR */
.topbar{background:#0052CC;padding:0 20px;height:48px;display:flex;align-items:center;gap:16px}
.top-logo{color:#fff;font-weight:800;font-size:16px;letter-spacing:-0.5px}
.top-logo span{color:#4C9AFF}
.top-nav{display:flex;gap:4px}
.top-nav-item{color:rgba(255,255,255,.8);padding:6px 12px;border-radius:4px;font-size:13px;cursor:pointer;transition:background .2s}
.top-nav-item:hover{background:rgba(255,255,255,.15)}
.top-nav-item.active{background:rgba(255,255,255,.2);color:#fff;font-weight:600}

/* BOARD HEADER */
.board-header{padding:16px 20px;background:var(--white);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
.board-title-wrap{display:flex;align-items:center;gap:12px}
.board-icon{width:36px;height:36px;background:linear-gradient(135deg,#0052CC,#4C9AFF);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:18px}
.board-title{font-size:18px;font-weight:700}
.board-subtitle{font-size:13px;color:var(--muted)}
.board-tools{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.team-avatars{display:flex;gap:4px}
.avatar{width:32px;height:32px;border-radius:50%;border:2px solid var(--white);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s}
.avatar:hover{transform:scale(1.1);z-index:1}
.avatar.filtered{opacity:1;box-shadow:0 0 0 2px var(--inprog)}
.avatar.dimmed{opacity:.4}
.separator{width:1px;height:28px;background:var(--border)}
.btn-board{padding:7px 14px;border:1px solid var(--border);border-radius:4px;font-size:13px;cursor:pointer;background:var(--white);color:var(--text);transition:all .2s;font-family:inherit}
.btn-board:hover{background:var(--col)}
.btn-primary-sm{background:#0052CC;color:#fff;border-color:#0052CC}
.btn-primary-sm:hover{background:#0043A8}

/* BOARD */
.board-wrap{flex:1;overflow-x:auto;padding:16px 20px}
.board{display:flex;gap:12px;min-width:max-content;align-items:flex-start}
.column{width:280px;background:var(--col);border-radius:8px;padding:12px;display:flex;flex-direction:column;gap:8px}
.col-header{display:flex;align-items:center;justify-content:space-between;padding:4px 0 8px}
.col-title-wrap{display:flex;align-items:center;gap:8px}
.col-dot{width:10px;height:10px;border-radius:50%}
.col-name{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--text)}
.col-count{background:rgba(0,0,0,.12);color:var(--text);font-size:11px;font-weight:700;padding:2px 7px;border-radius:10px}
.col-add{width:24px;height:24px;border-radius:4px;border:none;background:transparent;cursor:pointer;color:var(--muted);font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.col-add:hover{background:rgba(0,0,0,.1);color:var(--text)}

/* KANBAN CARD */
.k-card{background:var(--white);border-radius:6px;padding:12px;box-shadow:var(--shadow);cursor:pointer;transition:all .2s;border:2px solid transparent;position:relative}
.k-card:hover{box-shadow:0 6px 20px rgba(0,0,0,.15);transform:translateY(-2px);border-color:var(--inprog)}
.k-card.dragging{opacity:.5;transform:rotate(3deg)}
.card-label{display:inline-block;font-size:10px;font-weight:700;padding:2px 7px;border-radius:3px;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.label-bug{background:#FFEBE6;color:#BF2600}
.label-feat{background:#E3FCEF;color:#006644}
.label-design{background:#EAE6FF;color:#403294}
.label-data{background:#DEEBFF;color:#0747A6}
.card-title{font-size:14px;font-weight:600;line-height:1.4;margin-bottom:10px;color:var(--text)}
.card-meta{display:flex;align-items:center;justify-content:space-between}
.card-left{display:flex;align-items:center;gap:6px}
.card-priority{font-size:14px}
.card-tags{display:flex;gap:4px}
.card-tag{font-size:10px;background:var(--col);padding:2px 6px;border-radius:3px;color:var(--muted)}
.card-assignee{width:24px;height:24px;border-radius:50%;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;color:#fff}
.card-actions{position:absolute;top:8px;right:8px;display:none;gap:4px}
.k-card:hover .card-actions{display:flex}
.card-action-btn{width:22px;height:22px;border-radius:4px;border:1px solid var(--border);background:var(--white);cursor:pointer;font-size:11px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.card-action-btn:hover{background:var(--inprog);color:#fff;border-color:var(--inprog)}
.card-due{font-size:11px;color:var(--muted);display:flex;align-items:center;gap:3px;margin-top:8px}
.card-due.overdue{color:#BF2600}
.card-checklist-mini{font-size:11px;color:var(--muted);margin-top:6px;display:flex;align-items:center;gap:4px}
.check-mini-bar{flex:1;height:4px;background:var(--col);border-radius:2px;overflow:hidden}
.check-mini-fill{height:100%;background:var(--done);border-radius:2px}

/* QUICK ADD */
.quick-add{display:none;background:var(--white);border-radius:6px;padding:10px}
.quick-add input{width:100%;border:2px solid var(--inprog);border-radius:4px;padding:8px;font-size:13px;outline:none;font-family:inherit}
.quick-add-actions{display:flex;gap:6px;margin-top:8px}
.qa-btn{padding:5px 12px;border-radius:4px;border:none;font-size:13px;cursor:pointer;font-family:inherit}
.qa-save{background:var(--inprog);color:#fff}
.qa-cancel{background:transparent;color:var(--muted)}
.col-add-btn{width:100%;padding:8px;border:1.5px dashed rgba(0,0,0,.2);border-radius:6px;background:transparent;color:var(--muted);font-size:13px;cursor:pointer;transition:all .2s;font-family:inherit}
.col-add-btn:hover{background:rgba(0,0,0,.05);color:var(--text)}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:1000;display:none;align-items:flex-start;justify-content:center;padding-top:48px;overflow-y:auto}
.modal-overlay.show{display:flex}
.task-modal{background:var(--white);width:min(760px,95vw);border-radius:8px;overflow:hidden;animation:fadeUp .2s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}
.modal-top{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:12px}
.modal-col-badge{padding:4px 10px;border-radius:4px;font-size:12px;font-weight:700;text-transform:uppercase}
.modal-title-input{flex:1;font-size:20px;font-weight:700;border:none;outline:none;font-family:inherit;color:var(--text);resize:none}
.modal-close{background:transparent;border:none;cursor:pointer;color:var(--muted);font-size:20px;padding:4px}
.modal-body{display:grid;grid-template-columns:1fr 220px;min-height:400px}
.modal-main{padding:24px;border-right:1px solid var(--border)}
.modal-sidebar{padding:24px}
.modal-section{margin-bottom:24px}
.modal-section-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:10px;display:flex;align-items:center;gap:6px}
.modal-desc{width:100%;border:1px solid var(--border);border-radius:4px;padding:10px;font-size:14px;line-height:1.6;min-height:100px;resize:vertical;font-family:inherit;color:var(--text);outline:none}
.modal-desc:focus{border-color:var(--inprog)}
.checklist-item{display:flex;align-items:center;gap:10px;padding:6px 0;font-size:14px}
.checklist-item input[type=checkbox]{width:16px;height:16px;cursor:pointer;accent-color:var(--inprog)}
.checklist-item span.done-text{text-decoration:line-through;color:var(--muted)}
.add-check-btn{background:transparent;border:none;color:var(--inprog);font-size:13px;cursor:pointer;padding:4px 0;font-family:inherit}
.sidebar-row{margin-bottom:16px}
.sidebar-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px}
.sidebar-value{font-size:13px;color:var(--text)}
.priority-select{display:flex;gap:6px}
.prio-btn{padding:4px 10px;border-radius:4px;border:1px solid var(--border);font-size:12px;cursor:pointer;background:transparent;transition:all .2s;font-family:inherit}
.prio-btn.active.low{background:#E3FCEF;border-color:#006644;color:#006644}
.prio-btn.active.med{background:#FFFAE6;border-color:#FF8B00;color:#FF8B00}
.prio-btn.active.high{background:#FFEBE6;border-color:#BF2600;color:#BF2600}
.move-btns{display:flex;flex-direction:column;gap:4px;margin-top:8px}
.move-btn{padding:7px 10px;border:1px solid var(--border);border-radius:4px;font-size:12px;cursor:pointer;background:transparent;text-align:left;transition:all .2s;font-family:inherit;color:var(--text)}
.move-btn:hover{background:var(--col)}
.modal-footer{padding:14px 24px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.footer-actions{display:flex;gap:8px}
.btn-delete{padding:7px 14px;border:1px solid #FFEBE6;background:transparent;color:#BF2600;border-radius:4px;font-size:13px;cursor:pointer;font-family:inherit;transition:all .2s}
.btn-delete:hover{background:#FFEBE6}
.btn-save{padding:7px 16px;background:var(--inprog);color:#fff;border:none;border-radius:4px;font-size:13px;cursor:pointer;font-family:inherit;font-weight:600}
</style>
</head>
<body>

<nav class="topbar">
  <div class="top-logo">TASK<span>FLOW</span></div>
  <div class="top-nav">
    <span class="top-nav-item">Tableros</span>
    <span class="top-nav-item active">Sprint Actual</span>
    <span class="top-nav-item">Backlog</span>
    <span class="top-nav-item">Reportes</span>
  </div>
</nav>

<div class="board-header">
  <div class="board-title-wrap">
    <div class="board-icon">📋</div>
    <div><div class="board-title">Sprint #12 — Plataforma Digital</div><div class="board-subtitle">Nov 1 – Nov 15, 2026 · 14 tareas activas</div></div>
  </div>
  <div class="board-tools">
    <div class="team-avatars">
      <div class="avatar" style="background:#0052CC" title="Ana García" onclick="filterByUser('AG',this)">AG</div>
      <div class="avatar" style="background:#00875A" title="Marco Reyes" onclick="filterByUser('MR',this)">MR</div>
      <div class="avatar" style="background:#FF5630" title="Laura Díaz" onclick="filterByUser('LD',this)">LD</div>
      <div class="avatar" style="background:#6554C0" title="Pedro L." onclick="filterByUser('PL',this)">PL</div>
      <div class="avatar" style="background:#FF8B00" title="Sara V." onclick="filterByUser('SV',this)">SV</div>
    </div>
    <div class="separator"></div>
    <button class="btn-board" onclick="clearFilter()">🔄 Todos</button>
    <button class="btn-board btn-primary-sm" onclick="showQuickAdd('todo')">+ Agregar Tarea</button>
  </div>
</div>

<div class="board-wrap">
  <div class="board">
    <!-- TODO -->
    <div class="column" id="col-todo">
      <div class="col-header">
        <div class="col-title-wrap"><div class="col-dot" style="background:var(--todo)"></div><span class="col-name">Por Hacer</span><span class="col-count" id="count-todo">3</span></div>
        <button class="col-add" onclick="showQuickAdd('todo')">+</button>
      </div>
      <div class="k-card" data-col="todo" data-user="AG" onclick="openTask(this)">
        <span class="card-label label-feat">Feature</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'inprog')" title="Mover →">→</button></div>
        <div class="card-title">Implementar autenticación SSO con Google y Microsoft</div>
        <div class="card-checklist-mini"><span>✓ 2/5</span><div class="check-mini-bar"><div class="check-mini-fill" style="width:40%"></div></div></div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🔴</span><span class="card-tag">Auth</span><span class="card-tag">Backend</span></div><div class="card-assignee" style="background:#0052CC">AG</div></div>
        <div class="card-due">📅 Due Nov 12</div>
      </div>
      <div class="k-card" data-col="todo" data-user="MR" onclick="openTask(this)">
        <span class="card-label label-design">Design</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'inprog')" title="Mover →">→</button></div>
        <div class="card-title">Crear componentes de Design System v2.0</div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🟡</span><span class="card-tag">UI/UX</span></div><div class="card-assignee" style="background:#00875A">MR</div></div>
        <div class="card-due">📅 Due Nov 14</div>
      </div>
      <div class="k-card" data-col="todo" data-user="PL" onclick="openTask(this)">
        <span class="card-label label-data">Data</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'inprog')" title="Mover →">→</button></div>
        <div class="card-title">Configurar pipeline ETL para reportes de ventas</div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🟢</span><span class="card-tag">Data</span></div><div class="card-assignee" style="background:#6554C0">PL</div></div>
        <div class="card-due overdue">⚠️ Vencido Nov 8</div>
      </div>
      <div class="quick-add" id="qa-todo"><input type="text" id="qa-todo-input" placeholder="Título de la tarea..."><div class="quick-add-actions"><button class="qa-btn qa-save" onclick="addCard('todo')">Agregar</button><button class="qa-btn qa-cancel" onclick="hideQuickAdd('todo')">Cancelar</button></div></div>
      <button class="col-add-btn" onclick="showQuickAdd('todo')">+ Agregar tarea</button>
    </div>

    <!-- IN PROGRESS -->
    <div class="column" id="col-inprog">
      <div class="col-header">
        <div class="col-title-wrap"><div class="col-dot" style="background:var(--inprog)"></div><span class="col-name">En Progreso</span><span class="col-count" id="count-inprog">3</span></div>
        <button class="col-add" onclick="showQuickAdd('inprog')">+</button>
      </div>
      <div class="k-card" data-col="inprog" data-user="LD" onclick="openTask(this)">
        <span class="card-label label-feat">Feature</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'todo')" title="← Atrás">←</button><button class="card-action-btn" onclick="moveCard(event,this,'review')" title="→ Review">→</button></div>
        <div class="card-title">Dashboard de analytics con gráficos en tiempo real</div>
        <div class="card-checklist-mini"><span>✓ 7/8</span><div class="check-mini-bar"><div class="check-mini-fill" style="width:87%"></div></div></div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🔴</span><span class="card-tag">Frontend</span></div><div class="card-assignee" style="background:#FF5630">LD</div></div>
        <div class="card-due">📅 Due Nov 11</div>
      </div>
      <div class="k-card" data-col="inprog" data-user="SV" onclick="openTask(this)">
        <span class="card-label label-bug">Bug</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'todo')" title="← Atrás">←</button><button class="card-action-btn" onclick="moveCard(event,this,'review')" title="→ Review">→</button></div>
        <div class="card-title">Fix: Error 500 en endpoint /api/payments/confirm</div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🔴</span><span class="card-tag">API</span><span class="card-tag">Critical</span></div><div class="card-assignee" style="background:#FF8B00">SV</div></div>
        <div class="card-due overdue">⚠️ Urgente</div>
      </div>
      <div class="k-card" data-col="inprog" data-user="AG" onclick="openTask(this)">
        <span class="card-label label-feat">Feature</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'todo')">←</button><button class="card-action-btn" onclick="moveCard(event,this,'review')">→</button></div>
        <div class="card-title">Integración con pasarela de pagos Wompi</div>
        <div class="card-checklist-mini"><span>✓ 3/6</span><div class="check-mini-bar"><div class="check-mini-fill" style="width:50%"></div></div></div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🟡</span><span class="card-tag">Payments</span></div><div class="card-assignee" style="background:#0052CC">AG</div></div>
        <div class="card-due">📅 Due Nov 13</div>
      </div>
      <div class="quick-add" id="qa-inprog"><input type="text" id="qa-inprog-input" placeholder="Título de la tarea..."><div class="quick-add-actions"><button class="qa-btn qa-save" onclick="addCard('inprog')">Agregar</button><button class="qa-btn qa-cancel" onclick="hideQuickAdd('inprog')">Cancelar</button></div></div>
      <button class="col-add-btn" onclick="showQuickAdd('inprog')">+ Agregar tarea</button>
    </div>

    <!-- REVIEW -->
    <div class="column" id="col-review">
      <div class="col-header">
        <div class="col-title-wrap"><div class="col-dot" style="background:var(--review)"></div><span class="col-name">En Revisión</span><span class="col-count" id="count-review">2</span></div>
        <button class="col-add" onclick="showQuickAdd('review')">+</button>
      </div>
      <div class="k-card" data-col="review" data-user="MR" onclick="openTask(this)">
        <span class="card-label label-design">Design</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'inprog')">←</button><button class="card-action-btn" onclick="moveCard(event,this,'done')">→</button></div>
        <div class="card-title">Prototipo de onboarding mobile para nuevos usuarios</div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🟡</span><span class="card-tag">Mobile</span></div><div class="card-assignee" style="background:#00875A">MR</div></div>
        <div class="card-due">📅 Due Nov 10</div>
      </div>
      <div class="k-card" data-col="review" data-user="LD" onclick="openTask(this)">
        <span class="card-label label-feat">Feature</span>
        <div class="card-actions"><button class="card-action-btn" onclick="moveCard(event,this,'inprog')">←</button><button class="card-action-btn" onclick="moveCard(event,this,'done')">→</button></div>
        <div class="card-title">Sistema de notificaciones push en tiempo real</div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">🟢</span><span class="card-tag">Push</span></div><div class="card-assignee" style="background:#FF5630">LD</div></div>
        <div class="card-due">📅 Due Nov 12</div>
      </div>
      <div class="quick-add" id="qa-review"><input type="text" id="qa-review-input" placeholder="Título de la tarea..."><div class="quick-add-actions"><button class="qa-btn qa-save" onclick="addCard('review')">Agregar</button><button class="qa-btn qa-cancel" onclick="hideQuickAdd('review')">Cancelar</button></div></div>
      <button class="col-add-btn" onclick="showQuickAdd('review')">+ Agregar tarea</button>
    </div>

    <!-- DONE -->
    <div class="column" id="col-done">
      <div class="col-header">
        <div class="col-title-wrap"><div class="col-dot" style="background:var(--done)"></div><span class="col-name">Completado</span><span class="col-count" id="count-done">3</span></div>
      </div>
      <div class="k-card" data-col="done" data-user="SV" onclick="openTask(this)" style="opacity:.7">
        <span class="card-label label-feat" style="background:#E3FCEF;color:#006644">Feature</span>
        <div class="card-title" style="text-decoration:line-through;color:var(--muted)">Migración de base de datos a PostgreSQL 16</div>
        <div class="card-meta"><div class="card-left"><span class="card-priority">✅</span><span class="card-tag">DB</span></div><div class="card-assignee" style="background:#FF8B00">SV</div></div>
        <div class="card-due" style="color:var(--done)">✅ Completado Nov 7</div>
      </div>
      <div class="k-card" data-col="done" data-user="AG" onclick="openTask(this)" style="opacity:.7">
        <span class="card-label label-bug" style="background:#E3FCEF;color:#006644">Bug Fix</span>
        <div class="card-title" style="text-decoration:line-through;color:var(--muted)">Fix: Race condition en carrito de compras</div>
        <div class="card-meta"><div class="card-left"><span>✅</span></div><div class="card-assignee" style="background:#0052CC">AG</div></div>
        <div class="card-due" style="color:var(--done)">✅ Completado Nov 6</div>
      </div>
      <div class="k-card" data-col="done" data-user="PL" onclick="openTask(this)" style="opacity:.7">
        <span class="card-label label-data" style="background:#E3FCEF;color:#006644">Data</span>
        <div class="card-title" style="text-decoration:line-through;color:var(--muted)">Setup CI/CD pipeline con GitHub Actions</div>
        <div class="card-meta"><div class="card-left"><span>✅</span></div><div class="card-assignee" style="background:#6554C0">PL</div></div>
        <div class="card-due" style="color:var(--done)">✅ Completado Nov 5</div>
      </div>
    </div>
  </div>
</div>

<!-- TASK MODAL -->
<div class="modal-overlay" id="taskModal" onclick="e=>{if(e.target===this)closeTask()}">
  <div class="task-modal" onclick="event.stopPropagation()">
    <div class="modal-top">
      <div class="modal-col-badge" id="modalColBadge" style="background:#DEEBFF;color:#0747A6">En Progreso</div>
      <div class="modal-title-input" contenteditable="true" id="modalTitle">Título de la tarea</div>
      <button class="modal-close" onclick="closeTask()">✕</button>
    </div>
    <div class="modal-body">
      <div class="modal-main">
        <div class="modal-section">
          <div class="modal-section-title">📝 Descripción</div>
          <textarea class="modal-desc" id="modalDesc" placeholder="Agrega una descripción detallada de la tarea..."></textarea>
        </div>
        <div class="modal-section">
          <div class="modal-section-title">✅ Checklist <small style="font-weight:400;text-transform:none;letter-spacing:0" id="checkProgress"></small></div>
          <div id="checklistItems">
            <div class="checklist-item"><input type="checkbox" onchange="updateCheckProgress()"><span>Análisis de requerimientos</span></div>
            <div class="checklist-item"><input type="checkbox" checked onchange="updateCheckProgress()"><span class="done-text">Diseño de arquitectura</span></div>
            <div class="checklist-item"><input type="checkbox" onchange="updateCheckProgress()"><span>Implementación del módulo</span></div>
            <div class="checklist-item"><input type="checkbox" onchange="updateCheckProgress()"><span>Testing unitario e integración</span></div>
            <div class="checklist-item"><input type="checkbox" onchange="updateCheckProgress()"><span>Code review y aprobación</span></div>
          </div>
          <button class="add-check-btn">+ Agregar elemento</button>
        </div>
      </div>
      <div class="modal-sidebar">
        <div class="sidebar-row"><div class="sidebar-label">👤 Asignado</div><div class="sidebar-value">Ana García</div></div>
        <div class="sidebar-row"><div class="sidebar-label">📅 Fecha límite</div><div class="sidebar-value">Nov 12, 2026</div></div>
        <div class="sidebar-row"><div class="sidebar-label">🎯 Prioridad</div><div class="priority-select"><button class="prio-btn low active" onclick="setPrio(this,'low')">Baja</button><button class="prio-btn med" onclick="setPrio(this,'med')">Media</button><button class="prio-btn high" onclick="setPrio(this,'high')">Alta</button></div></div>
        <div class="sidebar-row"><div class="sidebar-label">🔀 Mover a</div><div class="move-btns"><button class="move-btn" onclick="closeTask()">📋 Por Hacer</button><button class="move-btn" onclick="closeTask()">🔵 En Progreso</button><button class="move-btn" onclick="closeTask()">🟡 En Revisión</button><button class="move-btn" onclick="closeTask()">✅ Completado</button></div></div>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn-delete">🗑️ Eliminar tarea</button>
      <div class="footer-actions"><button class="btn-board" onclick="closeTask()">Cancelar</button><button class="btn-save">💾 Guardar cambios</button></div>
    </div>
  </div>
</div>

<script>
function openTask(card){
  const title=card.querySelector('.card-title').textContent;
  const col=card.dataset.col;
  const colNames={todo:'Por Hacer',inprog:'En Progreso',review:'En Revisión',done:'Completado'};
  const colColors={todo:'background:#F4F5F7;color:#6B778C',inprog:'background:#DEEBFF;color:#0747A6',review:'background:#FFF0B3;color:#172B4D',done:'background:#E3FCEF;color:#006644'};
  document.getElementById('modalTitle').textContent=title;
  const badge=document.getElementById('modalColBadge');
  badge.textContent=colNames[col];badge.style.cssText=colColors[col];
  document.getElementById('taskModal').classList.add('show');
  updateCheckProgress();
}
function closeTask(){document.getElementById('taskModal').classList.remove('show')}
document.getElementById('taskModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeTask()});

function updateCheckProgress(){
  const items=document.querySelectorAll('#checklistItems input[type=checkbox]');
  const checked=[...items].filter(i=>i.checked).length;
  document.getElementById('checkProgress').textContent=`${checked}/${items.length}`;
  items.forEach(cb=>{const span=cb.nextElementSibling;cb.checked?span.classList.add('done-text'):span.classList.remove('done-text')});
}

function setPrio(btn,level){
  document.querySelectorAll('.prio-btn').forEach(b=>{b.classList.remove('active','low','med','high')});
  btn.classList.add('active',level);
}

function moveCard(e,btn,target){
  e.stopPropagation();
  const card=btn.closest('.k-card');
  const targetCol=document.getElementById('col-'+target);
  const addBtn=targetCol.querySelector('.col-add-btn');
  card.dataset.col=target;
  card.style.transition='opacity .2s';card.style.opacity='0';
  setTimeout(()=>{targetCol.insertBefore(card,addBtn);card.style.opacity='1';updateCounts();},200);
}

function updateCounts(){
  ['todo','inprog','review','done'].forEach(col=>{
    const count=document.querySelectorAll(`#col-${col} .k-card`).length;
    document.getElementById('count-'+col).textContent=count;
  });
}

function showQuickAdd(col){document.getElementById('qa-'+col).style.display='block';document.getElementById('qa-'+col+'-input').focus()}
function hideQuickAdd(col){document.getElementById('qa-'+col).style.display='none';document.getElementById('qa-'+col+'-input').value=''}
function addCard(col){
  const input=document.getElementById('qa-'+col+'-input');
  if(!input.value.trim())return;
  const card=document.createElement('div');card.className='k-card';card.dataset.col=col;
  card.style.opacity='0';card.style.transform='scale(0.9)';
  card.innerHTML=`<span class="card-label label-feat">Feature</span><div class="card-title">${input.value}</div><div class="card-meta"><div class="card-left"><span class="card-priority">🟢</span></div></div>`;
  card.onclick=()=>openTask(card);
  document.getElementById('col-'+col).insertBefore(card,document.getElementById('qa-'+col));
  setTimeout(()=>{card.style.transition='all .3s';card.style.opacity='1';card.style.transform='scale(1)'},50);
  hideQuickAdd(col);updateCounts();
}

let activeFilter=null;
function filterByUser(user,avatar){
  if(activeFilter===user){clearFilter();return}
  activeFilter=user;
  document.querySelectorAll('.avatar').forEach(a=>a.classList.toggle('dimmed',a.textContent!==user));
  avatar.classList.remove('dimmed');avatar.classList.add('filtered');
  document.querySelectorAll('.k-card').forEach(c=>{c.style.opacity=c.dataset.user===user?'1':'0.15'});
}
function clearFilter(){
  activeFilter=null;
  document.querySelectorAll('.avatar').forEach(a=>{a.classList.remove('dimmed','filtered')});
  document.querySelectorAll('.k-card').forEach(c=>c.style.opacity='1');
}

updateCounts();
</script>
</body>
</html>
```
