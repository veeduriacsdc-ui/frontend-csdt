import api from './api';

class AnalisisJuridicoService {
  /**
   * Obtener lista de análisis jurídicos
   */
  async obtenerLista(filtros = {}) {
    try {
      const params = new URLSearchParams();
      
      if (filtros.tipo_caso) params.append('tipo_caso', filtros.tipo_caso);
      if (filtros.categoria_juridica) params.append('categoria_juridica', filtros.categoria_juridica);
      if (filtros.estado_analisis) params.append('estado_analisis', filtros.estado_analisis);
      if (filtros.nivel_riesgo) params.append('nivel_riesgo', filtros.nivel_riesgo);
      if (filtros.usuario_id) params.append('usuario_id', filtros.usuario_id);
      if (filtros.requiere_seguimiento) params.append('requiere_seguimiento', filtros.requiere_seguimiento);
      if (filtros.order_by) params.append('order_by', filtros.order_by);
      if (filtros.order_direction) params.append('order_direction', filtros.order_direction);
      if (filtros.per_page) params.append('per_page', filtros.per_page);

      const response = await api.get(`/analisis-juridico?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo análisis jurídicos:', error);
      throw error;
    }
  }

  /**
   * Crear nuevo análisis jurídico
   */
  async crearAnalisis(datosAnalisis) {
    try {
      const response = await api.post('/analisis-juridico', datosAnalisis);
      return response.data;
    } catch (error) {
      console.error('Error creando análisis jurídico:', error);
      throw error;
    }
  }

  /**
   * Obtener análisis jurídico específico
   */
  async obtenerAnalisis(id) {
    try {
      const response = await api.get(`/analisis-juridico/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo análisis jurídico:', error);
      throw error;
    }
  }

  /**
   * Actualizar análisis jurídico
   */
  async actualizarAnalisis(id, datosActualizacion) {
    try {
      const response = await api.put(`/analisis-juridico/${id}`, datosActualizacion);
      return response.data;
    } catch (error) {
      console.error('Error actualizando análisis jurídico:', error);
      throw error;
    }
  }

  /**
   * Eliminar análisis jurídico
   */
  async eliminarAnalisis(id) {
    try {
      const response = await api.delete(`/analisis-juridico/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando análisis jurídico:', error);
      throw error;
    }
  }

  /**
   * Obtener estadísticas de análisis jurídicos
   */
  async obtenerEstadisticas() {
    try {
      const response = await api.get('/analisis-juridico/estadisticas/generales');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }

  /**
   * Crear análisis con datos del formulario
   */
  async crearAnalisisDesdeFormulario(hechos, tipoCaso, categoriaJuridica, coordenadas = null) {
    const datosAnalisis = {
      titulo_caso: `Análisis ${tipoCaso} - ${new Date().toLocaleDateString('es-CO')}`,
      descripcion_detallada: `Análisis jurídico de caso ${tipoCaso} presentado el ${new Date().toLocaleDateString('es-CO')}`,
      narracion_hechos: hechos,
      tipo_caso: tipoCaso,
      categoria_juridica: categoriaJuridica,
      nivel_aplicacion: 'nacional',
      coordenadas: coordenadas,
      fecha_vencimiento: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 90 días
    };

    return await this.crearAnalisis(datosAnalisis);
  }

  /**
   * Generar análisis de demostración
   */
  async generarAnalisisDemostracion() {
    const hechosDemo = `Caso de demostración del sistema CSDT: Se presentan irregularidades en la contratación pública de obras de infraestructura vial en el municipio, donde se observan posibles sobrecostos, falta de transparencia en los procesos de selección y deficiencias en la ejecución de los proyectos. Los ciudadanos han manifestado su preocupación por el impacto ambiental y social de las obras, así como por la falta de consulta previa a las comunidades afectadas.`;

    return await this.crearAnalisisDesdeFormulario(
      hechosDemo,
      'administrativo',
      'procedimiento_administrativo'
    );
  }
}

export default new AnalisisJuridicoService();
