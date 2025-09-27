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
        nom: datosRegistro.nom || datosRegistro.nombre?.trim(),
        ape: datosRegistro.ape || datosRegistro.apellido?.trim(),
        cor: datosRegistro.cor || datosRegistro.email?.trim().toLowerCase(),
        tel: datosRegistro.tel || datosRegistro.telefono?.trim(),
        doc: datosRegistro.doc || datosRegistro.documento_identidad?.trim(),
        tip_doc: datosRegistro.tip_doc || datosRegistro.tipo_documento,
        rol: datosRegistro.rol || datosRegistro.rol_solicitado,
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
    
    const nom = datos.nom || datos.nombre;
    const ape = datos.ape || datos.apellido;
    const cor = datos.cor || datos.email;
    const con = datos.con || datos.contrasena;
    const con_confirmation = datos.con_confirmation || datos.confirmar_contrasena;
    
    if (!nom || nom.trim().length < 2) {
      errores.push('El nombre debe tener al menos 2 caracteres');
    }
    
    if (!ape || ape.trim().length < 2) {
      errores.push('El apellido debe tener al menos 2 caracteres');
    }
    
    if (!cor || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cor)) {
      errores.push('El correo debe tener un formato válido');
    }
    
    if (!con || con.length < 6) {
      errores.push('La contraseña debe tener al menos 6 caracteres');
    }
    
    const doc = datos.doc || datos.documento_identidad || datos.numeroDocumento;
    if (!doc || doc.trim().length < 6) {
      errores.push('El número de documento debe tener al menos 6 caracteres');
    }
    
    if (con !== con_confirmation) {
      errores.push('Las contraseñas no coinciden');
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
