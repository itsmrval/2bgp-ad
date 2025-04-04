Ocean's Eleven

theme song: https://youtu.be/sdSai09_jzc
theme write: https://www.youtube.com/watch?v=FteCteGhnYY

Infra:
- 3 forêts (Bellagio, The Mirage, MGM Grand)
- Domaines enfants (Bellagio: casino.bellagio.com Mirage: casino.mirage.com MGM Grand: casino.mgmgrand.com )

Tuto Exegol conteneur : https://youtu.be/7AI2rYDLIUs?si=uwSTkzRqh5wNxuXm

Idées Attaques : 

**Attaques de bas niveau :**

LLMNR, NBT-NS et mDNS spoofing

Kerberoast w/o pre-authentication

l'attaque asrep roasting permet prendre la main sur d'autres comptes


**Attaques simples :**
Abus des DACL (Discretionary Access Control Lists)

Prendre le controle d'un compte qui a les droits de modifier ou de create des gpo grâce aux 
attaques précédentes pour lancer des attaques plus vastes


**Attaques Importantes :**

Print NightMareeeee
AdminSDHolder

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Histoire inspiré de Ocean's Eleven à mettre dans l'intro :

Danny Ocean est un maître du casse et le cerveau derrière l'opération la plus audacieuse jamais orchestrée sur le Strip de Las Vegas. Son objectif ? Dévaliser simultanément trois des plus prestigieux casinos détenus par le redoutable Terry Benedict, un magnat de la mafia dont le pouvoir s'étend jusque dans les systèmes numériques.

Pour préparer ce coup d'éclat, Ocean a réuni une équipe de onze spécialistes aux compétences complémentaires : ingénieurs, hackers, experts en sécurité et as du déguisement numérique. Vous, reconnu pour votre expertise en Active Directory, avez été minutieusement sélectionné. Sans disposer d'un compte initial pour accéder au domaine, votre mission consistera à infiltrer l'environnement AD, contourner ses défenses et exploiter ses failles pour obtenir les accès nécessaires.

Chaque pas vous rapprochera de la forteresse numérique de Benedict. Entre reconnaissance réseau, escalades de privilèges et attaques ciblées, vous devrez user de ruse et d'innovation pour déjouer les mécanismes de sécurité et créer le ticket d'or qui vous ouvrira les portes de ces casinos virtuels. La réussite de l'opération repose sur votre capacité à découvrir et exploiter les vulnérabilités d'un Active Directory verrouillé, sans compte de départ. Bienvenue dans l'équipe : le braquage commence maintenant.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 1 (Reconnaissance NMAP) :

Script pour histoire du niveau :

Votre équipe a tenté de pénétrer dans les coulisses IT du casino pour subtiliser un compte AD stratégique et en savoir plus sur le réseau, mais vos efforts se sont heurtés à un mur de sécurité imprévu. Les défenses internes se sont révélées plus solides que prévu, rendant l'accès direct aux comptes critiques impossible par des moyens conventionnels. 

Cependant, l'équipe à réussi après quelques verres à soudoyer une travailleur de l'équipe IT une plage d'IP ... . En lançant une reconnaissance méticuleuse à l'aide de nmap, vous allez pouvoir cartographier le réseau du casino et identifier les services exposés.

Attaque : 

lancer un nmap pour connaitre les ip qui répondent 

nmap -sn 192.168.1.0/24

avec les IPs faire un nmap :


On peut dire que la key pour le CTF c'est les numéros des ports additionés pour pouvoir passé au prochain niveau. 


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



