import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contacto = () => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoConsulta: 'general',
    asunto: '',
    mensaje: '',
    aceptaTerminos: false
  });

  const [enviado, setEnviado] = useState(false);

  const tiposConsulta = [
    { value: 'general', label: 'Consulta General', icon: '💬' },
    { value: 'tecnica', label: 'Soporte Técnico', icon: '🔧' },
    { value: 'denuncia', label: 'Denuncia', icon: '🚨' },
    { value: 'colaboracion', label: 'Colaboración', icon: '🤝' },
    { value: 'prensa', label: 'Prensa y Medios', icon: '📰' },
    { value: 'otro', label: 'Otro', icon: '❓' }
  ];

  const oficinas = [
    {
      ciudad: 'Bogotá D.C.',
      direccion: 'Calle 100 #15-60, Oficina 502',
      telefono: '+57 (1) 234-5678',
      email: 'bogota@csdt.gov.co',
      horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
      esPrincipal: true
    },
    {
      ciudad: 'Medellín',
      direccion: 'Carrera 43A #1-50, Torre Ejecutiva',
      telefono: '+57 (4) 567-8901',
      email: 'medellin@csdt.gov.co',
      horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
      esPrincipal: false
    },
    {
      ciudad: 'Cali',
      direccion: 'Avenida 6N #28-30, Edificio Corporativo',
      telefono: '+57 (2) 890-1234',
      email: 'cali@csdt.gov.co',
      horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
      esPrincipal: false
    },
    {
      ciudad: 'Barranquilla',
      direccion: 'Calle 84 #45-23, Centro Empresarial',
      telefono: '+57 (5) 123-4567',
      email: 'barranquilla@csdt.gov.co',
      horario: 'Lunes a Viernes: 8:00 AM - 5:00 PM',
      esPrincipal: false
    }
  ];

  const canales = [
    {
      nombre: 'Línea Nacional',
      numero: '018000-123456',
      descripcion: 'Línea gratuita para todo el país',
      icono: '📞',
      color: '#059669'
    },
    {
      nombre: 'WhatsApp',
      numero: '+57 300 123 4567',
      descripcion: 'Atención por WhatsApp',
      icono: '💬',
      color: '#25D366'
    },
    {
      nombre: 'Email Principal',
      numero: 'contacto@csdt.gov.co',
      descripcion: 'Correo electrónico principal',
      icono: '📧',
      color: '#3B82F6'
    },
    {
      nombre: 'Chat en Línea',
      numero: 'Disponible 24/7',
      descripcion: 'Chat en tiempo real',
      icono: '💻',
      color: '#8B5CF6'
    }
  ];

  const manejarCambio = (e) => {
    const { name, value, type, checked } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!formulario.aceptaTerminos) {
      alert('Debes aceptar los términos y condiciones para enviar el formulario.');
      return;
    }
    
    // Simular envío
    setEnviado(true);
    
    // Resetear formulario después de 3 segundos
    setTimeout(() => {
      setEnviado(false);
      setFormulario({
        nombre: '',
        email: '',
        telefono: '',
        tipoConsulta: 'general',
        asunto: '',
        mensaje: '',
        aceptaTerminos: false
      });
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
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
            Contáctanos
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Estamos aquí para ayudarte. Ponte en contacto con nosotros
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Canales de Contacto */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Canales de Contacto
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px'
          }}>
            {canales.map((canal, index) => (
              <div
                key={index}
                style={{
                  background: '#f8fafc',
                  padding: '25px',
                  borderRadius: '15px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-5px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  fontSize: '40px',
                  marginBottom: '15px',
                  color: canal.color
                }}>
                  {canal.icono}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '10px'
                }}>
                  {canal.nombre}
                </h3>
                <p style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: canal.color,
                  marginBottom: '8px'
                }}>
                  {canal.numero}
                </p>
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: '1.4'
                }}>
                  {canal.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario de Contacto */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Envíanos un Mensaje
          </h2>
          
          {enviado ? (
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                ¡Mensaje Enviado!
              </h3>
              <p style={{
                fontSize: '16px',
                opacity: 0.9
              }}>
                Hemos recibido tu mensaje. Te contactaremos pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={manejarEnvio}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formulario.email}
                    onChange={manejarCambio}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formulario.telefono}
                    onChange={manejarCambio}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Tipo de Consulta *
                  </label>
                  <select
                    name="tipoConsulta"
                    value={formulario.tipoConsulta}
                    onChange={manejarCambio}
                    required
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    {tiposConsulta.map((tipo) => (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.icon} {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Asunto *
                </label>
                <input
                  type="text"
                  name="asunto"
                  value={formulario.asunto}
                  onChange={manejarCambio}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Mensaje *
                </label>
                <textarea
                  name="mensaje"
                  value={formulario.mensaje}
                  onChange={manejarCambio}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formulario.aceptaTerminos}
                  onChange={manejarCambio}
                  required
                  style={{
                    width: '18px',
                    height: '18px'
                  }}
                />
                <label style={{
                  fontSize: '14px',
                  color: '#374151'
                }}>
                  Acepto los <a href="/terminos" style={{ color: '#7c3aed', textDecoration: 'none' }}>términos y condiciones</a> y la <a href="/privacidad" style={{ color: '#7c3aed', textDecoration: 'none' }}>política de privacidad</a>
                </label>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '15px 40px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(124, 58, 237, 0.3)';
                  }}
                >
                  📤 Enviar Mensaje
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Oficinas */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Nuestras Oficinas
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px'
          }}>
            {oficinas.map((oficina, index) => (
              <div
                key={index}
                style={{
                  background: oficina.esPrincipal 
                    ? 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)'
                    : '#f8fafc',
                  padding: '25px',
                  borderRadius: '15px',
                  border: oficina.esPrincipal 
                    ? '2px solid #f59e0b'
                    : '1px solid #e5e7eb',
                  position: 'relative'
                }}
              >
                {oficina.esPrincipal && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#f59e0b',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    PRINCIPAL
                  </div>
                )}
                
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  🏢 {oficina.ciudad}
                </h3>
                
                <div style={{
                  fontSize: '14px',
                  color: '#374151',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>📍 Dirección:</strong><br />
                    {oficina.direccion}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>📞 Teléfono:</strong><br />
                    {oficina.telefono}
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <strong>📧 Email:</strong><br />
                    {oficina.email}
                  </div>
                  <div>
                    <strong>🕒 Horario:</strong><br />
                    {oficina.horario}
                  </div>
                </div>
                
                <button style={{
                  background: oficina.esPrincipal
                    ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                    : 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  width: '100%'
                }}>
                  Ver en Mapa
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Información Adicional */}
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
            ¿Necesitas Ayuda Inmediata?
          </h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🚨</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Denuncias Urgentes
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Para denuncias urgentes, usa nuestro sistema de denuncias online
              </p>
            </div>
            
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
                Disponible 24/7 para consultas y soporte técnico
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>📋</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                FAQ
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Consulta nuestras preguntas frecuentes para respuestas rápidas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
