/**
 * Definiciones de tipos de datos para modelos del CSDT
 * Estos tipos representan las estructuras de datos que se intercambian
 * entre el frontend y el backend de Laravel
 */

// ==================== TIPOS BASE ====================

/**
 * @typedef {Object} UsuarioBase
 * @property {number} id - ID único del usuario
 * @property {string} nom - Nombres del usuario
 * @property {string} ape - Apellidos del usuario
 * @property {string} cor - Correo electrónico
 * @property {string} tel - Número de teléfono
 * @property {string} doc - Número de documento
 * @property {string} tip_doc - Tipo de documento (cc, ce, ti, pp, nit)
 * @property {string} fec_nac - Fecha de nacimiento
 * @property {string} dir - Dirección física
 * @property {string} ciu - Ciudad
 * @property {string} dep - Departamento
 * @property {string} gen - Género (m, f, o, n)
 * @property {string} rol - Rol del usuario (cli, ope, adm)
 * @property {string} est - Estado del usuario (act, ina, sus, pen)
 * @property {boolean} cor_ver - Si el correo está verificado
 * @property {string} cor_ver_en - Fecha de verificación del correo
 * @property {string} ult_acc - Último acceso al sistema
 * @property {string} not - Notas adicionales
 * @property {string} created_at - Fecha de creación
 * @property {string} updated_at - Fecha de última actualización
 * @property {string} deleted_at - Fecha de eliminación (soft delete)
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

// ==================== VEEDURÍA ====================

/**
 * @typedef {Object} Veeduria
 * @property {number} id - ID único
 * @property {number} usu_id - ID del usuario (cliente)
 * @property {number} [ope_id] - ID del operador asignado
 * @property {string} tit - Título de la veeduría
 * @property {string} des - Descripción detallada
 * @property {string} tip - Tipo de veeduría (pet, que, rec, sug, fel, den)
 * @property {string} est - Estado de la veeduría (pen, pro, rad, cer, can)
 * @property {string} pri - Prioridad (baj, med, alt, urg)
 * @property {string} [cat] - Categoría de la veeduría
 * @property {string} [ubi] - Ubicación
 * @property {number} [pre] - Presupuesto
 * @property {string} fec_reg - Fecha de registro
 * @property {string} [fec_rad] - Fecha de radicación
 * @property {string} [fec_cer] - Fecha de cierre
 * @property {string} [num_rad] - Número de radicación
 * @property {string} [not_ope] - Notas del operador
 * @property {Array} [rec_ia] - Recomendaciones de IA
 * @property {Array} [arc] - Archivos adjuntos
 * @property {string} created_at - Fecha de creación
 * @property {string} updated_at - Fecha de actualización
 * @property {string} [deleted_at] - Fecha de eliminación
 * @property {UsuarioBase} usuario - Usuario asociado
 * @property {UsuarioBase} [operador] - Operador asignado
 */

// ==================== TAREA ====================

/**
 * @typedef {Object} Tarea
 * @property {number} id - ID único
 * @property {number} [vee_id] - ID de la veeduría asociada
 * @property {number} asig_por - ID del usuario que asigna
 * @property {number} asig_a - ID del usuario asignado
 * @property {string} tit - Título de la tarea
 * @property {string} des - Descripción de la tarea
 * @property {string} est - Estado de la tarea (pen, pro, com, can, sus)
 * @property {string} pri - Prioridad de la tarea (baj, med, alt, urg)
 * @property {string} [fec_ini] - Fecha de inicio
 * @property {string} [fec_ven] - Fecha de vencimiento
 * @property {string} [fec_com] - Fecha de completado
 * @property {string} [not] - Notas
 * @property {string} created_at - Fecha de creación
 * @property {string} updated_at - Fecha de actualización
 * @property {string} [deleted_at] - Fecha de eliminación
 * @property {UsuarioBase} asignado_por - Usuario que asigna
 * @property {UsuarioBase} asignado_a - Usuario asignado
 * @property {Veeduria} [veeduria] - Veeduría asociada
 */

// ==================== DONACIÓN ====================

/**
 * @typedef {Object} Donacion
 * @property {number} id - ID único
 * @property {number} usu_id - ID del usuario
 * @property {number} mon - Monto de la donación
 * @property {string} tip - Tipo de pago (efec, tran, cheq, otr)
 * @property {string} est - Estado (pen, pro, con, rej, can)
 * @property {string} [ref] - Referencia
 * @property {string} [des] - Descripción
 * @property {string} fec_don - Fecha de donación
 * @property {string} [fec_con] - Fecha de confirmación
 * @property {string} [not] - Notas
 * @property {string} created_at - Fecha de creación
 * @property {string} updated_at - Fecha de actualización
 * @property {string} [deleted_at] - Fecha de eliminación
 * @property {UsuarioBase} usuario - Usuario que dona
 */

// ==================== ROL ====================

/**
 * @typedef {Object} Rol
 * @property {number} id - ID único
 * @property {string} nom - Nombre del rol
 * @property {string} [des] - Descripción
 * @property {string} est - Estado (act, ina)
 * @property {Array} [perm] - Permisos del rol
 * @property {string} created_at - Fecha de creación
 * @property {string} updated_at - Fecha de actualización
 * @property {string} [deleted_at] - Fecha de eliminación
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
  // UsuarioBase, // Comentado temporalmente
  
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
  Veeduria,
  Tarea,
  Donacion,
  Rol,
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
