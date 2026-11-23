# Ajout de Pluton — prototype analytique

Cette révision ajoute **Pluton** aux positions et aux aspects, avec une série analytique simplifiée et conversion héliocentrique → géocentrique. Il ne s’agit **pas** de Swiss Ephemeris ni d’un moteur de précision professionnelle. Le code est autonome hors connexion.

## Limitations
- Les positions des planètes et les maisons Placidus restent approximatives ; Jupiter et Saturne ont déjà montré des écarts importants.
- Le modèle simplifié de Pluton doit être confronté à des éphémérides de référence sur plusieurs décennies.
- La gestion automatique des fuseaux historiques n’est pas implémentée.
- L’APK et l’AAB ne sont pas compilés ni signés.

## Tests
`node tests/pluto.test.cjs` et les autres scripts dans `tests/`.

## Distribution
Ne pas présenter cette version comme calcul astronomique professionnel. Avant la publication, remplacer les séries approximatives par un moteur validé, vérifier les licences, tester sur Android et signer les artefacts de distribution.
