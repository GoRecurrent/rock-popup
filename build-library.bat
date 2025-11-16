@echo off
REM ============================================================================
REM Rock Academy Popup - Library Build Script (Windows)
REM
REM This script builds the self-hosted library bundle of the popup.
REM Output files will be in the dist\ folder.
REM ============================================================================

setlocal enabledelayedexpansion

echo =========================================
echo Rock Academy Popup - Library Builder
echo =========================================
echo.

REM Check if node is installed
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed
    echo Please install Node.js 18+ from https://nodejs.org
    exit /b 1
)

REM Get Node version
for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo Node.js version: %NODE_VERSION%
echo.

REM Check if npm is installed
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed
    exit /b 1
)

REM Get npm version
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo npm version: %NPM_VERSION%
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Error: npm install failed
        exit /b 1
    )
    echo.
)

REM Clean previous build
if exist "dist\" (
    echo Cleaning previous build...
    rmdir /s /q dist
    echo.
)

REM Build the library
echo Building library bundle...
echo Build mode: library
echo.

set BUILD_MODE=library
call npm run build
if %errorlevel% neq 0 (
    echo.
    echo Build failed
    exit /b 1
)

REM Check if build was successful
if not exist "dist\" (
    echo.
    echo Build failed - dist folder not created
    exit /b 1
)

echo.
echo =========================================
echo Build Complete!
echo =========================================
echo.
echo Output files in dist\ folder:
echo.

if exist "dist\rock-popup.umd.js" (
    for %%A in ("dist\rock-popup.umd.js") do (
        set SIZE=%%~zA
        set /a SIZE_KB=!SIZE! / 1024
        echo   rock-popup.umd.js ^(!SIZE_KB! KB^)
    )
)

if exist "dist\rock-popup.es.js" (
    for %%A in ("dist\rock-popup.es.js") do (
        set SIZE=%%~zA
        set /a SIZE_KB=!SIZE! / 1024
        echo   rock-popup.es.js ^(!SIZE_KB! KB^)
    )
)

if exist "dist\rock-popup.css" (
    for %%A in ("dist\rock-popup.css") do (
        set SIZE=%%~zA
        set /a SIZE_KB=!SIZE! / 1024
        echo   rock-popup.css ^(!SIZE_KB! KB^)
    )
)

echo.
echo =========================================
echo Next Steps:
echo =========================================
echo.
echo 1. Upload these 3 files to your web server:
echo    - dist\rock-popup.umd.js
echo    - dist\rock-popup.es.js ^(optional^)
echo    - dist\rock-popup.css
echo.
echo 2. See SELF_HOSTING_GUIDE.md for integration instructions
echo.
echo 3. See examples\ folder for integration code:
echo    - examples\gtm-integration.html
echo    - examples\direct-html-integration.html
echo    - examples\dynamic-loading.html
echo.
echo =========================================

endlocal
