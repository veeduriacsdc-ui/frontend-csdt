import React, { useState, useEffect } from 'react';

const GestionRecursosHumanos = () => {
  const [recursos, setRecursos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recursoEditando, setRecursoEditando] = useState(null);
  const [nuevoRecurso, setNuevoRecurso] = useState({
    nom: '',
    tip: 'operador',
    esp: '',
    exp: '',
    disp: 'disponible',
    cos_hor: 0,
    tel: '',
    cor: '',
    dir: '',
    obs: ''
  });

  // Cargar recursos desde localStorage
  useEffect(() => {
    cargarRecursos();
  }, []);

  const cargarRecursos = () => {
    const recursosGuardados = JSON.parse(localStorage.getItem('recursosHumanos') || '[]');
    
    if (recursosGuardados.length === 0) {
      // Crear datos de prueba
      const datosPrueba = [
        {
          id: 1,
          nombre: 'María González Pérez',
          tipo: 'operador',
          especialidad: 'Derecho Constitucional',
          experiencia: '5 años',
          disponibilidad: 'disponible',
          costoHora: 50000,
          telefono: '3001234567',
          email: 'maria.gonzalez@csdt.com',
          direccion: 'Calle 123 #45-67, Bogotá',
          observaciones: 'Especialista en acciones de tutela',
          fechaRegistro: '2024-01-15T10:00:00Z',
          tareasAsignadas: 3,
          tareasCompletadas: 15
        },
        {
          id: 2,
          nombre: 'Carlos Rodríguez Martínez',
          tipo: 'operador',
          especialidad: 'Derecho Administrativo',
          experiencia: '8 años',
          disponibilidad: 'ocupado',
          costoHora: 60000,
          telefono: '3109876543',
          email: 'carlos.rodriguez@csdt.com',
          direccion: 'Carrera 45 #78-90, Medellín',
          observaciones: 'Experto en contratación pública',
          fechaRegistro: '2024-01-10T14:00:00Z',
          tareasAsignadas: 5,
          tareasCompletadas: 22
        },
        {
          id: 3,
          nombre: 'Ana Lucía Sánchez',
          tipo: 'cliente',
          especialidad: 'Veeduría Ciudadana',
          experiencia: '3 años',
          disponibilidad: 'disponible',
          costoHora: 30000,
          telefono: '3155555555',
          email: 'ana.sanchez@csdt.com',
          direccion: 'Avenida 80 #12-34, Cali',
          observaciones: 'Líder comunitaria activa',
          fechaRegistro: '2024-01-20T09:00:00Z',
          tareasAsignadas: 1,
          tareasCompletadas: 8
        },
        {
          id: 4,
          nombre: 'Roberto Jiménez López',
          tipo: 'operador',
          especialidad: 'Derecho Penal',
          experiencia: '6 años',
          disponibilidad: 'disponible',
          costoHora: 55000,
          telefono: '3201111111',
          email: 'roberto.jimenez@csdt.com',
          direccion: 'Calle 100 #50-25, Barranquilla',
          observaciones: 'Especialista en derecho penal',
          fechaRegistro: '2024-01-12T11:00:00Z',
          tareasAsignadas: 2,
          tareasCompletadas: 18
        },
        {
          id: 5,
          nombre: 'Patricia Morales Vega',
          tipo: 'cliente',
          especialidad: 'Desarrollo Social',
          experiencia: '4 años',
          disponibilidad: 'disponible',
          costoHora: 35000,
          telefono: '3009999999',
          email: 'patricia.morales@csdt.com',
          direccion: 'Carrera 30 #15-40, Bucaramanga',
          observaciones: 'Experta en proyectos sociales',
          fechaRegistro: '2024-01-18T16:00:00Z',
          tareasAsignadas: 0,
          tareasCompletadas: 12
        }
      ];
      
      localStorage.setItem('recursosHumanos', JSON.stringify(datosPrueba));
      setRecursos(datosPrueba);
    } else {
      setRecursos(recursosGuardados);
    }
  };

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
      localStorage.setItem('recursosHumanos', JSON.stringify(recursosActualizados));
    } else {
      // Crear nuevo recurso
      const recurso = {
        id: Date.now(),
        ...nuevoRecurso,
        fechaRegistro: new Date().toISOString(),
        tareasAsignadas: 0,
        tareasCompletadas: 0
      };
      const recursosActualizados = [...recursos, recurso];
      setRecursos(recursosActualizados);
      localStorage.setItem('recursosHumanos', JSON.stringify(recursosActualizados));
    }
    
    setMostrarFormulario(false);
    setRecursoEditando(null);
    setNuevoRecurso({
      nombre: '',
      tipo: 'operador',
      especialidad: '',
      experiencia: '',
      disponibilidad: 'disponible',
      costoHora: 0,
      telefono: '',
      email: '',
      direccion: '',
      observaciones: ''
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
      localStorage.setItem('recursosHumanos', JSON.stringify(recursosActualizados));
    }
  };

  const getDisponibilidadColor = (disponibilidad) => {
    switch (disponibilidad) {
      case 'disponible': return '#10b981';
      case 'ocupado': return '#f59e0b';
      case 'no_disponible': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'operador': return '#3b82f6';
      case 'cliente': return '#8b5cf6';
      case 'administrador': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const calcularCostoTotal = () => {
    return recursos.reduce((total, recurso) => total + (recurso.costoHora * 8 * 22), 0); // 8 horas x 22 días
  };

  const obtenerRecursosPorTipo = (tipo) => {
    return recursos.filter(r => r.tipo === tipo);
  };

  const obtenerRecursosPorDisponibilidad = (disponibilidad) => {
    return recursos.filter(r => r.disponibilidad === disponibilidad);
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
            👥 Gestión de Recursos Humanos - CSDT
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Administra operadores, clientes y recursos del sistema
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
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⚖️ Operadores</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              {obtenerRecursosPorTipo('operador').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>👤 Clientes</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
              {obtenerRecursosPorTipo('cliente').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>✅ Disponibles</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              {obtenerRecursosPorDisponibilidad('disponible').length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>💰 Costo Mensual</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>
              ${calcularCostoTotal().toLocaleString()}
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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Nombre Completo *
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
                    Tipo de Recurso *
                  </label>
                  <select
                    value={nuevoRecurso.tipo}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, tipo: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="operador">Operador</option>
                    <option value="cliente">Cliente</option>
                    <option value="administrador">Administrador</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Especialidad *
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.especialidad}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, especialidad: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Experiencia *
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.experiencia}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, experiencia: e.target.value})}
                    required
                    placeholder="Ej: 5 años"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Disponibilidad *
                  </label>
                  <select
                    value={nuevoRecurso.disponibilidad}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, disponibilidad: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="disponible">Disponible</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="no_disponible">No Disponible</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Costo por Hora (COP) *
                  </label>
                  <input
                    type="number"
                    value={nuevoRecurso.costoHora}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, costoHora: parseFloat(e.target.value) || 0})}
                    required
                    min="0"
                    step="1000"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={nuevoRecurso.telefono}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, telefono: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={nuevoRecurso.email}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, email: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Dirección *
                  </label>
                  <input
                    type="text"
                    value={nuevoRecurso.direccion}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, direccion: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Observaciones
                  </label>
                  <textarea
                    value={nuevoRecurso.observaciones}
                    onChange={(e) => setNuevoRecurso({...nuevoRecurso, observaciones: e.target.value})}
                    rows="3"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
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
                      tipo: 'operador',
                      especialidad: '',
                      experiencia: '',
                      disponibilidad: 'disponible',
                      costoHora: 0,
                      telefono: '',
                      email: '',
                      direccion: '',
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
                  {recursoEditando ? 'Actualizar' : 'Agregar'} Recurso
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Recursos */}
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
            👥 Recursos Humanos ({recursos.length})
          </h2>
          
          {recursos.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay recursos registrados. Agregue el primer recurso para comenzar.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {recursos.map(recurso => (
                <div key={recurso.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {recurso.nombre}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Especialidad:</strong> {recurso.especialidad} | 
                        <strong> Experiencia:</strong> {recurso.experiencia} | 
                        <strong> Costo/Hora:</strong> ${recurso.costoHora.toLocaleString()}
                      </p>
                      <p style={{ color: '#4a5568' }}>
                        <strong>Email:</strong> {recurso.email} | 
                        <strong> Teléfono:</strong> {recurso.telefono}
                      </p>
                      <p style={{ color: '#4a5568' }}>
                        <strong>Dirección:</strong> {recurso.direccion}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        background: getTipoColor(recurso.tipo),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {recurso.tipo}
                      </span>
                      <span style={{ 
                        background: getDisponibilidadColor(recurso.disponibilidad),
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        textTransform: 'capitalize'
                      }}>
                        {recurso.disponibilidad.replace('_', ' ')}
                      </span>
                      <button
                        onClick={() => handleEditarRecurso(recurso)}
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
                        onClick={() => handleEliminarRecurso(recurso.id)}
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
                  
                  {/* Estadísticas */}
                  <div style={{ 
                    borderTop: '2px solid #e2e8f0', 
                    paddingTop: '15px',
                    marginTop: '15px'
                  }}>
                    <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                      📊 Estadísticas:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Tareas Asignadas:</strong> {recurso.tareasAsignadas}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Tareas Completadas:</strong> {recurso.tareasCompletadas}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Fecha Registro:</strong> {new Date(recurso.fechaRegistro).toLocaleDateString('es-CO')}
                      </div>
                    </div>
                  </div>

                  {/* Observaciones */}
                  {recurso.observaciones && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        📝 Observaciones:
                      </h4>
                      <p style={{ color: '#4a5568', fontSize: '0.9rem' }}>
                        {recurso.observaciones}
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

export default GestionRecursosHumanos;
