import api from './api';

const veeduriaService = {
  // Obtener todas las veedurías
  async obtenerVeedurias(params = {}) {
    try {
      const response = await api.get('/veedurias', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo veedurías:', error);
      throw error;
    }
  },

  // Obtener veeduría por ID
  async obtenerVeeduria(id) {
    try {
      const response = await api.get(`/veedurias/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo veeduría:', error);
      throw error;
    }
  },

  // Crear veeduría
  async crearVeeduria(datosVeeduria) {
    try {
      const response = await api.post('/veedurias', datosVeeduria);
      return response.data;
    } catch (error) {
      console.error('Error creando veeduría:', error);
      throw error;
    }
  },

  // Actualizar veeduría
  async actualizarVeeduria(id, datosVeeduria) {
    try {
      const response = await api.put(`/veedurias/${id}`, datosVeeduria);
      return response.data;
    } catch (error) {
      console.error('Error actualizando veeduría:', error);
      throw error;
    }
  },

  // Eliminar veeduría
  async eliminarVeeduria(id) {
    try {
      const response = await api.delete(`/veedurias/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando veeduría:', error);
      throw error;
    }
  },

  // Cambiar estado de la veeduría
  async cambiarEstado(id, estado) {
    try {
      const response = await api.put(`/veedurias/${id}/estado`, { estado });
      return response.data;
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  },

  // Asignar operador a la veeduría
  async asignarOperador(id, operadorId) {
    try {
      const response = await api.post(`/veedurias/${id}/asignar-operador`, { operador_id: operadorId });
      return response.data;
    } catch (error) {
      console.error('Error asignando operador:', error);
      throw error;
    }
  }
};

export default veeduriaService;
