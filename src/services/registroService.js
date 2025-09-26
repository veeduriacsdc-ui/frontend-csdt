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

      // Usar la ruta de registro mejorada
      const response = await csdtApiService.post('/registro/registrar', {
        nombre: datosRegistro.nombre?.trim(),
        email: datosRegistro.email?.trim().toLowerCase(),
        telefono: datosRegistro.telefono?.trim(),
        documento_identidad: datosRegistro.documento_identidad?.trim(),
        tipo_documento: datosRegistro.tipo_documento,
        rol_solicitado: datosRegistro.rol_solicitado,
        motivacion: datosRegistro.motivacion?.trim(),
        experiencia: datosRegistro.experiencia?.trim()
      });
      
      return response.data;
    } catch (error) {
      console.error('Error en registro:', error);
      
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
      
      // Manejar errores de red o conexión
      if (error.code === 'NETWORK_ERROR' || !error.response || error.code === 'ECONNABORTED') {
        throw {
          success: false,
          message: 'Error de conexión. Verifica que el servidor esté funcionando y tu conexión a internet.',
          errors: ['Error de conexión']
        };
      }
      
      // Manejar errores del servidor
      if (error.response?.status >= 500) {
        throw {
          success: false,
          message: 'Error del servidor. Intenta nuevamente en unos minutos.',
          errors: ['Error del servidor']
        };
      }
      
      // Manejar otros errores
      throw error.response?.data || {
        success: false,
        message: error.message || 'Error desconocido al procesar el registro',
        errors: ['Error desconocido']
      };
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
      const response = await csdtApiService.post('/registro/validar-campos', campos);
      return response.data;
    } catch (error) {
      console.error('Error validando campos:', error);
      
      // Si no hay respuesta del servidor, asumir que los campos están disponibles
      if (!error.response) {
        return {
          success: true,
          data: {
            email: { existe: false, mensaje: 'Email disponible' },
            documento: { existe: false, mensaje: 'Documento disponible' }
          }
        };
      }
      
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
