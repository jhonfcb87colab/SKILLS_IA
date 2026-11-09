const demos = {
  dashboard: {number:"01",title:"Dashboard ejecutivo",skill:"SKILL_01_dashboard_ejecutivo.md",theme:"dark",intro:"Vista ejecutiva de una tienda ficticia. Los indicadores y el gráfico son datos de muestra.",html:`<div class="stats"><article class="stat"><span>Ingresos del mes</span><strong>$48,260</strong><small class="up">+8.4% vs. mes anterior</small></article><article class="stat"><span>Pedidos</span><strong>1,284</strong><small class="up">+5.2% vs. mes anterior</small></article><article class="stat"><span>Conversión</span><strong>3.8%</strong><small class="up">+0.6 puntos</small></article></div><section class="panel"><div class="row"><h2>Ingresos semanales</h2><span class="badge">Últimas 4 semanas</span></div><div class="bar-row"><span>Semana 1</span><div class="bar"><span style="width:48%"></span></div><b>$9.4k</b></div><div class="bar-row"><span>Semana 2</span><div class="bar"><span style="width:66%"></span></div><b>$12.8k</b></div><div class="bar-row"><span>Semana 3</span><div class="bar"><span style="width:56%"></span></div><b>$10.9k</b></div><div class="bar-row"><span>Semana 4</span><div class="bar"><span style="width:84%"></span></div><b>$15.1k</b></div><button class="btn" data-toast="Resumen de ventas ficticio">Ver detalle del KPI</button></section>`},
  noticias: {number:"02",title:"Boletín interno",skill:"SKILL_02_portal_noticias_cards.md",theme:"light",intro:"Noticias de ejemplo de una empresa ficticia. Filtra por tema y abre una nota para leerla.",html:`<div class="filters"><button class="filter active" data-filter="all">Todo</button><button class="filter" data-filter="empresa">Empresa</button><button class="filter" data-filter="equipo">Equipo</button></div><div class="grid" data-card-list><article class="card" data-category="empresa" data-searchable><span class="tag">EMPRESA · 12 JUN</span><h2>Nuevo centro de distribución</h2><p>El equipo de Operaciones inauguró un centro piloto en Ciudad Central.</p><button class="btn" data-modal-title="Nuevo centro de distribución" data-modal-body="Ejemplo de artículo: el centro piloto ficticio amplía la capacidad de preparación de pedidos.">Leer nota</button></article><article class="card" data-category="equipo" data-searchable><span class="tag">EQUIPO · 10 JUN</span><h2>Semana de innovación</h2><p>Seis equipos compartieron sus prototipos y aprendizajes.</p><button class="btn" data-modal-title="Semana de innovación" data-modal-body="Ejemplo de artículo: se presentaron seis prototipos internos y sus próximos pasos.">Leer nota</button></article><article class="card" data-category="empresa" data-searchable><span class="tag">EMPRESA · 04 JUN</span><h2>Actualización del catálogo</h2><p>Una nueva organización simplifica la búsqueda de productos.</p><button class="btn" data-modal-title="Actualización del catálogo" data-modal-body="Ejemplo de artículo: el catálogo ficticio ahora organiza los productos por necesidad.">Leer nota</button></article></div>`},
  academia: {number:"03",title:"Academia: fundamentos de servicio",skill:"SKILL_03_academia_acordeones.md",theme:"light",intro:"Curso de muestra con módulos desplegables y progreso local de demostración.",html:`<section class="panel"><div class="row"><h2>Tu avance</h2><strong id="course-count">1 de 4 lecciones</strong></div><div class="progress"><span id="course-progress" style="width:25%"></span></div><details open><summary><b>Módulo 1 · Primer contacto</b></summary><p>Lección 1: escuchar y confirmar la necesidad.</p><button class="btn" data-complete="course">Marcar lección como completada</button></details><details><summary><b>Módulo 2 · Resolver con claridad</b></summary><p>Lección 2: explicar los pasos de solución.</p></details><details><summary><b>Módulo 3 · Cierre y seguimiento</b></summary><p>Lección 3: resumir acuerdos y próximos pasos.</p></details><details><summary><b>Módulo 4 · Repaso</b></summary><p>Lección 4: practicar con un caso ficticio.</p></details><p><span class="badge">Insignia: Primer paso</span></p></section>`},
  portfolio: {number:"04",title:"Portfolio creativo",skill:"SKILL_04_portfolio_flotante.md",theme:"dark",intro:"Selección de proyectos ficticios en un portfolio visual. Abre cada ficha para ver detalles.",html:`<div class="grid"><article class="card dark-card"><span class="tag">IDENTIDAD</span><h2>Bruma Café</h2><p>Identidad visual y empaque para una cafetería de barrio.</p><button class="btn" data-modal-title="Bruma Café" data-modal-body="Proyecto de muestra · dirección de arte, identidad visual y empaque.">Ver proyecto</button></article><article class="card dark-card"><span class="tag">PRODUCTO DIGITAL</span><h2>Ruta Verde</h2><p>Prototipo de una aplicación de movilidad urbana.</p><button class="btn" data-modal-title="Ruta Verde" data-modal-body="Proyecto de muestra · diseño de experiencia, prototipo y sistema visual.">Ver proyecto</button></article><article class="card dark-card"><span class="tag">EDITORIAL</span><h2>Atlas Local</h2><p>Guía editorial ilustrada de destinos cercanos.</p><button class="btn" data-modal-title="Atlas Local" data-modal-body="Proyecto de muestra · concepto editorial, ilustración y publicación.">Ver proyecto</button></article></div>`},
  ayuda: {number:"05",title:"Centro de ayuda",skill:"SKILL_05_centro_ayuda_faq.md",theme:"light",intro:"Preguntas frecuentes ficticias con búsqueda instantánea y categorías.",html:`<input class="search" data-search placeholder="Buscar una pregunta…" aria-label="Buscar pregunta"><div class="filters"><button class="filter active" data-filter="all">Todas</button><button class="filter" data-filter="cuenta">Cuenta</button><button class="filter" data-filter="pedidos">Pedidos</button></div><div class="grid two" data-card-list><details class="faq-item" data-category="cuenta" data-searchable><summary>¿Cómo actualizo mis datos?</summary><p>En esta demo, abre el menú de perfil y elige «Editar información».</p><button class="btn" data-toast="¡Gracias por tu valoración ficticia!">Me fue útil</button></details><details class="faq-item" data-category="pedidos" data-searchable><summary>¿Dónde consulto mi pedido?</summary><p>La sección «Mis pedidos» muestra el estado de cada compra de ejemplo.</p><button class="btn" data-toast="¡Gracias por tu valoración ficticia!">Me fue útil</button></details><details class="faq-item" data-category="cuenta" data-searchable><summary>¿Puedo cambiar mi contraseña?</summary><p>Sí. En un producto real, el cambio debe verificarse de forma segura.</p></details></div>`},
  kanban: {number:"06",title:"Tablero Kanban",skill:"SKILL_06_kanban_board.md",theme:"light",intro:"Tablero de ejemplo. Usa el botón de cada tarea para moverla a la siguiente columna.",html:`<div class="grid"><section class="panel"><h2>Por hacer <span class="badge">2</span></h2><article class="task card" data-task><span class="tag">DISEÑO</span><h2>Revisar página de inicio</h2><p>Responsable: Alex · Prioridad media</p><button class="btn" data-move>Mover a En curso →</button></article><article class="task card" data-task><span class="tag">CONTENIDO</span><h2>Preparar preguntas frecuentes</h2><p>Responsable: Sam · Prioridad baja</p><button class="btn" data-move>Mover a En curso →</button></article></section><section class="panel"><h2>En curso <span class="badge">1</span></h2><article class="task card" data-task><span class="tag">DATOS</span><h2>Validar reporte semanal</h2><p>Responsable: Cris · Prioridad alta</p><button class="btn" data-move>Mover a Hecho →</button></article></section><section class="panel"><h2>Hecho <span class="badge">1</span></h2><article class="task card" data-task><span class="tag">OPERACIONES</span><h2>Definir categorías</h2><p>Responsable: Dani · Cerrada</p></article></section></div>`},
  slides: {number:"07",title:"Presentación: Proyecto Aurora",skill:"SKILL_07_presentacion_slides.md",theme:"dark",intro:"Presentación ejecutiva ficticia con controles de navegación por diapositivas.",html:`<section class="slide" id="slide"><span class="eyebrow">PROYECTO AURORA · 01 / 03</span><h2>Una experiencia más simple</h2><p>Propuesta de mejora para un servicio ficticio.</p></section><div class="actions"><button class="btn" data-slide="-1">← Anterior</button><button class="btn primary" data-slide="1">Siguiente →</button><button class="btn" data-fullscreen>Presentar</button></div><details><summary>Notas del presentador</summary><p>Datos y objetivos de esta presentación son ilustrativos.</p></details>`},
  galeria: {number:"08",title:"Galería multimedia",skill:"SKILL_08_galeria_lightbox.md",theme:"dark",intro:"Galería con filtros; selecciona una tarjeta para ampliar la ficha.",html:`<div class="filters"><button class="filter active" data-filter="all">Todo</button><button class="filter" data-filter="naturaleza">Naturaleza</button><button class="filter" data-filter="arquitectura">Arquitectura</button></div><div class="grid" data-card-list><button class="gallery-tile" data-category="naturaleza" data-searchable data-modal-title="Lago de muestra" data-modal-body="Fotografía ficticia: paisaje de montaña al amanecer.">Lago de muestra</button><button class="gallery-tile" data-category="arquitectura" data-searchable data-modal-title="Patio de luz" data-modal-body="Fotografía ficticia: patio de arquitectura contemporánea.">Patio de luz</button><button class="gallery-tile" data-category="naturaleza" data-searchable data-modal-title="Sendero azul" data-modal-body="Fotografía ficticia: ruta arbolada junto al río.">Sendero azul</button><button class="gallery-tile" data-category="arquitectura" data-searchable data-modal-title="Líneas urbanas" data-modal-body="Fotografía ficticia: detalle de un edificio moderno.">Líneas urbanas</button></div>`},
  wizard: {number:"09",title:"Solicitud de demostración",skill:"SKILL_09_formulario_wizard.md",theme:"light",intro:"Formulario ficticio de dos pasos. No guarda ni envía la información ingresada.",html:`<section class="panel"><div class="row"><h2 id="wizard-title">Paso 1 de 2 · Tu perfil</h2><span class="badge" id="wizard-status">1 / 2</span></div><div class="progress"><span id="wizard-progress" style="width:50%"></span></div><div id="wizard-step"><label>Nombre de ejemplo<br><input class="field" placeholder="Ana Ejemplo" required></label><p><label>Correo de muestra<br><input class="field" type="email" placeholder="ana@ejemplo.test" required></label></p></div><div class="actions"><button class="btn" data-wizard="-1" disabled>← Atrás</button><button class="btn primary" data-wizard="1">Continuar →</button></div><p class="muted" id="wizard-message">Tus datos no se envían; esto es solo una vista previa.</p></section>`},
  infografia: {number:"10",title:"Infografía: ciclo del agua",skill:"SKILL_10_infografia_interactiva.md",theme:"dark",intro:"Visualización didáctica de ejemplo. Pasa el cursor por los términos para ver una definición.",html:`<div class="grid"><article class="card dark-card"><span class="tag">01 · EVAPORACIÓN</span><h2 title="El agua líquida se transforma en vapor por efecto del calor.">El sol calienta el agua</h2><p>Una parte del agua superficial pasa a la atmósfera.</p><div class="bar"><span style="width:68%"></span></div></article><article class="card dark-card"><span class="tag">02 · CONDENSACIÓN</span><h2 title="El vapor se enfría y forma gotas en las nubes.">Se forman las nubes</h2><p>El vapor se enfría y agrupa en gotas.</p><div class="bar"><span style="width:48%"></span></div></article><article class="card dark-card"><span class="tag">03 · PRECIPITACIÓN</span><h2 title="El agua vuelve a la superficie como lluvia o nieve.">El agua regresa</h2><p>La lluvia alimenta ríos, lagos y suelos.</p><div class="bar"><span style="width:82%"></span></div></article></div>`},
  mapa: {number:"11",title:"Mapa mental: huerta urbana",skill:"SKILL_11_mapa_mental.md",theme:"dark",intro:"Mapa conceptual ficticio. Expande ramas para desplegar ideas relacionadas.",html:`<div class="actions"><button class="btn" data-zoom="-1">− Alejar</button><span id="zoom-label">Zoom 100%</span><button class="btn" data-zoom="1">+ Acercar</button></div><div class="mindmap" id="mindmap"><div class="branches"><details class="node"><summary>Planificación</summary><p>Espacio · clima · calendario</p></details><details class="node"><summary>Recursos</summary><p>Agua · semillas · herramientas</p></details></div><button class="node root" data-toast="Tema central: huerta urbana">HUERTA<br>URBANA</button><div class="branches"><details class="node"><summary>Cultivo</summary><p>Siembra · cuidado · cosecha</p></details><details class="node"><summary>Comunidad</summary><p>Intercambio · talleres · compost</p></details></div></div>`},
  comparador: {number:"12",title:"Compara planes de ejemplo",skill:"SKILL_12_comparador_productos.md",theme:"light",intro:"Comparación ilustrativa. Precios y funcionalidades no representan ofertas reales.",html:`<div class="grid"><article class="card"><span class="tag">INICIO</span><h2>Gratis</h2><p><strong>$0 / mes</strong></p><p>1 proyecto<br>Soporte comunitario<br>Panel básico</p><button class="btn" data-toast="Elegiste el plan Gratis (demo)">Elegir</button></article><article class="card" style="border-color:#6471e8"><span class="badge">RECOMENDADO · DEMO</span><h2>Equipo</h2><p><strong>$19 / mes</strong></p><p>10 proyectos<br>Soporte prioritario<br>Panel avanzado</p><button class="btn primary" data-toast="Elegiste el plan Equipo (demo)">Elegir</button></article><article class="card"><span class="tag">ORGANIZACIÓN</span><h2>Escala</h2><p><strong>$49 / mes</strong></p><p>Proyectos ilimitados<br>Administración de equipo<br>Reportes</p><button class="btn" data-toast="Elegiste el plan Escala (demo)">Elegir</button></article></div><h2>Comparación rápida</h2><div class="table-wrap"><table><thead><tr><th>Característica</th><th>Gratis</th><th>Equipo</th><th>Escala</th></tr></thead><tbody><tr><td>Proyectos</td><td>1</td><td>10</td><td>Ilimitados</td></tr><tr><td>Exportación</td><td>—</td><td>Sí</td><td>Sí</td></tr><tr><td>Soporte</td><td>Comunidad</td><td>Prioritario</td><td>Prioritario</td></tr></tbody></table></div>`},
  equipo: {number:"13",title:"Conoce al equipo",skill:"SKILL_13_portal_equipo.md",theme:"light",intro:"Directorio de personas ficticias. Filtra por nombre o departamento y abre cada perfil.",html:`<input class="search" data-search placeholder="Buscar persona o rol…" aria-label="Buscar integrantes"><div class="grid" data-card-list><article class="person card" data-searchable><span class="badge">DISEÑO</span><h2>Lucía Torres</h2><p>Diseñadora de producto · Le gusta simplificar flujos complejos.</p><button class="btn" data-modal-title="Lucía Torres · Diseño" data-modal-body="Perfil de ejemplo. Habilidades: investigación, prototipado y diseño de interacción.">Ver perfil</button></article><article class="person card" data-searchable><span class="badge">DATOS</span><h2>Mateo Ríos</h2><p>Analista de datos · Convierte preguntas en métricas útiles.</p><button class="btn" data-modal-title="Mateo Ríos · Datos" data-modal-body="Perfil de ejemplo. Habilidades: análisis exploratorio, visualización y SQL.">Ver perfil</button></article><article class="person card" data-searchable><span class="badge">OPERACIONES</span><h2>Inés Vidal</h2><p>Coordinadora · Facilita el trabajo entre equipos.</p><button class="btn" data-modal-title="Inés Vidal · Operaciones" data-modal-body="Perfil de ejemplo. Habilidades: planificación, coordinación y mejora continua.">Ver perfil</button></article></div>`},
  finanzas: {number:"14",title:"Reporte financiero",skill:"SKILL_14_reporte_financiero.md",theme:"light",intro:"Resumen ilustrativo en USD. Cifras ficticias; no usar para decisiones financieras.",html:`<div class="stats"><article class="stat"><span>Ingresos</span><strong>$128.4k</strong><small class="up">+6.2%</small></article><article class="stat"><span>Gastos</span><strong>$76.1k</strong><small>−1.4%</small></article><article class="stat"><span>Margen</span><strong>40.7%</strong><small class="up">+2.1 puntos</small></article></div><section class="panel"><h2>Ingresos por mes</h2><div class="bar-row"><span>Enero</span><div class="bar"><span style="width:56%"></span></div><b>$38k</b></div><div class="bar-row"><span>Febrero</span><div class="bar"><span style="width:72%"></span></div><b>$49k</b></div><div class="bar-row"><span>Marzo</span><div class="bar"><span style="width:89%"></span></div><b>$61k</b></div></section><h2>Detalle por período <small class="muted">(haz clic en una columna para ordenar)</small></h2><div class="table-wrap"><table data-sortable><thead><tr><th>Mes</th><th>Ingresos USD</th><th>Gastos USD</th><th>Resultado USD</th></tr></thead><tbody><tr><td>Marzo</td><td>61000</td><td>35200</td><td>25800</td></tr><tr><td>Enero</td><td>38000</td><td>23100</td><td>14900</td></tr><tr><td>Febrero</td><td>49000</td><td>27800</td><td>21200</td></tr></tbody></table></div>`},
  landing: {number:"15",title:"Menos tareas, más tiempo para crear",skill:"SKILL_15_landing_interactiva.md",theme:"dark",intro:"Landing ficticia para una herramienta imaginaria de organización creativa.",html:`<section class="slide"><span class="eyebrow">LUMEN · HERRAMIENTA CREATIVA</span><h2>Ordena tus ideas.<br>Despeja tu día.</h2><p>Un espacio de muestra para planear proyectos con tu equipo.</p><button class="btn primary" data-scroll-form>Solicitar acceso de prueba</button></section><section class="grid" style="margin-top:16px"><article class="card dark-card"><h2>Todo en contexto</h2><p>Reúne tareas, notas y decisiones en un solo espacio.</p></article><article class="card dark-card"><h2>Avance visible</h2><p>Comparte prioridades sin perder de vista el objetivo.</p></article></section><section class="panel" id="lead-form" style="margin-top:16px"><h2>Recibe novedades</h2><form data-demo-form><input class="field" type="email" required placeholder="tu@correo.test" aria-label="Correo electrónico"><button class="btn primary">Enviar (demo)</button></form></section>`},
  timeline: {number:"16",title:"Historia de Proyecto Aurora",skill:"SKILL_16_timeline_interactivo.md",theme:"dark",intro:"Cronología ficticia con filtros por categoría y detalles de cada hito.",html:`<div class="filters"><button class="filter active" data-filter="all">Todo</button><button class="filter" data-filter="producto">Producto</button><button class="filter" data-filter="equipo">Equipo</button></div><div class="timeline" data-card-list><article class="event" data-category="equipo" data-searchable><span class="tag">ENERO 2024 · EQUIPO</span><p><strong>Se forma el equipo piloto</strong></p><p>Cuatro personas definen la primera hipótesis.</p></article><article class="event" data-category="producto" data-searchable><span class="tag">MARZO 2024 · PRODUCTO</span><p><strong>Prototipo inicial</strong></p><p>Prueba de navegación con usuarios ficticios.</p></article><article class="event" data-category="producto" data-searchable><span class="tag">JULIO 2024 · PRODUCTO</span><p><strong>Versión de demostración</strong></p><p>Se presenta el concepto en un evento interno ficticio.</p></article></div>`},
  docs: {number:"17",title:"Documentación de la API de ejemplo",skill:"SKILL_17_documentacion_tecnica.md",theme:"dark",intro:"Portal técnico demostrativo con navegación por sección y ejemplo de código copiable.",html:`<div class="layout" style="padding-top:0"><nav class="sidebar"><div class="side-title">Guía de API</div><a class="side-link" href="#inicio">Introducción</a><a class="side-link" href="#autenticacion">Autenticación</a><a class="side-link" href="#solicitud">Primera solicitud</a></nav><div><section id="inicio" class="panel"><h2>Introducción</h2><p>La API ficticia permite consultar elementos de ejemplo.</p><input class="search" data-search placeholder="Buscar en la guía…"></section><section id="autenticacion" class="panel" data-searchable><h2>Autenticación</h2><p>En una implementación real, sigue el mecanismo autorizado de tu servicio. No pegues secretos en esta demo.</p></section><section id="solicitud" class="panel" data-searchable><h2>Primera solicitud</h2><pre><code id="sample-code">GET /api/v1/items
Accept: application/json</code></pre><button class="btn" data-copy="#sample-code">Copiar ejemplo</button></section></div></div>`},
  onboarding: {number:"18",title:"Tu primera misión",skill:"SKILL_18_onboarding_gamificado.md",theme:"dark",intro:"Onboarding ficticio con tareas, puntos y progreso que se actualiza en esta página.",html:`<section class="panel"><div class="row"><div><span class="tag">NIVEL 1 · EXPLORADOR</span><h2 id="xp-label">0 / 300 XP</h2></div><span class="badge" id="badge-count">0 insignias</span></div><div class="progress"><span id="xp-progress" style="width:0%"></span></div></section><div class="grid" style="margin-top:14px"><label class="card"><input type="checkbox" data-mission value="100"> Completa tu perfil <p>+100 XP · Revisa tus preferencias.</p></label><label class="card"><input type="checkbox" data-mission value="100"> Explora el tablero <p>+100 XP · Conoce las secciones principales.</p></label><label class="card"><input type="checkbox" data-mission value="100"> Crea tu primera idea <p>+100 XP · Añade una idea de prueba.</p></label></div>`},
  encuesta: {number:"19",title:"¿Cómo fue tu experiencia?",skill:"SKILL_19_encuestas_feedback.md",theme:"light",intro:"Encuesta NPS de demostración. La respuesta se usa únicamente para actualizar esta pantalla.",html:`<section class="panel"><span class="tag">ENCUESTA FICTICIA · NPS</span><h2>¿Qué tan probable es que recomiendes esta experiencia?</h2><div class="actions" role="group" aria-label="Elige una calificación">${Array.from({length:11},(_,i)=>`<button class="filter" data-vote="${i}">${i}</button>`).join("")}</div><p id="survey-message" class="muted">Elige una puntuación del 0 al 10.</p><button class="btn" data-results>Ver resultados ficticios</button><div id="survey-results" hidden><h2>Respuestas de ejemplo (n=42)</h2><div class="bar-row"><span>Promotores</span><div class="bar"><span style="width:64%"></span></div><b>64%</b></div><div class="bar-row"><span>Neutrales</span><div class="bar"><span style="width:24%"></span></div><b>24%</b></div><div class="bar-row"><span>Detractores</span><div class="bar"><span style="width:12%"></span></div><b>12%</b></div></div></section>`},
  notificaciones: {number:"20",title:"Centro de notificaciones",skill:"SKILL_20_centro_notificaciones.md",theme:"dark",intro:"Feed local de eventos ficticios. Filtra alertas y marca avisos como leídos.",html:`<div class="filters"><button class="filter active" data-filter="all">Todas</button><button class="filter" data-filter="urgente">Urgentes</button><button class="filter" data-filter="sistema">Sistema</button><button class="btn" data-toast="Preferencias ficticias guardadas">Preferencias</button></div><div class="grid" data-card-list><article class="card" data-category="urgente" data-searchable><span class="tag">URGENTE · HACE 5 MIN</span><h2>Demora en proceso de ejemplo</h2><p>El lote de prueba tarda más de lo esperado.</p><button class="btn" data-read>Marcar como leído</button></article><article class="card" data-category="sistema" data-searchable><span class="tag">SISTEMA · HACE 1 HORA</span><h2>Reporte semanal disponible</h2><p>Se generó el reporte demostrativo del lunes.</p><button class="btn" data-read>Marcar como leído</button></article><article class="card" data-category="sistema" data-searchable><span class="tag">SISTEMA · AYER</span><h2>Configuración actualizada</h2><p>Las preferencias de ejemplo están al día.</p><button class="btn" data-read>Marcar como leído</button></article></div>`},
  manual: {number:"21",title:"Manual técnico-funcional · ETL de muestra",skill:"SKILL_CrearManuales.md",theme:"light",intro:"Esqueleto ilustrativo inspirado en el skill de manuales. Las tablas y reglas no proceden de un sistema real.",html:`<div class="layout" style="padding-top:0"><nav class="sidebar"><div class="side-title">Contenido</div><a class="side-link" href="#alcance">Alcance</a><a class="side-link" href="#flujo">Flujo E2E</a><a class="side-link" href="#tablas">Tablas</a><a class="side-link" href="#reglas">Reglas</a></nav><div><section id="alcance" class="panel"><span class="tag">DOCUMENTO DE EJEMPLO · V 0.1</span><h2>Propósito y alcance</h2><p>Documentar un flujo ficticio de compensaciones y rezagos desde la extracción hasta el reporte.</p></section><section id="flujo" class="panel"><h2>Flujo de datos E2E</h2><p>Fuentes simuladas → staging TMP → dimensiones DIM y hechos FAC → reporte de muestra.</p></section><section id="tablas" class="panel"><h2>Diccionario resumido</h2><p><b>TMP_MOVIMIENTOS</b> · Tabla temporal de movimientos de prueba.</p><p><b>FAC_COMPENSACIONES</b> · Hechos agregados ficticios.</p></section><section id="reglas" class="panel"><h2>Reglas de negocio</h2><p>Las reglas reales deben validarse contra documentación y responsables del proceso; aquí se muestran solo títulos de ejemplo.</p></section></div></div>`},
  ux: {number:"22",title:"Guía de huertas urbanas",skill:"SKILL_diseño_HTML_UX.md",theme:"cream",intro:"Portal divulgativo de muestra con navegación por pestañas, contenido breve y estilo minimalista.",html:`<div class="filters" role="tablist"><button class="filter active" data-tab="intro">Introducción</button><button class="filter" data-tab="plan">Planificación</button><button class="filter" data-tab="cuidados">Cuidados</button></div><section class="panel" id="tab-panel"><span class="tag">GUÍA EDUCATIVA · CONTENIDO FICTICIO</span><h2 id="tab-title">¿Qué es una huerta urbana?</h2><p id="tab-copy">Es un espacio de cultivo dentro de la ciudad. Incluso un balcón puede servir para iniciar con hierbas y hortalizas.</p></section>`},
  etl: {number:"23",title:"Diagnóstico de rendimiento ETL",skill:"SKILL_OptimizadorETLs.md",theme:"dark",intro:"Caso simulado de una carga ficticia. Las métricas no provienen de SSISDB y no representan una recomendación de cambio.",html:`<div class="notice">DEMO: duración histórica 12 min · duración actual 96 min · ejecución de ejemplo, no conectada a SQL Server.</div><div class="stats"><article class="stat"><span>Duración observada</span><strong>96 min</strong><small>Umbral de demo: 15 min</small></article><article class="stat"><span>Filas procesadas</span><strong>820k</strong><small>Conteo ficticio</small></article><article class="stat"><span>Fase más lenta</span><strong>Data Flow</strong><small>66% del tiempo de muestra</small></article></div><h2>Tiempos por etapa</h2><div class="table-wrap"><table><thead><tr><th>Etapa</th><th>Duración demo</th><th>Participación</th><th>Observación</th></tr></thead><tbody><tr><td>Extracción</td><td>18 min</td><td>19%</td><td>Comparar volúmenes entre ejecuciones</td></tr><tr><td>Transformación</td><td>63 min</td><td>66%</td><td>Revisar métricas y componentes bloqueantes</td></tr><tr><td>Carga final</td><td>15 min</td><td>15%</td><td>Validar estrategia con datos de prueba</td></tr></tbody></table></div><h2>Checklist de análisis</h2><details class="panel"><summary>Confirmar la línea base y el período de comparación</summary><p>Usar ejecuciones comparables y evidencia de SSISDB.</p></details><details class="panel"><summary>Revisar consultas, planes y esperas con el DBA</summary><p>Corroborar hipótesis en un entorno autorizado antes de cambiar procesos.</p></details>`},
  router: {number:"24",title:"Selector de modelo · demo de ahorro",skill:"SKILL_uso_low-cost-model-router.md",theme:"light",intro:"Selector de demostración que ilustra cómo priorizar modalidad y costo. No consulta tarifas ni disponibilidad actuales.",html:`<section class="panel"><label>Tipo de tarea<br><select id="task-type" class="field"><option value="texto">Texto y resumen</option><option value="codigo">Código</option><option value="imagen">Imagen</option></select></label><p><label>Prioridad de costo<br><select id="cost-priority" class="field"><option value="alta">Ahorrar al máximo</option><option value="media">Balance</option></select></label></p><button class="btn primary" data-route>Mostrar recomendación de ejemplo</button><div id="route-result" class="notice" hidden></div></section><p class="muted">La decisión real requiere revisar los precios, límites de créditos, caché y disponibilidad publicados por el proveedor. Los nombres de las opciones en esta demo son ficticios.</p>`}
};

