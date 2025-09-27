import React, { useState, useEffect } from 'react';

const GestionActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [actividadEditando, setActividadEditando] = useState(null);
  const [nuevaActividad, setNuevaActividad] = useState({
    nom: '',
    des: '',
    tip: 'juridica',
    pri: 'med',
    est: 'pendiente',
    fec_ini: '',
    fec_fin: '',
    dur: 1,
    resp: '',
    dep: [],
    rec: [],
    cos_est: 0,
    pro: 0,
    pre_id: ''
  });

  // Estados para presupuestos
  const [presupuestos, setPresupuestos] = useState([]);

  // Cargar datos desde localStorage
  useEffect(() => {
    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades') || '[]');
    const dependenciasGuardadas = JSON.parse(localStorage.getItem('dependencias') || '[]');
    const presupuestosGuardados = JSON.parse(localStorage.getItem('presupuestosActividad') || '[]');
    
    setActividades(actividadesGuardadas);
    setDependencias(dependenciasGuardadas);
    setPresupuestos(presupuestosGuardados);
  }, []);

  const handleGuardarActividad = (e) => {
    e.preventDefault();
    
    if (actividadEditando) {
      // Editar actividad existente
      const actividadesActualizadas = actividades.map(actividad => 
        actividad.id === actividadEditando.id 
          ? { ...actividad, ...nuevaActividad }
          : actividad
      );
      setActividades(actividadesActualizadas);
      localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
    } else {
      // Crear nueva actividad
      const actividad = {
        id: Date.now(),
        ...nuevaActividad,
        fechaCreacion: new Date().toISOString()
      };
      const actividadesActualizadas = [...actividades, actividad];
      setActividades(actividadesActualizadas);
      localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
    }
    
    setMostrarFormulario(false);
    setActividadEditando(null);
    setNuevaActividad({
      nombre: '',
      descripcion: '',
      tipo: 'juridica',
      prioridad: 'media',
      estado: 'pendiente',
      fechaInicio: '',
      fechaFin: '',
      duracion: 1,
      responsable: '',
      dependencias: [],
      recursos: [],
      costoEstimado: 0,
      progreso: 0,
      presupuestoId: ''
    });
  };

  const handleEditarActividad = (actividad) => {
    setActividadEditando(actividad);
    setNuevaActividad(actividad);
    setMostrarFormulario(true);
  };

  const handleEliminarActividad = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta actividad?')) {
      const actividadesActualizadas = actividades.filter(actividad => actividad.id !== id);
      setActividades(actividadesActualizadas);
      localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
    }
  };

  const handleCambiarEstado = (id, nuevoEstado) => {
    const actividadesActualizadas = actividades.map(actividad => 
      actividad.id === id 
        ? { ...actividad, estado: nuevoEstado }
        : actividad
    );
    setActividades(actividadesActualizadas);
    localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
  };

  const handleActualizarProgreso = (id, progreso) => {
    const actividadesActualizadas = actividades.map(actividad => 
      actividad.id === id 
        ? { ...actividad, progreso: Math.min(100, Math.max(0, progreso)) }
        : actividad
    );
    setActividades(actividadesActualizadas);
    localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
  };

  const calcularDependencias = (actividad) => {
    return actividad.dependencias.map(depId => 
      actividades.find(a => a.id === depId)
    ).filter(Boolean);
  };

  const verificarDependencias = (actividad) => {
    const deps = calcularDependencias(actividad);
    return deps.every(dep => dep.estado === 'completada');
  };

  const obtenerRecursosDisponibles = () => {
    const recursosGuardados = JSON.parse(localStorage.getItem('recursos') || '[]');
    return recursosGuardados.filter(r => r.estado === 'activo');
  };

  const aplicarPresupuesto = (presupuestoId) => {
    const presupuestoSeleccionado = presupuestos.find(p => p.id === parseInt(presupuestoId));
    if (presupuestoSeleccionado) {
      setNuevaActividad({
        ...nuevaActividad,
        presupuestoId: presupuestoId,
        costoEstimado: presupuestoSeleccionado.costos.total,
        responsable: presupuestoSeleccionado.responsable,
        tipo: presupuestoSeleccionado.tipo,
        prioridad: presupuestoSeleccionado.prioridad
      });
    }
  };

  const calcularCostoTotal = () => {
    return actividades.reduce((total, actividad) => total + actividad.costoEstimado, 0);
  };

  const obtenerActividadesPorEstado = (estado) => {
    return actividades.filter(a => a.estado === estado);
  };

  const generarDiagramaGantt = () => {
    const actividadesOrdenadas = [...actividades].sort((a, b) => 
      new Date(a.fechaInicio) - new Date(b.fechaInicio)
    );
    
    return actividadesOrdenadas.map(actividad => ({
      ...actividad,
      dependenciasCompletadas: verificarDependencias(actividad),
      puedeIniciar: verificarDependencias(actividad)
    }));
  };

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
            📋 Gestión de Actividades con Dependencias
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Sistema de programación de tareas con análisis de dependencias y recursos
          </p>
          
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setMostrarFormulario(true)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#3182ce',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(49, 130, 206, 0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              ➕ Crear Nueva Actividad
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📋 Total Actividades</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {actividades.length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⏳ Pendientes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d69e2e' }}>
              {obtenerActividadesPorEstado('pendiente').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⚡ En Progreso</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {obtenerActividadesPorEstado('en_progreso').length}
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
              {obtenerActividadesPorEstado('completada').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>💰 Costo Total</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#805ad5' }}>
              ${calcularCostoTotal().toLocaleString()}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📊 Progreso Promedio</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#e53e3e' }}>
              {actividades.length > 0 ? Math.round(actividades.reduce((sum, a) => sum + a.progreso, 0) / actividades.length) : 0}%
            </p>
          </div>
        </div>

        {/* Formulario de Actividad */}
        {mostrarFormulario && (
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
              {actividadEditando ? '✏️ Editar Actividad' : '➕ Crear Nueva Actividad'}
            </h2>
            
            <form onSubmit={handleGuardarActividad}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Nombre de la Actividad *
                  </label>
                  <input
                    type="text"
                    value={nuevaActividad.nombre}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, nombre: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tipo de Actividad *
                  </label>
                  <select
                    value={nuevaActividad.tipo}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, tipo: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="juridica">Jurídica</option>
                    <option value="administrativa">Administrativa</option>
                    <option value="investigacion">Investigación</option>
                    <option value="documentacion">Documentación</option>
                    <option value="comunicacion">Comunicación</option>
                    <option value="audiencia">Audiencia</option>
                    <option value="seguimiento">Seguimiento</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Prioridad *
                  </label>
                  <select
                    value={nuevaActividad.prioridad}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, prioridad: e.target.value})}
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
                    Presupuesto Relacionado
                  </label>
                  <select
                    value={nuevaActividad.presupuestoId}
                    onChange={(e) => {
                      setNuevaActividad({...nuevaActividad, presupuestoId: e.target.value});
                      if (e.target.value) {
                        aplicarPresupuesto(e.target.value);
                      }
                    }}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="">Seleccionar presupuesto</option>
                    {presupuestos.map(presupuesto => (
                      <option key={presupuesto.id} value={presupuesto.id}>
                        {presupuesto.codigo} - {presupuesto.nombre} (${presupuesto.costos.total.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Responsable *
                  </label>
                  <select
                    value={nuevaActividad.responsable}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, responsable: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="">Seleccionar responsable</option>
                    {obtenerRecursosDisponibles().map(recurso => (
                      <option key={recurso.id} value={recurso.nombre}>
                        {recurso.nombre} - ${recurso.tasaHoras}/h
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Fecha de Inicio *
                  </label>
                  <input
                    type="date"
                    value={nuevaActividad.fechaInicio}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, fechaInicio: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Duración (días) *
                  </label>
                  <input
                    type="number"
                    value={nuevaActividad.duracion}
                    onChange={(e) => {
                      const duracion = parseInt(e.target.value) || 1;
                      const fechaInicio = new Date(nuevaActividad.fechaInicio);
                      const fechaFin = new Date(fechaInicio);
                      fechaFin.setDate(fechaFin.getDate() + duracion - 1);
                      
                      setNuevaActividad({
                        ...nuevaActividad, 
                        duracion: duracion,
                        fechaFin: fechaFin.toISOString().split('T')[0]
                      });
                    }}
                    required
                    min="1"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Costo Estimado (USD)
                  </label>
                  <input
                    type="number"
                    value={nuevaActividad.costoEstimado}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, costoEstimado: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Progreso (%)
                  </label>
                  <input
                    type="number"
                    value={nuevaActividad.progreso}
                    onChange={(e) => setNuevaActividad({...nuevaActividad, progreso: parseInt(e.target.value) || 0})}
                    min="0"
                    max="100"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                  Descripción Detallada *
                </label>
                <textarea
                  value={nuevaActividad.descripcion}
                  onChange={(e) => setNuevaActividad({...nuevaActividad, descripcion: e.target.value})}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              {/* Dependencias */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                  Actividades Dependientes
                </label>
                <div style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px', 
                  padding: '15px',
                  backgroundColor: '#f7fafc'
                }}>
                  {actividades.filter(a => a.id !== nuevaActividad.id).map(actividad => (
                    <label key={actividad.id} style={{ display: 'block', marginBottom: '8px' }}>
                      <input
                        type="checkbox"
                        checked={nuevaActividad.dependencias.includes(actividad.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNuevaActividad({
                              ...nuevaActividad,
                              dependencias: [...nuevaActividad.dependencias, actividad.id]
                            });
                          } else {
                            setNuevaActividad({
                              ...nuevaActividad,
                              dependencias: nuevaActividad.dependencias.filter(id => id !== actividad.id)
                            });
                          }
                        }}
                        style={{ marginRight: '8px' }}
                      />
                      {actividad.nombre} ({actividad.estado})
                    </label>
                  ))}
                  {actividades.filter(a => a.id !== nuevaActividad.id).length === 0 && (
                    <p style={{ color: '#718096', fontStyle: 'italic' }}>
                      No hay otras actividades para establecer dependencias.
                    </p>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setActividadEditando(null);
                    setNuevaActividad({
                      nombre: '',
                      descripcion: '',
                      tipo: 'juridica',
                      prioridad: 'media',
                      estado: 'pendiente',
                      fechaInicio: '',
                      fechaFin: '',
                      duracion: 1,
                      responsable: '',
                      dependencias: [],
                      recursos: [],
                      costoEstimado: 0,
                      progreso: 0,
                      presupuestoId: ''
                    });
                  }}
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
                  {actividadEditando ? 'Actualizar' : 'Crear'} Actividad
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Diagrama de Gantt Simplificado */}
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
            📊 Cronograma de Actividades
          </h2>
          
          {actividades.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay actividades programadas. Cree la primera actividad para ver el cronograma.
            </p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%', 
                borderCollapse: 'collapse',
                fontSize: '0.9rem'
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#f7fafc' }}>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Actividad
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Responsable
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Inicio
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Fin
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Duración
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Progreso
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Estado
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Dependencias
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {generarDiagramaGantt().map(actividad => (
                    <tr key={actividad.id} style={{ 
                      backgroundColor: actividad.puedeIniciar ? 'white' : '#fef2f2',
                      opacity: actividad.estado === 'completada' ? 0.7 : 1
                    }}>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                        {actividad.nombre}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        {actividad.responsable}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        {actividad.fechaInicio}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        {actividad.fechaFin}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        {actividad.duracion} días
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <div style={{ 
                          width: '100%', 
                          backgroundColor: '#e2e8f0', 
                          borderRadius: '4px',
                          height: '20px',
                          position: 'relative'
                        }}>
                          <div style={{
                            width: `${actividad.progreso}%`,
                            backgroundColor: actividad.progreso === 100 ? '#38a169' : '#3182ce',
                            height: '100%',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.8rem',
                            fontWeight: 'bold'
                          }}>
                            {actividad.progreso}%
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          backgroundColor: actividad.estado === 'completada' ? '#d1fae5' : 
                                          actividad.estado === 'en_progreso' ? '#dbeafe' : '#fef3c7',
                          color: actividad.estado === 'completada' ? '#065f46' : 
                                 actividad.estado === 'en_progreso' ? '#1e40af' : '#92400e'
                        }}>
                          {actividad.estado}
                        </span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        {actividad.dependencias.length > 0 ? (
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            backgroundColor: actividad.dependenciasCompletadas ? '#d1fae5' : '#fef2f2',
                            color: actividad.dependenciasCompletadas ? '#065f46' : '#dc2626'
                          }}>
                            {actividad.dependenciasCompletadas ? '✅' : '⏳'} {actividad.dependencias.length}
                          </span>
                        ) : (
                          <span style={{ color: '#718096' }}>-</span>
                        )}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEditarActividad(actividad)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#3182ce',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleEliminarActividad(actividad.id)}
                            style={{
                              padding: '6px 12px',
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Panel de Control de Actividades */}
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
            ⚡ Control de Actividades
          </h2>
          
          {actividades.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay actividades para controlar. Cree actividades para gestionar su progreso.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {actividades.map(actividad => (
                <div key={actividad.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {actividad.nombre}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Responsable:</strong> {actividad.responsable} | 
                        <strong> Tipo:</strong> {actividad.tipo} | 
                        <strong> Prioridad:</strong> {actividad.prioridad}
                      </p>
                      {actividad.presupuestoId && (
                        <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                          <strong>Presupuesto:</strong> {presupuestos.find(p => p.id === parseInt(actividad.presupuestoId))?.codigo || 'N/A'}
                        </p>
                      )}
                      <p style={{ color: '#4a5568' }}>{actividad.descripcion}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        background: actividad.estado === 'completada' ? '#38a169' : 
                                   actividad.estado === 'en_progreso' ? '#3182ce' : '#d69e2e',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {actividad.estado}
                      </span>
                      <span style={{ 
                        background: '#805ad5',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        ${actividad.costoEstimado}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '15px' }}>
                    <button 
                      onClick={() => handleCambiarEstado(actividad.id, 'en_progreso')}
                      disabled={!verificarDependencias(actividad)}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: verificarDependencias(actividad) ? '#3182ce' : '#a0aec0', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: verificarDependencias(actividad) ? 'pointer' : 'not-allowed'
                      }}
                    >
                      ▶️ Iniciar
                    </button>
                    <button 
                      onClick={() => handleCambiarEstado(actividad.id, 'completada')}
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
                    <input
                      type="number"
                      placeholder="Progreso %"
                      min="0"
                      max="100"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleActualizarProgreso(actividad.id, parseInt(e.target.value) || 0);
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

                  {/* Dependencias */}
                  {actividad.dependencias.length > 0 && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        🔗 Dependencias:
                      </h4>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {calcularDependencias(actividad).map(dep => (
                          <span key={dep.id} style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            backgroundColor: dep.estado === 'completada' ? '#d1fae5' : '#fef2f2',
                            color: dep.estado === 'completada' ? '#065f46' : '#dc2626',
                            border: '1px solid #e2e8f0'
                          }}>
                            {dep.estado === 'completada' ? '✅' : '⏳'} {dep.nombre}
                          </span>
                        ))}
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

export default GestionActividades;
