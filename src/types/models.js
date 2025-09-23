/**
 * Definiciones de tipos de datos para modelos del CSDT
 * Estos tipos representan las estructuras de datos que se intercambian
 * entre el frontend y el backend de Laravel
 */

// ==================== TIPOS BASE ====================

/**
 * @typedef {Object} UsuarioBase
 * @property {number} id - ID único del usuario
 * @property {string} nombres - Nombres del usuario
 * @property {string} apellidos - Apellidos del usuario
 * @property {string} usuario - Nombre de usuario único
 * @property {string} correo - Correo electrónico
 * @property {string} telefono - Número de teléfono
 * @property {string} documento_identidad - Número de documento
 * @property {string} tipo_documento - Tipo de documento (cc, ce, ti, pp, nit)
 * @property {string} fecha_nacimiento - Fecha de nacimiento
 * @property {string} direccion - Dirección física
 * @property {string} ciudad - Ciudad
 * @property {string} departamento - Departamento
 * @property {string} codigo_postal - Código postal
 * @property {string} genero - Género (masculino, femenino, otro, no_especificado)
 * @property {boolean} acepto_terminos - Si aceptó términos y condiciones
 * @property {boolean} acepto_politicas - Si aceptó políticas de privacidad
 * @property {boolean} correo_verificado - Si el correo está verificado
 * @property {string} correo_verificado_en - Fecha de verificación del correo
 * @property {string} ultimo_acceso - Último acceso al sistema
 * @property {string} estado - Estado del usuario (activo, inactivo, suspendido, pendiente_verificacion)
 * @property {string} notas - Notas adicionales
 * @property {string} created_at - Fecha de creación
 * @property {string} updated_at - Fecha de última actualización
 */

// ==================== CLIENTE ====================

/**
 * @typedef {UsuarioBase} Cliente
 * @property {Array<PQRSFD>} pqrsfds - PQRSFD asociadas al cliente
 * @property {Array<Donacion>} donaciones - Donaciones realizadas
 * @property {Array<DocumentoAdjunto>} documentos - Documentos adjuntos
 * @property {Array<ConsultaPrevia>} consultas_previas - Consultas previas
 * @property {string} nombre_completo - Nombre completo (accessor)
 * @property {string} estado_color - Color del estado (accessor)
 */

/**
 * @typedef {Object} ClienteCreate
 * @property {string} nombres - Nombres del cliente
 * @property {string} apellidos - Apellidos del cliente
 * @property {string} usuario - Nombre de usuario único
 * @property {string} correo - Correo electrónico
 * @property {string} contrasena - Contraseña
 * @property {string} [telefono] - Número de teléfono
 * @property {string} [documento_identidad] - Número de documento
 * @property {string} [tipo_documento] - Tipo de documento
 * @property {string} [fecha_nacimiento] - Fecha de nacimiento
 * @property {string} [direccion] - Dirección física
 * @property {string} [ciudad] - Ciudad
 * @property {string} [departamento] - Departamento
 * @property {string} [codigo_postal] - Código postal
 * @property {string} [genero] - Género
 * @property {boolean} acepto_terminos - Si aceptó términos
 * @property {boolean} acepto_politicas - Si aceptó políticas
 */

// ==================== OPERADOR ====================

/**
 * @typedef {UsuarioBase} Operador
 * @property {string} profesion - Profesión del operador
 * @property {string} especializacion - Especialización
 * @property {string} numero_matricula - Número de matrícula profesional
 * @property {string} entidad_matricula - Entidad que emitió la matrícula
 * @property {number} anos_experiencia - Años de experiencia
 * @property {string} perfil_profesional - Perfil profesional
 * @property {Array<string>} areas_expertise - Áreas de expertise
 * @property {string} linkedin - Perfil de LinkedIn
 * @property {string} sitio_web - Sitio web personal
 * @property {boolean} perfil_verificado - Si el perfil está verificado
 * @property {string} perfil_verificado_en - Fecha de verificación del perfil
 * @property {string} rol - Rol del operador
 * @property {number} [usuario_sistema_id] - ID del usuario sistema
 * @property {number} [supervisor_id] - ID del supervisor
 * @property {Array<Operador>} subordinados - Subordinados
 * @property {Array<PQRSFD>} pqrsfd_asignadas - PQRSFD asignadas
 * @property {Array<ActividadCaso>} actividades_caso - Actividades de caso
 * @property {Array<Tarea>} tareas - Tareas asignadas
 * @property {Array<Cliente>} clientes_asignados - Clientes asignados
 * @property {Array<Reporte>} reportes - Reportes generados
 * @property {Array<LogAuditoria>} logs_auditoria - Logs de auditoría
 * @property {string} nombre_completo - Nombre completo (accessor)
 * @property {number} anios_experiencia - Años de experiencia (accessor)
 */

