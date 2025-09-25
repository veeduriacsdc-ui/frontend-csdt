const config = {
  // URL del backend en Azure
  apiUrl: process.env.REACT_APP_API_URL || 'https://csdt-backend-app.azurewebsites.net/api',
  
  // Configuración de la aplicación
  appName: 'CSDT - Consejo Social de Veeduría y Desarrollo Territorial',
  environment: process.env.NODE_ENV || 'production',
  
  // URLs de la aplicación
  backendUrl: 'https://csdt-backend-app.azurewebsites.net',
  frontendUrl: 'https://csdt-frontend-app.azurewebsites.net',
  
  // Configuración de timeout para requests
  requestTimeout: 30000,
  
  // Configuración de paginación
  defaultPageSize: 10,
  
  // Configuración de archivos
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
};

export default config;
