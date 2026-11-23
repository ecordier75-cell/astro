import json,subprocess
from pathlib import Path
import swisseph as swe
root=Path(__file__).resolve().parents[1]
latitudes=[-67,-66.5,-66,-65.5,-65,-64,64,65,65.5,66,66.5,67]
cases=[dict(name=f'{lat} {year}-{month:02d} {hour:02d}:00',date=f'{year}-{month:02d}-15',time=f'{hour:02d}:00',offset='+00:00',lat=lat,lon=0,zodiac='tropical',houses='placidus') for lat in latitudes for year in [1900,2024,2099] for month in [1,7] for hour in [0,12]]
js="const fs=require('fs'),vm=require('vm');let c=vm.createContext({Intl,Date});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',c);process.stdout.write(JSON.stringify(JSON.parse(fs.readFileSync(0,'utf8')).map(x=>{try{return {ok:true,chart:c.Astro.chart(x)}}catch(e){return {ok:false,error:String(e.message)}}})));"
r=subprocess.run(['node','-e',js],input=json.dumps(cases),cwd=root,text=True,capture_output=True,check=True)
outputs=json.loads(r.stdout)
errors=[];rejected=[];reference_failures=[]
for case,out in zip(cases,outputs):
 if not out['ok']:
  rejected.append({'case':case['name'],'reason':out['error']});continue
 try:cusps,angles=swe.houses_ex(out['chart']['jd'],case['lat'],case['lon'],b'P')
 except Exception as e:reference_failures.append({'case':case['name'],'reason':str(e)});continue
 for i,(a,b) in enumerate(zip(out['chart']['houses'],cusps),1):
  err=abs((a['longitude']-b+180)%360-180)
  errors.append({'case':case['name'],'cusp':i,'error_degrees':round(err,6)})
summary={'cases':len(cases),'computed':sum(o['ok'] for o in outputs),'rejected':len(rejected),'reference_failures':len(reference_failures),'compared_cusps':len(errors),'max_error_degrees':max((x['error_degrees'] for x in errors),default=None),'above_0_1_degrees':sum(x['error_degrees']>0.1 for x in errors),'worst_10':sorted(errors,key=lambda x:x['error_degrees'],reverse=True)[:10],'rejected_sample':rejected[:5],'reference':'Swiss Ephemeris pyswisseph (external test dependency, not bundled)','publication_ready':False}
(root/'docs'/'AUDIT-PLACIDUS-BOUNDARY.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(summary,ensure_ascii=False,indent=2))
