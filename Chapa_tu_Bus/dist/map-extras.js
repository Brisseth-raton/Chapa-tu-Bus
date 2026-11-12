/* Rutas geográficas de la app. Solo la troncal tiene coordenadas verificadas aquí.
   Corredores están disponibles en «Por paradas» y alimentadores en enlaces ATU.
   Para recorridos completos por otras redes, se ofrece un planificador externo. */
calculateMapRoutes=function(){
  if(!places.from||!places.to)return;
  mapSearched=true;mapChoice=0;searchMessage='';searchResults=[];mapOptions=[];
  if(distanceKm(places.from.coords,places.to.coords)<.05){searchMessage='El origen y el destino coinciden. No necesitas tomar un bus.';render();return}
  const nearest=p=>Object.entries(STATION_GEO).map(([name,c])=>({name,d:distanceKm(p,c)})).sort((a,b)=>a.d-b.d).slice(0,5);
  const starts=nearest(places.from.coords),ends=nearest(places.to.coords),oldNet=planNetwork,all=[];
  planNetwork='metro';
  try{for(const a of starts)for(const b of ends){if(a.name===b.name)continue;
    for(const r of findJourneys(a.name,b.name,'all')){const transitKm=routeKm(r),walkKm=a.d+b.d;all.push({...r,accessFrom:places.from,accessTo:places.to,walkFrom:a.d,walkTo:b.d,walkKm,transitKm,totalKm:transitKm+walkKm,network:'metro'})}}
  }finally{planNetwork=oldNet}
  const unique=new Map();for(const r of all.sort(compareMapRoutes)){
    const key=r.origin+'|'+r.destination+'|'+r.legs.map(l=>l.routeId+':'+l.direction).join('/');if(!unique.has(key))unique.set(key,r);
  }
  mapOptions=[...unique.values()].slice(0,3);
  if(!mapOptions.length)searchMessage='No encontramos una conexión del Metropolitano en este catálogo. Los corredores y alimentadores pueden ser mejores alternativas.';
  render();
};
const legacyResultsView=mapResultsView;
mapResultsView=function(){
  let result=legacyResultsView();const r=mapOptions[0];
  if(r&&Math.max(r.walkFrom,r.walkTo)>1.5){const msg=`<div class="atu-warning" role="status"><strong>La estación no queda cerca:</strong> el acceso desde tu origen es de ${distanceLabel(r.walkFrom)} y el tramo final hasta tu destino de ${distanceLabel(r.walkTo)} (en línea recta). No son rutas peatonales ni recomendamos caminar todo ese trayecto. Compara otros buses, corredores o alimentadores en el enlace de abajo.</div>`;result=msg+result}
  if(r){result=result.replace('Comparamos hasta 4 estaciones cercanas por extremo', 'Comparamos hasta 5 estaciones por extremo, sin un límite fijo de distancia')}
  return result;
};
const legacyReferencePlan=referencePlan;
referencePlan=function(){
  let html=legacyReferencePlan();
  if(planMode==='map')html=html.replace('Conectamos las estaciones de tu recorrido.','Busca cualquier calle o lugar de Lima y Callao, no solo estaciones del Metropolitano.')
    .replace('Los corredores están en «Por paradas».','Los corredores están en «Por paradas» y los alimentadores en «Rutas y horarios».');
  return html;
};
