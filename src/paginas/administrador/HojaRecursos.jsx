import React, { useState, useEffect } from 'react';

const HojaRecursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recursoEditando, setRecursoEditando] = useState(null);
  const [nuevoRecurso, setNuevoRecurso] = useState({
    nombre: '',
    tipo: 'trabajo',
    etiqueta: '',
    iniciales: '',
    grupo: '',
    capacidad: 100,
    tasa: 0,
    tasaHoras: 0,
    costoUso: 0,
    acumulacion: 'inicio',
    calendario: 'estandar',
    codigo: ''
  });

  // Cargar recursos desde localStorage
  useEffect(() => {
    const recursosGuardados = JSON.parse(localStorage.getItem('recursos') || '[]');
    if (recursosGuardados.length === 0) {
      // Datos iniciales de ejemplo
      const recursosIniciales = [
        {
          id: 1,
          nombre: 'Abogado Senior',
          tipo: 'trabajo',
          etiqueta: 'Legal Senior',
          iniciales: 'AS',
          grupo: 'Legal',
          capacidad: 100,
          tasa: 150,
          tasaHoras: 150,
          costoUso: 0,
          acumulacion: 'inicio',
          calendario: 'estandar',
          codigo: 'LEG001',
          estado: 'activo'
        },
        {
          id: 2,
          nombre: 'Abogado Junior',
          tipo: 'trabajo',
          etiqueta: 'Legal Junior',
          iniciales: 'AJ',
          grupo: 'Legal',
          capacidad: 100,
          tasa: 100,
          tasaHoras: 100,
          costoUso: 0,
          acumulacion: 'inicio',
          calendario: 'estandar',
          codigo: 'LEG002',
          estado: 'activo'
        },
        {
          id: 3,
          nombre: 'Paralegal',
          tipo: 'trabajo',
          etiqueta: 'Paralegal',
          iniciales: 'PL',
          grupo: 'Legal',
          capacidad: 100,
          tasa: 60,
          tasaHoras: 60,
          costoUso: 0,
          acumulacion: 'inicio',
          calendario: 'estandar',
          codigo: 'LEG003',
          estado: 'activo'
        },
        {
          id: 4,
          nombre: 'Investigador',
          tipo: 'trabajo',
          etiqueta: 'Investigador',
          iniciales: 'INV',
          grupo: 'Investigacion',
          capacidad: 100,
          tasa: 80,
          tasaHoras: 80,
          costoUso: 0,
          acumulacion: 'inicio',
          calendario: 'estandar',
          codigo: 'INV001',
          estado: 'activo'
        },
        {
          id: 5,
          nombre: 'Secretario Legal',
          tipo: 'trabajo',
          etiqueta: 'Secretario',
          iniciales: 'SL',
          grupo: 'Administracion',
          capacidad: 100,
          tasa: 40,
          tasaHoras: 40,
          costoUso: 0,
          acumulacion: 'inicio',
          calendario: 'estandar',
          codigo: 'ADM001',
          estado: 'activo'
        }
      ];
      setRecursos(recursosIniciales);
      localStorage.setItem('recursos', JSON.stringify(recursosIniciales));
    } else {
      setRecursos(recursosGuardados);
    }
  }, []);

  const handleGuardarRecurso = (e) => {
    e.preventDefault();
    
    if (recursoEditando) {
      // Editar recurso existente
      const recursosActualizados = recursos.map(recurso => 
        recurso.id === recursoEditando.id 
          ? { ...recurso, ...nuevoRecurso }
          : recurso
      );
      setRecursos(recursosActualizados);
      localStorage.setItem('recursos', JSON.stringify(recursosActualizados));
    } else {
      // Crear nuevo recurso
      const recurso = {
        id: Date.now(),
        ...nuevoRecurso,
        estado: 'activo'
      };
      const recursosActualizados = [...recursos, recurso];
      setRecursos(recursosActualizados);
      localStorage.setItem('recursos', JSON.stringify(recursosActualizados));
    }
    
    setMostrarFormulario(false);
    setRecursoEditando(null);
    setNuevoRecurso({
      nombre: '',
      tipo: 'trabajo',
      etiqueta: '',
      iniciales: '',
      grupo: '',
      capacidad: 100,
      tasa: 0,
      tasaHoras: 0,
      costoUso: 0,
      acumulacion: 'inicio',
      calendario: 'estandar',
      codigo: ''
    });
  };

  const handleEditarRecurso = (recurso) => {
    setRecursoEditando(recurso);
    setNuevoRecurso(recurso);
    setMostrarFormulario(true);
  };

  const handleEliminarRecurso = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este recurso?')) {
      const recursosActualizados = recursos.filter(recurso => recurso.id !== id);
      setRecursos(recursosActualizados);
      localStorage.setItem('recursos', JSON.stringify(recursosActualizados));
    }
  };

  const calcularCostoTotal = () => {
    return recursos.reduce((total, recurso) => total + (recurso.tasa * 8), 0);
  };

  const recursosPorGrupo = recursos.reduce((grupos, recurso) => {
    const grupo = recurso.grupo || 'Sin Grupo';
    if (!grupos[grupo]) {
      grupos[grupo] = [];
    }
    grupos[grupo].push(recurso);
    return grupos;
  }, {});

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
            📊 Hoja de Recursos - Microsoft Project Style
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Gestión integral de recursos humanos y materiales para proyectos
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
              ➕ Agregar Recurso
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>👥 Total Recursos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {recursos.length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>💰 Costo Total Diario</h3>
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>🏢 Grupos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d69e2e' }}>
              {Object.keys(recursosPorGrupo).length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⚡ Activos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#805ad5' }}>
              {recursos.filter(r => r.estado === 'activo').length}
            </p>
          </div>
        </div>

        {/* Formulario de Recurso */}
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
              {recursoEditando ? '✏️ Editar Recurso' : '➕ Agregar Nuevo Recurso'}
            </h2>
            
            <form onSubmit={handleGuardarRecurso}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Nombre del Recurso *
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.nombre}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, nombre: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tipo *
                  </label>
                  <select
                    value={nuevoRecurso.tipo}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, tipo: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="trabajo">Trabajo</option>
                    <option value="material">Material</option>
                    <option value="costo">Costo</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Etiqueta
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.etiqueta}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, etiqueta: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Iniciales
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.iniciales}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, iniciales: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Grupo
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.grupo}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, grupo: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Capacidad (%)
                  </label>
                  <input
                    type="number"
                    value={nuevoRecurso.capacidad}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, capacidad: parseFloat(e.target.value) || 0})}
                    min="0"
                    max="100"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tasa (USD)
                  </label>
                  <input
                    type="number"
                    value={nuevoRecurso.tasa}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, tasa: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Tasa Horas (USD/h)
                  </label>
                  <input
                    type="number"
                    value={nuevoRecurso.tasaHoras}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, tasaHoras: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Costo por Uso (USD)
                  </label>
                  <input
                    type="number"
                    value={nuevoRecurso.costoUso}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, costoUso: parseFloat(e.target.value) || 0})}
                    min="0"
                    step="0.01"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Acumulación
                  </label>
                  <select
                    value={nuevoRecurso.acumulacion}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, acumulacion: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="inicio">Inicio</option>
                    <option value="fin">Fin</option>
                    <option value="proporcional">Proporcional</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Calendario
                  </label>
                  <select
                    value={nuevoRecurso.calendario}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, calendario: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="estandar">Estándar</option>
                    <option value="24horas">24 Horas</option>
                    <option value="noches">Noches</option>
                    <option value="fines">Fines de Semana</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Código
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.codigo}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, codigo: e.target.value})}
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setRecursoEditando(null);
                    setNuevoRecurso({
                      nombre: '',
                      tipo: 'trabajo',
                      etiqueta: '',
                      iniciales: '',
                      grupo: '',
                      capacidad: 100,
                      tasa: 0,
                      tasaHoras: 0,
                      costoUso: 0,
                      acumulacion: 'inicio',
                      calendario: 'estandar',
                      codigo: ''
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
                  {recursoEditando ? 'Actualizar' : 'Crear'} Recurso
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tabla de Recursos */}
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
            📋 Lista de Recursos ({recursos.length})
          </h2>
          
          {recursos.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay recursos registrados. Agregue el primer recurso para comenzar.
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
                      Nombre
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Tipo
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Etiqueta
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Iniciales
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Grupo
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Capacidad
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Tasa
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Tasa/H
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Costo/U
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Acumulación
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Calendario
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'left', fontWeight: 'bold' }}>
                      Código
                    </th>
                    <th style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 'bold' }}>
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recursos.map(recurso => (
                    <tr key={recurso.id} style={{ 
                      backgroundColor: recurso.estado === 'activo' ? 'white' : '#f7fafc',
                      opacity: recurso.estado === 'inactivo' ? 0.6 : 1
                    }}>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>
                        {recurso.nombre}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '0.8rem',
                          backgroundColor: recurso.tipo === 'trabajo' ? '#e6fffa' : 
                                          recurso.tipo === 'material' ? '#fef5e7' : '#f0f9ff',
                          color: recurso.tipo === 'trabajo' ? '#065f46' : 
                                 recurso.tipo === 'material' ? '#92400e' : '#1e40af'
                        }}>
                          {recurso.tipo}
                        </span>
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        {recurso.etiqueta}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        {recurso.iniciales}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        {recurso.grupo}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        {recurso.capacidad}%
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        ${recurso.tasa}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        ${recurso.tasaHoras}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        ${recurso.costoUso}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        {recurso.acumulacion}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        {recurso.calendario}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0' }}>
                        {recurso.codigo}
                      </td>
                      <td style={{ padding: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleEditarRecurso(recurso)}
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
                            onClick={() => handleEliminarRecurso(recurso.id)}
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

        {/* Resumen por Grupos */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px', 
          marginTop: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#2d3748',
            marginBottom: '20px'
          }}>
            📊 Resumen por Grupos
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {Object.entries(recursosPorGrupo).map(([grupo, recursosGrupo]) => (
              <div key={grupo} style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                backgroundColor: '#f7fafc'
              }}>
                <h3 style={{ 
                  color: '#2d3748', 
                  marginBottom: '15px',
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}>
                  🏢 {grupo}
                </h3>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Recursos:</strong> {recursosGrupo.length}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Costo Total Diario:</strong> ${recursosGrupo.reduce((total, r) => total + (r.tasa * 8), 0).toLocaleString()}
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Capacidad Promedio:</strong> {Math.round(recursosGrupo.reduce((total, r) => total + r.capacidad, 0) / recursosGrupo.length)}%
                </div>
                <div>
                  <strong>Recursos:</strong>
                  <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                    {recursosGrupo.map(recurso => (
                      <li key={recurso.id} style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                        {recurso.nombre} - ${recurso.tasaHoras}/h
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HojaRecursos;
