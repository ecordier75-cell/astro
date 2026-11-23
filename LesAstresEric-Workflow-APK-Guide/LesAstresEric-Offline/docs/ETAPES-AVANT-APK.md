# Les Astres d’Éric — état de validation

## Vérifications
Tests JavaScript de saisie, fumée et régression exécutables avec Node.js. Ces tests ne prouvent pas la précision astronomique.

## Blocages avant diffusion
- Moteur approximatif, Pluton absent.
- Maisons Placidus non validées contre des références.
- Fuseaux historiques non automatisés.
- Aucun APK ni AAB compilé ou signé.
- Licence du moteur de précision à vérifier avant redistribution.

## Suite
1. Choisir un moteur d’éphémérides hors ligne sous licence compatible.
2. Intégrer les dix planètes et comparer les calculs avec des références sur plusieurs dates et latitudes.
3. Ajouter les fuseaux historiques et la recherche de lieux.
4. Tester dans Android Studio et sur téléphones.
5. Générer un APK signé et un AAB signé, puis préparer les informations Play Store.

L’application est prévue gratuite, sans publicité ni achat intégré.
