# Définir le chemin du répertoire
$servicePath = "C:\Users\svc-winrm\Desktop\service path"

Copy-Item -Path "D:\info.exe" -Destination $servicePath -Force

# Créer le répertoire si nécessaire
if (!(Test-Path -Path $servicePath)) {
    New-Item -ItemType Directory -Path $servicePath
}

# Commande pour créer le service
sc.exe create "info_win" binPath= "$servicePath\info.exe" DisplayName= "Infos Windows" start=auto

# Démarrer le service
Start-Service -Name "info_win"