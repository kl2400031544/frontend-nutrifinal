#!/bin/bash

# NutriGuard - Automated Startup Script for Mac/Linux

echo ""
echo "========================================"
echo " NutriGuard - Frontend Setup & Launch"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[1/2] Installing dependencies..."
    npm install --legacy-peer-deps
    if [ $? -ne 0 ]; then
        echo ""
        echo "ERROR: Failed to install dependencies"
        exit 1
    fi
    echo "[✓] Dependencies installed successfully"
else
    echo "[✓] Dependencies already installed"
fi

echo ""
echo "[2/2] Starting development server..."
echo ""
echo "========================================"
echo " Dev Server will open at:"
echo " http://localhost:5173 or http://localhost:5174"
echo ""
echo " Demo Credentials:"
echo " - Admin: admin@nutriguard.com / Admin@123"
echo " - User: user@nutriguard.com / User@123"
echo "========================================"
echo ""

# Start dev server
npm run dev
