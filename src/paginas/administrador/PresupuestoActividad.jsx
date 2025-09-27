import React, { useState, useEffect } from 'react';

const PresupuestoActividad = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [presupuestoEditando, setPresupuestoEditando] = useState(null);
  const [nuevoPresupuesto, setNuevoPresupuesto] = useState({
    cod: '',
    nom: '',
    des: '',
    tip: 'juridica',
    pri: 'med',
    fec_ini: '',
    fec_fin: '',
    dur: 0,
    est: 'planificacion',
    resp: '',
    apu_sel: '',
    dep_id: '',
    rec: [],
    cos: {
      mat: 0,
      man_obr: 0,
      equ: 0,
      sub: 0,
      ind: 0,
      uti: 0,
      tot: 0
    },
    pro: 0,
    obs: ''
  });

  // Estados para APUs, dependencias y tareas
  const [apus, setApus] = useState([]);
  const [dependencias, setDependencias] = useState([]);
  const [tareas, setTareas] = useState([]);

  // Cargar APUs, dependencias y tareas
  useEffect(() => {
    const apusGuardados = JSON.parse(localStorage.getItem('apus') || '[]');
    const dependenciasGuardadas = JSON.parse(localStorage.getItem('dependencias') || '[]');
    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas') || '[]');
    setApus(apusGuardados);
    setDependencias(dependenciasGuardadas);
    setTareas(tareasGuardadas);
  }, []);

  // Cargar presupuestos desde localStorage
  useEffect(() => {
    const presupuestosGuardados = JSON.parse(localStorage.getItem('presupuestosActividad') || '[]');
    if (presupuestosGuardados.length === 0) {
      // Datos iniciales de ejemplo
      const presupuestosIniciales = [
        {
          id: 1,
          codigo: 'ACT001',
          nombre: 'Análisis Jurídico de Contrato Público',
          descripcion: 'Revisión y análisis completo de contrato de obra pública para identificar irregularidades',
          tipo: 'juridica',
          prioridad: 'alta',
          fechaInicio: '2025-02-01',
          fechaFin: '2025-02-15',
          duracion: 15,
          estado: 'planificacion',
          responsable: 'Abogado Senior',
          recursos: [
            { tipo: 'personal', cantidad: 2, costo: 30000 },
            { tipo: 'equipos', cantidad: 1, costo: 5000 },
            { tipo: 'materiales', cantidad: 1, costo: 2000 }
          ],
          costos: {
            materiales: 2000,
            manoObra: 30000,
            equipos: 5000,
            subcontratos: 10000,
            indirectos: 5000,
            utilidad: 5250,
            total: 57250
          },
          progreso: 0,
          observaciones: 'Actividad crítica para el caso de veeduría',
          fechaCreacion: new Date().toISOString()
        },
        {
          id: 2,
          codigo: 'ACT002',
          nombre: 'Investigación de Campo - Obra Vial',
          descripcion: 'Inspección técnica y documentación fotográfica de obra vial en construcción',
          tipo: 'investigacion',
          prioridad: 'media',
          fechaInicio: '2025-02-10',
          fechaFin: '2025-02-20',
          duracion: 10,
          estado: 'planificacion',
          responsable: 'Investigador',
          recursos: [
            { tipo: 'personal', cantidad: 1, costo: 15000 },
            { tipo: 'equipos', cantidad: 3, costo: 8000 },
            { tipo: 'materiales', cantidad: 1, costo: 3000 }
          ],
          costos: {
            materiales: 3000,
            manoObra: 15000,
            equipos: 8000,
            subcontratos: 0,
            indirectos: 3000,
            utilidad: 2900,
            total: 31900
          },
          progreso: 0,
          observaciones: 'Requiere permisos especiales para acceso a obra',
          fechaCreacion: new Date().toISOString()
        }
      ];
      setPresupuestos(presupuestosIniciales);
      localStorage.setItem('presupuestosActividad', JSON.stringify(presupuestosIniciales));
    } else {
      setPresupuestos(presupuestosGuardados);
    }
  }, []);

  const calcularTotalPresupuesto = (presupuesto) => {
    const { materiales, manoObra, equipos, subcontratos, indirectos, utilidad } = presupuesto.costos;
    return materiales + manoObra + equipos + subcontratos + indirectos + utilidad;
  };

  const obtenerTareasRelacionadas = (presupuestoId) => {
    return tareas.filter(tarea => tarea.presupuestoId === presupuestoId);
  };

  const obtenerTareasParaConvocatoria = () => {
    return tareas.filter(tarea => !tarea.asignadoA && tarea.estado === 'pendiente');
  };

  const aplicarAPU = (apuId) => {
    const apuSeleccionado = apus.find(apu => apu.id === parseInt(apuId));
    if (apuSeleccionado) {
      const materiales = apuSeleccionado.materiales.reduce((total, item) => total + (item.cantidad * item.precio), 0);
      const manoObra = apuSeleccionado.manoObra.reduce((total, item) => total + (item.cantidad * item.precio), 0);
      const equipos = apuSeleccionado.equipos.reduce((total, item) => total + (item.cantidad * item.precio), 0);
      const subcontratos = apuSeleccionado.subcontratos.reduce((total, item) => total + (item.cantidad * item.precio), 0);
      const otros = apuSeleccionado.otros.reduce((total, item) => total + (item.cantidad * item.precio), 0);
      
      setNuevoPresupuesto({
        ...nuevoPresupuesto,
        apuSeleccionado: apuId,
        costos: {
          materiales: materiales,
          manoObra: manoObra,
          equipos: equipos,
          subcontratos: subcontratos,
          indirectos: otros * 0.1, // 10% de costos indirectos
          utilidad: (materiales + manoObra + equipos + subcontratos + otros) * 0.1, // 10% de utilidad
          total: 0
        }
      });
    }
  };

  const handleGuardarPresupuesto = (e) => {
    e.preventDefault();
    
    const totalCalculado = calcularTotalPresupuesto(nuevoPresupuesto);
    const presupuestoCompleto = {
      ...nuevoPresupuesto,
      costos: {
        ...nuevoPresupuesto.costos,
        total: totalCalculado
      },
      fechaCreacion: presupuestoEditando ? presupuestoEditando.fechaCreacion : new Date().toISOString()
    };
    
    if (presupuestoEditando) {
      // Editar presupuesto existente
      const presupuestosActualizados = presupuestos.map(presupuesto => 
        presupuesto.id === presupuestoEditando.id 
          ? { ...presupuesto, ...presupuestoCompleto }
          : presupuesto
      );
      setPresupuestos(presupuestosActualizados);
      localStorage.setItem('presupuestosActividad', JSON.stringify(presupuestosActualizados));
    } else {
      // Crear nuevo presupuesto
      const presupuesto = {
        id: Date.now(),
        ...presupuestoCompleto
      };
      const presupuestosActualizados = [...presupuestos, presupuesto];
      setPresupuestos(presupuestosActualizados);
      localStorage.setItem('presupuestosActividad', JSON.stringify(presupuestosActualizados));
    }
    
    setMostrarFormulario(false);
    setPresupuestoEditando(null);
    setNuevoPresupuesto({
      codigo: '',
      nombre: '',
      descripcion: '',
      tipo: 'juridica',
      prioridad: 'media',
      fechaInicio: '',
      fechaFin: '',
      duracion: 0,
      estado: 'planificacion',
      responsable: '',
      apuSeleccionado: '',
      dependenciaId: '',
      recursos: [],
      costos: {
        materiales: 0,
        manoObra: 0,
        equipos: 0,
        subcontratos: 0,
        indirectos: 0,
        utilidad: 0,
        total: 0
      },
      progreso: 0,
      observaciones: ''
    });
  };

  const handleEditarPresupuesto = (presupuesto) => {
    setPresupuestoEditando(presupuesto);
    setNuevoPresupuesto(presupuesto);
    setMostrarFormulario(true);
  };

  const handleEliminarPresupuesto = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este presupuesto de actividad?')) {
      const presupuestosActualizados = presupuestos.filter(presupuesto => presupuesto.id !== id);
      setPresupuestos(presupuestosActualizados);
      localStorage.setItem('presupuestosActividad', JSON.stringify(presupuestosActualizados));
    }
  };

  const agregarRecurso = () => {
    const nuevoRecurso = {
      id: Date.now(),
      tipo: 'personal',
      cantidad: 1,
      costo: 0
    };
    setNuevoPresupuesto({
      ...nuevoPresupuesto,
      recursos: [...nuevoPresupuesto.recursos, nuevoRecurso]
    });
  };

  const eliminarRecurso = (index) => {
    setNuevoPresupuesto({
      ...nuevoPresupuesto,
      recursos: nuevoPresupuesto.recursos.filter((_, i) => i !== index)
    });
  };

  const actualizarRecurso = (index, campo, valor) => {
    const recursosActualizados = [...nuevoPresupuesto.recursos];
    recursosActualizados[index] = {
      ...recursosActualizados[index],
      [campo]: valor
    };
    setNuevoPresupuesto({
      ...nuevoPresupuesto,
      recursos: recursosActualizados
    });
  };

  const calcularCostoTotal = () => {
    return presupuestos.reduce((total, presupuesto) => total + presupuesto.costos.total, 0);
  };

  const obtenerPresupuestosPorEstado = (estado) => {
    return presupuestos.filter(p => p.estado === estado);
  };

  const obtenerPresupuestosPorTipo = (tipo) => {
    return presupuestos.filter(p => p.tipo === tipo);
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
            📋 Presupuesto de Actividades - CSDT
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Gestión de presupuestos para actividades y tareas de veeduría
          </p>
          
          <div style={{ textAlign: 'center', display: 'flex', gap: '15px', justifyContent: 'center' }}>
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
              ➕ Crear Nuevo Presupuesto
            </button>
            
            {obtenerTareasParaConvocatoria().length > 0 && (
              <button
                onClick={() => {
                  // Crear convocatorias automáticamente para tareas no asignadas
                  const tareasParaConvocatoria = obtenerTareasParaConvocatoria();
                  const convocatoriasExistentes = JSON.parse(localStorage.getItem('convocatoriasTareas') || '[]');
                  
                  tareasParaConvocatoria.forEach(tarea => {
                    const convocatoriaExistente = convocatoriasExistentes.find(c => c.tareaId === tarea.id);
                    if (!convocatoriaExistente) {
                      const nuevaConvocatoria = {
                        id: Date.now() + Math.random(),
                        codigo: `CONV-${tarea.id}`,
                        titulo: `Convocatoria: ${tarea.nombre}`,
                        descripcion: tarea.descripcion,
                        tipoTarea: tarea.tipo,
                        requisitos: 'Experiencia en el área requerida',
                        beneficios: 'Remuneración según presupuesto',
                        fechaLimite: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                        fechaInicio: tarea.fechaInicio,
                        fechaFin: tarea.fechaFin,
                        presupuesto: tarea.costoEstimado,
                        estado: 'publicada',
                        tareaId: tarea.id,
                        prioridadOperadores: true,
                        postulaciones: []
                      };
                      convocatoriasExistentes.push(nuevaConvocatoria);
                    }
                  });
                  
                  localStorage.setItem('convocatoriasTareas', JSON.stringify(convocatoriasExistentes));
                  alert(`Se crearon ${tareasParaConvocatoria.length} convocatorias para tareas no asignadas`);
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#38a169',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(56, 161, 105, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              >
                📢 Crear Convocatorias ({obtenerTareasParaConvocatoria().length})
              </button>
            )}
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📋 Total Actividades/Tareas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {presupuestos.length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>💰 Valor Total</h3>
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⚖️ Jurídicas</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d69e2e' }}>
              {obtenerPresupuestosPorTipo('juridica').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>🔍 Investigación</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#805ad5' }}>
              {obtenerPresupuestosPorTipo('investigacion').length}
            </p>
          </div>
        </div>

        {/* Formulario de Presupuesto */}
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
              {presupuestoEditando ? '✏️ Editar Presupuesto de Actividad' : '➕ Crear Nuevo Presupuesto de Actividad'}
            </h2>
            
            <form onSubmit={handleGuardarPresupuesto}>
              {/* Información Básica */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Código de Actividad *
                  </label>
                  <input
                    type="text"
                    value={nuevoPresupuesto.codigo}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, codigo: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Nombre de la Actividad *
                  </label>
                  <input
                    type="text"
                    value={nuevoPresupuesto.nombre}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, nombre: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tipo de Actividad *
                  </label>
                  <select
                    value={nuevoPresupuesto.tipo}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, tipo: e.target.value})}
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
                    value={nuevoPresupuesto.prioridad}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, prioridad: e.target.value})}
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
                    Responsable *
                  </label>
                  <input
                    type="text"
                    value={nuevoPresupuesto.responsable}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, responsable: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    APU Relacionado
                  </label>
                  <select
                    value={nuevoPresupuesto.apuSeleccionado}
                    onChange={(e) => {
                      setNuevoPresupuesto({...nuevoPresupuesto, apuSeleccionado: e.target.value});
                      if (e.target.value) {
                        aplicarAPU(e.target.value);
                      }
                    }}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="">Seleccionar APU</option>
                    {apus.map(apu => (
                      <option key={apu.id} value={apu.id}>
                        {apu.codigo} - {apu.descripcion}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Dependencia Relacionada
                  </label>
                  <select
                    value={nuevoPresupuesto.dependenciaId}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, dependenciaId: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="">Seleccionar Dependencia</option>
                    {dependencias.map(dep => (
                      <option key={dep.id} value={dep.id}>
                        {dep.tipo} - {dep.solicitante}
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
                    value={nuevoPresupuesto.fechaInicio}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, fechaInicio: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Fecha de Fin *
                  </label>
                  <input
                    type="date"
                    value={nuevoPresupuesto.fechaFin}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, fechaFin: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Duración (días)
                  </label>
                  <input
                    type="number"
                    value={nuevoPresupuesto.duracion}
                    onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, duracion: parseInt(e.target.value) || 0})}
                    min="0"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                  Descripción de la Actividad *
                </label>
                <textarea
                  value={nuevoPresupuesto.descripcion}
                  onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, descripcion: e.target.value})}
                  required
                  rows="4"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              {/* Recursos de la Actividad */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  👥 Recursos de la Actividad
                </h3>
                
                <div style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '8px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  {nuevoPresupuesto.recursos.map((recurso, index) => (
                    <div key={recurso.id} style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1fr 1fr 1fr auto', 
                      gap: '10px', 
                      alignItems: 'center',
                      marginBottom: '10px',
                      padding: '10px',
                      backgroundColor: 'white',
                      borderRadius: '6px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <select
                        value={recurso.tipo}
                        onChange={(e) => actualizarRecurso(index, 'tipo', e.target.value)}
                        style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                      >
                        <option value="personal">Personal</option>
                        <option value="equipos">Equipos</option>
                        <option value="materiales">Materiales</option>
                        <option value="subcontratos">Subcontratos</option>
                      </select>
                      <input
                        type="number"
                        value={recurso.cantidad}
                        onChange={(e) => actualizarRecurso(index, 'cantidad', parseInt(e.target.value) || 0)}
                        placeholder="Cantidad"
                        min="0"
                        style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                      />
                      <input
                        type="number"
                        value={recurso.costo}
                        onChange={(e) => actualizarRecurso(index, 'costo', parseFloat(e.target.value) || 0)}
                        placeholder="Costo (USD)"
                        min="0"
                        step="0.01"
                        style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                      />
                      <button
                        type="button"
                        onClick={() => eliminarRecurso(index)}
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
                    onClick={agregarRecurso}
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
                    ➕ Agregar Recurso
                  </button>
                </div>
              </div>

              {/* Costos del Presupuesto */}
              <div style={{ marginBottom: '30px' }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#2d3748',
                  marginBottom: '15px'
                }}>
                  💰 Costos del Presupuesto
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Materiales (USD)
                    </label>
                    <input
                      type="number"
                      value={nuevoPresupuesto.costos.materiales}
                      onChange={(e) => setNuevoPresupuesto({
                        ...nuevoPresupuesto,
                        costos: {...nuevoPresupuesto.costos, materiales: parseFloat(e.target.value) || 0}
                      })}
                      min="0"
                      step="0.01"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Mano de Obra (USD)
                    </label>
                    <input
                      type="number"
                      value={nuevoPresupuesto.costos.manoObra}
                      onChange={(e) => setNuevoPresupuesto({
                        ...nuevoPresupuesto,
                        costos: {...nuevoPresupuesto.costos, manoObra: parseFloat(e.target.value) || 0}
                      })}
                      min="0"
                      step="0.01"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Equipos (USD)
                    </label>
                    <input
                      type="number"
                      value={nuevoPresupuesto.costos.equipos}
                      onChange={(e) => setNuevoPresupuesto({
                        ...nuevoPresupuesto,
                        costos: {...nuevoPresupuesto.costos, equipos: parseFloat(e.target.value) || 0}
                      })}
                      min="0"
                      step="0.01"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Subcontratos (USD)
                    </label>
                    <input
                      type="number"
                      value={nuevoPresupuesto.costos.subcontratos}
                      onChange={(e) => setNuevoPresupuesto({
                        ...nuevoPresupuesto,
                        costos: {...nuevoPresupuesto.costos, subcontratos: parseFloat(e.target.value) || 0}
                      })}
                      min="0"
                      step="0.01"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Costos Indirectos (USD)
                    </label>
                    <input
                      type="number"
                      value={nuevoPresupuesto.costos.indirectos}
                      onChange={(e) => setNuevoPresupuesto({
                        ...nuevoPresupuesto,
                        costos: {...nuevoPresupuesto.costos, indirectos: parseFloat(e.target.value) || 0}
                      })}
                      min="0"
                      step="0.01"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Utilidad (USD)
                    </label>
                    <input
                      type="number"
                      value={nuevoPresupuesto.costos.utilidad}
                      onChange={(e) => setNuevoPresupuesto({
                        ...nuevoPresupuesto,
                        costos: {...nuevoPresupuesto.costos, utilidad: parseFloat(e.target.value) || 0}
                      })}
                      min="0"
                      step="0.01"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                  Observaciones
                </label>
                <textarea
                  value={nuevoPresupuesto.observaciones}
                  onChange={(e) => setNuevoPresupuesto({...nuevoPresupuesto, observaciones: e.target.value})}
                  rows="3"
                  style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              {/* Resumen del Presupuesto */}
              <div style={{ 
                background: '#f0f9ff', 
                border: '2px solid #bfdbfe', 
                borderRadius: '8px', 
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '15px'
                }}>
                  📊 Resumen del Presupuesto
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <strong>Materiales:</strong> ${nuevoPresupuesto.costos.materiales.toFixed(2)}
                  </div>
                  <div>
                    <strong>Mano de Obra:</strong> ${nuevoPresupuesto.costos.manoObra.toFixed(2)}
                  </div>
                  <div>
                    <strong>Equipos:</strong> ${nuevoPresupuesto.costos.equipos.toFixed(2)}
                  </div>
                  <div>
                    <strong>Subcontratos:</strong> ${nuevoPresupuesto.costos.subcontratos.toFixed(2)}
                  </div>
                  <div>
                    <strong>Costos Indirectos:</strong> ${nuevoPresupuesto.costos.indirectos.toFixed(2)}
                  </div>
                  <div>
                    <strong>Utilidad:</strong> ${nuevoPresupuesto.costos.utilidad.toFixed(2)}
                  </div>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    color: '#1e40af',
                    borderTop: '2px solid #bfdbfe',
                    paddingTop: '10px',
                    gridColumn: '1 / -1'
                  }}>
                    <strong>TOTAL PRESUPUESTO:</strong> ${calcularTotalPresupuesto(nuevoPresupuesto).toFixed(2)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setPresupuestoEditando(null);
                    setNuevoPresupuesto({
                      codigo: '',
                      nombre: '',
                      descripcion: '',
                      tipo: 'juridica',
                      prioridad: 'media',
                      fechaInicio: '',
                      fechaFin: '',
                      duracion: 0,
                      estado: 'planificacion',
                      responsable: '',
                      apuSeleccionado: '',
                      dependenciaId: '',
                      recursos: [],
                      costos: {
                        materiales: 0,
                        manoObra: 0,
                        equipos: 0,
                        subcontratos: 0,
                        indirectos: 0,
                        utilidad: 0,
                        total: 0
                      },
                      progreso: 0,
                      observaciones: ''
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
                  {presupuestoEditando ? 'Actualizar' : 'Crear'} Presupuesto
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Presupuestos */}
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
            📋 Presupuestos de Actividades ({presupuestos.length})
          </h2>
          
          {presupuestos.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay presupuestos de actividad registrados. Cree el primer presupuesto para comenzar.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {presupuestos.map(presupuesto => (
                <div key={presupuesto.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {presupuesto.codigo} - {presupuesto.nombre}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Tipo:</strong> {presupuesto.tipo} | 
                        <strong> Prioridad:</strong> {presupuesto.prioridad} | 
                        <strong> Responsable:</strong> {presupuesto.responsable}
                      </p>
                      {presupuesto.apuSeleccionado && (
                        <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                          <strong>APU:</strong> {apus.find(apu => apu.id === parseInt(presupuesto.apuSeleccionado))?.codigo || 'N/A'} | 
                          <strong> Dependencia:</strong> {dependencias.find(dep => dep.id === parseInt(presupuesto.dependenciaId))?.tipo || 'N/A'}
                        </p>
                      )}
                      <p style={{ color: '#4a5568' }}>{presupuesto.descripcion}</p>
                      
                      {/* Tareas relacionadas */}
                      {obtenerTareasRelacionadas(presupuesto.id).length > 0 && (
                        <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f7fafc', borderRadius: '8px' }}>
                          <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                            📋 Tareas Generadas ({obtenerTareasRelacionadas(presupuesto.id).length})
                          </h4>
                          {obtenerTareasRelacionadas(presupuesto.id).map(tarea => (
                            <div key={tarea.id} style={{ 
                              padding: '8px', 
                              backgroundColor: 'white', 
                              borderRadius: '6px', 
                              marginBottom: '5px',
                              border: '1px solid #e2e8f0'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold', color: '#2d3748' }}>
                                  {tarea.nombre}
                                </span>
                                <span style={{ 
                                  fontSize: '0.8rem',
                                  background: tarea.estado === 'completada' ? '#38a169' : 
                                            tarea.estado === 'en_progreso' ? '#3182ce' : '#ed8936',
                                  color: 'white',
                                  padding: '2px 8px',
                                  borderRadius: '12px'
                                }}>
                                  {tarea.estado}
                                </span>
                              </div>
                              <p style={{ fontSize: '0.9rem', color: '#4a5568', margin: '5px 0' }}>
                                {tarea.descripcion}
                              </p>
                              <div style={{ fontSize: '0.8rem', color: '#718096' }}>
                                <strong>Asignado a:</strong> {tarea.asignadoA || 'Sin asignar'} | 
                                <strong> Progreso:</strong> {tarea.progreso}%
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        background: presupuesto.estado === 'completado' ? '#38a169' : 
                                   presupuesto.estado === 'ejecucion' ? '#3182ce' : '#d69e2e',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {presupuesto.estado}
                      </span>
                      <span style={{ 
                        background: '#805ad5',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        ${presupuesto.costos.total.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleEditarPresupuesto(presupuesto)}
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
                      <button
                        onClick={() => handleEliminarPresupuesto(presupuesto.id)}
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
                  
                  {/* Recursos de la Actividad */}
                  {presupuesto.recursos.length > 0 && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        👥 Recursos de la Actividad:
                      </h4>
                      <div style={{ display: 'grid', gap: '10px' }}>
                        {presupuesto.recursos.map(recurso => (
                          <div key={recurso.id} style={{
                            padding: '10px',
                            background: 'white',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <div>
                              <strong>{recurso.tipo}</strong> - Cantidad: {recurso.cantidad}
                            </div>
                            <span style={{ 
                              background: '#805ad5',
                              color: 'white',
                              padding: '4px 8px',
                              borderRadius: '4px',
                              fontSize: '0.8rem'
                            }}>
                              ${recurso.costo.toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Desglose de Costos */}
                  <div style={{ 
                    borderTop: '2px solid #e2e8f0', 
                    paddingTop: '15px',
                    marginTop: '15px'
                  }}>
                    <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                      💰 Desglose de Costos:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Materiales:</strong> ${presupuesto.costos.materiales.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Mano de Obra:</strong> ${presupuesto.costos.manoObra.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Equipos:</strong> ${presupuesto.costos.equipos.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Subcontratos:</strong> ${presupuesto.costos.subcontratos.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Indirectos:</strong> ${presupuesto.costos.indirectos.toFixed(2)}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Utilidad:</strong> ${presupuesto.costos.utilidad.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Observaciones */}
                  {presupuesto.observaciones && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        📝 Observaciones:
                      </h4>
                      <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                        {presupuesto.observaciones}
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

export default PresupuestoActividad;
