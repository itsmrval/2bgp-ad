Import-Module Microsoft.PowerShell.LocalAccounts

# Définition des identifiants
$Username = "svc-backup"
$Password = "GPPstillStandingStrong2k18"

# Conversion du mot de passe en un objet SecureString
$SecurePassword = ConvertTo-SecureString $Password -AsPlainText -Force

# Création du compte utilisateur local
New-LocalUser -Name $Username -Password $SecurePassword -PasswordNeverExpires:$true -UserMayNotChangePassword:$true -AccountNeverExpires:$true

Add-ADGroupMember -Identity "svc-backup" -Members "Administrators"