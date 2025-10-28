# AI Code Review Assistant - Startup Script
Write-Host "🚀 Starting AI Code Review Assistant" -ForegroundColor Green
Write-Host ""

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    "GEMINI_API_KEY=AIzaSyAXt8xjYDfqBa3e_ZrC7j-fScBANC8Yjn4" | Out-File -FilePath ".env" -Encoding UTF8
    "JWT_SECRET=your-super-secret-jwt-key-2024" | Out-File -FilePath ".env" -Encoding UTF8 -Append
    "DATABASE_URL=sqlite:///app.db" | Out-File -FilePath ".env" -Encoding UTF8 -Append
    Write-Host "✅ .env file created" -ForegroundColor Green
}

# Change to the project directory
Set-Location $PSScriptRoot

# Start AI Service (Port 5001)
Write-Host "Starting AI Service on port 5001..." -ForegroundColor Cyan
$aiServicePath = Join-Path $PSScriptRoot "services\ai-service"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$aiServicePath'; python app.py"
Start-Sleep -Seconds 2

# Start Analytics Service (Port 5002)
Write-Host "Starting Analytics Service on port 5002..." -ForegroundColor Cyan
$analyticsServicePath = Join-Path $PSScriptRoot "services\analytics-service"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$analyticsServicePath'; python app.py"
Start-Sleep -Seconds 2

# Start User Service (Port 5003)
Write-Host "Starting User Service on port 5003..." -ForegroundColor Cyan
$userServicePath = Join-Path $PSScriptRoot "services\user-service"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$userServicePath'; python app.py"
Start-Sleep -Seconds 2

# Start API Gateway (Port 5000)
Write-Host "Starting API Gateway on port 5000..." -ForegroundColor Cyan
$apiGatewayPath = Join-Path $PSScriptRoot "services\api-gateway"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$apiGatewayPath'; python app.py"
Start-Sleep -Seconds 3

# Start Frontend (Port 3000)
Write-Host "Starting Frontend on port 3000..." -ForegroundColor Cyan
$frontendPath = Join-Path $PSScriptRoot "frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm start"

Write-Host ""
Write-Host "✅ All services are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Services:" -ForegroundColor Yellow
Write-Host "  - Frontend:     http://localhost:3000" -ForegroundColor White
Write-Host "  - API Gateway:  http://localhost:5000" -ForegroundColor White
Write-Host "  - AI Service:   http://localhost:5001" -ForegroundColor White
Write-Host "  - Analytics:    http://localhost:5002" -ForegroundColor White
Write-Host "  - User Service: http://localhost:5003" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C in any window to stop that service" -ForegroundColor Yellow
Write-Host "Or run .\stop-services.ps1 to stop all services" -ForegroundColor Yellow
