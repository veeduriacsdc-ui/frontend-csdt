import csdtApiService from './csdtApiService';
import ConsejoVeeduriaTerritorialService from './ConsejoVeeduriaTerritorialService';

/**
 * Servicio para manejar las operaciones de Consejo IA con la base de datos
 */
class ConsejoIAService {
  constructor() {
    // Usar el servicio unificado del CSDT
    this.api = csdtApiService.consejoIA;
    // Prompts manejados localmente
    this.consejoVeeduriaTerritorialService = new ConsejoVeeduriaTerritorialService();
  }

  /**
   * Crear nuevo análisis de IA
   */
  async crearAnalisis(datos) {
    try {
      const response = await this.api.crear(datos);
      return response.data;
    } catch (error) {
      console.error('Error creando análisis:', error);
      throw error;
    }
  }

  /**
   * Obtener análisis por ID
   */
  async obtenerAnalisis(id) {
    try {
      const response = await this.api.obtenerPorId(id);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo análisis:', error);
      throw error;
    }
  }

  /**
   * Listar todos los análisis
   */
  async listarAnalisis() {
    try {
      const response = await this.api.obtenerLista();
      return response.data;
    } catch (error) {
      console.error('Error listando análisis:', error);
      throw error;
    }
  }

  /**
   * Generar reporte PDF
   */
  async generarReportePDF(id) {
    try {
      const response = await this.api.generarPdfAutenticado(id);
      return response.data;
    } catch (error) {
      console.error('Error generando reporte PDF:', error);
      throw error;
    }
  }

  /**
   * Obtener casos recientes
   */
  async obtenerCasosRecientes(limite = 10) {
    try {
      const response = await this.api.obtenerLista();
      return response.data;
    } catch (error) {
      console.error('Error obteniendo casos recientes:', error);
      throw error;
    }
  }

  /**
   * Simular análisis local simplificado
   */
  async simularAnalisisLocal(hechos, documentos = [], coordenadas = []) {
    try {
      // Generar análisis básico simplificado
      const analisisBasico = this.generarAnalisisBasico(hechos, documentos);

      // Generar código de caso
      const codigoCaso = `CSDT-IA-${Date.now().toString().slice(-6)}`;

      // Generar análisis territorial
      const analisisTerritorial = this.consejoVeeduriaTerritorialService.analizarCasoTerritorial(hechos, documentos, coordenadas);

      return {
        codigoCaso,
        analisisCompleto: analisisBasico,
        analisisTerritorial,
        coordenadas: coordenadas || [],
        timestamp: new Date().toISOString(),
        version: '2.0.0'
      };
    } catch (error) {
      console.error('Error en simulación local:', error);
      return this.generarAnalisisBasico(hechos, documentos);
    }
  }

  /**
   * Generar respuesta local estructurada
   */
  generarRespuestaLocal(tipoIA, hechos, documentos, coordenadas) {
    return {
      narracionHechos: `Análisis profesional de ${tipoIA}: ${hechos}`,
      fundamentosJuridicos: {
        nacionales: ['Constitución Política de Colombia', 'Código Civil'],
        internacionales: ['Convención Americana sobre Derechos Humanos'],
        departamentales: ['Normativas departamentales aplicables'],
        municipales: ['Acuerdos municipales relevantes']
      },
      recomendaciones: [
        'Revisión exhaustiva de la documentación presentada',
        'Análisis técnico especializado',
        'Consultas con expertos en la materia',
        'Seguimiento y monitoreo continuo'
      ],
      evidencias: documentos || [],
      coordenadas: coordenadas || null
    };
  }

  /**
   * Generar respuesta profesional usando prompts mejorados
   */
  generarRespuestaProfesional(tipoIA, hechos, documentos, coordenadas) {
    try {
      // Generar respuesta estructurada localmente
      return this.generarRespuestaLocal(tipoIA, hechos, documentos, coordenadas);
    } catch (error) {
      console.error('Error generando respuesta profesional:', error);
      // Fallback a respuesta básica
      return {
        narracionHechos: `Análisis de ${tipoIA}: ${hechos}`,
        fundamentosJuridicos: 'Fundamentos jurídicos aplicables',
        conceptoGeneral: 'Concepto general del análisis',
        nivelRiesgo: 'MEDIO',
        recomendaciones: [
          'Revisar documentación presentada',
          'Consultar con expertos en la materia',
          'Realizar seguimiento continuo'
        ],
        evidencias: documentos || [],
        coordenadas: coordenadas || null
      };
    }
  }

  /**
   * Generar análisis básico
   */
  generarAnalisisBasico(hechos, documentos = []) {
    return {
      narracionHechos: `Análisis de hechos: ${hechos}`,
      fundamentosJuridicos: {
        nacionales: ['Constitución Política de Colombia'],
        internacionales: ['Derechos Humanos'],
        departamentales: ['Normativas departamentales'],
        municipales: ['Acuerdos municipales']
      },
      conceptoGeneral: 'Análisis general del caso presentado',
      nivelRiesgo: 'MEDIO',
      recomendaciones: [
        'Revisión exhaustiva de la documentación',
        'Análisis técnico especializado',
        'Consultas con expertos',
        'Seguimiento continuo'
      ],
      evidencias: documentos || [],
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Consolidar análisis completo
   */
  consolidarAnalisisCompleto(analisis, hechos, documentos) {
    return {
      resumen: `Análisis consolidado de: ${hechos}`,
      fundamentosJuridicos: {
        nacionales: ['Constitución Política de Colombia', 'Código Civil', 'Código Penal'],
        internacionales: ['Convención Americana sobre Derechos Humanos', 'Pacto Internacional de Derechos Civiles y Políticos'],
        departamentales: ['Normativas departamentales aplicables'],
        municipales: ['Acuerdos municipales relevantes']
      },
      conceptoGeneral: 'Concepto integral del análisis realizado',
      nivelRiesgo: 'MEDIO',
      recomendaciones: [
        'Revisión exhaustiva de la documentación presentada',
        'Análisis técnico especializado por parte de expertos',
        'Consultas con profesionales en la materia',
        'Seguimiento y monitoreo continuo del caso',
        'Evaluación de impacto territorial y social'
      ],
      evidencias: documentos || [],
      timestamp: new Date().toISOString(),
      version: '2.0.0'
    };
  }
}

export default new ConsejoIAService();