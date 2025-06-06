#!/bin/bash

source /scripts/config/backend.env
hostname="http://backend:$PORT"
token="$ADMIN_SYSTEM_TOKEN"

# Function to send curl requests
send_request() {
    curl --location "$hostname/levels" \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --header "Authorization: Bearer $token" \
        --data-urlencode "name=$1" \
        --data-urlencode "hid=$2" \
        --data-urlencode "description=$3" \
        --data-urlencode "flag=$4" \
        --data-urlencode "points=$5"
}

# Check if levels exist by sending a GET request
response=$(curl --location "$hostname/levels" \
    --header "Authorization: Bearer $token")

# If the response is an empty list, run the requests
if [[ "$response" == "[]" ]]; then

    # Request 1: Level 1
    send_request "Reconnaissance" 1 "Votre équipe s'infiltre dans le casino, pour que le casse commence vous devez pénétrer leur environnement informatique.<br>Votre mission consiste à identifier les types de serveurs présents sur leur réseau ainsi que les ports ouverts.<br><br>L’équipe a réussi à soudoyer un membre du service IT lors des missions de reconnaissances, obtenant ainsi une plage d’adresses IP 10.X.0.0/24<br><br>Vous allez pouvoir cartographier le réseau du casino et identifier les services exposés.<br><br>Entrer le ttl suivi de la version du serveur." "1282019" 100
    send_request "Enumération" 2 "Après avoir cartographié l’infrastructure du casino, votre équipe se retrouve face à un nouveau défi : pénétrer le cœur de l’Active Directory pour dénicher les identifiants des employés et des comptes de services.<br><br>Grâce aux informations récoltées vous savez désormais quels serveurs hébergent le rôle de contrôleur de domaine et comment la topologie du réseau est organisée. Pour progresser, il vous faut dresser une liste des comptes AD susceptibles d’être utilisés dans l’environnement du casino.<br><br><br>Un de vos contacts au sein du service IT a réussi à récupérer un fichier brut : une liste d’environ 1 000 noms d’utilisateurs utilisés pour le support interne. Vous <a href="/users.txt" target="_blank">téléchargez ce fichier</a> puis l’analysez pour en extraire les comptes potentiellement valides.<br><br>Entrer le nom de l'utilisateur." "svc-bella" 200
    send_request "Usurpation de compte sans permission" 3 "Terry Benedicte sous-estime une faille cruciale dans son système de sécurité informatique. Les comptes de service de son réseau n'ont pas l'air d'avoir de pré-authentification requise.<br><br>Votre objectif est de récupérer le hashs des mots de passe de l'utilisateur précédemment trouvé pour permettre de récuperer ces comptes et de prendre le contrôle d'un compte pour qu'un de vos coéquipiers puissent se faire passer pour cette personne là et devier les systèmes de sécurité du Bellagio.<br><br>Entrer le mot de passe trouvé." "P@ssw0rd" 300 
    send_request "Hash bruteforce" 4 "Grâce au compte trouvé, tu peux donc effectuer une recherche pour connaitre le ou les différents lien de confiance qui sont liés a ce serveur.<br><br>Avec toutes ces informations tu peux ensuite t'interesser au partage de fichier. Votre équipe a besoin de vous car elle est bloqué sans ce mot de passe ils ne pourront pas passer les portiques de sécurité qui va permettre a l'équipe de pouvoir se déplacer librement entre le Bellagio et le MGM Grand <br><br>Entrer le mot de passe bruteforcé." "Administrator123" 300
    send_request "Coulisses du MGM" 5 "Danny Ocean te remercie, grace à toi toutes l'équipe du braquage va pouvoir se déplacer entre les 2 casinos.<br><br>Mais l’équipe a découvert que le système protégeant le coffre-fort se renouvelait toutes les cinq minutes. De plus, pour y accéder, il faut posséder un certain niveau de privilège afin de récupérer le mot de passe le protégeant, lequel est stocké dans le bureau du système de sécurité .<br><br>Entrer le texte stocké." "2bgpad-butrt" 500
    send_request "Mémoire Volatile" 6 "Danny Ocean et le reste de l’équipe se trouvent désormais dans la chambre forte du MGM Grand. <br><br>Votre mission est de les faire ressortir de cet endroit avec un maximum d’argent. Pour cela, il vous faudra réaliser un dump de la mémoire des comptes du MGM Grand afin d’obtenir les informations nécessaires pour ouvrir le plus de coffres possibles.<br><br>Entrer le mot de passe bruteforcé." "Qwerty123" 600
    send_request "Miroir du Domaine" 7 "L'équipe doit sortir du coffre fort, cependant elle a besoin de l'algorithme de chiffrement du compte administrateur.<br><br>Le hash récupéré te servira également par la suite, tente de le récupérer avec une attaque de fausse synchronisation sur le Bellagio." "aes256-cts-hmac-sha1-96" 700
    send_request "Clé Ultime" 8 "Après avoir neutralisé les contrôles internes du MGM Grand, l’équipe d’Ocean s’apprête à franchir l’étape décisive : ils détiennent désormais la clé d'un administrateur du domaine, capable de leur ouvrir certaines portes. En tirant parti de ce précieux atout, votre mission est d’élaborer un jeton d’accès, de l’injecter dans votre session, puis de l’utiliser. N'essaye pas de forcer ce hash.<br><br>Entrer le nom du jeton obtenu." "A_CHANGER" 800
    send_request "Ombres du Partage" 9 "Danny Ocean et son équipe se tournent vers le domaine Mirage pour continuer le braquage. Il leur faut dénicher le sésame qui leur permettra d’ouvrir le passage vers le répertoire central du domaine d’en face. À l’aide de <a href="/users_mirage.txt" target="_blank">liste d'identifiants</a> et de <a href="/passwords_mirage.txt" target="_blank">mots de passe</a> établies, votre objectif est de sonder silencieusement le service de partage des fichiers.<br><br>Entrer l’utilisateur valide découvert." "FrankCatton" 900
    send_request "Trésors Enfouis" 10 "À présent connecté au domaine Mirage, l’équipe d’Ocean sait que les véritables richesses sont dissimulées dans les recoins inaccessibles du serveur. Ils ont repéré un dossier particulièrement exploitable sur FrankCatton. Votre mission consiste à fouiller discrètement le chemin vers ces répertoires, trouver un fichier issu de la création d'un compte local.<br><br>Entrer le mot passe du compte trouvé" "GPPstillStandingStrong2k18" 1000


    else
    echo "Level already exists"
fi
