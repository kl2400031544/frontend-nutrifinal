@echo off
REM NutriGuard - Automated Startup Script for Windows

echo.
echo ========================================
echo  NutriGuard - Frontend Setup and Launch
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [1/2] Installing dependencies...
    call npm install --legacy-peer-deps
    if errorlevel 1 (
        echo.
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed successfully
) else (
    echo [OK] Dependencies already installed
)

echo.
echo [2/2] Starting development server...
echo.
echo ========================================
echo  Dev Server Opening At:
echo  http://localhost:5173 or http://localhost:5174
echo.
echo  Demo Credentials:
echo  - Admin: admin@nutriguard.com / Admin@123
echo  - User: user@nutriguard.com / User@123
echo ========================================
echo.

REM Start dev server
call npm run dev

pause
