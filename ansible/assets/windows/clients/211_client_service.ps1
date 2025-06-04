# Définir le chemin du répertoire
$servicePath = "C:\Users\svc-winrm\Desktop\service path"

# Créer le répertoire si nécessaire
if (!(Test-Path -Path $servicePath)) {
    New-Item -ItemType Directory -Path $servicePath
}

# Créer le contenu du fichier batch
$batchContent = '@echo off' + [Environment]::NewLine + 'ver > "' + $servicePath + '\version.txt"'

# Créer le fichier batch
Set-Content -Path "$servicePath\test.bat" -Value $batchContent
