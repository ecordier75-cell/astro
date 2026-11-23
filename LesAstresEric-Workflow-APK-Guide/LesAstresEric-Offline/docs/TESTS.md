# Validation obligatoire avant distribution

Le moteur `engine.js` est une éphéméride analytique **approximative** embarquée, et non Swiss Ephemeris. Il ne fournit pas Pluton, Chiron, les nœuds lunaires, les étoiles fixes ou les directions/progressions. Le calcul sidéral utilise une correction d'ayanamsa simplifiée. Ne présentez pas les résultats comme de précision professionnelle.

1. Vérifier sur au moins 100 dates et lieux (1900–2100) les longitudes Soleil/Lune/planètes contre une éphéméride de référence licenciée.
2. Vérifier l'Ascendant et les 12 cuspides Placidus, notamment aux latitudes élevées et dans l'hémisphère sud.
3. Tester les heures d'été historiques : l'application demande **explicitement le décalage UTC** ; elle ne le déduit pas de la ville.
4. Tester le comportement aux naissances sans heure, les dates avant 1970, les erreurs de saisie et les cas polaires.
5. Vérifier les exportations PDF sur Android 8 à Android 15+ et les orientations d'écran.
6. Avant Play Store : tests sur appareils réels, politique de confidentialité publiée, formulaire Data Safety, déclaration de contenu, capture d'écran et fiche de l'application.

## Exemple de référence (2000-01-01 12:00 UTC, Paris 48.8566 N, 2.3522 E)
Swiss Ephemeris de référence pour les maisons Placidus :
Asc 26.7737°, MC 281.7832°, maisons 2=61.8265°, 3=83.2373°, 11=302.5186°, 12=332.6625°.

Ce jeu de référence vérifie la géométrie d'un cas et **ne suffit pas** à valider la précision sur toutes les dates.