const key = document.body.dataset.demo;
const demo = demos[key];
if (demo) {
  document.body.dataset.theme = demo.theme;
  document.title = `${demo.title} · Ejemplo de skill`;
  const app = document.getElementById("app");
  app.innerHTML = `<header class="topbar"><a class="brand" href="index.html">SKILLS IA <span>· DEMOS</span></a><a class="btn" href="index.html">← Catálogo</a></header><div class="layout"><aside class="sidebar"><div class="side-title">Ejemplo ${demo.number}</div><p style="font-size:14px;line-height:1.5">${demo.title}</p><a class="side-link" href="../${demo.skill}" target="_blank" rel="noreferrer">Abrir skill original ↗</a><a class="side-link" href="index.html">Volver a todos los ejemplos</a><p class="footer">Prototipo con contenido ficticio. No conectado a servicios reales.</p></aside><main class="content"><p class="eyebrow">EJEMPLO ${demo.number} · DATOS DUMMY</p><h1>${demo.title}</h1><p class="intro">${demo.intro}</p>${demo.html}<p class="footer-note">Skill de referencia: <a href="../${demo.skill}" target="_blank" rel="noreferrer">${demo.skill}</a>. Datos y resultados ilustrativos.</p></main></div><div class="modal-backdrop" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><section class="modal"><div class="row"><h2 id="modal-title">Detalle</h2><button class="btn" data-close aria-label="Cerrar">×</button></div><p id="modal-body"></p></section></div><div class="toast" id="toast" role="status"></div>`;
  initializeDemo();
}

