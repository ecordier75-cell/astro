# Les Astres d’Éric — Android hors connexion (projet source)

Application Android native Java contenant une interface HTML/CSS/JS embarquée dans WebView. Le calcul astronomique est fait en JavaScript sur l'appareil, **sans serveur et sans permission Internet**. Données de naissance non envoyées ni enregistrées.

## Inclus
- Thème natal : Soleil, Lune, Mercure, Vénus, Mars, Jupiter, Saturne, Uranus, Neptune, roue SVG, aspects et interprétations symboliques.
- Synastrie de deux thèmes, transits à une date UTC.
- Zodiaque tropical, sidéral **approximatif**, maisons Placidus **expérimentales**, égales et signes entiers.
- Export PDF par la fonction système Android « Imprimer » → « Enregistrer au format PDF ».
- Interface française bleu nuit/or. Android minSdk 26, targetSdk 35.

## LIMITATIONS importantes
**Ce n'est pas une application de calcul professionnel validée ni un APK déjà compilé.** Le moteur `engine.js` utilise des éléments orbitaux approximatifs (plage conseillée 1900–2100), et non Swiss Ephemeris. La précision des positions, des maisons et du sidéral n'est pas garantie. Les coordonnées géographiques et le décalage UTC historique sont saisis manuellement ; aucune recherche de villes ni gestion automatique des fuseaux historiques. Pas de Pluton. Voir `docs/TESTS.md` avant publication.

## Ouvrir et compiler
1. Installer Android Studio et Android SDK 35 (JDK 17).
2. Ouvrir ce dossier comme projet Android Studio. Accepter la synchronisation Gradle.
3. Menu **Build > Build Bundle(s) / APK(s) > Build APK(s)** pour un APK de test. Résultat dans `app/build/outputs/apk/debug/app-debug.apk`.
4. Pour un APK signé de distribution : **Build > Generate Signed Bundle / APK > APK**, créer ou sélectionner un fichier `.jks`, définir alias/mots de passe, choisir `release`, générer. **Ne jamais partager la clé de signature ni les mots de passe.**
5. Pour Google Play : **Build > Generate Signed Bundle / APK > Android App Bundle**. Produire le `.aab`, puis l'importer dans Play Console. Google Play distribue ensuite des APK optimisés ; le `.aab` n'est pas directement installable sur le téléphone.

## Signature et distribution
- Conserver le keystore et les mots de passe en lieu sûr ; la même identité de signature doit être conservée pour les mises à jour hors Play.
- Google Play App Signing gère la clé de signature Play et une clé de téléversement peut être utilisée ; les APK directs et Play peuvent avoir des signatures différentes selon la configuration.
- Modifier `applicationId` si nécessaire **avant** première publication. Augmenter `versionCode` à chaque nouvelle version.
- Pour une diffusion hors Play, faire installer l'APK par les destinataires et leur faire autoriser l'installation depuis cette source ; ne pas contourner les protections Android.
- Prévoir une page de confidentialité et les informations requises par Play Console, et vérifier les exigences de niveau d'API en vigueur au moment de publier.

## Licence
Le code original fourni ici peut être adapté et redistribué par le demandeur. Le moteur n'embarque pas Swiss Ephemeris. Si vous remplacez ce moteur par Swiss Ephemeris ou une autre bibliothèque, vérifier ses conditions de licence, d'attribution et de distribution commerciale avant publication.

## Recommandation
Ce projet est une **base fonctionnelle hors ligne à tester**. Avant une distribution publique, remplacer ou valider le moteur contre des éphémérides de référence et corriger les écarts identifiés. Il n'a pas été compilé en APK dans cet environnement (Android SDK/Gradle indisponibles).
