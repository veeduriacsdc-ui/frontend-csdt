@echo off
setlocal enabledelayedexpansion

REM ===========================================
REM SCRIPT DE INICIO DEL FRONTEND
REM CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL
REM ===========================================

REM Colores para output
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

echo %BLUE%===========================================%NC%
echo %BLUE%INICIANDO FRONTEND CSDT%NC%
echo %BLUE%===========================================%NC%

REM Navegar al directorio del frontend
cd /d "%~dp0.."

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo %YELLOW%[WARNING]%NC% node_modules no encontrado. Instalando dependencias...
    npm install
)

REM Iniciar el frontend
echo %GREEN%[INFO]%NC% Iniciando frontend en modo desarrollo...
npm run dev

pause
