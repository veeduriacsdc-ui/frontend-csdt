import axios from 'axios';

// Configuración de múltiples APIs para conexión con bases de datos
const API_CONFIGS = {
  local: {
    url: 'http://localhost:8000/api',
    name: 'CSDT Backend Local',
    description: 'Servidor Laravel local del CSDT',
    timeout: 10000
  },
  xampp: {
    url: 'http://127.0.0.1:8000/api',
    name: 'CSDT Backend XAMPP',
    description: 'Servidor XAMPP con Laravel CSDT',
    timeout: 10000
  },
  produccion: {
    url: 'https://api.csdt.com.co/api',
    name: 'CSDT Backend Producción',
    description: 'Servidor de producción CSDT',
    timeout: 20000
  }
};

// Función para obtener la configuración de API activa
const getActiveAPIConfig = () => {
  const activeConfig = localStorage.getItem('activeAPIConfig') || 'local';
  return API_CONFIGS[activeConfig] || API_CONFIGS.local;
};

// Configuración base de la API (dinámica)
const activeConfig = getActiveAPIConfig();
const API_BASE_URL = import.meta.env.VITE_API_URL || activeConfig.url;

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: activeConfig.timeout,
  withCredentials: true,
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('csdt_token') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    
    if (response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('csdt_token');
      localStorage.removeItem('token');
      localStorage.removeItem('csdt_user');
      localStorage.removeItem('user');
      window.location.href = '/';
    } else if (response?.status === 403) {
      // Acceso denegado
      console.error('Acceso denegado: No tienes permisos para realizar esta acción');
    } else if (response?.status === 404) {
      // Recurso no encontrado
      console.error('Recurso no encontrado: La URL solicitada no existe');
    } else if (response?.status >= 500) {
      // Error del servidor
      console.error('Error del servidor: Problema interno del servidor');
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      console.error('Timeout: La solicitud tardó demasiado tiempo');
    } else if (error.code === 'NETWORK_ERROR') {
      // Error de red
      console.error('Error de red: No se pudo conectar al servidor');
    }
    
    return Promise.reject(error);
  }
);

// Funciones de utilidad para manejo de APIs
export const switchAPIConfig = (configName) => {
  if (API_CONFIGS[configName]) {
    localStorage.setItem('activeAPIConfig', configName);
    window.location.reload(); // Recargar para aplicar nueva configuración
  } else {
    console.error(`Configuración de API '${configName}' no encontrada`);
  }
};

export const getAvailableAPIConfigs = () => {
  return Object.keys(API_CONFIGS).map(key => ({
    key,
    ...API_CONFIGS[key]
  }));
};

export const getCurrentAPIConfig = () => {
  return activeConfig;
};

export default api;