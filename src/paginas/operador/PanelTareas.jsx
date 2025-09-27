import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const PanelTareas = () => {
  const { user } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [filtros, setFiltros] = useState({
    est: 'todos',
    tip: 'todos',
    pri: 'todos'
  });
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [mostrarChat, setMostrarChat] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Cargar tareas asignadas al operador
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = () => {
    // Cargar desde localStorage o crear datos de prueba
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareasOperador') || '[]');
    
    if (tareasGuardadas.length === 0) {
      // Crear datos de prueba para el operador
      const datosPrueba = [
        {
          id: 1,
          nom: 'Revisión de Documentos Legales',
          des: 'Revisar y analizar documentos legales para el caso de acción de tutela',
          tip: 'legal',
          pri: 'alta',
          est: 'en_progreso',
          fec_cre: '2024-01-15T10:00:00Z',
          fec_lim: '2024-01-25T17:00:00Z',
          asig_a: user?.nombre || 'Operador CSDT',
          cliente: {
            nombre: 'María González',
            email: 'maria@email.com',
            telefono: '3001234567'
          },
          progreso: 65,
          observaciones: 'Documentos recibidos, iniciando análisis',
          mensajes: [
            {
              id: 1,
              remitente: 'María González',
              mensaje: 'Hola, he enviado los documentos solicitados',
              fecha: '2024-01-15T10:30:00Z',
              tipo: 'cliente'
            },
            {
              id: 2,
              remitente: user?.nombre || 'Operador CSDT',
              mensaje: 'Perfecto, los estoy revisando. Te mantendré informada',
              fecha: '2024-01-15T11:00:00Z',
              tipo: 'operador'
            }
          ],
          recursosAsignados: ['Abogado Senior', 'Asistente Legal'],
          costoEstimado: 500000,
          costoReal: 320000
        },
        {
          id: 2,
          nom: 'Investigación de Caso Administrativo',
          des: 'Investigar irregularidades en proceso de licitación municipal',
          tip: 'investigacion',
          pri: 'media',
          est: 'pendiente',
          fec_cre: '2024-01-16T14:00:00Z',
          fec_lim: '2024-01-30T17:00:00Z',
          asig_a: user?.nombre || 'Operador CSDT',
          cliente: {
            nombre: 'Carlos Rodríguez',
            email: 'carlos@email.com',
            telefono: '3109876543'
          },
          progreso: 0,
          observaciones: 'Esperando documentación del cliente',
          mensajes: [
            {
              id: 1,
              remitente: 'Carlos Rodríguez',
              mensaje: 'Necesito ayuda con este caso de licitación',
              fecha: '2024-01-16T14:15:00Z',
              tipo: 'cliente'
            }
          ],
          recursosAsignados: ['Investigador', 'Analista'],
          costoEstimado: 750000,
          costoReal: 0
        },
        {
          id: 3,
          nom: 'Elaboración de Informe Técnico',
          des: 'Elaborar informe técnico sobre proyecto de infraestructura',
          tip: 'tecnico',
          pri: 'baja',
          est: 'completada',
          fec_cre: '2024-01-10T09:00:00Z',
          fec_lim: '2024-01-20T17:00:00Z',
          asig_a: user?.nombre || 'Operador CSDT',
          cliente: {
            nombre: 'Ana Sánchez',
            email: 'ana@email.com',
            telefono: '3155555555'
          },
          progreso: 100,
          observaciones: 'Informe completado y entregado al cliente',
          mensajes: [
            {
              id: 1,
              remitente: 'Ana Sánchez',
              mensaje: 'El informe está excelente, muchas gracias',
              fecha: '2024-01-20T16:30:00Z',
              tipo: 'cliente'
            }
          ],
          recursosAsignados: ['Ingeniero Civil', 'Técnico'],
          costoEstimado: 300000,
          costoReal: 280000
        }
      ];
      
      localStorage.setItem('tareasOperador', JSON.stringify(datosPrueba));
      setTareas(datosPrueba);
    } else {
      setTareas(tareasGuardadas);
    }
  };

  const filtrarTareas = () => {
    let tareasFiltradas = tareas;
    
    if (filtros.estado !== 'todos') {
      tareasFiltradas = tareasFiltradas.filter(tarea => tarea.estado === filtros.estado);
    }
    
    if (filtros.tipo !== 'todos') {
      tareasFiltradas = tareasFiltradas.filter(tarea => tarea.tipo === filtros.tipo);
    }
    
    if (filtros.prioridad !== 'todos') {
      tareasFiltradas = tareasFiltradas.filter(tarea => tarea.prioridad === filtros.prioridad);
    }
    
    return tareasFiltradas;
  };

  const actualizarProgreso = (tareaId, nuevoProgreso) => {
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === tareaId) {
        const estadoActualizado = nuevoProgreso === 100 ? 'completada' : 
                                 nuevoProgreso > 0 ? 'en_progreso' : 'pendiente';
        return {
          ...tarea,
          progreso: nuevoProgreso,
          estado: estadoActualizado
        };
      }
      return tarea;
    });
    
    setTareas(tareasActualizadas);
    localStorage.setItem('tareasOperador', JSON.stringify(tareasActualizadas));
  };

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !tareaSeleccionada) return;
    
    const mensaje = {
      id: Date.now(),
      remitente: user?.nombre || 'Operador CSDT',
      mensaje: nuevoMensaje,
      fecha: new Date().toISOString(),
      tipo: 'operador'
    };
    
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === tareaSeleccionada.id) {
        return {
          ...tarea,
          mensajes: [...tarea.mensajes, mensaje]
        };
      }
      return tarea;
    });
    
    setTareas(tareasActualizadas);
    localStorage.setItem('tareasOperador', JSON.stringify(tareasActualizadas));
    setNuevoMensaje('');
  };

  const actualizarObservaciones = () => {
    if (!observaciones.trim() || !tareaSeleccionada) return;
    
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === tareaSeleccionada.id) {
        return {
          ...tarea,
          observaciones: observaciones
        };
      }
      return tarea;
    });
    
    setTareas(tareasActualizadas);
    localStorage.setItem('tareasOperador', JSON.stringify(tareasActualizadas));
    setObservaciones('');
    alert('Observaciones actualizadas exitosamente');
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return '#f59e0b';
      case 'en_progreso': return '#3b82f6';
      case 'completada': return '#10b981';
      case 'cancelada': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'alta': return '#ef4444';
      case 'media': return '#f59e0b';
      case 'baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'legal': return '#8b5cf6';
      case 'investigacion': return '#06b6d4';
      case 'tecnico': return '#84cc16';
      case 'administrativo': return '#f97316';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
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
            color: '#1e40af',
            marginBottom: '10px'
          }}>
            Panel de Tareas
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#64748b',
            margin: 0
          }}>
            Gestiona tus tareas asignadas y comunícate con clientes
          </p>
        </div>

        {/* Filtros */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '20px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '20px' 
          }}>
            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Estado
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="todos">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="en_progreso">En Progreso</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Tipo
              </label>
              <select
                value={filtros.tipo}
                onChange={(e) => setFiltros({...filtros, tipo: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="todos">Todos los tipos</option>
                <option value="legal">Legal</option>
                <option value="investigacion">Investigación</option>
                <option value="tecnico">Técnico</option>
                <option value="administrativo">Administrativo</option>
              </select>
            </div>

            <div>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Prioridad
              </label>
              <select
                value={filtros.prioridad}
                onChange={(e) => setFiltros({...filtros, prioridad: e.target.value})}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              >
                <option value="todos">Todas las prioridades</option>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
              {tareas.filter(t => t.estado === 'pendiente').length}
            </div>
            <div style={{ fontSize: '1rem', color: '#6b7280' }}>Pendientes</div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {tareas.filter(t => t.estado === 'en_progreso').length}
            </div>
            <div style={{ fontSize: '1rem', color: '#6b7280' }}>En Progreso</div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {tareas.filter(t => t.estado === 'completada').length}
            </div>
            <div style={{ fontSize: '1rem', color: '#6b7280' }}>Completadas</div>
          </div>
          
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>
              {tareas.length}
            </div>
            <div style={{ fontSize: '1rem', color: '#6b7280' }}>Total</div>
          </div>
        </div>

        {/* Lista de Tareas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 400px', 
          gap: '30px' 
        }}>
          
          {/* Lista Principal */}
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#1e40af',
              marginBottom: '20px'
            }}>
              Tareas Asignadas ({filtrarTareas().length})
            </h2>
            
            {filtrarTareas().length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '40px', 
                color: '#6b7280' 
              }}>
                No hay tareas que coincidan con los filtros
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filtrarTareas().map(tarea => (
                  <div 
                    key={tarea.id}
                    onClick={() => setTareaSeleccionada(tarea)}
                    style={{
                      border: tareaSeleccionada?.id === tarea.id ? '3px solid #3b82f6' : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: tareaSeleccionada?.id === tarea.id ? '#f0f9ff' : 'white'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <div>
                        <h3 style={{ 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold', 
                          color: '#1f2937',
                          margin: '0 0 8px 0'
                        }}>
                          {tarea.nombre}
                        </h3>
                        <p style={{ 
                          color: '#6b7280', 
                          fontSize: '0.9rem',
                          margin: '0 0 10px 0'
                        }}>
                          {tarea.descripcion}
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                        <span style={{
                          backgroundColor: getEstadoColor(tarea.estado),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {tarea.estado.replace('_', ' ')}
                        </span>
                        
                        <span style={{
                          backgroundColor: getPrioridadColor(tarea.prioridad),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {tarea.prioridad}
                        </span>
                        
                        <span style={{
                          backgroundColor: getTipoColor(tarea.tipo),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {tarea.tipo}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                      gap: '15px',
                      marginBottom: '15px'
                    }}>
                      <div>
                        <strong style={{ color: '#374151' }}>Cliente:</strong>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          {tarea.cliente.nombre}
                        </div>
                      </div>
                      
                      <div>
                        <strong style={{ color: '#374151' }}>Progreso:</strong>
                        <div style={{ 
                          background: '#e5e7eb', 
                          borderRadius: '10px', 
                          height: '8px',
                          marginTop: '5px'
                        }}>
                          <div style={{
                            background: '#3b82f6',
                            height: '100%',
                            borderRadius: '10px',
                            width: `${tarea.progreso}%`,
                            transition: 'width 0.3s ease'
                          }}></div>
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem', marginTop: '2px' }}>
                          {tarea.progreso}%
                        </div>
                      </div>
                      
                      <div>
                        <strong style={{ color: '#374151' }}>Fecha Límite:</strong>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          {new Date(tarea.fechaLimite).toLocaleDateString('es-CO')}
                        </div>
                      </div>
                      
                      <div>
                        <strong style={{ color: '#374151' }}>Costo:</strong>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          ${tarea.costoReal.toLocaleString()} / ${tarea.costoEstimado.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    {tarea.observaciones && (
                      <div style={{ 
                        background: '#f9fafb', 
                        padding: '10px', 
                        borderRadius: '8px',
                        marginTop: '10px'
                      }}>
                        <strong style={{ color: '#374151' }}>Observaciones:</strong>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          {tarea.observaciones}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Panel Lateral */}
          {tareaSeleccionada && (
            <div style={{
              background: 'white',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              height: 'fit-content'
            }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: 'bold', 
                color: '#1e40af',
                marginBottom: '20px'
              }}>
                {tareaSeleccionada.nombre}
              </h3>
              
              {/* Controles de Progreso */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Progreso: {tareaSeleccionada.progreso}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={tareaSeleccionada.progreso}
                  onChange={(e) => actualizarProgreso(tareaSeleccionada.id, parseInt(e.target.value))}
                  style={{
                    width: '100%',
                    height: '8px',
                    borderRadius: '5px',
                    background: '#e5e7eb',
                    outline: 'none'
                  }}
                />
              </div>
              
              {/* Observaciones */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Observaciones
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Agregar observaciones..."
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                />
                <button
                  onClick={actualizarObservaciones}
                  style={{
                    marginTop: '10px',
                    padding: '8px 16px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                  }}
                >
                  Actualizar
                </button>
              </div>
              
              {/* Chat */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: '10px'
                }}>
                  <h4 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: 'bold', 
                    color: '#374151',
                    margin: 0
                  }}>
                    Chat con Cliente
                  </h4>
                  <button
                    onClick={() => setMostrarChat(!mostrarChat)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: mostrarChat ? '#ef4444' : '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    {mostrarChat ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                
                {mostrarChat && (
                  <div>
                    <div style={{
                      height: '200px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      padding: '10px',
                      overflowY: 'auto',
                      marginBottom: '10px',
                      backgroundColor: '#f9fafb'
                    }}>
                      {tareaSeleccionada.mensajes.map(mensaje => (
                        <div key={mensaje.id} style={{
                          marginBottom: '10px',
                          padding: '8px',
                          borderRadius: '8px',
                          backgroundColor: mensaje.tipo === 'operador' ? '#dbeafe' : '#f3f4f6',
                          marginLeft: mensaje.tipo === 'operador' ? '20px' : '0',
                          marginRight: mensaje.tipo === 'cliente' ? '20px' : '0'
                        }}>
                          <div style={{ 
                            fontWeight: 'bold', 
                            fontSize: '0.8rem',
                            color: mensaje.tipo === 'operador' ? '#1e40af' : '#374151'
                          }}>
                            {mensaje.remitente}
                          </div>
                          <div style={{ fontSize: '0.9rem', marginTop: '2px' }}>
                            {mensaje.mensaje}
                          </div>
                          <div style={{ 
                            fontSize: '0.7rem', 
                            color: '#6b7280',
                            marginTop: '5px'
                          }}>
                            {new Date(mensaje.fecha).toLocaleString('es-CO')}
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
                          padding: '8px',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.9rem'
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                      />
                      <button
                        onClick={enviarMensaje}
                        style={{
                          padding: '8px 12px',
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
                )}
              </div>
              
              {/* Información del Cliente */}
              <div style={{ 
                background: '#f9fafb', 
                padding: '15px', 
                borderRadius: '8px' 
              }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  margin: '0 0 10px 0'
                }}>
                  Información del Cliente
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  <div><strong>Nombre:</strong> {tareaSeleccionada.cliente.nombre}</div>
                  <div><strong>Email:</strong> {tareaSeleccionada.cliente.email}</div>
                  <div><strong>Teléfono:</strong> {tareaSeleccionada.cliente.telefono}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PanelTareas;
