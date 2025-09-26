import api from './api';

/**
 * Servicio unificado para todas las conexiones API del CSDT
 * Mapea todas las rutas del backend con sus respectivos endpoints
 */
class CSDTApiService {
  constructor() {
    this.baseUrl = '/api';
  }

  // ==================== AUTENTICACIÓN ====================
  auth = {
    login: (credenciales) => api.post('/auth/login', credenciales),
    logout: () => api.post('/auth/logout'),
    me: () => api.get('/auth/me'),
    register: (datos) => api.post('/auth/register', datos),
    registerCliente: (datos) => api.post('/auth/register', datos),
    registerOperador: (datos) => api.post('/auth/register', datos),
    validarCampos: (campos) => api.post('/auth/validar-campos', campos),
    verificarEmail: (email) => api.post('/auth/verificar-email', { email }),
    cambiarContrasena: (datos) => api.post('/auth/cambiar-contrasena', datos),
    recuperarContrasena: (datos) => api.post('/auth/recuperar-contrasena', datos),
    resetearContrasena: (datos) => api.post('/auth/resetear-contrasena', datos)
  };

  // ==================== USUARIOS SISTEMA ====================
  usuariosSistema = {
    estadisticas: () => api.get('/usuarios-sistema/estadisticas'),
    // Solo administradores
    index: () => api.get('/usuarios-sistema/'),
    show: (id) => api.get(`/usuarios-sistema/${id}`),
    store: (datos) => api.post('/usuarios-sistema/', datos),
    update: (id, datos) => api.put(`/usuarios-sistema/${id}`, datos),
    destroy: (id) => api.delete(`/usuarios-sistema/${id}`),
    cambiarRol: (id, rol) => api.put(`/usuarios-sistema/${id}/cambiar-rol`, { rol }),
    cambiarEstado: (id, estado) => api.put(`/usuarios-sistema/${id}/cambiar-estado`, { estado })
  };

  // ==================== GESTIÓN DE USUARIOS ====================
  gestionUsuarios = {
    obtenerLista: () => api.get('/gestion-usuarios/'),
    obtenerEstadisticas: () => api.get('/gestion-usuarios/estadisticas'),
    obtenerUsuario: (id) => api.get(`/gestion-usuarios/${id}`),
    cambiarRol: (id, rol) => api.put(`/gestion-usuarios/${id}/rol`, { rol }),
    cambiarEstado: (id, estado) => api.put(`/gestion-usuarios/${id}/estado`, { estado }),
    eliminarUsuario: (id) => api.delete(`/gestion-usuarios/${id}`),
    restaurarUsuario: (id) => api.post(`/gestion-usuarios/${id}/restaurar`)
  };

  // ==================== REGISTRO ====================
  registro = {
    registrar: (datos) => api.post('/registro/', datos),
    verificarEmail: (email) => api.post('/registro/verificar-email', { email }),
    obtenerPendientes: () => api.get('/admin-registros/pendientes'),
    aprobar: (id) => api.post(`/admin-registros/${id}/aprobar`),
    rechazar: (id) => api.post(`/admin-registros/${id}/rechazar`)
  };

  // ==================== CLIENTES ====================
  clientes = {
    // Públicas
    crear: (datos) => api.post('/publico/clientes/', datos),
    verificarCorreo: (email) => api.post('/publico/clientes/verificar-correo', { email }),
    
    // Autenticadas
    obtenerLista: () => api.get('/clientes/'),
    obtenerPorId: (id) => api.get(`/clientes/${id}`),
    actualizar: (id, datos) => api.put(`/clientes/${id}`, datos),
    eliminar: (id) => api.delete(`/clientes/${id}`),
    restaurar: (id) => api.post(`/clientes/${id}/restaurar`),
    cambiarEstado: (id, estado) => api.put(`/clientes/${id}/estado`, { estado }),
    obtenerEstadisticas: (id) => api.get(`/clientes/${id}/estadisticas`),
    obtenerVeedurias: (id) => api.get(`/clientes/${id}/veedurias`),
    obtenerDonaciones: (id) => api.get(`/clientes/${id}/donaciones`),
    obtenerArchivos: (id) => api.get(`/clientes/${id}/archivos`)
  };

  // ==================== OPERADORES ====================
  operadores = {
    obtenerLista: () => api.get('/operadores/'),
    obtenerPorId: (id) => api.get(`/operadores/${id}`),
    actualizar: (id, datos) => api.put(`/operadores/${id}`, datos),
    eliminar: (id) => api.delete(`/operadores/${id}`),
    restaurar: (id) => api.post(`/operadores/${id}/restaurar`),
    cambiarEstado: (id, estado) => api.put(`/operadores/${id}/estado`, { estado }),
    verificar: (id) => api.post(`/operadores/${id}/verificar`),
    asignarSupervisor: (id, supervisorId) => api.post(`/operadores/${id}/asignar-supervisor`, { supervisor_id: supervisorId }),
    obtenerEstadisticas: (id) => api.get(`/operadores/${id}/estadisticas`),
    obtenerVeeduriasAsignadas: (id) => api.get(`/operadores/${id}/veedurias-asignadas`),
    obtenerTareasAsignadas: (id) => api.get(`/operadores/${id}/tareas-asignadas`),
    obtenerSubordinados: (id) => api.get(`/operadores/${id}/subordinados`)
  };

