# Simple Backend Startup Script
Write-Host "🚀 Starting AI Code Review Backend" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    "GEMINI_API_KEY=AIzaSyAXt8xjYDfqBa3e_ZrC7j-fScBANC8Yjn4" | Out-File -FilePath ".env" -Encoding UTF8
    "JWT_SECRET=your-super-secret-jwt-key-2024" | Out-File -FilePath ".env" -Encoding UTF8 -Append
    "DATABASE_URL=sqlite:///app.db" | Out-File -FilePath ".env" -Encoding UTF8 -Append
}

# Start Backend
Write-Host "Starting Backend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd backend; python app_simple.py" -WindowStyle Hidden

Write-Host "✅ Backend started!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Health Check: http://localhost:5000/api/health" -ForegroundColor Cyan















