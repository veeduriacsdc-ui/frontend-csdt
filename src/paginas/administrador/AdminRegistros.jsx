import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const AdminRegistros = () => {
  const { user } = useAuth();
  const [registros, setRegistros] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: '',
    rol: '',
    busqueda: ''
  });
  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    pendientes: 0,
    aprobados: 0,
    rechazados: 0
  });

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    try {
      // Intentar cargar desde API primero
      const response = await fetch('/api/registros');
      if (response.ok) {
        const data = await response.json();
        setRegistros(data);
      } else {
        throw new Error('API no disponible');
      }
    } catch (error) {
      // Fallback a localStorage
      const registrosData = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
      
      if (registrosData.length === 0) {
        // Generar datos de prueba
        const datosPrueba = [
          {
            id: '1',
            nombre: 'María González',
            email: 'maria@ejemplo.com',
            usuario: 'maria',
            rol: 'cliente',
            estado: 'pendiente',
            fechaRegistro: '2024-01-15'
          },
          {
            id: '2',
            nombre: 'Carlos Rodríguez',
            email: 'carlos@ejemplo.com',
            usuario: 'carlos',
            rol: 'operador',
            estado: 'aprobado',
            fechaRegistro: '2024-01-16'
          },
          {
            id: '3',
            nombre: 'Ana Sánchez',
            email: 'ana@ejemplo.com',
            usuario: 'ana',
            rol: 'administrador',
            estado: 'aprobado',
            fechaRegistro: '2024-01-17'
          }
        ];
        setRegistros(datosPrueba);
        localStorage.setItem('registrosUsuarios', JSON.stringify(datosPrueba));
      } else {
        setRegistros(registrosData);
      }
    }
  };

  const calcularEstadisticas = () => {
    const total = registros.length;
    const pendientes = registros.filter(r => r.estado === 'pendiente').length;
    const aprobados = registros.filter(r => r.estado === 'aprobado').length;
    const rechazados = registros.filter(r => r.estado === 'rechazado').length;

    setEstadisticas({ total, pendientes, aprobados, rechazados });
  };

  useEffect(() => {
    calcularEstadisticas();
  }, [registros]);

  const procesarRegistro = async (id, accion) => {
    try {
      // Intentar procesar con API primero
      const response = await fetch(`/api/registros/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion })
      });

      if (response.ok) {
        const data = await response.json();
        setRegistros(registros.map(r => r.id === id ? data : r));
      } else {
        throw new Error('API no disponible');
      }
    } catch (error) {
      // Fallback a actualización local
      const registrosActualizados = registros.map(registro => 
        registro.id === id 
          ? { ...registro, estado: accion }
          : registro
      );
      
      setRegistros(registrosActualizados);
      localStorage.setItem('registrosUsuarios', JSON.stringify(registrosActualizados));
    }
  };

  const getRolColor = (rol) => {
    switch (rol) {
      case 'cliente': return '#3498db';
      case 'operador': return '#e67e22';
      case 'administrador': return '#8e44ad';
      case 'administrador_general': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getRolLabel = (rol) => {
    switch (rol) {
      case 'cliente': return 'Cliente';
      case 'operador': return 'Operador';
      case 'administrador': return 'Administrador';
      case 'administrador_general': return 'Admin General';
      default: return rol;
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'aprobado': return '#10b981';
      case 'pendiente': return '#f59e0b';
      case 'rechazado': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const registrosFiltrados = registros.filter(registro => {
    const cumpleEstado = !filtros.estado || registro.estado === filtros.estado;
    const cumpleRol = !filtros.rol || registro.rol === filtros.rol;
    const cumpleBusqueda = !filtros.busqueda || 
      registro.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      registro.email.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      registro.usuario.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    return cumpleEstado && cumpleRol && cumpleBusqueda;
  });

  if (!user || (user.rol !== 'administrador' && user.rol !== 'administrador_general')) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Acceso Denegado</h2>
        <p>No tiene permisos para acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
            📝 Gestión de Registros
        </h1>
          <p style={{ color: '#6b7280', marginBottom: '20px' }}>
            Administración de registros de usuarios del sistema
          </p>

          {/* Estadísticas */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>{estadisticas.total}</div>
              <div style={{ color: '#6b7280' }}>Total Registros</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef3c7', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>{estadisticas.pendientes}</div>
              <div style={{ color: '#6b7280' }}>Pendientes</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#d1fae5', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{estadisticas.aprobados}</div>
              <div style={{ color: '#6b7280' }}>Aprobados</div>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>{estadisticas.rechazados}</div>
              <div style={{ color: '#6b7280' }}>Rechazados</div>
            </div>
          </div>
      </div>

        {/* Filtros */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
            🔍 Filtros y Búsqueda
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                Estado
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Todos</option>
                <option value="pendiente">Pendiente</option>
                <option value="aprobado">Aprobado</option>
                <option value="rechazado">Rechazado</option>
              </select>
        </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                Rol
              </label>
          <select
                value={filtros.rol}
                onChange={(e) => setFiltros({...filtros, rol: e.target.value})}
            style={{
                  width: '100%',
              padding: '8px 12px',
                  border: '2px solid #e5e7eb',
              borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Todos</option>
                <option value="cliente">Cliente</option>
                <option value="operador">Operador</option>
                <option value="administrador">Administrador</option>
                <option value="administrador_general">Administrador General</option>
          </select>
        </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#374151', marginBottom: '8px' }}>
                Búsqueda
              </label>
              <input
                type="text"
                value={filtros.busqueda}
                onChange={(e) => setFiltros({...filtros, busqueda: e.target.value})}
                placeholder="Buscar por nombre, email o usuario..."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              />
          </div>
        </div>
      </div>

        {/* Lista de Registros */}
      <div style={{
        backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
            📋 Registros de Usuarios ({registrosFiltrados.length})
          </h3>
          
          {registrosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>📝</span>
              <p style={{ color: '#6b7280' }}>No se encontraron registros con los filtros aplicados</p>
          </div>
        ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {registrosFiltrados.map(registro => (
                <div
                  key={registro.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
              padding: '20px',
                    backgroundColor: '#f9fafb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                      <h4 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                    {registro.nombre}
                      </h4>
                      <p style={{ color: '#6b7280', marginBottom: '8px' }}>{registro.email}</p>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span style={{
                          padding: '4px 12px',
                          backgroundColor: getRolColor(registro.rol) + '20',
                          color: getRolColor(registro.rol),
                          borderRadius: '20px',
                    fontSize: '12px',
                          fontWeight: 'bold'
                  }}>
                          {getRolLabel(registro.rol)}
                  </span>
                  <span style={{
                          padding: '4px 12px',
                          backgroundColor: getEstadoColor(registro.estado) + '20',
                          color: getEstadoColor(registro.estado),
                          borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                          {registro.estado.toUpperCase()}
                  </span>
                </div>
                </div>
                    <div style={{ textAlign: 'right', fontSize: '12px', color: '#6b7280' }}>
                      <div>ID: {registro.id}</div>
                      <div>Registro: {registro.fechaRegistro}</div>
                    </div>
              </div>

                  {/* Botones de Acción */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {registro.estado === 'pendiente' && (
                  <>
                    <button
                          onClick={() => procesarRegistro(registro.id, 'aprobado')}
                      style={{
                            padding: '8px 16px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                            fontSize: '12px',
                        fontWeight: 'bold',
                            cursor: 'pointer'
                      }}
                    >
                      ✅ Aprobar
                    </button>
                    <button
                          onClick={() => procesarRegistro(registro.id, 'rechazado')}
                      style={{
                            padding: '8px 16px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                            fontSize: '12px',
                        fontWeight: 'bold',
                            cursor: 'pointer'
                      }}
                    >
                      ❌ Rechazar
                    </button>
                  </>
                )}
                    {registro.estado === 'aprobado' && (
              <button
                        onClick={() => procesarRegistro(registro.id, 'pendiente')}
                style={{
                          padding: '8px 16px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                  borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        🔄 Revisar
              </button>
                    )}
                    {registro.estado === 'rechazado' && (
              <button
                        onClick={() => procesarRegistro(registro.id, 'pendiente')}
                style={{
                          padding: '8px 16px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                          fontSize: '12px',
                  fontWeight: 'bold',
                          cursor: 'pointer'
                }}
              >
                        🔄 Reconsiderar
              </button>
                    )}
            </div>
          </div>
              ))}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};

export default AdminRegistros;
