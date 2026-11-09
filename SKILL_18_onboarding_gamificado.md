# SKILL 18: Onboarding Gamificado con Misiones, XP y Recompensas

## 1. Propósito y Filosofía
Genera experiencias de onboarding gamificadas para apps y plataformas. Misiones con puntos XP, barra de nivel, badges desbloqueables y confetti al completar tareas. Aumenta drásticamente la adopción de producto.

- **Enfoque:** Engagement, retención temprana, formación de hábitos de uso.
- **UX:** Misiones con XP + barra de nivel animada + badges + celebraciones con confetti.
- **Estética:** Game-ified SaaS — fondo oscuro + colores de energía + elementos de juego premium.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Onboarding Gamificado</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0C0E1A;--card:#141828;--border:rgba(255,255,255,.08);--purple:#8B5CF6;--cyan:#06B6D4;--gold:#F59E0B;--green:#22C55E;--text:#E2E8F0;--muted:#64748B}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;padding:0}

/* CONFETTI CANVAS */
#confettiCanvas{position:fixed;inset:0;pointer-events:none;z-index:999}

/* HEADER */
.ob-header{background:linear-gradient(135deg,#141828,#1E1B4B);padding:20px 24px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border);position:sticky;top:0;z-index:50}
.ob-brand{display:flex;align-items:center;gap:10px}
.brand-ava{width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--purple),var(--cyan));display:flex;align-items:center;justify-content:center;font-size:18px}
.brand-info{line-height:1.2}
.brand-name{font-size:14px;font-weight:700}
.brand-step{font-size:11px;color:var(--muted)}
.xp-display{display:flex;align-items:center;gap:10px}
.xp-label{font-size:12px;color:var(--muted)}
.xp-num{font-size:18px;font-weight:900;color:var(--gold)}
.xp-icon{font-size:20px}
.level-pill{background:linear-gradient(135deg,var(--purple),var(--cyan));padding:4px 12px;border-radius:30px;font-size:12px;font-weight:800;color:#fff}

/* LEVEL BAR */
.level-section{padding:20px 24px;background:rgba(139,92,246,.05);border-bottom:1px solid var(--border)}
.level-info{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:13px}
.level-title{font-weight:700;color:var(--purple)}
.level-progress{font-size:12px;color:var(--muted)}
.level-bar-track{height:12px;background:rgba(255,255,255,.06);border-radius:6px;overflow:hidden}
.level-bar-fill{height:100%;background:linear-gradient(90deg,var(--purple),var(--cyan));border-radius:6px;transition:width .8s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
.level-bar-fill::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:shimmer 2s infinite}
@keyframes shimmer{from{transform:translateX(-100%)}to{transform:translateX(100%)}}

/* MAIN LAYOUT */
.ob-layout{display:grid;grid-template-columns:1fr 300px;gap:20px;padding:24px;max-width:1100px;margin:0 auto}
@media(max-width:768px){.ob-layout{grid-template-columns:1fr}}

/* MISSIONS */
.missions-section{display:flex;flex-direction:column;gap:14px}
.missions-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}
.missions-title{font-size:18px;font-weight:800}
.missions-count{font-size:13px;color:var(--muted)}

