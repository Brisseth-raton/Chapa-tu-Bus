# Chapa tu Bus · Versión 3 (mejoras de movilidad y accesibilidad)

Aplicación web para explorar servicios del Metropolitano y corredores, planificar recorridos, consultar material de ATU y probar el avance de un viaje. Frontend estático (`dist/`), sin instalación de dependencias. La búsqueda de lugares y los mapas requieren conexión a Internet.

## Iniciar en la computadora

Desde el directorio `Chapa_tu_Bus`, ejecuta:

```bash
python -m http.server 8000 --directory dist
```

Después abre `http://localhost:8000`. Para usar el micrófono y el GPS en celulares, publica la web mediante HTTPS.

## Cambios de esta versión

- **Contraste:** botones principales amarillos con letras azul oscuro. Se corrigió la regla heredada que pintaba los botones azules y ocultaba su texto.
- **Voz más natural:** conversación con saludos, variaciones de respuestas y elección de opciones; comprende expresiones como `Estoy en la avenida La Marina y quiero ir a UTEC`, `elige la segunda`, `más despacio` o `desde mi ubicación`. Reconocimiento y síntesis dependen del navegador. Si no hay reconocimiento, escribe en el panel del asistente.
- **Integración con un agente LLM opcional:** `dist/agent.js` y `backend/agent-lambda/` muestran cómo conectar un modelo conversacional con herramientas y autenticación. **No hay backend de IA desplegado ni claves incluidas.** Por defecto el asistente utiliza un intérprete local que no es IA generativa. Ver `backend/README.md`.
- **Mapa desde calles/lugares:** ya no existe el límite de 2 km respecto a estaciones del Metropolitano. Puedes buscar direcciones mediante Photon/OSM, elegir puntos en el mapa y elegir ubicación actual con permiso. Las opciones propias todavía cubren geográficamente el Metropolitano; el mapa advierte cuando hay un acceso largo. Se añade un enlace para **comparar transporte público externo** desde el origen al destino, incluyendo alternativas fuera del catálogo propio.
- **Corredores complementarios:** Azul (301, 303), Rojo (201, 204) y Morado (404) se consultan y simulan en «Rutas y horarios» / «Por paradas». Las paradas y sentidos proceden del catálogo anterior, no de un feed activo. El mapa propio **no calcula aún trazados geográficos completos de corredores** al carecer de un conjunto verificado de coordenadas de paraderos.
- **Alimentadores:** sección con ocho servicios citados en publicaciones oficiales de la ATU (Bertello, Milagros de Jesús, Puente Piedra, Los Olivos, Puno, Naranjal, San Juan de Dios y Antúnez de Mayolo), con enlaces y terminales de conexión. No se inventan listas completas de paraderos ni tiempos.
- **Guías oficiales:** seis tutoriales con instrucciones y enlaces directos a comunicados y campañas ilustradas de la ATU sobre tarjetas, medio pasaje, Plin, tarifas, elección de ruta y accesibilidad.
- **Avisos:** dos mensajes operativos permanecen explícitamente como **demostración**; se muestran noticias de ATU con fechas y enlaces verificables. Sin suscripción a un feed oficial de incidencias en vivo.
- **Simulación más lenta:** a velocidad 1×, cada parada dura unos 12 segundos en la simulación; se muestra `Nos acercamos a ...` y el nombre de la estación. El usuario puede pausar o avanzar manualmente. El aviso de demostración permanece para evitar confundirlo con localización real.

## Comprobación

```bash
node tests/transit.cjs
node tests/journey.cjs
node tests/voice.cjs
node tests/enhancements.cjs
```

## GitHub / AWS Amplify

Cuando Amplify está conectado a la rama que publicas en GitHub y el *auto build* está activado, un `git push` desencadena un nuevo despliegue. No sincroniza cambios en sentido contrario: **el ZIP no actualiza por sí mismo tu repositorio GitHub**.

Este paquete contiene el proyecto con `dist/index.html` y sus recursos. Si tu repositorio actual publica la carpeta `dist/`, conserva su configuración de build y copia los archivos nuevos o modificados del paquete; si Amplify espera el directorio raíz, revisa su `baseDirectory` para servir `dist/`. No subas claves de proveedor de IA, secretos de AWS ni tokens a GitHub.

## Limitaciones importantes

1. **No es un navegador completo de transporte urbano todavía:** no hay coordenadas verificadas para todos los paraderos de corredores/alimentadores ni un algoritmo real de transbordos entre todas las redes. El enlace externo ayuda a explorar otros itinerarios, pero la app no lee esas rutas de vuelta ni puede narrarlas paso a paso como datos propios.
2. No hay conexión en tiempo real con la ATU: ni tiempos de llegada, ni flota, ni ocupación, ni cierres, ni saldo real. Los gastos y movimientos son simulados y se guardan localmente.
3. El mapa muestra estaciones aproximadas y líneas rectas, no itinerarios peatonales calculados sobre calles. No tomes decisiones sensibles solo con las distancias mostradas.
4. La síntesis de voz y el reconocimiento dependen de APIs del navegador. La función manos libres requiere la web abierta y, normalmente, en primer plano. Chrome puede procesar la voz mediante sus servicios.
5. Los comunicados de ATU son fuentes publicadas a fecha de consulta (12 de noviembre de 2026), no cambios automáticos de tarifas o paraderos. Comprueba siempre el portal oficial de la ATU.

Mapas © OpenStreetMap contributors. Información referenciada de la Autoridad de Transporte Urbano para Lima y Callao (`https://www.gob.pe/atu`).
