# Comparaison indépendante avec Swiss Ephemeris

Le script `tests/compare_reference.py` compare trois thèmes (Paris 1966, Paris 2000, Sydney 2024) avec Swiss Ephemeris installé **uniquement dans l'environnement de test**, et non dans l'application Android. Le rapport détaillé est `docs/COMPARAISON-EPHEMERIDES.json`.

Les écarts calculés sont des écarts de longitude en degrés. Le script ne valide ni l'ensemble de la période 1900–2100, ni les fuseaux historiques, ni les régions polaires. Pluton manque toujours dans le moteur embarqué. Les résultats ne doivent pas être interprétés comme une certification professionnelle.

Exécution : `python -m pip install pyswisseph`, puis `python tests/compare_reference.py` (Node.js requis).

**Avant publication** : moteur complet et licencié pour redistribution, tests de précision étendus, résolution des fuseaux historiques, compilation APK/AAB et essais sur appareil réel.
