# Les Astres d’Éric — état réel de diffusion

**Statut : prototype / développement. Ne pas distribuer comme application de calcul astronomique précis.**

## Livrables
- Projet Android Studio hors ligne existant, interface française bleu nuit et or.
- Tests de validation, de régression et de décalages UTC.
- Nouveau contrôle de préparation à la diffusion : `node tests/release-gate.cjs --enforce` (échoue volontairement tant que les critères de publication ne sont pas remplis).

## Bloquants
1. Le moteur embarqué est analytique approximatif. Il ne calcule pas Pluton.
2. Les écarts de Jupiter et Saturne mesurés sur les 27 cas de l'audit dépassent les objectifs de précision d'un thème natal professionnel.
3. Les fuseaux historiques ne sont pas déterminés automatiquement depuis le lieu et la date.
4. Les maisons Placidus nécessitent des essais étendus, notamment aux latitudes extrêmes.
5. Aucune compilation ni signature APK/AAB n'a été effectuée dans cette livraison.

## Choix du moteur
Swiss Ephemeris pourrait convenir en embarqué Android via JNI, mais **sa licence doit être examinée avant redistribution** (obligations de licence libre ou licence commerciale). Ne pas copier simplement des bibliothèques ou des fichiers d'éphémérides dans un APK sans vérifier les droits.

## Pour une version publiable
Intégrer et tester un moteur sous licence compatible, créer des tests astronomiques de référence couvrant dix planètes et domification, intégrer une base de fuseaux historiques, compiler et tester l'application, puis signer APK et AAB. Vérifier les règles Play Console en vigueur lors de la publication.

Le projet vise une diffusion gratuite, sans publicité, sans achats intégrés.
