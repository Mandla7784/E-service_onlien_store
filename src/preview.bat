@echo off
echo Installing dependencies...
call npm install
echo.
echo Starting server on http://localhost:8000
echo.
node server.js
pause
