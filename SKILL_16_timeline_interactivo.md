# SKILL 16: Timeline Interactivo con Eventos y Popups de Historia

## 1. Propósito y Filosofía
Genera líneas de tiempo interactivas horizontales o verticales para historia corporativa, roadmaps, cronologías de proyectos y storytelling de marca. Cada evento tiene popup de detalle inmersivo.

- **Enfoque:** Narrativa temporal, historia de marca, evolución de proyectos.
- **UX:** Timeline scroll horizontal + nodos clicables + popup de evento con media + filtro por categoría.
- **Estética:** Historia editorial — oscuro elegante + dorado timeline + fotografías simuladas coloridas.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Timeline Interactivo</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0A0A0F;--card:#13131A;--border:rgba(255,255,255,.08);--gold:#D4A017;--text:#F1F1F1;--muted:#888;--accent:#4F7FFF}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;overflow-x:hidden}

/* HEADER */
.tl-header{background:linear-gradient(to bottom,#13131A,var(--bg));padding:60px 40px 48px;text-align:center;border-bottom:1px solid var(--border)}
.tl-eyebrow{font-size:11px;text-transform:uppercase;letter-spacing:4px;color:var(--gold);margin-bottom:14px}
.tl-title{font-size:clamp(28px,4vw,56px);font-weight:900;margin-bottom:12px;letter-spacing:-2px}
.tl-title em{font-style:normal;color:var(--gold)}
.tl-desc{color:var(--muted);font-size:15px;max-width:500px;margin:0 auto 28px;line-height:1.6}
.tl-filters{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.tl-filter{padding:7px 16px;border-radius:30px;border:1px solid var(--border);background:transparent;color:var(--muted);font-size:12px;cursor:pointer;transition:all .2s;font-family:inherit}
.tl-filter:hover,.tl-filter.active{background:var(--gold);border-color:var(--gold);color:#000;font-weight:700}

/* YEAR NAV */
.year-nav{background:rgba(255,255,255,.03);border-bottom:1px solid var(--border);padding:12px 40px;display:flex;gap:4px;overflow-x:auto}
.year-btn{padding:8px 16px;border-radius:6px;border:none;background:transparent;color:var(--muted);font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;font-family:inherit}
.year-btn:hover{color:var(--text)}
.year-btn.active{background:rgba(212,160,23,.15);color:var(--gold)}

/* TIMELINE HORIZONTAL */
.timeline-section{padding:60px 0;overflow:hidden}
.timeline-scroll{overflow-x:auto;padding:20px 60px 40px;cursor:grab}
.timeline-scroll.dragging{cursor:grabbing}
.timeline-scroll::-webkit-scrollbar{height:4px}
.timeline-scroll::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:2px}
.timeline-scroll::-webkit-scrollbar-thumb{background:var(--gold);border-radius:2px}
.timeline-track{display:flex;align-items:center;position:relative;min-width:max-content;padding:40px 0}
.timeline-line{position:absolute;top:50%;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),var(--gold),transparent);transform:translateY(-50%)}

/* EVENT NODE */
.event-node{position:relative;display:flex;flex-direction:column;align-items:center;width:200px;flex-shrink:0;cursor:pointer}
.event-node:nth-child(even) .event-card{order:-1;margin-bottom:16px;margin-top:0}
.event-node:nth-child(even) .event-year-label{order:1;margin-top:16px;margin-bottom:0}
.event-node:nth-child(odd) .event-card{margin-top:16px}
.event-node:nth-child(odd) .event-year-label{margin-bottom:16px}
.event-dot{width:16px;height:16px;border-radius:50%;border:3px solid var(--gold);background:var(--bg);flex-shrink:0;z-index:2;transition:all .3s;position:relative}
.event-node:hover .event-dot{background:var(--gold);transform:scale(1.4);box-shadow:0 0 16px rgba(212,160,23,.5)}
.event-pulse{position:absolute;width:16px;height:16px;border-radius:50%;background:rgba(212,160,23,.3);animation:eventPulse 2s infinite}
@keyframes eventPulse{0%{transform:scale(1);opacity:.8}100%{transform:scale(2.5);opacity:0}}
.event-year-label{font-size:13px;font-weight:800;color:var(--gold);text-align:center}
.event-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;width:170px;text-align:left;transition:all .3s;position:relative;overflow:hidden}
.event-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--gold);transform:scaleX(0);transition:transform .3s}
.event-node:hover .event-card{border-color:rgba(212,160,23,.4);box-shadow:0 8px 24px rgba(0,0,0,.4)}
.event-node:hover .event-card::before{transform:scaleX(1)}
.event-cat{font-size:9px;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;font-weight:700}
.cat-milestone{color:#22C55E}.cat-launch{color:var(--accent)}.cat-award{color:var(--gold)}.cat-expansion{color:#F97316}.cat-tech{color:#A855F7}
.event-title{font-size:13px;font-weight:700;margin-bottom:4px;line-height:1.3}
.event-preview{font-size:11px;color:var(--muted);line-height:1.4}
.event-view-more{font-size:11px;color:var(--gold);font-weight:600;margin-top:6px;display:inline-block}

/* VERTICAL TIMELINE (ALTERNATIVE) */
.timeline-vertical{max-width:800px;margin:0 auto;padding:40px 20px 60px;position:relative}
.timeline-vertical::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,transparent,var(--gold),var(--gold),transparent);transform:translateX(-50%)}
@media(max-width:600px){.timeline-vertical::before{left:20px}}
.tv-item{display:flex;gap:20px;margin-bottom:40px;position:relative}
.tv-item:nth-child(even){flex-direction:row-reverse}
@media(max-width:600px){.tv-item,.tv-item:nth-child(even){flex-direction:row;padding-left:40px}}
.tv-node{position:absolute;left:50%;transform:translateX(-50%);top:12px;width:14px;height:14px;border-radius:50%;border:2px solid var(--gold);background:var(--bg);z-index:1}
@media(max-width:600px){.tv-node{left:20px}}
.tv-content{flex:1;max-width:calc(50% - 30px)}
@media(max-width:600px){.tv-content{max-width:100%}}
.tv-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:18px;cursor:pointer;transition:all .3s}
.tv-card:hover{border-color:rgba(212,160,23,.4);transform:translateX(-4px)}
.tv-item:nth-child(even) .tv-card:hover{transform:translateX(4px)}
.tv-year{font-size:11px;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.tv-title{font-size:15px;font-weight:700;margin-bottom:6px}
.tv-desc{font-size:13px;color:var(--muted);line-height:1.5}
.tv-empty{flex:1;max-width:calc(50% - 30px)}
@media(max-width:600px){.tv-empty{display:none}}

/* EVENT MODAL */
.event-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.8);backdrop-filter:blur(8px);z-index:1000;display:none;align-items:center;justify-content:center;padding:20px}
.event-modal-overlay.show{display:flex}
.event-modal{background:#13131A;border:1px solid var(--border);border-radius:20px;width:min(640px,100%);overflow:hidden;animation:eventModalIn .3s ease}
@keyframes eventModalIn{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}
.event-modal-media{height:220px;display:flex;align-items:center;justify-content:center;font-size:80px;position:relative}
.event-modal-close{position:absolute;top:14px;right:14px;background:rgba(0,0,0,.5);border:1px solid var(--border);color:var(--text);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(10px)}
.event-modal-body{padding:28px}
.event-modal-year{font-size:11px;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:2px;margin-bottom:8px}
.event-modal-title{font-size:24px;font-weight:900;margin-bottom:12px}
.event-modal-desc{color:var(--muted);font-size:15px;line-height:1.7;margin-bottom:20px}
.event-modal-stats{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:20px}
.event-stat{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:12px 16px;text-align:center;min-width:80px}
.event-stat-num{font-size:20px;font-weight:800;color:var(--gold)}
.event-stat-label{font-size:11px;color:var(--muted)}
.event-tags-wrap{display:flex;gap:6px;flex-wrap:wrap}
.event-modal-tag{background:rgba(79,127,255,.1);border:1px solid rgba(79,127,255,.2);color:var(--accent);font-size:12px;padding:4px 10px;border-radius:4px}
</style>
</head>
<body>

<div class="tl-header">
  <div class="tl-eyebrow">Nuestra Historia</div>
  <h1 class="tl-title">Una Década de <em>Innovación</em></h1>
  <p class="tl-desc">Desde una startup de dos personas hasta liderar la transformación digital en Latinoamérica. Cada hito, cada milestone.</p>
  <div class="tl-filters">
    <button class="tl-filter active" onclick="filterTimeline('all',this)">🔍 Todos</button>
    <button class="tl-filter" onclick="filterTimeline('milestone',this)">🏆 Hitos</button>
    <button class="tl-filter" onclick="filterTimeline('launch',this)">🚀 Lanzamientos</button>
    <button class="tl-filter" onclick="filterTimeline('award',this)">🥇 Premios</button>
    <button class="tl-filter" onclick="filterTimeline('expansion',this)">🌍 Expansión</button>
    <button class="tl-filter" onclick="filterTimeline('tech',this)">💻 Tecnología</button>
  </div>
</div>

<div class="year-nav" id="yearNav">
  <button class="year-btn active" onclick="scrollToYear(2016,this)">2016</button>
  <button class="year-btn" onclick="scrollToYear(2017,this)">2017</button>
  <button class="year-btn" onclick="scrollToYear(2018,this)">2018</button>
  <button class="year-btn" onclick="scrollToYear(2019,this)">2019</button>
  <button class="year-btn" onclick="scrollToYear(2020,this)">2020</button>
  <button class="year-btn" onclick="scrollToYear(2021,this)">2021</button>
  <button class="year-btn" onclick="scrollToYear(2022,this)">2022</button>
  <button class="year-btn" onclick="scrollToYear(2023,this)">2023</button>
  <button class="year-btn" onclick="scrollToYear(2024,this)">2024</button>
  <button class="year-btn" onclick="scrollToYear(2025,this)">2025</button>
  <button class="year-btn" onclick="scrollToYear(2026,this)">2026</button>
</div>

<section class="timeline-section">
  <div class="timeline-scroll" id="timelineScroll">
    <div class="timeline-track" id="timelineTrack">
      <div class="timeline-line"></div>
    </div>
  </div>
</section>

<section style="border-top:1px solid var(--border);padding:40px 20px 20px;text-align:center">
  <div class="tl-eyebrow">Vista Alternativa</div>
  <h2 style="font-size:28px;font-weight:800;margin-bottom:32px">Timeline Vertical Reciente</h2>
  <div class="timeline-vertical">
    <div class="tv-item"><div class="tv-node" style="background:var(--gold)"></div><div class="tv-content"><div class="tv-card" onclick="openEventById('2026a')"><div class="tv-year">Nov 2026</div><div class="tv-title">IA Autónoma — LaunchOS 5.0</div><div class="tv-desc">Lanzamos la primera plataforma de IA autónoma para empresas latinoamericanas. 50K usuarios en 48 horas.</div></div></div><div class="tv-empty"></div></div>
    <div class="tv-item"><div class="tv-node"></div><div class="tv-empty"></div><div class="tv-content"><div class="tv-card" onclick="openEventById('2025a')"><div class="tv-year">Mar 2025</div><div class="tv-title">Serie C — $120M USD</div><div class="tv-desc">Ronda de inversión récord para startup tech colombiana. Liderada por Sequoia Capital y SoftBank LatAm.</div></div></div></div>
    <div class="tv-item"><div class="tv-node"></div><div class="tv-content"><div class="tv-card" onclick="openEventById('2024a')"><div class="tv-year">Jun 2024</div><div class="tv-title">1 Millón de Usuarios</div><div class="tv-desc">Cruzamos el hito del millón de usuarios activos en 8 países de Latinoamérica simultáneamente.</div></div></div><div class="tv-empty"></div></div>
    <div class="tv-item"><div class="tv-node"></div><div class="tv-empty"></div><div class="tv-content"><div class="tv-card" onclick="openEventById('2023a')"><div class="tv-year">Ene 2023</div><div class="tv-title">IA Generativa — Primera Integración</div><div class="tv-desc">Primeros en integrar ChatGPT en una plataforma empresarial latinoamericana. 300% crecimiento en 90 días.</div></div></div></div>
  </div>
</section>

<!-- EVENT MODAL -->
<div class="event-modal-overlay" id="eventModal">
  <div class="event-modal" onclick="event.stopPropagation()">
    <div class="event-modal-media" id="modalMedia">
      <button class="event-modal-close" onclick="closeEvent()">✕</button>
    </div>
    <div class="event-modal-body">
      <div class="event-modal-year" id="modalYear"></div>
      <h2 class="event-modal-title" id="modalTitle"></h2>
      <p class="event-modal-desc" id="modalDesc"></p>
      <div class="event-modal-stats" id="modalStats"></div>
      <div class="event-tags-wrap" id="modalTags"></div>
    </div>
  </div>
</div>

<script>
const events=[
  {id:'2016a',year:'2016',month:'Mar',cat:'milestone',title:'Fundación de la Empresa',preview:'Dos ingenieros con una visión.',emoji:'🏗️',bg:'linear-gradient(135deg,#1a1a2e,#4F46E5)',desc:'Con $10,000 de ahorros y una laptop cada uno, Ana García y Marco Reyes fundaron la empresa en un cowork de Bogotá. La primera semana ya tenían su primer cliente: una pyme local.',stats:[{n:'2',l:'Fundadores'},{n:'$10K',l:'Capital inicial'},{n:'1',l:'Primer cliente'}],tags:['Fundación','Bogotá','Bootstrap']},
  {id:'2017a',year:'2017',month:'Jun',cat:'launch',title:'Lanzamiento Producto v1.0',preview:'Primera plataforma en producción.',emoji:'🚀',bg:'linear-gradient(135deg,#0D6EFD,#00A8E8)',desc:'Después de 14 meses de desarrollo, lanzamos la primera versión de la plataforma. 50 empresas beta esperaban el momento.',stats:[{n:'50',l:'Usuarios beta'},{n:'4.2★',l:'Rating inicial'},{n:'$180K',l:'ARR primer año'}],tags:['Lanzamiento','Producto','Beta']},
  {id:'2018a',year:'2018',month:'Sep',cat:'award',title:'Premio Mejor Startup LatAm',preview:'Reconocimiento regional.',emoji:'🥇',bg:'linear-gradient(135deg,#D97706,#F59E0B)',desc:'Fuimos premiados como la mejor startup de tecnología empresarial de Latinoamérica en el WEF LatAm Summit de Ciudad de México.',stats:[{n:'#1',l:'LatAm Startup'},{n:'500+',l:'Empresas evaluadas'},{n:'$2M',l:'Premio y visibilidad'}],tags:['Premio','WEF','LatAm']},
  {id:'2019a',year:'2019',month:'Feb',cat:'expansion',title:'Expansión a México y Chile',preview:'Primeros mercados internacionales.',emoji:'🌎',bg:'linear-gradient(135deg,#059669,#10B981)',desc:'Abrimos oficinas en Ciudad de México y Santiago de Chile, contratando nuestros primeros equipos internacionales y adaptando el producto a cada mercado.',stats:[{n:'2',l:'Nuevos países'},{n:'30',l:'Empleados intl.'},{n:'+89%',l:'Crecimiento MoM'}],tags:['Expansión','México','Chile']},
  {id:'2020a',year:'2020',month:'Abr',cat:'milestone',title:'Pandemia: 10x Growth',preview:'Crisis = oportunidad.',emoji:'💡',bg:'linear-gradient(135deg,#7C3AED,#A855F7)',desc:'COVID-19 aceleró la digitalización forzada. En 60 días pasamos de 500 a 5,000 clientes. El equipo trabajó 18 horas diarias para no perder la oportunidad histórica.',stats:[{n:'10x',l:'Crecimiento'},{n:'5000',l:'Clientes totales'},{n:'60',l:'Días de sprint'}],tags:['COVID','Hipercrecimiento','Oportunidad']},
  {id:'2021a',year:'2021',month:'Nov',cat:'tech',title:'Serie A — $15M USD',preview:'Primer capital institucional.',emoji:'💰',bg:'linear-gradient(135deg,#0891B2,#06B6D4)',desc:'Cerramos nuestra primera ronda institucional liderada por Andreessen Horowitz y los fondos de capital de riesgo más importantes de la región.',stats:[{n:'$15M',l:'Serie A'},{n:'5',l:'Inversionistas'},{n:'$80M',l:'Valoración'}],tags:['Inversión','Serie A','VC']},
  {id:'2022a',year:'2022',month:'Mar',cat:'expansion',title:'500 Clientes Enterprise',preview:'El mercado corporativo.',emoji:'🏢',bg:'linear-gradient(135deg,#B91C1C,#EF4444)',desc:'Cruzamos los 500 clientes enterprise con contratos promedio de $50K/año. Bancolombia, Éxito y Avianca entre los logos principales.',stats:[{n:'500',l:'Enterprise'},{n:'$50K',l:'ACV promedio'},{n:'8',l:'Países activos'}],tags:['Enterprise','B2B','Escala']},
  {id:'2023a',year:'2023',month:'Ene',cat:'tech',title:'IA Generativa — Primera Integración',preview:'Primeros en LatAm con GPT.',emoji:'🤖',bg:'linear-gradient(135deg,#4F46E5,#8B5CF6)',desc:'Primeros en Latinoamérica en integrar GPT-4 en una plataforma empresarial. 300% de crecimiento en 90 días post-lanzamiento.',stats:[{n:'+300%',l:'Crecimiento 90d'},{n:'1ro',l:'En LatAm'},{n:'50K',l:'Nuevos usuarios'}],tags:['IA','GPT','Innovación']},
  {id:'2024a',year:'2024',month:'Jun',cat:'milestone',title:'1 Millón de Usuarios',preview:'Hito histórico.',emoji:'🎯',bg:'linear-gradient(135deg,#059669,#22C55E)',desc:'Cruzamos simultáneamente el millón de usuarios activos en Colombia, México, Chile, Argentina, Perú, Ecuador, Uruguay y Costa Rica.',stats:[{n:'1M',l:'Usuarios activos'},{n:'8',l:'Países'},{n:'98%',l:'Uptime'}],tags:['Hito','Millón','LatAm']},
  {id:'2025a',year:'2025',month:'Mar',cat:'award',title:'Serie C — $120M USD',preview:'Unicornio en camino.',emoji:'🦄',bg:'linear-gradient(135deg,#D97706,#F97316)',desc:'Ronda Serie C de $120M liderada por Sequoia Capital. Somos la startup colombiana con la mayor ronda de inversión de la historia del país.',stats:[{n:'$120M',l:'Serie C'},{n:'$800M',l:'Valoración'},{n:'🦄',l:'Pre-unicornio'}],tags:['Sequoia','Serie C','Récord']},
  {id:'2026a',year:'2026',month:'Nov',cat:'launch',title:'LaunchOS 5.0 — IA Autónoma',preview:'El futuro es ahora.',emoji:'🌟',bg:'linear-gradient(135deg,#4F46E5,#06B6D4)',desc:'Lanzamos LaunchOS 5.0 con agentes de IA autónomos que toman decisiones empresariales sin intervención humana. 50,000 usuarios en las primeras 48 horas.',stats:[{n:'50K',l:'Usuarios 48h'},{n:'200+',l:'Agentes IA'},{n:'#1',l:'Product Hunt'}],tags:['IA Autónoma','LaunchOS 5.0','Lanzamiento']}
];

// Render horizontal timeline
function renderTimeline(filter='all'){
  const track=document.getElementById('timelineTrack');
  const existing=track.querySelectorAll('.event-node');
  existing.forEach(e=>e.remove());
  const filtered=events.filter(e=>filter==='all'||e.cat===filter);
  filtered.forEach((ev,i)=>{
    const isEven=i%2===0;
    const node=document.createElement('div');
    node.className='event-node';node.dataset.id=ev.id;node.dataset.year=ev.year;
    node.onclick=()=>openEvent(ev.id);
    node.innerHTML=`
      <div class="event-card" style="order:${isEven?1:-1};margin-${isEven?'top':'bottom'}:16px">
        <div class="event-cat cat-${ev.cat}">${ev.cat.toUpperCase()}</div>
        <div class="event-title">${ev.title}</div>
        <div class="event-preview">${ev.preview}</div>
        <span class="event-view-more">Ver más →</span>
      </div>
      <div class="event-dot"><div class="event-pulse"></div></div>
      <div class="event-year-label" style="order:${isEven?-1:1};margin-${isEven?'bottom':'top'}:16px">${ev.month} ${ev.year}</div>
    `;
    track.appendChild(node);
  });
}

function openEvent(id){
  const ev=events.find(e=>e.id===id);if(!ev)return;
  document.getElementById('modalMedia').style.background=ev.bg;
  document.getElementById('modalMedia').querySelector('div:last-child')?.remove();
  const icon=document.createElement('div');icon.style.cssText='font-size:80px;position:absolute';icon.textContent=ev.emoji;
  document.getElementById('modalMedia').appendChild(icon);
  document.getElementById('modalYear').textContent=`${ev.month} ${ev.year}`;
  document.getElementById('modalTitle').textContent=ev.title;
  document.getElementById('modalDesc').textContent=ev.desc;
  document.getElementById('modalStats').innerHTML=ev.stats.map(s=>`<div class="event-stat"><div class="event-stat-num">${s.n}</div><div class="event-stat-label">${s.l}</div></div>`).join('');
  document.getElementById('modalTags').innerHTML=ev.tags.map(t=>`<span class="event-modal-tag">${t}</span>`).join('');
  document.getElementById('eventModal').classList.add('show');
}
function openEventById(id){openEvent(id)}
function closeEvent(){document.getElementById('eventModal').classList.remove('show')}
document.getElementById('eventModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeEvent()});

function filterTimeline(cat,btn){
  document.querySelectorAll('.tl-filter').forEach(f=>f.classList.remove('active'));
  btn.classList.add('active');renderTimeline(cat);
}

function scrollToYear(year,btn){
  document.querySelectorAll('.year-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const node=document.querySelector(`[data-year="${year}"]`);
  if(node)node.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});
}

// Drag to scroll
const scroll=document.getElementById('timelineScroll');
let isDown=false;let startX,scrollLeft;
scroll.addEventListener('mousedown',e=>{isDown=true;scroll.classList.add('dragging');startX=e.pageX-scroll.offsetLeft;scrollLeft=scroll.scrollLeft});
document.addEventListener('mouseup',()=>{isDown=false;scroll.classList.remove('dragging')});
document.addEventListener('mousemove',e=>{if(!isDown)return;e.preventDefault();const x=e.pageX-scroll.offsetLeft;const walk=(x-startX)*2;scroll.scrollLeft=scrollLeft-walk});

renderTimeline();
</script>
</body>
</html>
```
