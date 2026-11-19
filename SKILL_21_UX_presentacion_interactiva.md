---
name: ux-presentacion-interactiva
description: Genera presentaciones web, manuales técnicos y portales documentales interactivos bajo una arquitectura visual corporativa (sidebar en árbol jerárquico, portada principal con KPIs y tooltips, paneles envolventes/desenvolventes, acordeones, diagramas explicativos de flujo vertical, mapas conceptuales, mentefactos, causa-efecto, visor lightbox con zoom para imágenes y diagramas, y descarga multiformato). Úsalo siempre que el usuario pida crear una presentación web, manual interactivo o página bajo su estándar UX.
---

# Skill: Arquitectura de Presentaciones Web Interactivas (Estándar Corporativo UX)

Este skill define las reglas estrictas de diseño visual, arquitectura de interfaz (UX/UI) y comportamiento interactivo que debes aplicar al construir cualquier presentación web, manual técnico-funcional o portal analítico.

---

## 1. Principios de Diseño y Paleta Visual (Tokens CSS)

Mantén exactamente la identidad cromática, tipográfica y estructural basada en variables CSS con soporte nativo para **Modo Claro** y **Modo Oscuro** (`[data-theme="dark"]`):

- **Tipografía:** `'Inter'` para interfaz y textos; `'Fira Code'`, `'Consolas'` para bloques de código, fórmulas o metadatos técnicos.
- **Paleta Corporativa:**
  - `--primary: #00b0f0` (Cian corporativo principal)
  - `--primary-dark: #0072b1`
  - `--primary-light: #e6f7fd`
  - `--secondary: #005a8c`
  - `--bg-main: #f8fafc` (Modo Oscuro: `#0b1120`)
  - `--bg-card: #ffffff` (Modo Oscuro: `#1e293b`)
  - `--bg-sidebar: #0f172a` (Modo Oscuro: `#070d17`)
  - `--text-main: #1e293b` (Modo Oscuro: `#f1f5f9`)
  - `--text-muted: #64748b` (Modo Oscuro: `#94a3b8`)
  - `--border: #e2e8f0` (Modo Oscuro: `#334155`)
  - Semánticos: `--success: #10b981`, `--warning: #f59e0b`, `--danger: #ef4444`, `--info: #3b82f6`.

---

## 2. Estructura Obligatoria del Layout

Toda presentación web generada bajo este skill debe ensamblarse en un archivo HTML autocontenido (o estructura modular limpia si se solicita) con las siguientes zonas:

### A. Sidebar Lateral con Menú en Árbol Jerárquico (Tree Menu)
- **Ancho fijo:** `290px` (colapsable en dispositivos móviles con botón hamburguesa).
- **Cabecera de marca (`.brand`):** Icono con degradado corporativo (`#00b0f0` a `#005a8c`), título del proyecto y subtítulo de versión.
- **Árbol de Navegación Multinivel (`.tree-nav`):**
  - Debe soportar ramas principales, sub-ramas y nodos hoja (hasta 3 niveles de profundidad).
  - Cada nodo padre incluye un botón/flecha de expansión/colapso (`▶` / `▼`) y líneas guía verticales sutiles que evidencien la jerarquía.
  - Al hacer clic en un nodo: desplaza suavemente (`scroll-behavior: smooth`) hacia la sección correspondiente, expande automáticamente el panel destino si estaba colapsado y marca el nodo como `.active` con borde izquierdo `#00b0f0`.
  - Incluye un control rápido en el sidebar para **"Expandir todo / Colapsar árbol"**.

### B. Barra Superior Fija (`.top-header`)
- **Buscador global en tiempo real (`#globalSearch`):** Filtra dinámicamente secciones, tarjetas, reglas o nodos del árbol.
- **Controles de Lienzo Global:** Botones rápidos para **"Envolver todos los paneles"** o **"Desenvolver todos los paneles"**.
- **Descarga Multiformato (`.header-actions`):**
  - Botones estilizados para descarga directa de documentos asociados (`.btn-outline` para **PDF** y `.btn-primary` para **DOCX**), además de la capacidad de exportar/imprimir la vista actual en PDF limpio (`window.print()` con hoja de estilos `@media print` optimizada) o descargar el paquete HTML/JSON de datos si aplica.
- **Selector de Tema (`#themeToggle`):** Alterna entre modo claro y oscuro guardando preferencia en `localStorage`.

### C. Portada Principal Obligatoria (`.hero-banner` - Primera Vista)
Siempre debe aparecer como primer elemento visible en el área principal:
- **Etiqueta superior (`.hero-tag`):** Categoría del documento o presentación.
- **Título Principal (`<h1>`) y Resumen Ejecutivo (`<p>`):** Introducción clara, concisa y contextual del tema.
- **Tarjetas KPI Interactivas con Pop-up Tooltips (`.hero-metrics`):**
  - Grid responsivo de tarjetas métricas con valor destacado (`.metric-val`), etiqueta (`.metric-lbl`) e indicador de tendencia o estado.
  - **Pop-up Tooltips:** Al pasar el cursor (`hover`) o hacer clic sobre una tarjeta KPI (o su icono `ⓘ`), se despliega un pop-up flotante estilizado (`.kpi-tooltip`) con la fórmula de cálculo, fuente de datos, meta esperada y notas explicativas, posicionado dinámicamente sin desbordar la pantalla.

---

## 3. Paneles UX Envolventes / Desenvolventes y Acordeones

