# Paramètres
$taskName = "ExecuteADSetup"

Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Importer le module Active Directory
Import-Module ActiveDirectory

# Définir les variables pour la création du domaine
$domainName = "mirage.local"
$securePassword = ConvertTo-SecureString "Velizy78!" -AsPlainText -Force

# Promouvoir le serveur en tant que contrôleur de domaine
try {
    Install-ADDSForest `
        -DomainName $domainName `
        -DomainNetbiosName "mirage" `
        -SafeModeAdministratorPassword $securePassword `
        -InstallDNS `
        -Force `
        -ErrorAction Stop

    Write-Host "Installation d'Active Directory réussie. Veuillez redémarrer pour finaliser l'installation." -ForegroundColor Green
    Restart-Computer -Force
}
catch {
    Write-Host "Erreur lors de l'installation d'AD DS: $_" -ForegroundColor Red
    exit
}
