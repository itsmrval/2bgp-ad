# Chemin du fichier où inscrire l'heure
$path = "C:\Users\svc-winrm.mgmgrand\Desktop\log.txt"

# Vérifier si le fichier existe, sinon le créer vide
if (-Not (Test-Path -Path $path)) {
    New-Item -Path $path -ItemType File -Force | Out-Null

    # Définir les permissions : lecture et écriture pour Everyone
    $acl = Get-Acl -Path $path
    $rule = New-Object System.Security.AccessControl.FileSystemAccessRule("Everyone","Read,Write","Allow")
    $acl.SetAccessRule($rule)
    Set-Acl -Path $path -AclObject $acl
}

# Récupérer l'heure actuelle au format lisible
$heure = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

# Inscrire l'heure dans le fichier (ajoute une ligne à chaque exécution)
$text = "Tache planifiée exécutée à : $heure "
$text | Out-File -FilePath $path -Append