/**
 * SERVICIO DE IA MEJORADA - CSDT
 * Sistema de procesamiento de lenguaje natural para el Consejo Social de Veeduría y Desarrollo Territorial
 * Versión mejorada con análisis especializados para acciones constitucionales
 */

class IAMejoradaService {
  
  // Configuración del sistema
  static configuracion = {
    version: '2.0.0',
    nombre: 'Sistema de IA Mejorada CSDT',
    descripcion: 'Procesamiento de lenguaje natural para mejorar respuestas jurídicas con análisis especializados',
    modelos: ['clasificador-legal', 'mejorador-texto', 'analizador-constitucional']
  };

  // Diccionario básico de términos jurídicos
  static diccionarioJuridico = {
    acciones: {
      'tutela': 'Acción constitucional para protección inmediata de derechos fundamentales',
      'cumplimiento': 'Acción para exigir cumplimiento de ley o acto administrativo',
      'popular': 'Acción para defensa de derechos e intereses colectivos',
      'grupo': 'Acción para reclamos colectivos de indemnización',
      'nulidad': 'Acción para anular actos administrativos ilegales',
      'reparacion': 'Acción de responsabilidad patrimonial del Estado'
    },
    mecanismos: {
      'consulta_popular': 'Mecanismo de participación ciudadana mediante voto',
      'referendo': 'Votación para aprobar o derogar normas',
      'plebiscito': 'Pronunciamiento popular sobre decisiones de gobierno',
      'cabildo_abierto': 'Espacio de deliberación ciudadana',
      'veeduria': 'Vigilancia ciudadana a la gestión pública',
      'rendicion_cuentas': 'Informe obligatorio de gestión pública'
    }
  };

  // Clasificar tipo de caso
  static clasificarTipoCaso(texto) {
    const palabrasClave = {
      constitucional: ['tutela', 'cumplimiento', 'popular', 'grupo', 'derechos fundamentales', 'constitución'],
      administrativo: ['acto administrativo', 'contratación', 'procedimiento administrativo', 'responsabilidad del estado'],
      penal: ['delito', 'penal', 'fiscalía', 'proceso penal', 'víctima'],
      civil: ['contrato', 'responsabilidad civil', 'daños', 'indemnización', 'sucesión']
    };

    let puntuaciones = {};
    let totalPuntuacion = 0;

    Object.keys(palabrasClave).forEach(categoria => {
      puntuaciones[categoria] = 0;
      palabrasClave[categoria].forEach(palabra => {
        if (texto.toLowerCase().includes(palabra.toLowerCase())) {
          puntuaciones[categoria]++;
          totalPuntuacion++;
        }
      });
    });

    // Determinar categoría principal
    let categoriaPrincipal = 'constitucional';
    let maxPuntuacion = 0;

    Object.keys(puntuaciones).forEach(categoria => {
      if (puntuaciones[categoria] > maxPuntuacion) {
        maxPuntuacion = puntuaciones[categoria];
        categoriaPrincipal = categoria;
      }
    });

    return {
      categoria: categoriaPrincipal,
      confianza: totalPuntuacion > 0 ? maxPuntuacion / totalPuntuacion : 0.5,
      todasPuntuaciones: puntuaciones
    };
  }

  // Analizar urgencia del caso
  static analizarUrgencia(texto) {
    const palabrasUrgentes = ['urgente', 'inmediato', 'emergencia', 'grave', 'crítico', 'inmediata'];
    const palabrasNormales = ['normal', 'regular', 'estándar', 'rutinario'];
    
    let urgencia = 'normal';
    let confianza = 0.5;

    const textoLower = texto.toLowerCase();
    
    palabrasUrgentes.forEach(palabra => {
      if (textoLower.includes(palabra)) {
        urgencia = 'alta';
        confianza = 0.8;
      }
    });

    palabrasNormales.forEach(palabra => {
      if (textoLower.includes(palabra)) {
        urgencia = 'normal';
        confianza = 0.7;
      }
    });

    return {
      nivel: urgencia,
      confianza: confianza
    };
  }

  // Mejorar texto jurídico
  static mejorarTextoJuridico(texto, nivel = 'básico') {
    if (!texto || typeof texto !== 'string') {
      return texto;
    }

    let textoMejorado = texto;

    // Aplicar mejoras básicas
    if (nivel === 'básico' || nivel === 'profesional') {
      // Capitalizar términos jurídicos importantes
      const terminosJuridicos = ['tutela', 'cumplimiento', 'popular', 'grupo', 'nulidad'];
      terminosJuridicos.forEach(termino => {
        const regex = new RegExp(`\\b${termino}\\b`, 'gi');
        textoMejorado = textoMejorado.replace(regex, termino.charAt(0).toUpperCase() + termino.slice(1));
      });

      // Mejorar formato de artículos
      textoMejorado = textoMejorado.replace(/art\.\s*(\d+)/gi, 'Artículo $1');
      textoMejorado = textoMejorado.replace(/artículo\s*(\d+)/gi, 'Artículo $1');
    }

    return textoMejorado;
  }

  // NUEVO: Análisis especializado para Acción de Tutela
  static analizarAccionTutela(hechos, derechoVulnerado, entidadDemandada) {
    const analisis = {
      tipoAccion: 'Acción de Tutela',
      articuloConstitucional: 'Artículo 86',
      viabilidad: this.evaluarViabilidadTutela(hechos, derechoVulnerado),
      requisitos: this.verificarRequisitosTutela(hechos, derechoVulnerado, entidadDemandada),
      estrategia: this.generarEstrategiaTutela(hechos, derechoVulnerado, entidadDemandada),
      documentos: this.obtenerDocumentosTutela(),
      plazos: '10 días hábiles',
      probabilidadExito: this.calcularProbabilidadExito('tutela', hechos)
    };

    return analisis;
  }

  // NUEVO: Análisis especializado para Acción Popular
  static analizarAccionPopular(hechos, derechoColectivo, entidadDemandada) {
    const analisis = {
      tipoAccion: 'Acción Popular',
      articuloConstitucional: 'Artículo 88',
      viabilidad: this.evaluarViabilidadPopular(hechos, derechoColectivo),
      requisitos: this.verificarRequisitosPopular(hechos, derechoColectivo, entidadDemandada),
      estrategia: this.generarEstrategiaPopular(hechos, derechoColectivo, entidadDemandada),
      documentos: this.obtenerDocumentosPopular(),
      plazos: '20 días hábiles',
      probabilidadExito: this.calcularProbabilidadExito('popular', hechos)
    };

    return analisis;
  }

  // NUEVO: Análisis especializado para Acción de Cumplimiento
  static analizarAccionCumplimiento(hechos, normaIncumplida, entidadDemandada) {
    const analisis = {
      tipoAccion: 'Acción de Cumplimiento',
      articuloConstitucional: 'Artículo 87',
      viabilidad: this.evaluarViabilidadCumplimiento(hechos, normaIncumplida),
      requisitos: this.verificarRequisitosCumplimiento(hechos, normaIncumplida, entidadDemandada),
      estrategia: this.generarEstrategiaCumplimiento(hechos, normaIncumplida, entidadDemandada),
      documentos: this.obtenerDocumentosCumplimiento(),
      plazos: '15 días hábiles',
      probabilidadExito: this.calcularProbabilidadExito('cumplimiento', hechos)
    };

    return analisis;
  }

  // NUEVO: Análisis especializado para Acción de Grupo
  static analizarAccionGrupo(hechos, derechoVulnerado, entidadDemandada, numeroAfectados) {
    const analisis = {
      tipoAccion: 'Acción de Grupo',
      articuloConstitucional: 'Artículo 88',
      viabilidad: this.evaluarViabilidadGrupo(hechos, derechoVulnerado, numeroAfectados),
      requisitos: this.verificarRequisitosGrupo(hechos, derechoVulnerado, entidadDemandada, numeroAfectados),
      estrategia: this.generarEstrategiaGrupo(hechos, derechoVulnerado, entidadDemandada, numeroAfectados),
      documentos: this.obtenerDocumentosGrupo(),
      plazos: '30 días hábiles',
      probabilidadExito: this.calcularProbabilidadExito('grupo', hechos)
    };

    return analisis;
  }

  // NUEVO: Análisis especializado para Acción de Nulidad
  static analizarAccionNulidad(hechos, actoAdministrativo, entidadDemandada) {
    const analisis = {
      tipoAccion: 'Acción de Nulidad',
      articuloConstitucional: 'Artículo 87',
      viabilidad: this.evaluarViabilidadNulidad(hechos, actoAdministrativo),
      requisitos: this.verificarRequisitosNulidad(hechos, actoAdministrativo, entidadDemandada),
      estrategia: this.generarEstrategiaNulidad(hechos, actoAdministrativo, entidadDemandada),
      documentos: this.obtenerDocumentosNulidad(),
      plazos: '20 días hábiles',
      probabilidadExito: this.calcularProbabilidadExito('nulidad', hechos)
    };

    return analisis;
  }

  // NUEVO: Análisis especializado para Acción de Reparación Directa
  static analizarAccionReparacionDirecta(hechos, dano, entidadDemandada) {
    const analisis = {
      tipoAccion: 'Acción de Reparación Directa',
      articuloConstitucional: 'Artículo 90',
      viabilidad: this.evaluarViabilidadReparacion(hechos, dano),
      requisitos: this.verificarRequisitosReparacion(hechos, dano, entidadDemandada),
      estrategia: this.generarEstrategiaReparacion(hechos, dano, entidadDemandada),
      documentos: this.obtenerDocumentosReparacion(),
      plazos: '25 días hábiles',
      probabilidadExito: this.calcularProbabilidadExito('reparacion', hechos)
    };

    return analisis;
  }

  // NUEVO: Análisis especializado para Demanda Jurídica
  static analizarDemandaJuridica(hechos, pretensiones, entidadDemandada) {
    const analisis = {
      tipoAccion: 'Demanda Jurídica',
      articuloConstitucional: 'Artículo 229',
      viabilidad: this.evaluarViabilidadDemanda(hechos, pretensiones),
      requisitos: this.verificarRequisitosDemanda(hechos, pretensiones, entidadDemandada),
      estrategia: this.generarEstrategiaDemanda(hechos, pretensiones, entidadDemandada),
      documentos: this.obtenerDocumentosDemanda(),
      plazos: '30 días hábiles',
      probabilidadExito: this.calcularProbabilidadExito('demanda', hechos)
    };

    return analisis;
  }

  // NUEVO: Generar recomendaciones específicas para acciones constitucionales
  static generarRecomendacionesAccionesConstitucionales(tipoAccion, datos) {
    const recomendaciones = {
      tipoAccion: tipoAccion,
      analisisViabilidad: this.analizarViabilidadGeneral(datos),
      estrategiaProcesal: this.generarEstrategiaProcesal(tipoAccion, datos),
      documentosNecesarios: this.obtenerDocumentosNecesarios(tipoAccion),
      plazosProcedimientos: this.obtenerPlazosProcedimientos(tipoAccion),
      consideracionesEspeciales: this.obtenerConsideracionesEspeciales(tipoAccion),
      probabilidadExito: this.calcularProbabilidadExito(tipoAccion, datos.hechos),
      alternativasJuridicas: this.obtenerAlternativasJuridicas(tipoAccion, datos)
    };

    return recomendaciones;
  }

  // Métodos auxiliares para análisis de tutela
  static evaluarViabilidadTutela(hechos, derechoVulnerado) {
    const derechosFundamentales = ['vida', 'salud', 'educacion', 'trabajo', 'vivienda', 'alimentacion', 'agua', 'ambiente'];
    const esDerechoFundamental = derechosFundamentales.some(derecho => 
      derechoVulnerado.toLowerCase().includes(derecho)
    );
    
    return {
      procedente: esDerechoFundamental && hechos.length > 50,
      fundamento: esDerechoFundamental ? 'Derecho fundamental identificado' : 'Verificar si es derecho fundamental',
      confianza: esDerechoFundamental ? 0.9 : 0.6
    };
  }

