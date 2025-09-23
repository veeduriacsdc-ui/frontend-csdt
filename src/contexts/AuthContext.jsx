import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

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

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const verificarSesion = async () => {
      try {
        const resultado = await authService.verificarToken();
        if (resultado.valid && resultado.user) {
          setUser(resultado.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error verificando sesión:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    verificarSesion();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      const resultado = await authService.iniciarSesion({
        email: email,
        password: password
      });

      if (resultado.success) {
        setUser(resultado.user);
        return { success: true, user: resultado.user };
      } else {
        throw new Error(resultado.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error.response?.data?.message || error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    try {
      const resultado = await authService.registrarUsuario({
        nom: userData.nom,
        ape: userData.ape,
        email: userData.email,
        pass: userData.pass,
        pass_confirmation: userData.pass_confirmation,
        rol: userData.rol || 'cli'
      });

      if (resultado.success) {
        setUser(resultado.user);
        return { success: true, user: resultado.user };
      } else {
        throw new Error(resultado.error || 'Error al crear la cuenta');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      throw new Error(error.response?.data?.message || error.message || 'Error al crear la cuenta');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.cerrarSesion();
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    } finally {
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