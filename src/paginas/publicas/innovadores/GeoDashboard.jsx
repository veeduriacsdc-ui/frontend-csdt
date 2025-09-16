import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GeoDashboard = () => {
  const [puntosVeeduria, setPuntosVeeduria] = useState([]);
  const [casos, setCasos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showStats, setShowStats] = useState(true);
  const [stats, setStats] = useState(null);
  const [selectedCaso, setSelectedCaso] = useState(null);

  // Cargar datos geoespaciales al montar el componente
  useEffect(() => {
    loadGeospatialData();
  }, []);

  const loadGeospatialData = async () => {
    try {
      setLoading(true);

      // Cargar desde localStorage o crear datos de prueba
      const puntosGuardados = JSON.parse(localStorage.getItem('puntosVeeduria') || '[]');
      const casosGuardados = JSON.parse(localStorage.getItem('casosVeeduria') || '[]');

      if (puntosGuardados.length === 0) {
        // Datos de prueba específicos del CSDT
        const mockPuntosVeeduria = [
        {
          id: 1,
            nombre: 'Oficina Principal CSDT',
            descripcion: 'Sede principal del Consejo Social de Veeduría y Desarrollo Territorial',
            categoria: 'oficina',
            latitud: 6.2442,
            longitud: -75.5812,
            fechaCreacion: '2024-01-15',
            estado: 'activo',
            telefono: '3001234567',
            email: 'info@csdt.gov.co',
            responsable: 'María González',
            servicios: ['Atención al ciudadano', 'Veeduría ciudadana', 'Asesoría legal'],
            horario: 'Lunes a Viernes 8:00 AM - 5:00 PM'
        },
        {
          id: 2,
            nombre: 'Punto de Veeduría Norte',
            descripcion: 'Punto de atención para veeduría ciudadana en la zona norte',
            categoria: 'punto_veeduria',
            latitud: 6.2450,
            longitud: -75.5800,
            fechaCreacion: '2024-01-20',
            estado: 'activo',
            telefono: '3009876543',
            email: 'norte@csdt.gov.co',
            responsable: 'Carlos Rodríguez',
            servicios: ['Veeduría ciudadana', 'Recepción de denuncias'],
            horario: 'Lunes a Viernes 8:00 AM - 4:00 PM'
        },
        {
          id: 3,
            nombre: 'Centro de Asesoría Legal',
            descripcion: 'Centro especializado en asesoría legal para casos de veeduría',
            categoria: 'asesoria_legal',
            latitud: 6.2430,
            longitud: -75.5820,
            fechaCreacion: '2024-01-25',
            estado: 'activo',
            telefono: '3005555555',
            email: 'legal@csdt.gov.co',
            responsable: 'Ana Sánchez',
            servicios: ['Asesoría legal', 'Acciones de tutela', 'Acciones populares'],
            horario: 'Lunes a Viernes 9:00 AM - 6:00 PM'
          },
          {
            id: 4,
            nombre: 'Punto de Veeduría Sur',
            descripcion: 'Punto de atención para veeduría ciudadana en la zona sur',
            categoria: 'punto_veeduria',
            latitud: 6.2420,
            longitud: -75.5830,
            fechaCreacion: '2024-02-01',
            estado: 'activo',
            telefono: '3001111111',
            email: 'sur@csdt.gov.co',
            responsable: 'Roberto Jiménez',
            servicios: ['Veeduría ciudadana', 'Recepción de denuncias', 'Seguimiento de casos'],
            horario: 'Lunes a Viernes 8:00 AM - 4:00 PM'
          },
          {
            id: 5,
            nombre: 'Centro de Capacitación',
            descripcion: 'Centro de capacitación para veedores ciudadanos',
            categoria: 'capacitacion',
            latitud: 6.2460,
            longitud: -75.5790,
            fechaCreacion: '2024-02-05',
            estado: 'activo',
            telefono: '3002222222',
            email: 'capacitacion@csdt.gov.co',
            responsable: 'Patricia Morales',
            servicios: ['Capacitación de veedores', 'Talleres ciudadanos', 'Formación en derechos'],
            horario: 'Lunes a Viernes 8:00 AM - 5:00 PM'
          }
        ];

        const mockCasos = [
        {
          id: 1,
            titulo: 'Veeduría a Obra Pública - Avenida Principal',
            descripcion: 'Seguimiento a la construcción de la avenida principal del municipio',
            tipo: 'veeduria_obra_publica',
            estado: 'en_progreso',
            fechaCreacion: '2024-01-15',
            fechaLimite: '2024-06-15',
            ubicacion: {
              latitud: 6.2445,
              longitud: -75.5805,
              direccion: 'Avenida Principal, Sector Centro'
            },
            presupuesto: 5000000000,
            progreso: 65,
            responsable: 'María González',
            observaciones: 'Obra en ejecución según cronograma'
          },
          {
            id: 2,
            titulo: 'Veeduría a Servicios Públicos - Zona Norte',
            descripcion: 'Control social al suministro de servicios públicos en la zona norte',
            tipo: 'veeduria_servicios_publicos',
            estado: 'pendiente',
            fechaCreacion: '2024-01-20',
            fechaLimite: '2024-05-20',
            ubicacion: {
              latitud: 6.2455,
              longitud: -75.5795,
              direccion: 'Zona Norte, Barrios Unidos'
            },
            presupuesto: 0,
            progreso: 15,
            responsable: 'Carlos Rodríguez',
            observaciones: 'Iniciando recolección de información'
          },
          {
            id: 3,
            titulo: 'Veeduría Ambiental - Río Municipal',
            descripcion: 'Control social a la calidad del agua del río municipal',
            tipo: 'veeduria_ambiental',
            estado: 'completada',
            fechaCreacion: '2024-01-10',
            fechaLimite: '2024-03-10',
            ubicacion: {
              latitud: 6.2435,
              longitud: -75.5825,
              direccion: 'Río Municipal, Sector Ecológico'
            },
            presupuesto: 200000000,
            progreso: 100,
            responsable: 'Ana Sánchez',
            observaciones: 'Veeduría completada exitosamente'
          }
        ];

        localStorage.setItem('puntosVeeduria', JSON.stringify(mockPuntosVeeduria));
        localStorage.setItem('casosVeeduria', JSON.stringify(mockCasos));
        
        setPuntosVeeduria(mockPuntosVeeduria);
        setCasos(mockCasos);
      } else {
        setPuntosVeeduria(puntosGuardados);
        setCasos(casosGuardados);
      }

      // Calcular estadísticas
      const estadisticas = {
        total_puntos: puntosGuardados.length || 5,
        total_casos: casosGuardados.length || 3,
        casos_en_progreso: (casosGuardados.length || 3) > 0 ? 
          casosGuardados.filter(c => c.estado === 'en_progreso').length : 1,
        casos_completados: (casosGuardados.length || 3) > 0 ? 
          casosGuardados.filter(c => c.estado === 'completada').length : 1,
        categorias_count: {
          oficina: 1,
          punto_veeduria: 2,
          asesoria_legal: 1,
          capacitacion: 1
        }
      };

      setStats(estadisticas);

    } catch (error) {
      console.error('Error cargando datos geoespaciales:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      oficina: '#1e40af',           // Azul oscuro - Oficina principal
      punto_veeduria: '#059669',    // Verde - Puntos de veeduría
      asesoria_legal: '#7c3aed',    // Púrpura - Asesoría legal
      capacitacion: '#dc2626',      // Rojo - Capacitación
      veeduria_obra_publica: '#ea580c',  // Naranja - Veeduría obra pública
      veeduria_servicios_publicos: '#0891b2', // Cian - Veeduría servicios
      veeduria_ambiental: '#16a34a', // Verde - Veeduría ambiental
      default: '#6b7280'
    };
    return colors[category] || colors.default;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      oficina: 'Oficina Principal',
      punto_veeduria: 'Punto de Veeduría',
      asesoria_legal: 'Asesoría Legal',
      capacitacion: 'Capacitación',
      veeduria_obra_publica: 'Veeduría Obra Pública',
      veeduria_servicios_publicos: 'Veeduría Servicios Públicos',
      veeduria_ambiental: 'Veeduría Ambiental',
      default: 'Otro'
    };
    return labels[category] || labels.default;
  };

  const getEstadoColor = (estado) => {
    const colors = {
      activo: '#10b981',
      inactivo: '#ef4444',
      en_progreso: '#3b82f6',
      pendiente: '#f59e0b',
      completada: '#10b981',
      cancelada: '#ef4444'
    };
    return colors[estado] || colors.default;
  };

  // Filtrar puntos por categoría
  const filteredPoints = puntosVeeduria.filter(punto => {
    const matchesCategory = !selectedCategory || punto.categoria === selectedCategory;
    const matchesSearch = !searchQuery ||
      punto.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      punto.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (punto.descripcion && punto.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Filtrar casos por categoría
  const filteredCasos = casos.filter(caso => {
    const matchesCategory = !selectedCategory || caso.tipo === selectedCategory;
    const matchesSearch = !searchQuery ||
      caso.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caso.tipo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (caso.descripcion && caso.descripcion.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleFeatureClick = (feature) => {
    const punto = puntosVeeduria.find(p => p.id === feature.properties?.data?.id);
    if (punto) {
      setSelectedPoint(punto);
    }
  };

  const handleMapClick = (latlng) => {
    console.log('Coordenadas seleccionadas:', latlng);
  };

  const exportarDatos = () => {
    try {
      const datosExportar = [
        ...puntosVeeduria.map(punto => ({
          'Tipo': 'Punto de Veeduría',
          'ID': punto.id,
          'Nombre': punto.nombre,
          'Descripción': punto.descripcion,
          'Categoría': getCategoryLabel(punto.categoria),
          'Estado': punto.estado,
          'Latitud': punto.latitud,
          'Longitud': punto.longitud,
          'Teléfono': punto.telefono,
          'Email': punto.email,
          'Responsable': punto.responsable,
          'Horario': punto.horario
        })),
        ...casos.map(caso => ({
          'Tipo': 'Caso de Veeduría',
          'ID': caso.id,
          'Nombre': caso.titulo,
          'Descripción': caso.descripcion,
          'Categoría': getCategoryLabel(caso.tipo),
          'Estado': caso.estado,
          'Latitud': caso.ubicacion.latitud,
          'Longitud': caso.ubicacion.longitud,
          'Dirección': caso.ubicacion.direccion,
          'Presupuesto': caso.presupuesto,
          'Progreso': `${caso.progreso}%`,
          'Responsable': caso.responsable
        }))
      ];

      const csvContent = [
        Object.keys(datosExportar[0]).join(','),
        ...datosExportar.map(row => Object.values(row).map(value => `"${value}"`).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `datos_veeduria_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert('Datos exportados exitosamente');
    } catch (error) {
      console.error('Error al exportar:', error);
      alert('Error al exportar los datos');
    }
  };

  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #f3e8ff 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid #3b82f6',
            borderTop: '4px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
            Cargando Dashboard Geoespacial
          </h2>
          <p style={{ color: '#6b7280' }}>Procesando datos geoespaciales...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #f3e8ff 100%)' }}>
      {/* Header de página */}
      <div style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)',
        color: 'white',
        padding: '24px 0'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              border: '2px solid rgba(255,255,255,0.2)'
            }}>
              <span style={{ fontSize: '40px' }}>🗺️</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>
              Mapa Interactivo CSDT
            </h1>
            <p style={{ fontSize: '20px', color: '#bfdbfe', maxWidth: '768px', margin: '0 auto', lineHeight: '1.6' }}>
              Visualización geoespacial de puntos de veeduría y casos del Consejo Social de Veeduría y Desarrollo Territorial
            </p>
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <span style={{ color: '#bfdbfe', fontSize: '14px', fontWeight: '500' }}>
                  🗺️ Mapa Interactivo
                </span>
              </div>
              <div style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '50px',
                padding: '8px 16px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <span style={{ color: '#bfdbfe', fontSize: '14px', fontWeight: '500' }}>
                  📍 Puntos de Veeduría
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Barra de controles */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
            {/* Búsqueda */}
            <div style={{ flex: 1, width: '100%' }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Buscar puntos de veeduría, casos, categorías..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'border-color 0.3s'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af'
                }}>🔍</span>
              </div>
            </div>

            {/* Filtro por categoría */}
            <div style={{ width: '100%' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none'
                }}
              >
                <option value="">Todas las categorías</option>
                {Array.from(new Set([...puntosVeeduria.map(p => p.categoria), ...casos.map(c => c.tipo)])).map(category => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </div>

            {/* Botones de acción */}
            <div style={{ display: 'flex', gap: '10px', width: '100%', justifyContent: 'center' }}>
            <button
              onClick={() => setShowStats(!showStats)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '8px 16px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              <span style={{ marginRight: '8px' }}>{showStats ? '👁️‍🗨️' : '👁️'}</span>
              {showStats ? 'Ocultar' : 'Mostrar'} Stats
            </button>
              
              <button
                onClick={exportarDatos}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                <span style={{ marginRight: '8px' }}>📊</span>
                Exportar Datos
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        {showStats && stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginBottom: '24px'
          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af', marginBottom: '4px' }}>
                {stats.total_puntos}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Puntos de Veeduría</div>
            </div>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669', marginBottom: '4px' }}>
                {stats.total_casos}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Casos de Veeduría</div>
            </div>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '4px' }}>
                {stats.casos_en_progreso}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Casos en Progreso</div>
            </div>
            <div style={{
              backgroundColor: 'white',
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', marginBottom: '4px' }}>
                {stats.casos_completados}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Casos Completados</div>
            </div>
          </div>
        )}

        {/* Mapa principal */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px'
        }}>
          <div style={{
            height: '400px',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#6b7280'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>
              Mapa Interactivo CSDT
            </h3>
            <p style={{ fontSize: '16px', textAlign: 'center' }}>
              Visualización geoespacial de puntos de veeduría y casos<br />
              {puntosVeeduria.length} puntos de veeduría y {casos.length} casos disponibles
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e40af' }}>
                  {puntosVeeduria.length}
                </div>
                <div style={{ fontSize: '12px' }}>Puntos de Veeduría</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#059669' }}>
                  {casos.length}
                </div>
                <div style={{ fontSize: '12px' }}>Casos de Veeduría</div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel de información del punto seleccionado */}
        {selectedPoint && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '8px' }}>📍</span>
              Información del Punto de Veeduría
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  {selectedPoint.nombre}
                </h4>
                {selectedPoint.descripcion && (
                  <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                    {selectedPoint.descripcion}
                  </p>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Categoría:</span>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: getCategoryColor(selectedPoint.categoria) + '20',
                      color: getCategoryColor(selectedPoint.categoria),
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {getCategoryLabel(selectedPoint.categoria)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Estado:</span>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: getEstadoColor(selectedPoint.estado) + '20',
                      color: getEstadoColor(selectedPoint.estado),
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {selectedPoint.estado}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Responsable:</span>
                    <span style={{ color: '#6b7280' }}>{selectedPoint.responsable}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Teléfono:</span>
                    <span style={{ color: '#6b7280' }}>{selectedPoint.telefono}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Email:</span>
                    <span style={{ color: '#6b7280' }}>{selectedPoint.email}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Horario:</span>
                    <span style={{ color: '#6b7280' }}>{selectedPoint.horario}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Latitud:</span>
                    <span style={{ color: '#6b7280' }}>{selectedPoint.latitud.toFixed(6)}</span>
                  </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Longitud:</span>
                    <span style={{ color: '#6b7280' }}>{selectedPoint.longitud.toFixed(6)}</span>
                    </div>
                </div>
              </div>

              <div>
                {selectedPoint.servicios && (
                  <div>
                    <h5 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                      Servicios Ofrecidos
                    </h5>
                    <div style={{
                      backgroundColor: '#f9fafb',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}>
                      {selectedPoint.servicios.map((servicio, index) => (
                        <div key={index} style={{ 
                          padding: '4px 8px', 
                          margin: '2px 0',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '4px',
                          color: '#374151'
                        }}>
                          • {servicio}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Lista de puntos y casos filtrados */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '24px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{ marginRight: '8px' }}>📊</span>
            Puntos de Veeduría y Casos ({filteredPoints.length + filteredCasos.length})
          </h3>

          {(filteredPoints.length === 0 && filteredCasos.length === 0) ? (
            <div style={{ textAlign: 'center', padding: '32px' }}>
              <span style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px', display: 'block' }}>🗺️</span>
              <p style={{ color: '#6b7280' }}>No se encontraron puntos de veeduría o casos</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {/* Puntos de Veeduría */}
              {filteredPoints.map(punto => (
                <div
                  key={`punto-${punto.id}`}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s'
                  }}
                  onClick={() => setSelectedPoint(punto)}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>📍</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                        {getCategoryLabel(punto.categoria)}
                      </span>
                    </div>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: getEstadoColor(punto.estado) + '20',
                      color: getEstadoColor(punto.estado),
                      borderRadius: '4px',
                      fontSize: '10px'
                    }}>
                      {punto.estado}
                    </span>
                  </div>

                  <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                    {punto.nombre}
                  </h4>

                  {punto.descripcion && (
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.4' }}>
                      {punto.descripcion}
                    </p>
                  )}

                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    <div>Responsable: {punto.responsable}</div>
                    <div>Tel: {punto.telefono}</div>
                    <div>Lat: {punto.latitud.toFixed(4)} | Lng: {punto.longitud.toFixed(4)}</div>
                  </div>
                </div>
              ))}

              {/* Casos de Veeduría */}
              {filteredCasos.map(caso => (
                <div
                  key={`caso-${caso.id}`}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s'
                  }}
                  onClick={() => setSelectedCaso(caso)}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '20px', marginRight: '8px' }}>📋</span>
                      <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                        {getCategoryLabel(caso.tipo)}
                      </span>
                    </div>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: getEstadoColor(caso.estado) + '20',
                      color: getEstadoColor(caso.estado),
                      borderRadius: '4px',
                      fontSize: '10px'
                    }}>
                      {caso.estado}
                    </span>
                  </div>

                  <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                    {caso.titulo}
                  </h4>

                  {caso.descripcion && (
                    <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.4' }}>
                      {caso.descripcion}
                    </p>
                  )}

                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    <div>Responsable: {caso.responsable}</div>
                    <div>Progreso: {caso.progreso}%</div>
                    <div>Presupuesto: ${caso.presupuesto.toLocaleString()}</div>
                    <div>Lat: {caso.ubicacion.latitud.toFixed(4)} | Lng: {caso.ubicacion.longitud.toFixed(4)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel de información del caso seleccionado */}
        {selectedCaso && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '8px' }}>📋</span>
              Información del Caso de Veeduría
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  {selectedCaso.titulo}
                </h4>
                {selectedCaso.descripcion && (
                  <p style={{ color: '#6b7280', marginBottom: '16px' }}>
                    {selectedCaso.descripcion}
                  </p>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Tipo:</span>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: getCategoryColor(selectedCaso.tipo) + '20',
                      color: getCategoryColor(selectedCaso.tipo),
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {getCategoryLabel(selectedCaso.tipo)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Estado:</span>
                    <span style={{
                      padding: '2px 8px',
                      backgroundColor: getEstadoColor(selectedCaso.estado) + '20',
                      color: getEstadoColor(selectedCaso.estado),
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {selectedCaso.estado}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Progreso:</span>
                    <span style={{ color: '#6b7280' }}>{selectedCaso.progreso}%</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Responsable:</span>
                    <span style={{ color: '#6b7280' }}>{selectedCaso.responsable}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Presupuesto:</span>
                    <span style={{ color: '#6b7280' }}>${selectedCaso.presupuesto.toLocaleString()}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Ubicación:</span>
                    <span style={{ color: '#6b7280' }}>{selectedCaso.ubicacion.direccion}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Latitud:</span>
                    <span style={{ color: '#6b7280' }}>{selectedCaso.ubicacion.latitud.toFixed(6)}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: '500', color: '#374151', width: '100px' }}>Longitud:</span>
                    <span style={{ color: '#6b7280' }}>{selectedCaso.ubicacion.longitud.toFixed(6)}</span>
                  </div>
                </div>
              </div>

              <div>
                {selectedCaso.observaciones && (
                  <div>
                    <h5 style={{ fontWeight: '500', color: '#1f2937', marginBottom: '8px' }}>
                      Observaciones
                    </h5>
                    <div style={{
                      backgroundColor: '#f9fafb',
                      padding: '12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#374151'
                    }}>
                      {selectedCaso.observaciones}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Navegación */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              margin: '0 10px'
            }}
          >
            ← Volver al Inicio
          </Link>
          <Link 
            to="/consejo-veeduria-territorial" 
            style={{
              display: 'inline-block',
              background: '#059669',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              margin: '0 10px'
            }}
          >
            Consejo de Veeduría →
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GeoDashboard;