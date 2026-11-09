# SKILL 09: Formulario Multi-Paso (Wizard) con Validación Animada

## 1. Propósito y Filosofía
Genera formularios multi-paso estilo wizard para onboarding, registro, encuestas y procesos complejos. Divide la complejidad en pasos manejables con validación en tiempo real y experiencia guiada.

- **Enfoque:** Reducción de fricción, guía paso a paso, alta tasa de completado.
- **UX:** Steps indicator + transiciones entre pasos + validación live + resumen final + feedback.
- **Estética:** Modern SaaS — blanco + índigo + animaciones suaves y profesionales.

---

## 2. Plantilla HTML Completa

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Formulario Multi-Paso</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--indigo:#4F46E5;--indigo-light:#EEF2FF;--green:#059669;--red:#DC2626;--text:#111827;--muted:#6B7280;--border:#E5E7EB;--white:#fff;--bg:#F9FAFB}
body{font-family:'Segoe UI',system-ui,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}

.wizard-wrap{width:min(640px,100%)}

/* HEADER */
.wizard-header{text-align:center;margin-bottom:28px}
.wizard-logo{width:48px;height:48px;background:linear-gradient(135deg,var(--indigo),#7C3AED);border-radius:12px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:24px}
.wizard-title{font-size:24px;font-weight:800;color:var(--text);margin-bottom:4px}
.wizard-sub{color:var(--muted);font-size:14px}

/* STEPS INDICATOR */
.steps-bar{display:flex;align-items:center;justify-content:center;margin-bottom:28px;position:relative}
.step-item{display:flex;flex-direction:column;align-items:center;position:relative;z-index:1;flex:1;max-width:120px}
.step-circle{width:36px;height:36px;border-radius:50%;border:2px solid var(--border);background:var(--white);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;color:var(--muted);transition:all .4s;position:relative}
.step-item.done .step-circle{background:var(--green);border-color:var(--green);color:#fff}
.step-item.active .step-circle{background:var(--indigo);border-color:var(--indigo);color:#fff;box-shadow:0 0 0 4px rgba(79,70,229,.2)}
.step-label{font-size:11px;color:var(--muted);margin-top:6px;text-align:center;transition:color .3s;white-space:nowrap}
.step-item.active .step-label{color:var(--indigo);font-weight:600}
.step-item.done .step-label{color:var(--green)}
.step-connector{flex:1;height:2px;background:var(--border);position:relative;overflow:hidden;max-width:60px}
.step-connector-fill{position:absolute;inset:0;background:var(--green);transform:scaleX(0);transform-origin:left;transition:transform .5s ease}
.step-connector.done .step-connector-fill{transform:scaleX(1)}

/* CARD */
.wizard-card{background:var(--white);border:1px solid var(--border);border-radius:16px;padding:32px;box-shadow:0 4px 24px rgba(0,0,0,.06)}

/* STEP CONTENT */
.step-content{display:none;animation:stepIn .3s ease}
.step-content.active{display:block}
@keyframes stepIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
.step-title{font-size:20px;font-weight:800;margin-bottom:4px}
.step-desc{font-size:14px;color:var(--muted);margin-bottom:24px;line-height:1.5}

/* FORM ELEMENTS */
.form-row{display:grid;gap:16px;margin-bottom:16px}
.form-row.two-col{grid-template-columns:1fr 1fr}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-label{font-size:13px;font-weight:600;color:var(--text)}
.required::after{content:' *';color:var(--red)}
.form-input{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;font-size:14px;font-family:inherit;color:var(--text);transition:all .2s;background:var(--white);outline:none}
.form-input:focus{border-color:var(--indigo);box-shadow:0 0 0 3px rgba(79,70,229,.1)}
.form-input.valid{border-color:var(--green)}
.form-input.invalid{border-color:var(--red)}
.form-hint{font-size:11px;color:var(--muted)}
.form-error{font-size:11px;color:var(--red);display:none}
.form-group.show-error .form-error{display:block}
.form-group.show-error .form-hint{display:none}

/* RADIO OPTIONS */
.option-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px}
.option-card{border:2px solid var(--border);border-radius:10px;padding:14px 16px;cursor:pointer;transition:all .2s;display:flex;align-items:flex-start;gap:10px}
.option-card:hover{border-color:rgba(79,70,229,.4);background:var(--indigo-light)}
.option-card.selected{border-color:var(--indigo);background:var(--indigo-light)}
.option-card input[type=radio]{display:none}
.option-icon{font-size:24px;flex-shrink:0}
.option-label{font-size:14px;font-weight:600;margin-bottom:2px}
.option-desc{font-size:12px;color:var(--muted)}
.option-check{width:20px;height:20px;border-radius:50%;border:2px solid var(--border);margin-left:auto;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;transition:all .2s}
.option-card.selected .option-check{background:var(--indigo);border-color:var(--indigo);color:#fff}

/* RANGE */
.range-wrap{margin-bottom:16px}
.range-input{width:100%;appearance:none;height:6px;border-radius:3px;background:var(--border);outline:none;cursor:pointer}
.range-input::-webkit-slider-thumb{appearance:none;width:20px;height:20px;border-radius:50%;background:var(--indigo);cursor:pointer;border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.2)}
.range-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-top:4px}
.range-value{text-align:center;font-size:20px;font-weight:800;color:var(--indigo);margin-bottom:8px}

/* CHECKBOX LIST */
.check-list{display:flex;flex-direction:column;gap:8px;margin-bottom:16px}
.check-item{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1.5px solid var(--border);border-radius:8px;cursor:pointer;transition:all .2s}
.check-item:hover{border-color:rgba(79,70,229,.3);background:var(--indigo-light)}
.check-item.checked{border-color:var(--indigo);background:var(--indigo-light)}
.check-item input[type=checkbox]{display:none}
.check-box{width:20px;height:20px;border-radius:4px;border:2px solid var(--border);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:12px;transition:all .2s}
.check-item.checked .check-box{background:var(--indigo);border-color:var(--indigo);color:#fff}
.check-text{flex:1;font-size:14px}

/* SUMMARY */
.summary-grid{display:grid;gap:12px}
.summary-section{background:var(--bg);border-radius:10px;padding:16px}
.summary-section-title{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--muted);margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.edit-link{color:var(--indigo);cursor:pointer;font-weight:600;font-size:11px;text-transform:none;letter-spacing:0}
.edit-link:hover{text-decoration:underline}
.summary-row{display:flex;justify-content:space-between;align-items:center;padding:4px 0;font-size:14px;border-bottom:1px solid var(--border)}
.summary-row:last-child{border:none}
.summary-label{color:var(--muted)}
.summary-value{font-weight:600;color:var(--text)}

/* ACTIONS */
.wizard-actions{display:flex;justify-content:space-between;align-items:center;margin-top:24px;padding-top:20px;border-top:1px solid var(--border)}
.btn-back{padding:11px 20px;border:1.5px solid var(--border);border-radius:8px;background:transparent;color:var(--muted);font-size:14px;cursor:pointer;font-family:inherit;transition:all .2s}
.btn-back:hover{border-color:var(--text);color:var(--text)}
.btn-next{padding:11px 24px;background:var(--indigo);border:none;border-radius:8px;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .2s;display:flex;align-items:center;gap:8px}
.btn-next:hover{background:#3730A3;transform:translateY(-1px);box-shadow:0 4px 12px rgba(79,70,229,.4)}
.btn-next:disabled{opacity:.5;cursor:not-allowed;transform:none;box-shadow:none}
.step-info{font-size:12px;color:var(--muted)}

/* SUCCESS */
.success-state{text-align:center;padding:20px 0;display:none}
.success-state.show{display:block}
.success-icon{width:72px;height:72px;background:linear-gradient(135deg,var(--green),#10B981);border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;font-size:36px;animation:popIn .5s cubic-bezier(.175,.885,.32,1.275)}
@keyframes popIn{from{opacity:0;transform:scale(0)}to{opacity:1;transform:scale(1)}}
.success-title{font-size:24px;font-weight:800;margin-bottom:8px}
.success-desc{color:var(--muted);margin-bottom:24px;line-height:1.6}
.confetti{font-size:40px;animation:spin 2s linear infinite}
@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
</style>
</head>
<body>

<div class="wizard-wrap">
  <div class="wizard-header">
    <div class="wizard-logo">🚀</div>
    <h1 class="wizard-title">Crear tu Cuenta</h1>
    <p class="wizard-sub">Completa tu perfil en 4 pasos sencillos · Tarda menos de 3 minutos</p>
  </div>

  <div class="steps-bar" id="stepsBar">
    <div class="step-item active" id="step-ind-0"><div class="step-circle">1</div><div class="step-label">Perfil</div></div>
    <div class="step-connector" id="conn-0"><div class="step-connector-fill"></div></div>
    <div class="step-item" id="step-ind-1"><div class="step-circle">2</div><div class="step-label">Empresa</div></div>
    <div class="step-connector" id="conn-1"><div class="step-connector-fill"></div></div>
    <div class="step-item" id="step-ind-2"><div class="step-circle">3</div><div class="step-label">Intereses</div></div>
    <div class="step-connector" id="conn-2"><div class="step-connector-fill"></div></div>
    <div class="step-item" id="step-ind-3"><div class="step-circle">4</div><div class="step-label">Confirmar</div></div>
  </div>

  <div class="wizard-card">

    <!-- STEP 1: Perfil -->
    <div class="step-content active" id="step-0">
      <h2 class="step-title">👤 Tu Información Personal</h2>
      <p class="step-desc">Cuéntanos quién eres para personalizar tu experiencia.</p>
      <div class="form-row two-col">
        <div class="form-group" id="fg-nombre">
          <label class="form-label required">Nombre</label>
          <input type="text" class="form-input" id="f-nombre" placeholder="Juan" oninput="validateField(this,'fg-nombre','min3')">
          <span class="form-hint">Tu nombre de pila</span>
          <span class="form-error">Mínimo 3 caracteres</span>
        </div>
        <div class="form-group" id="fg-apellido">
          <label class="form-label required">Apellido</label>
          <input type="text" class="form-input" id="f-apellido" placeholder="García" oninput="validateField(this,'fg-apellido','min3')">
          <span class="form-hint">Primer apellido</span>
          <span class="form-error">Mínimo 3 caracteres</span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" id="fg-email">
          <label class="form-label required">Email Corporativo</label>
          <input type="email" class="form-input" id="f-email" placeholder="juan@empresa.com" oninput="validateField(this,'fg-email','email')">
          <span class="form-hint">Usarás este email para iniciar sesión</span>
          <span class="form-error">Ingresa un email válido</span>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group" id="fg-tel">
          <label class="form-label">Teléfono</label>
          <input type="tel" class="form-input" id="f-tel" placeholder="+57 300 000 0000">
          <span class="form-hint">Opcional · Para soporte prioritario</span>
        </div>
      </div>
    </div>

    <!-- STEP 2: Empresa -->
    <div class="step-content" id="step-1">
      <h2 class="step-title">🏢 Tu Empresa</h2>
      <p class="step-desc">Información sobre tu organización para configurar el plan correcto.</p>
      <div class="form-row">
        <div class="form-group" id="fg-empresa">
          <label class="form-label required">Nombre de la Empresa</label>
          <input type="text" class="form-input" id="f-empresa" placeholder="Empresa S.A.S." oninput="validateField(this,'fg-empresa','min2')">
          <span class="form-error">Campo requerido</span>
        </div>
      </div>
      <div class="form-row two-col">
        <div class="form-group">
          <label class="form-label">Sector</label>
          <select class="form-input" id="f-sector">
            <option value="">Selecciona...</option>
            <option>Tecnología</option><option>Finanzas</option><option>Salud</option>
            <option>Retail</option><option>Educación</option><option>Manufactura</option><option>Otro</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">País</label>
          <select class="form-input">
            <option>Colombia</option><option>México</option><option>Argentina</option>
            <option>Chile</option><option>Perú</option><option>España</option>
          </select>
        </div>
      </div>
      <div class="range-wrap">
        <label class="form-label" style="display:block;margin-bottom:12px">Tamaño del Equipo</label>
        <div class="range-value" id="rangeVal">25 personas</div>
        <input type="range" class="range-input" min="1" max="500" value="25" oninput="updateRange(this)">
        <div class="range-labels"><span>1</span><span>10-50</span><span>100+</span><span>500+</span></div>
      </div>
    </div>

    <!-- STEP 3: Intereses -->
    <div class="step-content" id="step-2">
      <h2 class="step-title">🎯 ¿Qué te interesa más?</h2>
      <p class="step-desc">Selecciona las áreas donde quieres comenzar (puedes elegir varias).</p>
      <div class="option-grid">
        <div class="option-card" onclick="selectOption(this,'plan')">
          <input type="radio" name="plan"><div class="option-icon">📊</div>
          <div><div class="option-label">Analytics</div><div class="option-desc">Métricas y BI</div></div>
          <div class="option-check">✓</div>
        </div>
        <div class="option-card" onclick="selectOption(this,'plan')">
          <input type="radio" name="plan"><div class="option-icon">🤖</div>
          <div><div class="option-label">Automatización</div><div class="option-desc">Flujos con IA</div></div>
          <div class="option-check">✓</div>
        </div>
        <div class="option-card" onclick="selectOption(this,'plan')">
          <input type="radio" name="plan"><div class="option-icon">🔗</div>
          <div><div class="option-label">Integraciones</div><div class="option-desc">APIs y conectores</div></div>
          <div class="option-check">✓</div>
        </div>
        <div class="option-card" onclick="selectOption(this,'plan')">
          <input type="radio" name="plan"><div class="option-icon">📱</div>
          <div><div class="option-label">Mobile</div><div class="option-desc">Apps para equipos</div></div>
          <div class="option-check">✓</div>
        </div>
      </div>
      <label class="form-label" style="display:block;margin-bottom:10px">Preferencias adicionales</label>
      <div class="check-list">
        <div class="check-item" onclick="toggleCheck(this)"><input type="checkbox"><div class="check-box">✓</div><div class="check-text">Recibir tips y buenas prácticas semanales</div></div>
        <div class="check-item" onclick="toggleCheck(this)"><input type="checkbox"><div class="check-box">✓</div><div class="check-text">Acceso anticipado a nuevas funciones (beta)</div></div>
        <div class="check-item" onclick="toggleCheck(this)"><input type="checkbox"><div class="check-box">✓</div><div class="check-text">Sesión de onboarding personalizada con experto</div></div>
      </div>
    </div>

    <!-- STEP 4: Confirmar -->
    <div class="step-content" id="step-3">
      <h2 class="step-title">✅ Confirma tu Información</h2>
      <p class="step-desc">Revisa tus datos antes de crear la cuenta.</p>
      <div class="summary-grid">
        <div class="summary-section">
          <div class="summary-section-title">Perfil Personal <span class="edit-link" onclick="goToStep(0)">✏️ Editar</span></div>
          <div class="summary-row"><span class="summary-label">Nombre</span><span class="summary-value" id="sum-nombre">—</span></div>
          <div class="summary-row"><span class="summary-label">Email</span><span class="summary-value" id="sum-email">—</span></div>
          <div class="summary-row"><span class="summary-label">Teléfono</span><span class="summary-value" id="sum-tel">—</span></div>
        </div>
        <div class="summary-section">
          <div class="summary-section-title">Empresa <span class="edit-link" onclick="goToStep(1)">✏️ Editar</span></div>
          <div class="summary-row"><span class="summary-label">Empresa</span><span class="summary-value" id="sum-empresa">—</span></div>
          <div class="summary-row"><span class="summary-label">Sector</span><span class="summary-value" id="sum-sector">—</span></div>
          <div class="summary-row"><span class="summary-label">Equipo</span><span class="summary-value" id="sum-team">—</span></div>
        </div>
      </div>
      <div style="margin-top:16px;padding:12px 14px;background:var(--indigo-light);border-radius:8px;font-size:13px;color:#3730A3;border:1px solid rgba(79,70,229,.2)">
        📋 Al crear tu cuenta aceptas los <strong>Términos de Servicio</strong> y la <strong>Política de Privacidad</strong>.
      </div>
    </div>

    <!-- SUCCESS -->
    <div class="success-state" id="successState">
      <div class="confetti">🎉</div>
      <div class="success-icon">✓</div>
      <h2 class="success-title">¡Cuenta creada!</h2>
      <p class="success-desc">Tu cuenta ha sido configurada exitosamente. Revisa tu email para verificar tu dirección y comenzar a usar la plataforma.</p>
      <button class="btn-next" style="margin:0 auto;padding:14px 32px" onclick="location.reload()">Ir al Dashboard →</button>
    </div>

    <div class="wizard-actions" id="wizardActions">
      <button class="btn-back" id="btnBack" onclick="prevStep()" style="visibility:hidden">← Atrás</button>
      <div class="step-info" id="stepInfo">Paso 1 de 4</div>
      <button class="btn-next" id="btnNext" onclick="nextStep()">Siguiente →</button>
    </div>
  </div>
</div>

<script>
let currentStep=0;const totalSteps=4;

function goToStep(n){
  document.getElementById('step-'+currentStep).classList.remove('active');
  document.getElementById('step-ind-'+currentStep).classList.remove('active');
  if(n>currentStep){document.getElementById('step-ind-'+currentStep).classList.add('done');if(currentStep>0)document.getElementById('conn-'+(currentStep-1)).classList.add('done')}
  currentStep=n;
  document.getElementById('step-'+currentStep).classList.add('active');
  document.getElementById('step-ind-'+currentStep).classList.add('active');
  document.getElementById('btnBack').style.visibility=currentStep>0?'visible':'hidden';
  document.getElementById('stepInfo').textContent=`Paso ${currentStep+1} de ${totalSteps}`;
  const isLast=currentStep===totalSteps-1;
  document.getElementById('btnNext').textContent=isLast?'✅ Crear Cuenta →':'Siguiente →';
}

function nextStep(){
  if(currentStep===0){if(!validateStep0())return}
  if(currentStep===totalSteps-1){submitForm();return}
  if(currentStep<totalSteps-1){
    document.getElementById('conn-'+currentStep).classList.add('done');
    goToStep(currentStep+1);
    if(currentStep===3)updateSummary();
  }
}
function prevStep(){if(currentStep>0)goToStep(currentStep-1)}

function validateStep0(){
  let ok=true;
  ['nombre','apellido','email'].forEach(id=>{
    const el=document.getElementById('f-'+id);
    const fg=document.getElementById('fg-'+id);
    const type=id==='email'?'email':'min3';
    if(!isValid(el.value,type)){el.classList.add('invalid');fg.classList.add('show-error');ok=false}
  });
  return ok;
}

function validateField(el,fgId,type){
  const fg=document.getElementById(fgId);
  if(isValid(el.value,type)){el.classList.remove('invalid');el.classList.add('valid');fg.classList.remove('show-error')}
  else{el.classList.remove('valid')}
}

function isValid(val,type){
  if(type==='email')return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  if(type==='min3')return val.trim().length>=3;
  if(type==='min2')return val.trim().length>=2;
  return true;
}

function updateRange(el){document.getElementById('rangeVal').textContent=el.value+' personas'}
function selectOption(card,name){document.querySelectorAll(`.option-card input[name=${name}]`).forEach(r=>r.closest('.option-card').classList.remove('selected'));card.classList.add('selected')}
function toggleCheck(item){item.classList.toggle('checked')}

function updateSummary(){
  document.getElementById('sum-nombre').textContent=(document.getElementById('f-nombre').value+' '+document.getElementById('f-apellido').value).trim()||'—';
  document.getElementById('sum-email').textContent=document.getElementById('f-email').value||'—';
  document.getElementById('sum-tel').textContent=document.getElementById('f-tel').value||'No especificado';
  document.getElementById('sum-empresa').textContent=document.getElementById('f-empresa').value||'—';
  document.getElementById('sum-sector').textContent=document.getElementById('f-sector').value||'—';
  document.getElementById('sum-team').textContent=document.getElementById('rangeVal').textContent;
}

function submitForm(){
  document.getElementById('step-3').classList.remove('active');
  document.getElementById('step-ind-3').classList.remove('active');
  document.getElementById('step-ind-3').classList.add('done');
  document.getElementById('conn-2').classList.add('done');
  document.getElementById('wizardActions').style.display='none';
  document.getElementById('successState').classList.add('show');
}
updateSummary();
</script>
</body>
</html>
```
