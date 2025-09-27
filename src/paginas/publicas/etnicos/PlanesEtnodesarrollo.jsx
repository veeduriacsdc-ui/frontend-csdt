import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PlanesEtnodesarrollo = () => {
  const [formulario, setFormulario] = useState({
    nom: '',
    doc: '',
    cor: '',
    tel: '',
    dir: '',
    tip_com: '',
    nom_com: '',
    pro: '',
    des: '',
    obj: '',
    arc: []
  });

  const tiposComunidad = [
    {
      id: 'indigena',
      nom: 'Comunidad Indígena',
      des: 'Comunidad indígena reconocida por el Estado',
      proc: 'Vía Administrativa',
      pla: 'Según cronograma del proyecto',
      comp: 'Ministerio del Interior - Dirección de Asuntos Indígenas',
      fun: 'Constitución Política Art. 330, Ley 89 de 1890',
      ben: 'Desarrollo con identidad cultural, autonomía territorial'
    },
    {
      id: 'afrodescendiente',
      nom: 'Comunidad Afrodescendiente',
      des: 'Comunidad negra, afrocolombiana, raizal y palenquera',
      proc: 'Vía Administrativa',
      pla: 'Según cronograma del proyecto',
      comp: 'Ministerio del Interior - Dirección de Asuntos Afrodescendientes',
      fun: 'Constitución Política Art. 7, Ley 70 de 1993',
      ben: 'Desarrollo con identidad cultural, derechos territoriales'
    },
    {
      id: 'gitana',
      nom: 'Comunidad Gitana',
      des: 'Comunidad gitana o rom reconocida por el Estado',
      proc: 'Vía Administrativa',
      pla: 'Según cronograma del proyecto',
      comp: 'Ministerio del Interior - Dirección de Asuntos Étnicos',
      fun: 'Constitución Política Art. 7, Ley 1482 de 2011',
      ben: 'Desarrollo con identidad cultural, protección de derechos'
    },
    {
      id: 'raizal',
      nom: 'Comunidad Raizal',
      des: 'Comunidad raizal del Archipiélago de San Andrés, Providencia y Santa Catalina',
      proc: 'Vía Administrativa',
      pla: 'Según cronograma del proyecto',
      comp: 'Ministerio del Interior - Dirección de Asuntos Étnicos',
      fun: 'Constitución Política Art. 7, Ley 47 de 1993',
      ben: 'Desarrollo con identidad cultural, autonomía territorial'
    }
  ];

  const areasDesarrollo = [
    'Educación',
    'Salud',
    'Infraestructura',
    'Agropecuaria',
    'Turismo',
    'Artesanías',
    'Cultura',
    'Deportes',
    'Comunicaciones',
    'Tecnología',
    'Medio Ambiente',
    'Vivienda',
    'Transporte',
    'Comercio',
    'Servicios Públicos'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simular envío del formulario
    alert('¡Su solicitud de Plan de Etnodesarrollo ha sido enviada exitosamente! Recibirá respuesta en el plazo establecido.');
    
    // Limpiar formulario
    setFormulario({
      nom: '',
      doc: '',
      cor: '',
      tel: '',
      dir: '',
      tip_com: '',
      nom_com: '',
      pro: '',
      des: '',
      obj: '',
      arc: []
    });
  };

  const generarPDFEtnodesarrollo = () => {
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
      addText('PLANES DE ETNODESARROLLO', 16, true, [30, 64, 175]);
      addText('Proyectos de desarrollo con identidad cultural', 12, true, [30, 64, 175]);
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
      
      const tipoComunidad = tiposComunidad.find(t => t.id === formulario.tipoComunidad);
      if (tipoComunidad) {
        addText(`Tipo de Comunidad: ${tipoComunidad.nombre}`, 11);
        addText(`Descripción: ${tipoComunidad.descripcion}`, 10, false, [100, 100, 100]);
        addText(`Procedimiento: ${tipoComunidad.procedimiento}`, 10, false, [100, 100, 100]);
        addText(`Competencia: ${tipoComunidad.competencia}`, 10, false, [100, 100, 100]);
        addText(`Fundamento: ${tipoComunidad.fundamento}`, 10, false, [100, 100, 100]);
      }
      
      yPosition += 10;
      addSeparator();

      // Información del proyecto
      addText('INFORMACIÓN DEL PROYECTO DE ETNODESARROLLO:', 14, true, [139, 0, 0]);
      addText(`Nombre de la Comunidad: ${formulario.nombreComunidad}`, 11);
      addText(`Nombre del Proyecto: ${formulario.proyecto}`, 11);
      addText(`Descripción:`, 11);
      addText(formulario.descripcion, 10, false, [100, 100, 100]);
      addText(`Objetivos:`, 11);
      addText(formulario.objetivos, 10, false, [100, 100, 100]);
      
      yPosition += 10;
      addSeparator();

      // Procedimiento
      addText('PROCEDIMIENTO:', 14, true, [139, 0, 0]);
      addText('1. Presentación de la solicitud ante la autoridad competente', 10);
      addText('2. Revisión de cumplimiento de requisitos legales', 10);
      addText('3. Estudio de viabilidad técnica y presupuestal', 10);
      addText('4. Consulta previa con la comunidad (si aplica)', 10);
      addText('5. Aprobación del plan de etnodesarrollo', 10);
      addText('6. Ejecución del proyecto con identidad cultural', 10);
      addText('7. Seguimiento y evaluación del impacto', 10);
      
      yPosition += 10;
      addSeparator();

      // Requisitos
      addText('REQUISITOS LEGALES:', 14, true, [139, 0, 0]);
      addText('• La comunidad debe estar reconocida por el Estado', 10);
      addText('• El proyecto debe respetar la identidad cultural', 10);
      addText('• Debe cumplir con los requisitos de financiación', 10);
      addText('• Debe ser compatible con el ordenamiento jurídico', 10);
      addText('• Debe incluir consulta previa (si aplica)', 10);
      addText('• Debe demostrar beneficio para la comunidad', 10);
      
      yPosition += 10;
      addSeparator();

      // Recomendaciones
      addText('RECOMENDACIONES:', 14, true, [139, 0, 0]);
      addText('1. Coordinar con la autoridad competente', 10);
      addText('2. Verificar el cumplimiento de requisitos legales', 10);
      addText('3. Obtener el respaldo de la comunidad', 10);
      addText('4. Preparar la documentación necesaria', 10);
      addText('5. Establecer el cronograma de actividades', 10);
      addText('6. Coordinar con las autoridades territoriales', 10);

      yPosition += 10;
      addSeparator();

      // Pie de página
      addText('='.repeat(60), 8);
      addText('Generado por el Sistema CSDT - Planes de Etnodesarrollo', 8, false, [100, 100, 100]);
      addText('Fecha: ' + new Date().toLocaleString('es-CO'), 8, false, [100, 100, 100]);

      doc.save('Plan_Etnodesarrollo.pdf');
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar el PDF. Intente nuevamente.');
    }
  };

  const tipoComunidadSeleccionado = tiposComunidad.find(tipo => tipo.id === formulario.tip_com);

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
            Planes de Etnodesarrollo
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            <strong>Proyectos de desarrollo con identidad cultural</strong>
          </p>
          <p style={{ 
            fontSize: '1rem', 
            color: '#64748b',
            marginTop: '10px'
          }}>
            Mecanismo étnico y diferencial - Constitución Política Art. 7
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
            ¿Qué son los Planes de Etnodesarrollo?
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
                🏛️ Vía Administrativa
              </h3>
              <p style={{ color: '#92400e', fontSize: '0.9rem' }}>
                Los Planes de Etnodesarrollo son proyectos de desarrollo que respetan la identidad cultural de las comunidades étnicas.
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
                🌍 Identidad Cultural
              </h3>
              <p style={{ color: '#991b1b', fontSize: '0.9rem' }}>
                Promueven el desarrollo económico y social manteniendo la identidad cultural de las comunidades étnicas.
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
                📋 Competencia Administrativa
              </h3>
              <p style={{ color: '#065f46', fontSize: '0.9rem' }}>
                Se tramitan ante el Ministerio del Interior y sus direcciones especializadas en asuntos étnicos.
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
                ⏰ Según Cronograma
              </h3>
              <p style={{ color: '#3730a3', fontSize: '0.9rem' }}>
                Se ejecutan según el cronograma establecido en el plan de desarrollo de la comunidad.
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
              <strong>Antes de presentar su Plan de Etnodesarrollo, consulte con nuestro Consejo IA</strong> para 
              obtener asesoría especializada sobre la viabilidad jurídica de su proyecto, los 
              requisitos legales y el procedimiento más apropiado para su comunidad étnica.
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

        {/* Tipos de Comunidad */}
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
            Tipos de Comunidad Étnica
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
            {tiposComunidad.map(tipo => (
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
                  {tipo.nom}
                </h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '8px' }}>
                  {tipo.des}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <strong>Procedimiento:</strong> {tipo.proc}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <strong>Competencia:</strong> {tipo.comp}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <strong>Fundamento:</strong> {tipo.fun}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
                  <strong>Beneficios:</strong> {tipo.ben}
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
            Formulario de Plan de Etnodesarrollo
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

              {/* Tipo de Comunidad */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Tipo de Comunidad Étnica *
                </label>
                <select
                  name="tipoComunidad"
                  value={formulario.tipoComunidad}
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
                  {tiposComunidad.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nom}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Nombre de la Comunidad */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Nombre de la Comunidad *
              </label>
              <input
                type="text"
                name="nombreComunidad"
                value={formulario.nombreComunidad}
                onChange={handleInputChange}
                required
                placeholder="Ej: Resguardo Indígena de San José, Consejo Comunitario Afrodescendiente del Río"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Nombre del Proyecto */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Nombre del Proyecto de Etnodesarrollo *
              </label>
              <input
                type="text"
                name="proyecto"
                value={formulario.proyecto}
                onChange={handleInputChange}
                required
                placeholder="Ej: Proyecto de Turismo Cultural Indígena, Plan de Desarrollo Agropecuario Afrodescendiente"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Descripción del Proyecto *
              </label>
              <textarea
                name="descripcion"
                value={formulario.descripcion}
                onChange={handleInputChange}
                required
                rows="6"
                placeholder="Describa detalladamente el proyecto de etnodesarrollo, incluyendo el contexto, la justificación y los alcances del mismo..."
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

            {/* Objetivos */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Objetivos del Proyecto *
              </label>
              <textarea
                name="objetivos"
                value={formulario.objetivos}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Describa los objetivos específicos del proyecto de etnodesarrollo..."
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

            {/* Información del Tipo Seleccionado */}
            {tipoComunidadSeleccionado && (
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
                  Información sobre {tipoComunidadSeleccionado.nombre}
                </h3>
                <p style={{ color: '#0369a1', marginBottom: '8px' }}>
                  <strong>Descripción:</strong> {tipoComunidadSeleccionado.descripcion}
                </p>
                <p style={{ color: '#0369a1', marginBottom: '8px' }}>
                  <strong>Procedimiento:</strong> {tipoComunidadSeleccionado.procedimiento}
                </p>
                <p style={{ color: '#0369a1', marginBottom: '8px' }}>
                  <strong>Competencia:</strong> {tipoComunidadSeleccionado.competencia}
                </p>
                <p style={{ color: '#0369a1', marginBottom: '8px' }}>
                  <strong>Fundamento Legal:</strong> {tipoComunidadSeleccionado.fundamento}
                </p>
                <p style={{ color: '#0369a1' }}>
                  <strong>Beneficios:</strong> {tipoComunidadSeleccionado.beneficios}
                </p>
              </div>
            )}

            {/* Botones */}
            <div style={{ textAlign: 'center', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                type="submit"
                style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '15px 30px',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#059669';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#10b981';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Enviar Solicitud
              </button>

              <button
                type="button"
                onClick={generarPDFEtnodesarrollo}
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
                onMouseOver={(e) => {
                  e.target.style.background = '#2563eb';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#3b82f6';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Generar PDF
              </button>
            </div>
          </form>
        </div>

        {/* Información Adicional */}
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
            Información Importante
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
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
                🏛️ Vía Administrativa
              </h3>
              <p style={{ color: '#92400e', fontSize: '0.9rem' }}>
                Los Planes de Etnodesarrollo son proyectos de desarrollo que respetan la identidad cultural de las comunidades étnicas.
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
                🌍 Identidad Cultural
              </h3>
              <p style={{ color: '#991b1b', fontSize: '0.9rem' }}>
                Promueven el desarrollo económico y social manteniendo la identidad cultural de las comunidades étnicas.
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
                📋 Competencia Administrativa
              </h3>
              <p style={{ color: '#065f46', fontSize: '0.9rem' }}>
                Se tramitan ante el Ministerio del Interior y sus direcciones especializadas en asuntos étnicos.
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
                ⏰ Según Cronograma
              </h3>
              <p style={{ color: '#3730a3', fontSize: '0.9rem' }}>
                Se ejecutan según el cronograma establecido en el plan de desarrollo de la comunidad.
              </p>
            </div>
          </div>
        </div>

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

export default PlanesEtnodesarrollo;
