import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';

const AdminDonaciones = () => {
  const { user } = useAuth();
  const [donaciones, setDonaciones] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({
    estado: 'todos',
    tipo_donacion: 'todos',
    fecha_desde: '',
    fecha_hasta: ''
  });
  const [donacionSeleccionada, setDonacionSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [accionModal, setAccionModal] = useState('');
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    cargarDonaciones();
    cargarEstadisticas();
  }, [filtros]);

  const cargarDonaciones = async () => {
    try {
      setCargando(true);
      const params = new URLSearchParams();
      
      if (filtros.estado !== 'todos') params.append('estado', filtros.estado);
      if (filtros.tipo_donacion !== 'todos') params.append('tipo_donacion', filtros.tipo_donacion);
      if (filtros.fecha_desde) params.append('fecha_desde', filtros.fecha_desde);
      if (filtros.fecha_hasta) params.append('fecha_hasta', filtros.fecha_hasta);

      const response = await api.get(`/donaciones?${params.toString()}`);
      
      if (response.data.success) {
        setDonaciones(response.data.data.data || []);
      }
    } catch (error) {
      console.error('Error al cargar donaciones:', error);
    } finally {
      setCargando(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const response = await api.get('/donaciones/estadisticas');
      
      if (response.data.success) {
        setEstadisticas(response.data.data);
      }
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  const abrirModal = (donacion, accion) => {
    setDonacionSeleccionada(donacion);
    setAccionModal(accion);
    setObservaciones('');
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setDonacionSeleccionada(null);
    setAccionModal('');
    setObservaciones('');
  };

  const ejecutarAccion = async () => {
    try {
      if (accionModal === 'validar') {
        const response = await api.post(`/donaciones/${donacionSeleccionada.id}/validar`, {
          estado: 'validado',
          observaciones_admin: observaciones
        });
        
        if (response.data.success) {
          alert('Donación validada exitosamente');
          cargarDonaciones();
          cerrarModal();
        }
      } else if (accionModal === 'rechazar') {
        const response = await api.post(`/donaciones/${donacionSeleccionada.id}/validar`, {
          estado: 'rechazado',
          observaciones_admin: observaciones
        });
        
        if (response.data.success) {
          alert('Donación rechazada');
          cargarDonaciones();
          cerrarModal();
        }
      } else if (accionModal === 'certificar') {
        const response = await api.post(`/donaciones/${donacionSeleccionada.id}/certificar`, {
          observaciones_certificacion: observaciones
        });
        
        if (response.data.success) {
          alert('Donación certificada y PDF generado exitosamente');
          cargarDonaciones();
          cerrarModal();
        }
      }
    } catch (error) {
      console.error('Error al ejecutar acción:', error);
      alert('Error al procesar la acción');
    }
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return '#f59e0b';
      case 'validado': return '#10b981';
      case 'rechazado': return '#ef4444';
      case 'certificado': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '20px'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
    color: 'white',
    padding: '40px 0',
    textAlign: 'center',
    borderRadius: '15px',
    marginBottom: '30px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    marginBottom: '20px'
  };

  return (
    <div style={containerStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            Gestión de Donaciones
          </h1>
          <p style={{
            fontSize: '16px',
            margin: 0,
            opacity: 0.9
          }}>
            Administrador: {user?.nombre || 'Usuario'} - Valida, certifica y gestiona donaciones del sistema
          </p>
        </div>

        {/* Estadísticas */}
        <div style={cardStyle}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Estadísticas Generales
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>💰</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                {formatearPrecio(estadisticas.monto_total || 0)}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Recaudado</div>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                {estadisticas.total_donaciones || 0}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Donaciones</div>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⏳</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                {estadisticas.donaciones_pendientes || 0}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Pendientes</div>
            </div>

            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>✅</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>
                {estadisticas.donaciones_certificadas || 0}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Certificadas</div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div style={cardStyle}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '20px'
          }}>
            Filtros de Búsqueda
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Estado:
              </label>
              <select
                value={filtros.estado}
                onChange={(e) => setFiltros({...filtros, estado: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
              >
                <option value="todos">Todos los Estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="validado">Validado</option>
                <option value="rechazado">Rechazado</option>
                <option value="certificado">Certificado</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Tipo:
              </label>
              <select
                value={filtros.tipo_donacion}
                onChange={(e) => setFiltros({...filtros, tipo_donacion: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
              >
                <option value="todos">Todos los Tipos</option>
                <option value="unica">Única</option>
                <option value="mensual">Mensual</option>
                <option value="trimestral">Trimestral</option>
                <option value="anual">Anual</option>
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Fecha Desde:
              </label>
              <input
                type="date"
                value={filtros.fecha_desde}
                onChange={(e) => setFiltros({...filtros, fecha_desde: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Fecha Hasta:
              </label>
              <input
                type="date"
                value={filtros.fecha_hasta}
                onChange={(e) => setFiltros({...filtros, fecha_hasta: e.target.value})}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#f8fafc'
                }}
              />
            </div>
          </div>
        </div>

        {/* Lista de Donaciones */}
        <div style={cardStyle}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px'
          }}>
            Donaciones Registradas
          </h3>

          {cargando ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '15px' }}>⏳</div>
              <p>Cargando donaciones...</p>
            </div>
          ) : donaciones.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6b7280'
            }}>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>💰</div>
              <h3>No hay donaciones que coincidan con los filtros</h3>
              <p>Intenta ajustar los criterios de búsqueda</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {donaciones.map((donacion) => (
                <div
                  key={donacion.id}
                  style={{
                    padding: '25px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '12px',
                    border: '2px solid #e5e7eb',
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
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: getEstadoColor(donacion.estado),
                        color: 'white'
                      }}>
                        {donacion.estado.toUpperCase()}
                      </span>
                    </div>
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
                        {formatearPrecio(donacion.monto)}
                      </span>
                    </div>
                    <div>
                      <strong style={{ color: '#1f2937' }}>Método:</strong>
                      <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                        {donacion.metodo_pago}
                      </span>
                    </div>
                    <div>
                      <strong style={{ color: '#1f2937' }}>Tipo:</strong>
                      <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                        {donacion.tipo_donacion}
                      </span>
                    </div>
                    <div>
                      <strong style={{ color: '#1f2937' }}>Fecha:</strong>
                      <span style={{ color: '#6b7280', marginLeft: '5px' }}>
                        {new Date(donacion.created_at).toLocaleDateString('es-CO')}
                      </span>
                    </div>
                  </div>

                  {/* Archivo de comprobante */}
                  {donacion.archivo_comprobante && (
                    <div style={{ marginBottom: '15px' }}>
                      <strong style={{ color: '#1f2937' }}>Comprobante:</strong>
                      <a
                        href={donacion.archivo_comprobante_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#3b82f6',
                          textDecoration: 'none',
                          marginLeft: '5px'
                        }}
                      >
                        📄 Ver archivo
                      </a>
                    </div>
                  )}

                  {/* Mensaje del donante */}
                  {donacion.mensaje && (
                    <div style={{
                      padding: '15px',
                      backgroundColor: '#e0f2fe',
                      borderRadius: '8px',
                      borderLeft: '4px solid #0ea5e9',
                      marginBottom: '15px'
                    }}>
                      <strong style={{ color: '#1f2937' }}>Mensaje del Donante:</strong>
                      <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
                        {donacion.mensaje}
                      </p>
                    </div>
                  )}

                  {/* Observaciones de validación */}
                  {donacion.observaciones_admin && (
                    <div style={{
                      padding: '15px',
                      backgroundColor: '#fef3c7',
                      borderRadius: '8px',
                      borderLeft: '4px solid #f59e0b',
                      marginBottom: '15px'
                    }}>
                      <strong style={{ color: '#1f2937' }}>Observaciones:</strong>
                      <p style={{ color: '#92400e', margin: '5px 0 0 0' }}>
                        {donacion.observaciones_admin}
                      </p>
                    </div>
                  )}

                  {/* Botones de acción */}
                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap'
                  }}>
                    {donacion.estado === 'pendiente' && (
                      <>
                        <button
                          onClick={() => abrirModal(donacion, 'validar')}
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          ✅ Validar
                        </button>
                        <button
                          onClick={() => abrirModal(donacion, 'rechazar')}
                          style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                          }}
                        >
                          ❌ Rechazar
                        </button>
                      </>
                    )}

                    {donacion.estado === 'validado' && (
                      <button
                        onClick={() => abrirModal(donacion, 'certificar')}
                        style={{
                          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        📄 Certificar y Generar PDF
                      </button>
                    )}

                    {donacion.estado === 'certificado' && donacion.certificado_pdf_url && (
                      <a
                        href={donacion.certificado_pdf_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                          color: 'white',
                          border: 'none',
                          padding: '8px 16px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        📋 Ver Certificado
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal de Acción */}
        {mostrarModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 15px 50px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {accionModal === 'validar' && 'Validar Donación'}
                {accionModal === 'rechazar' && 'Rechazar Donación'}
                {accionModal === 'certificar' && 'Certificar Donación'}
              </h3>

              <div style={{ marginBottom: '20px' }}>
                <p style={{ color: '#6b7280', marginBottom: '15px' }}>
                  <strong>Donación:</strong> {donacionSeleccionada?.numero_referencia}
                </p>
                <p style={{ color: '#6b7280', marginBottom: '15px' }}>
                  <strong>Donante:</strong> {donacionSeleccionada?.nombre_donante}
                </p>
                <p style={{ color: '#6b7280', marginBottom: '20px' }}>
                  <strong>Monto:</strong> {formatearPrecio(donacionSeleccionada?.monto)}
                </p>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Observaciones:
                </label>
                <textarea
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    resize: 'vertical'
                  }}
                  placeholder="Ingresa observaciones sobre esta acción..."
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '15px',
                marginTop: '25px'
              }}>
                <button
                  onClick={cerrarModal}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '2px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#374151',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={ejecutarAccion}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: 'none',
                    borderRadius: '8px',
                    background: accionModal === 'rechazar' ? 
                      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' :
                      'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {accionModal === 'validar' && 'Validar'}
                  {accionModal === 'rechazar' && 'Rechazar'}
                  {accionModal === 'certificar' && 'Certificar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default AdminDonaciones;
