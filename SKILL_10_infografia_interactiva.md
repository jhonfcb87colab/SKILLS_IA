# SKILL 10: Infografía Interactiva con Tooltips y Animaciones de Datos

## 1. Propósito y Filosofía
Genera infografías interactivas para visualizar procesos, estadísticas y datos complejos de manera atractiva. Tooltips al hover, animaciones de entrada de datos y mini gráficos SVG integrados.

- **Enfoque:** Comunicación visual de datos, storytelling informativo, divulgación impactante.
- **UX:** Iconos interactivos + tooltips contextuales + barras animadas + scroll reveal.
- **Estética:** Infografía moderna — fondo oscuro + colores vivos + tipografía display grande.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Infografía Interactiva</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0F172A;--card:#1E293B;--border:rgba(255,255,255,.08);--text:#F1F5F9;--muted:#94A3B8;--cyan:#06B6D4;--green:#22C55E;--yellow:#EAB308;--red:#EF4444;--purple:#A855F7;--orange:#F97316}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}

/* HEADER */
.info-header{background:linear-gradient(135deg,#0F172A,#1E293B);text-align:center;padding:60px 20px 48px;border-bottom:1px solid var(--border);position:relative;overflow:hidden}
.info-header::before{content:'';position:absolute;top:-40%;left:-10%;width:120%;height:150%;background:radial-gradient(ellipse at 50% 0%,rgba(6,182,212,.12),transparent 60%)}
.info-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:3px;color:var(--cyan);margin-bottom:16px}
.info-title{font-size:clamp(32px,5vw,64px);font-weight:900;line-height:1.1;margin-bottom:12px;background:linear-gradient(135deg,var(--text),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.info-desc{color:var(--muted);font-size:16px;max-width:600px;margin:0 auto 24px;line-height:1.6}
.info-source{font-size:12px;color:rgba(255,255,255,.3)}

/* MEGA STATS */
.mega-stats{display:flex;justify-content:center;gap:0;flex-wrap:wrap;padding:48px 20px;border-bottom:1px solid var(--border)}
.mega-stat{text-align:center;flex:1;min-width:160px;max-width:220px;padding:24px;position:relative}
.mega-stat+.mega-stat::before{content:'';position:absolute;left:0;top:20%;height:60%;width:1px;background:var(--border)}
.mega-num{font-size:clamp(36px,5vw,64px);font-weight:900;line-height:1;margin-bottom:6px;display:block}
.mega-unit{font-size:.4em;vertical-align:super;font-weight:600}
.mega-label{font-size:13px;color:var(--muted);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px}
.mega-change{font-size:12px;font-weight:600}
.change-up{color:var(--green)}.change-down{color:var(--red)}

/* PROCESS FLOW */
.section{padding:48px 20px;max-width:1100px;margin:0 auto}
.section-label{font-size:11px;text-transform:uppercase;letter-spacing:3px;color:var(--cyan);margin-bottom:12px}
.section-title{font-size:clamp(22px,3vw,36px);font-weight:800;margin-bottom:32px}

.process-flow{display:flex;align-items:flex-start;gap:0;overflow-x:auto;padding-bottom:16px}
.process-step{flex:1;min-width:160px;position:relative;text-align:center;padding:0 12px}
.process-step+.process-step::before{content:'→';position:absolute;left:-12px;top:28px;font-size:20px;color:var(--cyan)}
.step-bubble{width:60px;height:60px;border-radius:50%;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:24px;position:relative;cursor:pointer;transition:transform .2s}
.step-bubble:hover{transform:scale(1.15)}
.step-bubble::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:2px solid transparent;transition:border-color .2s}
.step-bubble:hover::after{border-color:rgba(255,255,255,.3)}
.step-name{font-size:13px;font-weight:600;margin-bottom:4px}
.step-desc-short{font-size:11px;color:var(--muted);line-height:1.4}

/* BAR CHART */
.bar-chart{display:flex;flex-direction:column;gap:14px}
.chart-row{display:flex;align-items:center;gap:14px;cursor:pointer}
.chart-row:hover .bar-fill{filter:brightness(1.2)}
.chart-label{width:140px;text-align:right;font-size:14px;color:var(--text);flex-shrink:0}
.bar-track{flex:1;height:28px;background:rgba(255,255,255,.05);border-radius:6px;overflow:hidden;position:relative}
.bar-fill{height:100%;border-radius:6px;display:flex;align-items:center;padding-left:12px;font-size:13px;font-weight:700;color:#000;width:0;transition:width 1.2s cubic-bezier(.4,0,.2,1);position:relative}
.bar-fill::after{content:attr(data-val);position:absolute;right:-36px;color:var(--text);font-size:13px;font-weight:700}

/* DONUT CHART */
.donut-section{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
@media(max-width:600px){.donut-section{grid-template-columns:1fr}}
.donut-wrap{position:relative;width:200px;height:200px;margin:0 auto}
.donut-svg{transform:rotate(-90deg)}
.donut-circle{fill:none;stroke-width:28;stroke-dasharray:0 440;transition:stroke-dasharray 1.5s ease}
.donut-label{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
.donut-pct{font-size:28px;font-weight:900}
.donut-sub{font-size:12px;color:var(--muted)}
.legend-list{display:flex;flex-direction:column;gap:12px}
.legend-item{display:flex;align-items:center;gap:10px;cursor:pointer;transition:opacity .2s}
.legend-item:hover{opacity:.8}
.legend-dot{width:14px;height:14px;border-radius:50%;flex-shrink:0}
.legend-text{font-size:14px;flex:1}
.legend-pct{font-size:14px;font-weight:700}

/* TIMELINE */
.timeline-h{display:flex;gap:20px;overflow-x:auto;padding:8px 0 20px}
.tl-node{flex:1;min-width:200px;position:relative}
.tl-node+.tl-node::before{content:'';position:absolute;top:18px;left:-10px;width:20px;height:2px;background:linear-gradient(90deg,rgba(255,255,255,.1),rgba(6,182,212,.5))}
.node-top{display:flex;align-items:center;gap:10px;margin-bottom:12px}
.node-dot{width:12px;height:12px;border-radius:50%;border:2px solid var(--cyan);flex-shrink:0}
.node-year{font-size:13px;font-weight:700;color:var(--cyan)}
.node-card{background:var(--card);border:1px solid var(--border);border-radius:10px;padding:14px;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.node-card:hover{border-color:rgba(6,182,212,.4);transform:translateY(-4px)}
.node-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--cyan),var(--purple))}
.node-title{font-size:14px;font-weight:700;margin-bottom:4px}
.node-desc{font-size:12px;color:var(--muted);line-height:1.5}

/* TOOLTIP */
.tooltip{position:fixed;background:#1E293B;border:1px solid rgba(6,182,212,.3);border-radius:10px;padding:12px 16px;max-width:240px;font-size:13px;line-height:1.5;pointer-events:none;z-index:999;opacity:0;transform:translateY(8px);transition:all .2s;box-shadow:0 10px 30px rgba(0,0,0,.5)}
.tooltip.show{opacity:1;transform:translateY(0)}
.tooltip-title{font-weight:700;color:var(--cyan);margin-bottom:4px}
.tooltip-body{color:var(--muted)}

/* COMPARE GRID */
.compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.compare-grid{grid-template-columns:1fr}}
.compare-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:20px}
.compare-card.highlight{border-color:rgba(34,197,94,.3);background:rgba(34,197,94,.05)}
.compare-title{font-size:14px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px}
.compare-item{display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:13px}
.compare-item:last-child{border:none}
.ci-icon{width:20px;text-align:center;font-size:14px}
</style>
</head>
<body>

<div class="info-header">
  <div class="info-eyebrow">📊 Infografía Anual 2026</div>
  <h1 class="info-title">El Estado de la<br>Economía Digital</h1>
  <p class="info-desc">Un análisis visual del impacto de la transformación digital en Latinoamérica: datos, tendencias y proyecciones para 2027.</p>
  <div class="info-source">Fuente: IDC LatAm Report · World Bank Digital Economy · OECD 2026</div>
</div>

<div class="mega-stats">
  <div class="mega-stat"><span class="mega-num" style="color:var(--cyan)" data-count="400">0</span><span class="mega-label">Inversión en TI LatAm</span><span class="mega-unit" style="font-size:14px;display:block;color:var(--cyan)">Mil Millones USD</span><span class="mega-change change-up">▲ +18% vs 2025</span></div>
  <div class="mega-stat"><span class="mega-num" style="color:var(--green)" data-count="67">0</span><span class="mega-label">Empresas con IA</span><span class="mega-unit" style="font-size:14px;display:block;color:var(--green)">% del sector corporativo</span><span class="mega-change change-up">▲ +24pts</span></div>
  <div class="mega-stat"><span class="mega-num" style="color:var(--yellow)" data-count="2.3">0</span><span class="mega-label">Empleos digitales nuevos</span><span class="mega-unit" style="font-size:14px;display:block;color:var(--yellow)">Millones en la región</span><span class="mega-change change-up">▲ +310K</span></div>
  <div class="mega-stat"><span class="mega-num" style="color:var(--red)" data-count="4.8">0</span><span class="mega-label">Brecha Digital</span><span class="mega-unit" style="font-size:14px;display:block;color:var(--red)">Años de rezago vs. G7</span><span class="mega-change change-up">▼ -1.2 años</span></div>
</div>

<div class="section">
  <div class="section-label">Proceso</div>
  <h2 class="section-title">¿Cómo se Transforma una Empresa Digitalmente?</h2>
  <div class="process-flow">
    <div class="process-step"><div class="step-bubble" style="background:linear-gradient(135deg,#06B6D4,#0891B2)" onmouseenter="showTip(event,'Diagnóstico Digital','Auditoría completa de madurez tecnológica. Se evalúan 48 dimensiones organizacionales para identificar brechas y oportunidades.')" onmouseleave="hideTip()">🔍</div><div class="step-name">Diagnóstico</div><div class="step-desc-short">Auditoría de madurez digital y brechas</div></div>
    <div class="process-step"><div class="step-bubble" style="background:linear-gradient(135deg,#A855F7,#7C3AED)" onmouseenter="showTip(event,'Estrategia y Hoja de Ruta','Diseño del plan de transformación con objetivos SMART, hitos trimestrales y KPIs de seguimiento.')" onmouseleave="hideTip()">🗺️</div><div class="step-name">Estrategia</div><div class="step-desc-short">Hoja de ruta con OKRs y KPIs</div></div>
    <div class="process-step"><div class="step-bubble" style="background:linear-gradient(135deg,#F97316,#EA580C)" onmouseenter="showTip(event,'Implementación Core','Despliegue de nuevas plataformas y herramientas. Incluye gestión del cambio, capacitación y comunicación interna.')" onmouseleave="hideTip()">⚙️</div><div class="step-name">Implementación</div><div class="step-desc-short">Deploy de tecnología y cambio cultural</div></div>
    <div class="process-step"><div class="step-bubble" style="background:linear-gradient(135deg,#EAB308,#CA8A04)" onmouseenter="showTip(event,'Medición y Ajuste','Monitoreo continuo con dashboards en tiempo real. Ciclos de mejora iterativa basados en datos.')" onmouseleave="hideTip()">📈</div><div class="step-name">Medición</div><div class="step-desc-short">KPIs y mejora continua iterativa</div></div>
    <div class="process-step"><div class="step-bubble" style="background:linear-gradient(135deg,#22C55E,#16A34A)" onmouseenter="showTip(event,'Escala y Liderazgo','Expansión de capacidades digitales a toda la organización. La empresa lidera en su sector.')" onmouseleave="hideTip()">🏆</div><div class="step-name">Liderazgo</div><div class="step-desc-short">Empresa líder digital en su sector</div></div>
  </div>
</div>

<div class="section" style="border-top:1px solid var(--border)">
  <div class="section-label">Adopción por Sector</div>
  <h2 class="section-title">¿Quién Lidera la Transformación Digital?</h2>
  <div class="bar-chart" id="barChart">
    <div class="chart-row" onclick="showTip(event,'Finanzas y Banca','El sector financiero lidera la adopción digital gracias a regulación, competencia fintech y alta presión de clientes digitales.')"><div class="chart-label">Finanzas</div><div class="bar-track"><div class="bar-fill" data-width="92%" data-val="92%" style="background:linear-gradient(90deg,#06B6D4,#0891B2)"></div></div></div>
    <div class="chart-row" onclick="showTip(event,'Telecomunicaciones','Inversión masiva en 5G, IoT y fibra óptica impulsó la digitalización de operaciones y atención al cliente.')"><div class="chart-label">Telecomunicaciones</div><div class="bar-track"><div class="bar-fill" data-width="88%" data-val="88%" style="background:linear-gradient(90deg,#A855F7,#7C3AED)"></div></div></div>
    <div class="chart-row" onclick="showTip(event,'Retail','E-commerce acelerado por pandemia transformó permanentemente el modelo de distribución.')"><div class="chart-label">Retail</div><div class="bar-track"><div class="bar-fill" data-width="74%" data-val="74%" style="background:linear-gradient(90deg,#F97316,#EA580C)"></div></div></div>
    <div class="chart-row" onclick="showTip(event,'Manufactura','Industry 4.0: Sensores IoT, gemelos digitales y robótica redefiniendo la producción industrial.')"><div class="chart-label">Manufactura</div><div class="bar-track"><div class="bar-fill" data-width="61%" data-val="61%" style="background:linear-gradient(90deg,#EAB308,#CA8A04)"></div></div></div>
    <div class="chart-row" onclick="showTip(event,'Educación','Plataformas de aprendizaje y aulas virtuales permanentes tras la aceleración pandémica.')"><div class="chart-label">Educación</div><div class="bar-track"><div class="bar-fill" data-width="49%" data-val="49%" style="background:linear-gradient(90deg,#22C55E,#16A34A)"></div></div></div>
    <div class="chart-row" onclick="showTip(event,'Agricultura','AgTech emergente: drones, sensores de suelo y IA para optimización de cultivos.')"><div class="chart-label">Agricultura</div><div class="bar-track"><div class="bar-fill" data-width="28%" data-val="28%" style="background:linear-gradient(90deg,#EF4444,#DC2626)"></div></div></div>
  </div>
</div>

<div class="section" style="border-top:1px solid var(--border)">
  <div class="section-label">Distribución</div>
  <h2 class="section-title">¿En Qué Invierten las Empresas?</h2>
  <div class="donut-section">
    <div class="donut-wrap" id="donutWrap">
      <svg class="donut-svg" viewBox="0 0 140 140" width="200" height="200">
        <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,.05)" stroke-width="28"/>
        <circle id="d1" cx="70" cy="70" r="56" class="donut-circle" stroke="#06B6D4"/>
        <circle id="d2" cx="70" cy="70" r="56" class="donut-circle" stroke="#A855F7"/>
        <circle id="d3" cx="70" cy="70" r="56" class="donut-circle" stroke="#F97316"/>
        <circle id="d4" cx="70" cy="70" r="56" class="donut-circle" stroke="#EAB308"/>
        <circle id="d5" cx="70" cy="70" r="56" class="donut-circle" stroke="#EF4444"/>
      </svg>
      <div class="donut-label"><div class="donut-pct" style="color:var(--cyan)">$400B</div><div class="donut-sub">Inversión Total</div></div>
    </div>
    <div class="legend-list">
      <div class="legend-item"><div class="legend-dot" style="background:#06B6D4"></div><div class="legend-text">Cloud & Infraestructura</div><div class="legend-pct" style="color:#06B6D4">34%</div></div>
      <div class="legend-item"><div class="legend-dot" style="background:#A855F7"></div><div class="legend-text">IA & Machine Learning</div><div class="legend-pct" style="color:#A855F7">28%</div></div>
      <div class="legend-item"><div class="legend-dot" style="background:#F97316"></div><div class="legend-text">Ciberseguridad</div><div class="legend-pct" style="color:#F97316">18%</div></div>
      <div class="legend-item"><div class="legend-dot" style="background:#EAB308"></div><div class="legend-text">Apps & Software</div><div class="legend-pct" style="color:#EAB308">12%</div></div>
      <div class="legend-item"><div class="legend-dot" style="background:#EF4444"></div><div class="legend-text">Capacitación Digital</div><div class="legend-pct" style="color:#EF4444">8%</div></div>
    </div>
  </div>
</div>

<div class="section" style="border-top:1px solid var(--border)">
  <div class="section-label">Evolución Histórica</div>
  <h2 class="section-title">Hitos de la Era Digital en LatAm</h2>
  <div class="timeline-h">
    <div class="tl-node"><div class="node-top"><div class="node-dot"></div><div class="node-year">2020</div></div><div class="node-card"><div class="node-title">Pandemia: Aceleración Forzada</div><div class="node-desc">COVID-19 comprimió 5 años de transformación en 18 meses.</div></div></div>
    <div class="tl-node"><div class="node-top"><div class="node-dot"></div><div class="node-year">2022</div></div><div class="node-card"><div class="node-title">Boom del E-Commerce</div><div class="node-desc">$168B USD en ventas digitales. LatAm: mercado de mayor crecimiento.</div></div></div>
    <div class="tl-node"><div class="node-top"><div class="node-dot"></div><div class="node-year">2023</div></div><div class="node-card"><div class="node-title">ChatGPT y IA Generativa</div><div class="node-desc">Adopción masiva de IA en empresas medianas y grandes de la región.</div></div></div>
    <div class="tl-node"><div class="node-top"><div class="node-dot"></div><div class="node-year">2024–25</div></div><div class="node-card"><div class="node-title">Cloud Nativo + 5G</div><div class="node-desc">Infraestructura cloud-first y conectividad 5G transforman sectores clave.</div></div></div>
    <div class="tl-node"><div class="node-top"><div class="node-dot" style="border-color:var(--yellow)"></div><div class="node-year" style="color:var(--yellow)">2026 →</div></div><div class="node-card" style="border-color:rgba(234,179,8,.3)"><div class="node-title">IA Autónoma + Quantum</div><div class="node-desc">Agentes autónomos de IA y primeras aplicaciones cuánticas empresariales.</div></div></div>
  </div>
</div>

<!-- TOOLTIP -->
<div class="tooltip" id="tooltip"><div class="tooltip-title" id="tipTitle"></div><div class="tooltip-body" id="tipBody"></div></div>

<script>
// Counter animation
function animateCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=parseFloat(el.dataset.count);
    const isDecimal=target%1!==0;
    let current=0;const step=target/60;
    const timer=setInterval(()=>{
      current+=step;if(current>=target){current=target;clearInterval(timer)}
      el.textContent=isDecimal?current.toFixed(1):Math.floor(current);
    },16);
  });
}

