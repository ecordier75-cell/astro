const fs=require('fs'),vm=require('vm'),assert=require('assert');
const ctx=vm.createContext({Date,Math,Error});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8'),ctx);
const Astro=vm.runInContext('Astro',ctx);
for(const date of ['1900-01-01','1966-07-24','2000-01-01','2026-11-23','2099-12-31']){
 const chart=Astro.chart({date,time:'12:00',offset:'+00:00',lat:48.85,lon:2.35,zodiac:'tropical',houses:'egales'});
 assert.equal(Object.keys(chart.planets).length,10);
 assert.ok(Number.isFinite(chart.planets['Pluton'].longitude));
 assert.ok(chart.planets['Pluton'].longitude>=0&&chart.planets['Pluton'].longitude<360);
}
console.log('Pluton : calcul présent et valeurs finies (précision non garantie).');
