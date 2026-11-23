# Obtenir le premier APK de test

1. Créer un dépôt GitHub privé et y déposer le contenu du dossier `LesAstresEric-Offline` à la racine.
2. Ouvrir l’onglet **Actions**, choisir **Android debug APK**, puis **Run workflow**.
3. Attendre la fin du travail ; il doit être vert. Dans **Artifacts**, télécharger `LesAstresEric-debug-apk`.
4. Décompresser l’archive téléchargée pour trouver `app-debug.apk`, puis transférer ce fichier sur le téléphone Android et l’installer après avoir autorisé l’installation depuis cette source.

Le workflow utilise Gradle 8.9 installé par GitHub Actions, Java 17 et Android SDK 35. Il ne dépend pas d’un Gradle Wrapper présent dans le dépôt.

**Limites :** cette compilation n’a pas été exécutée dans cet environnement ; le workflow peut nécessiter des corrections après son premier lancement. L’APK de débogage n’est pas un paquet signé pour publication Google Play. Vérifier les calculs et la compatibilité sur téléphone avant diffusion.