// Bar chart animation
function animateBars(){
  document.querySelectorAll('.bar-fill').forEach((bar,i)=>{
    setTimeout(()=>{bar.style.width=bar.dataset.width},i*150);
  });
}

// Donut chart animation
function animateDonut(){
  const circumference=2*Math.PI*56;
  const data=[{id:'d1',pct:.34,offset:0},{id:'d2',pct:.28,offset:.34},{id:'d3',pct:.18,offset:.62},{id:'d4',pct:.12,offset:.8},{id:'d5',pct:.08,offset:.92}];
  setTimeout(()=>{
    data.forEach(d=>{
      const el=document.getElementById(d.id);
      el.style.strokeDasharray=`${d.pct*circumference} ${circumference}`;
      el.style.strokeDashoffset=-d.offset*circumference;
    });
  },300);
}

// Scroll observer
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      if(e.target.id==='barChart')animateBars();
      if(e.target.id==='donutWrap')animateDonut();
    }
  });
},{threshold:.3});
document.querySelectorAll('#barChart,#donutWrap').forEach(el=>observer.observe(el));

animateCounters();

// Tooltips
let tipEl=document.getElementById('tooltip');
function showTip(e,title,body){
  document.getElementById('tipTitle').textContent=title;
  document.getElementById('tipBody').textContent=body;
  const x=Math.min(e.clientX+12,window.innerWidth-260);
  const y=e.clientY-80;
  tipEl.style.left=x+'px';tipEl.style.top=y+'px';
  tipEl.classList.add('show');
}
function hideTip(){tipEl.classList.remove('show')}
document.addEventListener('mousemove',e=>{if(tipEl.classList.contains('show')){const x=Math.min(e.clientX+12,window.innerWidth-260);tipEl.style.left=x+'px';tipEl.style.top=(e.clientY-80)+'px'}});
</script>
</body>
</html>
```
