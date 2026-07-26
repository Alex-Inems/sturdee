# Schedules the inkamototours.com health monitor ~20 times/day (every 72 minutes).
# Run once in PowerShell (as yourself; no admin required for current-user tasks):
#   powershell -ExecutionPolicy Bypass -File scripts/schedule-inkamototours-monitor.ps1

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$scriptPath = Join-Path $PSScriptRoot "monitor-inkamototours.mjs"
$taskName = "InkaMotoTours-SiteMonitor"
$node = (Get-Command node -ErrorAction SilentlyContinue)?.Source

if (-not $node) {
    Write-Error "Node.js not found on PATH. Install Node, then re-run this script."
}

if (-not (Test-Path $scriptPath)) {
    Write-Error "Monitor script not found: $scriptPath"
}

# Remove old task if present
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

$action = New-ScheduledTaskAction `
    -Execute $node `
    -Argument "`"$scriptPath`"" `
    -WorkingDirectory $repoRoot

# Start soon, then every 72 minutes indefinitely → ≥20 runs/day
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes(1) `
    -RepetitionInterval (New-TimeSpan -Minutes 72) `
    -RepetitionDuration ([TimeSpan]::MaxValue)

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -MultipleInstances IgnoreNew

Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Description "Checks https://inkamototours.com availability ~20 times per day. Logs to logs/inkamototours-monitor.jsonl" `
    | Out-Null

Write-Host "Scheduled task '$taskName' registered."
Write-Host "Interval: every 72 minutes (~20 checks/day)."
Write-Host "Log file: $repoRoot\logs\inkamototours-monitor.jsonl"
Write-Host ""
Write-Host "Test now:  node scripts/monitor-inkamototours.mjs"
Write-Host "Remove:    Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false"
