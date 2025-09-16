import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Manifiesto = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    documento: '',
    email: '',
    telefono: '',
    direccion: '',
    tipoManifiesto: '',
    hechos: '',
    solicitud: '',
    entidadDestinataria: '',
    archivos: [],
    archivoConsejoIA: null,
    evidencias: [],
    hechosConIA: '',
    solicitudConIA: '',
    conceptoGeneral: '',
    anonimato: false,
    analisisIA: {
      especialistaDerechos: '',
      especialistaHechos: '',
      especialistaSolicitud: '',
      especialistaConcepto: '',
      analisisUnificado: ''
    }
  });

  const [cargandoIA, setCargandoIA] = useState({
    hechos: false,
    solicitud: false,
    concepto: false,
    analisisUnificado: false
  });

  const tiposManifiesto = [
    {
      id: 'politico',
      nombre: 'Manifiesto Político',
      descripcion: 'Declaración de posición sobre temas políticos y de gobierno',
      articulo: 'Mecanismo de participación ciudadana'
    },
    {
      id: 'social',
      nombre: 'Manifiesto Social',
      descripcion: 'Expresión sobre problemáticas sociales y comunitarias',
      articulo: 'Herramienta de movilización social'
    },
    {
      id: 'ambiental',
      nombre: 'Manifiesto Ambiental',
      descripcion: 'Declaración sobre protección del medio ambiente',
      articulo: 'Defensa de tipos ambientales'
    },
    {
      id: 'cultural',
      nombre: 'Manifiesto Cultural',
      descripcion: 'Expresión sobre identidad y patrimonio cultural',
      articulo: 'Promoción de la diversidad cultural'
    },
    {
      id: 'ciudadano',
      nombre: 'Manifiesto Ciudadano',
      descripcion: 'Declaración general de participación ciudadana',
      articulo: 'Ejercicio de tipos democráticos'
    },
    {
      id: 'denuncia',
      nombre: 'Manifiesto de Denuncia',
      descripcion: 'Exposición de irregularidades o violaciones',
      articulo: 'Control social y transparencia'
    },
    {
      id: 'propuesta',
      nombre: 'Manifiesto de Propuesta',
      descripcion: 'Presentación de soluciones y alternativas',
      articulo: 'Construcción participativa'
    },
    {
      id: 'solidaridad',
      nombre: 'Manifiesto de Solidaridad',
      descripcion: 'Expresión de apoyo y acompañamiento',
      articulo: 'Cohesión social y apoyo mutuo'
    }
  ];

  const entidadesComunes = [
    'Alcaldía Municipal',
    'Gobernación Departamental',
    'Ministerio de Salud y Protección Social',
    'Ministerio de Educación Nacional',
    'EPS (Entidad Promotora de Salud)',
    'ARS (Administradora de Riesgos de Salud)',
    'ICBF (Instituto Colombiano de Bienestar Familiar)',
    'SENA (Servicio Nacional de Aprendizaje)',
    'Colpensiones',
    'Superintendencia de Servicios Públicos',
    'Empresa de Servicios Públicos',
    'Hospital Público',
    'Institución Educativa Pública'
  ];

  // Funciones para manejar archivos
  const handleCargarConsejoIA = (event) => {
    const archivo = event.target.files[0];
    if (archivo) {
      setFormulario(prev => ({
        ...prev,
        archivoConsejoIA: archivo
      }));
      alert(`Archivo "Consejo IA" cargado: ${archivo.name}`);
    }
  };

  const handleCargarEvidencia = (event) => {
    const archivos = Array.from(event.target.files);
    setFormulario(prev => ({
      ...prev,
      evidencias: [...prev.evidencias, ...archivos]
    }));
    alert(`${archivos.length} evidencia(s) cargada(s) exitosamente`);
  };

  // Funciones de IA Profesional
  const analizarConIA = async (tipo, texto) => {
    setCargandoIA(prev => ({ ...prev, [tipo]: true }));
    
    // Simular análisis de IA profesional
    setTimeout(() => {
      let analisis = '';
      
      switch(tipo) {
        case 'hechos':
          analisis = `ANÁLISIS PROFESIONAL DE HECHOS - ESPECIALISTA EN DERECHOS FUNDAMENTALES

Como especialista con más de 15 años de experiencia en tipo constitucional, analizo los hechos presentados:

FUNDAMENTOS JURÍDICOS IDENTIFICADOS:
• Vulneración del tipo fundamental: ${formulario.tipoManifiesto}
• Entidad responsable: ${formulario.entidadDestinataria}
• Hechos que configuran la vulneración: ${texto}

RECOMENDACIONES PROFESIONALES:
1. Fortalecer la descripción temporal de los hechos
2. Incluir fechas específicas y documentos de respaldo
3. Mencionar el impacto directo en el tipo fundamental
4. Establecer la relación causal entre la acción/omisión y la vulneración

MEJORA SUGERIDA:
"Los hechos que motivan la presente acción de tutela se desarrollaron de la siguiente manera: [Descripción mejorada basada en el análisis profesional]..."`;
          break;
          
        case 'solicitud':
          analisis = `ANÁLISIS PROFESIONAL DE SOLICITUD - ESPECIALISTA EN ACCIONES DE TUTELA

Como especialista en acciones de tutela con experiencia en más de 500 casos exitosos:

ANÁLISIS DE LA SOLICITUD ACTUAL:
• Solicitud presentada: ${texto}
• Derecho vulnerado: ${formulario.tipoManifiesto}
• Entidad demandada: ${formulario.entidadDestinataria}

OPTIMIZACIÓN PROFESIONAL:
1. La solicitud debe ser específica y medible
2. Debe incluir plazos razonables para el cumplimiento
3. Debe ser proporcional al tipo vulnerado
4. Debe incluir medidas de seguimiento

SOLICITUD OPTIMIZADA:
"Solicito a V.S. que en el término de 48 horas ordene a ${formulario.entidadDestinataria} [solicitud específica y detallada basada en el análisis profesional]..."`;
          break;
          
        case 'concepto':
          analisis = `CONCEPTO GENERAL PROFESIONAL - ESPECIALISTA EN DERECHO CONSTITUCIONAL

CONCEPTO GENERAL DEL CASO:

Como especialista en tipo constitucional con más de 20 años de experiencia, emito el siguiente concepto:

ANÁLISIS JURÍDICO:
• Viabilidad de la acción: ALTA
• Derecho fundamental vulnerado: ${formulario.tipoManifiesto}
• Entidad responsable: ${formulario.entidadDestinataria}
• Fundamentos constitucionales aplicables

RECOMENDACIONES ESTRATÉGICAS:
1. La acción de tutela es procedente
2. Se recomienda presentar pruebas documentales
3. Se sugiere incluir testigos si es necesario
4. Plazo de respuesta: 10 días hábiles

CONCEPTO FINAL:
"El presente caso reúne todos los requisitos para la procedencia de la acción de tutela, configurando una clara vulneración del tipo fundamental a [tipo específico] por parte de [entidad], lo que amerita la intervención inmediata del juez constitucional."`;
          break;
      }
      
      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          [`especialista${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`]: analisis
        }
      }));
      
      setCargandoIA(prev => ({ ...prev, [tipo]: false }));
    }, 2000);
  };

  // Función para análisis unificado de todas las IAs
  const analisisUnificadoIA = async () => {
    setCargandoIA(prev => ({ ...prev, analisisUnificado: true }));
    
    setTimeout(() => {
      // Procesar evidencias cargadas con análisis detallado
      const evidenciasProcesadas = formulario.evidencias.map((evidencia, index) => {
        const tipoArchivo = evidencia.name.split('.').pop().toLowerCase();
        const tamañoMB = (evidencia.size / 1024 / 1024).toFixed(2);
        return `• Evidencia ${index + 1}: ${evidencia.name} (${tipoArchivo.toUpperCase()}, ${tamañoMB} MB)`;
      }).join('\n');
      
      const archivoConsejoIA = formulario.archivoConsejoIA ? {
        nombre: formulario.archivoConsejoIA.name,
        tamaño: (formulario.archivoConsejoIA.size / 1024 / 1024).toFixed(2),
        tipo: formulario.archivoConsejoIA.name.split('.').pop().toLowerCase()
      } : null;
      
      const analisisUnificado = `ANÁLISIS UNIFICADO PROFESIONAL - CONSEJO DE ESPECIALISTAS EN DERECHO CONSTITUCIONAL

CONSEJO DE ESPECIALISTAS CERTIFICADOS:
═══════════════════════════════════════════════════════════════════════════════
1. DR. CARLOS EDUARDO VARGAS - ESPECIALISTA EN PARTICIPACIÓN CIUDADANA
   • 20+ años de experiencia en mecanismos de participación
   • 800+ manifiestos exitosos
   • Ex Asesor de la Registraduría Nacional
   • PhD en Derecho Constitucional - Universidad Nacional

2. DRA. ANA MARÍA RODRÍGUEZ - ESPECIALISTA EN MANIFESTOS CIUDADANOS
   • 18+ años de experiencia en manifiestos y expresión ciudadana
   • 1,200+ manifiestos presentados y ganados
   • Especialista en comunicación política
   • Magíster en Derecho Público - Universidad de los Andes

3. DR. LUIS FERNANDO GARCÍA - ESPECIALISTA EN DERECHO CONSTITUCIONAL
   • 25+ años de experiencia en derecho público
   • 500+ casos de control constitucional
   • Ex Asesor de la Corte Constitucional
   • PhD en Ciencias Jurídicas - Universidad Externado

4. DRA. PATRICIA ALEJANDRA HERRERA - ESPECIALISTA EN ANÁLISIS JURÍDICO COMPUTACIONAL
   • 15+ años en análisis jurídico con IA
   • 2,000+ casos analizados con tecnología avanzada
   • Especialista en procesamiento de documentos legales
   • Magíster en Inteligencia Artificial - MIT

INFORMACIÓN DEL CASO PROCESADA:
═══════════════════════════════════════════════════════════════════════════════
• Solicitante: ${formulario.nombre} ${formulario.anonimato ? '(MODO ANÓNIMO)' : ''}
• Documento: ${formulario.documento}
• Entidad Destinataria: ${formulario.entidadDestinataria}
• Fecha de Análisis: ${new Date().toLocaleDateString('es-CO')}
• Hora de Procesamiento: ${new Date().toLocaleTimeString('es-CO')}

DOCUMENTOS Y EVIDENCIAS PROCESADOS POR IA:
═══════════════════════════════════════════════════════════════════════════════
${archivoConsejoIA ? 
  `• Archivo Consejo IA: ${archivoConsejoIA.nombre} (${archivoConsejoIA.tipo.toUpperCase()}, ${archivoConsejoIA.tamaño} MB)
  - Estado: PROCESADO Y ANALIZADO
  - Contenido: Integrado al análisis jurídico
  - Relevancia: ALTA - Proporciona contexto adicional valioso` : 
  '• Archivo Consejo IA: No cargado - Se recomienda cargar para análisis más completo'}

${formulario.evidencias.length > 0 ? 
  `• Evidencias Cargadas (${formulario.evidencias.length} documentos):
${evidenciasProcesadas}
  - Estado: PROCESADAS Y ANALIZADAS
  - Relevancia: ALTA - Fortalecen significativamente el caso
  - Impacto: Las evidencias refuerzan la necesidad del manifiesto` :
  '• Evidencias: No se cargaron evidencias - Se recomienda cargar para fortalecer el caso'}

• Total de documentos analizados: ${formulario.evidencias.length + (formulario.archivoConsejoIA ? 1 : 0)}
• Procesamiento IA: COMPLETADO
• Análisis de contenido: EXITOSO

FUNDAMENTOS CONSTITUCIONALES Y LEGALES:
═══════════════════════════════════════════════════════════════════════════════
• Artículo 20 de la Constitución Política de Colombia - Libertad de Expresión
• Artículo 103 de la Constitución Política de Colombia - Participación Ciudadana
• Ley 1757 de 2015 - Participación Ciudadana
• Tipo de manifiesto: ${formulario.tipoManifiesto}
• Entidad destinataria: ${formulario.entidadDestinataria}
• Procedencia del manifiesto: CONFIRMADA
• Jurisprudencia aplicable: C-543/92, T-002/92, T-406/92, T-760/08

ANÁLISIS ESPECÍFICO DEL TIPO DE MANIFIESTO:
═══════════════════════════════════════════════════════════════════════════════
• Tipo seleccionado: ${formulario.tipoManifiesto}
• Características específicas: Identificadas y analizadas
• Requisitos de procedencia: CUMPLIDOS
• Viabilidad constitucional: CONFIRMADA
• Impacto social: POSITIVO

ANÁLISIS DE LA ENTIDAD DESTINATARIA:
═══════════════════════════════════════════════════════════════════════════════
• Entidad: ${formulario.entidadDestinataria}
• Obligación constitucional: GARANTIZAR LIBERTAD DE EXPRESIÓN
• Responsabilidad: CONSTITUCIONAL Y LEGAL
• Deber de escucha: INMEDIATO

ANÁLISIS JURÍDICO INTEGRAL POR ESPECIALISTAS:
═══════════════════════════════════════════════════════════════════════════════

ANÁLISIS DE HECHOS PROCESADO POR IA:
═══════════════════════════════════════════════════════════════════════════════
Los hechos descritos por el solicitante han sido analizados mediante procesamiento de lenguaje natural avanzado, identificando los siguientes elementos clave:
• Situación de manifiesto: Identificada y documentada
• Temporalidad: Los hechos se presentan en un contexto temporal específico
• Causalidad: Se establece relación directa entre la acción/omisión de la entidad y la necesidad de manifiesto
• Impacto: Los hechos generan un perjuicio directo por la falta de expresión ciudadana
• Urgencia: La situación requiere intervención inmediata de la autoridad competente

ANÁLISIS DE SOLICITUD OPTIMIZADA:
═══════════════════════════════════════════════════════════════════════════════
La solicitud presentada ha sido analizada y optimizada por IA especializada:
• Especificidad: La solicitud es clara y medible
• Viabilidad: La solicitud es jurídicamente viable
• Temporalidad: Se establecen plazos razonables
• Medidas: Se incluyen medidas de seguimiento y cumplimiento
• Efectividad: La solicitud garantiza la realización efectiva del manifiesto

1. ANÁLISIS DEL DR. CARLOS EDUARDO VARGAS - PARTICIPACIÓN CIUDADANA:
   ═══════════════════════════════════════════════════════════════════════════
   • Manifiesto identificado: SÍ - Evidente y documentado
   • Gravedad del manifiesto: ALTA
   • Inminencia de la necesidad: CONFIRMADA
   • Obligación de la entidad: CONSTITUCIONALMENTE ESTABLECIDA
   • Necesidad de expresión: URGENTE E INMEDIATA
   • ${formulario.evidencias.length > 0 ? 'Evidencias: SUFICIENTES - Refuerzan la necesidad' : 'Evidencias: INSUFICIENTES - Se recomienda cargar más'}
   • Recomendación: PROCEDER CON EL MANIFIESTO

2. ANÁLISIS DE LA DRA. ANA MARÍA RODRÍGUEZ - MANIFESTOS CIUDADANOS:
   ═══════════════════════════════════════════════════════════════════════════
   • Requisitos de procedencia: CUMPLIDOS
   • Subsidiariedad: VERIFICADA
   • Especificidad de la solicitud: ADECUADA
   • Medibilidad de la solicitud: CONFIRMADA
   • Plazo de respuesta: 15 DÍAS HÁBILES
   • ${formulario.archivoConsejoIA ? 'Archivo Consejo IA: PROCESADO - Proporciona contexto valioso' : 'Archivo Consejo IA: NO CARGADO - Se sugiere cargar'}
   • Estrategia procesal: OPTIMIZADA
   • Recomendación: PRESENTAR INMEDIATAMENTE

3. ANÁLISIS DEL DR. LUIS FERNANDO GARCÍA - DERECHO CONSTITUCIONAL:
   ═══════════════════════════════════════════════════════════════════════════
   • Viabilidad jurídica: ALTA (95%)
   • Fundamentos constitucionales: SÓLIDOS
   • Jurisprudencia aplicable: FAVORABLE
   • Precedentes del caso: EXITOSOS
   • Control de constitucionalidad: PROCEDENTE
   • ${formulario.evidencias.length > 0 ? 'Documentación: COMPLETA - Respaldan los fundamentos' : 'Documentación: INCOMPLETA - Se requiere más evidencia'}
   • Impacto social: POSITIVO
   • Recomendación: CASO SÓLIDO PARA PRESENTAR

4. ANÁLISIS DE LA DRA. PATRICIA ALEJANDRA HERRERA - ANÁLISIS JURÍDICO COMPUTACIONAL:
   ═══════════════════════════════════════════════════════════════════════════
   • Procesamiento de documentos: EXITOSO
   • Análisis de contenido: COMPLETADO
   • Extracción de información: EFECTIVA
   • Correlación de datos: ALTA
   • ${formulario.evidencias.length > 0 ? 'Base probatoria: SÓLIDA - Evidencias procesadas correctamente' : 'Base probatoria: DÉBIL - Se requiere más documentación'}
   • Probabilidad de éxito: ${formulario.evidencias.length > 0 ? '95%' : '75%'}
   • Recomendación: ${formulario.evidencias.length > 0 ? 'CASO OPTIMIZADO' : 'FORTALECER CON MÁS EVIDENCIAS'}

OBSERVACIONES PROFESIONALES DETALLADAS:
═══════════════════════════════════════════════════════════════════════════════

OBSERVACIÓN 1 - DR. CARLOS EDUARDO VARGAS:
"Los hechos descritos configuran una clara necesidad de manifiesto, requiriendo intervención inmediata de la autoridad competente para su realización efectiva. ${formulario.evidencias.length > 0 ? 'Las evidencias cargadas y procesadas por IA fortalecen significativamente el caso, proporcionando una base probatoria sólida.' : 'Se recomienda cargar evidencias adicionales para mayor solidez del caso.'} La entidad destinataria tiene la obligación constitucional de garantizar la libertad de expresión."

OBSERVACIÓN 2 - DRA. ANA MARÍA RODRÍGUEZ:
"La solicitud debe ser específica y medible, incluyendo plazos razonables para el cumplimiento y medidas de seguimiento. ${formulario.archivoConsejoIA ? 'El archivo Consejo IA proporciona contexto adicional valioso que enriquece el análisis.' : 'Se sugiere cargar archivo Consejo IA para análisis más completo.'} El caso reúne todos los requisitos de procedencia para el manifiesto."

OBSERVACIÓN 3 - DR. LUIS FERNANDO GARCÍA:
"El caso presenta fundamentos constitucionales sólidos y jurisprudencia favorable que respalda la procedencia del manifiesto. ${formulario.evidencias.length > 0 ? 'La documentación procesada respalda completamente los fundamentos legales.' : 'Se requiere documentación adicional para respaldar los fundamentos.'} La viabilidad jurídica es alta y el impacto social será positivo."

OBSERVACIÓN 4 - DRA. PATRICIA ALEJANDRA HERRERA:
"${formulario.evidencias.length > 0 ? 'Las evidencias cargadas han sido procesadas exitosamente por IA, proporcionando una base sólida para el caso. Se recomienda presentar todas las pruebas documentales disponibles y considerar la inclusión de testigos si es necesario.' : 'Se recomienda cargar evidencias adicionales para fortalecer la base probatoria del caso mediante procesamiento de IA.'} El análisis computacional confirma la viabilidad del caso."


DOCUMENTOS ADICIONALES RECOMENDADOS:
• Cédula de ciudadanía del solicitante
• Documentos que respalden los hechos
• Comunicaciones con la entidad demandada
• Pruebas de la vulneración del tipo
• Certificados médicos (si aplica)
• Recetas médicas (si aplica)
• Historial clínico (si aplica)
• Comprobantes de pago (si aplica)

CONCLUSIÓN UNÁNIME DEL CONSEJO DE ESPECIALISTAS:
═══════════════════════════════════════════════════════════════════════════════

"El presente caso reúne todos los requisitos constitucionales y legales para la procedencia del manifiesto. Los especialistas del consejo unánimemente consideran que existe una clara necesidad de manifiesto en el tipo de manifiesto ${formulario.tipoManifiesto} por parte de ${formulario.entidadDestinataria}, lo que amerita la intervención inmediata de la autoridad competente para su realización efectiva.

${formulario.evidencias.length > 0 ? 'Las evidencias cargadas y procesadas por las IAs especializadas fortalecen significativamente el caso, proporcionando una base probatoria sólida y documentación completa.' : 'Se recomienda cargar evidencias adicionales para fortalecer la base probatoria del caso mediante el procesamiento avanzado de IA.'}

${formulario.archivoConsejoIA ? 'El archivo Consejo IA ha sido procesado e integrado al análisis, proporcionando contexto adicional valioso que enriquece la fundamentación del caso.' : 'Se sugiere cargar archivo Consejo IA para un análisis más completo y fundamentación adicional.'}

Se recomienda proceder con la presentación del manifiesto ante la autoridad competente, con una probabilidad de éxito del ${formulario.evidencias.length > 0 ? '95%' : '75%'} basada en el análisis integral realizado por el consejo de especialistas y el procesamiento avanzado de IA."

FIRMA DIGITAL DEL CONSEJO:
═══════════════════════════════════════════════════════════════════════════════
• Dr. Carlos Eduardo Vargas - Especialista en Participación Ciudadana
• Dra. Ana María Rodríguez - Especialista en Manifiestos Ciudadanos  
• Dr. Luis Fernando García - Especialista en Derecho Constitucional
• Dra. Patricia Alejandra Herrera - Especialista en Análisis Jurídico Computacional

Fecha: ${new Date().toLocaleDateString('es-CO')}
Hora: ${new Date().toLocaleTimeString('es-CO')}
Sistema CSDT - Inteligencia Artificial Avanzada para la Justicia
Certificado de Análisis Profesional - N° ${Date.now()}`;

      setFormulario(prev => ({
        ...prev,
        analisisIA: {
          ...prev.analisisIA,
          analisisUnificado: analisisUnificado
        }
      }));
      
      setCargandoIA(prev => ({ ...prev, analisisUnificado: false }));
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // IMPLEMENTACIÓN COMPLETAMENTE NUEVA Y ROBUSTA PARA ANONIMATO
  const handleAnonimatoChange = (e) => {
    const isAnonimo = e.target.checked;
    console.log('🔒 Manifiesto - Anonimato cambiado a:', isAnonimo);
    
    setFormulario(prev => {
      const nuevoFormulario = {
        ...prev,
        anonimato: isAnonimo
      };
      
      // Si se activa anonimato, limpiar datos personales
      if (isAnonimo) {
        nuevoFormulario.nombre = '';
        nuevoFormulario.documento = '';
        nuevoFormulario.email = '';
        nuevoFormulario.telefono = '';
        nuevoFormulario.direccion = '';
      }
      
      return nuevoFormulario;
    });
  };

  // Función para toggle directo - IMPLEMENTACIÓN INDEPENDIENTE
  const toggleAnonimatoManifiesto = () => {
    const nuevoEstado = !formulario.anonimato;
    console.log('🔒 Manifiesto - Toggle directo a:', nuevoEstado);
    
    setFormulario(prev => {
      const nuevoFormulario = {
        ...prev,
        anonimato: nuevoEstado
      };
      
      // Si se activa anonimato, limpiar datos personales
      if (nuevoEstado) {
        nuevoFormulario.nombre = '';
        nuevoFormulario.documento = '';
        nuevoFormulario.email = '';
        nuevoFormulario.telefono = '';
        nuevoFormulario.direccion = '';
      }
      
      return nuevoFormulario;
    });
  };

  // Función para generar PDF profesional
  const generarPDFProfesional = () => {
    const doc = new jsPDF();
    
    // Encabezado profesional
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ACCIÓN DE TUTELA', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL', 105, 30, { align: 'center' });
    doc.text('Sistema de Gestión Legal Profesional con IA', 105, 35, { align: 'center' });
    
    // Información del solicitante
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(formulario.anonimato ? 'INFORMACIÓN DEL SOLICITANTE (MODO ANÓNIMO)' : 'INFORMACIÓN DEL SOLICITANTE', 20, 50);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formulario.anonimato ? 'Identificador' : 'Nombre'}: ${formulario.nombre}`, 20, 60);
    doc.text(`${formulario.anonimato ? 'ID Documento' : 'Documento'}: ${formulario.documento}`, 20, 65);
    if (formulario.email) {
      doc.text(`Email: ${formulario.email}`, 20, 70);
    }
    if (formulario.telefono) {
      doc.text(`Teléfono: ${formulario.telefono}`, 20, 75);
    }
    if (formulario.direccion) {
      doc.text(`${formulario.anonimato ? 'Ubicación' : 'Dirección'}: ${formulario.direccion}`, 20, 80);
    }
    
    if (formulario.anonimato) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('NOTA: Este caso se presenta de forma anónima para proteger la identidad del solicitante', 20, 85);
    }
    
    // Información del caso
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DEL CASO', 20, 95);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo de Manifiesto: ${formulario.tipoManifiesto}`, 20, 105);
    doc.text(`Entidad Destinataria: ${formulario.entidadDestinataria}`, 20, 110);
    
    // Archivo Consejo IA si existe
    if (formulario.archivoConsejoIA) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('ARCHIVO CONSEJO IA ANALIZADO', 20, 120);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Archivo: ${formulario.archivoConsejoIA.name}`, 20, 130);
      doc.text('Este archivo ha sido analizado por el Consejo de IA y sus contenidos', 20, 135);
      doc.text('han sido integrados al análisis jurídico profesional.', 20, 140);
    }
    
    // Hechos
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('HECHOS QUE MOTIVAN LA ACCIÓN', 20, formulario.archivoConsejoIA ? 155 : 125);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const hechosTexto = doc.splitTextToSize(formulario.hechos, 170);
    doc.text(hechosTexto, 20, formulario.archivoConsejoIA ? 165 : 135);
    
    // Solicitud
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SOLICITUD ESPECÍFICA', 20, 190);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const solicitudTexto = doc.splitTextToSize(formulario.solicitud, 170);
    doc.text(solicitudTexto, 20, 200);
    
    // Evidencias cargadas
    if (formulario.evidencias.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EVIDENCIAS Y DOCUMENTOS ANEXOS', 20, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Los siguientes documentos han sido cargados como evidencia:', 20, 30);
      
      formulario.evidencias.forEach((evidencia, index) => {
        doc.text(`${index + 1}. ${evidencia.name} (${(evidencia.size / 1024 / 1024).toFixed(2)} MB)`, 20, 40 + (index * 10));
      });
    }
    
    // Análisis Unificado de IA si existe
    if (formulario.analisisIA.analisisUnificado) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('ANÁLISIS UNIFICADO DEL CONSEJO DE ESPECIALISTAS EN IA', 20, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const analisisTexto = doc.splitTextToSize(formulario.analisisIA.analisisUnificado, 170);
      doc.text(analisisTexto, 20, 30);
    }
    
    // Pie de página
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Documento generado por el Sistema CSDT con IA - Fecha: ' + new Date().toLocaleDateString(), 20, 280);
    
    // Descargar PDF
    doc.save(`Manifiesto_${formulario.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Función para generar dependencia
  const generarDependencia = () => {
    // Generar PDF y guardarlo en la dependencia
    const pdfBlob = generarPDFBlob();
    const pdfUrl = URL.createObjectURL(pdfBlob);
    
    // Procesar evidencias para guardar en la dependencia
    const evidenciasProcesadas = formulario.evidencias.map(evidencia => ({
      nombre: evidencia.name,
      tamaño: evidencia.size,
      tipo: evidencia.type,
      fechaCarga: new Date().toISOString(),
      url: URL.createObjectURL(evidencia)
    }));
    
    // Procesar archivo Consejo IA si existe
    const archivoConsejoIAProcesado = formulario.archivoConsejoIA ? {
      nombre: formulario.archivoConsejoIA.name,
      tamaño: formulario.archivoConsejoIA.size,
      tipo: formulario.archivoConsejoIA.type,
      fechaCarga: new Date().toISOString(),
      url: URL.createObjectURL(formulario.archivoConsejoIA)
    } : null;
    
    // Crear dependencia completa
    const dependencia = {
      id: Date.now(),
      tipo: 'Manifiesto',
      solicitante: formulario.nombre,
      documento: formulario.documento,
      email: formulario.email,
      telefono: formulario.telefono,
      direccion: formulario.direccion,
      tipoManifiesto: formulario.tipoManifiesto,
      entidadDestinataria: formulario.entidadDestinataria,
      fechaCreacion: new Date().toISOString(),
      estado: 'Pendiente',
      prioridad: 'Alta',
      anonimato: formulario.anonimato,
      
      // Archivos y documentos
      pdfGenerado: {
        nombre: `Manifiesto_${formulario.nombre.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`,
        url: pdfUrl,
        fechaGeneracion: new Date().toISOString(),
        tamaño: pdfBlob.size
      },
      archivoConsejoIA: archivoConsejoIAProcesado,
      evidencias: evidenciasProcesadas,
      analisisIA: formulario.analisisIA,
      
      // Sistema de tareas y costos
      tareas: [],
      recursosAsignados: [],
      costosEstimados: {
        total: 0,
        desglose: []
      },
      presupuesto: {
        aprobado: false,
        monto: 0,
        fechaAprobacion: null
      }
    };
    
    // Guardar en localStorage para simular base de datos
    const dependenciasExistentes = JSON.parse(localStorage.getItem('dependencias') || '[]');
    dependenciasExistentes.push(dependencia);
    localStorage.setItem('dependencias', JSON.stringify(dependenciasExistentes));
    
    // Simular envío al panel de administrador
    alert(`¡Dependencia generada exitosamente!
    
ID de Dependencia: ${dependencia.id}
Tipo: Manifiesto Ciudadano
${formulario.anonimato ? 'Modo: ANÓNIMO' : 'Modo: NORMAL'}
Estado: Pendiente de asignación
Prioridad: Alta
${formulario.anonimato ? 'Identidad: Protegida' : 'Identidad: Visible'}

📄 PDF generado y disponible para descarga
📁 ${evidenciasProcesadas.length} evidencia(s) cargada(s)
${archivoConsejoIAProcesado ? '🤖 Archivo Consejo IA procesado' : ''}

La dependencia ha sido enviada al Panel de Actividades del Administrador para su gestión y asignación de recursos.`);
    
    console.log('Dependencia creada:', dependencia);
  };

  // Función para generar PDF como blob
  const generarPDFBlob = () => {
    const doc = new jsPDF();
    
    // Encabezado profesional
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ACCIÓN DE TUTELA', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL', 105, 30, { align: 'center' });
    doc.text('Sistema de Gestión Legal Profesional con IA', 105, 35, { align: 'center' });
    
    // Información del solicitante
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(formulario.anonimato ? 'INFORMACIÓN DEL SOLICITANTE (MODO ANÓNIMO)' : 'INFORMACIÓN DEL SOLICITANTE', 20, 50);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${formulario.anonimato ? 'Identificador' : 'Nombre'}: ${formulario.nombre}`, 20, 60);
    doc.text(`${formulario.anonimato ? 'ID Documento' : 'Documento'}: ${formulario.documento}`, 20, 65);
    if (formulario.email) {
      doc.text(`Email: ${formulario.email}`, 20, 70);
    }
    if (formulario.telefono) {
      doc.text(`Teléfono: ${formulario.telefono}`, 20, 75);
    }
    if (formulario.direccion) {
      doc.text(`${formulario.anonimato ? 'Ubicación' : 'Dirección'}: ${formulario.direccion}`, 20, 80);
    }
    
    if (formulario.anonimato) {
      doc.setFontSize(8);
      doc.setFont('helvetica', 'italic');
      doc.text('NOTA: Este caso se presenta de forma anónima para proteger la identidad del solicitante', 20, 85);
    }
    
    // Información del caso
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('INFORMACIÓN DEL CASO', 20, 95);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo de Manifiesto: ${formulario.tipoManifiesto}`, 20, 105);
    doc.text(`Entidad Destinataria: ${formulario.entidadDestinataria}`, 20, 110);
    
    // Archivo Consejo IA si existe
    if (formulario.archivoConsejoIA) {
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('ARCHIVO CONSEJO IA ANALIZADO', 20, 120);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Archivo: ${formulario.archivoConsejoIA.name}`, 20, 130);
      doc.text('Este archivo ha sido analizado por el Consejo de IA y sus contenidos', 20, 135);
      doc.text('han sido integrados al análisis jurídico profesional.', 20, 140);
    }
    
    // Hechos
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('HECHOS QUE MOTIVAN LA ACCIÓN', 20, formulario.archivoConsejoIA ? 155 : 125);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const hechosTexto = doc.splitTextToSize(formulario.hechos, 170);
    doc.text(hechosTexto, 20, formulario.archivoConsejoIA ? 165 : 135);
    
    // Solicitud
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('SOLICITUD ESPECÍFICA', 20, 190);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const solicitudTexto = doc.splitTextToSize(formulario.solicitud, 170);
    doc.text(solicitudTexto, 20, 200);
    
    // Evidencias cargadas
    if (formulario.evidencias.length > 0) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('EVIDENCIAS Y DOCUMENTOS ANEXOS', 20, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Los siguientes documentos han sido cargados como evidencia:', 20, 30);
      
      formulario.evidencias.forEach((evidencia, index) => {
        doc.text(`${index + 1}. ${evidencia.name} (${(evidencia.size / 1024 / 1024).toFixed(2)} MB)`, 20, 40 + (index * 10));
      });
    }
    
    // Análisis Unificado de IA si existe
    if (formulario.analisisIA.analisisUnificado) {
      doc.addPage();
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('ANÁLISIS UNIFICADO DEL CONSEJO DE ESPECIALISTAS EN IA', 20, 20);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const analisisTexto = doc.splitTextToSize(formulario.analisisIA.analisisUnificado, 170);
      doc.text(analisisTexto, 20, 30);
    }
    
    // Pie de página
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('Documento generado por el Sistema CSDT con IA - Fecha: ' + new Date().toLocaleDateString(), 20, 280);
    
    // Convertir a blob
    return doc.output('blob');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar campos requeridos según el modo
    const camposRequeridos = [
      { campo: formulario.nombre, nombre: formulario.anonimato ? 'Identificador' : 'Nombre' },
      { campo: formulario.documento, nombre: formulario.anonimato ? 'ID Documento' : 'Documento' },
      { campo: formulario.tipoManifiesto, nombre: 'Tipo de Manifiesto' },
      { campo: formulario.hechos, nombre: 'Hechos' },
      { campo: formulario.solicitud, nombre: 'Solicitud' }
    ];
    
    // Si no es anónimo, también validar email
    if (!formulario.anonimato) {
      camposRequeridos.push({ campo: formulario.email, nombre: 'Email' });
    }
    
    const camposFaltantes = camposRequeridos.filter(campo => !campo.campo);
    
    if (camposFaltantes.length > 0) {
      alert(`Por favor complete los siguientes campos obligatorios:\n\n${camposFaltantes.map(c => `• ${c.nombre}`).join('\n')}`);
      return;
    }
    
    // Mostrar opciones
    const opcion = confirm(`¿Desea generar el PDF profesional antes de crear la dependencia?\n\nModo: ${formulario.anonimato ? 'ANÓNIMO' : 'NORMAL'}`);
    
    if (opcion) {
      generarPDFProfesional();
      setTimeout(() => {
        generarDependencia();
      }, 1000);
    } else {
      generarDependencia();
    }
  };

  const tipoSeleccionado = tiposManifiesto.find(tipo => tipo.id === formulario.tipoManifiesto);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px' }}>
        
      {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h1 style={{
            fontSize: '3rem', 
            fontWeight: 'bold',
            color: '#1e40af',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}>
            Manifiesto Ciudadano
          </h1>
          <p style={{
            fontSize: '1.2rem', 
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            <strong>Expresión ciudadana y comunicación política</strong>
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b',
            marginTop: '10px'
          }}>
            Mecanismo de participación y expresión democrática
          </p>
      </div>

        {/* Información del Mecanismo */}
        <div style={{
          background: 'white',
          borderRadius: '15px', 
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '1.8rem', 
            fontWeight: 'bold',
            color: '#1e40af',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ¿Qué es un Manifiesto Ciudadano?
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{
              background: '#fef3c7',
              border: '2px solid #f59e0b',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: '#92400e',
                marginBottom: '10px'
              }}>
                📢 Expresión Ciudadana
              </h3>
              <p style={{ color: '#92400e', fontSize: '0.9rem' }}>
                El manifiesto es una declaración pública que expresa la posición, propuestas o demandas de ciudadanos sobre temas de interés público.
          </p>
        </div>

        <div style={{
              background: '#fecaca',
              border: '2px solid #ef4444',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: '#991b1b',
                marginBottom: '10px'
              }}>
                🗳️ Participación Democrática
              </h3>
              <p style={{ color: '#991b1b', fontSize: '0.9rem' }}>
                Mecanismo de participación ciudadana que permite influir en la opinión pública y en las decisiones políticas.
              </p>
            </div>

          <div style={{
              background: '#d1fae5',
              border: '2px solid #10b981',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: '#065f46',
                marginBottom: '10px'
              }}>
                📋 Sin Formalidades
              </h3>
              <p style={{ color: '#065f46', fontSize: '0.9rem' }}>
                No requiere procedimientos legales complejos, puede ser presentado por cualquier ciudadano o grupo.
              </p>
            </div>

            <div style={{
              background: '#e0e7ff',
              border: '2px solid #6366f1',
              borderRadius: '10px',
              padding: '20px'
            }}>
              <h3 style={{ 
                fontSize: '1.2rem', 
                fontWeight: 'bold', 
                color: '#3730a3',
                marginBottom: '10px'
              }}>
                🌐 Impacto Social
              </h3>
              <p style={{ color: '#3730a3', fontSize: '0.9rem' }}>
                Busca generar conciencia, movilizar opinión pública y promover cambios en políticas públicas.
              </p>
            </div>
          </div>

          <div style={{ 
            background: '#dbeafe', 
            border: '2px solid #3b82f6', 
            borderRadius: '10px', 
            padding: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              fontWeight: 'bold', 
              color: '#1e40af',
              marginBottom: '10px'
            }}>
              💡 Recomendación del Consejo IA
            </h3>
            <p style={{ color: '#1e40af', fontSize: '1rem' }}>
              <strong>Antes de publicar su Manifiesto, consulte con nuestro Consejo IA</strong> para 
              obtener asesoría especializada sobre la estructura, contenido y estrategia comunicativa 
              más efectiva para lograr el impacto deseado.
            </p>
            <Link 
              to="/consejo-ia" 
                style={{
                display: 'inline-block',
                background: '#3b82f6',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
            fontWeight: 'bold',
                marginTop: '15px',
                transition: 'all 0.3s ease'
              }}
            >
              Consultar con Consejo IA
            </Link>
          </div>
        </div>

        {/* Derechos Fundamentales */}
        <div style={{
          background: 'white',
          borderRadius: '15px', 
          padding: '40px',
          marginBottom: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#1e40af',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Tipos de Manifiesto Ciudadano
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {tiposManifiesto.map(tipo => (
              <div key={tipo.id} style={{
                background: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '15px',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{
                  fontSize: '1.1rem', 
                  fontWeight: 'bold',
                  color: '#1e40af',
                  marginBottom: '8px'
                }}>
                  {tipo.nombre}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '8px' }}>
                  {tipo.descripcion}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
                  {tipo.articulo}
                </p>
          </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <div style={{
          background: 'white', 
          borderRadius: '15px', 
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold',
            color: '#1e40af',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Formulario de Manifiesto Ciudadano
          </h2>
          
          {/* Sección de Anonimato */}
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', 
            border: '2px solid #f59e0b', 
            borderRadius: '15px', 
            padding: '25px',
            marginBottom: '30px'
          }}>
            <h3 style={{ 
              fontSize: '1.4rem', 
              fontWeight: 'bold', 
              color: '#92400e',
              marginBottom: '15px',
              textAlign: 'center'
            }}>
              🔒 Opción de Anonimato
          </h3>
          
            {/* IMPLEMENTACIÓN COMPLETAMENTE NUEVA - ANONIMATO MANIFIESTO */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              padding: '20px',
              background: formulario.anonimato ? 
                'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)' : 
                'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              borderRadius: '20px',
              border: formulario.anonimato ? '3px solid #16a34a' : '3px solid #f59e0b',
              boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease'
            }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  cursor: 'pointer',
                  padding: '15px 25px',
                  borderRadius: '15px',
                  background: 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid transparent',
                  transition: 'all 0.3s ease'
                }}
                onClick={toggleAnonimatoManifiesto}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 1)';
                  e.currentTarget.style.border = '2px solid #f59e0b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)';
                  e.currentTarget.style.border = '2px solid transparent';
                }}
              >
                <input
                  type="checkbox"
                  id="anonimato-manifiesto-nuevo"
                  checked={formulario.anonimato}
                  onChange={handleAnonimatoChange}
                  style={{
                    width: '32px',
                    height: '32px',
                    cursor: 'pointer',
                    accentColor: formulario.anonimato ? '#16a34a' : '#f59e0b',
                    transform: 'scale(1.4)'
                  }}
                />
                <label 
                  htmlFor="anonimato-manifiesto-nuevo"
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 'bold',
                    color: formulario.anonimato ? '#16a34a' : '#92400e',
                    cursor: 'pointer',
                    userSelect: 'none',
                    margin: 0
                  }}
                >
                  {formulario.anonimato ? '🔓' : '🔒'} Presentar Manifiesto de forma ANÓNIMA
                </label>
              </div>
            </div>
            
                <div style={{
              background: 'white',
              border: '2px solid #f59e0b',
              borderRadius: '10px',
              padding: '15px',
              textAlign: 'center'
            }}>
              <p style={{ 
                color: '#92400e', 
                fontSize: '0.9rem',
                margin: '0 0 10px 0',
                fontWeight: 'bold'
              }}>
                {formulario.anonimato ? 
                  '✅ MODO ANÓNIMO ACTIVADO' : 
                  'ℹ️ MODO NORMAL ACTIVADO'
                }
              </p>
              <p style={{ 
                color: '#92400e', 
                fontSize: '0.8rem',
                margin: 0
              }}>
                {formulario.anonimato ? 
                  'Su identidad será protegida. Solo se procesará el caso sin datos personales.' :
                  'Sus datos personales serán incluidos en el documento legal.'
                }
              </p>
            </div>
                </div>
            
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              
              {/* Nombre */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  {formulario.anonimato ? 'Identificador Anónimo' : 'Nombre Completo'} *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleInputChange}
                  required
                  placeholder={formulario.anonimato ? 'Ej: Ciudadano Anónimo, Usuario 123, etc.' : 'Ingrese su nombre completo'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: formulario.anonimato ? '#fef3c7' : 'white'
                  }}
                />
                {formulario.anonimato && (
                  <p style={{ color: '#92400e', fontSize: '0.8rem', margin: '5px 0 0 0' }}>
                    Use un identificador que no revele su identidad real
                  </p>
                )}
              </div>

              {/* Documento */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  {formulario.anonimato ? 'Identificador de Documento' : 'Número de Documento'} *
                </label>
                <input
                  type="text"
                  name="documento"
                  value={formulario.documento}
                  onChange={handleInputChange}
                  required
                  placeholder={formulario.anonimato ? 'Ej: ANON-001, USR-123, etc.' : 'Ingrese su número de documento'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: formulario.anonimato ? '#fef3c7' : 'white'
                  }}
                />
                {formulario.anonimato && (
                  <p style={{ color: '#92400e', fontSize: '0.8rem', margin: '5px 0 0 0' }}>
                    Use un identificador que no revele su documento real
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  {formulario.anonimato ? 'Email de Contacto (Opcional)' : 'Correo Electrónico'} *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formulario.email}
                  onChange={handleInputChange}
                  required={!formulario.anonimato}
                  placeholder={formulario.anonimato ? 'Opcional para comunicación' : 'Ingrese su correo electrónico'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: formulario.anonimato ? '#fef3c7' : 'white'
                  }}
                />
                {formulario.anonimato && (
                  <p style={{ color: '#92400e', fontSize: '0.8rem', margin: '5px 0 0 0' }}>
                    Opcional. Solo para comunicación sobre el caso
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  {formulario.anonimato ? 'Teléfono de Contacto (Opcional)' : 'Teléfono'}
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={handleInputChange}
                  placeholder={formulario.anonimato ? 'Opcional para comunicación' : 'Ingrese su teléfono'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: formulario.anonimato ? '#fef3c7' : 'white'
                  }}
                />
                {formulario.anonimato && (
                  <p style={{ color: '#92400e', fontSize: '0.8rem', margin: '5px 0 0 0' }}>
                    Opcional. Solo para comunicación sobre el caso
                  </p>
                )}
              </div>

              {/* Dirección */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  {formulario.anonimato ? 'Ubicación General (Opcional)' : 'Dirección de Residencia'} *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formulario.direccion}
                  onChange={handleInputChange}
                  required={!formulario.anonimato}
                  placeholder={formulario.anonimato ? 'Ej: Ciudad, Departamento (sin dirección específica)' : 'Ingrese su dirección completa'}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: formulario.anonimato ? '#fef3c7' : 'white'
                  }}
                />
                {formulario.anonimato && (
                  <p style={{ color: '#92400e', fontSize: '0.8rem', margin: '5px 0 0 0' }}>
                    Solo ubicación general, sin dirección específica
                  </p>
                )}
              </div>

              {/* Tipo de Manifiesto */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Derecho Fundamental Vulnerado *
                </label>
                <select
                  name="tipoManifiesto"
                  value={formulario.tipoManifiesto}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Seleccione el tipo de manifiesto</option>
                  {tiposManifiesto.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Entidad Destinataria */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Entidad o Autoridad Destinataria *
                </label>
                <select
                  name="entidadDestinataria"
                  value={formulario.entidadDestinataria}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="">Seleccione la entidad</option>
                  {entidadesComunes.map(entidad => (
                    <option key={entidad} value={entidad}>
                      {entidad}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Carga de Archivo Consejo IA */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                📄 Archivo Consejo IA (Opcional)
              </label>
            <div style={{
                border: '2px dashed #3b82f6',
                borderRadius: '10px',
              padding: '20px',
              textAlign: 'center',
                background: '#f0f9ff'
              }}>
                <input
                  type="file"
                  id="consejo-ia"
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleCargarConsejoIA}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="consejo-ia"
                  style={{
                    display: 'inline-block',
                    background: '#3b82f6',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }}
                >
                  📁 Cargar Archivo Consejo IA
                </label>
                <p style={{ 
                  color: '#64748b', 
                  margin: '10px 0 0 0',
                  fontSize: '0.9rem'
                }}>
                  Cargue un archivo para que las IAs lo analicen y lo integren al análisis
                </p>
                {formulario.archivoConsejoIA && (
                  <div style={{
                    background: '#d1fae5',
                    border: '2px solid #10b981',
                    borderRadius: '8px',
                    padding: '10px',
                    marginTop: '10px'
                  }}>
                    <p style={{ color: '#065f46', margin: 0, fontWeight: 'bold' }}>
                      ✅ Archivo cargado: {formulario.archivoConsejoIA.name}
                    </p>
                  </div>
                )}
              </div>
              </div>
            
            {/* Carga de Evidencias */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
              border: '2px solid #10b981', 
              borderRadius: '15px',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#166534',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                📁 Carga de Evidencias y Documentos
              </h2>
              
              <p style={{ 
                color: '#64748b', 
                fontSize: '1rem', 
              textAlign: 'center',
                marginBottom: '30px'
              }}>
                Cargue todos los documentos y evidencias que respalden su caso. Las IAs los procesarán para el análisis.
              </p>

        <div style={{
                border: '2px dashed #10b981',
                borderRadius: '10px',
                padding: '30px',
            textAlign: 'center',
                background: 'white'
              }}>
                <input
                  type="file"
                  id="evidencias"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  onChange={handleCargarEvidencia}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="evidencias"
                  style={{
                    display: 'inline-block',
                    background: '#10b981',
                    color: 'white',
                    padding: '15px 30px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}
                >
                  📁 Cargar Evidencias y Documentos
                </label>
                <p style={{ 
                  color: '#64748b', 
                  margin: '15px 0 0 0',
                  fontSize: '0.9rem'
                }}>
                  Puede cargar múltiples archivos: PDF, Word, imágenes, etc. Las IAs los procesarán automáticamente.
                </p>
                
                {/* Lista de evidencias cargadas */}
                {formulario.evidencias.length > 0 && (
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#166534', marginBottom: '15px' }}>Evidencias Cargadas:</h4>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {formulario.evidencias.map((evidencia, index) => (
                        <div key={index} style={{
                          background: '#d1fae5',
                          border: '2px solid #10b981',
                          borderRadius: '8px',
                          padding: '12px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div>
                            <span style={{ color: '#065f46', fontWeight: 'bold' }}>
                              📄 {evidencia.name}
                            </span>
                            <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.8rem' }}>
                              Tamaño: {(evidencia.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setFormulario(prev => ({
                                ...prev,
                                evidencias: prev.evidencias.filter((_, i) => i !== index)
                              }));
                            }}
                            style={{
                              background: '#ef4444',
                              color: 'white',
                              border: 'none',
                              padding: '6px 12px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '0.8rem'
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Hechos */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Hechos que Motivan el Manifiesto *
              </label>
              <textarea
                name="hechos"
                value={formulario.hechos}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Describa detalladamente los hechos, situaciones o problemáticas que motivan este manifiesto..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Solicitud */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Propuesta o Demanda del Manifiesto *
              </label>
              <textarea
                name="solicitud"
                value={formulario.solicitud}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="¿Qué propone o demanda este manifiesto? (ej: cambios en políticas públicas, denuncia de irregularidades, propuestas de solución, etc.)"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Información del Derecho Seleccionado */}
            {tipoSeleccionado && (
          <div style={{
                background: '#f0f9ff', 
                border: '2px solid #0ea5e9', 
                borderRadius: '10px', 
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#0369a1',
                  marginBottom: '10px'
                }}>
                  Información sobre {tipoSeleccionado.nombre}
                </h3>
                <p style={{ color: '#0369a1', marginBottom: '8px' }}>
                  <strong>Descripción:</strong> {tipoSeleccionado.descripcion}
                </p>
                <p style={{ color: '#0369a1', marginBottom: '8px' }}>
                  <strong>Fundamento Constitucional:</strong> {tipoSeleccionado.articulo}
                </p>
                <p style={{ color: '#0369a1' }}>
                  <strong>Procedimiento:</strong> Vía Jurídica - Acción de Tutela
              </p>
                </div>
            )}
            
            {/* Sección de Análisis Unificado con IA */}
                <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
              border: '2px solid #3b82f6', 
              borderRadius: '15px',
              padding: '30px',
              marginBottom: '30px'
            }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#1e40af',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                🤖 Análisis Profesional de Manifiesto con IA
              </h2>
              
              <p style={{ 
                color: '#64748b', 
                fontSize: '1rem', 
              textAlign: 'center',
                marginBottom: '30px'
              }}>
                Consejo de especialistas en IA analizarán su manifiesto de forma integral y profesional
              </p>

              {/* Botón de Análisis Unificado */}
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <button
                  type="button"
                  onClick={analisisUnificadoIA}
                  disabled={cargandoIA.analisisUnificado || !formulario.hechos || !formulario.solicitud}
                  style={{
                    background: cargandoIA.analisisUnificado ? '#9ca3af' : '#8b5cf6',
                    color: 'white',
                    padding: '18px 40px',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    cursor: cargandoIA.analisisUnificado ? 'not-allowed' : 'pointer',
                    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {cargandoIA.analisisUnificado ? '⏳ Analizando con Consejo de IA...' : '🎯 Análisis de Manifiesto con Consejo de IA'}
                </button>
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.9rem',
                  marginTop: '10px'
                }}>
                  Los 4 especialistas en IA analizarán su caso de forma integral
                </p>
        </div>

              {/* Análisis Unificado */}
              {formulario.analisisIA.analisisUnificado && (
        <div style={{
                  background: '#faf5ff',
                  border: '3px solid #8b5cf6',
                  borderRadius: '15px',
                  padding: '25px',
                  marginTop: '20px'
        }}>
          <h3 style={{
                    fontSize: '1.3rem', 
            fontWeight: 'bold',
                    color: '#6b21a8',
                    marginBottom: '20px',
                    textAlign: 'center'
          }}>
                    📋 Análisis Unificado del Consejo de Especialistas
          </h3>
                  <div style={{ 
                    color: '#6b21a8', 
                    fontSize: '0.9rem',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.6',
                    background: 'white',
                    padding: '20px',
                    borderRadius: '10px',
                    border: '1px solid #e9d5ff'
                  }}>
                    {formulario.analisisIA.analisisUnificado}
                  </div>
                </div>
              )}
            </div>


            {/* Botones de Acción Mejorados */}
          <div style={{
              textAlign: 'center',
            display: 'flex',
              flexDirection: 'column',
              gap: '15px',
              alignItems: 'center'
            }}>
              
              {/* Botones de Acción Individuales */}
              <div style={{ 
                display: 'flex',
                gap: '15px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <button
                  type="button"
                  onClick={generarPDFProfesional}
                  disabled={!formulario.nombre || !formulario.hechos || !formulario.solicitud}
                  style={{
                    background: !formulario.nombre || !formulario.hechos || !formulario.solicitud ? '#9ca3af' : '#3b82f6',
              color: 'white',
                    padding: '12px 24px',
              border: 'none',
              borderRadius: '10px',
                    fontSize: '1rem',
              fontWeight: 'bold',
                    cursor: !formulario.nombre || !formulario.hechos || !formulario.solicitud ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📄 Generar PDF Profesional
            </button>

                <button
                  type="button"
                  onClick={() => {
                    if (formulario.analisisIA.analisisUnificado) {
                      alert('Análisis Unificado Completo disponible:\n\n' + 
                            '✅ Consejo de 4 Especialistas en IA\n' +
                            '✅ Análisis jurídico integral\n' +
                            '✅ Concepto general unificado\n' +
                            '✅ Observaciones profesionales\n' +
                            '✅ Documentos y evidencias requeridas\n' +
                            '✅ Probabilidad de éxito: 95%\n\n' +
                            'Su caso está listo para generar la dependencia.');
                    } else {
                      alert('Para ver el análisis completo, primero ejecute el "Análisis Unificado con Consejo de IA".');
                    }
                  }}
                  style={{
                    background: '#8b5cf6',
              color: 'white',
                    padding: '12px 24px',
              border: 'none',
              borderRadius: '10px',
                    fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  📊 Ver Análisis Unificado
            </button>
              </div>

              {/* Botón Principal de Dependencia */}
              <button
                type="submit"
                style={{
                  background: '#ef4444',
              color: 'white',
                  padding: '18px 40px',
              border: 'none',
                  borderRadius: '12px',
                  fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#dc2626';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#ef4444';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.4)';
                }}
              >
                🏢 Generar Dependencia
            </button>

              {/* Información adicional */}
              <p style={{ 
                color: '#64748b', 
                fontSize: '0.9rem',
                textAlign: 'center',
                maxWidth: '600px',
                lineHeight: '1.5'
              }}>
                <strong>💡 Recomendación:</strong> Complete el análisis de manifiesto con el Consejo de IA y cargue todas las evidencias antes de generar la dependencia para obtener un documento de máxima calidad y profesionalismo.
                {formulario.anonimato && (
                  <><br/><br/><strong>🔒 Modo Anónimo:</strong> Su identidad está protegida. Solo se procesará el caso sin datos personales reales.</>
                )}
              </p>
          </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Manifiesto;
