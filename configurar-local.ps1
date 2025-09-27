# Script para configurar el frontend para desarrollo local
# CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL

Write-Host "=== CONFIGURACIÓN FRONTEND LOCAL - CSDT ===" -ForegroundColor Green
Write-Host ""

# Verificar si estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Host "❌ No se encontró package.json" -ForegroundColor Red
    Write-Host "Ejecuta este script desde el directorio frontend-csdt-final" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Directorio correcto detectado" -ForegroundColor Green

# Crear archivo .env para desarrollo local
Write-Host ""
Write-Host "🔧 Configurando archivo .env para desarrollo local..." -ForegroundColor Cyan

$envContent = @"
# Configuración del Frontend CSDT - Desarrollo Local
# Configuración para desarrollo local con XAMPP MySQL

# URL del Backend Laravel (XAMPP)
VITE_API_URL=http://localhost:8000/api

# URL de los Servicios de IA (opcional)
VITE_IA_URL=http://localhost:8001

# URL de LexisNexis AI (opcional)
VITE_LEXISNEXIS_URL=http://localhost:8002

# Configuración de la aplicación
VITE_APP_NAME="CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL"
VITE_APP_ENV=development

# Configuración de mapas (opcional)
VITE_MAPBOX_TOKEN=
VITE_LEAFLET_TILES=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png

# Configuración de IA (opcional)
VITE_OPENAI_API_KEY=
VITE_LEXISNEXIS_API_KEY=

# Especialistas de IA
VITE_IA_LEGAL_ESPECIALISTA="Dr. María Elena Rodríguez"
VITE_IA_TECNICA_ESPECIALISTA="Ing. Carlos Andrés Mendoza"
VITE_IA_INFORMATICA_ESPECIALISTA="Dr. Ana Lucía Herrera"
VITE_IA_VEEDURIA_ESPECIALISTA="Dr. Roberto Carlos Silva"

# Configuración de desarrollo
VITE_DEBUG=true
VITE_LOG_LEVEL=info

# Configuración de API (XAMPP MySQL)
VITE_API_CONFIG=xampp
"@

$envPath = ".\.env"
$envContent | Out-File -FilePath $envPath -Encoding UTF8
Write-Host "✅ Archivo .env configurado" -ForegroundColor Green

# Verificar si node_modules existe
Write-Host ""
Write-Host "🔍 Verificando dependencias..." -ForegroundColor Cyan

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencias ya instaladas" -ForegroundColor Green
}

# Verificar conexión con el backend
Write-Host ""
Write-Host "🔗 Verificando conexión con el backend..." -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000/api/publico/tipos-veeduria" -Method GET -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Backend conectado correctamente" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Backend respondió con código: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ No se pudo conectar al backend" -ForegroundColor Red
    Write-Host "Asegúrate de que el servidor Laravel esté ejecutándose:" -ForegroundColor Yellow
    Write-Host "  cd backend-csdt && php artisan serve" -ForegroundColor White
}

Write-Host ""
Write-Host "=== CONFIGURACIÓN COMPLETADA ===" -ForegroundColor Green
Write-Host ""
Write-Host "🎉 El frontend está configurado para desarrollo local" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para iniciar el servidor de desarrollo:" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para iniciar el servidor de producción:" -ForegroundColor White
Write-Host "  npm run build && npm run preview" -ForegroundColor Cyan
Write-Host ""
Write-Host "URL del frontend: http://localhost:5173" -ForegroundColor White
Write-Host "URL del backend: http://localhost:8000" -ForegroundColor White
