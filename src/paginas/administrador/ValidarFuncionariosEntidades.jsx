import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ValidarFuncionariosEntidades = () => {
  const { user } = useAuth();
  const [monitores, setMonitores] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: '',
    tipoEntidad: '',
    busqueda: ''
  });
  const [monitorSeleccionado, setMonitorSeleccionado] = useState(null);
  const [mostrarModalValidacion, setMostrarModalValidacion] = useState(false);
  const [datosValidacion, setDatosValidacion] = useState({
    observaciones: '',
    documentos: [],
    fechaValidacion: new Date().toISOString().split('T')[0]
  });
  const [mostrarDocumento, setMostrarDocumento] = useState(null);
  const [documentoSeleccionado, setDocumentoSeleccionado] = useState(null);

  // Cargar monitores
  useEffect(() => {
    cargarMonitores();
    // Verificar y limpiar localStorage si es necesario
    verificarYLimpiarLocalStorage();
  }, []);

  const verificarYLimpiarLocalStorage = () => {
    try {
      // Verificar si hay datos corruptos en localStorage
      const monitoresData = localStorage.getItem('monitoresCSDT');
      if (monitoresData && monitoresData !== '[]' && !monitoresData.startsWith('[')) {
        localStorage.removeItem('monitoresCSDT');
      }
    } catch (error) {
      console.error('Error verificando localStorage:', error);
    }
  };

  const cargarMonitores = () => {
    try {
      const monitoresData = JSON.parse(localStorage.getItem('monitoresCSDT') || '[]');
      setMonitores(monitoresData);
    } catch (error) {
      console.error('Error cargando monitores:', error);
    }
  };

  // Verificar si el usuario puede validar
  const puedeValidar = () => {
    // Si no hay usuario, verificar si hay uno en localStorage
    if (!user) {
      const savedUser = localStorage.getItem('csdt_user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          return parsedUser.rol === 'administrador_general' || parsedUser.rol === 'administrador';
        } catch (error) {
          console.error('Error parseando usuario del localStorage:', error);
        }
      }
    }
    
    const puede = user && (user.rol === 'administrador_general' || user.rol === 'administrador');
    return puede;
  };

  // Validar monitor
  const validarMonitor = (monitor, aprobado) => {
    if (!puedeValidar()) {
      alert('Solo los administradores pueden validar monitores');
      return;
    }

    const monitoresActualizados = monitores.map(m => {
      if (m.id === monitor.id) {
        return {
          ...m,
          estado: aprobado ? 'validado' : 'rechazado',
          validadoPor: user.nombre,
          fechaValidacion: new Date().toISOString().split('T')[0],
          observaciones: datosValidacion.observaciones,
          activo: aprobado
        };
      }
      return m;
    });

    setMonitores(monitoresActualizados);
    localStorage.setItem('monitoresCSDT', JSON.stringify(monitoresActualizados));

    // Si es aprobado, activar como operador
    if (aprobado) {
      const operadoresActuales = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
      const operadorExistente = operadoresActuales.find(o => o.cedula === monitor.cedula);
      
      if (operadorExistente) {
        // Actualizar operador existente
        const operadoresActualizados = operadoresActuales.map(o => {
          if (o.cedula === monitor.cedula) {
            return {
              ...o,
              activo: true,
              validado: true,
              fechaValidacion: new Date().toISOString().split('T')[0],
              validadoPor: user.nombre
            };
          }
          return o;
        });
        localStorage.setItem('registrosUsuarios', JSON.stringify(operadoresActualizados));
      } else {
        // Crear nuevo operador
        const nuevoOperador = {
          id: Date.now() + Math.random(),
          nombre: monitor.nombreCompleto,
          email: monitor.email,
          cedula: monitor.cedula,
          rol: 'operador',
          estadoVeto: 'activo',
          fechaRegistro: monitor.fechaRegistro,
          tipoEntidad: monitor.tipoEntidad,
          entidad: monitor.entidad,
          telefono: monitor.telefono,
          direccion: monitor.direccion,
          esMonitor: true,
          monitorId: monitor.id,
          activo: true,
          validado: true,
          fechaValidacion: new Date().toISOString().split('T')[0],
          validadoPor: user.nombre
        };
        
        operadoresActuales.push(nuevoOperador);
        localStorage.setItem('registrosUsuarios', JSON.stringify(operadoresActuales));
      }
    }

    alert(`Monitor ${aprobado ? 'validado' : 'rechazado'} exitosamente`);
    setMostrarModalValidacion(false);
    setMonitorSeleccionado(null);
    setDatosValidacion({
      observaciones: '',
      documentos: [],
      fechaValidacion: new Date().toISOString().split('T')[0]
    });
  };

  // Abrir modal de validación
  const abrirModalValidacion = (monitor) => {
    setMonitorSeleccionado(monitor);
    setMostrarModalValidacion(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setMostrarModalValidacion(false);
    setMonitorSeleccionado(null);
    setDatosValidacion({
      observaciones: '',
      documentos: [],
      fechaValidacion: new Date().toISOString().split('T')[0]
    });
  };

  // Visualizar documento
  const visualizarDocumento = (documento) => {
    setDocumentoSeleccionado(documento);
    setMostrarDocumento(true);
  };

  // Cerrar visualizador de documento
  const cerrarDocumento = () => {
    setMostrarDocumento(false);
    setDocumentoSeleccionado(null);
  };

  // Descargar documento
  const descargarDocumento = (documento) => {
    if (documento.url) {
      const link = document.createElement('a');
      link.href = documento.url;
      link.download = documento.nombre;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert('Documento no disponible para descarga');
    }
  };

  // Obtener color del estado
  const getEstadoColor = (estado) => {
    const colors = {
      'pendiente_validacion': '#f59e0b',
      'validado': '#10b981',
      'rechazado': '#ef4444',
      'activo': '#3b82f6'
    };
    return colors[estado] || '#6b7280';
  };

  // Obtener etiqueta del estado
  const getEstadoLabel = (estado) => {
    const labels = {
      'pendiente_validacion': 'Pendiente Validación',
      'validado': 'Validado',
      'rechazado': 'Rechazado',
      'activo': 'Activo'
    };
    return labels[estado] || estado;
  };

  // Filtrar monitores
  const monitoresFiltrados = monitores.filter(monitor => {
    const cumpleEstado = !filtros.estado || monitor.estado === filtros.estado;
    const cumpleTipo = !filtros.tipoEntidad || monitor.tipoEntidad === filtros.tipoEntidad;
    const cumpleBusqueda = !filtros.busqueda || 
      monitor.nombreCompleto.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
      monitor.cedula.includes(filtros.busqueda) ||
      monitor.entidad.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    return cumpleEstado && cumpleTipo && cumpleBusqueda;
  });

  // Estadísticas
  const estadisticas = {
    total: monitores.length,
    pendientes: monitores.filter(m => m.estado === 'pendiente_validacion').length,
    validados: monitores.filter(m => m.estado === 'validado').length,
    rechazados: monitores.filter(m => m.estado === 'rechazado').length,
    activos: monitores.filter(m => m.activo).length
  };

  if (!puedeValidar()) {
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
            Solo los administradores pueden acceder a esta página de validación de funcionarios y entidades.
          </p>
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Debug Info:</h4>
            <p style={{ fontSize: '12px', margin: '5px 0' }}>Usuario: {user ? user.nombre : 'No cargado'}</p>
            <p style={{ fontSize: '12px', margin: '5px 0' }}>Rol: {user ? user.rol : 'No definido'}</p>
            <p style={{ fontSize: '12px', margin: '5px 0' }}>ID: {user ? user.id : 'No definido'}</p>
            <button
              onClick={() => {
                console.log('localStorage csdt_user:', localStorage.getItem('csdt_user'));
                alert('Información de debug enviada a la consola');
              }}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Ver Debug Info
            </button>
          </div>
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
            👨‍💼 Validar Funcionarios y Entidades
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Sistema de validación de monitores CSDT
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
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Monitores</div>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '4px' }}>
              {estadisticas.pendientes}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Pendientes</div>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
              {estadisticas.validados}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Validados</div>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', marginBottom: '4px' }}>
              {estadisticas.rechazados}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Rechazados</div>
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
                <option value="pendiente_validacion">Pendiente Validación</option>
                <option value="validado">Validado</option>
                <option value="rechazado">Rechazado</option>
                <option value="activo">Activo</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                Tipo de Entidad
              </label>
              <select
                value={filtros.tipoEntidad}
                onChange={(e) => setFiltros(prev => ({ ...prev, tipoEntidad: e.target.value }))}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px'
                }}
              >
                <option value="">Todos los tipos</option>
                <option value="Veedor Ciudadano">Veedor Ciudadano</option>
                <option value="ONG">ONG</option>
                <option value="Defensoría del Pueblo">Defensoría del Pueblo</option>
                <option value="Personería">Personería</option>
                <option value="Contraloría">Contraloría</option>
                <option value="Procuraduría">Procuraduría</option>
                <option value="Universidad">Universidad</option>
                <option value="Colegio Profesional">Colegio Profesional</option>
                <option value="Organización Social">Organización Social</option>
                <option value="Medio de Comunicación">Medio de Comunicación</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 'bold', color: '#374151' }}>
                Búsqueda
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre, cédula o entidad..."
                value={filtros.busqueda}
                onChange={(e) => setFiltros(prev => ({ ...prev, busqueda: e.target.value }))}
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

        {/* Lista de Monitores */}
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
            📋 Monitores Registrados ({monitoresFiltrados.length})
          </h3>
          
          {monitoresFiltrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>👥</span>
              <p style={{ color: '#6b7280' }}>No se encontraron monitores</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {monitoresFiltrados.map(monitor => (
                <div
                  key={monitor.id}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: monitor.estado === 'pendiente_validacion' ? '#fef3c7' : 
                                   monitor.estado === 'validado' ? '#f0fdf4' : 
                                   monitor.estado === 'rechazado' ? '#fef2f2' : '#f9fafb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>
                        {monitor.nombreCompleto}
                      </h4>
                      <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Cédula: {monitor.cedula}</p>
                      <p style={{ color: '#6b7280', margin: '0 0 8px 0' }}>Entidad: {monitor.entidad}</p>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: getEstadoColor(monitor.estado) + '20',
                          color: getEstadoColor(monitor.estado)
                        }}>
                          {getEstadoLabel(monitor.estado)}
                        </span>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          backgroundColor: '#e5e7eb',
                          color: '#374151'
                        }}>
                          {monitor.tipoEntidad}
                        </span>
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        <div>Email: {monitor.email}</div>
                        <div>Teléfono: {monitor.telefono}</div>
                        <div>Fecha de registro: {monitor.fechaRegistro}</div>
                        {monitor.hojaVida && (
                          <div>📋 Hoja de vida: {monitor.hojaVida.nombre}</div>
                        )}
                        {monitor.documentosEntidad && monitor.documentosEntidad.length > 0 && (
                          <div>🏢 Documentos entidad: {monitor.documentosEntidad.length} archivo(s)</div>
                        )}
                        {monitor.certificaciones && monitor.certificaciones.length > 0 && (
                          <div>🏆 Certificaciones: {monitor.certificaciones.length} archivo(s)</div>
                        )}
                        {monitor.validadoPor && (
                          <div>Validado por: {monitor.validadoPor} el {monitor.fechaValidacion}</div>
                        )}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {monitor.estado === 'pendiente_validacion' && (
                        <>
                          <button
                            onClick={() => abrirModalValidacion(monitor)}
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
                            🔍 Validar
                          </button>
                        </>
                      )}
                      {monitor.estado === 'validado' && !monitor.activo && (
                        <button
                          onClick={() => validarMonitor(monitor, true)}
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
                          ✅ Activar
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

      {/* Modal de Validación */}
      {mostrarModalValidacion && monitorSeleccionado && (
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
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <h3 style={{ margin: '0 0 20px 0', color: '#1f2937', fontSize: '20px', fontWeight: 'bold' }}>
              🔍 Validar Monitor
            </h3>
            
            {/* Información del Monitor */}
            <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                Información del Monitor
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '14px' }}>
                <div><strong>Nombre:</strong> {monitorSeleccionado.nombreCompleto}</div>
                <div><strong>Cédula:</strong> {monitorSeleccionado.cedula}</div>
                <div><strong>Entidad:</strong> {monitorSeleccionado.entidad}</div>
                <div><strong>Tipo:</strong> {monitorSeleccionado.tipoEntidad}</div>
                <div><strong>Email:</strong> {monitorSeleccionado.email}</div>
                <div><strong>Teléfono:</strong> {monitorSeleccionado.telefono}</div>
                <div style={{ gridColumn: '1 / -1' }}><strong>Dirección:</strong> {monitorSeleccionado.direccion}</div>
                <div style={{ gridColumn: '1 / -1' }}><strong>Experiencia:</strong> {monitorSeleccionado.experiencia}</div>
                <div style={{ gridColumn: '1 / -1' }}><strong>Disponibilidad:</strong> {monitorSeleccionado.disponibilidad}</div>
                <div style={{ gridColumn: '1 / -1' }}><strong>Motivación:</strong> {monitorSeleccionado.motivacion}</div>
              </div>
            </div>

            {/* Documentos del Monitor */}
            <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '12px' }}>
                📄 Documentos del Monitor
              </h4>
              
              {/* Hoja de Vida */}
              {monitorSeleccionado.hojaVida && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>
                    📋 Hoja de Vida:
                  </div>
                  <div style={{ 
                    fontSize: '12px', 
                    color: '#6b7280', 
                    padding: '8px', 
                    backgroundColor: 'white', 
                    borderRadius: '4px', 
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => visualizarDocumento(monitorSeleccionado.hojaVida)}
                  >
                    <span>{monitorSeleccionado.hojaVida.nombre} ({(monitorSeleccionado.hojaVida.tamaño / 1024 / 1024).toFixed(2)} MB)</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          descargarDocumento(monitorSeleccionado.hojaVida);
                        }}
                        style={{
                          padding: '2px 6px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          fontSize: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        📥
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Documentos de Entidad */}
              {monitorSeleccionado.documentosEntidad && monitorSeleccionado.documentosEntidad.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>
                    🏢 Documentos de Entidad ({monitorSeleccionado.documentosEntidad.length}):
                  </div>
                  {monitorSeleccionado.documentosEntidad.map((doc, index) => (
                    <div key={index} style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      padding: '4px 8px', 
                      backgroundColor: 'white', 
                      borderRadius: '4px', 
                      border: '1px solid #e5e7eb', 
                      marginBottom: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => visualizarDocumento(doc)}
                    >
                      <span>{doc.nombre} ({(doc.tamaño / 1024 / 1024).toFixed(2)} MB)</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          descargarDocumento(doc);
                        }}
                        style={{
                          padding: '2px 6px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          fontSize: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        📥
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Certificaciones */}
              {monitorSeleccionado.certificaciones && monitorSeleccionado.certificaciones.length > 0 && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}>
                    🏆 Certificaciones ({monitorSeleccionado.certificaciones.length}):
                  </div>
                  {monitorSeleccionado.certificaciones.map((cert, index) => (
                    <div key={index} style={{ 
                      fontSize: '12px', 
                      color: '#6b7280', 
                      padding: '4px 8px', 
                      backgroundColor: 'white', 
                      borderRadius: '4px', 
                      border: '1px solid #e5e7eb', 
                      marginBottom: '4px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                    onClick={() => visualizarDocumento(cert)}
                    >
                      <span>{cert.nombre} ({(cert.tamaño / 1024 / 1024).toFixed(2)} MB)</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          descargarDocumento(cert);
                        }}
                        style={{
                          padding: '2px 6px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          fontSize: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        📥
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Mensaje si no hay documentos */}
              {(!monitorSeleccionado.hojaVida && (!monitorSeleccionado.documentosEntidad || monitorSeleccionado.documentosEntidad.length === 0)) && (
                <div style={{ fontSize: '12px', color: '#ef4444', fontStyle: 'italic' }}>
                  ⚠️ Este monitor no ha cargado los documentos requeridos
                </div>
              )}
            </div>

            {/* Observaciones */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#374151' }}>
                Observaciones
              </label>
              <textarea
                value={datosValidacion.observaciones}
                onChange={(e) => setDatosValidacion(prev => ({ ...prev, observaciones: e.target.value }))}
                placeholder="Ingresa observaciones sobre la validación..."
                rows={4}
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
                onClick={cerrarModal}
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
                onClick={() => validarMonitor(monitorSeleccionado, false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ❌ Rechazar
              </button>
              <button
                onClick={() => validarMonitor(monitorSeleccionado, true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ✅ Aprobar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para visualizar documentos */}
      {mostrarDocumento && documentoSeleccionado && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '90%',
            maxHeight: '90%',
            width: '800px',
            position: 'relative'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              borderBottom: '1px solid #e5e7eb',
              paddingBottom: '10px'
            }}>
              <h3 style={{ margin: 0, color: '#1f2937', fontSize: '18px', fontWeight: 'bold' }}>
                📄 {documentoSeleccionado.nombre}
              </h3>
              <button
                onClick={cerrarDocumento}
                style={{
                  padding: '8px 12px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                ❌ Cerrar
              </button>
            </div>
            
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '2px dashed #d1d5db'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                {documentoSeleccionado.nombre}
              </h4>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
                Tamaño: {(documentoSeleccionado.tamaño / 1024 / 1024).toFixed(2)} MB
              </p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '20px' }}>
                Para visualizar el contenido completo del documento, descárgalo haciendo clic en el botón de abajo.
              </p>
              <button
                onClick={() => descargarDocumento(documentoSeleccionado)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                📥 Descargar Documento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidarFuncionariosEntidades;
