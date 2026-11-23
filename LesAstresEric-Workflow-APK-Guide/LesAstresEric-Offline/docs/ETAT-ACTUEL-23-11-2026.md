# Les Astres d’Éric — état vérifié le 23 novembre 2026

Le projet Android Studio contient une WebView et un moteur JavaScript local. Les tests `node tests/regression.test.cjs`, `node tests/validation.test.cjs`, `node tests/smoke.js` et l'audit `python tests/audit_extended.py` ont été exécutés avec succès.

L'audit étendu compare 27 thèmes à Swiss Ephemeris en mode Moshier, uniquement comme référence externe. Voir `AUDIT-ETENDU-27-CAS.json` pour les écarts mesurés.

## Blocages de publication
- Jupiter et Saturne dépassent les tolérances nécessaires à une précision de l'ordre de la minute d'arc.
- Pluton n'est pas calculé.
- Les fuseaux horaires historiques ne sont pas déterminés automatiquement.
- La licence d'un moteur d'éphémérides embarqué reste à clarifier pour une distribution au public.
- Aucun APK/AAB signé n'a été construit ou testé dans cet environnement.

## Instructions de développement
Pour répéter l'audit : installer Python, `pyswisseph` et Node.js, puis lancer `python tests/audit_extended.py`. Pour générer APK/AAB, ouvrir le projet dans Android Studio, résoudre les dépendances Gradle et utiliser **Build > Generate Signed Bundle / APK**. Ne pas publier tant que les blocages ci-dessus ne sont pas levés.

Le projet est destiné à être gratuit pour tous, sans publicité et sans achats intégrés.
