// Conservative release gate: sample accuracy is not a production certification.
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const engine=fs.readFileSync(path.join(root,'app/src/main/assets/engine.js'),'utf8');
const read=(name)=>JSON.parse(fs.readFileSync(path.join(root,'docs',name),'utf8'));
const initial=read('LUNAR-ACCURACY-GATE.json');
const heldout=read('LUNAR-ACCURACY-HELDOUT.json');
const result={ready:false,checks:[]};
function check(name,pass,detail){result.checks.push({name,pass:Boolean(pass),detail});}
check('Lune : échantillon initial',initial.passes && initial.max_error_degrees<=0.1,`Écart maximal ${initial.max_error_degrees}° sur ${initial.independent_instants} instants`);
check('Lune : échantillon indépendant',heldout.passes && heldout.max_error_degrees<=0.1,`Écart maximal ${heldout.max_error_degrees}° sur ${heldout.independent_instants} instants`);
check('Pluton présent',engine.includes('Pluton'),'Calcul analytique embarqué, précision générale non certifiée.');
check('Fuseaux IANA',engine.includes('historicalOffset'),'Données système Android ; validation historique multi-appareils encore nécessaire.');
check('Validation astronomique complète',false,'Échantillons limités ; dates extrêmes, latitudes élevées et autres sorties à approfondir.');
check('Licence des éphémérides vérifiée',false,'Vérification des licences et droits de redistribution nécessaire avant publication.');
check('APK signé et testé',false,'Aucune compilation, signature ou installation sur appareil vérifiée.');
result.ready=result.checks.every(x=>x.pass);
console.log(JSON.stringify(result,null,2));
if(process.argv.includes('--enforce')&&!result.ready)process.exitCode=1;