  // ==================== ADMINISTRADORES ====================
  administradores = {
    obtenerLista: () => api.get('/administradores/'),
    obtenerPorId: (id) => api.get(`/administradores/${id}`),
    crear: (datos) => api.post('/administradores/', datos),
    actualizar: (id, datos) => api.put(`/administradores/${id}`, datos),
    obtenerPanelControl: () => api.get('/administradores/panel-control'),
    asignarPermisosEspeciales: (id, permisos) => api.post(`/administradores/${id}/permisos-especiales`, { permisos }),
    obtenerEstadisticas: () => api.get('/administradores/estadisticas')
  };

  // ==================== PQRSFD ====================
  pqrsfd = {
    index: () => api.get('/pqrsfd/'),
    show: (id) => api.get(`/pqrsfd/${id}`),
    store: (datos) => api.post('/pqrsfd/', datos),
    update: (id, datos) => api.put(`/pqrsfd/${id}`, datos),
    destroy: (id) => api.delete(`/pqrsfd/${id}`),
    asignarOperador: (id, operadorId) => api.post(`/pqrsfd/${id}/asignar-operador`, { operador_id: operadorId }),
    radicar: (id) => api.post(`/pqrsfd/${id}/radicar`),
    cerrar: (id) => api.post(`/pqrsfd/${id}/cerrar`),
    cancelar: (id) => api.post(`/pqrsfd/${id}/cancelar`),
    agregarComentario: (id, comentario) => api.post(`/pqrsfd/${id}/agregar-comentario`, { comentario }),
    estadisticas: () => api.get('/pqrsfd/estadisticas/general')
  };

  // ==================== TAREAS ====================
  tareas = {
    obtenerLista: () => api.get('/tareas/'),
    obtenerPorId: (id) => api.get(`/tareas/${id}`),
    crear: (datos) => api.post('/tareas/', datos),
    actualizar: (id, datos) => api.put(`/tareas/${id}`, datos),
    eliminar: (id) => api.delete(`/tareas/${id}`),
    restaurar: (id) => api.post(`/tareas/${id}/restaurar`),
    asignarOperador: (id, operadorId) => api.post(`/tareas/${id}/asignar-operador`, { operador_id: operadorId }),
    cambiarEstado: (id, estado) => api.put(`/tareas/${id}/estado`, { estado }),
    obtenerEstadisticas: (id) => api.get(`/tareas/${id}/estadisticas`),
    obtenerPorVeeduria: (veeduriaId) => api.get(`/tareas/por-veeduria/${veeduriaId}`),
    obtenerPorOperador: (operadorId) => api.get(`/tareas/por-operador/${operadorId}`)
  };

  // ==================== CONSEJO IA ====================
  consejoIA = {
    // Públicas
    mejorarTexto: (texto) => api.post('/publico/consejoia/mejorar-texto', { texto }),
    guardarNarracion: (datos) => api.post('/publico/consejoia/guardar-narracion', datos),
    actualizarNarracion: (id, datos) => api.post('/publico/consejoia/actualizar-narracion', { id, ...datos }),
    generarPdf: (id) => api.post('/publico/consejoia/generar-pdf', { id }),
    obtenerEstadisticas: () => api.get('/publico/consejoia/estadisticas'),
    
    // Autenticadas
    obtenerLista: () => api.get('/narraciones-consejoia/'),
    obtenerPorId: (id) => api.get(`/narraciones-consejoia/${id}`),
    crear: (datos) => api.post('/narraciones-consejoia/', datos),
    actualizar: (id, datos) => api.put(`/narraciones-consejoia/${id}`, datos),
    eliminar: (id) => api.delete(`/narraciones-consejoia/${id}`),
    mejorarConIA: (id, texto) => api.post(`/narraciones-consejoia/${id}/mejorar-ia`, { texto }),
    generarPdfAutenticado: (id) => api.post(`/narraciones-consejoia/${id}/generar-pdf`),
    obtenerEstadisticasAutenticado: (id) => api.get(`/narraciones-consejoia/${id}/estadisticas`),
    obtenerPorCliente: (clienteId) => api.get(`/narraciones-consejoia/por-cliente/${clienteId}`),
    obtenerPorOperador: (operadorId) => api.get(`/narraciones-consejoia/por-operador/${operadorId}`)
  };

