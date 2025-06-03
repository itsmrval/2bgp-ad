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
    send_request "Reconnaissance" 1 "Votre équipe est infiltrée dans le casino, pour que le casse commence vous devez pénétrer leur environnement informatique.<br>Votre mission consiste à identifier les types de serveurs présents sur leur réseau ainsi que les ports ouverts.<br><br>L’équipe a réussi à soudoyer un membre du service IT, obtenant ainsi une plage d’adresses IP… <br><br>Vous allez pouvoir cartographier le réseau du casino et identifier les services exposés.<br><br>Entrer le ttl suivi de la version du serveur." "1282016" 100
    send_request "Enumération" 2 "Après avoir cartographié l’infrastructure du casino, votre équipe se retrouve face à un nouveau défi : pénétrer le cœur de l’Active Directory pour dénicher les identifiants des employés et des comptes de services.<br><br>Grâce aux informations récoltées vous savez désormais quels serveurs hébergent le rôle de contrôleur de domaine et comment la topologie du réseau est organisée. Pour progresser, il vous faut dresser une liste des comptes AD susceptibles d’être utilisés dans l’environnement du casino.<br><br><br>Un de vos contacts au sein du service IT a réussi à récupérer un fichier brut : une liste d’environ 1 000 noms d’utilisateurs utilisés pour le support interne. Vous <a href="#">téléchargez ce fichier</a> puis l’analysez pour en extraire les comptes potentiellement valides.<br><br>Entrer le nom de l'utilisateur." "svc-bella" 200
    send_request "Chicken bacon" 3 "Terry Benedicta sous-estime une faille cruciale dans son système de sécurité informatique. Les comptes de service de son réseau Active Directory n'ont pas de pré-authentification requise, une vulnérabilité connue sous le nom d'ASREP-Roasting.<br><br>Votre objectif est de récupérer le hashs des mots de passe de l'utilisateur précédemment trouvé pour permettre de récuperer ces comptes et de prendre le contrôle des comptes nécessaires pour désactiver les systèmes de sécurité des casinos.<br><br>Entrer le mot de passe trouvé." "P@ssw0rd" 300 
    send_request "Hash bruteforce" 4 "Grâce au compte compromis, tu peux donc effectuer une recherche ldap pour connaitre le ou les différents lien de confiance qui sont liés a cet AD.<br><br>Avec toutes ces informations tu peux ensuite t'interesser au partage samba en utilisant le client samba de exegol...<br><br>Entre le mot de passe bruteforcé." "Qwerty123" 300
    else
    echo "Level already exists"
fi
