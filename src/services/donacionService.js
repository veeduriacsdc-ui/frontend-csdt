import api from './api';

const donacionService = {
  // Obtener todas las donaciones
  async obtenerDonaciones(params = {}) {
    try {
      const response = await api.get('/donaciones', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo donaciones:', error);
      throw error;
    }
  },

  // Obtener donación por ID
  async obtenerDonacion(id) {
    try {
      const response = await api.get(`/donaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo donación:', error);
      throw error;
    }
  },

  // Crear donación
  async crearDonacion(datosDonacion) {
    try {
      const response = await api.post('/donaciones', datosDonacion);
      return response.data;
    } catch (error) {
      console.error('Error creando donación:', error);
      throw error;
    }
  },

  // Actualizar donación
  async actualizarDonacion(id, datosDonacion) {
    try {
      const response = await api.put(`/donaciones/${id}`, datosDonacion);
      return response.data;
    } catch (error) {
      console.error('Error actualizando donación:', error);
      throw error;
    }
  },

  // Eliminar donación
  async eliminarDonacion(id) {
    try {
      const response = await api.delete(`/donaciones/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando donación:', error);
      throw error;
    }
  },

  // Cambiar estado de la donación
  async cambiarEstado(id, estado) {
    try {
      const response = await api.put(`/donaciones/${id}/estado`, { estado });
      return response.data;
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  }
};

export default donacionService;
