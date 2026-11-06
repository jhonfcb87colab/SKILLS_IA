---
name: low-cost-model-router
description: Selecciona siempre el modelo de menor consumo de créditos de Abacus.AI según la modalidad (texto, código, audio, imagen, video) y el nivel de créditos disponible. Solo recomienda opciones de costo mínimo.
version: 1.0 (tarifas verificadas 2026-11-04)
---

# Skill: Router de mínimo costo de créditos

## 1. Propósito

Antes de ejecutar cualquier tarea, elegir el modelo MÁS BARATO que cumpla el requisito, priorizando siempre los modelos de uso ILIMITADO (siguen funcionando cuando se agotan los créditos). Nunca recomendar un modelo costoso por defecto.

## 2. Regla de oro

1. Si la tarea se puede resolver con TEXTO, no usar imagen/audio/video.
2. Si el usuario informa créditos bajos o agotados → SOLO se permite un modelo de la Lista A.
3. Si hay créditos pero se busca ahorro → Lista B o Lista A.
4. Preferir caché: reutilizar contexto repetido baja el costo de entrada hasta 20x.
5. Limitar `max_tokens` de salida al mínimo necesario (la salida cuesta 2-6x más que la entrada).

## 3. Lista A — ILIMITADOS (sin límite tras agotar créditos)

Créditos por millón de tokens (entrada / salida / entrada cacheada):

| Modelo | ID | Entrada | Salida | Cacheada |
|---|---|---|---|---|
| GLM 5.3 Flash | zai-org/GLM-5.3-Flash | 150 | 500 | 30 |
| DeepSeek V4.1 Flash | deepseek-ai/DeepSeek-V4.1-Flash-1017 | 220 | 660 | 7 |
| MiMo V2.6 Pro | mimo-v2.6-pro | 435 | 870 | 3,6 |
| Gemini 3.5 Flash Lite | gemini-3.5-flash-lite | 300 | 2.500 | 30 |
| DeepSeek V4 Flash 0731 | deepseek-ai/DeepSeek-V4-Flash-0731 | 440 | 1.320 | 28 |
| DeepSeek V4 Pro | deepseek-ai/DeepSeek-V4-Pro-0813 | 1.320 | 3.960 | 44 |
| Kimi K2.7 Code | moonshotai/Kimi-K2.7-Code | 950 | 4.000 | 190 |
| Muse Spark 1.3 | muse-spark-1.3 | 1.250 | 4.250 | 150 |
| GPT-5.4 Mini | gpt-5.4-mini | 750 | 4.500 | 75 |
| GLM 5.3 | zai-org/GLM-5.3 | 1.400 | 4.400 | 260 |
| RouteLLM | route-llm | 2.000 | 10.000 | 100 |
| RouteLLM (Code) | route-llm-code | 2.000 | 10.000 | 100 |
| RouteLLM (Code, Low) | route-llm-code-low | 100 | 400 | 5 |

### Elección dentro de la Lista A

- Chat general, resúmenes, traducción → GLM 5.3 Flash.
- Código con OpenCode / agentes → DeepSeek V4.1 Flash; variante más barata: route-llm-code-low.
- Contextos muy largos (>200K) → DeepSeek V4.1 Flash o GLM 5.3 Flash (1M de contexto).
- Voz o redacción en español con tono fino → MiMo V2.6 Pro.
- Solo si se necesita razonamiento superior → DeepSeek V4 Pro; jamás Claude Opus o GPT-6 Astra por defecto.

## 4. Lista B — de pago, pero de costo mínimo absoluto

Solo con créditos disponibles.

