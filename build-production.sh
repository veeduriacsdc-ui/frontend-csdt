#!/bin/bash

# Script de build de producción para CSDT Frontend
echo "🏗️  Construyendo frontend para producción..."

# Copiar configuración de producción
cp env.production .env

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Construir para producción
echo "🏗️  Construyendo aplicación..."
npm run build

# Verificar que el build fue exitoso
if [ -d "dist" ]; then
    echo "✅ Build de producción completado exitosamente"
    echo "📁 Archivos generados en: ./dist"
    echo "📊 Tamaño del build:"
    du -sh dist/
else
    echo "❌ Error: El build falló"
    exit 1
fi

echo "🎉 Frontend listo para despliegue en producción"
