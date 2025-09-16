import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulación de base de datos de usuarios
  const usuarios = [
    {
      id: 1,
      usuario: 'adming',
      contrasena: 'adming1234',
      nombre: 'Administrador General CSDT',
      rol: 'administrador_general',
      nivelAcceso: 4,
      permisos: {
        publicas: true,
        cliente: true,
        operador: true,
        administrador: true,
        administrador_general: true,
        control_total: true,
        validar_funcionarios: true,
        gestionar_roles: true,
        control_permisos: true,
        mantenimiento_sistema: true
      }
    },
    {
      id: 2,
      usuario: 'admin',
      contrasena: 'admin123',
      nombre: 'Administrador CSDT',
      rol: 'administrador',
      nivelAcceso: 3,
      permisos: {
        publicas: true,
        cliente: true,
        operador: true,
        administrador: true,
      }
    },
    {
      id: 3,
      usuario: 'operador',
      contrasena: 'operador123',
      nombre: 'Operador CSDT',
      rol: 'operador',
      nivelAcceso: 2,
      permisos: {
        publicas: true,
        cliente: true,
        operador: true,
        administrador: false
      }
    },
    {
      id: 4,
      usuario: 'cliente',
      contrasena: 'cliente123',
      nombre: 'Cliente CSDT',
      rol: 'cliente',
      nivelAcceso: 1,
      permisos: {
        publicas: true,
        cliente: true,
        operador: false,
        administrador: false
      }
    }
  ];

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('csdt_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    // Inicializar permisos para administrador general
    const permisosExistentes = localStorage.getItem('permisosVista');
    if (!permisosExistentes) {
      const permisosIniciales = [
        {
          id: 1,
          usuarioId: 1, // ID del administrador general
          pagina: 'Validar Funcionarios y Entidades',
          tipoAcceso: 'ver',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        },
        {
          id: 2,
          usuarioId: 1,
          pagina: 'Validar Funcionarios y Entidades',
          tipoAcceso: 'editar',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        },
        {
          id: 3,
          usuarioId: 1,
          pagina: 'Validar Funcionarios y Entidades',
          tipoAcceso: 'modificar',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        },
        {
          id: 4,
          usuarioId: 1,
          pagina: 'Gestionar Roles y Niveles',
          tipoAcceso: 'ver',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        },
        {
          id: 5,
          usuarioId: 1,
          pagina: 'Gestionar Roles y Niveles',
          tipoAcceso: 'editar',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        },
        {
          id: 6,
          usuarioId: 1,
          pagina: 'Control de Permisos de Vista',
          tipoAcceso: 'ver',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        },
        {
          id: 7,
          usuarioId: 1,
          pagina: 'Control de Permisos de Vista',
          tipoAcceso: 'editar',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        },
        {
          id: 8,
          usuarioId: 1,
          pagina: 'Mantenimiento del Sistema',
          tipoAcceso: 'ver',
          fechaInicio: new Date().toISOString().split('T')[0],
          fechaFin: null,
          otorgadoPor: 'sistema',
          activo: true
        }
      ];
      localStorage.setItem('permisosVista', JSON.stringify(permisosIniciales));
    }

    // Crear datos de prueba para monitores si no existen
    const monitoresExistentes = localStorage.getItem('monitoresCSDT');
    if (!monitoresExistentes) {
      const monitoresPrueba = [
        {
          id: 1,
          cedula: '1234567890',
          nombreCompleto: 'María González Pérez',
          entidad: 'ONG Defensa Ciudadana',
          tipoEntidad: 'ONG',
          telefono: '3001234567',
          email: 'maria.gonzalez@ongdefensa.org',
          direccion: 'Calle 123 #45-67, Medellín',
          experiencia: '5 años en veeduría ciudadana y control social',
          disponibilidad: 'Tiempo completo',
          motivacion: 'Contribuir al fortalecimiento de la democracia y el control social en mi comunidad',
          documentosEntidad: [
            {
              id: 1,
              nombre: 'certificado_existencia_ong.pdf',
              tipo: 'application/pdf',
              tamaño: 1024000,
              fecha: '2024-01-15',
              url: '#'
            }
          ],
          hojaVida: {
            id: 2,
            nombre: 'hoja_vida_maria_gonzalez.pdf',
            tipo: 'application/pdf',
            tamaño: 2048000,
            fecha: '2024-01-15',
            url: '#'
          },
          certificaciones: [
            {
              id: 3,
              nombre: 'certificado_veeduria_ciudadana.pdf',
              tipo: 'application/pdf',
              tamaño: 512000,
              fecha: '2024-01-10',
              url: '#'
            }
          ],
          referencias: [],
          estado: 'pendiente_validacion',
          fechaRegistro: '2024-01-15',
          validadoPor: null,
          fechaValidacion: null,
          observaciones: '',
          activo: false
        },
        {
          id: 2,
          cedula: '0987654321',
          nombreCompleto: 'Carlos Rodríguez Silva',
          entidad: 'Defensoría del Pueblo - Antioquia',
          tipoEntidad: 'Defensoría del Pueblo',
          telefono: '3009876543',
          email: 'carlos.rodriguez@defensoria.gov.co',
          direccion: 'Carrera 50 #45-23, Medellín',
          experiencia: '8 años en defensa de derechos humanos y veeduría',
          disponibilidad: 'Horario flexible',
          motivacion: 'Apoyar los procesos de veeduría ciudadana desde mi experiencia en derechos humanos',
          documentosEntidad: [
            {
              id: 4,
              nombre: 'carta_vinculacion_defensoria.pdf',
              tipo: 'application/pdf',
              tamaño: 768000,
              fecha: '2024-01-20',
              url: '#'
            }
          ],
          hojaVida: {
            id: 5,
            nombre: 'hoja_vida_carlos_rodriguez.pdf',
            tipo: 'application/pdf',
            tamaño: 1536000,
            fecha: '2024-01-20',
            url: '#'
          },
          certificaciones: [
            {
              id: 6,
              nombre: 'diploma_derechos_humanos.pdf',
              tipo: 'application/pdf',
              tamaño: 1024000,
              fecha: '2024-01-18',
              url: '#'
            }
          ],
          referencias: [],
          estado: 'pendiente_validacion',
          fechaRegistro: '2024-01-20',
          validadoPor: null,
          fechaValidacion: null,
          observaciones: '',
          activo: false
        }
      ];
      localStorage.setItem('monitoresCSDT', JSON.stringify(monitoresPrueba));
    }
    
    setLoading(false);
  }, []);

  const login = async (usuario, contrasena) => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Buscar usuario en la "base de datos"
    const usuarioEncontrado = usuarios.find(
      u => u.usuario === usuario && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      const userData = {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        rol: usuarioEncontrado.rol,
        permisos: usuarioEncontrado.permisos
      };
      
      setUser(userData);
      localStorage.setItem('csdt_user', JSON.stringify(userData));
      setLoading(false);
      return { success: true, user: userData };
    } else {
      setLoading(false);
      return { success: false, error: 'Credenciales incorrectas' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('csdt_user');
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Administrador General tiene todos los permisos
    if (user.usuario === 'adming') {
      return true;
    }
    
    return user.permisos[permission] || false;
  };

  const isAdmin = () => {
    return user && (user.rol === 'administrador' || user.rol === 'administrador_general');
  };

  const isAdminGeneral = () => {
    return user && user.rol === 'administrador_general';
  };

  const isOperador = () => {
    return user && (user.rol === 'operador' || user.rol === 'administrador' || user.rol === 'administrador_general');
  };

  const isCliente = () => {
    return user && (user.rol === 'cliente' || user.rol === 'operador' || user.rol === 'administrador' || user.rol === 'administrador_general');
  };

  const canManageActivities = () => {
    return user && (user.rol === 'administrador' || user.rol === 'administrador_general');
  };

  const canManageResources = () => {
    return user && (user.rol === 'administrador' || user.rol === 'administrador_general');
  };

  const canViewReports = () => {
    return user && (user.rol === 'administrador' || user.rol === 'administrador_general' || user.rol === 'operador');
  };

  const canCreateTasks = () => {
    return user && (user.rol === 'administrador' || user.rol === 'administrador_general' || user.rol === 'operador');
  };

  const canExecuteTasks = () => {
    return user && (user.rol === 'operador' || user.rol === 'cliente');
  };

  const canManageRegistros = () => {
    return user && (user.rol === 'administrador' || user.rol === 'administrador_general');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAdmin,
    isAdminGeneral,
    isOperador,
    isCliente,
    canManageActivities,
    canManageResources,
    canViewReports,
    canCreateTasks,
    canExecuteTasks,
    canManageRegistros
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};