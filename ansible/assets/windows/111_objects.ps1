# Domaine: casino.bellagio.com
$domain = "bellagio.com"
$rootOu = "OU=Casino,DC=bellagio,DC=com"

# Créer l'OU racine
New-ADOrganizationalUnit -Name "Casino" -Path "DC=bellagio,DC=com"

# Définir les groupes et comptes pour Bellagio
$groups = @{
    "Croupiers"  = @("DannyOcean", "LinusCaldwell", "RustyRyan")
    "Securite"   = @("BasherTarr", "LivingstonDell", "FrankCatton")
    "IT"         = @("ReubenTishkoff", "SaulBloom", "VirgilMalloy")
    "Admin"      = @("TerryBenedict")
}

# Créer les OUs, groupes et utilisateurs
foreach ($group in $groups.Keys) {
    $ouPath = "OU=$group,$rootOu"
    
    # Créer l'OU pour le groupe
    New-ADOrganizationalUnit -Name $group -Path $rootOu
    
    # Créer le groupe
    New-ADGroup -Name $group -Path $ouPath -GroupCategory Security -GroupScope Global
    
    # Créer les utilisateurs pour chaque groupe
    foreach ($user in $groups[$group]) {
        New-ADUser -Name $user -Path $ouPath -AccountPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) -Enabled $true
    }
}

Write-Host "Configuration terminée pour $organizationName." -ForegroundColor Green
Unregister-ScheduledTask -TaskName "ExecuteADSetup" -Confirm:$false -ErrorAction SilentlyContinue
New-Item -Path "C:\deployfull.txt" -ItemType File -Force | Out-Null
