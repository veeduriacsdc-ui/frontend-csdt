import React from 'react';
import { Link } from 'react-router-dom';
import DiagnosticoConexion from '../../components/compartidas/DiagnosticoConexion';

const Inicio = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="section-large" style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="section-container">
          <h1 className="title-large" style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            marginBottom: 'clamp(20px, 3vw, 30px)'
          }}>
            CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL
          </h1>
          
          <p className="text-large" style={{
            maxWidth: '900px',
            margin: '0 auto',
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            lineHeight: '1.6',
            opacity: 0.95,
            marginBottom: 'clamp(25px, 4vw, 35px)'
          }}>
            Plataforma integral de <strong>transparencia, control social y justicia territorial</strong> 
            mediante <strong> Inteligencia Artificial, Análisis Forense Digital y Blockchain</strong>
          </p>

          {/* Botones de Acción Rápida */}
          <div style={{
            display: 'flex',
            gap: 'clamp(10px, 2vw, 20px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: 'clamp(25px, 4vw, 35px)'
          }}>
            <Link to="/consejo-ia" className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: 'clamp(10px, 2vw, 15px) clamp(20px, 3vw, 30px)',
              fontSize: 'clamp(12px, 2vw, 16px)'
            }}>
              🤖 Consejo IA
            </Link>
            <Link to="/planes-etnodesarrollo" className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: 'clamp(10px, 2vw, 15px) clamp(20px, 3vw, 30px)',
              fontSize: 'clamp(12px, 2vw, 16px)'
            }}>
              🌿 Etnodesarrollo
            </Link>
            <Link to="/geo-dashboard" className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: 'clamp(10px, 2vw, 15px) clamp(20px, 3vw, 30px)',
              fontSize: 'clamp(12px, 2vw, 16px)'
            }}>
              🗺️ GeoDashboard
            </Link>
            <Link to="/auditoria-forense" className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: 'clamp(10px, 2vw, 15px) clamp(20px, 3vw, 30px)',
              fontSize: 'clamp(12px, 2vw, 16px)'
            }}>
              🔬 Auditoría Forense
            </Link>
            <Link to="/pqrsfd" className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: 'clamp(10px, 2vw, 15px) clamp(20px, 3vw, 30px)',
              fontSize: 'clamp(12px, 2vw, 16px)'
            }}>
              📋 PQRSFD
            </Link>
          </div>
        </div>
      </section>

      {/* Sección de Módulos Principales */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc'
      }}>
        <div className="section-container">
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            marginBottom: '60px',
            color: '#1e293b'
          }}>
            MÓDULOS DEL SISTEMA CSDT
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {/* Módulo de Justicia y Acciones Legales */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>⚖️</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#7f1d1d', margin: 0 }}>
                  JUSTICIA Y ACCIONES LEGALES
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Acciones constitucionales, justicia ordinaria y extraordinaria para la protección de derechos
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/accion-tutela" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Tutela</Link>
                <Link to="/accion-cumplimiento" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Cumplimiento</Link>
                <Link to="/accion-popular" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción Popular</Link>
                <Link to="/accion-grupo" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Grupo</Link>
                <Link to="/demanda-juridica" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Demanda Jurídica</Link>
                <Link to="/accion-nulidad" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Nulidad</Link>
                <Link to="/accion-reparacion-directa" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Reparación Directa</Link>
                <Link to="/justicia-civil" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Justicia Civil</Link>
                <Link to="/justicia-penal" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Justicia Penal</Link>
                <Link to="/justicia-constitucional" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Justicia Constitucional</Link>
              </div>
            </div>

            {/* Módulo de Participación Ciudadana */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>🗳️</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0c4a6e', margin: 0 }}>
                  PARTICIPACIÓN CIUDADANA
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Mecanismos de participación democrática y control social ciudadano
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/consulta-popular" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Consulta Popular</Link>
                <Link to="/referendo" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Referendo</Link>
                <Link to="/plebiscito" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Plebiscito</Link>
                <Link to="/manifiesto" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Manifiesto Ciudadano</Link>
              </div>
            </div>

            {/* Módulo de Control Social */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>🔍</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
                  CONTROL SOCIAL
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Herramientas de veeduría, monitoreo y control territorial
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/pqrsfd" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• PQRSFD</Link>
                <Link to="/consejo-veeduria-territorial" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Consejo de Veeduría</Link>
                <Link to="/monitor" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Monitor de Actividades</Link>
              </div>
            </div>

            {/* Módulo de Innovación Tecnológica */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>🚀</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#92400e', margin: 0 }}>
                  INNOVACIÓN TECNOLÓGICA
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Inteligencia artificial, análisis forense y tecnologías avanzadas
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/consejo-ia" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Consejo IA</Link>
                <Link to="/consejo-ia-avanzado" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Consejo IA Avanzado</Link>
                <Link to="/geo-dashboard" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• GeoDashboard</Link>
                <Link to="/auditoria-forense" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Auditoría Forense</Link>
                <Link to="/ia/especialistas" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Especialistas IA</Link>
              </div>
            </div>

            {/* Módulo de Mecanismos Étnicos */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>🌿</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#5b21b6', margin: 0 }}>
                  MECANISMOS ÉTNICOS
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Protección de derechos étnicos y desarrollo territorial ancestral
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/planes-etnodesarrollo" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Planes de Etnodesarrollo</Link>
                <Link to="/planes-etnodesarrollo-avanzado" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Etnodesarrollo Avanzado</Link>
                <Link to="/consulta-previa-etnica" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Consulta Previa Étnica</Link>
                <Link to="/derechos-etnicos" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Derechos Étnicos</Link>
                <Link to="/territorios-ancestrales" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Territorios Ancestrales</Link>
                <Link to="/patrimonio-cultural" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Patrimonio Cultural</Link>
                <Link to="/mediacion-intercultural" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Mediación Intercultural</Link>
                <Link to="/educacion-propia" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Educación Propia</Link>
                <Link to="/historia-territorio" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Historia del Territorio</Link>
                <Link to="/narraciones-etnicas" style={{ color: '#5b21b6', textDecoration: 'none', fontSize: '14px' }}>• Narraciones Étnicas</Link>
              </div>
            </div>

            {/* Módulo de Control Territorial */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>🏛️</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
                  CONTROL TERRITORIAL
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Supervisión y control de instituciones y actividades territoriales
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/control-mineria-predios" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Control Minería y Predios</Link>
                <Link to="/control-instituciones" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Control Instituciones</Link>
                <Link to="/control-regional" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Control Regional</Link>
              </div>
            </div>

            {/* Módulo de Medicina Natural */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>🌱</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#166534', margin: 0 }}>
                  MEDICINA NATURAL
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Conocimiento tradicional y medicina ancestral
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/medicina-natural" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Medicina Natural</Link>
              </div>
            </div>

            {/* Módulo Institucional */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>🏢</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#334155', margin: 0 }}>
                  INSTITUCIONAL
                </h3>
              </div>
              <p style={{ color: '#64748b', marginBottom: '20px', fontSize: '14px' }}>
                Información institucional y servicios generales
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/institucional" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Página Institucional</Link>
                <Link to="/proyectos" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Proyectos</Link>
                <Link to="/donaciones" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Donaciones</Link>
                <Link to="/contacto" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Contacto</Link>
                <Link to="/noticias" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Noticias</Link>
                <Link to="/documentos" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Documentos</Link>
                <Link to="/ayuda" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Ayuda</Link>
                <Link to="/terminos" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Términos</Link>
                <Link to="/convocatorias" style={{ color: '#334155', textDecoration: 'none', fontSize: '14px' }}>• Convocatorias</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Acceso por Roles */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div className="section-container">
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            marginBottom: '60px',
            color: '#1e293b'
          }}>
            ACCESO POR ROLES DE USUARIO
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {/* Administrador */}
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>👨‍💼</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                  ADMINISTRADOR
                </h3>
              </div>
              <p style={{ marginBottom: '20px', fontSize: '14px', opacity: 0.9 }}>
                Gestión completa del sistema y supervisión de operaciones
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/admin/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Dashboard Administrador</Link>
                <Link to="/admin/usuarios" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Gestión de Usuarios</Link>
                <Link to="/admin/veedurias" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Gestión de Veedurías</Link>
                <Link to="/admin/donaciones" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Gestión de Donaciones</Link>
                <Link to="/admin/tareas" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Gestión de Tareas</Link>
                <Link to="/admin/estadisticas" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Estadísticas</Link>
              </div>
            </div>

            {/* Operador */}
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>👨‍💻</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                  OPERADOR
                </h3>
              </div>
              <p style={{ marginBottom: '20px', fontSize: '14px', opacity: 0.9 }}>
                Ejecución de tareas y gestión operativa del sistema
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/operador/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Dashboard Operador</Link>
                <Link to="/operador/tareas-asignadas" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Tareas Asignadas</Link>
                <Link to="/operador/centro-gestion-legal" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Centro Gestión Legal</Link>
                <Link to="/operador/panel-tareas" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Panel de Tareas</Link>
                <Link to="/operador/veedurias" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Gestión Veedurías</Link>
              </div>
            </div>

            {/* Cliente */}
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ fontSize: '32px', marginRight: '15px' }}>👤</div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
                  CLIENTE
                </h3>
              </div>
              <p style={{ marginBottom: '20px', fontSize: '14px', opacity: 0.9 }}>
                Acceso a servicios y seguimiento de casos
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/cliente/dashboard" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Dashboard Cliente</Link>
                <Link to="/cliente/veedurias" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Mis Veedurías</Link>
                <Link to="/cliente/seguimiento-casos" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Seguimiento de Casos</Link>
                <Link to="/cliente/tareas-a-realizar" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>• Tareas a Realizar</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Propuesta de Valor */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc'
      }}>
        <div className="section-container">
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            marginBottom: '60px',
            color: '#1e293b'
          }}>
            ¿POR QUÉ ELEGIR EL CSDT?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏆</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
                Primera en Colombia
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Plataforma pionera en análisis forense territorial y control social digital
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌍</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
                Estándares Internacionales
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Cumplimiento con normativas globales de transparencia y gobernanza
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔒</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
                Seguridad Avanzada
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Blockchain y criptografía para proteger la integridad de los datos
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤖</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
                Inteligencia Artificial
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Análisis automatizado y asesoría legal inteligente
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚡</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
                Eficiencia Total
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Procesos automatizados que reducen tiempos y costos
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌿</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: '#1e293b' }}>
                Enfoque Étnico
              </h3>
              <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6' }}>
                Protección especial de derechos étnicos y territoriales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Acciones Rápidas */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div className="section-container">
          <h2 style={{
            textAlign: 'center',
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            marginBottom: '60px',
            color: '#1e293b'
          }}>
            ACCIONES RÁPIDAS
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            <Link to="/consejo-ia" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🤖</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                Consejo IA
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Asesoría legal inteligente y análisis jurídico automatizado
              </p>
            </Link>

            <Link to="/geo-dashboard" style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🗺️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                GeoDashboard
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Análisis geoespacial y control territorial avanzado
              </p>
            </Link>

            <Link to="/auditoria-forense" style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔬</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                Auditoría Forense
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Análisis forense digital y trazabilidad de documentos
              </p>
            </Link>

            <Link to="/pqrsfd" style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                PQRSFD
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Sistema de peticiones, quejas y denuncias ciudadanas
              </p>
            </Link>

            <Link to="/planes-etnodesarrollo" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌿</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                Etnodesarrollo
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Planes de desarrollo territorial étnico y ancestral
              </p>
            </Link>

            <Link to="/medicina-natural" style={{
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textDecoration: 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🌱</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                Medicina Natural
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.9 }}>
                Conocimiento tradicional y medicina ancestral
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Componente de Diagnóstico de Conexión */}
      <DiagnosticoConexion />
    </div>
  );
};

export default Inicio;
