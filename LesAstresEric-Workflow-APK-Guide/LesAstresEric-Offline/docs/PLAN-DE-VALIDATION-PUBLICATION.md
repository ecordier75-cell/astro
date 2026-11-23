# Plan de validation avant diffusion publique

## État réel
- Projet Android Studio avec WebView et moteur JavaScript embarqué.
- Calculs hors ligne, mais **approximatifs** ; Pluton absent.
- Maisons Placidus expérimentales, non validées.
- Fuseaux horaires historiques à saisir manuellement.
- Aucun APK ni AAB compilé dans cette livraison.

## Travaux indispensables
1. Choisir un moteur astronomique hors ligne dont la licence autorise la redistribution de l’application.
2. Intégrer les dix planètes et comparer les résultats à des éphémérides de référence.
3. Valider les maisons Placidus, y compris les latitudes extrêmes.
4. Intégrer les fuseaux IANA historiques et la géolocalisation des lieux de naissance.
5. Tester des thèmes sur plusieurs siècles, latitudes et fuseaux, avec tolérances explicites.
6. Tester sur émulateur et téléphone, puis compiler APK et AAB signés.
7. Préparer fiche Play Store, confidentialité, captures et déclarations réglementaires.
