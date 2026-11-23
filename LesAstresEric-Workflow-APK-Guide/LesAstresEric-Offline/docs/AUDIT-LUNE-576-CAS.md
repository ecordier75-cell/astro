# Audit lunaire étendu — 23 novembre 2026

Exécution : `python tests/audit_576_cases.py` (nécessite `pyswisseph` et Node.js).

- 576 calculs de thème, 192 instants UTC distincts (3 villes répétées).
- Période échantillonnée : 1900–2099, quatre mois, quatre heures par jour.
- Écart maximal en longitude géocentrique de la Lune : 0,1283728°.
- Écart moyen : 0,0375184°.
- 39 calculs sur 576 (13 instants distincts) dépassent 0,1°.

Aucune correction lunaire non validée n'a été introduite. Les résultats ne constituent pas une garantie de précision globale. L'application n'est pas prête pour publication. Swiss Ephemeris est utilisé uniquement pour l'audit, pas intégré à l'application.
