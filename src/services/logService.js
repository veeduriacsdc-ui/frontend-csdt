import api from './api';

const logService = {
  // Obtener todos los logs
  async obtenerLogs(params = {}) {
    try {
      const response = await api.get('/logs', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo logs:', error);
      throw error;
    }
  },

  // Obtener log por ID
  async obtenerLog(id) {
    try {
      const response = await api.get(`/logs/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo log:', error);
      throw error;
    }
  }
};

export default logService;
