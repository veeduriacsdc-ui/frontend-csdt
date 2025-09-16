import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DashboardAdmin = () => {
  const { user } = useAuth();
  const [estadisticas] = useState({
    usuariosActivos: 156,
    proyectosActivos: 23,
    donacionesMes: 45,
    eficienciaSistema: 98
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
          Panel de Administración
        </h1>
        <p style={{
          fontSize: '18px',
          margin: 0,
          opacity: 0.9
        }}>
          Administrador: {user?.nombre || 'Usuario'} - Gestión completa del sistema CSDT
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
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>👥</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.usuariosActivos}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Usuarios Activos
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
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>💰</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.donacionesMes}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Donaciones este Mes
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
              {estadisticas.eficienciaSistema}%
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Eficiencia del Sistema
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
          Gestión Administrativa
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          
          <Link to="/admin/donaciones" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>💰</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Gestión de Donaciones</div>
            </div>
          </Link>
          
          <Link to="/admin/registros" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📝</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Gestión de Registros</div>
            </div>
          </Link>
          
          <Link to="/admin/panel-actividades" style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Panel de Actividades</div>
            </div>
          </Link>
          
          <Link to="/admin/gestion-actividades" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>⚡</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Gestión de Actividades</div>
            </div>
          </Link>
          
          <Link to="/admin/hoja-recursos" style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Hoja de Recursos</div>
            </div>
          </Link>
          
          <Link to="/admin/analisis-precios" style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Análisis de Precios</div>
            </div>
          </Link>
          
          <Link to="/admin/presupuesto-actividad" style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Presupuesto de Actividades</div>
            </div>
          </Link>
          
          <Link to="/admin/convocatorias-tareas" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{
              padding: '20px',
              backgroundColor: '#f8fafc',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s',
              border: '2px solid transparent'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📢</div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Convocatorias de Tareas</div>
            </div>
          </Link>
          
          <Link to="/admin/gestion-recursos-humanos" style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Gestión Recursos Humanos</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Información del Sistema */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '20px'
        }}>
          Estado del Sistema
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f0fdf4',
            borderRadius: '10px',
            border: '1px solid #bbf7d0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
            <strong style={{ color: '#166534' }}>Sistema Operativo</strong>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '14px' }}>
              Todos los servicios funcionando correctamente
            </p>
          </div>
          
          <div style={{
            padding: '15px',
            backgroundColor: '#f0f9ff',
            borderRadius: '10px',
            border: '1px solid #bfdbfe',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔒</div>
            <strong style={{ color: '#1e40af' }}>Seguridad Activa</strong>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '14px' }}>
              Sistema de permisos funcionando
            </p>
          </div>
          
          <div style={{
            padding: '15px',
            backgroundColor: '#fef3c7',
            borderRadius: '10px',
            border: '1px solid #fde68a',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
            <strong style={{ color: '#92400e' }}>Base de Datos</strong>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0', fontSize: '14px' }}>
              Conexión estable y sincronizada
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
