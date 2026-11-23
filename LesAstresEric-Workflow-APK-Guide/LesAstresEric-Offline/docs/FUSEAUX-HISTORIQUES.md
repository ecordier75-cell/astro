# Fuseaux historiques hors connexion — prototype
Un sélecteur facultatif de zones IANA a été ajouté pour dix régions. Le moteur utilise `Intl.DateTimeFormat` embarqué dans Android WebView pour déterminer le décalage applicable à une date et une heure locales, sans serveur.
La saisie manuelle reste disponible. Les heures inexistantes lors du passage à l'heure d'été sont rejetées. **Les heures ambiguës au retour à l'heure d'hiver ne sont pas résolues automatiquement** ; dans ce cas choisir le décalage manuel.
La précision des règles historiques dépend de la version des données de fuseaux du système Android et n'est pas encore auditée sur plusieurs appareils. Certaines heures historiques comportent des décalages en secondes ; le formulaire n'en gère que les minutes.
Ce changement ne valide pas les éphémérides et ne rend pas l'application prête à publier.
