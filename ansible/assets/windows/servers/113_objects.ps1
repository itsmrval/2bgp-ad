# Domaine: casino.mirage.local
$domain = "mirage.local"
$rootOu = "OU=Casino,DC=mirage,DC=local"

# Créer l'OU racine
New-ADOrganizationalUnit -Name "Casino" -Path "DC=mirage,DC=local"

$groups = @{
    "Gestion"    = @("LivingstonDell", "FrankCatton", "NightGuard", "EyeInTheSky", "SafeWatcher")
    "Marketing"  = @("LinusCaldwell", "RustyRyan", "JackSpot", "AceKeeper", "ChipMaster")
    "Finance"    = @("ReubenTishkoff", "SaulBloom", "VirgilMalloy", "CodeDealer", "ByteBettor", "CryptoWizard")
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
        if ($user -eq "FrankCatton") {
            # Pour le compte de service, utiliser un mot de passe différent
            $password = ConvertTo-SecureString "!2bgpad2025" -AsPlainText -Force
        } else {
            # Pour les autres utilisateurs, utiliser un mot de passe générique
            $password = ConvertTo-SecureString "eF?&4W0eUs6zfJaM!?op" -AsPlainText -Force
        }
        New-ADUser -Name $user -Path $ouPath -AccountPassword $password -Enabled $true

    }
}

Write-Host "Configuration terminée pour $organizationName." -ForegroundColor Green