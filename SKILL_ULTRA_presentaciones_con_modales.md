---
name: presentation-card-system
description: Estándar visual y funcional para presentaciones web interactivas basadas en tarjetas con ventanas emergentes (Pop-ups/Modales) al hacer clic.
---

# SKILL: Sistema de Presentaciones Interactivas con Tarjetas y Pop-Ups

## 1. Propósito y Contexto
Este *Skill* define la arquitectura HTML, CSS y JavaScript obligatoria para generar presentaciones web modernas. El objetivo es mantener una identidad visual coherente basada en cuadrículas de tarjetas (*Cards*) limpias y profesionales, incorporando de forma nativa una ventana emergente (**Pop-up / Modal**) cada vez que el usuario hace clic sobre cualquier tarjeta para ampliar la información.

---

## 2. Reglas de Diseño Visual (UI / Estética)
Toda presentación generada bajo este *Skill* debe respetar los siguientes parámetros visuales (adaptables si se provee una paleta específica):

* **Tipografía:** Sans-serif moderna (`Inter`, `Plus Jakarta Sans` o `system-ui`), con jerarquía clara entre títulos de diapositiva, títulos de tarjeta y texto de lectura.
* **Layout (Disposición):** Cuadrícula responsiva (`CSS Grid`) centrada en pantalla (`max-width: 1200px`), con espaciado uniforme (`gap: 1.5rem`).
* **Estilo de Tarjetas (`.card`):**
  * Bordes redondeados (`border-radius: 16px`).
  * Fondo contrastante con elevación sutil (`box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08)`).
  * Micro-interacción obligatoria al pasar el cursor (`:hover`): elevación ligera (`transform: translateY(-5px)`), cambio de borde o brillo, y cursor tipo puntero (`cursor: pointer`).
  * Indicador visual sutil (ej. un ícono `+` o texto *"Ver más"*) que invite a hacer clic.

---

## 3. Funcionalidad Obligatoria: Sistema de Pop-Up (Modal)
Cada tarjeta **debe** ser interactiva. Al hacer clic en ella, se debe desplegar un Pop-up centrado en la pantalla con fondo desenfocado (*backdrop-filter: blur*).

### Requisitos del Pop-Up:
1. **Atributos de datos en HTML:** Cada tarjeta debe almacenar su contenido extendido mediante atributos `data-*` (ej. `data-title`, `data-subtitle`, `data-content`, `data-tag`).
2. **Estructura del Modal:** Un único contenedor `#presentation-modal` al final del `<body>` que se rellena dinámicamente con JavaScript al hacer clic en la tarjeta.
3. **Cierre intuitivo:** El Pop-up debe poder cerrarse de tres formas:
   * Haciendo clic en el botón de cerrar (`×`).
   * Haciendo clic fuera de la caja del modal (en el fondo oscuro).
   * Presionando la tecla `Escape`.
4. **Animación:** Transición suave de opacidad y escala (`transform: scale(0.95)` a `scale(1)`).

---

## 4. Plantilla Base de Implementación (Código de Referencia)

Utiliza siempre esta estructura base al construir nuevas presentaciones:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentación Interactiva</title>
  <style>
    :root {
      --bg-main: #f8fafc;
      --bg-card: #ffffff;
      --text-primary: #0f172a;
      --text-secondary: #475569;
      --accent: #3b82f6;
      --border-color: #e2e8f0;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
    body { background-color: var(--bg-main); color: var(--text-primary); padding: 2rem; }

    .slide-container { max-width: 1200px; margin: 0 auto; }
    .slide-header { margin-bottom: 2.5rem; text-align: center; }
    .slide-header h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .slide-header p { color: var(--text-secondary); font-size: 1.1rem; }

    /* Grid de Tarjetas */
    .cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    /* Estilo de Tarjeta */
    .card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: 16px;
      padding: 1.75rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
      transition: all 0.25s ease;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.12);
      border-color: var(--accent);
    }

    .card-badge {
      display: inline-block;
      background: #eff6ff;
      color: var(--accent);
      font-size: 0.75rem;
      font-weight: 700;
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      margin-bottom: 1rem;
      width: fit-content;
    }

    .card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
    .card p { color: var(--text-secondary); line-height: 1.5; font-size: 0.95rem; }
    .card-footer { margin-top: 1.5rem; font-size: 0.85rem; font-weight: 600; color: var(--accent); }

    /* Estilos del Pop-Up (Modal) */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
      opacity: 0;
      visibility: hidden;
      transition: all 0.25s ease;
      z-index: 1000;
    }

    .modal-overlay.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-box {
      background: var(--bg-card);
      border-radius: 20px;
      max-width: 600px;
      width: 100%;
      padding: 2.5rem;
      position: relative;
      transform: scale(0.92);
      transition: transform 0.25s ease;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .modal-overlay.active .modal-box {
      transform: scale(1);
    }

    .modal-close {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
      background: #f1f5f9;
      border: none;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      font-size: 1.25rem;
      cursor: pointer;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .modal-close:hover { background: #e2e8f0; color: var(--text-primary); }
    .modal-body h2 { font-size: 1.75rem; margin: 0.5rem 0 1rem; }
    .modal-body p { color: var(--text-secondary); line-height: 1.7; font-size: 1.05rem; }
  </style>
</head>
<body>

  <main class="slide-container">
    <header class="slide-header">
      <h1>Título de la Presentación</h1>
      <p>Haz clic en cualquier tarjeta para explorar los detalles</p>
    </header>

    <section class="cards-grid">
      <!-- Ejemplo de Tarjeta con datos para el Pop-Up -->
      <article class="card" 
               data-badge="Módulo 01" 
               data-title="Título Completo del Punto" 
               data-details="Aquí va toda la explicación extendida, datos clave, métricas o conclusiones que aparecerán dentro del Pop-Up cuando el usuario haga clic en esta tarjeta.">
        <div>
          <span class="card-badge">Módulo 01</span>
          <h3>Título Resumido</h3>
          <p>Breve descripción introductoria visible en la tarjeta principal.</p>
        </div>
        <div class="card-footer">Ampliar información →</div>
      </article>
    </section>
  </main>

  <!-- Contenedor Único del Pop-Up -->
  <div class="modal-overlay" id="presentation-modal" aria-hidden="true">
    <div class="modal-box" role="dialog" aria-modal="true">
      <button class="modal-close" id="modal-close-btn" aria-label="Cerrar">&times;</button>
      <div class="modal-body">
        <span class="card-badge" id="modal-badge"></span>
        <h2 id="modal-title"></h2>
        <p id="modal-details"></p>
      </div>
    </div>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const cards = document.querySelectorAll('.card');
      const modal = document.getElementById('presentation-modal');
      const closeBtn = document.getElementById('modal-close-btn');
      
      const modalBadge = document.getElementById('modal-badge');
      const modalTitle = document.getElementById('modal-title');
      const modalDetails = document.getElementById('modal-details');

      // Abrir Pop-Up al hacer clic en cualquier tarjeta
      cards.forEach(card => {
        card.addEventListener('click', () => {
          modalBadge.textContent = card.dataset.badge || 'Detalle';
          modalTitle.textContent = card.dataset.title || card.querySelector('h3').textContent;
          modalDetails.textContent = card.dataset.details || card.querySelector('p').textContent;
          
          modal.classList.add('active');
          modal.setAttribute('aria-hidden', 'false');
        });
      });

      // Funciones de cierre
      const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModal(); });
    });
  </script>
</body>
</html>
```

---

## 5. Instrucciones para el Asistente al usar este Skill
Cuando el usuario solicite crear una presentación usando este `SKILL.md`:
1. Mantén **intactos** los estilos CSS base, variables y la lógica JavaScript del modal.
2. Adapta únicamente los textos, colores (si el usuario pide un tema específico) y la cantidad de tarjetas dentro de `.cards-grid`.
3. Asegúrate de que **todas** las tarjetas incluyan contenido rico y detallado dentro de su atributo `data-details` (puedes incluir HTML enriquecido usando `innerHTML` si se requieren listas o negritas dentro del Pop-up).