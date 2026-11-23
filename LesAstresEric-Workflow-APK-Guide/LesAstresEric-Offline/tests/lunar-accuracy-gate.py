"""Independent lunar accuracy gate; uses pyswisseph for testing, never bundled in Android."""
import json, subprocess, sys
from pathlib import Path
import swisseph as swe
root=Path(__file__).resolve().parents[1]
years=[1900,1910,1925,1940,1950,1966,1980,1990,2000,2024,2050,2099]
months=[1,4,7,10]
times=['00:00','06:00','12:00','18:00']
cases=[{'date':f'{year}-{month:02d}-15','time':time,'offset':'+00:00','lat':48.8566,'lon':2.3522,'zodiac':'tropical','houses':'egales'} for year in years for month in months for time in times]
js="const fs=require('fs'),vm=require('vm');let c=vm.createContext({});vm.runInContext(fs.readFileSync('app/src/main/assets/engine.js','utf8')+';globalThis.Astro=Astro;',c);process.stdout.write(JSON.stringify(JSON.parse(fs.readFileSync(0,'utf8')).map(x=>c.Astro.chart(x))));"
result=subprocess.run(['node','-e',js],input=json.dumps(cases),cwd=root,text=True,capture_output=True,check=True)
charts=json.loads(result.stdout)
errors=[]
for case,chart in zip(cases,charts):
    ref=swe.calc_ut(chart['jd'],swe.MOON,swe.FLG_MOSEPH)[0][0]
    actual=chart['planets']['Lune']['longitude']
    errors.append({'date':case['date'],'time_utc':case['time'],'error_degrees':round(abs((actual-ref+180)%360-180),8)})
errors.sort(key=lambda x:x['error_degrees'],reverse=True)
report={'independent_instants':len(errors),'max_error_degrees':errors[0]['error_degrees'],'mean_error_degrees':round(sum(e['error_degrees'] for e in errors)/len(errors),8),'over_0_1_degree':sum(e['error_degrees']>0.1 for e in errors),'target_max_error_degrees':0.1,'passes':errors[0]['error_degrees']<=0.1,'worst_10':errors[:10],'note':'Geocentric Moon: 192 unique UTC instants, not 576 independent cases. Swiss Ephemeris used only for tests.'}
(root/'docs'/'LUNAR-ACCURACY-GATE.json').write_text(json.dumps(report,indent=2,ensure_ascii=False)+'\n')
print(json.dumps({k:v for k,v in report.items() if k!='worst_10'},indent=2))
sys.exit(0 if report['passes'] else 1)
