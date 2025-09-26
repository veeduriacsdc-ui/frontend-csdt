import api from './api';

const usuarioService = {
  // Obtener todos los usuarios
  async obtenerUsuarios(params = {}) {
    try {
      const response = await api.get('/usuarios', { params });
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  // Obtener usuario por ID
  async obtenerUsuario(id) {
    try {
      const response = await api.get(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },

  // Crear usuario
  async crearUsuario(datosUsuario) {
    try {
      // Mapear datos a la nueva estructura del backend
      const datos = {
        nom: datosUsuario.nombre || datosUsuario.nom || '',
        ape: datosUsuario.apellido || datosUsuario.ape || '',
        cor: datosUsuario.email || datosUsuario.cor || '',
        con: datosUsuario.password || datosUsuario.con || '',
        tel: datosUsuario.telefono || datosUsuario.tel || '',
        doc: datosUsuario.documento || datosUsuario.doc || '',
        tip_doc: datosUsuario.tipo_documento || datosUsuario.tip_doc || 'cc',
        fec_nac: datosUsuario.fecha_nacimiento || datosUsuario.fec_nac || null,
        dir: datosUsuario.direccion || datosUsuario.dir || '',
        ciu: datosUsuario.ciudad || datosUsuario.ciu || '',
        dep: datosUsuario.departamento || datosUsuario.dep || '',
        gen: datosUsuario.genero || datosUsuario.gen || null,
        rol: datosUsuario.rol || 'cli',
        est: datosUsuario.estado || datosUsuario.est || 'pen'
      };

      const response = await api.post('/usuarios', datos);
      return response.data;
    } catch (error) {
      console.error('Error creando usuario:', error);
      throw error;
    }
  },

  // Actualizar usuario
  async actualizarUsuario(id, datosUsuario) {
    try {
      // Mapear datos a la nueva estructura del backend
      const datos = {
        nom: datosUsuario.nombre || datosUsuario.nom || '',
        ape: datosUsuario.apellido || datosUsuario.ape || '',
        cor: datosUsuario.email || datosUsuario.cor || '',
        tel: datosUsuario.telefono || datosUsuario.tel || '',
        doc: datosUsuario.documento || datosUsuario.doc || '',
        tip_doc: datosUsuario.tipo_documento || datosUsuario.tip_doc || 'cc',
        fec_nac: datosUsuario.fecha_nacimiento || datosUsuario.fec_nac || null,
        dir: datosUsuario.direccion || datosUsuario.dir || '',
        ciu: datosUsuario.ciudad || datosUsuario.ciu || '',
        dep: datosUsuario.departamento || datosUsuario.dep || '',
        gen: datosUsuario.genero || datosUsuario.gen || null,
        rol: datosUsuario.rol || 'cli',
        est: datosUsuario.estado || datosUsuario.est || 'pen'
      };

      const response = await api.put(`/usuarios/${id}`, datos);
      return response.data;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario
  async eliminarUsuario(id) {
    try {
      const response = await api.delete(`/usuarios/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  },

  // Cambiar estado del usuario
  async cambiarEstado(id, estado) {
    try {
      const response = await api.patch(`/usuarios/${id}/cambiar-estado`, { est: estado });
      return response.data;
    } catch (error) {
      console.error('Error cambiando estado:', error);
      throw error;
    }
  },

  // Asignar rol al usuario
  async asignarRol(id, rolId) {
    try {
      const response = await api.post(`/usuarios/${id}/asignar-rol`, { rol_id: rolId });
      return response.data;
    } catch (error) {
      console.error('Error asignando rol:', error);
      throw error;
    }
  },

  // Quitar rol del usuario
  async quitarRol(id, rolId) {
    try {
      const response = await api.delete(`/usuarios/${id}/quitar-rol`, { data: { rol_id: rolId } });
      return response.data;
    } catch (error) {
      console.error('Error quitando rol:', error);
      throw error;
    }
  },

  // Activar usuario
  async activarUsuario(id) {
    try {
      const response = await api.patch(`/usuarios/${id}/activar`);
      return response.data;
    } catch (error) {
      console.error('Error activando usuario:', error);
      throw error;
    }
  },

  // Desactivar usuario
  async desactivarUsuario(id) {
    try {
      const response = await api.patch(`/usuarios/${id}/desactivar`);
      return response.data;
    } catch (error) {
      console.error('Error desactivando usuario:', error);
      throw error;
    }
  },

  // Verificar correo
  async verificarCorreo(id) {
    try {
      const response = await api.patch(`/usuarios/${id}/verificar-correo`);
      return response.data;
    } catch (error) {
      console.error('Error verificando correo:', error);
      throw error;
    }
  },

  // Buscar usuarios
  async buscarUsuarios(termino, filtros = {}) {
    try {
      const params = { termino, ...filtros };
      const response = await api.get('/usuarios/buscar', { params });
      return response.data;
    } catch (error) {
      console.error('Error buscando usuarios:', error);
      throw error;
    }
  },

  // Obtener usuarios por rol
  async obtenerUsuariosPorRol(rol) {
    try {
      const response = await api.get(`/usuarios/${rol}`);
      return response.data;
    } catch (error) {
      console.error('Error obteniendo usuarios por rol:', error);
      throw error;
    }
  },

  // Obtener estadísticas de usuarios
  async obtenerEstadisticas() {
    try {
      const response = await api.get('/usuarios/estadisticas/general');
      return response.data;
    } catch (error) {
      console.error('Error obteniendo estadísticas:', error);
      throw error;
    }
  }
};

export default usuarioService;
