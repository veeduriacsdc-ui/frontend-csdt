import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const verificarSesion = () => {
      try {
        const token = localStorage.getItem('csdt_token');
        const userData = localStorage.getItem('csdt_user');
        
        if (token && userData) {
          setUser(JSON.parse(userData));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error verificando sesión:', error);
        setUser(null);
      }
    };

    verificarSesion();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const response = await api.post('/auth/login', {
        cor: email,
        con: password
      });

      if (response.data.success) {
        const { user, token } = response.data.data;
        
        // Guardar en localStorage
        localStorage.setItem('csdt_token', token);
        localStorage.setItem('csdt_user', JSON.stringify(user));
        
        setUser(user);
        return { success: true, user: user };
      } else {
        throw new Error(response.data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      const message = error.response?.data?.message || error.message || 'Error al iniciar sesión';
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    try {
      // Mapear datos del formulario a los campos del backend
      const datos = {
        nom: userData.nombre || userData.nom || '',
        ape: userData.apellido || userData.ape || '',
        cor: userData.email || userData.cor || '',
        con: userData.password || userData.con || userData.pass || '',
        con_confirmation: userData.confirmar_password || userData.con_confirmation || userData.pass_confirmation || '',
        tel: userData.telefono || userData.tel || '',
        doc: userData.documento || userData.doc || userData.numeroDocumento || '',
        tip_doc: userData.tipo_documento || userData.tip_doc || 'cc',
        rol: userData.rol || 'cli'
      };

      const response = await api.post('/auth/register', datos);

      if (response.data.success) {
        const { user } = response.data.data;
        setUser(user);
        return { success: true, user: user, message: response.data.data.message };
      } else {
        throw new Error(response.data.message || 'Error al crear la cuenta');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      const message = error.response?.data?.message || error.message || 'Error al crear la cuenta';
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Intentar cerrar sesión en el servidor
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    } finally {
      // Limpiar datos locales independientemente del resultado del servidor
      localStorage.removeItem('csdt_token');
      localStorage.removeItem('csdt_user');
      setUser(null);
    }
  };

  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Administrador tiene todos los permisos
    if (user.rol === 'adm') {
      return true;
    }
    
    // Verificar permisos específicos según el rol
    const permisosPorRol = {
      'adm': ['publicas', 'cliente', 'operador', 'administrador'],
      'ope': ['publicas', 'cliente', 'operador'],
      'cli': ['publicas', 'cliente']
    };

    const permisos = permisosPorRol[user.rol] || [];
    return permisos.includes(permission);
  };

  const isAdmin = () => {
    return user && user.rol === 'adm';
  };

  const isAdminGeneral = () => {
    return user && user.rol === 'adm';
  };

  const isOperador = () => {
    return user && (user.rol === 'ope' || user.rol === 'adm');
  };

  const isCliente = () => {
    return user && (user.rol === 'cli' || user.rol === 'ope' || user.rol === 'adm');
  };

  const canManageActivities = () => {
    return user && user.rol === 'adm';
  };

  const canManageResources = () => {
    return user && user.rol === 'adm';
  };

  const canViewReports = () => {
    return user && (user.rol === 'adm' || user.rol === 'ope');
  };

  const canCreateTasks = () => {
    return user && (user.rol === 'adm' || user.rol === 'ope');
  };

  const canExecuteTasks = () => {
    return user && (user.rol === 'ope' || user.rol === 'cli');
  };

  const canManageRegistros = () => {
    return user && user.rol === 'adm';
  };

  const value = {
    user,
    loading,
    login,
    register,
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
