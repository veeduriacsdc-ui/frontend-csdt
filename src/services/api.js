import axios from 'axios';

// Configuración de múltiples APIs para conexión con bases de datos
const API_CONFIGS = {
  local: {
    url: 'http://127.0.0.1:8000/api',
    name: 'Base de Datos Local',
    description: 'Servidor local Laravel'
  },
  xampp: {
    url: 'http://localhost/csdt-backend/public/api',
    name: 'Base de Datos XAMPP',
    description: 'Servidor XAMPP con Apache'
  },
  ip1: {
    url: 'http://192.168.1.100:8000/api',
    name: 'Base de Datos IP 1',
    description: 'Servidor remoto IP 192.168.1.100'
  },
  ip2: {
    url: 'http://192.168.1.101:8000/api',
    name: 'Base de Datos IP 2', 
    description: 'Servidor remoto IP 192.168.1.101'
  },
  externa: {
    url: 'https://api-csdt.externo.com/api',
    name: 'Base de Datos Externa',
    description: 'Servidor externo de producción'
  }
};

// Función para obtener la configuración de API activa
const getActiveAPIConfig = () => {
  const activeConfig = localStorage.getItem('activeAPIConfig') || 'xampp';
  return API_CONFIGS[activeConfig] || API_CONFIGS.xampp;
};

// Configuración base de la API (dinámica)
const API_BASE_URL = import.meta.env.VITE_API_URL || getActiveAPIConfig().url;

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
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
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;