function initializeDemo() {
  const app = document.getElementById("app");
  let activeFilter = "all";
  app.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.filter) {
      activeFilter = button.dataset.filter;
      app.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("active", item === button));
      app.querySelectorAll("[data-searchable],[data-category]").forEach(item => {
        const category = item.dataset.category || "";
        item.hidden = activeFilter !== "all" && category !== activeFilter;
      });
    }
    if (button.dataset.modalTitle) openModal(button.dataset.modalTitle, button.dataset.modalBody || "");
    if (button.hasAttribute("data-close")) document.getElementById("modal").classList.remove("open");
    if (button.dataset.toast) showToast(button.dataset.toast);
    if (button.hasAttribute("data-complete")) {
      const progress = document.getElementById("course-progress");
      progress.style.width = "50%";
      document.getElementById("course-count").textContent = "2 de 4 lecciones";
      button.textContent = "Lección completada ✓";
      button.disabled = true;
    }
    if (button.hasAttribute("data-move")) {
      const task = button.closest("[data-task]");
      const column = task.closest(".panel");
      const next = column.nextElementSibling;
      if (next) { next.append(task); button.textContent = "Mover a Hecho →"; }
      else { button.remove(); showToast("Tarea completada (demo)."); }
    }
    if (button.dataset.slide) changeSlide(Number(button.dataset.slide));
    if (button.hasAttribute("data-fullscreen")) document.querySelector(".slide").requestFullscreen?.();
    if (button.dataset.wizard) {
      const direction = Number(button.dataset.wizard);
      if (wizardStep === 1 && direction > 0) {
        const fields = [...document.querySelectorAll("#wizard-step input")];
        if (fields.some(field => !field.checkValidity())) {
          showToast("Completa un nombre y un correo válido para continuar.");
          return;
        }
      }
      if (wizardStep === 2 && direction > 0) {
        showToast("Flujo completado; no se envió información.");
        return;
      }
      changeWizard(direction);
    }
    if (button.dataset.zoom) {
      const label = document.getElementById("zoom-label");
      const current = Number(label.dataset.zoom || 100);
      const zoom = Math.min(140, Math.max(70, current + Number(button.dataset.zoom) * 10));
      label.dataset.zoom = zoom;
      label.textContent = `Zoom ${zoom}%`;
      document.getElementById("mindmap").style.transform = `scale(${zoom / 100})`;
    }
    if (button.dataset.vote !== undefined) {
      app.querySelectorAll("[data-vote]").forEach(item => item.classList.toggle("active", item === button));
      document.getElementById("survey-message").textContent = `Seleccionaste ${button.dataset.vote}/10. Respuesta guardada solo en pantalla.`;
    }
    if (button.hasAttribute("data-results")) document.getElementById("survey-results").hidden = false;
    if (button.dataset.tab) changeTab(button.dataset.tab, button);
    if (button.hasAttribute("data-read")) {
      button.textContent = "Leído ✓";
      button.disabled = true;
      button.closest(".card").style.opacity = ".65";
    }
    if (button.hasAttribute("data-scroll-form")) document.getElementById("lead-form").scrollIntoView({behavior:"smooth"});
    if (button.dataset.copy) {
      navigator.clipboard?.writeText(document.querySelector(button.dataset.copy).innerText).then(() => showToast("Ejemplo copiado."));
    }
    if (button.hasAttribute("data-route")) routeModel();
  });
  app.addEventListener("input", event => {
    if (event.target.matches("[data-search]")) {
      const query = event.target.value.toLocaleLowerCase();
      app.querySelectorAll("[data-searchable]").forEach(item => item.hidden = !item.innerText.toLocaleLowerCase().includes(query));
    }
    if (event.target.matches("[data-mission]")) updateMissions();
  });
  app.addEventListener("submit", event => {
    if (event.target.matches("[data-demo-form]")) {
      event.preventDefault();
      showToast("Envío simulado; no se guardó ningún dato.");
      event.target.reset();
    }
  });
  app.querySelectorAll("[data-sortable] th").forEach((header, index) => header.addEventListener("click", () => sortTable(header.closest("table"), index)));
  document.getElementById("modal")?.addEventListener("click", event => { if (event.target.id === "modal") event.currentTarget.classList.remove("open"); });
}

