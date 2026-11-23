# Compiler et signer

1. Installer Android Studio, JDK 17 et SDK Android 35 ; ouvrir le dossier `LesAstresEric-Offline`.
2. Synchroniser Gradle et tester sur un appareil ou émulateur.
3. **Build > Generate Signed Bundle / APK**.
4. Choisir **APK** pour diffusion directe ou **Android App Bundle** pour Google Play.
5. Créer un keystore, conserver les mots de passe et la clé privée hors du projet.
6. Choisir **release**, compiler, installer et tester l'APK signé.
7. Pour Google Play, activer Play App Signing et soumettre l'AAB dans Play Console.
8. Vérifier les règles Google Play en vigueur au moment de la publication.

Ne jamais publier le keystore ni les mots de passe dans les archives sources.
