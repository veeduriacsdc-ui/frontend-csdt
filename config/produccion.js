// Configuración para producción DigitalOcean
export const config = {
  // URLs del sistema
  apiUrl: 'http://134.209.221.193/api',
  backendUrl: 'http://134.209.221.193',
  frontendUrl: 'http://134.209.221.193',
  
  // Configuración de la aplicación
  appName: 'CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL',
  environment: 'production',
  version: '2.0.0',
  
  // Configuración de base de datos
  database: {
    type: 'MySQL',
    description: 'Base de datos MySQL en producción'
  },
  
  // Configuración de timeout para requests
  requestTimeout: 15000,
  
  // Configuración de paginación
  defaultPageSize: 10,
  
  // Configuración de archivos
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  
  // Configuración de desarrollo
  development: {
    enableHotReload: false,
    enableDebugMode: false,
    enableLogging: false
  }
};

export default config;
