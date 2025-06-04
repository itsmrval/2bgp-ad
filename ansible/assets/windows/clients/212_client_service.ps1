# Définir le chemin du répertoire
$servicePath = "C:\Users\NightGuard\Desktop\service"

# Créer le répertoire si nécessaire
if (!(Test-Path -Path $servicePath)) {
    New-Item -ItemType Directory -Path $servicePath
}

Copy-Item -Path "D:\info.exe" -Destination $servicePath -Force

# Commande pour créer le service
sc.exe create "info_win" binPath= "$servicePath\info.exe" DisplayName= "Infos Windows" start=auto

# Démarrer le service
Start-Service -Name "info_win"