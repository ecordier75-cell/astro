/* Offline approximate planetary ephemeris. Educational, NOT Swiss Ephemeris.
   Orbital elements based on the classical low-precision analytical approach;
   intended for 1900–2100. Do not claim arcminute accuracy. */
const Astro=(()=>{
const RAD=Math.PI/180, DEG=180/Math.PI, norm=x=>(x%360+360)%360;
const sin=x=>Math.sin(x*RAD), cos=x=>Math.cos(x*RAD), atan2=(y,x)=>norm(Math.atan2(y,x)*DEG);
const SIGNES=['Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne','Verseau','Poissons'];
const PLANETS=['Soleil','Lune','Mercure','Vénus','Mars','Jupiter','Saturne','Uranus','Neptune','Pluton'];
// Pluton utilise une série analytique de faible précision ; ce moteur n’est pas certifié.
function jd(date){return date.getTime()/86400000+2440587.5}
function elements(d,name){const data={
'Soleil':[[0,0],[0,0],[282.9404,4.70935e-5],[1,0],[.016709,-1.151e-9],[356.0470,.9856002585]],
'Mercure':[[48.3313,3.24587e-5],[7.0047,5e-8],[29.1241,1.01444e-5],[.387098,0],[.205635,5.59e-10],[168.6562,4.0923344368]],
'Vénus':[[76.6799,2.4659e-5],[3.3946,2.75e-8],[54.8910,1.38374e-5],[.723330,0],[.006773,-1.302e-9],[48.0052,1.6021302244]],
'Mars':[[49.5574,2.11081e-5],[1.8497,-1.78e-8],[286.5016,2.92961e-5],[1.523688,0],[.093405,2.516e-9],[18.6021,.5240207766]],
'Jupiter':[[100.4542,2.76854e-5],[1.3030,-1.557e-7],[273.8777,1.64505e-5],[5.20256,0],[.048498,4.469e-9],[19.8950,.0830853001]],
'Saturne':[[113.6634,2.3898e-5],[2.4886,-1.081e-7],[339.3939,2.97661e-5],[9.55475,0],[.055546,-9.499e-9],[316.9670,.0334442282]],
'Uranus':[[74.0005,1.3978e-5],[.7733,1.9e-8],[96.6612,3.0565e-5],[19.18171,-1.55e-8],[.047318,7.45e-9],[142.5905,.011725806]],
'Neptune':[[131.7806,3.0173e-5],[1.7700,-2.55e-7],[272.8461,-6.027e-6],[30.05826,3.313e-8],[.008606,2.15e-9],[260.2471,.005995147]]};
return data[name].map(([a,b])=>a+b*d)}
function orbit(d,name){let [N,i,w,a,e,M]=elements(d,name);M=norm(M);let E=M+DEG*e*sin(M)*(1+e*cos(M));for(let k=0;k<6;k++)E-=(E-e*DEG*sin(E)-M)/(1-e*cos(E));let xv=a*(cos(E)-e),yv=a*Math.sqrt(1-e*e)*sin(E),v=atan2(yv,xv),r=Math.hypot(xv,yv);return {x:r*(cos(N)*cos(v+w)-sin(N)*sin(v+w)*cos(i)),y:r*(sin(N)*cos(v+w)+cos(N)*sin(v+w)*cos(i)),z:r*sin(v+w)*sin(i),r,lon:norm(v+w+N),M};}
// Série lunaire de Meeus (termes principaux de longitude, table 47.A).
// Argument temporel en siècles juliens TT approximés par UTC : précision à auditer.
function moon(d,sun){
 const T=(d-1.5)/36525;
 const L=norm(218.3164477+481267.88123421*T-0.0015786*T*T+T*T*T/538841-T*T*T*T/65194000);
 const D=norm(297.8501921+445267.1114034*T-0.0018819*T*T+T*T*T/545868-T*T*T*T/113065000);
 const M=norm(357.5291092+35999.0502909*T-0.0001536*T*T+T*T*T/24490000);
 const Mp=norm(134.9633964+477198.8675055*T+0.0087414*T*T+T*T*T/69699-T*T*T*T/14712000);
 const F=norm(93.2720950+483202.0175233*T-0.0036539*T*T-T*T*T/3526000+T*T*T*T/863310000);
 const E=1-0.002516*T-0.0000074*T*T;
 // D, M, M', F, coefficient in millionths of a degree.
 const terms=[
 [0,0,1,0,6288774],[2,0,-1,0,1274027],[2,0,0,0,658314],[0,0,2,0,213618],[0,1,0,0,-185116],[0,0,0,2,-114332],[2,0,-2,0,58793],[2,-1,-1,0,57066],[2,0,1,0,53322],[2,-1,0,0,45758],[0,1,-1,0,-40923],[1,0,0,0,-34720],[0,1,1,0,-30383],[2,0,0,-2,15327],[0,0,1,2,-12528],[0,0,1,-2,10980],[4,0,-1,0,10675],[0,0,3,0,10034],[4,0,-2,0,8548],[2,1,-1,0,-7888],[2,1,0,0,-6766],[1,0,-1,0,-5163],[1,1,0,0,4987],[2,-1,1,0,4036],[2,0,2,0,3994],[4,0,0,0,3861],[2,0,-3,0,3665],[0,1,-2,0,-2689],[2,0,-1,2,-2602],[2,-1,-2,0,2390],[1,0,1,0,-2348],[2,-2,0,0,2236],[0,1,2,0,-2120],[0,2,0,0,-2069],[2,-2,-1,0,2048],[2,0,1,-2,-1773],[2,0,0,2,-1595],[4,-1,-1,0,1215],[0,0,2,2,-1110],[3,0,-1,0,-892],[2,1,1,0,-810],[4,-1,-2,0,759],[0,2,-1,0,-713],[2,2,-1,0,-700],[2,1,-2,0,691],[2,-1,0,-2,596],[4,0,1,0,549],[0,0,4,0,537],[4,-1,0,0,520],[1,0,-2,0,-487],[2,1,0,-2,-399],[0,0,2,-2,-381],[1,1,1,0,351],[3,0,-2,0,-340],[4,0,-3,0,330],[2,-1,2,0,327],[0,2,1,0,-323],[1,1,-1,0,299],[2,0,3,0,294]
 ];
 let sigma=0;
 for(const [dd,mm,mp,ff,c] of terms)sigma+=c*Math.pow(E,Math.abs(mm))*sin(dd*D+mm*M+mp*Mp+ff*F);
 const A1=norm(119.75+131.849*T),A2=norm(53.09+479264.290*T);
 sigma+=3958*sin(A1)+1962*sin(L-F)+318*sin(A2);
 return norm(L+sigma/1000000);
}
// Série analytique simplifiée pour Pluton, valable à titre indicatif autour de 1900–2100.
// Coordonnées héliocentriques, converties ensuite en longitude géocentrique.
function plutoOrbit(d){
 let S=50.03+0.033459652*d,P=238.95+0.003968789*d;
 let lon=238.9508+0.00400703*d-19.799*sin(P)+19.848*cos(P)+0.897*sin(2*P)-4.956*cos(2*P)+0.610*sin(3*P)+1.211*cos(3*P)-0.341*sin(4*P)-0.190*cos(4*P)+0.128*sin(5*P)-0.034*cos(5*P)-0.038*sin(6*P)+0.031*cos(6*P)+0.020*sin(S-P)-0.010*cos(S-P);
 let lat=-3.9082-5.453*sin(P)-14.975*cos(P)+3.527*sin(2*P)+1.673*cos(2*P)-1.051*sin(3*P)+0.328*cos(3*P)+0.179*sin(4*P)-0.292*cos(4*P)+0.019*sin(5*P)+0.100*cos(5*P)-0.031*sin(6*P)-0.026*cos(6*P)+0.011*cos(S-P);
 let r=40.72+6.68*sin(P)+6.90*cos(P)-1.18*sin(2*P)-0.03*cos(2*P)+0.15*sin(3*P)-0.14*cos(3*P);
 return {x:r*cos(lon)*cos(lat),y:r*sin(lon)*cos(lat)};
}
// Perturbations gravitationnelles classiques Jupiter/Saturne, appliquées
// à la longitude héliocentrique avant conversion géocentrique.
function giantPerturbation(d,name){
 const mj=norm(19.8950+.0830853001*d),ms=norm(316.9670+.0334442282*d);
 if(name==='Jupiter')return -.332*sin(2*mj-5*ms-67.6)-.056*sin(2*mj-2*ms+21)+.042*sin(3*mj-5*ms+21)-.036*sin(mj-2*ms)+.022*cos(mj-ms)+.023*sin(2*mj-3*ms+52);
 if(name==='Saturne')return .812*sin(2*mj-5*ms-67.6)-.229*cos(2*mj-4*ms-2)+.119*sin(mj-2*ms-3)+.046*sin(2*mj-6*ms-69)+.014*sin(mj-3*ms+32);
 return 0;
}
function positions(j){let d=j-2451543.5,sun=orbit(d,'Soleil'),res={Soleil:norm(sun.lon),Lune:moon(d,sun)};for(let name of PLANETS.slice(2)){let p=name==='Pluton'?plutoOrbit(d):orbit(d,name);let correction=giantPerturbation(d,name);if(correction){let angle=correction*RAD,x=p.x,y=p.y;p={...p,x:x*Math.cos(angle)-y*Math.sin(angle),y:x*Math.sin(angle)+y*Math.cos(angle)}}let lon=atan2(p.y+sun.r*sin(sun.lon),p.x+sun.r*cos(sun.lon));res[name]=lon;}return res}
function obliquity(j){return 23.4393-3.563e-7*(j-2451543.5)}
function raDec(lon,eps){let x=cos(lon),y=sin(lon)*cos(eps),z=sin(lon)*sin(eps);return {ra:atan2(y,x),dec:Math.asin(z)*DEG}}
function lst(j,longitude){let T=(j-2451545)/36525;return norm(280.46061837+360.98564736629*(j-2451545)+.000387933*T*T-T*T*T/38710000+longitude)}
function angleDiff(a,b){return ((a-b+540)%360)-180}
function houses(j,lat,lon,system){if(Math.abs(lat)>66 && system==='placidus')throw Error('Placidus indisponible aux latitudes polaires : choisir maisons égales ou signes entiers.');let eps=obliquity(j),sid=lst(j,lon);let mc=norm(Math.atan2(sin(sid),cos(sid)*cos(eps))*DEG);if(Math.abs(angleDiff(raDec(mc,eps).ra,sid))>90)mc=norm(mc+180);
let asc=norm(Math.atan2(-cos(sid),sin(sid)*cos(eps)+Math.tan(lat*RAD)*sin(eps))*DEG); // verify rising solution by hour-angle
let raAsc=raDec(asc,eps),H=angleDiff(sid,raAsc.ra);if(H>0)asc=norm(asc+180);
if(system==='signes-entiers'){let start=Math.floor(asc/30)*30;return {asc,mc,cusps:Array.from({length:12},(_,i)=>norm(start+i*30))}}
if(system==='egales')return {asc,mc,cusps:Array.from({length:12},(_,i)=>norm(asc+i*30))};
// Placidus: solve intermediate upper cusps 11/12 using diurnal semi-arcs, lower 2/3 via nocturnal semi-arcs.
function solve(target,fraction,night){let best=target,bestErr=Infinity;for(let k=0;k<720;k++){let l=k/2,dec=raDec(l,eps).dec,v=-Math.tan(lat*RAD)*Math.tan(dec*RAD);if(Math.abs(v)>=1)continue;let sa=Math.acos(v)*DEG,arc=night?180-sa:sa;let desired=norm(sid+(night?-1:1)*fraction*arc);let err=Math.abs(angleDiff(raDec(l,eps).ra,desired))+Math.abs(angleDiff(l,target))*.001;if(err<bestErr){bestErr=err;best=l}}let x=best;for(let step=.25;step>.0001;step/=2){let opts=[norm(x-step),x,norm(x+step)];x=opts.reduce((a,b)=>{function score(l){let dec=raDec(l,eps).dec,v=-Math.tan(lat*RAD)*Math.tan(dec*RAD);if(Math.abs(v)>=1)return 1e9;let arc=Math.acos(v)*DEG;return Math.abs(angleDiff(raDec(l,eps).ra,norm(sid+(night?-1:1)*fraction*arc)))}return score(b)<score(a)?b:a})}return x}
let c11=solve(norm(mc+30),1/3,false),c12=solve(norm(mc+60),2/3,false);
function solveLower(target,fraction){let best=target,bestErr=1e9;function score(l){let dec=raDec(l,eps).dec,v=-Math.tan(lat*RAD)*Math.tan(dec*RAD);if(Math.abs(v)>=1)return 1e9;let nightArc=180-Math.acos(v)*DEG;return Math.abs(angleDiff(raDec(l,eps).ra,norm(sid+180-fraction*nightArc)))}for(let k=0;k<720;k++){let l=k/2,e=score(l);if(e<bestErr){bestErr=e;best=l}}let x=best;for(let step=.25;step>.00001;step/=2){for(let v of [norm(x-step),norm(x+step)])if(score(v)<score(x))x=v}return x}
let c2=solveLower(norm(asc+30),2/3),c3=solveLower(norm(asc+60),1/3);
cusps=[asc,c2,c3,norm(mc+180),norm(c11+180),norm(c12+180),norm(asc+180),norm(c2+180),norm(c3+180),mc,c11,c12];
return {asc,mc,cusps}}
function houseOf(lon,cusps){for(let i=0;i<12;i++){let a=cusps[i],b=cusps[(i+1)%12],span=norm(b-a),p=norm(lon-a);if(span>0&&p<span)return i+1}return null}
// Détermination hors ligne du décalage historique à partir de la base IANA du système.
// Les heures locales ambiguës lors d'un changement d'heure doivent être vérifiées.
function historicalOffset(date,time,zone){
  const [year,month,day]=date.split('-').map(Number);
  const [hour,minute]=time.split(':').map(Number);
  const target=Date.UTC(year,month-1,day,hour,minute);
  const fmt=new Intl.DateTimeFormat('en-GB',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
  function localAt(utc){
    const x={};for(const part of fmt.formatToParts(new Date(utc)))if(part.type!=='literal')x[part.type]=Number(part.value);
    return Date.UTC(x.year,x.month-1,x.day,x.hour,x.minute);
  }
  // Collecter tous les décalages possibles autour de la date, pour détecter
  // aussi bien les heures inexistantes que les heures répétées.
  const offsets=new Set();
  for(let delta=-15*60;delta<=15*60;delta+=30){
    const sample=target+delta*60000;
    offsets.add((localAt(sample)-sample)/60000);
  }
  const matches=[];
  for(const candidate of offsets){
    const utc=target-candidate*60000;
    if(localAt(utc)===target)matches.push(candidate);
  }
  if(matches.length===0)throw Error('Heure locale inexistante (changement d’heure) : saisissez un décalage UTC manuel.');
  if(matches.length>1)throw Error('Heure locale ambiguë (passage à l’heure d’hiver) : choisissez le décalage UTC manuel correspondant à l’acte de naissance.');
  const offsetMinutes=matches[0];
  if(!Number.isInteger(offsetMinutes))throw Error('Décalage historique avec secondes : saisissez un décalage UTC manuel approximatif et vérifiez le thème.');
  if(Math.abs(offsetMinutes)>840)throw Error('Fuseau hors plage autorisée.');
  const abs=Math.abs(offsetMinutes);
  return (offsetMinutes<0?'-':'+')+String(Math.floor(abs/60)).padStart(2,'0')+':'+String(abs%60).padStart(2,'0');
}
function chart(input){
if(!/^\d{4}-\d{2}-\d{2}$/.test(input.date||''))throw Error('Date invalide.');
let [year,month,day]=input.date.split('-').map(Number),cal=new Date(Date.UTC(year,month-1,day));
if(cal.getUTCFullYear()!==year||cal.getUTCMonth()!==month-1||cal.getUTCDate()!==day)throw Error('Date inexistante.');
if(year<1900||year>2100)throw Error('Moteur expérimental limité à 1900–2100.');
let time=input.time||'12:00';
if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(time))throw Error('Heure invalide.');
if(!input.zone && !/^[+-](0\d|1[0-3]):[0-5]\d$|^[+-]14:00$/.test(input.offset||''))throw Error('Décalage UTC invalide.');
if(input.lat===null||input.lat===undefined||input.lat===''||input.lon===null||input.lon===undefined||input.lon===''||!Number.isFinite(Number(input.lat))||!Number.isFinite(Number(input.lon))||Math.abs(Number(input.lat))>90||Math.abs(Number(input.lon))>180)throw Error('Coordonnées invalides.');
if(!['placidus','egales','signes-entiers'].includes(input.houses))throw Error('Maisons inconnues.');
if(!['tropical','sideral'].includes(input.zodiac))throw Error('Zodiaque inconnu.');
let offset=input.zone?historicalOffset(input.date,time,input.zone):input.offset;
let dt=new Date(input.date+'T'+time+':00'+offset);if(!Number.isFinite(dt.getTime()))throw Error('Date ou heure incorrecte.');let j=jd(dt),pos=positions(j),h=input.time?houses(j,Number(input.lat),Number(input.lon),input.houses):null;let ay=24.042+0.01397*(dt.getUTCFullYear()-2000);if(input.zodiac==='sideral') {Object.keys(pos).forEach(k=>pos[k]=norm(pos[k]-ay));if(h){h.asc=norm(h.asc-ay);h.mc=norm(h.mc-ay);h.cusps=h.cusps.map(x=>norm(x-ay))}}
let planets={};for(let [name,longitude] of Object.entries(pos))planets[name]={longitude,signe:SIGNES[Math.floor(longitude/30)],degre:longitude%30,maison:h?houseOf(longitude,h.cusps):null};return {name:input.name||'Consultant',date:input.date,time:input.time||null,place:input.place||'Coordonnées fournies',planets,ascendant:h?{longitude:h.asc,signe:SIGNES[Math.floor(h.asc/30)]}:null,mc:h?.mc,houses:h?.cusps.map((longitude,i)=>({number:i+1,longitude}))||[],zodiac:input.zodiac,houses_system:input.houses,jd:j}}
const TYPES=[['Conjonction',0,8],['Sextile',60,5],['Carré',90,6],['Trigone',120,6],['Opposition',180,8]];
function aspects(a,b,cross=false){let out=[];for(let [n,p] of Object.entries(a)){for(let [m,q] of Object.entries(b)){if(!cross&&PLANETS.indexOf(m)<=PLANETS.indexOf(n))continue;let diff=Math.abs(angleDiff(p.longitude,q.longitude));for(let [type,angle,orb] of TYPES){if(Math.abs(diff-angle)<=orb){out.push({a:n,b:m,type,orbe:Math.abs(diff-angle)});break}}}}return out.sort((x,y)=>x.orbe-y.orbe)}
return {chart,aspects,positions,jd,houses,norm,historicalOffset};})();
