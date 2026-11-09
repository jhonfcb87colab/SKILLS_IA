# SKILL 19: Portal de Encuestas y Feedback con Resultados en Vivo

## 1. Propósito y Filosofía
Genera portales de encuestas interactivas con NPS, rating de estrellas, múltiple opción y resultados animados en tiempo real. Ideal para feedback de producto, satisfacción de cliente y estudios de mercado con visualización inmediata.

- **Enfoque:** Captura de opinión + visualización de resultados en vivo + UX de alta conversión.
- **UX:** Flujo de pregunta activa → animación de respuesta → resultados actualizados en vivo.
- **Estética:** Encuesta moderna — fondo blanco/perla, acentos vibrantes, micro-animaciones de selección.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portal de Encuestas y Feedback</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F0F4FF;--card:#FFFFFF;--border:#E2E8F0;--primary:#6366F1;--secondary:#EC4899;--success:#22C55E;--warn:#F59E0B;--danger:#EF4444;--text:#1E293B;--muted:#64748B}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}

/* HEADER */
.survey-header{background:linear-gradient(135deg,var(--primary),#8B5CF6);padding:28px 24px;text-align:center;position:relative;overflow:hidden}
.survey-header::before{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(255,255,255,.1) 0%,transparent 60%);animation:rotate 8s linear infinite}
@keyframes rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.survey-header h1{font-size:26px;font-weight:900;color:#fff;position:relative;z-index:1;margin-bottom:6px}
.survey-header p{font-size:14px;color:rgba(255,255,255,.8);position:relative;z-index:1}
.progress-info{display:flex;justify-content:center;align-items:center;gap:8px;margin-top:16px;position:relative;z-index:1}
.prog-step{font-size:13px;color:rgba(255,255,255,.7);font-weight:600}
.prog-bar-track{width:200px;height:6px;background:rgba(255,255,255,.2);border-radius:3px;overflow:hidden}
.prog-bar-fill{height:100%;background:#fff;border-radius:3px;transition:width .5s ease}

/* LAYOUT */
.survey-layout{display:grid;grid-template-columns:1fr 340px;gap:24px;padding:24px;max-width:1100px;margin:0 auto}
@media(max-width:768px){.survey-layout{grid-template-columns:1fr}}

/* SURVEY CARD */
.survey-card{background:var(--card);border-radius:16px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,.08);border:1px solid var(--border)}
.q-label{font-size:12px;font-weight:700;color:var(--primary);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px}
.q-text{font-size:20px;font-weight:800;color:var(--text);margin-bottom:24px;line-height:1.4}

/* NPS */
.nps-wrap{margin-bottom:20px}
.nps-scale{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
.nps-btn{width:48px;height:48px;border-radius:10px;border:2px solid var(--border);background:transparent;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;color:var(--text);font-family:inherit}
.nps-btn:hover{transform:scale(1.1)}
.nps-btn.selected{transform:scale(1.1);border-width:2px;color:#fff}
.nps-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}
.nps-btn[data-v="0"],.nps-btn[data-v="1"],.nps-btn[data-v="2"],.nps-btn[data-v="3"],.nps-btn[data-v="4"],.nps-btn[data-v="5"],.nps-btn[data-v="6"]{color:var(--text)}
.nps-btn[data-v="0"].selected,.nps-btn[data-v="1"].selected,.nps-btn[data-v="2"].selected,.nps-btn[data-v="3"].selected,.nps-btn[data-v="4"].selected,.nps-btn[data-v="5"].selected,.nps-btn[data-v="6"].selected{background:var(--danger);border-color:var(--danger)}
.nps-btn[data-v="7"].selected,.nps-btn[data-v="8"].selected{background:var(--warn);border-color:var(--warn)}
.nps-btn[data-v="9"].selected,.nps-btn[data-v="10"].selected{background:var(--success);border-color:var(--success)}

/* STARS */
.stars-wrap{display:flex;gap:8px;margin-bottom:16px}
.star{font-size:40px;cursor:pointer;transition:transform .2s;filter:grayscale(1) opacity(.4)}
.star.active{filter:none;transform:scale(1.15)}
.star-label{font-size:14px;color:var(--muted);text-align:center;min-height:20px;margin-bottom:12px}

/* OPTIONS */
.options-list{display:flex;flex-direction:column;gap:10px;margin-bottom:20px}
.option-item{display:flex;align-items:center;gap:14px;padding:14px 16px;border:2px solid var(--border);border-radius:12px;cursor:pointer;transition:all .2s;position:relative;overflow:hidden}
.option-item::after{content:'';position:absolute;inset:0;background:var(--primary);opacity:0;transition:opacity .2s}
.option-item:hover{border-color:var(--primary);transform:translateX(4px)}
.option-item.selected{border-color:var(--primary);background:rgba(99,102,241,.06)}
.option-radio{width:20px;height:20px;border-radius:50%;border:2px solid var(--border);flex-shrink:0;transition:all .2s;display:flex;align-items:center;justify-content:center}
.option-item.selected .option-radio{background:var(--primary);border-color:var(--primary)}
.option-radio::after{content:'';width:8px;height:8px;background:#fff;border-radius:50%;transform:scale(0);transition:transform .2s}
.option-item.selected .option-radio::after{transform:scale(1)}
.option-emoji{font-size:22px}
.option-text{font-size:14px;font-weight:600;color:var(--text)}
.option-sub{font-size:12px;color:var(--muted)}

/* TEXTAREA */
.feedback-ta{width:100%;padding:14px;border:2px solid var(--border);border-radius:12px;font-size:14px;font-family:inherit;resize:vertical;min-height:100px;color:var(--text);transition:border-color .2s;outline:none;background:var(--bg)}
.feedback-ta:focus{border-color:var(--primary)}
.char-count{text-align:right;font-size:11px;color:var(--muted);margin-top:4px}

/* NAV BTNS */
.q-nav{display:flex;justify-content:space-between;align-items:center;margin-top:24px}
.nav-btn{padding:12px 28px;border-radius:30px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.btn-prev{background:var(--bg);color:var(--muted);border:1px solid var(--border)}
.btn-prev:hover{background:var(--border)}
.btn-next{background:linear-gradient(135deg,var(--primary),#8B5CF6);color:#fff;box-shadow:0 4px 15px rgba(99,102,241,.3)}
.btn-next:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(99,102,241,.4)}
.btn-next:disabled{opacity:.5;cursor:not-allowed;transform:none}

/* SUCCESS STATE */
.success-state{text-align:center;padding:40px 20px;display:none}
.success-state.show{display:block}
.success-emoji{font-size:72px;margin-bottom:20px;animation:popIn .5s cubic-bezier(.175,.885,.32,1.275)}
@keyframes popIn{from{transform:scale(0)}to{transform:scale(1)}}
.success-title{font-size:24px;font-weight:900;color:var(--text);margin-bottom:10px}
.success-desc{font-size:15px;color:var(--muted);margin-bottom:28px;line-height:1.6}
.restart-btn{background:linear-gradient(135deg,var(--primary),#8B5CF6);color:#fff;border:none;padding:14px 32px;border-radius:30px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.restart-btn:hover{transform:translateY(-2px)}

/* RESULTS PANEL */
.results-panel{background:var(--card);border-radius:16px;padding:24px;box-shadow:0 4px 20px rgba(0,0,0,.08);border:1px solid var(--border);position:sticky;top:20px;max-height:calc(100vh - 40px);overflow-y:auto}
.rp-title{font-size:16px;font-weight:800;margin-bottom:20px;display:flex;align-items:center;gap:8px}
.live-dot{width:8px;height:8px;background:var(--success);border-radius:50%;animation:pulse2 1.5s infinite}
@keyframes pulse2{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(1.4)}}

/* NPS GAUGE */
.nps-gauge{margin-bottom:24px}
.nps-gauge-title{font-size:13px;font-weight:700;color:var(--muted);margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px}
.gauge-wrap{text-align:center;position:relative;margin-bottom:12px}
.nps-score{font-size:48px;font-weight:900;line-height:1}
.nps-score-label{font-size:12px;color:var(--muted);margin-bottom:12px}
.nps-breakdown{display:flex;gap:6px}
.nb-item{flex:1;padding:8px 4px;border-radius:8px;text-align:center}
.nb-item.det{background:rgba(239,68,68,.1);color:var(--danger)}
.nb-item.pas{background:rgba(245,158,11,.1);color:var(--warn)}
.nb-item.pro{background:rgba(34,197,94,.1);color:var(--success)}
.nb-pct{font-size:16px;font-weight:900}
.nb-label{font-size:10px;font-weight:600}

/* RESULTS BARS */
.result-item{margin-bottom:14px}
.ri-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;font-size:13px}
.ri-label{font-weight:600;color:var(--text)}
.ri-count{font-weight:700;color:var(--primary)}
.ri-bar-track{height:10px;background:var(--bg);border-radius:5px;overflow:hidden;border:1px solid var(--border)}
.ri-bar-fill{height:100%;border-radius:5px;transition:width .8s cubic-bezier(.4,0,.2,1)}

/* SENTIMENT */
.sentiment-row{display:flex;align-items:center;justify-content:center;gap:16px;padding:16px;background:var(--bg);border-radius:12px;margin-bottom:16px}
.sent-item{text-align:center}
.sent-emoji{font-size:28px;display:block}
.sent-label{font-size:11px;color:var(--muted);font-weight:600}
.sent-pct{font-size:16px;font-weight:900;color:var(--text)}

/* RESPONSES COUNT */
.total-responses{text-align:center;padding:14px;background:linear-gradient(135deg,rgba(99,102,241,.08),rgba(139,92,246,.08));border-radius:12px;border:1px solid rgba(99,102,241,.2);margin-bottom:20px}
.tr-num{font-size:36px;font-weight:900;color:var(--primary)}
.tr-label{font-size:13px;color:var(--muted)}

/* QUESTION indicator */
.q-wrap{transition:opacity .3s}
.q-wrap.fade{opacity:0}
</style>
</head>
<body>

<div class="survey-header">
  <h1>📊 Encuesta de Satisfacción 2024</h1>
  <p>Tu opinión impulsa nuestra mejora continua</p>
  <div class="progress-info">
    <span class="prog-step" id="progStep">Pregunta 1 de 4</span>
    <div class="prog-bar-track"><div class="prog-bar-fill" id="progBar" style="width:25%"></div></div>
  </div>
</div>

<div class="survey-layout">
  <!-- SURVEY FORM -->
  <div class="survey-card">

    <!-- QUESTION 1: NPS -->
    <div class="q-wrap" id="q1">
      <div class="q-label">📌 Pregunta 1 de 4</div>
      <div class="q-text">¿Qué tan probable es que recomiendes nuestro servicio a un colega o amigo?</div>
      <div class="nps-wrap">
        <div class="nps-scale" id="npsScale"></div>
        <div class="nps-labels"><span>😤 Para nada probable</span><span>🤩 Muy probable</span></div>
      </div>
      <div class="q-nav">
        <div></div>
        <button class="nav-btn btn-next" id="next1" disabled onclick="nextQ(1,2)">Siguiente →</button>
      </div>
    </div>

    <!-- QUESTION 2: Stars -->
    <div class="q-wrap" id="q2" style="display:none">
      <div class="q-label">⭐ Pregunta 2 de 4</div>
      <div class="q-text">¿Cómo calificarías la calidad de nuestra atención al cliente?</div>
      <div class="stars-wrap" id="starsWrap">
        <span class="star" data-v="1">⭐</span>
        <span class="star" data-v="2">⭐</span>
        <span class="star" data-v="3">⭐</span>
        <span class="star" data-v="4">⭐</span>
        <span class="star" data-v="5">⭐</span>
      </div>
      <div class="star-label" id="starLabel">Haz clic en las estrellas para calificar</div>
      <div class="q-nav">
        <button class="nav-btn btn-prev" onclick="prevQ(2,1)">← Anterior</button>
        <button class="nav-btn btn-next" id="next2" disabled onclick="nextQ(2,3)">Siguiente →</button>
      </div>
    </div>

    <!-- QUESTION 3: Options -->
    <div class="q-wrap" id="q3" style="display:none">
      <div class="q-label">🎯 Pregunta 3 de 4</div>
      <div class="q-text">¿Cuál es el principal beneficio que has obtenido al usar nuestra plataforma?</div>
      <div class="options-list">
        <div class="option-item" onclick="selectOption(this,'op1')">
          <div class="option-radio"></div>
          <span class="option-emoji">⏰</span>
          <div><div class="option-text">Ahorro de tiempo</div><div class="option-sub">Procesos más rápidos y eficientes</div></div>
        </div>
        <div class="option-item" onclick="selectOption(this,'op2')">
          <div class="option-radio"></div>
          <span class="option-emoji">💰</span>
          <div><div class="option-text">Reducción de costos</div><div class="option-sub">Menor gasto operativo</div></div>
        </div>
        <div class="option-item" onclick="selectOption(this,'op3')">
          <div class="option-radio"></div>
          <span class="option-emoji">📈</span>
          <div><div class="option-text">Mayor productividad</div><div class="option-sub">Mi equipo produce más con menos</div></div>
        </div>
        <div class="option-item" onclick="selectOption(this,'op4')">
          <div class="option-radio"></div>
          <span class="option-emoji">🤝</span>
          <div><div class="option-text">Mejor colaboración</div><div class="option-sub">Comunicación y trabajo en equipo</div></div>
        </div>
      </div>
      <div class="q-nav">
        <button class="nav-btn btn-prev" onclick="prevQ(3,2)">← Anterior</button>
        <button class="nav-btn btn-next" id="next3" disabled onclick="nextQ(3,4)">Siguiente →</button>
      </div>
    </div>

    <!-- QUESTION 4: Textarea -->
    <div class="q-wrap" id="q4" style="display:none">
      <div class="q-label">💬 Pregunta 4 de 4</div>
      <div class="q-text">¿Qué podríamos mejorar para superar tus expectativas?</div>
      <textarea class="feedback-ta" id="feedbackTA" placeholder="Comparte tu opinión libremente..." maxlength="500" oninput="updateCharCount(this);checkTA()"></textarea>
      <div class="char-count"><span id="charCount">0</span>/500 caracteres</div>
      <div class="q-nav">
        <button class="nav-btn btn-prev" onclick="prevQ(4,3)">← Anterior</button>
        <button class="nav-btn btn-next" id="next4" disabled onclick="submitSurvey()">Enviar Respuestas ✓</button>
      </div>
    </div>

    <!-- SUCCESS -->
    <div class="success-state" id="successState">
      <div class="success-emoji">🎉</div>
      <div class="success-title">¡Gracias por tu feedback!</div>
      <div class="success-desc">Tu opinión es invaluable para nosotros. Con respuestas como la tuya mejoramos día a día para ofrecerte la mejor experiencia posible.</div>
      <button class="restart-btn" onclick="restartSurvey()">📊 Ver Resultados Globales</button>
    </div>

  </div>

  <!-- LIVE RESULTS PANEL -->
  <div class="results-panel">
    <div class="rp-title"><div class="live-dot"></div> Resultados en Vivo</div>
    <div class="total-responses"><div class="tr-num" id="totalResponses">247</div><div class="tr-label">respuestas totales</div></div>

    <!-- NPS GAUGE -->
    <div class="nps-gauge">
      <div class="nps-gauge-title">Score NPS</div>
      <div class="gauge-wrap">
        <div class="nps-score" id="npsScoreDisplay" style="color:var(--success)">+72</div>
        <div class="nps-score-label">Net Promoter Score</div>
      </div>
      <div class="nps-breakdown">
        <div class="nb-item det"><div class="nb-pct" id="detPct">9%</div><div class="nb-label">Detractores</div></div>
        <div class="nb-item pas"><div class="nb-pct" id="pasPct">10%</div><div class="nb-label">Pasivos</div></div>
        <div class="nb-item pro"><div class="nb-pct" id="proPct">81%</div><div class="nb-label">Promotores</div></div>
      </div>
    </div>

    <!-- STARS DISTRIBUTION -->
    <div style="margin-bottom:20px">
      <div class="nps-gauge-title">Satisfacción Atención al Cliente</div>
      <div id="starsBars"></div>
    </div>

    <!-- OPTIONS DISTRIBUTION -->
    <div style="margin-bottom:20px">
      <div class="nps-gauge-title">Principal Beneficio</div>
      <div id="optionsBars"></div>
    </div>

    <!-- SENTIMENT -->
    <div class="nps-gauge-title">Sentimiento General</div>
    <div class="sentiment-row">
      <div class="sent-item"><span class="sent-emoji">😄</span><div class="sent-pct">74%</div><div class="sent-label">Positivo</div></div>
      <div class="sent-item"><span class="sent-emoji">😐</span><div class="sent-pct">18%</div><div class="sent-label">Neutral</div></div>
      <div class="sent-item"><span class="sent-emoji">😟</span><div class="sent-pct">8%</div><div class="sent-label">Negativo</div></div>
    </div>
  </div>
</div>

<script>
// DATA
const resultsData={
  nps:{det:22,pas:25,pro:200},
  stars:[{l:'5 estrellas',n:148,c:'#F59E0B'},{l:'4 estrellas',n:62,c:'#F59E0B'},{l:'3 estrellas',n:24,c:'#64748B'},{l:'2 estrellas',n:9,c:'#EF4444'},{l:'1 estrella',n:4,c:'#EF4444'}],
  opts:[{l:'⏰ Ahorro de tiempo',n:98,c:'#6366F1'},{l:'💰 Reducción costos',n:67,c:'#EC4899'},{l:'📈 Productividad',n:55,c:'#22C55E'},{l:'🤝 Colaboración',n:27,c:'#F59E0B'}]
};
let totalBase=247;
let npsSelected=null,starsSelected=null,optionSelected=null;
const starLabels=['','Muy insatisfecho','Insatisfecho','Regular','Satisfecho','Muy satisfecho 🎉'];

// BUILD NPS
const npsScale=document.getElementById('npsScale');
for(let i=0;i<=10;i++){
  const btn=document.createElement('button');
  btn.className='nps-btn';btn.textContent=i;btn.dataset.v=i;
  btn.onclick=()=>{npsSelected=i;document.querySelectorAll('.nps-btn').forEach(b=>b.classList.remove('selected'));btn.classList.add('selected');document.getElementById('next1').disabled=false;updateNPS(i)};
  npsScale.appendChild(btn);
}

// BUILD STARS
document.getElementById('starsWrap').querySelectorAll('.star').forEach(s=>{
  s.onmouseover=()=>highlightStars(+s.dataset.v);
  s.onmouseout=()=>starsSelected?highlightStars(starsSelected):clearStars();
  s.onclick=()=>{starsSelected=+s.dataset.v;document.getElementById('next2').disabled=false;updateStarResult(starsSelected);document.getElementById('starLabel').textContent=starLabels[starsSelected]};
});
function highlightStars(v){document.querySelectorAll('.star').forEach(s=>{s.classList.toggle('active',+s.dataset.v<=v)})}
function clearStars(){document.querySelectorAll('.star').forEach(s=>s.classList.remove('active'))}

function selectOption(el,id){
  document.querySelectorAll('.option-item').forEach(o=>o.classList.remove('selected'));
  el.classList.add('selected');optionSelected=id;document.getElementById('next3').disabled=false;updateOptionResult(id);
}
function updateCharCount(ta){document.getElementById('charCount').textContent=ta.value.length}
function checkTA(){document.getElementById('next4').disabled=document.getElementById('feedbackTA').value.trim().length<10}

function nextQ(from,to){
  const qf=document.getElementById('q'+from),qt=document.getElementById('q'+to);
  qf.classList.add('fade');setTimeout(()=>{qf.style.display='none';qf.classList.remove('fade');qt.style.display='block';},300);
  document.getElementById('progStep').textContent=`Pregunta ${to} de 4`;
  document.getElementById('progBar').style.width=(to/4*100)+'%';
}
function prevQ(from,to){
  document.getElementById('q'+from).style.display='none';
  document.getElementById('q'+to).style.display='block';
  document.getElementById('progStep').textContent=`Pregunta ${to} de 4`;
  document.getElementById('progBar').style.width=(to/4*100)+'%';
}

function submitSurvey(){
  totalBase++;
  document.getElementById('totalResponses').textContent=totalBase;
  document.getElementById('q4').style.display='none';
  document.getElementById('successState').classList.add('show');
  document.getElementById('progBar').style.width='100%';
  document.getElementById('progStep').textContent='¡Completado!';
}

function restartSurvey(){
  location.reload();
}

// RESULTS
function updateNPS(v){
  let det=resultsData.nps.det,pas=resultsData.nps.pas,pro=resultsData.nps.pro;
  if(v<=6)det++;else if(v<=8)pas++;else pro++;
  const total=det+pas+pro;
  const detP=Math.round(det/total*100),pasP=Math.round(pas/total*100),proP=100-detP-pasP;
  const nps=proP-detP;
  document.getElementById('detPct').textContent=detP+'%';
  document.getElementById('pasPct').textContent=pasP+'%';
  document.getElementById('proPct').textContent=proP+'%';
  const sc=document.getElementById('npsScoreDisplay');
  sc.textContent=(nps>=0?'+':'')+nps;
  sc.style.color=nps>50?'var(--success)':nps>0?'var(--warn)':'var(--danger)';
}

function updateStarResult(v){
  const copy=[...resultsData.stars];
  const idx=5-v;copy[idx]={...copy[idx],n:copy[idx].n+1};
  renderBars('starsBars',copy);
}
function updateOptionResult(id){
  const map={op1:0,op2:1,op3:2,op4:3};
  const copy=resultsData.opts.map(o=>({...o}));
  copy[map[id]].n++;renderBars2('optionsBars',copy);
}

function renderBars(containerId,data){
  const c=document.getElementById(containerId);c.innerHTML='';
  const max=Math.max(...data.map(d=>d.n));
  data.forEach(d=>{
    const pct=Math.round(d.n/max*100);
    c.innerHTML+=`<div class="result-item"><div class="ri-top"><span class="ri-label">${d.l}</span><span class="ri-count">${d.n} votos</span></div><div class="ri-bar-track"><div class="ri-bar-fill" style="width:0%;background:${d.c}" data-pct="${pct}"></div></div></div>`;
  });
  setTimeout(()=>c.querySelectorAll('.ri-bar-fill').forEach(b=>b.style.width=b.dataset.pct+'%'),50);
}
function renderBars2(containerId,data){
  renderBars(containerId,data);
}

// INIT
renderBars('starsBars',resultsData.stars);
renderBars2('optionsBars',resultsData.opts);
</script>
</body>
</html>
```