function openModal(title, body) {
  document.getElementById("modal-title").textContent = title;
  document.getElementById("modal-body").textContent = body;
  document.getElementById("modal").classList.add("open");
}
let toastTimer;
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}
let slideIndex = 0;
const slides = [["Una experiencia más simple","Propuesta de mejora para un servicio ficticio."],["Entender primero","Escuchamos a las personas antes de diseñar la solución."],["Probar y aprender","Una iteración pequeña ayuda a validar las ideas."]];
function changeSlide(step) {
  slideIndex = (slideIndex + step + slides.length) % slides.length;
  const el = document.getElementById("slide");
  el.querySelector("h2").textContent = slides[slideIndex][0];
  el.querySelector("p").textContent = slides[slideIndex][1];
  el.querySelector(".eyebrow").textContent = `PROYECTO AURORA · ${String(slideIndex + 1).padStart(2,"0")} / 03`;
}
let wizardStep = 1;
function changeWizard(step) {
  wizardStep = Math.min(2, Math.max(1, wizardStep + step));
  const container = document.getElementById("wizard-step");
  const title = document.getElementById("wizard-title");
  const status = document.getElementById("wizard-status");
  const progress = document.getElementById("wizard-progress");
  const buttons = document.querySelectorAll("[data-wizard]");
  if (wizardStep === 2) {
    title.textContent = "Paso 2 de 2 · Tu interés";
    container.innerHTML = `<label>¿Qué te gustaría explorar?<br><select class="field"><option>Producto</option><option>Capacitación</option><option>Integraciones</option></select></label>`;
  } else {
    title.textContent = "Paso 1 de 2 · Tu perfil";
    container.innerHTML = `<label>Nombre de ejemplo<br><input class="field" placeholder="Ana Ejemplo" required></label><p><label>Correo de muestra<br><input class="field" type="email" placeholder="ana@ejemplo.test" required></label></p>`;
  }
  status.textContent = `${wizardStep} / 2`;
  progress.style.width = `${wizardStep * 50}%`;
  buttons[0].disabled = wizardStep === 1;
  buttons[1].textContent = wizardStep === 2 ? "Finalizar (demo)" : "Continuar →";
}
function updateMissions() {
  const done = [...document.querySelectorAll("[data-mission]:checked")];
  const xp = done.reduce((sum, item) => sum + Number(item.value), 0);
  document.getElementById("xp-label").textContent = `${xp} / 300 XP`;
  document.getElementById("xp-progress").style.width = `${xp / 3}%`;
  document.getElementById("badge-count").textContent = `${done.length} insignias`;
}
function changeTab(tab, button) {
  const copy = {
    intro:["¿Qué es una huerta urbana?","Es un espacio de cultivo dentro de la ciudad. Incluso un balcón puede servir para iniciar con hierbas y hortalizas."],
    plan:["Planificación","Observa la luz disponible, el espacio y el clima local antes de elegir qué cultivar."],
    cuidados:["Cuidados básicos","Revisa la humedad de la tierra y sigue las recomendaciones adecuadas para cada especie."]
  }[tab];
  document.querySelectorAll("[data-tab]").forEach(item => item.classList.toggle("active", item === button));
  document.getElementById("tab-title").textContent = copy[0];
  document.getElementById("tab-copy").textContent = copy[1];
}
function sortTable(table, column) {
  const body = table.tBodies[0];
  const rows = [...body.rows];
  const ascending = table.dataset.sortDirection !== "asc";
  rows.sort((a,b) => {
    const x = a.cells[column].textContent.trim();
    const y = b.cells[column].textContent.trim();
    return (Number(x) && Number(y) ? Number(x)-Number(y) : x.localeCompare(y,"es")) * (ascending ? 1 : -1);
  });
  rows.forEach(row => body.append(row));
  table.dataset.sortDirection = ascending ? "asc" : "desc";
}
function routeModel() {
  const task = document.getElementById("task-type").value;
  const priority = document.getElementById("cost-priority").value;
  const result = document.getElementById("route-result");
  const choices = {texto:"Modelo Demo-Lite para texto breve",codigo:"Modelo Demo-Code para tareas de programación",imagen:"Modelo Demo-Visual para generación de imágenes"};
  result.textContent = `Recomendación ficticia: ${choices[task]}. Prioridad: ${priority === "alta" ? "menor costo disponible" : "balance entre costo y capacidad"}. Revisa la tarifa real antes de usar un proveedor.`;
  result.hidden = false;
}
