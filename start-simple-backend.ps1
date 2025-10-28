# Simple startup script for the simplified backend
Write-Host "Starting Simplified AI Code Review Assistant..." -ForegroundColor Green

# Check if .env exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    @"
GEMINI_API_KEY=AIzaSyAXt8xjYDfqBa3e_ZrC7j-fScBANC8Yjn4
JWT_SECRET=your-super-secret-jwt-key-change-in-production
"@ | Out-File -FilePath "backend\.env" -Encoding UTF8
}

# Start backend
Write-Host "Starting backend..." -ForegroundColor Yellow
Push-Location backend
& ".\venv\Scripts\Activate.ps1"
python app.py







