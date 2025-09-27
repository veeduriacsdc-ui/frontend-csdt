import React, { useState } from 'react';
import api from '../../services/api';

const Donaciones = () => {
  const [formulario, setFormulario] = useState({
    nom: '',
    cor: '',
    tel: '',
    mon: '',
    tip: 'unica',
    met_pag: 'nequi',
    men: '',
    ref: '',
    arc: null
  });

  const [busquedaReferencia, setBusquedaReferencia] = useState('');
  const [donacionEncontrada, setDonacionEncontrada] = useState(null);
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  
  // Estados para certificación
  const [palabrasClave, setPalabrasClave] = useState('');
  const [donacionesValidadas, setDonacionesValidadas] = useState([]);
  const [mostrarCertificacion, setMostrarCertificacion] = useState(false);
  const [cargandoCertificacion, setCargandoCertificacion] = useState(false);

  const manejarCambio = (e) => {
    const { name, value, files } = e.target;
    
    if (name === 'arc') {
      setFormulario(prev => ({
        ...prev,
        [name]: files[0] || null
      }));
    } else {
      setFormulario(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje('');

    try {
      const formData = new FormData();
      formData.append('nom', formulario.nom);
      formData.append('cor', formulario.cor);
      formData.append('tel', formulario.tel);
      formData.append('mon', formulario.mon);
      formData.append('tip', formulario.tip);
      formData.append('met_pag', formulario.met_pag);
      formData.append('men', formulario.men);
      formData.append('ref', formulario.ref);
      
      if (formulario.arc) {
        formData.append('arc', formulario.arc);
      }

      const response = await api.post('/donaciones', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        setMensaje(`¡Donación registrada exitosamente! Tu número de referencia es: ${response.data.data.numero_referencia}`);
        setFormulario({
          nom: '',
          cor: '',
          tel: '',
          mon: '',
          tip: 'unica',
          met_pag: 'nequi',
          men: '',
          ref: '',
          arc: null
        });
        setMostrarBusqueda(true);
      }
    } catch (error) {
      setMensaje('Error al procesar la donación. Por favor, intenta nuevamente.');
      console.error('Error:', error);
    } finally {
      setEnviando(false);
    }
  };

  const buscarDonacion = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/donaciones/buscar', {
        numero_referencia: busquedaReferencia
      });

      if (response.data.success) {
        setDonacionEncontrada(response.data.data);
      }
    } catch (error) {
      setMensaje('No se encontró la donación con ese número de referencia.');
      setDonacionEncontrada(null);
    }
  };

  const descargarCertificado = () => {
    if (donacionEncontrada?.certificado_pdf_url) {
      window.open(donacionEncontrada.certificado_pdf_url, '_blank');
    }
  };

  const buscarPorPalabrasClave = async (e) => {
    e.preventDefault();
    setCargandoCertificacion(true);
    
    try {
      const response = await api.get(`/donaciones/buscar-por-palabras?palabras=${encodeURIComponent(palabrasClave)}`);
      
      if (response.data.success) {
        setDonacionesValidadas(response.data.data);
      }
    } catch (error) {
      console.error('Error al buscar donaciones:', error);
      setDonacionesValidadas([]);
    } finally {
      setCargandoCertificacion(false);
    }
  };

  const certificarDonacion = async (donacionId) => {
    try {
      const response = await api.post(`/donaciones/${donacionId}/certificar`, {
        observaciones_certificacion: 'Certificación automática desde portal público'
      });
      
      if (response.data.success) {
        alert('Donación certificada exitosamente. El PDF será generado.');
        // Recargar la lista
        buscarPorPalabrasClave({ preventDefault: () => {} });
      }
    } catch (error) {
      console.error('Error al certificar donación:', error);
      alert('Error al certificar la donación');
    }
  };

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
            Donaciones CSDT
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Apoya la transparencia y el desarrollo territorial en Colombia
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Información sobre donaciones */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            ¿Por qué donar al CSDT?
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px',
            marginBottom: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>🎯</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                Transparencia Total
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                Cada peso donado se utiliza exclusivamente para fortalecer el control social y la transparencia territorial.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>🔍</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                Impacto Medible
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                Nuestros proyectos tienen resultados concretos en la lucha contra la corrupción territorial.
              </p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>⚖️</div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937', marginBottom: '10px' }}>
                Justicia Social
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                Contribuyes directamente a la construcción de paz y justicia en Colombia.
              </p>
            </div>
          </div>
        </div>

        {/* Formulario de donación */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Realizar Donación
          </h2>
          
          <form onSubmit={manejarEnvio} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Nombre Completo *
              </label>
              <input
                type="text"
                name="nom"
                value={formulario.nom}
                onChange={manejarCambio}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="Tu nombre completo"
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Email *
              </label>
              <input
                type="email"
                name="cor"
                value={formulario.cor}
                onChange={manejarCambio}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="tu@email.com"
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Teléfono
              </label>
              <input
                type="tel"
                name="tel"
                value={formulario.tel}
                onChange={manejarCambio}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="+57 300 123 4567"
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Monto (COP) *
              </label>
              <input
                type="number"
                name="mon"
                value={formulario.mon}
                onChange={manejarCambio}
                required
                min="10000"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
                placeholder="50000"
              />
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Método de Pago *
              </label>
              <select
                name="met_pag"
                value={formulario.met_pag}
                onChange={manejarCambio}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="nequi">Nequi</option>
                <option value="daviplata">Daviplata</option>
                <option value="movii">Movii</option>
                <option value="tarjeta">Tarjeta de Crédito</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="usdt">USDT</option>
              </select>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Tipo de Donación *
              </label>
              <select
                name="tip"
                value={formulario.tip}
                onChange={manejarCambio}
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="unica">Donación Única</option>
                <option value="mensual">Donación Mensual</option>
                <option value="trimestral">Donación Trimestral</option>
                <option value="anual">Donación Anual</option>
              </select>
            </div>
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Mensaje (Opcional)
              </label>
              <textarea
                name="men"
                value={formulario.men}
                onChange={manejarCambio}
                rows="3"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
                placeholder="¿Hay algo específico que te gustaría que sepamos sobre tu donación?"
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Referencia de Donación (Opcional)
              </label>
              <input
                type="text"
                name="ref"
                value={formulario.ref || ''}
                onChange={manejarCambio}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
                placeholder="Ej: Donación mensual enero, Proyecto transparencia, etc."
              />
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '5px'
              }}>
                Puedes agregar una referencia personal para identificar tu donación
              </p>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Comprobante de Pago (Opcional)
              </label>
              <input
                type="file"
                name="archivoComprobante"
                onChange={manejarCambio}
                accept=".jpg,.jpeg,.png,.pdf"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
              />
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '5px'
              }}>
                Formatos aceptados: JPG, PNG, PDF (máximo 10MB)
              </p>
            </div>

            {/* Mostrar QR de Nequi cuando se selecciona Nequi */}
            {formulario.metodoPago === 'nequi' && (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                border: '2px dashed #d1d5db'
              }}>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '15px'
                }}>
                  💜 Paga con Nequi
                </h4>
                <div style={{
                  display: 'inline-block',
                  padding: '15px',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <img 
                    src="/donacion-nequi.jpeg" 
                    alt="QR Nequi para Donaciones CSDT"
                    style={{
                      width: '240px',
                      height: '240px',
                      borderRadius: '8px'
                    }}
                  />
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  marginTop: '10px'
                }}>
                  Escanea el código QR con tu app Nequi para realizar el pago
                </p>
              </div>
            )}
            
            {mensaje && (
              <div style={{ 
                gridColumn: '1 / -1',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: mensaje.includes('Error') ? '#fef2f2' : '#f0fdf4',
                border: `1px solid ${mensaje.includes('Error') ? '#fecaca' : '#bbf7d0'}`,
                color: mensaje.includes('Error') ? '#dc2626' : '#166534'
              }}>
                {mensaje}
              </div>
            )}

            <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
              <button
                type="submit"
                disabled={enviando}
                style={{
                  background: enviando ? '#9ca3af' : 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 40px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: enviando ? 'not-allowed' : 'pointer',
                  boxShadow: enviando ? 'none' : '0 4px 15px rgba(5, 150, 105, 0.3)',
                  opacity: enviando ? 0.7 : 1
                }}
              >
                {enviando ? '⏳ Procesando...' : '💚 Realizar Donación'}
              </button>
            </div>
          </form>
        </div>

        {/* Métodos de pago */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Métodos de Pago Aceptados
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>💳</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Tarjeta de Crédito</h3>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Visa, Mastercard, American Express</p>
            </div>
            
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>🏦</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Transferencia Bancaria</h3>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>PSE, Transferencia directa</p>
            </div>
            
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>📱</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Billeteras Digitales</h3>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Nequi, Daviplata, Movii</p>
            </div>
            
            <div style={{
              background: '#f8fafc',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '40px', marginBottom: '10px' }}>💰</div>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>Criptomonedas</h3>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>Bitcoin, Ethereum, USDT</p>
            </div>
          </div>
        </div>

        {/* Buscar Donación y Descargar Certificado */}
        {mostrarBusqueda && (
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              Buscar Donación y Descargar Certificado
            </h2>
            
            <form onSubmit={buscarDonacion} style={{
              display: 'flex',
              gap: '15px',
              marginBottom: '30px',
              alignItems: 'end'
            }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Número de Referencia:
                </label>
                <input
                  type="text"
                  value={busquedaReferencia}
                  onChange={(e) => setBusquedaReferencia(e.target.value)}
                  placeholder="Ej: CSDT-2025-0001"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px'
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                }}
              >
                🔍 Buscar
              </button>
            </form>

            {donacionEncontrada && (
              <div style={{
                padding: '25px',
                backgroundColor: '#f8fafc',
                borderRadius: '12px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px'
                }}>
                  <div>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '5px'
                    }}>
                      Donación: {donacionEncontrada.numero_referencia}
                    </h3>
                    <p style={{
                      color: '#6b7280',
                      fontSize: '14px'
                    }}>
                      Donante: {donacionEncontrada.nombre_donante}
                    </p>
                  </div>
                  <span style={{
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: donacionEncontrada.estado === 'certificado' ? '#3b82f6' :
                                   donacionEncontrada.estado === 'validado' ? '#10b981' :
                                   donacionEncontrada.estado === 'rechazado' ? '#ef4444' : '#f59e0b',
                    color: 'white'
                  }}>
                    {donacionEncontrada.estado.toUpperCase()}
                  </span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px',
                  marginBottom: '20px'
                }}>
                  <div>
                    <strong style={{ color: '#1f2937' }}>Monto:</strong>
                    <span style={{ color: '#10b981', marginLeft: '5px', fontWeight: 'bold' }}>
                      {donacionEncontrada.monto_formateado}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#1f2937' }}>Método:</strong>
                    <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                      {donacionEncontrada.metodo_pago}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#1f2937' }}>Fecha:</strong>
                    <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                      {new Date(donacionEncontrada.created_at).toLocaleDateString('es-CO')}
                    </span>
                  </div>
                </div>

                {donacionEncontrada.estado === 'certificado' && donacionEncontrada.certificado_pdf_url && (
                  <div style={{ textAlign: 'center' }}>
                    <button
                      onClick={descargarCertificado}
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 25px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(5, 150, 105, 0.3)'
                      }}
                    >
                      📄 Descargar Certificado PDF
                    </button>
                  </div>
                )}

                {donacionEncontrada.estado !== 'certificado' && (
                  <div style={{
                    padding: '15px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '8px',
                    borderLeft: '4px solid #f59e0b',
                    textAlign: 'center'
                  }}>
                    <p style={{ color: '#92400e', margin: 0 }}>
                      Tu donación está en proceso de validación. El certificado estará disponible una vez sea certificada.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Sección de Certificación */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            Certificar Donaciones Validadas
          </h2>
          
          <form onSubmit={buscarPorPalabrasClave} style={{
            display: 'flex',
            gap: '15px',
            marginBottom: '30px',
            alignItems: 'end'
          }}>
            <div style={{ flex: 1 }}>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Buscar por Palabras Clave:
              </label>
              <input
                type="text"
                value={palabrasClave}
                onChange={(e) => setPalabrasClave(e.target.value)}
                placeholder="Ej: transparencia, veeduría, desarrollo, etc."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                marginTop: '5px'
              }}>
                Busca donaciones por nombre, mensaje o referencia para certificar
              </p>
            </div>
            <button
              type="submit"
              disabled={cargandoCertificacion}
              style={{
                background: cargandoCertificacion ? '#9ca3af' : 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: cargandoCertificacion ? 'not-allowed' : 'pointer',
                boxShadow: cargandoCertificacion ? 'none' : '0 4px 15px rgba(5, 150, 105, 0.3)',
                opacity: cargandoCertificacion ? 0.7 : 1
              }}
            >
              {cargandoCertificacion ? '⏳ Buscando...' : '🔍 Buscar'}
            </button>
          </form>

          {donacionesValidadas.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                Donaciones Validadas para Certificar ({donacionesValidadas.length})
              </h3>

              <div style={{ display: 'grid', gap: '20px' }}>
                {donacionesValidadas.map((donacion) => (
                  <div
                    key={donacion.id}
                    style={{
                      padding: '25px',
                      backgroundColor: '#f0fdf4',
                      borderRadius: '12px',
                      border: '2px solid #bbf7d0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '20px'
                    }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{
                          fontSize: '18px',
                          fontWeight: 'bold',
                          color: '#1f2937',
                          marginBottom: '8px'
                        }}>
                          {donacion.numero_referencia}
                        </h4>
                        <p style={{
                          color: '#6b7280',
                          fontSize: '14px',
                          marginBottom: '10px'
                        }}>
                          Donante: {donacion.nombre_donante} - {donacion.email_donante}
                        </p>
                        {donacion.referencia_donacion && (
                          <p style={{
                            color: '#059669',
                            fontSize: '14px',
                            fontWeight: 'bold',
                            marginBottom: '10px'
                          }}>
                            📌 Referencia: {donacion.referencia_donacion}
                          </p>
                        )}
                      </div>
                      <span style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: '#10b981',
                        color: 'white'
                      }}>
                        VALIDADO
                      </span>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '15px',
                      marginBottom: '20px'
                    }}>
                      <div>
                        <strong style={{ color: '#1f2937' }}>Monto:</strong>
                        <span style={{ color: '#059669', marginLeft: '5px', fontWeight: 'bold' }}>
                          {new Intl.NumberFormat('es-CO', {
                            style: 'currency',
                            currency: 'COP',
                            minimumFractionDigits: 0
                          }).format(donacion.monto)}
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#1f2937' }}>Método:</strong>
                        <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                          {donacion.metodo_pago}
                        </span>
                      </div>
                      <div>
                        <strong style={{ color: '#1f2937' }}>Fecha:</strong>
                        <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                          {new Date(donacion.created_at).toLocaleDateString('es-CO')}
                        </span>
                      </div>
                    </div>

                    {donacion.mensaje && (
                      <div style={{
                        padding: '15px',
                        backgroundColor: '#e0f2fe',
                        borderRadius: '8px',
                        borderLeft: '4px solid #0ea5e9',
                        marginBottom: '15px'
                      }}>
                        <strong style={{ color: '#1f2937' }}>Mensaje:</strong>
                        <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
                          {donacion.mensaje}
                        </p>
                      </div>
                    )}

                    <div style={{ textAlign: 'center' }}>
                      <button
                        onClick={() => certificarDonacion(donacion.id)}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '12px 25px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        📄 Certificar y Generar PDF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {donacionesValidadas.length === 0 && palabrasClave && !cargandoCertificacion && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
              <h3>No se encontraron donaciones validadas</h3>
              <p>Intenta con otras palabras clave o verifica que las donaciones estén validadas</p>
            </div>
          )}
        </div>

        {/* Transparencia */}
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
            marginBottom: '20px'
          }}>
            Transparencia en el Uso de Donaciones
          </h3>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            marginBottom: '25px',
            maxWidth: '800px',
            margin: '0 auto 25px'
          }}>
            Publicamos trimestralmente reportes detallados sobre cómo se utilizan las donaciones, 
            incluyendo gastos operativos, inversión en tecnología y proyectos específicos.
          </p>
          <button style={{
            background: 'white',
            color: '#1e40af',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            📊 Ver Reportes de Transparencia
          </button>
        </div>
      </div>
    </div>
  );
};

export default Donaciones;
