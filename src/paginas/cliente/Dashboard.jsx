import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const DashboardCliente = () => {
  const { user } = useAuth();
  const [estadisticas] = useState({
    pqrsfdPendientes: 3,
    donacionesRealizadas: 2,
    proyectosSeguimiento: 1,
    ultimaActividad: 'Hace 2 días'
  });

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    padding: '20px'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%)',
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
          Panel de Cliente
        </h1>
        <p style={{
          fontSize: '18px',
          margin: 0,
          opacity: 0.9
        }}>
          Bienvenido, {user?.nombre || 'Cliente'} - Gestiona tus actividades y seguimiento
        </p>
      </div>

      {/* Estadísticas */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>📝</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.pqrsfdPendientes}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              PQRSFD Pendientes
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>💰</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.donacionesRealizadas}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Donaciones Realizadas
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏗️</div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.proyectosSeguimiento}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Proyectos en Seguimiento
            </p>
          </div>
        </div>

        <div style={cardStyle}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>⏰</div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '10px'
            }}>
              {estadisticas.ultimaActividad}
            </h3>
            <p style={{
              color: '#6b7280',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Última Actividad
            </p>
          </div>
        </div>
      </div>

      {/* Información del Usuario */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Información de Tu Cuenta
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          <div style={{
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e5e7eb'
          }}>
            <strong style={{ color: '#1f2937' }}>Nombre:</strong>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
              {user?.nombre || 'No especificado'}
            </p>
          </div>
          
          <div style={{
            padding: '15px',
            backgroundColor: '#f8fafc',
            borderRadius: '10px',
            border: '1px solid #e5e7eb'
          }}>
            <strong style={{ color: '#1f2937' }}>Rol:</strong>
            <p style={{ color: '#6b7280', margin: '5px 0 0 0' }}>
              {user?.rol || 'Cliente'}
            </p>
          </div>
        </div>
      </div>

      {/* Actividades Recientes */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '20px'
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
              ✅ PQRSFD enviada - Solicitud de información
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Hace 2 días
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
              💰 Donación realizada - Proyecto transparencia
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Hace 5 días
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
              📊 Proyecto en seguimiento - Vía Caucasia-Necoclí
            </div>
            <div style={{
              color: '#6b7280',
              fontSize: '14px'
            }}>
              Hace 1 semana
            </div>
          </div>
        </div>
      </div>

      {/* Enlaces Rápidos */}
      <div style={cardStyle}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#059669',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          Enlaces Rápidos
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          <Link 
            to="/cliente/seguimiento-casos" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Seguimiento de Casos</div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '5px' }}>
                Ver el estado de tus casos legales
              </div>
            </div>
          </Link>

          <Link 
            to="/pqrsfd" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📝</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>PQRSFD</div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '5px' }}>
                Crear peticiones, quejas y reclamos
              </div>
            </div>
          </Link>

          <Link 
            to="/cliente/tareas-a-realizar" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📋</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Tareas a Realizar</div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '5px' }}>
                Gestionar tus solicitudes y tareas
              </div>
            </div>
          </Link>

          <Link 
            to="/donaciones" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>💰</div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Donaciones</div>
              <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '5px' }}>
                Realizar donaciones al proyecto
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardCliente;
