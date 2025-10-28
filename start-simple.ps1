# Simple AI Code Review Assistant Startup Script
Write-Host "🚀 Starting AI Code Review Assistant" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    "GEMINI_API_KEY=AIzaSyAXt8xjYDfqBa3e_ZrC7j-fScBANC8Yjn4" | Out-File -FilePath ".env" -Encoding UTF8
    "JWT_SECRET=your-super-secret-jwt-key-2024" | Out-File -FilePath ".env" -Encoding UTF8 -Append
    "DATABASE_URL=sqlite:///app.db" | Out-File -FilePath ".env" -Encoding UTF8 -Append
}

# Start API Gateway
Write-Host "Starting API Gateway..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd services\api-gateway; python app.py" -WindowStyle Hidden

# Wait 3 seconds
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd frontend; npm start" -WindowStyle Hidden

Write-Host "✅ Services started!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API: http://localhost:5000" -ForegroundColor Cyan