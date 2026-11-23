# Préparation de la compilation Android — 23 novembre 2026

## Vérifications effectuées
- Projet Android Gradle Plugin 8.7.3, Java 17, compileSdk et targetSdk 35, minSdk 26.
- WebView : blocage de la navigation hors des assets intégrés, accès universel depuis `file://` désactivé, contenu mixte interdit.
- Les fichiers de calcul et l’interface restent embarqués, sans permission Internet dans le manifeste.
- Tests Node de fuseaux horaires et Placidus exécutés avec succès.

## Pour construire l’APK debug
1. Installer Android Studio et le SDK Android API 35, ainsi que JDK 17.
2. Ouvrir le dossier `LesAstresEric-Offline`.
3. Attendre la synchronisation Gradle (accès réseau nécessaire au premier téléchargement des outils).
4. Menu Build > Build Bundle(s) / APK(s) > Build APK(s).
5. Tester l’APK sur un appareil Android réel, notamment l’interface, les dates, l’impression PDF et le retour arrière.

## Limites
- Aucun Gradle Wrapper (gradlew + gradle-wrapper.jar) n’est fourni. Android Studio peut utiliser son Gradle installé ; sinon générer le wrapper avec Gradle 8.9 compatible avec AGP 8.7.3.
- Aucune compilation, installation ni signature n’a été réalisée dans cet environnement (SDK/Gradle indisponibles).
- Les anciennes dates, les heures ambiguës et les latitudes extrêmes demandent des vérifications supplémentaires.
- Le code Java WebView a été revu statiquement mais pas compilé. Ne pas considérer l’application prête pour Google Play.
