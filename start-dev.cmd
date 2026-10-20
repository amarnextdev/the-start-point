@echo off
title English Classes - dev server
cd /d "%~dp0"
echo Node version:
node -v
if not exist node_modules (
  echo Installing packages, this can take a few minutes...
  call npm install
  if errorlevel 1 (
    echo.
    echo npm install failed. Copy the error above and send it to Claude.
    pause
    exit /b 1
  )
)
if not exist .env.local copy .env.example .env.local >nul
echo Starting dev server on http://localhost:3000 ...
call npm run dev
pause
