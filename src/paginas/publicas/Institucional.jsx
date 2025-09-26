import React from 'react';
import { Link } from 'react-router-dom';

const Institucional = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Institucional
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Conoce más sobre el Consejo Social de Veeduría y Desarrollo Territorial
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Quiénes Somos */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ¿Quiénes Somos?
          </h2>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.8',
            textAlign: 'justify',
            marginBottom: '30px'
          }}>
            El Consejo Social de Veeduría y Desarrollo Territorial (CSDT) es una organización 
            sin ánimo de lucro comprometida con el fortalecimiento del control social, la transparencia 
            y la trazabilidad en la gestión territorial de Colombia. Nuestro enfoque integra 
            tecnología avanzada, análisis forense digital e inteligencia artificial para combatir 
            la corrupción y promover la justicia transicional.
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px', textAlign: 'center' }}>🎯</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                Misión
              </h3>
            <p style={{
                fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
                textAlign: 'center'
            }}>
                Desarrollar e implementar una plataforma tecnológica integral que fortalezca 
                el control social, detecte irregularidades mediante IA y análisis forense, 
                y proporcione evidencia certificada para la justicia transicional.
            </p>
          </div>

          <div style={{
              background: '#f8fafc',
              padding: '25px',
            borderRadius: '15px',
            border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '15px', textAlign: 'center' }}>🌟</div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                Visión
              </h3>
            <p style={{
                fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
                textAlign: 'center'
            }}>
                Ser la plataforma tecnológica líder en Colombia para el control social, 
                transparencia y trazabilidad en la gestión de tierras, minería y actos 
                administrativos, contribuyendo a la justicia transicional y la construcción de paz.
            </p>
            </div>
          </div>
        </div>

        {/* Valores Corporativos */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Nuestros Valores
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #fecaca',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '35px', marginBottom: '15px' }}>🔍</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#dc2626',
                marginBottom: '10px'
              }}>
                Transparencia
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#7f1d1d',
                lineHeight: '1.5'
              }}>
                Operamos con total transparencia en todos nuestros procesos y decisiones
              </p>
            </div>
            
                <div style={{
              background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #bbf7d0',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '35px', marginBottom: '15px' }}>⚖️</div>
                <h3 style={{
                fontSize: '16px',
                  fontWeight: 'bold',
                color: '#16a34a',
                  marginBottom: '10px'
                }}>
                Justicia
                </h3>
                <p style={{
                fontSize: '13px',
                color: '#14532d',
                  lineHeight: '1.5'
                }}>
                Promovemos la justicia transicional y el acceso a la justicia para todos
                </p>
              </div>
            
            <div style={{
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #93c5fd',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '35px', marginBottom: '15px' }}>🤝</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#2563eb',
                marginBottom: '10px'
              }}>
                Integridad
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#1e40af',
                lineHeight: '1.5'
              }}>
                Actuamos con integridad y ética en todas nuestras acciones
              </p>
        </div>

        <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '25px',
          borderRadius: '15px',
              border: '2px solid #fcd34d',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '35px', marginBottom: '15px' }}>🚀</div>
              <h3 style={{
                fontSize: '16px',
            fontWeight: 'bold',
                color: '#d97706',
                marginBottom: '10px'
              }}>
                Innovación
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#92400e',
                lineHeight: '1.5'
              }}>
                Utilizamos tecnología de vanguardia para resolver problemas complejos
              </p>
            </div>
            
          <div style={{
              background: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #c4b5fd',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '35px', marginBottom: '15px' }}>👥</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '10px'
              }}>
                Participación
              </h3>
              <p style={{
                fontSize: '13px',
                color: '#5b21b6',
                lineHeight: '1.5'
              }}>
                Fomentamos la participación ciudadana en el control social
              </p>
            </div>
            
                <div style={{
              background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
              padding: '25px',
              borderRadius: '15px',
              border: '2px solid #cbd5e1',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '35px', marginBottom: '15px' }}>🛡️</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#475569',
                marginBottom: '10px'
              }}>
                Seguridad
              </h3>
                <p style={{
                fontSize: '13px',
                color: '#334155',
                lineHeight: '1.5'
              }}>
                Protegemos la información y garantizamos la seguridad de los datos
                </p>
              </div>
          </div>
        </div>

        {/* Historia */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Nuestra Historia
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                background: '#3b82f6',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                margin: '0 auto 15px'
              }}>
                2024
              </div>
                <h3 style={{
                fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                marginBottom: '10px',
                textAlign: 'center'
                }}>
                Fundación
                </h3>
                <p style={{
                fontSize: '14px',
                  color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                Fundación del CSDT con el objetivo de revolucionar el control social 
                mediante tecnología avanzada y análisis forense digital.
              </p>
        </div>

        <div style={{
              background: '#f8fafc',
              padding: '25px',
          borderRadius: '15px',
              border: '1px solid #e5e7eb'
            }}>
          <div style={{
                background: '#10b981',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                margin: '0 auto 15px'
              }}>
                Q1
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '10px',
                textAlign: 'center'
              }}>
                Desarrollo Tecnológico
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
              }}>
                Desarrollo de la primera versión de la plataforma con capacidades 
                de análisis forense digital e inteligencia artificial.
              </p>
            </div>
            
            <div style={{
              background: '#f8fafc',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid #e5e7eb'
              }}>
                <div style={{
                background: '#f59e0b',
                color: 'white',
                width: '50px',
                height: '50px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                margin: '0 auto 15px'
              }}>
                Q2
                </div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                marginBottom: '10px',
                textAlign: 'center'
                  }}>
                Lanzamiento
                  </h3>
                  <p style={{
                fontSize: '14px',
                    color: '#6b7280',
                lineHeight: '1.6',
                textAlign: 'center'
                  }}>
                Lanzamiento oficial de la plataforma CSDT con casos piloto 
                en diferentes regiones de Colombia.
                  </p>
                </div>
          </div>
        </div>

        {/* Equipo Directivo */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Equipo Directivo
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: 'white',
                margin: '0 auto 15px'
              }}>
                👨‍💼
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '5px'
              }}>
                Director Ejecutivo
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '10px'
              }}>
                Liderazgo estratégico y visión institucional
              </p>
              <div style={{
                background: '#dbeafe',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#1e40af',
                fontWeight: 'bold'
              }}>
                Jurídico & Tecnológico
              </div>
            </div>
            
            <div style={{
              background: '#f8fafc',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: 'white',
                margin: '0 auto 15px'
              }}>
                👩‍💻
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '5px'
              }}>
                Directora Técnica
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '10px'
              }}>
                Desarrollo tecnológico e innovación
              </p>
              <div style={{
                background: '#dcfce7',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#14532d',
                fontWeight: 'bold'
              }}>
                IA & Forense Digital
              </div>
            </div>
            
            <div style={{
              background: '#f8fafc',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: 'white',
                margin: '0 auto 15px'
              }}>
                👨‍⚖️
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '5px'
              }}>
                Director Legal
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '10px'
              }}>
                Marco jurídico y cumplimiento normativo
              </p>
              <div style={{
                background: '#fef3c7',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#92400e',
                fontWeight: 'bold'
              }}>
                Derecho & Compliance
              </div>
            </div>
            
            <div style={{
              background: '#f8fafc',
              padding: '25px',
              borderRadius: '15px',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px',
                color: 'white',
                margin: '0 auto 15px'
              }}>
                👩‍🔬
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '5px'
              }}>
                Directora de Investigación
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                marginBottom: '10px'
              }}>
                Investigación y desarrollo de metodologías
              </p>
              <div style={{
                background: '#f3e8ff',
                padding: '8px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                color: '#5b21b6',
                fontWeight: 'bold'
              }}>
                I+D & Metodologías
              </div>
            </div>
          </div>
        </div>

        {/* Certificaciones y Reconocimientos */}
        <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
          color: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '30px'
          }}>
            Certificaciones y Reconocimientos
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
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🏆</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Premio Innovación Social 2024
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Reconocimiento por innovación en control social
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🔒</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                ISO 27001
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Certificación en seguridad de la información
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>⚖️</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Acreditación Forense
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Laboratorio forense digital certificado
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🌍</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Estándares Internacionales
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Cumplimiento con normativas globales
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Institucional;