.mission-card{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px;transition:all .3s;position:relative;overflow:hidden}
.mission-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;border-radius:4px 0 0 4px}
.mission-card.mc-purple::before{background:var(--purple)}
.mission-card.mc-cyan::before{background:var(--cyan)}
.mission-card.mc-gold::before{background:var(--gold)}
.mission-card.mc-green::before{background:var(--green)}
.mission-card:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.3)}
.mission-card.completed{opacity:.6;transform:none}
.mission-card.completed::after{content:'✅ COMPLETADA';position:absolute;top:12px;right:12px;font-size:10px;font-weight:700;color:var(--green);letter-spacing:1px}
.mission-top{display:flex;align-items:flex-start;gap:14px;margin-bottom:12px}
.mission-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0}
.mission-info{flex:1}
.mission-title{font-size:15px;font-weight:700;margin-bottom:3px}
.mission-desc{font-size:13px;color:var(--muted);line-height:1.5}
.mission-xp{display:flex;align-items:center;gap:5px;font-size:13px;font-weight:700;color:var(--gold)}
.mission-checklist{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.mission-check-item{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--muted);cursor:pointer;padding:6px 10px;border-radius:6px;transition:background .2s}
.mission-check-item:hover{background:rgba(255,255,255,.04)}
.mission-check-item.done{color:rgba(255,255,255,.4)}
.mission-check-item.done span:last-child{text-decoration:line-through}
.check-circle{width:20px;height:20px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;transition:all .3s}
.mission-check-item.done .check-circle{background:var(--green);border-color:var(--green);color:#fff}
.mission-progress-bar{height:6px;background:rgba(255,255,255,.06);border-radius:3px;overflow:hidden;margin-bottom:12px}
.mpb-fill{height:100%;border-radius:3px;transition:width .5s ease}
.mission-btn{width:100%;padding:10px;border-radius:8px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.mission-btn:disabled{opacity:.4;cursor:not-allowed}

/* SIDEBAR */
.ob-sidebar{display:flex;flex-direction:column;gap:16px}
.sidebar-panel{background:var(--card);border:1px solid var(--border);border-radius:14px;padding:18px}
.sp-title{font-size:14px;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:6px}

/* BADGES */
.badges-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.badge{background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:10px;padding:12px 8px;text-align:center;transition:all .3s}
.badge.unlocked{border-color:rgba(245,158,11,.3);background:rgba(245,158,11,.08)}
.badge.unlocked:hover{transform:scale(1.05)}
.badge-emoji{font-size:28px;filter:grayscale(1) opacity(.3);transition:filter .3s;display:block;margin-bottom:4px}
.badge.unlocked .badge-emoji{filter:none}
.badge-name{font-size:10px;color:var(--muted);font-weight:600}
.badge.unlocked .badge-name{color:var(--gold)}

/* LEADERBOARD */
.leaderboard-list{display:flex;flex-direction:column;gap:8px}
.lb-item{display:flex;align-items:center;gap:10px;padding:10px;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid var(--border)}
.lb-item.you{border-color:rgba(139,92,246,.3);background:rgba(139,92,246,.08)}
.lb-rank{font-size:14px;font-weight:900;width:24px;text-align:center;flex-shrink:0}
.lb-avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:#fff;flex-shrink:0}
.lb-name{flex:1;font-size:13px;font-weight:600}
.lb-xp{font-size:13px;font-weight:800;color:var(--gold)}

/* REWARD POPUP */
.reward-popup{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) scale(0);background:linear-gradient(135deg,#1a0533,#0c1a3a);border:1px solid rgba(139,92,246,.4);border-radius:20px;padding:32px;text-align:center;z-index:1000;min-width:300px;transition:transform .4s cubic-bezier(.175,.885,.32,1.275);box-shadow:0 20px 60px rgba(0,0,0,.8)}
.reward-popup.show{transform:translate(-50%,-50%) scale(1)}
.reward-emoji{font-size:64px;margin-bottom:16px;display:block;animation:bounce 1s infinite}
@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.reward-title{font-size:22px;font-weight:900;margin-bottom:8px;background:linear-gradient(135deg,var(--gold),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.reward-desc{font-size:14px;color:var(--muted);margin-bottom:20px;line-height:1.5}
.reward-xp{font-size:28px;font-weight:900;color:var(--gold);margin-bottom:20px}
.reward-btn{background:linear-gradient(135deg,var(--purple),var(--cyan));color:#fff;border:none;padding:12px 32px;border-radius:30px;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.reward-btn:hover{transform:scale(1.05)}
.reward-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:999;display:none}
.reward-overlay.show{display:block}
</style>
</head>
<body>
<canvas id="confettiCanvas"></canvas>

<div class="ob-header">
  <div class="ob-brand">
    <div class="brand-ava">🚀</div>
    <div class="brand-info"><div class="brand-name">¡Bienvenido, Ana!</div><div class="brand-step">Configuración de tu cuenta</div></div>
  </div>
  <div class="xp-display">
    <span class="xp-label">XP Total:</span>
    <span class="xp-num" id="xpDisplay">0</span>
    <span class="xp-icon">⚡</span>
    <span class="level-pill" id="levelPill">Nivel 1</span>
  </div>
</div>

<div class="level-section">
  <div class="level-info">
    <span class="level-title">🌱 Explorador Digital</span>
    <span class="level-progress" id="levelProgress">0 / 500 XP para Nivel 2</span>
  </div>
  <div class="level-bar-track"><div class="level-bar-fill" id="levelBarFill" style="width:0%"></div></div>
</div>

<div class="ob-layout">
  <div class="missions-section">
    <div class="missions-header">
      <h2 class="missions-title">🎯 Tus Misiones de Inicio</h2>
      <span class="missions-count" id="missionsCount">0 / 4 completadas</span>
    </div>

    <!-- MISSION 1 -->
    <div class="mission-card mc-purple" id="m1">
      <div class="mission-top">
        <div class="mission-icon" style="background:rgba(139,92,246,.2)">👤</div>
        <div class="mission-info"><div class="mission-title">Completa tu Perfil</div><div class="mission-desc">Personaliza tu cuenta para una experiencia óptima.</div></div>
        <div class="mission-xp">⚡ 100 XP</div>
      </div>
      <div class="mission-checklist">
        <div class="mission-check-item" id="mc1_1" onclick="checkItem('mc1_1','m1','100',3)"><div class="check-circle">✓</div><span>📸 Foto de perfil</span></div>
        <div class="mission-check-item" id="mc1_2" onclick="checkItem('mc1_2','m1','100',3)"><div class="check-circle">✓</div><span>🏢 Nombre de empresa</span></div>
        <div class="mission-check-item" id="mc1_3" onclick="checkItem('mc1_3','m1','100',3)"><div class="check-circle">✓</div><span>📱 Teléfono verificado</span></div>
      </div>
      <div class="mission-progress-bar"><div class="mpb-fill" id="mp1" style="width:0%;background:var(--purple)"></div></div>
      <button class="mission-btn" style="background:linear-gradient(135deg,var(--purple),#7C3AED);color:#fff" onclick="completeMission('m1','Perfil Completado','¡Tu cuenta está personalizada y lista para brillar!','100','badge-profile')">Completar Perfil →</button>
    </div>

    <!-- MISSION 2 -->
    <div class="mission-card mc-cyan" id="m2">
      <div class="mission-top">
        <div class="mission-icon" style="background:rgba(6,182,212,.2)">🤖</div>
        <div class="mission-info"><div class="mission-title">Primera Automatización</div><div class="mission-desc">Crea tu primer flujo automático y experimenta el poder de la plataforma.</div></div>
        <div class="mission-xp">⚡ 200 XP</div>
      </div>
      <div class="mission-checklist">
        <div class="mission-check-item" id="mc2_1" onclick="checkItem('mc2_1','m2','200',4)"><div class="check-circle">✓</div><span>📋 Explorar templates</span></div>
        <div class="mission-check-item" id="mc2_2" onclick="checkItem('mc2_2','m2','200',4)"><div class="check-circle">✓</div><span>⚙️ Configurar trigger</span></div>
        <div class="mission-check-item" id="mc2_3" onclick="checkItem('mc2_3','m2','200',4)"><div class="check-circle">✓</div><span>🔗 Conectar acción</span></div>
        <div class="mission-check-item" id="mc2_4" onclick="checkItem('mc2_4','m2','200',4)"><div class="check-circle">✓</div><span>▶️ Activar y probar</span></div>
      </div>
      <div class="mission-progress-bar"><div class="mpb-fill" id="mp2" style="width:0%;background:var(--cyan)"></div></div>
      <button class="mission-btn" style="background:linear-gradient(135deg,var(--cyan),#0891B2);color:#fff" onclick="completeMission('m2','¡Primera Automatización!','Tu primer flujo automático está en marcha. ¡El trabajo inteligente comienza hoy!','200','badge-automation')">Crear Automatización →</button>
    </div>

    <!-- MISSION 3 -->
    <div class="mission-card mc-gold" id="m3">
      <div class="mission-top">
        <div class="mission-icon" style="background:rgba(245,158,11,.2)">🔗</div>
        <div class="mission-info"><div class="mission-title">Conecta una Integración</div><div class="mission-desc">Vincula una app externa: Slack, Gmail, Salesforce, o cualquiera de las 500+ disponibles.</div></div>
        <div class="mission-xp">⚡ 150 XP</div>
      </div>
      <div class="mission-checklist">
        <div class="mission-check-item" id="mc3_1" onclick="checkItem('mc3_1','m3','150',2)"><div class="check-circle">✓</div><span>🔍 Buscar integración</span></div>
        <div class="mission-check-item" id="mc3_2" onclick="checkItem('mc3_2','m3','150',2)"><div class="check-circle">✓</div><span>✅ Autorizar conexión</span></div>
      </div>
      <div class="mission-progress-bar"><div class="mpb-fill" id="mp3" style="width:0%;background:var(--gold)"></div></div>
      <button class="mission-btn" style="background:linear-gradient(135deg,var(--gold),#D97706);color:#000" onclick="completeMission('m3','¡Integración Conectada!','Tus apps ahora trabajan en armonía. Productividad x10 activada.','150','badge-integration')">Conectar Integración →</button>
    </div>

    <!-- MISSION 4 -->
    <div class="mission-card mc-green" id="m4">
      <div class="mission-top">
        <div class="mission-icon" style="background:rgba(34,197,94,.2)">👥</div>
        <div class="mission-info"><div class="mission-title">Invitar a tu Equipo</div><div class="mission-desc">La transformación digital es un deporte de equipo. Invita a tus colegas clave.</div></div>
        <div class="mission-xp">⚡ 250 XP</div>
      </div>
      <div class="mission-checklist">
        <div class="mission-check-item" id="mc4_1" onclick="checkItem('mc4_1','m4','250',3)"><div class="check-circle">✓</div><span>✉️ Ingresar email(s)</span></div>
        <div class="mission-check-item" id="mc4_2" onclick="checkItem('mc4_2','m4','250',3)"><div class="check-circle">✓</div><span>🎭 Asignar roles</span></div>
        <div class="mission-check-item" id="mc4_3" onclick="checkItem('mc4_3','m4','250',3)"><div class="check-circle">✓</div><span>📨 Enviar invitaciones</span></div>
      </div>
      <div class="mission-progress-bar"><div class="mpb-fill" id="mp4" style="width:0%;background:var(--green)"></div></div>
      <button class="mission-btn" style="background:linear-gradient(135deg,var(--green),#16A34A);color:#fff" onclick="completeMission('m4','¡Equipo Invitado!','Tu equipo ya tiene acceso. Juntos son imparables.','250','badge-team')">Invitar Equipo →</button>
    </div>
  </div>

  <div class="ob-sidebar">
    <div class="sidebar-panel">
      <div class="sp-title">🏅 Mis Badges</div>
      <div class="badges-grid">
        <div class="badge" id="badge-profile"><span class="badge-emoji">🎭</span><div class="badge-name">Identidad</div></div>
        <div class="badge" id="badge-automation"><span class="badge-emoji">🤖</span><div class="badge-name">Automator</div></div>
        <div class="badge" id="badge-integration"><span class="badge-emoji">🔗</span><div class="badge-name">Conector</div></div>
        <div class="badge" id="badge-team"><span class="badge-emoji">👑</span><div class="badge-name">Líder</div></div>
        <div class="badge" id="badge-master"><span class="badge-emoji">🏆</span><div class="badge-name">Master</div></div>
        <div class="badge"><span class="badge-emoji">🌟</span><div class="badge-name">Elite</div></div>
      </div>
    </div>
    <div class="sidebar-panel">
      <div class="sp-title">🏆 Tabla de Líderes</div>
      <div class="leaderboard-list">
        <div class="lb-item"><div class="lb-rank">🥇</div><div class="lb-avatar" style="background:linear-gradient(135deg,#F59E0B,#D97706)">MR</div><div class="lb-name">Marco R.</div><div class="lb-xp">2,840 ⚡</div></div>
        <div class="lb-item"><div class="lb-rank">🥈</div><div class="lb-avatar" style="background:linear-gradient(135deg,#4F46E5,#7C3AED)">PL</div><div class="lb-name">Pedro L.</div><div class="lb-xp">2,120 ⚡</div></div>
        <div class="lb-item"><div class="lb-rank">🥉</div><div class="lb-avatar" style="background:linear-gradient(135deg,#059669,#10B981)">SV</div><div class="lb-name">Sara V.</div><div class="lb-xp">1,890 ⚡</div></div>
        <div class="lb-item you"><div class="lb-rank">4°</div><div class="lb-avatar" style="background:linear-gradient(135deg,var(--purple),var(--cyan))">AG</div><div class="lb-name">Tú (Ana G.) 🔥</div><div class="lb-xp" id="lbXP">0 ⚡</div></div>
        <div class="lb-item"><div class="lb-rank">5°</div><div class="lb-avatar" style="background:linear-gradient(135deg,#DC2626,#EF4444)">LD</div><div class="lb-name">Laura D.</div><div class="lb-xp">650 ⚡</div></div>
      </div>
    </div>
    <div class="sidebar-panel">
      <div class="sp-title">📊 Tu Progreso</div>
      <div style="font-size:28px;font-weight:900;color:var(--purple);text-align:center;margin-bottom:4px" id="progressPct">0%</div>
      <div style="font-size:13px;color:var(--muted);text-align:center;margin-bottom:16px">Onboarding completado</div>
      <div style="font-size:13px;color:var(--muted);display:flex;flex-direction:column;gap:6px">
        <div style="display:flex;justify-content:space-between"><span>⏱️ Tiempo invertido</span><span style="color:var(--text);font-weight:600">0 min</span></div>
        <div style="display:flex;justify-content:space-between"><span>🎯 Misiones completadas</span><span style="color:var(--text);font-weight:600" id="completedCount">0 / 4</span></div>
        <div style="display:flex;justify-content:space-between"><span>⚡ XP ganados</span><span style="color:var(--gold);font-weight:700" id="totalXPStat">0</span></div>
      </div>
    </div>
  </div>
</div>

<!-- REWARD POPUP -->
<div class="reward-overlay" id="rewardOverlay" onclick="closeReward()"></div>
<div class="reward-popup" id="rewardPopup">
  <span class="reward-emoji" id="rewardEmoji">🎉</span>
  <div class="reward-title" id="rewardTitle">¡Misión Completada!</div>
  <div class="reward-desc" id="rewardDesc">Has completado esta misión.</div>
  <div class="reward-xp" id="rewardXP">+100 XP</div>
  <button class="reward-btn" onclick="closeReward()">¡Continuar! →</button>
</div>

<script>
let totalXP=0;const levelThresholds=[0,500,1200,2000];
const missionChecks={m1:[],m2:[],m3:[],m4:[]};
const missionTotals={m1:3,m2:4,m3:2,m4:3};

function checkItem(itemId,missionId,xp,total){
  const item=document.getElementById(itemId);
  if(item.classList.contains('done'))return;
  item.classList.add('done');
  missionChecks[missionId].push(itemId);
  const done=missionChecks[missionId].length;
  const pct=Math.round((done/total)*100);
  document.getElementById('mp'+missionId.replace('m','')).style.width=pct+'%';
}

function completeMission(missionId,title,desc,xpAmount,badgeId){
  const card=document.getElementById(missionId);
  if(card.classList.contains('completed'))return;
  card.classList.add('completed');
  const xp=parseInt(xpAmount);
  totalXP+=xp;
  updateXP();
  unlockBadge(badgeId);
  showReward(title,desc,'+'+xp+' XP ⚡');
  const checks=card.querySelectorAll('.mission-check-item');
  checks.forEach(c=>c.classList.add('done'));
  document.getElementById('mp'+missionId.replace('m','')).style.width='100%';
  updateStats();
  if(totalXP>=700)unlockBadge('badge-master');
}

function updateXP(){
  document.getElementById('xpDisplay').textContent=totalXP.toLocaleString();
  document.getElementById('lbXP').textContent=totalXP.toLocaleString()+' ⚡';
  document.getElementById('totalXPStat').textContent=totalXP;
  const level=totalXP<500?1:totalXP<1200?2:totalXP<2000?3:4;
  const labels=['','Explorador Digital','Digital Pro','Master Digital','Elite Digital'];
  const nextThresholds=[500,1200,2000,99999];
  const prevThresholds=[0,500,1200,2000];
  const pct=Math.min(100,((totalXP-prevThresholds[level-1])/(nextThresholds[level-1]-prevThresholds[level-1]))*100);
  document.getElementById('levelBarFill').style.width=pct+'%';
  document.getElementById('levelPill').textContent='Nivel '+level;
  document.getElementById('levelProgress').textContent=`${totalXP} / ${nextThresholds[level-1]} XP para Nivel ${level+1}`;
}

function updateStats(){
  const completed=document.querySelectorAll('.mission-card.completed').length;
  document.getElementById('missionsCount').textContent=`${completed} / 4 completadas`;
  document.getElementById('completedCount').textContent=`${completed} / 4`;
  document.getElementById('progressPct').textContent=Math.round((completed/4)*100)+'%';
}

function unlockBadge(badgeId){
  const badge=document.getElementById(badgeId);
  if(badge)badge.classList.add('unlocked');
}

function showReward(title,desc,xp){
  document.getElementById('rewardTitle').textContent=title;
  document.getElementById('rewardDesc').textContent=desc;
  document.getElementById('rewardXP').textContent=xp;
  document.getElementById('rewardEmoji').textContent=['🎉','🏆','⚡','🚀','🎊'][Math.floor(Math.random()*5)];
  document.getElementById('rewardOverlay').classList.add('show');
  document.getElementById('rewardPopup').classList.add('show');
  launchConfetti();
}
function closeReward(){
  document.getElementById('rewardOverlay').classList.remove('show');
  document.getElementById('rewardPopup').classList.remove('show');
}

// Simple confetti
function launchConfetti(){
  const canvas=document.getElementById('confettiCanvas');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  const ctx=canvas.getContext('2d');
  const particles=Array.from({length:150},()=>({
    x:Math.random()*canvas.width,y:-20,
    r:Math.random()*6+3,dx:(Math.random()-0.5)*6,dy:Math.random()*8+4,
    color:['#8B5CF6','#06B6D4','#F59E0B','#22C55E','#F43D3D'][Math.floor(Math.random()*5)],
    rot:Math.random()*360,drot:(Math.random()-0.5)*10
  }));
  let frame=0;
  function animate(){
    if(frame++>120){ctx.clearRect(0,0,canvas.width,canvas.height);return}
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p=>{
      p.x+=p.dx;p.y+=p.dy;p.dy+=.1;p.rot+=p.drot;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);
      ctx.fillStyle=p.color;ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r);
      ctx.restore();
    });
    requestAnimationFrame(animate);
  }
  animate();
}
</script>
</body>
</html>
```
