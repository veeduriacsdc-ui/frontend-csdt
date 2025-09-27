import React from 'react';
import { Link } from 'react-router-dom';

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
            opacity: 0.95,
            marginBottom: 'clamp(20px, 3vw, 30px)'
          }}>
            <strong>Plataforma tecnológica integral para el control social, justicia y transparencia en Colombia</strong>
          </p>
          
          <p className="text-medium" style={{
            maxWidth: '900px',
            margin: '0 auto',
            opacity: 0.9,
            marginBottom: 'clamp(25px, 4vw, 35px)'
          }}>
            Detectando, previniendo y denunciando irregularidades en tierras, minería y actos administrativos mediante 
            <strong> Inteligencia Artificial, Análisis Forense Digital y Blockchain</strong>
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
              📝 PQRSFD
            </Link>
          </div>
        </div>
      </section>


      {/* Sección del Ciclo de Justicia y Proceso Legal */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              ⚖️ Ciclo de Justicia y Proceso Legal
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Entendiendo el proceso completo de justicia en Colombia y cómo el CSDT fortalece cada etapa
            </p>
          </div>

          {/* Proceso de Justicia */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              🔄 El Ciclo Completo de Justicia
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px'
            }}>
              {/* 1. Denuncia */}
              <div style={{
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #fecaca',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📢</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '10px'
                }}>
                  1. Denuncia
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#7f1d1d',
                  lineHeight: '1.6'
                }}>
                  Ciudadanos reportan irregularidades a través de PQRSFD, acciones constitucionales o mecanismos de participación
                </p>
              </div>

              {/* 2. Investigación */}
              <div style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #bae6fd',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔍</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#0369a1',
                  marginBottom: '10px'
                }}>
                  2. Investigación
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#0c4a6e',
                  lineHeight: '1.6'
                }}>
                  Análisis forense digital, IA predictiva y geoanálisis para detectar patrones de corrupción y fraudes
                </p>
              </div>

              {/* 3. Evidencia */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #bbf7d0',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📋</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  3. Evidencia
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  Recopilación y certificación de evidencias con blockchain, firma electrónica y sello de tiempo
                </p>
              </div>

              {/* 4. Proceso Judicial */}
              <div style={{
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #c4b5fd',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚖️</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#7c3aed',
                  marginBottom: '10px'
                }}>
                  4. Proceso Judicial
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#5b21b6',
                  lineHeight: '1.6'
                }}>
                  Presentación ante JEP, Fiscalía, Contraloría y organismos de control con evidencia certificada
                </p>
              </div>

              {/* 5. Sentencia */}
              <div style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #fcd34d',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📜</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#d97706',
                  marginBottom: '10px'
                }}>
                  5. Sentencia
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#92400e',
                  lineHeight: '1.6'
                }}>
                  Resolución judicial basada en evidencia certificada y análisis forense digital
                </p>
              </div>

              {/* 6. Reparación */}
              <div style={{
                background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #cbd5e1',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔄</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#475569',
                  marginBottom: '10px'
                }}>
                  6. Reparación
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#334155',
                  lineHeight: '1.6'
                }}>
                  Implementación de medidas de reparación y justicia transicional para víctimas
                </p>
              </div>
            </div>
          </div>

          {/* Estructura del Estado Colombiano */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            color: 'white',
            padding: '40px',
            borderRadius: '20px',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              🏛️ Estructura del Estado Colombiano y Poder Judicial
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '25px'
            }}>
              {/* Rama Judicial */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#fbbf24'
                }}>
                  ⚖️ Rama Judicial
                </h4>
                <ul style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li style={{ marginBottom: '8px' }}><strong>Corte Suprema de Justicia:</strong> Máximo tribunal ordinario</li>
                  <li style={{ marginBottom: '8px' }}><strong>Corte Constitucional:</strong> Guardián de la Constitución</li>
                  <li style={{ marginBottom: '8px' }}><strong>Consejo Superior de la Judicatura:</strong> Administración judicial</li>
                  <li style={{ marginBottom: '8px' }}><strong>Fiscalía General:</strong> Investigación penal</li>
                  <li style={{ marginBottom: '8px' }}><strong>Defensoría del Pueblo:</strong> Derechos humanos</li>
                  <li style={{ marginBottom: '8px' }}><strong>Tribunales Superiores:</strong> Segunda instancia</li>
                  <li><strong>Juzgados:</strong> Primera instancia</li>
                </ul>
              </div>

              {/* Rama Ejecutiva */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#fbbf24'
                }}>
                  🏛️ Rama Ejecutiva
                </h4>
                <ul style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li style={{ marginBottom: '8px' }}><strong>Presidencia:</strong> Jefe de Estado y Gobierno</li>
                  <li style={{ marginBottom: '8px' }}><strong>Vicepresidencia:</strong> Suplencia presidencial</li>
                  <li style={{ marginBottom: '8px' }}><strong>Ministerios:</strong> Administración sectorial</li>
                  <li style={{ marginBottom: '8px' }}><strong>Superintendencias:</strong> Control sectorial</li>
                  <li style={{ marginBottom: '8px' }}><strong>Entidades Descentralizadas:</strong> Servicios especializados</li>
                  <li style={{ marginBottom: '8px' }}><strong>Gobernaciones:</strong> Administración departamental</li>
                  <li><strong>Alcaldías:</strong> Administración municipal</li>
                </ul>
              </div>

              {/* Rama Legislativa */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#fbbf24'
                }}>
                  🏛️ Rama Legislativa
                </h4>
                <ul style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li style={{ marginBottom: '8px' }}><strong>Congreso:</strong> Cámara y Senado</li>
                  <li style={{ marginBottom: '8px' }}><strong>Comisiones Constitucionales:</strong> Análisis especializado</li>
                  <li style={{ marginBottom: '8px' }}><strong>Comisiones Legales:</strong> Temas específicos</li>
                  <li style={{ marginBottom: '8px' }}><strong>Comisiones Accidentales:</strong> Investigación</li>
                  <li style={{ marginBottom: '8px' }}><strong>Asambleas Departamentales:</strong> Legislación departamental</li>
                  <li style={{ marginBottom: '8px' }}><strong>Concejos Municipales:</strong> Legislación local</li>
                  <li><strong>Juntas Administradoras:</strong> Administración local</li>
                </ul>
              </div>

              {/* Organismos de Control */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#fbbf24'
                }}>
                  🔍 Organismos de Control
                </h4>
                <ul style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li style={{ marginBottom: '8px' }}><strong>Contraloría General:</strong> Control fiscal</li>
                  <li style={{ marginBottom: '8px' }}><strong>Procuraduría General:</strong> Control disciplinario</li>
                  <li style={{ marginBottom: '8px' }}><strong>Veedurías Ciudadanas:</strong> Control social</li>
                  <li style={{ marginBottom: '8px' }}><strong>Personerías:</strong> Control local</li>
                  <li style={{ marginBottom: '8px' }}><strong>Auditoría General:</strong> Control interno</li>
                  <li style={{ marginBottom: '8px' }}><strong>JEP:</strong> Justicia Especial para la Paz</li>
                  <li><strong>Comisión de la Verdad:</strong> Verdad histórica</li>
                </ul>
              </div>

              {/* Jurisdicciones Especiales */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#fbbf24'
                }}>
                  ⚖️ Jurisdicciones Especiales
                </h4>
                <ul style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li style={{ marginBottom: '8px' }}><strong>Contencioso Administrativo:</strong> Control administrativo</li>
                  <li style={{ marginBottom: '8px' }}><strong>Familia:</strong> Asuntos familiares</li>
                  <li style={{ marginBottom: '8px' }}><strong>Laboral:</strong> Conflictos laborales</li>
                  <li style={{ marginBottom: '8px' }}><strong>Penal:</strong> Delitos y contravenciones</li>
                  <li style={{ marginBottom: '8px' }}><strong>Civil:</strong> Asuntos civiles</li>
                  <li style={{ marginBottom: '8px' }}><strong>Constitucional:</strong> Control constitucional</li>
                  <li><strong>Paz:</strong> Justicia comunitaria</li>
                </ul>
              </div>

              {/* Mecanismos de Participación */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '25px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  color: '#fbbf24'
                }}>
                  🗳️ Mecanismos de Participación
                </h4>
                <ul style={{
                  fontSize: '14px',
                  lineHeight: '1.6',
                  paddingLeft: '20px',
                  margin: 0
                }}>
                  <li style={{ marginBottom: '8px' }}><strong>Voto:</strong> Participación electoral</li>
                  <li style={{ marginBottom: '8px' }}><strong>Plebiscito:</strong> Consulta presidencial</li>
                  <li style={{ marginBottom: '8px' }}><strong>Referendo:</strong> Aprobación de normas</li>
                  <li style={{ marginBottom: '8px' }}><strong>Consulta Popular:</strong> Decisión competencial</li>
                  <li style={{ marginBottom: '8px' }}><strong>Cabildo Abierto:</strong> Reunión pública</li>
                  <li style={{ marginBottom: '8px' }}><strong>Iniciativa Popular:</strong> Proyectos de ley</li>
                  <li><strong>Revocatoria:</strong> Destitución de elegidos</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Proceso de Veeduría Territorial */}
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            padding: '40px',
            borderRadius: '20px',
            marginBottom: '40px',
            border: '2px solid #bbf7d0'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#16a34a',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              🔍 Proceso de Veeduría Territorial
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '25px'
            }}>
              {/* Identificación */}
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #86efac',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>🎯</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  1. Identificación
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  Detección de irregularidades en tierras, minería, contratación y actos administrativos mediante IA
                </p>
              </div>

              {/* Documentación */}
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #86efac',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📄</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  2. Documentación
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  Recopilación y análisis forense de documentos, mapas, contratos y actos administrativos
                </p>
              </div>

              {/* Análisis */}
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #86efac',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔬</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  3. Análisis
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  Análisis forense digital, geoanálisis y machine learning para detectar patrones de corrupción
                </p>
              </div>

              {/* Evidencia */}
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #86efac',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📋</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  4. Evidencia
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  Certificación de evidencias con blockchain, firma electrónica y sello de tiempo
                </p>
              </div>

              {/* Denuncia */}
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #86efac',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📢</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  5. Denuncia
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  Presentación de denuncias ante organismos de control con evidencia certificada
                </p>
              </div>

              {/* Seguimiento */}
              <div style={{
                background: 'white',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #86efac',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '15px' }}>📊</div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  6. Seguimiento
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6'
                }}>
                  Monitoreo del proceso y rendición de cuentas a la ciudadanía
                </p>
              </div>
            </div>
          </div>

          {/* Mecanismos de Control Social */}
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              🛡️ Mecanismos de Control Social
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px'
            }}>
              {/* Veedurías Ciudadanas */}
              <div style={{
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #bbf7d0'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '15px'
                }}>
                  👥 Veedurías Ciudadanas
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#166534',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  Organizaciones de la sociedad civil que vigilan la gestión pública y denuncian irregularidades
                </p>
                <ul style={{
                  fontSize: '12px',
                  color: '#166534',
                  lineHeight: '1.5',
                  paddingLeft: '15px',
                  margin: 0
                }}>
                  <li>Veeduría de contratación</li>
                  <li>Veeduría de obras públicas</li>
                  <li>Veeduría de servicios públicos</li>
                  <li>Veeduría de salud</li>
                </ul>
              </div>

              {/* Acciones Constitucionales */}
              <div style={{
                background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #fecaca'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '15px'
                }}>
                  ⚖️ Acciones Constitucionales
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#7f1d1d',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  Herramientas jurídicas para proteger derechos fundamentales y denunciar violaciones
                </p>
                <ul style={{
                  fontSize: '12px',
                  color: '#7f1d1d',
                  lineHeight: '1.5',
                  paddingLeft: '15px',
                  margin: 0
                }}>
                  <li>Acción de Tutela</li>
                  <li>Acción de Cumplimiento</li>
                  <li>Acción Popular</li>
                  <li>Acción de Grupo</li>
                </ul>
              </div>

              {/* Mecanismos de Participación */}
              <div style={{
                background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #bae6fd'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#0369a1',
                  marginBottom: '15px'
                }}>
                  🗳️ Mecanismos de Participación
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#0c4a6e',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  Instrumentos democráticos para que los ciudadanos participen en las decisiones públicas
                </p>
                <ul style={{
                  fontSize: '12px',
                  color: '#0c4a6e',
                  lineHeight: '1.5',
                  paddingLeft: '15px',
                  margin: 0
                }}>
                  <li>Consulta Popular</li>
                  <li>Referendo</li>
                  <li>Plebiscito</li>
                  <li>Manifiesto Ciudadano</li>
                </ul>
              </div>

              {/* Control Fiscal */}
              <div style={{
                background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
                padding: '25px',
                borderRadius: '15px',
                border: '2px solid #c4b5fd'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#7c3aed',
                  marginBottom: '15px'
                }}>
                  💰 Control Fiscal
                </h4>
                <p style={{
                  fontSize: '14px',
                  color: '#5b21b6',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  Vigilancia de la gestión fiscal y presupuestal de las entidades públicas
                </p>
                <ul style={{
                  fontSize: '12px',
                  color: '#5b21b6',
                  lineHeight: '1.5',
                  paddingLeft: '15px',
                  margin: 0
                }}>
                  <li>Auditorías fiscales</li>
                  <li>Control de contratación</li>
                  <li>Vigilancia presupuestal</li>
                  <li>Denuncias por malversación</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Funcionalidades Implementadas */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              🚀 Funcionalidades Implementadas
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Plataforma completa con múltiples herramientas para el control social y la transparencia territorial
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {/* Acciones Constitucionales */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #fecaca',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚖️</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#dc2626',
                marginBottom: '15px'
              }}>
                Acciones Constitucionales
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/accion-tutela" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Tutela</Link>
                <Link to="/accion-cumplimiento" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Cumplimiento</Link>
                <Link to="/accion-popular" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción Popular</Link>
                <Link to="/accion-grupo" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Grupo</Link>
                <Link to="/demanda-juridica" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Demanda Jurídica</Link>
                <Link to="/accion-nulidad" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Nulidad</Link>
                <Link to="/accion-reparacion-directa" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Acción de Reparación Directa</Link>
              </div>
            </div>

            {/* Participación Ciudadana */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #bae6fd',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🗳️</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#0369a1',
                marginBottom: '15px'
              }}>
                Participación Ciudadana
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/consulta-popular" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Consulta Popular</Link>
                <Link to="/referendo" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Referendo</Link>
                <Link to="/plebiscito" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Plebiscito</Link>
                <Link to="/manifiesto" style={{ color: '#0c4a6e', textDecoration: 'none', fontSize: '14px' }}>• Manifiesto Ciudadano</Link>
              </div>
            </div>

            {/* Control Social */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #bbf7d0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔍</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#16a34a',
                marginBottom: '15px'
              }}>
                Control Social
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/pqrsfd" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• PQRSFD</Link>
                <Link to="/consejo-veeduria-territorial" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Consejo de Veeduría</Link>
                <Link to="/monitor" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Monitor de Actividades</Link>
              </div>
            </div>

            {/* Herramientas Innovadoras */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #fcd34d',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🚀</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#d97706',
                marginBottom: '15px'
              }}>
                Herramientas Innovadoras
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/consejo-ia" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Consejo IA</Link>
                <Link to="/consejo-ia-avanzado" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Consejo IA Avanzado</Link>
                <Link to="/geo-dashboard" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• GeoDashboard</Link>
                <Link to="/auditoria-forense" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Auditoría Forense</Link>
                <Link to="/ia/especialistas" style={{ color: '#92400e', textDecoration: 'none', fontSize: '14px' }}>• Especialistas IA</Link>
              </div>
            </div>

            {/* Mecanismos Étnicos */}
            <div style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #c4b5fd',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🌿</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '15px'
              }}>
                Mecanismos Étnicos
              </h3>
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

            {/* Justicia Ordinaria */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #fecaca',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>⚖️</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#dc2626',
                marginBottom: '15px'
              }}>
                Justicia Ordinaria
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/justicia-civil" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Justicia Civil</Link>
                <Link to="/justicia-penal" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Justicia Penal</Link>
                <Link to="/justicia-constitucional" style={{ color: '#7f1d1d', textDecoration: 'none', fontSize: '14px' }}>• Justicia Constitucional</Link>
              </div>
            </div>

            {/* Control Territorial */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #bbf7d0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🗺️</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#16a34a',
                marginBottom: '15px'
              }}>
                Control Territorial
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/control-mineria-predios" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Control Minería y Predios</Link>
                <Link to="/control-instituciones" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Control Instituciones</Link>
                <Link to="/control-regional" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Control Regional</Link>
              </div>
            </div>

            {/* Medicina Natural */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #bbf7d0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🌿</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#16a34a',
                marginBottom: '15px'
              }}>
                Medicina Natural
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                <Link to="/medicina-natural" style={{ color: '#166534', textDecoration: 'none', fontSize: '14px' }}>• Medicina Natural</Link>
              </div>
            </div>

            {/* Páginas Institucionales */}
            <div style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #cbd5e1',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏛️</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#475569',
                marginBottom: '15px'
              }}>
                Institucional
              </h3>
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

      {/* Sección de Visión y Misión */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              Nuestra Visión y Misión
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Transformando la justicia territorial mediante tecnología avanzada y control social
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            {/* Visión */}
            <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#dbeafe',
                borderRadius: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
                marginBottom: '20px'
          }}>
                <span style={{ fontSize: '30px' }}>🎯</span>
          </div>
                <h3 style={{
                  fontSize: '20px',
                    fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  Visión
                </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Ser la plataforma tecnológica líder en Colombia para el control social, 
                transparencia y trazabilidad en la gestión de tierras, minería y actos administrativos, 
                contribuyendo a la justicia transicional y la construcción de paz.
              </p>
            </div>

            {/* Misión */}
                  <div style={{
              background: 'white',
              padding: '40px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#dcfce7',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '30px' }}>⚡</span>
              </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  Misión
                </h3>
              <p style={{
                fontSize: '16px',
                color: '#6b7280',
                    lineHeight: '1.6'
                  }}>
                Desarrollar e implementar una plataforma tecnológica integral que fortalezca 
                el control social, detecte irregularidades mediante IA y análisis forense, 
                y proporcione evidencia certificada para la justicia transicional.
                    </p>
                  </div>
          </div>
        </div>
      </section>

      {/* Sección de Objetivos del Proyecto */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              Objetivos del Proyecto CSDT
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Metas claras y específicas para transformar la gestión territorial en Colombia
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}>
            {/* Objetivo General */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              padding: '40px',
              borderRadius: '20px',
              border: '2px solid #0ea5e9',
              boxShadow: '0 8px 25px rgba(14, 165, 233, 0.15)'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#0ea5e9',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '25px'
              }}>
                <span style={{ fontSize: '35px' }}>🎯</span>
              </div>
                <h3 style={{
                  fontSize: '20px',
              fontWeight: 'bold',
                  color: '#0c4a6e',
                  marginBottom: '20px'
                }}>
                  Objetivo General
                </h3>
              <p style={{
              fontSize: '16px',
                color: '#075985',
                lineHeight: '1.7',
                marginBottom: '20px'
              }}>
                Desarrollar e implementar una plataforma tecnológica integral, segura y escalable, 
                que permita fortalecer el control social, la transparencia y la trazabilidad en la 
                gestión de tierras, minería y actos administrativos.
              </p>
              <div style={{
                background: 'rgba(14, 165, 233, 0.1)',
                padding: '15px',
                borderRadius: '12px',
                border: '1px solid rgba(14, 165, 233, 0.2)'
              }}>
                <p style={{
                  fontSize: '14px',
                  color: '#0c4a6e',
                  margin: 0,
                  fontStyle: 'italic'
                }}>
                  Incorporando capacidades de análisis forense digital, inteligencia artificial, 
                  auditoría en tiempo real y mecanismos de anonimización de datos.
                </p>
              </div>
            </div>

            {/* Objetivos Específicos */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '40px',
              borderRadius: '20px',
              border: '2px solid #22c55e',
              boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#22c55e',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '25px'
              }}>
                <span style={{ fontSize: '35px' }}>📋</span>
              </div>
                <h3 style={{
                  fontSize: '20px',
              fontWeight: 'bold',
                  color: '#14532d',
                  marginBottom: '20px'
                }}>
                  Objetivos Específicos
                </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#14532d',
                    margin: 0,
                    fontWeight: '600'
                  }}>
                    <span style={{ color: '#16a34a' }}>1.</span> Fortalecer el control social mediante herramientas tecnológicas
                  </p>
                </div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#14532d',
                    margin: 0,
                    fontWeight: '600'
                  }}>
                    <span style={{ color: '#16a34a' }}>2.</span> Detectar y prevenir irregularidades con IA y análisis forense
                  </p>
                </div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#14532d',
                    margin: 0,
                    fontWeight: '600'
                  }}>
                    <span style={{ color: '#16a34a' }}>3.</span> Aplicar seguridad por diseño y anonimización de datos
                  </p>
                </div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#14532d',
                    margin: 0,
                    fontWeight: '600'
                  }}>
                    <span style={{ color: '#16a34a' }}>4.</span> Apoyar la justicia transicional con evidencia certificada
                  </p>
                </div>
                <div style={{
                  background: 'rgba(34, 197, 94, 0.1)',
                  padding: '12px 15px',
                  borderRadius: '10px',
                  border: '1px solid rgba(34, 197, 94, 0.2)'
                }}>
                  <p style={{
                    fontSize: '14px',
                    color: '#14532d',
                    margin: 0,
                    fontWeight: '600'
                  }}>
                    <span style={{ color: '#16a34a' }}>5.</span> Promover la legalidad y el ordenamiento territorial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Conservación de Información y Trazabilidad */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              Conservación de Información y Trazabilidad
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Garantizamos la integridad, inmutabilidad y trazabilidad completa de todas las actividades
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {/* Conservación de Información */}
            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dbeafe',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>
                <span style={{ fontSize: '40px' }}>💾</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '20px'
                }}>
                  Conservación de Información
                </h3>
              <ul style={{
                textAlign: 'left',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li style={{ marginBottom: '10px' }}>Almacenamiento seguro con cifrado avanzado</li>
                <li style={{ marginBottom: '10px' }}>Copias de seguridad automatizadas</li>
                <li style={{ marginBottom: '10px' }}>Integridad de datos verificada</li>
                <li style={{ marginBottom: '10px' }}>Acceso controlado por roles</li>
                <li style={{ marginBottom: '10px' }}>Retención de datos según normativa</li>
                <li>Recuperación ante desastres</li>
              </ul>
              </div>

            {/* Trazabilidad de Actividades */}
            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dcfce7',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>
                <span style={{ fontSize: '40px' }}>🔍</span>
            </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '20px'
                }}>
                  Trazabilidad Completa
                </h3>
              <ul style={{
                textAlign: 'left',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li style={{ marginBottom: '10px' }}>Log de todas las acciones del sistema</li>
                <li style={{ marginBottom: '10px' }}>Auditoría forense en tiempo real</li>
                <li style={{ marginBottom: '10px' }}>Cadena de custodia digital</li>
                <li style={{ marginBottom: '10px' }}>Sello de tiempo y firma electrónica</li>
                <li style={{ marginBottom: '10px' }}>Blockchain para inmutabilidad</li>
                <li>Reportes de trazabilidad automáticos</li>
              </ul>
              </div>

            {/* Actividades Intrazables */}
            <div style={{
              background: 'white',
              padding: '35px',
              borderRadius: '20px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#fef3c7',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 25px'
              }}>
                <span style={{ fontSize: '40px' }}>🚫</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '20px'
                }}>
                  Actividades Intrazables
                </h3>
              <ul style={{
                textAlign: 'left',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li style={{ marginBottom: '10px' }}>Anonimización automática de datos</li>
                <li style={{ marginBottom: '10px' }}>Protección de identidad de víctimas</li>
                <li style={{ marginBottom: '10px' }}>Enmascaramiento de información sensible</li>
                <li style={{ marginBottom: '10px' }}>Acceso bajo principio de mínimo privilegio</li>
                <li style={{ marginBottom: '10px' }}>Cifrado end-to-end</li>
                <li>Protección de denunciantes</li>
              </ul>
            </div>
              </div>

          {/* Características Técnicas */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            color: 'white',
            padding: '40px',
            borderRadius: '20px',
            marginTop: '50px',
            textAlign: 'center'
          }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}>
                  Características Técnicas Avanzadas
                </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '25px',
              marginTop: '30px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '30px', marginBottom: '10px' }}>🔐</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Cifrado TLS/SSL</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Comunicación segura en tránsito</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '30px', marginBottom: '10px' }}>🔗</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Blockchain</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Registro inmutable de evidencias</p>
            </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '30px', marginBottom: '10px' }}>📝</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Firma Electrónica</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Autenticidad de documentos</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '30px', marginBottom: '10px' }}>⏰</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Sello de Tiempo</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Certificación temporal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Innovación */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              Lo Innovador de la Plataforma CSDT
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Tecnologías disruptivas que revolucionan el control social y la transparencia territorial
            </p>
          </div>
          
              <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {/* Análisis Forense Digital */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #fca5a5',
              textAlign: 'center'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#fca5a5',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '35px' }}>🔬</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#991b1b',
                  marginBottom: '15px'
                }}>
                  Análisis Forense Digital
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#7f1d1d',
                lineHeight: '1.6',
                margin: 0
              }}>
                Primera plataforma en Colombia que combina análisis forense informático 
                con auditoría de documentos territoriales para detectar fraudes catastrales.
              </p>
            </div>
            
            {/* IA Predictiva */}
              <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #7dd3fc',
              textAlign: 'center'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#7dd3fc',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '35px' }}>🤖</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#0c4a6e',
                  marginBottom: '15px'
                }}>
                Inteligencia Artificial
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#075985',
                lineHeight: '1.6',
                margin: 0
              }}>
                Machine Learning avanzado para detectar patrones de corrupción, 
                blanqueamiento catastral y redes ilícitas en tiempo real.
              </p>
            </div>
            
            {/* Geoanálisis Avanzado */}
              <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #86efac',
              textAlign: 'center'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#86efac',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '35px' }}>🗺️</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#14532d',
                  marginBottom: '15px'
                }}>
                  Geoanálisis Avanzado
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#166534',
                lineHeight: '1.6',
                margin: 0
              }}>
                Integración de mapas interactivos con análisis espacial para 
                detectar superposiciones y errores catastrales.
              </p>
            </div>
            
            {/* Blockchain para Evidencias */}
              <div style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #c4b5fd',
              textAlign: 'center'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#c4b5fd',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '35px' }}>⛓️</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#5b21b6',
                  marginBottom: '15px'
                }}>
                  Blockchain para Evidencias
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#4c1d95',
                lineHeight: '1.6',
                margin: 0
              }}>
                Registro inmutable de evidencias digitales con validez jurídica 
                para procesos ante JEP y organismos internacionales.
              </p>
            </div>

            {/* Anonimización Inteligente */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #fcd34d',
              textAlign: 'center'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#fcd34d',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '35px' }}>🛡️</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#92400e',
                  marginBottom: '15px'
                }}>
                  Anonimización Inteligente
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#78350f',
                lineHeight: '1.6',
                margin: 0
              }}>
                Protección automática de datos sensibles manteniendo la utilidad 
                para análisis y preservando la privacidad de víctimas.
              </p>
            </div>

            {/* Justicia Transicional Digital */}
            <div style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #94a3b8',
              textAlign: 'center'
            }}>
              <div style={{
                width: '70px',
                height: '70px',
                backgroundColor: '#94a3b8',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '35px' }}>⚖️</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#334155',
                  marginBottom: '15px'
                }}>
                  Justicia Transicional Digital
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#1e293b',
                lineHeight: '1.6',
                margin: 0
              }}>
                Primera plataforma diseñada específicamente para apoyar procesos 
                de justicia transicional con evidencia certificada digitalmente.
              </p>
            </div>
          </div>

          {/* Resumen de Innovación */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
            color: 'white',
            padding: '50px',
            borderRadius: '25px',
            marginTop: '50px',
            textAlign: 'center'
          }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '20px'
                }}>
                  Innovación Disruptiva en Colombia
                </h3>
            <p style={{
              fontSize: '16px',
              opacity: 0.95,
              margin: '0 auto 30px',
              maxWidth: '800px',
              lineHeight: '1.6'
            }}>
              El CSDT representa la primera plataforma integral en Colombia que combina 
              <strong> análisis forense digital, inteligencia artificial, blockchain y geoanálisis</strong> 
              para combatir la corrupción territorial y apoyar la justicia transicional.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '40px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🏆</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Primera en Colombia</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Plataforma pionera en análisis forense territorial</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🌍</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Estándares Internacionales</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Cumplimiento con normativas globales</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🚀</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Tecnología de Vanguardia</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>IA, blockchain y análisis forense</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚖️</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Validez Jurídica</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Evidencias certificadas para procesos judiciales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Propuesta de Valor */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              ¿Por qué es Importante el CSDT?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Colombia enfrenta una crisis estructural en la administración territorial. 
              El CSDT es la respuesta tecnológica para combatir la corrupción y garantizar la justicia.
            </p>
          </div>
          
            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {/* Problema */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #fecaca'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#fca5a5',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '24px' }}>⚠️</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '15px'
                }}>
                  El Problema
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#7f1d1d',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Tenencia irregular de la tierra</li>
                <li>Minería ilegal y blanqueamiento catastral</li>
                <li>Corrupción institucional</li>
                <li>Manipulación documental</li>
                <li>Impunidad en procesos territoriales</li>
              </ul>
            </div>

            {/* Solución */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #bbf7d0'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#86efac',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '24px' }}>✅</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '15px'
                }}>
                  Nuestra Solución
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#166534',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Análisis forense digital</li>
                <li>Inteligencia artificial predictiva</li>
                <li>Auditoría en tiempo real</li>
                <li>Anonimización de datos</li>
                <li>Evidencia certificada para justicia</li>
              </ul>
            </div>

            {/* Impacto */}
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: '30px',
              borderRadius: '15px',
              border: '2px solid #93c5fd'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: '#60a5fa',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '24px' }}>🚀</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#2563eb',
                  marginBottom: '15px'
                }}>
                  Impacto Esperado
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#1e40af',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Fortalecimiento de la justicia transicional</li>
                <li>Reducción de la impunidad</li>
                <li>Transparencia institucional</li>
                <li>Protección de víctimas</li>
                <li>Construcción de paz territorial</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Cómo Trabajamos */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              ¿Cómo Trabajamos?
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Metodología integral basada en tecnología avanzada y principios de seguridad por diseño
            </p>
            </div>

            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {/* 1. Detección */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#fef3c7',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '40px' }}>🔍</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  1. Detección
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                IA y análisis forense para identificar irregularidades en documentos, 
                actos administrativos y procesos territoriales
              </p>
            </div>

            {/* 2. Análisis */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dbeafe',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '40px' }}>🧠</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  2. Análisis
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Minería de datos y machine learning para detectar patrones de corrupción, 
                blanqueamiento catastral y redes ilícitas
              </p>
            </div>

            {/* 3. Protección */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#dcfce7',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '40px' }}>🛡️</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  3. Protección
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Anonimización de datos, cifrado avanzado y logging forense 
                para proteger víctimas y garantizar la integridad
              </p>
            </div>

            {/* 4. Justicia */}
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: '#e0e7ff',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <span style={{ fontSize: '40px' }}>⚖️</span>
              </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  4. Justicia
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Evidencia certificada con blockchain y firma electrónica 
                para procesos ante JEP, Fiscalía y organismos internacionales
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Tecnologías */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              Tecnologías Avanzadas
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6b7280',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Arquitectura robusta y segura para garantizar la integridad y trazabilidad
            </p>
          </div>
          
            <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            {/* Backend */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #bae6fd',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>⚙️</div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#0369a1',
                  marginBottom: '10px'
                }}>
                Backend Laravel
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#0c4a6e',
                lineHeight: '1.5'
              }}>
                PHP 8.2, JWT, API REST, auditoría transaccional
              </p>
            </div>

            {/* Frontend */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>💻</div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#16a34a',
                  marginBottom: '10px'
                }}>
                  Frontend React
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#166534',
                lineHeight: '1.5'
              }}>
                React + Vite, TailwindCSS, dashboards interactivos
              </p>
            </div>

            {/* IA */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #fcd34d',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🤖</div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#d97706',
                  marginBottom: '10px'
                }}>
                  Inteligencia Artificial
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#92400e',
                lineHeight: '1.5'
              }}>
                Machine Learning, análisis predictivo, detección de fraudes
              </p>
            </div>

            {/* Geoespacial */}
            <div style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #c4b5fd',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🗺️</div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#7c3aed',
                  marginBottom: '10px'
                }}>
                  Geoanálisis
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#5b21b6',
                lineHeight: '1.5'
              }}>
                Leaflet.js, GeoServer, mapas interactivos
              </p>
            </div>

            {/* Blockchain */}
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #fecaca',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔗</div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  marginBottom: '10px'
                }}>
                  Blockchain
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#991b1b',
                lineHeight: '1.5'
              }}>
                Trazabilidad inmutable, firma electrónica
              </p>
            </div>

            {/* Seguridad */}
            <div style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              padding: '25px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>🔒</div>
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#475569',
                  marginBottom: '10px'
                }}>
                  Seguridad
                </h3>
              <p style={{
                fontSize: '14px',
                color: '#334155',
                lineHeight: '1.5'
              }}>
                Cifrado TLS/SSL, 2FA, logging forense
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Confianza */}
      <section style={{
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        padding: '80px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              Construyendo Confianza
            </h2>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            margin: '0 auto 40px',
            maxWidth: '700px',
            lineHeight: '1.6'
          }}>
            El CSDT opera bajo los más altos estándares de seguridad, transparencia y 
            cumplimiento normativo para garantizar la confianza ciudadana e institucional.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginTop: '50px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🏛️</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  Cumplimiento Legal
                </h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                lineHeight: '1.6'
              }}>
                Adherencia a normativas colombianas e internacionales, 
                incluyendo protección de datos y derechos humanos
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>🔐</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  Seguridad por Diseño
                </h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                lineHeight: '1.6'
              }}>
                Principio de mínimo privilegio, anonimización de datos, 
                logging forense y auditoría continua
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>👥</div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  marginBottom: '15px'
                }}>
                  Transparencia Total
                </h3>
              <p style={{
                fontSize: '14px',
                opacity: 0.9,
                lineHeight: '1.6'
              }}>
                Publicación abierta de hallazgos, rendición de cuentas 
                y participación ciudadana activa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Impacto y Beneficios */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              🌟 Impacto y Beneficios del CSDT
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              Transformando la justicia territorial y fortaleciendo la democracia en Colombia
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '50px'
          }}>
            {/* Beneficios para Ciudadanos */}
            <div style={{
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #0ea5e9',
              boxShadow: '0 8px 25px rgba(14, 165, 233, 0.15)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#0ea5e9',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '30px' }}>👥</span>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#0c4a6e',
                marginBottom: '15px'
              }}>
                Para Ciudadanos
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#075985',
                lineHeight: '1.6',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>Herramientas gratuitas de denuncia</li>
                <li style={{ marginBottom: '8px' }}>Protección de identidad y datos</li>
                <li style={{ marginBottom: '8px' }}>Acceso a información transparente</li>
                <li style={{ marginBottom: '8px' }}>Participación en decisiones públicas</li>
                <li style={{ marginBottom: '8px' }}>Seguimiento de denuncias</li>
                <li>Formación en control social</li>
              </ul>
            </div>

            {/* Beneficios para Organizaciones */}
            <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #22c55e',
              boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#22c55e',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '30px' }}>🏛️</span>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#14532d',
                marginBottom: '15px'
              }}>
                Para Organizaciones
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#166534',
                lineHeight: '1.6',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>Herramientas de análisis forense</li>
                <li style={{ marginBottom: '8px' }}>Detección automática de irregularidades</li>
                <li style={{ marginBottom: '8px' }}>Evidencia certificada para procesos</li>
                <li style={{ marginBottom: '8px' }}>Reportes automatizados</li>
                <li style={{ marginBottom: '8px' }}>Integración con sistemas existentes</li>
                <li>Capacitación especializada</li>
              </ul>
            </div>

            {/* Beneficios para el Estado */}
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '30px',
              borderRadius: '20px',
              border: '2px solid #f59e0b',
              boxShadow: '0 8px 25px rgba(245, 158, 11, 0.15)'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                backgroundColor: '#f59e0b',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <span style={{ fontSize: '30px' }}>🏛️</span>
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#92400e',
                marginBottom: '15px'
              }}>
                Para el Estado
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#78350f',
                lineHeight: '1.6',
                paddingLeft: '20px',
                margin: 0
              }}>
                <li style={{ marginBottom: '8px' }}>Fortalecimiento de la transparencia</li>
                <li style={{ marginBottom: '8px' }}>Reducción de la corrupción</li>
                <li style={{ marginBottom: '8px' }}>Mejora en la gestión pública</li>
                <li style={{ marginBottom: '8px' }}>Cumplimiento normativo</li>
                <li style={{ marginBottom: '8px' }}>Confianza ciudadana</li>
                <li>Justicia transicional efectiva</li>
              </ul>
            </div>
          </div>

          {/* Estadísticas de Impacto */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
            color: 'white',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '30px'
            }}>
              📊 Impacto Esperado
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '25px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>90%</div>
                <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Reducción en tiempo de investigación</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>95%</div>
                <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Precisión en detección de fraudes</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>80%</div>
                <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Aumento en denuncias ciudadanas</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>70%</div>
                <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>Mejora en transparencia institucional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Acciones Rápidas */}
      <section style={{
        padding: '80px 0',
        backgroundColor: '#f8fafc'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              🚀 Accede a Todas las Funcionalidades
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#6b7280',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Plataforma completa con múltiples herramientas para el control social y la transparencia territorial
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '25px'
          }}>
            <Link to="/consejo-ia" style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              🤖 Consejo IA
            </Link>
            <Link to="/geo-dashboard" style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              🗺️ GeoDashboard
            </Link>
            <Link to="/auditoria-forense" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              🔬 Auditoría Forense
            </Link>
            <Link to="/pqrsfd" style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              📝 PQRSFD
            </Link>
            <Link to="/accion-tutela" style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              ⚖️ Acción de Tutela
            </Link>
            <Link to="/accion-popular" style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              👥 Acción Popular
            </Link>
            <Link to="/consulta-popular" style={{
              background: 'linear-gradient(135deg, #84cc16 0%, #65a30d 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(132, 204, 22, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              🗳️ Consulta Popular
            </Link>
            <Link to="/consejo-veeduria-territorial" style={{
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 25px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}>
              🏛️ Veeduría Territorial
            </Link>
          </div>

          {/* Información adicional sobre la completitud */}
          <div style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
            color: 'white',
            padding: '40px',
            borderRadius: '20px',
            marginTop: '50px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}>
              🎯 Plataforma Completamente Funcional
            </h3>
            <p style={{
              fontSize: '16px',
              opacity: 0.95,
              margin: '0 auto 30px',
              maxWidth: '800px',
              lineHeight: '1.6'
            }}>
              El CSDT incluye <strong>todas las herramientas necesarias</strong> para el control social y la transparencia territorial:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '30px'
            }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>⚖️</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>7 Acciones Constitucionales</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Todas las vías jurídicas implementadas</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🗳️</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>4 Mecanismos de Participación</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Herramientas de participación ciudadana</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🤖</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>IA y Análisis Forense</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Tecnología avanzada de detección</p>
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>🌿</div>
                <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>Mecanismos Étnicos</h4>
                <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>Planes de etnodesarrollo</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
