# Contrôle de précision lunaire bloquant

Ajout de `tests/lunar-accuracy-gate.py`, un test reproductible sur 192 instants UTC distincts entre 1900 et 2099, comparés à Swiss Ephemeris (Moshier). Le test échoue volontairement si l'erreur maximale dépasse 0,1° et écrit `docs/LUNAR-ACCURACY-GATE.json`.

**État actuel : échec.** Maximum 0,12837276°, moyenne 0,03751836°, 13 instants distincts au-dessus de 0,1°. L'audit antérieur de 576 calculs répète chacun des 192 instants dans trois villes, sans augmenter le nombre de longitudes géocentriques indépendantes.

La formule lunaire n'a pas été changée : aucune amélioration non démontrée n'est présentée comme correction. Prochaine étape : intégrer une série lunaire plus complète puis mesurer les écarts sur des cas indépendants supplémentaires, notamment hors de l'échantillon utilisé pour le développement.

Exécuter depuis la racine du projet : `python tests/lunar-accuracy-gate.py` (Node.js et `pyswisseph` nécessaires). La bibliothèque de référence n'est pas incluse dans l'application Android.
