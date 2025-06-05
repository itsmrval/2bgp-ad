# Configuration rapide
$Username = "svc-backup"
$Password = "Password123!"  # Se déchiffre depuis le hash ci-dessous
$CPassword = "j1Uyj3Vx8TY9LtLZil2uAuZkFQA/4latT76ZwgdHdhw"

$GPOPath = "\\mirage.local\SYSVOL\mirage.local\Policies\{12345678-1234-1234-1234-123456789ABC}\Machine\Preferences\Groups"

# Créer le dossier
New-Item -Path $GPOPath -ItemType Directory -Force

# Créer le XML vulnérable
$XML = @"
<?xml version="1.0" encoding="utf-8"?>
<Groups clsid="{3125E937-EB16-4b4c-9934-544FC6D24D26}">
    <User clsid="{DF5F1855-51E5-4d24-8B1A-D9BDE98BA1D1}" name="$Username" image="2" changed="2024-06-05 10:30:00" uid="{B1B3B2E5-4152-4806-9D60-906E0C1D7B1E}">
        <Properties action="C" newName="" fullName="Service Account" description="Backup service account" cpassword="$CPassword" changeLogon="0" noChange="1" neverExpires="1" acctDisabled="0" userName="$Username"/>
    </User>
</Groups>
"@

# Sauvegarder
$XML | Out-File "$GPOPath\Groups.xml" -Encoding UTF8

# Permissions
icacls "$GPOPath" /grant "Everyone:(OI)(CI)R" /T
