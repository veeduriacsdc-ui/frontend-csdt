import api, { apiUtils } from './api';
import configuracion, { utilidades } from './configuracion';

const authService = {
  // Iniciar sesión
  async iniciarSesion(credenciales) {
    try {
      const response = await api.post('/auth/login', credenciales);
      const { token, refresh_token, user, expires_at } = response.data;

      // Guardar datos de autenticación
      utilidades.guardarAuth(token, refresh_token, user, expires_at);

      utilidades.logInfo('Sesión iniciada exitosamente', { usuario: user.email });
      return { success: true, user, token };
    } catch (error) {
      utilidades.logError(error, 'Error iniciando sesión');
      throw error;
    }
  },

  // Cerrar sesión
  async cerrarSesion() {
    try {
      const token = localStorage.getItem(configuracion.auth.tokenKey);
      if (token) {
        await api.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      utilidades.logError(error, 'Error cerrando sesión');
    } finally {
      // Limpiar datos locales independientemente del resultado del servidor
      utilidades.limpiarAuth();
      utilidades.logInfo('Sesión cerrada');
    }
  },

  // Registrar usuario
  async registrarUsuario(datosUsuario) {
    try {
      const response = await api.post('/auth/register', datosUsuario);
      const { user, message } = response.data;

      utilidades.logInfo('Usuario registrado exitosamente', { usuario: user.email });
      return { success: true, user, message };
    } catch (error) {
      utilidades.logError(error, 'Error registrando usuario');
      throw error;
    }
  },

  // Verificar token
  async verificarToken() {
    try {
      const token = localStorage.getItem(configuracion.auth.tokenKey);
      if (!token || utilidades.verificarTokenExpirado()) {
        return { valid: false, user: null };
      }

      const response = await api.get('/auth/me');
      const { user } = response.data;

      // Actualizar datos del usuario
      utilidades.guardarAuth(token, null, user, null);

      return { valid: true, user };
    } catch (error) {
      utilidades.logError(error, 'Error verificando token');
      utilidades.limpiarAuth();
      return { valid: false, user: null };
    }
  },

  // Refrescar token
  async refrescarToken() {
    try {
      const refreshToken = localStorage.getItem(configuracion.auth.refreshTokenKey);
      if (!refreshToken) {
        throw new Error('No hay token de refresco disponible');
      }

      const response = await api.post('/auth/refresh', {
        refresh_token: refreshToken
      });

      const { token, refresh_token, expires_at } = response.data;

      // Actualizar token
      utilidades.guardarAuth(token, refresh_token, null, expires_at);

      utilidades.logInfo('Token refrescado exitosamente');
      return { success: true, token };
    } catch (error) {
      utilidades.logError(error, 'Error refrescando token');
      utilidades.limpiarAuth();
      throw error;
    }
  },

  // Obtener usuario actual
  obtenerUsuarioActual() {
    return utilidades.obtenerUsuarioActual();
  },

  // Verificar si está autenticado
  estaAutenticado() {
    return utilidades.estaAutenticado();
  },

  // Obtener token
  obtenerToken() {
    return localStorage.getItem(configuracion.auth.tokenKey);
  },

  // Verificar permisos
  async verificarPermisos(permiso) {
    try {
      const response = await api.get(`/auth/permissions/${permiso}`);
      return response.data.hasPermission;
    } catch (error) {
      utilidades.logError(error, 'Error verificando permisos');
      return false;
    }
  },

  // Obtener roles del usuario
  async obtenerRoles() {
    try {
      const response = await api.get('/auth/roles');
      return response.data.roles;
    } catch (error) {
      utilidades.logError(error, 'Error obteniendo roles');
      return [];
    }
  },

  // Cambiar contraseña
  async cambiarContrasena(datos) {
    try {
      const response = await api.post('/auth/change-password', datos);
      utilidades.logInfo('Contraseña cambiada exitosamente');
      return { success: true, message: response.data.message };
    } catch (error) {
      utilidades.logError(error, 'Error cambiando contraseña');
      throw error;
    }
  },

  // Solicitar restablecimiento de contraseña
  async solicitarRestablecimiento(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      utilidades.logInfo('Solicitud de restablecimiento enviada', { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      utilidades.logError(error, 'Error solicitando restablecimiento');
      throw error;
    }
  },

  // Restablecer contraseña
  async restablecerContrasena(datos) {
    try {
      const response = await api.post('/auth/reset-password', datos);
      utilidades.logInfo('Contraseña restablecida exitosamente');
      return { success: true, message: response.data.message };
    } catch (error) {
      utilidades.logError(error, 'Error restableciendo contraseña');
      throw error;
    }
  },

  // Actualizar perfil
  async actualizarPerfil(datos) {
    try {
      const response = await api.put('/auth/profile', datos);
      const { user } = response.data;

      // Actualizar datos del usuario
      utilidades.guardarAuth(null, null, user, null);

      utilidades.logInfo('Perfil actualizado exitosamente');
      return { success: true, user };
    } catch (error) {
      utilidades.logError(error, 'Error actualizando perfil');
      throw error;
    }
  },

  // Subir avatar
  async subirAvatar(archivo) {
    try {
      const formData = new FormData();
      formData.append('avatar', archivo);

      const response = await api.post('/auth/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { user } = response.data;

      // Actualizar datos del usuario
      utilidades.guardarAuth(null, null, user, null);

      utilidades.logInfo('Avatar actualizado exitosamente');
      return { success: true, user };
    } catch (error) {
      utilidades.logError(error, 'Error subiendo avatar');
      throw error;
    }
  },

  // Obtener historial de sesiones
  async obtenerHistorialSesiones() {
    try {
      const response = await api.get('/auth/sessions');
      return response.data.sessions;
    } catch (error) {
      utilidades.logError(error, 'Error obteniendo historial de sesiones');
      return [];
    }
  },

  // Cerrar sesión en todos los dispositivos
  async cerrarTodasLasSesiones() {
    try {
      await api.post('/auth/logout-all');
      utilidades.limpiarAuth();
      utilidades.logInfo('Todas las sesiones cerradas');
      return { success: true };
    } catch (error) {
      utilidades.logError(error, 'Error cerrando todas las sesiones');
      throw error;
    }
  }
};

export default authService;