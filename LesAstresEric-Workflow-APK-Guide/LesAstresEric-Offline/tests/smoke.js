const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx=vm.createContext({Date,Math,Error});
vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8'),ctx);
const Astro=vm.runInContext('Astro',ctx);
const base={name:'Test',date:'2000-01-01',time:'12:00',offset:'+00:00',lat:48.8566,lon:2.3522,zodiac:'tropical',houses:'egales'};
for(const system of ['egales','signes-entiers','placidus']){
 const c=Astro.chart({...base,houses:system});
 assert.equal(c.houses.length,12,system+' houses');
 assert.ok(c.ascendant && Number.isFinite(c.ascendant.longitude));
 for(const p of Object.values(c.planets))assert.ok(p.longitude>=0&&p.longitude<360);
}
const unknown=Astro.chart({...base,time:null});assert.equal(unknown.houses.length,0);
assert.throws(()=>Astro.chart({...base,date:'2026-02-30'}));
assert.throws(()=>Astro.chart({...base,time:'25:90'}));
assert.throws(()=>Astro.chart({...base,lat:95}));
assert.throws(()=>Astro.chart({...base,houses:'placidus',lat:78}));
assert.ok(Astro.aspects(Astro.chart(base).planets,Astro.chart(base).planets).length>=0);
console.log('Tests structurels réussis : thèmes, maisons, validations, aspects.');
console.log('ATTENTION : ces tests ne valident PAS la précision astronomique.');
