# Audit indépendant sur 144 cas — 23 novembre 2026

Comparaison reproductible avec Swiss Ephemeris (mode Moshier), utilisé **uniquement dans les tests**. Le moteur Android reste analytique et hors ligne.

12 années (1900–2099) × 4 saisons × 3 villes = **144 cas** à 12:00 UTC.

Écarts maximaux mesurés (degrés) : Soleil 0,01598 ; Lune **0,11720** ; Mercure 0,02058 ; Vénus 0,01924 ; Mars 0,02946 ; Jupiter 0,03244 ; Saturne 0,03116 ; Uranus 0,07659 ; Neptune 0,01946 ; Pluton 0,02285 ; maisons Placidus 0,00828.

**Décision : non publiable en l'état comme calculateur astrologique de précision.** La Lune dépasse 0,1° sur cet échantillon. Les latitudes polaires, les dates extrêmes et les fuseaux historiques ne sont pas couverts. Ce rapport ne prouve pas une précision globale.

Pour reproduire : `python tests/audit_144_cases.py` (dépendance de développement `pyswisseph` et Node.js). Puis `node tests/release-gate.cjs --enforce` (échec attendu tant que les conditions de publication ne sont pas remplies).
