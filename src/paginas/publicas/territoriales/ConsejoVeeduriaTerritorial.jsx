import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';

const ConsejoVeeduriaTerritorial = () => {
  const [formulario, setFormulario] = useState({
    nom: '',
    doc: '',
    cor: '',
    tel: '',
    dir: '',
    tip_org: '',
    exp: '',
    mot: '',
    comp: '',
    arc: []
  });

  const [analisisTerritorial, setAnalisisTerritorial] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarAnalisis, setMostrarAnalisis] = useState(false);

  const tiposOrganizacion = [
    {
      id: 'comunidad',
      nombre: 'Organización Comunitaria',
      descripcion: 'Juntas de Acción Comunal, organizaciones vecinales, etc.'
    },
    {
      id: 'social',
      nombre: 'Organización Social',
      descripcion: 'ONGs, fundaciones, asociaciones sociales'
    },
    {
      id: 'academica',
      nombre: 'Organización Académica',
      descripcion: 'Universidades, centros de investigación, observatorios'
    },
    {
      id: 'empresarial',
      nombre: 'Organización Empresarial',
      descripcion: 'Cámaras de comercio, gremios, asociaciones empresariales'
    },
    {
      id: 'etnica',
      nombre: 'Organización Étnica',
      descripcion: 'Consejos comunitarios, resguardos indígenas, cabildos'
    },
    {
      id: 'mixta',
      nombre: 'Organización Mixta',
      descripcion: 'Mesa de participación, consejo consultivo, alianza'
    }
  ];

  const mecanismosInnovadores = [
    {
      id: 'consejo_veeduria',
      nombre: 'Consejo de Veeduría y Desarrollo Territorial',
      descripcion: 'Mecanismo innovador de veeduría integral territorial',
      caracteristicas: [
        'Integración de veeduría ciudadana con desarrollo territorial',
        'Participación activa en planificación territorial',
        'Control social de la gestión territorial',
        'Seguimiento a políticas de desarrollo territorial',
        'Evaluación de impacto territorial',
        'Recomendaciones para mejoramiento territorial'
      ],
      beneficios: [
        'Fortalecimiento de la participación ciudadana territorial',
        'Mejoramiento de la gestión pública territorial',
        'Transparencia en la planificación territorial',
        'Control social efectivo del desarrollo territorial'
      ]
    },
    {
      id: 'auditoria_territorial',
      nombre: 'Auditoría Territorial Integral',
      descripcion: 'Auditoría especializada en desarrollo territorial',
      caracteristicas: [
        'Evaluación integral del desarrollo territorial',
        'Análisis de impacto territorial',
        'Verificación de cumplimiento de planes territoriales',
        'Evaluación de políticas territoriales',
        'Recomendaciones para mejoramiento territorial'
      ],
      beneficios: [
        'Evaluación objetiva del desarrollo territorial',
        'Identificación de problemas territoriales',
        'Mejora en la planificación territorial',
        'Control efectivo de la gestión territorial'
      ]
    },
    {
      id: 'observatorio_territorial',
      nombre: 'Observatorio de Desarrollo Territorial',
      descripcion: 'Observatorio especializado en desarrollo territorial',
      caracteristicas: [
        'Seguimiento técnico del desarrollo territorial',
        'Análisis de indicadores territoriales',
        'Evaluación de políticas territoriales',
        'Recomendaciones técnicas territoriales',
        'Difusión de información territorial'
      ],
      beneficios: [
        'Información técnica especializada',
        'Seguimiento continuo del desarrollo territorial',
        'Apoyo técnico a la toma de decisiones',
        'Transparencia en la información territorial'
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar formulario
    if (!formulario.nombre || !formulario.documento || !formulario.email || !formulario.direccion || !formulario.tipoOrganizacion || !formulario.experiencia || !formulario.motivacion || !formulario.compromiso) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
    
    setCargando(true);

    try {
      // Simular análisis territorial simplificado
      const analisisEstructurado = {
        analisis: {
          codigo_caso: `CSDT-${Date.now()}`,
          fecha_analisis: new Date().toISOString(),
          analisisTerritorial: {
            mecanismos_aplicables: [
              {
                tipo: 'constitucional',
                mecanismo: {
                  nombre: 'Acción de Tutela',
                  descripcion: 'Protección inmediata de derechos fundamentales'
                },
                aplicabilidad: 85
              },
              {
                tipo: 'participacion',
                mecanismo: {
                  nombre: 'Veeduría Ciudadana',
                  descripcion: 'Control social a la gestión pública'
                },
                aplicabilidad: 90
              },
              {
                tipo: 'territorial',
                mecanismo: {
                  nombre: 'Consejo de Desarrollo Territorial',
                  descripcion: 'Espacios de coordinación y planificación territorial'
                },
                aplicabilidad: 95
              }
            ],
            recomendaciones_territoriales: [
              {
                titulo: 'Constitución del Consejo',
                descripcion: 'Proceder con la constitución del Consejo de Veeduría Territorial'
              },
              {
                titulo: 'Fortalecimiento Participativo',
                descripcion: 'Implementar mecanismos de participación ciudadana territorial'
              }
            ],
            mecanismos_innovadores: [
              {
                nombre: 'Consejo de Veeduría Territorial',
                descripcion: 'Mecanismo innovador de veeduría integral',
                aplicabilidad: 'Alta'
              },
              {
                nombre: 'Auditoría Territorial Integral',
                descripcion: 'Auditoría especializada en desarrollo territorial',
                aplicabilidad: 'Media'
              }
            ],
            plan_accion: {
              fases: [
                { numero: 1, nombre: 'Constitución', duracion: '30 días' },
                { numero: 2, nombre: 'Implementación', duracion: '60 días' },
                { numero: 3, nombre: 'Seguimiento', duracion: '90 días' }
              ],
              cronograma: [
                { actividad: 'Constitución legal', inicio: 'Inmediato', fin: '30 días' },
                { actividad: 'Primera sesión', inicio: '30 días', fin: '45 días' },
                { actividad: 'Plan de trabajo', inicio: '45 días', fin: '60 días' }
              ]
            }
          }
        }
      };
      
      setAnalisisTerritorial(analisisEstructurado);
      setMostrarAnalisis(true);

      alert('¡Su solicitud ha sido procesada exitosamente! El análisis territorial está listo.');
    } catch (error) {
      console.error('Error en el análisis:', error);
      alert('Error al procesar la solicitud. Intente nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  const generarPDFConsejo = () => {
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
      addText('CONSEJO DE VEEDURÍA Y DESARROLLO TERRITORIAL', 16, true, [30, 64, 175]);
      addText('Mecanismo Innovador de Participación Ciudadana Territorial', 12, true, [30, 64, 175]);
      addText(`Fecha de Generación: ${new Date().toLocaleString('es-CO')}`, 10, false, [100, 100, 100]);
      
      yPosition += 10;
      addSeparator();

      // Información del solicitante
      addText('INFORMACIÓN DEL SOLICITANTE:', 14, true, [139, 0, 0]);
      addText(`Nombre: ${formulario.nombre}`, 11);
      addText(`Documento: ${formulario.documento}`, 11);
      addText(`Email: ${formulario.email}`, 11);
      addText(`Teléfono: ${formulario.telefono}`, 11);
      addText(`Dirección: ${formulario.direccion}`, 11);
      
      const tipoOrg = tiposOrganizacion.find(t => t.id === formulario.tipoOrganizacion);
      if (tipoOrg) {
        addText(`Tipo de Organización: ${tipoOrg.nombre}`, 11);
        addText(`Descripción: ${tipoOrg.descripcion}`, 10, false, [100, 100, 100]);
      }
      
      yPosition += 10;
      addSeparator();

      // Análisis territorial
      if (analisisTerritorial && analisisTerritorial.analisis) {
        addText('ANÁLISIS TERRITORIAL INTEGRAL:', 14, true, [139, 0, 0]);
        addText(`Código de Caso: ${analisisTerritorial.analisis.codigo_caso || 'N/A'}`, 11);
        addText(`Fecha de Análisis: ${analisisTerritorial.analisis.fecha_analisis ? new Date(analisisTerritorial.analisis.fecha_analisis).toLocaleString('es-CO') : new Date().toLocaleString('es-CO')}`, 11);
        
        yPosition += 10;

        // Análisis territorial específico
        if (analisisTerritorial.analisis.analisisTerritorial) {
          const analisis = analisisTerritorial.analisis.analisisTerritorial;
          
          addText('MECANISMOS APLICABLES:', 12, true, [0, 100, 0]);
          if (analisis.mecanismos_aplicables && analisis.mecanismos_aplicables.length > 0) {
            analisis.mecanismos_aplicables.slice(0, 5).forEach((mecanismo, index) => {
              addText(`${index + 1}. ${mecanismo.mecanismo.nombre}`, 10);
              addText(`   Aplicabilidad: ${mecanismo.aplicabilidad}%`, 9, false, [100, 100, 100]);
            });
          }

          addText('RECOMENDACIONES TERRITORIALES:', 12, true, [0, 100, 0]);
          if (analisis.recomendaciones_territoriales && analisis.recomendaciones_territoriales.length > 0) {
            analisis.recomendaciones_territoriales.forEach((rec, index) => {
              addText(`${index + 1}. ${rec.titulo}`, 10);
              addText(`   ${rec.descripcion}`, 9, false, [100, 100, 100]);
            });
          }

          addText('MECANISMOS INNOVADORES RECOMENDADOS:', 12, true, [0, 100, 0]);
          if (analisis.mecanismos_innovadores && analisis.mecanismos_innovadores.length > 0) {
            analisis.mecanismos_innovadores.forEach((mecanismo, index) => {
              addText(`${index + 1}. ${mecanismo.nombre}`, 10);
              addText(`   Aplicabilidad: ${mecanismo.aplicabilidad}`, 9, false, [100, 100, 100]);
            });
          }
        }
      }

      yPosition += 10;
      addSeparator();

      // Plan de acción
      if (analisisTerritorial && analisisTerritorial.analisis && analisisTerritorial.analisis.analisisTerritorial) {
        const planAccion = analisisTerritorial.analisis.analisisTerritorial.plan_accion;
        if (planAccion) {
          addText('PLAN DE ACCIÓN TERRITORIAL:', 14, true, [139, 0, 0]);
          
          if (planAccion.fases && planAccion.fases.length > 0) {
            addText('FASES DEL PLAN:', 12, true, [0, 100, 0]);
            planAccion.fases.forEach((fase, index) => {
              addText(`Fase ${fase.numero}: ${fase.nombre}`, 11);
              addText(`Duración: ${fase.duracion}`, 10, false, [100, 100, 100]);
            });
          }

          if (planAccion.cronograma && planAccion.cronograma.length > 0) {
            addText('CRONOGRAMA:', 12, true, [0, 100, 0]);
            planAccion.cronograma.forEach((actividad, index) => {
              addText(`${actividad.actividad}: ${actividad.inicio} - ${actividad.fin}`, 10);
            });
          }
        }
      }

      yPosition += 10;
      addSeparator();

      // Recomendaciones finales
      addText('RECOMENDACIONES FINALES:', 14, true, [139, 0, 0]);
      addText('1. Proceder con la constitución del Consejo de Veeduría y Desarrollo Territorial', 10);
      addText('2. Implementar los mecanismos innovadores recomendados', 10);
      addText('3. Establecer el cronograma de actividades según el plan propuesto', 10);
      addText('4. Coordinar con las autoridades territoriales competentes', 10);
      addText('5. Iniciar el seguimiento y evaluación territorial continua', 10);

      yPosition += 10;
      addSeparator();

      // Pie de página
      addText('='.repeat(60), 8);
      addText('Generado por el Sistema CSDT - Consejo de Veeduría y Desarrollo Territorial', 8, false, [100, 100, 100]);
      addText('Fecha: ' + new Date().toLocaleString('es-CO'), 8, false, [100, 100, 100]);

      doc.save('Consejo_Veeduria_Desarrollo_Territorial.pdf');
    } catch (error) {
      console.error('Error generando PDF:', error);
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
            Consejo de Veeduría y Desarrollo Territorial
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            <strong>Mecanismo innovador de veeduría integral territorial</strong>
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b',
            marginTop: '10px'
          }}>
            Integración de veeduría ciudadana con desarrollo territorial
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
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Mecanismos Innovadores de Veeduría Territorial
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
            {mecanismosInnovadores.map(mecanismo => (
              <div key={mecanismo.id} style={{
                background: '#f8fafc',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '20px',
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '10px'
                }}>
                  {mecanismo.nombre}
                </h3>
                <p style={{ color: '#64748b', marginBottom: '15px' }}>
                  {mecanismo.descripcion}
                </p>
                
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Características:
                </h4>
                <ul style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '15px' }}>
                  {mecanismo.caracteristicas.map((caracteristica, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>
                      • {caracteristica}
                    </li>
                  ))}
                </ul>

                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Beneficios:
                </h4>
                <ul style={{ color: '#64748b', fontSize: '0.9rem' }}>
                  {mecanismo.beneficios.map((beneficio, index) => (
                    <li key={index} style={{ marginBottom: '4px' }}>
                      • {beneficio}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ 
            background: '#dbeafe', 
            border: '2px solid #3b82f6', 
            borderRadius: '10px', 
            padding: '20px',
            textAlign: 'center',
            marginTop: '30px'
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
              <strong>Antes de constituir su Consejo de Veeduría Territorial, consulte con nuestro Consejo IA</strong> para 
              obtener asesoría especializada sobre la viabilidad jurídica, los mecanismos aplicables y 
              el plan de acción más apropiado para su territorio.
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

        {/* Formulario de Constitución */}
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
            Solicitud de Constitución
          </h2>

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
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formulario.nombre}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Documento */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Número de Documento *
                </label>
                <input
                  type="text"
                  name="documento"
                  value={formulario.documento}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Email */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formulario.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Teléfono */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Dirección */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Dirección de Residencia *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formulario.direccion}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>

              {/* Tipo de Organización */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Tipo de Organización *
                </label>
                <select
                  name="tipoOrganizacion"
                  value={formulario.tipoOrganizacion}
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
                  <option value="">Seleccione el tipo</option>
                  {tiposOrganizacion.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Experiencia */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Experiencia en Veeduría y Desarrollo Territorial *
              </label>
              <textarea
                name="experiencia"
                value={formulario.experiencia}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Describa su experiencia en veeduría ciudadana, desarrollo territorial, participación ciudadana, etc."
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

            {/* Motivación */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Motivación para Constituir el Consejo *
              </label>
              <textarea
                name="motivacion"
                value={formulario.motivacion}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="¿Por qué considera importante constituir un Consejo de Veeduría y Desarrollo Territorial en su territorio?"
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

            {/* Compromiso */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Compromiso y Disponibilidad *
              </label>
              <textarea
                name="compromiso"
                value={formulario.compromiso}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Describa su compromiso y disponibilidad para participar activamente en el Consejo de Veeduría Territorial"
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

            {/* Botones */}
            <div style={{ textAlign: 'center', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="submit"
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
                {cargando ? 'Procesando...' : 'Enviar Solicitud'}
              </button>

              {analisisTerritorial && (
                <button
                  type="button"
                  onClick={generarPDFConsejo}
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
                  Generar PDF
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Análisis Territorial */}
        {mostrarAnalisis && analisisTerritorial && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '40px', 
            marginTop: '40px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#1e40af',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Análisis Territorial Generado
            </h2>

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
                Código de Caso: {analisisTerritorial.analisis.codigo_caso || 'N/A'}
              </h3>
              <p style={{ color: '#0369a1', marginBottom: '8px' }}>
                <strong>Fecha de Análisis:</strong> {analisisTerritorial.analisis.fecha_analisis ? new Date(analisisTerritorial.analisis.fecha_analisis).toLocaleString('es-CO') : new Date().toLocaleString('es-CO')}
              </p>
              <p style={{ color: '#0369a1' }}>
                <strong>Estado:</strong> Análisis completado exitosamente
              </p>
            </div>

            {analisisTerritorial.analisis.analisisTerritorial && (
              <div>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '15px'
                }}>
                  Mecanismos Aplicables
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginBottom: '20px' }}>
                  {analisisTerritorial.analisis.analisisTerritorial.mecanismos_aplicables?.slice(0, 6).map((mecanismo, index) => (
                    <div key={index} style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      padding: '15px'
                    }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>
                        {mecanismo.mecanismo.nombre}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '5px' }}>
                        {mecanismo.mecanismo.descripcion}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 'bold' }}>
                        Aplicabilidad: {mecanismo.aplicabilidad}%
                      </p>
                    </div>
                  ))}
                </div>

                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '15px'
                }}>
                  Mecanismos Innovadores Recomendados
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
                  {analisisTerritorial.analisis.analisisTerritorial.mecanismos_innovadores?.map((mecanismo, index) => (
                    <div key={index} style={{
                      background: '#fef3c7',
                      border: '2px solid #f59e0b',
                      borderRadius: '8px',
                      padding: '15px'
                    }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#92400e', marginBottom: '8px' }}>
                        {mecanismo.nombre}
                      </h4>
                      <p style={{ fontSize: '0.9rem', color: '#92400e', marginBottom: '8px' }}>
                        {mecanismo.descripcion}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: 'bold' }}>
                        Aplicabilidad: {mecanismo.aplicabilidad}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Navegación */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          padding: '20px'
        }}>
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
              margin: '0 10px',
              transition: 'all 0.3s ease'
            }}
          >
            ← Volver al Consejo IA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConsejoVeeduriaTerritorial;
