import api from './api';

const tareaService = {
  // Obtener todas las tareas
  async obtenerTareas(params = {}) {
    try {
      const response = await api.get('/tareas', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tareas:', error);
      throw error;
    }
  },

  // Obtener tarea por ID
  async obtenerTarea(id) {
    try {
      const response = await api.get(`/tareas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tarea:', error);
      throw error;
    }
  },

  // Crear tarea
  async crearTarea(datosTarea) {
    try {
      const response = await api.post('/tareas', datosTarea);
      return response.data;
    } catch (error) {
      console.error('Error creando tarea:', error);
      throw error;
    }
  },

  // Actualizar tarea
  async actualizarTarea(id, datosTarea) {
    try {
      const response = await api.put(`/tareas/${id}`, datosTarea);
      return response.data;
    } catch (error) {
      console.error('Error actualizando tarea:', error);
      throw error;
    }
  },

  // Eliminar tarea
  async eliminarTarea(id) {
    try {
      const response = await api.delete(`/tareas/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando tarea:', error);
      throw error;
    }
  },

  // Cambiar estado de la tarea
  async cambiarEstado(id, estado) {
    try {
      const response = await api.put(`/tareas/${id}/estado`, { estado });
      return response.data;
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  },

  // Asignar usuario a la tarea
  async asignarUsuario(id, usuarioId) {
    try {
      const response = await api.post(`/tareas/${id}/asignar-usuario`, { usuario_id: usuarioId });
      return response.data;
    } catch (error) {
      console.error('Error asignando usuario:', error);
      throw error;
    }
  }
};

export default tareaService;