Cada sección de contenido (`.doc-section`) debe funcionar como un **lienzo modular interactivo**:

1. **Paneles Envolventes / Desenvolventes (Collapsible Canvas):**
   - El encabezado de cada sección (`.section-header`) contiene el número/icono de sección, título, badges de estado y un botón explícito de control (**Envolver / Desenvolver** con icono animado).
   - Al **envolver** un panel, el cuerpo de la sección (`.section-body`) se pliega suavemente mostrando un resumen compacto o etiquetas clave de lo que contiene, liberando espacio visual en el lienzo.
2. **Acordeones Internos (`.accordion-group`):**
   - Dentro de las secciones extensas, las sub-opciones, procedimientos detallados, scripts o preguntas frecuentes se organizan en ítems tipo acordeón (`.accordion-item`) con apertura individual o múltiple, permitiendo al usuario desplegar únicamente la información que necesita analizar.

---

## 4. Capacidades Explicativas y Diagramas Visuales

Para explicar procesos, arquitecturas y análisis de negocio, integra **Mermaid.js v10+** y componentes estructurales HTML/SVG listos para usar, adaptados a los colores corporativos:

1. **Diagramas de Flujo Verticales (`flowchart TD`):**
   - Ideales para procedimientos paso a paso, pipelines ETL, flujos de aprobación y algoritmos de decisión con nodos de inicio/fin, procesos, decisiones (`{}`) y conectores etiquetados.
2. **Mapas Conceptuales (`mindmap` o grafo jerárquico con conectores etiquetados):**
   - Representan conceptos centrales y sus relaciones semánticas mediante palabras de enlace sobre las líneas de conexión.
3. **Mentefactos Conceptuales (Estructura Pedagogía Conceptual):**
   - Implementados mediante un componente visual dedicado de 4 cuadrantes alrededor del concepto central:
     - **Superior (Isoordinada):** Clase general superior a la que pertenece el concepto.
     - **Izquierda (Isoordinadas específicas):** Características esenciales propias del concepto.
     - **Derecha (Exclusiones `≠`):** Conceptos cercanos que se diferencian y excluyen.
     - **Inferior (Infraordinadas):** Subtipos, clases o clasificaciones derivadas del concepto.
4. **Diagramas de Causa-Efecto (Ishikawa / Espina de Pescado):**
   - Implementados mediante plantilla SVG/CSS estructurada que conecta categorías principales (ej. *Métodos, Tecnología, Datos, Personas, Entorno, Medición*) hacia una espina central que desemboca en el **Problema o Efecto Principal**.

---

## 5. Manejo de Evidencias y Visor Lightbox con Zoom Interactivo

Tanto las **imágenes de evidencia** (`.media-card`) como **todos los diagramas** (Mermaid, SVG, Mentefactos, Ishikawa) deben ser interactivos al hacer clic:

- **Indicador visual:** Mostrar un badge sutil `"🔍 Clic para ampliar"` en la esquina superior derecha de cada gráfico o evidencia.
- **Modal Lightbox Avanzado (`#zoomModal`):**
  - Al hacer clic en una imagen o diagrama, se abre en un modal de pantalla amplia con fondo oscuro translúcido (`backdrop-filter: blur(6px)`).
  - **Controles de Zoom y Navegación obligatorios en el modal:**
    - Botones: **Acercar (`+`)**, **Alejar (`-`)**, **Restablecer (`100%`)**, **Ajustar a pantalla**, y **Descargar imagen/SVG**.
    - **Zoom con rueda del ratón (`wheel`)** y **arrastre panorámico (`drag-to-pan`)** cuando el zoom sea mayor al 100%, permitiendo inspeccionar detalles finos de capturas técnicas o diagramas complejos sin pérdida de nitidez.

---

## 6. Tablas, Tarjetas de Reglas y Catálogos Filtrables

- **Tablas Responsivas (`.table-responsive` > `.data-table`):** Cabecera corporativa `#00b0f0` con texto oscuro `#032b3b` (en modo oscuro `#0072b1` con texto blanco), filas alternas, resaltado al pasar el cursor y chips de estado.
- **Grid de Tarjetas Filtrables (`.rules-grid`):** Para reglas de negocio, componentes o evidencias, acompañadas de una barra de filtros por categorías/etiquetas (`.rules-filter-bar`) que actualiza el contador de resultados en vivo.

---

## 7. Checklist de Validación antes de Entregar Código

Al generar la aplicación web, verifica siempre que incluya:
1. [ ] Portada principal (`.hero-banner`) con introducción, tarjetas KPI y **pop-up tooltips** funcionales.
2. [ ] Sidebar lateral con **menú de árbol jerárquico** desplegable por ramas y sub-ramas.
3. [ ] Botones de descarga multiformato en el header superior (PDF, DOCX y exportación/impresión).
4. [ ] Paneles de sección con botones funcionales para **envolver y desenvolver** cada lienzo, más **acordeones** internos para opciones detalladas.
5. [ ] Al menos los diagramas explicativos pertinentes al tema (flujo vertical, mapa conceptual, mentefacto y/o causa-efecto).
6. [ ] **Visor Lightbox con controles de zoom (`+`, `-`, `100%`, rueda y arrastre)** vinculado tanto a las imágenes de evidencia como a los contenedores de diagramas.
7. [ ] Soporte completo de **Modo Claro / Oscuro** y diseño responsivo.