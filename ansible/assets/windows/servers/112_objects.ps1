# Domaine: casino.mgmgrand.local
$domain = "mgmgrand.local"
$rootOu = "OU=Casino,DC=mgmgrand,DC=local"

# Créer l'OU racine
New-ADOrganizationalUnit -Name "Casino" -Path "DC=mgmgrand,DC=local"

# Définir les groupes et localptes pour MGM Grand
$groups = @{
    "Croupiers"  = @("DannyOcean", "LinusCaldwell", "RustyRyan")
    "Securite"   = @("BasherTarr", "LivingstonDell", "FrankCatton")
    "IT"         = @("ReubenTishkoff", "SaulBloom", "VirgilMalloy")
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

Move-ADObject -Identity "CN=PC-CLIENT, CN=Computers, DC=mgmgrand, DC=local" -TargetPath "OU=Croupiers, OU=Casino,DC=mgmgrand,DC=local"

New-GPO -Name "LLMNR" -Comment "GPO pour LLMNR"
Set-GPRegistryValue -Name "LLMNR" -Key "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\DNSClient" -ValueName "EnableMulticast" -Type DWord -Value 1
New-GPLink -Name "LLMNR" -Target "OU=Croupiers, OU=Casino,DC=mgmgrand, DC=local"

