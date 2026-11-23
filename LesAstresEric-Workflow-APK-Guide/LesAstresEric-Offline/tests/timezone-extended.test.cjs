const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const ctx=vm.createContext({Intl,Date});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',ctx);
const base={name:'Test',date:'2024-07-15',time:'12:00',offset:'',zone:'Europe/Paris',lat:48.8566,lon:2.3522,zodiac:'tropical',houses:'egales'};
const chart=(changes)=>ctx.Astro.chart({...base,...changes});
const cases=[['Europe/Paris','2024-01-15','+01:00'],['Europe/Paris','2024-07-15','+02:00'],['Asia/Kathmandu','2024-07-15','+05:45'],['Asia/Kolkata','2024-07-15','+05:30'],['America/New_York','2024-07-15','-04:00'],['Australia/Sydney','2024-07-15','+10:00'],['Pacific/Auckland','2024-07-15','+12:00']];
for(const [zone,date,offset] of cases){const auto=chart({zone,date});const manual=chart({zone:'',date,offset});assert.ok(Math.abs(auto.jd-manual.jd)<1e-8,zone+' '+date)}
assert.throws(()=>chart({date:'2024-03-31',time:'02:30'}),/inexistante/);
assert.throws(()=>chart({date:'2024-10-27',time:'02:30'}),/ambiguë/);
assert.throws(()=>chart({zone:'Invalid/Zone'}));
assert.throws(()=>chart({zone:'',offset:''}),/Décalage UTC invalide/);
console.log('Tests étendus IANA : 7 références, transitions DST et saisie manuelle OK.');
