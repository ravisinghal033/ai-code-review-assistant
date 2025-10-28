# AI Code Review Assistant - Windows PowerShell Stop Script
# This script stops all running microservices

Write-Host "🛑 Stopping AI Code Review Assistant Services" -ForegroundColor Red
Write-Host "=============================================" -ForegroundColor Red

# Function to stop service by port
function Stop-ServiceByPort {
    param([int]$Port)
    
    $processes = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue
    if ($processes) {
        foreach ($process in $processes) {
            $pid = $process.OwningProcess
            if ($pid) {
                Write-Host "🔄 Stopping process on port $Port (PID: $pid)..." -ForegroundColor Yellow
                Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            }
        }
    }
}

# Stop all services
Write-Host ""
Write-Host "🔧 Stopping Microservices..." -ForegroundColor Yellow

# Stop services by port
Stop-ServiceByPort 5000  # API Gateway
Stop-ServiceByPort 5001  # AI Service
Stop-ServiceByPort 5002  # Analytics Service
Stop-ServiceByPort 5003  # User Service
Stop-ServiceByPort 3000  # Frontend

Write-Host ""
Write-Host "🧹 Cleaning up any remaining processes..." -ForegroundColor Yellow

# Kill any remaining Python processes
$pythonProcesses = Get-Process python -ErrorAction SilentlyContinue
if ($pythonProcesses) {
    Write-Host "   Killing remaining Python processes..." -ForegroundColor Cyan
    $pythonProcesses | Stop-Process -Force
}

# Kill any remaining Node processes
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "   Killing remaining Node processes..." -ForegroundColor Cyan
    $nodeProcesses | Stop-Process -Force
}

Write-Host ""
Write-Host "✅ All services stopped successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "💡 To start services again, run: .\start-services.ps1" -ForegroundColor Yellow







