"""Generate an offline commune index from the French public geo API during CI build.
The APK never connects to the internet. Fails closed if the source is unavailable.
"""
import json, urllib.request
from pathlib import Path
URL='https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,centre&format=json&geometry=centre'
request=urllib.request.Request(URL,headers={'User-Agent':'LesAstresEric-offline-build/1.0'})
with urllib.request.urlopen(request,timeout=90) as response:
    data=json.load(response)
assert isinstance(data,list) and len(data)>30000, 'Répertoire incomplet : compilation interrompue'
rows=[]
for c in data:
    geo=(c.get('centre') or {}).get('coordinates')
    if not geo or len(geo)!=2:continue
    lon,lat=geo
    code=str(c.get('code',''))
    # INSEE prefix 97/98 corresponds to overseas territories; timezone is not uniform.
    # No arbitrary offset is assigned: user must choose timezone for overseas.
    zone='Europe/Paris' if not code.startswith(('97','98')) and code[:2] not in ('2A','2B') else ('Europe/Paris' if code[:2] in ('2A','2B') else '')
    name=c['nom']
    cp=c.get('codesPostaux') or []
    label=f'{name} ({code})'+(f' — {cp[0]}' if cp else '')
    rows.append([label,round(lat,6),round(lon,6),zone])
assert len(rows)>30000, 'Coordonnées insuffisantes : compilation interrompue'
path = Path(__file__).resolve().parents[1] / 'LesAstresEric-Workflow-APK-Guide' / 'LesAstresEric-Offline' / 'app' / 'src' / 'main' / 'assets' / 'communes-france.js'
path.write_text('window.COMMUNES_FRANCE='+json.dumps(rows,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
print(f'{len(rows)} communes intégrées dans {path} ({path.stat().st_size} octets)')
