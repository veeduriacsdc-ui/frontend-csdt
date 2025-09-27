# Referencia de Nomenclatura - CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL

## Campos Comunes

| Abreviación | Nombre Completo | Descripción | Uso |
|-------------|-----------------|-------------|-----|
| `nom` | nombre | Nombre de persona, entidad o elemento | Usuarios, instituciones, plantas, derechos |
| `ape` | apellido | Apellido de persona | Usuarios |
| `doc` | documento | Número de documento de identidad | Usuarios |
| `cor` | correo | Dirección de correo electrónico | Usuarios, contacto |
| `con` | contraseña | Contraseña de acceso | Autenticación |
| `con_conf` | confirmar_contraseña | Confirmación de contraseña | Registro |
| `tel` | teléfono | Número de teléfono | Contacto |
| `dir` | dirección | Dirección física | Ubicación |
| `tit` | título | Título de documento o elemento | Documentos, casos |
| `des` | descripción | Descripción detallada | Elementos generales |
| `tip` | tipo | Tipo o categoría general | Clasificación |
| `est` | estado | Estado actual | Elementos con estados |
| `fec` | fecha | Fecha general | Tiempo |
| `arc` | archivos | Archivos adjuntos | Documentos |
| `com` | comunidad | Comunidad étnica | Páginas étnicas |
| `ubi` | ubicación | Ubicación geográfica | Geolocalización |

## Campos Específicos por Módulo

### Usuarios y Autenticación
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `usu` | usuario | Usuario del sistema |
| `num_doc` | número_documento | Número de documento |
| `tip_doc` | tipo_documento | Tipo de documento (CC, TI, etc.) |
| `rol` | rol | Rol del usuario |
| `ciu` | ciudad | Ciudad de residencia |
| `dep` | departamento | Departamento de residencia |
| `gen` | género | Género de la persona |
| `cor_ver` | correo_verificado | Estado de verificación del correo |
| `cor_ver_en` | correo_verificado_en | Fecha de verificación del correo |
| `ult_acc` | último_acceso | Último acceso al sistema |
| `not` | notas | Notas adicionales |
| `est_vet` | estado_veto | Estado de veto del usuario |
| `fec_reg` | fecha_registro | Fecha de registro |

### Búsquedas y Filtros
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `bus` | búsqueda | Término de búsqueda |
| `filtroEst` | filtro_estado | Filtro por estado |
| `filtroTip` | filtro_tipo | Filtro por tipo |
| `filtroPri` | filtro_prioridad | Filtro por prioridad |
| `filtroEsp` | filtro_especialidad | Filtro por especialidad |
| `filtroExp` | filtro_experiencia | Filtro por experiencia |
| `filtroCom` | filtro_comunidad | Filtro por comunidad |
| `filtroCat` | filtro_categoría | Filtro por categoría |
| `filtroReg` | filtro_región | Filtro por región |

### Fechas Específicas
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `fec_ini` | fecha_inicio | Fecha de inicio |
| `fec_fin` | fecha_fin | Fecha de finalización |
| `fec_ven` | fecha_vencimiento | Fecha de vencimiento |
| `fec_pub` | fecha_publicación | Fecha de publicación |
| `fec_cierre` | fecha_cierre | Fecha de cierre |
| `fec_rad` | fecha_radicación | Fecha de radicación |
| `fec_hec` | fecha_hecho | Fecha del hecho |
| `fec_vig` | fecha_vigencia | Fecha de vigencia |
| `fec_cre` | fecha_creación | Fecha de creación |
| `fec_dec` | fecha_declaración | Fecha de declaración |
| `fec_rec` | fecha_reconocimiento | Fecha de reconocimiento |

### Campos de Tiempo
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `created_at` | fecha_creación | Fecha de creación del registro |
| `updated_at` | fecha_actualización | Fecha de última actualización |
| `deleted_at` | fecha_eliminación | Fecha de eliminación (soft delete) |

### Campos de Relaciones
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `dep_id` | dependencia_id | ID de dependencia |
| `pre_id` | presupuesto_id | ID de presupuesto |
| `tar_id` | tarea_id | ID de tarea |
| `apu_sel` | apu_seleccionado | APU seleccionado |
| `ent_dem` | entidad_demandada | Entidad demandada |
| `ent_des` | entidad_destinataria | Entidad destinataria |

