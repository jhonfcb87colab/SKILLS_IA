# SKILL 12: Comparador de Productos / Planes con Cards Side-by-Side

## 1. Propósito y Filosofía
Genera páginas de comparación de productos, planes o alternativas con cards interactivas, tooltips de características y tabla comparativa deslizable. Ideal para pricing pages, selección de servicios y análisis de alternativas.

- **Enfoque:** Decisión informada, comparación clara, persuasión hacia la opción óptima.
- **UX:** Cards de plan + tabs de comparación + tooltips de features + highlight de recomendado.
- **Estética:** SaaS moderno — blanco + indigo + card del plan recomendado elevada con glow.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Comparador de Planes</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#F8FAFC;--white:#fff;--text:#0F172A;--muted:#64748B;--border:#E2E8F0;--indigo:#4F46E5;--green:#059669;--gold:#D97706;--red:#DC2626;--shadow:0 4px 24px rgba(0,0,0,.08)}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}

/* HERO */
.pricing-hero{background:linear-gradient(135deg,#1e1b4b,var(--indigo));text-align:center;padding:60px 20px 80px;position:relative;overflow:hidden}
.pricing-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(255,255,255,.05),transparent 60%)}
.hero-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.2);padding:6px 14px;border-radius:30px;font-size:12px;color:#fff;margin-bottom:20px;backdrop-filter:blur(10px)}
.hero-title{font-size:clamp(28px,4vw,52px);font-weight:900;color:#fff;margin-bottom:12px;line-height:1.2}
.hero-sub{color:rgba(255,255,255,.75);font-size:16px;max-width:500px;margin:0 auto 28px;line-height:1.6}
.billing-toggle{display:inline-flex;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);border-radius:30px;padding:4px;gap:4px}
.toggle-opt{padding:8px 20px;border-radius:24px;font-size:14px;cursor:pointer;color:rgba(255,255,255,.7);transition:all .2s}
.toggle-opt.active{background:#fff;color:var(--indigo);font-weight:700}
.save-badge{background:#22C55E;color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;margin-left:6px}

/* PLANS GRID */
.plans-wrap{max-width:1100px;margin:-40px auto 0;padding:0 20px 60px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;position:relative;z-index:1}
.plan-card{background:var(--white);border:2px solid var(--border);border-radius:16px;padding:28px;position:relative;transition:all .3s;display:flex;flex-direction:column}
.plan-card:hover{box-shadow:var(--shadow)}
.plan-card.featured{border-color:var(--indigo);box-shadow:0 0 0 4px rgba(79,70,229,.1),var(--shadow);transform:translateY(-8px)}
.featured-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,var(--indigo),#7C3AED);color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:30px;white-space:nowrap;text-transform:uppercase;letter-spacing:.5px}
.plan-icon{font-size:32px;margin-bottom:12px}
.plan-name{font-size:18px;font-weight:800;margin-bottom:4px}
.plan-desc{font-size:13px;color:var(--muted);margin-bottom:20px;line-height:1.5}
.plan-price{margin-bottom:20px}
.price-num{font-size:42px;font-weight:900;line-height:1}
.price-period{font-size:14px;color:var(--muted)}
.price-orig{font-size:14px;color:var(--muted);text-decoration:line-through;margin-left:6px}
.plan-cta{width:100%;padding:13px;border-radius:10px;font-size:15px;font-weight:700;cursor:pointer;border:2px solid var(--border);background:transparent;color:var(--text);transition:all .3s;font-family:inherit;margin-bottom:20px}
.plan-cta:hover{border-color:var(--indigo);color:var(--indigo)}
.plan-card.featured .plan-cta{background:linear-gradient(135deg,var(--indigo),#7C3AED);color:#fff;border-color:transparent}
.plan-card.featured .plan-cta:hover{box-shadow:0 6px 20px rgba(79,70,229,.4);transform:translateY(-2px)}
.plan-features{flex:1;display:flex;flex-direction:column;gap:8px}
.feature-item{display:flex;align-items:flex-start;gap:10px;font-size:14px;cursor:pointer;padding:4px;border-radius:4px;transition:background .2s}
.feature-item:hover{background:rgba(79,70,229,.05)}
.feature-check{width:20px;height:20px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;margin-top:1px}
.f-yes{background:rgba(5,150,105,.1);color:var(--green)}
.f-no{background:rgba(220,38,38,.08);color:var(--red)}
.f-partial{background:rgba(217,119,6,.1);color:var(--gold)}
.feature-text{flex:1;line-height:1.4}
.feature-info{font-size:11px;color:var(--indigo);cursor:pointer;flex-shrink:0}
.plan-divider{height:1px;background:var(--border);margin:16px 0}
.plan-highlight{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:8px}

/* COMPARISON TABLE */
.compare-section{max-width:1100px;margin:0 auto;padding:0 20px 80px}
.compare-header{text-align:center;margin-bottom:40px}
.compare-title{font-size:28px;font-weight:800;margin-bottom:8px}
.compare-desc{color:var(--muted);font-size:15px}
.compare-tabs{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:28px}
.compare-tab{padding:8px 18px;border:1px solid var(--border);border-radius:6px;font-size:13px;cursor:pointer;background:var(--white);color:var(--muted);transition:all .2s;font-family:inherit}
.compare-tab.active{background:var(--indigo);color:#fff;border-color:var(--indigo)}
.compare-table{background:var(--white);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--shadow)}
.compare-table table{width:100%;border-collapse:collapse}
.compare-table th{padding:16px;text-align:center;font-size:14px;font-weight:700;border-bottom:2px solid var(--border);background:var(--bg)}
.compare-table th:first-child{text-align:left;color:var(--muted);font-size:12px;text-transform:uppercase;letter-spacing:.5px}
.compare-table th.col-featured{background:rgba(79,70,229,.05);color:var(--indigo)}
.compare-table td{padding:14px 16px;border-bottom:1px solid var(--border);font-size:14px;text-align:center;vertical-align:middle}
.compare-table td:first-child{text-align:left;color:var(--text);font-weight:500}
.compare-table tr:last-child td{border-bottom:none}
.compare-table tr:hover td{background:rgba(79,70,229,.02)}
.compare-table td.col-featured{background:rgba(79,70,229,.03)}
.check-yes{color:var(--green);font-size:18px}
.check-no{color:rgba(0,0,0,.2);font-size:16px}
.check-partial{color:var(--gold);font-size:14px;font-weight:600}
.feature-info-inline{display:inline-block;width:16px;height:16px;border-radius:50%;background:var(--border);color:var(--muted);font-size:10px;text-align:center;line-height:16px;cursor:pointer;margin-left:4px;vertical-align:middle}
.feature-info-inline:hover{background:var(--indigo);color:#fff}

/* TOOLTIP */
.tooltip-box{position:fixed;background:var(--text);color:#fff;border-radius:8px;padding:10px 14px;font-size:12px;line-height:1.5;max-width:220px;pointer-events:none;z-index:999;opacity:0;transform:translateY(4px);transition:all .15s;box-shadow:0 8px 24px rgba(0,0,0,.2)}
.tooltip-box.show{opacity:1;transform:translateY(0)}

/* FAQ MINI */
.faq-mini{max-width:700px;margin:0 auto 60px;padding:0 20px}
.faq-mini-title{font-size:22px;font-weight:800;text-align:center;margin-bottom:24px}
.faq-mini-item{border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-bottom:8px}
.faq-mini-q{padding:14px 16px;cursor:pointer;font-size:14px;font-weight:600;display:flex;justify-content:space-between;align-items:center;transition:background .2s}
.faq-mini-q:hover{background:rgba(79,70,229,.04)}
.faq-mini-a{max-height:0;overflow:hidden;transition:max-height .3s ease;padding:0 16px;font-size:14px;color:var(--muted);line-height:1.6}
.faq-mini-item.open .faq-mini-a{max-height:200px;padding:12px 16px}
.faq-arrow{transition:transform .3s;color:var(--muted)}
.faq-mini-item.open .faq-arrow{transform:rotate(180deg)}
</style>
</head>
<body>

<div class="pricing-hero">
  <div class="hero-badge">🏷️ Precios Transparentes · Sin Letra Pequeña</div>
  <h1 class="hero-title">El Plan Perfecto para<br>Tu Empresa</h1>
  <p class="hero-sub">Desde equipos de 1 hasta organizaciones de 10,000 empleados. Escala sin fricciones.</p>
  <div class="billing-toggle">
    <div class="toggle-opt active" onclick="switchBilling('monthly',this)">Mensual</div>
    <div class="toggle-opt" onclick="switchBilling('annual',this)">Anual <span class="save-badge">-20%</span></div>
  </div>
</div>

<div class="plans-wrap">
  <div class="plan-card">
    <div class="plan-icon">🌱</div>
    <div class="plan-name">Starter</div>
    <div class="plan-desc">Perfecto para freelancers y equipos pequeños que inician su transformación digital.</div>
    <div class="plan-price">
      <span class="price-num" data-monthly="$0" data-annual="$0">$0</span>
      <span class="price-period">/ mes · Gratis para siempre</span>
    </div>
    <button class="plan-cta">Comenzar Gratis →</button>
    <div class="plan-highlight">Lo que incluye</div>
    <div class="plan-features">
      <div class="feature-item" onmouseenter="showTip(event,'Hasta 3 usuarios activos simultáneos')" onmouseleave="hideTip()"><div class="feature-check f-yes">✓</div><div class="feature-text">Hasta 3 usuarios</div><span class="feature-info">ⓘ</span></div>
      <div class="feature-item" onmouseenter="showTip(event,'5GB de almacenamiento en la nube')" onmouseleave="hideTip()"><div class="feature-check f-yes">✓</div><div class="feature-text">5 GB almacenamiento</div><span class="feature-info">ⓘ</span></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">3 proyectos activos</div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">Dashboard básico</div></div>
      <div class="feature-item"><div class="feature-check f-no">✕</div><div class="feature-text" style="color:var(--muted)">IA y automatización</div></div>
      <div class="feature-item"><div class="feature-check f-no">✕</div><div class="feature-text" style="color:var(--muted)">API Access</div></div>
      <div class="feature-item"><div class="feature-check f-no">✕</div><div class="feature-text" style="color:var(--muted)">Soporte prioritario</div></div>
    </div>
  </div>

  <div class="plan-card featured">
    <div class="featured-badge">⭐ Más Popular</div>
    <div class="plan-icon">🚀</div>
    <div class="plan-name" style="color:var(--indigo)">Pro Business</div>
    <div class="plan-desc">El plan elegido por el 78% de empresas medianas. Todo lo que necesitas para crecer.</div>
    <div class="plan-price">
      <span class="price-num" style="color:var(--indigo)" data-monthly="$89" data-annual="$71">$89</span>
      <span class="price-period">/ mes por equipo</span>
      <span class="price-orig" id="proOrig"></span>
    </div>
    <button class="plan-cta">Iniciar Prueba 14 días →</button>
    <div class="plan-highlight" style="color:var(--indigo)">Todo en Starter, más</div>
    <div class="plan-features">
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text"><strong>Usuarios ilimitados</strong></div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text"><strong>500 GB almacenamiento</strong></div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text"><strong>Proyectos ilimitados</strong></div></div>
      <div class="feature-item" onmouseenter="showTip(event,'IA para análisis predictivo, automatización de flujos y asistente inteligente.')" onmouseleave="hideTip()"><div class="feature-check f-yes">✓</div><div class="feature-text"><strong>IA y automatización</strong></div><span class="feature-info">ⓘ</span></div>
      <div class="feature-item" onmouseenter="showTip(event,'API REST y webhooks para integraciones con tus sistemas existentes.')" onmouseleave="hideTip()"><div class="feature-check f-yes">✓</div><div class="feature-text"><strong>API Access completo</strong></div><span class="feature-info">ⓘ</span></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text"><strong>Analytics avanzado</strong></div></div>
      <div class="feature-item"><div class="feature-check f-partial">◐</div><div class="feature-text">Soporte por email (8h)</div></div>
    </div>
  </div>

  <div class="plan-card">
    <div class="plan-icon">🏢</div>
    <div class="plan-name">Enterprise</div>
    <div class="plan-desc">Para grandes organizaciones con necesidades de compliance, seguridad y personalización total.</div>
    <div class="plan-price">
      <span class="price-num" data-monthly="Custom" data-annual="Custom">Custom</span>
      <span class="price-period">/ Precio según volumen</span>
    </div>
    <button class="plan-cta">Hablar con Ventas →</button>
    <div class="plan-highlight">Todo en Pro, más</div>
    <div class="plan-features">
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">SLA 99.99% uptime</div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">Almacenamiento ilimitado</div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">On-premise disponible</div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">SSO / SAML 2.0</div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">Auditoría y compliance</div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">Soporte 24/7 dedicado</div></div>
      <div class="feature-item"><div class="feature-check f-yes">✓</div><div class="feature-text">Onboarding personalizado</div></div>
    </div>
  </div>
</div>

<div class="compare-section">
  <div class="compare-header">
    <h2 class="compare-title">Comparación Detallada</h2>
    <p class="compare-desc">Revisa todas las funcionalidades disponibles por plan</p>
  </div>
  <div class="compare-tabs">
    <button class="compare-tab active" onclick="filterFeatures('all',this)">📋 Todo</button>
    <button class="compare-tab" onclick="filterFeatures('core',this)">⚡ Core</button>
    <button class="compare-tab" onclick="filterFeatures('ai',this)">🤖 IA</button>
    <button class="compare-tab" onclick="filterFeatures('security',this)">🔐 Seguridad</button>
    <button class="compare-tab" onclick="filterFeatures('support',this)">💬 Soporte</button>
  </div>
  <div class="compare-table">
    <table>
      <thead><tr><th>Funcionalidad</th><th>Starter</th><th class="col-featured">⭐ Pro Business</th><th>Enterprise</th></tr></thead>
      <tbody>
        <tr data-cat="core"><td>Usuarios <span class="feature-info-inline" onmouseenter="showTip(event,'Número de usuarios simultáneos con acceso a la plataforma')" onmouseleave="hideTip()">ⓘ</span></td><td>Hasta 3</td><td class="col-featured"><strong>Ilimitados</strong></td><td>Ilimitados</td></tr>
        <tr data-cat="core"><td>Almacenamiento</td><td>5 GB</td><td class="col-featured"><strong>500 GB</strong></td><td>Ilimitado</td></tr>
        <tr data-cat="core"><td>Proyectos activos</td><td>3</td><td class="col-featured"><strong>Ilimitados</strong></td><td>Ilimitados</td></tr>
        <tr data-cat="core"><td>Colaboración en tiempo real</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-yes">✓</span></td><td><span class="check-yes">✓</span></td></tr>
        <tr data-cat="ai"><td>IA Generativa</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-yes">✓</span></td><td><span class="check-yes">✓</span></td></tr>
        <tr data-cat="ai"><td>Automatización de flujos</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-partial">Básico</span></td><td><span class="check-yes">✓ Avanzado</span></td></tr>
        <tr data-cat="ai"><td>Analytics predictivo</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-yes">✓</span></td><td><span class="check-yes">✓ ML Custom</span></td></tr>
        <tr data-cat="security"><td>SSO / SAML 2.0</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-no">—</span></td><td><span class="check-yes">✓</span></td></tr>
        <tr data-cat="security"><td>Cifrado en reposo</td><td><span class="check-yes">✓</span></td><td class="col-featured"><span class="check-yes">✓</span></td><td><span class="check-yes">✓ AES-256</span></td></tr>
        <tr data-cat="security"><td>Auditoría de accesos</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-partial">30 días</span></td><td><span class="check-yes">✓ Ilimitado</span></td></tr>
        <tr data-cat="support"><td>Documentación</td><td><span class="check-yes">✓</span></td><td class="col-featured"><span class="check-yes">✓</span></td><td><span class="check-yes">✓</span></td></tr>
        <tr data-cat="support"><td>Chat / Email soporte</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-partial">8h respuesta</span></td><td><span class="check-yes">✓ 1h respuesta</span></td></tr>
        <tr data-cat="support"><td>Manager dedicado</td><td><span class="check-no">—</span></td><td class="col-featured"><span class="check-no">—</span></td><td><span class="check-yes">✓</span></td></tr>
      </tbody>
    </table>
  </div>
</div>

<div class="faq-mini">
  <h3 class="faq-mini-title">Preguntas Frecuentes</h3>
  <div class="faq-mini-item"><div class="faq-mini-q" onclick="toggleFAQ(this)"><span>¿Puedo cambiar de plan en cualquier momento?</span><span class="faq-arrow">▼</span></div><div class="faq-mini-a">Sí, puedes subir o bajar de plan en cualquier momento desde la configuración de tu cuenta. Los cambios aplican inmediatamente y el cobro se prorratea automáticamente.</div></div>
  <div class="faq-mini-item"><div class="faq-mini-q" onclick="toggleFAQ(this)"><span>¿Qué pasa con mis datos si cancelo?</span><span class="faq-arrow">▼</span></div><div class="faq-mini-a">Tienes 30 días tras la cancelación para exportar todos tus datos en formatos estándar (CSV, JSON, PDF). Después de ese período, los datos son eliminados de forma segura.</div></div>
  <div class="faq-mini-item"><div class="faq-mini-q" onclick="toggleFAQ(this)"><span>¿La prueba de 14 días requiere tarjeta de crédito?</span><span class="faq-arrow">▼</span></div><div class="faq-mini-a">No. Puedes iniciar tu prueba gratuita del plan Pro Business sin ingresar datos de pago. Solo te pediremos la información de facturación cuando decidas continuar.</div></div>
  <div class="faq-mini-item"><div class="faq-mini-q" onclick="toggleFAQ(this)"><span>¿Ofrecen descuentos para ONGs y educación?</span><span class="faq-arrow">▼</span></div><div class="faq-mini-a">Sí. Ofrecemos hasta un 50% de descuento para organizaciones sin fines de lucro verificadas y hasta un 40% para instituciones educativas acreditadas. Contacta a ventas.</div></div>
</div>

<!-- TOOLTIP -->
<div class="tooltip-box" id="tooltip"></div>

<script>
let billing='monthly';
function switchBilling(type,btn){
  billing=type;
  document.querySelectorAll('.toggle-opt').forEach(o=>o.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-monthly]').forEach(el=>{
    el.textContent=el.dataset[type];
  });
  document.getElementById('proOrig').textContent=type==='annual'?'antes $89':'';
}

function filterFeatures(cat,btn){
  document.querySelectorAll('.compare-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('[data-cat]').forEach(row=>{
    row.style.display=(cat==='all'||row.dataset.cat===cat)?'':'none';
  });
}

function toggleFAQ(q){
  const item=q.parentElement;item.classList.toggle('open');
}

const tip=document.getElementById('tooltip');
function showTip(e,text){tip.textContent=text;tip.style.left=Math.min(e.clientX+12,window.innerWidth-240)+'px';tip.style.top=(e.clientY-50)+'px';tip.classList.add('show')}
function hideTip(){tip.classList.remove('show')}
</script>
</body>
</html>
```
