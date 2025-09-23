import api from './api';

const authService = {
  // Iniciar sesión
  async iniciarSesion(credenciales) {
    try {
      const response = await api.post('/login', credenciales);
      const { data } = response.data;
      const { token, user } = data;

      // Guardar datos de autenticación
      localStorage.setItem('csdt_token', token);
      localStorage.setItem('csdt_user', JSON.stringify(user));
      // Mantener compatibilidad con versiones anteriores
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      console.log('Sesión iniciada exitosamente', { usuario: user.email });
      return { success: true, user, token };
    } catch (error) {
      console.error('Error iniciando sesión:', error);
      throw error;
    }
  },

  // Cerrar sesión
  async cerrarSesion() {
    try {
      const token = localStorage.getItem('csdt_token') || localStorage.getItem('token');
      if (token) {
        await api.post('/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    } finally {
      // Limpiar datos locales independientemente del resultado del servidor
      localStorage.removeItem('csdt_token');
      localStorage.removeItem('csdt_user');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      console.log('Sesión cerrada');
    }
  },

  // Registrar usuario
  async registrarUsuario(datosUsuario) {
    try {
      const response = await api.post('/registro', datosUsuario);
      const { data } = response.data;
      const { user, message } = data;

      console.log('Usuario registrado exitosamente', { usuario: user.email });
      return { success: true, user, message };
    } catch (error) {
      console.error('Error registrando usuario:', error);
      throw error;
    }
  },

  // Verificar token
  async verificarToken() {
    try {
      const token = localStorage.getItem('csdt_token') || localStorage.getItem('token');
      if (!token) {
        return { valid: false, user: null };
      }

      const response = await api.get('/usuario');
      const { data } = response.data;
      const { usuario } = data;

      // Actualizar datos del usuario
      localStorage.setItem('csdt_user', JSON.stringify(usuario));
      localStorage.setItem('user', JSON.stringify(usuario));

      return { valid: true, user: usuario };
    } catch (error) {
      console.error('Error verificando token:', error);
      localStorage.removeItem('csdt_token');
      localStorage.removeItem('csdt_user');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return { valid: false, user: null };
    }
  },

  // Obtener usuario actual
  obtenerUsuarioActual() {
    const user = localStorage.getItem('csdt_user') || localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si está autenticado
  estaAutenticado() {
    const token = localStorage.getItem('csdt_token') || localStorage.getItem('token');
    const user = localStorage.getItem('csdt_user') || localStorage.getItem('user');
    return !!(token && user);
  },

  // Obtener token
  obtenerToken() {
    return localStorage.getItem('csdt_token') || localStorage.getItem('token');
  },

  // Cambiar contraseña
  async cambiarContrasena(datos) {
    try {
      const response = await api.post('/auth/cambiar-contrasena', datos);
      console.log('Contraseña cambiada exitosamente');
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Error cambiando contraseña:', error);
      throw error;
    }
  },

  // Solicitar restablecimiento de contraseña
  async solicitarRestablecimiento(email, tipoUsuario) {
    try {
      const response = await api.post('/auth/recuperar-contrasena', { 
        correo: email, 
        tipo_usuario: tipoUsuario 
      });
      console.log('Solicitud de restablecimiento enviada', { email });
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Error solicitando restablecimiento:', error);
      throw error;
    }
  },

  // Restablecer contraseña
  async restablecerContrasena(datos) {
    try {
      const response = await api.post('/auth/resetear-contrasena', datos);
      console.log('Contraseña restablecida exitosamente');
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error('Error restableciendo contraseña:', error);
      throw error;
    }
  },

  // Validar campos únicos
  async validarCampos(campos) {
    try {
      const response = await api.post('/auth/validar-campos', campos);
      return response.data;
    } catch (error) {
      console.error('Error validando campos:', error);
      throw error;
    }
  }
};

export default authService;