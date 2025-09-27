import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ControlPermisosVista = () => {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [permisosVista, setPermisosVista] = useState([]);
  const [listaNegra, setListaNegra] = useState([]);
  const [vistaActiva, setVistaActiva] = useState('usuarios');
  const [filtros, setFiltros] = useState({
    est: '',
    rol: '',
    bus: ''
  });

  // Páginas del sistema
  const paginasSistema = [
    { name: 'Dashboard Admin', href: '/admin/dashboard', category: 'Administración' },
    { name: 'Gestión de Registros', href: '/admin/registros', category: 'Administración' },
    { name: 'Control de Permisos', href: '/admin/control-permisos-vista', category: 'Administración' },
    { name: 'Panel de Actividades', href: '/admin/panel-actividades', category: 'Administración' },
    { name: 'Gestión de Actividades', href: '/admin/gestion-actividades', category: 'Administración' },
    { name: 'Hoja de Recursos', href: '/admin/hoja-recursos', category: 'Administración' },
    { name: 'Análisis de Precios', href: '/admin/analisis-precios', category: 'Administración' },
    { name: 'Presupuesto de Actividades', href: '/admin/presupuesto-actividades', category: 'Administración' },
    { name: 'Convocatorias de Tareas', href: '/admin/convocatorias-tareas', category: 'Administración' },
    { name: 'Gestión de Recursos Humanos', href: '/admin/gestion-recursos-humanos', category: 'Administración' },
    { name: 'Gestión de Donaciones', href: '/admin/donaciones', category: 'Administración' },
    { name: 'Dashboard Operador', href: '/operador/dashboard', category: 'Operador' },
    { name: 'Tareas Asignadas', href: '/operador/tareas-asignadas', category: 'Operador' },
    { name: 'Centro de Gestión Legal', href: '/operador/centro-gestion-legal', category: 'Operador' },
    { name: 'Panel de Tareas', href: '/operador/panel-tareas', category: 'Operador' },
    { name: 'Dashboard Cliente', href: '/cliente/dashboard', category: 'Cliente' },
    { name: 'Panel de Seguimiento', href: '/cliente/seguimiento-casos', category: 'Cliente' },
    { name: 'Tareas a Realizar', href: '/cliente/tareas-a-realizar', category: 'Cliente' }
  ];

  // Cargar datos
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    try {
      // Cargar usuarios
      const usuariosData = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
      if (usuariosData.length === 0) {
        // Crear usuarios de ejemplo
        const usuariosEjemplo = [
          {
            id: 1,
            nom: 'Administrador General',
            cor: 'admin@csdt.com',
            rol: 'administrador_general',
            est_vet: 'activo',
            fec_reg: '2024-01-01'
          },
          {
            id: 2,
            nom: 'Administrador Principal',
            cor: 'admin.principal@csdt.com',
            rol: 'administrador',
            est_vet: 'activo',
            fec_reg: '2024-01-02'
          },
          {
            id: 3,
            nom: 'Operador Senior',
            cor: 'operador.senior@csdt.com',
            rol: 'operador',
            est_vet: 'activo',
            fec_reg: '2024-01-03'
          },
          {
            id: 4,
            nom: 'Cliente Empresarial',
            cor: 'cliente.empresarial@csdt.com',
            rol: 'cliente',
            est_vet: 'activo',
            fec_reg: '2024-01-04'
          }
        ];
        setUsuarios(usuariosEjemplo);
        localStorage.setItem('registrosUsuarios', JSON.stringify(usuariosEjemplo));
      } else {
        setUsuarios(usuariosData);
      }

      // Cargar permisos
      const permisosData = JSON.parse(localStorage.getItem('permisosVista') || '[]');
      setPermisosVista(permisosData);

      // Cargar lista negra
      const listaNegraData = JSON.parse(localStorage.getItem('listaNegra') || '[]');
      setListaNegra(listaNegraData);
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  // Funciones de utilidad
  const getRolLabel = (rol) => {
    const labels = {
      'administrador_general': 'Admin General',
      'administrador': 'Administrador',
      'operador': 'Operador',
      'cliente': 'Cliente'
    };
    return labels[rol] || rol;
  };

  const getEstadoVetoLabel = (estado) => {
    const labels = {
      'activo': 'Activo',
      'vetado_temporal': 'Vetado Temporal',
      'vetado_indefinido': 'Vetado Indefinido'
    };
    return labels[estado] || estado;
  };

  // Funciones de veto
  const puedeVetarUsuario = (usuarioTarget) => {
    if (!user) return false;
    if (usuarioTarget.rol === 'administrador_general') return false;
    if (user.rol === 'administrador_general' && usuarioTarget.id !== user.id) return true;
    if (user.rol === 'administrador' && (usuarioTarget.rol === 'operador' || usuarioTarget.rol === 'cliente')) return true;
    return false;
  };

  const vetarUsuario = (usuario) => {
    if (!puedeVetarUsuario(usuario)) {
      alert('No tiene permisos para vetar a este usuario');
      return;
    }

    const motivo = prompt('Ingrese el motivo del veto:');
    if (!motivo) return;

    const usuariosActualizados = usuarios.map(u => {
      if (u.id === usuario.id) {
        return {
          ...u,
          estadoVeto: 'vetado_indefinido',
          motivoVeto: motivo,
          vetadoPor: user.nombre,
          fechaVeto: new Date().toISOString().split('T')[0]
        };
      }
      return u;
    });

    setUsuarios(usuariosActualizados);
    localStorage.setItem('registrosUsuarios', JSON.stringify(usuariosActualizados));
    alert(`Usuario ${usuario.nombre} vetado exitosamente`);
  };

  const levantarVeto = (usuario) => {
    if (!user || (user.rol !== 'administrador' && user.rol !== 'administrador_general')) {
      alert('Solo los administradores pueden levantar vetos');
      return;
    }

    if (usuario.rol === 'administrador_general') {
      alert('No se puede levantar veto al administrador general');
      return;
    }

    if (usuario.estadoVeto === 'activo') {
      alert('Este usuario no está vetado');
      return;
    }

    const confirmacion = window.confirm(`¿Está seguro de levantar el veto de ${usuario.nombre}?`);
    if (!confirmacion) return;

    const usuariosActualizados = usuarios.map(u => {
      if (u.id === usuario.id) {
        return {
          ...u,
          estadoVeto: 'activo',
          motivoVeto: null,
          vetadoPor: null,
          fechaVeto: null,
          fechaLiberacion: new Date().toISOString().split('T')[0],
          liberadoPor: user.nombre
        };
      }
      return u;
    });

    setUsuarios(usuariosActualizados);
    localStorage.setItem('registrosUsuarios', JSON.stringify(usuariosActualizados));
    alert(`Veto de ${usuario.nombre} levantado exitosamente`);
  };

  // Funciones de lista negra
  const puedeGestionarListaNegra = (usuario) => {
    if (!user) return false;
    if (usuario.rol === 'administrador_general') return false;
    if (user.rol === 'administrador_general' && usuario.id !== user.id) return true;
    if (user.rol === 'administrador' && (usuario.rol === 'operador' || usuario.rol === 'cliente')) return true;
    return false;
  };

  const agregarAListaNegra = (usuario) => {
    if (!puedeGestionarListaNegra(usuario)) {
      alert('No tiene permisos para agregar a este usuario a la lista negra');
      return;
    }

    const motivo = prompt('Ingrese el motivo para agregar a la lista negra:');
    if (!motivo) return;

    const elementoListaNegra = {
      id: Date.now() + Math.random(),
      usuarioId: usuario.id,
      usuarioNombre: usuario.nombre,
      usuarioEmail: usuario.email,
      motivo: motivo,
      fechaAgregado: new Date().toISOString().split('T')[0],
      agregadoPor: user.nombre
    };

    const listaNegraActualizada = [...listaNegra, elementoListaNegra];
    setListaNegra(listaNegraActualizada);
    localStorage.setItem('listaNegra', JSON.stringify(listaNegraActualizada));

    alert(`${usuario.nombre} agregado a la lista negra exitosamente`);
  };

  const quitarDeListaNegra = (elementoId) => {
    const elementoListaNegra = listaNegra.find(item => item.id === elementoId);
    if (!elementoListaNegra) return;

    const confirmacion = window.confirm(`¿Está seguro de quitar a ${elementoListaNegra.usuarioNombre} de la lista negra?`);
    if (!confirmacion) return;

    const listaNegraActualizada = listaNegra.filter(item => item.id !== elementoId);
    setListaNegra(listaNegraActualizada);
    localStorage.setItem('listaNegra', JSON.stringify(listaNegraActualizada));

    alert(`${elementoListaNegra.usuarioNombre} quitado de la lista negra exitosamente`);
  };

  const estaEnListaNegra = (usuarioId) => {
    return listaNegra.some(item => item.usuarioId === usuarioId);
  };

  // Funciones de permisos
  const darPermisos = (usuario) => {
    const paginasSeleccionadas = [];
    
    // Mostrar modal simple para seleccionar páginas
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;

    const contenido = document.createElement('div');
    contenido.style.cssText = `
      background: white;
      padding: 20px;
      border-radius: 8px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
    `;

    contenido.innerHTML = `
      <h3 style="margin: 0 0 20px 0; color: #1f2937; font-size: 18px; font-weight: bold;">
        🔐 Dar Permisos a ${usuario.nombre}
      </h3>
      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: bold; color: #374151;">
          Seleccione las páginas a habilitar:
        </label>
        <div style="max-height: 300px; overflow-y: auto; border: 1px solid #d1d5db; border-radius: 6px; padding: 10px;">
          ${paginasSistema.map(pagina => `
            <label style="display: flex; align-items: center; margin-bottom: 8px; cursor: pointer;">
              <input type="checkbox" value="${pagina.name}" style="margin-right: 8px;">
              <span style="font-size: 14px;">${pagina.name}</span>
            </label>
          `).join('')}
        </div>
      </div>
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button id="cancelar" style="padding: 10px 20px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Cancelar
        </button>
        <button id="aplicar" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer;">
          🔐 Aplicar Permisos
        </button>
      </div>
    `;

    modal.appendChild(contenido);
    document.body.appendChild(modal);

    // Event listeners
    document.getElementById('cancelar').onclick = () => {
      document.body.removeChild(modal);
    };

    document.getElementById('aplicar').onclick = () => {
      const checkboxes = contenido.querySelectorAll('input[type="checkbox"]:checked');
      checkboxes.forEach(checkbox => {
        paginasSeleccionadas.push(checkbox.value);
      });

      if (paginasSeleccionadas.length === 0) {
        alert('Debe seleccionar al menos una página');
        return;
      }

      // Crear permisos
      paginasSeleccionadas.forEach(pagina => {
        const permiso = {
          id: Date.now() + Math.random(),
          usuarioId: usuario.id,
          usuarioNombre: usuario.nombre,
          pagina: pagina,
          tipoAcceso: 'ver',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          asignadoPor: user.nombre,
          fechaAsignacion: new Date().toISOString().split('T')[0]
        };

        permisosVista.push(permiso);
      });

      setPermisosVista([...permisosVista]);
      localStorage.setItem('permisosVista', JSON.stringify(permisosVista));

      document.body.removeChild(modal);
      alert(`Permisos otorgados a ${usuario.nombre} exitosamente`);
    };
  };

  // Filtros
  const usuariosFiltrados = usuarios.filter(usuario => {
    const cumpleEstado = !filtros.estado || usuario.estadoVeto === filtros.estado;
    const cumpleRol = !filtros.rol || usuario.rol === filtros.rol;
    const cumpleBusqueda = !filtros.busqueda || 
      usuario.nombre.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      usuario.email.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    return cumpleEstado && cumpleRol && cumpleBusqueda;
  });

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#1f2937', 
          marginBottom: '8px',
          textAlign: 'center'
        }}>
          🔐 Control de Permisos de Vista
        </h1>
        <p style={{ 
          color: '#6b7280', 
          textAlign: 'center',
          fontSize: '16px'
        }}>
          Gestiona permisos, vetos y lista negra de usuarios
        </p>
      </div>

      {/* Pestañas */}
      <div style={{
        display: 'flex',
        gap: '8px', 
        marginBottom: '20px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '10px'
      }}>
        {[
          { key: 'usuarios', label: '👥 Usuarios', icon: '👥' },
          { key: 'vetados', label: '🚫 Vetados', icon: '🚫' },
          { key: 'permisos', label: '⚙️ Permisos', icon: '⚙️' },
          { key: 'lista_negra', label: '🚫 Lista Negra', icon: '🚫' }
        ].map(pestaña => (
          <button
            key={pestaña.key}
            onClick={() => setVistaActiva(pestaña.key)}
            style={{
              padding: '10px 20px',
              backgroundColor: vistaActiva === pestaña.key ? '#3b82f6' : '#f3f4f6',
              color: vistaActiva === pestaña.key ? 'white' : '#374151',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {pestaña.icon} {pestaña.label}
          </button>
        ))}
      </div>

      {/* Vista Usuarios */}
      {vistaActiva === 'usuarios' && (
        <div>
          {/* Filtros */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '20px', 
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
              🔍 Filtros
            </h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                  Estado
                </label>
                <select
                  value={filtros.estado}
                  onChange={(e) => setFiltros(prev => ({ ...prev, estado: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Todos los estados</option>
                  <option value="activo">Activo</option>
                  <option value="vetado_temporal">Vetado Temporal</option>
                  <option value="vetado_indefinido">Vetado Indefinido</option>
                </select>
              </div>
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
                  <option value="administrador_general">Admin General</option>
                  <option value="administrador">Administrador</option>
                  <option value="operador">Operador</option>
                  <option value="cliente">Cliente</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                  Búsqueda
                </label>
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={filtros.busqueda}
                  onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
                  style={{
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    width: '250px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Lista de usuarios */}
          <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
              👥 Usuarios ({usuariosFiltrados.length})
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
                      backgroundColor: usuario.estadoVeto === 'activo' ? '#f9fafb' : '#fef2f2'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                          {usuario.nombre}
                        </h4>
                        <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>{usuario.email}</p>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: usuario.rol === 'administrador_general' ? '#dc2626' : 
                                           usuario.rol === 'administrador' ? '#7c3aed' : 
                                           usuario.rol === 'operador' ? '#8b5cf6' : '#3b82f6',
                            color: 'white'
                          }}>
                            {getRolLabel(usuario.rol)}
                          </span>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            backgroundColor: usuario.estadoVeto === 'activo' ? '#10b981' : '#ef4444',
                            color: 'white'
                          }}>
                            {getEstadoVetoLabel(usuario.estadoVeto)}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {/* Botón de Permisos */}
                        <button
                          onClick={() => darPermisos(usuario)}
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
                          🔐 Permisos
                        </button>
                        
                        {/* Botón de Veto */}
                        {puedeVetarUsuario(usuario) && usuario.estadoVeto === 'activo' && (
                          <button
                            onClick={() => vetarUsuario(usuario)}
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
                            🚫 Vetar
                          </button>
                        )}
                        
                        {/* Botón de Levantar Veto */}
                        {puedeVetarUsuario(usuario) && usuario.estadoVeto !== 'activo' && (
                          <button
                            onClick={() => levantarVeto(usuario)}
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
                            🔓 Levantar Veto
                          </button>
                        )}

                        {/* Botón de Lista Negra */}
                        {puedeGestionarListaNegra(usuario) && !estaEnListaNegra(usuario.id) && (
                          <button
                            onClick={() => agregarAListaNegra(usuario)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#dc2626',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 'bold',
                              cursor: 'pointer'
                            }}
                          >
                            🚫 Lista Negra
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
      )}

      {/* Vista Vetados */}
      {vistaActiva === 'vetados' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
            🚫 Usuarios Vetados
          </h3>
          
          {usuarios.filter(u => u.estadoVeto !== 'activo').length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>🚫</span>
              <p style={{ color: '#6b7280' }}>No hay usuarios vetados</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {usuarios.filter(u => u.estadoVeto !== 'activo').map(usuario => (
                <div
                  key={usuario.id}
                  style={{
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#fef2f2'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                        {usuario.nombre}
                      </h4>
                      <p style={{ color: '#6b7280', margin: '0 0 4px 0' }}>{usuario.email}</p>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: '#ef4444',
                          color: 'white'
                        }}>
                          {getEstadoVetoLabel(usuario.estadoVeto)}
                        </span>
                        {usuario.motivoVeto && (
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            Motivo: {usuario.motivoVeto}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {puedeVetarUsuario(usuario) && (
                        <button
                          onClick={() => levantarVeto(usuario)}
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
                          🔓 Levantar Veto
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Vista Permisos */}
      {vistaActiva === 'permisos' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
            ⚙️ Permisos Otorgados ({permisosVista.length})
          </h3>
          
          {permisosVista.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>⚙️</span>
              <p style={{ color: '#6b7280' }}>No hay permisos otorgados</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {permisosVista.map(permiso => (
                <div
                  key={permiso.id}
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#f9fafb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                        {permiso.usuarioNombre}
                      </h4>
                      <p style={{ color: '#6b7280', margin: '0 0 4px 0' }}>Página: {permiso.pagina}</p>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: '#3b82f6',
                          color: 'white'
                        }}>
                          {permiso.tipoAcceso}
                        </span>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          Asignado: {permiso.fechaAsignacion}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Vista Lista Negra */}
      {vistaActiva === 'lista_negra' && (
        <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '16px' }}>
            🚫 Lista Negra ({listaNegra.length})
          </h3>
          
          {listaNegra.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>🚫</span>
              <p style={{ color: '#6b7280' }}>No hay usuarios en la lista negra</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {listaNegra.map(elemento => (
                <div
                  key={elemento.id}
                  style={{
                    border: '1px solid #fecaca',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#fef2f2'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 4px 0' }}>
                        {elemento.usuarioNombre}
                      </h4>
                      <p style={{ color: '#6b7280', margin: '0 0 4px 0' }}>{elemento.usuarioEmail}</p>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          Motivo: {elemento.motivo}
                        </span>
                        <span style={{ fontSize: '12px', color: '#6b7280' }}>
                          Agregado: {elemento.fechaAgregado}
                        </span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => quitarDeListaNegra(elemento.id)}
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
                        ✅ Quitar de Lista Negra
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ControlPermisosVista;
