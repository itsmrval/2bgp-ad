# Définir le nom de l'organisation
$organizationName = "MgmGrand"

# Créer les OUs et les objets associés
$ous = @(
    @{Name="Management"; Computers=@("ManagementPC-MGM"); Users=@("Benedict", "Manager1-MGM", "Manager2-MGM")},
    @{Name="VIP"; Computers=@("VIPPC-MGM"); Users=@("VIPManager-MGM", "VIPAssistant-MGM")},
    @{Name="Securite"; Computers=@("SecurityPC-MGM"); Users=@("SecurityChief-MGM", "SecurityGuard1-MGM", "SecurityGuard2-MGM")},
    @{Name="IT"; Computers=@("ITServer-MGM", "ITPC-MGM"); Users=@("ITAdmin-MGM", "ITSupport1-MGM", "ITSupport2-MGM")},
    @{Name="Croupier"; Computers=@("CroupierPC-MGM"); Users=@("Croupier1-MGM", "Croupier2-MGM")}
)

# Créer les OUs, les ordinateurs et les utilisateurs
foreach ($ou in $ous) {
    $ouPath = "OU=$($ou.Name),DC=mgmgrand,DC=com"
    
    # Créer l'OU si elle n'existe pas
    if (-not (Get-ADOrganizationalUnit -Filter "Name -eq '$($ou.Name)'" -ErrorAction SilentlyContinue)) {
        try {
            New-ADOrganizationalUnit -Name $ou.Name -Path "DC=mgmgrand,DC=com" -ProtectedFromAccidentalDeletion $false
            Write-Host "Création de l'OU: $($ou.Name) terminée." -ForegroundColor Cyan
        } catch {
            Write-Host "Erreur lors de la création de l'OU $($ou.Name): $_" -ForegroundColor Red
            continue
        }
    } else {
        Write-Host "L'OU $($ou.Name) existe déjà." -ForegroundColor Yellow
    }
    
    # Créer les ordinateurs
    foreach ($computer in $ou.Computers) {
        if (-not (Get-ADComputer -Filter "Name -eq '$computer'" -ErrorAction SilentlyContinue)) {
            try {
                New-ADComputer -Name $computer -Path $ouPath -Enabled $true
                Write-Host "  Création de l'ordinateur: $computer terminée." -ForegroundColor Gray
            } catch {
                Write-Host "  Erreur lors de la création de l'ordinateur $computer: $_" -ForegroundColor Red
            }
        } else {
            Write-Host "  L'ordinateur $computer existe déjà." -ForegroundColor Yellow
        }
    }
    
    # Créer les utilisateurs
    foreach ($user in $ou.Users) {
        # Extraire le sAMAccountName sans les caractères spéciaux
        $samAccountName = $user -replace '-', ''
        
        if (-not (Get-ADUser -Filter "SamAccountName -eq '$samAccountName'" -ErrorAction SilentlyContinue)) {
            try {
                New-ADUser -Name $user `
                    -SamAccountName $samAccountName `
                    -UserPrincipalName "$samAccountName@mgmgrand.com" `
                    -Path $ouPath `
                    -AccountPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) `
                    -Enabled $true `
                    -PasswordNeverExpires $true
                Write-Host "  Création de l'utilisateur: $user terminée." -ForegroundColor Gray
            } catch {
                Write-Host "  Erreur lors de la création de l'utilisateur $user: $_" -ForegroundColor Red
            }
        } else {
            Write-Host "  L'utilisateur $samAccountName existe déjà." -ForegroundColor Yellow
        }
    }
}

Write-Host "Configuration terminée pour $organizationName." -ForegroundColor Green
Unregister-ScheduledTask -TaskName "ExecuteADSetup" -Confirm:$false -ErrorAction SilentlyContinue
New-Item -Path "C:\deployfull.txt" -ItemType File -Force | Out-Null