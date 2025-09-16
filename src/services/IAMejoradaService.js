// SERVICIO DE IA MEJORADA - CSDT
// Sistema de procesamiento de lenguaje natural para el Consejo Social de Veeduría y Desarrollo Territorial

class IAMejoradaService {
  
  // Configuración del sistema
  static configuracion = {
    version: '1.0.0',
    nombre: 'Sistema de IA Mejorada CSDT',
    descripcion: 'Procesamiento de lenguaje natural para mejorar respuestas jurídicas',
    modelos: ['clasificador-legal', 'mejorador-texto']
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
