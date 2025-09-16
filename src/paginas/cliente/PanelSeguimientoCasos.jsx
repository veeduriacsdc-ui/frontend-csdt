import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PanelSeguimientoCasos = () => {
  const { user } = useAuth();
  const [casos, setCasos] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: 'todos',
    tipo: 'todos'
  });
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  const [mostrarChat, setMostrarChat] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  // Cargar datos de casos del cliente desde localStorage o API
  useEffect(() => {
    cargarCasos();
  }, []);

  const cargarCasos = () => {
    // Intentar cargar desde localStorage primero
    const casosGuardados = JSON.parse(localStorage.getItem('casosCliente') || '[]');
    
    if (casosGuardados.length === 0) {
      // Crear datos de prueba si no hay casos guardados
      const casosSimulados = [
      {
        id: 1,
        titulo: 'Acción de Tutela - Derecho a la Salud',
        descripcion: 'Solicitud de medicamento no incluido en POS',
        tipo: 'AccionTutela',
        estado: 'En Progreso',
        fechaCreacion: '2024-01-15',
        fechaLimite: '2024-01-25',
        operadorAsignado: 'Operador Legal 1',
        progreso: 65,
        ultimaActualizacion: '2024-01-20',
        actividades: [
          {
            id: 1,
            titulo: 'Análisis inicial del caso',
            descripcion: 'Revisión de documentos y fundamentos legales',
            estado: 'Completada',
            fecha: '2024-01-16'
          },
          {
            id: 2,
            titulo: 'Recolección de pruebas médicas',
            descripcion: 'Solicitud de exámenes y certificados médicos',
            estado: 'En Progreso',
            fecha: '2024-01-18'
          },
          {
            id: 3,
            titulo: 'Elaboración del documento legal',
            descripcion: 'Redacción de la acción de tutela',
            estado: 'Pendiente',
            fecha: '2024-01-22'
          }
        ],
        documentos: [
          { nombre: 'Cédula de ciudadanía', estado: 'Cargado', fecha: '2024-01-15' },
          { nombre: 'Historia clínica', estado: 'Pendiente', fecha: null },
          { nombre: 'Receta médica', estado: 'Cargado', fecha: '2024-01-16' }
        ],
        comunicaciones: [
          {
            id: 1,
            tipo: 'notificacion',
            mensaje: 'Su caso ha sido asignado al Operador Legal 1',
            fecha: '2024-01-15',
            leido: true
          },
          {
            id: 2,
            tipo: 'solicitud',
            mensaje: 'Necesitamos que cargue su historia clínica completa',
            fecha: '2024-01-18',
            leido: false
          }
        ]
      },
      {
        id: 2,
        titulo: 'Acción de Cumplimiento - Servicios Públicos',
        descripcion: 'Falta de suministro de agua potable en el barrio',
        tipo: 'AccionCumplimiento',
        estado: 'Pendiente',
        fechaCreacion: '2024-01-20',
        fechaLimite: '2024-02-05',
        operadorAsignado: 'Por asignar',
        progreso: 15,
        ultimaActualizacion: '2024-01-20',
        actividades: [
          {
            id: 1,
            titulo: 'Revisión inicial',
            descripcion: 'Análisis de la solicitud y documentación',
            estado: 'En Progreso',
            fecha: '2024-01-21'
          }
        ],
        documentos: [
          { nombre: 'Cédula de ciudadanía', estado: 'Cargado', fecha: '2024-01-20' },
          { nombre: 'Comprobante de pago de servicios', estado: 'Pendiente', fecha: null }
        ],
        comunicaciones: [
          {
            id: 1,
            tipo: 'notificacion',
            mensaje: 'Su solicitud ha sido recibida y está en proceso de revisión',
            fecha: '2024-01-20',
            leido: true
          }
        ]
      },
      {
        id: 3,
        titulo: 'Acción Popular - Contaminación Ambiental',
        descripcion: 'Demanda por contaminación del río en el sector industrial',
        tipo: 'AccionPopular',
        estado: 'Completada',
        fechaCreacion: '2024-01-05',
        fechaLimite: '2024-01-20',
        operadorAsignado: 'Operador Legal 2',
        progreso: 100,
        ultimaActualizacion: '2024-01-18',
        actividades: [
          {
            id: 1,
            titulo: 'Investigación ambiental',
            descripcion: 'Recolección de pruebas de contaminación',
            estado: 'Completada',
            fecha: '2024-01-08'
          },
          {
            id: 2,
            titulo: 'Elaboración de demanda',
            descripcion: 'Redacción de la acción popular',
            estado: 'Completada',
            fecha: '2024-01-12'
          },
          {
            id: 3,
            titulo: 'Presentación en tribunal',
            descripcion: 'Radicación de la demanda',
            estado: 'Completada',
            fecha: '2024-01-15'
          }
        ],
        documentos: [
          { nombre: 'Cédula de ciudadanía', estado: 'Cargado', fecha: '2024-01-05' },
          { nombre: 'Evidencias fotográficas', estado: 'Cargado', fecha: '2024-01-06' },
          { nombre: 'Informe técnico ambiental', estado: 'Cargado', fecha: '2024-01-08' }
        ],
        comunicaciones: [
          {
            id: 1,
            tipo: 'notificacion',
            mensaje: 'Su caso ha sido asignado al Operador Legal 2',
            fecha: '2024-01-05',
            leido: true
          },
          {
            id: 2,
            tipo: 'notificacion',
            mensaje: 'La demanda ha sido presentada exitosamente',
            fecha: '2024-01-15',
            leido: true
          }
        ]
      }
    ];
    
    localStorage.setItem('casosCliente', JSON.stringify(casosSimulados));
    setCasos(casosSimulados);
    } else {
      setCasos(casosGuardados);
    }
  };

  const tiposCaso = [
    'AccionTutela',
    'AccionCumplimiento', 
    'AccionPopular',
    'AccionGrupo',
    'DemandaJuridica',
    'AccionNulidad',
    'AccionReparacionDirecta',
    'ConsultaPopular',
    'Referendo',
    'Plebiscito',
    'Manifiesto'
  ];

  const getColorEstado = (estado) => {
    switch(estado) {
      case 'Pendiente': return '#f59e0b';
      case 'En Progreso': return '#3b82f6';
      case 'Completada': return '#10b981';
      case 'Cancelada': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getColorTipoComunicacion = (tipo) => {
    switch(tipo) {
      case 'notificacion': return '#3b82f6';
      case 'solicitud': return '#f59e0b';
      case 'recordatorio': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const casosFiltrados = casos.filter(caso => {
    if (filtros.estado !== 'todos' && caso.estado !== filtros.estado) return false;
    if (filtros.tipo !== 'todos' && caso.tipo !== filtros.tipo) return false;
    return true;
  });

  const handleCargarDocumento = (casoId, documentoNombre) => {
    // Simular carga de documento
    alert(`Funcionalidad de carga de documento: ${documentoNombre}\n\nEn producción, aquí se abriría un modal para cargar el archivo.`);
  };

  const handleMarcarComunicacionLeida = (casoId, comunicacionId) => {
    const casosActualizados = casos.map(caso => 
      caso.id === casoId 
        ? {
            ...caso,
            comunicaciones: caso.comunicaciones.map(com => 
              com.id === comunicacionId ? { ...com, leido: true } : com
            )
          }
        : caso
    );
    
    setCasos(casosActualizados);
    localStorage.setItem('casosCliente', JSON.stringify(casosActualizados));
  };

  const handleEnviarMensaje = (casoId, mensaje) => {
    const nuevaComunicacion = {
      id: Date.now(),
      tipo: 'mensaje_cliente',
      mensaje: mensaje,
      fecha: new Date().toLocaleDateString('es-CO'),
      leido: false,
      remitente: user?.nombre || 'Cliente'
    };

    const casosActualizados = casos.map(caso => 
      caso.id === casoId 
        ? {
            ...caso,
            comunicaciones: [...caso.comunicaciones, nuevaComunicacion],
            ultimaActualizacion: new Date().toLocaleDateString('es-CO')
          }
        : caso
    );
    
    setCasos(casosActualizados);
    localStorage.setItem('casosCliente', JSON.stringify(casosActualizados));
  };

  const handleActualizarProgreso = (casoId, nuevoProgreso) => {
    const casosActualizados = casos.map(caso => 
      caso.id === casoId 
        ? {
            ...caso,
            progreso: nuevoProgreso,
            ultimaActualizacion: new Date().toLocaleDateString('es-CO')
          }
        : caso
    );
    
    setCasos(casosActualizados);
    localStorage.setItem('casosCliente', JSON.stringify(casosActualizados));
  };

  const exportarCasos = () => {
    try {
      const datosExportar = casos.map(caso => ({
        'ID': caso.id,
        'Título': caso.titulo,
        'Descripción': caso.descripcion,
        'Tipo': caso.tipo,
        'Estado': caso.estado,
        'Progreso': `${caso.progreso}%`,
        'Operador': caso.operadorAsignado,
        'Fecha Creación': caso.fechaCreacion,
        'Fecha Límite': caso.fechaLimite,
        'Última Actualización': caso.ultimaActualizacion,
        'Actividades': caso.actividades.length,
        'Documentos': caso.documentos.length,
        'Comunicaciones': caso.comunicaciones.length
      }));

      const csvContent = [
        Object.keys(datosExportar[0]).join(','),
        ...datosExportar.map(row => Object.values(row).map(value => `"${value}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `casos_cliente_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Casos exportados exitosamente');
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error al exportar los casos');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#1e40af',
            marginBottom: '15px'
          }}>
            📊 Panel de Seguimiento de Casos
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <strong>Bienvenido {user?.nombre}</strong> - Aquí puedes hacer seguimiento a todos tus casos y comunicarte con nuestros operadores
          </p>
        </div>

        {/* Estadísticas del Cliente */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#3b82f6', fontSize: '2rem', margin: '0 0 10px 0' }}>
              {casos.length}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>Total de Casos</p>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#f59e0b', fontSize: '2rem', margin: '0 0 10px 0' }}>
              {casos.filter(c => c.estado === 'Pendiente').length}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>Pendientes</p>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#3b82f6', fontSize: '2rem', margin: '0 0 10px 0' }}>
              {casos.filter(c => c.estado === 'En Progreso').length}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>En Progreso</p>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '25px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#10b981', fontSize: '2rem', margin: '0 0 10px 0' }}>
              {casos.filter(c => c.estado === 'Completada').length}
            </h3>
            <p style={{ color: '#64748b', margin: 0 }}>Completados</p>
          </div>
        </div>

        {/* Filtros y Herramientas */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#1e40af', margin: 0 }}>Filtros y Herramientas</h2>
            <button
              onClick={exportarCasos}
              style={{
                padding: '10px 20px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              📊 Exportar Casos
            </button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>
                Estado
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px'
                }}
              >
                <option value="todos">Todos los Estados</option>
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
                <option value="Cancelada">Cancelada</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>
                Tipo de Caso
              </label>
              <select
                value={filtros.tipo}
                onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px'
                }}
              >
                <option value="todos">Todos los Tipos</option>
                {tiposCaso.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Casos */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#1e40af', marginBottom: '25px' }}>Mis Casos ({casosFiltrados.length})</h2>
          
          {casosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
              <p>No tienes casos que coincidan con los filtros seleccionados.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '30px' }}>
              {casosFiltrados.map(caso => (
                <div key={caso.id} style={{
                  border: '2px solid #e5e7eb',
                  borderRadius: '15px',
                  padding: '25px',
                  transition: 'all 0.3s ease'
                }}>
                  
                  {/* Header del Caso */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ color: '#1e40af', margin: '0 0 10px 0', fontSize: '1.3rem' }}>
                        {caso.titulo}
                      </h3>
                      <p style={{ color: '#64748b', margin: '0 0 15px 0' }}>
                        {caso.descripcion}
                      </p>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{
                        background: getColorEstado(caso.estado),
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {caso.estado}
                      </span>
                      <button
                        onClick={() => {
                          setCasoSeleccionado(caso);
                          setMostrarChat(true);
                        }}
                        style={{
                          background: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.9rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        💬 Chat
                      </button>
                    </div>
                  </div>

                  {/* Información del Caso */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                    <div>
                      <strong style={{ color: '#374151' }}>Tipo:</strong> {caso.tipo}
                    </div>
                    <div>
                      <strong style={{ color: '#374151' }}>Operador:</strong> {caso.operadorAsignado}
                    </div>
                    <div>
                      <strong style={{ color: '#374151' }}>Fecha Límite:</strong> {caso.fechaLimite}
                    </div>
                    <div>
                      <strong style={{ color: '#374151' }}>Última Actualización:</strong> {caso.ultimaActualizacion}
                    </div>
                  </div>

                  {/* Barra de Progreso */}
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                      <span style={{ fontWeight: 'bold', color: '#374151' }}>Progreso del Caso</span>
                      <span style={{ color: '#64748b' }}>{caso.progreso}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '10px',
                      background: '#e5e7eb',
                      borderRadius: '5px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${caso.progreso}%`,
                        height: '100%',
                        background: caso.progreso < 50 ? '#f59e0b' : caso.progreso < 100 ? '#3b82f6' : '#10b981',
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>

                  {/* Actividades */}
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ color: '#1e40af', marginBottom: '15px' }}>📋 Actividades del Caso</h4>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {caso.actividades.map(actividad => (
                        <div key={actividad.id} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          background: '#f8fafc',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
                          <div>
                            <strong style={{ color: '#374151' }}>{actividad.titulo}</strong>
                            <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                              {actividad.descripcion}
                            </p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{
                              background: getColorEstado(actividad.estado),
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}>
                              {actividad.estado}
                            </span>
                            <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.8rem' }}>
                              {actividad.fecha}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documentos */}
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ color: '#1e40af', marginBottom: '15px' }}>📄 Documentos Requeridos</h4>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {caso.documentos.map((doc, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          background: doc.estado === 'Cargado' ? '#f0fdf4' : '#fef3c7',
                          borderRadius: '8px',
                          border: `1px solid ${doc.estado === 'Cargado' ? '#bbf7d0' : '#fcd34d'}`
                        }}>
                          <div>
                            <strong style={{ color: '#374151' }}>{doc.nombre}</strong>
                            {doc.fecha && (
                              <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                                Cargado el: {doc.fecha}
                              </p>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{
                              background: doc.estado === 'Cargado' ? '#10b981' : '#f59e0b',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}>
                              {doc.estado}
                            </span>
                            {doc.estado === 'Pendiente' && (
                              <button
                                onClick={() => handleCargarDocumento(caso.id, doc.nombre)}
                                style={{
                                  background: '#3b82f6',
                                  color: 'white',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem'
                                }}
                              >
                                Cargar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comunicaciones */}
                  <div>
                    <h4 style={{ color: '#1e40af', marginBottom: '15px' }}>💬 Comunicaciones</h4>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {caso.comunicaciones.map(comunicacion => (
                        <div key={comunicacion.id} style={{
                          padding: '12px',
                          background: comunicacion.leido ? '#f8fafc' : '#dbeafe',
                          borderRadius: '8px',
                          border: `1px solid ${comunicacion.leido ? '#e5e7eb' : '#93c5fd'}`,
                          cursor: 'pointer'
                        }}
                        onClick={() => handleMarcarComunicacionLeida(caso.id, comunicacion.id)}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                                <span style={{
                                  background: getColorTipoComunicacion(comunicacion.tipo),
                                  color: 'white',
                                  padding: '2px 6px',
                                  borderRadius: '8px',
                                  fontSize: '0.7rem',
                                  fontWeight: 'bold'
                                }}>
                                  {comunicacion.tipo}
                                </span>
                                {!comunicacion.leido && (
                                  <span style={{
                                    background: '#ef4444',
                                    color: 'white',
                                    padding: '2px 6px',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 'bold'
                                  }}>
                                    NUEVO
                                  </span>
                                )}
                              </div>
                              <p style={{ color: '#374151', margin: '0 0 5px 0' }}>
                                {comunicacion.mensaje}
                              </p>
                              <p style={{ color: '#64748b', margin: 0, fontSize: '0.8rem' }}>
                                {comunicacion.fecha}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Chat */}
        {mostrarChat && casoSeleccionado && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              boxShadow: '0 15px 50px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#1e40af' }}>
                  💬 Chat - {casoSeleccionado.titulo}
                </h3>
                <button
                  onClick={() => setMostrarChat(false)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  ×
                </button>
              </div>
              
              <div style={{
                flex: 1,
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                maxHeight: '300px',
                overflowY: 'auto',
                backgroundColor: '#f9fafb'
              }}>
                {casoSeleccionado.comunicaciones.map(comunicacion => (
                  <div key={comunicacion.id} style={{
                    marginBottom: '10px',
                    padding: '10px',
                    borderRadius: '8px',
                    backgroundColor: comunicacion.tipo === 'mensaje_cliente' ? '#dbeafe' : '#f3f4f6',
                    marginLeft: comunicacion.tipo === 'mensaje_cliente' ? '20px' : '0',
                    marginRight: comunicacion.tipo !== 'mensaje_cliente' ? '20px' : '0'
                  }}>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '0.8rem',
                      color: comunicacion.tipo === 'mensaje_cliente' ? '#1e40af' : '#374151',
                      marginBottom: '5px'
                    }}>
                      {comunicacion.remitente || (comunicacion.tipo === 'mensaje_cliente' ? 'Tú' : 'Sistema')}
                    </div>
                    <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                      {comunicacion.mensaje}
                    </div>
                    <div style={{ 
                      fontSize: '0.7rem', 
                      color: '#6b7280'
                    }}>
                      {comunicacion.fecha}
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  placeholder="Escribir mensaje..."
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '0.9rem'
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && nuevoMensaje.trim() && handleEnviarMensaje(casoSeleccionado.id, nuevoMensaje) && setNuevoMensaje('')}
                />
                <button
                  onClick={() => {
                    if (nuevoMensaje.trim()) {
                      handleEnviarMensaje(casoSeleccionado.id, nuevoMensaje);
                      setNuevoMensaje('');
                    }
                  }}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Navegación */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            to="/cliente/dashboard" 
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              margin: '0 10px'
            }}
          >
            ← Volver al Dashboard Cliente
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PanelSeguimientoCasos;
