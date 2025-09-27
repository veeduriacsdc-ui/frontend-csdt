import axios from 'axios';

// Configuración base para IA
const IA_BASE_URL = '/ia-csdt/api/ia';

// Crear instancia de axios para IA
const iaClient = axios.create({
  baseURL: IA_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para manejar respuestas de IA
iaClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Error en servicio de IA:', error);
    return Promise.reject(error);
  }
);

class IaService {
  constructor() {
    this.baseURL = IA_BASE_URL;
  }

  // ===========================================
  // CONSEJO IA
  // ===========================================
  async consultarConsejoIA(consulta, especialidad = 'derecho_constitucional', contexto = {}) {
    try {
      const response = await iaClient.post('/consejo-ia/consultar', {
        consulta,
        especialidad,
        contexto,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true
      });
      return response.data;
    } catch (error) {
      console.error('Error consultando Consejo IA:', error);
      throw error;
    }
  }

  async analisisCompletoConsejoIA(consulta, especialidad, tipoAnalisis = 'completo', contexto = {}) {
    try {
      const response = await iaClient.post('/consejo-ia/analisis-completo', {
        consulta,
        especialidad,
        tipo_analisis: tipoAnalisis,
        contexto,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true
      });
      return response.data;
    } catch (error) {
      console.error('Error en análisis completo:', error);
      throw error;
    }
  }

  async obtenerEspecialistasConsejoIA() {
    try {
      const response = await iaClient.get('/consejo-ia/especialistas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo especialistas:', error);
      throw error;
    }
  }

