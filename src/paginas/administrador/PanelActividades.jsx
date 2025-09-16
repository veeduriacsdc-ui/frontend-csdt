import React, { useState, useEffect } from 'react';

const PanelActividades = () => {
  const [dependencias, setDependencias] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroPrioridad, setFiltroPrioridad] = useState('todos');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [dependenciaSeleccionada, setDependenciaSeleccionada] = useState(null);
  const [tareaExpandida, setTareaExpandida] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    descripcion: '',
    tipo: 'juridica',
    prioridad: 'media',
    estado: 'pendiente',
    fechaInicio: '',
    fechaVencimiento: '',
    responsable: '',
    costoEstimado: 0,
    recursos: [],
    archivosRequeridos: [],
    dependencias: []
  });

  // Cargar dependencias desde localStorage
  useEffect(() => {
    const dependenciasGuardadas = JSON.parse(localStorage.getItem('dependencias') || '[]');
    setDependencias(dependenciasGuardadas);
  }, []);

  const handleCrearTarea = (e) => {
    e.preventDefault();
    const tarea = {
      id: Date.now(),
      ...nuevaTarea,
      fechaCreacion: new Date().toISOString(),
      dependenciaId: dependenciaSeleccionada?.id,
      archivosCargados: [],
      comentarios: [],
      tiempoRegistrado: 0,
      costosReales: {
        total: 0,
        desglose: []
      }
    };
    setActividades([...actividades, tarea]);
    
    // Actualizar dependencia con la nueva tarea
    if (dependenciaSeleccionada) {
      const dependenciaActualizada = {
        ...dependenciaSeleccionada,
        tareas: [...(dependenciaSeleccionada.tareas || []), tarea]
      };
      setDependencias(dependencias.map(dep => 
        dep.id === dependenciaSeleccionada.id ? dependenciaActualizada : dep
      ));
      
      // Guardar en localStorage
      const dependenciasActualizadas = dependencias.map(dep => 
        dep.id === dependenciaSeleccionada.id ? dependenciaActualizada : dep
      );
      localStorage.setItem('dependencias', JSON.stringify(dependenciasActualizadas));
    }
    
    setNuevaTarea({
      titulo: '',
      descripcion: '',
      tipo: 'juridica',
      prioridad: 'media',
      estado: 'pendiente',
      fechaInicio: '',
      fechaVencimiento: '',
      responsable: '',
      costoEstimado: 0,
      recursos: [],
      archivosRequeridos: [],
      dependencias: []
    });
    setMostrarFormulario(false);
  };

  const handleCambiarEstado = (id, nuevoEstado) => {
    setActividades(actividades.map(act => 
      act.id === id ? { ...act, estado: nuevoEstado } : act
    ));
  };


  const handleActualizarCosto = (id, costo) => {
    setActividades(actividades.map(act => 
      act.id === id ? { 
        ...act, 
        costosReales: {
          ...act.costosReales,
          total: costo
        }
      } : act
    ));
  };

  const handleCargarArchivo = (tareaId, archivo) => {
    const archivoProcesado = {
      id: Date.now(),
      nombre: archivo.name,
      tamaño: archivo.size,
      tipo: archivo.type,
      fechaCarga: new Date().toISOString(),
      url: URL.createObjectURL(archivo),
      cargadoPor: 'Administrador' // En un sistema real, esto vendría del contexto de usuario
    };

    setActividades(actividades.map(act => 
      act.id === tareaId ? { 
        ...act, 
        archivosCargados: [...(act.archivosCargados || []), archivoProcesado]
      } : act
    ));
  };

  const handleEliminarArchivo = (tareaId, archivoId) => {
    setActividades(actividades.map(act => 
      act.id === tareaId ? { 
        ...act, 
        archivosCargados: act.archivosCargados.filter(archivo => archivo.id !== archivoId)
      } : act
    ));
  };

  const handleAgregarComentario = (tareaId, comentario) => {
    const comentarioProcesado = {
      id: Date.now(),
      texto: comentario,
      fecha: new Date().toISOString(),
      autor: 'Administrador' // En un sistema real, esto vendría del contexto de usuario
    };

    setActividades(actividades.map(act => 
      act.id === tareaId ? { 
        ...act, 
        comentarios: [...(act.comentarios || []), comentarioProcesado]
      } : act
    ));
  };

  const handleAsignarRecurso = (tareaId, recurso) => {
    setRecursosAsignados(prev => ({
      ...prev,
      [tareaId]: [...(prev[tareaId] || []), recurso]
    }));

    // Calcular costo estimado basado en recursos
    const recursoSeleccionado = recursosDisponibles.find(r => r.nombre === recurso);
    if (recursoSeleccionado) {
      const horasEstimadas = 8; // Horas estimadas por defecto
      const costoAdicional = recursoSeleccionado.costoHora * horasEstimadas;
      
      setActividades(actividades.map(act => 
        act.id === tareaId ? { 
          ...act, 
          costoEstimado: act.costoEstimado + costoAdicional,
          recursos: [...(act.recursos || []), recurso]
        } : act
      ));
    }
  };

  const handleRegistrarTiempo = (tareaId, horas, recurso) => {
    const tiempoRegistro = {
      id: Date.now(),
      horas: parseFloat(horas),
      recurso: recurso,
      fecha: new Date().toISOString(),
      costo: 0
    };

    // Calcular costo basado en el recurso
    const recursoSeleccionado = recursosDisponibles.find(r => r.nombre === recurso);
    if (recursoSeleccionado) {
      tiempoRegistro.costo = recursoSeleccionado.costoHora * tiempoRegistro.horas;
    }

    setTiempoRegistrado(prev => ({
      ...prev,
      [tareaId]: [...(prev[tareaId] || []), tiempoRegistro]
    }));

    // Actualizar costo real de la tarea
    setActividades(actividades.map(act => {
      if (act.id === tareaId) {
        const tiempoActual = tiempoRegistrado[tareaId] || [];
        const costoTotalTiempo = [...tiempoActual, tiempoRegistro].reduce((total, t) => total + t.costo, 0);
        
        return {
          ...act,
          costosReales: {
            ...act.costosReales,
            total: costoTotalTiempo,
            desglose: [...tiempoActual, tiempoRegistro]
          }
        };
      }
      return act;
    }));
  };

  const calcularCostoTotalRecursos = () => {
    return Object.values(tiempoRegistrado).flat().reduce((total, tiempo) => total + tiempo.costo, 0);
  };

  const calcularCostoEstimadoTotal = () => {
    return actividades.reduce((total, act) => total + (act.costoEstimado || 0), 0);
  };

  const generarReporteCostos = () => {
    const reporte = {
      fecha: new Date().toISOString(),
      costoEstimadoTotal: calcularCostoEstimadoTotal(),
      costoRealTotal: calcularCostoTotalRecursos(),
      diferencia: calcularCostoTotalRecursos() - calcularCostoEstimadoTotal(),
      desglosePorTarea: actividades.map(act => ({
        titulo: act.titulo,
        costoEstimado: act.costoEstimado,
        costoReal: act.costosReales?.total || 0,
        recursos: act.recursos || [],
        tiempoRegistrado: tiempoRegistrado[act.id] || []
      }))
    };
    
    console.log('Reporte de Costos:', reporte);
    return reporte;
  };

  const actividadesFiltradas = actividades.filter(act => {
    const cumpleEstado = filtroEstado === 'todos' || act.estado === filtroEstado;
    const cumplePrioridad = filtroPrioridad === 'todos' || act.prioridad === filtroPrioridad;
    const cumpleTipo = filtroTipo === 'todos' || act.tipo === filtroTipo;
    return cumpleEstado && cumplePrioridad && cumpleTipo;
  });

  const calcularCostoTotal = () => {
    return actividades.reduce((total, act) => total + (act.costosReales?.total || 0), 0);
  };

  const recursosDisponibles = [
    { nombre: 'Abogado Senior', costoHora: 150, especialidad: 'Derecho Civil' },
    { nombre: 'Abogado Junior', costoHora: 100, especialidad: 'Derecho Civil' },
    { nombre: 'Paralegal', costoHora: 60, especialidad: 'Investigación Legal' },
    { nombre: 'Investigador', costoHora: 80, especialidad: 'Investigación de Campo' },
    { nombre: 'Secretario Legal', costoHora: 40, especialidad: 'Administración' },
    { nombre: 'Perito', costoHora: 200, especialidad: 'Peritaje Técnico' },
    { nombre: 'Testigo', costoHora: 50, especialidad: 'Testimonio' },
    { nombre: 'Traductor', costoHora: 70, especialidad: 'Traducción' }
  ];

  const [recursosAsignados, setRecursosAsignados] = useState({});
  const [tiempoRegistrado, setTiempoRegistrado] = useState({});
  const [mostrarAnalisisCostos, setMostrarAnalisisCostos] = useState(false);

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#2d3748',
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            🏢 Panel de Actividades - Microsoft Project Style
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Gestión integral de dependencias, tareas y recursos con análisis de costos
          </p>
          
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                const reporte = generarReporteCostos();
                alert(`Reporte de Costos Generado:
                
💰 Costo Estimado Total: $${reporte.costoEstimadoTotal.toLocaleString()}
⏱️ Costo Real Total: $${reporte.costoRealTotal.toLocaleString()}
📊 Diferencia: $${reporte.diferencia.toLocaleString()}
📋 Tareas Analizadas: ${reporte.desglosePorTarea.length}

El reporte completo se ha guardado en la consola del navegador.`);
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#d69e2e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(214, 158, 46, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              📊 Generar Reporte de Costos
            </button>
          </div>
        </div>

        {/* Dashboard de Métricas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📋 Dependencias</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {dependencias.length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⚡ Tareas Activas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>
              {actividades.filter(a => a.estado === 'en_progreso').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>💰 Costo Estimado</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d69e2e' }}>
              ${calcularCostoEstimadoTotal().toLocaleString()}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⏱️ Costo Real</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e53e3e' }}>
              ${calcularCostoTotalRecursos().toLocaleString()}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>👥 Recursos Activos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#805ad5' }}>
              {Object.keys(recursosAsignados).length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>✅ Completadas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>
              {actividades.filter(a => a.estado === 'completada').length}
            </p>
          </div>
        </div>

        {/* Dependencias */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#2d3748',
            marginBottom: '20px'
          }}>
            📋 Dependencias Recibidas
          </h2>
          
          {dependencias.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay dependencias disponibles. Las dependencias aparecerán aquí cuando los usuarios generen formularios jurídicos.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {dependencias.map(dep => (
                <div key={dep.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {dep.tipo} - ID: {dep.id}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Solicitante:</strong> {dep.solicitante} | 
                        <strong> Estado:</strong> {dep.estado} | 
                        <strong> Prioridad:</strong> {dep.prioridad}
                      </p>
                      {dep.anonimato && (
                        <span style={{ 
                          background: '#fef5e7', 
                          color: '#d69e2e', 
                          padding: '4px 8px', 
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}>
                          🔒 MODO ANÓNIMO
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setDependenciaSeleccionada(dep);
                        setMostrarFormulario(true);
                      }}
                      style={{
                        background: '#3182ce',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ➕ Crear Tarea
                    </button>
                  </div>
                  
                  {/* Archivos disponibles */}
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>📁 Archivos Disponibles:</h4>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {dep.pdfGenerado && (
                        <a
                          href={dep.pdfGenerado.url}
                          download={dep.pdfGenerado.nombre}
                          style={{
                            background: '#e53e3e',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                          }}
                        >
                          📄 PDF Principal
                        </a>
                      )}
                      {dep.archivoConsejoIA && (
                        <a
                          href={dep.archivoConsejoIA.url}
                          download={dep.archivoConsejoIA.nombre}
                          style={{
                            background: '#38a169',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                          }}
                        >
                          🤖 Consejo IA
                        </a>
                      )}
                      {dep.evidencias.map((evidencia, index) => (
                        <a
                          key={index}
                          href={evidencia.url}
                          download={evidencia.nombre}
                          style={{
                            background: '#805ad5',
                            color: 'white',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '0.9rem',
                            fontWeight: 'bold'
                          }}
                        >
                          📎 {evidencia.nombre}
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  {/* Tareas existentes */}
                  {dep.tareas && dep.tareas.length > 0 && (
                    <div>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px' }}>⚡ Tareas Asignadas:</h4>
                      <div style={{ display: 'grid', gap: '10px' }}>
                        {dep.tareas.map(tarea => (
                          <div key={tarea.id} style={{
                            background: 'white',
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '12px'
                          }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div>
                                <strong>{tarea.titulo}</strong> - {tarea.estado} - {tarea.responsable}
                              </div>
                              <div style={{ display: 'flex', gap: '5px' }}>
                                <span style={{ 
                                  background: tarea.estado === 'completada' ? '#38a169' : 
                                             tarea.estado === 'en_progreso' ? '#3182ce' : '#d69e2e',
                                  color: 'white',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem'
                                }}>
                                  {tarea.estado}
                                </span>
                                <span style={{ 
                                  background: '#805ad5',
                                  color: 'white',
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem'
                                }}>
                                  ${tarea.costosReales?.total || 0}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulario para crear tarea */}
        {mostrarFormulario && dependenciaSeleccionada && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              ➕ Crear Nueva Tarea para: {dependenciaSeleccionada.tipo}
            </h2>
            
            <form onSubmit={handleCrearTarea}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Título de la Tarea *
                  </label>
                  <input
                    type="text"
                    value={nuevaTarea.titulo}
                    onChange={(e) => setNuevaTarea({...nuevaTarea, titulo: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tipo de Tarea *
                  </label>
                  <select
                    value={nuevaTarea.tipo}
                    onChange={(e) => setNuevaTarea({...nuevaTarea, tipo: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="juridica">Jurídica</option>
                    <option value="administrativa">Administrativa</option>
                    <option value="investigacion">Investigación</option>
                    <option value="documentacion">Documentación</option>
                    <option value="comunicacion">Comunicación</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Prioridad *
                  </label>
                  <select
                    value={nuevaTarea.prioridad}
                    onChange={(e) => setNuevaTarea({...nuevaTarea, prioridad: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="baja">Baja</option>
                    <option value="media">Media</option>
                    <option value="alta">Alta</option>
                    <option value="critica">Crítica</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Responsable *
                  </label>
                  <select
                    value={nuevaTarea.responsable}
                    onChange={(e) => setNuevaTarea({...nuevaTarea, responsable: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="">Seleccionar responsable</option>
                    {recursosDisponibles.map(recurso => (
                      <option key={recurso} value={recurso}>{recurso}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    value={nuevaTarea.fechaInicio}
                    onChange={(e) => setNuevaTarea({...nuevaTarea, fechaInicio: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Fecha de Vencimiento *
                  </label>
                  <input
                    type="date"
                    value={nuevaTarea.fechaVencimiento}
                    onChange={(e) => setNuevaTarea({...nuevaTarea, fechaVencimiento: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Costo Estimado (USD) *
                  </label>
                  <input
                    type="number"
                    value={nuevaTarea.costoEstimado}
                    onChange={(e) => setNuevaTarea({...nuevaTarea, costoEstimado: parseFloat(e.target.value) || 0})}
                    required
                    min="0"
                    step="0.01"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                  Descripción Detallada *
                </label>
                <textarea
                  value={nuevaTarea.descripcion}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#718096',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#3182ce',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Crear Tarea
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtros */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '20px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>🔍 Filtros</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#4a5568', marginBottom: '5px' }}>
                Estado:
              </label>
              <select 
                value={filtroEstado} 
                onChange={(e) => setFiltroEstado(e.target.value)} 
                style={{ padding: '8px', border: '2px solid #e2e8f0', borderRadius: '6px' }}
              >
                <option value="todos">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En Progreso</option>
                <option value="completada">Completada</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#4a5568', marginBottom: '5px' }}>
                Prioridad:
              </label>
              <select 
                value={filtroPrioridad} 
                onChange={(e) => setFiltroPrioridad(e.target.value)} 
                style={{ padding: '8px', border: '2px solid #e2e8f0', borderRadius: '6px' }}
              >
                <option value="todos">Todos</option>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#4a5568', marginBottom: '5px' }}>
                Tipo:
              </label>
              <select 
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)} 
                style={{ padding: '8px', border: '2px solid #e2e8f0', borderRadius: '6px' }}
              >
                <option value="todos">Todos</option>
                <option value="juridica">Jurídica</option>
                <option value="administrativa">Administrativa</option>
                <option value="investigacion">Investigación</option>
                <option value="documentacion">Documentación</option>
                <option value="comunicacion">Comunicación</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de tareas */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#2d3748',
            marginBottom: '20px'
          }}>
            ⚡ Tareas ({actividadesFiltradas.length})
          </h2>
          
          {actividadesFiltradas.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay tareas que mostrar con los filtros actuales.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {actividadesFiltradas.map(tarea => (
                <div key={tarea.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {tarea.titulo}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Tipo:</strong> {tarea.tipo} | 
                        <strong> Responsable:</strong> {tarea.responsable} | 
                        <strong> Vencimiento:</strong> {tarea.fechaVencimiento}
                      </p>
                      <p style={{ color: '#4a5568' }}>{tarea.descripcion}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        background: tarea.estado === 'completada' ? '#38a169' : 
                                   tarea.estado === 'en_progreso' ? '#3182ce' : '#d69e2e',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {tarea.estado}
                      </span>
                      <span style={{ 
                        background: '#805ad5',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        ${tarea.costosReales?.total || tarea.costoEstimado}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                    <button 
                      onClick={() => handleCambiarEstado(tarea.id, 'en_progreso')}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: '#3182ce', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ▶️ Iniciar
                    </button>
                    <button 
                      onClick={() => handleCambiarEstado(tarea.id, 'completada')}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: '#38a169', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      ✅ Completar
                    </button>
                    <button 
                      onClick={() => setTareaExpandida(tareaExpandida === tarea.id ? null : tarea.id)}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: '#805ad5', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                    >
                      📁 {tareaExpandida === tarea.id ? 'Ocultar' : 'Ver'} Detalles
                    </button>
                    <input
                      type="number"
                      placeholder="Costo real"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleActualizarCosto(tarea.id, parseFloat(e.target.value) || 0);
                          e.target.value = '';
                        }
                      }}
                      style={{ 
                        padding: '8px', 
                        border: '2px solid #e2e8f0', 
                        borderRadius: '6px',
                        width: '120px'
                      }}
                    />
                  </div>

                  {/* Sección expandible de archivos y comentarios */}
                  {tareaExpandida === tarea.id && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '20px',
                      marginTop: '15px'
                    }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        
                        {/* Panel de Archivos */}
                        <div>
                          <h4 style={{ 
                            color: '#2d3748', 
                            marginBottom: '15px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                          }}>
                            📎 Archivos de la Tarea
                          </h4>
                          
                          {/* Cargar archivo */}
                          <div style={{ marginBottom: '15px' }}>
                            <input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  handleCargarArchivo(tarea.id, e.target.files[0]);
                                  e.target.value = '';
                                }
                              }}
                              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.txt,.xlsx,.xls"
                              style={{
                                padding: '8px',
                                border: '2px dashed #3182ce',
                                borderRadius: '6px',
                                backgroundColor: '#f7fafc',
                                width: '100%',
                                cursor: 'pointer'
                              }}
                            />
                          </div>

                          {/* Lista de archivos cargados */}
                          {tarea.archivosCargados && tarea.archivosCargados.length > 0 ? (
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                              {tarea.archivosCargados.map(archivo => (
                                <div key={archivo.id} style={{ 
                                  display: 'flex', 
                                  justifyContent: 'space-between', 
                                  alignItems: 'center',
                                  padding: '8px',
                                  background: '#f7fafc',
                                  borderRadius: '6px',
                                  marginBottom: '5px',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  <div>
                                    <span style={{ color: '#2d3748', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                      📄 {archivo.nombre}
                                    </span>
                                    <br />
                                    <span style={{ color: '#718096', fontSize: '0.8rem' }}>
                                      {(archivo.tamaño / 1024 / 1024).toFixed(2)} MB - {archivo.cargadoPor}
                                    </span>
                                  </div>
                                  <div style={{ display: 'flex', gap: '5px' }}>
                                    <a
                                      href={archivo.url}
                                      download={archivo.nombre}
                                      style={{
                                        padding: '4px 8px',
                                        backgroundColor: '#3182ce',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem'
                                      }}
                                    >
                                      ⬇️
                                    </a>
                                    <button
                                      onClick={() => handleEliminarArchivo(tarea.id, archivo.id)}
                                      style={{
                                        padding: '4px 8px',
                                        backgroundColor: '#e53e3e',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        fontSize: '0.8rem',
                                        cursor: 'pointer'
                                      }}
                                    >
                                      🗑️
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ color: '#718096', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
                              No hay archivos cargados en esta tarea.
                            </p>
                          )}
                        </div>

                        {/* Panel de Comentarios */}
                        <div>
                          <h4 style={{ 
                            color: '#2d3748', 
                            marginBottom: '15px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                          }}>
                            💬 Comentarios y Notas
                          </h4>
                          
                          {/* Agregar comentario */}
                          <div style={{ marginBottom: '15px' }}>
                            <textarea
                              placeholder="Agregar comentario o nota sobre la tarea..."
                              rows="3"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && e.ctrlKey) {
                                  handleAgregarComentario(tarea.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '6px',
                                resize: 'vertical',
                                fontSize: '0.9rem'
                              }}
                            />
                            <p style={{ color: '#718096', fontSize: '0.8rem', marginTop: '5px' }}>
                              Presiona Ctrl+Enter para agregar el comentario
                            </p>
                          </div>

                          {/* Lista de comentarios */}
                          {tarea.comentarios && tarea.comentarios.length > 0 ? (
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                              {tarea.comentarios.map(comentario => (
                                <div key={comentario.id} style={{ 
                                  padding: '10px',
                                  background: '#f7fafc',
                                  borderRadius: '6px',
                                  marginBottom: '8px',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '5px' }}>
                                    <span style={{ color: '#2d3748', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                      {comentario.autor}
                                    </span>
                                    <span style={{ color: '#718096', fontSize: '0.8rem' }}>
                                      {new Date(comentario.fecha).toLocaleString()}
                                    </span>
                                  </div>
                                  <p style={{ color: '#4a5568', fontSize: '0.9rem', margin: 0 }}>
                                    {comentario.texto}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p style={{ color: '#718096', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
                              No hay comentarios en esta tarea.
                            </p>
                          )}
                        </div>

                        {/* Panel de Recursos y Costos */}
                        <div>
                          <h4 style={{ 
                            color: '#2d3748', 
                            marginBottom: '15px',
                            fontSize: '1.1rem',
                            fontWeight: 'bold'
                          }}>
                            👥 Recursos y Costos
                          </h4>
                          
                          {/* Asignar recurso */}
                          <div style={{ marginBottom: '15px' }}>
                            <select
                              onChange={(e) => {
                                if (e.target.value) {
                                  handleAsignarRecurso(tarea.id, e.target.value);
                                  e.target.value = '';
                                }
                              }}
                              style={{
                                width: '100%',
                                padding: '8px',
                                border: '2px solid #e2e8f0',
                                borderRadius: '6px',
                                fontSize: '0.9rem',
                                marginBottom: '10px'
                              }}
                            >
                              <option value="">Asignar recurso...</option>
                              {recursosDisponibles.map(recurso => (
                                <option key={recurso.nombre} value={recurso.nombre}>
                                  {recurso.nombre} - ${recurso.costoHora}/h
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Registrar tiempo */}
                          <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                              <select
                                id={`recurso-${tarea.id}`}
                                style={{
                                  flex: 1,
                                  padding: '6px',
                                  border: '2px solid #e2e8f0',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem'
                                }}
                              >
                                <option value="">Seleccionar recurso</option>
                                {(recursosAsignados[tarea.id] || []).map(recurso => (
                                  <option key={recurso} value={recurso}>{recurso}</option>
                                ))}
                              </select>
                              <input
                                type="number"
                                placeholder="Horas"
                                min="0"
                                step="0.5"
                                id={`horas-${tarea.id}`}
                                style={{
                                  width: '80px',
                                  padding: '6px',
                                  border: '2px solid #e2e8f0',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem'
                                }}
                              />
                              <button
                                onClick={() => {
                                  const recurso = document.getElementById(`recurso-${tarea.id}`).value;
                                  const horas = document.getElementById(`horas-${tarea.id}`).value;
                                  if (recurso && horas) {
                                    handleRegistrarTiempo(tarea.id, horas, recurso);
                                    document.getElementById(`recurso-${tarea.id}`).value = '';
                                    document.getElementById(`horas-${tarea.id}`).value = '';
                                  }
                                }}
                                style={{
                                  padding: '6px 12px',
                                  backgroundColor: '#38a169',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '0.8rem',
                                  cursor: 'pointer'
                                }}
                              >
                                ⏱️
                              </button>
                            </div>
                          </div>

                          {/* Recursos asignados */}
                          {recursosAsignados[tarea.id] && recursosAsignados[tarea.id].length > 0 && (
                            <div style={{ marginBottom: '15px' }}>
                              <h5 style={{ color: '#2d3748', fontSize: '0.9rem', marginBottom: '8px' }}>
                                Recursos Asignados:
                              </h5>
                              <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                {recursosAsignados[tarea.id].map((recurso, index) => {
                                  const recursoInfo = recursosDisponibles.find(r => r.nombre === recurso);
                                  return (
                                    <div key={index} style={{ 
                                      padding: '6px',
                                      background: '#f7fafc',
                                      borderRadius: '4px',
                                      marginBottom: '4px',
                                      border: '1px solid #e2e8f0',
                                      fontSize: '0.8rem'
                                    }}>
                                      <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                                        {recurso}
                                      </div>
                                      <div style={{ color: '#718096' }}>
                                        ${recursoInfo?.costoHora}/h - {recursoInfo?.especialidad}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Tiempo registrado */}
                          {tiempoRegistrado[tarea.id] && tiempoRegistrado[tarea.id].length > 0 && (
                            <div>
                              <h5 style={{ color: '#2d3748', fontSize: '0.9rem', marginBottom: '8px' }}>
                                Tiempo Registrado:
                              </h5>
                              <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                {tiempoRegistrado[tarea.id].map(tiempo => (
                                  <div key={tiempo.id} style={{ 
                                    padding: '6px',
                                    background: '#f7fafc',
                                    borderRadius: '4px',
                                    marginBottom: '4px',
                                    border: '1px solid #e2e8f0',
                                    fontSize: '0.8rem'
                                  }}>
                                    <div style={{ fontWeight: 'bold', color: '#2d3748' }}>
                                      {tiempo.recurso} - {tiempo.horas}h
                                    </div>
                                    <div style={{ color: '#718096' }}>
                                      ${tiempo.costo.toFixed(2)} - {new Date(tiempo.fecha).toLocaleDateString()}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Resumen de costos */}
                          <div style={{ 
                            marginTop: '15px',
                            padding: '10px',
                            background: '#f0fff4',
                            borderRadius: '6px',
                            border: '1px solid #9ae6b4'
                          }}>
                            <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                              Resumen de Costos:
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#2d3748' }}>
                              Estimado: ${tarea.costoEstimado.toFixed(2)}
                            </div>
                            <div style={{ fontSize: '0.8rem', color: '#2d3748' }}>
                              Real: ${(tarea.costosReales?.total || 0).toFixed(2)}
                            </div>
                            <div style={{ 
                              fontSize: '0.8rem', 
                              color: (tarea.costosReales?.total || 0) > tarea.costoEstimado ? '#e53e3e' : '#38a169',
                              fontWeight: 'bold'
                            }}>
                              Diferencia: ${((tarea.costosReales?.total || 0) - tarea.costoEstimado).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelActividades;