import api from './api';

const usuarioService = {
  // Obtener todos los usuarios
  async obtenerUsuarios(params = {}) {
    try {
      const response = await api.get('/usuarios', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  // Obtener usuario por ID
  async obtenerUsuario(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },

  // Crear usuario
  async crearUsuario(datosUsuario) {
    try {
      const response = await api.post('/usuarios', datosUsuario);
      return response.data;
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  },

  // Actualizar usuario
  async actualizarUsuario(id, datosUsuario) {
    try {
      const response = await api.put(`/usuarios/${id}`, datosUsuario);
      return response.data;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario
  async eliminarUsuario(id) {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  },

  // Cambiar estado del usuario
  async cambiarEstado(id, estado) {
    try {
      const response = await api.put(`/usuarios/${id}/estado`, { estado });
      return response.data;
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  },

  // Asignar rol al usuario
  async asignarRol(id, rolId) {
    try {
      const response = await api.post(`/usuarios/${id}/rol`, { rol_id: rolId });
      return response.data;
    } catch (error) {
      console.error('Error asignando rol:', error);
      throw error;
    }
  }
};

export default usuarioService;
