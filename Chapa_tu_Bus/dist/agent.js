/* Agente conversacional opcional; mantiene contexto y puede llamar herramientas de la app.
 * Si no se configura un endpoint seguro, se usa el asistente local de a11y.js.
 */
(()=>{
const config=window.CHAPA_CONFIG||{};
const sys='Eres un asistente de movilidad llamado Chapa tu Bus. Habla con naturalidad, en español peruano y con frases breves que sean fáciles de escuchar en voz alta. Para planificar o informar sobre rutas, usa plan_route; para elegir otra opción usa choose_option. No inventes rutas, paraderos ni horarios. Los corredores y alimentadores no tienen coordenadas completas en este prototipo. Los tiempos y avisos no son en tiempo real. Si falta origen o destino, pide solo el dato faltante. Usa el contexto del usuario de este chat. Nunca afirmes que tienes acceso a ubicación, saldo o informes en vivo sin consultar una herramienta. No emitas Markdown ni datos técnicos al conversar.';
const schema={type:'object',properties:{}};
const prop=(properties,required=[])=>({type:'object',properties,required,additionalProperties:false});
const str=description=>({type:'string',description});
const tools=[
 {name:'plan_route',description:'Planifica ruta por calles, lugares o estaciones de Lima; devuelve opciones disponibles sin inventar recorridos.',input_schema:prop({from:str('Origen o mi ubicación; omite si existe origen previo'),to:str('Destino')},['to'])},
 {name:'choose_option',description:'Selecciona la opción calculada (1 a 3).',input_schema:prop({number:{type:'integer',minimum:1,maximum:3}},['number'])},
 {name:'read_status',description:'Consulta el estado del viaje en curso.',input_schema:schema},
 {name:'read_notices',description:'Explica dónde consultar avisos y distingue la simulación.',input_schema:schema},
 {name:'open_screen',description:'Abre una pantalla de la app.',input_schema:prop({screen:{type:'string',enum:['inicio','planificar','rutas','avisos','tutoriales','viaje']}},['screen'])},
 {name:'get_context',description:'Obtiene el contexto de pantalla y origen/destino de esta sesión.',input_schema:schema}
];
let messages=[];
async function turn(raw){
 if(!config.agentUrl)return null;
 messages.push({role:'user',content:raw});
 for(let round=0;round<5;round++){
   const token=await config.getAccessToken?.();if(!token)throw Error('No se configuró autenticación para el agente');
   const response=await fetch(config.agentUrl,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+token},body:JSON.stringify({messages,tools,context:window.cv.tools.get_context()})});
   if(!response.ok)throw Error('El agente devolvió '+response.status);
   const payload=await response.json();if(!Array.isArray(payload.content))throw Error('Respuesta del agente inválida');
   messages.push({role:'assistant',content:payload.content});
   const calls=payload.content.filter(x=>x.type==='tool_use');
   if(!calls.length){messages=messages.slice(-16);return payload.content.filter(x=>x.type==='text').map(x=>x.text).join(' ').trim()}
   const outcomes=[];
   for(const use of calls){let r;try{const fn=window.cv.tools[use.name];r=fn?await fn(use.input||{}):{error:'Herramienta no permitida'}}catch(e){r={error:String(e.message||e)}}
     outcomes.push({type:'tool_result',tool_use_id:use.id,content:JSON.stringify(r)});
   }
   messages.push({role:'user',content:outcomes});
 }
 return 'Encontré varias posibilidades y no pude completar tu consulta. Prueba con el origen y destino otra vez.';
}
window.cvAgent={enabled:!!config.agentUrl&&typeof config.getAccessToken==='function',turn,reset:()=>{messages=[]}};
})();
