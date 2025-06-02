net use Z: \\bellagio.local\script /user:mgmgrand\DannyOcean P@ssw0rd

# Chemin du fichier source sur le partage Samba
$sourcePath = "Z:\111_script_smb.ps1"

# Chemin du fichier de destination local
$destinationPath = "C:\connect_smb.ps1"

# Copier le contenu du fichier depuis le partage Samba vers le fichier local
Copy-Item -Path $sourcePath -Destination $destinationPath -Force

# Exécuter le script local
& "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -ExecutionPolicy Bypass -File $destinationPath
