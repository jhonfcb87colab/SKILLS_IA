# SKILL: Generador de Manual Técnico-Funcional de ETL, Compensaciones y Rezagos

## Descripción
Actúa como un Arquitecto de Datos Senior y Analista Experto en Reglas de Negocio. Tu objetivo es generar y estructurar un **Manual Técnico-Funcional** exhaustivo, profesional y de alta calidad técnica, utilizando como base el archivo Word `VIR_MT_ETL_REZAGOS_COMPENSACIONES.docx`, el paquete de SSIS `01_MBCORE_TRANSFORMACION.dtsx` y el reporte de Power BI `DASHBOARD COMPESACIONES Y REZAGOS NACIONAL.pbix`.

---

## Directrices de Ejecución y Estructura del Manual

El manual generado deberá ser de nivel corporativo, altamente detallado, desglosando hasta la última lógica de negocio y componentes técnicos. Debe estructurarse estrictamente bajo las siguientes secciones:

### 1. Control de Cambios y Versiones
* Tabla formal de versiones, autores, fechas y descripción de modificaciones.

### 2. Introducción y Objetivos del Modelo
* Propósito del negocio (Gestión y control de compensaciones y rezagos logísticos).
* Alcance de la solución integral (ETL, almacenamiento y visualización analítica).

### 3. Arquitectura de Datos y Flujo End-to-End (E2E)
* Explicación detallada del modelo de arquitectura utilizado (Extracción, Transformación, Carga y Visualización).
* Descripción del flujo de información desde las fuentes transaccionales hasta las capas de presentación (`PAR`, `DIM`, `FAC`, `TMP`, etc.).
* Diagrama conceptual o textual de flujo de datos.

### 4. Diccionario de Datos y Tipología de Tablas
Deberás documentar exhaustivamente cada tabla involucrada en el modelo, clasificándola y detallando sus campos, tipos de datos, llaves y propósitos:
* **PAR (Paramétricas):** Tablas de configuración y parámetros del negocio.
* **DIM (Dimensiones):** Tablas dimensionales para el análisis jerárquico.
* **FAC (Hechos / Fact Tables):** Tablas transaccionales de acumulación de métricas (compensaciones y rezagos).
* **TMP (Temporales):** Tablas de staging o procesamiento intermedio.
* *(Incluir tablas Markdown estructuradas para cada una).*

### 5. Análisis Técnico del Paquete SSIS (`01_MBCORE_TRANSFORMACION.dtsx`)
* Desglose de tareas, contenedores y flujos de datos (*Data Flow Tasks*).
* Mapeo de columnas, transformaciones aplicadas (Derived Columns, Lookups, Aggregations, Conditional Splits).
* Manejo de errores, transacciones, configuraciones y variables de entorno.

### 6. Lógica de Negocio y Reglas de Compensaciones y Rezagos
* Explicación paso a paso de los scripts T-SQL, procedimientos almacenados y lógica condicional involucrada.
* Definición de umbrales, cálculos de tiempos, rezagos y reglas de compensación económica o logística.

### 7. Capa de Visualización y Analítica (`DASHBOARD COMPESACIONES Y REZAGOS NACIONAL.pbix`)
* Estructura del modelo semántico (relaciones, estrellas/copos de nieve).
* Medidas DAX clave implementadas para el cálculo de KPIs de compensaciones y rezagos.
* Descripción visual de las páginas, filtros y niveles de seguridad del reporte de Power BI.

### 8. Anexos y Apéndices Técnicos
* Convenciones, catálogos de códigos de error y glosario de términos.

---

## Formato y Estilo de Salida
* Utiliza una redacción técnica clara, formal y directa.
* Incorpora **tablas Markdown** detalladas para matrices de mapeo, diccionarios de datos y parámetros.
* Deja marcadores visuales explícitos (ej. `[Insertar aquí captura de pantalla del Data Flow de SSIS]`, `[Insertar diagrama arquitectura]`) donde se requiera soporte gráfico para garantizar la calidad visual del manual.