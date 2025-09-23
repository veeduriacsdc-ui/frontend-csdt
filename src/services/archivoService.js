import api from './api';

const archivoService = {
  // Obtener todos los archivos
  async obtenerArchivos(params = {}) {
    try {
      const response = await api.get('/archivos', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo archivos:', error);
      throw error;
    }
  },

  // Obtener archivo por ID
  async obtenerArchivo(id) {
    try {
      const response = await api.get(`/archivos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo archivo:', error);
      throw error;
    }
  },

  // Crear archivo
  async crearArchivo(datosArchivo) {
    try {
      const response = await api.post('/archivos', datosArchivo);
      return response.data;
    } catch (error) {
      console.error('Error creando archivo:', error);
      throw error;
    }
  },

  // Actualizar archivo
  async actualizarArchivo(id, datosArchivo) {
    try {
      const response = await api.put(`/archivos/${id}`, datosArchivo);
      return response.data;
    } catch (error) {
      console.error('Error actualizando archivo:', error);
      throw error;
    }
  },

  // Eliminar archivo
  async eliminarArchivo(id) {
    try {
      const response = await api.delete(`/archivos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando archivo:', error);
      throw error;
    }
  },

  // Descargar archivo
  async descargarArchivo(id) {
    try {
      const response = await api.post(`/archivos/${id}/descargar`);
      return response.data;
    } catch (error) {
      console.error('Error descargando archivo:', error);
      throw error;
    }
  }
};

export default archivoService;
