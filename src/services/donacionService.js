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
      // Mapear datos a la nueva estructura del backend
      const datos = {
        usu_id: datosDonacion.usuario_id || datosDonacion.usu_id || null,
        mon: datosDonacion.monto || datosDonacion.mon || 0,
        tip: datosDonacion.tipo_pago || datosDonacion.tip || 'efec',
        est: datosDonacion.estado || datosDonacion.est || 'pen',
        ref: datosDonacion.referencia || datosDonacion.ref || null,
        des: datosDonacion.descripcion || datosDonacion.des || null,
        fec_don: datosDonacion.fecha_donacion || datosDonacion.fec_don || new Date(),
        fec_con: datosDonacion.fecha_confirmacion || datosDonacion.fec_con || null,
        not: datosDonacion.notas || datosDonacion.not || null
      };

      const response = await api.post('/donaciones', datos);
      return response.data;
    } catch (error) {
      console.error('Error creando donación:', error);
      throw error;
    }
  },

  // Actualizar donación
  async actualizarDonacion(id, datosDonacion) {
    try {
      // Mapear datos a la nueva estructura del backend
      const datos = {
        usu_id: datosDonacion.usuario_id || datosDonacion.usu_id || null,
        mon: datosDonacion.monto || datosDonacion.mon || 0,
        tip: datosDonacion.tipo_pago || datosDonacion.tip || 'efec',
        est: datosDonacion.estado || datosDonacion.est || 'pen',
        ref: datosDonacion.referencia || datosDonacion.ref || null,
        des: datosDonacion.descripcion || datosDonacion.des || null,
        fec_don: datosDonacion.fecha_donacion || datosDonacion.fec_don || new Date(),
        fec_con: datosDonacion.fecha_confirmacion || datosDonacion.fec_con || null,
        not: datosDonacion.notas || datosDonacion.not || null
      };

      const response = await api.put(`/donaciones/${id}`, datos);
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

  // Procesar donación
  async procesarDonacion(id) {
    try {
      const response = await api.post(`/donaciones/${id}/procesar`);
      return response.data;
    } catch (error) {
      console.error('Error procesando donación:', error);
      throw error;
    }
  },

  // Confirmar donación
  async confirmarDonacion(id) {
    try {
      const response = await api.post(`/donaciones/${id}/confirmar`);
      return response.data;
    } catch (error) {
      console.error('Error confirmando donación:', error);
      throw error;
    }
  },

  // Rechazar donación
  async rechazarDonacion(id) {
    try {
      const response = await api.post(`/donaciones/${id}/rechazar`);
      return response.data;
    } catch (error) {
      console.error('Error rechazando donación:', error);
      throw error;
    }
  },

  // Cancelar donación
  async cancelarDonacion(id) {
    try {
      const response = await api.post(`/donaciones/${id}/cancelar`);
      return response.data;
    } catch (error) {
      console.error('Error cancelando donación:', error);
      throw error;
    }
  },

  // Restaurar donación
  async restaurarDonacion(id) {
    try {
      const response = await api.post(`/donaciones/${id}/restaurar`);
      return response.data;
    } catch (error) {
      console.error('Error restaurando donación:', error);
      throw error;
    }
  },

  // Buscar donaciones
  async buscarDonaciones(termino, filtros = {}) {
    try {
      const params = { termino, ...filtros };
      const response = await api.get('/donaciones/buscar/termino', { params });
      return response.data;
    } catch (error) {
      console.error('Error buscando donaciones:', error);
      throw error;
    }
  },

  // Obtener estadísticas de donaciones
  async obtenerEstadisticas() {
    try {
      const response = await api.get('/donaciones/estadisticas/generales');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }
};

export default donacionService;
