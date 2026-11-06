# SKILL: Generador de Portales de Documentación y Conocimiento Minimalista (HTML/CSS/JS)

## 1. Propósito y Filosofía del Skill
El objetivo principal de este skill es **estructurar, documentar y divulgar conocimiento general, técnico o académico** de forma clara, directa e imparcial. 
* **Enfoque:** Divulgativo, educativo y documental (sin propósitos de venta, marketing ni oferta de servicios).
* **Experiencia de Usuario (UX):** Organización modular mediante pestañas y paneles dinámicos. Toda la información debe ser accesible sin saturar la pantalla principal ni obligar al usuario a hacer desplazamientos verticales infinitos.
* **Estética (UI):** Minimalismo puro, sobrio y elegante, basado en tonalidades crema/pasteles suaves con bordes estructurados de alto contraste visual pero sin estridencias.

---

## 2. Sistema de Diseño (Design System)

### Tipografía
* **Familia principal:** `Arial, Helvetica, sans-serif` (Limpia, neutra, legible y profesional, sin adornos innecesarios).
* **Estilos:** Títulos en peso semi-bold (`600`), cuerpo de texto en peso normal (`400`). Línea de altura (`line-height: 1.6`) para maximizar la legibilidad.

### Paleta de Colores Oficial
| Uso en la Interfaz | Código HEX | Descripción |
| :--- | :--- | :--- |
| **Fondos Principales** | `#FFFFFF`<br>`#FFFAFA` | Blanco puro / Blanco Nieve (para el lienzo general y contenedores principales). |
| **Pestañas y Ventanas (Superficies)** | `#FFFFE0`<br>`#FAF0E6`<br>`#F5FFFA` | Amarillo claro / Lino suave / Menta crema (para diferenciar contenedores y pestañas activas). |
| **Marcos y Bordes (Alto Contraste)** | `#B0C4DE`<br>`#B0E0E6`<br>`#7FFFD4` | Azul acero claro / Azul polvo / Aquamarina (para límites de módulos, botones y divisores). |
| **Texto y Lectura** | `#000000` | Negro puro (máximo contraste y sobriedad tipográfica). |

---

## 3. Reglas de Estructura e Interfaz (UX Rules)
1. **Navegación por Pestañas (Tabbed UI):** El contenido debe dividirse en módulos lógicos mediante pestañas horizontales superiores. Solo se muestra la pestaña activa.
2. **Ventanas Modales o Paneles Desplegables:** Para profundizar en detalles o referencias sin abandonar la vista actual ni recargar la página.
3. **Botones de Control Limpios:** Los botones de interacción deben ser sobrios, con bordes definidos utilizando las tonalidades de alto contraste de la paleta (`#B0C4DE`, `#B0E0E6`, `#7FFFD4`) y estados *hover* sutiles.
4. **Sin Saturación Visual:** Distribución con espacio en blanco adecuado (*padding* generoso de 16px a 24px) y tarjetas con bordes suaves de 1px a 2px.

---

## 4. Plantilla Base de Código (Template HTML5 / CSS / JS)

