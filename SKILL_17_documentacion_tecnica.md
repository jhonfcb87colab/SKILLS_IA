# SKILL 17: Portal de Documentación Técnica con Sidebar y Código Resaltado

## 1. Propósito y Filosofía
Genera portales de documentación técnica estilo Stripe/Notion con sidebar de navegación pegajosa, resaltado de sintaxis de código, pestañas de lenguaje y búsqueda contextual.

- **Enfoque:** Developer experience excelente, encontrar información rápido, explorar sin frustraciones.
- **UX:** Sidebar sticky con índice + tabs de lenguaje + código copiable + búsqueda + anchors.
- **Estética:** Docs dark mode — fondo oscuro elegante + código resaltado + tipografía técnica.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Documentación Técnica</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0F1117;--sidebar-bg:#1A1D27;--content-bg:#0F1117;--code-bg:#1E2130;--border:#2D3148;--accent:#5E81F4;--green:#3DBA78;--red:#F43D3D;--gold:#F4A135;--text:#E0E4F0;--muted:#6B7A9F;--code-text:#A8B5D8}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;flex-direction:column}

/* TOP NAV */
.docs-topnav{background:var(--sidebar-bg);border-bottom:1px solid var(--border);padding:0 24px;height:56px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100}
.docs-logo{display:flex;align-items:center;gap:10px}
.logo-icon{width:28px;height:28px;background:linear-gradient(135deg,var(--accent),#8B5CF6);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px}
.logo-name{font-size:15px;font-weight:800;color:var(--text)}
.logo-name span{color:var(--accent)}
.docs-version{font-size:11px;background:rgba(94,129,244,.15);border:1px solid rgba(94,129,244,.3);color:var(--accent);padding:2px 8px;border-radius:4px;margin-left:8px}
.docs-search{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid var(--border);border-radius:8px;padding:7px 12px;cursor:pointer;color:var(--muted);font-size:13px;transition:border-color .2s}
.docs-search:hover{border-color:var(--accent)}
.search-shortcut{background:rgba(255,255,255,.08);border:1px solid var(--border);border-radius:4px;padding:1px 5px;font-size:11px}
.docs-topright{display:flex;gap:8px;align-items:center}
.top-link{color:var(--muted);font-size:13px;text-decoration:none;cursor:pointer;padding:5px 10px;border-radius:6px;transition:background .2s}
.top-link:hover{background:rgba(255,255,255,.05);color:var(--text)}

/* LAYOUT */
.docs-layout{display:flex;flex:1;max-width:1300px;margin:0 auto;width:100%}

/* SIDEBAR */
.docs-sidebar{width:260px;flex-shrink:0;position:sticky;top:56px;height:calc(100vh - 56px);overflow-y:auto;border-right:1px solid var(--border);padding:20px 0;background:var(--sidebar-bg)}
.docs-sidebar::-webkit-scrollbar{width:4px}
.docs-sidebar::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.sidebar-section{margin-bottom:24px}
.sidebar-section-title{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);font-weight:700;padding:0 20px 8px}
.sidebar-link{display:flex;align-items:center;gap:8px;padding:7px 20px;font-size:14px;color:var(--muted);cursor:pointer;transition:all .2s;border-left:2px solid transparent;text-decoration:none;position:relative}
.sidebar-link:hover{color:var(--text);background:rgba(255,255,255,.03)}
.sidebar-link.active{color:var(--accent);border-left-color:var(--accent);background:rgba(94,129,244,.06)}
.sidebar-badge{font-size:10px;padding:2px 6px;border-radius:3px;font-weight:700;margin-left:auto}
.badge-new{background:rgba(61,186,120,.15);color:var(--green);border:1px solid rgba(61,186,120,.3)}
.badge-beta{background:rgba(244,161,53,.15);color:var(--gold);border:1px solid rgba(244,161,53,.3)}
.sidebar-sub{padding-left:36px;font-size:13px}

/* CONTENT */
.docs-content{flex:1;min-width:0;padding:40px 48px}
.content-header{margin-bottom:32px;padding-bottom:24px;border-bottom:1px solid var(--border)}
.content-breadcrumb{font-size:12px;color:var(--muted);margin-bottom:12px;display:flex;gap:6px;align-items:center}
.breadcrumb-sep{opacity:.4}
.content-title{font-size:36px;font-weight:900;margin-bottom:12px;letter-spacing:-1px}
.content-desc{font-size:16px;color:var(--muted);line-height:1.6;max-width:680px}
.content-meta{display:flex;gap:16px;margin-top:16px;font-size:12px;color:var(--muted)}

/* ARTICLE CONTENT */
.article h2{font-size:22px;font-weight:800;margin:36px 0 14px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.article h3{font-size:17px;font-weight:700;margin:28px 0 10px;color:var(--text)}
.article p{font-size:15px;line-height:1.75;color:rgba(224,228,240,.85);margin-bottom:14px}
.article a{color:var(--accent);text-decoration:none}
.article a:hover{text-decoration:underline}
.article ul,.article ol{padding-left:20px;margin-bottom:14px}
.article li{font-size:15px;line-height:1.75;color:rgba(224,228,240,.85);margin-bottom:4px}
.article strong{color:var(--text)}

/* CALLOUTS */
.callout{border-radius:8px;padding:14px 16px;margin:16px 0;display:flex;gap:12px;font-size:14px;line-height:1.6}
.callout-info{background:rgba(94,129,244,.1);border:1px solid rgba(94,129,244,.2);color:var(--text)}
.callout-warn{background:rgba(244,161,53,.1);border:1px solid rgba(244,161,53,.2);color:var(--text)}
.callout-success{background:rgba(61,186,120,.1);border:1px solid rgba(61,186,120,.2);color:var(--text)}
.callout-danger{background:rgba(244,61,61,.1);border:1px solid rgba(244,61,61,.2);color:var(--text)}
.callout-icon{font-size:16px;flex-shrink:0;margin-top:1px}

/* CODE BLOCKS */
.code-wrap{margin:16px 0;border-radius:10px;overflow:hidden;border:1px solid var(--border)}
.code-tabs{display:flex;background:#151821;border-bottom:1px solid var(--border)}
.code-tab{padding:9px 16px;font-size:12px;font-weight:600;cursor:pointer;color:var(--muted);transition:all .2s;border-right:1px solid var(--border)}
.code-tab:hover{color:var(--text)}
.code-tab.active{color:var(--accent);background:var(--code-bg)}
.code-actions{margin-left:auto;display:flex;align-items:center;gap:4px;padding:0 8px}
.copy-btn{background:transparent;border:1px solid var(--border);color:var(--muted);padding:4px 10px;border-radius:4px;font-size:11px;cursor:pointer;transition:all .2s;font-family:inherit}
.copy-btn:hover{background:rgba(255,255,255,.05);color:var(--text)}
.copy-btn.copied{color:var(--green);border-color:var(--green)}
.code-panel{display:none;background:var(--code-bg);padding:20px}
.code-panel.active{display:block}
.code-panel pre{font-family:'Consolas','Courier New',monospace;font-size:13px;line-height:1.7;overflow-x:auto;color:var(--code-text)}
.code-panel pre::-webkit-scrollbar{height:4px}
.code-panel pre::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px}
.kw{color:#C792EA}.str{color:#C3E88D}.num{color:#F78C6C}.fn{color:#82AAFF}
.cmt{color:#546E7A;font-style:italic}.obj{color:#FFCB6B}.prop{color:#80CBC4}
.line-num{color:var(--border);user-select:none;margin-right:16px;display:inline-block;width:20px;text-align:right}

/* API TABLE */
.api-table{width:100%;border-collapse:collapse;font-size:14px;margin:16px 0}
.api-table th{padding:10px 14px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);border-bottom:2px solid var(--border);background:rgba(255,255,255,.02)}
.api-table td{padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.04);vertical-align:top;line-height:1.5}
.api-table tr:hover td{background:rgba(255,255,255,.02)}
.param-name{font-family:monospace;font-size:13px;color:var(--accent);font-weight:600}
.param-type{font-family:monospace;font-size:12px;color:var(--gold);background:rgba(244,161,53,.1);padding:2px 6px;border-radius:4px}
.param-required{font-size:10px;font-weight:700;color:var(--red);text-transform:uppercase}
.param-desc{color:var(--muted);font-size:13px}

/* RIGHT TOC */
.docs-toc{width:220px;flex-shrink:0;position:sticky;top:56px;height:calc(100vh - 56px);overflow-y:auto;padding:24px 16px;border-left:1px solid var(--border)}
.toc-title{font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:var(--muted);font-weight:700;margin-bottom:12px}
.toc-link{display:block;font-size:13px;color:var(--muted);cursor:pointer;padding:4px 0 4px 8px;border-left:1px solid var(--border);margin-bottom:2px;transition:all .2s;text-decoration:none}
.toc-link:hover,.toc-link.active{color:var(--accent);border-left-color:var(--accent)}
.toc-link.sub{padding-left:20px;font-size:12px}
</style>
</head>
<body>

<nav class="docs-topnav">
  <div class="docs-logo">
    <div class="logo-icon">📖</div>
    <span class="logo-name">DOCS<span>HUB</span></span>
    <span class="docs-version">v5.2</span>
  </div>
  <div class="docs-search" onclick="alert('Búsqueda: Ctrl+K')">
    🔍 Buscar documentación...
    <span class="search-shortcut">Ctrl K</span>
  </div>
  <div class="docs-topright">
    <span class="top-link">Guías</span>
    <span class="top-link">API Ref</span>
    <span class="top-link">Changelog</span>
    <span class="top-link">GitHub ↗</span>
  </div>
</nav>

<div class="docs-layout">
  <aside class="docs-sidebar">
    <div class="sidebar-section">
      <div class="sidebar-section-title">Inicio</div>
      <a class="sidebar-link">🏠 Introducción</a>
      <a class="sidebar-link">⚡ Quickstart</a>
      <a class="sidebar-link">🔧 Instalación</a>
      <a class="sidebar-link">📋 Changelog <span class="sidebar-badge badge-new">New</span></a>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Autenticación</div>
      <a class="sidebar-link active">🔑 API Keys</a>
      <a class="sidebar-link sidebar-sub">↳ Generar keys</a>
      <a class="sidebar-link sidebar-sub">↳ Rotación</a>
      <a class="sidebar-link">🔐 OAuth 2.0</a>
      <a class="sidebar-link">🛡️ JWT Tokens</a>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">API Reference</div>
      <a class="sidebar-link">📡 Endpoints</a>
      <a class="sidebar-link">📦 Requests</a>
      <a class="sidebar-link">📤 Responses</a>
      <a class="sidebar-link">⚠️ Errores</a>
      <a class="sidebar-link">🔄 Webhooks <span class="sidebar-badge badge-beta">Beta</span></a>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">SDKs</div>
      <a class="sidebar-link">🟨 JavaScript</a>
      <a class="sidebar-link">🐍 Python</a>
      <a class="sidebar-link">☕ Java</a>
      <a class="sidebar-link">🦀 Rust</a>
      <a class="sidebar-link">🐘 PHP</a>
    </div>
    <div class="sidebar-section">
      <div class="sidebar-section-title">Guías</div>
      <a class="sidebar-link">📚 Mejores prácticas</a>
      <a class="sidebar-link">🚀 Producción</a>
      <a class="sidebar-link">📊 Rate Limits</a>
      <a class="sidebar-link">🔍 Debugging</a>
    </div>
  </aside>

  <main class="docs-content">
    <div class="content-header">
      <div class="content-breadcrumb"><span>Docs</span><span class="breadcrumb-sep">›</span><span>Autenticación</span><span class="breadcrumb-sep">›</span><span style="color:var(--text)">API Keys</span></div>
      <h1 class="content-title">Autenticación con API Keys</h1>
      <p class="content-desc">Aprende a generar, gestionar y rotar API Keys para autenticar todas tus solicitudes a la API de LaunchOS de forma segura.</p>
      <div class="content-meta">
        <span>📅 Actualizado: Nov 9, 2026</span>
        <span>⏱️ 8 min de lectura</span>
        <span>🎯 Intermedio</span>
      </div>
    </div>

    <div class="article">
      <h2>¿Qué es una API Key?</h2>
      <p>Una API Key es un token de autenticación único que identifica tu aplicación ante los servicios de LaunchOS. Debes incluirla en cada solicitud HTTP como header de autorización.</p>

      <div class="callout callout-warn">
        <span class="callout-icon">⚠️</span>
        <div><strong>Importante:</strong> Nunca expongas tu API Key en el código cliente (JavaScript del browser, repositorios públicos o logs). Siempre úsala en el servidor.</div>
      </div>

      <h2>Generar tu API Key</h2>
      <p>Para generar una nueva API Key, ve a tu Dashboard → Configuración → API Keys → "Generar nueva key".</p>

      <div class="callout callout-info">
        <span class="callout-icon">ℹ️</span>
        <div>Las API Keys se muestran completas <strong>una sola vez</strong> al momento de creación. Guárdalas en un gestor de secretos (AWS Secrets Manager, HashiCorp Vault, etc.).</div>
      </div>

      <h2>Autenticar solicitudes</h2>
      <p>Incluye tu API Key en el header <code style="background:var(--code-bg);padding:2px 6px;border-radius:4px;font-family:monospace;font-size:13px;color:var(--gold)">Authorization</code> de cada solicitud:</p>

      <div class="code-wrap">
        <div class="code-tabs">
          <button class="code-tab active" onclick="switchCode(this,'tab-js')">JavaScript</button>
          <button class="code-tab" onclick="switchCode(this,'tab-py')">Python</button>
          <button class="code-tab" onclick="switchCode(this,'tab-curl')">cURL</button>
          <button class="code-tab" onclick="switchCode(this,'tab-java')">Java</button>
          <div class="code-actions"><button class="copy-btn" onclick="copyCode(this)">📋 Copiar</button></div>
        </div>
        <div class="code-panel active" id="tab-js">
          <pre><span class="line-num">1</span><span class="kw">import</span> <span class="obj">LaunchOS</span> <span class="kw">from</span> <span class="str">'@launchos/sdk'</span>
<span class="line-num">2</span>
<span class="line-num">3</span><span class="cmt">// Inicializar cliente con API Key</span>
<span class="line-num">4</span><span class="kw">const</span> <span class="prop">client</span> = <span class="kw">new</span> <span class="fn">LaunchOS</span>({
<span class="line-num">5</span>  <span class="prop">apiKey</span>: process.env.<span class="obj">LAUNCHOS_API_KEY</span>,
<span class="line-num">6</span>  <span class="prop">environment</span>: <span class="str">'production'</span>
<span class="line-num">7</span>})
<span class="line-num">8</span>
<span class="line-num">9</span><span class="cmt">// Hacer tu primera solicitud</span>
<span class="line-num">10</span><span class="kw">const</span> <span class="prop">response</span> = <span class="kw">await</span> client.<span class="fn">automations</span>.<span class="fn">list</span>()
<span class="line-num">11</span>console.<span class="fn">log</span>(response.data)</pre>
        </div>
        <div class="code-panel" id="tab-py">
          <pre><span class="line-num">1</span><span class="kw">import</span> <span class="obj">launchos</span>
<span class="line-num">2</span><span class="kw">import</span> os
<span class="line-num">3</span>
<span class="line-num">4</span><span class="cmt"># Inicializar cliente</span>
<span class="line-num">5</span><span class="obj">launchos</span>.api_key = os.getenv(<span class="str">'LAUNCHOS_API_KEY'</span>)
<span class="line-num">6</span>
<span class="line-num">7</span><span class="cmt"># Listar automatizaciones</span>
<span class="line-num">8</span>response = <span class="obj">launchos</span>.<span class="fn">Automation</span>.<span class="fn">list</span>()
<span class="line-num">9</span><span class="fn">print</span>(response)</pre>
        </div>
        <div class="code-panel" id="tab-curl">
          <pre><span class="line-num">1</span><span class="cmt"># Autenticar con API Key en header</span>
<span class="line-num">2</span>curl -X GET <span class="str">https://api.launchos.com/v1/automations</span> \
<span class="line-num">3</span>  -H <span class="str">"Authorization: Bearer lk_live_xxxxxxxxxxxx"</span> \
<span class="line-num">4</span>  -H <span class="str">"Content-Type: application/json"</span>
<span class="line-num">5</span>
<span class="line-num">6</span><span class="cmt"># Respuesta esperada: 200 OK + JSON</span></pre>
        </div>
        <div class="code-panel" id="tab-java">
          <pre><span class="line-num">1</span><span class="kw">import</span> <span class="obj">com.launchos.LaunchOSClient</span>;
<span class="line-num">2</span>
<span class="line-num">3</span><span class="kw">public class</span> <span class="obj">Main</span> {
<span class="line-num">4</span>  <span class="kw">public static void</span> <span class="fn">main</span>(String[] args) {
<span class="line-num">5</span>    <span class="obj">LaunchOSClient</span> client = <span class="kw">new</span> <span class="fn">LaunchOSClient</span>
<span class="line-num">6</span>      (System.<span class="fn">getenv</span>(<span class="str">"LAUNCHOS_API_KEY"</span>));
<span class="line-num">7</span>    <span class="kw">var</span> automations = client.<span class="fn">automations</span>().<span class="fn">list</span>();
<span class="line-num">8</span>  }
<span class="line-num">9</span>}</pre>
        </div>
      </div>

      <h2>Parámetros de Autenticación</h2>
      <table class="api-table">
        <thead><tr><th>Parámetro</th><th>Tipo</th><th>Requerido</th><th>Descripción</th></tr></thead>
        <tbody>
          <tr><td><span class="param-name">Authorization</span></td><td><span class="param-type">header</span></td><td><span class="param-required">Sí</span></td><td class="param-desc">Bearer token con tu API Key. Formato: <code>Bearer lk_live_xxx</code></td></tr>
          <tr><td><span class="param-name">X-Version</span></td><td><span class="param-type">header</span></td><td><span class="param-required">No</span></td><td class="param-desc">Versión de API a usar. Default: última estable. Ej: <code>2026-11-01</code></td></tr>
          <tr><td><span class="param-name">X-Idempotency-Key</span></td><td><span class="param-type">header</span></td><td><span class="param-required">No</span></td><td class="param-desc">UUID único para operaciones idempotentes. Previene duplicados en reintentos.</td></tr>
        </tbody>
      </table>

      <div class="callout callout-success">
        <span class="callout-icon">✅</span>
        <div><strong>Tip:</strong> Usa el prefijo <code>lk_live_</code> para producción y <code>lk_test_</code> para desarrollo. Las keys de test no generan cobros.</div>
      </div>

      <h2>Rotación de Keys</h2>
      <p>Rota tus API Keys periódicamente o inmediatamente si sospechas de una brecha de seguridad. La rotación no interrumpe el servicio si sigues estos pasos:</p>

      <div class="article"><ol>
        <li>Genera una nueva API Key en el Dashboard</li>
        <li>Actualiza la variable de entorno en tu servidor (<code>LAUNCHOS_API_KEY</code>)</li>
        <li>Despliega el cambio (zero-downtime)</li>
        <li>Revoca la key anterior desde el Dashboard</li>
      </ol></div>
    </div>
  </main>

  <aside class="docs-toc">
    <div class="toc-title">En esta página</div>
    <a class="toc-link active">¿Qué es una API Key?</a>
    <a class="toc-link">Generar tu API Key</a>
    <a class="toc-link">Autenticar solicitudes</a>
    <a class="toc-link sub">Ejemplos de código</a>
    <a class="toc-link">Parámetros</a>
    <a class="toc-link">Rotación de Keys</a>
  </aside>
</div>

<script>
function switchCode(tab,panelId){
  const wrap=tab.closest('.code-wrap');
  wrap.querySelectorAll('.code-tab').forEach(t=>t.classList.remove('active'));
  wrap.querySelectorAll('.code-panel').forEach(p=>p.classList.remove('active'));
  tab.classList.add('active');document.getElementById(panelId).classList.add('active');
}

function copyCode(btn){
  const panel=btn.closest('.code-wrap').querySelector('.code-panel.active');
  const text=panel.innerText.replace(/^\d+\s/gm,'');
  navigator.clipboard.writeText(text).then(()=>{
    btn.textContent='✅ Copiado';btn.classList.add('copied');
    setTimeout(()=>{btn.textContent='📋 Copiar';btn.classList.remove('copied')},2000);
  });
}

// Active TOC on scroll
document.querySelectorAll('.toc-link').forEach(link=>{
  link.addEventListener('click',function(){
    document.querySelectorAll('.toc-link').forEach(l=>l.classList.remove('active'));
    this.classList.add('active');
  });
});
</script>
</body>
</html>
```
