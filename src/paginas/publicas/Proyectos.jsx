import React from 'react';
import { Link } from 'react-router-dom';

const Proyectos = () => {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div className="section" style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="section-container">
          <h1 className="title-large" style={{
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            marginBottom: 'clamp(15px, 2vw, 20px)'
          }}>
            Proyectos CSDT
          </h1>
          <p className="text-medium" style={{
            opacity: 0.9
          }}>
            Conoce nuestros proyectos de veeduría y desarrollo territorial
          </p>
        </div>
      </div>

      <div className="section-container" style={{ padding: 'clamp(30px, 4vw, 40px) 0' }}>
        {/* Proyectos destacados */}
        <div className="grid-2" style={{
          marginBottom: 'clamp(30px, 4vw, 40px)'
        }}>
          <div className="card-large">
            <div style={{ fontSize: 'clamp(30px, 4vw, 40px)', marginBottom: 'clamp(15px, 2vw, 20px)' }}>🔍</div>
            <h3 className="title-small" style={{
              color: '#1f2937'
            }}>
              Análisis Forense Territorial
            </h3>
            <p className="text-small" style={{
              color: '#6b7280',
              marginBottom: 'clamp(15px, 2vw, 20px)'
            }}>
              Proyecto pionero en Colombia para detectar irregularidades catastrales mediante análisis forense digital.
            </p>
            <div style={{
              background: '#f0f9ff',
              padding: 'clamp(12px, 2vw, 15px)',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <p className="text-small" style={{ color: '#0c4a6e', margin: 0 }}>
                <strong>Estado:</strong> En desarrollo<br />
                <strong>Inicio:</strong> Enero 2024<br />
                <strong>Duración:</strong> 24 meses
              </p>
            </div>
          </div>

          <div style={{
            background: 'white',
            padding: '30px',
                borderRadius: '15px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb'
              }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🤖</div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#1f2937',
              marginBottom: '15px'
                  }}>
              Inteligencia Artificial para Justicia
                  </h3>
                  <p style={{
              fontSize: '14px',
                    color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '20px'
                  }}>
              Desarrollo de algoritmos de IA para detectar patrones de corrupción y blanqueamiento catastral.
                  </p>
                  <div style={{
              background: '#f0fdf4',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              <p style={{ fontSize: '12px', color: '#14532d', margin: 0 }}>
                <strong>Estado:</strong> Activo<br />
                <strong>Inicio:</strong> Marzo 2024<br />
                <strong>Duración:</strong> 18 meses
              </p>
                  </div>
                </div>
                
                <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '20px' }}>🗺️</div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1f2937',
              marginBottom: '15px'
              }}>
              Geoanálisis Avanzado
              </h3>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              lineHeight: '1.6',
              marginBottom: '20px'
            }}>
              Plataforma de mapas interactivos para análisis espacial y detección de superposiciones territoriales.
            </p>
            <div style={{
              background: '#fef3c7',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #fcd34d'
            }}>
              <p style={{ fontSize: '12px', color: '#92400e', margin: 0 }}>
                <strong>Estado:</strong> Planificación<br />
                <strong>Inicio:</strong> Junio 2024<br />
                <strong>Duración:</strong> 12 meses
              </p>
            </div>
          </div>
        </div>

        {/* Estadísticas de proyectos */}
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
            Estadísticas de Proyectos
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '30px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', color: '#3b82f6', marginBottom: '10px' }}>📊</div>
              <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>15</h3>
              <p style={{ color: '#6b7280', margin: 0 }}>Proyectos Activos</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', color: '#22c55e', marginBottom: '10px' }}>✅</div>
              <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>8</h3>
              <p style={{ color: '#6b7280', margin: 0 }}>Completados</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', color: '#f59e0b', marginBottom: '10px' }}>⏳</div>
              <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>5</h3>
              <p style={{ color: '#6b7280', margin: 0 }}>En Desarrollo</p>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '48px', color: '#8b5cf6', marginBottom: '10px' }}>🎯</div>
              <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '5px' }}>2</h3>
              <p style={{ color: '#6b7280', margin: 0 }}>En Planificación</p>
            </div>
          </div>
        </div>

        {/* CTA */}
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
            marginBottom: '15px'
          }}>
            ¿Quieres participar en nuestros proyectos?
          </h3>
          <p style={{
            fontSize: '16px',
            opacity: 0.9,
            marginBottom: '25px'
          }}>
            Únete como veedor ciudadano y contribuye al desarrollo territorial de Colombia
          </p>
          <button style={{
            background: 'white',
            color: '#1e40af',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            Participar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Proyectos;
