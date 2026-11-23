# Correction de saisie des fuseaux horaires

Le formulaire propose désormais les décalages UTC par quarts d’heure entre UTC−12:00 et UTC+14:00. Cela permet notamment les décalages +05:30 et +05:45.

**Limite importante :** les fuseaux historiques restent manuels ; aucune base IANA historique ni géocodage automatique n’est intégrée. Le moteur planétaire est toujours approximatif et Pluton reste absent. Cette version n’est pas prête pour une publication publique.

Tests : `node tests/offset-regression.test.cjs` puis les autres tests du dossier `tests`.
