# Paramètres
$taskName = "ExecuteADSetup"
$scriptPath = "D:\112_objects.ps1"

# 1. Supprimer l'ancienne tâche si elle existe
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# 2. Créer une nouvelle action
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -File `"$scriptPath`""

# 3. Créer un déclencheur au démarrage
$trigger = New-ScheduledTaskTrigger -AtStartup

# 4. Configurer pour s'exécuter même sans connexion utilisateur
$principal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount -RunLevel Highest

# 5. Paramètres d'exécution
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -DontStopOnIdleEnd

# 6. Enregistrer la nouvelle tâche
Register-ScheduledTask -Action $action -Trigger $trigger -Principal $principal -Settings $settings -TaskName $taskName -Description "Exécute le script de configuration AD au démarrage"

# 7. Vérifier
Get-ScheduledTask -TaskName $taskName | Format-List *

Install-WindowsFeature -Name AD-Domain-Services -IncludeManagementTools

# Importer le module Active Directory
Import-Module ActiveDirectory

# Définir les variables pour la création du domaine
$domainName = "mgmgrand.com"
$securePassword = ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force

# Promouvoir le serveur en tant que contrôleur de domaine
try {
    Install-ADDSForest `
        -DomainName $domainName `
        -DomainNetbiosName "mgmgrand" `
        -SafeModeAdministratorPassword $securePassword `
        -InstallDNS `
        -Force `
        -ErrorAction Stop

    Write-Host "Installation d'Active Directory réussie. Veuillez redémarrer pour finaliser l'installation." -ForegroundColor Green
}
catch {
    Write-Host "Erreur lors de l'installation d'AD DS: $_" -ForegroundColor Red
    exit
}
