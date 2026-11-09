# SKILL 11: Mapa Mental Interactivo con Nodos Expandibles

## 1. Propósito y Filosofía
Genera mapas mentales interactivos para visualizar conceptos, estrategias y estructuras de conocimiento. Nodos expandibles con animaciones y ventanas de detalle al hacer click.

- **Enfoque:** Pensamiento visual, organización conceptual, presentación de ideas complejas.
- **UX:** Nodos clicables + expansión/colapso + ventana flotante de detalle + zoom.
- **Estética:** Dark minimal — fondo oscuro + líneas de conexión animadas + colores por rama.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mapa Mental Interactivo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0D1117;color:#E6EDF3;overflow:hidden;height:100vh;display:flex;flex-direction:column}

.mm-toolbar{background:#161B22;border-bottom:1px solid #30363D;padding:12px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-shrink:0}
.mm-title{font-size:16px;font-weight:700;color:#58A6FF}
.mm-controls{display:flex;gap:8px}
.mm-btn{background:#21262D;border:1px solid #30363D;color:#E6EDF3;padding:7px 14px;border-radius:6px;font-size:13px;cursor:pointer;transition:all .2s;font-family:inherit}
.mm-btn:hover{background:#30363D;border-color:#58A6FF}
.zoom-info{font-size:12px;color:#8B949E;min-width:50px;text-align:center}

.mm-canvas{flex:1;position:relative;overflow:hidden;cursor:grab}
.mm-canvas.panning{cursor:grabbing}
.mm-world{position:absolute;transform-origin:center center;transition:transform .1s}

/* NODES */
.node{position:absolute;cursor:pointer;user-select:none;transition:transform .2s}
.node-bubble{border-radius:12px;padding:12px 18px;text-align:center;position:relative;transition:all .3s;font-weight:600}
.node-bubble:hover{transform:scale(1.08);box-shadow:0 0 20px rgba(255,255,255,.2)}
.node.root .node-bubble{font-size:16px;padding:18px 28px;border-radius:16px;font-weight:800}
.node.level1 .node-bubble{font-size:14px}
.node.level2 .node-bubble{font-size:13px;padding:9px 14px;border-radius:8px}
.node.collapsed .children-wrap{display:none}
.node-icon{font-size:20px;margin-bottom:4px;display:block}
.node.level2 .node-icon{font-size:14px;margin-bottom:2px}
.node-toggle{position:absolute;right:-8px;top:50%;transform:translateY(-50%);width:16px;height:16px;border-radius:50%;background:rgba(255,255,255,.2);border:none;color:#fff;font-size:9px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .3s}
.node.collapsed .node-toggle{transform:translateY(-50%) rotate(0deg)}
.node:not(.collapsed) .node-toggle{transform:translateY(-50%) rotate(90deg)}

/* SVG LINES */
.mm-svg{position:absolute;inset:0;pointer-events:none;overflow:visible}
.mm-line{stroke-width:2;fill:none;stroke-dasharray:400;stroke-dashoffset:400;animation:drawLine 1s forwards}
@keyframes drawLine{to{stroke-dashoffset:0}}

/* DETAIL PANEL */
.detail-panel{position:fixed;right:0;top:0;bottom:0;width:320px;background:#161B22;border-left:1px solid #30363D;padding:24px;transform:translateX(100%);transition:transform .3s ease;z-index:100;overflow-y:auto}
.detail-panel.open{transform:translateX(0)}
.detail-close{position:absolute;top:16px;right:16px;background:#21262D;border:1px solid #30363D;color:#E6EDF3;width:28px;height:28px;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center}
.detail-icon{font-size:48px;margin-bottom:16px;display:block;text-align:center}
.detail-title{font-size:20px;font-weight:800;margin-bottom:8px;color:#58A6FF}
.detail-desc{font-size:14px;line-height:1.7;color:#8B949E;margin-bottom:20px}
.detail-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:20px}
.detail-tag{background:#21262D;border:1px solid #30363D;color:#8B949E;font-size:11px;padding:3px 8px;border-radius:4px}
.detail-section-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#58A6FF;margin-bottom:10px}
.detail-list{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}
.detail-list-item{display:flex;align-items:center;gap:8px;font-size:13px;color:#E6EDF3;padding:8px;background:#21262D;border-radius:6px;border:1px solid #30363D}

/* LEGEND */
.legend{position:absolute;bottom:20px;left:20px;background:rgba(22,27,34,.9);border:1px solid #30363D;border-radius:10px;padding:12px 16px;backdrop-filter:blur(10px)}
.legend-title{font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#8B949E;margin-bottom:8px}
.legend-items{display:flex;flex-direction:column;gap:6px}
.legend-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#E6EDF3}
.legend-color{width:14px;height:14px;border-radius:4px;flex-shrink:0}
</style>
</head>
<body>

<div class="mm-toolbar">
  <div class="mm-title">🧠 Mapa Mental — Transformación Digital</div>
  <div class="mm-controls">
    <button class="mm-btn" onclick="zoomIn()">+ Acercar</button>
    <span class="zoom-info" id="zoomInfo">100%</span>
    <button class="mm-btn" onclick="zoomOut()">− Alejar</button>
    <button class="mm-btn" onclick="resetView()">🔄 Centrar</button>
    <button class="mm-btn" onclick="expandAll()">↕ Expandir todo</button>
  </div>
</div>

<div class="mm-canvas" id="canvas">
  <svg class="mm-svg" id="svgLines"></svg>

  <div class="mm-world" id="world">
    <!-- ROOT -->
    <div class="node root" id="n-root" style="left:450px;top:350px" onclick="showDetail('root',event)">
      <div class="node-bubble" style="background:linear-gradient(135deg,#58A6FF,#1F6FEB);color:#fff;box-shadow:0 0 30px rgba(88,166,255,.3);min-width:160px">
        <span class="node-icon">🚀</span>Transformación<br>Digital
      </div>
    </div>

    <!-- BRANCH 1: Estrategia -->
    <div class="node level1" id="n-1" style="left:120px;top:150px" onclick="showDetail('strategy',event)">
      <div class="node-bubble" style="background:linear-gradient(135deg,#A855F7,#7C3AED);color:#fff;min-width:130px">
        <span class="node-icon">🗺️</span>Estrategia
      </div>
      <button class="node-toggle" onclick="toggleNode(event,'n-1')">▶</button>
    </div>
    <div class="node level2 collapsed" id="n-1-1" style="left:0px;top:60px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #A855F7;color:#A855F7"><span class="node-icon">🎯</span>OKRs</div>
    </div>
    <div class="node level2 collapsed" id="n-1-2" style="left:0px;top:120px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #A855F7;color:#A855F7"><span class="node-icon">📊</span>KPIs</div>
    </div>
    <div class="node level2 collapsed" id="n-1-3" style="left:0px;top:180px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #A855F7;color:#A855F7"><span class="node-icon">🏆</span>Roadmap</div>
    </div>

    <!-- BRANCH 2: Tecnología -->
    <div class="node level1" id="n-2" style="left:120px;top:420px" onclick="showDetail('tech',event)">
      <div class="node-bubble" style="background:linear-gradient(135deg,#06B6D4,#0891B2);color:#fff;min-width:130px">
        <span class="node-icon">💻</span>Tecnología
      </div>
      <button class="node-toggle" onclick="toggleNode(event,'n-2')">▶</button>
    </div>
    <div class="node level2 collapsed" id="n-2-1" style="left:0px;top:370px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #06B6D4;color:#06B6D4"><span class="node-icon">☁️</span>Cloud</div>
    </div>
    <div class="node level2 collapsed" id="n-2-2" style="left:0px;top:430px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #06B6D4;color:#06B6D4"><span class="node-icon">🤖</span>IA / ML</div>
    </div>
    <div class="node level2 collapsed" id="n-2-3" style="left:0px;top:490px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #06B6D4;color:#06B6D4"><span class="node-icon">🔗</span>APIs</div>
    </div>

    <!-- BRANCH 3: Personas -->
    <div class="node level1" id="n-3" style="left:800px;top:150px" onclick="showDetail('people',event)">
      <div class="node-bubble" style="background:linear-gradient(135deg,#22C55E,#16A34A);color:#fff;min-width:130px">
        <span class="node-icon">👥</span>Personas
      </div>
      <button class="node-toggle" onclick="toggleNode(event,'n-3')">▶</button>
    </div>
    <div class="node level2 collapsed" id="n-3-1" style="left:900px;top:80px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #22C55E;color:#22C55E"><span class="node-icon">📚</span>Capacitación</div>
    </div>
    <div class="node level2 collapsed" id="n-3-2" style="left:900px;top:150px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #22C55E;color:#22C55E"><span class="node-icon">🌱</span>Cultura</div>
    </div>
    <div class="node level2 collapsed" id="n-3-3" style="left:900px;top:220px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #22C55E;color:#22C55E"><span class="node-icon">🎯</span>Talento</div>
    </div>

    <!-- BRANCH 4: Datos -->
    <div class="node level1" id="n-4" style="left:800px;top:420px" onclick="showDetail('data',event)">
      <div class="node-bubble" style="background:linear-gradient(135deg,#F97316,#EA580C);color:#fff;min-width:130px">
        <span class="node-icon">📊</span>Datos
      </div>
      <button class="node-toggle" onclick="toggleNode(event,'n-4')">▶</button>
    </div>
    <div class="node level2 collapsed" id="n-4-1" style="left:900px;top:370px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #F97316;color:#F97316"><span class="node-icon">🏛️</span>Governance</div>
    </div>
    <div class="node level2 collapsed" id="n-4-2" style="left:900px;top:440px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #F97316;color:#F97316"><span class="node-icon">🔍</span>Analytics</div>
    </div>
    <div class="node level2 collapsed" id="n-4-3" style="left:900px;top:510px">
      <div class="node-bubble" style="background:#21262D;border:1px solid #F97316;color:#F97316"><span class="node-icon">🔐</span>Privacidad</div>
    </div>
  </div>
</div>

<!-- DETAIL PANEL -->
<div class="detail-panel" id="detailPanel">
  <button class="detail-close" onclick="closeDetail()">✕</button>
  <span class="detail-icon" id="detailIcon">🚀</span>
  <h2 class="detail-title" id="detailTitle">Título</h2>
  <p class="detail-desc" id="detailDesc">Descripción</p>
  <div class="detail-tags" id="detailTags"></div>
  <div class="detail-section-title">Componentes clave</div>
  <div class="detail-list" id="detailList"></div>
</div>

<div class="legend">
  <div class="legend-title">Ramas</div>
  <div class="legend-items">
    <div class="legend-item"><div class="legend-color" style="background:#A855F7"></div>Estrategia</div>
    <div class="legend-item"><div class="legend-color" style="background:#06B6D4"></div>Tecnología</div>
    <div class="legend-item"><div class="legend-color" style="background:#22C55E"></div>Personas</div>
    <div class="legend-item"><div class="legend-color" style="background:#F97316"></div>Datos</div>
  </div>
</div>

<script>
const details={
  root:{icon:'🚀',title:'Transformación Digital',desc:'La transformación digital es la integración de tecnología digital en todas las áreas de una empresa, cambiando fundamentalmente cómo opera y entrega valor a sus clientes. No es solo sobre tecnología — es sobre cultura, procesos y personas.',tags:['Estrategia','Tecnología','Personas','Datos'],list:['🎯 Visión centrada en el cliente','⚡ Agilidad y velocidad de cambio','🤖 Automatización inteligente','📊 Decisiones basadas en datos','🌱 Cultura de innovación continua']},
  strategy:{icon:'🗺️',title:'Estrategia Digital',desc:'La estrategia digital define el "por qué" y el "hacia dónde" de la transformación. Sin una estrategia clara, la tecnología se convierte en gasto sin retorno.',tags:['OKRs','Roadmap','Governance'],list:['🎯 OKRs: Objectives & Key Results','📋 Hoja de ruta por fases','💼 Governance y toma de decisiones','📊 KPIs de seguimiento mensual','🏆 Quick wins y victorias tempranas']},
  tech:{icon:'💻',title:'Pila Tecnológica',desc:'La tecnología es el habilitador de la transformación. Cloud, IA y conectividad API son los tres pilares que permiten escalar y evolucionar continuamente.',tags:['Cloud','IA','APIs','DevOps'],list:['☁️ Cloud-first: AWS / Azure / GCP','🤖 Machine Learning operacional','🔗 API-economy y microservicios','⚡ DevSecOps y CI/CD','📱 Arquitectura headless y mobile']},
  people:{icon:'👥',title:'Capital Humano Digital',desc:'Las personas son el factor de éxito o fracaso más determinante en cualquier transformación. La tecnología sin adopción cultural es dinero desperdiciado.',tags:['Upskilling','Cultura','Liderazgo'],list:['📚 Programas de upskilling digital','🌱 Cultura de experimentación','🎯 Digital Champions internos','🤝 Gestión del cambio efectiva','🏆 Atracción de talento digital']},
  data:{icon:'📊',title:'Estrategia de Datos',desc:'Los datos son el nuevo activo estratégico de las organizaciones. Una estrategia de datos madura permite tomar mejores decisiones más rápido que la competencia.',tags:['Data Lake','BI','Privacidad','ML'],list:['🏛️ Data governance y calidad','🔍 Analytics descriptivo y predictivo','🤖 IA aplicada a datos internos','🔐 Privacidad y cumplimiento GDPR','📊 Self-service BI para líderes']}
};

function showDetail(key,e){
  e.stopPropagation();
  const d=details[key];if(!d)return;
  document.getElementById('detailIcon').textContent=d.icon;
  document.getElementById('detailTitle').textContent=d.title;
  document.getElementById('detailDesc').textContent=d.desc;
  document.getElementById('detailTags').innerHTML=d.tags.map(t=>`<span class="detail-tag">${t}</span>`).join('');
  document.getElementById('detailList').innerHTML=d.list.map(i=>`<div class="detail-list-item">${i}</div>`).join('');
  document.getElementById('detailPanel').classList.add('open');
}
function closeDetail(){document.getElementById('detailPanel').classList.remove('open')}

function toggleNode(e,id){
  e.stopPropagation();
  const node=document.getElementById(id);
  const siblings=document.querySelectorAll(`[id^="${id}-"]`);
  const isCollapsed=node.classList.contains('collapsed');
  siblings.forEach(s=>{
    s.style.transition='opacity .3s,transform .3s';
    if(isCollapsed){s.style.display='block';setTimeout(()=>{s.style.opacity='1';s.style.transform='scale(1)'},10)}
    else{s.style.opacity='0';s.style.transform='scale(0.8)';setTimeout(()=>{s.style.display='none'},300)}
  });
  node.classList.toggle('collapsed');
  drawLines();
}

// Pan
let pan={x:0,y:0};let startPan={x:0,y:0};let isPanning=false;let scale=1;
const world=document.getElementById('world');const canvas=document.getElementById('canvas');

canvas.addEventListener('mousedown',e=>{isPanning=true;startPan={x:e.clientX-pan.x,y:e.clientY-pan.y};canvas.classList.add('panning')});
document.addEventListener('mousemove',e=>{if(isPanning){pan.x=e.clientX-startPan.x;pan.y=e.clientY-startPan.y;updateTransform()}});
document.addEventListener('mouseup',()=>{isPanning=false;canvas.classList.remove('panning')});
canvas.addEventListener('wheel',e=>{e.preventDefault();scale=Math.max(.3,Math.min(2,scale+(e.deltaY>0?-.1:.1)));updateTransform();document.getElementById('zoomInfo').textContent=Math.round(scale*100)+'%'});

function updateTransform(){world.style.transform=`translate(${pan.x}px,${pan.y}px) scale(${scale})`}
function zoomIn(){scale=Math.min(2,scale+.1);updateTransform();document.getElementById('zoomInfo').textContent=Math.round(scale*100)+'%'}
function zoomOut(){scale=Math.max(.3,scale-.1);updateTransform();document.getElementById('zoomInfo').textContent=Math.round(scale*100)+'%'}
function resetView(){pan={x:0,y:0};scale=1;updateTransform();document.getElementById('zoomInfo').textContent='100%'}
function expandAll(){document.querySelectorAll('.node.collapsed').forEach(n=>n.classList.remove('collapsed'));document.querySelectorAll('.node.level2').forEach(n=>{n.style.display='block';n.style.opacity='1'})}

function drawLines(){
  const svg=document.getElementById('svgLines');svg.innerHTML='';
  const connections=[
    {from:'n-root',to:'n-1',color:'#A855F7'},{from:'n-root',to:'n-2',color:'#06B6D4'},
    {from:'n-root',to:'n-3',color:'#22C55E'},{from:'n-root',to:'n-4',color:'#F97316'},
    {from:'n-1',to:'n-1-1',color:'rgba(168,85,247,.5)'},{from:'n-1',to:'n-1-2',color:'rgba(168,85,247,.5)'},{from:'n-1',to:'n-1-3',color:'rgba(168,85,247,.5)'},
    {from:'n-2',to:'n-2-1',color:'rgba(6,182,212,.5)'},{from:'n-2',to:'n-2-2',color:'rgba(6,182,212,.5)'},{from:'n-2',to:'n-2-3',color:'rgba(6,182,212,.5)'},
    {from:'n-3',to:'n-3-1',color:'rgba(34,197,94,.5)'},{from:'n-3',to:'n-3-2',color:'rgba(34,197,94,.5)'},{from:'n-3',to:'n-3-3',color:'rgba(34,197,94,.5)'},
    {from:'n-4',to:'n-4-1',color:'rgba(249,115,22,.5)'},{from:'n-4',to:'n-4-2',color:'rgba(249,115,22,.5)'},{from:'n-4',to:'n-4-3',color:'rgba(249,115,22,.5)'}
  ];
  connections.forEach(c=>{
    const from=document.getElementById(c.from);const to=document.getElementById(c.to);
    if(!from||!to||to.style.display==='none')return;
    const fr=from.getBoundingClientRect();const tr=to.getBoundingClientRect();
    const cr=canvas.getBoundingClientRect();
    const x1=fr.left+fr.width/2-cr.left;const y1=fr.top+fr.height/2-cr.top;
    const x2=tr.left+tr.width/2-cr.left;const y2=tr.top+tr.height/2-cr.top;
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    const mx=(x1+x2)/2;
    path.setAttribute('d',`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`);
    path.setAttribute('stroke',c.color);path.setAttribute('stroke-width','2');path.setAttribute('fill','none');
    svg.appendChild(path);
  });
}

setTimeout(drawLines,100);
window.addEventListener('resize',drawLines);
</script>
</body>
</html>
```
