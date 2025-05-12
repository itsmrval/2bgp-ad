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


Level 1 (Reconnaissance NMAP) :

Script pour histoire du niveau :

Votre équipe est déjà infiltrée dans le casino, mais pour que le casse commence, vous devez d’abord pénétrer leur environnement informatique. 

Votre mission, si vous l’acceptez, consiste à identifier les types de serveurs présents sur leur réseau ainsi que les ports ouverts.

Cependant, après quelques verres bien placés, l’équipe a réussi à soudoyer un membre du service IT, obtenant ainsi une plage d’adresses IP…
En lançant une reconnaissance méticuleuse avec nmap, vous allez pouvoir cartographier le réseau du casino et identifier les services exposés.

Attaque : 

lancer un nmap pour que la personne connaissent son réseaux qui répondent 

nmap -sn 192.168.1.0/24

avec les IPs faire un nmap :

Key ctf = 127 + 2019

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 2 prendre controle d'un compte sans permission :

Après avoir compris le réseau du casino vous comprenez donc que leurs infrastructures est sur des windows server ttl 127.
L'etape consiste à prendre le controle d'un compte. Pour cela, on peut faire une attaque assez "simple" en recuperant le hash du password de la personne et de se connecter au compte en RDP ou WinRM (peut etre plus simple comme il va travailler sur Exegol sans doute).
Procédure pour trouver le hash (à réaliser) :



--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 3  :


--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 4:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 5:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 6:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Level 7:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 8:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 9:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 10:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 11:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 12:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 13:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Level 14:
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



