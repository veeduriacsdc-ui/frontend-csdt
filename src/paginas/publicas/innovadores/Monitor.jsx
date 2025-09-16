import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

const Monitor = () => {
  const { user } = useAuth();
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [datosRegistro, setDatosRegistro] = useState({
    cedula: '',
    nombreCompleto: '',
    entidad: '',
    tipoEntidad: '',
    telefono: '',
    email: '',
    direccion: '',
    experiencia: '',
    disponibilidad: '',
    motivacion: '',
    documentosEntidad: [],
    hojaVida: null,
    certificaciones: [],
    referencias: []
  });
  const [validacion, setValidacion] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [archivosCargando, setArchivosCargando] = useState(false);

  // Tipos de entidades que pueden ser monitores
  const tiposEntidades = [
    'Veedor Ciudadano',
    'ONG',
    'Defensoría del Pueblo',
    'Personería',
    'Contraloría',
    'Procuraduría',
    'Fiscalía',
    'Juzgado',
    'Universidad',
    'Colegio Profesional',
    'Organización Social',
    'Medio de Comunicación',
    'Empresa Privada',
    'Cooperativa',
    'Fundación',
    'Asociación',
    'Otro'
  ];

  // Función para manejar carga de archivos
  const manejarCargaArchivo = (evento, tipo) => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    // Validar tipo de archivo
    const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!tiposPermitidos.includes(archivo.type)) {
      alert('Solo se permiten archivos PDF, JPG, PNG o DOC/DOCX');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (archivo.size > 5 * 1024 * 1024) {
      alert('El archivo no puede ser mayor a 5MB');
      return;
    }

    setArchivosCargando(true);

    // Simular carga de archivo
    setTimeout(() => {
      const archivoData = {
        id: Date.now() + Math.random(),
        nombre: archivo.name,
        tipo: archivo.type,
        tamaño: archivo.size,
        fecha: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(archivo)
      };

      if (tipo === 'hojaVida') {
        setDatosRegistro(prev => ({ ...prev, hojaVida: archivoData }));
      } else if (tipo === 'documentosEntidad') {
        setDatosRegistro(prev => ({ 
          ...prev, 
          documentosEntidad: [...prev.documentosEntidad, archivoData] 
        }));
      } else if (tipo === 'certificaciones') {
        setDatosRegistro(prev => ({ 
          ...prev, 
          certificaciones: [...prev.certificaciones, archivoData] 
        }));
      }

      setArchivosCargando(false);
      alert(`Archivo ${archivo.name} cargado exitosamente`);
    }, 1000);
  };

  // Función para eliminar archivo
  const eliminarArchivo = (archivoId, tipo) => {
    if (tipo === 'hojaVida') {
      setDatosRegistro(prev => ({ ...prev, hojaVida: null }));
    } else if (tipo === 'documentosEntidad') {
      setDatosRegistro(prev => ({ 
        ...prev, 
        documentosEntidad: prev.documentosEntidad.filter(archivo => archivo.id !== archivoId)
      }));
    } else if (tipo === 'certificaciones') {
      setDatosRegistro(prev => ({ 
        ...prev, 
        certificaciones: prev.certificaciones.filter(archivo => archivo.id !== archivoId)
      }));
    }
  };

  // Verificar si la cédula ya está registrada
  const verificarCedula = async (cedula) => {
    try {
      setCargando(true);
      
      // Simular verificación en base de datos
      const monitoresRegistrados = JSON.parse(localStorage.getItem('monitoresCSDT') || '[]');
      const operadoresRegistrados = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
      
      // Verificar si ya existe como monitor
      const monitorExistente = monitoresRegistrados.find(m => m.cedula === cedula);
      if (monitorExistente) {
        setValidacion({
          tipo: 'existe',
          mensaje: 'Ya estás registrado como monitor. Tu estado es: ' + monitorExistente.estado,
          datos: monitorExistente
        });
        return;
      }
      
      // Verificar si ya existe como operador
      const operadorExistente = operadoresRegistrados.find(o => o.cedula === cedula);
      if (operadorExistente) {
        setValidacion({
          tipo: 'operador',
          mensaje: '¡Eres válido para operador! Ya tienes una cuenta activa en el sistema.',
          datos: operadorExistente
        });
        return;
      }
      
      // Cédula nueva - puede registrarse
      setValidacion({
        tipo: 'nuevo',
        mensaje: 'Cédula válida. Puedes proceder con el registro como monitor.',
        datos: null
      });
      
    } catch (error) {
      console.error('Error verificando cédula:', error);
      setValidacion({
        tipo: 'error',
        mensaje: 'Error al verificar la cédula. Intenta nuevamente.',
        datos: null
      });
    } finally {
      setCargando(false);
    }
  };

  // Registrar nuevo monitor
  const registrarMonitor = async () => {
    try {
      setCargando(true);
      
      const nuevoMonitor = {
        id: Date.now() + Math.random(),
        cedula: datosRegistro.cedula,
        nombreCompleto: datosRegistro.nombreCompleto,
        entidad: datosRegistro.entidad,
        tipoEntidad: datosRegistro.tipoEntidad,
        telefono: datosRegistro.telefono,
        email: datosRegistro.email,
        direccion: datosRegistro.direccion,
        experiencia: datosRegistro.experiencia,
        disponibilidad: datosRegistro.disponibilidad,
        motivacion: datosRegistro.motivacion,
        documentosEntidad: datosRegistro.documentosEntidad,
        hojaVida: datosRegistro.hojaVida,
        certificaciones: datosRegistro.certificaciones,
        referencias: datosRegistro.referencias,
        estado: 'pendiente_validacion',
        fechaRegistro: new Date().toISOString().split('T')[0],
        validadoPor: null,
        fechaValidacion: null,
        observaciones: '',
        activo: false
      };
      
      // Guardar en localStorage
      const monitoresActuales = JSON.parse(localStorage.getItem('monitoresCSDT') || '[]');
      monitoresActuales.push(nuevoMonitor);
      localStorage.setItem('monitoresCSDT', JSON.stringify(monitoresActuales));
      
      // Crear automáticamente como operador si es válido
      if (validacion?.tipo === 'nuevo') {
        const nuevoOperador = {
          id: Date.now() + Math.random() + 1,
          nombre: datosRegistro.nombreCompleto,
          email: datosRegistro.email,
          cedula: datosRegistro.cedula,
          rol: 'operador',
          estadoVeto: 'activo',
          fechaRegistro: new Date().toISOString().split('T')[0],
          tipoEntidad: datosRegistro.tipoEntidad,
          entidad: datosRegistro.entidad,
          telefono: datosRegistro.telefono,
          direccion: datosRegistro.direccion,
          esMonitor: true,
          monitorId: nuevoMonitor.id
        };
        
        const operadoresActuales = JSON.parse(localStorage.getItem('registrosUsuarios') || '[]');
        operadoresActuales.push(nuevoOperador);
        localStorage.setItem('registrosUsuarios', JSON.stringify(operadoresActuales));
      }
      
      alert('¡Registro exitoso! Has sido registrado como monitor y operador del sistema CSDT.');
      
      // Limpiar formulario
      setDatosRegistro({
        cedula: '',
        nombreCompleto: '',
        entidad: '',
        tipoEntidad: '',
        telefono: '',
        email: '',
        direccion: '',
        experiencia: '',
        disponibilidad: '',
        motivacion: '',
        documentosEntidad: [],
        hojaVida: null,
        certificaciones: [],
        referencias: []
      });
      setValidacion(null);
      setMostrarRegistro(false);
      
    } catch (error) {
      console.error('Error registrando monitor:', error);
      alert('Error al registrar. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  // Manejar cambio de cédula
  const handleCedulaChange = (e) => {
    const cedula = e.target.value;
    setDatosRegistro(prev => ({ ...prev, cedula }));
    
    // Verificar automáticamente cuando se complete la cédula
    if (cedula.length >= 8) {
      verificarCedula(cedula);
    } else {
      setValidacion(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #c084fc 100%)',
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
            👥 Monitores CSDT
          </h1>
          <p style={{
            fontSize: '18px',
            opacity: 0.9,
            marginBottom: '30px'
          }}>
            Sistema de registro y validación de monitores voluntarios
          </p>
          
          {/* Botón de registro */}
          <button
            onClick={() => setMostrarRegistro(!mostrarRegistro)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              padding: '15px 30px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            {mostrarRegistro ? '❌ Cancelar Registro' : '📝 Registrarse como Monitor'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        
        {/* Formulario de Registro */}
        {mostrarRegistro && (
          <div style={{
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            padding: '40px',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '30px',
              textAlign: 'center'
            }}>
              📋 Registro de Monitor CSDT
            </h2>

            {/* Validación de Cédula */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#374151',
                marginBottom: '8px'
              }}>
                Cédula de Ciudadanía *
              </label>
              <input
                type="text"
                value={datosRegistro.cedula}
                onChange={handleCedulaChange}
                placeholder="Ingresa tu número de cédula"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '16px',
                  outline: 'none',
                  transition: 'border-color 0.3s'
                }}
              />
              
              {/* Estado de validación */}
              {validacion && (
                <div style={{
                  marginTop: '10px',
                  padding: '12px',
                  borderRadius: '8px',
                  backgroundColor: validacion.tipo === 'error' ? '#fef2f2' : 
                                  validacion.tipo === 'operador' ? '#f0fdf4' :
                                  validacion.tipo === 'existe' ? '#fef3c7' : '#f0f9ff',
                  border: `1px solid ${validacion.tipo === 'error' ? '#fecaca' : 
                                  validacion.tipo === 'operador' ? '#bbf7d0' :
                                  validacion.tipo === 'existe' ? '#fed7aa' : '#bfdbfe'}`,
                  color: validacion.tipo === 'error' ? '#dc2626' : 
                         validacion.tipo === 'operador' ? '#059669' :
                         validacion.tipo === 'existe' ? '#d97706' : '#1e40af'
                }}>
                  {cargando ? '⏳ Verificando...' : validacion.mensaje}
                </div>
              )}
            </div>

            {/* Formulario completo */}
            {validacion?.tipo === 'nuevo' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                
                {/* Nombre Completo */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={datosRegistro.nombreCompleto}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, nombreCompleto: e.target.value }))}
                    placeholder="Nombre y apellidos completos"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Tipo de Entidad */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Tipo de Entidad *
                  </label>
                  <select
                    value={datosRegistro.tipoEntidad}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, tipoEntidad: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Selecciona tu tipo de entidad</option>
                    {tiposEntidades.map(tipo => (
                      <option key={tipo} value={tipo}>{tipo}</option>
                    ))}
                  </select>
                </div>

                {/* Entidad */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Nombre de la Entidad *
                  </label>
                  <input
                    type="text"
                    value={datosRegistro.entidad}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, entidad: e.target.value }))}
                    placeholder="Nombre de tu organización"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={datosRegistro.telefono}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, telefono: e.target.value }))}
                    placeholder="Número de teléfono"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={datosRegistro.email}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Correo electrónico"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Dirección */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    value={datosRegistro.direccion}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, direccion: e.target.value }))}
                    placeholder="Dirección de residencia"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  />
                </div>

                {/* Experiencia */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Experiencia en Veeduría Ciudadana
                  </label>
                  <textarea
                    value={datosRegistro.experiencia}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, experiencia: e.target.value }))}
                    placeholder="Describe tu experiencia en veeduría ciudadana, control social, etc."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Disponibilidad */}
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Disponibilidad
                  </label>
                  <select
                    value={datosRegistro.disponibilidad}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, disponibilidad: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}
                  >
                    <option value="">Selecciona tu disponibilidad</option>
                    <option value="Tiempo completo">Tiempo completo</option>
                    <option value="Medio tiempo">Medio tiempo</option>
                    <option value="Fines de semana">Fines de semana</option>
                    <option value="Horario flexible">Horario flexible</option>
                    <option value="Por proyectos">Por proyectos específicos</option>
                  </select>
                </div>

                {/* Motivación */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Motivación para ser Monitor
                  </label>
                  <textarea
                    value={datosRegistro.motivacion}
                    onChange={(e) => setDatosRegistro(prev => ({ ...prev, motivacion: e.target.value }))}
                    placeholder="¿Por qué quieres ser monitor del CSDT? ¿Qué te motiva a participar?"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Sección de Documentos */}
                <div style={{ gridColumn: '1 / -1', marginTop: '20px' }}>
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    marginBottom: '16px',
                    borderBottom: '2px solid #e5e7eb',
                    paddingBottom: '8px'
                  }}>
                    📄 Documentos Requeridos
                  </h4>

                  {/* Hoja de Vida */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      📋 Hoja de Vida *
                    </label>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: '#f9fafb'
                    }}>
                      {datosRegistro.hojaVida ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '24px' }}>📄</span>
                            <div>
                              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{datosRegistro.hojaVida.nombre}</div>
                              <div style={{ fontSize: '12px', color: '#6b7280' }}>
                                {(datosRegistro.hojaVida.tamaño / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => eliminarArchivo(datosRegistro.hojaVida.id, 'hojaVida')}
                            style={{
                              padding: '4px 8px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            ❌ Eliminar
                          </button>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            onChange={(e) => manejarCargaArchivo(e, 'hojaVida')}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            style={{ display: 'none' }}
                            id="hojaVida"
                          />
                          <label
                            htmlFor="hojaVida"
                            style={{
                              display: 'inline-block',
                              padding: '12px 24px',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: 'bold'
                            }}
                          >
                            📤 Cargar Hoja de Vida
                          </label>
                          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                            Formatos permitidos: PDF, DOC, DOCX, JPG, PNG (máx. 5MB)
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Documentos de la Entidad */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      🏢 Documentos de la Entidad *
                    </label>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: '#f9fafb'
                    }}>
                      <input
                        type="file"
                        onChange={(e) => manejarCargaArchivo(e, 'documentosEntidad')}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        id="documentosEntidad"
                        multiple
                      />
                      <label
                        htmlFor="documentosEntidad"
                        style={{
                          display: 'inline-block',
                          padding: '12px 24px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        📤 Cargar Documentos de Entidad
                      </label>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                        Cargue documentos que acrediten su vinculación con la entidad
                      </p>
                      
                      {/* Lista de documentos cargados */}
                      {datosRegistro.documentosEntidad.length > 0 && (
                        <div style={{ marginTop: '16px', textAlign: 'left' }}>
                          <h5 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                            Documentos cargados ({datosRegistro.documentosEntidad.length}):
                          </h5>
                          {datosRegistro.documentosEntidad.map(archivo => (
                            <div key={archivo.id} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              marginBottom: '8px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '16px' }}>📄</span>
                                <div>
                                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{archivo.nombre}</div>
                                  <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                    {(archivo.tamaño / 1024 / 1024).toFixed(2)} MB
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => eliminarArchivo(archivo.id, 'documentosEntidad')}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  cursor: 'pointer'
                                }}
                              >
                                ❌
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Certificaciones */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#374151',
                      marginBottom: '8px'
                    }}>
                      🏆 Certificaciones y Títulos (Opcional)
                    </label>
                    <div style={{
                      border: '2px dashed #d1d5db',
                      borderRadius: '8px',
                      padding: '20px',
                      textAlign: 'center',
                      backgroundColor: '#f9fafb'
                    }}>
                      <input
                        type="file"
                        onChange={(e) => manejarCargaArchivo(e, 'certificaciones')}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        id="certificaciones"
                        multiple
                      />
                      <label
                        htmlFor="certificaciones"
                        style={{
                          display: 'inline-block',
                          padding: '12px 24px',
                          backgroundColor: '#f59e0b',
                          color: 'white',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        📤 Cargar Certificaciones
                      </label>
                      <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                        Títulos, certificaciones, diplomas relacionados con veeduría ciudadana
                      </p>
                      
                      {/* Lista de certificaciones cargadas */}
                      {datosRegistro.certificaciones.length > 0 && (
                        <div style={{ marginTop: '16px', textAlign: 'left' }}>
                          <h5 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>
                            Certificaciones cargadas ({datosRegistro.certificaciones.length}):
                          </h5>
                          {datosRegistro.certificaciones.map(archivo => (
                            <div key={archivo.id} style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '8px 12px',
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '6px',
                              marginBottom: '8px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '16px' }}>🏆</span>
                                <div>
                                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{archivo.nombre}</div>
                                  <div style={{ fontSize: '10px', color: '#6b7280' }}>
                                    {(archivo.tamaño / 1024 / 1024).toFixed(2)} MB
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => eliminarArchivo(archivo.id, 'certificaciones')}
                                style={{
                                  padding: '4px 8px',
                                  backgroundColor: '#ef4444',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  fontSize: '10px',
                                  cursor: 'pointer'
                                }}
                              >
                                ❌
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Botones de acción */}
            {validacion?.tipo === 'nuevo' && (
              <div style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                marginTop: '30px'
              }}>
                <button
                  onClick={() => setMostrarRegistro(false)}
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={registrarMonitor}
                  disabled={cargando || !datosRegistro.nombreCompleto || !datosRegistro.tipoEntidad || !datosRegistro.entidad || !datosRegistro.telefono || !datosRegistro.email || !datosRegistro.hojaVida || datosRegistro.documentosEntidad.length === 0}
                  style={{
                    background: cargando ? '#9ca3af' : '#7c3aed',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: cargando ? 'not-allowed' : 'pointer'
                  }}
                >
                  {cargando ? '⏳ Registrando...' : '✅ Registrar como Monitor'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Información sobre Monitores */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '40px',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            👥 ¿Qué son los Monitores CSDT?
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            {/* Definición */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '15px'
              }}>
                🎯 Definición
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                Los Monitores CSDT son ciudadanos, organizaciones y entidades que se comprometen 
                voluntariamente a apoyar las actividades de veeduría ciudadana y control social 
                del Consejo Social de Veeduría y Desarrollo Territorial.
              </p>
            </div>

            {/* Quiénes pueden ser */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '15px'
              }}>
                👥 Quiénes pueden ser Monitores
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Veedores ciudadanos</li>
                <li>Organizaciones No Gubernamentales (ONG)</li>
                <li>Defensoría del Pueblo</li>
                <li>Personerías</li>
                <li>Contralorías</li>
                <li>Procuradurías</li>
                <li>Universidades</li>
                <li>Colegios Profesionales</li>
                <li>Organizaciones Sociales</li>
                <li>Medios de Comunicación</li>
              </ul>
            </div>

            {/* Funciones */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '15px'
              }}>
                ⚙️ Funciones
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Apoyar actividades de veeduría</li>
                <li>Brindar asesoría técnica</li>
                <li>Participar en procesos de control social</li>
                <li>Facilitar acceso a información</li>
                <li>Contribuir con experiencia especializada</li>
                <li>Apoyar en la resolución de casos</li>
              </ul>
            </div>

            {/* Beneficios */}
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '15px'
              }}>
                🎁 Beneficios
              </h3>
              <ul style={{
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6',
                paddingLeft: '20px'
              }}>
                <li>Acceso directo al sistema CSDT</li>
                <li>Capacitación especializada</li>
                <li>Certificación como monitor</li>
                <li>Participación en procesos importantes</li>
                <li>Red de contactos profesionales</li>
                <li>Reconocimiento público</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Proceso de Validación */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          padding: '40px',
          marginBottom: '40px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            ✅ Proceso de Validación
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            
            {/* Paso 1 */}
            <div style={{
              background: '#f0f9ff',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #3b82f6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>📝</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#1e40af',
                marginBottom: '8px'
              }}>
                Paso 1: Registro
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#1e40af',
                lineHeight: '1.4'
              }}>
                Completa el formulario con tus datos personales y de la entidad
              </p>
            </div>

            {/* Paso 2 */}
            <div style={{
              background: '#f0fdf4',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #10b981',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '8px'
              }}>
                Paso 2: Validación Automática
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#059669',
                lineHeight: '1.4'
              }}>
                El sistema valida automáticamente tu cédula y te asigna como operador
              </p>
            </div>

            {/* Paso 3 */}
            <div style={{
              background: '#fef3c7',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #f59e0b',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>👨‍💼</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#d97706',
                marginBottom: '8px'
              }}>
                Paso 3: Validación Administrativa
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#d97706',
                lineHeight: '1.4'
              }}>
                El administrador general valida tu perfil y documentos
              </p>
            </div>

            {/* Paso 4 */}
            <div style={{
              background: '#f3e8ff',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #8b5cf6',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>🎉</div>
              <h3 style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#7c3aed',
                marginBottom: '8px'
              }}>
                Paso 4: Activación
              </h3>
              <p style={{
                fontSize: '12px',
                color: '#7c3aed',
                lineHeight: '1.4'
              }}>
                Recibes acceso completo al sistema como monitor validado
              </p>
            </div>
          </div>
        </div>

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
            to="/geo-dashboard" 
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
            Mapa Interactivo →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Monitor;