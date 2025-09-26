import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import NotificacionesUsuario from './NotificacionesUsuario';
import registroService from '../../services/registroService';

const MenuPrincipal = () => {
  const { user, login, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegistroMode, setIsRegistroMode] = useState(false);
  const [mostrarSeleccionRol, setMostrarSeleccionRol] = useState(false);
  const [loginData, setLoginData] = useState({ 
    usuario: '', 
    contrasena: '',
    email: '',
    confirmarContrasena: '',
    nombre: '',
    rol: 'cliente',
    tipoDocumento: 'cc',
    numeroDocumento: ''
  });
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');

  const location = useLocation();
  const menuRef = useRef(null);

  // Función para cerrar el menú
  const cerrarMenu = () => {
    setIsMenuOpen(false);
  };

  // Efecto para cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        cerrarMenu();
      }
    };

    // Efecto para cerrar el menú al presionar Escape
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        cerrarMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Páginas públicas - Nueva clasificación organizada y atractiva
  const paginasPublicas = [
    // 01 - INSTITUCIONAL
    { name: 'Inicio', href: '/', icon: '🏠', category: '01 - Institucional', color: 'blue' },
    { name: 'Institucional', href: '/institucional', icon: '🏛️', category: '01 - Institucional', color: 'blue' },
    { name: 'Proyectos', href: '/proyectos', icon: '🏗️', category: '01 - Institucional', color: 'blue' },
    { name: 'Donaciones', href: '/donaciones', icon: '💰', category: '01 - Institucional', color: 'blue' },
    
    // 02 - JUSTICIA ORDINARIA
    { name: 'Justicia Civil', href: '/justicia-civil', icon: '⚖️', category: '02 - Justicia Ordinaria', color: 'red' },
    { name: 'Justicia Penal', href: '/justicia-penal', icon: '🔨', category: '02 - Justicia Ordinaria', color: 'red' },
    { name: 'Justicia Laboral', href: '/justicia-laboral', icon: '👷', category: '02 - Justicia Ordinaria', color: 'red' },
    { name: 'Justicia Administrativa', href: '/justicia-administrativa', icon: '🏛️', category: '02 - Justicia Ordinaria', color: 'red' },
    { name: 'Justicia de Familia', href: '/justicia-familia', icon: '👨‍👩‍👧‍👦', category: '02 - Justicia Ordinaria', color: 'red' },
    
    // 02B - JUSTICIA EXTRAORDINARIA
    { name: 'Justicia Constitucional', href: '/justicia-constitucional', icon: '👑', category: '02B - Justicia Extraordinaria', color: 'purple' },
    { name: 'Justicia Internacional', href: '/justicia-internacional', icon: '🌍', category: '02B - Justicia Extraordinaria', color: 'purple' },
    { name: 'Arbitraje', href: '/arbitraje', icon: '⚖️', category: '02B - Justicia Extraordinaria', color: 'purple' },
    { name: 'Conciliación', href: '/conciliacion', icon: '🤝', category: '02B - Justicia Extraordinaria', color: 'purple' },
    
    // 02C - ACCIONES CONSTITUCIONALES
    { name: 'Acción de Tutela', href: '/accion-tutela', icon: '🛡️', category: '02C - Acciones Constitucionales', color: 'blue' },
    { name: 'Acción de Cumplimiento', href: '/accion-cumplimiento', icon: '📋', category: '02C - Acciones Constitucionales', color: 'blue' },
    { name: 'Acción Popular', href: '/accion-popular', icon: '👥', category: '02C - Acciones Constitucionales', color: 'blue' },
    { name: 'Acción de Grupo', href: '/accion-grupo', icon: '👨‍👩‍👧‍👦', category: '02C - Acciones Constitucionales', color: 'blue' },
    { name: 'Demanda Jurídica', href: '/demanda-juridica', icon: '⚖️', category: '02C - Acciones Constitucionales', color: 'blue' },
    { name: 'Acción de Nulidad', href: '/accion-nulidad', icon: '❌', category: '02C - Acciones Constitucionales', color: 'blue' },
    { name: 'Acción de Reparación', href: '/accion-reparacion-directa', icon: '💰', category: '02C - Acciones Constitucionales', color: 'blue' },
    
    // 03 - PARTICIPACIÓN CIUDADANA
    { name: 'Consulta Popular', href: '/consulta-popular', icon: '🗳️', category: '03 - Participación Ciudadana', color: 'green' },
    { name: 'Referendo', href: '/referendo', icon: '📊', category: '03 - Participación Ciudadana', color: 'green' },
    { name: 'Plebiscito', href: '/plebiscito', icon: '🗳️', category: '03 - Participación Ciudadana', color: 'green' },
    { name: 'Manifiesto', href: '/manifiesto', icon: '📜', category: '03 - Participación Ciudadana', color: 'green' },
    
    // 04 - CONTROL SOCIAL
    { name: 'PQRSFD', href: '/pqrsfd', icon: '📝', category: '04 - Control Social', color: 'orange' },
    { name: 'Auditoría Forense', href: '/auditoria-forense', icon: '🔬', category: '04 - Control Social', color: 'orange' },
    { name: 'Monitor', href: '/monitor', icon: '📊', category: '04 - Control Social', color: 'orange' },
    
    // 05 - CONTROL TERRITORIAL
    { name: 'Consejo de Veeduría', href: '/consejo-veeduria-territorial', icon: '🏛️', category: '05 - Control Territorial', color: 'indigo' },
    { name: 'Control Minería Predios', href: '/control-mineria-predios', icon: '⛏️', category: '05 - Control Territorial', color: 'indigo' },
    { name: 'Control Instituciones', href: '/control-instituciones', icon: '🏢', category: '05 - Control Territorial', color: 'indigo' },
    { name: 'Control Regional', href: '/control-regional', icon: '🗺️', category: '05 - Control Territorial', color: 'indigo' },
    
    // 06 - MECANISMOS ÉTNICOS
    { name: 'Derechos Étnicos', href: '/derechos-etnicos', icon: '⚖️', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Consulta Previa Étnica', href: '/consulta-previa-etnica', icon: '🤝', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Territorios Ancestrales', href: '/territorios-ancestrales', icon: '🏔️', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Patrimonio Cultural', href: '/patrimonio-cultural', icon: '🏛️', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Mediación Intercultural', href: '/mediacion-intercultural', icon: '🤝', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Educación Propia', href: '/educacion-propia', icon: '📚', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Historia del Territorio', href: '/historia-territorio', icon: '📜', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Narraciones Étnicas', href: '/narraciones-etnicas', icon: '📖', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Planes Etnodesarrollo', href: '/planes-etnodesarrollo', icon: '🌿', category: '06 - Mecanismos Étnicos', color: 'purple' },
    { name: 'Planes Etnodesarrollo Avanzado', href: '/planes-etnodesarrollo-avanzado', icon: '🚀', category: '06 - Mecanismos Étnicos', color: 'purple' },
    
    // 07 - INNOVACIÓN TECNOLÓGICA
    { name: 'Consejo IA', href: '/consejo-ia', icon: '🤖', category: '07 - Innovación Tecnológica', color: 'purple' },
    { name: 'Consejo IA Avanzado', href: '/consejo-ia-avanzado', icon: '🧠', category: '07 - Innovación Tecnológica', color: 'purple' },
    { name: 'Mapa Interactivo', href: '/geo-dashboard', icon: '🗺️', category: '07 - Innovación Tecnológica', color: 'purple' },
    { name: 'Auditoría Forense', href: '/auditoria-forense', icon: '🔍', category: '07 - Innovación Tecnológica', color: 'purple' },
    { name: 'Manifiesto', href: '/manifiesto', icon: '📜', category: '07 - Innovación Tecnológica', color: 'purple' },
    { name: 'Monitor', href: '/monitor', icon: '📊', category: '07 - Innovación Tecnológica', color: 'purple' },
    
    // 08 - MEDICINA NATURAL
    { name: 'Medicina Natural', href: '/medicina-natural', icon: '🌿', category: '08 - Medicina Natural', color: 'green' }
  ];

  // Páginas compartidas - Sin sesión requerida (basado en carpeta: compartidas)
  const paginasCompartidas = [
    { name: 'Noticias', href: '/noticias', icon: '📰' },
    { name: 'Documentos', href: '/documentos', icon: '📄' },
    { name: 'Contacto', href: '/contacto', icon: '📞' },
    { name: 'Ayuda', href: '/ayuda', icon: '❓' },
    { name: 'Términos', href: '/terminos', icon: '📋' },
    { name: 'Convocatorias Públicas', href: '/convocatorias', icon: '📢' }
  ];

  // Obtener navegación según el rol del usuario (JERARQUÍA DE PERMISOS)
  const getNavegacionPorRol = () => {
    if (!user) return [];

    const navegacion = [];

    // NIVEL 1: CLIENTE - Acceso básico
    if (user.rol === 'cli') {
      navegacion.push(
        { name: 'Mi Dashboard', href: '/cliente/dashboard', icon: '📊', level: 1 },
        { name: 'Mis Veedurías', href: '/cliente/veedurias', icon: '📋', level: 1 },
        { name: 'Mis Donaciones', href: '/cliente/donaciones', icon: '💰', level: 1 },
        { name: 'Mis Tareas', href: '/cliente/tareas', icon: '✅', level: 1 }
      );
    }

    // NIVEL 2: OPERADOR - Acceso de cliente + operador
    if (user.rol === 'ope') {
      // Hereda funciones de cliente
      navegacion.push(
        { name: 'Mi Dashboard', href: '/cliente/dashboard', icon: '📊', level: 1 },
        { name: 'Mis Veedurías', href: '/cliente/veedurias', icon: '📋', level: 1 },
        { name: 'Mis Donaciones', href: '/cliente/donaciones', icon: '💰', level: 1 },
        { name: 'Mis Tareas', href: '/cliente/tareas', icon: '✅', level: 1 }
      );

      // Funciones específicas de operador
      navegacion.push(
        { name: '--- FUNCIONES DE OPERADOR ---', esSeparador: true, level: 2 },
        { name: 'Dashboard Operador', href: '/operador/dashboard', icon: '⚙️', level: 2 },
        { name: 'Gestionar Veedurías', href: '/operador/veedurias', icon: '📝', level: 2 },
        { name: 'Gestionar Tareas', href: '/operador/tareas', icon: '📋', level: 2 },
        { name: 'Gestionar Donaciones', href: '/operador/donaciones', icon: '💰', level: 2 },
        { name: 'Gestionar Archivos', href: '/operador/archivos', icon: '📁', level: 2 }
      );
    }

    // NIVEL 3: ADMINISTRADOR - Acceso completo
    if (user.rol === 'adm') {
      // Hereda funciones de cliente
      navegacion.push(
        { name: 'Mi Dashboard', href: '/cliente/dashboard', icon: '📊', level: 1 },
        { name: 'Mis Veedurías', href: '/cliente/veedurias', icon: '📋', level: 1 },
        { name: 'Mis Donaciones', href: '/cliente/donaciones', icon: '💰', level: 1 },
        { name: 'Mis Tareas', href: '/cliente/tareas', icon: '✅', level: 1 }
      );

      // Hereda funciones de operador
      navegacion.push(
        { name: '--- FUNCIONES DE OPERADOR ---', esSeparador: true, level: 2 },
        { name: 'Dashboard Operador', href: '/operador/dashboard', icon: '⚙️', level: 2 },
        { name: 'Gestionar Veedurías', href: '/operador/veedurias', icon: '📝', level: 2 },
        { name: 'Gestionar Tareas', href: '/operador/tareas', icon: '📋', level: 2 },
        { name: 'Gestionar Donaciones', href: '/operador/donaciones', icon: '💰', level: 2 },
        { name: 'Gestionar Archivos', href: '/operador/archivos', icon: '📁', level: 2 }
      );

      // Funciones específicas de administrador
      navegacion.push(
        { name: '--- FUNCIONES DE ADMINISTRADOR ---', esSeparador: true, level: 3 },
        { name: 'Dashboard Admin', href: '/admin/dashboard', icon: '👑', level: 3 },
        { name: 'Gestionar Usuarios', href: '/admin/usuarios', icon: '👥', level: 3 },
        { name: 'Gestionar Veedurías', href: '/admin/veedurias', icon: '📋', level: 3 },
        { name: 'Gestionar Donaciones', href: '/admin/donaciones', icon: '💰', level: 3 },
        { name: 'Gestionar Tareas', href: '/admin/tareas', icon: '✅', level: 3 },
        { name: 'Gestionar Archivos', href: '/admin/archivos', icon: '📁', level: 3 },
        { name: 'Gestionar Roles', href: '/admin/roles', icon: '🔐', level: 3 },
        { name: 'Configuraciones', href: '/admin/configuraciones', icon: '⚙️', level: 3 },
        { name: 'Logs del Sistema', href: '/admin/logs', icon: '📊', level: 3 },
        { name: 'Estadísticas', href: '/admin/estadisticas', icon: '📈', level: 3 }
      );
    }

    return navegacion;
  };

  const isActive = (path) => location.pathname === path;

  const handleSeleccionarRol = (rol) => {
    setLoginData({...loginData, rol: rol});
    setMostrarSeleccionRol(false);
    setIsRegistroMode(true);
    setIsLoginOpen(true);
  };

  const handleAbrirRegistro = () => {
    setMostrarSeleccionRol(true);
    setIsLoginOpen(false);
    setLoginError('');
    setLoginSuccess('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginSuccess('');
    
    try {
      if (isRegistroMode) {
        // Modo registro - Validaciones adicionales
        if (loginData.contrasena !== loginData.confirmarContrasena) {
          setLoginError('Las contraseñas no coinciden');
          return;
        }
        
        // Validar que todos los campos estén llenos
        if (!loginData.nombre || !loginData.email || !loginData.usuario || 
            !loginData.contrasena || !loginData.numeroDocumento) {
          setLoginError('Todos los campos son obligatorios');
          return;
        }
        
        const result = await registroService.registrar({
          nombre: loginData.nombre,
          email: loginData.email,
          usuario: loginData.usuario,
          contrasena: loginData.contrasena,
          rol: loginData.rol,
          tipoDocumento: loginData.tipoDocumento,
          numeroDocumento: loginData.numeroDocumento
        });
        
        if (result.success) {
          setLoginSuccess(result.message || 'Usuario registrado exitosamente. Ya puedes iniciar sesión.');
          setIsRegistroMode(false);
          setMostrarSeleccionRol(false);
          setLoginData({ 
            usuario: '', 
            contrasena: '',
            email: '',
            confirmarContrasena: '',
            nombre: '',
            rol: 'cliente',
            tipoDocumento: 'cc',
            numeroDocumento: ''
          });
        } else {
          setLoginError(result.message || 'Error al registrar usuario');
        }
      } else {
        // Modo login
        if (!loginData.usuario || !loginData.contrasena) {
          setLoginError('Usuario y contraseña son obligatorios');
          return;
        }
        
        const result = await login(loginData.usuario, loginData.contrasena);
        
        if (result.success) {
          setIsLoginOpen(false);
          setLoginData({ 
            usuario: '', 
            contrasena: '',
            email: '',
            confirmarContrasena: '',
            nombre: '',
            rol: 'cliente',
            tipoDocumento: 'cc',
            numeroDocumento: ''
          });
          setLoginError('');
        } else {
          setLoginError(result.error || 'Error al iniciar sesión');
        }
      }
    } catch (error) {
      console.error('Error en handleLogin:', error);
      
      if (error.message) {
        setLoginError(error.message);
      } else if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError('Error de conexión. Verifica tu conexión a internet e intenta nuevamente.');
      }
    }
  };

  const toggleRegistroMode = () => {
    if (!isRegistroMode) {
      // Si no está en modo registro, mostrar selección de rol
      setMostrarSeleccionRol(true);
      setIsLoginOpen(false);
    } else {
      // Si está en modo registro, volver a login
      setIsRegistroMode(false);
      setMostrarSeleccionRol(false);
      setIsLoginOpen(true);
    }
    setLoginError('');
    setLoginSuccess('');
    setLoginData({ 
      usuario: '', 
      contrasena: '',
      email: '',
      confirmarContrasena: '',
      nombre: '',
      rol: 'cliente',
      tipoDocumento: 'cc',
      numeroDocumento: ''
    });
  };

  const handleLogout = () => {
    logout();
    cerrarMenu();
  };

  const navegacionPorRol = getNavegacionPorRol();

  // Agrupar páginas públicas por categoría
  const paginasPorCategoria = paginasPublicas.reduce((acc, pagina) => {
    if (!acc[pagina.category]) {
      acc[pagina.category] = [];
    }
    acc[pagina.category].push(pagina);
    return acc;
  }, {});

  return (
    <>
      {/* Estilos CSS para animaciones y responsividad */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @keyframes slideUp {
            from {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
            to {
              opacity: 0;
              transform: translateY(-10px) scale(0.95);
            }
          }

          /* Responsividad para dispositivos móviles */
          @media (max-width: 768px) {
            .menu-dropdown {
              width: 95vw !important;
              max-width: 95vw !important;
              left: 2.5vw !important;
              padding: 12px !important;
            }
            
            .menu-button {
              padding: 8px 12px !important;
              font-size: 12px !important;
              min-width: 100px !important;
            }
            
            .logo-container {
              gap: 8px !important;
            }
            
            .logo-icon {
              width: 45px !important;
              height: 45px !important;
              font-size: 16px !important;
            }
            
            .logo-text h1 {
              font-size: 16px !important;
            }
            
            .logo-text p {
              font-size: 12px !important;
            }
          }

          @media (max-width: 480px) {
            .menu-dropdown {
              width: 98vw !important;
              max-width: 98vw !important;
              left: 1vw !important;
              padding: 10px !important;
            }
            
            .menu-button {
              padding: 6px 10px !important;
              font-size: 11px !important;
              min-width: 90px !important;
            }
            
            .logo-container {
              gap: 6px !important;
            }
            
            .logo-icon {
              width: 40px !important;
              height: 40px !important;
              font-size: 14px !important;
            }
            
            .logo-text h1 {
              font-size: 14px !important;
            }
            
            .logo-text p {
              font-size: 10px !important;
            }
          }
        `}
      </style>
      
      <header style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
        color: 'white',
        padding: '15px 0',
        position: 'relative',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        borderBottom: '3px solid #3498db'
      }}>
        <div style={{ 
          maxWidth: '100%', 
          margin: '0 auto', 
          padding: '0 15px',
          width: '100%'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            
            {/* Botón de Usuario/Menú */}
            <div style={{ 
              position: 'relative',
              zIndex: 1001,
              minWidth: 'fit-content'
            }} ref={menuRef}>
                <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-button"
                  style={{
                  background: user ? 
                    'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' : 
                    'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    color: 'white',
                    border: isMenuOpen ? '2px solid #f39c12' : '1px solid rgba(255,255,255,0.2)',
                    padding: '10px 15px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    boxShadow: isMenuOpen ? 
                      '0 6px 20px rgba(243, 156, 18, 0.4)' : 
                      '0 4px 15px rgba(52, 152, 219, 0.3)',
                    transition: 'all 0.3s ease',
                    transform: isMenuOpen ? 'translateY(-2px)' : 'translateY(0)',
                    whiteSpace: 'nowrap',
                    minWidth: '120px'
                  }}
                >
                {user ? `👤 ${user.nombre} ${isMenuOpen ? '▲' : '▼'}` : `📋 Menú ${isMenuOpen ? '▲' : '▼'}`}
                </button>

              {/* Dropdown del Menú - Directamente debajo del botón */}
              {isMenuOpen && (
            <div 
              className="menu-dropdown"
              style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              marginTop: '8px',
              backgroundColor: 'white',
              borderRadius: '10px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
              padding: '15px',
              width: 'max(300px, 100%)',
              minWidth: '280px',
              maxWidth: '90vw',
              zIndex: 1000,
              maxHeight: '75vh',
              overflowY: 'auto',
              border: '1px solid #e5e7eb',
              animation: 'slideDown 0.3s ease-out',
              transformOrigin: 'top'
            }}>
                  
                  {/* Botones de Login y Registro (si no está logueado) */}
              {!user && (
                    <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                  <button
                    onClick={() => {
                      setIsLoginOpen(true);
                          cerrarMenu();
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
                      color: 'white',
                          border: 'none',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                          fontSize: 'clamp(12px, 2.5vw, 14px)',
                      boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)',
                      transition: 'all 0.3s ease',
                      marginBottom: '6px'
                    }}
                  >
                    🔐 Iniciar Sesión
                  </button>
                  
                </div>
              )}

              {/* Información del Usuario (si está logueado) */}
              {user && (
                <div style={{
                      textAlign: 'center',
                      borderBottom: '2px solid #e5e7eb',
                      paddingBottom: '12px',
                      marginBottom: '15px'
                    }}>
                      <div style={{
                        width: '45px',
                        height: '45px',
                        background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '18px',
                        margin: '0 auto 10px',
                        color: 'white'
                      }}>
                        {user.rol === 'cli' && '👤'}
                        {user.rol === 'ope' && '⚙️'}
                        {user.rol === 'adm' && '👑'}
                      </div>
                      <h3 style={{
                        margin: '0 0 3px 0',
                        color: '#1f2937',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        fontWeight: 'bold'
                      }}>
                    {user.nom} {user.ape}
                      </h3>
                      <p style={{
                        margin: '0 0 3px 0',
                        color: '#6b7280',
                        fontSize: 'clamp(11px, 2.5vw, 13px)',
                        textTransform: 'capitalize'
                      }}>
                    {user.rol === 'cli' && 'Cliente'}
                    {user.rol === 'ope' && 'Operador'}
                    {user.rol === 'adm' && 'Administrador'}
                  </p>
                      <p style={{
                        margin: 0,
                        color: '#9ca3af',
                        fontSize: 'clamp(9px, 2vw, 11px)'
                      }}>
                        {user.rol === 'cli' && 'Nivel 1: Acceso básico'}
                        {user.rol === 'ope' && 'Nivel 2: Cliente + Operador'}
                        {user.rol === 'adm' && 'Nivel 3: Acceso completo'}
                  </p>
                </div>
              )}

              {/* Botón de Logout - Movido arriba */}
              {user && (
                    <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <NotificacionesUsuario />
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                    color: 'white',
                          border: 'none',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                    boxShadow: '0 3px 12px rgba(231, 76, 60, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  🚪 Cerrar Sesión
                </button>
                    </div>
                  )}

                  {/* Páginas Públicas por Categorías */}
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px',
                  paddingBottom: '5px',
                  borderBottom: '2px solid #3498db',
                  display: 'flex',
                  alignItems: 'center',
                      gap: '5px'
                }}>
                  🌐 Páginas Públicas
                    </h4>
                    
                    {Object.entries(paginasPorCategoria).map(([categoria, paginas]) => (
                      <div key={categoria} style={{ marginBottom: '10px' }}>
                        <h5 style={{
                          fontSize: 'clamp(9px, 2vw, 11px)',
                          fontWeight: 'bold',
                          color: '#6b7280',
                          marginBottom: '5px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                          {categoria}
                        </h5>
                        <div style={{ 
                          display: 'grid', 
                          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
                          gap: '4px',
                          marginBottom: '6px'
                        }}>
                          {paginas.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                              onClick={cerrarMenu}
                        style={{
                          display: 'flex',
                                flexDirection: 'column',
                          alignItems: 'center',
                                padding: '6px 3px',
                                borderRadius: '5px',
                          textDecoration: 'none',
                          color: isActive(item.href) ? '#ffffff' : '#374151',
                          backgroundColor: isActive(item.href) ? '#3b82f6' : '#f8fafc',
                                fontSize: 'clamp(8px, 1.8vw, 10px)',
                                fontWeight: '500',
                                border: '1px solid #e5e7eb',
                          transition: 'all 0.2s ease',
                                textAlign: 'center',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive(item.href)) {
                            e.target.style.backgroundColor = '#e5e7eb';
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive(item.href)) {
                            e.target.style.backgroundColor = '#f8fafc';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                              <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginBottom: '1px' }}>{item.icon}</span>
                              <span>{item.name}</span>
                      </Link>
                          ))}
                </div>
                      </div>
                    ))}
              </div>

                  {/* Páginas Compartidas */}
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{
                  fontSize: 'clamp(12px, 2.5vw, 14px)',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '10px',
                  paddingBottom: '5px',
                  borderBottom: '2px solid #9b59b6',
                  display: 'flex',
                  alignItems: 'center',
                      gap: '5px'
                }}>
                  🤝 Páginas Compartidas
                    </h4>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
                      gap: '4px' 
                    }}>
                      {paginasCompartidas.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                          onClick={cerrarMenu}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                            alignItems: 'center',
                            padding: '6px 4px',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        color: '#374151',
                        backgroundColor: '#f8fafc',
                            fontSize: 'clamp(8px, 1.8vw, 10px)',
                            fontWeight: '500',
                        border: '1px solid #e5e7eb',
                        transition: 'all 0.2s ease',
                            textAlign: 'center',
                        cursor: 'pointer'
                          }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#e5e7eb';
                          e.target.style.transform = 'translateY(-1px)';
                          e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = '#f8fafc';
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = 'none';
                        }}
                        >
                          <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginBottom: '1px' }}>{item.icon}</span>
                          <span>{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

                  {/* Navegación por Rol (Solo si está logueado) */}
                  {user && navegacionPorRol.length > 0 && (
                    <div style={{ marginBottom: '15px' }}>
                      <h4 style={{
                    fontSize: 'clamp(12px, 2.5vw, 14px)',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '10px',
                    paddingBottom: '5px',
                    borderBottom: '2px solid #e67e22',
                    display: 'flex',
                    alignItems: 'center',
                        gap: '5px'
                      }}>
                        {user.rol === 'cli' && '👤 Área Cliente (N1)'}
                        {user.rol === 'ope' && '⚙️ Área Operador (N2)'}
                        {user.rol === 'adm' && '👑 Área Admin (N3)'}
                      </h4>
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', 
                        gap: '4px' 
                      }}>
                        {navegacionPorRol.map((item, index) => {
                      if (item.esSeparador) {
                        return (
                          <div
                                key={index}
                            style={{
                              gridColumn: '1 / -1',
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px 6px 6px 6px',
                              margin: '6px 0 3px 0',
                                  borderTop: '2px solid #e5e7eb'
                                }}
                              >
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db', marginRight: '8px' }}></div>
                            <span style={{
                              fontWeight: 'bold',
                                  fontSize: 'clamp(8px, 1.8vw, 10px)',
                              color: '#6b7280',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              backgroundColor: '#f8fafc',
                              padding: '3px 8px',
                              borderRadius: '10px',
                                  border: '1px solid #e5e7eb'
                            }}>
                              {item.name.replace('--- ', '').replace(' ---', '')}
                            </span>
                                <div style={{ flex: 1, height: '1px', backgroundColor: '#d1d5db', marginLeft: '8px' }}></div>
                          </div>
                        );
                      }

                      return (
                        <Link
                              key={index}
                          to={item.href}
                              onClick={cerrarMenu}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                                alignItems: 'center',
                                padding: '6px 4px',
                            borderRadius: '5px',
                            textDecoration: 'none',
                            color: '#374151',
                                backgroundColor: item.level === 3 ? '#fef3c7' : item.level === 2 ? '#dbeafe' : '#f8fafc',
                                fontSize: 'clamp(8px, 1.8vw, 10px)',
                                fontWeight: '500',
                                border: `1px solid ${item.level === 3 ? '#fcd34d' : item.level === 2 ? '#93c5fd' : '#e5e7eb'}`,
                            transition: 'all 0.2s ease',
                                textAlign: 'center',
                            cursor: 'pointer'
                              }}
                            onMouseEnter={(e) => {
                              const baseColor = item.level === 3 ? '#fde68a' : item.level === 2 ? '#bfdbfe' : '#e5e7eb';
                              e.target.style.backgroundColor = baseColor;
                              e.target.style.transform = 'translateY(-1px)';
                              e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                              const originalColor = item.level === 3 ? '#fef3c7' : item.level === 2 ? '#dbeafe' : '#f8fafc';
                              e.target.style.backgroundColor = originalColor;
                              e.target.style.transform = 'translateY(0)';
                              e.target.style.boxShadow = 'none';
                            }}
                            >
                              <span style={{ fontSize: 'clamp(10px, 2vw, 12px)', marginBottom: '1px' }}>{item.icon}</span>
                              <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

                </div>
              )}
            </div>

            {/* Logo */}
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                <div className="logo-container" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 2vw, 15px)' }}>
            <div className="logo-icon" style={{
                    width: 'clamp(50px, 8vw, 70px)',
                    height: 'clamp(50px, 8vw, 70px)',
                    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    borderRadius: 'clamp(10px, 2vw, 15px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(18px, 4vw, 28px)',
                    fontWeight: 'bold',
                    boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}>
                    CSDT
                  </div>
                  <div className="logo-text">
                    <h1 style={{ 
                      margin: 0, 
                      fontSize: 'clamp(14px, 3vw, 22px)', 
                      fontWeight: 'bold',
                      lineHeight: '1.2'
                    }}>
                      CONSEJO SOCIAL DE VEEDURÍA
                    </h1>
                    <p style={{ 
                      margin: 0, 
                      fontSize: 'clamp(10px, 2vw, 15px)', 
                      opacity: 0.9,
                      lineHeight: '1.2'
                    }}>
                      Y DESARROLLO TERRITORIAL
                    </p>
                  </div>
                </div>
                    </Link>
            </div>

            {/* Espacio vacío para balance */}
            <div style={{ width: 'clamp(80px, 15vw, 120px)' }}></div>
          </div>
        </div>
      </header>

      {/* Modal de Selección de Rol */}
      {mostrarSeleccionRol && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: 'rgba(0, 0, 0, 0.3) 0px 15px 50px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '30px'
            }}>
              <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px', fontWeight: 'bold' }}>
                Selecciona tu Tipo de Usuario
              </h2>
              <button
                onClick={() => {
                  setMostrarSeleccionRol(false);
                  setIsLoginOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Botón Cliente */}
              <button
                onClick={() => handleSeleccionarRol('cli')}
                  style={{
                  padding: '20px',
                  border: '2px solid #3498db',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>👤</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '18px', marginBottom: '5px' }}>Cliente</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      Acceso básico para consultas y solicitudes
              </div>
                  </div>
                </div>
              </button>

              {/* Botón Operador */}
              <button
                onClick={() => handleSeleccionarRol('ope')}
                  style={{
                  padding: '20px',
                  border: '2px solid #e67e22',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #e67e22 0%, #d35400 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(230, 126, 34, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(230, 126, 34, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(230, 126, 34, 0.3)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>⚙️</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '18px', marginBottom: '5px' }}>Operador</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      Gestión de procesos y atención al cliente
              </div>
                </div>
                </div>
              </button>

              {/* Botón Administrador */}
                <button
                onClick={() => handleSeleccionarRol('adm')}
                  style={{
                  padding: '20px',
                  border: '2px solid #8e44ad',
                  borderRadius: '15px',
                  background: 'linear-gradient(135deg, #8e44ad 0%, #9b59b6 100%)',
                  color: 'white',
                    cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(142, 68, 173, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(142, 68, 173, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(142, 68, 173, 0.3)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '24px' }}>👑</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '18px', marginBottom: '5px' }}>Administrador</div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>
                      Control total del sistema y gestión de usuarios
                    </div>
                  </div>
                </div>
                </button>
            </div>

            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                onClick={() => {
                  setMostrarSeleccionRol(false);
                  setIsLoginOpen(false);
                }}
                  style={{
                  background: 'none',
                    border: 'none',
                  color: '#6b7280',
                    cursor: 'pointer',
                  fontSize: '14px',
                  textDecoration: 'underline'
                  }}
                >
                Cancelar
                </button>
              </div>
          </div>
        </div>
      )}




      {/* Modal de Login */}
      {isLoginOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 15px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0, color: '#2c3e50', fontSize: '24px', fontWeight: 'bold' }}>
                {isRegistroMode ? `Registrarse como ${loginData.rol.charAt(0).toUpperCase() + loginData.rol.slice(1)}` : 'Iniciar Sesión'}
              </h2>
              <button
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsRegistroMode(false);
                  setMostrarSeleccionRol(false);
                  setLoginError('');
                  setLoginSuccess('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {/* Campos de registro (solo en modo registro) */}
              {isRegistroMode && (
                <>
                  {/* Rol seleccionado - solo mostrar información */}
                  <div style={{
                    padding: '12px 15px',
                    backgroundColor: loginData.rol === 'cliente' ? '#e3f2fd' : 
                                   loginData.rol === 'operador' ? '#fff3e0' : '#f3e5f5',
                    border: `2px solid ${loginData.rol === 'cliente' ? '#3498db' : 
                                       loginData.rol === 'operador' ? '#e67e22' : '#8e44ad'}`,
                    borderRadius: '10px',
                    fontSize: '14px',
                    color: '#2c3e50',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <span style={{ marginRight: '10px' }}>
                        {loginData.rol === 'cliente' ? '👤' : 
                         loginData.rol === 'operador' ? '⚙️' : '👑'}
                      </span>
                      Registrándose como: {loginData.rol.charAt(0).toUpperCase() + loginData.rol.slice(1)}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegistroMode(false);
                        setMostrarSeleccionRol(true);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        fontSize: '12px',
                        textDecoration: 'underline',
                        padding: '5px'
                      }}
                    >
                      Cambiar
                    </button>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                      Nombre Completo *
                    </label>
                  <input
                    type="text"
                      value={loginData.nombre}
                      onChange={(e) => setLoginData({...loginData, nombre: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                    placeholder="Ingresa tu nombre completo"
                      required={isRegistroMode}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                    placeholder="Ingresa tu email"
                      required={isRegistroMode}
                  />
                </div>


                  {/* Documento de Identidad */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '15px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                        Tipo Doc. *
                  </label>
                  <select
                        value={loginData.tipoDocumento}
                        onChange={(e) => setLoginData({...loginData, tipoDocumento: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                        required={isRegistroMode}
                      >
                        <option value="cc">Cédula de Ciudadanía</option>
                        <option value="ce">Cédula de Extranjería</option>
                        <option value="ti">Tarjeta de Identidad</option>
                        <option value="pp">Pasaporte</option>
                        <option value="nit">NIT</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                        Número Doc. *
                  </label>
                  <input
                    type="text"
                        value={loginData.numeroDocumento}
                        onChange={(e) => setLoginData({...loginData, numeroDocumento: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                    placeholder="Número de documento"
                        required={isRegistroMode}
                  />
                </div>
                  </div>
                </>
              )}

                <div>
                  <label style={{
                    display: 'block',
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    marginBottom: '8px',
                    fontSize: '14px'
                  }}>
                  Usuario *
                  </label>
                  <input
                  type="text"
                  value={loginData.usuario}
                  onChange={(e) => setLoginData({...loginData, usuario: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '2px solid #bdc3c7',
                      borderRadius: '10px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f8f9fa'
                    }}
                  placeholder="Ingresa tu usuario"
                  required
                />
                {!isRegistroMode && (
                  <div style={{ fontSize: '11px', color: '#6b7280', margin: '3px 0 0 0' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>USUARIOS DE PRUEBA CORRECTOS:</div>
                    <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
                      <div>👤 Cliente: cliente@ejemplo.com</div>
                      <div>👨‍💻 Operador: operador@ejemplo.com</div>
                      <div>👨‍💼 Administrador: admin@ejemplo.com</div>
                      <div>👨‍💼 Admin Principal: esteban.41m@gmail.com</div>
                      <div>👑 Super Admin: superadmin@ejemplo.com</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  color: '#2c3e50',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}>
                  Contraseña *
                </label>
                <input
                  type="password"
                  value={loginData.contrasena}
                  onChange={(e) => setLoginData({...loginData, contrasena: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '2px solid #bdc3c7',
                    borderRadius: '10px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#f8f9fa'
                  }}
                  placeholder="Ingresa tu contraseña"
                  required
                />
                {!isRegistroMode && (
                  <div style={{ fontSize: '11px', color: '#6b7280', margin: '3px 0 0 0' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>CONTRASEÑAS DE PRUEBA:</div>
                    <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
                      <div>👤 Cliente: cliente123</div>
                      <div>👨‍💻 Operador: operador123</div>
                      <div>👨‍💼 Administrador: admin123</div>
                      <div>👨‍💼 Admin Principal: password123</div>
                      <div>👑 Super Admin: superadmin123</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirmar contraseña (solo en modo registro) */}
              {isRegistroMode && (
                  <div>
                    <label style={{
                      display: 'block',
                      fontWeight: 'bold',
                      color: '#2c3e50',
                      marginBottom: '8px',
                      fontSize: '14px'
                    }}>
                    Confirmar Contraseña *
                    </label>
                  <input
                    type="password"
                    value={loginData.confirmarContrasena}
                    onChange={(e) => setLoginData({...loginData, confirmarContrasena: e.target.value})}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        border: '2px solid #bdc3c7',
                        borderRadius: '10px',
                        fontSize: '14px',
                        outline: 'none',
                      backgroundColor: '#f8f9fa'
                      }}
                    placeholder="Confirma tu contraseña"
                    required={isRegistroMode}
                    />
                  </div>
              )}

              {loginError && (
                <div style={{
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#dc2626',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  {loginError}
                </div>
              )}

              {loginSuccess && (
                <div style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#166534',
                  padding: '10px',
                  borderRadius: '6px',
                  fontSize: '13px'
                }}>
                  {loginSuccess}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoginOpen(false);
                    setIsRegistroMode(false);
                    setLoginError('');
                    setLoginSuccess('');
                  }}
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    border: '2px solid #bdc3c7',
                    borderRadius: '10px',
                    background: 'white',
                    color: '#2c3e50',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    border: 'none',
                    borderRadius: '10px',
                    background: isRegistroMode ? 
                      'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' : 
                      'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    boxShadow: isRegistroMode ? 
                      '0 4px 15px rgba(39, 174, 96, 0.3)' : 
                      '0 4px 15px rgba(52, 152, 219, 0.3)'
                  }}
                >
                  {isRegistroMode ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
              </div>

              {/* Enlace para cambiar modo */}
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                {isRegistroMode ? (
                  <>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                      ¿Ya tienes cuenta?{' '}
                    </span>
                    <button
                      type="button"
                      onClick={toggleRegistroMode}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textDecoration: 'underline'
                      }}
                    >
                      Iniciar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>
                      ¿No tienes cuenta?{' '}
                    </span>
                    <button
                      type="button"
                      onClick={handleAbrirRegistro}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#3498db',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textDecoration: 'underline'
                  }}
                >
                  Registrarse
                </button>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      )}


    </>
  );
};

export default MenuPrincipal;
