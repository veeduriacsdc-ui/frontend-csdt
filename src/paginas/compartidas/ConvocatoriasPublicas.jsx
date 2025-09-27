import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const ConvocatoriasPublicas = () => {
  const { user } = useAuth();
  const [convocatorias, setConvocatorias] = useState([]);
  const [filtroTip, setFiltroTip] = useState('todos');
  const [filtroPri, setFiltroPri] = useState('todos');
  const [convocatoriaSeleccionada, setConvocatoriaSeleccionada] = useState(null);
  const [mostrarFormularioPostulacion, setMostrarFormularioPostulacion] = useState(false);
  const [postulacion, setPostulacion] = useState({
    nom: '',
    cor: '',
    tel: '',
    exp: '',
    mot: '',
    disp: '',
    arc: []
  });

  // Cargar convocatorias desde localStorage
  useEffect(() => {
    const convocatoriasGuardadas = JSON.parse(localStorage.getItem('convocatoriasTareas') || '[]');
    // Solo mostrar convocatorias publicadas
    const convocatoriasPublicas = convocatoriasGuardadas.filter(c => c.est === 'publicada');
    setConvocatorias(convocatoriasPublicas);
  }, []);

  const handlePostularse = (convocatoria) => {
    setConvocatoriaSeleccionada(convocatoria);
    setPostulacion({
      nom: user?.nom || '',
      cor: '',
      tel: '',
      exp: '',
      mot: '',
      disp: '',
      arc: []
    });
    setMostrarFormularioPostulacion(true);
  };

  const handleEnviarPostulacion = (e) => {
    e.preventDefault();
    
    const nuevaPostulacion = {
      id: Date.now(),
      ...postulacion,
      convocatoriaId: convocatoriaSeleccionada.id,
      fechaPostulacion: new Date().toISOString(),
      estado: 'pendiente',
      tipoUsuario: 'operador', // Por defecto operador, se puede cambiar según el usuario logueado
      pri: convocatoriaSeleccionada.pri_ope ? 'alta' : 'normal'
    };

    // Actualizar la convocatoria con la nueva postulación
    const convocatoriasGuardadas = JSON.parse(localStorage.getItem('convocatoriasTareas') || '[]');
    const convocatoriasActualizadas = convocatoriasGuardadas.map(conv => 
      conv.id === convocatoriaSeleccionada.id 
        ? { ...conv, post: [...(conv.post || []), nuevaPostulacion] }
        : conv
    );
    localStorage.setItem('convocatoriasTareas', JSON.stringify(convocatoriasActualizadas));

    // Actualizar el estado local
    setConvocatorias(convocatorias.map(conv => 
      conv.id === convocatoriaSeleccionada.id 
        ? { ...conv, post: [...(conv.post || []), nuevaPostulacion] }
        : conv
    ));

    alert('¡Postulación enviada exitosamente!');
    setMostrarFormularioPostulacion(false);
    setConvocatoriaSeleccionada(null);
  };

  const convocatoriasFiltradas = convocatorias.filter(convocatoria => {
    const cumpleTipo = filtroTip === 'todos' || convocatoria.tip === filtroTip;
    const cumplePrioridad = filtroPri === 'todos' || convocatoria.pri === filtroPri;
    return cumpleTipo && cumplePrioridad;
  });

  const yaSePostulo = (convocatoria) => {
    if (!user) return false;
    return convocatoria.post?.some(p => p.nom === user.nom);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: '#2d3748',
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            📢 Convocatorias de Tareas - CSDT
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Participa en tareas de veeduría ciudadana y contribuye al desarrollo territorial
          </p>
        </div>

        {/* Filtros */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '20px', 
          marginBottom: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>🔍 Filtros</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#4a5568', marginBottom: '5px' }}>
                Tipo:
              </label>
              <select 
                value={filtroTipo} 
                onChange={(e) => setFiltroTipo(e.target.value)} 
                style={{ padding: '8px', border: '2px solid #e2e8f0', borderRadius: '6px' }}
              >
                <option value="todos">Todos</option>
                <option value="juridica">Jurídica</option>
                <option value="investigacion">Investigación</option>
                <option value="administrativa">Administrativa</option>
                <option value="documentacion">Documentación</option>
                <option value="comunicacion">Comunicación</option>
                <option value="audiencia">Audiencia</option>
                <option value="seguimiento">Seguimiento</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', color: '#4a5568', marginBottom: '5px' }}>
                Prioridad:
              </label>
              <select 
                value={filtroPrioridad} 
                onChange={(e) => setFiltroPrioridad(e.target.value)} 
                style={{ padding: '8px', border: '2px solid #e2e8f0', borderRadius: '6px' }}
              >
                <option value="todos">Todos</option>
                <option value="baja">Baja</option>
                <option value="media">Media</option>
                <option value="alta">Alta</option>
                <option value="critica">Crítica</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lista de Convocatorias */}
        <div style={{ 
          background: 'white', 
          borderRadius: '15px', 
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '1.8rem', 
            fontWeight: 'bold', 
            color: '#2d3748',
            marginBottom: '20px'
          }}>
            📢 Convocatorias Disponibles ({convocatoriasFiltradas.length})
          </h2>
          
          {convocatoriasFiltradas.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay convocatorias disponibles con los filtros actuales.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {convocatoriasFiltradas.map(convocatoria => (
                <div key={convocatoria.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {convocatoria.cod} - {convocatoria.tit}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Tipo:</strong> {convocatoria.tip} | 
                        <strong> Prioridad:</strong> {convocatoria.pri} | 
                        <strong> Presupuesto:</strong> ${convocatoria.pre.toLocaleString()}
                      </p>
                      {convocatoria.pri_ope && (
                        <p style={{ color: '#3182ce', marginBottom: '10px', fontWeight: 'bold' }}>
                          ⭐ Prioridad para Operadores
                        </p>
                      )}
                      <p style={{ color: '#4a5568' }}>{convocatoria.des}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        background: convocatoria.pri === 'critica' ? '#e53e3e' : 
                                   convocatoria.pri === 'alta' ? '#d69e2e' : 
                                   convocatoria.pri === 'media' ? '#3182ce' : '#38a169',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        {convocatoria.pri}
                      </span>
                      <span style={{ 
                        background: '#805ad5',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        ${convocatoria.pre.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Requisitos */}
                  {convocatoria.req.length > 0 && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        📋 Requisitos:
                      </h4>
                      <ul style={{ marginLeft: '20px' }}>
                        {convocatoria.req.map((requisito, index) => (
                          <li key={index} style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '5px' }}>
                            {requisito}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Beneficios */}
                  {convocatoria.ben.length > 0 && (
                    <div style={{ 
                      borderTop: '2px solid #e2e8f0', 
                      paddingTop: '15px',
                      marginTop: '15px'
                    }}>
                      <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                        🎁 Beneficios:
                      </h4>
                      <ul style={{ marginLeft: '20px' }}>
                        {convocatoria.ben.map((beneficio, index) => (
                          <li key={index} style={{ color: '#4a5568', fontSize: '0.9rem', marginBottom: '5px' }}>
                            {beneficio}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Fechas */}
                  <div style={{ 
                    borderTop: '2px solid #e2e8f0', 
                    paddingTop: '15px',
                    marginTop: '15px'
                  }}>
                    <h4 style={{ color: '#2d3748', marginBottom: '10px', fontSize: '1rem' }}>
                      📅 Fechas:
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Publicación:</strong> {convocatoria.fec_pub}
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>
                        <strong>Cierre:</strong> {convocatoria.fec_cierre}
                      </div>
                    </div>
                  </div>

                  {/* Botón de Postulación */}
                  <div style={{ 
                    borderTop: '2px solid #e2e8f0', 
                    paddingTop: '15px',
                    marginTop: '15px',
                    textAlign: 'center'
                  }}>
                    {yaSePostulo(convocatoria) ? (
                      <span style={{ 
                        background: '#38a169',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        fontWeight: 'bold'
                      }}>
                        ✅ Ya te has postulado
                      </span>
                    ) : (
                      <button
                        onClick={() => handlePostularse(convocatoria)}
                        style={{
                          padding: '12px 24px',
                          backgroundColor: '#3182ce',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          boxShadow: '0 4px 15px rgba(49, 130, 206, 0.3)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        📝 Postularme
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulario de Postulación */}
        {mostrarFormularioPostulacion && convocatoriaSeleccionada && (
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
              background: 'white', 
              borderRadius: '15px', 
              padding: '30px', 
              maxWidth: '600px',
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#2d3748',
                marginBottom: '20px'
              }}>
                📝 Postulación: {convocatoriaSeleccionada.titulo}
              </h2>
              
              <form onSubmit={handleEnviarPostulacion}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      value={postulacion.nombre}
                      onChange={(e) => setPostulacion({...postulacion, nombre: e.target.value})}
                      required
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      value={postulacion.email}
                      onChange={(e) => setPostulacion({...postulacion, email: e.target.value})}
                      required
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={postulacion.telefono}
                      onChange={(e) => setPostulacion({...postulacion, telefono: e.target.value})}
                      required
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                      Disponibilidad *
                    </label>
                    <input
                      type="text"
                      value={postulacion.disponibilidad}
                      onChange={(e) => setPostulacion({...postulacion, disponibilidad: e.target.value})}
                      required
                      placeholder="Ej: Lunes a Viernes, 8:00 AM - 5:00 PM"
                      style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Experiencia Relevante *
                  </label>
                  <textarea
                    value={postulacion.experiencia}
                    onChange={(e) => setPostulacion({...postulacion, experiencia: e.target.value})}
                    required
                    rows="4"
                    placeholder="Describe tu experiencia relacionada con esta tarea..."
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Motivación *
                  </label>
                  <textarea
                    value={postulacion.motivacion}
                    onChange={(e) => setPostulacion({...postulacion, motivacion: e.target.value})}
                    required
                    rows="4"
                    placeholder="¿Por qué quieres participar en esta tarea de veeduría?"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarFormularioPostulacion(false);
                      setConvocatoriaSeleccionada(null);
                    }}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#718096',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#3182ce',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Enviar Postulación
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConvocatoriasPublicas;
