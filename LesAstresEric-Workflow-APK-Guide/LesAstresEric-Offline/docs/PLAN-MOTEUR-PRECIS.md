# Intégration d’un moteur précis : plan technique

**État actuel : moteur JavaScript approximatif. Aucune bibliothèque Swiss Ephemeris embarquée. Pas d’APK signé.**

1. Sélectionner une bibliothèque d’éphémérides calculant dix planètes et maisons Placidus, compatible Android et dont les conditions de licence sont satisfaites pour la redistribution gratuite.
2. Si Swiss Ephemeris est retenu, examiner la licence AGPL et ses obligations (code source correspondant, notices et accès au code) ou obtenir une licence professionnelle selon le mode de distribution.
3. Intégrer le moteur natif (JNI) ou une implémentation portable et les données nécessaires hors ligne.
4. Remplacer les résultats du moteur JS approximatif ; ajouter Pluton et une indication explicite de l’état des données.
5. Intégrer les fuseaux horaires historiques et la résolution du lieu de naissance ; tester les changements d’heure et dates anciennes.
6. Comparer un corpus étendu aux éphémérides de référence, y compris latitudes extrêmes et dates limites.
7. Tester sur émulateur et appareil Android, compiler et signer APK et AAB, puis préparer les obligations de Google Play.

L’audit présent compare 27 cas mais **ne constitue pas une certification**.
