# État de validation — 23 novembre 2026

Le contrôle de publication a été actualisé : l'ancien message indiquant une Lune à 0,1172° d'écart était périmé. Les rapports embarqués donnent maintenant un maximum de 0,01565° sur la première série et de 0,01685° sur la série indépendante. Ces chiffres concernent des échantillons limités et ne certifient pas toutes les positions astronomiques.

Exécuter `node tests/release-gate.cjs --enforce` : le contrôle doit **échouer** tant que la validation astronomique globale, les licences et l'APK signé/testé ne sont pas disponibles.

Les tests de cohérence JS ne remplacent ni un audit astronomique exhaustif ni une compilation Android. La distribution reste bloquée.