| Modelo | ID | Entrada | Salida |
|---|---|---|---|
| GPT-OSS 120B | openai/gpt-oss-120b | 37 | 170 |
| GPT-5 Nano | gpt-5-nano | 50 | 400 |
| Smaug Flash | abacusai/Smaug-Flash | 100 | 400 |
| Muse Spark 1.3 Contributor | muse-spark-1.3-contributor | 100 | 200 |
| GPT-6 Luna | gpt-6-luna | 100 | 500 |
| Claude Haiku 5.5 | claude-haiku-5-5 | 100 | 500 |
| Gemma 4 31B IT | google/gemma-4-31b-it | 140 | 400 |
| GPT-4o Mini | gpt-4o-mini | 150 | 600 |
| Qwen3.8 Flash Next | Qwen/Qwen3.8-Flash-Next | 150 | 470 |
| MiniMax M3.1 Flash | MiniMaxAI/MiniMax-M3.1-Flash | 150 | 600 |
| GPT-5.6 Luna | gpt-5.6-luna | 200 | 1.200 |
| GPT-5.4 Nano | gpt-5.4-nano | 200 | 1.250 |
| Gemini 3.1 Flash Lite | gemini-3.1-flash-lite | 250 | 1.500 |

## 5. AUDIO (tarifas verificadas por millón de tokens)

| Modelo | Entrada | Salida | Veredicto |
|---|---|---|---|
| Gemini 2.5 Flash TTS | 500 | 0 | MÁS BARATO: voz sintetizada |
| GPT Audio Mini | 600 | 2.400 | Alternativa económica |
| Gemini 2.5 Pro TTS | 1.000 | 0 | Voz de mayor calidad |
| GPT Audio 1.5 | 2.500 | 10.000 | Evitar salvo que se exija |

Regla: para TTS elegir siempre Gemini 2.5 Flash TTS. Para transcripción, GPT 4o Mini Transcribe o GPT Transcribe según longitud.

## 6. IMAGEN Y VIDEO — sin tarifa pública por unidad

El endpoint no publica precio por imagen/segundo de video para los generadores dedicados (GPT Image, Nano Banana Pro, FLUX.2, Seedream, Sora, Veo, Kling, Wan, Seedance, Hailuo, Luma, Runway, etc.). Protocolo obligatorio:

1. Nunca estimar un costo de imagen o video: decir que no está publicado.
2. Recomendar la variante Lite/Mini/Flash como heurística NO VERIFICADA (Nano Banana Lite, Seedream 5 Lite, Veo 3.1 Lite, Seedance 2.0 Mini) y avisar que el consumo real se confirma en el Credit Usage Log.
3. Sugerir UNA sola generación de prueba y luego leer el log antes de repetir.
4. Si la imagen admite salida multimodal por tokens, Nano Banana (Gemini 2.5 Flash Image) publica 300 entrada / 30.000 salida por millón; Nano Banana 2.1 publica 1.500 / 7.500. Verificar en el log porque el costo real por imagen difiere.
5. Si el objetivo es un diagrama o esquema, proponer SVG/código en lugar de generar imagen.

## 7. Fórmula de cálculo

```
créditos = (tokens_entrada × tasa_entrada + tokens_salida × tasa_salida) / 1.000.000
```

donde las tasas son las de las tablas (créditos por millón). Con texto ya en caché, sustituir tasa_entrada por la columna "cacheada".

## 8. Formato obligatorio de respuesta

- Modelo recomendado + ID exacto
- Costo estimado en créditos para el tamaño de la tarea
- Alternativa más barata, si existe
- Si es lista limitada: indicar cuántos créditos consumiría del saldo mensual
- Nunca mencionar modelos premium como opción por defecto

## 9. Prohibiciones

- No recomendar Claude Opus, Claude Fable, GPT-6 Astra, Muse Wonder, Gemini 4 Argon, Grok o Kimi K3 salvo pedido explícito del usuario y con advertencia de costo.
- No afirmar que los modelos "free" tienen costo cero: siguen acumulando créditos, solo que no se bloquean al agotarse.
- No inventar tarifas de imagen ni de video.
- No convertir 20.000 créditos en una cifra fija de tokens sin separar entrada de salida.

## 10. Actualización

Las tarifas cambian cuando los proveedores las actualizan. Refrescar con:

```
GET https://routellm.abacus.ai/v1/models
```
