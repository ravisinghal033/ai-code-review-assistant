# AI Code Review Assistant - Setup Verification Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Code Review Assistant - Setup Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Python installation
Write-Host "1. Checking Python installation..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "   ✅ Python found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Python not found. Please install Python 3.11+" -ForegroundColor Red
    $allGood = $false
}

# Check Node.js installation
Write-Host "2. Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>&1
    Write-Host "   ✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ Node.js not found. Please install Node.js 16+" -ForegroundColor Red
    $allGood = $false
}

# Check npm installation
Write-Host "3. Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>&1
    Write-Host "   ✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   ❌ npm not found. Please install npm" -ForegroundColor Red
    $allGood = $false
}

# Check for required files
Write-Host "4. Checking project structure..." -ForegroundColor Yellow

$requiredFiles = @(
    "services\api-gateway\app.py",
    "services\ai-service\app.py",
    "services\analytics-service\app.py",
    "services\user-service\app.py",
    "frontend\package.json",
    "frontend\src\App.js"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   ✅ Found: $file" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Missing: $file" -ForegroundColor Red
        $allGood = $false
    }
}

# Check Python dependencies for each service
Write-Host "5. Checking Python dependencies..." -ForegroundColor Yellow

$services = @("api-gateway", "ai-service", "analytics-service", "user-service")

foreach ($service in $services) {
    Write-Host "   Checking $service..." -ForegroundColor Cyan
    $reqFile = "services\$service\requirements.txt"
    
    if (Test-Path $reqFile) {
        Write-Host "     ✅ requirements.txt found" -ForegroundColor Green
    } else {
        Write-Host "     ❌ requirements.txt missing" -ForegroundColor Red
        $allGood = $false
    }
}

# Check if frontend dependencies are installed
Write-Host "6. Checking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "frontend\node_modules") {
    Write-Host "   ✅ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  Frontend dependencies not installed" -ForegroundColor Yellow
    Write-Host "   Run: cd frontend && npm install" -ForegroundColor Cyan
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "✅ Setup verification completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "To start the application, run:" -ForegroundColor Yellow
    Write-Host "  .\start-all.ps1" -ForegroundColor White
} else {
    Write-Host "❌ Some issues were found. Please fix them before proceeding." -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan








