# Compilation automatisée — APK de test

Cette archive inclut `.github/workflows/android-debug.yml` : un workflow GitHub Actions qui installe Java 17, le SDK Android 35 et Gradle 8.9, lance plusieurs tests JavaScript, puis tente de compiler `:app:assembleDebug`.

1. Décompresser le ZIP.
2. Créer un dépôt GitHub privé et y envoyer **le contenu** du dossier `LesAstresEric-Offline` (avec le dossier `.github`).
3. Dans GitHub, ouvrir **Actions > Android debug APK > Run workflow**.
4. Si le travail réussit, télécharger l'artifact **LesAstresEric-debug-apk** depuis l'exécution : il contient un APK de test Android signé avec la clé de débogage de l'environnement CI.
5. Tester sur un téléphone Android, notamment les thèmes, les fuseaux, Placidus et l'export PDF.

Important : le workflow n'a **pas été exécuté** ici. Une erreur de compilation ou d'environnement reste possible. L'APK debug ne doit pas être considéré comme un APK de publication, ni comme une validation de précision astronomique. Ne jamais ajouter de keystore ni de mot de passe au dépôt.
