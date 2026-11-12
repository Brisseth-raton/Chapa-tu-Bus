/**
 * Chapa tu Bus: Lambda para IA conversacional (API Gateway HTTP API + JWT Authorizer).
 * La clave API no debe ir en dist/config.js ni en GitHub.
 * Este endpoint DEBE ser protegido por el authorizer de API Gateway y limitación de tasa.
 */
const JSON_HEADER={'content-type':'application/json; charset=utf-8'};
const allowed=new Set(['plan_route','choose_option','read_status','read_notices','open_screen','get_context']);
const SYSTEM=`Eres un agente de movilidad llamado Chapa tu Bus. Responde en español peruano, con tono natural y frases breves adecuadas para síntesis de voz. Para hablar de recorridos y servicios usa las herramientas de la aplicación. Evita datos inventados. El mapa propio solo cubre geográficamente la troncal del Metropolitano; los corredores aparecen en el catálogo por paradas, y los alimentadores son información de referencia ATU. Los tiempos, pagos y avisos son simulados, no en tiempo real. Pregunta solo el origen o destino si falta. Nunca prometas resultados GPS precisos, tarifas actuales o disponibilidad de buses. No uses Markdown.`;
const response=(statusCode,body)=>({statusCode,headers:JSON_HEADER,body:JSON.stringify(body)});
export async function handler(event){
 const jwt=event.requestContext?.authorizer?.jwt?.claims?.sub;
 if(!jwt)return response(401,{error:'API Gateway JWT authorizer requerido'});
 if(!process.env.ANTHROPIC_API_KEY||!process.env.ANTHROPIC_MODEL)return response(503,{error:'Proveedor de IA sin configurar'});
 const raw=event.body||'';
 if(raw.length>25000)return response(413,{error:'Solicitud demasiado grande'});
 let body;try{body=JSON.parse(raw)}catch{return response(400,{error:'JSON inválido'})}
 if(!Array.isArray(body.messages)||body.messages.length<1||body.messages.length>20)return response(400,{error:'Historial inválido'});
 if(!body.messages.every(m=>['user','assistant'].includes(m.role)&&((typeof m.content==='string'&&m.content.length<=3500)||Array.isArray(m.content))))return response(400,{error:'Contenido de mensaje inválido'});
 const tools=Array.isArray(body.tools)?body.tools.filter(t=>allowed.has(t.name)).slice(0,6):[];
 const context=body.context&&typeof body.context==='object'?JSON.stringify(body.context).slice(0,2000):'';
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),20000);
 try{
   const upstream=await fetch('https://api.anthropic.com/v1/messages',{
     method:'POST',signal:controller.signal,
     headers:{'x-api-key':process.env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
     body:JSON.stringify({model:process.env.ANTHROPIC_MODEL,max_tokens:500,system:SYSTEM+'\nContexto (sin verificar): '+context,messages:body.messages,tools})
   });
   if(!upstream.ok)return response(502,{error:'Proveedor de IA no disponible',status:upstream.status});
   const result=await upstream.json();return response(200,{content:result.content||[],stop_reason:result.stop_reason||null});
 }catch{return response(502,{error:'No se pudo completar la consulta'})}
 finally{clearTimeout(timer)}
}
