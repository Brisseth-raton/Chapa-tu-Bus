// Configuración opcional del agente LLM. El navegador NO contiene claves secretas.
// Para habilitar IA real, despliega API Gateway + Authorizer + Lambda siguiendo backend/README.md.
// Después configura agentUrl y proporciona el token JWT desde tu sistema de inicio de sesión.
window.CHAPA_CONFIG={agentUrl:'',getAccessToken:async()=>''};
