# AI Code Review Assistant - Dependency Installation Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Code Review Assistant - Installing Dependencies" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Install backend dependencies for each service
$services = @("api-gateway", "ai-service", "analytics-service", "user-service")

foreach ($service in $services) {
    Write-Host "📦 Installing dependencies for $service..." -ForegroundColor Yellow
    Set-Location "services\$service"
    
    # Check if virtual environment exists, if not create one
    if (-not (Test-Path "venv")) {
        Write-Host "   Creating virtual environment..." -ForegroundColor Cyan
        python -m venv venv
    }
    
    # Install dependencies
    Write-Host "   Installing Python packages..." -ForegroundColor Cyan
    .\venv\Scripts\Activate.ps1
    python -m pip install --upgrade pip
    pip install -r requirements.txt
    deactivate
    
    Set-Location ..\..
    Write-Host "   ✅ $service dependencies installed" -ForegroundColor Green
    Write-Host ""
}

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend

if (Test-Path "node_modules") {
    Write-Host "   Node modules already exist. Updating..." -ForegroundColor Cyan
    npm update
} else {
    Write-Host "   Installing node modules..." -ForegroundColor Cyan
    npm install
}

Set-Location ..
Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ All dependencies installed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run: .\verify-setup.ps1 (to verify everything)" -ForegroundColor White
Write-Host "  2. Run: .\start-all.ps1 (to start all services)" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan








