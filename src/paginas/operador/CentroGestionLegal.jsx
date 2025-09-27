import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CentroGestionLegal = () => {
  const { user } = useAuth();
  const [casos, setCasos] = useState([]);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  const [filtros, setFiltros] = useState({
    est: 'todos',
    pri: 'todos',
    tip: 'todos'
  });
  const [nuevaComunicacion, setNuevaComunicacion] = useState({
    tip: 'solicitud',
    men: '',
    arc: []
  });
  const [mostrarFormularioComunicacion, setMostrarFormularioComunicacion] = useState(false);

  // Simular datos de casos asignados al operador (en producción vendría de la API)
  useEffect(() => {
    const casosSimulados = [
      {
        id: 1,
        titulo: 'Acción de Tutela - Derecho a la Salud',
        descripcion: 'Cliente solicita medicamento no incluido en POS',
        tipo: 'AccionTutela',
        prioridad: 'Alta',
        estado: 'En Progreso',
        fechaCreacion: '2024-01-15',
        fechaLimite: '2024-01-25',
        cliente: {
          nombre: 'María González',
          email: 'maria@email.com',
          telefono: '3001234567',
          documento: '12345678'
        },
        progreso: 65,
        actividades: [
          {
            id: 1,
            titulo: 'Análisis inicial del caso',
            descripcion: 'Revisión de documentos y fundamentos legales',
            estado: 'Completada',
            fecha: '2024-01-16',
            completadaPor: user?.nombre || 'Operador Legal 1'
          },
          {
            id: 2,
            titulo: 'Recolección de pruebas médicas',
            descripcion: 'Solicitud de exámenes y certificados médicos',
            estado: 'En Progreso',
            fecha: '2024-01-18',
            completadaPor: user?.nombre || 'Operador Legal 1'
          },
          {
            id: 3,
            titulo: 'Elaboración del documento legal',
            descripcion: 'Redacción de la acción de tutela',
            estado: 'Pendiente',
            fecha: '2024-01-22',
            completadaPor: null
          }
        ],
        documentos: [
          { 
            nombre: 'Cédula de ciudadanía', 
            estado: 'Recibido', 
            fecha: '2024-01-15',
            archivo: 'cedula_maria.pdf'
          },
          { 
            nombre: 'Historia clínica', 
            estado: 'Pendiente', 
            fecha: null,
            archivo: null
          },
          { 
            nombre: 'Receta médica', 
            estado: 'Recibido', 
            fecha: '2024-01-16',
            archivo: 'receta_medica.pdf'
          }
        ],
        comunicaciones: [
          {
            id: 1,
            tipo: 'notificacion',
            mensaje: 'Caso asignado al operador',
            fecha: '2024-01-15',
            enviadoPor: 'Sistema',
            leido: true
          },
          {
            id: 2,
            tipo: 'solicitud',
            mensaje: 'Necesitamos que cargue su historia clínica completa',
            fecha: '2024-01-18',
            enviadoPor: user?.nombre || 'Operador Legal 1',
            leido: false
          }
        ],
        evidencias: [
          {
            id: 1,
            titulo: 'Análisis jurídico inicial',
            descripcion: 'Documento con fundamentos legales del caso',
            fecha: '2024-01-16',
            archivo: 'analisis_juridico.pdf'
          }
        ]
      },
      {
        id: 2,
        titulo: 'Acción de Cumplimiento - Servicios Públicos',
        descripcion: 'Falta de suministro de agua potable en el barrio',
        tipo: 'AccionCumplimiento',
        prioridad: 'Media',
        estado: 'Pendiente',
        fechaCreacion: '2024-01-20',
        fechaLimite: '2024-02-05',
        cliente: {
          nombre: 'Carlos Rodríguez',
          email: 'carlos@email.com',
          telefono: '3007654321',
          documento: '87654321'
        },
        progreso: 15,
        actividades: [
          {
            id: 1,
            titulo: 'Revisión inicial',
            descripcion: 'Análisis de la solicitud y documentación',
            estado: 'En Progreso',
            fecha: '2024-01-21',
            completadaPor: user?.nombre || 'Operador Legal 1'
          }
        ],
        documentos: [
          { 
            nombre: 'Cédula de ciudadanía', 
            estado: 'Recibido', 
            fecha: '2024-01-20',
            archivo: 'cedula_carlos.pdf'
          },
          { 
            nombre: 'Comprobante de pago de servicios', 
            estado: 'Pendiente', 
            fecha: null,
            archivo: null
          }
        ],
        comunicaciones: [
          {
            id: 1,
            tipo: 'notificacion',
            mensaje: 'Caso asignado para revisión inicial',
            fecha: '2024-01-20',
            enviadoPor: 'Sistema',
            leido: true
          }
        ],
        evidencias: []
      }
    ];
    setCasos(casosSimulados);
  }, [user]);

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

  const getColorPrioridad = (prioridad) => {
    switch(prioridad) {
      case 'Alta': return '#ef4444';
      case 'Media': return '#f59e0b';
      case 'Baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getColorTipoComunicacion = (tipo) => {
    switch(tipo) {
      case 'notificacion': return '#3b82f6';
      case 'solicitud': return '#f59e0b';
      case 'recordatorio': return '#8b5cf6';
      case 'respuesta': return '#10b981';
      default: return '#6b7280';
    }
  };

  const casosFiltrados = casos.filter(caso => {
    if (filtros.estado !== 'todos' && caso.estado !== filtros.estado) return false;
    if (filtros.prioridad !== 'todos' && caso.prioridad !== filtros.prioridad) return false;
    if (filtros.tipo !== 'todos' && caso.tipo !== filtros.tipo) return false;
    return true;
  });

  const handleCambiarEstadoActividad = (casoId, actividadId, nuevoEstado) => {
    setCasos(casos.map(caso => 
      caso.id === casoId 
        ? {
            ...caso,
            actividades: caso.actividades.map(act => 
              act.id === actividadId 
                ? { 
                    ...act, 
                    estado: nuevoEstado,
                    completadaPor: nuevoEstado === 'Completada' ? user?.nombre : act.completadaPor
                  } 
                : act
            )
          }
        : caso
    ));
  };

  const handleEnviarComunicacion = (casoId) => {
    if (!nuevaComunicacion.mensaje.trim()) {
      alert('Por favor ingrese un mensaje');
      return;
    }

    const comunicacion = {
      id: Date.now(),
      tipo: nuevaComunicacion.tipo,
      mensaje: nuevaComunicacion.mensaje,
      fecha: new Date().toISOString().split('T')[0],
      enviadoPor: user?.nombre || 'Operador',
      leido: false
    };

    setCasos(casos.map(caso => 
      caso.id === casoId 
        ? {
            ...caso,
            comunicaciones: [...caso.comunicaciones, comunicacion]
          }
        : caso
    ));

    setNuevaComunicacion({
      tipo: 'solicitud',
      mensaje: '',
      archivos: []
    });
    setMostrarFormularioComunicacion(false);
    
    alert('Comunicación enviada exitosamente al cliente');
  };

  const handleSubirEvidencia = (casoId) => {
    const titulo = prompt('Ingrese el título de la evidencia:');
    if (!titulo) return;

    const descripcion = prompt('Ingrese la descripción de la evidencia:');
    if (!descripcion) return;

    const evidencia = {
      id: Date.now(),
      titulo,
      descripcion,
      fecha: new Date().toISOString().split('T')[0],
      archivo: `evidencia_${Date.now()}.pdf`
    };

    setCasos(casos.map(caso => 
      caso.id === casoId 
        ? {
            ...caso,
            evidencias: [...caso.evidencias, evidencia]
          }
        : caso
    ));

    alert('Evidencia subida exitosamente');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#166534',
            marginBottom: '15px'
          }}>
            ⚖️ Centro de Gestión Legal
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#64748b',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <strong>Bienvenido {user?.nombre}</strong> - Gestión profesional de casos legales y comunicación con clientes
          </p>
        </div>

        {/* Estadísticas del Operador */}
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
            <p style={{ color: '#64748b', margin: 0 }}>Casos Asignados</p>
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

        {/* Filtros */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '25px',
          marginBottom: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#166534', marginBottom: '20px' }}>Filtros</h2>
          
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
                Prioridad
              </label>
              <select
                value={filtros.prioridad}
                onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px'
                }}
              >
                <option value="todos">Todas las Prioridades</option>
                <option value="Alta">Alta</option>
                <option value="Media">Media</option>
                <option value="Baja">Baja</option>
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
          <h2 style={{ color: '#166534', marginBottom: '25px' }}>Casos Asignados ({casosFiltrados.length})</h2>
          
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
                      <h3 style={{ color: '#166534', margin: '0 0 10px 0', fontSize: '1.3rem' }}>
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
                      <span style={{
                        background: getColorPrioridad(caso.prioridad),
                        color: 'white',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {caso.prioridad}
                      </span>
                    </div>
                  </div>

                  {/* Información del Caso */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '25px' }}>
                    <div>
                      <strong style={{ color: '#374151' }}>Cliente:</strong> {caso.cliente.nombre}
                    </div>
                    <div>
                      <strong style={{ color: '#374151' }}>Email:</strong> {caso.cliente.email}
                    </div>
                    <div>
                      <strong style={{ color: '#374151' }}>Teléfono:</strong> {caso.cliente.telefono}
                    </div>
                    <div>
                      <strong style={{ color: '#374151' }}>Fecha Límite:</strong> {caso.fechaLimite}
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
                    <h4 style={{ color: '#166534', marginBottom: '15px' }}>📋 Actividades del Caso</h4>
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
                          <div style={{ flex: 1 }}>
                            <strong style={{ color: '#374151' }}>{actividad.titulo}</strong>
                            <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                              {actividad.descripcion}
                            </p>
                            {actividad.completadaPor && (
                              <p style={{ color: '#10b981', margin: '5px 0 0 0', fontSize: '0.8rem' }}>
                                Completada por: {actividad.completadaPor}
                              </p>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                            {actividad.estado === 'Pendiente' && (
                              <button
                                onClick={() => handleCambiarEstadoActividad(caso.id, actividad.id, 'En Progreso')}
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
                                Iniciar
                              </button>
                            )}
                            {actividad.estado === 'En Progreso' && (
                              <button
                                onClick={() => handleCambiarEstadoActividad(caso.id, actividad.id, 'Completada')}
                                style={{
                                  background: '#10b981',
                                  color: 'white',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem'
                                }}
                              >
                                Completar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Documentos */}
                  <div style={{ marginBottom: '25px' }}>
                    <h4 style={{ color: '#166534', marginBottom: '15px' }}>📄 Documentos del Cliente</h4>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {caso.documentos.map((doc, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '12px',
                          background: doc.estado === 'Recibido' ? '#f0fdf4' : '#fef3c7',
                          borderRadius: '8px',
                          border: `1px solid ${doc.estado === 'Recibido' ? '#bbf7d0' : '#fcd34d'}`
                        }}>
                          <div>
                            <strong style={{ color: '#374151' }}>{doc.nombre}</strong>
                            {doc.fecha && (
                              <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                                Recibido el: {doc.fecha}
                              </p>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{
                              background: doc.estado === 'Recibido' ? '#10b981' : '#f59e0b',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '12px',
                              fontSize: '0.8rem',
                              fontWeight: 'bold'
                            }}>
                              {doc.estado}
                            </span>
                            {doc.archivo && (
                              <button
                                onClick={() => alert(`Descargando: ${doc.archivo}`)}
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
                                Descargar
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comunicaciones */}
                  <div style={{ marginBottom: '25px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h4 style={{ color: '#166534', margin: 0 }}>💬 Comunicaciones</h4>
                      <button
                        onClick={() => {
                          setCasoSeleccionado(caso);
                          setMostrarFormularioComunicacion(true);
                        }}
                        style={{
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Enviar Mensaje
                      </button>
                    </div>
                    <div style={{ display: 'grid', gap: '10px' }}>
                      {caso.comunicaciones.map(comunicacion => (
                        <div key={comunicacion.id} style={{
                          padding: '12px',
                          background: '#f8fafc',
                          borderRadius: '8px',
                          border: '1px solid #e5e7eb'
                        }}>
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
                                <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
                                  Enviado por: {comunicacion.enviadoPor}
                                </span>
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

                  {/* Evidencias */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h4 style={{ color: '#166534', margin: 0 }}>📁 Evidencias de Dependencia</h4>
                      <button
                        onClick={() => handleSubirEvidencia(caso.id)}
                        style={{
                          background: '#8b5cf6',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '0.9rem'
                        }}
                      >
                        Subir Evidencia
                      </button>
                    </div>
                    {caso.evidencias.length === 0 ? (
                      <p style={{ color: '#64748b', fontStyle: 'italic' }}>No hay evidencias subidas aún</p>
                    ) : (
                      <div style={{ display: 'grid', gap: '10px' }}>
                        {caso.evidencias.map(evidencia => (
                          <div key={evidencia.id} style={{
                            padding: '12px',
                            background: '#faf5ff',
                            borderRadius: '8px',
                            border: '1px solid #e9d5ff'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <strong style={{ color: '#6b21a8' }}>{evidencia.titulo}</strong>
                                <p style={{ color: '#6b21a8', margin: '5px 0 0 0', fontSize: '0.9rem' }}>
                                  {evidencia.descripcion}
                                </p>
                                <p style={{ color: '#64748b', margin: '5px 0 0 0', fontSize: '0.8rem' }}>
                                  Subido el: {evidencia.fecha}
                                </p>
                              </div>
                              <button
                                onClick={() => alert(`Descargando: ${evidencia.archivo}`)}
                                style={{
                                  background: '#8b5cf6',
                                  color: 'white',
                                  border: 'none',
                                  padding: '6px 12px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontSize: '0.8rem'
                                }}
                              >
                                Descargar
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Comunicación */}
        {mostrarFormularioComunicacion && casoSeleccionado && (
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
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 15px 50px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{ color: '#166534', marginBottom: '20px' }}>
                Enviar Comunicación a {casoSeleccionado.cliente.nombre}
              </h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>
                  Tipo de Comunicación
                </label>
                <select
                  value={nuevaComunicacion.tipo}
                  onChange={(e) => setNuevaComunicacion({...nuevaComunicacion, tipo: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px'
                  }}
                >
                  <option value="solicitud">Solicitud de Información</option>
                  <option value="notificacion">Notificación</option>
                  <option value="recordatorio">Recordatorio</option>
                  <option value="respuesta">Respuesta</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '5px' }}>
                  Mensaje
                </label>
                <textarea
                  value={nuevaComunicacion.mensaje}
                  onChange={(e) => setNuevaComunicacion({...nuevaComunicacion, mensaje: e.target.value})}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    resize: 'vertical'
                  }}
                  placeholder="Escriba su mensaje aquí..."
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => {
                    setMostrarFormularioComunicacion(false);
                    setCasoSeleccionado(null);
                  }}
                  style={{
                    padding: '12px 24px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#374151',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleEnviarComunicacion(casoSeleccionado.id)}
                  style={{
                    padding: '12px 24px',
                    border: 'none',
                    borderRadius: '8px',
                    background: '#10b981',
                    color: 'white',
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
            to="/operador/dashboard" 
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
            ← Volver al Dashboard Operador
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CentroGestionLegal;
