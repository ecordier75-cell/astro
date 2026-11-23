# Correctifs de cette livraison

- Rejet des coordonnées absentes (`null`, chaîne vide, `undefined`) plutôt que leur conversion silencieuse en zéro.
- Contrôle des décalages UTC de -14:00 à +14:00, avec les limites de 14 heures autorisées uniquement à `:00`.
- Ajout de tests de non-régression pour ces cas.

## Limites importantes

Le moteur JavaScript embarqué demeure une approximation pédagogique et non un calcul de précision professionnelle. Pluton est absent. Les maisons Placidus sont expérimentales. Le décalage historique UTC est saisi manuellement. Aucun APK/AAB signé n'est fourni. Ne pas publier cette version en affirmant une précision astronomique vérifiée.

Pour une diffusion publique, il faut intégrer des éphémérides fiables avec une licence de redistribution appropriée, tester les positions et les domifications sur des jeux de référence, vérifier les fuseaux historiques et compiler/signature Android.
