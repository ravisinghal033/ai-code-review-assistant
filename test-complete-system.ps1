# AI Code Review Assistant - Complete System Test
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "AI Code Review Assistant - System Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allPassed = $true

# Wait for services to be ready
Write-Host "⏳ Waiting for services to initialize (15 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Test health endpoints
Write-Host ""
Write-Host "Testing Service Health Endpoints..." -ForegroundColor Yellow
Write-Host ""

$services = @(
    @{Name="API Gateway"; URL="http://localhost:5000/api/health"},
    @{Name="AI Service"; URL="http://localhost:5001/api/health"},
    @{Name="Analytics Service"; URL="http://localhost:5002/api/health"},
    @{Name="User Service"; URL="http://localhost:5003/api/health"},
    @{Name="Frontend"; URL="http://localhost:3000"}
)

foreach ($service in $services) {
    try {
        $response = Invoke-WebRequest -Uri $service.URL -TimeoutSec 5 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ $($service.Name) - HEALTHY" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $($service.Name) - UNHEALTHY (Status: $($response.StatusCode))" -ForegroundColor Red
            $allPassed = $false
        }
    } catch {
        Write-Host "  ❌ $($service.Name) - NOT RESPONDING" -ForegroundColor Red
        $allPassed = $false
    }
}

# Test API Gateway endpoints
Write-Host ""
Write-Host "Testing API Gateway Endpoints..." -ForegroundColor Yellow
Write-Host ""

$endpoints = @(
    @{Name="Gateway Services"; URL="http://localhost:5000/api/gateway/services"},
    @{Name="Gateway Health"; URL="http://localhost:5000/api/gateway/health"},
    @{Name="Gateway Metrics"; URL="http://localhost:5000/api/gateway/metrics"},
    @{Name="Review History"; URL="http://localhost:5000/api/history"}
)

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri $endpoint.URL -TimeoutSec 5 -UseBasicParsing
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✅ $($endpoint.Name) - OK" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $($endpoint.Name) - FAILED" -ForegroundColor Red
            $allPassed = $false
        }
    } catch {
        Write-Host "  ❌ $($endpoint.Name) - ERROR: $($_.Exception.Message)" -ForegroundColor Red
        $allPassed = $false
    }
}

# Test code review functionality
Write-Host ""
Write-Host "Testing Code Review Functionality..." -ForegroundColor Yellow
Write-Host ""

try {
    $sampleCode = @"
def hello_world():
    print('Hello, World!')
    return True

if __name__ == '__main__':
    hello_world()
"@

    $body = @{
        code = $sampleCode
        language = "python"
        filename = "test.py"
    } | ConvertTo-Json

    $headers = @{
        "Content-Type" = "application/json"
    }

    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/review" `
        -Method POST `
        -Body $body `
        -Headers $headers `
        -TimeoutSec 30 `
        -UseBasicParsing

    if ($response.StatusCode -eq 200) {
        $result = $response.Content | ConvertFrom-Json
        if ($result.analysis -and $result.suggestions) {
            Write-Host "  ✅ Code Review - WORKING" -ForegroundColor Green
            Write-Host "     Score: $($result.analysis.score)" -ForegroundColor Cyan
            Write-Host "     Suggestions: $($result.suggestions.Count)" -ForegroundColor Cyan
        } else {
            Write-Host "  ⚠️  Code Review - PARTIAL (Missing data)" -ForegroundColor Yellow
        }
    } else {
        Write-Host "  ❌ Code Review - FAILED" -ForegroundColor Red
        $allPassed = $false
    }
} catch {
    Write-Host "  ❌ Code Review - ERROR: $($_.Exception.Message)" -ForegroundColor Red
    $allPassed = $false
}

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($allPassed) {
    Write-Host "✅ ALL TESTS PASSED!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your application is fully functional!" -ForegroundColor White
    Write-Host "Access it at: http://localhost:3000" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  SOME TESTS FAILED" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please check the service logs for errors" -ForegroundColor White
    Write-Host "Try restarting services with: .\start-all.ps1" -ForegroundColor Cyan
}
Write-Host "========================================" -ForegroundColor Cyan








