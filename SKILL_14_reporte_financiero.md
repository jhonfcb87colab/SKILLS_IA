# SKILL 14: Reporte Financiero con Tablas Interactivas y Gráficos SVG

## 1. Propósito y Filosofía
Genera reportes financieros ejecutivos con tablas ordenables, gráficos SVG nativos y popups de análisis detallado. Perfecto para informes de gestión, estados financieros y presentaciones de inversores.

- **Enfoque:** Precisión financiera, lectura ejecutiva, análisis multi-período.
- **UX:** Tablas ordenables + gráficos SVG animados + pestañas de período + popup de desglose.
- **Estética:** Corporativo financiero — blanco nieve + verde dinero + acento rojo/naranja para negativo.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Reporte Financiero Ejecutivo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F8F9FA;--white:#FFFFFF;--text:#1A1A2E;--muted:#6C757D;--border:#DEE2E6;--green:#198754;--red:#DC3545;--blue:#0D6EFD;--gold:#FFC107;--shadow:0 2px 12px rgba(0,0,0,.08)}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;font-size:14px}

/* HEADER */
.report-header{background:var(--white);border-bottom:2px solid var(--border);padding:20px 32px;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:50}
.report-brand{display:flex;align-items:center;gap:14px}
.brand-logo{width:40px;height:40px;background:linear-gradient(135deg,#1A1A2E,#16213E);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:18px}
.brand-info{line-height:1.2}
.brand-name{font-size:16px;font-weight:800;color:var(--text)}
.brand-report{font-size:12px;color:var(--muted)}
.report-meta{text-align:right;font-size:12px;color:var(--muted)}
.report-actions{display:flex;gap:8px}
.btn{padding:8px 16px;border:1px solid var(--border);border-radius:6px;font-size:13px;cursor:pointer;background:var(--white);color:var(--text);transition:all .2s;font-family:inherit}
.btn:hover{background:var(--bg)}
.btn-primary{background:var(--text);color:#fff;border-color:var(--text)}
.btn-primary:hover{background:#333}

/* PERIOD TABS */
.period-bar{background:var(--white);border-bottom:1px solid var(--border);padding:0 32px;display:flex;gap:4px}
.period-tab{padding:12px 20px;font-size:13px;font-weight:600;color:var(--muted);cursor:pointer;border-bottom:3px solid transparent;transition:all .2s}
.period-tab:hover{color:var(--text)}
.period-tab.active{color:var(--blue);border-bottom-color:var(--blue)}

/* CONTENT */
.content{padding:24px 32px;max-width:1400px;margin:0 auto}

/* SUMMARY CARDS */
.summary-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px}
.summary-card{background:var(--white);border:1px solid var(--border);border-radius:8px;padding:18px;position:relative;overflow:hidden;cursor:pointer;transition:box-shadow .2s}
.summary-card:hover{box-shadow:var(--shadow)}
.summary-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px}
.sc-green::after{background:var(--green)}.sc-red::after{background:var(--red)}.sc-blue::after{background:var(--blue)}.sc-gold::after{background:var(--gold)}
.sc-label{font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:6px}
.sc-value{font-size:28px;font-weight:800;line-height:1;margin-bottom:4px}
.sc-change{font-size:12px;font-weight:600}
.sc-up{color:var(--green)}.sc-down{color:var(--red)}
.sc-subtext{font-size:11px;color:var(--muted);margin-top:2px}

/* GRID LAYOUT */
.report-grid{display:grid;grid-template-columns:2fr 1fr;gap:20px;margin-bottom:20px}
@media(max-width:900px){.report-grid{grid-template-columns:1fr}}

/* PANEL */
.panel{background:var(--white);border:1px solid var(--border);border-radius:8px;overflow:hidden}
.panel-header{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.panel-title{font-size:15px;font-weight:700;display:flex;align-items:center;gap:8px}
.panel-actions{display:flex;gap:6px}
.panel-btn{padding:5px 10px;border:1px solid var(--border);border-radius:4px;font-size:11px;cursor:pointer;background:transparent;color:var(--muted);transition:all .2s;font-family:inherit}
.panel-btn:hover,.panel-btn.active{background:var(--text);color:#fff;border-color:var(--text)}

/* DATA TABLE */
.data-table-wrap{overflow-x:auto}
.data-table{width:100%;border-collapse:collapse}
.data-table th{padding:11px 14px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);border-bottom:2px solid var(--border);cursor:pointer;white-space:nowrap;user-select:none;background:var(--bg)}
.data-table th:hover{color:var(--text)}
.data-table th.sorted{color:var(--blue)}
.sort-icon{margin-left:4px;opacity:.4}
.data-table th.sorted .sort-icon{opacity:1}
.data-table td{padding:11px 14px;border-bottom:1px solid var(--border);font-size:14px}
.data-table tr:hover td{background:rgba(13,110,253,.03)}
.data-table tr:last-child td{border-bottom:none}
.td-num{text-align:right;font-variant-numeric:tabular-nums;font-weight:600}
.td-positive{color:var(--green)}.td-negative{color:var(--red)}
.td-bar{width:120px}
.mini-bar-wrap{height:8px;background:var(--border);border-radius:4px;overflow:hidden}
.mini-bar-fill{height:100%;border-radius:4px;transition:width .8s ease}
.row-badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700}

/* SVG LINE CHART */
.chart-wrap{padding:16px 20px}
.chart-title{font-size:13px;font-weight:600;margin-bottom:12px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px}
svg.line-chart{width:100%;height:200px;overflow:visible}
.chart-line{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.chart-area{opacity:.1}
.chart-dot{cursor:pointer;transition:r .2s}
.chart-dot:hover{r:7}
.chart-grid-line{stroke:var(--border);stroke-width:1}
.chart-label{font-size:11px;fill:var(--muted);font-family:'Segoe UI',system-ui,sans-serif}

/* BAR CHART */
.bar-chart-svg{width:100%;height:180px}
.bar-rect{cursor:pointer;transition:opacity .2s}
.bar-rect:hover{opacity:.8}

/* MODAL */
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:1000;display:none;align-items:center;justify-content:center;padding:20px}
.modal-overlay.show{display:flex}
.detail-modal{background:var(--white);border-radius:12px;width:min(560px,100%);overflow:hidden;animation:fadeUp .2s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.modal-header{padding:20px 24px;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center}
.modal-header h3{font-size:17px;font-weight:800}
.modal-close{background:none;border:none;font-size:20px;cursor:pointer;color:var(--muted);padding:4px}
.modal-body{padding:24px}
.breakdown-table{width:100%;border-collapse:collapse;font-size:14px}
.breakdown-table td{padding:10px 0;border-bottom:1px solid var(--border)}
.breakdown-table tr:last-child td{border:none;font-weight:800;font-size:16px}
.breakdown-table td:last-child{text-align:right;font-weight:600}
.breakdown-label{color:var(--muted)}
.breakdown-chart{margin-top:16px;display:flex;flex-direction:column;gap:8px}
.bc-row{display:flex;align-items:center;gap:10px;font-size:12px}
.bc-label{width:100px;text-align:right;color:var(--muted);flex-shrink:0}
.bc-track{flex:1;height:20px;background:var(--border);border-radius:4px;overflow:hidden}
.bc-fill{height:100%;border-radius:4px;transition:width .8s ease;display:flex;align-items:center;padding-left:8px;font-size:11px;font-weight:700;color:#fff}
</style>
</head>
<body>

<header class="report-header">
  <div class="report-brand">
    <div class="brand-logo">📊</div>
    <div class="brand-info"><div class="brand-name">FinanceIQ</div><div class="brand-report">Reporte Financiero Ejecutivo · Q3 2026</div></div>
  </div>
  <div class="report-meta">
    <div>Generado: 9 Nov 2026 · 09:14 AM</div>
    <div>Período: Jul–Sep 2026</div>
  </div>
  <div class="report-actions">
    <button class="btn">📧 Compartir</button>
    <button class="btn btn-primary">📥 Descargar PDF</button>
  </div>
</header>

<div class="period-bar">
  <div class="period-tab active" onclick="switchPeriod(this)">Q3 2026</div>
  <div class="period-tab" onclick="switchPeriod(this)">Q2 2026</div>
  <div class="period-tab" onclick="switchPeriod(this)">Q1 2026</div>
  <div class="period-tab" onclick="switchPeriod(this)">FY 2025</div>
  <div class="period-tab" onclick="switchPeriod(this)">FY 2024</div>
</div>

<div class="content">
  <div class="summary-cards">
    <div class="summary-card sc-green" onclick="openDetail('revenue')">
      <div class="sc-label">Ingresos Totales</div>
      <div class="sc-value" style="color:var(--green)">$12.4M</div>
      <div class="sc-change sc-up">▲ +18.3% vs Q2</div>
      <div class="sc-subtext">Meta: $11.8M · Superada ✓</div>
    </div>
    <div class="summary-card sc-blue" onclick="openDetail('ebitda')">
      <div class="sc-label">EBITDA</div>
      <div class="sc-value" style="color:var(--blue)">$3.1M</div>
      <div class="sc-change sc-up">▲ +22.4% vs Q2</div>
      <div class="sc-subtext">Margen: 25% · Objetivo: 23%</div>
    </div>
    <div class="summary-card sc-red" onclick="openDetail('costs')">
      <div class="sc-label">Costos Operativos</div>
      <div class="sc-value" style="color:var(--red)">$8.2M</div>
      <div class="sc-change sc-down">▲ +12.1% vs Q2</div>
      <div class="sc-subtext">66% de ingresos · Mejoró 2pts</div>
    </div>
    <div class="summary-card sc-gold" onclick="openDetail('cashflow')">
      <div class="sc-label">Flujo de Caja</div>
      <div class="sc-value" style="color:var(--gold)">$2.8M</div>
      <div class="sc-change sc-up">▲ +31.2% vs Q2</div>
      <div class="sc-subtext">Libre de deuda operativa</div>
    </div>
    <div class="summary-card sc-green" onclick="openDetail('clients')">
      <div class="sc-label">Clientes Activos</div>
      <div class="sc-value">1,847</div>
      <div class="sc-change sc-up">▲ +247 nuevos</div>
      <div class="sc-subtext">Churn: 1.8% (mínimo histórico)</div>
    </div>
  </div>

  <div class="report-grid">
    <div class="panel">
      <div class="panel-header">
        <div class="panel-title">📋 P&L — Estado de Resultados Q3 2026</div>
        <div class="panel-actions">
          <button class="panel-btn active" onclick="toggleView(this,'table')">Tabla</button>
          <button class="panel-btn" onclick="toggleView(this,'chart')">Gráfico</button>
        </div>
      </div>
      <div class="data-table-wrap" id="tableView">
        <table class="data-table" id="finTable">
          <thead>
            <tr>
              <th onclick="sortTable(0)" data-idx="0">Línea P&L <span class="sort-icon">↕</span></th>
              <th onclick="sortTable(1)" data-idx="1" class="td-num">Q3 2026 <span class="sort-icon">↕</span></th>
              <th onclick="sortTable(2)" data-idx="2" class="td-num">Q2 2026 <span class="sort-icon">↕</span></th>
              <th onclick="sortTable(3)" data-idx="3" class="td-num">Variación <span class="sort-icon">↕</span></th>
              <th>Participación</th>
              <th>Tendencia</th>
            </tr>
          </thead>
          <tbody id="tableBody">
            <tr><td><strong>💰 Ingresos Totales</strong></td><td class="td-num">$12,400,000</td><td class="td-num">$10,480,000</td><td class="td-num td-positive">▲ +18.3%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:100%;background:var(--green)"></div></div></td><td class="td-num">📈</td></tr>
            <tr><td>  Productos SaaS</td><td class="td-num">$8,100,000</td><td class="td-num">$6,800,000</td><td class="td-num td-positive">▲ +19.1%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:65%;background:var(--blue)"></div></div></td><td class="td-num">📈</td></tr>
            <tr><td>  Servicios</td><td class="td-num">$3,200,000</td><td class="td-num">$2,890,000</td><td class="td-num td-positive">▲ +10.7%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:26%;background:var(--blue)"></div></div></td><td class="td-num">📈</td></tr>
            <tr><td>  Consultoría</td><td class="td-num">$1,100,000</td><td class="td-num">$790,000</td><td class="td-num td-positive">▲ +39.2%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:9%;background:var(--gold)"></div></div></td><td class="td-num">📈</td></tr>
            <tr style="background:rgba(220,53,69,.03)"><td><strong>📉 Costos Totales</strong></td><td class="td-num td-negative">($8,200,000)</td><td class="td-num">($7,312,000)</td><td class="td-num td-negative">▼ +12.1%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:66%;background:var(--red)"></div></div></td><td class="td-num">📉</td></tr>
            <tr><td>  COGS</td><td class="td-num td-negative">($3,100,000)</td><td class="td-num">($2,780,000)</td><td class="td-num td-negative">▼ +11.5%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:25%;background:var(--red)"></div></div></td><td class="td-num">📉</td></tr>
            <tr><td>  Ventas & Marketing</td><td class="td-num td-negative">($2,480,000)</td><td class="td-num">($2,100,000)</td><td class="td-num td-negative">▼ +18.1%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:20%;background:var(--red)"></div></div></td><td class="td-num">📊</td></tr>
            <tr><td>  G&A</td><td class="td-num td-negative">($2,620,000)</td><td class="td-num">($2,432,000)</td><td class="td-num td-negative">▼ +7.7%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:21%;background:var(--red)"></div></div></td><td class="td-num">📊</td></tr>
            <tr style="border-top:2px solid var(--border);font-weight:800"><td><strong>✅ EBITDA</strong></td><td class="td-num" style="color:var(--green);font-size:16px">$3,100,000</td><td class="td-num">$2,532,000</td><td class="td-num td-positive">▲ +22.4%</td><td class="td-bar"><div class="mini-bar-wrap"><div class="mini-bar-fill" style="width:25%;background:var(--green)"></div></div></td><td class="td-num">📈</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><div class="panel-title">📊 Ingresos por Trimestre</div></div>
      <div class="chart-wrap">
        <div class="chart-title">Evolución 2025–2026 (en Millones USD)</div>
        <svg class="line-chart" viewBox="0 0 320 180" id="lineChart">
          <!-- Grid lines -->
          <line x1="40" y1="20" x2="310" y2="20" class="chart-grid-line" stroke-dasharray="4"/>
          <line x1="40" y1="60" x2="310" y2="60" class="chart-grid-line" stroke-dasharray="4"/>
          <line x1="40" y1="100" x2="310" y2="100" class="chart-grid-line" stroke-dasharray="4"/>
          <line x1="40" y1="140" x2="310" y2="140" class="chart-grid-line" stroke-dasharray="4"/>
          <!-- Y labels -->
          <text x="34" y="23" class="chart-label" text-anchor="end">$15M</text>
          <text x="34" y="63" class="chart-label" text-anchor="end">$12M</text>
          <text x="34" y="103" class="chart-label" text-anchor="end">$9M</text>
          <text x="34" y="143" class="chart-label" text-anchor="end">$6M</text>
          <!-- Area fill -->
          <path d="M40,140 L85,130 L130,120 L175,105 L220,90 L265,78 L310,65 L310,160 L40,160 Z" fill="url(#areaGrad)" class="chart-area"/>
          <defs><linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#198754" stop-opacity=".3"/><stop offset="100%" stop-color="#198754" stop-opacity="0"/></linearGradient></defs>
          <!-- Line -->
          <path d="M40,140 L85,130 L130,120 L175,105 L220,90 L265,78 L310,65" class="chart-line" stroke="var(--green)"/>
          <!-- Dots -->
          <circle cx="40" cy="140" r="5" fill="var(--green)" class="chart-dot"><title>Q1 2025: $7.2M</title></circle>
          <circle cx="85" cy="130" r="5" fill="var(--green)" class="chart-dot"><title>Q2 2025: $8.1M</title></circle>
          <circle cx="130" cy="120" r="5" fill="var(--green)" class="chart-dot"><title>Q3 2025: $9.0M</title></circle>
          <circle cx="175" cy="105" r="5" fill="var(--green)" class="chart-dot"><title>Q4 2025: $10.2M</title></circle>
          <circle cx="220" cy="90" r="5" fill="var(--green)" class="chart-dot"><title>Q1 2026: $10.9M</title></circle>
          <circle cx="265" cy="78" r="5" fill="var(--blue)" class="chart-dot" stroke="#fff" stroke-width="2"><title>Q2 2026: $10.5M</title></circle>
          <circle cx="310" cy="65" r="6" fill="var(--gold)" class="chart-dot" stroke="#fff" stroke-width="2"><title>Q3 2026: $12.4M ⭐</title></circle>
          <!-- X Labels -->
          <text x="40" y="175" class="chart-label" text-anchor="middle">Q1'25</text>
          <text x="130" y="175" class="chart-label" text-anchor="middle">Q3'25</text>
          <text x="220" y="175" class="chart-label" text-anchor="middle">Q1'26</text>
          <text x="310" y="175" class="chart-label" text-anchor="middle">Q3'26</text>
        </svg>
      </div>
      <div class="panel-header" style="border-top:1px solid var(--border)"><div class="panel-title">🗂️ Distribución de Ingresos Q3</div></div>
      <div class="chart-wrap">
        <svg class="bar-chart-svg" viewBox="0 0 280 160">
          <rect x="10" y="30" width="55" height="110" fill="var(--blue)" rx="4" class="bar-rect"><title>SaaS: $8.1M</title></rect>
          <rect x="80" y="60" width="55" height="80" fill="var(--green)" rx="4" class="bar-rect"><title>Servicios: $3.2M</title></rect>
          <rect x="150" y="100" width="55" height="40" fill="var(--gold)" rx="4" class="bar-rect"><title>Consultoría: $1.1M</title></rect>
          <text x="37" y="24" class="chart-label" text-anchor="middle" fill="var(--blue)">$8.1M</text>
          <text x="107" y="54" class="chart-label" text-anchor="middle" fill="var(--green)">$3.2M</text>
          <text x="177" y="94" class="chart-label" text-anchor="middle" fill="var(--gold)">$1.1M</text>
          <text x="37" y="155" class="chart-label" text-anchor="middle">SaaS</text>
          <text x="107" y="155" class="chart-label" text-anchor="middle">Servicios</text>
          <text x="177" y="155" class="chart-label" text-anchor="middle">Consultoría</text>
        </svg>
      </div>
    </div>
  </div>
</div>

<!-- DETAIL MODAL -->
<div class="modal-overlay" id="detailModal">
  <div class="detail-modal" onclick="event.stopPropagation()">
    <div class="modal-header"><h3 id="modalTitle">Detalle Financiero</h3><button class="modal-close" onclick="closeDetail()">✕</button></div>
    <div class="modal-body">
      <table class="breakdown-table" id="breakdownTable"></table>
      <div class="breakdown-chart" id="breakdownChart"></div>
    </div>
  </div>
</div>

<script>
const details={
  revenue:{title:'💰 Desglose de Ingresos Q3 2026',rows:[{l:'SaaS / Licencias',v:'$8,100,000',pct:65,c:'var(--blue)'},{l:'Servicios Profesionales',v:'$3,200,000',pct:26,c:'var(--green)'},{l:'Consultoría',v:'$1,100,000',pct:9,c:'var(--gold)'},{l:'<strong>TOTAL INGRESOS</strong>',v:'<strong>$12,400,000</strong>',pct:null}]},
  ebitda:{title:'📈 Análisis EBITDA Q3 2026',rows:[{l:'Ingresos',v:'$12,400,000',pct:100,c:'var(--green)'},{l:'(-) COGS',v:'-$3,100,000',pct:25,c:'var(--red)'},{l:'(-) Ventas & Marketing',v:'-$2,480,000',pct:20,c:'var(--red)'},{l:'(-) G&A',v:'-$2,620,000',pct:21,c:'var(--red)'},{l:'<strong>= EBITDA</strong>',v:'<strong>$3,100,000 (25%)</strong>',pct:null}]},
  costs:{title:'📉 Desglose de Costos Q3 2026',rows:[{l:'Costo de Ventas (COGS)',v:'$3,100,000',pct:38,c:'var(--red)'},{l:'Ventas & Marketing',v:'$2,480,000',pct:30,c:'var(--gold)'},{l:'G&A',v:'$2,620,000',pct:32,c:'var(--muted)'},{l:'<strong>TOTAL COSTOS</strong>',v:'<strong>$8,200,000</strong>',pct:null}]},
  cashflow:{title:'💧 Flujo de Caja Q3 2026',rows:[{l:'EBITDA',v:'$3,100,000',pct:100,c:'var(--blue)'},{l:'(-) CapEx',v:'-$180,000',pct:6,c:'var(--red)'},{l:'(-) Cambios capital trabajo',v:'-$120,000',pct:4,c:'var(--red)'},{l:'<strong>= Flujo de Caja Libre</strong>',v:'<strong>$2,800,000</strong>',pct:null}]},
  clients:{title:'👥 Análisis de Clientes Q3 2026',rows:[{l:'Clientes inicio Q3',v:'1,600',pct:87,c:'var(--blue)'},{l:'(+) Nuevos clientes',v:'+247',pct:13,c:'var(--green)'},{l:'(-) Cancelaciones (churn)',v:'-33',pct:1.8,c:'var(--red)'},{l:'<strong>Clientes fin Q3</strong>',v:'<strong>1,814</strong>',pct:null}]}
};

function openDetail(key){
  const d=details[key];if(!d)return;
  document.getElementById('modalTitle').textContent=d.title;
  document.getElementById('breakdownTable').innerHTML=d.rows.map(r=>`<tr><td class="breakdown-label">${r.l}</td><td>${r.v}</td></tr>`).join('');
  document.getElementById('breakdownChart').innerHTML=d.rows.filter(r=>r.pct!==null).map(r=>`<div class="bc-row"><div class="bc-label">${r.l.replace(/<[^>]+>/g,'')}</div><div class="bc-track"><div class="bc-fill" data-w="${r.pct}%" style="width:0%;background:${r.c}">${r.pct}%</div></div></div>`).join('');
  document.getElementById('detailModal').classList.add('show');
  setTimeout(()=>document.querySelectorAll('.bc-fill').forEach(el=>el.style.width=el.dataset.w),50);
}
function closeDetail(){document.getElementById('detailModal').classList.remove('show')}
document.getElementById('detailModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeDetail()});

function switchPeriod(tab){document.querySelectorAll('.period-tab').forEach(t=>t.classList.remove('active'));tab.classList.add('active')}
function toggleView(btn,view){document.querySelectorAll('.panel-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}

let sortDir=1;
function sortTable(colIdx){
  const tbody=document.getElementById('tableBody');
  const rows=[...tbody.querySelectorAll('tr')];
  const sorted=rows.sort((a,b)=>{
    const av=a.cells[colIdx]?.textContent.replace(/[^0-9.-]/g,'')||'';
    const bv=b.cells[colIdx]?.textContent.replace(/[^0-9.-]/g,'')||'';
    return(parseFloat(av)-parseFloat(bv))*sortDir||av.localeCompare(bv)*sortDir;
  });
  sortDir*=-1;sorted.forEach(r=>tbody.appendChild(r));
  document.querySelectorAll('.data-table th').forEach((th,i)=>{th.classList.toggle('sorted',i===colIdx)});
}
</script>
</body>
</html>
```
