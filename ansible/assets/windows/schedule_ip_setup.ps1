$scriptPath = "C:\deploy_script\ip_setup.ps1"

$destinationDir = "C:\deploy_script"
if (!(Test-Path -Path $destinationDir)) {
    New-Item -Path $destinationDir -ItemType Directory -Force
}

Copy-Item -Path "D:\ip_setup.ps1" -Destination $scriptPath -Force

$TaskName = "ExecuteSetupIPAtStartup"
$TaskAction = New-ScheduledTaskAction -Execute "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -Argument "-ExecutionPolicy Bypass -File `"$scriptPath`""
$TaskTrigger = New-ScheduledTaskTrigger -AtStartup

$TaskTrigger.Delay = "PT1M"
$TaskSettings = New-ScheduledTaskSettingsSet -StartWhenAvailable -DontStopOnIdleEnd
$TaskSettings.ExecutionTimeLimit = "PT0S"
$TaskSettings.AllowStartIfOnBatteries = $true
$TaskSettings.DisallowStartIfOnBatteries = $false
$TaskSettings.RunOnlyIfNetworkAvailable = $false

Register-ScheduledTask -TaskName $TaskName -Action $TaskAction -Trigger $TaskTrigger -Settings $TaskSettings -User "SYSTEM" -RunLevel Highest -Force