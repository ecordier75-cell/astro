const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const c=vm.createContext({});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',c);
const b={name:'Test',date:'2000-01-01',time:'12:00',offset:'+00:00',lat:48.8566,lon:2.3522,zodiac:'tropical',houses:'egales'};
const x=c.Astro.chart(b);assert.equal(Object.keys(x.planets).length,10);assert.equal(x.houses.length,12);
for(const p of Object.values(x.planets))assert.ok(p.longitude>=0&&p.longitude<360);
for(const p of [{date:'2000-02-30'},{date:'1800-01-01'},{time:'29:00'},{lat:95},{offset:'+25:00'},{offset:'+14:30'},{lat:null},{lon:''},{houses:'bogus'}])assert.throws(()=>c.Astro.chart({...b,...p}));
assert.equal(c.Astro.chart({...b,time:null}).ascendant,null);
console.log('Tests de validation réussis ; précision astronomique non vérifiée.');
