const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const ctx=vm.createContext({});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',ctx);
const base={date:'2024-01-01',time:'12:00',lat:28.6139,lon:77.209,zodiac:'tropical',houses:'egales'};
const a=ctx.Astro.chart({...base,offset:'+05:30'}),b=ctx.Astro.chart({...base,offset:'+05:45'});
assert.ok(Math.abs(a.jd-b.jd-0.0104166665)<0.00001);
assert.throws(()=>ctx.Astro.chart({...base,offset:'+14:30'}));
assert.ok(fs.readFileSync('app/src/main/assets/index.html','utf8').includes('length:105'));
console.log('Tests fuseaux à 15 minutes réussis.');
