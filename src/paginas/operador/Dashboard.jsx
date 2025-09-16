import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DashboardOperador = () => {
  const { user } = useAuth();
  const [estadisticas] = useState({
    tareasPendientes: 12,
    proyectosActivos: 8,
    eficiencia: 95,
    reportesGenerados: 3
  });

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
          Panel de Operador
          </h1>
          <p style={{
            fontSize: '18px',
            margin: 0,
            opacity: 0.9
          }}>
          Bienvenido, {user?.nombre || 'Operador'} - Gestiona tareas, proyectos y análisis del sistema
        </p>
          </div>
          
      {/* Estadísticas Principales */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
          marginBottom: '40px'
        }}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📋</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.tareasPendientes}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Tareas Pendientes
            </p>
            </div>
          </div>

        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🏗️</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.proyectosActivos}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Proyectos Activos
            </p>
            </div>
          </div>

        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📊</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.eficiencia}%
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Eficiencia
            </p>
            </div>
          </div>

        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📈</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.reportesGenerados}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Reportes Generados
            </p>
            </div>
          </div>
        </div>

      {/* Acceso Rápido */}
      <div style={cardStyle}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Acceso Rápido
          </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <Link to="/operador/tareas-asignadas" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Mis Tareas Asignadas</div>
            </div>
          </Link>
          
          <Link to="/operador/proyectos" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🏗️</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Proyectos</div>
            </div>
          </Link>
          
          <Link to="/operador/analisis" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
                  borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📊</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Análisis</div>
                  </div>
          </Link>
          
          <Link to="/operador/clientes" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>👥</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Clientes</div>
                </div>
          </Link>

          <Link to="/operador/centro-gestion-legal" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚖️</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Centro Gestión Legal</div>
                </div>
          </Link>

          <Link to="/operador/panel-tareas" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Panel de Tareas</div>
                </div>
          </Link>
          </div>
        </div>

      {/* Actividades Recientes */}
      <div style={cardStyle}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
          marginBottom: '30px'
          }}>
          Actividades Recientes
          </h2>

        <div style={{ display: 'grid', gap: '15px' }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <div style={{
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              ✅ Auditoría completada - Proyecto Vial Caucasia-Necoclí
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Hace 2 horas
            </div>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f8fafc',
              borderRadius: '10px',
            borderLeft: '4px solid #10b981'
          }}>
            <div style={{
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              📊 Reporte de análisis generado
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Hace 4 horas
            </div>
          </div>

          <div style={{
            padding: '15px',
            backgroundColor: '#f8fafc',
              borderRadius: '10px',
            borderLeft: '4px solid #f59e0b'
          }}>
            <div style={{
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '5px'
            }}>
              👥 Nuevo cliente registrado
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Hace 6 horas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOperador;