### Campos de Costos y Presupuestos
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `cos_est` | costo_estimado | Costo estimado |
| `cos_hor` | costo_hora | Costo por hora |
| `cos_uso` | costo_uso | Costo de uso |
| `pre` | presupuesto | Presupuesto |
| `pre_uni` | precio_unitario | Precio unitario |
| `mon` | monto | Monto |

### Campos de Recursos
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `rec` | recursos | Recursos |
| `resp` | responsable | Responsable |
| `dur` | duración | Duración |
| `pro` | progreso | Progreso |
| `cap` | capacidad | Capacidad |
| `tas` | tasa | Tasa |
| `tas_hor` | tasa_horas | Tasa de horas |
| `acu` | acumulación | Acumulación |
| `cal` | calendario | Calendario |

### Campos de Análisis y IA
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `ana_ia` | análisis_ia | Análisis de IA |
| `esp_der` | especialista_derechos | Especialista en derechos |
| `esp_hec` | especialista_hechos | Especialista en hechos |
| `esp_sol` | especialista_solicitud | Especialista en solicitud |
| `esp_con` | especialista_concepto | Especialista en concepto |
| `ana_uni` | análisis_unificado | Análisis unificado |
| `con_gen` | concepto_general | Concepto general |
| `hec_ia` | hechos_ia | Hechos procesados por IA |
| `sol_ia` | solicitud_ia | Solicitud procesada por IA |
| `arc_ia` | archivo_ia | Archivo de IA |

### Campos de Evidencias y Documentos
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `evi` | evidencias | Evidencias |
| `arc_req` | archivos_requeridos | Archivos requeridos |
| `doc_ent` | documentos_entidad | Documentos de entidad |
| `hoja_vid` | hoja_vida | Hoja de vida |
| `cert` | certificaciones | Certificaciones |
| `ref` | referencias | Referencias |

### Campos de Medicina Natural
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `nom_cien` | nombre_científico | Nombre científico de la planta |
| `prop` | propiedades | Propiedades medicinales |
| `prep` | preparación | Forma de preparación |
| `dos` | dosis | Dosis recomendada |
| `cont` | contraindicaciones | Contraindicaciones |
| `par_usa` | parte_usada | Parte de la planta usada |
| `img` | imagen | Imagen de la planta |

### Campos de Derechos Étnicos
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `mar_leg` | marco_legal | Marco legal que respalda el derecho |
| `fec_vig` | fecha_vigencia | Fecha de vigencia del derecho |

### Campos de Participación Ciudadana
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `tip_pqrsfd` | tipo_pqrsfd | Tipo de PQRSFD |
| `tip_ple` | tipo_plebiscito | Tipo de plebiscito |
| `tip_ref` | tipo_referendo | Tipo de referendo |
| `tip_man` | tipo_manifiesto | Tipo de manifiesto |
| `tip_con` | tipo_consulta | Tipo de consulta |
| `tip_org` | tipo_organización | Tipo de organización |
| `tip_ent` | tipo_entidad | Tipo de entidad |
| `tip_act` | tipo_actividad | Tipo de actividad |
| `tip_asig` | tipo_asignación | Tipo de asignación |

### Campos de Acciones Constitucionales
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `der_vul` | derecho_vulnerado | Derecho vulnerado |
| `nor_inc` | norma_incumplida | Norma incumplida |
| `gru_vul` | grupo_vulnerable | Grupo vulnerable |
| `act_imp` | acto_impugnado | Acto impugnado |
| `der_col` | derecho_colectivo | Derecho colectivo |
| `tip_dan` | tipo_daño | Tipo de daño |
| `tip_dem` | tipo_demanda | Tipo de demanda |

### Campos de Justicia
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `num` | número | Número de caso |
| `acc_nte` | accionante | Accionante |
| `acc_do` | accionado | Accionado |
| `dem_nte` | demandante | Demandante |
| `dem_do` | demandado | Demandado |
| `imp` | imputado | Imputado |
| `vic` | víctima | Víctima |
| `juz` | juzgado | Juzgado |
| `jue` | juez | Juez |
| `abo` | abogado | Abogado |
| `mag` | magistrado | Magistrado |
| `pon` | ponente | Ponente |
| `sec` | secretario | Secretario |
| `fis` | fiscalía | Fiscalía |
| `fis_nom` | fiscal_nombre | Nombre del fiscal |
| `def` | defensor | Defensor |

