import json, subprocess
from pathlib import Path
import swisseph as swe
root=Path(__file__).resolve().parents[1]
locations=[('Equateur',0,0),('Paris',48.8566,2.3522),('Oslo',59.9139,10.7522),('Reykjavik',64.1466,-21.9426),('Tromso',69.6492,18.9553),('Ushuaia',-54.8019,-68.303),('Hobart',-42.8821,147.3272)]
years=[1900,1966,2000,2024,2099];months=[1,4,7,10];times=['00:00','06:00','12:00','18:00']
cases=[{'name':f'{city} {y}-{m:02d}-15 {t}','date':f'{y}-{m:02d}-15','time':t,'offset':'+00:00','lat':lat,'lon':lon,'zodiac':'tropical','houses':'placidus'} for city,lat,lon in locations for y in years for m in months for t in times]
js="const fs=require('fs'),vm=require('vm');let c=vm.createContext({});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',c);process.stdout.write(JSON.stringify(JSON.parse(fs.readFileSync(0,'utf8')).map(x=>{try{return {ok:true,chart:c.Astro.chart(x)}}catch(e){return {ok:false,error:String(e.message)}}})));"
r=subprocess.run(['node','-e',js],input=json.dumps(cases),cwd=root,text=True,capture_output=True,check=True)
outputs=json.loads(r.stdout)
errors=[];rejections=[];reference_failures=[]
for case,out in zip(cases,outputs):
 if not out['ok']:
  rejections.append({'case':case['name'],'reason':out['error']});continue
 try: ref,angles=swe.houses_ex(out['chart']['jd'],case['lat'],case['lon'],b'P')
 except Exception as e:reference_failures.append({'case':case['name'],'reason':str(e)});continue
 for i,(actual,expected) in enumerate(zip(out['chart']['houses'],ref),1):
  diff=abs((actual['longitude']-expected+180)%360-180)
  errors.append({'case':case['name'],'cusp':i,'error_degrees':round(diff,6)})
summary={'cases':len(cases),'computed':sum(x['ok'] for x in outputs),'rejected':len(rejections),'reference_failures':len(reference_failures),'compared_cusps':len(errors),'max_error_degrees':max((x['error_degrees'] for x in errors),default=None),'worst_10':sorted(errors,key=lambda x:x['error_degrees'],reverse=True)[:10],'rejections_sample':rejections[:8],'reference_failures_sample':reference_failures[:8],'reference':'Swiss Ephemeris via pyswisseph; not bundled into app','publication_ready':False}
(root/'docs'/'AUDIT-PLACIDUS-LATITUDES.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(summary,ensure_ascii=False,indent=2))
