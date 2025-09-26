/**
 * Servicio de conexión mejorado para el sistema CSDT
 * Maneja la conexión entre frontend y backend con diferentes configuraciones
 */

import api from './api';
import { getCurrentAPIConfig } from './api';

class ConnectionService {
  constructor() {
    this.config = getCurrentAPIConfig();
    this.isConnected = false;
    this.lastHealthCheck = null;
    this.retryAttempts = 0;
    this.maxRetries = 3;
  }

  /**
   * Verificar conexión con el backend
   */
  async checkConnection() {
    try {
      const response = await api.get('/health');
      
      if (response.status === 200) {
        this.isConnected = true;
        this.lastHealthCheck = new Date();
        this.retryAttempts = 0;
        return {
          success: true,
          data: response.data,
          config: this.config
        };
      } else {
        throw new Error(`Backend respondió con código: ${response.status}`);
      }
    } catch (error) {
      this.isConnected = false;
      this.retryAttempts++;
      
      console.error('❌ Error de conexión con backend:', error.message);
      
      return {
        success: false,
        error: error.message,
        config: this.config,
        retryAttempts: this.retryAttempts
      };
    }
  }

  /**
   * Probar conexión con reintentos
   */
  async testConnectionWithRetry() {
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      const result = await this.checkConnection();
      
      if (result.success) {
        return result;
      }
      
      if (attempt < this.maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    return {
      success: false,
      error: 'No se pudo establecer conexión después de múltiples intentos',
      config: this.config,
      retryAttempts: this.retryAttempts
    };
  }

  /**
   * Obtener estado de la conexión
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      lastHealthCheck: this.lastHealthCheck,
      retryAttempts: this.retryAttempts,
      config: this.config,
      maxRetries: this.maxRetries
    };
  }

  /**
   * Probar todos los endpoints principales
   */
  async testAllEndpoints() {
    const endpoints = [
      { name: 'Health Check', url: '/health', method: 'GET' },
      { name: 'Tipos de Documento', url: '/publico/tipos-documento', method: 'GET' },
      { name: 'Tipos de Veeduría', url: '/publico/tipos-veeduria', method: 'GET' },
      { name: 'Estados de Veeduría', url: '/publico/estados-veeduria', method: 'GET' }
    ];

    const results = [];

    for (const endpoint of endpoints) {
      try {
        const response = await api({
          method: endpoint.method,
          url: endpoint.url,
          timeout: 5000
        });

        results.push({
          name: endpoint.name,
          success: true,
          status: response.status,
          data: response.data
        });
      } catch (error) {
        results.push({
          name: endpoint.name,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Probar registro de usuario
   */
  async testUserRegistration() {
    const testUser = {
      nom: 'Test',
      ape: 'Conexion',
      cor: `test.conexion.${Date.now()}@example.com`,
      con: 'password123',
      con_confirmation: 'password123',
      doc: `${Date.now()}`,
      tip_doc: 'cc',
      rol: 'cli'
    };

    try {
      const response = await api.post('/auth/register', testUser);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('❌ Error en registro de usuario:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Probar login de usuario
   */
  async testUserLogin(email, password) {
    try {
      const response = await api.post('/auth/login', {
        cor: email,
        con: password
      });
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('❌ Error en login:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data || error.message
      };
    }
  }

  /**
   * Diagnóstico completo del sistema
   */
  async runFullDiagnostic() {
    const diagnostic = {
      timestamp: new Date(),
      config: this.config,
      connection: null,
      endpoints: null,
      registration: null,
      login: null
    };

    // 1. Verificar conexión básica
    diagnostic.connection = await this.checkConnection();

    if (!diagnostic.connection.success) {
      return diagnostic;
    }

    // 2. Probar endpoints
    diagnostic.endpoints = await this.testAllEndpoints();

    // 3. Probar registro
    diagnostic.registration = await this.testUserRegistration();

    // 4. Probar login (si el registro fue exitoso)
    if (diagnostic.registration.success) {
      const testEmail = diagnostic.registration.data.data.user.cor;
      diagnostic.login = await this.testUserLogin(testEmail, 'password123');
    }
    return diagnostic;
  }
}

// Crear instancia única del servicio
const connectionService = new ConnectionService();

export default connectionService;
