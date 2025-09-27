import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const TareasAsignadas = () => {
  const { user } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [filtroEst, setFiltroEst] = useState('todos');
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  // Cargar tareas desde localStorage
  useEffect(() => {
    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades') || '[]');
    // Filtrar tareas asignadas al usuario actual
    const tareasAsignadas = actividadesGuardadas.filter(actividad => 
      actividad.responsable === user?.nombre
    );
    setTareas(tareasAsignadas);
  }, [user]);

  const handleActualizarProgreso = (tareaId, progreso) => {
    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades') || '[]');
    const actividadesActualizadas = actividadesGuardadas.map(actividad => 
      actividad.id === tareaId 
        ? { ...actividad, progreso: Math.min(100, Math.max(0, progreso)) }
        : actividad
    );
    localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
    
    setTareas(tareas.map(tarea => 
      tarea.id === tareaId 
        ? { ...tarea, progreso: Math.min(100, Math.max(0, progreso)) }
        : tarea
    ));
  };

  const handleCambiarEstado = (tareaId, nuevoEstado) => {
    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades') || '[]');
    const actividadesActualizadas = actividadesGuardadas.map(actividad => 
      actividad.id === tareaId 
        ? { ...actividad, estado: nuevoEstado }
        : actividad
    );
    localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
    
    setTareas(tareas.map(tarea => 
      tarea.id === tareaId 
        ? { ...tarea, estado: nuevoEstado }
        : tarea
    ));
  };

  const handleAgregarComentario = (tareaId, comentario) => {
    const comentarioProcesado = {
      id: Date.now(),
      texto: comentario,
      fecha: new Date().toISOString(),
      autor: user?.nombre || 'Usuario'
    };

    const actividadesGuardadas = JSON.parse(localStorage.getItem('actividades') || '[]');
    const actividadesActualizadas = actividadesGuardadas.map(actividad => 
      actividad.id === tareaId 
        ? { 
            ...actividad, 
            comentarios: [...(actividad.comentarios || []), comentarioProcesado]
          }
        : actividad
    );
    localStorage.setItem('actividades', JSON.stringify(actividadesActualizadas));
    
    setTareas(tareas.map(tarea => 
      tarea.id === tareaId 
        ? { 
            ...tarea, 
            comentarios: [...(tarea.comentarios || []), comentarioProcesado]
          }
        : tarea
    ));
  };

  const tareasFiltradas = tareas.filter(tarea => {
    return filtroEst === 'todos' || tarea.est === filtroEst;
  });

  const calcularProgresoPromedio = () => {
    return tareas.length > 0 ? Math.round(tareas.reduce((sum, t) => sum + t.progreso, 0) / tareas.length) : 0;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
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
            📋 Mis Tareas Asignadas
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Gestión de actividades asignadas a {user?.nombre}
          </p>
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📋 Total Tareas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {tareas.length}
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
              {tareas.filter(t => t.estado === 'pendiente').length}
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
              {tareas.filter(t => t.estado === 'en_progreso').length}
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
              {tareas.filter(t => t.estado === 'completada').length}
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
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#805ad5' }}>
              {calcularProgresoPromedio()}%
            </p>
          </div>
        </div>

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
          </div>
        </div>

        {/* Lista de Tareas */}
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
            📋 Mis Tareas ({tareasFiltradas.length})
          </h2>
          
          {tareasFiltradas.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay tareas asignadas con los filtros actuales.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {tareasFiltradas.map(tarea => (
                <div key={tarea.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {tarea.nombre}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Tipo:</strong> {tarea.tipo} | 
                        <strong> Prioridad:</strong> {tarea.prioridad} | 
                        <strong> Vencimiento:</strong> {tarea.fechaFin}
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
                        ${tarea.costoEstimado}
                      </span>
                    </div>
                  </div>
                  
                  {/* Barra de Progreso */}
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ 
                      width: '100%', 
                      backgroundColor: '#e2e8f0', 
                      borderRadius: '4px',
                      height: '25px',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${tarea.progreso}%`,
                        backgroundColor: tarea.progreso === 100 ? '#38a169' : '#3182ce',
                        height: '100%',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {tarea.progreso}%
                      </div>
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
                    <input
                      type="number"
                      placeholder="Progreso %"
                      min="0"
                      max="100"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleActualizarProgreso(tarea.id, parseInt(e.target.value) || 0);
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
                    <button 
                      onClick={() => setTareaSeleccionada(tareaSeleccionada === tarea.id ? null : tarea.id)}
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
                      💬 {tareaSeleccionada === tarea.id ? 'Ocultar' : 'Ver'} Comentarios
                    </button>
                  </div>

                  {/* Sección de Comentarios */}
                  {tareaSeleccionada === tarea.id && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '20px',
                      marginTop: '15px'
                    }}>
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

export default TareasAsignadas;
