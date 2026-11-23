# Génération APK / AAB

## Android Studio
1. File > Open > dossier `LesAstresEric-Offline`.
2. Installer le SDK 35 proposé et synchroniser Gradle.
3. Build > Build Bundle(s) / APK(s) > Build APK(s) : APK debug pour essais.
4. Build > Generate Signed Bundle / APK > APK : APK release signé pour distribution directe.
5. Build > Generate Signed Bundle / APK > Android App Bundle : AAB release signé pour Google Play.

## Ligne de commande (avec Android SDK, Gradle et JDK 17 installés)
```bash
gradle assembleDebug
gradle bundleRelease
```

Le projet ne contient **pas** de keystore, et la commande release nécessite la configuration de signature dans Android Studio. Le fichier `.jks` et les secrets doivent rester hors du dépôt source.

## Google Play Console
Créer la fiche, fournir captures, icône haute résolution, politique de confidentialité publiée, questionnaire de sécurité des données, classification du contenu, test et mise en production. Les exigences de tests fermés et de vérification peuvent varier selon le type et l'ancienneté du compte développeur.
