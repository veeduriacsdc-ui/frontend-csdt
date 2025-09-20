@echo off
setlocal enabledelayedexpansion

REM ===========================================
REM SCRIPT DE VERIFICACIÓN DEL FRONTEND
REM CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL
REM ===========================================

REM Colores para output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

echo %BLUE%===========================================%NC%
echo %BLUE%VERIFICANDO FRONTEND CSDT%NC%
echo %BLUE%===========================================%NC%

REM Navegar al directorio del frontend
cd /d "%~dp0.."

REM Verificar Node.js
echo %GREEN%[INFO]%NC% Verificando Node.js...
node --version
if %errorLevel% neq 0 (
    echo %RED%[ERROR]%NC% ❌ Node.js no está instalado
    pause
    exit /b 1
)

REM Verificar NPM
echo %GREEN%[INFO]%NC% Verificando NPM...
npm --version
if %errorLevel% neq 0 (
    echo %RED%[ERROR]%NC% ❌ NPM no está instalado
    pause
    exit /b 1
)

REM Verificar package.json
if not exist "package.json" (
    echo %RED%[ERROR]%NC% ❌ package.json no encontrado
    pause
    exit /b 1
)

REM Verificar node_modules
if not exist "node_modules" (
    echo %YELLOW%[WARNING]%NC% ⚠️ node_modules no encontrado
    echo %GREEN%[INFO]%NC% Ejecutando npm install...
    npm install
)

REM Verificar dependencias
echo %GREEN%[INFO]%NC% Verificando dependencias...
npm list --depth=0

REM Verificar archivos de configuración
if exist "vite.config.js" (
    echo %GREEN%[SUCCESS]%NC% ✅ vite.config.js encontrado
) else (
    echo %YELLOW%[WARNING]%NC% ⚠️ vite.config.js no encontrado
)

if exist "ecosystem-frontend.config.js" (
    echo %GREEN%[SUCCESS]%NC% ✅ ecosystem-frontend.config.js encontrado
) else (
    echo %YELLOW%[WARNING]%NC% ⚠️ ecosystem-frontend.config.js no encontrado
)

REM Verificar conectividad
echo %GREEN%[INFO]%NC% Verificando conectividad...
curl -I http://localhost:3000 2>nul && echo %GREEN%[SUCCESS]%NC% ✅ Frontend respondiendo en http://localhost:3000 || echo %YELLOW%[WARNING]%NC% ⚠️ Frontend no responde

echo %BLUE%===========================================%NC%
echo %BLUE%VERIFICACIÓN COMPLETADA%NC%
echo %BLUE%===========================================%NC%

pause
