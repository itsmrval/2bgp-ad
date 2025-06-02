Copy-Item -Path "D:\211_client_connect_smb.ps1" -Destination "C:\script_task_smb.ps1"

# Variables
$user = "mgmgrand\DannyOcean"

# Définir la tâche planifiée
$TaskName = "executer sript smb"
$TaskAction = New-ScheduledTaskAction -Execute "C:\Windows\System32\WindowsPowershell\v1.0\powershell.exe" -Argument "-ExecutionPolicy Bypass -File `"C:\script_task_smb.ps1`""

$StartTime = (Get-Date).AddMinutes(1)

$TaskTrigger = New-ScheduledTaskTrigger -Once -At $StartTime -RepetitionInterval (New-TimeSpan -Minutes 5)
$TaskSettings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd
$TaskSettings.ExecutionTimeLimit = "PT0S"
$TaskSettings.AllowStartIfOnBatteries = $true
$TaskSettings.DisallowStartIfOnBatteries = $false
$TaskSettings.RunOnlyIfNetworkAvailable = $false

# Rendre la tâche accessible sans qu'un utilisateur soit connecté
$TaskPrincipal = New-ScheduledTaskPrincipal -UserId "SYSTEM" -LogonType ServiceAccount

# Enregistrer la tâche planifiée
Register-ScheduledTask -TaskName $TaskName -Action $TaskAction -Trigger $TaskTrigger -Settings $TaskSettings -Principal $TaskPrincipal -Force
