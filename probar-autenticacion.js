#!/usr/bin/env node

/**
 * Script para probar el sistema de autenticación
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

// Datos de prueba únicos
const timestamp = Date.now();
const usuarioPrueba = {
  nom: 'Usuario',
  ape: 'Prueba',
  cor: `prueba${timestamp}@test.com`,
  con: 'password123',
  con_confirmation: 'password123',
  tel: `300${timestamp.toString().slice(-7)}`,
  doc: timestamp.toString(),
  tip_doc: 'cc',
  rol: 'cli'
};

async function probarRegistro() {
  console.log('🔍 Probando registro de usuario...');
  
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, usuarioPrueba);
    
    if (response.data.success) {
      console.log('✅ Registro exitoso');
      console.log('Usuario creado:', response.data.data.user);
      return true;
    } else {
      console.log('❌ Error en registro:', response.data.message);
      if (response.data.errors) {
        console.log('Errores específicos:', response.data.errors);
      }
      return false;
    }
  } catch (error) {
    console.log('❌ Error de conexión en registro:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Mensaje:', error.response.data?.message || error.response.data);
      if (error.response.data?.errors) {
        console.log('Errores de validación:', error.response.data.errors);
      }
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}

async function probarLogin() {
  console.log('🔍 Probando login...');
  
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      cor: usuarioPrueba.cor,
      con: usuarioPrueba.con
    });
    
    if (response.data.success) {
      console.log('✅ Login exitoso');
      console.log('Usuario:', response.data.data.user);
      console.log('Token:', response.data.data.token ? 'Generado' : 'No generado');
      return true;
    } else {
      console.log('❌ Error en login:', response.data.message);
      return false;
    }
  } catch (error) {
    console.log('❌ Error de conexión en login:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Mensaje:', error.response.data?.message || error.response.data);
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}

async function probarHealth() {
  console.log('🔍 Probando endpoint de salud...');
  
  try {
    const response = await axios.get(`${API_BASE_URL}/health`);
    console.log('✅ API funcionando');
    console.log('Mensaje:', response.data.message);
    console.log('Versión:', response.data.version);
    return true;
  } catch (error) {
    console.log('❌ Error en health check:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Mensaje:', error.response.data?.message || error.response.data);
    } else {
      console.log('Error:', error.message);
    }
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando pruebas de autenticación...\n');
  
  // Probar health check
  const healthOk = await probarHealth();
  console.log('');
  
  if (!healthOk) {
    console.log('❌ El servidor no está funcionando correctamente');
    return;
  }
  
  // Probar registro
  const registroOk = await probarRegistro();
  console.log('');
  
  // Probar login
  const loginOk = await probarLogin();
  console.log('');
  
  // Resumen
  console.log('📊 RESUMEN:');
  console.log('===========');
  console.log(`Health Check: ${healthOk ? '✅' : '❌'}`);
  console.log(`Registro: ${registroOk ? '✅' : '❌'}`);
  console.log(`Login: ${loginOk ? '✅' : '❌'}`);
  
  if (healthOk && registroOk && loginOk) {
    console.log('\n🎉 ¡Sistema de autenticación funcionando correctamente!');
  } else {
    console.log('\n⚠️  Hay problemas con el sistema de autenticación');
  }
}

main().catch(console.error);
