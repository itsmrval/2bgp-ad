Ocean's Eleven

theme song: https://youtu.be/sdSai09_jzc
theme write: https://www.youtube.com/watch?v=FteCteGhnYY

Infra:
- 2 forêts (Bellagio et le Mirage)
- Domaines enfants (Bellagio: casino.bellagio.com Mirage: casino.mirage.com MGM Grand: casino.mgmgrand.com )

Tuto Exegol conteneur : https://youtu.be/7AI2rYDLIUs?si=uwSTkzRqh5wNxuXm

Idées Attaques : 

LLMNR, NBT-NS et mDNS spoofing

Kerberoast w/o pre-authentication

DHCPv6 spoofing/poisoning

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Histoire inspiré de Ocean's Eleven à mettre dans l'intro :

Danny Ocean est un maître du casse et le cerveau derrière l'opération la plus audacieuse jamais orchestrée sur le Strip de Las Vegas. Son objectif ? Dévaliser simultanément trois des plus prestigieux casinos détenus par le redoutable Terry Benedict, un magnat de la mafia dont le pouvoir s'étend jusque dans les systèmes numériques.

Pour préparer ce coup d'éclat, Ocean a réuni une équipe de onze spécialistes aux compétences complémentaires : ingénieurs, hackers, experts en sécurité et as du déguisement numérique. Vous, reconnu pour votre expertise en Active Directory, avez été minutieusement sélectionné. Sans disposer d'un compte initial pour accéder au domaine, votre mission consistera à infiltrer l'environnement AD, contourner ses défenses et exploiter ses failles pour obtenir les accès nécessaires.

Chaque pas vous rapprochera de la forteresse numérique de Benedict. Entre reconnaissance réseau, escalades de privilèges et attaques ciblées, vous devrez user de ruse et d'innovation pour déjouer les mécanismes de sécurité et créer le ticket d'or qui vous ouvrira les portes de ces casinos virtuels. La réussite de l'opération repose sur votre capacité à découvrir et exploiter les vulnérabilités d'un Active Directory verrouillé, sans compte de départ. Bienvenue dans l'équipe : le braquage commence maintenant.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 1 (Reconnaissance ) :

Script pour histoire du niveau :

Votre équipe a tenté de pénétrer dans les coulisses l'IT du casino pour subtiliser un compte AD stratégique, mais vos efforts se sont heurtés à un mur de sécurité imprévu. Les défenses internes se sont avérées plus solides que prévu et l'accès direct aux comptes critiques s'est avéré impossible par des moyens conventionnels.

Ce revers, loin de constituer un échec définitif, met en lumière une piste inattendue : une vulnérabilité au cœur de l'annuaire Active Directory. En scrutant les communications internes, vous découvrez qu'un serveur LDAP, mal configuré et accessible en mode anonyme, pourrait être la clé pour contourner les défenses et obtenir les informations nécessaires. C'est à vous, expert AD, de transformer cette faille en opportunité et de préparer le prochain mouvement de l'équipe pour renverser la sécurité du casino.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 2 (Création de compte via exploitation d’un partage SMB mal configuré) :



Un serveur Windows du domaine expose un partage SMB dont les permissions en écriture sont mal restreintes. Ce partage contient un dossier de scripts d'administration, utilisés par les équipes internes pour la maintenance. Par inadvertance, le partage est accessible aux utilisateurs non authentifiés ou avec des droits trop larges.





--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 3:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 4:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 5:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 6:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 7:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



