# Chemin du partage de fichiers
$sharePath = "\\bellagio.com\logs"
$filePath = "verify.txt"  # Chemin relatif après le mappage du lecteur

try {

    if (!(Get-PSDrive -Name "S" -ErrorAction SilentlyContinue)) {
        # Se connecter au partage de fichiers
        New-PSDrive -Name "S" -PSProvider FileSystem -Root $sharePath  -Persist -ErrorAction Stop
    } 

    # Vérifier si le fichier existe, sinon le créer
    if (!(Test-Path -Path "S:\$filePath")) {
        New-Item -ItemType File -Path "S:\$filePath" -Force
    }

    $currentDate = Get-Date -Format "dd MM yyyy HH:mm:ss"
    $logMessage = "connexion de verificiation le $currentDate => prochainne connexion dans 5 minutes"
    # Écrire la date dans un fichier
    $logMessage | Out-File -FilePath "S:\$filePath"

    Write-Output "Le fichier a été mis à jour avec la date actuelle."
}
catch {
    Write-Error "Une erreur est survenue : $_"
}