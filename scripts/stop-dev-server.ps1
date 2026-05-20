param(
  [int]$Port = 0
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$stateFile = Join-Path $projectRoot ".dev-server.state.json"

function Get-ListenerPid([int]$candidatePort) {
  $listener = Get-NetTCPConnection -LocalPort $candidatePort -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($listener) { return [int]$listener.OwningProcess }
  return $null
}

if (-not (Test-Path $stateFile)) {
  Write-Output "Server state not found. Nothing to stop for this project."
  exit 0
}

$state = $null
try {
  $state = Get-Content $stateFile -Raw | ConvertFrom-Json
} catch {
  Remove-Item $stateFile -Force -ErrorAction SilentlyContinue
  Write-Output "Server state was invalid and has been reset."
  exit 0
}

$targetPort = if ($Port -gt 0) { $Port } elseif ($state.port) { [int]$state.port } else { $null }
$targetPid = if ($state.pid) { [int]$state.pid } else { $null }
$stopped = $false

if ($targetPid -and (Get-Process -Id $targetPid -ErrorAction SilentlyContinue)) {
  if ($targetPort) {
    $listenerPid = Get-ListenerPid -candidatePort $targetPort
    if ($listenerPid -eq $targetPid) {
      Stop-Process -Id $targetPid -Force -ErrorAction SilentlyContinue
      Write-Output "Stopped PID=$targetPid on port $targetPort."
      $stopped = $true
    } else {
      Write-Output "Tracked PID=$targetPid is not listening on port $targetPort. Process not killed for safety."
    }
  } else {
    Stop-Process -Id $targetPid -Force -ErrorAction SilentlyContinue
    Write-Output "Stopped PID=$targetPid."
    $stopped = $true
  }
}

if ($targetPort) {
  Start-Sleep -Seconds 1
  $stillListening = Get-ListenerPid -candidatePort $targetPort
  if ($stillListening -and $stillListening -ne $targetPid) {
    Write-Output "Port $targetPort is in use by another process (PID=$stillListening)."
  }
}

Remove-Item $stateFile -Force -ErrorAction SilentlyContinue

if (-not $stopped) {
  Write-Output "Server for this project was not running."
  exit 0
}

Write-Output "Server stopped."
