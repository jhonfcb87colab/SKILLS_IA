# SKILL 05: Centro de Ayuda / FAQ con Búsqueda y Categorías Tabbed

## 1. Propósito y Filosofía
Genera centros de ayuda completos con buscador inteligente, categorías por pestañas y preguntas frecuentes en acordeón. Ideal para soporte al cliente, documentation centers, wikis internas y portales de autoservicio.

- **Enfoque:** Autoservicio efectivo, reducción de tickets de soporte, respuesta inmediata.
- **UX:** Búsqueda en tiempo real + pestañas de categoría + FAQs en acordeón + rating de utilidad.
- **Estética:** Clean & professional — azul confianza + blanco + toques verdes de resolución.

---

## 2. Sistema de Diseño

### Paleta Soporte
| Elemento | HEX | Uso |
|---|---|---|
| Fondo | `#F1F5F9` | Canvas |
| Azul confianza | `#2563EB` | CTA, activo, links |
| Verde resuelto | `#059669` | Éxito, answered |
| Naranja urgente | `#D97706` | Atención, pendiente |
| Cards | `#FFFFFF` | Superficie |
| Texto | `#0F172A` | Principal |
| Muted | `#64748B` | Secundario |

---

## 3. Reglas UX
1. **Búsqueda live:** Filtra preguntas en tiempo real sin recarga, resalta términos encontrados.
2. **Pestañas de categoría:** Organización por temas con contador de artículos.
3. **Acordeones FAQ:** Click abre respuesta animada, solo uno abierto por vez (modo exclusivo).
4. **Rating de utilidad:** Thumbs up/down al final de cada respuesta con feedback inmediato.
5. **Artículos relacionados:** Al abrir un FAQ sugiere artículos vinculados.

---

## 4. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Centro de Ayuda</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#F1F5F9;--blue:#2563EB;--green:#059669;--orange:#D97706;
  --white:#FFFFFF;--text:#0F172A;--muted:#64748B;--border:#E2E8F0;
  --blue-light:#EFF6FF;--shadow:0 4px 20px rgba(0,0,0,0.06);
}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh}

