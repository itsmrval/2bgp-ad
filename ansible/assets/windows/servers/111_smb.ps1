try {
    # Spécifiez les informations d'identification
    $username = "Administrator"
    $password = "Velizy78!"
    $securePassword = ConvertTo-SecureString $password -AsPlainText -Force
    $credential = New-Object System.Management.Automation.PSCredential ($username, $securePassword)

    # Création du répertoire
    $Path = 'C:\logs'
    $PathScript = 'C:\script'
    New-Item -Path $Path -ItemType Directory -Force
    New-Item -Path $PathScript -ItemType Directory -Force
    $FileToIncludeInScript = 'D:\111_script_smb.ps1'

    # Configuration des permissions NTFS
    icacls $Path /inheritance:r
    icacls $Path /grant:r 'Administrator:(OI)(CI)(F)'
    icacls $Path /grant:r 'SYSTEM:(OI)(CI)(F)'
    icacls $Path /grant:r 'mgmgrand.local\DannyOcean:(OI)(CI)(M)'
    icacls $Path /grant:r 'svc-bella:(OI)(CI)(M)'

    icacls $PathScript /inheritance:r
    icacls $PathScript /grant:r 'Administrator:(OI)(CI)(F)'
    icacls $PathScript /grant:r 'SYSTEM:(OI)(CI)(F)'
    icacls $PathScript /grant:r 'mgmgrand.local\DannyOcean:(OI)(CI)(M)'
    icacls $PathScript /grant:r 'svc-bella:(OI)(CI)(M)'

    # Création du partage SMB
    $shareParams = @{
        Name = 'logs'
        Path = $Path
        Description = 'logs connection'
        FullAccess = 'Administrator'
        ChangeAccess = 'mgmgrand.local\DannyOcean', 'svc-bella'
    }
    New-SmbShare @shareParams -ErrorAction Stop

    $shareParamsScript = @{
        Name = 'script'
        Path = $PathScript
        Description = 'script connection'
        FullAccess = 'Administrator'
        ChangeAccess = 'mgmgrand.local\DannyOcean','svc-bella'
    }
    New-SmbShare @shareParamsScript -ErrorAction Stop

    # Vérification et redémarrage des services
    Restart-Service LanmanServer -Force
    Restart-Service LanmanWorkstation -Force
    
    # Copier le fichier
    Copy-Item -Path $FileToIncludeInScript -Destination $PathScript -Force

    # Obtenir le nom du fichier copié
    $copiedFileName = Split-Path $FileToIncludeInScript -Leaf
    $copiedFilePath = Join-Path $PathScript $copiedFileName

    # Supprimer l'attribut lecture seule du fichier copié
    Set-ItemProperty -Path $copiedFilePath -Name IsReadOnly -Value $false

}
catch {
    Write-Output "Erreur: $_"
    exit 1
}