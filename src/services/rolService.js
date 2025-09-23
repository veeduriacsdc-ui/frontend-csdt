import api from './api';

const rolService = {
  // Obtener todos los roles
  async obtenerRoles(params = {}) {
    try {
      const response = await api.get('/roles', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo roles:', error);
      throw error;
    }
  },

  // Obtener rol por ID
  async obtenerRol(id) {
    try {
      const response = await api.get(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo rol:', error);
      throw error;
    }
  },

  // Crear rol
  async crearRol(datosRol) {
    try {
      const response = await api.post('/roles', datosRol);
      return response.data;
    } catch (error) {
      console.error('Error creando rol:', error);
      throw error;
    }
  },

  // Actualizar rol
  async actualizarRol(id, datosRol) {
    try {
      const response = await api.put(`/roles/${id}`, datosRol);
      return response.data;
    } catch (error) {
      console.error('Error actualizando rol:', error);
      throw error;
    }
  },

  // Eliminar rol
  async eliminarRol(id) {
    try {
      const response = await api.delete(`/roles/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando rol:', error);
      throw error;
    }
  },

  // Asignar permiso al rol
  async asignarPermiso(id, permisoId) {
    try {
      const response = await api.post(`/roles/${id}/asignar-permiso`, { permiso_id: permisoId });
      return response.data;
    } catch (error) {
      console.error('Error asignando permiso:', error);
      throw error;
    }
  },

  // Revocar permiso del rol
  async revocarPermiso(id, permisoId) {
    try {
      const response = await api.post(`/roles/${id}/revocar-permiso`, { permiso_id: permisoId });
      return response.data;
    } catch (error) {
      console.error('Error revocando permiso:', error);
      throw error;
    }
  }
};

export default rolService;
