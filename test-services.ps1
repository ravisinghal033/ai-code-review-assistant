# Test script to verify microservices are working
Write-Host "Testing AI Code Review Assistant - Microservices" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green

# Test API Gateway health
Write-Host "Testing API Gateway..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/gateway/health" -Method GET
    Write-Host "✅ API Gateway is running" -ForegroundColor Green
    Write-Host "Services status:" -ForegroundColor Cyan
    $response.services | ForEach-Object {
        $serviceName = $_.PSObject.Properties.Name
        $service = $_.$serviceName
        $status = if ($service.healthy) { "✅ Healthy" } else { "❌ Unhealthy" }
        Write-Host "  $serviceName : $status" -ForegroundColor White
    }
} catch {
    Write-Host "❌ API Gateway is not responding" -ForegroundColor Red
}

# Test demo review endpoint
Write-Host "`nTesting Demo Review Endpoint..." -ForegroundColor Yellow
try {
    $body = @{
        code = "def hello():`n    print('Hello World')"
        language = "python"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/review" -Method POST -Body $body -ContentType "application/json"
    Write-Host "✅ Demo review endpoint is working" -ForegroundColor Green
    Write-Host "Demo analysis score: $($response.analysis.score)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Demo review endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test demo history endpoint
Write-Host "`nTesting Demo History Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/history" -Method GET
    Write-Host "✅ Demo history endpoint is working" -ForegroundColor Green
    Write-Host "Demo history entries: $($response.Count)" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Demo history endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎉 Testing complete!" -ForegroundColor Green
Write-Host "Frontend should be available at: http://localhost:3000" -ForegroundColor Cyan







