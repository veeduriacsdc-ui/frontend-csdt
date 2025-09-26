#!/usr/bin/env node

/**
 * Script para verificar la configuración del servidor backend
 * Ejecutar con: node verificar-servidor.js
 */

import axios from 'axios';

const configuraciones = [
  {
    nombre: 'Local (puerto 8000)',
    url: 'http://localhost:8000/api/health',
    timeout: 5000
  },
  {
    nombre: 'XAMPP (puerto 8000)',
    url: 'http://127.0.0.1:8000/api/health',
    timeout: 5000
  },
  {
    nombre: 'Puerto alternativo (8001)',
    url: 'http://localhost:8001/api/health',
    timeout: 5000
  },
  {
    nombre: 'Puerto alternativo (3000)',
    url: 'http://localhost:3000/api/health',
    timeout: 5000
  }
];

async function verificarServidor(config) {
  try {
    console.log(`\n🔍 Verificando ${config.nombre}...`);
    console.log(`   URL: ${config.url}`);
    
    const response = await axios.get(config.url, {
      timeout: config.timeout,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`   ✅ CONECTADO`);
    console.log(`   Status: ${response.status}`);
    console.log(`   Tiempo: ${response.headers['x-response-time'] || 'N/A'}`);
    
    if (response.data) {
      console.log(`   Datos:`, JSON.stringify(response.data, null, 2));
    }
    
    return { config, success: true, response };
    
  } catch (error) {
    console.log(`   ❌ ERROR`);
    console.log(`   Mensaje: ${error.message}`);
    
    if (error.response) {
      console.log(`   Status: ${error.response.status}`);
      console.log(`   Datos:`, error.response.data);
    } else if (error.code) {
      console.log(`   Código: ${error.code}`);
    }
    
    return { config, success: false, error };
  }
}

async function verificarTodos() {
  console.log('🚀 Verificando configuraciones del servidor backend...\n');
  
  const resultados = [];
  
  for (const config of configuraciones) {
    const resultado = await verificarServidor(config);
    resultados.push(resultado);
  }
  
  console.log('\n📊 RESUMEN:');
  console.log('===========');
  
  const exitosos = resultados.filter(r => r.success);
  const fallidos = resultados.filter(r => !r.success);
  
  if (exitosos.length > 0) {
    console.log(`\n✅ Servidores conectados (${exitosos.length}):`);
    exitosos.forEach(r => {
      console.log(`   - ${r.config.nombre}: ${r.config.url}`);
    });
  }
  
  if (fallidos.length > 0) {
    console.log(`\n❌ Servidores no disponibles (${fallidos.length}):`);
    fallidos.forEach(r => {
      console.log(`   - ${r.config.nombre}: ${r.config.url}`);
    });
  }
  
  if (exitosos.length === 0) {
    console.log('\n⚠️  NINGÚN SERVIDOR DISPONIBLE');
    console.log('\nPosibles soluciones:');
    console.log('1. Verificar que el servidor Laravel esté ejecutándose');
    console.log('2. Ejecutar: php artisan serve --port=8000');
    console.log('3. Verificar que el puerto 8000 esté disponible');
    console.log('4. Revisar la configuración de CORS en el backend');
    console.log('5. Verificar que las rutas API estén configuradas correctamente');
  } else {
    console.log('\n🎉 ¡Al menos un servidor está funcionando!');
    console.log('Puedes usar cualquiera de los servidores conectados.');
  }
}

// Ejecutar verificación
verificarTodos().catch(console.error);
