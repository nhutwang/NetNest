@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Can Node.js de chay website. Xem README.md de dung Python hoac Live Server.
  pause
  exit /b 1
)
echo Mo dia chi localhost hien ben duoi trong trinh duyet.
node scripts\serve.mjs %*
if errorlevel 1 pause