  async obtenerEstadisticasConsejoIA() {
    try {
      const response = await iaClient.get('/consejo-ia/estadisticas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }

  // ===========================================
  // ESPECIALISTAS IA
  // ===========================================
  async obtenerEspecialistas() {
    try {
      const response = await iaClient.get('/especialistas-ia/');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo especialistas:', error);
      throw error;
    }
  }

  async obtenerEspecialistasPorArea(especialidad) {
    try {
      const response = await iaClient.get(`/especialistas-ia/${especialidad}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo especialistas por área:', error);
      throw error;
    }
  }

  async analisisEspecializado(consulta, especialidad, tipoAnalisis = 'completo', contexto = {}) {
    try {
      const response = await iaClient.post('/especialistas-ia/analisis', {
        consulta,
        especialidad,
        tipo_analisis: tipoAnalisis,
        contexto,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true,
        incluir_estudios_empiricos: true,
        incluir_metodologia_avanzada: true
      });
      return response.data;
    } catch (error) {
      console.error('Error en análisis especializado:', error);
      throw error;
    }
  }

  async analisisIntegral(consulta, especialidad, tipoAnalisis = 'completo', contexto = {}) {
    try {
      const response = await iaClient.post('/especialistas-ia/analisis-integral', {
        consulta,
        especialidad,
        tipo_analisis: tipoAnalisis,
        contexto,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true,
        incluir_estudios_empiricos: true,
        incluir_metodologia_avanzada: true,
        incluir_analisis_interdisciplinario: true,
        incluir_vision_sistemica: true
      });
      return response.data;
    } catch (error) {
      console.error('Error en análisis integral:', error);
      throw error;
    }
  }

  async obtenerAreasDisponibles() {
    try {
      const response = await iaClient.get('/especialistas-ia/areas-disponibles');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo áreas disponibles:', error);
      throw error;
    }
  }

  // ===========================================
  // ANÁLISIS JURÍDICO
  // ===========================================
  async analisisJuridico(narracionHechos, tipoCaso = 'pqrsfd', incluirIa = true, contexto = {}) {
    try {
      const response = await iaClient.post('/analisis-juridico/', {
        narracion_hechos: narracionHechos,
        tipo_caso: tipoCaso,
        incluir_ia: incluirIa,
        contexto,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true,
        incluir_estudios_empiricos: true,
        incluir_metodologia_avanzada: true
      });
      return response.data;
    } catch (error) {
      console.error('Error en análisis jurídico:', error);
      throw error;
    }
  }

  async clasificarCaso(hechos, contexto = {}) {
    try {
      const response = await iaClient.post('/analisis-juridico/clasificar', {
        hechos,
        contexto,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true
      });
      return response.data;
    } catch (error) {
      console.error('Error clasificando caso:', error);
      throw error;
    }
  }

  async obtenerTiposCasos() {
    try {
      const response = await iaClient.get('/analisis-juridico/tipos-casos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de casos:', error);
      throw error;
    }
  }

  async generarDocumento(narracionHechos, tipoCaso, incluirIa = true, contexto = {}) {
    try {
      const response = await iaClient.post('/analisis-juridico/generar-documento', {
        narracion_hechos: narracionHechos,
        tipo_caso: tipoCaso,
        incluir_ia: incluirIa,
        contexto,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true,
        incluir_estudios_empiricos: true,
        incluir_metodologia_avanzada: true
      });
      return response.data;
    } catch (error) {
      console.error('Error generando documento:', error);
      throw error;
    }
  }

  // ===========================================
  // ANÁLISIS JURÍDICO AVANZADO
  // ===========================================
  async analisisJuridicoAvanzado(data) {
    try {
      const response = await iaClient.post('/lexisnexis/analizar-juridico-avanzado', {
        ...data,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true,
        incluir_estudios_empiricos: true,
        incluir_metodologia_avanzada: true,
        incluir_analisis_interdisciplinario: true,
        incluir_vision_sistemica: true,
        incluir_analisis_prospectivo: true,
        incluir_impacto_social: true
      });
      return response.data;
    } catch (error) {
      console.error('Error en análisis jurídico avanzado:', error);
      throw error;
    }
  }

  async clasificarCasoAvanzado(data) {
    try {
      const response = await iaClient.post('/lexisnexis/clasificar-avanzado', {
        ...data,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_precedentes: true,
        incluir_doctrina: true,
        incluir_jurisprudencia: true,
        incluir_legislacion_comparada: true,
        incluir_analisis_critico: true,
        incluir_recomendaciones_avanzadas: true,
        incluir_estudios_empiricos: true,
        incluir_metodologia_avanzada: true
      });
      return response.data;
    } catch (error) {
      console.error('Error clasificando caso avanzado:', error);
      throw error;
    }
  }

  async obtenerAreasLegalesAvanzadas() {
    try {
      const response = await iaClient.get('/lexisnexis/areas-legales-avanzadas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo áreas legales avanzadas:', error);
      throw error;
    }
  }

  async obtenerComunidadesEtnicas() {
    try {
      const response = await iaClient.get('/lexisnexis/comunidades-etnicas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo comunidades étnicas:', error);
      throw error;
    }
  }

  // ===========================================
  // ANÁLISIS DE DOCUMENTOS
  // ===========================================
  async analizarDocumento(archivo, tipoDocumento = 'general', contexto = {}) {
    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('tipo_documento', tipoDocumento);
      formData.append('contexto', JSON.stringify(contexto));

      const response = await iaClient.post('/analisis-documentos/analizar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error analizando documento:', error);
      throw error;
    }
  }

  async obtenerTiposDocumentos() {
    try {
      const response = await iaClient.get('/analisis-documentos/tipos-documentos');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo tipos de documentos:', error);
      throw error;
    }
  }

  async extraerInformacion(archivo, camposEspecificos = []) {
    try {
      const formData = new FormData();
      formData.append('archivo', archivo);
      formData.append('campos_especificos', JSON.stringify(camposEspecificos));

      const response = await iaClient.post('/analisis-documentos/extraer-informacion', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error extrayendo información:', error);
      throw error;
    }
  }

  // ===========================================
  // MEDICINA NATURAL
  // ===========================================
  async obtenerPlantasMedicinales() {
    try {
      const response = await iaClient.get('/medicina-natural/plantas');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo plantas medicinales:', error);
      throw error;
    }
  }

  async crearPlantaMedicinal(planta) {
    try {
      const response = await iaClient.post('/medicina-natural/plantas', planta);
      return response.data;
    } catch (error) {
      console.error('Error creando planta medicinal:', error);
      throw error;
    }
  }

  async obtenerRitualesEtnicos() {
    try {
      const response = await iaClient.get('/medicina-natural/rituales');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo rituales étnicos:', error);
      throw error;
    }
  }

  async crearRitualEtnico(ritual) {
    try {
      const response = await iaClient.post('/medicina-natural/rituales', ritual);
      return response.data;
    } catch (error) {
      console.error('Error creando ritual étnico:', error);
      throw error;
    }
  }

  async analizarPlantaMedicinal(planta, sintomas = []) {
    try {
      const response = await iaClient.post('/medicina-natural/analizar-planta', {
        planta,
        sintomas,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_estudios_cientificos: true,
        incluir_evidencia_empirica: true,
        incluir_analisis_quimico: true,
        incluir_contraindicaciones: true,
        incluir_dosificacion_precisa: true,
        incluir_interacciones: true,
        incluir_metodologia_tradicional: true,
        incluir_validacion_cientifica: true
      });
      return response.data;
    } catch (error) {
      console.error('Error analizando planta medicinal:', error);
      throw error;
    }
  }

  async analizarRitualEtnico(ritual, elementos = []) {
    try {
      const response = await iaClient.post('/medicina-natural/analizar-ritual', {
        ritual,
        elementos,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_estudios_antropologicos: true,
        incluir_evidencia_historica: true,
        incluir_analisis_cultural: true,
        incluir_significado_simbolico: true,
        incluir_contexto_social: true,
        incluir_metodologia_tradicional: true,
        incluir_validacion_etnografica: true,
        incluir_impacto_psicosocial: true
      });
      return response.data;
    } catch (error) {
      console.error('Error analizando ritual étnico:', error);
      throw error;
    }
  }

  async buscarPlantas(termino, comunidad = null) {
    try {
      const params = new URLSearchParams({ 
        termino,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_estudios_cientificos: 'true',
        incluir_evidencia_empirica: 'true',
        incluir_analisis_quimico: 'true',
        incluir_contraindicaciones: 'true',
        incluir_dosificacion_precisa: 'true',
        incluir_interacciones: 'true',
        incluir_metodologia_tradicional: 'true',
        incluir_validacion_cientifica: 'true'
      });
      if (comunidad) params.append('comunidad', comunidad);

      const response = await iaClient.get(`/medicina-natural/buscar-plantas?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error buscando plantas:', error);
      throw error;
    }
  }

  async buscarRituales(termino, comunidad = null) {
    try {
      const params = new URLSearchParams({ 
        termino,
        nivel_analisis: 'maximo',
        profundidad_respuesta: 'completa',
        incluir_estudios_antropologicos: 'true',
        incluir_evidencia_historica: 'true',
        incluir_analisis_cultural: 'true',
        incluir_significado_simbolico: 'true',
        incluir_contexto_social: 'true',
        incluir_metodologia_tradicional: 'true',
        incluir_validacion_etnografica: 'true',
        incluir_impacto_psicosocial: 'true'
      });
      if (comunidad) params.append('comunidad', comunidad);

      const response = await iaClient.get(`/medicina-natural/buscar-rituales?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error buscando rituales:', error);
      throw error;
    }
  }

}

// Crear instancia única del servicio
const iaService = new IaService();

export default iaService;
