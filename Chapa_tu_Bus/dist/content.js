/* Contenido editorial enlazado a documentación de la ATU, revisión 12-11-2026.
   No se confunde noticia publicada con incidencia operativa en vivo. */
const OFFICIAL={
  cat:'https://www.gob.pe/institucion/atu/noticias/1359069-atu-como-obtener-o-renovar-la-tarjeta-del-metropolitano-o-lima-pass-para-acceder-al-medio-pasaje',
  plin:'https://www.gob.pe/institucion/atu/campañas/121554-recarga-al-toque',
  tarifa:'https://www.gob.pe/institucion/atu/noticias/1330397-atu-conoce-las-opciones-para-ahorrar-en-el-metropolitano-y-los-corredores-complementarios',
  paraderos:'https://www.gob.pe/institucion/atu/noticias/1373843-atu-pone-en-marcha-la-modernizacion-de-82-paraderos-de-los-corredores-complementarios',
  alimentadores:'https://www.gob.pe/institucion/atu/noticias/1384899-atu-paga-solo-s-3-50-viajando-desde-comas-san-martin-de-porres-e-independencia-hasta-villa-el-salvador-con-el-metropolitano',
  interconexiones:'https://www.gob.pe/institucion/atu/noticias/1325819-atu-conexiones-en-los-terminales-naranjal-y-matellini-para-viajar-a-villa-el-salvador-no-tendra-costo-adicional-desde-el-lunes-5-de-enero',
  feederRoutes:'https://www.gob.pe/institucion/atu/noticias/1023801-metropolitano-implementacion-de-dos-nuevas-rutas-alimentadoras-en-lima-norte-beneficiara-a-mas-de-15-000-usuarios-al-dia/',
  feederChange:'https://www.gob.pe/institucion/atu/noticias/948171-atu-los-servicios-alimentadores-antunez-de-mayolo-y-bertello-del-metropolitano-modifican-algunos-paraderos',
  news:'https://www.gob.pe/institucion/atu/noticias',
  routes:'https://portal.atu.gob.pe/QR/',
  atu:'https://www.gob.pe/atu'
};
const officialLink=(url,title)=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${title} ↗</a>`;
guides.length=0;
guides.push(
 {title:'Tu primera tarjeta',desc:'Cómo iniciar tu primer viaje y validar correctamente.',tag:'PRIMEROS PASOS',icon:'card',time:'3 min',steps:[
   ['Busca un punto autorizado','Ubica una estación o terminal del Metropolitano. Consulta los puntos oficiales de venta y atención.'],
   ['Obtén tu tarjeta','Solicita la tarjeta del Metropolitano o Lima Pass en un punto autorizado. Pregunta las condiciones vigentes antes de pagar.'],
   ['Recarga y activa tu saldo','Si recargas desde Plin, la ATU indica que debes activar la recarga. Usa un módulo en estaciones o el validador del corredor, según corresponda.'],
   ['Valida antes de subir','Acerca tu tarjeta al lector. Comprueba la confirmación y sigue las indicaciones del personal.']],sources:[['Recarga con ilustraciones paso a paso — ATU',OFFICIAL.plin],['Trámites y documentos — ATU',OFFICIAL.cat]]},
 {title:'Tarjeta universitaria y medio pasaje',desc:'Requisitos, centros de atención y renovación.',tag:'ESTUDIANTES',icon:'book',time:'4 min',steps:[
   ['Prepara tu documentación','Para renovar, lleva DNI vigente, tu tarjeta preferencial y el carné universitario vigente de Sunedu o el de educación superior del Minedu.'],
   ['Elige un CAT','La ATU señala centros de atención en Chimpu Ocllo, Naranjal, Matellini, Central y Javier Prado. Verifica el horario de cada centro antes de salir.'],
   ['Renueva la vigencia','La actualización de la tarjeta es gratuita según la publicación oficial del 26 de febrero de 2026. La emisión por primera vez se indicó en S/ 4,50.'],
   ['Cuida tu tarjeta','El beneficio es personal. Revisa la vigencia de tu carné y confirma el costo vigente en el canal oficial.']],sources:[['Requisitos, tarifas y horarios de CAT — ATU',OFFICIAL.cat]]},
 {title:'Recargar con Plin',desc:'Recarga digital y activación en estaciones o corredores.',tag:'RECARGAS',icon:'plus',time:'3 min',steps:[
   ['Ingresa a Plin','Desde la aplicación bancaria compatible con Plin selecciona «Recargar Transporte».'],
   ['Escribe el número de tu tarjeta','Digita el número del reverso de tu tarjeta Metropolitano o Lima Pass y el monto que deseas recargar.'],
   ['Confirma la recarga','La ATU indica que puede hacerse efectiva aproximadamente 20 minutos después.'],
   ['Activa el saldo','En Metropolitano, usa un módulo de activación en una estación o terminal; en corredores, presenta la tarjeta en el validador del bus y verifica que se actualizó.']],sources:[['Ver imágenes de la campaña «Recarga al toque» — ATU',OFFICIAL.plin]]},
 {title:'Ahorra con tarifas integradas',desc:'Transbordos y «Aquisito nomás» en recorridos cortos.',tag:'TARIFAS',icon:'route',time:'3 min',steps:[
   ['Identifica el beneficio','La ATU publica tarifas integradas para ciertas conexiones y tarifas promocionales «Aquisito nomás» de S/ 1 o S/ 1,50 en tramos determinados.'],
   ['Revisa los tramos válidos','No todos los recorridos reciben la promoción. Comprueba paraderos, sentido y horario en el portal de ATU.'],
   ['Valida tu tarjeta','Los beneficios pueden depender del uso de las tarjetas Metropolitano o Lima Pass y de límites de tiempo de transbordo.']],sources:[['Condiciones de tarifas y transbordos — ATU',OFFICIAL.tarifa]]},
 {title:'Reconoce tu ruta y paradero',desc:'Diferencia regulares, expresos, corredores y alimentadores.',tag:'MOVILIDAD',icon:'route',time:'3 min',steps:[
   ['Identifica el servicio','Los regulares y expresos del Metropolitano se detienen en estaciones distintas. Los corredores complementarios tienen recorridos y sentidos específicos.'],
   ['Consulta la secuencia','Revisa en «Rutas» la lista de paradas por sentido del catálogo. Para alimentadores, abre las fuentes ATU enlazadas.'],
   ['Planifica con origen y destino','Puedes escribir una calle, elegir dos puntos en el mapa o usar la ubicación aproximada con permiso. El mapa de esta app no dispone de todos los recorridos.']],sources:[['Rutas y servicios — ATU',OFFICIAL.routes],['Alimentadores e integración — ATU',OFFICIAL.alimentadores]]},
 {title:'Paraderos accesibles',desc:'Orientación, señalización y mejoras de infraestructura.',tag:'ACCESIBILIDAD',icon:'book',time:'2 min',steps:[
   ['Conoce la actualización','La ATU anunció intervenciones en 82 paraderos de los corredores Azul, Rojo y Morado.'],
   ['Identifica el equipamiento','Según el paradero, contempla baldosas podotáctiles, braille, mejor señalización y elementos de apoyo al descanso.'],
   ['Verifica antes de viajar','Las obras son progresivas. Un anuncio de intervención no garantiza que todos los paraderos ya estén terminados.']],sources:[['Ver noticia y fotografías de paraderos — ATU',OFFICIAL.paraderos]]}
);
openGuide=function(i){const g=guides[i];if(!g)return;modal(`<span class="pill teal">${g.tag}</span><h2 class="spaced">${g.title}</h2>
 <div class="timeline">${g.steps.map(([t,d],j)=>`<div class="step"><span class="step-num">${j+1}</span><div><h3>${esc(t)}</h3><p>${esc(d)}</p></div></div>`).join('')}</div>
 <div class="atu-sources"><h3>Guías visuales y fuentes de la ATU</h3>${g.sources.map(([t,u])=>officialLink(u,esc(t))).join('')}<p class="small muted">Los artículos enlazados pueden incluir fotografías e infografías. Revisa siempre requisitos y montos actuales.</p></div>
 <button class="primary full spaced" onclick="completeGuide(${i})">${data.done.includes(i)?'Guía completada':'Marcar como leída'} ${icon('check')}</button>`)};
const FEEDER_INFO=[
  {name:'Bertello',terminal:'Naranjal',desc:'Alimentador de Lima Norte. La ATU anunció integración tarifaria con la red troncal.',url:OFFICIAL.interconexiones},
  {name:'Milagros de Jesús',terminal:'Naranjal',desc:'Servicio alimentador del norte, citado por la ATU en la integración tarifaria de enero de 2026.',url:OFFICIAL.interconexiones},
  {name:'Puente Piedra',terminal:'Naranjal',desc:'Ruta alimentadora del norte con integración tarifaria de referencia.',url:OFFICIAL.interconexiones},
  {name:'Los Olivos',terminal:'Naranjal',desc:'Alimentador incorporado a la integración tarifaria anunciada para mayo de 2026.',url:OFFICIAL.alimentadores},
  {name:'Puno',terminal:'Naranjal',desc:'Servicio con integración a la troncal, según la ATU.',url:OFFICIAL.alimentadores},
  {name:'Naranjal',terminal:'Naranjal',desc:'Ruta hacia el terminal Naranjal; la ATU documenta su recorrido en Lima Norte.',url:OFFICIAL.feederRoutes},
  {name:'San Juan de Dios',terminal:'Los Incas',desc:'Anteriormente Santo Domingo. La ATU publicó la ampliación del recorrido y su conexión con Los Incas.',url:OFFICIAL.feederRoutes},
  {name:'Antúnez de Mayolo',terminal:'Naranjal',desc:'La ATU comunicó cambios puntuales de paraderos en 2024.',url:OFFICIAL.feederChange}
];
function feederView(){return `<section class="card feeder-section"><div class="row between"><h2>Alimentadores del Metropolitano</h2><span class="pill teal">ATU</span></div><p class="small muted">Servicios mencionados en publicaciones oficiales. Esta sección no simula paraderos intermedios ni inventa coordenadas: abre la fuente antes de planificar un recorrido específico.</p><div class="feeder-grid">${FEEDER_INFO.map(f=>`<article class="feeder-entry"><strong>🚌 ${esc(f.name)}</strong><small>Conexión: ${esc(f.terminal)}</small><p>${esc(f.desc)}</p>${officialLink(f.url,'Consultar información oficial')}</article>`).join('')}</div></section>`}
const oldLiveRouteView=liveRouteView;liveRouteView=function(){return oldLiveRouteView()+feederView()};
const oldMapResults=mapResultsView;
function externalTransitLink(){if(!places.from||!places.to)return '';const a=places.from.coords.join(','),b=places.to.coords.join(',');const u='https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(a)+'&destination='+encodeURIComponent(b)+'&travelmode=transit';return `<div class="external-transit"><strong>¿Quieres comparar también alimentadores y otros buses?</strong><p>Abre un planificador externo de transporte público para consultar opciones que todavía no forman parte de nuestro mapa.</p><a href="${u}" target="_blank" rel="noopener noreferrer">Ver alternativas en Google Maps ↗</a></div>`}
mapResultsView=function(){return oldMapResults()+externalTransitLink()};
const oldNotices=notices;notices=function(){
  const base=oldNotices();const latest=[
    ['01 abr 2026','ATU anunció la modernización de 82 paraderos','Obras de accesibilidad y señalización en corredores complementarios.',OFFICIAL.paraderos],
    ['28 abr 2026','Integración con alimentadores de Lima Norte','La ATU informó sobre la integración de rutas alimentadoras con la troncal.',OFFICIAL.alimentadores]
  ];return `<div class="atu-warning"> <strong>Estado del servicio:</strong> los avisos operativos de esta aplicación son de <strong>demostración</strong>, no incidencias verificadas en tiempo real. Para avisos oficiales y cambios de operación, consulta ${officialLink(OFFICIAL.news,'Noticias y comunicados ATU')}.</div>`+
    base+`<section class="card atu-news"><h2>Información publicada por la ATU</h2><p class="small muted">Noticias fechadas: no describen necesariamente una incidencia que esté ocurriendo ahora.</p>${latest.map(([date,title,desc,url])=>`<article><small>${date} · Fuente oficial</small><h3>${title}</h3><p>${desc}</p>${officialLink(url,'Leer publicación')}</article>`).join('')}</section>`;
};
