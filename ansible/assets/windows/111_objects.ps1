# Définir le nom de l'organisation
$organizationName = "Bellagio"

# Créer les OUs et les objets associés
$ous = @(
    @{Name="Management"; Computers=@("ManagementPC-Bellagio"); Users=@("Benedict", "Manager1-Bellagio", "Manager2-Bellagio")},
    @{Name="VIP"; Computers=@("VIPPC-Bellagio"); Users=@("VIPManager-Bellagio", "VIPAssistant-Bellagio")},
    @{Name="Sécurité"; Computers=@("SecurityPC-Bellagio"); Users=@("SecurityChief-Bellagio", "SecurityGuard1-Bellagio", "SecurityGuard2-Bellagio")},
    @{Name="IT"; Computers=@("ITServer-Bellagio", "ITPC-Bellagio"); Users=@("ITAdmin-Bellagio", "ITSupport1-Bellagio", "ITSupport2-Bellagio")},
    @{Name="Croupier"; Computers=@("CroupierPC-Bellagio"); Users=@("Croupier1-Bellagio", "Croupier2-Bellagio")}
)

# Créer les OUs, les ordinateurs et les utilisateurs
foreach ($ou in $ous) {
    $ouPath = "OU=$($ou.Name),DC=bellagio,DC=com"

    try {
        New-ADOrganizationalUnit -Name $ou.Name -Path "DC=bellagio,DC=com" -ProtectedFromAccidentalDeletion $false
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