### Campos de Control Territorial
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `sig` | sigla | Sigla de la institución |
| `niv` | nivel | Nivel de la institución |
| `sec` | sector | Sector de la institución |
| `sit_web` | sitio_web | Sitio web |
| `reg` | región | Región |
| `are` | área | Área |
| `prop` | propietario | Propietario |
| `lic` | licencia | Licencia |
| `coor` | coordenadas | Coordenadas |
| `obs` | observaciones | Observaciones |

### Campos de Estadísticas
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `tot_usu` | total_usuarios | Total de usuarios |
| `usu_vet` | usuarios_vetados | Usuarios vetados |
| `usu_act` | usuarios_activos | Usuarios activos |
| `tot_perm` | total_permisos | Total de permisos |
| `perm_act` | permisos_activos | Permisos activos |

### Campos de APU (Análisis de Precios Unitarios)
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `cod` | código | Código del APU |
| `uni` | unidad | Unidad de medida |
| `can` | cantidad | Cantidad |
| `mat` | materiales | Materiales |
| `man_obr` | mano_obra | Mano de obra |
| `equ` | equipos | Equipos |
| `sub` | subcontratos | Subcontratos |
| `otr` | otros | Otros costos |
| `ind` | indirectos | Costos indirectos |
| `uti` | utilidad | Utilidad |
| `tot` | total | Total |

### Campos de Convocatorias
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `pri` | prioridad | Prioridad |
| `post` | postulaciones | Postulaciones |
| `pri_ope` | prioridad_operadores | Prioridad para operadores |
| `ben` | beneficios | Beneficios |
| `req` | requisitos | Requisitos |

### Campos de Actividades
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `dep` | dependencias | Dependencias |
| `cos` | costos | Costos |
| `acu` | acumulación | Acumulación |

### Campos de Recursos Humanos
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `esp` | especialidad | Especialidad |
| `exp` | experiencia | Experiencia |
| `disp` | disponibilidad | Disponibilidad |
| `mot` | motivación | Motivación |
| `comp` | compromiso | Compromiso |

### Campos de Hoja de Recursos
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `eti` | etiqueta | Etiqueta |
| `ini` | iniciales | Iniciales |
| `gru` | grupo | Grupo |

### Campos de Comunicación
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `men` | mensaje | Mensaje |
| `tip_com` | tipo_comunicación | Tipo de comunicación |

### Campos de Anonimato
| Abreviación | Nombre Completo | Descripción |
|-------------|-----------------|-------------|
| `anon` | anonimato | Modo anónimo |

## Convenciones de Nomenclatura

### Reglas Generales
1. **Abreviaciones**: Máximo 3-4 caracteres para campos comunes
2. **Separadores**: Usar guiones bajos para campos compuestos (`fec_ini`, `tip_doc`)
3. **Consistencia**: Mantener la misma abreviación para el mismo concepto en todo el proyecto
4. **Legibilidad**: Las abreviaciones deben ser intuitivas y fáciles de recordar

### Patrones de Abreviación
- **Fechas**: `fec_` + descripción (`fec_ini`, `fec_fin`)
- **Filtros**: `filtro` + campo (`filtroEst`, `filtroTip`)
- **Tipos**: `tip_` + descripción (`tip_doc`, `tip_org`)
- **Costos**: `cos_` + descripción (`cos_est`, `cos_hor`)
- **Recursos**: `rec_` + descripción (cuando aplique)
- **Análisis IA**: `ana_` + descripción (`ana_ia`, `ana_uni`)

### Uso en el Proyecto
- **Frontend**: Usar las abreviaciones en estados, formularios y lógica de componentes
- **Backend**: Las abreviaciones deben coincidir con los nombres de campos en la base de datos
- **API**: Los endpoints deben usar las abreviaciones consistentemente
- **Documentación**: Referenciar siempre el nombre completo para claridad

## Notas Importantes

1. **Compatibilidad**: Esta nomenclatura debe ser consistente entre frontend y backend
2. **Mantenimiento**: Cualquier cambio en la nomenclatura debe actualizarse en este archivo
3. **Nuevos Campos**: Al agregar nuevos campos, seguir los patrones establecidos
4. **Validación**: Usar esta referencia para validar la consistencia en todo el proyecto

---

**Última actualización**: 2024-12-19
**Versión**: 1.0
**Proyecto**: CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL
