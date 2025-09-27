import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const GestionarRolesUsuarios = () => {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [filtros, setFiltros] = useState({
    rol: '',
    bus: '',
    est: ''
  });
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModalCambioRol, setMostrarModalCambioRol] = useState(false);
  const [nuevoRol, setNuevoRol] = useState('');
  const [observaciones, setObservaciones] = useState('');

  // Roles disponibles y sus niveles
  const rolesDisponibles = [
    { valor: 'cliente', etiqueta: 'Cliente', nivel: 1, descripcion: 'Usuario básico con acceso limitado' },
    { valor: 'operador', etiqueta: 'Operador', nivel: 2, descripcion: 'Usuario con permisos de operación' },
    { valor: 'administrador', etiqueta: 'Administrador', nivel: 3, descripcion: 'Usuario con permisos administrativos' },
    { valor: 'administrador_general', etiqueta: 'Administrador General', nivel: 4, descripcion: 'Usuario con permisos totales del sistema' }
  ];

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    try {
      const usuariosData = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
      setUsuarios(usuariosData);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  // Verificar si el usuario puede gestionar roles
  const puedeGestionarRoles = () => {
    return user && (user.rol === 'administrador_general' || user.rol === 'administrador');
  };

  // Verificar si puede cambiar el rol de un usuario específico
  const puedeCambiarRol = (usuarioTarget) => {
    if (!puedeGestionarRoles()) return false;
    
    // El administrador general puede cambiar cualquier rol
    if (user.rol === 'administrador_general') return true;
    
    // Los administradores no pueden cambiar roles de administradores generales
    if (usuarioTarget.rol === 'administrador_general') return false;
    
    // Los administradores no pueden cambiar su propio rol
    if (usuarioTarget.id === user.id) return false;
    
    return true;
  };

  // Cambiar rol de usuario
  const cambiarRolUsuario = () => {
    if (!usuarioSeleccionado || !nuevoRol) return;

    const usuariosActualizados = usuarios.map(u => {
      if (u.id === usuarioSeleccionado.id) {
        return {
          ...u,
          rol: nuevoRol,
          rolAnterior: usuarioSeleccionado.rol,
          fechaCambioRol: new Date().toISOString().split('T')[0],
          cambiadoPor: user.nombre,
          observacionesCambioRol: observaciones
        };
      }
      return u;
    });

    setUsuarios(usuariosActualizados);
    localStorage.setItem('registrosUsuarios', JSON.stringify(usuariosActualizados));

    // Crear notificación para el usuario afectado
    const notificaciones = JSON.parse(localStorage.getItem('notificacionesUsuarios') || '[]');
    const nuevaNotificacion = {
      id: Date.now() + Math.random(),
      usuarioId: usuarioSeleccionado.id,
      titulo: 'Cambio de Rol',
      mensaje: `Tu rol ha sido cambiado de ${getRolLabel(usuarioSeleccionado.rol)} a ${getRolLabel(nuevoRol)}. ${observaciones ? 'Observaciones: ' + observaciones : ''}`,
      fecha: new Date().toISOString().split('T')[0],
      leida: false,
      tipo: 'cambio_rol'
    };
    notificaciones.push(nuevaNotificacion);
    localStorage.setItem('notificacionesUsuarios', JSON.stringify(notificaciones));

    alert(`Rol de ${usuarioSeleccionado.nombre} cambiado exitosamente de ${getRolLabel(usuarioSeleccionado.rol)} a ${getRolLabel(nuevoRol)}`);
    
    cerrarModalCambioRol();
  };

  // Abrir modal de cambio de rol
  const abrirModalCambioRol = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setNuevoRol(usuario.rol);
    setObservaciones('');
    setMostrarModalCambioRol(true);
  };

  // Cerrar modal
  const cerrarModalCambioRol = () => {
    setMostrarModalCambioRol(false);
    setUsuarioSeleccionado(null);
    setNuevoRol('');
    setObservaciones('');
  };

  // Obtener etiqueta del rol
  const getRolLabel = (rol) => {
    const rolObj = rolesDisponibles.find(r => r.valor === rol);
    return rolObj ? rolObj.etiqueta : rol;
  };

  // Obtener color del rol
  const getRolColor = (rol) => {
    const colors = {
      'cliente': '#6b7280',
      'operador': '#3b82f6',
      'administrador': '#f59e0b',
      'administrador_general': '#ef4444'
    };
    return colors[rol] || '#6b7280';
  };

  // Filtrar usuarios
  const usuariosFiltrados = usuarios.filter(usuario => {
    const cumpleRol = !filtros.rol || usuario.rol === filtros.rol;
    const cumpleEstado = !filtros.est || usuario.estadoVeto === filtros.est;
    const cumpleBusqueda = !filtros.bus || 
      usuario.nombre.toLowerCase().includes(filtros.bus.toLowerCase()) ||
      usuario.email.toLowerCase().includes(filtros.bus.toLowerCase()) ||
      (usuario.numeroDocumento && usuario.numeroDocumento.includes(filtros.bus));
    
    return cumpleRol && cumpleEstado && cumpleBusqueda;
  });

  // Estadísticas
  const estadisticas = {
    total: usuarios.length,
    clientes: usuarios.filter(u => u.rol === 'cliente').length,
    operadores: usuarios.filter(u => u.rol === 'operador').length,
    administradores: usuarios.filter(u => u.rol === 'administrador').length,
    administradoresGenerales: usuarios.filter(u => u.rol === 'administrador_general').length
  };

  if (!puedeGestionarRoles()) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '20px' }}>🚫</div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            Acceso Denegado
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            Solo los administradores pueden acceder a la gestión de roles y niveles de usuarios.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
        color: 'white',
        padding: '40px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '16px'
          }}>
            👥 Gestionar Roles y Niveles
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Sistema de gestión de roles y niveles de usuarios
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
              {estadisticas.total}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Usuarios</div>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#6b7280', marginBottom: '4px' }}>
              {estadisticas.clientes}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Clientes</div>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
              {estadisticas.operadores}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Operadores</div>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>
              {estadisticas.administradores}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Administradores</div>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginBottom: '4px' }}>
              {estadisticas.administradoresGenerales}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Admin. Generales</div>
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            🔍 Filtros
          </h3>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                Rol
              </label>
              <select
                value={filtros.rol}
                onChange={(e) => setFiltros(prev => ({ ...prev, rol: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Todos los roles</option>
                {rolesDisponibles.map(rol => (
                  <option key={rol.valor} value={rol.valor}>{rol.etiqueta}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                Estado
              </label>
              <select
                value={filtros.est}
                onChange={(e) => setFiltros(prev => ({ ...prev, est: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Todos los estados</option>
                <option value="activo">Activo</option>
                <option value="vetado">Vetado</option>
                <option value="suspendido">Suspendido</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                Búsqueda
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre, email o documento..."
                value={filtros.bus}
                onChange={(e) => setFiltros(prev => ({ ...prev, bus: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  width: '300px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Lista de Usuarios */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          padding: '20px'
        }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px'
          }}>
            👥 Usuarios del Sistema ({usuariosFiltrados.length})
          </h3>
          
          {usuariosFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>👥</span>
              <p style={{ color: '#6b7280' }}>No se encontraron usuarios</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {usuariosFiltrados.map(usuario => (
                <div
                  key={usuario.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#f9fafb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>
                        {usuario.nombre}
                      </h4>
                      <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Email: {usuario.email}</p>
                      {usuario.numeroDocumento && (
                        <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Documento: {usuario.numeroDocumento}</p>
                      )}
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: getRolColor(usuario.rol) + '20',
                          color: getRolColor(usuario.rol)
                        }}>
                          {getRolLabel(usuario.rol)}
                        </span>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: usuario.estadoVeto === 'activo' ? '#10b98120' : '#ef444420',
                          color: usuario.estadoVeto === 'activo' ? '#10b981' : '#ef4444'
                        }}>
                          {usuario.estadoVeto === 'activo' ? 'Activo' : 'Vetado'}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        <div>Registrado: {usuario.fechaRegistro}</div>
                        {usuario.fechaCambioRol && (
                          <div>Último cambio de rol: {usuario.fechaCambioRol}</div>
                        )}
                        {usuario.cambiadoPor && (
                          <div>Cambiado por: {usuario.cambiadoPor}</div>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {puedeCambiarRol(usuario) && (
                        <button
                          onClick={() => abrirModalCambioRol(usuario)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          🔄 Cambiar Rol
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Cambio de Rol */}
      {mostrarModalCambioRol && usuarioSeleccionado && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '20px', fontWeight: 'bold' }}>
              🔄 Cambiar Rol de Usuario
            </h3>
            
            {/* Información del Usuario */}
            <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                Usuario Seleccionado
              </h4>
              <div style={{ fontSize: '14px' }}>
                <div><strong>Nombre:</strong> {usuarioSeleccionado.nombre}</div>
                <div><strong>Email:</strong> {usuarioSeleccionado.email}</div>
                <div><strong>Rol Actual:</strong> {getRolLabel(usuarioSeleccionado.rol)}</div>
                {usuarioSeleccionado.numeroDocumento && (
                  <div><strong>Documento:</strong> {usuarioSeleccionado.numeroDocumento}</div>
                )}
              </div>
            </div>

            {/* Selección de Nuevo Rol */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                Nuevo Rol
              </label>
              <select
                value={nuevoRol}
                onChange={(e) => setNuevoRol(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                {rolesDisponibles.map(rol => (
                  <option key={rol.valor} value={rol.valor}>
                    {rol.etiqueta} (Nivel {rol.nivel}) - {rol.descripcion}
                  </option>
                ))}
              </select>
            </div>

            {/* Observaciones */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                Observaciones (Opcional)
              </label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Ingresa observaciones sobre el cambio de rol..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Botones */}
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={cerrarModalCambioRol}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button
                onClick={cambiarRolUsuario}
                disabled={nuevoRol === usuarioSeleccionado.rol}
                style={{
                  padding: '10px 20px',
                  backgroundColor: nuevoRol === usuarioSeleccionado.rol ? '#9ca3af' : '#7c3aed',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: nuevoRol === usuarioSeleccionado.rol ? 'not-allowed' : 'pointer'
                }}
              >
                🔄 Cambiar Rol
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionarRolesUsuarios;
