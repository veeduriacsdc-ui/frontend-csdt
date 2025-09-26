import api from './api';

/**
 * Servicio de autenticación simplificado
 * Usa directamente los endpoints del AuthController existente
 */
class AuthService {
  constructor() {
    this.baseUrl = '/auth';
  }

  /**
   * Iniciar sesión
   */
  async login(email, password) {
    try {
      const response = await api.post(`${this.baseUrl}/login`, {
        cor: email,
        con: password
      });

      if (response.data.success) {
        // Guardar token y datos del usuario
        localStorage.setItem('csdt_token', response.data.data.token);
        localStorage.setItem('csdt_user', JSON.stringify(response.data.data.user));
        
        return {
          success: true,
          user: response.data.data.user,
          token: response.data.data.token,
          message: response.data.message
        };
      } else {
        return {
          success: false,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      
      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || 'Error al iniciar sesión'
        };
      }
      
      return {
        success: false,
        message: 'Error de conexión. Verifica que el servidor esté funcionando.'
      };
    }
  }

  /**
   * Registrar usuario
   */
  async register(userData) {
    try {
      // Mapear datos del formulario a los campos del backend
      const datos = {
        nom: userData.nombre || userData.nom || '',
        ape: userData.apellido || userData.ape || '',
        cor: userData.email || userData.cor || '',
        con: userData.password || userData.con || userData.pass || '',
        con_confirmation: userData.confirmar_password || userData.con_confirmation || userData.pass_confirmation || '',
        tel: userData.telefono || userData.tel || '',
        doc: userData.documento || userData.doc || userData.numeroDocumento || '',
        tip_doc: userData.tipo_documento || userData.tip_doc || 'cc',
        rol: userData.rol || 'cli'
      };

      const response = await api.post(`${this.baseUrl}/register`, datos);

      if (response.data.success) {
        return {
          success: true,
          user: response.data.data.user,
          message: response.data.data.message
        };
      } else {
        return {
          success: false,
          message: response.data.message,
          errors: response.data.errors || {}
        };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      
      if (error.response?.data) {
        return {
          success: false,
          message: error.response.data.message || 'Error al registrar usuario',
          errors: error.response.data.errors || {}
        };
      }
      
      return {
        success: false,
        message: 'Error de conexión. Verifica que el servidor esté funcionando.'
      };
    }
  }

  /**
   * Cerrar sesión
   */
  async logout() {
    try {
      await api.post(`${this.baseUrl}/logout`);
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar datos locales independientemente del resultado del servidor
      localStorage.removeItem('csdt_token');
      localStorage.removeItem('csdt_user');
    }
  }

  /**
   * Obtener usuario actual
   */
  async getCurrentUser() {
    try {
      const response = await api.get(`${this.baseUrl}/me`);
      
      if (response.data.success) {
        return {
          success: true,
          user: response.data.data
        };
      } else {
        return {
          success: false,
          message: response.data.message
        };
      }
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      return {
        success: false,
        message: 'Error al obtener datos del usuario'
      };
    }
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated() {
    const token = localStorage.getItem('csdt_token');
    const user = localStorage.getItem('csdt_user');
    return !!(token && user);
  }

  /**
   * Obtener usuario del localStorage
   */
  getStoredUser() {
    try {
      const user = localStorage.getItem('csdt_user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parseando usuario:', error);
      return null;
    }
  }

  /**
   * Obtener token del localStorage
   */
  getToken() {
    return localStorage.getItem('csdt_token');
  }
}

export default new AuthService();