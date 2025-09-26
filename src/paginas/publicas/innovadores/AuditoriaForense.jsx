import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const AuditoriaForense = () => {
  const [casosAbiertos, setCasosAbiertos] = useState([
    {
      id: 1,
      titulo: 'Análisis Catastral - Municipio X',
      fecha: '2024-01-15',
      estado: 'En Proceso',
      tipo: 'Catastral',
      urgencia: 'Alta',
      descripcion: 'Análisis de irregularidades en registros catastrales',
      evidencias: 15,
      avance: 65
    },
    {
      id: 2,
      titulo: 'Auditoría Minera - Región Y',
      fecha: '2024-01-20',
      estado: 'Completado',
      tipo: 'Minera',
      urgencia: 'Media',
      descripcion: 'Verificación de títulos mineros y concesiones',
      evidencias: 8,
      avance: 100
    },
    {
      id: 3,
      titulo: 'Revisión Administrativa - Entidad Z',
      fecha: '2024-01-25',
      estado: 'Pendiente',
      tipo: 'Administrativa',
      urgencia: 'Baja',
      descripcion: 'Análisis de actos administrativos sospechosos',
      evidencias: 3,
      avance: 20
    }
  ]);

  const [nuevoCaso, setNuevoCaso] = useState({
    titulo: '',
    tipo: 'Catastral',
    urgencia: 'Media',
    descripcion: '',
    archivos: []
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoCaso(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarArchivos = (e) => {
    const archivos = Array.from(e.target.files);
    setNuevoCaso(prev => ({
      ...prev,
      archivos: [...prev.archivos, ...archivos]
    }));
  };

  const enviarCaso = (e) => {
    e.preventDefault();
    const nuevoId = Math.max(...casosAbiertos.map(c => c.id)) + 1;
    const casoCompleto = {
      ...nuevoCaso,
      id: nuevoId,
      fecha: new Date().toISOString().split('T')[0],
      estado: 'Pendiente',
      evidencias: nuevoCaso.archivos.length,
      avance: 0
    };
    
    setCasosAbiertos(prev => [casoCompleto, ...prev]);
    setNuevoCaso({
      titulo: '',
      tipo: 'Catastral',
      urgencia: 'Media',
      descripcion: '',
      archivos: []
    });
    setMostrarFormulario(false);
  };

  const getEstadoColor = (estado) => {
    switch(estado) {
      case 'Completado': return '#10b981';
      case 'En Proceso': return '#f59e0b';
      case 'Pendiente': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getUrgenciaColor = (urgencia) => {
    switch(urgencia) {
      case 'Alta': return '#dc2626';
      case 'Media': return '#f59e0b';
      case 'Baja': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f87171 100%)',
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
            Auditoría Forense Digital
            </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Análisis forense digital para detectar irregularidades en gestión territorial
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Estadísticas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '25px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>📊</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              {casosAbiertos.length}
              </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Casos Totales
            </p>
              </div>

        <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>🔍</div>
            <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              {casosAbiertos.filter(c => c.estado === 'En Proceso').length}
              </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              En Proceso
            </p>
        </div>

        <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>✅</div>
            <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              {casosAbiertos.filter(c => c.estado === 'Completado').length}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Completados
            </p>
          </div>

          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>📁</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              {casosAbiertos.reduce((sum, c) => sum + c.evidencias, 0)}
                </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Evidencias Analizadas
            </p>
          </div>
        </div>

        {/* Botón Nuevo Caso */}
        <div style={{ marginBottom: '30px', textAlign: 'center' }}>
          <button
            onClick={() => setMostrarFormulario(true)}
            style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.3)';
            }}
          >
            + Nuevo Caso de Auditoría
          </button>
        </div>

        {/* Formulario Nuevo Caso */}
        {mostrarFormulario && (
        <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '25px',
              textAlign: 'center'
            }}>
              Nuevo Caso de Auditoría Forense
              </h3>
            
            <form onSubmit={enviarCaso}>
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
                    Título del Caso
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    value={nuevoCaso.titulo}
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
                    Tipo de Auditoría
                  </label>
                  <select
                    name="tipo"
                    value={nuevoCaso.tipo}
                    onChange={manejarCambio}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Catastral">Catastral</option>
                    <option value="Minera">Minera</option>
                    <option value="Administrativa">Administrativa</option>
                    <option value="Ambiental">Ambiental</option>
                    <option value="Fiscal">Fiscal</option>
                  </select>
                    </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Nivel de Urgencia
                  </label>
                  <select
                    name="urgencia"
                    value={nuevoCaso.urgencia}
                    onChange={manejarCambio}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Baja">Baja</option>
                    <option value="Media">Media</option>
                    <option value="Alta">Alta</option>
                    <option value="Crítica">Crítica</option>
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
                  Descripción del Caso
                </label>
                <textarea
                  name="descripcion"
                  value={nuevoCaso.descripcion}
                  onChange={manejarCambio}
                  required
                  rows="4"
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
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Documentos de Evidencia
                </label>
                <input
                  type="file"
                  multiple
                  onChange={manejarArchivos}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
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
              
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center'
              }}>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Crear Caso
                </button>
                <button
                  type="button"
                  onClick={() => setMostrarFormulario(false)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
            </div>
          )}

        {/* Lista de Casos */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Casos de Auditoría Forense
              </h3>
          
              <div style={{
                display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '25px'
          }}>
            {casosAbiertos.map((caso) => (
              <div
                key={caso.id}
                style={{
                  background: '#f8fafc',
                  padding: '25px',
                  borderRadius: '15px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setCasoSeleccionado(caso)}
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '15px'
                }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    margin: 0,
                    flex: 1
                  }}>
                    {caso.titulo}
                  </h4>
                  <div style={{
                    background: getEstadoColor(caso.estado),
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    marginLeft: '10px'
                  }}>
                    {caso.estado}
                    </div>
                  </div>
                
                <p style={{
                  fontSize: '13px',
                  color: '#6b7280',
                  marginBottom: '15px',
                  lineHeight: '1.5'
                }}>
                  {caso.descripcion}
                </p>
                
                    <div style={{
                      display: 'flex',
                  justifyContent: 'space-between',
                      alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <div style={{
                    display: 'flex',
                    gap: '10px'
                  }}>
                    <span style={{
                      background: '#e5e7eb',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      color: '#374151'
                    }}>
                      {caso.tipo}
                    </span>
                    <span style={{
                      background: getUrgenciaColor(caso.urgencia),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {caso.urgencia}
                    </span>
                  </div>
                  <span style={{
                    fontSize: '12px',
                    color: '#6b7280'
                  }}>
                    {caso.fecha}
                  </span>
                    </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <div style={{
                      display: 'flex',
                    justifyContent: 'space-between',
                      alignItems: 'center',
                    marginBottom: '5px'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      color: '#374151',
                      fontWeight: 'bold'
                    }}>
                      Progreso
                    </span>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {caso.avance}%
                    </span>
                    </div>
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: '#e5e7eb',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${caso.avance}%`,
                      height: '100%',
                      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                      borderRadius: '3px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                    gap: '5px'
                  }}>
                    <span style={{ fontSize: '14px' }}>📁</span>
                    <span style={{
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      {caso.evidencias} evidencias
                    </span>
                    </div>
                  <button
                    style={{
                      background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Ver Detalles
                  </button>
                  </div>
                </div>
            ))}
              </div>
            </div>

        {/* Modal Detalle del Caso */}
        {casoSeleccionado && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflowY: 'auto'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {casoSeleccionado.titulo}
              </h3>
                <button
                  onClick={() => setCasoSeleccionado(null)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  Cerrar
                </button>
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '15px'
                }}>
                  {casoSeleccionado.descripcion}
                </p>
                
              <div style={{
                display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '15px'
              }}>
                <div>
                    <strong style={{ color: '#374151' }}>Tipo:</strong>
                    <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                      {casoSeleccionado.tipo}
                    </span>
                    </div>
                  <div>
                    <strong style={{ color: '#374151' }}>Estado:</strong>
                    <span style={{
                      marginLeft: '8px',
                      background: getEstadoColor(casoSeleccionado.estado),
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {casoSeleccionado.estado}
                    </span>
                    </div>
                  <div>
                    <strong style={{ color: '#374151' }}>Urgencia:</strong>
                    <span style={{
                      marginLeft: '8px',
                      background: getUrgenciaColor(casoSeleccionado.urgencia),
                      color: 'white',
                      padding: '2px 6px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {casoSeleccionado.urgencia}
                    </span>
                    </div>
                  <div>
                    <strong style={{ color: '#374151' }}>Fecha:</strong>
                    <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                      {casoSeleccionado.fecha}
                    </span>
                  </div>
                  <div>
                    <strong style={{ color: '#374151' }}>Evidencias:</strong>
                    <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                      {casoSeleccionado.evidencias} documentos
                    </span>
                </div>
                <div>
                    <strong style={{ color: '#374151' }}>Progreso:</strong>
                    <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                      {casoSeleccionado.avance}%
                    </span>
                </div>
              </div>
        </div>

        <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'center'
              }}>
                <button
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
            fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Iniciar Análisis
                </button>
                <button
                  style={{
                    background: '#6b7280',
                    color: 'white',
            border: 'none',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Generar Reporte
          </button>
        </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditoriaForense;
