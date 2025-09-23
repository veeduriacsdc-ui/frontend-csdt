import csdtApiService from './csdtApiService';

const registroService = {
  // Registrar nuevo usuario (mejorado)
  async registrar(datosRegistro) {
    try {
      // Validar datos antes de enviar
      const erroresValidacion = this.validarDatosRegistro(datosRegistro);
      if (erroresValidacion.length > 0) {
        throw {
          success: false,
          message: erroresValidacion.join('. '),
          errors: erroresValidacion
        };
      }

      // Usar la ruta de autenticación unificada
      const response = await csdtApiService.auth.registerCliente({
        nombre: datosRegistro.nombre?.trim(),
        email: datosRegistro.email?.trim().toLowerCase(),
        usuario: datosRegistro.usuario?.trim(),
        contrasena: datosRegistro.contrasena,
        rol: datosRegistro.rol,
        tipoDocumento: datosRegistro.tipoDocumento,
        numeroDocumento: datosRegistro.numeroDocumento?.trim()
      });
      
      return response.data;
    } catch (error) {
      // Manejar errores de validación de manera más específica
      if (error.response?.data?.errors) {
        const errores = error.response.data.errors;
        const mensajes = Object.values(errores).flat().join('. ');
        throw {
          success: false,
          message: mensajes,
          errors: errores
        };
      }
      
      // Manejar errores de red
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        throw {
          success: false,
          message: 'Error de conexión. Verifica tu conexión a internet e intenta nuevamente.',
          errors: ['Error de red']
        };
      }
      
      throw error.response?.data || error;
    }
  },

  // Validar datos de registro en el frontend
  validarDatosRegistro(datos) {
    const errores = [];
    
    if (!datos.nombre || datos.nombre.trim().length < 2) {
      errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!datos.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
      errores.push('El email debe tener un formato válido');
    }
    
    if (!datos.usuario || datos.usuario.trim().length < 3) {
      errores.push('El nombre de usuario debe tener al menos 3 caracteres');
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(datos.usuario)) {
      errores.push('El nombre de usuario solo puede contener letras, números y guiones bajos');
    }
    
    if (!datos.contrasena || datos.contrasena.length < 6) {
      errores.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    if (!datos.numeroDocumento || datos.numeroDocumento.trim().length < 6) {
      errores.push('El número de documento debe tener al menos 6 caracteres');
    }
    
    return errores;
  },

  // Validar campos únicos antes del registro
  async validarCampos(campos) {
    try {
      const response = await csdtApiService.auth.validarCampos(campos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Verificar email
  async verificarEmail(token) {
    try {
      const response = await csdtApiService.registro.verificarEmail(token);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Obtener registros pendientes (solo administradores)
  async obtenerPendientes() {
    try {
      const response = await csdtApiService.adminRegistros.obtenerPendientes();
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Aprobar registro (solo administradores)
  async aprobar(id, observaciones = null) {
    try {
      const response = await csdtApiService.adminRegistros.aprobar(id, observaciones);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // Rechazar registro (solo administradores)
  async rechazar(id, observaciones) {
    try {
      const response = await csdtApiService.adminRegistros.rechazar(id, observaciones);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};

export default registroService;
