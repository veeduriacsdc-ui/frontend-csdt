@echo off
setlocal enabledelayedexpansion

REM ===========================================
REM SCRIPT DE COMPILACIÓN DEL FRONTEND
REM CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL
REM ===========================================

REM Colores para output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

echo %BLUE%===========================================%NC%
echo %BLUE%COMPILANDO FRONTEND CSDT%NC%
echo %BLUE%===========================================%NC%

REM Navegar al directorio del frontend
cd /d "%~dp0.."

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo %YELLOW%[WARNING]%NC% node_modules no encontrado. Instalando dependencias...
    npm install
)

REM Limpiar compilación anterior
if exist "dist" (
    echo %GREEN%[INFO]%NC% Limpiando compilación anterior...
    rmdir /s /q "dist"
)

REM Compilar el frontend
echo %GREEN%[INFO]%NC% Compilando frontend para producción...
npm run build

if %errorLevel% equ 0 (
    echo %GREEN%[SUCCESS]%NC% ✅ Frontend compilado exitosamente
    echo %GREEN%[INFO]%NC% Archivos de compilación en: dist\
) else (
    echo %RED%[ERROR]%NC% ❌ Error en la compilación
    pause
    exit /b 1
)

pause
