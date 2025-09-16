import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Ayuda = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaActiva, setCategoriaActiva] = useState('general');

  const categorias = {
    general: {
      titulo: 'General',
      icono: '💬',
      color: '#3B82F6'
    },
    tecnico: {
      titulo: 'Técnico',
      icono: '🔧',
      color: '#10B981'
    },
    legal: {
      titulo: 'Legal',
      icono: '⚖️',
      color: '#F59E0B'
    },
    denuncias: {
      titulo: 'Denuncias',
      icono: '🚨',
      color: '#EF4444'
    },
    plataforma: {
      titulo: 'Plataforma',
      icono: '💻',
      color: '#8B5CF6'
    }
  };

  const faqs = {
    general: [
      {
        pregunta: '¿Qué es el CSDT?',
        respuesta: 'El Consejo Social de Veeduría y Desarrollo Territorial (CSDT) es una organización sin ánimo de lucro que utiliza tecnología avanzada, análisis forense digital e inteligencia artificial para combatir la corrupción y promover la justicia transicional en Colombia.'
      },
      {
        pregunta: '¿Cómo puedo reportar una irregularidad?',
        respuesta: 'Puedes reportar irregularidades a través de nuestro sistema de denuncias en línea, llamando a nuestra línea gratuita 018000-123456, o visitando cualquiera de nuestras oficinas regionales. Todos los reportes son confidenciales y están protegidos.'
      },
      {
        pregunta: '¿Es gratuito usar los servicios del CSDT?',
        respuesta: 'Sí, todos nuestros servicios son completamente gratuitos para los ciudadanos. Nuestra misión es promover la transparencia y el control social sin barreras económicas.'
      },
      {
        pregunta: '¿Cómo funciona el análisis forense digital?',
        respuesta: 'Utilizamos técnicas forenses digitales avanzadas combinadas con inteligencia artificial para analizar documentos, detectar irregularidades, verificar autenticidad y generar evidencia certificada para procesos judiciales.'
      }
    ],
    tecnico: [
      {
        pregunta: '¿Cómo accedo a la plataforma CSDT?',
        respuesta: 'Puedes acceder a la plataforma a través de nuestro sitio web oficial. Solo necesitas registrarte con tu información básica y aceptar nuestros términos y condiciones.'
      },
      {
        pregunta: '¿Qué navegadores son compatibles?',
        respuesta: 'La plataforma es compatible con Chrome, Firefox, Safari, Edge y Opera. Recomendamos usar la versión más reciente de tu navegador para la mejor experiencia.'
      },
      {
        pregunta: '¿Cómo puedo recuperar mi contraseña?',
        respuesta: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?" e ingresa tu email. Recibirás un enlace para restablecer tu contraseña.'
      },
      {
        pregunta: '¿La plataforma es segura?',
        respuesta: 'Sí, utilizamos encriptación de extremo a extremo, protocolos de seguridad SSL/TLS y cumplimos con estándares internacionales de protección de datos personales.'
      }
    ],
    legal: [
      {
        pregunta: '¿Qué tipo de casos puede analizar el CSDT?',
        respuesta: 'Analizamos casos relacionados con corrupción, irregularidades administrativas, fraudes catastrales, irregularidades mineras, violaciones de derechos humanos y cualquier situación que requiera análisis forense digital.'
      },
      {
        pregunta: '¿La evidencia generada es válida en procesos judiciales?',
        respuesta: 'Sí, nuestros análisis generan evidencia certificada que cumple con los estándares forenses reconocidos por el sistema judicial colombiano. Trabajamos en coordinación con autoridades competentes.'
      },
      {
        pregunta: '¿Cómo protegen mi información personal?',
        respuesta: 'Cumplimos estrictamente con la Ley 1581 de 2012 de protección de datos personales. Toda información sensible está encriptada y solo es accesible por personal autorizado.'
      },
      {
        pregunta: '¿Puedo acceder a mis datos personales?',
        respuesta: 'Sí, tienes derecho a consultar, actualizar, rectificar y cancelar tus datos personales. Puedes ejercer estos derechos contactando nuestro equipo de protección de datos.'
      }
    ],
    denuncias: [
      {
        pregunta: '¿Cómo puedo hacer una denuncia anónima?',
        respuesta: 'Puedes hacer denuncias anónimas a través de nuestro formulario online marcando la opción "Denuncia anónima". También puedes usar nuestra línea telefónica sin proporcionar información personal.'
      },
      {
        pregunta: '¿Qué información necesito para hacer una denuncia?',
        respuesta: 'Mientras más información proporciones (documentos, fechas, ubicaciones, testigos), más efectivo será nuestro análisis. Sin embargo, puedes hacer denuncias con la información que tengas disponible.'
      },
      {
        pregunta: '¿Qué pasa después de hacer una denuncia?',
        respuesta: 'Recibirás un número de seguimiento. Nuestro equipo analizará la información y, si es necesario, realizará análisis forense digital. Te mantendremos informado sobre el progreso del caso.'
      },
      {
        pregunta: '¿Puedo hacer seguimiento a mi denuncia?',
        respuesta: 'Sí, puedes hacer seguimiento usando tu número de caso en nuestra plataforma o contactando directamente a nuestro equipo de atención al ciudadano.'
      }
    ],
    plataforma: [
      {
        pregunta: '¿Cómo uso el Consejo IA?',
        respuesta: 'El Consejo IA es una herramienta que analiza documentos y casos utilizando inteligencia artificial especializada en derecho colombiano. Solo necesitas subir tus documentos y describir el caso.'
      },
      {
        pregunta: '¿Qué tipos de documentos puedo subir?',
        respuesta: 'Aceptamos documentos en formato PDF, Word, Excel, imágenes (JPG, PNG) y archivos de texto. Los documentos deben estar relacionados con el caso que deseas analizar.'
      },
      {
        pregunta: '¿Cómo interpreto los resultados del análisis?',
        respuesta: 'Nuestro sistema genera reportes detallados con hallazgos, nivel de riesgo, recomendaciones y fundamentos jurídicos. También puedes consultar con nuestro equipo de expertos para mayor claridad.'
      },
      {
        pregunta: '¿Puedo exportar los resultados?',
        respuesta: 'Sí, puedes exportar los resultados en formato PDF, incluyendo gráficos, mapas y análisis detallados. Los reportes están listos para ser utilizados en procesos judiciales.'
      }
    ]
  };

  const tutoriales = [
    {
      titulo: 'Cómo hacer una denuncia paso a paso',
      descripcion: 'Aprende a usar nuestro sistema de denuncias de manera efectiva',
      duracion: '5 min',
      nivel: 'Básico',
      icono: '📝'
    },
    {
      titulo: 'Uso del Consejo IA para análisis legal',
      descripcion: 'Guía completa para analizar casos con inteligencia artificial',
      duracion: '10 min',
      nivel: 'Intermedio',
      icono: '🤖'
    },
    {
      titulo: 'Interpretación de resultados forenses',
      descripcion: 'Cómo entender y usar los resultados del análisis forense',
      duracion: '8 min',
      nivel: 'Intermedio',
      icono: '🔬'
    },
    {
      titulo: 'Configuración de tu perfil de usuario',
      descripcion: 'Personaliza tu experiencia en la plataforma',
      duracion: '3 min',
      nivel: 'Básico',
      icono: '👤'
    }
  ];

  const faqsFiltradas = faqs[categoriaActiva].filter(faq =>
    faq.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
    faq.respuesta.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
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
            Centro de Ayuda
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Encuentra respuestas a tus preguntas y aprende a usar la plataforma CSDT
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Búsqueda */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'flex',
            gap: '15px',
            alignItems: 'center',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar en preguntas frecuentes..."
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <button style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              🔍 Buscar
            </button>
          </div>
        </div>

        {/* Categorías */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            Categorías de Ayuda
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '15px'
          }}>
            {Object.entries(categorias).map(([key, categoria]) => (
              <button
                key={key}
                onClick={() => setCategoriaActiva(key)}
                style={{
                  background: categoriaActiva === key 
                    ? `linear-gradient(135deg, ${categoria.color} 0%, ${categoria.color}dd 100%)`
                    : '#f8fafc',
                  color: categoriaActiva === key ? 'white' : '#374151',
                  border: categoriaActiva === key ? 'none' : '2px solid #e5e7eb',
                  padding: '15px 20px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span style={{ fontSize: '18px' }}>{categoria.icono}</span>
                {categoria.titulo}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            {categorias[categoriaActiva].icono} Preguntas Frecuentes - {categorias[categoriaActiva].titulo}
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            {faqsFiltradas.map((faq, index) => (
              <div
                key={index}
                style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  borderLeft: `4px solid ${categorias[categoriaActiva].color}`
                }}
              >
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ❓ {faq.pregunta}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {faq.respuesta}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tutoriales */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Tutoriales en Video
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {tutoriales.map((tutorial, index) => (
              <div
                key={index}
                style={{
                  background: '#f8fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '30px' }}>
                    {tutorial.icono}
                  </div>
                  <div style={{
                    background: '#dbeafe',
                    color: '#1e40af',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    {tutorial.nivel}
                  </div>
                </div>
                
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '10px',
                  lineHeight: '1.3'
                }}>
                  {tutorial.titulo}
                </h3>
                
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  lineHeight: '1.4',
                  marginBottom: '15px'
                }}>
                  {tutorial.descripcion}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    ⏱️ {tutorial.duracion}
                  </span>
                  <button style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}>
                    ▶️ Ver Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contacto de Soporte */}
        <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '20px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            ¿No Encontraste lo que Buscabas?
          </h3>
          
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            marginBottom: '25px'
          }}>
            Nuestro equipo de soporte está disponible para ayudarte
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            marginTop: '25px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>💬</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Chat en Vivo
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Disponible 24/7
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>📧</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Email
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                soporte@csdt.gov.co
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>📞</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Teléfono
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                018000-123456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