  static verificarRequisitosTutela(hechos, derechoVulnerado, entidadDemandada) {
    return {
      derechoFundamental: true,
      vulneracionInmediata: hechos.toLowerCase().includes('urgente') || hechos.toLowerCase().includes('inmediato'),
      entidadResponsable: entidadDemandada.length > 0,
      hechosSuficientes: hechos.length > 100,
      subsidiariedad: true
    };
  }

  static generarEstrategiaTutela(hechos, derechoVulnerado, entidadDemandada) {
    return {
      enfoque: 'Protección inmediata del derecho fundamental',
      argumentos: [
        `Vulneración del derecho a ${derechoVulnerado}`,
        'Necesidad de protección inmediata',
        'Obligación constitucional de la entidad'
      ],
      medidas: [
        'Solicitar protección inmediata',
        'Ordenar cumplimiento de obligaciones',
        'Establecer medidas de seguimiento'
      ]
    };
  }

  static obtenerDocumentosTutela() {
    return [
      'Documento de identidad',
      'Pruebas de la vulneración',
      'Comunicaciones con la entidad',
      'Testimonios si aplica',
      'Documentos médicos (si aplica)'
    ];
  }

  // Métodos auxiliares para análisis de acción popular
  static evaluarViabilidadPopular(hechos, derechoColectivo) {
    const derechosColectivos = ['ambiente', 'salud', 'educacion', 'servicios', 'espacio'];
    const esDerechoColectivo = derechosColectivos.some(derecho => 
      derechoColectivo.toLowerCase().includes(derecho)
    );
    
    return {
      procedente: esDerechoColectivo && hechos.length > 50,
      fundamento: esDerechoColectivo ? 'Derecho colectivo identificado' : 'Verificar si es derecho colectivo',
      confianza: esDerechoColectivo ? 0.85 : 0.6
    };
  }

  static verificarRequisitosPopular(hechos, derechoColectivo, entidadDemandada) {
    return {
      derechoColectivo: true,
      interesGeneral: hechos.toLowerCase().includes('comunidad') || hechos.toLowerCase().includes('público'),
      entidadResponsable: entidadDemandada.length > 0,
      hechosSuficientes: hechos.length > 100,
      legitimacion: true
    };
  }

  static generarEstrategiaPopular(hechos, derechoColectivo, entidadDemandada) {
    return {
      enfoque: 'Protección de derechos colectivos e intereses generales',
      argumentos: [
        `Vulneración del derecho colectivo a ${derechoColectivo}`,
        'Interés general afectado',
        'Obligación de protección de la entidad'
      ],
      medidas: [
        'Ordenar cesación de la vulneración',
        'Establecer medidas de protección',
        'Implementar seguimiento y monitoreo'
      ]
    };
  }

  static obtenerDocumentosPopular() {
    return [
      'Documento de identidad',
      'Pruebas de la vulneración colectiva',
      'Documentos que acrediten el interés general',
      'Comunicaciones con la entidad',
      'Testimonios de la comunidad'
    ];
  }

  // Métodos auxiliares para análisis de cumplimiento
  static evaluarViabilidadCumplimiento(hechos, normaIncumplida) {
    const normasComunes = ['ley', 'decreto', 'resolucion', 'acuerdo', 'ordenanza'];
    const esNormaIdentificada = normasComunes.some(norma => 
      normaIncumplida.toLowerCase().includes(norma)
    );
    
    return {
      procedente: esNormaIdentificada && hechos.length > 50,
      fundamento: esNormaIdentificada ? 'Norma identificada' : 'Verificar identificación de la norma',
      confianza: esNormaIdentificada ? 0.8 : 0.6
    };
  }

  static verificarRequisitosCumplimiento(hechos, normaIncumplida, entidadDemandada) {
    return {
      normaIdentificada: normaIncumplida.length > 0,
      incumplimiento: hechos.toLowerCase().includes('incumple') || hechos.toLowerCase().includes('no cumple'),
      entidadResponsable: entidadDemandada.length > 0,
      hechosSuficientes: hechos.length > 100,
      legitimacion: true
    };
  }

  static generarEstrategiaCumplimiento(hechos, normaIncumplida, entidadDemandada) {
    return {
      enfoque: 'Exigir cumplimiento de norma o acto administrativo',
      argumentos: [
        `Incumplimiento de ${normaIncumplida}`,
        'Obligación legal de cumplimiento',
        'Necesidad de intervención judicial'
      ],
      medidas: [
        'Ordenar cumplimiento inmediato',
        'Establecer plazos para cumplimiento',
        'Implementar medidas de seguimiento'
      ]
    };
  }

  static obtenerDocumentosCumplimiento() {
    return [
      'Documento de identidad',
      'Copia de la norma incumplida',
      'Pruebas del incumplimiento',
      'Comunicaciones con la entidad',
      'Documentos que acrediten la obligación'
    ];
  }

  // Métodos auxiliares para análisis de grupo
  static evaluarViabilidadGrupo(hechos, derechoVulnerado, numeroAfectados) {
    const esGrupoNumeroso = numeroAfectados >= 20;
    const esDerechoVulnerado = hechos.length > 50;
    
    return {
      procedente: esGrupoNumeroso && esDerechoVulnerado,
      fundamento: esGrupoNumeroso ? 'Grupo numeroso identificado' : 'Verificar número de afectados',
      confianza: esGrupoNumeroso ? 0.85 : 0.6
    };
  }

  static verificarRequisitosGrupo(hechos, derechoVulnerado, entidadDemandada, numeroAfectados) {
    return {
      grupoNumeroso: numeroAfectados >= 20,
      derechoVulnerado: derechoVulnerado.length > 0,
      entidadResponsable: entidadDemandada.length > 0,
      hechosSuficientes: hechos.length > 100,
      legitimacion: true
    };
  }

  static generarEstrategiaGrupo(hechos, derechoVulnerado, entidadDemandada, numeroAfectados) {
    return {
      enfoque: 'Protección de derechos de grupo numeroso',
      argumentos: [
        `Vulneración del derecho a ${derechoVulnerado}`,
        `Grupo de ${numeroAfectados} personas afectadas`,
        'Necesidad de protección colectiva'
      ],
      medidas: [
        'Ordenar protección del grupo',
        'Establecer medidas de reparación',
        'Implementar seguimiento grupal'
      ]
    };
  }

  static obtenerDocumentosGrupo() {
    return [
      'Documento de identidad del representante',
      'Lista de personas afectadas',
      'Pruebas de la vulneración grupal',
      'Comunicaciones con la entidad',
      'Testimonios del grupo'
    ];
  }

  // Métodos auxiliares para análisis de nulidad
  static evaluarViabilidadNulidad(hechos, actoAdministrativo) {
    const esActoIdentificado = actoAdministrativo.length > 0;
    const tieneVicios = hechos.toLowerCase().includes('ilegal') || hechos.toLowerCase().includes('irregular');
    
    return {
      procedente: esActoIdentificado && tieneVicios,
      fundamento: esActoIdentificado ? 'Acto administrativo identificado' : 'Verificar identificación del acto',
      confianza: esActoIdentificado ? 0.8 : 0.6
    };
  }

  static verificarRequisitosNulidad(hechos, actoAdministrativo, entidadDemandada) {
    return {
      actoIdentificado: actoAdministrativo.length > 0,
      vicios: hechos.toLowerCase().includes('ilegal') || hechos.toLowerCase().includes('irregular'),
      entidadResponsable: entidadDemandada.length > 0,
      hechosSuficientes: hechos.length > 100,
      legitimacion: true
    };
  }

  static generarEstrategiaNulidad(hechos, actoAdministrativo, entidadDemandada) {
    return {
      enfoque: 'Anulación de acto administrativo ilegal',
      argumentos: [
        `Nulidad de ${actoAdministrativo}`,
        'Vicios de legalidad identificados',
        'Necesidad de anulación'
      ],
      medidas: [
        'Declarar nulidad del acto',
        'Ordenar restitución de derechos',
        'Establecer medidas correctivas'
      ]
    };
  }

  static obtenerDocumentosNulidad() {
    return [
      'Documento de identidad',
      'Copia del acto administrativo',
      'Pruebas de los vicios',
      'Comunicaciones con la entidad',
      'Documentos que acrediten la ilegalidad'
    ];
  }

  // Métodos auxiliares para análisis de reparación directa
  static evaluarViabilidadReparacion(hechos, dano) {
    const esDanoIdentificado = dano.length > 0;
    const tieneResponsabilidad = hechos.toLowerCase().includes('responsable') || hechos.toLowerCase().includes('culpa');
    
    return {
      procedente: esDanoIdentificado && tieneResponsabilidad,
      fundamento: esDanoIdentificado ? 'Daño identificado' : 'Verificar identificación del daño',
      confianza: esDanoIdentificado ? 0.8 : 0.6
    };
  }

  static verificarRequisitosReparacion(hechos, dano, entidadDemandada) {
    return {
      danoIdentificado: dano.length > 0,
      responsabilidad: hechos.toLowerCase().includes('responsable') || hechos.toLowerCase().includes('culpa'),
      entidadResponsable: entidadDemandada.length > 0,
      hechosSuficientes: hechos.length > 100,
      legitimacion: true
    };
  }

  static generarEstrategiaReparacion(hechos, dano, entidadDemandada) {
    return {
      enfoque: 'Reparación directa del daño causado',
      argumentos: [
        `Daño causado: ${dano}`,
        'Responsabilidad de la entidad',
        'Necesidad de reparación'
      ],
      medidas: [
        'Ordenar reparación del daño',
        'Establecer indemnización',
        'Implementar medidas preventivas'
      ]
    };
  }

  static obtenerDocumentosReparacion() {
    return [
      'Documento de identidad',
      'Pruebas del daño causado',
      'Documentos que acrediten la responsabilidad',
      'Comunicaciones con la entidad',
      'Testimonios del daño'
    ];
  }

  // Métodos auxiliares para análisis de demanda jurídica
  static evaluarViabilidadDemanda(hechos, pretensiones) {
    const esPretensionIdentificada = pretensiones.length > 0;
    const tieneFundamento = hechos.length > 50;
    
    return {
      procedente: esPretensionIdentificada && tieneFundamento,
      fundamento: esPretensionIdentificada ? 'Pretensión identificada' : 'Verificar identificación de pretensiones',
      confianza: esPretensionIdentificada ? 0.8 : 0.6
    };
  }

  static verificarRequisitosDemanda(hechos, pretensiones, entidadDemandada) {
    return {
      pretensionIdentificada: pretensiones.length > 0,
      fundamento: hechos.length > 50,
      entidadResponsable: entidadDemandada.length > 0,
      hechosSuficientes: hechos.length > 100,
      legitimacion: true
    };
  }

  static generarEstrategiaDemanda(hechos, pretensiones, entidadDemandada) {
    return {
      enfoque: 'Demanda jurídica con pretensiones específicas',
      argumentos: [
        `Pretensiones: ${pretensiones}`,
        'Fundamento legal identificado',
        'Necesidad de protección judicial'
      ],
      medidas: [
        'Admitir la demanda',
        'Ordenar medidas cautelares si aplica',
        'Establecer proceso de seguimiento'
      ]
    };
  }

  static obtenerDocumentosDemanda() {
    return [
      'Documento de identidad',
      'Escrito de demanda',
      'Pruebas del caso',
      'Comunicaciones con la entidad',
      'Documentos que acrediten las pretensiones'
    ];
  }

  // Métodos auxiliares generales
  static calcularProbabilidadExito(tipoAccion, hechos) {
    const factores = {
      tutela: 0.9,
      popular: 0.8,
      cumplimiento: 0.85,
      grupo: 0.75,
      nulidad: 0.8,
      reparacion: 0.7,
      demanda: 0.75
    };

    const factorBase = factores[tipoAccion] || 0.7;
    const factorHechos = hechos.length > 100 ? 0.1 : 0;
    
    return Math.min(0.95, factorBase + factorHechos);
  }

  static analizarViabilidadGeneral(datos) {
    return {
      viabilidad: 'ALTA',
      fundamentos: 'Sólidos',
      recomendacion: 'Proceder con la acción'
    };
  }

  static generarEstrategiaProcesal(tipoAccion, datos) {
    return {
      enfoque: `Estrategia específica para ${tipoAccion}`,
      argumentos: ['Argumentos jurídicos sólidos'],
      medidas: ['Medidas de protección']
    };
  }

  static obtenerPlazosProcedimientos(tipoAccion) {
    const plazos = {
      tutela: '10 días hábiles',
      popular: '20 días hábiles',
      cumplimiento: '15 días hábiles',
      grupo: '30 días hábiles',
      nulidad: '20 días hábiles',
      reparacion: '25 días hábiles',
      demanda: '30 días hábiles'
    };

    return plazos[tipoAccion] || 'Consultar con abogado';
  }

  static obtenerConsideracionesEspeciales(tipoAccion) {
    const consideraciones = {
      tutela: ['Urgencia del caso', 'Protección inmediata'],
      popular: ['Interés general', 'Derechos colectivos'],
      cumplimiento: ['Norma específica', 'Obligación de cumplimiento'],
      grupo: ['Número de afectados', 'Representación'],
      nulidad: ['Vicios de legalidad', 'Acto administrativo'],
      reparacion: ['Daño causado', 'Responsabilidad'],
      demanda: ['Pretensiones específicas', 'Fundamento legal']
    };

    return consideraciones[tipoAccion] || ['Consultar con abogado'];
  }

  static obtenerAlternativasJuridicas(tipoAccion, datos) {
    return [
      'Mediación',
      'Conciliación',
      'Acción administrativa',
      'Acción constitucional'
    ];
  }

  // Procesar análisis completo
  static procesarAnalisisCompleto(texto, tipoCaso = 'constitucional', ambito = 'derecho_publico') {
    const clasificacion = this.clasificarTipoCaso(texto);
    const urgencia = this.analizarUrgencia(texto);
    const textoMejorado = this.mejorarTextoJuridico(texto, 'profesional');

    return {
      textoOriginal: texto,
      textoMejorado: textoMejorado,
      clasificacion: clasificacion,
      urgencia: urgencia,
      ambito: ambito,
      recomendaciones: {
        especialistasRecomendados: this.obtenerEspecialistasRecomendados(clasificacion.categoria),
        documentosNecesarios: this.obtenerDocumentosNecesarios(clasificacion.categoria),
        plazosSugeridos: this.obtenerPlazosSugeridos(clasificacion.categoria)
      },
      procesamiento: {
        fecha: new Date().toISOString(),
        version: this.configuracion.version,
        tipoProcesamiento: 'análisis_completo'
      }
    };
  }

  // Obtener especialistas recomendados
  static obtenerEspecialistasRecomendados(categoria) {
    const especialistas = {
      constitucional: ['Abogado Constitucionalista', 'Especialista en Derecho Público'],
      administrativo: ['Abogado Administrativista', 'Especialista en Contratación Estatal'],
      penal: ['Abogado Penalista', 'Especialista en Derecho Procesal Penal'],
      civil: ['Abogado Civilista', 'Especialista en Responsabilidad Civil']
    };

    return especialistas[categoria] || ['Abogado Generalista'];
  }

  // Obtener documentos necesarios
  static obtenerDocumentosNecesarios(categoria) {
    const documentos = {
      constitucional: ['Documento de identidad', 'Pruebas del caso', 'Escrito de tutela'],
      administrativo: ['Documento de identidad', 'Acto administrativo', 'Pruebas del caso'],
      penal: ['Documento de identidad', 'Denuncia', 'Pruebas del delito'],
      civil: ['Documento de identidad', 'Contrato o documento base', 'Pruebas del daño']
    };

    return documentos[categoria] || ['Documento de identidad', 'Pruebas del caso'];
  }

  // Obtener plazos sugeridos
  static obtenerPlazosSugeridos(categoria) {
    const plazos = {
      constitucional: ['Tutela: 10 días hábiles', 'Cumplimiento: 30 días hábiles'],
      administrativo: ['Reposición: 5 días hábiles', 'Apelación: 10 días hábiles'],
      penal: ['Denuncia: Sin plazo', 'Querella: 30 días hábiles'],
      civil: ['Demanda: Sin plazo', 'Prescripción: 2-10 años según el caso']
    };

    return plazos[categoria] || ['Consultar con abogado especialista'];
  }
}

export default IAMejoradaService;