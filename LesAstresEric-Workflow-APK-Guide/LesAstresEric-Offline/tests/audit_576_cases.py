"""Independent 576-case lunar audit. Requires pyswisseph; no reference library shipped in app."""
import json, subprocess
from pathlib import Path
import swisseph as swe
root=Path(__file__).resolve().parents[1]
years=[1900,1910,1925,1940,1950,1966,1980,1990,2000,2024,2050,2099]
locations=[('Paris',48.8566,2.3522),('Sydney',-33.8688,151.2093),('New York',40.7128,-74.006)]
months=[1,4,7,10]
times=['00:00','06:00','12:00','18:00']
cases=[{'name':f'{city} {year}-{month:02d}-15 {time} UTC','date':f'{year}-{month:02d}-15','time':time,'offset':'+00:00','lat':lat,'lon':lon,'zodiac':'tropical','houses':'placidus'} for year in years for month in months for city,lat,lon in locations for time in times]
js="const fs=require('fs'),vm=require('vm');let c=vm.createContext({});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',c);process.stdout.write(JSON.stringify(JSON.parse(fs.readFileSync(0,'utf8')).map(x=>c.Astro.chart(x))));"
result=subprocess.run(['node','-e',js],input=json.dumps(cases),cwd=root,text=True,capture_output=True,check=True)
charts=json.loads(result.stdout)
errors=[]
for case,chart in zip(cases,charts):
 reference=swe.calc_ut(chart['jd'],swe.MOON,swe.FLG_MOSEPH)[0][0]
 actual=chart['planets']['Lune']['longitude']
 errors.append({'case':case['name'],'error_degrees':round(abs((actual-reference+180)%360-180),7)})
errors.sort(key=lambda x:x['error_degrees'],reverse=True)
report={'sample_size':len(cases),'max_lunar_error_degrees':errors[0]['error_degrees'],'mean_lunar_error_degrees':round(sum(x['error_degrees'] for x in errors)/len(errors),7),'cases_over_0_1_degree':sum(x['error_degrees']>0.1 for x in errors),'worst_10':errors[:10],'scope':'576 cases: 1900–2099, four months, four UTC times, three cities; locations repeat same geocentric Moon for each time','reference':'Swiss Ephemeris Moshier via pyswisseph, used for audit only','publication_ready':False}
(root/'docs'/'AUDIT-LUNE-576-CAS.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
