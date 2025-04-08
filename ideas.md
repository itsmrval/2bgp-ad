Ocean's Eleven

theme song: https://youtu.be/sdSai09_jzc
theme write: https://www.youtube.com/watch?v=FteCteGhnYY

Infra:
- 3 forêts (Bellagio, The Mirage, MGM Grand)
- Domaines enfants (Bellagio: casino.bellagio.com Mirage: casino.mirage.com MGM Grand: casino.mgmgrand.com )
- Pour les groupes dans les AD : Croupiers ( la ou un des equipiers est dedans (pas de droit) )  Sécurité casinon basique (Peu de droit) Sécurité vidéo (autre droit) sécurité des coffres ( beaucoup de droit mais pas admin admin) et le compte créateur de Terry Beneditct

=================================================================================

Domaines et Unités d'Organisation (OU)

Domaines Enfants
    Bellagio: casino.bellagio.com
    Mirage: casino.mirage.com
    MGM Grand: casino.mgmgrand.com

Unités d'Organisation (OU)

**********************************************************************************************************************************************

Bellagio
  
  OU=Management
      PC: ManagementPC-Bellagio
      Utilisateurs: Benedict, Manager1-Bellagio, Manager2-Bellagio
  
  OU=VIP
      PC: VIPPC-Bellagio
      Utilisateurs: VIPManager-Bellagio, VIPAssistant-Bellagio
  
  OU=Sécurité
      PC: SecurityPC-Bellagio
      Utilisateurs: SecurityChief-Bellagio, SecurityGuard1-Bellagio, SecurityGuard2-Bellagio
  
  OU=IT
      PC: ITServer-Bellagio, ITPC-Bellagio
      Utilisateurs: ITAdmin-Bellagio, ITSupport1-Bellagio, ITSupport2-Bellagio
  
  OU=Croupier
      PC: CroupierPC-Bellagio
      Utilisateurs: Croupier1-Bellagio, Croupier2-Bellagio
      

**********************************************************************************************************************************************
    
Mirage

  OU=Management
      PC: ManagementPC-Mirage
      Utilisateurs: Benedict, Manager1-Mirage, Manager2-Mirage
  
  OU=VIP
      PC: VIPPC-Mirage
      Utilisateurs: VIPManager-Mirage, VIPAssistant-Mirage
  
  OU=Sécurité
      PC: SecurityPC-Mirage
      Utilisateurs: SecurityChief-Mirage, SecurityGuard1-Mirage, SecurityGuard2-Mirage
  
  OU=IT
      PC: ITServer-Mirage, ITPC-Mirage
      Utilisateurs: ITAdmin-Mirage, ITSupport1-Mirage, ITSupport2-Mirage
  
  OU=Croupier
      PC: CroupierPC-Mirage
      Utilisateurs: Croupier1-Mirage, Croupier2-Mirage

**********************************************************************************************************************************************

MGM Grand
  
  OU=Management
      PC: ManagementPC-MGM
      Utilisateurs: Benedict, Manager1-MGM, Manager2-MGM
  
  OU=VIP
      PC: VIPPC-MGM
      Utilisateurs: VIPManager-MGM, VIPAssistant-MGM
  
  OU=Sécurité
      PC: SecurityPC-MGM
      Utilisateurs: SecurityChief-MGM, SecurityGuard1-MGM, SecurityGuard2-MGM
  
  OU=IT
      PC: ITServer-MGM, ITPC-MGM
      Utilisateurs: ITAdmin-MGM, ITSupport1-MGM, ITSupport2-MGM
  
  OU=Croupier
      PC: CroupierPC-MGM
      Utilisateurs: Croupier1-MGM, Croupier2-MGM


**********************************************************************************************************************************************

Groupes AD

  Croupiers
      Description: Groupe contenant les employés qui travaillent comme croupiers. Ils n'ont pas de droits particuliers.
      Membres: Croupier1-Bellagio, Croupier2-Bellagio, Croupier1-Mirage, Croupier2-Mirage, Croupier1-MGM, Croupier2-MGM

  Sécurité Casino Basique
      Description: Groupe contenant les agents de sécurité avec des droits limités.
      Membres: SecurityGuard1-Bellagio, SecurityGuard2-Bellagio, SecurityGuard1-Mirage, SecurityGuard2-Mirage, SecurityGuard1-MGM, SecurityGuard2-MGM

  Sécurité Vidéo
      Description: Groupe contenant les agents de sécurité responsables des caméras de surveillance et des systèmes de reconnaissance faciale.
      Membres: SecurityChief-Bellagio, SecurityChief-Mirage, SecurityChief-MGM

  Sécurité des Coffres
      Description: Groupe contenant les agents de sécurité responsables des coffres-forts et des systèmes de gestion des accès.
      Membres: SecurityChief-Bellagio, SecurityChief-Mirage, SecurityChief-MGM

  Finance
      Description: Groupe contenant les employés responsables des transactions financières et de la gestion des jetons de casino.
      Membres: Manager1-Bellagio, Manager2-Bellagio, Manager1-Mirage, Manager2-Mirage, Manager1-MGM, Manager2-MGM

  VIP
      Description: Groupe contenant les employés responsables de la gestion des clients VIP et des suites de luxe.
      Membres: VIPManager-Bellagio, VIPAssistant-Bellagio, VIPManager-Mirage, VIPAssistant-Mirage, VIPManager-MGM, VIPAssistant-MGM

  IT
      Description: Groupe contenant les employés de l'équipe IT responsables de la gestion du réseau et des systèmes.
      Membres: ITAdmin-Bellagio, ITSupport1-Bellagio, ITSupport2-Bellagio, ITAdmin-Mirage, ITSupport1-Mirage, ITSupport2-Mirage, ITAdmin-MGM, ITSupport1-MGM, ITSupport2-MGM

  Admin
      Description: Compte administrateur de Terry Benedict.
      Membres: Benedict


            

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

Level 2 (Création de compte via exploitation d’un partage SMB mal configuré) :

Après avoir compris le réseau du casinon vous comprenez donc que leurs infrastructures est sur des windows server ttl 127. 



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



