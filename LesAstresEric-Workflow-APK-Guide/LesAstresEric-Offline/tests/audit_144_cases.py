"""Independent 144-case comparison; run with python tests/audit_144_cases.py."""
import json, subprocess
from pathlib import Path
import swisseph as swe
root=Path(__file__).resolve().parents[1]
years=[1900,1910,1925,1940,1950,1966,1980,1990,2000,2024,2050,2099]
locations=[('Paris',48.8566,2.3522),('Sydney',-33.8688,151.2093),('New York',40.7128,-74.006)]
months=[1,4,7,10]
cases=[{'name':f'{city} {year}-{month:02d}','date':f'{year}-{month:02d}-15','time':'12:00','offset':'+00:00','lat':lat,'lon':lon,'zodiac':'tropical','houses':'placidus'} for year in years for month in months for city,lat,lon in locations]
js="const fs=require('fs'),vm=require('vm');let c=vm.createContext({});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',c);process.stdout.write(JSON.stringify(JSON.parse(fs.readFileSync(0,'utf8')).map(x=>c.Astro.chart(x))));"
result=subprocess.run(['node','-e',js],input=json.dumps(cases),cwd=root,text=True,capture_output=True,check=True)
charts=json.loads(result.stdout)
ids={'Soleil':swe.SUN,'Lune':swe.MOON,'Mercure':swe.MERCURY,'Vénus':swe.VENUS,'Mars':swe.MARS,'Jupiter':swe.JUPITER,'Saturne':swe.SATURN,'Uranus':swe.URANUS,'Neptune':swe.NEPTUNE,'Pluton':swe.PLUTO}
errors={name:[] for name in ids}; house_errors=[]
for case,chart in zip(cases,charts):
 j=chart['jd']
 for name,planet_id in ids.items():
  reference=swe.calc_ut(j,planet_id,swe.FLG_MOSEPH)[0][0]
  actual=chart['planets'][name]['longitude']
  errors[name].append((abs((actual-reference+180)%360-180),case['name']))
 cusps,_=swe.houses_ex(j,case['lat'],case['lon'],b'P')
 house_errors.extend((abs((a['longitude']-b+180)%360-180),case['name'],i+1) for i,(a,b) in enumerate(zip(chart['houses'],cusps)))
report={'sample_size':len(cases),'max_planet_error_degrees':{name:round(max(values)[0],5) for name,values in errors.items()},'worst_planet_cases':{name:max(values)[1] for name,values in errors.items()},'max_placidus_cusp_error_degrees':round(max(house_errors)[0],5),'worst_placidus_case':max(house_errors)[1:],'scope':'144 cases, 1900–2099, four seasons, Paris/Sydney/New York, noon UTC; not a global accuracy guarantee','reference':'Swiss Ephemeris Moshier via pyswisseph, used only for comparison; not included in Android app','publication_ready':False}
(root/'docs'/'AUDIT-144-CAS.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