/**
 * @typedef {Object} OperadorCreate
 * @property {string} nombres - Nombres del operador
 * @property {string} apellidos - Apellidos del operador
 * @property {string} usuario - Nombre de usuario único
 * @property {string} correo - Correo electrónico
 * @property {string} contrasena - Contraseña
 * @property {string} [telefono] - Número de teléfono
 * @property {string} [documento_identidad] - Número de documento
 * @property {string} [tipo_documento] - Tipo de documento
 * @property {string} [fecha_nacimiento] - Fecha de nacimiento
 * @property {string} [direccion] - Dirección física
 * @property {string} [ciudad] - Ciudad
 * @property {string} [departamento] - Departamento
 * @property {string} [codigo_postal] - Código postal
 * @property {string} [genero] - Género
 * @property {string} profesion - Profesión
 * @property {string} [especializacion] - Especialización
 * @property {string} [numero_matricula] - Número de matrícula
 * @property {string} [entidad_matricula] - Entidad de matrícula
 * @property {number} [anos_experiencia] - Años de experiencia
 * @property {string} [perfil_profesional] - Perfil profesional
 * @property {Array<string>} [areas_expertise] - Áreas de expertise
 * @property {string} [linkedin] - LinkedIn
 * @property {string} [sitio_web] - Sitio web
 * @property {boolean} acepto_terminos - Si aceptó términos
 * @property {boolean} acepto_politicas - Si aceptó políticas
 * @property {string} rol - Rol (operador)
 */

// ==================== ADMINISTRADOR ====================

/**
 * @typedef {Operador} Administrador
 * @property {string} nivel_administracion - Nivel de administración (super, gestion, operativo)
 * @property {Array<Operador>} operadores_supervisados - Operadores supervisados
 * @property {Array<PQRSFD>} casos_asignados - Casos asignados
 * @property {Array<ActividadCaso>} actividades_administrativas - Actividades administrativas
 * @property {Array<Reporte>} reportes_generados - Reportes generados
 * @property {Array<LogSistema>} logs_sistema - Logs del sistema
 */

/**
 * @typedef {Object} AdministradorCreate
 * @property {string} nombres - Nombres del administrador
 * @property {string} apellidos - Apellidos del administrador
 * @property {string} correo - Correo electrónico
 * @property {string} contrasena - Contraseña
 * @property {string} [telefono] - Número de teléfono
 * @property {string} [documento_identidad] - Número de documento
 * @property {string} [tipo_documento] - Tipo de documento
 * @property {string} [fecha_nacimiento] - Fecha de nacimiento
 * @property {string} [direccion] - Dirección física
 * @property {string} [ciudad] - Ciudad
 * @property {string} [departamento] - Departamento
 * @property {string} [codigo_postal] - Código postal
 * @property {string} [genero] - Género
 * @property {string} profesion - Profesión
 * @property {string} [especializacion] - Especialización
 * @property {string} [numero_matricula] - Número de matrícula
 * @property {string} [entidad_matricula] - Entidad de matrícula
 * @property {number} [anos_experiencia] - Años de experiencia
 * @property {string} [perfil_profesional] - Perfil profesional
 * @property {Array<string>} [areas_expertise] - Áreas de expertise
 * @property {string} [linkedin] - LinkedIn
 * @property {string} [sitio_web] - Sitio web
 * @property {boolean} acepto_terminos - Si aceptó términos
 * @property {boolean} acepto_politicas - Si aceptó políticas
 * @property {string} rol - Rol (administrador)
 * @property {string} [nivel_administracion] - Nivel de administración
 */

// ==================== PQRSFD ====================

/**
 * @typedef {Object} PQRSFD
 * @property {number} id - ID único
 * @property {number} cliente_id - ID del cliente
 * @property {number} [operador_id] - ID del operador asignado
 * @property {string} tipo - Tipo de PQRSFD (peticion, queja, reclamo, sugerencia, felicitacion, denuncia)
 * @property {string} asunto - Asunto del caso
 * @property {string} descripcion - Descripción detallada
 * @property {string} estado - Estado del caso
 * @property {string} prioridad - Prioridad (baja, media, alta, critica)
 * @property {string} categoria - Categoría del caso
 * @property {Array<DocumentoAdjunto>} documentos - Documentos adjuntos
 * @property {string} fecha_creacion - Fecha de creación
 * @property {string} fecha_cierre - Fecha de cierre
 * @property {string} observaciones - Observaciones adicionales
 * @property {Cliente} cliente - Cliente asociado
 * @property {Operador} operador - Operador asignado
 */

// ==================== TAREA ====================

