@echo off
echo Installing dependencies...
call npm install
echo.

echo.
node server.js
pause
