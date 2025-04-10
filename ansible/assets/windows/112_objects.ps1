# Définir le nom de l'organisation
$organizationName = "MGMGrand"

# Créer les OUs et les objets associés
$ous = @(
    @{Name="Management"; Computers=@("ManagementPC-MGM"); Users=@("Benedict", "Manager1-MGM", "Manager2-MGM")},
    @{Name="VIP"; Computers=@("VIPPC-MGM"); Users=@("VIPManager-MGM", "VIPAssistant-MGM")},
    @{Name="Sécurité"; Computers=@("SecurityPC-MGM"); Users=@("SecurityChief-MGM", "SecurityGuard1-MGM", "SecurityGuard2-MGM")},
    @{Name="IT"; Computers=@("ITServer-MGM", "ITPC-MGM"); Users=@("ITAdmin-MGM", "ITSupport1-MGM", "ITSupport2-MGM")},
    @{Name="Croupier"; Computers=@("CroupierPC-MGM"); Users=@("Croupier1-MGM", "Croupier2-MGM")}
)

# Créer les OUs, les ordinateurs et les utilisateurs
foreach ($ou in $ous) {
    $ouPath = "OU=$($ou.Name),DC=mgmgrand,DC=com"

    try {
        New-ADOrganizationalUnit -Name $ou.Name -Path "DC=mgmgrand,DC=com" -ProtectedFromAccidentalDeletion $false
        Write-Host "Création de l'OU: $($ou.Name) terminée." -ForegroundColor Cyan

        foreach ($computer in $ou.Computers) {
            New-ADComputer -Name $computer -Path $ouPath -Enabled $true
            Write-Host "  Création de l'ordinateur: $computer terminée." -ForegroundColor Gray
        }

        foreach ($user in $ou.Users) {
            New-ADUser -Name $user -Path $ouPath -AccountPassword (ConvertTo-SecureString "P@ssw0rd" -AsPlainText -Force) -Enabled $true -PasswordNeverExpires $true
            Write-Host "  Création de l'utilisateur: $user terminée." -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "Erreur lors de la création de l'OU $($ou.Name): $_" -ForegroundColor Red
    }
}

Write-Host "Configuration terminée pour $organizationName." -ForegroundColor Green

Unregister-ScheduledTask -TaskName "ExecuteADSetup" -Confirm:$false