  // ==================== DONACIONES ====================
  donaciones = {
    update: (id, datos) => api.put(`/donaciones/${id}`, datos),
    destroy: (id) => api.delete(`/donaciones/${id}`),
    validar: (id) => api.post(`/donaciones/${id}/validar`),
    rechazar: (id) => api.post(`/donaciones/${id}/rechazar`),
    porCliente: (clienteId) => api.get(`/donaciones/por-cliente/${clienteId}`),
    porOperador: (operadorId) => api.get(`/donaciones/por-operador/${operadorId}`),
    pendientesValidacion: () => api.get('/donaciones/pendientes-validacion'),
    validadas: () => api.get('/donaciones/validadas')
  };

  // ==================== ARCHIVOS ====================
  archivos = {
    obtenerLista: () => api.get('/archivos/'),
    obtenerPorId: (id) => api.get(`/archivos/${id}`),
    subir: (datos) => api.post('/archivos/', datos),
    actualizar: (id, datos) => api.put(`/archivos/${id}`, datos),
    eliminar: (id) => api.delete(`/archivos/${id}`),
    descargar: (id) => api.get(`/archivos/${id}/descargar`),
    obtenerEstadisticas: (id) => api.get(`/archivos/${id}/estadisticas`),
    obtenerPorVeeduria: (veeduriaId) => api.get(`/archivos/por-veeduria/${veeduriaId}`),
    obtenerPorCliente: (clienteId) => api.get(`/archivos/por-cliente/${clienteId}`),
    obtenerPorOperador: (operadorId) => api.get(`/archivos/por-operador/${operadorId}`)
  };

  // ==================== CONFIGURACIÓN ====================
  configuracion = {
    obtenerLista: () => api.get('/configuracion/'),
    obtenerPorId: (id) => api.get(`/configuracion/${id}`),
    crear: (datos) => api.post('/configuracion/', datos),
    actualizar: (id, datos) => api.put(`/configuracion/${id}`, datos),
    obtenerPorClave: (clave) => api.get(`/configuracion/clave/${clave}`),
    actualizarPorClave: (clave, valor) => api.put(`/configuracion/clave/${clave}`, { valor }),
    obtenerPorCategoria: (categoria) => api.get(`/configuracion/categoria/${categoria}`),
    cambiarEstado: (id, estado) => api.put(`/configuracion/${id}/estado`, { estado }),
    restablecerPorDefecto: (id) => api.post(`/configuracion/${id}/restablecer-defecto`),
    limpiarCache: () => api.post('/configuracion/limpiar-cache'),
    obtenerEstadisticas: () => api.get('/configuracion/estadisticas')
  };

  // ==================== ESTADÍSTICAS ====================
  estadisticas = {
    generales: () => api.get('/estadisticas/generales'),
    dashboard: () => api.get('/estadisticas/dashboard'),
    actividadReciente: () => api.get('/estadisticas/actividad-reciente'),
    resumen: () => api.get('/dashboard/resumen'),
    estadisticasGenerales: () => api.get('/dashboard/estadisticas-generales')
  };

  // ==================== DATOS DE REFERENCIA PÚBLICOS ====================
  publico = {
    tiposVeeduria: () => api.get('/publico/tipos-veeduria'),
    estadosVeeduria: () => api.get('/publico/estados-veeduria'),
    prioridadesTarea: () => api.get('/publico/prioridades-tarea'),
    categoriasVeeduria: () => api.get('/publico/categorias-veeduria')
  };

  // ==================== SERVICIOS DE VOZ ====================
  voz = {
    textoAVoz: (datos) => api.post('/voz/texto-a-voz', datos),
    vozATexto: (datos) => api.post('/voz/voz-a-texto', datos),
    conversacion: (datos) => api.post('/voz/conversacion', datos),
    configuracion: () => api.get('/voz/configuracion'),
    probar: (datos) => api.post('/voz/probar', datos),
    estadisticas: () => api.get('/voz/estadisticas')
  };

  // ==================== VOZ INTELIGENTE ====================
  vozInteligente = {
    procesarComando: (comando) => api.post('/voz-inteligente/procesar-comando', { comando }),
    comandosDisponibles: () => api.get('/voz-inteligente/comandos-disponibles'),
    historial: () => api.get('/voz-inteligente/historial'),
    configurarPreferencias: (preferencias) => api.post('/voz-inteligente/preferencias', preferencias),
    estadisticasUso: () => api.get('/voz-inteligente/estadisticas'),
    probarSistema: () => api.post('/voz-inteligente/probar-sistema')
  };

  // ==================== SALUD DE LA API ====================
  salud = () => api.get('/health');

  // ==================== MÉTODO PARA CAMBIAR CONFIGURACIÓN DE API ====================
  cambiarConfiguracionAPI = (configName) => {
    const configs = {
      local: 'http://localhost:8000/api',
      xampp: 'http://127.0.0.1:8000/api',
      produccion: 'https://api.csdt.com.co/api'
    };
    
    if (configs[configName]) {
      localStorage.setItem('activeAPIConfig', configName);
      // Recargar la página para aplicar la nueva configuración
      window.location.reload();
    } else {
      console.error(`Configuración de API '${configName}' no encontrada`);
    }
  };
}

// Crear instancia única del servicio
const csdtApiService = new CSDTApiService();

export default csdtApiService;
