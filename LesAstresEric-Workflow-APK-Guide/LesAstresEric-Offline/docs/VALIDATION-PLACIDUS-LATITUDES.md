# Validation Placidus aux latitudes élevées — 23 novembre 2026

L'audit `python tests/audit_placidus_latitudes.py` confronte les cuspides produites par le moteur hors ligne à Swiss Ephemeris (pyswisseph, uniquement outil de comparaison).

- 560 thèmes, 7 lieux, 5 années (1900, 1966, 2000, 2024, 2099), 4 mois et 4 heures UTC.
- 480 thèmes calculés, 5 760 cuspides comparées.
- Écart maximal : **0,046272°**, à Reykjavik, le 15 avril 2000 à 06:00 UTC, sur les cuspides 1 et 7.
- 80 thèmes refusés à Tromsø (69,65° N), en application de la protection existante `|latitude| > 66°`. Il s'agit d'un refus volontaire, pas d'une validation de Placidus à cette latitude.
- Aucun changement des formules astronomiques dans cette livraison : ajout d'un audit reproductible et d'un test de seuil.

**Limites** : échantillon discret et limité ; le seuil 0,1° n'est pas une certification. À vérifier encore : latitude proche de la limite, comportement des cuspides aux extrêmes, différences entre appareils, ascendant/MC et système de maisons dans l'interface. Aucun APK compilé ni signé.

Exécution : `python tests/audit_placidus_latitudes.py` (dépend de `pyswisseph`), puis `node tests/placidus-latitudes-gate.cjs`.