/**
 * @typedef {Object} Tarea
 * @property {number} id - ID único
 * @property {string} titulo - Título de la tarea
 * @property {string} descripcion - Descripción de la tarea
 * @property {string} estado - Estado de la tarea
 * @property {string} prioridad - Prioridad de la tarea
 * @property {number} [operador_id] - ID del operador asignado
 * @property {number} [veeduria_id] - ID de la veeduría asociada
 * @property {string} fecha_vencimiento - Fecha de vencimiento
 * @property {string} fecha_completado - Fecha de completado
 * @property {string} observaciones - Observaciones
 * @property {Operador} operador - Operador asignado
 */

// ==================== CONSEJO IA ====================

/**
 * @typedef {Object} NarracionConsejoIA
 * @property {number} id - ID único
 * @property {string} tipo_ia - Tipo de IA utilizado
 * @property {string} hechos - Hechos del caso
 * @property {string} narracion_hechos - Narración de hechos generada
 * @property {string} fundamentos_juridicos - Fundamentos jurídicos
 * @property {string} concepto_general - Concepto general
 * @property {string} nivel_riesgo - Nivel de riesgo
 * @property {Array<string>} recomendaciones - Recomendaciones
 * @property {Array<string>} evidencias - Evidencias
 * @property {Array<number>} coordenadas - Coordenadas geográficas
 * @property {string} fecha_creacion - Fecha de creación
 * @property {string} fecha_actualizacion - Fecha de actualización
 * @property {number} [cliente_id] - ID del cliente
 * @property {number} [operador_id] - ID del operador
 */

// ==================== ESTADÍSTICAS ====================

/**
 * @typedef {Object} EstadisticasOperador
 * @property {number} pqrsfd_asignadas - PQRSFD asignadas
 * @property {number} pqrsfd_completadas - PQRSFD completadas
 * @property {number} tareas_asignadas - Tareas asignadas
 * @property {number} tareas_completadas - Tareas completadas
 * @property {number} clientes_asignados - Clientes asignados
 * @property {number} reportes_generados - Reportes generados
 * @property {number} eficiencia - Porcentaje de eficiencia
 */

/**
 * @typedef {Object} CargaTrabajo
 * @property {number} tareas_pendientes - Tareas pendientes
 * @property {number} tareas_en_progreso - Tareas en progreso
 * @property {number} pqrsfd_pendientes - PQRSFD pendientes
 * @property {number} carga_total - Carga total
 * @property {string} nivel_carga - Nivel de carga (baja, media, alta, critica)
 */

// ==================== RESPUESTAS API ====================

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success - Si la operación fue exitosa
 * @property {string} message - Mensaje de respuesta
 * @property {*} data - Datos de respuesta
 * @property {Object} [errors] - Errores de validación
 * @property {string} [error] - Error general
 */

/**
 * @typedef {Object} PaginatedResponse
 * @property {boolean} success - Si la operación fue exitosa
 * @property {string} message - Mensaje de respuesta
 * @property {Array} data - Datos paginados
 * @property {Object} meta - Metadatos de paginación
 * @property {Object} links - Enlaces de paginación
 */

// ==================== AUTENTICACIÓN ====================

/**
 * @typedef {Object} LoginCredentials
 * @property {string} usuario - Nombre de usuario o correo
 * @property {string} contrasena - Contraseña
 */

/**
 * @typedef {Object} AuthResponse
 * @property {boolean} success - Si la autenticación fue exitosa
 * @property {string} message - Mensaje de respuesta
 * @property {Object} data - Datos de autenticación
 * @property {string} data.token - Token de autenticación
 * @property {UsuarioBase} data.user - Usuario autenticado
 */

/**
 * @typedef {Object} RegisterData
 * @property {string} nombre - Nombre completo
 * @property {string} email - Correo electrónico
 * @property {string} usuario - Nombre de usuario
 * @property {string} contrasena - Contraseña
 * @property {string} rol - Rol del usuario
 * @property {string} tipoDocumento - Tipo de documento
 * @property {string} numeroDocumento - Número de documento
 */

// ==================== EXPORTACIONES ====================

export {
  // Tipos base
  UsuarioBase,
  
  // Cliente
  Cliente,
  ClienteCreate,
  
  // Operador
  Operador,
  OperadorCreate,
  
  // Administrador
  Administrador,
  AdministradorCreate,
  
  // Entidades relacionadas
  PQRSFD,
  Tarea,
  NarracionConsejoIA,
  
  // Estadísticas
  EstadisticasOperador,
  CargaTrabajo,
  
  // Respuestas API
  ApiResponse,
  PaginatedResponse,
  
  // Autenticación
  LoginCredentials,
  AuthResponse,
  RegisterData
};
