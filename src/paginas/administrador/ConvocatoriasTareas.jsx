import React, { useState, useEffect } from 'react';

const ConvocatoriasTareas = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [convocatoriaEditando, setConvocatoriaEditando] = useState(null);
  const [nuevaConvocatoria, setNuevaConvocatoria] = useState({
    cod: '',
    tit: '',
    des: '',
    tip: 'juridica',
    pri: 'med',
    fec_pub: '',
    fec_cierre: '',
    pre: 0,
    req: [],
    ben: [],
    est: 'borrador',
    post: [],
    obs: '',
    pri_ope: true,
    tar_id: '',
    tip_asig: 'voluntaria' // 'asignada' o 'voluntaria'
  });

  // Estados para tareas
  const [tareas, setTareas] = useState([]);

  // Cargar tareas y convocatorias desde localStorage
  useEffect(() => {
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');
    setTareas(tareasGuardadas);
    
    const convocatoriasGuardadas = JSON.parse(localStorage.getItem('convocatoriasTareas') || '[]');
    if (convocatoriasGuardadas.length === 0) {
      // Datos iniciales de ejemplo
      const convocatoriasIniciales = [
        {
          id: 1,
          codigo: 'CONV001',
          titulo: 'Análisis de Contratos Públicos - Zona Norte',
          descripcion: 'Se requiere profesional en derecho para análisis de contratos de obra pública en la zona norte del municipio',
          tipo: 'juridica',
          prioridad: 'alta',
          fechaPublicacion: '2025-02-01',
          fechaCierre: '2025-02-15',
          presupuesto: 50000,
          requisitos: [
            'Profesional en Derecho',
            'Experiencia mínima 2 años',
            'Conocimiento en contratación pública',
            'Disponibilidad para trabajo de campo'
          ],
          beneficios: [
            'Pago competitivo',
            'Experiencia en veeduría ciudadana',
            'Certificación de participación',
            'Networking con organizaciones sociales'
          ],
          estado: 'publicada',
          postulaciones: [],
          observaciones: 'Convocatoria prioritaria para caso de veeduría',
          fechaCreacion: new Date().toISOString()
        }
      ];
      setConvocatorias(convocatoriasIniciales);
      localStorage.setItem('convocatoriasTareas', JSON.stringify(convocatoriasIniciales));
    } else {
      setConvocatorias(convocatoriasGuardadas);
    }
  }, []);

  const handleGuardarConvocatoria = (e) => {
    e.preventDefault();
    
    const convocatoriaCompleta = {
      ...nuevaConvocatoria,
      fechaCreacion: convocatoriaEditando ? convocatoriaEditando.fechaCreacion : new Date().toISOString()
    };
    
    if (convocatoriaEditando) {
      // Editar convocatoria existente
      const convocatoriasActualizadas = convocatorias.map(convocatoria => 
        convocatoria.id === convocatoriaEditando.id 
          ? { ...convocatoria, ...convocatoriaCompleta }
          : convocatoria
      );
      setConvocatorias(convocatoriasActualizadas);
      localStorage.setItem('convocatoriasTareas', JSON.stringify(convocatoriasActualizadas));
    } else {
      // Crear nueva convocatoria
      const convocatoria = {
        id: Date.now(),
        ...convocatoriaCompleta
      };
      const convocatoriasActualizadas = [...convocatorias, convocatoria];
      setConvocatorias(convocatoriasActualizadas);
      localStorage.setItem('convocatoriasTareas', JSON.stringify(convocatoriasActualizadas));
    }
    
    setMostrarFormulario(false);
    setConvocatoriaEditando(null);
    setNuevaConvocatoria({
      codigo: '',
      titulo: '',
      descripcion: '',
      tipo: 'juridica',
      prioridad: 'media',
      fechaPublicacion: '',
      fechaCierre: '',
      presupuesto: 0,
      requisitos: [],
      beneficios: [],
      estado: 'borrador',
      postulaciones: [],
      observaciones: '',
      prioridadOperadores: true,
      tareaId: '',
      tipoAsignacion: 'voluntaria'
    });
  };

  const handleEditarConvocatoria = (convocatoria) => {
    setConvocatoriaEditando(convocatoria);
    setNuevaConvocatoria(convocatoria);
    setMostrarFormulario(true);
  };

  const handleEliminarConvocatoria = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar esta convocatoria?')) {
      const convocatoriasActualizadas = convocatorias.filter(convocatoria => convocatoria.id !== id);
      setConvocatorias(convocatoriasActualizadas);
      localStorage.setItem('convocatoriasTareas', JSON.stringify(convocatoriasActualizadas));
    }
  };

  const handlePublicarConvocatoria = (id) => {
    const convocatoriasActualizadas = convocatorias.map(convocatoria => 
      convocatoria.id === id 
        ? { ...convocatoria, estado: 'publicada' }
        : convocatoria
    );
    setConvocatorias(convocatoriasActualizadas);
    localStorage.setItem('convocatoriasTareas', JSON.stringify(convocatoriasActualizadas));
  };

  const agregarRequisito = () => {
    setNuevaConvocatoria({
      ...nuevaConvocatoria,
      requisitos: [...nuevaConvocatoria.requisitos, '']
    });
  };

  const eliminarRequisito = (index) => {
    setNuevaConvocatoria({
      ...nuevaConvocatoria,
      requisitos: nuevaConvocatoria.requisitos.filter((_, i) => i !== index)
    });
  };

  const actualizarRequisito = (index, valor) => {
    const requisitosActualizados = [...nuevaConvocatoria.requisitos];
    requisitosActualizados[index] = valor;
    setNuevaConvocatoria({
      ...nuevaConvocatoria,
      requisitos: requisitosActualizados
    });
  };

  const agregarBeneficio = () => {
    setNuevaConvocatoria({
      ...nuevaConvocatoria,
      beneficios: [...nuevaConvocatoria.beneficios, '']
    });
  };

  const obtenerTareasNoAsignadas = () => {
    return tareas.filter(tarea => !tarea.asignadoA && tarea.estado === 'pendiente');
  };

  const eliminarBeneficio = (index) => {
    setNuevaConvocatoria({
      ...nuevaConvocatoria,
      beneficios: nuevaConvocatoria.beneficios.filter((_, i) => i !== index)
    });
  };

  const actualizarBeneficio = (index, valor) => {
    const beneficiosActualizados = [...nuevaConvocatoria.beneficios];
    beneficiosActualizados[index] = valor;
    setNuevaConvocatoria({
      ...nuevaConvocatoria,
      beneficios: beneficiosActualizados
    });
  };

  const calcularCostoTotal = () => {
    return convocatorias.reduce((total, convocatoria) => total + convocatoria.presupuesto, 0);
  };

  const obtenerConvocatoriasPorEstado = (estado) => {
    return convocatorias.filter(c => c.estado === estado);
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
            📢 Convocatorias de Tareas - CSDT
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Sistema de convocatorias para tareas independientes de veeduría
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
              ➕ Crear Nueva Convocatoria
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📢 Total Convocatorias</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {convocatorias.length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>💰 Presupuesto Total</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📝 Borradores</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d69e2e' }}>
              {obtenerConvocatoriasPorEstado('borrador').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>🌐 Publicadas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#805ad5' }}>
              {obtenerConvocatoriasPorEstado('publicada').length}
            </p>
          </div>
        </div>

        {/* Formulario de Convocatoria */}
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
              {convocatoriaEditando ? '✏️ Editar Convocatoria' : '➕ Crear Nueva Convocatoria'}
            </h2>
            
            <form onSubmit={handleGuardarConvocatoria}>
              {/* Información Básica */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Código de Convocatoria *
                  </label>
                  <input
                    type="text"
                    value={nuevaConvocatoria.codigo}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, codigo: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Título de la Convocatoria *
                  </label>
                  <input
                    type="text"
                    value={nuevaConvocatoria.titulo}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, titulo: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tipo de Tarea *
                  </label>
                  <select
                    value={nuevaConvocatoria.tipo}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, tipo: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="juridica">Jurídica</option>
                    <option value="investigacion">Investigación</option>
                    <option value="administrativa">Administrativa</option>
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
                    value={nuevaConvocatoria.prioridad}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, prioridad: e.target.value})}
                    required
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
                    Fecha de Publicación *
                  </label>
                  <input
                    type="date"
                    value={nuevaConvocatoria.fechaPublicacion}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, fechaPublicacion: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Fecha de Cierre *
                  </label>
                  <input
                    type="date"
                    value={nuevaConvocatoria.fechaCierre}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, fechaCierre: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tarea Relacionada
                  </label>
                  <select
                    value={nuevaConvocatoria.tareaId}
                    onChange={(e) => {
                      const tareaSeleccionada = tareas.find(t => t.id === parseInt(e.target.value));
                      setNuevaConvocatoria({
                        ...nuevaConvocatoria, 
                        tareaId: e.target.value,
                        presupuesto: tareaSeleccionada ? tareaSeleccionada.costoEstimado : nuevaConvocatoria.presupuesto,
                        titulo: tareaSeleccionada ? `Convocatoria: ${tareaSeleccionada.nombre}` : nuevaConvocatoria.titulo,
                        descripcion: tareaSeleccionada ? tareaSeleccionada.descripcion : nuevaConvocatoria.descripcion
                      });
                    }}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="">Seleccionar tarea (opcional)</option>
                    {obtenerTareasNoAsignadas().map(tarea => (
                      <option key={tarea.id} value={tarea.id}>
                        {tarea.nombre} - ${tarea.costoEstimado.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Presupuesto (USD) *
                  </label>
                  <input
                    type="number"
                    value={nuevaConvocatoria.presupuesto}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, presupuesto: parseFloat(e.target.value) || 0})}
                    required
                    min="0"
                    step="0.01"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tipo de Asignación *
                  </label>
                  <select
                    value={nuevaConvocatoria.tipoAsignacion}
                    onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, tipoAsignacion: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="asignada">Tarea Asignada</option>
                    <option value="voluntaria">Tarea Voluntaria</option>
                  </select>
                  <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '5px' }}>
                    {nuevaConvocatoria.tipoAsignacion === 'asignada' 
                      ? 'La tarea será asignada directamente a un operador específico'
                      : 'La tarea estará disponible para postulación voluntaria'
                    }
                  </p>
                </div>

                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    <input
                      type="checkbox"
                      checked={nuevaConvocatoria.prioridadOperadores}
                      onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, prioridadOperadores: e.target.checked})}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    Priorizar Operadores
                  </label>
                  <p style={{ fontSize: '0.9rem', color: '#718096', marginTop: '5px' }}>
                    Los operadores tendrán prioridad sobre los clientes en esta convocatoria
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                  Descripción de la Tarea *
                </label>
                <textarea
                  value={nuevaConvocatoria.descripcion}
                  onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, descripcion: e.target.value})}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              {/* Requisitos */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  📋 Requisitos
                </h3>
                
                <div style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  {nuevaConvocatoria.requisitos.map((requisito, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <input
                        type="text"
                        value={requisito}
                        onChange={(e) => actualizarRequisito(index, e.target.value)}
                        placeholder="Requisito"
                        style={{ 
                          flex: 1, 
                          padding: '8px', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '4px' 
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => eliminarRequisito(index)}
                        style={{
                          padding: '8px',
                          backgroundColor: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={agregarRequisito}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Agregar Requisito
                  </button>
                </div>
              </div>

              {/* Beneficios */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  🎁 Beneficios
                </h3>
                
                <div style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  {nuevaConvocatoria.beneficios.map((beneficio, index) => (
                    <div key={index} style={{ 
                      display: 'flex', 
                      gap: '10px', 
                      alignItems: 'center',
                      marginBottom: '10px'
                    }}>
                      <input
                        type="text"
                        value={beneficio}
                        onChange={(e) => actualizarBeneficio(index, e.target.value)}
                        placeholder="Beneficio"
                        style={{ 
                          flex: 1, 
                          padding: '8px', 
                          border: '1px solid #e2e8f0', 
                          borderRadius: '4px' 
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => eliminarBeneficio(index)}
                        style={{
                          padding: '8px',
                          backgroundColor: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                  
                  <button
                    type="button"
                    onClick={agregarBeneficio}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    ➕ Agregar Beneficio
                  </button>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                  Observaciones
                </label>
                <textarea
                  value={nuevaConvocatoria.observaciones}
                  onChange={(e) => setNuevaConvocatoria({...nuevaConvocatoria, observaciones: e.target.value})}
                  rows="3"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setConvocatoriaEditando(null);
                    setNuevaConvocatoria({
                      codigo: '',
                      titulo: '',
                      descripcion: '',
                      tipo: 'juridica',
                      prioridad: 'media',
                      fechaPublicacion: '',
                      fechaCierre: '',
                      presupuesto: 0,
                      requisitos: [],
                      beneficios: [],
                      estado: 'borrador',
                      postulaciones: [],
                      observaciones: '',
                      prioridadOperadores: true,
                      tareaId: '',
                      tipoAsignacion: 'voluntaria'
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
                  {convocatoriaEditando ? 'Actualizar' : 'Crear'} Convocatoria
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Convocatorias */}
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
            📢 Convocatorias ({convocatorias.length})
          </h2>
          
          {convocatorias.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay convocatorias registradas. Cree la primera convocatoria para comenzar.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {convocatorias.map(convocatoria => (
                <div key={convocatoria.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {convocatoria.codigo} - {convocatoria.titulo}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Tipo:</strong> {convocatoria.tipo} | 
                        <strong> Prioridad:</strong> {convocatoria.prioridad} | 
                        <strong> Asignación:</strong> {convocatoria.tipoAsignacion || 'voluntaria'} | 
                        <strong> Presupuesto:</strong> ${convocatoria.presupuesto.toLocaleString()}
                      </p>
                      <p style={{ color: '#4a5568' }}>{convocatoria.descripcion}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        background: convocatoria.estado === 'publicada' ? '#38a169' : 
                                   convocatoria.estado === 'cerrada' ? '#e53e3e' : '#d69e2e',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {convocatoria.estado}
                      </span>
                      <button
                        onClick={() => handleEditarConvocatoria(convocatoria)}
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
                        ✏️ Editar
                      </button>
                      {convocatoria.estado === 'borrador' && (
                        <button
                          onClick={() => handlePublicarConvocatoria(convocatoria.id)}
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
                          🌐 Publicar
                        </button>
                      )}
                      <button
                        onClick={() => handleEliminarConvocatoria(convocatoria.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                  
                  {/* Requisitos */}
                  {convocatoria.requisitos.length > 0 && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        📋 Requisitos:
                      </h4>
                      <ul style={{ marginLeft: '20px' }}>
                        {convocatoria.requisitos.map((requisito, index) => (
                          <li key={index} style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '5px' }}>
                            {requisito}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Beneficios */}
                  {convocatoria.beneficios.length > 0 && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        🎁 Beneficios:
                      </h4>
                      <ul style={{ marginLeft: '20px' }}>
                        {convocatoria.beneficios.map((beneficio, index) => (
                          <li key={index} style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '5px' }}>
                            {beneficio}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Fechas */}
                  <div style={{ 
                    borderTop: '2px solid #e2e8f0', 
                    paddingTop: '15px',
                    marginTop: '15px'
                  }}>
                    <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                      📅 Fechas:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Publicación:</strong> {convocatoria.fechaPublicacion}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Cierre:</strong> {convocatoria.fechaCierre}
                      </div>
                    </div>
                  </div>

                  {/* Observaciones */}
                  {convocatoria.observaciones && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        📝 Observaciones:
                      </h4>
                      <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                        {convocatoria.observaciones}
                      </p>
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

export default ConvocatoriasTareas;
