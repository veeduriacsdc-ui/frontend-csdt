import api from './api';

const configuracionService = {
  // Obtener todas las configuraciones
  async obtenerConfiguraciones(params = {}) {
    try {
      const response = await api.get('/configuraciones', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo configuraciones:', error);
      throw error;
    }
  },

  // Obtener configuración por ID
  async obtenerConfiguracion(id) {
    try {
      const response = await api.get(`/configuraciones/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo configuración:', error);
      throw error;
    }
  },

  // Crear configuración
  async crearConfiguracion(datosConfiguracion) {
    try {
      const response = await api.post('/configuraciones', datosConfiguracion);
      return response.data;
    } catch (error) {
      console.error('Error creando configuración:', error);
      throw error;
    }
  },

  // Actualizar configuración
  async actualizarConfiguracion(id, datosConfiguracion) {
    try {
      const response = await api.put(`/configuraciones/${id}`, datosConfiguracion);
      return response.data;
    } catch (error) {
      console.error('Error actualizando configuración:', error);
      throw error;
    }
  },

  // Eliminar configuración
  async eliminarConfiguracion(id) {
    try {
      const response = await api.delete(`/configuraciones/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando configuración:', error);
      throw error;
    }
  },

  // Obtener configuración por clave
  async obtenerPorClave(clave) {
    try {
      const response = await api.get(`/configuraciones/clave/${clave}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo configuración por clave:', error);
      throw error;
    }
  },

  // Actualizar configuración por clave
  async actualizarPorClave(clave, datosConfiguracion) {
    try {
      const response = await api.put(`/configuraciones/clave/${clave}`, datosConfiguracion);
      return response.data;
    } catch (error) {
      console.error('Error actualizando configuración por clave:', error);
      throw error;
    }
  }
};

export default configuracionService;
