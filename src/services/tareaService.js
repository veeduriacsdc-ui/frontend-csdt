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
      // Mapear datos a la nueva estructura del backend
      const datos = {
        vee_id: datosTarea.veeduria_id || datosTarea.vee_id || null,
        asig_por: datosTarea.asignado_por || datosTarea.asig_por || null,
        asig_a: datosTarea.asignado_a || datosTarea.asig_a || null,
        tit: datosTarea.titulo || datosTarea.tit || '',
        des: datosTarea.descripcion || datosTarea.des || '',
        est: datosTarea.estado || datosTarea.est || 'pen',
        pri: datosTarea.prioridad || datosTarea.pri || 'med',
        fec_ini: datosTarea.fecha_inicio || datosTarea.fec_ini || null,
        fec_ven: datosTarea.fecha_vencimiento || datosTarea.fec_ven || null,
        fec_com: datosTarea.fecha_completado || datosTarea.fec_com || null,
        not: datosTarea.notas || datosTarea.not || null
      };

      const response = await api.post('/tareas', datos);
      return response.data;
    } catch (error) {
      console.error('Error creando tarea:', error);
      throw error;
    }
  },

  // Actualizar tarea
  async actualizarTarea(id, datosTarea) {
    try {
      // Mapear datos a la nueva estructura del backend
      const datos = {
        vee_id: datosTarea.veeduria_id || datosTarea.vee_id || null,
        asig_por: datosTarea.asignado_por || datosTarea.asig_por || null,
        asig_a: datosTarea.asignado_a || datosTarea.asig_a || null,
        tit: datosTarea.titulo || datosTarea.tit || '',
        des: datosTarea.descripcion || datosTarea.des || '',
        est: datosTarea.estado || datosTarea.est || 'pen',
        pri: datosTarea.prioridad || datosTarea.pri || 'med',
        fec_ini: datosTarea.fecha_inicio || datosTarea.fec_ini || null,
        fec_ven: datosTarea.fecha_vencimiento || datosTarea.fec_ven || null,
        fec_com: datosTarea.fecha_completado || datosTarea.fec_com || null,
        not: datosTarea.notas || datosTarea.not || null
      };

      const response = await api.put(`/tareas/${id}`, datos);
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

  // Asignar tarea
  async asignarTarea(id, usuarioId) {
    try {
      const response = await api.post(`/tareas/${id}/asignar`, { asig_a: usuarioId });
      return response.data;
    } catch (error) {
      console.error('Error asignando tarea:', error);
      throw error;
    }
  },

  // Iniciar tarea
  async iniciarTarea(id) {
    try {
      const response = await api.post(`/tareas/${id}/iniciar`);
      return response.data;
    } catch (error) {
      console.error('Error iniciando tarea:', error);
      throw error;
    }
  },

  // Completar tarea
  async completarTarea(id) {
    try {
      const response = await api.post(`/tareas/${id}/completar`);
      return response.data;
    } catch (error) {
      console.error('Error completando tarea:', error);
      throw error;
    }
  },

  // Cancelar tarea
  async cancelarTarea(id) {
    try {
      const response = await api.post(`/tareas/${id}/cancelar`);
      return response.data;
    } catch (error) {
      console.error('Error cancelando tarea:', error);
      throw error;
    }
  },

  // Suspender tarea
  async suspenderTarea(id) {
    try {
      const response = await api.post(`/tareas/${id}/suspender`);
      return response.data;
    } catch (error) {
      console.error('Error suspendiendo tarea:', error);
      throw error;
    }
  },

  // Reanudar tarea
  async reanudarTarea(id) {
    try {
      const response = await api.post(`/tareas/${id}/reanudar`);
      return response.data;
    } catch (error) {
      console.error('Error reanudando tarea:', error);
      throw error;
    }
  },

  // Restaurar tarea
  async restaurarTarea(id) {
    try {
      const response = await api.post(`/tareas/${id}/restaurar`);
      return response.data;
    } catch (error) {
      console.error('Error restaurando tarea:', error);
      throw error;
    }
  },

  // Buscar tareas
  async buscarTareas(termino, filtros = {}) {
    try {
      const params = { termino, ...filtros };
      const response = await api.get('/tareas/buscar/termino', { params });
      return response.data;
    } catch (error) {
      console.error('Error buscando tareas:', error);
      throw error;
    }
  },

  // Obtener estadísticas de tareas
  async obtenerEstadisticas() {
    try {
      const response = await api.get('/tareas/estadisticas/generales');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }
};

export default tareaService;
