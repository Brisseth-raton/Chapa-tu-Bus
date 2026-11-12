# Agente con IA (integración opcional, NO desplegada)

La app usa por defecto el intérprete de voz local (`dist/a11y.js`) sin cuotas ni claves. Esto permite ejecutar la demo al abrir la web. **Para respuestas generativas no repetitivas**, se incluye el ejemplo `agent-lambda/index.mjs`. No funciona hasta conectar un proveedor de IA y desplegar el backend.

## Arquitectura recomendada

`Navegador HTTPS → login Cognito → API Gateway HTTP API (JWT authorizer + CORS) → Lambda Node.js 20+ → proveedor IA`. El modelo puede solicitar herramientas como `plan_route`, `choose_option` y `read_status`; las operaciones de planificación se ejecutan en el navegador con los datos de la app. Esto no añade información ATU en tiempo real.

1. Configura un User Pool de Amazon Cognito para autenticar usuarios. No utilices una Function URL pública para reenviar solicitudes de IA.
2. Despliega la Lambda usando `backend/agent-lambda/index.mjs` y crea una ruta `POST /agent` en API Gateway HTTP API **protegida con JWT authorizer**. El handler rechaza solicitudes sin claims JWT emitidos por API Gateway.
3. Configura `ANTHROPIC_MODEL` con un identificador de modelo disponible para tu cuenta y `ANTHROPIC_API_KEY` como secreto protegido del backend, no en el frontend. Considera cargar la clave desde Secrets Manager para evitar guardarla en texto visible.
4. Configura CORS para el dominio exacto de Amplify, métodos `POST` y encabezados `Authorization` y `Content-Type`. Activa límites de uso, monitoreo de costos y reglas de tasa (por ejemplo, WAF) antes de permitir usuarios reales.
5. En `dist/config.js`, cambia `agentUrl` a la ruta de API Gateway y reemplaza `getAccessToken` por una función que obtenga un JWT válido desde tu flujo de autenticación Cognito. No guardes contraseñas ni tokens permanentes en el repositorio.

**Importante:** Este directorio es una base de integración, no una configuración AWS lista para desplegar de forma segura. La clave y la autenticación requieren recursos de tu cuenta. Sin ellos, el asistente local continúa operativo y la app no expone ninguna credencial.
