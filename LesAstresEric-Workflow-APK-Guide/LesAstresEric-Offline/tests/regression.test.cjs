const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx=vm.createContext({});
vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',ctx);
const base={name:'Test',date:'2000-01-01',time:'12:00',offset:'+00:00',lat:48.8566,lon:2.3522,zodiac:'tropical',houses:'egales'};
for(const houses of ['egales','signes-entiers','placidus']){
 const c=ctx.Astro.chart({...base,houses});
 assert.equal(c.houses.length,12);
 for(const h of c.houses) assert.ok(Number.isFinite(h.longitude)&&h.longitude>=0&&h.longitude<360);
 for(const planet of Object.values(c.planets))assert.ok(Number.isFinite(planet.longitude)&&planet.longitude>=0&&planet.longitude<360);
}
for(const lat of [90,-90])assert.throws(()=>ctx.Astro.chart({...base,lat,houses:'placidus'}));
for(const date of ['2000-02-29','2024-02-29'])assert.doesNotThrow(()=>ctx.Astro.chart({...base,date}));
for(const date of ['1900-02-29','2023-02-29','2024-13-01'])assert.throws(()=>ctx.Astro.chart({...base,date}));
console.log('Tests de régression réussis : cohérence des sorties, pas précision astronomique.');