/* HERO SEARCH */
.hero-search{background:linear-gradient(135deg,#1e3a8a,var(--blue),#3b82f6);padding:60px 20px;text-align:center}
.hero-title{font-size:36px;font-weight:800;color:#fff;margin-bottom:8px}
.hero-sub{color:rgba(255,255,255,.75);font-size:16px;margin-bottom:28px}
.search-wrap{max-width:600px;margin:0 auto;position:relative}
.search-input{width:100%;padding:16px 56px 16px 20px;border:none;border-radius:12px;font-size:16px;box-shadow:0 8px 30px rgba(0,0,0,.2);outline:none;font-family:inherit}
.search-btn{position:absolute;right:12px;top:50%;transform:translateY(-50%);background:var(--blue);border:none;width:36px;height:36px;border-radius:8px;color:#fff;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center}
.search-suggestions{position:absolute;top:calc(100% + 8px);left:0;right:0;background:#fff;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.15);display:none;z-index:50;overflow:hidden}
.search-suggestions.show{display:block}
.suggestion-item{padding:12px 16px;cursor:pointer;font-size:14px;border-bottom:1px solid var(--border);transition:background .2s;display:flex;align-items:center;gap:10px}
.suggestion-item:hover{background:var(--blue-light);color:var(--blue)}
.suggestion-item:last-child{border:none}
.search-tags{margin-top:16px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.search-tag{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.3);color:#fff;padding:5px 12px;border-radius:20px;font-size:12px;cursor:pointer;transition:background .2s}
.search-tag:hover{background:rgba(255,255,255,.35)}

/* STATS BAR */
.stats-bar{background:var(--white);border-bottom:1px solid var(--border);padding:16px 40px;display:flex;gap:32px;justify-content:center}
.stat-item{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--muted)}
.stat-num{font-size:20px;font-weight:800;color:var(--blue)}

/* LAYOUT */
.main-layout{max-width:1100px;margin:0 auto;padding:32px 20px;display:grid;grid-template-columns:240px 1fr;gap:24px}
@media(max-width:768px){.main-layout{grid-template-columns:1fr}}

/* CATEGORY SIDEBAR */
.cat-sidebar{position:sticky;top:20px;height:fit-content}
.sidebar-panel{background:var(--white);border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--shadow)}
.sidebar-header{padding:16px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);border-bottom:1px solid var(--border)}
.cat-item{display:flex;align-items:center;justify-content:space-between;padding:13px 16px;cursor:pointer;border-bottom:1px solid var(--border);transition:all .2s;font-size:14px;color:var(--text)}
.cat-item:last-child{border:none}
.cat-item:hover,.cat-item.active{background:var(--blue-light);color:var(--blue)}
.cat-item.active{border-left:3px solid var(--blue);font-weight:600}
.cat-left{display:flex;align-items:center;gap:10px}
.cat-count{background:var(--border);color:var(--muted);font-size:11px;font-weight:700;padding:2px 7px;border-radius:10px}
.cat-item.active .cat-count{background:rgba(37,99,235,.1);color:var(--blue)}

/* CONTACT CARD */
.contact-card{background:linear-gradient(135deg,var(--blue),#3b82f6);border-radius:12px;padding:20px;margin-top:16px;color:#fff;text-align:center}
.contact-card h3{font-size:15px;margin-bottom:8px}
.contact-card p{font-size:12px;opacity:.8;margin-bottom:16px;line-height:1.5}
.contact-btn{background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);color:#fff;padding:9px 16px;border-radius:8px;font-size:13px;cursor:pointer;width:100%;margin-bottom:8px;transition:background .2s}
.contact-btn:hover{background:rgba(255,255,255,.35)}

/* CONTENT AREA */
.content-area{}
.content-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.content-title{font-size:22px;font-weight:800}
.results-count{font-size:13px;color:var(--muted)}
.no-results{background:var(--white);border-radius:12px;padding:60px;text-align:center;border:1px solid var(--border);display:none}
.no-results.show{display:block}

/* TABS */
.content-tabs{display:flex;gap:0;border-bottom:2px solid var(--border);margin-bottom:24px;overflow-x:auto}
.tab-btn{padding:12px 20px;font-size:14px;font-weight:500;border:none;background:transparent;color:var(--muted);cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;margin-bottom:-2px;transition:all .2s;font-family:inherit}
.tab-btn:hover{color:var(--blue)}
.tab-btn.active{color:var(--blue);border-bottom-color:var(--blue);font-weight:700}

/* FAQ ACCORDION */
.faq-list{display:flex;flex-direction:column;gap:10px}
.faq-item{background:var(--white);border:1px solid var(--border);border-radius:10px;overflow:hidden;box-shadow:var(--shadow);transition:box-shadow .2s}
.faq-item.open{box-shadow:0 8px 30px rgba(37,99,235,.12);border-color:rgba(37,99,235,.2)}
.faq-question{display:flex;align-items:flex-start;gap:12px;padding:18px;cursor:pointer;user-select:none;transition:background .2s}
.faq-question:hover{background:var(--blue-light)}
.faq-icon{width:28px;height:28px;border-radius:50%;background:var(--blue-light);color:var(--blue);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;font-weight:700;transition:all .3s}
.faq-item.open .faq-icon{background:var(--blue);color:#fff;transform:rotate(45deg)}
.faq-q-text{flex:1;font-size:15px;font-weight:600;line-height:1.4}
.faq-chevron{color:var(--muted);font-size:12px;transition:transform .3s;margin-top:4px}
.faq-item.open .faq-chevron{transform:rotate(180deg)}
.faq-answer{max-height:0;overflow:hidden;transition:max-height .4s ease}
.faq-answer-inner{padding:0 18px 18px 60px;font-size:14px;line-height:1.7;color:var(--muted)}
.faq-answer-inner p{margin-bottom:10px}
.faq-answer-inner ul{margin-left:16px;margin-bottom:10px}
.faq-answer-inner li{margin-bottom:4px}
.faq-highlight{background:#FEF9C3;padding:10px 14px;border-left:3px solid #EAB308;border-radius:0 6px 6px 0;margin-bottom:12px;font-size:13px;color:#92400E}
.faq-rating{display:flex;align-items:center;gap:10px;margin-top:12px;padding-top:12px;border-top:1px solid var(--border)}
.rating-label{font-size:12px;color:var(--muted)}
.rating-btn{padding:5px 12px;border-radius:6px;border:1px solid var(--border);background:transparent;cursor:pointer;font-size:13px;transition:all .2s}
.rating-btn:hover{border-color:var(--blue);color:var(--blue)}
.rating-btn.voted{background:var(--blue);color:#fff;border-color:var(--blue)}
.related-articles{margin-top:14px;padding-top:12px;border-top:1px solid var(--border)}
.related-label{font-size:12px;font-weight:700;color:var(--text);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px}
.related-link{display:block;font-size:13px;color:var(--blue);text-decoration:none;padding:4px 0;cursor:pointer}
.related-link:hover{text-decoration:underline}

/* MARK highlight */
mark{background:#FEF08A;border-radius:2px;padding:0 2px}
</style>
</head>
<body>

<div class="hero-search">
  <h1 class="hero-title">¿En qué te podemos ayudar?</h1>
  <p class="hero-sub">Encuentra respuestas rápidas o contacta a nuestro equipo de soporte</p>
  <div class="search-wrap">
    <input type="text" class="search-input" id="searchInput" placeholder="Buscar: pagos, envíos, devoluciones..." oninput="searchFAQ()" onfocus="showSuggestions()" onblur="hideSuggestions()">
    <button class="search-btn">🔍</button>
    <div class="search-suggestions" id="suggestions">
      <div class="suggestion-item">🔍 ¿Cómo cancelo mi suscripción?</div>
      <div class="suggestion-item">🔍 Métodos de pago aceptados</div>
      <div class="suggestion-item">🔍 Política de devoluciones</div>
      <div class="suggestion-item">🔍 Cambiar contraseña</div>
    </div>
  </div>
  <div class="search-tags">
    <span class="search-tag" onclick="quickSearch('pagos')">💳 Pagos</span>
    <span class="search-tag" onclick="quickSearch('cuenta')">👤 Mi Cuenta</span>
    <span class="search-tag" onclick="quickSearch('envío')">📦 Envíos</span>
    <span class="search-tag" onclick="quickSearch('factura')">🧾 Facturas</span>
    <span class="search-tag" onclick="quickSearch('error')">⚠️ Errores</span>
  </div>
</div>

<div class="stats-bar">
  <div class="stat-item"><span class="stat-num">847</span> artículos de ayuda</div>
  <div class="stat-item"><span class="stat-num">98%</span> casos resueltos en línea</div>
  <div class="stat-item"><span class="stat-num">&lt;2min</span> tiempo de respuesta</div>
</div>

<div class="main-layout">
  <aside class="cat-sidebar">
    <div class="sidebar-panel">
      <div class="sidebar-header">📂 Categorías</div>
      <div class="cat-item active" onclick="selectCat('all',this)"><div class="cat-left"><span>🏠</span> Todos los temas</div><span class="cat-count">68</span></div>
      <div class="cat-item" onclick="selectCat('account',this)"><div class="cat-left"><span>👤</span> Mi Cuenta</div><span class="cat-count">14</span></div>
      <div class="cat-item" onclick="selectCat('billing',this)"><div class="cat-left"><span>💳</span> Facturación</div><span class="cat-count">18</span></div>
      <div class="cat-item" onclick="selectCat('shipping',this)"><div class="cat-left"><span>📦</span> Envíos</div><span class="cat-count">12</span></div>
      <div class="cat-item" onclick="selectCat('tech',this)"><div class="cat-left"><span>⚙️</span> Técnico</div><span class="cat-count">24</span></div>
      <div class="cat-item" onclick="selectCat('security',this)"><div class="cat-left"><span>🔐</span> Seguridad</div><span class="cat-count">8</span></div>
    </div>
    <div class="contact-card">
      <h3>¿No encontraste la respuesta?</h3>
      <p>Nuestro equipo está disponible 24/7 para ayudarte.</p>
      <button class="contact-btn">💬 Chat en vivo</button>
      <button class="contact-btn">📧 Enviar ticket</button>
    </div>
  </aside>

  <div class="content-area">
    <div class="content-header">
      <h2 class="content-title">Preguntas Frecuentes</h2>
      <span class="results-count" id="resultsCount">68 artículos</span>
    </div>

    <div class="content-tabs">
      <button class="tab-btn active" onclick="switchTab('popular',this)">🔥 Populares</button>
      <button class="tab-btn" onclick="switchTab('recent',this)">🕐 Recientes</button>
      <button class="tab-btn" onclick="switchTab('guides',this)">📚 Guías</button>
      <button class="tab-btn" onclick="switchTab('videos',this)">▶️ Videos</button>
    </div>

    <div class="no-results" id="noResults">
      <div style="font-size:48px;margin-bottom:16px">🔍</div>
      <h3 style="margin-bottom:8px">No encontramos resultados</h3>
      <p style="color:var(--muted)">Prueba con otros términos o contacta a soporte.</p>
    </div>

    <div class="faq-list" id="faqList">
      <div class="faq-item" data-cat="billing" data-keywords="pago factura cobro suscripción cancelar">
        <div class="faq-question" onclick="toggleFAQ(this)">
          <div class="faq-icon">+</div>
          <div class="faq-q-text">¿Cómo puedo cancelar mi suscripción?</div>
          <div class="faq-chevron">▼</div>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            <div class="faq-highlight">⚡ La cancelación es inmediata y conservas acceso hasta el fin del período ya pagado.</div>
            <p>Para cancelar tu suscripción sigue estos pasos:</p>
            <ul><li>Inicia sesión en tu cuenta</li><li>Ve a <strong>Configuración → Suscripción</strong></li><li>Haz clic en "Cancelar suscripción"</li><li>Confirma tu decisión en el modal</li></ul>
            <p>Recibirás un email de confirmación. Si tienes problemas, contáctanos por chat.</p>
            <div class="related-articles"><div class="related-label">📎 Relacionados</div><span class="related-link">→ ¿Puedo pausar mi suscripción?</span><span class="related-link">→ Política de reembolsos</span></div>
            <div class="faq-rating"><span class="rating-label">¿Fue útil?</span><button class="rating-btn" onclick="rate(this,'up')">👍 Sí</button><button class="rating-btn" onclick="rate(this,'down')">👎 No</button></div>
          </div>
        </div>
      </div>

      <div class="faq-item" data-cat="billing" data-keywords="pago factura método tarjeta">
        <div class="faq-question" onclick="toggleFAQ(this)">
          <div class="faq-icon">+</div>
          <div class="faq-q-text">¿Qué métodos de pago aceptan?</div>
          <div class="faq-chevron">▼</div>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            <p>Aceptamos los siguientes medios de pago:</p>
            <ul><li>💳 Tarjetas Visa, Mastercard y American Express</li><li>🏦 PSE (Pago en línea bancos colombianos)</li><li>💰 Efecty y Baloto</li><li>📱 Nequi y Daviplata</li><li>🌐 PayPal (pagos internacionales)</li></ul>
            <div class="faq-highlight">🔒 Todos los pagos están cifrados con SSL 256-bit y PCI DSS Nivel 1.</div>
            <div class="faq-rating"><span class="rating-label">¿Fue útil?</span><button class="rating-btn" onclick="rate(this,'up')">👍 Sí</button><button class="rating-btn" onclick="rate(this,'down')">👎 No</button></div>
          </div>
        </div>
      </div>

      <div class="faq-item" data-cat="account" data-keywords="contraseña cuenta acceso login">
        <div class="faq-question" onclick="toggleFAQ(this)">
          <div class="faq-icon">+</div>
          <div class="faq-q-text">Olvidé mi contraseña, ¿cómo la recupero?</div>
          <div class="faq-chevron">▼</div>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            <p>Recuperar tu contraseña es muy sencillo:</p>
            <ul><li>Ve a la página de inicio de sesión</li><li>Haz clic en <strong>"¿Olvidaste tu contraseña?"</strong></li><li>Ingresa tu email registrado</li><li>Revisa tu bandeja de entrada (y spam)</li><li>Haz clic en el enlace enviado (válido 30 minutos)</li></ul>
            <div class="faq-highlight">⏱️ Si no recibes el email en 5 minutos, revisa tu carpeta de spam.</div>
            <div class="faq-rating"><span class="rating-label">¿Fue útil?</span><button class="rating-btn" onclick="rate(this,'up')">👍 Sí</button><button class="rating-btn" onclick="rate(this,'down')">👎 No</button></div>
          </div>
        </div>
      </div>

      <div class="faq-item" data-cat="shipping" data-keywords="envío entrega tiempo pedido">
        <div class="faq-question" onclick="toggleFAQ(this)">
          <div class="faq-icon">+</div>
          <div class="faq-q-text">¿Cuánto tarda en llegar mi pedido?</div>
          <div class="faq-chevron">▼</div>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            <p>Los tiempos de entrega varían según la zona:</p>
            <ul><li>🏙️ <strong>Bogotá, Medellín, Cali:</strong> 1-2 días hábiles</li><li>🌆 <strong>Capitales departamentales:</strong> 2-4 días hábiles</li><li>🌿 <strong>Municipios:</strong> 4-7 días hábiles</li><li>✈️ <strong>Internacional:</strong> 8-15 días hábiles</li></ul>
            <div class="faq-rating"><span class="rating-label">¿Fue útil?</span><button class="rating-btn" onclick="rate(this,'up')">👍 Sí</button><button class="rating-btn" onclick="rate(this,'down')">👎 No</button></div>
          </div>
        </div>
      </div>

      <div class="faq-item" data-cat="tech" data-keywords="error técnico bug problema fallo">
        <div class="faq-question" onclick="toggleFAQ(this)">
          <div class="faq-icon">+</div>
          <div class="faq-q-text">La aplicación no carga, ¿qué puedo hacer?</div>
          <div class="faq-chevron">▼</div>
        </div>
        <div class="faq-answer">
          <div class="faq-answer-inner">
            <p>Prueba estos pasos en orden:</p>
            <ul><li>🔄 Recarga la página (Ctrl+F5 / Cmd+Shift+R)</li><li>🧹 Limpia caché y cookies del navegador</li><li>🌐 Prueba en modo incógnito</li><li>🖥️ Intenta con otro navegador (Chrome, Firefox, Edge)</li><li>📶 Verifica tu conexión a internet</li></ul>
            <div class="faq-highlight">🛠️ Si el problema persiste después de estos pasos, contáctanos con una captura de pantalla del error.</div>
            <div class="faq-rating"><span class="rating-label">¿Fue útil?</span><button class="rating-btn" onclick="rate(this,'up')">👍 Sí</button><button class="rating-btn" onclick="rate(this,'down')">👎 No</button></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
function toggleFAQ(header){
  const item=header.parentElement;
  const answer=item.querySelector('.faq-answer');
  const isOpen=item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>{i.classList.remove('open');i.querySelector('.faq-answer').style.maxHeight='';});
  if(!isOpen){item.classList.add('open');answer.style.maxHeight=answer.scrollHeight+'px'}
}

function rate(btn,type){
  const wrap=btn.parentElement;
  wrap.querySelectorAll('.rating-btn').forEach(b=>b.classList.remove('voted'));
  btn.classList.add('voted');
  btn.textContent=type==='up'?'👍 ¡Gracias!':'👎 Lo sentimos';
  setTimeout(()=>{wrap.innerHTML='<span style="font-size:13px;color:var(--green)">✅ ¡Gracias por tu feedback!</span>'},1200);
}

let currentCat='all';
function selectCat(cat,el){
  currentCat=cat;
  document.querySelectorAll('.cat-item').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
  filterVisible();
}

function filterVisible(){
  const q=document.getElementById('searchInput').value.toLowerCase();
  const items=document.querySelectorAll('.faq-item');
  let count=0;
  items.forEach(item=>{
    const catOk=currentCat==='all'||item.dataset.cat===currentCat;
    const keywords=item.dataset.keywords||'';
    const text=(item.querySelector('.faq-q-text').textContent+' '+keywords).toLowerCase();
    const searchOk=!q||text.includes(q);
    const show=catOk&&searchOk;
    item.style.display=show?'':'none';
    if(show)count++;
    if(q&&show){
      const qEl=item.querySelector('.faq-q-text');
      const orig=qEl.textContent;
      qEl.innerHTML=orig.replace(new RegExp(`(${q})`,'gi'),'<mark>$1</mark>');
    } else if(!q){
      const qEl=item.querySelector('.faq-q-text');
      qEl.innerHTML=qEl.textContent;
    }
  });
  document.getElementById('resultsCount').textContent=count+' artículos';
  document.getElementById('noResults').classList.toggle('show',count===0);
}

function searchFAQ(){filterVisible()}
function quickSearch(term){document.getElementById('searchInput').value=term;filterVisible()}
function showSuggestions(){if(!document.getElementById('searchInput').value)document.getElementById('suggestions').classList.add('show')}
function hideSuggestions(){setTimeout(()=>document.getElementById('suggestions').classList.remove('show'),200)}
function switchTab(tab,btn){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active')}
</script>
</body>
</html>
```
