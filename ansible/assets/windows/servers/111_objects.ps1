# Domaine: casino.bellagio.local
$domain = "bellagio.local"
$rootOu = "OU=Casino,DC=bellagio,DC=local"

# Créer l'OU racine
New-ADOrganizationalUnit -Name "Casino" -Path "DC=bellagio,DC=local"

# Définir les groupes et comptes pour Bellagio
$groups = @{
    "Croupiers"  = @("RobertPop", "LinusCaldwell", "RustyRyan")
    "Securite"   = @("BasherTarr", "LivingstonDell", "FrankCatton")
    "IT"         = @("ReubenTishkoff", "SaulBloom", "VirgilMalloy", "svc-bella")
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
        if ($user -eq "svc-bella") {
            # Pour le compte de service, utiliser un mot de passe différent
            $password = ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force
        } else {
            # Pour les autres utilisateurs, utiliser un mot de passe générique
            $password = ConvertTo-SecureString "eF?&4W0eUs6zfJaM!?op" -AsPlainText -Force
        }
        New-ADUser -Name $user -Path $ouPath -AccountPassword $password -Enabled $true

    }
}

# Ajouter DannyOcean en tant qu'administrateur du domaine
$domainAdminsGroup = "Domains Admins"
$distinguishedName = "CN=DannyOcean,OU=Croupiers,OU=Casino,DC=mgmgrand,DC=local"
Add-ADGroupMember -Identity "Domain Admins" -Members $distinguishedName

Write-Host "Configuration terminée pour $organizationName." -ForegroundColor Green