import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const TareasARealizar = () => {
  const { user } = useAuth();
  const [tareas, setTareas] = useState([]);
  const [filtros, setFiltros] = useState({
    est: 'todos',
    tip: 'todos'
  });
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [mostrarChat, setMostrarChat] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [nuevaTarea, setNuevaTarea] = useState({
    nom: '',
    des: '',
    tip: 'general',
    pri: 'med',
    fec_lim: ''
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
          nom: 'Solicitud de Acción de Tutela',
          des: 'Presentar acción de tutela por violación del derecho a la salud',
          tip: 'legal',
          pri: 'alta',
          est: 'en_progreso',
          fec_cre: '2024-01-15T10:00:00Z',
          fec_lim: '2024-01-25T17:00:00Z',
          ope_asig: 'Operador CSDT',
          pro: 65,
          obs: 'Documentos enviados, esperando respuesta del operador',
          mensajes: [
            {
              id: 1,
              remitente: user?.nom || 'Cliente CSDT',
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
          cos_est: 500000,
          cos_real: 320000,
          doc: ['Cédula', 'Historia clínica', 'Recetas médicas']
        },
        {
          id: 2,
          nom: 'Consulta sobre Proceso de Licitación',
          des: 'Investigar irregularidades en proceso de licitación municipal',
          tip: 'investigacion',
          pri: 'media',
          est: 'pendiente',
          fec_cre: '2024-01-16T14:00:00Z',
          fec_lim: '2024-01-30T17:00:00Z',
          ope_asig: 'Pendiente asignación',
          pro: 0,
          obs: 'Esperando asignación de operador',
          mensajes: [
            {
              id: 1,
              remitente: user?.nom || 'Cliente CSDT',
              mensaje: 'Necesito ayuda con este caso de licitación',
              fecha: '2024-01-16T14:15:00Z',
              tipo: 'cliente'
            }
          ],
          cos_est: 750000,
          cos_real: 0,
          doc: ['Documentos de licitación', 'Evidencias']
        },
        {
          id: 3,
          nom: 'Solicitud de Informe Técnico',
          des: 'Solicitar informe técnico sobre proyecto de infraestructura',
          tip: 'tecnico',
          pri: 'baja',
          est: 'completada',
          fec_cre: '2024-01-10T09:00:00Z',
          fec_lim: '2024-01-20T17:00:00Z',
          ope_asig: 'Operador CSDT',
          pro: 100,
          obs: 'Informe completado y entregado',
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
              remitente: user?.nom || 'Cliente CSDT',
              mensaje: 'El informe está excelente, muchas gracias',
              fecha: '2024-01-20T16:30:00Z',
              tipo: 'cliente'
            }
          ],
          cos_est: 300000,
          cos_real: 280000,
          doc: ['Informe técnico final.pdf']
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
    
    if (filtros.est !== 'todos') {
      tareasFiltradas = tareasFiltradas.filter(tarea => tarea.est === filtros.est);
    }
    
    if (filtros.tip !== 'todos') {
      tareasFiltradas = tareasFiltradas.filter(tarea => tarea.tip === filtros.tip);
    }
    
    return tareasFiltradas;
  };

  const crearNuevaTarea = () => {
    if (!nuevaTarea.nom || !nuevaTarea.des) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    const tarea = {
      id: Date.now(),
      nom: nuevaTarea.nom,
      des: nuevaTarea.des,
      tip: nuevaTarea.tip,
      pri: nuevaTarea.pri,
      est: 'pendiente',
      fec_cre: new Date().toISOString(),
      fec_lim: nuevaTarea.fec_lim || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      ope_asig: 'Pendiente asignación',
      pro: 0,
      obs: 'Tarea creada, esperando asignación de operador',
      mensajes: [
        {
          id: 1,
          remitente: user?.nom || 'Cliente CSDT',
          mensaje: `Nueva tarea creada: ${nuevaTarea.nom}`,
          fecha: new Date().toISOString(),
          tipo: 'cliente'
        }
      ],
      cos_est: 0,
      cos_real: 0,
      doc: []
    };

    const tareasActualizadas = [...tareas, tarea];
    setTareas(tareasActualizadas);
    localStorage.setItem('tareasCliente', JSON.stringify(tareasActualizadas));
    
    setNuevaTarea({
      nom: '',
      des: '',
      tip: 'general',
      pri: 'med',
      fec_lim: ''
    });
    setMostrarFormulario(false);
    alert('Tarea creada exitosamente');
  };

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !tareaSeleccionada) return;
    
    const mensaje = {
      id: Date.now(),
      remitente: user?.nom || 'Cliente CSDT',
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
                  value={nuevaTarea.nom}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, nom: e.target.value})}
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
                  value={nuevaTarea.tip}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, tip: e.target.value})}
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
                  value={nuevaTarea.pri}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, pri: e.target.value})}
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
                  value={nuevaTarea.fec_lim}
                  onChange={(e) => setNuevaTarea({...nuevaTarea, fec_lim: e.target.value})}
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
                value={nuevaTarea.des}
                onChange={(e) => setNuevaTarea({...nuevaTarea, des: e.target.value})}
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
                value={filtros.est}
                onChange={(e) => setFiltros({...filtros, est: e.target.value})}
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
                value={filtros.tip}
                onChange={(e) => setFiltros({...filtros, tip: e.target.value})}
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
              {tareas.filter(t => t.est === 'pendiente').length}
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
              {tareas.filter(t => t.est === 'en_progreso').length}
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
              {tareas.filter(t => t.est === 'completada').length}
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
                          {tarea.nom}
                        </h3>
                        <p style={{ 
                          color: '#6b7280', 
                          fontSize: '0.9rem',
                          margin: '0 0 10px 0'
                        }}>
                          {tarea.des}
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                        <span style={{
                          backgroundColor: getEstadoColor(tarea.est),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {tarea.est.replace('_', ' ')}
                        </span>
                        
                        <span style={{
                          backgroundColor: getPrioridadColor(tarea.pri),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {tarea.pri}
                        </span>
                        
                        <span style={{
                          backgroundColor: getTipoColor(tarea.tip),
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '0.8rem',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {tarea.tip}
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
                          {new Date(tarea.fec_lim).toLocaleDateString('es-CO')}
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
                {tareaSeleccionada.nom}
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
