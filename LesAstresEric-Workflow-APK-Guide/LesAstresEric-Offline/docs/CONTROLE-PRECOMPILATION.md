# Contrôle préalable à la compilation — 23 novembre 2026

Commande : `node tests/android-preflight.cjs` depuis la racine du projet.

Ce contrôle vérifie des éléments statiques : plugin Android, SDK déclaré, activité de lancement, réglages de sécurité du manifeste et présence des fichiers du moteur et de l'interface.

**Ce n'est pas une compilation** : il ne garantit pas que Gradle résout les dépendances, que le code Java compile, que l'interface fonctionne sur un appareil, ni que les calculs astrologiques sont exacts.

Le projet n'inclut pas de Gradle Wrapper (`gradlew` et `gradle/wrapper/*`). Android Studio peut importer le projet et utiliser sa propre distribution de Gradle. Pour une compilation reproductible en ligne de commande, générer le Wrapper avec une installation Gradle compatible et conserver les fichiers générés, en vérifiant l'origine de la distribution et son checksum. Ne pas inventer ni distribuer un `gradle-wrapper.jar` non vérifié.

Dans Android Studio : ouvrir le dossier, installer SDK 35, synchroniser, puis Build > Build APK(s). Vérifier l'APK sur un appareil avant toute distribution. La signature release requiert une clé conservée en lieu sûr, hors du ZIP.
