# SKILL 15: Landing Page Interactiva con Hero Animado y CTA Popup

## 1. Propósito y Filosofía
Genera landing pages de alta conversión con hero animado, secciones de scroll reveal, testimonios en carrusel y modal de captación de leads. Ideal para lanzamientos de productos, campañas y propuestas de valor.

- **Enfoque:** Conversión máxima, storytelling visual, urgencia y prueba social.
- **UX:** Hero animado + scroll reveal por sección + testimonios carrusel + CTA popup lead capture.
- **Estética:** Startup premium — gradiente oscuro + tipografía hero masiva + acentos vibrantes.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Landing Page Premium</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#09090B;--card:rgba(255,255,255,.04);--border:rgba(255,255,255,.1);--accent:#8B5CF6;--cyan:#06B6D4;--green:#22C55E;--text:#FAFAFA;--muted:#A1A1AA}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden}

/* NAV */
.landing-nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 40px;display:flex;justify-content:space-between;align-items:center;transition:background .3s,backdrop-filter .3s}
.landing-nav.scrolled{background:rgba(9,9,11,.85);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.nav-logo{font-size:20px;font-weight:900;letter-spacing:-1px}
.nav-logo span{background:linear-gradient(135deg,var(--accent),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.nav-links{display:flex;gap:24px}
.nav-link{color:var(--muted);font-size:14px;cursor:pointer;transition:color .2s;text-decoration:none}
.nav-link:hover{color:var(--text)}
.nav-cta{background:linear-gradient(135deg,var(--accent),#7C3AED);color:#fff;border:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;transition:all .3s;white-space:nowrap}
.nav-cta:hover{transform:scale(1.05);box-shadow:0 0 20px rgba(139,92,246,.4)}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:120px 20px 80px;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(139,92,246,.2) 0%,transparent 60%)}
.hero-noise{position:absolute;inset:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.3);padding:6px 16px;border-radius:30px;font-size:12px;color:var(--accent);margin-bottom:24px;animation:fadeUp .6s ease}
.hero-badge-dot{width:6px;height:6px;border-radius:50%;background:var(--accent);animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.hero-title{font-size:clamp(36px,7vw,88px);font-weight:900;line-height:1.05;margin-bottom:20px;animation:fadeUp .6s .1s ease both;letter-spacing:-2px}
.hero-gradient-text{background:linear-gradient(135deg,#fff 40%,var(--accent),var(--cyan));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero-desc{font-size:clamp(15px,2vw,20px);color:var(--muted);max-width:580px;margin:0 auto 36px;line-height:1.6;animation:fadeUp .6s .2s ease both}
.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;animation:fadeUp .6s .3s ease both}
.hero-cta{padding:16px 36px;border-radius:10px;font-size:16px;font-weight:700;cursor:pointer;transition:all .3s;border:none}
.cta-primary{background:linear-gradient(135deg,var(--accent),#7C3AED);color:#fff;box-shadow:0 0 30px rgba(139,92,246,.3)}
.cta-primary:hover{transform:translateY(-3px);box-shadow:0 10px 40px rgba(139,92,246,.5)}
.cta-secondary{background:transparent;border:1.5px solid var(--border);color:var(--text)}
.cta-secondary:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.3)}
.hero-social-proof{margin-top:48px;display:flex;flex-direction:column;align-items:center;gap:12px;animation:fadeUp .6s .4s ease both}
.sp-avatars{display:flex}
.sp-avatar{width:36px;height:36px;border-radius:50%;border:2px solid var(--bg);display:flex;align-items:center;justify-content:center;font-size:14px;margin-left:-8px;font-weight:700;color:#fff}
.sp-text{font-size:14px;color:var(--muted)}
.sp-text strong{color:var(--text)}
.hero-counter{position:absolute;bottom:30px;left:50%;transform:translateX(-50%);display:flex;gap:32px;animation:fadeUp .6s .5s ease both}
.hc-item{text-align:center}
.hc-num{font-size:28px;font-weight:900;color:var(--text)}
.hc-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:1px}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}

/* SCROLL REVEAL */
.reveal{opacity:0;transform:translateY(32px);transition:opacity .6s ease,transform .6s ease}
.reveal.visible{opacity:1;transform:translateY(0)}

/* FEATURES */
.features-section{padding:80px 20px;max-width:1100px;margin:0 auto}
.section-label{font-size:12px;text-transform:uppercase;letter-spacing:3px;color:var(--accent);text-align:center;margin-bottom:12px}
.section-title{font-size:clamp(24px,3.5vw,44px);font-weight:800;text-align:center;margin-bottom:12px;letter-spacing:-1px}
.section-desc{color:var(--muted);text-align:center;font-size:16px;max-width:500px;margin:0 auto 48px;line-height:1.6}
.features-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
.feature-card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all .3s;cursor:pointer;position:relative;overflow:hidden}
.feature-card::before{content:'';position:absolute;inset:0;border-radius:16px;background:linear-gradient(135deg,rgba(139,92,246,.1),transparent);opacity:0;transition:opacity .3s}
.feature-card:hover{transform:translateY(-4px);border-color:rgba(139,92,246,.3);box-shadow:0 16px 40px rgba(0,0,0,.3)}
.feature-card:hover::before{opacity:1}
.feature-icon{font-size:32px;margin-bottom:16px;display:block}
.feature-name{font-size:18px;font-weight:700;margin-bottom:8px}
.feature-desc{color:var(--muted);font-size:14px;line-height:1.6}
.feature-link{color:var(--accent);font-size:13px;font-weight:600;margin-top:12px;display:inline-block;cursor:pointer}

/* PRICING PREVIEW */
.pricing-section{padding:80px 20px;border-top:1px solid var(--border)}
.pricing-preview{max-width:800px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:16px}
@media(max-width:600px){.pricing-preview{grid-template-columns:1fr}}
.price-card{border:1px solid var(--border);border-radius:16px;padding:28px;background:var(--card)}
.price-card.featured{border-color:var(--accent);background:rgba(139,92,246,.08);position:relative}
.pc-badge{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:var(--accent);color:#fff;font-size:11px;font-weight:700;padding:3px 12px;border-radius:30px;text-transform:uppercase;white-space:nowrap}
.pc-name{font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:8px}
.pc-price{font-size:42px;font-weight:900;line-height:1;margin-bottom:4px}
.pc-desc{font-size:13px;color:var(--muted);margin-bottom:20px}
.pc-btn{width:100%;padding:12px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;border:1.5px solid var(--border);background:transparent;color:var(--text);transition:all .2s;font-family:inherit}
.price-card.featured .pc-btn{background:var(--accent);color:#fff;border-color:var(--accent)}
.pc-btn:hover{opacity:.85}
.pc-features{margin-top:20px;display:flex;flex-direction:column;gap:8px;font-size:14px;color:var(--muted)}
.pc-feat{display:flex;align-items:center;gap:8px}
.pc-feat-check{color:var(--green);flex-shrink:0}

/* TESTIMONIALS */
.testimonials-section{padding:80px 20px;border-top:1px solid var(--border)}
.testimonials-wrap{max-width:900px;margin:0 auto}
.testimonial-carousel{position:relative;overflow:hidden;border-radius:16px}
.testimonial-slide{display:none;background:var(--card);border:1px solid var(--border);border-radius:16px;padding:36px;animation:fadeSlide .4s ease}
.testimonial-slide.active{display:block}
@keyframes fadeSlide{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.test-quote{font-size:clamp(16px,2vw,22px);line-height:1.6;margin-bottom:24px;color:var(--text)}
.test-quote::before{content:'"';font-size:48px;color:var(--accent);line-height:0;vertical-align:middle;margin-right:4px}
.test-author{display:flex;align-items:center;gap:14px}
.test-avatar{width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#fff;flex-shrink:0}
.test-name{font-weight:700;margin-bottom:2px}
.test-company{font-size:13px;color:var(--muted)}
.test-stars{color:var(--accent);font-size:14px;margin-bottom:4px}
.carousel-controls{display:flex;justify-content:center;gap:8px;margin-top:20px}
.cc-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.2);cursor:pointer;transition:all .2s}
.cc-dot.active{background:var(--accent);width:24px;border-radius:4px}

/* CTA SECTION */
.cta-section{padding:80px 20px;border-top:1px solid var(--border);text-align:center}
.cta-box{max-width:640px;margin:0 auto;background:linear-gradient(135deg,rgba(139,92,246,.15),rgba(6,182,212,.15));border:1px solid rgba(139,92,246,.3);border-radius:24px;padding:48px 32px}
.cta-title{font-size:clamp(24px,3.5vw,44px);font-weight:900;margin-bottom:12px;letter-spacing:-1px}
.cta-desc{color:var(--muted);font-size:16px;margin-bottom:28px;line-height:1.6}
.cta-form{display:flex;gap:8px;max-width:420px;margin:0 auto 16px;flex-wrap:wrap}
.cta-email{flex:1;min-width:200px;padding:14px 18px;border-radius:10px;border:1.5px solid var(--border);background:rgba(255,255,255,.05);color:var(--text);font-size:14px;outline:none;font-family:inherit}
.cta-email:focus{border-color:var(--accent)}
.cta-email::placeholder{color:var(--muted)}
.cta-submit{padding:14px 24px;background:linear-gradient(135deg,var(--accent),#7C3AED);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;transition:all .3s;white-space:nowrap;font-family:inherit}
.cta-submit:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(139,92,246,.4)}
.cta-guarantee{font-size:12px;color:var(--muted)}

/* LEAD POPUP */
.lead-popup{position:fixed;bottom:24px;right:24px;background:#18181B;border:1px solid var(--border);border-radius:16px;padding:20px;width:320px;box-shadow:0 20px 60px rgba(0,0,0,.5);z-index:200;display:none;animation:popIn .4s cubic-bezier(.175,.885,.32,1.275)}
.lead-popup.show{display:block}
@keyframes popIn{from{opacity:0;transform:translateY(20px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}
.popup-close{position:absolute;top:12px;right:12px;background:rgba(255,255,255,.1);border:none;color:var(--muted);width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center}
.popup-emoji{font-size:28px;margin-bottom:10px}
.popup-title{font-size:15px;font-weight:700;margin-bottom:4px}
.popup-desc{font-size:13px;color:var(--muted);margin-bottom:14px;line-height:1.5}
.popup-email{width:100%;padding:10px 12px;border-radius:8px;border:1px solid var(--border);background:rgba(255,255,255,.05);color:var(--text);font-size:13px;margin-bottom:8px;outline:none;font-family:inherit}
.popup-email:focus{border-color:var(--accent)}
.popup-submit{width:100%;padding:10px;background:linear-gradient(135deg,var(--accent),#7C3AED);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:inherit}
.popup-submit:hover{opacity:.9}
.popup-guarantee{font-size:11px;color:var(--muted);text-align:center;margin-top:6px}
.urgency-bar{background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.2);border-radius:6px;padding:6px 10px;margin-bottom:12px;font-size:12px;color:#EF4444;text-align:center}
</style>
</head>
<body>

<nav class="landing-nav" id="mainNav">
  <div class="nav-logo">LAUNCH<span>OS</span></div>
  <div class="nav-links">
    <a class="nav-link">Producto</a>
    <a class="nav-link">Precios</a>
    <a class="nav-link">Testimonios</a>
    <a class="nav-link">Blog</a>
  </div>
  <button class="nav-cta" onclick="showLeadPopup()">Comenzar Gratis →</button>
</nav>

<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-noise"></div>
  <div class="hero-badge"><span class="hero-badge-dot"></span> 🔥 Nuevo en 2026 · Ahora con IA Generativa</div>
  <h1 class="hero-title"><span class="hero-gradient-text">Automatiza tu Empresa</span><br>en 48 Horas</h1>
  <p class="hero-desc">La plataforma que las empresas más innovadoras de LatAm usan para digitalizar procesos, reducir costos y crecer 3x más rápido.</p>
  <div class="hero-actions">
    <button class="hero-cta cta-primary" onclick="showLeadPopup()">🚀 Comenzar 14 días gratis</button>
    <button class="hero-cta cta-secondary" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">Ver cómo funciona →</button>
  </div>
  <div class="hero-social-proof">
    <div class="sp-avatars">
      <div class="sp-avatar" style="background:#4F46E5">👨‍💼</div>
      <div class="sp-avatar" style="background:#059669">👩‍💻</div>
      <div class="sp-avatar" style="background:#DC2626">👨‍🔬</div>
      <div class="sp-avatar" style="background:#D97706">👩‍🎨</div>
      <div class="sp-avatar" style="background:#0891B2">👨‍🏫</div>
    </div>
    <div class="sp-text"><strong>+12,000 empresas</strong> ya automatizan con nosotros · ⭐ 4.9/5 (2,847 reseñas)</div>
  </div>
  <div class="hero-counter">
    <div class="hc-item"><div class="hc-num" data-count="12000">0</div><div class="hc-label">Empresas</div></div>
    <div class="hc-item"><div class="hc-num" data-count="98">0</div><div class="hc-label">% Satisfacción</div></div>
    <div class="hc-item"><div class="hc-num" data-count="3">0</div><div class="hc-label">× Crecimiento</div></div>
  </div>
</section>

<section class="features-section reveal" id="features">
  <div class="section-label">Por qué elegimos LaunchOS</div>
  <h2 class="section-title">Todo lo que necesitas.<br>Nada que no necesites.</h2>
  <p class="section-desc">Una plataforma unificada para automatizar, analizar y crecer. Sin complejidad, sin código.</p>
  <div class="features-grid">
    <div class="feature-card reveal" onclick="showLeadPopup()"><span class="feature-icon">🤖</span><div class="feature-name">IA que trabaja por ti</div><div class="feature-desc">Automatiza decisiones repetitivas con nuestro motor de IA. Desde clasificar leads hasta generar reportes automáticos.</div><span class="feature-link">Explorar funciones →</span></div>
    <div class="feature-card reveal" onclick="showLeadPopup()"><span class="feature-icon">📊</span><div class="feature-name">Analytics en tiempo real</div><div class="feature-desc">Dashboards que se actualizan al instante. Toma decisiones basadas en datos, no en intuición.</div><span class="feature-link">Ver demo →</span></div>
    <div class="feature-card reveal" onclick="showLeadPopup()"><span class="feature-icon">🔗</span><div class="feature-name">500+ Integraciones</div><div class="feature-desc">Conecta con Salesforce, SAP, HubSpot, Slack y más de 500 herramientas empresariales en minutos.</div><span class="feature-link">Ver integraciones →</span></div>
    <div class="feature-card reveal" onclick="showLeadPopup()"><span class="feature-icon">🔐</span><div class="feature-name">Seguridad Enterprise</div><div class="feature-desc">SOC 2 Tipo II, ISO 27001, GDPR compliant. Tus datos siempre protegidos con cifrado AES-256.</div><span class="feature-link">Leer más →</span></div>
    <div class="feature-card reveal" onclick="showLeadPopup()"><span class="feature-icon">⚡</span><div class="feature-name">Setup en 48 horas</div><div class="feature-desc">Nuestro equipo de onboarding garantiza que estés operativo en 2 días o te devolvemos el dinero.</div><span class="feature-link">Ver casos de éxito →</span></div>
    <div class="feature-card reveal" onclick="showLeadPopup()"><span class="feature-icon">🌱</span><div class="feature-name">Escala sin límites</div><div class="feature-desc">Desde 5 hasta 50,000 empleados. LaunchOS crece contigo sin necesidad de migraciones.</div><span class="feature-link">Ver planes →</span></div>
  </div>
</section>

<section class="pricing-section reveal">
  <div class="section-label">Pricing</div>
  <h2 class="section-title" style="text-align:center;margin-bottom:12px">Simple y Transparente</h2>
  <p class="section-desc">Sin sorpresas. Sin letra pequeña. Escala cuando lo necesites.</p>
  <div class="pricing-preview">
    <div class="price-card">
      <div class="pc-name">Starter</div>
      <div class="pc-price">$0</div>
      <div class="pc-desc">Perfecto para comenzar · Sin tarjeta</div>
      <button class="pc-btn" onclick="showLeadPopup()">Comenzar Gratis</button>
      <div class="pc-features">
        <div class="pc-feat"><span class="pc-feat-check">✓</span>5 automatizaciones</div>
        <div class="pc-feat"><span class="pc-feat-check">✓</span>3 usuarios</div>
        <div class="pc-feat"><span class="pc-feat-check">✓</span>Analytics básico</div>
      </div>
    </div>
    <div class="price-card featured">
      <div class="pc-badge">⭐ Más Popular</div>
      <div class="pc-name" style="color:var(--accent)">Pro</div>
      <div class="pc-price" style="color:var(--accent)">$89<span style="font-size:16px;font-weight:400">/mes</span></div>
      <div class="pc-desc">Para equipos que quieren crecer</div>
      <button class="pc-btn" onclick="showLeadPopup()">Prueba 14 días gratis</button>
      <div class="pc-features">
        <div class="pc-feat"><span class="pc-feat-check">✓</span>Automatizaciones ilimitadas</div>
        <div class="pc-feat"><span class="pc-feat-check">✓</span>Usuarios ilimitados</div>
        <div class="pc-feat"><span class="pc-feat-check">✓</span>IA Generativa incluida</div>
        <div class="pc-feat"><span class="pc-feat-check">✓</span>Soporte prioritario 8h</div>
      </div>
    </div>
  </div>
</section>

<section class="testimonials-section reveal">
  <div class="section-label" style="text-align:center">Testimonios</div>
  <h2 class="section-title" style="text-align:center;margin-bottom:12px">Lo que dicen nuestros clientes</h2>
  <p class="section-desc">+12,000 empresas confían en LaunchOS para automatizar su crecimiento.</p>
  <div class="testimonials-wrap">
    <div class="testimonial-carousel">
      <div class="testimonial-slide active">
        <div class="test-stars">★★★★★</div>
        <p class="test-quote">LaunchOS redujo nuestro tiempo de procesamiento de pedidos en un 78%. Lo que antes tomaba 2 horas, ahora ocurre en 12 minutos. El ROI fue positivo desde el primer mes.</p>
        <div class="test-author"><div class="test-avatar" style="background:linear-gradient(135deg,#4F46E5,#7C3AED)">👩‍💼</div><div><div class="test-name">Carolina Mendoza</div><div class="test-company">CFO · Grupo Éxito (Colombia)</div></div></div>
      </div>
      <div class="testimonial-slide">
        <div class="test-stars">★★★★★</div>
        <p class="test-quote">En 6 meses pasamos de procesar 500 a 5,000 órdenes diarias sin contratar personal adicional. LaunchOS es literalmente el miembro más productivo de nuestro equipo.</p>
        <div class="test-author"><div class="test-avatar" style="background:linear-gradient(135deg,#059669,#10B981)">👨‍💻</div><div><div class="test-name">Rodrigo Fernández</div><div class="test-company">CTO · Rappi (México)</div></div></div>
      </div>
      <div class="testimonial-slide">
        <div class="test-stars">★★★★★</div>
        <p class="test-quote">La implementación fue increíblemente rápida. En 36 horas ya teníamos automatizados 23 flujos críticos de RRHH. El equipo de onboarding es excepcional.</p>
        <div class="test-author"><div class="test-avatar" style="background:linear-gradient(135deg,#DC2626,#F97316)">👩‍🔬</div><div><div class="test-name">Valentina Ríos</div><div class="test-company">HR Director · Bancolombia</div></div></div>
      </div>
    </div>
    <div class="carousel-controls">
      <div class="cc-dot active" onclick="goToSlide(0,this)"></div>
      <div class="cc-dot" onclick="goToSlide(1,this)"></div>
      <div class="cc-dot" onclick="goToSlide(2,this)"></div>
    </div>
  </div>
</section>

<section class="cta-section reveal">
  <div class="cta-box">
    <h2 class="cta-title">¿Listo para Automatizar?</h2>
    <p class="cta-desc">Únete a 12,000+ empresas que ya están creciendo con LaunchOS. Comienza gratis, sin tarjeta de crédito.</p>
    <div class="cta-form">
      <input type="email" class="cta-email" placeholder="tu@empresa.com">
      <button class="cta-submit">Comenzar Gratis →</button>
    </div>
    <div class="cta-guarantee">🔒 Sin spam · Sin tarjeta · Cancela cuando quieras</div>
  </div>
</section>

<!-- LEAD POPUP -->
<div class="lead-popup" id="leadPopup">
  <button class="popup-close" onclick="closeLeadPopup()">✕</button>
  <div class="popup-emoji">🎁</div>
  <div class="urgency-bar">⏱️ Oferta especial · Termina en 23:47</div>
  <div class="popup-title">Acceso Pro Gratis — 14 Días</div>
  <div class="popup-desc">Incluye IA Generativa + soporte prioritario. Solo necesitas tu email corporativo.</div>
  <input type="email" class="popup-email" placeholder="tu@empresa.com">
  <button class="popup-submit" onclick="submitLead()">🚀 Activar mi acceso gratis</button>
  <div class="popup-guarantee">✓ Sin tarjeta · ✓ Sin spam · ✓ Cancela gratis</div>
</div>

<script>
// Nav scroll
window.addEventListener('scroll',()=>{document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>50)});

// Counter animation
function animateCounters(){
  document.querySelectorAll('[data-count]').forEach(el=>{
    const target=parseInt(el.dataset.count);
    let current=0;const step=target/60;
    const timer=setInterval(()=>{current+=step;if(current>=target){current=target;clearInterval(timer)}el.textContent=Math.floor(current).toLocaleString();},16);
  });
}

// Scroll reveal
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Testimonials
let currentSlide=0;
function goToSlide(idx,dot){
  document.querySelectorAll('.testimonial-slide').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.cc-dot').forEach(d=>d.classList.remove('active'));
  document.querySelectorAll('.testimonial-slide')[idx].classList.add('active');
  dot.classList.add('active');currentSlide=idx;
}
setInterval(()=>{
  const next=(currentSlide+1)%3;
  const dots=document.querySelectorAll('.cc-dot');
  goToSlide(next,dots[next]);
},5000);

// Lead popup
setTimeout(()=>{document.getElementById('leadPopup').classList.add('show')},8000);
function showLeadPopup(){document.getElementById('leadPopup').classList.add('show')}
function closeLeadPopup(){document.getElementById('leadPopup').classList.remove('show')}
function submitLead(){
  const p=document.getElementById('leadPopup');
  p.innerHTML='<div style="text-align:center;padding:20px"><div style="font-size:48px;margin-bottom:12px">🎉</div><div style="font-size:16px;font-weight:800;margin-bottom:8px">¡Acceso Activado!</div><div style="font-size:13px;color:var(--muted)">Revisa tu email para las instrucciones de acceso.</div></div>';
  setTimeout(()=>closeLeadPopup(),3000);
}

// Countdown timer
function updateCountdown(){
  const el=document.querySelector('.urgency-bar');if(!el)return;
  let stored=parseInt(sessionStorage.getItem('countdown')||'1427');
  stored--;if(stored<0)stored=1427;
  sessionStorage.setItem('countdown',stored);
  const m=Math.floor(stored/60);const s=stored%60;
  el.textContent=`⏱️ Oferta especial · Termina en ${m}:${s.toString().padStart(2,'0')}`;
}
setInterval(updateCountdown,1000);
animateCounters();
</script>
</body>
</html>
```
