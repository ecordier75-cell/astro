# Vérifications du 23 novembre 2026

- Ajout d'un test de référence sur sept couples zone/date, couvrant les offsets à 30 et 45 minutes, les deux hémisphères, les transitions DST et les zones inconnues.
- Correction de la validation : le décalage manuel n'est plus exigé si une zone IANA est sélectionnée.
- Les décalages historiques contenant des secondes sont refusés plutôt qu'arrondis silencieusement.
- Limites : base IANA fournie par Android, couverture géographique du sélecteur réduite, heures historiques anciennes non exhaustivement auditées, précision astronomique non certifiée.
- Aucun APK/AAB n'a été compilé. La diffusion publique reste bloquée par l'audit astronomique et les essais Android.
