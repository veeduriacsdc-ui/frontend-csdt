import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import DiagnosticoConexion from '../../components/compartidas/DiagnosticoConexion';

const MantenimientoSistema = () => {
  const { user } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [permisosVista, setPermisosVista] = useState([]);
  const [estadisticas, setEstadisticas] = useState({
    tot_usu: 0,
    usu_vet: 0,
    usu_act: 0,
    tot_perm: 0,
    perm_act: 0
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = () => {
    try {
      // Cargar usuarios
      const usuariosData = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
      setUsuarios(usuariosData);

      // Cargar permisos
      const permisosData = JSON.parse(localStorage.getItem('permisosVista') || '[]');
      setPermisosVista(permisosData);

      // Calcular estadísticas
      const usuariosVetados = usuariosData.filter(u => u.estadoVeto !== 'activo').length;
      const usuariosActivos = usuariosData.filter(u => u.estadoVeto === 'activo').length;
      const permisosActivos = permisosData.filter(p => p.estado === 'activo').length;

      setEstadisticas({
        tot_usu: usuariosData.length,
        usu_vet: usuariosVetados,
        usu_act: usuariosActivos,
        tot_perm: permisosData.length,
        perm_act: permisosActivos
      });
    } catch (error) {
      console.error('Error cargando datos:', error);
    }
  };

  // Función para liberar a todos los usuarios vetados
  const liberarTodosVetados = () => {
    if (!user || (user.rol !== 'administrador' && user.rol !== 'administrador_general')) {
      alert('Solo los administradores pueden realizar esta acción');
      return;
    }

    const confirmacion = window.confirm(
      '¿Está seguro de liberar a TODOS los usuarios vetados?\n\n' +
      'Esto incluye:\n' +
      '• Usuarios vetados temporalmente\n' +
      '• Usuarios vetados por tiempo\n' +
      '• Usuarios vetados indefinidamente\n\n' +
      'Esta acción no se puede deshacer.'
    );

    if (!confirmacion) return;

    try {
      const usuariosActualizados = usuarios.map(u => {
        if (u.estadoVeto !== 'activo' && u.rol !== 'administrador_general') {
          return {
            ...u,
            estadoVeto: 'activo',
            fechaVetoInicio: null,
            fechaVetoFin: null,
            motivoVeto: null,
            observacionesVeto: null,
            vetadoPor: null,
            fechaVeto: null
          };
        }
        return u;
      });

      setUsuarios(usuariosActualizados);
      localStorage.setItem('registrosUsuarios', JSON.stringify(usuariosActualizados));
      
      const usuariosLiberados = usuariosActualizados.filter(u => u.estadoVeto === 'activo' && u.rol !== 'administrador_general').length;
      alert(`✅ ${usuariosLiberados} usuarios han sido liberados exitosamente`);
      
      // Recargar datos
      cargarDatos();
    } catch (error) {
      console.error('Error liberando usuarios:', error);
      alert('Error al liberar usuarios');
    }
  };

  // Función para dar permisos de vista general
  const darPermisosVistaGeneral = () => {
    if (!user || (user.rol !== 'administrador' && user.rol !== 'administrador_general')) {
      alert('Solo los administradores pueden realizar esta acción');
      return;
    }

    const confirmacion = window.confirm(
      '¿Está seguro de dar permisos de VISTA GENERAL a TODOS los usuarios?\n\n' +
      'Esto otorgará permisos de "Ver" a todas las páginas del sistema para:\n' +
      '• Todos los clientes\n' +
      '• Todos los operadores\n' +
      '• Todos los administradores\n\n' +
      'Esta acción es útil para mantenimiento del sistema.'
    );

    if (!confirmacion) return;

    try {
      const todasLasPaginas = [
        { id: 'inicio', nombre: 'Inicio', url: '/' },
        { id: 'institucional', nombre: 'Institucional', url: '/institucional' },
        { id: 'accion-tutela', nombre: 'Acción de Tutela', url: '/accion-tutela' },
        { id: 'accion-popular', nombre: 'Acción Popular', url: '/accion-popular' },
        { id: 'accion-cumplimiento', nombre: 'Acción de Cumplimiento', url: '/accion-cumplimiento' },
        { id: 'derecho-peticion', nombre: 'Derecho de Petición', url: '/derecho-peticion' },
        { id: 'habeas-corpus', nombre: 'Habeas Corpus', url: '/habeas-corpus' },
        { id: 'habeas-data', nombre: 'Habeas Data', url: '/habeas-data' },
        { id: 'consejo-veeduria', nombre: 'Consejo de Veeduría', url: '/consejo-veeduria' },
        { id: 'monitor', nombre: 'Monitor', url: '/monitor' },
        { id: 'mapa-interactivo', nombre: 'Mapa Interactivo', url: '/mapa-interactivo' },
        { id: 'consejo-ia', nombre: 'Consejo IA', url: '/consejo-ia' },
        { id: 'convocatorias', nombre: 'Convocatorias Públicas', url: '/convocatorias' }
      ];

      const permisosActualizados = [...permisosVista];
      let usuariosProcesados = 0;

      usuarios.forEach(usuario => {
        if (usuario.rol !== 'administrador_general') {
          todasLasPaginas.forEach(pagina => {
            const permisoExistente = permisosActualizados.find(p => 
              p.usuarioId === usuario.id && p.pagina === pagina.id
            );

            if (!permisoExistente) {
              permisosActualizados.push({
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                usuarioId: usuario.id,
                pagina: pagina.id,
                tipoAcceso: 'ver',
                fechaInicio: new Date().toISOString().split('T')[0],
                fechaFin: null,
                motivo: 'Permisos de vista general para mantenimiento',
                observaciones: 'Otorgado automáticamente para mantenimiento del sistema',
                estado: 'activo',
                fechaCreacion: new Date().toISOString()
              });
            }
          });
          usuariosProcesados++;
        }
      });

      setPermisosVista(permisosActualizados);
      localStorage.setItem('permisosVista', JSON.stringify(permisosActualizados));
      
      alert(`✅ Permisos de vista general otorgados a ${usuariosProcesados} usuarios exitosamente`);
      
      // Recargar datos
      cargarDatos();
    } catch (error) {
      console.error('Error otorgando permisos generales:', error);
      alert('Error al otorgar permisos generales');
    }
  };

  // Función para limpiar datos de prueba
  const limpiarDatosPrueba = () => {
    if (!user || (user.rol !== 'administrador' && user.rol !== 'administrador_general')) {
      alert('Solo los administradores pueden realizar esta acción');
      return;
    }

    const confirmacion = window.confirm(
      '¿Está seguro de limpiar TODOS los datos de prueba?\n\n' +
      'Esto eliminará:\n' +
      '• Todos los usuarios de prueba\n' +
      '• Todos los permisos de prueba\n' +
      '• Todas las notificaciones\n\n' +
      'Esta acción no se puede deshacer.'
    );

    if (!confirmacion) return;

    try {
      localStorage.removeItem('registrosUsuarios');
      localStorage.removeItem('permisosVista');
      localStorage.removeItem('notificacionesUsuarios');
      
      setUsuarios([]);
      setPermisosVista([]);
      setEstadisticas({
        totalUsuarios: 0,
        usuariosVetados: 0,
        usuariosActivos: 0,
        totalPermisos: 0,
        permisosActivos: 0
      });
      
      alert('✅ Datos de prueba eliminados exitosamente');
    } catch (error) {
      console.error('Error limpiando datos:', error);
      alert('Error al limpiar datos');
    }
  };

  // Función para exportar datos
  const exportarDatos = () => {
    try {
      const datos = {
        usuarios,
        permisosVista,
        estadisticas,
        fechaExportacion: new Date().toISOString()
      };

      const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mantenimiento-sistema-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      alert('✅ Datos exportados exitosamente');
    } catch (error) {
      console.error('Error exportando datos:', error);
      alert('Error al exportar datos');
    }
  };

  if (!user || (user.rol !== 'administrador' && user.rol !== 'administrador_general')) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Acceso Denegado</h2>
        <p>Solo los administradores pueden acceder a esta página.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#1f2937', marginBottom: '8px' }}>
          🔧 Mantenimiento del Sistema
        </h1>
        <p style={{ color: '#6b7280', fontSize: '16px' }}>
          Herramientas de administración para mantenimiento y mejoras del sistema
        </p>
      </div>

      {/* Diagnóstico de Conexión */}
      <div style={{ marginBottom: '30px' }}>
        <DiagnosticoConexion />
      </div>

      {/* Estadísticas */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#f8fafc',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
            {estadisticas.totalUsuarios}
          </div>
          <div style={{ color: '#6b7280' }}>Total Usuarios</div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#fef2f2',
          borderRadius: '12px',
          border: '1px solid #fecaca',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚫</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626' }}>
            {estadisticas.usuariosVetados}
          </div>
          <div style={{ color: '#6b7280' }}>Usuarios Vetados</div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#f0fdf4',
          borderRadius: '12px',
          border: '1px solid #bbf7d0',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#16a34a' }}>
            {estadisticas.usuariosActivos}
          </div>
          <div style={{ color: '#6b7280' }}>Usuarios Activos</div>
        </div>

        <div style={{
          padding: '20px',
          backgroundColor: '#eff6ff',
          borderRadius: '12px',
          border: '1px solid #bfdbfe',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔐</div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb' }}>
            {estadisticas.totalPermisos}
          </div>
          <div style={{ color: '#6b7280' }}>Total Permisos</div>
        </div>
      </div>

      {/* Herramientas de Mantenimiento */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        marginBottom: '30px'
      }}>
        <h2 style={{ color: '#1f2937', marginBottom: '20px' }}>
          🛠️ Herramientas de Mantenimiento
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Liberar Usuarios Vetados */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f0fdf4',
            borderRadius: '8px',
            border: '1px solid #bbf7d0'
          }}>
            <h3 style={{ color: '#16a34a', marginBottom: '12px' }}>
              🔓 Liberar Usuarios Vetados
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Libera a todos los usuarios que estén vetados (temporal, por tiempo o indefinido)
            </p>
            <button
              onClick={liberarTodosVetados}
              style={{
                padding: '12px 20px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Liberar Todos los Vetados
            </button>
          </div>

          {/* Permisos Vista General */}
          <div style={{
            padding: '20px',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            border: '1px solid #bfdbfe'
          }}>
            <h3 style={{ color: '#2563eb', marginBottom: '12px' }}>
              👁️ Permisos Vista General
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Otorga permisos de vista a todas las páginas para todos los usuarios
            </p>
            <button
              onClick={darPermisosVistaGeneral}
              style={{
                padding: '12px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Otorgar Permisos Generales
            </button>
          </div>

          {/* Limpiar Datos */}
          <div style={{
            padding: '20px',
            backgroundColor: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}>
            <h3 style={{ color: '#dc2626', marginBottom: '12px' }}>
              🗑️ Limpiar Datos de Prueba
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Elimina todos los datos de prueba del sistema
            </p>
            <button
              onClick={limpiarDatosPrueba}
              style={{
                padding: '12px 20px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Limpiar Datos
            </button>
          </div>

          {/* Exportar Datos */}
          <div style={{
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#374151', marginBottom: '12px' }}>
              📤 Exportar Datos
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '14px' }}>
              Exporta todos los datos del sistema para respaldo
            </p>
            <button
              onClick={exportarDatos}
              style={{
                padding: '12px 20px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: 'pointer',
                width: '100%'
              }}
            >
              Exportar Datos
            </button>
          </div>
        </div>
      </div>

      {/* Información del Sistema */}
      <div style={{
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>
          ℹ️ Información del Sistema
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div>
            <strong>Versión:</strong> 1.0.0
          </div>
          <div>
            <strong>Última Actualización:</strong> {new Date().toLocaleDateString('es-CO')}
          </div>
          <div>
            <strong>Administrador:</strong> {user.nombre}
          </div>
          <div>
            <strong>Rol:</strong> {user.rol === 'administrador_general' ? 'Administrador General' : 'Administrador'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MantenimientoSistema;
