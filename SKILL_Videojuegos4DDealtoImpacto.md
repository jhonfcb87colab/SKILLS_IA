Actúa como un Desarrollador Senior de Videojuegos Web y Experto en Gráficos 3D con WebGL/Three.js. 

Quiero que diseñes y programes la estructura completa, la lógica de juego y el código base (HTML, CSS y JavaScript modular) para un videojuego de disparos en primera persona (FPS) web altamente inmersivo, con un estilo visual detallado y realista (similar a la atmósfera de terror y acción de Doom combinado con Resident Evil).

---

### 1. TRAMA Y AMBIENTACIÓN
- **Escenario:** Una gigantesca nave nodriza interestelar que viaja con destino al exoplaneta Kepler.
- **Incidente:** Se ha desatado un brote viral desconocido a bordo que ha mutado a la tripulación y pasajeros en horribles criaturas infectadas/zombis espaciales.
- **Misión Principal:** El jugador comienza en las entrañas de la nave y debe abrirse paso luchando nivel por nivel hasta llegar a la cúspide (la zona de hangares superiores) para escapar en un transbordador de emergencia.
- **Clímax / Final del Juego:** En el último nivel, antes de abordar el transbordador, el jugador debe activar una secuencia de autodestrucción de la nave nodriza con temporizador, agregando tensión extrema a la huida final.

---

### 2. ESTRUCTURA DE NIVELES (15 NIVELES)
El juego debe estructurarse en una progresión de 15 niveles con cambios graduales en la escenografía y dificultad:
- **Niveles 1-3 (Cubiertas Inferiores / Ingeniería):** Pasillos industriales oscuros, tuberías de vapor, luces parpadeantes, paneles metálicos oxidados y filtraciones de líquido criogénico.
- **Niveles 4-7 (Áreas de Tripulación / Laboratorios):** Habitaciones estériles pero ensangrentadas, laboratorios de investigación genética alienígena de Kepler, cristales rotos y alarmas rojas estroboscópicas.
- **Niveles 8-11 (Zonas de Carga y Almacenamiento):** Espacios cavernosos y verticales con pasarelas metálicas suspendidas sobre el abismo de la nave, contenedores de carga revueltos.
- **Niveles 12-14 (Puente de Mando / Zonas de Lujo):** Arquitectura futurista elegante pero devastada, pantallas holográficas destruidas, estelas de fuego y cadáveres por doquier.
- **Nivel 15 (Cúspide / Hangares y Núcleo de Energía):** La zona final donde se encuentra el panel de autodestrucción, la cuenta atrás y el transbordador de escape.

---

### 3. MECÁNICAS DE JUEGO Y JUGABILIDAD
- **Estilo de Juego:** FPS frenético (inspirado en Doom clásico y Call of Duty en cuanto a manejo de armas, recarga y tensión de combate).
- **Enemigos (Infectados):** Diferentes tipos de zombis espaciales (caminantes lentos pero resistentes, mutaciones ágiles que corren, y monstruos blindados o jefes de sección).
- **Arsenal:** Sistema de selección de armas (Pistola táctica, Escopeta de combate de alta potencia para corta distancia, y Rifle de asalto).
- **Interfaz (HUD):** Barra de vida, contador de munición, indicador de nivel actual, mapa táctico básico y temporizador de cuenta atrás (para el nivel 15).

---

### 4. APARTADO TÉCNICO Y GRÁFICO (WEB)
- Utiliza **HTML5 Canvas** junto con **Three.js** (o un motor WebGL optimizado) para renderizar entornos 3D realistas.
- Implementa iluminación dinámica avanzada, sombras proyectadas en tiempo real, efectos de partículas (chispas, humo, sangre) y niebla volumétrica para potenciar la atmósfera claustrofóbica y tétrica de Resident Evil.
- Optimiza el rendimiento para que funcione fluidamente en navegadores web modernos.

---

Por favor, entrégame:
1. La arquitectura del código dividida en archivos limpios (`index.html`, estilos CSS, y la lógica en JavaScript).
2. El código fuente funcional del núcleo del juego (bucle de renderizado 3D, controles de movimiento FPS con ratón y teclado, sistema de colisiones, enemigos básicos con IA de persecución y sistema de disparo).
3. Las instrucciones claras sobre cómo estructurar los 15 niveles de forma modular dentro del código.