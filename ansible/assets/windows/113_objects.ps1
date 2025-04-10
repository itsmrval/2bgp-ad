# Définir le nom de l'organisation
$organizationName = "Mirage"

# Créer les OUs et les objets associés
$ous = @(
    @{Name="Management"; Computers=@("ManagementPC-Mirage"); Users=@("Benedict", "Manager1-Mirage", "Manager2-Mirage")},
    @{Name="VIP"; Computers=@("VIPPC-Mirage"); Users=@("VIPManager-Mirage", "VIPAssistant-Mirage")},
    @{Name="Sécurité"; Computers=@("SecurityPC-Mirage"); Users=@("SecurityChief-Mirage", "SecurityGuard1-Mirage", "SecurityGuard2-Mirage")},
    @{Name="IT"; Computers=@("ITServer-Mirage", "ITPC-Mirage"); Users=@("ITAdmin-Mirage", "ITSupport1-Mirage", "ITSupport2-Mirage")},
    @{Name="Croupier"; Computers=@("CroupierPC-Mirage"); Users=@("Croupier1-Mirage", "Croupier2-Mirage")}
)

# Créer les OUs, les ordinateurs et les utilisateurs
foreach ($ou in $ous) {
    $ouPath = "OU=$($ou.Name),DC=mirage,DC=com"

    try {
        New-ADOrganizationalUnit -Name $ou.Name -Path "DC=mirage,DC=com" -ProtectedFromAccidentalDeletion $false
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

New-Item -Path "C:\deployfull.txt" -ItemType File -Force | Out-Null