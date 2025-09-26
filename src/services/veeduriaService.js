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
      // Mapear datos a la nueva estructura del backend
      const datos = {
        usu_id: datosVeeduria.usuario_id || datosVeeduria.usu_id || null,
        ope_id: datosVeeduria.operador_id || datosVeeduria.ope_id || null,
        tit: datosVeeduria.titulo || datosVeeduria.tit || '',
        des: datosVeeduria.descripcion || datosVeeduria.des || '',
        tip: datosVeeduria.tipo || datosVeeduria.tip || 'pet',
        est: datosVeeduria.estado || datosVeeduria.est || 'pen',
        pri: datosVeeduria.prioridad || datosVeeduria.pri || 'med',
        cat: datosVeeduria.categoria || datosVeeduria.cat || null,
        ubi: datosVeeduria.ubicacion || datosVeeduria.ubi || null,
        pre: datosVeeduria.presupuesto || datosVeeduria.pre || null,
        not_ope: datosVeeduria.notas_operador || datosVeeduria.not_ope || null,
        rec_ia: datosVeeduria.recomendaciones_ia || datosVeeduria.rec_ia || null,
        arc: datosVeeduria.archivos || datosVeeduria.arc || null
      };

      const response = await api.post('/veedurias', datos);
      return response.data;
    } catch (error) {
      console.error('Error creando veeduría:', error);
      throw error;
    }
  },

  // Actualizar veeduría
  async actualizarVeeduria(id, datosVeeduria) {
    try {
      // Mapear datos a la nueva estructura del backend
      const datos = {
        usu_id: datosVeeduria.usuario_id || datosVeeduria.usu_id || null,
        ope_id: datosVeeduria.operador_id || datosVeeduria.ope_id || null,
        tit: datosVeeduria.titulo || datosVeeduria.tit || '',
        des: datosVeeduria.descripcion || datosVeeduria.des || '',
        tip: datosVeeduria.tipo || datosVeeduria.tip || 'pet',
        est: datosVeeduria.estado || datosVeeduria.est || 'pen',
        pri: datosVeeduria.prioridad || datosVeeduria.pri || 'med',
        cat: datosVeeduria.categoria || datosVeeduria.cat || null,
        ubi: datosVeeduria.ubicacion || datosVeeduria.ubi || null,
        pre: datosVeeduria.presupuesto || datosVeeduria.pre || null,
        not_ope: datosVeeduria.notas_operador || datosVeeduria.not_ope || null,
        rec_ia: datosVeeduria.recomendaciones_ia || datosVeeduria.rec_ia || null,
        arc: datosVeeduria.archivos || datosVeeduria.arc || null
      };

      const response = await api.put(`/veedurias/${id}`, datos);
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

  // Asignar operador a la veeduría
  async asignarOperador(id, operadorId) {
    try {
      const response = await api.post(`/veedurias/${id}/asignar-operador`, { ope_id: operadorId });
      return response.data;
    } catch (error) {
      console.error('Error asignando operador:', error);
      throw error;
    }
  },

  // Radicar veeduría
  async radicarVeeduria(id) {
    try {
      const response = await api.post(`/veedurias/${id}/radicar`);
      return response.data;
    } catch (error) {
      console.error('Error radicando veeduría:', error);
      throw error;
    }
  },

  // Cerrar veeduría
  async cerrarVeeduria(id) {
    try {
      const response = await api.post(`/veedurias/${id}/cerrar`);
      return response.data;
    } catch (error) {
      console.error('Error cerrando veeduría:', error);
      throw error;
    }
  },

  // Cancelar veeduría
  async cancelarVeeduria(id) {
    try {
      const response = await api.post(`/veedurias/${id}/cancelar`);
      return response.data;
    } catch (error) {
      console.error('Error cancelando veeduría:', error);
      throw error;
    }
  },

  // Restaurar veeduría
  async restaurarVeeduria(id) {
    try {
      const response = await api.post(`/veedurias/${id}/restaurar`);
      return response.data;
    } catch (error) {
      console.error('Error restaurando veeduría:', error);
      throw error;
    }
  },

  // Buscar veedurías
  async buscarVeedurias(termino, filtros = {}) {
    try {
      const params = { termino, ...filtros };
      const response = await api.get('/veedurias/buscar/termino', { params });
      return response.data;
    } catch (error) {
      console.error('Error buscando veedurías:', error);
      throw error;
    }
  },

  // Obtener estadísticas de veedurías
  async obtenerEstadisticas(id = null) {
    try {
      const url = id ? `/veedurias/${id}/estadisticas` : '/veedurias/estadisticas';
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }
};

export default veeduriaService;
