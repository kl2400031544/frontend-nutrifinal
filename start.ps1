# NutriGuard - Automated Startup Script for PowerShell

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " NutriGuard - Frontend Setup & Launch" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "[1/2] Installing dependencies..." -ForegroundColor Yellow
    npm install --legacy-peer-deps
    if ($LASTEXITCODE -ne 0) {
        Write-Host "`nERROR: Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "[✓] Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "[✓] Dependencies already installed" -ForegroundColor Green
}

Write-Host "`n[2/2] Starting development server...`n" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Dev Server will open at:" -ForegroundColor Cyan
Write-Host " http://localhost:5173 or http://localhost:5174" -ForegroundColor Green
Write-Host "`n Demo Credentials:" -ForegroundColor Cyan
Write-Host " - Admin: admin@nutriguard.com / Admin@123" -ForegroundColor Green
Write-Host " - User: user@nutriguard.com / User@123" -ForegroundColor Green
Write-Host "========================================`n" -ForegroundColor Cyan

# Start dev server
npm run dev

Read-Host "Press Enter to exit"