Cada vez que este skill genere un archivo HTML, utilizará la siguiente arquitectura:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Documentación y Conocimiento</title>
    <style>
        /* Base y Tipografía Sobria */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #FFFAFA;
            color: #000000;
            line-height: 1.6;
            padding: 20px;
            display: flex;
            justify-content: center;
        }

        /* Contenedor Principal Minimalista */
        .main-container {
            width: 100%;
            max-width: 1000px;
            background-color: #FFFFFF;
            border: 2px solid #B0C4DE;
            border-radius: 6px;
            padding: 24px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
        }

        header {
            border-bottom: 2px solid #B0E0E6;
            padding-bottom: 16px;
            margin-bottom: 20px;
        }

        header h1 {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 6px;
        }

        header p {
            font-size: 14px;
            color: #333333;
        }

        /* Navegación por Pestañas */
        .tabs-nav {
            display: flex;
            gap: 8px;
            border-bottom: 2px solid #B0C4DE;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }

        .tab-button {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 14px;
            background-color: #FAF0E6;
            border: 1px solid #B0C4DE;
            border-bottom: none;
            padding: 10px 18px;
            cursor: pointer;
            border-radius: 4px 4px 0 0;
            transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .tab-button:hover {
            background-color: #FFFFE0;
            border-color: #7FFFD4;
        }

        .tab-button.active {
            background-color: #FFFFE0;
            font-weight: bold;
            border: 2px solid #B0C4DE;
            border-bottom: 2px solid #FFFFE0;
            margin-bottom: -2px;
        }

        /* Contenido de Paneles */
        .tab-content {
            display: none;
            background-color: #F5FFFA;
            border: 1px solid #B0E0E6;
            padding: 20px;
            border-radius: 4px;
        }

        .tab-content.active {
            display: block;
        }

        .tab-content h2 {
            font-size: 18px;
            margin-bottom: 12px;
            border-bottom: 1px solid #7FFFD4;
            padding-bottom: 4px;
        }

        /* Botones de Acción Internos */
        .btn-action {
            font-family: Arial, Helvetica, sans-serif;
            background-color: #FAF0E6;
            border: 1px solid #B0C4DE;
            color: #000000;
            padding: 8px 14px;
            font-size: 13px;
            cursor: pointer;
            border-radius: 3px;
            margin-top: 10px;
            display: inline-block;
        }

        .btn-action:hover {
            background-color: #7FFFD4;
            border-color: #B0E0E6;
        }

        /* Panel Desplegable / Ventana Secundaria */
        .info-box {
            margin-top: 15px;
            background-color: #FFFFE0;
            border: 1px dashed #B0C4DE;
            padding: 12px;
            font-size: 13px;
            display: none;
        }
    </style>
</head>
<body>

<div class="main-container">
    <header>
        <h1>Compendio de Conocimiento</h1>
        <p>Documentación técnica y registro de información general.</p>
    </header>

    <!-- Barra de Pestañas -->
    <nav class="tabs-nav">
        <button class="tab-button active" onclick="switchTab(event, 'tab1')">1. Introducción</button>
        <button class="tab-button" onclick="switchTab(event, 'tab2')">2. Metodología</button>
        <button class="tab-button" onclick="switchTab(event, 'tab3')">3. Referencias</button>
    </nav>

    <!-- Contenido Pestaña 1 -->
    <section id="tab1" class="tab-content active">
        <h2>Introducción al Tema</h2>
        <p>Este espacio está destinado a la presentación objetiva de conceptos, fundamentos e información estructurada sin fines comerciales.</p>
        <button class="btn-action" onclick="toggleInfo('details-1')">Ver detalles complementarios</button>
        <div id="details-1" class="info-box">
            <p><strong>Nota técnica:</strong> Aquí se incluye información secundaria o notas aclaratorias que no recargan la vista principal.</p>
        </div>
    </section>

    <!-- Contenido Pestaña 2 -->
    <section id="tab2" class="tab-content">
        <h2>Metodología y Procesos</h2>
        <p>Descripción detallada de la estructura de datos, procedimientos y análisis aplicados.</p>
    </section>

    <!-- Contenido Pestaña 3 -->
    <section id="tab3" class="tab-content">
        <h2>Referencias y Fuentes</h2>
        <p>Recopilación de documentación, bibliografía y recursos para consulta pública.</p>
    </section>
</div>

<script>
    function switchTab(event, tabId) {
        const contents = document.querySelectorAll('.tab-content');
        contents.forEach(content => content.classList.remove('active'));

        const buttons = document.querySelectorAll('.tab-button');
        buttons.forEach(button => button.classList.remove('active'));

        document.getElementById(tabId).classList.add('active');
        event.currentTarget.classList.add('active');
    }

    function toggleInfo(infoId) {
        const box = document.getElementById(infoId);
        if (box.style.display === "block") {
            box.style.display = "none";
        } else {
            box.style.display = "block";
        }
    }
</script>

</body>
</html>
```