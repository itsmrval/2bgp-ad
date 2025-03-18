Ocean's Eleven

theme song: https://youtu.be/sdSai09_jzc
theme write: https://www.youtube.com/watch?v=FteCteGhnYY

Infra:
- 2 forêts (Bellagio et le Mirage)
- Domaines enfants (Bellagio: casino.bellagio.com Mirage: casino.mirage.com MGM Grand: casino.mgmgrand.com )

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Histoire inspiré de Ocean's Eleven à mettre dans l'intro :

Danny Ocean est un maître du casse et le cerveau derrière l'opération la plus audacieuse jamais orchestrée sur le Strip de Las Vegas. Son objectif ? Dévaliser simultanément trois des plus prestigieux casinos détenus par le redoutable Terry Benedict, un magnat de la mafia dont le pouvoir s'étend jusque dans les systèmes numériques.

Pour préparer ce coup d'éclat, Ocean a réuni une équipe de onze spécialistes aux compétences complémentaires : ingénieurs, hackers, experts en sécurité et as du déguisement numérique. Vous, reconnu pour votre expertise en Active Directory, avez été minutieusement sélectionné. Sans disposer d'un compte initial pour accéder au domaine, votre mission consistera à infiltrer l'environnement AD, contourner ses défenses et exploiter ses failles pour obtenir les accès nécessaires.

Chaque pas vous rapprochera de la forteresse numérique de Benedict. Entre reconnaissance réseau, escalades de privilèges et attaques ciblées, vous devrez user de ruse et d'innovation pour déjouer les mécanismes de sécurité et créer le ticket d'or qui vous ouvrira les portes de ces casinos virtuels. La réussite de l'opération repose sur votre capacité à découvrir et exploiter les vulnérabilités d'un Active Directory verrouillé, sans compte de départ. Bienvenue dans l'équipe : le braquage commence maintenant.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 1 (Reconnaissance et Énumération LDAP Anonyme) :

Script pour histoire du niveau :

Votre équipe a tenté de pénétrer dans les coulisses l'IT du casino pour subtiliser un compte AD stratégique, mais vos efforts se sont heurtés à un mur de sécurité imprévu. Les défenses internes se sont avérées plus solides que prévu et l'accès direct aux comptes critiques s'est avéré impossible par des moyens conventionnels.

Ce revers, loin de constituer un échec définitif, met en lumière une piste inattendue : une vulnérabilité au cœur de l'annuaire Active Directory. En scrutant les communications internes, vous découvrez qu'un serveur LDAP, mal configuré et accessible en mode anonyme, pourrait être la clé pour contourner les défenses et obtenir les informations nécessaires. C'est à vous, expert AD, de transformer cette faille en opportunité et de préparer le prochain mouvement de l'équipe pour renverser la sécurité du casino.

ATTAQUE :

Objectif : Identifier les services LDAP ouverts sur le réseau du casino.
Méthode : Utilisez des outils comme nmap pour scanner le réseau et repérer les serveurs qui exposent le service LDAP.
Exemple de commande :
bash
Copier
nmap -p 389 --script ldap* <IP_du_casino>
But : Déterminer si le serveur LDAP autorise des connexions anonymes.
Interrogation du Serveur LDAP en Mode Anonyme

Objectif : Extraire des informations sur la structure de l'Active Directory, telles que les comptes utilisateurs, les unités d'organisation (OU) et autres objets critiques.
Méthode : Utilisez ldapsearch pour interroger le serveur LDAP sans authentification.
Exemple de commande :
bash
Copier
ldapsearch -x -h <IP_du_serveur_LDAP> -b "dc=casino,dc=local" "(objectClass=user)"
But : Identifier un ou plusieurs comptes susceptibles d'être exploités. En particulier, recherchez des comptes qui pourraient ne pas exiger la pré-authentification Kerberos (une condition propice à l’AS-REP Roasting).
Exploitation par AS-REP Roasting

Principe : Certains comptes AD qui ne nécessitent pas la pré-authentification Kerberos peuvent être sollicités pour obtenir une réponse chiffrée (AS-REP) contenant un hash du mot de passe.
Méthode : Utilisez un outil tel que Impacket’s GetNPUsers.py pour cibler ces comptes vulnérables.
Exemple de commande :
bash
Copier
python GetNPUsers.py casino.local/<NomDuCompteVulnérable> -dc-ip <IP_Du_DC>
But : Récupérer le hash chiffré qui pourra ensuite être soumis à un outil de cracking (par exemple, Hashcat) pour tenter de retrouver le mot de passe en mode hors ligne.
Exploitation et Utilisation du Compte Volé

Objectif : Une fois le mot de passe déchiffré, utilisez le compte compromis pour vous connecter au domaine.
Méthode : Connectez-vous à une machine du domaine ou utilisez des outils de gestion d'Active Directory pour valider l'accès.
But : Obtenir un premier point d'ancrage dans l'environnement AD, ce qui servira de tremplin pour la suite du CTF et l'infiltration des ressources critiques du casino.

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



