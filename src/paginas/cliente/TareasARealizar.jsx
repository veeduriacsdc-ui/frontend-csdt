import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const TareasARealizar = () => {
  const { user } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: 'todos',
    tipo: 'todos'
  });
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [mostrarChat, setMostrarChat] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: '',
    descripcion: '',
    tipo: 'general',
    prioridad: 'media',
    fechaLimite: ''
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Cargar tareas del cliente
  useEffect(() => {
    cargarTareas();
  }, []);

  const cargarTareas = () => {
    // Cargar desde localStorage o crear datos de prueba
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareasCliente') || '[]');
    
    if (tareasGuardadas.length === 0) {
      // Crear datos de prueba para el cliente
      const datosPrueba = [
        {
          id: 1,
          nombre: 'Solicitud de Acción de Tutela',
          descripcion: 'Presentar acción de tutela por violación del derecho a la salud',
          tipo: 'legal',
          prioridad: 'alta',
          estado: 'en_progreso',
          fechaCreacion: '2024-01-15T10:00:00Z',
          fechaLimite: '2024-01-25T17:00:00Z',
          operadorAsignado: 'Operador CSDT',
          progreso: 65,
          observaciones: 'Documentos enviados, esperando respuesta del operador',
          mensajes: [
            {
              id: 1,
              remitente: user?.nombre || 'Cliente CSDT',
              mensaje: 'Hola, he enviado los documentos solicitados',
              fecha: '2024-01-15T10:30:00Z',
              tipo: 'cliente'
            },
            {
              id: 2,
              remitente: 'Operador CSDT',
              mensaje: 'Perfecto, los estoy revisando. Te mantendré informada',
              fecha: '2024-01-15T11:00:00Z',
              tipo: 'operador'
            }
          ],
          costoEstimado: 500000,
          costoReal: 320000,
          documentos: ['Cédula', 'Historia clínica', 'Recetas médicas']
        },
        {
          id: 2,
          nombre: 'Consulta sobre Proceso de Licitación',
          descripcion: 'Investigar irregularidades en proceso de licitación municipal',
          tipo: 'investigacion',
          prioridad: 'media',
          estado: 'pendiente',
          fechaCreacion: '2024-01-16T14:00:00Z',
          fechaLimite: '2024-01-30T17:00:00Z',
          operadorAsignado: 'Pendiente asignación',
          progreso: 0,
          observaciones: 'Esperando asignación de operador',
          mensajes: [
            {
              id: 1,
              remitente: user?.nombre || 'Cliente CSDT',
              mensaje: 'Necesito ayuda con este caso de licitación',
              fecha: '2024-01-16T14:15:00Z',
              tipo: 'cliente'
            }
          ],
          costoEstimado: 750000,
          costoReal: 0,
          documentos: ['Documentos de licitación', 'Evidencias']
        },
        {
          id: 3,
          nombre: 'Solicitud de Informe Técnico',
          descripcion: 'Solicitar informe técnico sobre proyecto de infraestructura',
          tipo: 'tecnico',
          prioridad: 'baja',
          estado: 'completada',
          fechaCreacion: '2024-01-10T09:00:00Z',
          fechaLimite: '2024-01-20T17:00:00Z',
          operadorAsignado: 'Operador CSDT',
          progreso: 100,
          observaciones: 'Informe completado y entregado',
          mensajes: [
            {
              id: 1,
              remitente: 'Operador CSDT',
              mensaje: 'El informe está listo, puedes descargarlo',
              fecha: '2024-01-20T16:00:00Z',
              tipo: 'operador'
            },
            {
              id: 2,
              remitente: user?.nombre || 'Cliente CSDT',
              mensaje: 'El informe está excelente, muchas gracias',
              fecha: '2024-01-20T16:30:00Z',
              tipo: 'cliente'
            }
          ],
          costoEstimado: 300000,
          costoReal: 280000,
          documentos: ['Informe técnico final.pdf']
        }
      ];
      
      localStorage.setItem('tareasCliente', JSON.stringify(datosPrueba));
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
    
    return tareasFiltradas;
  };

  const crearNuevaTarea = () => {
    if (!nuevaTarea.nombre || !nuevaTarea.descripcion) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    const tarea = {
      id: Date.now(),
      nombre: nuevaTarea.nombre,
      descripcion: nuevaTarea.descripcion,
      tipo: nuevaTarea.tipo,
      prioridad: nuevaTarea.prioridad,
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString(),
      fechaLimite: nuevaTarea.fechaLimite || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      operadorAsignado: 'Pendiente asignación',
      progreso: 0,
      observaciones: 'Tarea creada, esperando asignación de operador',
      mensajes: [
        {
          id: 1,
          remitente: user?.nombre || 'Cliente CSDT',
          mensaje: `Nueva tarea creada: ${nuevaTarea.nombre}`,
          fecha: new Date().toISOString(),
          tipo: 'cliente'
        }
      ],
      costoEstimado: 0,
      costoReal: 0,
      documentos: []
    };

    const tareasActualizadas = [...tareas, tarea];
    setTareas(tareasActualizadas);
    localStorage.setItem('tareasCliente', JSON.stringify(tareasActualizadas));
    
    setNuevaTarea({
      nombre: '',
      descripcion: '',
      tipo: 'general',
      prioridad: 'media',
      fechaLimite: ''
    });
    setMostrarFormulario(false);
    alert('Tarea creada exitosamente');
  };

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !tareaSeleccionada) return;
    
    const mensaje = {
      id: Date.now(),
      remitente: user?.nombre || 'Cliente CSDT',
      mensaje: nuevoMensaje,
      fecha: new Date().toISOString(),
      tipo: 'cliente'
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
    localStorage.setItem('tareasCliente', JSON.stringify(tareasActualizadas));
    setNuevoMensaje('');
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
      case 'general': return '#6b7280';
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: 'bold', 
                color: '#059669',
                marginBottom: '10px'
              }}>
                Tareas a Realizar
              </h1>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#64748b',
                margin: 0
              }}>
                Gestiona tus solicitudes y comunícate con operadores
              </p>
            </div>
            
            <button
              onClick={() => setMostrarFormulario(!mostrarFormulario)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
              }}
            >
              + Nueva Tarea
            </button>
          </div>
        </div>

        {/* Formulario de Nueva Tarea */}
        {mostrarFormulario && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#059669',
              marginBottom: '20px'
            }}>
              Crear Nueva Tarea
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px',
              marginBottom: '20px'
            }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Nombre de la Tarea *
                </label>
                <input
                  type="text"
                  value={nuevaTarea.nombre}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, nombre: e.target.value})}
                  placeholder="Ej: Solicitud de acción de tutela"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
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
                  value={nuevaTarea.tipo}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, tipo: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="general">General</option>
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
                  value={nuevaTarea.prioridad}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, prioridad: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  fontWeight: 'bold', 
                  color: '#374151', 
                  marginBottom: '8px' 
                }}>
                  Fecha Límite
                </label>
                <input
                  type="date"
                  value={nuevaTarea.fechaLimite}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, fechaLimite: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontWeight: 'bold', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Descripción *
              </label>
              <textarea
                value={nuevaTarea.descripcion}
                onChange={(e) => setNuevaTarea({...nuevaTarea, descripcion: e.target.value})}
                placeholder="Describe detalladamente tu solicitud..."
                rows="4"
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
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={crearNuevaTarea}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#059669',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Crear Tarea
              </button>
              
              <button
                onClick={() => setMostrarFormulario(false)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
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
                <option value="general">General</option>
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
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#059669' }}>
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
              color: '#059669',
              marginBottom: '20px'
            }}>
              Mis Tareas ({filtrarTareas().length})
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
                      border: tareaSeleccionada?.id === tarea.id ? '3px solid #059669' : '2px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '20px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      backgroundColor: tareaSeleccionada?.id === tarea.id ? '#f0fdf4' : 'white'
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
                        <strong style={{ color: '#374151' }}>Operador:</strong>
                        <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                          {tarea.operadorAsignado}
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
                            background: '#059669',
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
                color: '#059669',
                marginBottom: '20px'
              }}>
                {tareaSeleccionada.nombre}
              </h3>
              
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
                    Chat con Operador
                  </h4>
                  <button
                    onClick={() => setMostrarChat(!mostrarChat)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: mostrarChat ? '#ef4444' : '#059669',
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
                          backgroundColor: mensaje.tipo === 'cliente' ? '#dcfce7' : '#f3f4f6',
                          marginLeft: mensaje.tipo === 'cliente' ? '20px' : '0',
                          marginRight: mensaje.tipo === 'operador' ? '20px' : '0'
                        }}>
                          <div style={{ 
                            fontWeight: 'bold', 
                            fontSize: '0.8rem',
                            color: mensaje.tipo === 'cliente' ? '#059669' : '#374151'
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
                          backgroundColor: '#059669',
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
              
              {/* Información del Operador */}
              <div style={{ 
                background: '#f9fafb', 
                padding: '15px', 
                borderRadius: '8px',
                marginBottom: '20px'
              }}>
                <h4 style={{ 
                  fontSize: '1rem', 
                  fontWeight: 'bold', 
                  color: '#374151',
                  margin: '0 0 10px 0'
                }}>
                  Operador Asignado
                </h4>
                <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                  <div><strong>Nombre:</strong> {tareaSeleccionada.operadorAsignado}</div>
                  <div><strong>Estado:</strong> {tareaSeleccionada.operadorAsignado === 'Pendiente asignación' ? 'Pendiente' : 'Activo'}</div>
                </div>
              </div>
              
              {/* Documentos */}
              {tareaSeleccionada.documentos && tareaSeleccionada.documentos.length > 0 && (
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
                    Documentos
                  </h4>
                  <div style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {tareaSeleccionada.documentos.map((doc, index) => (
                      <div key={index} style={{ marginBottom: '5px' }}>
                        📄 {doc}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TareasARealizar;
