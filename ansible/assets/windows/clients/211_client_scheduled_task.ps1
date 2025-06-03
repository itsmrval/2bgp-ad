$Path = 'C:\script'
# Créer le dossier
New-Item -Path $Path -ItemType Directory -Force

# Configuration des permissions NTFS
icacls $Path /inheritance:r
icacls $Path /grant:r "Administrator:(OI)(CI)(F)"
icacls $Path /grant:r "mgmgrand\DannyOcean:(OI)(CI)(M)"


Copy-Item -Path "D:\211_client_connect_smb.ps1" -Destination "C:\script\script_task_smb.ps1"

# Variables
$user = "mgmgrand\DannyOcean"


$tempInfFile = "$env:TEMP\secedit_temp.inf"
# Exporter la configuration de sécurité actuelle
secedit /export /cfg $tempInfFile /areas USER_RIGHTS

$content = Get-Content $tempInfFile
# Modifier le contenu pour ajouter l'utilisateur

$newContent = $content -replace "(SeBatchLogonRight\s*=\s*)(.*)", "`$1`$2,$user" -replace ",,", ","
# Écrire le nouveau contenu dans le fichier temporaire

$newContent | Out-File $tempInfFile -Force
secedit /configure /db "$env:TEMP\secedit.sdb" /cfg $tempInfFile
Remove-Item $tempInfFile
# Définir la tâche planifiéeAdd commentMore actions


$TaskName = "exec_script_smb"
$TaskAction = New-ScheduledTaskAction -Execute "C:\Windows\System32\WindowsPowershell\v1.0\powershell.exe" -Argument "-ExecutionPolicy Bypass -File `"C:\script\script_task_smb.ps1`""
$StartTime = (Get-Date).AddMinutes(1)
$TaskTrigger = New-ScheduledTaskTrigger -Once -At $StartTime -RepetitionInterval (New-TimeSpan -Minutes 5)
$TaskSettings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd
$TaskSettings.ExecutionTimeLimit = "PT0S"
$TaskSettings.AllowStartIfOnBatteries = $true
$TaskSettings.DisallowStartIfOnBatteries = $false
$TaskSettings.RunOnlyIfNetworkAvailable = $false
$TaskSettings.RunOnlyIfNetworkAvailable = $false

Register-ScheduledTask -TaskName $TaskName -Action $TaskAction -Trigger $TaskTrigger -Settings $TaskSettings -User "DannyOcean" -Password "P@ssw0rd" -RunLevel Highest -Force
