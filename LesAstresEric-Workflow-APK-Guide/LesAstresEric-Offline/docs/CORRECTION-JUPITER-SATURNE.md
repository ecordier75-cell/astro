# Correction Jupiter et Saturne — 23 novembre 2026

Modification du moteur hors ligne `app/src/main/assets/engine.js` : termes analytiques classiques de perturbation gravitationnelle entre Jupiter et Saturne, appliqués à la longitude héliocentrique avant conversion géocentrique.

Comparaison externe avec Swiss Ephemeris (Moshier), 27 cas (1900–2099, Paris/Sydney/New York, 12:00 UTC) :
- Jupiter : erreur maximale avant 0,24836°, après 0,03230°.
- Saturne : erreur maximale avant 0,59080°, après 0,02299°.
- Pluton : erreur maximale 0,02035° (inchangée).
- Maisons Placidus : erreur maximale 0,00455° (inchangée).

Les chiffres concernent uniquement ces cas. Swiss Ephemeris n'est pas intégré à l'APK. Fuseaux historiques non résolus automatiquement. Aucun APK/AAB compilé ou signé. La publication reste bloquée.

Reproduction : `python tests/audit_extended.py` (pyswisseph requis). Certains anciens rapports d'audit sont conservés à titre historique et contiennent les valeurs avant correction.
