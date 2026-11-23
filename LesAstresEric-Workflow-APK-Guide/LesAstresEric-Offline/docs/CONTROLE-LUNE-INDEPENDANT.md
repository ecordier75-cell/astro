# Contrôle lunaire indépendant — 23 novembre 2026

Un deuxième échantillon de 192 instants UTC a été testé, distinct des 192 instants de l'audit précédent. Les années, mois et heures ont été décalés pour limiter le risque de valider le moteur uniquement sur les dates connues.

- Écart maximal : **0,12292551°**.
- Écart moyen : **0,04732271°**.
- Cas au-dessus de 0,1° : **17/192**.
- Seuil de publication choisi : 0,1° maximum ; **non atteint**.

Script : `python tests/lunar-heldout-gate.py` (nécessite Node.js et pyswisseph uniquement sur le poste de test). Résultats : `docs/LUNAR-ACCURACY-HELDOUT.json`.

La formule lunaire **n'a pas été modifiée**. Les résultats montrent que l'écart n'est pas limité au premier échantillon. Il faut intégrer et tester une série lunaire plus complète, puis relancer les deux contrôles sans ajuster les échantillons après coup.

Cette archive contient du code source Android Studio et non un APK compilé.
