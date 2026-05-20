param(
  [int]$Port = 4176,
  [int]$MaxOffset = 0
)

$projectRoot = Split-Path -Parent $PSScriptRoot
$stateFile = Join-Path $projectRoot ".dev-server.state.json"
$outLog = Join-Path $projectRoot "dev-server.out.log"
$errLog = Join-Path $projectRoot "dev-server.err.log"

function Get-ListenerPid([int]$candidatePort) {
  $listener = Get-NetTCPConnection -LocalPort $candidatePort -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1
  if ($listener) { return [int]$listener.OwningProcess }
  return $null
}

function Read-StateFile([string]$path) {
  if (-not (Test-Path $path)) { return $null }
  try {
    return Get-Content $path -Raw | ConvertFrom-Json
  } catch {
    return $null
  }
}

$state = Read-StateFile -path $stateFile
if ($state -and $state.pid -and $state.port) {
  $knownPort = [int]$state.port
  $knownPid = [int]$state.pid
  $listenerPid = Get-ListenerPid -candidatePort $knownPort
  if ($listenerPid -eq $knownPid -and (Get-Process -Id $knownPid -ErrorAction SilentlyContinue)) {
    Write-Output "Server already running on http://localhost:$knownPort/ (PID=$knownPid)"
    exit 0
  }
  Remove-Item $stateFile -Force -ErrorAction SilentlyContinue
}

$selectedPort = $null
for ($candidate = $Port; $candidate -le ($Port + $MaxOffset); $candidate++) {
  $listenerPid = Get-ListenerPid -candidatePort $candidate
  if (-not $listenerPid) {
    $selectedPort = $candidate
    break
  }
}

if (-not $selectedPort) {
  Write-Output "Failed to start: no free port in range $Port-$($Port + $MaxOffset)."
  exit 1
}

if (Test-Path $outLog) { Remove-Item $outLog -Force -ErrorAction SilentlyContinue }
if (Test-Path $errLog) { Remove-Item $errLog -Force -ErrorAction SilentlyContinue }

$filePath = "npm.cmd"
$args = @("run", "dev:vite", "--", "--host", "127.0.0.1", "--port", "$selectedPort")

$proc = Start-Process -FilePath $filePath `
  -ArgumentList $args `
  -WorkingDirectory $projectRoot `
  -PassThru `
  -WindowStyle Hidden `
  -RedirectStandardOutput $outLog `
  -RedirectStandardError $errLog

$readyPid = $null
for ($i = 0; $i -lt 60; $i++) {
  Start-Sleep -Milliseconds 500
  $readyPid = Get-ListenerPid -candidatePort $selectedPort
  if ($readyPid) { break }
  if (-not (Get-Process -Id $proc.Id -ErrorAction SilentlyContinue)) { break }
}

if ($readyPid) {
  $statePayload = @{
    pid = [int]$readyPid
    port = [int]$selectedPort
    url = "http://localhost:$selectedPort/"
    startedAt = (Get-Date).ToString("o")
  } | ConvertTo-Json
  Set-Content -Path $stateFile -Value $statePayload -Encoding utf8
  Write-Output "Server started: http://localhost:$selectedPort/ (PID=$readyPid)"
  exit 0
}

Write-Output "Server failed to start."
if (Test-Path $outLog) {
  Write-Output "--- dev-server.out.log ---"
  Get-Content $outLog -Tail 80
}
if (Test-Path $errLog) {
  Write-Output "--- dev-server.err.log ---"
  Get-Content $errLog -Tail 80
}
exit 1
