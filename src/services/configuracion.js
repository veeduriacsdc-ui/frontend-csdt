// Configuración del backend
const configuracion = {
  // URL base del backend Laravel
  backendUrl: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000',
  
  // Configuración de API
  api: {
    baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    timeout: 30000, // 30 segundos
    retries: 3,
    retryDelay: 1000 // 1 segundo
  },

  // Configuración de autenticación
  auth: {
    tokenKey: 'csdt_token',
    refreshTokenKey: 'csdt_refresh_token',
    userKey: 'csdt_user',
    tokenExpiryKey: 'csdt_token_expiry'
  },

  // Configuración de CORS
  cors: {
    credentials: true,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }
  },

  // Configuración de archivos
  archivos: {
    maxSize: 10 * 1024 * 1024, // 10MB
    tiposPermitidos: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'text/plain',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    rutaSubida: '/archivos/subir'
  },

  // Configuración de notificaciones
  notificaciones: {
    duracion: 5000, // 5 segundos
    posicion: 'top-right',
    maxNotificaciones: 5
  },

  // Configuración de paginación
  paginacion: {
    elementosPorPagina: 10,
    paginasVisibles: 5
  },

  // Configuración de cache
  cache: {
    duracion: 5 * 60 * 1000, // 5 minutos
    maxElementos: 100
  },

  // Configuración de logging
  logging: {
    nivel: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    habilitado: true
  },

  // Configuración de desarrollo
  desarrollo: {
    modoDebug: process.env.NODE_ENV !== 'production',
    mostrarErrores: process.env.NODE_ENV !== 'production',
    validarFormularios: true
  }
};

// Funciones de utilidad
export const utilidades = {
  // Obtener URL completa de API
  obtenerUrlApi: (endpoint) => {
    const baseUrl = configuracion.api.baseUrl.endsWith('/') 
      ? configuracion.api.baseUrl.slice(0, -1) 
      : configuracion.api.baseUrl;
    const endpointLimpio = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${endpointLimpio}`;
  },

  // Obtener headers de autenticación
  obtenerHeadersAuth: () => {
    const token = localStorage.getItem(configuracion.auth.tokenKey);
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  // Verificar si el token está expirado
  verificarTokenExpirado: () => {
    const tokenExpiry = localStorage.getItem(configuracion.auth.tokenExpiryKey);
    if (!tokenExpiry) return true;
    
    const ahora = new Date().getTime();
    const expiracion = new Date(tokenExpiry).getTime();
    return ahora >= expiracion;
  },

  // Guardar datos de autenticación
  guardarAuth: (token, refreshToken, user, expiry) => {
    localStorage.setItem(configuracion.auth.tokenKey, token);
    if (refreshToken) {
      localStorage.setItem(configuracion.auth.refreshTokenKey, refreshToken);
    }
    if (user) {
      localStorage.setItem(configuracion.auth.userKey, JSON.stringify(user));
    }
    if (expiry) {
      localStorage.setItem(configuracion.auth.tokenExpiryKey, expiry);
    }
  },

  // Limpiar datos de autenticación
  limpiarAuth: () => {
    localStorage.removeItem(configuracion.auth.tokenKey);
    localStorage.removeItem(configuracion.auth.refreshTokenKey);
    localStorage.removeItem(configuracion.auth.userKey);
    localStorage.removeItem(configuracion.auth.tokenExpiryKey);
  },

  // Obtener usuario actual
  obtenerUsuarioActual: () => {
    const userStr = localStorage.getItem(configuracion.auth.userKey);
    return userStr ? JSON.parse(userStr) : null;
  },

  // Verificar si el usuario está autenticado
  estaAutenticado: () => {
    const token = localStorage.getItem(configuracion.auth.tokenKey);
    return token && !utilidades.verificarTokenExpirado();
  },

  // Formatear errores de API
  formatearError: (error) => {
    if (error.response) {
      // Error de respuesta del servidor
      const { status, data } = error.response;
      return {
        codigo: status,
        mensaje: data.message || data.error || 'Error del servidor',
        detalles: data.errors || data.details || null,
        tipo: 'servidor'
      };
    } else if (error.request) {
      // Error de red
      return {
        codigo: 0,
        mensaje: 'Error de conexión. Verifica tu conexión a internet.',
        detalles: null,
        tipo: 'red'
      };
    } else {
      // Error de configuración
      return {
        codigo: -1,
        mensaje: error.message || 'Error desconocido',
        detalles: null,
        tipo: 'configuracion'
      };
    }
  },

  // Log de errores
  logError: (error, contexto = '') => {
    if (configuracion.logging.habilitado) {
      console.error(`[CSDT Error] ${contexto}:`, error);
    }
  },

  // Log de información
  logInfo: (mensaje, datos = null) => {
    if (configuracion.logging.habilitado && configuracion.logging.nivel !== 'error') {
      console.log(`[CSDT Info] ${mensaje}`, datos);
    }
  }
};

export default configuracion;