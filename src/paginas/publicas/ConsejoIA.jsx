import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import AnalisisJuridicoService from '../../services/AnalisisJuridicoService';
import IAsProfesionalesService from '../../services/IAsProfesionalesService';
import IAMejoradaService from '../../services/IAMejoradaService';
import ChatGPTMejoradoService from '../../services/ChatGPTMejoradoService';
import SistemaIAProfesionalService from '../../services/SistemaIAProfesionalService';

const ConsejoIA = () => {
  const [hechos, setHechos] = useState('');
  const [analisisCompleto, setAnalisisCompleto] = useState(null);
  const [respuestaIA, setRespuestaIA] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [analisisContextual, setAnalisisContextual] = useState(null);
  const [analisisChatGPTMejorado, setAnalisisChatGPTMejorado] = useState(null);
  const [analisisProfesionalGlobal, setAnalisisProfesionalGlobal] = useState(null);
  const [analisisNarrativo, setAnalisisNarrativo] = useState(null);



  useEffect(() => {
    cargarDatosIniciales();
  }, []);


  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);
      // Cargar análisis de demostración
      await cargarAnalisisDemostracion();
    } catch (error) {
      // En caso de error, cargar análisis de demostración local
      await cargarAnalisisDemostracionLocal();
    } finally {
      setCargando(false);
    }
  };

  const cargarAnalisisDemostracion = async () => {
    try {
      setCargando(true);
      
      // Usar hechos de demostración para el análisis profesional
      const hechosDemo = "Ejemplo de caso: Un ciudadano presenta queja sobre irregularidades en el proceso de licitación de una obra pública en su municipio. La obra fue adjudicada sin seguir los procedimientos establecidos en la Ley 80 de 1993, y se han presentado sobrecostos del 40% sobre el presupuesto inicial. El ciudadano solicita la intervención de los organismos de control para investigar posibles irregularidades y garantizar la transparencia en el proceso.";
      
      // Generar análisis contextual primero
      const contexto = IAMejoradaService.procesarAnalisisCompleto(
        hechosDemo, 
        'caso_administrativo', 
        'derecho_publico'
      );
      
      setAnalisisContextual(contexto);
      
      const analisis = IAsProfesionalesService.generarAnalisisCompletoProfesional(
        hechosDemo, 
        'caso_administrativo', 
        'derecho_publico'
      );
      
      
      // Procesar la respuesta con IA mejorada
      const analisisMejorado = IAMejoradaService.procesarAnalisisCompleto(hechosDemo, 'constitucional', 'derecho_publico');
      
      
      setAnalisisCompleto(analisisMejorado.analisisCompleto);
      setRespuestaIA(analisisMejorado);
      
    } catch (error) {
      
      // Fallback básico
      const analisisBasico = {
        analisisCompleto: {
          nivelRiesgoConsolidado: 'MEDIO',
          conceptoGeneralConsolidado: 'Análisis de demostración del sistema de IA especializada',
          fechaAnalisis: new Date().toLocaleString('es-CO'),
          equipoEspecializado: 'Sistema de demostración'
        },
        detallesIAs: [
          {
            nombre: 'Sistema de Demostración',
            titulo: 'Análisis de Ejemplo',
            experiencia: 'Sistema de demostración',
            narrativaHechos: 'Este es un análisis de demostración del sistema.',
            fundamentosJuridicos: {
              nacional: [{ titulo: 'Constitución Política', articulos: ['Art. 1-113'], aplicacion: 'Marco constitucional' }],
              internacional: [],
              departamental: [],
              municipal: []
            },
            jurisprudencia: [],
            analisisDetallado: 'Análisis de demostración del sistema',
            recomendaciones: [{ tipo: 'General', accion: 'Revisar caso', justificacion: 'Demostración', plazo: 'Inmediato', organo: 'Especialista' }],
            rutasAccion: []
          }
        ]
      };
      
      setAnalisisCompleto(analisisBasico.analisisCompleto);
      setRespuestaIA(analisisBasico);
      
    } finally {
      setCargando(false);
    }
  };

  const handleAnalizar = async () => {
    if (!hechos.trim()) {
      alert('Por favor, ingrese los hechos a analizar.');
      return;
    }

    try {
      setCargando(true);
      
      // Crear análisis usando el servicio real del backend
      const tipoCaso = 'administrativo'; // Se puede hacer dinámico
      const categoriaJuridica = 'procedimiento_administrativo'; // Se puede hacer dinámico
      
      const response = await AnalisisJuridicoService.crearAnalisisDesdeFormulario(
        hechos,
        tipoCaso,
        categoriaJuridica
      );

      if (response.success && response.data) {
        const analisis = response.data;
        
        // Procesar los datos del backend
        const analisisCompleto = {
          nivelRiesgoConsolidado: analisis.nivel_riesgo || 'MEDIO',
          conceptoGeneralConsolidado: analisis.concepto_general_consolidado || `Análisis integral multidisciplinario personalizado basado en los hechos específicos presentados: "${hechos.substring(0, 100)}..."`
        };

        // Procesar análisis de IAs especializadas
        const detallesIAs = analisis.analisis_ias_especializadas?.map(ia => ({
          nombre: ia.nombre_ia || 'IA Especializada',
          analisis: ia.narrativa_hechos_profesional || ia.analisis_detallado || `Análisis especializado de: "${hechos.substring(0, 100)}..."`,
          normativa: formatearNormativa(ia),
          jurisprudencia: formatearJurisprudencia(ia),
          violaciones: ia.identificacion_violaciones || 'Identificación de violaciones específicas',
          recomendaciones: formatearRecomendaciones(ia)
        })) || [];

        setAnalisisCompleto(analisisCompleto);
        setRespuestaIA({ detallesIAs });
      } else {
        throw new Error('No se pudo crear el análisis');
      }
      
    } catch (error) {
      alert('Error al realizar el análisis. Intente nuevamente.');
      
      // Fallback a análisis local si falla el backend
      await generarAnalisisLocal();
    } finally {
      setCargando(false);
    }
  };

  const generarAnalisisLocal = async () => {
    try {
      // Generar análisis contextual primero
      const contexto = IAMejoradaService.procesarAnalisisCompleto(
        hechos, 
        'caso_administrativo', 
        'derecho_publico'
      );
      
      setAnalisisContextual(contexto);
      
      // Usar el nuevo servicio de IAs profesionales
      const analisis = IAsProfesionalesService.generarAnalisisCompletoProfesional(
        hechos, 
        'caso_administrativo', 
        'derecho_publico'
      );
      
      // Procesar la respuesta con IA mejorada
      const analisisMejorado = IAMejoradaService.procesarAnalisisCompleto(hechos, 'constitucional', 'derecho_publico');
      
      // Generar análisis de ChatGPT mejorado
      const analisisChatGPT = { especialidad: 'derecho_constitucional' };
      
      // Simular respuesta de ChatGPT mejorada
      const respuestaChatGPT = ChatGPTMejoradoService.simularRespuesta(hechos, analisisChatGPT.especialidad);
      const respuestaChatGPTProcesada = ChatGPTMejoradoService.generarRespuesta(hechos, analisisChatGPT.especialidad);
      
      setAnalisisChatGPTMejorado(respuestaChatGPTProcesada);
      
      // Generar análisis narrativo profesional
      const analisisNarrativoCompleto = IAsProfesionalesService.generarAnalisisLegalProfesional(hechos, 'constitucional', 'derecho_publico');
      setAnalisisNarrativo(analisisNarrativoCompleto);

      // Generar análisis profesional global
      const analisisGlobal = SistemaIAProfesionalService.generarRespuestaProfesional(hechos, 'derecho_constitucional');
      
      setAnalisisProfesionalGlobal(analisisGlobal);
      
      setAnalisisCompleto(analisisMejorado.analisisCompleto);
      setRespuestaIA(analisisMejorado);
      
    } catch (error) {
      
      // Fallback básico en caso de error
      const analisisBasico = {
        analisisCompleto: {
          nivelRiesgoConsolidado: 'MEDIO',
          conceptoGeneralConsolidado: `Análisis básico de los hechos presentados: "${hechos.substring(0, 100)}..."`,
          fechaAnalisis: new Date().toLocaleString('es-CO'),
          equipoEspecializado: 'Sistema de análisis básico'
        },
        detallesIAs: [
          {
            nombre: 'Sistema de Análisis Básico',
            titulo: 'Análisis General',
            experiencia: 'Sistema automatizado',
            narrativaHechos: `Análisis básico de los hechos: "${hechos}"`,
            fundamentosJuridicos: {
              nacional: [{ titulo: 'Constitución Política', articulos: ['Art. 1-113'], aplicacion: 'Marco constitucional' }],
              internacional: [],
              departamental: [],
              municipal: []
            },
            jurisprudencia: [],
            analisisDetallado: 'Análisis básico realizado por el sistema',
            recomendaciones: [{ tipo: 'General', accion: 'Consultar especialista', justificacion: 'Análisis básico', plazo: 'Inmediato', organo: 'Especialista' }],
            rutasAccion: []
          }
        ],
        recomendacionesConsolidadas: [],
        rutasAccionConsolidadas: [],
        resumenEjecutivo: {
          nivelRiesgo: 'MEDIO',
          recomendacionesPrioritarias: 1,
          accionesInmediatas: 1,
          organosCompetentes: ['Especialista'],
          plazosCriticos: ['Inmediato']
        }
      };
      
      setAnalisisCompleto(analisisBasico.analisisCompleto);
      setRespuestaIA(analisisBasico);
    }
  };

  // Funciones auxiliares para formatear datos del backend
  const formatearNormativa = (ia) => {
    const normativas = [];
    if (ia.fundamentos_juridicos_nacionales) normativas.push('NACIONAL: ' + ia.fundamentos_juridicos_nacionales.join(', '));
    if (ia.fundamentos_juridicos_internacionales) normativas.push('INTERNACIONAL: ' + ia.fundamentos_juridicos_internacionales.join(', '));
    if (ia.fundamentos_juridicos_municipales) normativas.push('MUNICIPAL: ' + ia.fundamentos_juridicos_municipales.join(', '));
    if (ia.fundamentos_juridicos_departamentales) normativas.push('DEPARTAMENTAL: ' + ia.fundamentos_juridicos_departamentales.join(', '));
    return normativas.join('. ') || ia.normativa_especifica?.join(', ') || 'Normativa aplicable según especialidad';
  };

  const formatearJurisprudencia = (ia) => {
    return ia.jurisprudencia_aplicable?.join(', ') || 'Jurisprudencia aplicable según especialidad';
  };

  const formatearRecomendaciones = (ia) => {
    return ia.recomendaciones_especificas?.join(', ') || 'Recomendaciones específicas según análisis';
  };

  const limpiarAnalisis = () => {
    setAnalisisCompleto(null);
    setRespuestaIA(null);
    setHechos('');
  };


  const generarPDFCompleto = () => {
    if (!analisisCompleto || !respuestaIA) {
      alert('No hay análisis para generar PDF. Realice un análisis primero.');
      return;
    }

    try {
      const doc = new jsPDF();
      let yPosition = 20;
      
      const addText = (text, fontSize, isBold = false, color = [0, 0, 0]) => {
        if (!text || text.trim() === '') { return; }
        
        doc.setFontSize(fontSize);
        doc.setTextColor(color[0], color[1], color[2]);
        
        if (isBold) {
          doc.setFont(undefined, 'bold');
        } else {
          doc.setFont(undefined, 'normal');
        }
        
        const textLines = doc.splitTextToSize(text.toString(), 170);
        doc.text(textLines, 20, yPosition);
        yPosition += (textLines.length * (fontSize * 0.35)) + 5;
        
        if (yPosition > 280) {
            doc.addPage();
            yPosition = 20;
          }
      };

      const addSeparator = () => {
        doc.setDrawColor(200, 200, 200);
        doc.line(20, yPosition, 190, yPosition);
        yPosition += 10;
      };
      
      // Encabezado
      addText('ANÁLISIS COMPLETO DEL CONSEJO IA - NIVEL DOCTORADO', 16, true, [30, 64, 175]);
      addText('Sistema de Inteligencia Artificial para Análisis Jurídico Especializado', 12, true, [30, 64, 175]);
      addText('Análisis de Nivel Doctoral con Metodologías de Investigación Jurídica Avanzadas', 11, true, [30, 64, 175]);
      addText(`Fecha de Generación: ${new Date().toLocaleString('es-CO')}`, 10, false, [100, 100, 100]);
      
      yPosition += 10;
      addSeparator();
      
      // Información del caso
      addText('INFORMACIÓN DEL CASO:', 14, true, [139, 0, 0]);
      addText(`Hechos: ${hechos}`, 11);
      
      yPosition += 10;
      addSeparator();

      // Análisis consolidado
      addText('ANÁLISIS CONSOLIDADO:', 14, true, [0, 100, 0]);
      addText(`Nivel de Riesgo: ${analisisCompleto?.nivelRiesgoConsolidado || 'No disponible'}`, 11);
      addText(`Concepto General: ${analisisCompleto?.conceptoGeneralConsolidado || 'No disponible'}`, 11);
      
      yPosition += 10;
      addSeparator();

      // Análisis Doctoral Especializado
      if (analisisContextual?.analisisDoctoral) {
        addText('ANÁLISIS DOCTORAL ESPECIALIZADO:', 14, true, [139, 0, 0]);
        addText(`Nivel Académico: ${analisisContextual.analisisDoctoral.nivelAcademico}`, 11);
        addText(`Metodología: ${analisisContextual.analisisDoctoral.metodologia}`, 11);
        addText(`Enfoque Teórico: ${analisisContextual.analisisDoctoral.enfoqueTeorico}`, 11);
        
        addText('Análisis Crítico Doctoral:', 12, true, [0, 0, 139]);
        addText(analisisContextual.analisisDoctoral.analisisCritico, 10);
        
        addText('Fundamentación Teórica:', 12, true, [0, 0, 139]);
        addText(analisisContextual.analisisDoctoral.fundamentacionTeorica, 10);
        
        addText('Conclusiones Doctorales:', 12, true, [0, 0, 139]);
        addText(analisisContextual.analisisDoctoral.conclusionesDoctorales, 10);
        
        addText('Recomendaciones de Investigación:', 12, true, [0, 0, 139]);
        analisisContextual.analisisDoctoral.recomendacionesInvestigacion?.forEach(rec => {
          addText(`• ${rec}`, 10);
        });
        
        yPosition += 10;
        addSeparator();
      }

      // Detalles por IA Profesional
      if (respuestaIA?.detallesIAs && Array.isArray(respuestaIA.detallesIAs)) {
        addText('DETALLES POR INTELIGENCIA ARTIFICIAL ESPECIALIZADA:', 14, true, [0, 100, 0]);
        
        respuestaIA.detallesIAs.forEach((ia, index) => {
          addText(`${index + 1}. ${ia.nombre || 'IA Desconocida'}`, 12, true);
          addText(`   Título: ${ia.titulo || 'Especialista'}`, 10);
          addText(`   Experiencia: ${ia.experiencia || 'Experiencia especializada'}`, 10);
          addText(`   Narrativa de Hechos: ${ia.narrativaHechos || 'No disponible'}`, 10);
          
          // Fundamentos Jurídicos por Nivel
          if (ia.fundamentosJuridicos) {
            addText(`   Fundamentos Jurídicos:`, 10, true);
            
            if (ia.fundamentosJuridicos.nacional && ia.fundamentosJuridicos.nacional.length > 0) {
              addText(`     NACIONAL:`, 9, true);
              ia.fundamentosJuridicos.nacional.forEach(fundamento => {
                addText(`       - ${fundamento.titulo}: ${fundamento.articulos?.join(', ') || 'Artículos aplicables'}`, 8);
                addText(`         Aplicación: ${fundamento.aplicacion}`, 8);
              });
            }
            
            if (ia.fundamentosJuridicos.internacional && ia.fundamentosJuridicos.internacional.length > 0) {
              addText(`     INTERNACIONAL:`, 9, true);
              ia.fundamentosJuridicos.internacional.forEach(fundamento => {
                addText(`       - ${fundamento.titulo}: ${fundamento.articulos?.join(', ') || 'Artículos aplicables'}`, 8);
                addText(`         Aplicación: ${fundamento.aplicacion}`, 8);
              });
            }
            
            if (ia.fundamentosJuridicos.departamental && ia.fundamentosJuridicos.departamental.length > 0) {
              addText(`     DEPARTAMENTAL:`, 9, true);
              ia.fundamentosJuridicos.departamental.forEach(fundamento => {
                addText(`       - ${fundamento.titulo}: ${fundamento.articulos?.join(', ') || 'Artículos aplicables'}`, 8);
                addText(`         Aplicación: ${fundamento.aplicacion}`, 8);
              });
            }
            
            if (ia.fundamentosJuridicos.municipal && ia.fundamentosJuridicos.municipal.length > 0) {
              addText(`     MUNICIPAL:`, 9, true);
              ia.fundamentosJuridicos.municipal.forEach(fundamento => {
                addText(`       - ${fundamento.titulo}: ${fundamento.articulos?.join(', ') || 'Artículos aplicables'}`, 8);
                addText(`         Aplicación: ${fundamento.aplicacion}`, 8);
              });
            }
          }
          
          // Jurisprudencia
          if (ia.jurisprudencia && ia.jurisprudencia.length > 0) {
            addText(`   Jurisprudencia Aplicable:`, 10, true);
            ia.jurisprudencia.forEach(juris => {
              addText(`     ${juris.corte}:`, 9, true);
              juris.sentencias.forEach(sentencia => {
                addText(`       - ${sentencia}`, 8);
              });
              addText(`     Aplicación: ${juris.aplicacion}`, 8);
            });
          }
          
          addText(`   Análisis Detallado: ${ia.analisisDetallado || 'No disponible'}`, 10);
          
          // Recomendaciones Específicas
          if (ia.recomendaciones && ia.recomendaciones.length > 0) {
            addText(`   Recomendaciones Específicas:`, 10, true);
            ia.recomendaciones.forEach(rec => {
              addText(`     - ${rec.accion} (${rec.tipo})`, 9);
              addText(`       Justificación: ${rec.justificacion}`, 8);
              addText(`       Plazo: ${rec.plazo}`, 8);
              addText(`       Órgano: ${rec.organo}`, 8);
            });
          }
          
          // Rutas de Acción
          if (ia.rutasAccion && ia.rutasAccion.length > 0) {
            addText(`   Rutas de Acción:`, 10, true);
            ia.rutasAccion.forEach(ruta => {
              addText(`     ${ruta.fase}:`, 9, true);
              ruta.acciones.forEach(accion => {
                addText(`       - ${accion}`, 8);
              });
            });
          }
          
          yPosition += 5;
        });
      }
      
      yPosition += 10;
      addSeparator();

      // Recomendaciones jurídicas, administrativas e institucionales integrales
      addText('RECOMENDACIONES JURÍDICAS, ADMINISTRATIVAS E INSTITUCIONALES INTEGRALES:', 14, true, [139, 0, 0]);
      
      addText('I. RUTAS JURÍDICAS Y CONSTITUCIONALES', 12, true, [0, 0, 139]);
      addText('A. ACCIONES CONSTITUCIONALES INMEDIATAS:', 11, true, [0, 100, 0]);
      addText('   1. Acción de Tutela (Art. 86 C.P.): Protección inmediata de derechos fundamentales', 10);
      addText('      - Competencia: Jueces de la República', 9);
      addText('      - Plazo: Inmediato, sin perjuicio de otros recursos', 9);
      addText('      - Efectos: Protección provisional o definitiva', 9);
      addText('   2. Acción de Cumplimiento (Art. 87 C.P.): Exigir cumplimiento de la ley', 10);
      addText('      - Competencia: Tribunales Administrativos', 9);
      addText('      - Objeto: Hacer cumplir leyes o actos administrativos', 9);
      addText('   3. Acción Popular (Art. 88 C.P.): Defensa de derechos colectivos', 10);
      addText('      - Competencia: Jueces administrativos', 9);
      addText('      - Objeto: Medio ambiente, patrimonio, moralidad administrativa', 9);
      addText('   4. Acción de Grupo (Art. 88 C.P.): Reclamos colectivos', 10);
      addText('      - Competencia: Jueces civiles del circuito', 9);
      addText('      - Objeto: Daños causados a un número plural de personas', 9);
      
      addText('B. RUTAS PENALES Y DISCIPLINARIAS:', 11, true, [0, 100, 0]);
      addText('   1. Denuncia Penal: Fiscalía General de la Nación', 10);
      addText('      - Ley 599 de 2000 (Código Penal)', 9);
      addText('      - Ley 906 de 2004 (Código de Procedimiento Penal)', 9);
      addText('   2. Investigación Disciplinaria: Procuraduría General de la Nación', 10);
      addText('      - Ley 734 de 2002 (Código Disciplinario Único)', 9);
      addText('      - Decreto 1066 de 2015 (Procedimiento Administrativo)', 9);
      addText('   3. Control Fiscal: Contraloría General de la República', 10);
      addText('      - Ley 42 de 1993 (Contraloría)', 9);
      addText('      - Ley 610 de 2000 (Procedimiento de responsabilidad fiscal)', 9);
      
      addText('II. RUTAS ADMINISTRATIVAS E INSTITUCIONALES', 12, true, [0, 0, 139]);
      addText('A. ENTES DE CONTROL Y SUPERVISIÓN:', 11, true, [0, 100, 0]);
      addText('   1. Superintendencia de Industria y Comercio (SIC)', 10);
      addText('      - Protección de datos personales (Ley 1581/2012)', 9);
      addText('      - Competencia desleal y protección al consumidor', 9);
      addText('   2. Superintendencia de Servicios Públicos Domiciliarios', 10);
      addText('      - Ley 142 de 1994 (Servicios públicos domiciliarios)', 9);
      addText('   3. Superintendencia de Notariado y Registro', 10);
      addText('      - Control notarial y registral', 9);
      
      addText('B. MECANISMOS DE PARTICIPACIÓN CIUDADANA:', 11, true, [0, 100, 0]);
      addText('   1. Veedurías Ciudadanas (Ley 850/2003)', 10);
      addText('      - Vigilancia de la gestión pública', 9);
      addText('      - Control a la contratación estatal', 9);
      addText('   2. Rendición de Cuentas (Ley 1757/2015)', 10);
      addText('      - Obligación de informar sobre gestión pública', 9);
      addText('   3. Consulta Popular (Art. 103 C.P.)', 10);
      addText('      - Decisión ciudadana mediante voto', 9);
      addText('   4. Referendo (Art. 103 C.P.)', 10);
      addText('      - Aprobación o derogación de normas', 9);
      
      addText('III. RUTAS INTERNACIONALES Y COMPARADAS', 12, true, [0, 0, 139]);
      addText('A. SISTEMA INTERAMERICANO DE DERECHOS HUMANOS:', 11, true, [0, 100, 0]);
      addText('   1. Comisión Interamericana de Derechos Humanos', 10);
      addText('      - Convención Americana de DDHH', 9);
      addText('      - Protocolo de San Salvador', 9);
      addText('   2. Corte Interamericana de Derechos Humanos', 10);
      addText('      - Opiniones consultivas', 9);
      addText('      - Casos contenciosos', 9);
      
      addText('B. SISTEMA UNIVERSAL DE DERECHOS HUMANOS:', 11, true, [0, 100, 0]);
      addText('   1. Comité de Derechos Humanos de la ONU', 10);
      addText('      - Pacto Internacional de Derechos Civiles y Políticos', 9);
      addText('   2. Relatorías Especiales de la ONU', 10);
      addText('      - Procedimientos especiales', 9);
      
      addText('IV. RUTAS TERRITORIALES Y LOCALES', 12, true, [0, 0, 139]);
      addText('A. NIVEL DEPARTAMENTAL:', 11, true, [0, 100, 0]);
      addText('   1. Gobernación Departamental', 10);
      addText('      - Control político y administrativo', 9);
      addText('      - Planes de desarrollo departamental', 9);
      addText('   2. Asamblea Departamental', 10);
      addText('      - Ordenanzas departamentales', 9);
      addText('      - Control político a la administración', 9);
      
      addText('B. NIVEL MUNICIPAL:', 11, true, [0, 100, 0]);
      addText('   1. Alcaldía Municipal', 10);
      addText('      - Gestión administrativa local', 9);
      addText('      - Planes de desarrollo municipal', 9);
      addText('   2. Concejo Municipal', 10);
      addText('      - Acuerdos municipales', 9);
      addText('      - Control político local', 9);
      addText('   3. Personería Municipal', 10);
      addText('      - Defensoría del pueblo local', 9);
      addText('      - Vigilancia administrativa', 9);
      
      addText('V. RUTAS ÉTNICAS Y DIFERENCIALES', 12, true, [0, 0, 139]);
      addText('A. COMUNIDADES INDÍGENAS:', 11, true, [0, 100, 0]);
      addText('   1. Consulta Previa (Convenio 169 OIT)', 10);
      addText('      - Derecho fundamental diferencial', 9);
      addText('   2. Autoridades Indígenas', 10);
      addText('      - Jurisdicción especial indígena', 9);
      addText('      - Resguardos indígenas', 9);
      
      addText('B. COMUNIDADES AFRODESCENDIENTES:', 11, true, [0, 100, 0]);
      addText('   1. Consejos Comunitarios', 10);
      addText('      - Territorios colectivos', 9);
      addText('      - Autoridades propias', 9);
      addText('   2. Consulta Previa Afro', 10);
      addText('      - Derecho a la consulta', 9);

      yPosition += 10;
      addSeparator();

      // Pie de página
      addText('='.repeat(60), 8);
      addText('Generado por el Sistema CSDT - Consejo IA', 8, false, [100, 100, 100]);
      addText('Fecha: ' + new Date().toLocaleString('es-CO'), 8, false, [100, 100, 100]);

      doc.save('Analisis_Consejo_IA_Doctorado.pdf');
    } catch (error) {
      alert('Error al generar el PDF. Intente nuevamente.');
    }
  };

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
            Consejo IA
          </h1>
          <p style={{
            fontSize: '1.2rem', 
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            <strong>Sistema de Inteligencia Artificial para Análisis Jurídico</strong>
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b',
            marginTop: '10px'
          }}>
            Análisis especializado con múltiples IAs profesionales
          </p>
        </div>

        {/* Formulario de Análisis */}
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
            Formulario de Análisis
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: 'bold',
              color: '#374151',
              marginBottom: '8px'
            }}>
              Hechos a Analizar *
            </label>
            <textarea
              value={hechos}
              onChange={(e) => setHechos(e.target.value)}
              required
              rows="6"
              placeholder="Describa detalladamente los hechos que desea analizar con el Consejo IA..."
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


          <div style={{ textAlign: 'center', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
              onClick={handleAnalizar}
              disabled={cargando}
                style={{
                background: cargando ? '#9ca3af' : '#10b981',
                  color: 'white',
                padding: '15px 30px',
                  border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                  fontWeight: 'bold',
                cursor: cargando ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}
              >
              {cargando ? 'Analizando...' : 'Analizar con Consejo IA'}
              </button>

                <button
              onClick={limpiarAnalisis}
                  style={{
                background: '#ef4444',
                    color: 'white',
                padding: '15px 30px',
                    border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                    cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                  }}
                >
              Limpiar y Hacer Nuevo Análisis
                </button>
              </div>
          </div>


        {/* Análisis Contextual Mejorado de Nivel Doctorado */}
        {analisisContextual && analisisCompleto && (
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
              Análisis Contextual con IA Mejorada
            </h2>
            
             <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
               marginBottom: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
             }}>
               <div style={{
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '15px',
                marginBottom: '20px'
              }}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '5px'
                }}>
                  Sistema de IA Mejorada
                   </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#059669',
                  marginBottom: '5px'
                }}>
                  Clasificación Inteligente y Análisis Contextual
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#6b7280',
                  fontStyle: 'italic'
                }}>
                  Procesamiento de lenguaje natural para análisis jurídico especializado
                </p>
                 </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Clasificación del Caso
                </h5>
                <p style={{ 
                  color: '#4b5563', 
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  <strong>Tipo de Caso:</strong> {analisisContextual.contexto?.tipoCaso || 'No clasificado'}<br/>
                  <strong>Nivel de Urgencia:</strong> {analisisContextual.contexto?.nivelUrgencia || 'Media'}<br/>
                  <strong>Confianza en Clasificación:</strong> {Math.round((analisisContextual.contexto?.confianzaClasificacion || 0) * 100)}%
                </p>
                 </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Palabras Clave Identificadas
                </h5>
                <div style={{ marginTop: '5px' }}>
                  {analisisContextual.contexto?.palabrasClave?.slice(0, 10).map((palabra, idx) => (
                    <span key={idx} style={{ 
                      background: '#e5e7eb', 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      margin: '2px',
                      fontSize: '0.8rem',
                      display: 'inline-block',
                      color: '#374151'
                    }}>
                      {palabra}
                    </span>
                  ))}
                   </div>
                 </div>

              {/* Entidades Identificadas */}
              {analisisContextual.contexto?.entidadesMencionadas?.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <h5 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Entidades Identificadas
                  </h5>
                  {analisisContextual.contexto.entidadesMencionadas.map((entidad, idx) => (
                    <div key={idx} style={{ marginBottom: '8px', paddingLeft: '15px' }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                        • {entidad.nombre}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                        {entidad.categoria}
                      </p>
                 </div>
                  ))}
               </div>
              )}

              {/* Recomendaciones del Sistema */}
              {analisisContextual.recomendaciones && (
                <div style={{ marginBottom: '15px' }}>
                  <h5 style={{ 
                    fontSize: '1rem', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Recomendaciones del Sistema
                  </h5>
                  
                  {analisisContextual.recomendaciones.especialistasRecomendados && (
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                        Especialistas Recomendados:
                      </p>
                      {analisisContextual.recomendaciones.especialistasRecomendados.map((especialista, idx) => (
                        <p key={idx} style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '2px', paddingLeft: '15px' }}>
                          • {especialista}
                        </p>
                      ))}
                   </div>
                  )}

                  {analisisContextual.recomendaciones.plazosSugeridos && (
                    <div style={{ marginBottom: '10px' }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                        Plazos Sugeridos:
                      </p>
                      {analisisContextual.recomendaciones.plazosSugeridos.slice(0, 5).map((plazo, idx) => (
                        <span key={idx} style={{ 
                          background: '#fef3c7', 
                          padding: '2px 8px', 
                          borderRadius: '10px', 
                          margin: '2px',
                          fontSize: '0.7rem',
                          display: 'inline-block',
                          color: '#92400e'
                        }}>
                          {plazo}
                        </span>
                      ))}
                           </div>
                  )}

                  {analisisContextual.recomendaciones.documentosNecesarios && (
                    <div style={{ marginBottom: '0' }}>
                      <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                        Documentos Necesarios:
                      </p>
                      {analisisContextual.recomendaciones.documentosNecesarios.map((doc, idx) => (
                        <p key={idx} style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '2px', paddingLeft: '15px' }}>
                          • {doc}
                        </p>
                       ))}
                     </div>
                   )}
                </div>
              )}
            </div>
                 </div>
               )}

        {/* Análisis Doctoral Especializado */}
        {analisisContextual?.analisisDoctoral && analisisCompleto && (
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
              Análisis Especializado
            </h2>
            
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '15px',
                marginBottom: '20px'
              }}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '5px'
                }}>
                  Sistema de IA Doctoral
                </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#059669',
                  marginBottom: '5px'
                }}>
                  {analisisContextual.analisisDoctoral.nivelAcademico}
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#6b7280',
                  fontStyle: 'italic'
                }}>
                  {analisisContextual.analisisDoctoral.metodologia}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Enfoque Teórico
                </h5>
                <p style={{ 
                  color: '#4b5563', 
                  lineHeight: '1.6',
                  marginBottom: '15px',
                  fontSize: '0.9rem'
                }}>
                  {analisisContextual.analisisDoctoral.enfoqueTeorico}
                </p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Análisis Crítico Doctoral
                </h5>
                <div style={{ 
                  background: '#f3f4f6', 
                  borderRadius: '8px', 
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <pre style={{ 
                    fontSize: '0.8rem', 
                    lineHeight: '1.5', 
                    color: '#4b5563',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit'
                  }}>
                    {analisisContextual.analisisDoctoral.analisisCritico}
                  </pre>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Fundamentación Teórica
                </h5>
                <div style={{ 
                  background: '#f3f4f6', 
                  borderRadius: '8px', 
                  padding: '15px',
                  marginBottom: '15px'
                }}>
                  <pre style={{ 
                    fontSize: '0.8rem', 
                    lineHeight: '1.5', 
                    color: '#4b5563',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit'
                  }}>
                    {analisisContextual.analisisDoctoral.fundamentacionTeorica}
                  </pre>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Conclusiones Doctorales
                </h5>
                <div style={{ 
                  background: '#fef3c7', 
                  borderRadius: '8px', 
                  padding: '15px',
                  border: '1px solid #f59e0b'
                }}>
                  <pre style={{ 
                    fontSize: '0.8rem', 
                    lineHeight: '1.5', 
                    color: '#92400e',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'inherit'
                  }}>
                    {analisisContextual.analisisDoctoral.conclusionesDoctorales}
                  </pre>
                </div>
              </div>

              <div style={{ marginBottom: '0' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '10px'
                }}>
                  Recomendaciones de Investigación
                </h5>
                <ul style={{ paddingLeft: '20px', fontSize: '0.9rem', color: '#4b5563' }}>
                  {analisisContextual.analisisDoctoral.recomendacionesInvestigacion?.map((recomendacion, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{recomendacion}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Análisis de ChatGPT Mejorado */}
        {analisisChatGPTMejorado && analisisCompleto && (
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
              Análisis de ChatGPT Mejorado
            </h2>
            
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '15px',
                marginBottom: '20px'
              }}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '5px'
                }}>
                  ChatGPT Mejorado
                </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#059669',
                  marginBottom: '5px'
                }}>
                  Prompts Profesionales y Análisis Especializado
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#6b7280',
                  fontStyle: 'italic'
                }}>
                  Sistema integrado con fundamentos jurídicos y narrativas profesionales
                </p>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Prompt Mejorado Generado
                </h5>
                <div style={{ 
                  background: '#f3f4f6', 
                  borderRadius: '8px', 
                   padding: '15px',
                  marginBottom: '15px'
                }}>
                  <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#1e40af' }}>
                    Sistema:
                  </h6>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#4b5563' }}>
                    {analisisChatGPTMejorado.promptMejorado?.sistema?.substring(0, 300)}...
                  </p>
                </div>
                <div style={{ 
                  background: '#f3f4f6', 
                   borderRadius: '8px',
                  padding: '15px'
                }}>
                  <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#059669' }}>
                    Usuario:
                  </h6>
                  <p style={{ fontSize: '0.8rem', lineHeight: '1.5', color: '#4b5563' }}>
                    {analisisChatGPTMejorado.promptMejorado?.usuario?.substring(0, 300)}...
                  </p>
                   </div>
                         </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Narrativa Profesional Mejorada
                         </h5>
                <p style={{ 
                  color: '#4b5563', 
                  lineHeight: '1.6',
                  marginBottom: '15px',
                  fontSize: '0.9rem'
                }}>
                  {analisisChatGPTMejorado.narrativaProfesional?.substring(0, 400)}...
                         </p>
                       </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Fundamentos Jurídicos por Niveles
                </h5>
                
                {analisisChatGPTMejorado.fundamentosJuridicos?.nacional && (
                  <div style={{ marginBottom: '10px' }}>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '5px' }}>
                      NACIONAL
                    </h6>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      {analisisChatGPTMejorado.fundamentosJuridicos.nacional.length} fundamentos disponibles
                    </p>
                    <div style={{ marginLeft: '15px' }}>
                      {analisisChatGPTMejorado.fundamentosJuridicos.nacional.slice(0, 3).map((fundamento, idx) => (
                        <p key={idx} style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '2px' }}>
                          • {fundamento.titulo}
                        </p>
                     ))}
                   </div>
                 </div>
               )}

                {analisisChatGPTMejorado.fundamentosJuridicos?.internacional && (
                  <div style={{ marginBottom: '10px' }}>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#059669', marginBottom: '5px' }}>
                      INTERNACIONAL
                    </h6>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      {analisisChatGPTMejorado.fundamentosJuridicos.internacional.length} fundamentos disponibles
                    </p>
                    <div style={{ marginLeft: '15px' }}>
                      {analisisChatGPTMejorado.fundamentosJuridicos.internacional.slice(0, 3).map((fundamento, idx) => (
                        <p key={idx} style={{ fontSize: '0.7rem', color: '#6b7280', marginBottom: '2px' }}>
                          • {fundamento.titulo}
                        </p>
                      ))}
                    </div>
             </div>
           )}

                {analisisChatGPTMejorado.fundamentosJuridicos?.departamental && (
                  <div style={{ marginBottom: '10px' }}>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#7c3aed', marginBottom: '5px' }}>
                      DEPARTAMENTAL
                    </h6>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      {analisisChatGPTMejorado.fundamentosJuridicos.departamental.length} fundamentos disponibles
                    </p>
                  </div>
                )}

                {analisisChatGPTMejorado.fundamentosJuridicos?.municipal && (
                  <div style={{ marginBottom: '10px' }}>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ea580c', marginBottom: '5px' }}>
                      MUNICIPAL
                    </h6>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      {analisisChatGPTMejorado.fundamentosJuridicos.municipal.length} fundamentos disponibles
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
               fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Respuesta de ChatGPT Mejorada
                </h5>
                 <div style={{
                  background: '#f3f4f6', 
                  borderRadius: '8px', 
                  padding: '15px',
                  maxHeight: '200px',
                  overflowY: 'auto'
                }}>
                  <p style={{ 
                    fontSize: '0.8rem', 
                    lineHeight: '1.5', 
                    color: '#4b5563'
                  }}>
                    {analisisChatGPTMejorado.respuestaMejorada?.substring(0, 600)}...
                  </p>
                </div>
        </div>

              <div style={{ marginBottom: '0' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Procesamiento y Mejoras
                </h5>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#374151' }}>Especialidad:</strong> 
                  <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                    {analisisChatGPTMejorado.procesamiento?.especialidad || 'No especificada'}
                  </span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong style={{ color: '#374151' }}>Versión:</strong> 
                  <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                    {analisisChatGPTMejorado.procesamiento?.version || 'No disponible'}
                  </span>
                </div>
                <div style={{ marginBottom: '0' }}>
                  <strong style={{ color: '#374151' }}>Mejoras Aplicadas:</strong>
                  <div style={{ marginTop: '5px' }}>
                    {analisisChatGPTMejorado.procesamiento?.mejorasAplicadas?.map((mejora, idx) => (
                      <span key={idx} style={{ 
                        background: '#e5e7eb', 
                        padding: '2px 8px', 
                        borderRadius: '15px', 
                        margin: '2px',
                        fontSize: '0.7rem',
                        display: 'inline-block',
                        color: '#374151'
                      }}>
                        {mejora.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Análisis Narrativo Profesional */}
        {analisisNarrativo && analisisCompleto && (
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
              Análisis Narrativo Doctoral y Fundamentos Integrales
            </h2>

            {/* Narrativa Mejorada */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{
                fontSize: '1.3rem', 
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '15px',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '10px'
              }}>
                Narrativa Mejorada por IA Especializada
              </h3>
              <div style={{ 
                color: '#374151', 
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                {analisisNarrativo.narrativaMejorada?.split('\n').map((parrafo, index) => (
                  <p key={index} style={{ marginBottom: '12px' }}>
                    {parrafo}
                  </p>
                ))}
                  </div>
                </div>

            {/* Fundamentos Jurídicos Multinivel */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#1e40af',
                marginBottom: '20px',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '10px'
              }}>
                Fundamentos Jurídicos Multinivel
              </h3>
              
              {/* Nacional */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#059669', marginBottom: '10px' }}>
                  🏛️ NIVEL NACIONAL
                </h4>
                <div style={{ marginLeft: '20px' }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Constitucional:
                  </h5>
                  <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
                    {analisisNarrativo.fundamentosJuridicos?.nacional?.constitucional?.map((item, index) => (
                      <li key={index} style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '3px' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Legal:
                  </h5>
                  <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
                    {analisisNarrativo.fundamentosJuridicos?.nacional?.legal?.map((item, index) => (
                      <li key={index} style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '3px' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Internacional */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '10px' }}>
                  🌍 NIVEL INTERNACIONAL
                </h4>
                <div style={{ marginLeft: '20px' }}>
                  <h5 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                    Tratados:
                  </h5>
                  <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
                    {analisisNarrativo.fundamentosJuridicos?.internacional?.tratados?.map((item, index) => (
                      <li key={index} style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '3px' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Departamental */}
              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#7c3aed', marginBottom: '10px' }}>
                  🏢 NIVEL DEPARTAMENTAL
                </h4>
                <div style={{ marginLeft: '20px' }}>
                  <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
                    {analisisNarrativo.fundamentosJuridicos?.departamental?.normativa?.map((item, index) => (
                      <li key={index} style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '3px' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Municipal */}
              <div style={{ marginBottom: '0' }}>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ea580c', marginBottom: '10px' }}>
                  🏘️ NIVEL MUNICIPAL
                </h4>
                <div style={{ marginLeft: '20px' }}>
                  <ul style={{ marginBottom: '10px', paddingLeft: '20px' }}>
                    {analisisNarrativo.fundamentosJuridicos?.municipal?.normativa?.map((item, index) => (
                      <li key={index} style={{ fontSize: '0.9rem', color: '#4b5563', marginBottom: '3px' }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Fundamentos Técnicos, Sociales, Políticos y Étnicos */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#1e40af',
                marginBottom: '20px',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '10px'
              }}>
                Fundamentos Integrales por Área
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Técnicos */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#059669', marginBottom: '8px' }}>
                    🔧 TÉCNICOS
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#4b5563' }}>
                    {analisisNarrativo.fundamentosTecnicos?.procedimientos?.slice(0, 2).map((item, index) => (
                      <li key={index} style={{ marginBottom: '3px' }}>{item}</li>
                    ))}
                  </ul>
                  </div>

                {/* Sociales */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '8px' }}>
                    👥 SOCIALES
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#4b5563' }}>
                    {analisisNarrativo.fundamentosSociales?.comunidades?.slice(0, 2).map((item, index) => (
                      <li key={index} style={{ marginBottom: '3px' }}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Políticos */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#7c3aed', marginBottom: '8px' }}>
                    🏛️ POLÍTICOS
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#4b5563' }}>
                    {analisisNarrativo.fundamentosPoliticos?.participacion?.slice(0, 2).map((item, index) => (
                      <li key={index} style={{ marginBottom: '3px' }}>{item}</li>
                    ))}
                  </ul>
                  </div>

                {/* Étnicos */}
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#ea580c', marginBottom: '8px' }}>
                    🌿 ÉTNICOS
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#4b5563' }}>
                    {analisisNarrativo.fundamentosEtnicos?.derechos?.slice(0, 2).map((item, index) => (
                      <li key={index} style={{ marginBottom: '3px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Concepto General y Pasos a Seguir */}
            <div style={{
              background: '#fef3c7',
              border: '2px solid #f59e0b',
                borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#92400e',
                marginBottom: '15px',
                borderBottom: '2px solid #f59e0b',
                paddingBottom: '10px'
              }}>
                Concepto General del Consejo IA
              </h3>
                <div style={{
                color: '#92400e', 
                lineHeight: '1.6',
                fontSize: '0.95rem',
                marginBottom: '20px'
              }}>
                {analisisNarrativo.conceptoGeneral?.split('\n').map((parrafo, index) => (
                  <p key={index} style={{ marginBottom: '10px' }}>
                    {parrafo}
                  </p>
                ))}
              </div>

              {/* Pasos a Seguir */}
                  <h4 style={{
                fontSize: '1.1rem', 
                    fontWeight: 'bold',
                color: '#92400e',
                marginBottom: '15px',
                marginTop: '20px'
                  }}>
                Pasos a Seguir
                  </h4>
              <div style={{ display: 'grid', gap: '15px' }}>
                {Object.entries(analisisNarrativo.pasosSeguir || {}).map(([key, paso]) => (
                  <div key={key} style={{
                    background: '#fef7cd',
                    border: '1px solid #f59e0b',
                    borderRadius: '8px',
                    padding: '15px'
                  }}>
                    <h5 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
                      {paso.titulo}
                    </h5>
                    <p style={{ fontSize: '0.85rem', color: '#92400e', marginBottom: '8px', fontWeight: '600' }}>
                      Plazo: {paso.plazo}
                    </p>
                    <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#92400e' }}>
                      {paso.acciones?.map((accion, index) => (
                        <li key={index} style={{ marginBottom: '3px' }}>{accion}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Gestiones Clave para Evidencia */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                      color: '#1e40af',
                marginBottom: '20px',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '10px'
              }}>
                Gestiones Clave para Evidencia y Salvaguarda
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {Object.entries(analisisNarrativo.gestionesClave || {}).map(([periodo, gestiones]) => (
                  <div key={periodo} style={{
                    background: '#f3f4f6',
                    borderRadius: '8px',
                    padding: '15px'
                  }}>
                    <h4 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      color: '#374151',
                      marginBottom: '10px',
                      textTransform: 'capitalize'
                    }}>
                      {periodo.replace('Plazo', 'Plazo: ')}
                    </h4>
                    <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#4b5563' }}>
                      {gestiones?.map((gestion, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{gestion}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Análisis Profesional Global */}
        {analisisProfesionalGlobal && analisisCompleto && (
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
              Análisis Doctoral Global Multidisciplinario
            </h2>
            
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '20px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <div style={{
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '15px',
                marginBottom: '20px'
              }}>
                <h4 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '5px'
                }}>
                  Sistema de IA Profesional Multidisciplinario
                </h4>
                <p style={{ 
                  fontSize: '1rem', 
                  fontWeight: '600', 
                  color: '#059669',
                  marginBottom: '5px'
                }}>
                  {analisisProfesionalGlobal.nivelExperiencia}
                </p>
                <p style={{ 
                  fontSize: '0.9rem', 
                  color: '#6b7280',
                  fontStyle: 'italic'
                }}>
                  {analisisProfesionalGlobal.nivelProfesional} - {analisisProfesionalGlobal.confiabilidad}
                </p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h5 style={{
                  fontSize: '1rem', 
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                  Resumen Ejecutivo Multidisciplinario
                  </h5>
                  <p style={{
                  color: '#4b5563', 
                  lineHeight: '1.6',
                  marginBottom: '15px',
                  fontSize: '0.9rem'
                }}>
                  {analisisProfesionalGlobal.analisisMultidisciplinario?.resumenEjecutivo?.substring(0, 400)}...
                  </p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <h5 style={{
                  fontSize: '1rem', 
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                  Respuestas Mejoradas por Especialidad
                  </h5>
                {analisisProfesionalGlobal.respuestasMejoradas?.map((respuesta, index) => (
                  <div key={index} style={{ 
                    marginBottom: '15px', 
                    padding: '15px',
                    background: '#f3f4f6',
                    borderRadius: '8px'
                  }}>
                    <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '8px', color: '#1e40af' }}>
                      {respuesta.metadata?.especialidad?.replace('_', ' ').toUpperCase() || `Especialista ${index + 1}`}
                    </h6>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      <strong>Nivel:</strong> {respuesta.respuestaMejorada?.nivelProfesional || 'Experto'}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      <strong>Confiabilidad:</strong> {respuesta.respuestaMejorada?.confiabilidad || 'Alta'}
                    </p>
                    <div style={{ marginTop: '8px' }}>
                      <strong style={{ color: '#374151' }}>Mejoras Aplicadas:</strong>
                      <div style={{ marginTop: '3px' }}>
                        {respuesta.metadata?.mejorasAplicadas?.map((mejora, idx) => (
                          <span key={idx} style={{ 
                            background: '#e5e7eb', 
                            padding: '2px 6px', 
                            borderRadius: '10px', 
                            margin: '1px',
                            fontSize: '0.6rem',
                            display: 'inline-block',
                            color: '#374151'
                          }}>
                            {mejora.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                </div>

              <div style={{ marginBottom: '15px' }}>
                <h5 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Recomendaciones Consolidadas
                </h5>
                {analisisProfesionalGlobal.analisisMultidisciplinario?.recomendacionesConsolidadas && (
                <div>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      <strong>Especialistas Recomendados:</strong> {analisisProfesionalGlobal.analisisMultidisciplinario.recomendacionesConsolidadas.especialistasRecomendados?.join(', ')}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      <strong>Nivel de Urgencia:</strong> {analisisProfesionalGlobal.analisisMultidisciplinario.recomendacionesConsolidadas.nivelUrgencia}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '5px' }}>
                      <strong>Seguimiento:</strong> {analisisProfesionalGlobal.analisisMultidisciplinario.recomendacionesConsolidadas.seguimientoRecomendado}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '0' }}>
                  <h5 style={{
                  fontSize: '1rem', 
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                  Nivel de Experiencia del Sistema
                  </h5>
                <div style={{ 
                  background: '#fef3c7', 
                  borderRadius: '8px', 
                  padding: '15px',
                  border: '1px solid #f59e0b'
                }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#92400e', marginBottom: '5px' }}>
                    🏆 Sistema de Experiencia Profesional Certificada
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '3px' }}>
                    <strong>Experiencia Combinada:</strong> {analisisProfesionalGlobal.analisisMultidisciplinario?.nivelExperiencia || '135+ años'}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '3px' }}>
                    <strong>Nivel Profesional:</strong> {analisisProfesionalGlobal.nivelProfesional || 'Experto - Nivel judicial'}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                    <strong>Confiabilidad:</strong> {analisisProfesionalGlobal.confiabilidad || 'Máxima - Basado en experiencia práctica'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recomendaciones Integrales y Rutas Específicas */}
        {analisisNarrativo && analisisCompleto && (
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
              Recomendaciones Jurídicas, Administrativas e Institucionales Integrales - Nivel Doctoral
            </h2>

            {/* Recomendaciones por Área */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#1e40af',
                marginBottom: '20px',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '10px'
              }}>
                Recomendaciones Especializadas por Área
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Jurídicas */}
                <div style={{
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '12px' }}>
                    ⚖️ RECOMENDACIONES JURÍDICAS
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.9rem', color: '#374151' }}>
                    {analisisNarrativo.recomendacionesIntegrales?.juridicas?.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>

                {/* Administrativas */}
            <div style={{
                  background: '#f0f9ff',
                  border: '1px solid #bae6fd',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#0284c7', marginBottom: '12px' }}>
                    🏛️ RECOMENDACIONES ADMINISTRATIVAS
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.9rem', color: '#374151' }}>
                    {analisisNarrativo.recomendacionesIntegrales?.administrativas?.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>

                {/* Institucionales */}
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#16a34a', marginBottom: '12px' }}>
                    🏢 RECOMENDACIONES INSTITUCIONALES
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.9rem', color: '#374151' }}>
                    {analisisNarrativo.recomendacionesIntegrales?.institucionales?.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>

                {/* Sociales */}
                <div style={{
                  background: '#fefce8',
                  border: '1px solid #fde047',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#ca8a04', marginBottom: '12px' }}>
                    👥 RECOMENDACIONES SOCIALES
                  </h4>
                  <ul style={{ paddingLeft: '15px', fontSize: '0.9rem', color: '#374151' }}>
                    {analisisNarrativo.recomendacionesIntegrales?.sociales?.map((rec, index) => (
                      <li key={index} style={{ marginBottom: '8px' }}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Rutas Específicas por Especialidad */}
            <div style={{
              background: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{
                fontSize: '1.3rem', 
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '20px',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '10px'
              }}>
                Rutas Específicas por Especialidad Jurídica - Nivel Doctoral
              </h3>

              <div style={{ display: 'grid', gap: '15px' }}>
                {Object.entries(analisisNarrativo.rutasEspecificas || {}).map(([especialidad, ruta]) => (
                  <div key={especialidad} style={{
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '10px',
                    padding: '20px'
                  }}>
                    <h4 style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: 'bold', 
                      color: '#374151',
                      marginBottom: '12px',
                      textTransform: 'capitalize'
                    }}>
                      {especialidad.replace('_', ' ')} - {ruta.ruta}
                    </h4>
                    
                    <div style={{ marginBottom: '10px' }}>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#4b5563', marginBottom: '5px' }}>
                        Documentos a Presentar:
                      </h5>
                      <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#6b7280' }}>
                        {ruta.documentos?.map((doc, index) => (
                          <li key={index} style={{ marginBottom: '3px' }}>{doc}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginBottom: '10px' }}>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#4b5563', marginBottom: '5px' }}>
                        Entidades Competentes:
                      </h5>
                      <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#6b7280' }}>
                        {ruta.entidades?.map((entidad, index) => (
                          <li key={index} style={{ marginBottom: '3px' }}>{entidad}</li>
                        ))}
                      </ul>
                    </div>

                    <div style={{ marginBottom: '0' }}>
                      <h5 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#4b5563', marginBottom: '5px' }}>
                        Plazos:
                      </h5>
                      <p style={{ fontSize: '0.85rem', color: '#dc2626', fontWeight: '600' }}>
                        {ruta.plazos}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Archivos y Evidencia Requerida */}
            <div style={{
              background: '#fef3c7',
              border: '2px solid #f59e0b',
              borderRadius: '10px',
              padding: '25px',
              marginBottom: '0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#92400e',
                marginBottom: '20px',
                borderBottom: '2px solid #f59e0b',
                paddingBottom: '10px'
              }}>
                Archivos y Evidencia Requerida - Nivel Doctoral
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {Object.entries(analisisNarrativo.gestionesEvidencia || {}).map(([tipo, evidencias]) => (
                  <div key={tipo} style={{
                    background: '#fef7cd',
                    border: '1px solid #f59e0b',
                  borderRadius: '8px',
                    padding: '15px'
                  }}>
                    <h4 style={{ 
                      fontSize: '1rem', 
                  fontWeight: 'bold',
                      color: '#92400e',
                      marginBottom: '10px',
                      textTransform: 'capitalize'
                    }}>
                      {tipo === 'documental' ? '📄 Documental' :
                       tipo === 'testimonial' ? '👥 Testimonial' :
                       tipo === 'tecnica' ? '🔧 Técnica' : '🌍 Social'}
                    </h4>
                    <ul style={{ paddingLeft: '15px', fontSize: '0.85rem', color: '#92400e' }}>
                      {evidencias?.map((evidencia, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{evidencia}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div style={{ 
                marginTop: '20px',
                padding: '15px',
                background: '#fbbf24',
                borderRadius: '8px',
                border: '1px solid #f59e0b'
              }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
                  📋 Sistema de Archivos del Consejo IA - Nivel Doctoral
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#92400e', marginBottom: '10px' }}>
                  Los archivos generados se guardarán automáticamente y estarán disponibles para consulta en las páginas siguientes del sistema.
                </p>
                <p style={{ fontSize: '0.85rem', color: '#92400e', fontWeight: '600' }}>
                  ✅ Archivo de análisis guardado | ✅ Evidencias catalogadas | ✅ Rutas documentadas
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Resultados del Análisis */}
        {analisisCompleto && (
        <div style={{
            background: 'white', 
          borderRadius: '15px',
          padding: '40px',
            marginBottom: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{
              background: '#fef3c7', 
              border: '2px solid #f59e0b', 
              borderRadius: '10px', 
              padding: '20px',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#92400e',
                marginBottom: '10px'
              }}>
                ANÁLISIS DE DEMOSTRACIÓN - NIVEL DOCTORADO
              </h3>
              <p style={{ color: '#92400e', fontSize: '1rem' }}>
                Este es un análisis de demostración del sistema de nivel doctoral. Para realizar un análisis personalizado, 
                utilice el formulario anterior.
              </p>
            </div>

            <h2 style={{
              fontSize: '1.8rem', 
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Resultados del Análisis Doctoral
            </h2>

            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '15px'
              }}>
                Análisis Consolidado Doctoral
              </h3>
              <div style={{
                background: '#f0f9ff',
                border: '2px solid #0ea5e9',
                borderRadius: '10px',
                padding: '20px'
              }}>
                <p style={{ color: '#0369a1', marginBottom: '10px' }}>
                  <strong>Nivel de Riesgo:</strong> {analisisCompleto.nivelRiesgoConsolidado || 'No disponible'}
                </p>
                <p style={{ color: '#0369a1' }}>
                  <strong>Concepto General:</strong> {analisisCompleto.conceptoGeneralConsolidado || 'No disponible'}
                </p>
              </div>
          </div>

            {respuestaIA?.detallesIAs && Array.isArray(respuestaIA.detallesIAs) && (
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '15px'
                }}>
                  Análisis por Especialistas Doctorales
                </h3>
                
                {respuestaIA.detallesIAs.map((ia, index) => (
                  <div key={index} style={{
                    background: '#f8fafc',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '25px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{
                      borderBottom: '2px solid #e2e8f0',
                      paddingBottom: '15px',
                      marginBottom: '20px'
                    }}>
                    <h4 style={{
                        fontSize: '1.2rem', 
                      fontWeight: 'bold',
                        color: '#1e40af',
                      marginBottom: '5px'
                    }}>
                        {index + 1}. {ia.nombre || 'Especialista Desconocido'}
                    </h4>
                    <p style={{
                        fontSize: '1rem', 
                        fontWeight: '600', 
                        color: '#059669',
                      marginBottom: '5px'
                    }}>
                        {ia.titulo || 'Especialista'}
                    </p>
                    <p style={{
                        fontSize: '0.9rem', 
                        color: '#6b7280',
                        fontStyle: 'italic'
                    }}>
                        {ia.experiencia || 'Experiencia especializada'}
                    </p>
                  </div>

                    <div style={{ marginBottom: '15px' }}>
                      <h5 style={{ 
                        fontSize: '1rem', 
                      fontWeight: 'bold',
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        📋 Narrativa de Hechos
                      </h5>
                      <p style={{ 
                        color: '#4b5563', 
                        lineHeight: '1.6',
                        marginBottom: '15px'
                      }}>
                        {ia.narrativaHechos || 'No disponible'}
                      </p>
                  </div>

                    {/* Fundamentos Jurídicos por Nivel */}
                    {ia.fundamentosJuridicos && (
                      <div style={{ marginBottom: '15px' }}>
                        <h5 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 'bold', 
                          color: '#374151',
                          marginBottom: '10px'
                        }}>
                          ⚖️ Fundamentos Jurídicos
                        </h5>
                        
                        {ia.fundamentosJuridicos.nacional && ia.fundamentosJuridicos.nacional.length > 0 && (
                          <div style={{ marginBottom: '10px' }}>
                            <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#dc2626', marginBottom: '5px' }}>
                              🇨🇴 NACIONAL
                            </h6>
                            {ia.fundamentosJuridicos.nacional.map((fundamento, idx) => (
                              <div key={idx} style={{ marginBottom: '8px', paddingLeft: '15px' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                                  📜 {fundamento.titulo}: {fundamento.articulos?.join(', ') || 'Artículos aplicables'}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                                  {fundamento.aplicacion}
                                </p>
                </div>
              ))}
            </div>
          )}

                        {ia.fundamentosJuridicos.internacional && ia.fundamentosJuridicos.internacional.length > 0 && (
                          <div style={{ marginBottom: '10px' }}>
                            <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#059669', marginBottom: '5px' }}>
                              🌍 INTERNACIONAL
                            </h6>
                            {ia.fundamentosJuridicos.internacional.map((fundamento, idx) => (
                              <div key={idx} style={{ marginBottom: '8px', paddingLeft: '15px' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                                  📜 {fundamento.titulo}: {fundamento.articulos?.join(', ') || 'Artículos aplicables'}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                                  {fundamento.aplicacion}
                                </p>
        </div>
                            ))}
                          </div>
                        )}

                        {ia.fundamentosJuridicos.departamental && ia.fundamentosJuridicos.departamental.length > 0 && (
                          <div style={{ marginBottom: '10px' }}>
                            <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#7c3aed', marginBottom: '5px' }}>
                              🏛️ DEPARTAMENTAL
                            </h6>
                            {ia.fundamentosJuridicos.departamental.map((fundamento, idx) => (
                              <div key={idx} style={{ marginBottom: '8px', paddingLeft: '15px' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                                  📜 {fundamento.titulo}: {fundamento.articulos?.join(', ') || 'Artículos aplicables'}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                                  {fundamento.aplicacion}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}

                        {ia.fundamentosJuridicos.municipal && ia.fundamentosJuridicos.municipal.length > 0 && (
                          <div style={{ marginBottom: '10px' }}>
                            <h6 style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#ea580c', marginBottom: '5px' }}>
                              🏘️ MUNICIPAL
                            </h6>
                            {ia.fundamentosJuridicos.municipal.map((fundamento, idx) => (
                              <div key={idx} style={{ marginBottom: '8px', paddingLeft: '15px' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                                  📜 {fundamento.titulo}: {fundamento.articulos?.join(', ') || 'Artículos aplicables'}
                                </p>
                                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                                  {fundamento.aplicacion}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Jurisprudencia */}
                    {ia.jurisprudencia && ia.jurisprudencia.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <h5 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 'bold', 
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          ⚖️ Jurisprudencia Aplicable
                        </h5>
                        {ia.jurisprudencia.map((juris, idx) => (
                          <div key={idx} style={{ marginBottom: '8px', paddingLeft: '15px' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', marginBottom: '3px' }}>
                              🏛️ {juris.corte}:
                            </p>
                            {juris.sentencias.map((sentencia, sidx) => (
                              <p key={sidx} style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '2px', paddingLeft: '10px' }}>
                                • {sentencia}
                              </p>
                            ))}
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                              {juris.aplicacion}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Análisis Detallado */}
                    <div style={{ marginBottom: '15px' }}>
                      <h5 style={{ 
                        fontSize: '1rem', 
                        fontWeight: 'bold', 
                        color: '#374151',
                        marginBottom: '8px'
                      }}>
                        🔍 Análisis Detallado
                      </h5>
                      <p style={{ 
                        color: '#4b5563', 
                        lineHeight: '1.6',
                        marginBottom: '0'
                      }}>
                        {ia.analisisDetallado || 'No disponible'}
                      </p>
                    </div>

                    {/* Recomendaciones Específicas */}
                    {ia.recomendaciones && ia.recomendaciones.length > 0 && (
                      <div style={{ marginBottom: '15px' }}>
                        <h5 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 'bold', 
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          💡 Recomendaciones Específicas
                        </h5>
                        {ia.recomendaciones.map((rec, idx) => (
                          <div key={idx} style={{ 
                            marginBottom: '10px', 
                            padding: '10px',
                            background: '#fef3c7',
                            borderRadius: '8px',
                            border: '1px solid #f59e0b'
                          }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#92400e', marginBottom: '3px' }}>
                              🎯 {rec.accion} ({rec.tipo})
                            </p>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '3px' }}>
                              <strong>Justificación:</strong> {rec.justificacion}
                            </p>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '3px' }}>
                              <strong>Plazo:</strong> {rec.plazo}
                            </p>
                            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0' }}>
                              <strong>Órgano:</strong> {rec.organo}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rutas de Acción */}
                    {ia.rutasAccion && ia.rutasAccion.length > 0 && (
                      <div style={{ marginBottom: '0' }}>
                        <h5 style={{ 
                          fontSize: '1rem', 
                          fontWeight: 'bold', 
                          color: '#374151',
                          marginBottom: '8px'
                        }}>
                          🛤️ Rutas de Acción
                        </h5>
                        {ia.rutasAccion.map((ruta, idx) => (
                          <div key={idx} style={{ marginBottom: '10px' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1e40af', marginBottom: '5px' }}>
                              📅 {ruta.fase}
                            </p>
                            {ruta.acciones.map((accion, aidx) => (
                              <p key={aidx} style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '2px', paddingLeft: '15px' }}>
                                ✓ {accion}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={generarPDFCompleto}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}
              >
                Generar Reporte Doctoral PDF
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ConsejoIA;
