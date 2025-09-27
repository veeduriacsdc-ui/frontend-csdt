import React, { useState, useEffect } from 'react';

const AnalisisPreciosUnitarios = () => {
  const [apus, setApus] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [apuEditando, setApuEditando] = useState(null);
  const [nuevoApu, setNuevoApu] = useState({
    cod: '',
    des: '',
    uni: '',
    can: 1,
    pre_uni: 0,
    mat: [],
    man_obr: [],
    equ: [],
    sub: [],
    otr: []
  });

  // Cargar APUs desde localStorage
  useEffect(() => {
    const apusGuardados = JSON.parse(localStorage.getItem('apus') || '[]');
    if (apusGuardados.length === 0) {
      // Datos iniciales de ejemplo basados en el modelo APU
      const apusIniciales = [
        {
          id: 1,
          codigo: 'APU001',
          descripcion: 'Análisis Jurídico Completo',
          unidad: 'caso',
          cantidad: 1,
          precioUnitario: 2500,
          materiales: [
            { descripcion: 'Papelería y Documentos', cantidad: 1, precio: 50, total: 50 },
            { descripcion: 'Impresiones y Copias', cantidad: 100, precio: 0.5, total: 50 }
          ],
          manoObra: [
            { descripcion: 'Abogado Senior', cantidad: 8, precio: 150, total: 1200 },
            { descripcion: 'Paralegal', cantidad: 4, precio: 60, total: 240 }
          ],
          equipos: [
            { descripcion: 'Computadora', cantidad: 1, precio: 100, total: 100 }
          ],
          subcontratos: [
            { descripcion: 'Perito Técnico', cantidad: 1, precio: 500, total: 500 }
          ],
          otros: [
            { descripcion: 'Gastos Administrativos', cantidad: 1, precio: 360, total: 360 }
          ],
          fechaCreacion: new Date().toISOString(),
          estado: 'activo'
        },
        {
          id: 2,
          codigo: 'APU002',
          descripcion: 'Investigación de Campo',
          unidad: 'día',
          cantidad: 1,
          precioUnitario: 800,
          materiales: [
            { descripcion: 'Transporte', cantidad: 1, precio: 50, total: 50 },
            { descripcion: 'Alimentación', cantidad: 1, precio: 30, total: 30 }
          ],
          manoObra: [
            { descripcion: 'Investigador', cantidad: 8, precio: 80, total: 640 },
            { descripcion: 'Asistente', cantidad: 4, precio: 40, total: 160 }
          ],
          equipos: [],
          subcontratos: [],
          otros: [
            { descripcion: 'Gastos Varios', cantidad: 1, precio: 20, total: 20 }
          ],
          fechaCreacion: new Date().toISOString(),
          estado: 'activo'
        },
        {
          id: 3,
          codigo: 'APU003',
          descripcion: 'Elaboración de Documentos Legales',
          unidad: 'documento',
          cantidad: 1,
          precioUnitario: 450,
          materiales: [
            { descripcion: 'Papel y Tinta', cantidad: 1, precio: 25, total: 25 }
          ],
          manoObra: [
            { descripcion: 'Abogado Junior', cantidad: 2, precio: 100, total: 200 },
            { descripcion: 'Secretario Legal', cantidad: 1, precio: 40, total: 40 }
          ],
          equipos: [
            { descripcion: 'Software Legal', cantidad: 1, precio: 50, total: 50 }
          ],
          subcontratos: [],
          otros: [
            { descripcion: 'Revisión y Corrección', cantidad: 1, precio: 135, total: 135 }
          ],
          fechaCreacion: new Date().toISOString(),
          estado: 'activo'
        }
      ];
      setApus(apusIniciales);
      localStorage.setItem('apus', JSON.stringify(apusIniciales));
    } else {
      setApus(apusGuardados);
    }
  }, []);

  const calcularSubtotal = (items) => {
    return items.reduce((total, item) => total + (item.cantidad * item.precio), 0);
  };

  const calcularTotalApu = (apu) => {
    const materiales = calcularSubtotal(apu.materiales);
    const manoObra = calcularSubtotal(apu.manoObra);
    const equipos = calcularSubtotal(apu.equipos);
    const subcontratos = calcularSubtotal(apu.subcontratos);
    const otros = calcularSubtotal(apu.otros);
    
    return materiales + manoObra + equipos + subcontratos + otros;
  };

  const handleGuardarApu = (e) => {
    e.preventDefault();
    
    const totalCalculado = calcularTotalApu(nuevoApu);
    const apuCompleto = {
      ...nuevoApu,
      precioUnitario: totalCalculado,
      fechaCreacion: apuEditando ? apuEditando.fechaCreacion : new Date().toISOString(),
      estado: 'activo'
    };
    
    if (apuEditando) {
      // Editar APU existente
      const apusActualizados = apus.map(apu => 
        apu.id === apuEditando.id 
          ? { ...apu, ...apuCompleto }
          : apu
      );
      setApus(apusActualizados);
      localStorage.setItem('apus', JSON.stringify(apusActualizados));
    } else {
      // Crear nuevo APU
      const apu = {
        id: Date.now(),
        ...apuCompleto
      };
      const apusActualizados = [...apus, apu];
      setApus(apusActualizados);
      localStorage.setItem('apus', JSON.stringify(apusActualizados));
    }
    
    setMostrarFormulario(false);
    setApuEditando(null);
    setNuevoApu({
      codigo: '',
      descripcion: '',
      unidad: '',
      cantidad: 1,
      precioUnitario: 0,
      materiales: [],
      manoObra: [],
      equipos: [],
      subcontratos: [],
      otros: []
    });
  };

  const handleEditarApu = (apu) => {
    setApuEditando(apu);
    setNuevoApu(apu);
    setMostrarFormulario(true);
  };

  const handleEliminarApu = (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este APU?')) {
      const apusActualizados = apus.filter(apu => apu.id !== id);
      setApus(apusActualizados);
      localStorage.setItem('apus', JSON.stringify(apusActualizados));
    }
  };

  const agregarItem = (categoria, item) => {
    setNuevoApu({
      ...nuevoApu,
      [categoria]: [...nuevoApu[categoria], item]
    });
  };

  const eliminarItem = (categoria, index) => {
    setNuevoApu({
      ...nuevoApu,
      [categoria]: nuevoApu[categoria].filter((_, i) => i !== index)
    });
  };

  const calcularCostoTotal = () => {
    return apus.reduce((total, apu) => total + (apu.precioUnitario * apu.cantidad), 0);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        
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
            📊 Análisis de Precios Unitarios (APUs)
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#4a5568',
            textAlign: 'center',
            marginBottom: '20px'
          }}>
            Gestión integral de costos y precios unitarios para proyectos jurídicos
          </p>
          
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => setMostrarFormulario(true)}
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
              ➕ Crear Nuevo APU
            </button>
          </div>
        </div>

        {/* Dashboard de Métricas */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📋 Total APUs</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3182ce' }}>
              {apus.length}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>💰 Costo Total</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#38a169' }}>
              ${calcularCostoTotal().toLocaleString()}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📊 Promedio por APU</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d69e2e' }}>
              ${apus.length > 0 ? Math.round(calcularCostoTotal() / apus.length).toLocaleString() : 0}
            </p>
          </div>
          
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⚡ Activos</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#805ad5' }}>
              {apus.filter(a => a.estado === 'activo').length}
            </p>
          </div>
        </div>

        {/* Formulario de APU */}
        {mostrarFormulario && (
          <div style={{ 
            background: 'white', 
            borderRadius: '15px', 
            padding: '30px', 
            marginBottom: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ 
              fontSize: '1.8rem', 
              fontWeight: 'bold', 
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              {apuEditando ? '✏️ Editar APU' : '➕ Crear Nuevo APU'}
            </h2>
            
            <form onSubmit={handleGuardarApu}>
              {/* Información Básica */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Código APU *
                  </label>
                  <input
                    type="text"
                    value={nuevoApu.codigo}
                    onChange={(e) => setNuevoApu({...nuevoApu, codigo: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Descripción *
                  </label>
                  <input
                    type="text"
                    value={nuevoApu.descripcion}
                    onChange={(e) => setNuevoApu({...nuevoApu, descripcion: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Unidad *
                  </label>
                  <select
                    value={nuevoApu.unidad}
                    onChange={(e) => setNuevoApu({...nuevoApu, unidad: e.target.value})}
                    required
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  >
                    <option value="">Seleccionar unidad</option>
                    <option value="caso">Caso</option>
                    <option value="documento">Documento</option>
                    <option value="hora">Hora</option>
                    <option value="dia">Día</option>
                    <option value="semana">Semana</option>
                    <option value="mes">Mes</option>
                    <option value="unidad">Unidad</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#2d3748', marginBottom: '8px' }}>
                    Cantidad *
                  </label>
                  <input
                    type="number"
                    value={nuevoApu.cantidad}
                    onChange={(e) => setNuevoApu({...nuevoApu, cantidad: parseFloat(e.target.value) || 1})}
                    required
                    min="0.01"
                    step="0.01"
                    style={{ width: '100%', padding: '12px', border: '2px solid #e2e8f0', borderRadius: '8px' }}
                  />
                </div>
              </div>

              {/* Componentes del APU */}
              {['materiales', 'manoObra', 'equipos', 'subcontratos', 'otros'].map(categoria => (
                <div key={categoria} style={{ marginBottom: '30px' }}>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: '#2d3748',
                    marginBottom: '15px',
                    textTransform: 'capitalize'
                  }}>
                    {categoria === 'manoObra' ? 'Mano de Obra' : 
                     categoria === 'subcontratos' ? 'Subcontratos' :
                     categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                  </h3>
                  
                  <div style={{ 
                    border: '2px solid #e2e8f0', 
                    borderRadius: '8px', 
                    padding: '20px',
                    backgroundColor: '#f7fafc'
                  }}>
                    {nuevoApu[categoria].map((item, index) => (
                      <div key={index} style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '2fr 1fr 1fr 1fr auto', 
                        gap: '10px', 
                        alignItems: 'center',
                        marginBottom: '10px',
                        padding: '10px',
                        backgroundColor: 'white',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <input
                          type="text"
                          value={item.descripcion}
                          onChange={(e) => {
                            const nuevosItems = [...nuevoApu[categoria]];
                            nuevosItems[index] = { ...item, descripcion: e.target.value };
                            setNuevoApu({...nuevoApu, [categoria]: nuevosItems});
                          }}
                          placeholder="Descripción"
                          style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                        />
                        <input
                          type="number"
                          value={item.cantidad}
                          onChange={(e) => {
                            const nuevosItems = [...nuevoApu[categoria]];
                            nuevosItems[index] = { ...item, cantidad: parseFloat(e.target.value) || 0 };
                            setNuevoApu({...nuevoApu, [categoria]: nuevosItems});
                          }}
                          placeholder="Cantidad"
                          min="0"
                          step="0.01"
                          style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                        />
                        <input
                          type="number"
                          value={item.precio}
                          onChange={(e) => {
                            const nuevosItems = [...nuevoApu[categoria]];
                            nuevosItems[index] = { ...item, precio: parseFloat(e.target.value) || 0 };
                            setNuevoApu({...nuevoApu, [categoria]: nuevosItems});
                          }}
                          placeholder="Precio"
                          min="0"
                          step="0.01"
                          style={{ padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                        />
                        <div style={{ 
                          padding: '8px', 
                          backgroundColor: '#f0f9ff', 
                          borderRadius: '4px',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          color: '#1e40af'
                        }}>
                          ${(item.cantidad * item.precio).toFixed(2)}
                        </div>
                        <button
                          type="button"
                          onClick={() => eliminarItem(categoria, index)}
                          style={{
                            padding: '8px',
                            backgroundColor: '#e53e3e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    
                    <button
                      type="button"
                      onClick={() => agregarItem(categoria, { descripcion: '', cantidad: 1, precio: 0 })}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#3182ce',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      ➕ Agregar {categoria === 'manoObra' ? 'Mano de Obra' : 
                                 categoria === 'subcontratos' ? 'Subcontrato' :
                                 categoria.charAt(0).toUpperCase() + categoria.slice(1)}
                    </button>
                  </div>
                </div>
              ))}

              {/* Resumen del APU */}
              <div style={{ 
                background: '#f0f9ff', 
                border: '2px solid #bfdbfe', 
                borderRadius: '8px', 
                padding: '20px',
                marginBottom: '20px'
              }}>
                <h3 style={{ 
                  fontSize: '1.3rem', 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: '15px'
                }}>
                  📊 Resumen del APU
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                  <div>
                    <strong>Materiales:</strong> ${calcularSubtotal(nuevoApu.materiales).toFixed(2)}
                  </div>
                  <div>
                    <strong>Mano de Obra:</strong> ${calcularSubtotal(nuevoApu.manoObra).toFixed(2)}
                  </div>
                  <div>
                    <strong>Equipos:</strong> ${calcularSubtotal(nuevoApu.equipos).toFixed(2)}
                  </div>
                  <div>
                    <strong>Subcontratos:</strong> ${calcularSubtotal(nuevoApu.subcontratos).toFixed(2)}
                  </div>
                  <div>
                    <strong>Otros:</strong> ${calcularSubtotal(nuevoApu.otros).toFixed(2)}
                  </div>
                  <div style={{ 
                    fontSize: '1.2rem', 
                    fontWeight: 'bold', 
                    color: '#1e40af',
                    borderTop: '2px solid #bfdbfe',
                    paddingTop: '10px'
                  }}>
                    <strong>TOTAL:</strong> ${calcularTotalApu(nuevoApu).toFixed(2)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarFormulario(false);
                    setApuEditando(null);
                    setNuevoApu({
                      codigo: '',
                      descripcion: '',
                      unidad: '',
                      cantidad: 1,
                      precioUnitario: 0,
                      materiales: [],
                      manoObra: [],
                      equipos: [],
                      subcontratos: [],
                      otros: []
                    });
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
                  {apuEditando ? 'Actualizar' : 'Crear'} APU
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de APUs */}
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
            📋 Lista de APUs ({apus.length})
          </h2>
          
          {apus.length === 0 ? (
            <p style={{ color: '#718096', textAlign: 'center', padding: '40px' }}>
              No hay APUs registrados. Cree el primer APU para comenzar.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: '20px' }}>
              {apus.map(apu => (
                <div key={apu.id} style={{ 
                  border: '2px solid #e2e8f0', 
                  borderRadius: '12px', 
                  padding: '20px',
                  backgroundColor: '#f7fafc'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                        {apu.codigo} - {apu.descripcion}
                      </h3>
                      <p style={{ color: '#4a5568', marginBottom: '10px' }}>
                        <strong>Unidad:</strong> {apu.unidad} | 
                        <strong> Cantidad:</strong> {apu.cantidad} | 
                        <strong> Precio Unitario:</strong> ${apu.precioUnitario.toFixed(2)}
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <span style={{ 
                        background: '#38a169',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}>
                        ${(apu.precioUnitario * apu.cantidad).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleEditarApu(apu)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#3182ce',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        ✏️ Editar
                      </button>
                      <button
                        onClick={() => handleEliminarApu(apu.id)}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#e53e3e',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  </div>
                  
                  {/* Desglose de costos */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                    {apu.materiales.length > 0 && (
                      <div>
                        <h4 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '0.9rem' }}>Materiales:</h4>
                        <div style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                          {apu.materiales.map((item, index) => (
                            <div key={index}>
                              {item.descripcion}: ${item.cantidad * item.precio}
                            </div>
                          ))}
                          <strong>Subtotal: ${calcularSubtotal(apu.materiales).toFixed(2)}</strong>
                        </div>
                      </div>
                    )}
                    
                    {apu.manoObra.length > 0 && (
                      <div>
                        <h4 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '0.9rem' }}>Mano de Obra:</h4>
                        <div style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                          {apu.manoObra.map((item, index) => (
                            <div key={index}>
                              {item.descripcion}: ${item.cantidad * item.precio}
                            </div>
                          ))}
                          <strong>Subtotal: ${calcularSubtotal(apu.manoObra).toFixed(2)}</strong>
                        </div>
                      </div>
                    )}
                    
                    {apu.equipos.length > 0 && (
                      <div>
                        <h4 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '0.9rem' }}>Equipos:</h4>
                        <div style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                          {apu.equipos.map((item, index) => (
                            <div key={index}>
                              {item.descripcion}: ${item.cantidad * item.precio}
                            </div>
                          ))}
                          <strong>Subtotal: ${calcularSubtotal(apu.equipos).toFixed(2)}</strong>
                        </div>
                      </div>
                    )}
                    
                    {apu.subcontratos.length > 0 && (
                      <div>
                        <h4 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '0.9rem' }}>Subcontratos:</h4>
                        <div style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                          {apu.subcontratos.map((item, index) => (
                            <div key={index}>
                              {item.descripcion}: ${item.cantidad * item.precio}
                            </div>
                          ))}
                          <strong>Subtotal: ${calcularSubtotal(apu.subcontratos).toFixed(2)}</strong>
                        </div>
                      </div>
                    )}
                    
                    {apu.otros.length > 0 && (
                      <div>
                        <h4 style={{ color: '#2d3748', marginBottom: '8px', fontSize: '0.9rem' }}>Otros:</h4>
                        <div style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                          {apu.otros.map((item, index) => (
                            <div key={index}>
                              {item.descripcion}: ${item.cantidad * item.precio}
                            </div>
                          ))}
                          <strong>Subtotal: ${calcularSubtotal(apu.otros).toFixed(2)}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalisisPreciosUnitarios;
