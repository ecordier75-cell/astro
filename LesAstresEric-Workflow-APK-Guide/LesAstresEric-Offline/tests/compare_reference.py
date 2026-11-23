"""Compare existing offline JS results against Swiss Ephemeris, for development only.
Swiss Ephemeris is used for independent QA here; it is NOT bundled in the Android app.
"""
import json, subprocess, math
import swisseph as swe
from pathlib import Path
root=Path(__file__).resolve().parents[1]
js=r'''const fs=require('fs'),vm=require('vm');const c=vm.createContext({});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',c);const cases=JSON.parse(fs.readFileSync(0,'utf8'));process.stdout.write(JSON.stringify(cases.map(x=>c.Astro.chart(x))));'''
cases=[dict(name='Paris 2000',date='2000-01-01',time='12:00',offset='+00:00',lat=48.8566,lon=2.3522,zodiac='tropical',houses='placidus'),dict(name='Paris 1966',date='1966-07-24',time='20:10',offset='+00:00',lat=48.8566,lon=2.3522,zodiac='tropical',houses='placidus'),dict(name='Sydney 2024',date='2024-06-15',time='09:00',offset='+10:00',lat=-33.8688,lon=151.2093,zodiac='tropical',houses='placidus')]
res=subprocess.run(['node','-e',js],cwd=root,input=json.dumps(cases),text=True,capture_output=True,check=True)
charts=json.loads(res.stdout)
ids={'Soleil':swe.SUN,'Lune':swe.MOON,'Mercure':swe.MERCURY,'Vénus':swe.VENUS,'Mars':swe.MARS,'Jupiter':swe.JUPITER,'Saturne':swe.SATURN,'Uranus':swe.URANUS,'Neptune':swe.NEPTUNE,'Pluton':swe.PLUTO}
report=[]
for case,chart in zip(cases,charts):
 j=chart['jd']; row={'cas':case['name'],'jd':j,'ecarts_planetaires_degres':{}}
 for name,ident in ids.items():
  ref=swe.calc_ut(j,ident,swe.FLG_MOSEPH)[0][0]
  if name in chart['planets']:
   got=chart['planets'][name]['longitude'];row['ecarts_planetaires_degres'][name]=round(abs((got-ref+180)%360-180),4)
  else:row['ecarts_planetaires_degres'][name]='ABSENT'
 cusps,ascmc=swe.houses_ex(j,case['lat'],case['lon'],b'P')
 row['ecart_ascendant_degres']=round(abs((chart['ascendant']['longitude']-ascmc[0]+180)%360-180),4)
 row['ecarts_maisons_degres']=[round(abs((a['longitude']-b+180)%360-180),4) for a,b in zip(chart['houses'],cusps)]
 report.append(row)
(root/'docs'/'COMPARAISON-EPHEMERIDES.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,ensure_ascii=False,indent=2))
