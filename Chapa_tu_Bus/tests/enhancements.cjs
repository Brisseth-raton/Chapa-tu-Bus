const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const root='dist/';
const common={innerHTML:'',textContent:'',style:{},value:'',id:'',hidden:false,disabled:false,dataset:{},classList:{contains:()=>false,add(){},remove(){},toggle(){}},setAttribute(){},removeAttribute(){},hasAttribute:()=>false,closest:()=>null,querySelector:()=>null,querySelectorAll:()=>[],insertAdjacentHTML(){},focus(){},cloneNode(){return this}};
const document={title:'',body:common,activeElement:null,documentElement:{classList:{toggle(){}}},getElementById:()=>common,querySelector:()=>common,querySelectorAll:()=>[],addEventListener(){}};
const window={setTimeout(){return 0},scrollTo(){},isSecureContext:true};
const c=vm.createContext({window,document,navigator:{},localStorage:{getItem:()=>null,setItem(){}},URL,URLSearchParams,AbortController,DOMParser:class{parseFromString(){return {querySelectorAll:()=>[]}}},CSS:{escape:s=>s},setTimeout:()=>0,setInterval:()=>0,clearTimeout(){},clearInterval(){},fetch:async()=>{throw Error('Unexpected network')}});
for(const f of ['catalog','routes','planner','app','geo-stations','journey','content','map-extras','a11y','config','agent']){
  try{vm.runInContext(fs.readFileSync(root+f+'.js','utf8'),c,{filename:f})}catch(e){console.error('Failed loading',f);throw e}
}
const run=s=>vm.runInContext(s,c);
assert.equal(run('guides.length'),6);
assert.equal(run('FEEDER_INFO.length'),8);
assert.ok(run("tutorials().includes('Tarjeta universitaria')"));
assert.ok(run("notices().includes('demostración')"));
assert.ok(run("liveRouteView().includes('Alimentadores del Metropolitano')"));
assert.equal(run("window.cv.parse('Estoy en la avenida La Marina y quiero ir a la UTEC').k"),'route');
assert.equal(run("window.cv.parse('elige la segunda').n"),2);
assert.equal(run("window.cv.parse('hola').k"),'hello');
run("places={from:{name:'Punto A',coords:[-12.25,-76.81]},to:{name:'Punto B',coords:[-12.04,-77.04]}};calculateMapRoutes()");
assert.ok(run('mapOptions.length>0'),'no arbitrary 2-km limit in map routing');
assert.ok(run('mapOptions[0].walkFrom>2'));
assert.ok(run("mapResultsView().includes('La estación no queda cerca')"));
assert.ok(run("mapResultsView().includes('google.com/maps/dir')"));
assert.equal(run('window.cvAgent.enabled'),false);
assert.ok(run('journeySpeed===1'));
assert.ok(fs.readFileSync('dist/a11y.css','utf8').includes('.primary:hover,.primary:focus-visible'));
console.log('PASS: 6 ATU guides, 8 feeder references, official notices, natural voice parsing, unrestricted nearest-Metro search, remote transit fallback, LLM disabled without login');
