# Simple Frontend Startup Script
Write-Host "🎨 Starting Frontend" -ForegroundColor Green

# Check if node_modules exists
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing npm dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

# Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd frontend; npm start" -WindowStyle Hidden

Write-Host "✅ Frontend started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan















