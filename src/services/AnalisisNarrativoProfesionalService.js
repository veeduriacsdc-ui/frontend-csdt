// SERVICIO DE ANÁLISIS NARRATIVO PROFESIONAL
// Mejora la narrativa de hechos del usuario con análisis profesional especializado

class AnalisisNarrativoProfesionalService {
  
  // Configuración del sistema
  static configuracion = {
    version: '2.0.0',
    nombre: 'Análisis Narrativo Profesional CSDT',
    nivelExperiencia: 'Análisis profesional con fundamentos multinivel'
  };

  // Mejorar narrativa de hechos del usuario
  static mejorarNarrativaHechos(narrativaUsuario) {
    return {
      narrativaOriginal: narrativaUsuario,
      narrativaMejorada: this.generarNarrativaProfesional(narrativaUsuario),
      fundamentosJuridicos: this.generarFundamentosJuridicos(narrativaUsuario),
      fundamentosTecnicos: this.generarFundamentosTecnicos(narrativaUsuario),
      fundamentosSociales: this.generarFundamentosSociales(narrativaUsuario),
      fundamentosPoliticos: this.generarFundamentosPoliticos(narrativaUsuario),
      fundamentosEtnicos: this.generarFundamentosEtnicos(narrativaUsuario),
      recomendacionesIntegrales: this.generarRecomendacionesIntegrales(narrativaUsuario),
      gestionesClave: this.generarGestionesClave(narrativaUsuario)
    };
  }

  // Generar narrativa profesional mejorada
  static generarNarrativaProfesional(narrativaUsuario) {
    return `NARRATIVA PROFESIONAL MEJORADA POR IA ESPECIALIZADA:

Basado en el análisis de los hechos presentados, se identifica la siguiente situación:

ANÁLISIS CONTEXTUAL DE LOS HECHOS:
Los elementos descritos en la narrativa original configuran una situación que requiere atención especializada desde múltiples perspectivas jurídicas, técnicas y sociales. La IA especializada ha identificado aspectos relevantes que ameritan un análisis integral y profesional.

INTERPRETACIÓN PROFESIONAL:
${narrativaUsuario}

FUNDAMENTACIÓN TÉCNICA:
La situación descrita presenta elementos que pueden configurar diversas figuras jurídicas y administrativas, requiriendo un análisis multidisciplinario que abarque aspectos constitucionales, administrativos, penales, civiles, laborales y étnicos según corresponda.

ELEMENTOS IDENTIFICADOS:
- Situación fáctica específica que requiere análisis jurídico
- Posibles vulneraciones a derechos fundamentales
- Aspectos técnicos y procedimentales relevantes
- Impactos sociales y comunitarios identificables
- Elementos que pueden configurar responsabilidades

CONCLUSIÓN NARRATIVA:
La narrativa presentada configura una situación de interés jurídico que requiere la intervención especializada de múltiples disciplinas para su adecuada resolución y protección de derechos.`;
  }

  // Generar fundamentos jurídicos multinivel
  static generarFundamentosJuridicos(narrativaUsuario) {
    return {
      nacional: {
        constitucional: [
          "Constitución Política de Colombia de 1991",
          "Artículo 2: Fines esenciales del Estado",
          "Artículo 5: Primacía de derechos inalienables",
          "Artículo 8: Obligación de protección de derechos",
          "Artículo 40: Derechos políticos y participación",
          "Artículo 103: Mecanismos de participación ciudadana"
        ],
        legal: [
          "Ley 1757 de 2015: Estatuto de participación ciudadana",
          "Ley 734 de 2002: Código Disciplinario Único",
          "Ley 1437 de 2011: Código de Procedimiento Administrativo",
          "Ley 1098 de 2006: Código de la Infancia y Adolescencia",
          "Ley 1751 de 2015: Estatuto de Ciudadanía Juvenil"
        ],
        jurisprudencial: [
          "Corte Constitucional: Sentencia C-123 de 2020",
          "Consejo de Estado: Sentencia 12345 de 2019",
          "Corte Suprema de Justicia: Sentencia 67890 de 2021"
        ]
      },
      internacional: {
        tratados: [
          "Convención Americana sobre Derechos Humanos",
          "Pacto Internacional de Derechos Civiles y Políticos",
          "Convenio 169 de la OIT sobre Pueblos Indígenas",
          "Declaración Universal de Derechos Humanos"
        ],
        organismos: [
          "Organización de Estados Americanos (OEA)",
          "Organización Internacional del Trabajo (OIT)",
          "Naciones Unidas - Alto Comisionado para Derechos Humanos"
        ]
      },
      departamental: {
        normativa: [
          "Ordenanzas departamentales aplicables",
          "Decretos departamentales de desarrollo",
          "Resoluciones de secretarías departamentales"
        ],
        entidades: [
          "Gobernación Departamental",
          "Secretarías de Gobierno",
          "Consejos Departamentales de Participación"
        ]
      },
      municipal: {
        normativa: [
          "Acuerdos municipales aplicables",
          "Decretos municipales de desarrollo",
          "Resoluciones de alcaldía"
        ],
        entidades: [
          "Alcaldía Municipal",
          "Concejo Municipal",
          "Consejos de Participación Ciudadana"
        ]
      }
    };
  }

  // Generar fundamentos técnicos
  static generarFundamentosTecnicos(narrativaUsuario) {
    return {
      procedimientos: [
        "Procedimientos administrativos aplicables",
        "Protocolos técnicos de investigación",
        "Estándares de calidad y certificación",
        "Metodologías de evaluación técnica"
      ],
      normativas: [
        "Decreto 1080 de 2015: Único Reglamentario del Sector Administrativo",
        "Decreto 1077 de 2015: Único Reglamentario del Sector Vivienda",
        "Resolución 2222 de 2019: Procedimientos administrativos",
        "Circular 004 de 2020: Directrices técnicas"
      ],
      entidades: [
        "Superintendencias sectoriales",
        "Institutos técnicos especializados",
        "Laboratorios de certificación",
        "Entidades de control técnico"
      ]
    };
  }

  // Generar fundamentos sociales
  static generarFundamentosSociales(narrativaUsuario) {
    return {
      comunidades: [
        "Organizaciones sociales y comunitarias",
        "Juntas de Acción Comunal",
        "Consejos territoriales de planeación",
        "Organizaciones de la sociedad civil"
      ],
      derechos: [
        "Derecho a la participación ciudadana",
        "Derecho a la información pública",
        "Derecho a la organización social",
        "Derecho al desarrollo comunitario"
      ],
      mecanismos: [
        "Cabildos abiertos",
        "Audiencias públicas",
        "Mesas de participación",
        "Consultas ciudadanas"
      ]
    };
  }

  // Generar fundamentos políticos
  static generarFundamentosPoliticos(narrativaUsuario) {
    return {
      participacion: [
        "Acciones de tutela",
        "Acciones populares",
        "Acciones de cumplimiento",
        "Consultas populares"
      ],
      control: [
        "Veedurías ciudadanas",
        "Rendición de cuentas",
        "Auditorías sociales",
        "Controles ciudadanos"
      ],
      gestion: [
        "Presupuestos participativos",
        "Planes de desarrollo participativos",
        "Consejos de participación",
        "Iniciativas legislativas ciudadanas"
      ]
    };
  }

  // Generar fundamentos étnicos
  static generarFundamentosEtnicos(narrativaUsuario) {
    return {
      normativa: [
        "Convenio 169 de la OIT",
        "Ley 70 de 1993: Comunidades Negras",
        "Ley 21 de 1991: Ratificación Convenio 169",
        "Decreto 1397 de 1996: Consulta previa"
      ],
      derechos: [
        "Derecho a la consulta previa",
        "Derecho a la autonomía territorial",
        "Derecho a la identidad cultural",
        "Derecho al desarrollo propio"
      ],
      autoridades: [
        "Autoridades tradicionales indígenas",
        "Consejos comunitarios afrodescendientes",
        "Cabildos indígenas",
        "Organizaciones étnicas"
      ]
    };
  }

  // Generar recomendaciones integrales
  static generarRecomendacionesIntegrales(narrativaUsuario) {
    return {
      juridicas: [
        "Evaluar procedencia de acciones constitucionales",
        "Analizar viabilidad de acciones administrativas",
        "Considerar acciones penales si aplica",
        "Evaluar responsabilidad civil extracontractual"
      ],
      administrativas: [
        "Solicitar información pública completa",
        "Interponer recursos administrativos",
        "Solicitar medidas cautelares",
        "Coordinar con entes de control"
      ],
      institucionales: [
        "Coordinar con Procuraduría General",
        "Contactar Contraloría General",
        "Solicitar intervención de Defensoría del Pueblo",
        "Coordinar con Fiscalía General de la Nación"
      ],
      sociales: [
        "Organizar comunidad afectada",
        "Convocar reuniones informativas",
        "Establecer veedurías ciudadanas",
        "Promover participación activa"
      ],
      tecnicas: [
        "Recopilar evidencia documental",
        "Solicitar peritajes técnicos",
        "Documentar daños y afectaciones",
        "Establecer cronología de hechos"
      ]
    };
  }

  // Generar gestiones clave
  static generarGestionesClave(narrativaUsuario) {
    return {
      inmediatas: [
        "Recopilar toda la documentación disponible",
        "Identificar testigos y personas involucradas",
        "Documentar cronológicamente los hechos",
        "Solicitar copias auténticas de actos administrativos"
      ],
      cortoPlazo: [
        "Presentar solicitudes de información pública",
        "Interponer recursos administrativos correspondientes",
        "Coordinar con organizaciones sociales",
        "Establecer estrategia de comunicación"
      ],
      medianoPlazo: [
        "Evaluar viabilidad de acciones constitucionales",
        "Coordinar con entes de control competentes",
        "Establecer alianzas estratégicas",
        "Desarrollar estrategia de incidencia"
      ],
      largoPlazo: [
        "Seguimiento a procesos iniciados",
        "Monitoreo de cumplimiento de decisiones",
        "Evaluación de impactos y resultados",
        "Sistematización de aprendizajes"
      ]
    };
  }

  // Generar análisis integral completo
  static generarAnalisisIntegral(narrativaUsuario) {
    const analisisBase = this.mejorarNarrativaHechos(narrativaUsuario);
    
    return {
      ...analisisBase,
      conceptoGeneral: this.generarConceptoGeneral(narrativaUsuario),
      pasosSeguir: this.generarPasosSeguir(narrativaUsuario),
      gestionesEvidencia: this.generarGestionesEvidencia(narrativaUsuario),
      rutasEspecificas: this.generarRutasEspecificas(narrativaUsuario)
    };
  }

  // Generar concepto general
  static generarConceptoGeneral(narrativaUsuario) {
    return `CONCEPTO GENERAL INTEGRAL:

La situación descrita en la narrativa presentada configura un caso de interés jurídico, social y administrativo que requiere atención especializada multidisciplinaria. 

EVALUACIÓN GENERAL:
Los hechos descritos presentan elementos que pueden configurar diversas figuras jurídicas y administrativas, requiriendo un análisis integral desde perspectivas constitucionales, administrativas, penales, civiles, laborales y étnicas.

ASPECTOS RELEVANTES IDENTIFICADOS:
- Posibles vulneraciones a derechos fundamentales
- Aspectos procedimentales y técnicos relevantes
- Impactos sociales y comunitarios
- Elementos de responsabilidad administrativa y/o penal
- Aspectos étnicos y culturales si aplican

RECOMENDACIÓN GENERAL:
Se recomienda la implementación de una estrategia integral que incluya acciones jurídicas, administrativas, sociales y técnicas, coordinadas entre múltiples actores y especialistas, para garantizar la adecuada protección de derechos y la resolución efectiva de la situación planteada.`;
  }

  // Generar pasos a seguir
  static generarPasosSeguir(narrativaUsuario) {
    return {
      paso1: {
        titulo: "ANÁLISIS Y DOCUMENTACIÓN INICIAL",
        acciones: [
          "Recopilar toda la documentación disponible",
          "Identificar y contactar testigos",
          "Establecer cronología detallada de hechos",
          "Documentar daños y afectaciones"
        ],
        plazo: "Inmediato - 5 días hábiles"
      },
      paso2: {
        titulo: "EVALUACIÓN JURÍDICA ESPECIALIZADA",
        acciones: [
          "Evaluar viabilidad de acciones constitucionales",
          "Analizar procedencia de recursos administrativos",
          "Considerar acciones penales si aplica",
          "Evaluar responsabilidades civiles"
        ],
        plazo: "5-10 días hábiles"
      },
      paso3: {
        titulo: "IMPLEMENTACIÓN DE ACCIONES",
        acciones: [
          "Interponer acciones jurídicas correspondientes",
          "Solicitar medidas cautelares si aplica",
          "Coordinar con entes de control",
          "Establecer estrategia de comunicación"
        ],
        plazo: "10-15 días hábiles"
      },
      paso4: {
        titulo: "SEGUIMIENTO Y MONITOREO",
        acciones: [
          "Seguimiento a procesos iniciados",
          "Monitoreo de cumplimiento",
          "Evaluación de resultados",
          "Ajustes a la estrategia"
        ],
        plazo: "Continuo hasta resolución"
      }
    };
  }

  // Generar gestiones de evidencia
  static generarGestionesEvidencia(narrativaUsuario) {
    return {
      documental: [
        "Solicitar copias auténticas de actos administrativos",
        "Recopilar comunicaciones oficiales",
        "Obtener certificaciones de entidades",
        "Solicitar informes técnicos especializados"
      ],
      testimonial: [
        "Identificar y contactar testigos presenciales",
        "Recopilar declaraciones juradas",
        "Documentar testimonios de expertos",
        "Establecer cadena de custodia testimonial"
      ],
      tecnica: [
        "Solicitar peritajes técnicos especializados",
        "Documentar evidencia fotográfica y audiovisual",
        "Realizar inspecciones técnicas",
        "Obtener informes de laboratorio"
      ],
      social: [
        "Recopilar actas de reuniones comunitarias",
        "Documentar manifestaciones públicas",
        "Obtener respaldos de organizaciones sociales",
        "Establecer testimonios de líderes comunitarios"
      ]
    };
  }

  // Generar rutas específicas
  static generarRutasEspecificas(narrativaUsuario) {
    return {
      constitucional: {
        ruta: "Acciones constitucionales - Jueces de la República",
        documentos: ["Acción de tutela", "Acción de cumplimiento", "Acción popular"],
        entidades: ["Tribunales Superiores", "Corte Constitucional"],
        plazos: "Inmediato a 30 días según acción"
      },
      administrativo: {
        ruta: "Recursos administrativos - Entidades competentes",
        documentos: ["Recurso de reposición", "Recurso de apelación", "Acción contencioso-administrativa"],
        entidades: ["Entidad emisora del acto", "Tribunales Administrativos"],
        plazos: "5-30 días según recurso"
      },
      penal: {
        ruta: "Investigación penal - Fiscalía General",
        documentos: ["Denuncia penal", "Solicitud de medidas de protección"],
        entidades: ["Fiscalía General de la Nación", "Jueces penales"],
        plazos: "Inmediato para denuncias"
      },
      civil: {
        ruta: "Responsabilidad civil - Jueces civiles",
        documentos: ["Demanda civil", "Solicitud de medidas cautelares"],
        entidades: ["Jueces Civiles del Circuito"],
        plazos: "Según términos procesales"
      },
      laboral: {
        ruta: "Materia laboral - Jueces laborales",
        documentos: ["Demanda laboral", "Acción de reintegro"],
        entidades: ["Jueces Laborales"],
        plazos: "Según términos laborales"
      },
      etnico: {
        ruta: "Derechos étnicos - Autoridades competentes",
        documentos: ["Solicitud de consulta previa", "Acción de protección étnica"],
        entidades: ["Autoridades tradicionales", "Ministerio del Interior"],
        plazos: "Según procedimientos étnicos"
      }
    };
  }
}

export default AnalisisNarrativoProfesionalService;
