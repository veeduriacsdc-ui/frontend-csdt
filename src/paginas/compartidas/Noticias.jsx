import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Noticias = () => {
  const [noticias] = useState([
    {
      id: 1,
      titulo: 'CSDT Lanza Nueva Plataforma de Análisis Forense Digital',
      resumen: 'El Consejo Social de Veeduría y Desarrollo Territorial presenta su nueva plataforma tecnológica para el análisis forense digital de documentos y casos de corrupción.',
      fecha: '2024-01-15',
      categoria: 'Tecnología',
      imagen: '🔬',
      destacada: true,
      contenido: `
        El Consejo Social de Veeduría y Desarrollo Territorial (CSDT) ha lanzado oficialmente 
        su nueva plataforma de análisis forense digital, una herramienta revolucionaria que 
        combina inteligencia artificial con técnicas forenses avanzadas para detectar 
        irregularidades en documentos oficiales, registros catastrales y procesos administrativos.

        Esta plataforma representa un avance significativo en la lucha contra la corrupción 
        en Colombia, proporcionando a ciudadanos, organizaciones y entidades públicas 
        herramientas tecnológicas de vanguardia para ejercer control social efectivo.

        Características principales:
        • Análisis forense digital automatizado
        • Detección de irregularidades mediante IA
        • Generación de evidencia certificada
        • Integración con sistemas gubernamentales
        • Interfaz intuitiva para usuarios no técnicos
      `
    },
    {
      id: 2,
      titulo: 'Primer Caso Exitoso: Detección de Irregularidades Catastrales',
      resumen: 'La plataforma CSDT detectó exitosamente irregularidades en registros catastrales de un municipio del Valle del Cauca, generando evidencia para proceso judicial.',
      fecha: '2024-01-10',
      categoria: 'Casos',
      imagen: '🏛️',
      destacada: true,
      contenido: `
        En un hito histórico para el control social en Colombia, la plataforma CSDT 
        detectó exitosamente irregularidades en registros catastrales del municipio 
        de Palmira, Valle del Cauca. El análisis forense digital reveló inconsistencias 
        en 15 predios que fueron reportados al sistema judicial.

        El caso comenzó cuando un ciudadano reportó sospechas sobre la legalidad de 
        varios títulos de propiedad en su barrio. Utilizando las herramientas de 
        análisis forense digital de CSDT, se pudo identificar:

        • Duplicación de matrículas catastrales
        • Inconsistencias en coordenadas geográficas
        • Discrepancias en áreas reportadas
        • Alteraciones en documentos oficiales

        La evidencia generada por la plataforma fue aceptada por el juez competente 
        y actualmente se encuentra en proceso judicial. Este caso demuestra la 
        efectividad de las herramientas tecnológicas para el control social.
      `
    },
    {
      id: 3,
      titulo: 'Alianza Estratégica con Universidades Nacionales',
      resumen: 'CSDT firma convenios con las principales universidades del país para promover investigación en transparencia y control social.',
      fecha: '2024-01-05',
      categoria: 'Alianzas',
      imagen: '🎓',
      destacada: false,
      contenido: `
        El Consejo Social de Veeduría y Desarrollo Territorial ha establecido 
        alianzas estratégicas con las principales universidades del país para 
        promover la investigación y desarrollo en temas de transparencia, 
        control social y tecnología aplicada a la justicia.

        Las universidades participantes incluyen:
        • Universidad Nacional de Colombia
        • Universidad de los Andes
        • Universidad del Valle
        • Universidad de Antioquia
        • Universidad Industrial de Santander

        Estas alianzas permitirán:
        • Desarrollo de nuevos algoritmos de análisis forense
        • Formación de profesionales especializados
        • Investigación aplicada en casos reales
        • Transferencia de conocimiento tecnológico
        • Creación de programas académicos especializados
      `
    },
    {
      id: 4,
      titulo: 'Reconocimiento Internacional por Innovación Social',
      resumen: 'CSDT recibe el premio "Innovación Social 2024" de la Organización de Estados Americanos por su contribución a la transparencia.',
      fecha: '2024-01-01',
      categoria: 'Reconocimientos',
      imagen: '🏆',
      destacada: false,
      contenido: `
        El Consejo Social de Veeduría y Desarrollo Territorial fue galardonado 
        con el premio "Innovación Social 2024" de la Organización de Estados 
        Americanos (OEA) por su contribución excepcional a la transparencia 
        y el control social mediante el uso de tecnología.

        El reconocimiento destaca:
        • Innovación en el uso de IA para control social
        • Impacto positivo en la lucha contra la corrupción
        • Modelo replicable para otros países
        • Participación ciudadana efectiva
        • Transparencia en procesos y resultados

        Este premio posiciona a Colombia como líder regional en el uso de 
        tecnología para la transparencia y la justicia social, abriendo 
        oportunidades de cooperación internacional.
      `
    },
    {
      id: 5,
      titulo: 'Capacitación Masiva en Uso de Herramientas CSDT',
      resumen: 'Más de 1,000 ciudadanos se capacitaron en el uso de las herramientas de control social durante el primer trimestre de 2024.',
      fecha: '2023-12-20',
      categoria: 'Capacitación',
      imagen: '👥',
      destacada: false,
      contenido: `
        Durante el primer trimestre de 2024, CSDT llevó a cabo un programa 
        masivo de capacitación que benefició a más de 1,000 ciudadanos en 
        el uso de las herramientas de control social y análisis forense digital.

        El programa incluyó:
        • Talleres presenciales en 15 ciudades
        • Cursos virtuales especializados
        • Manuales de usuario detallados
        • Videos tutoriales interactivos
        • Soporte técnico permanente

        Los participantes aprendieron a:
        • Utilizar el sistema de denuncias
        • Interpretar análisis forenses
        • Generar reportes de veeduría
        • Acceder a bases de datos públicas
        • Presentar evidencia en procesos judiciales

        El programa continuará durante todo el año con el objetivo de 
        capacitar a 5,000 ciudadanos adicionales.
      `
    },
    {
      id: 6,
      titulo: 'Nueva Funcionalidad: Análisis de Redes de Corrupción',
      resumen: 'La plataforma CSDT incorpora nuevas capacidades de análisis de redes para detectar conexiones entre casos de corrupción.',
      fecha: '2023-12-15',
      categoria: 'Tecnología',
      imagen: '🕸️',
      destacada: false,
      contenido: `
        CSDT ha incorporado una nueva funcionalidad de análisis de redes 
        que permite detectar conexiones entre diferentes casos de corrupción 
        y visualizar las redes de actores involucrados.

        Esta nueva capacidad permite:
        • Mapear relaciones entre personas y entidades
        • Identificar patrones de comportamiento
        • Detectar redes de corrupción complejas
        • Visualizar flujos de dinero y recursos
        • Generar reportes de inteligencia

        La herramienta utiliza algoritmos de análisis de redes sociales 
        y machine learning para identificar conexiones que podrían pasar 
        desapercibidas en análisis individuales.

        Esta funcionalidad ya ha sido utilizada exitosamente en tres 
        casos de gran envergadura, contribuyendo a la desarticulación 
        de redes de corrupción en diferentes regiones del país.
      `
    }
  ]);

  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');

  const categorias = ['Todas', 'Tecnología', 'Casos', 'Alianzas', 'Reconocimientos', 'Capacitación'];

  const noticiasFiltradas = noticias.filter(noticia => {
    const cumpleCategoria = filtroCategoria === 'Todas' || noticia.categoria === filtroCategoria;
    const cumpleBusqueda = noticia.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          noticia.resumen.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  const noticiasDestacadas = noticiasFiltradas.filter(n => n.destacada);
  const noticiasRegulares = noticiasFiltradas.filter(n => !n.destacada);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #059669 100%)',
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
            Noticias CSDT
            </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9
          }}>
            Últimas noticias y actualizaciones del Consejo Social de Veeduría y Desarrollo Territorial
            </p>
          </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Filtros y Búsqueda */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            alignItems: 'end'
          }}>
            <div>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Buscar Noticias
              </label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar por título o contenido..."
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
                Categoría
              </label>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
              >
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
          </div>
          </div>

          {/* Noticias Destacadas */}
        {noticiasDestacadas.length > 0 && (
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '25px',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              ⭐ Noticias Destacadas
            </h2>
            
              <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '25px'
            }}>
              {noticiasDestacadas.map((noticia) => (
                <div
                  key={noticia.id}
                  style={{
                    background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                    padding: '25px',
                borderRadius: '15px',
                    border: '2px solid #f59e0b',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-5px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    marginBottom: '15px'
                  }}>
                    <div style={{ fontSize: '40px' }}>
                      {noticia.imagen}
                    </div>
                    <div>
                      <div style={{
                        background: '#f59e0b',
                    color: 'white', 
                    padding: '4px 8px', 
                        borderRadius: '12px',
                        fontSize: '10px',
                    fontWeight: 'bold',
                        display: 'inline-block',
                        marginBottom: '8px'
                  }}>
                        {noticia.categoria}
                </div>
                      <div style={{
                    fontSize: '12px', 
                        color: '#92400e',
                  fontWeight: 'bold'
                }}>
                        {new Date(noticia.fecha).toLocaleDateString('es-CO')}
                      </div>
                    </div>
              </div>

                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '10px',
                    lineHeight: '1.4'
                  }}>
                    {noticia.titulo}
                </h3>
                  
                  <p style={{
                    fontSize: '13px',
                    color: '#374151',
                    lineHeight: '1.5',
                    marginBottom: '15px'
                  }}>
                    {noticia.resumen}
                  </p>
                  
                <button style={{
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  color: 'white',
                    border: 'none',
                  padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  cursor: 'pointer',
                    width: '100%'
                }}>
                  Leer Más
                </button>
              </div>
              ))}
            </div>
          </div>
        )}

        {/* Noticias Regulares */}
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
            Todas las Noticias
          </h2>

              <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {noticiasRegulares.map((noticia) => (
              <div
                key={noticia.id}
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
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px'
                }}>
                  <div style={{ fontSize: '30px' }}>
                    {noticia.imagen}
              </div>
                  <div>
              <div style={{
                      background: '#e5e7eb',
                      color: '#374151',
                      padding: '3px 6px',
                      borderRadius: '8px',
                      fontSize: '10px',
                    fontWeight: 'bold',
                      display: 'inline-block',
                      marginBottom: '5px'
                    }}>
                      {noticia.categoria}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#6b7280'
                    }}>
                      {new Date(noticia.fecha).toLocaleDateString('es-CO')}
                    </div>
                  </div>
                </div>
                
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {noticia.titulo}
                </h3>
                
                <p style={{
                  fontSize: '12px',
                  color: '#6b7280',
                  lineHeight: '1.4',
                  marginBottom: '12px'
                }}>
                  {noticia.resumen}
                </p>
                
                <button style={{
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Ver Detalles
                </button>
              </div>
            ))}
            </div>
          </div>

        {/* Estadísticas */}
              <div style={{
          background: 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
          color: 'white',
          padding: '30px',
          borderRadius: '20px',
          marginTop: '40px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            Impacto de Nuestras Noticias
          </h3>

              <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px'
          }}>
              <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📰</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                {noticias.length}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Noticias Publicadas
              </div>
              </div>

              <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>👥</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                15K+
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Lectores Mensuales
              </div>
              </div>

              <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>🌍</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                32
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Departamentos
            </div>
          </div>

          <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>📱</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
                98%
              </div>
              <div style={{ fontSize: '12px', opacity: 0.9 }}>
                Satisfacción
              </div>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Noticias;
