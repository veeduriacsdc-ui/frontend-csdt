import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Documentos = () => {
  const [documentos] = useState([
    {
      id: 1,
      titulo: 'Manual de Usuario - Plataforma CSDT',
      descripcion: 'Guía completa para el uso de todas las funcionalidades de la plataforma CSDT',
      tipo: 'Manual',
      categoria: 'Usuario',
      fecha: '2024-01-15',
      version: '2.1.0',
      tamaño: '2.5 MB',
      formato: 'PDF',
      descargas: 1250,
      icono: '📖'
    },
    {
      id: 2,
      titulo: 'Metodología de Análisis Forense Digital',
      descripcion: 'Documento técnico que describe la metodología utilizada para el análisis forense de documentos',
      tipo: 'Técnico',
      categoria: 'Metodología',
      fecha: '2024-01-10',
      version: '1.5.0',
      tamaño: '4.2 MB',
      formato: 'PDF',
      descargas: 890,
      icono: '🔬'
    },
    {
      id: 3,
      titulo: 'Reporte Anual 2023 - CSDT',
      descripcion: 'Informe anual de actividades, logros y estadísticas del Consejo Social de Veeduría y Desarrollo Territorial',
      tipo: 'Reporte',
      categoria: 'Institucional',
      fecha: '2024-01-05',
      version: '1.0.0',
      tamaño: '8.7 MB',
      formato: 'PDF',
      descargas: 2100,
      icono: '📊'
    },
    {
      id: 4,
      titulo: 'Guía de Veeduría Ciudadana',
      descripcion: 'Manual para ciudadanos sobre cómo ejercer control social efectivo',
      tipo: 'Guía',
      categoria: 'Ciudadanía',
      fecha: '2023-12-20',
      version: '3.0.0',
      tamaño: '1.8 MB',
      formato: 'PDF',
      descargas: 3400,
      icono: '👥'
    },
    {
      id: 5,
      titulo: 'Protocolo de Seguridad Informática',
      descripcion: 'Protocolo interno de seguridad para el manejo de información sensible',
      tipo: 'Protocolo',
      categoria: 'Seguridad',
      fecha: '2023-12-15',
      version: '2.3.0',
      tamaño: '3.1 MB',
      formato: 'PDF',
      descargas: 450,
      icono: '🔒'
    },
    {
      id: 6,
      titulo: 'Estadísticas de Casos 2023',
      descripcion: 'Compilación estadística de todos los casos procesados durante el año 2023',
      tipo: 'Estadística',
      categoria: 'Datos',
      fecha: '2023-12-10',
      version: '1.0.0',
      tamaño: '2.9 MB',
      formato: 'Excel',
      descargas: 1200,
      icono: '📈'
    },
    {
      id: 7,
      titulo: 'Manual de IA Legal Colombiana',
      descripcion: 'Documentación técnica del sistema de IA especializado en derecho colombiano',
      tipo: 'Técnico',
      categoria: 'IA',
      fecha: '2023-12-05',
      version: '1.2.0',
      tamaño: '5.4 MB',
      formato: 'PDF',
      descargas: 680,
      icono: '🤖'
    },
    {
      id: 8,
      titulo: 'Política de Protección de Datos',
      descripcion: 'Política institucional para el manejo y protección de datos personales',
      tipo: 'Política',
      categoria: 'Legal',
      fecha: '2023-11-28',
      version: '2.0.0',
      tamaño: '1.2 MB',
      formato: 'PDF',
      descargas: 950,
      icono: '⚖️'
    },
    {
      id: 9,
      titulo: 'Casos de Estudio - Análisis Forense',
      descripcion: 'Recopilación de casos reales analizados con la plataforma CSDT',
      tipo: 'Caso de Estudio',
      categoria: 'Educativo',
      fecha: '2023-11-20',
      version: '1.0.0',
      tamaño: '6.8 MB',
      formato: 'PDF',
      descargas: 1800,
      icono: '📚'
    },
    {
      id: 10,
      titulo: 'API Documentation - CSDT',
      descripcion: 'Documentación técnica para desarrolladores que deseen integrar con la API de CSDT',
      tipo: 'Documentación',
      categoria: 'Desarrollo',
      fecha: '2023-11-15',
      version: '1.8.0',
      tamaño: '2.1 MB',
      formato: 'PDF',
      descargas: 320,
      icono: '💻'
    }
  ]);

  const [filtros, setFiltros] = useState({
    tipo: 'Todos',
    categoria: 'Todas',
    formato: 'Todos',
    busqueda: ''
  });

  const tipos = ['Todos', 'Manual', 'Técnico', 'Reporte', 'Guía', 'Protocolo', 'Estadística', 'Política', 'Caso de Estudio', 'Documentación'];
  const categorias = ['Todas', 'Usuario', 'Metodología', 'Institucional', 'Ciudadanía', 'Seguridad', 'Datos', 'IA', 'Legal', 'Educativo', 'Desarrollo'];
  const formatos = ['Todos', 'PDF', 'Excel', 'Word', 'PowerPoint'];

  const documentosFiltrados = documentos.filter(doc => {
    const cumpleTipo = filtros.tipo === 'Todos' || doc.tipo === filtros.tipo;
    const cumpleCategoria = filtros.categoria === 'Todas' || doc.categoria === filtros.categoria;
    const cumpleFormato = filtros.formato === 'Todos' || doc.formato === filtros.formato;
    const cumpleBusqueda = doc.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase()) ||
                          doc.descripcion.toLowerCase().includes(filtros.busqueda.toLowerCase());
    
    return cumpleTipo && cumpleCategoria && cumpleFormato && cumpleBusqueda;
  });

  const manejarCambio = (campo, valor) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const descargarDocumento = (documento) => {
    // Simular descarga
    alert(`Descargando: ${documento.titulo}`);
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
            Documentos Públicos
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Accede a todos los documentos públicos, manuales, reportes y recursos del CSDT
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Estadísticas Rápidas */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>📄</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              {documentos.length}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Documentos Disponibles
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>⬇️</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              {documentos.reduce((sum, doc) => sum + doc.descargas, 0).toLocaleString()}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Descargas Totales
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>📚</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              {categorias.length - 1}
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Categorías
            </p>
          </div>
          
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '35px', marginBottom: '10px' }}>🆕</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              3
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280'
            }}>
              Actualizados Este Mes
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Buscar Documento
              </label>
              <input
                type="text"
                value={filtros.busqueda}
                onChange={(e) => manejarCambio('busqueda', e.target.value)}
                placeholder="Buscar por título o descripción..."
                style={{
                  width: '100%',
                  padding: '10px',
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
                Tipo de Documento
              </label>
              <select
                value={filtros.tipo}
                onChange={(e) => manejarCambio('tipo', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                {tipos.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
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
                Categoría
              </label>
              <select
                value={filtros.categoria}
                onChange={(e) => manejarCambio('categoria', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>{categoria}</option>
                ))}
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
                Formato
              </label>
              <select
                value={filtros.formato}
                onChange={(e) => manejarCambio('formato', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                {formatos.map(formato => (
                  <option key={formato} value={formato}>{formato}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Documentos */}
        <div style={{
          background: 'white',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '25px',
            textAlign: 'center'
          }}>
            Documentos Disponibles ({documentosFiltrados.length})
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px'
          }}>
            {documentosFiltrados.map((documento) => (
              <div
                key={documento.id}
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
                  alignItems: 'flex-start',
                  gap: '15px',
                  marginBottom: '15px'
                }}>
                  <div style={{ fontSize: '35px' }}>
                    {documento.icono}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      gap: '8px',
                      marginBottom: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        background: '#dbeafe',
                        color: '#1e40af',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold'
                      }}>
                        {documento.tipo}
                      </span>
                      <span style={{
                        background: '#dcfce7',
                        color: '#14532d',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold'
                      }}>
                        {documento.categoria}
                      </span>
                      <span style={{
                        background: '#fef3c7',
                        color: '#92400e',
                        padding: '3px 8px',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 'bold'
                      }}>
                        {documento.formato}
                      </span>
                    </div>
                    
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#1f2937',
                      marginBottom: '8px',
                      lineHeight: '1.3'
                    }}>
                      {documento.titulo}
                    </h3>
                    
                    <p style={{
                      fontSize: '13px',
                      color: '#6b7280',
                      lineHeight: '1.4',
                      marginBottom: '12px'
                    }}>
                      {documento.descripcion}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '15px',
                      fontSize: '12px',
                      color: '#6b7280'
                    }}>
                      <span>v{documento.version}</span>
                      <span>{documento.tamaño}</span>
                      <span>{documento.descargas.toLocaleString()} descargas</span>
                      <span>{new Date(documento.fecha).toLocaleDateString('es-CO')}</span>
                    </div>
                    
                    <button
                      onClick={() => descargarDocumento(documento)}
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 15px rgba(5, 150, 105, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      📥 Descargar Documento
                    </button>
                  </div>
                </div>
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
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Información Importante
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
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>🔒</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Acceso Libre
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Todos los documentos son de acceso público y gratuito
              </p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '20px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '30px', marginBottom: '10px' }}>📝</div>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
                Actualización Constante
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Los documentos se actualizan regularmente con nueva información
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
                Soporte Técnico
              </h4>
              <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>
                Contacta a nuestro equipo si necesitas ayuda con algún documento
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentos;
