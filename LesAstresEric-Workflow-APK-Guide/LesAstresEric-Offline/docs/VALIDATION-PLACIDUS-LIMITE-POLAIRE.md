# Audit des latitudes proches de la limite polaire — 23 novembre 2026

144 configurations sur latitudes -67, -66,5, -66, -65,5, -65, -64, 64, 65, 65,5, 66, 66,5 et 67 degrés, années 1900, 2024, 2099, janvier et juillet, 00:00 et 12:00 UTC.

Résultats : 96 thèmes calculés ; 48 refus conformes au blocage actuel pour |latitude| > 66° ; 1 152 cuspides comparées avec Swiss Ephemeris ; écart maximal 0,015748° ; aucune cuspide avec écart supérieur à 0,1°.

Ce test n'établit pas la validité de la limite de 66° : celle-ci est une restriction volontaire du prototype, et non une frontière universelle du système Placidus. Le moteur et les tests restent expérimentaux. Aucune compilation APK ou AAB n'a été effectuée.

Pour reproduire : `python tests/audit_placidus_boundary.py` (pyswisseph requis). Rapport : `docs/AUDIT-PLACIDUS-BOUNDARY.json`.
