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
      // Mapear datos a la nueva estructura del backend
      const datos = {
        nom: datosRol.nombre || datosRol.nom || '',
        des: datosRol.descripcion || datosRol.des || '',
        est: datosRol.estado || datosRol.est || 'act',
        perm: datosRol.permisos || datosRol.perm || []
      };

      const response = await api.post('/roles', datos);
      return response.data;
    } catch (error) {
      console.error('Error creando rol:', error);
      throw error;
    }
  },

  // Actualizar rol
  async actualizarRol(id, datosRol) {
    try {
      // Mapear datos a la nueva estructura del backend
      const datos = {
        nom: datosRol.nombre || datosRol.nom || '',
        des: datosRol.descripcion || datosRol.des || '',
        est: datosRol.estado || datosRol.est || 'act',
        perm: datosRol.permisos || datosRol.perm || []
      };

      const response = await api.put(`/roles/${id}`, datos);
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

  // Activar rol
  async activarRol(id) {
    try {
      const response = await api.post(`/roles/${id}/activar`);
      return response.data;
    } catch (error) {
      console.error('Error activando rol:', error);
      throw error;
    }
  },

  // Desactivar rol
  async desactivarRol(id) {
    try {
      const response = await api.post(`/roles/${id}/desactivar`);
      return response.data;
    } catch (error) {
      console.error('Error desactivando rol:', error);
      throw error;
    }
  },

  // Agregar permiso al rol
  async agregarPermiso(id, permisoId) {
    try {
      const response = await api.post(`/roles/${id}/agregar-permiso`, { perm_id: permisoId });
      return response.data;
    } catch (error) {
      console.error('Error agregando permiso:', error);
      throw error;
    }
  },

  // Quitar permiso del rol
  async quitarPermiso(id, permisoId) {
    try {
      const response = await api.post(`/roles/${id}/quitar-permiso`, { perm_id: permisoId });
      return response.data;
    } catch (error) {
      console.error('Error quitando permiso:', error);
      throw error;
    }
  }
};

export default rolService;
