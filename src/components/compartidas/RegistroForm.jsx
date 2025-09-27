import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import registroService from '../../services/registroService';

const RegistroForm = ({ onClose, onSuccess }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    nom: '',
    ape: '',
    cor: '',
    tel: '',
    doc: '',
    tip_doc: 'cc',
    rol: 'cli',
    con: '',
    con_confirmation: '',
    motivacion: '',
    experiencia: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validaciones, setValidaciones] = useState({
    cor: null,
    doc: null
  });

  const [errores, setErrores] = useState({});

  const tiposDocumento = [
    { value: 'cc', label: 'Cédula de Ciudadanía' },
    { value: 'ce', label: 'Cédula de Extranjería' },
    { value: 'ti', label: 'Tarjeta de Identidad' },
    { value: 'pp', label: 'Pasaporte' },
    { value: 'nit', label: 'NIT' }
  ];

  const roles = [
    { value: 'cli', label: 'Cliente' },
    { value: 'ope', label: 'Operador' },
    { value: 'adm', label: 'Administrador' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar errores específicos del campo
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Limpiar validaciones cuando el usuario modifica
    if (name === 'cor') {
      setValidaciones(prev => ({ ...prev, cor: null }));
    }
    if (name === 'doc') {
      setValidaciones(prev => ({ ...prev, doc: null }));
    }
  };

  // Validar email en tiempo real
  const validarEmail = async (cor) => {
    if (!cor || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cor)) {
      return;
    }

    try {
      const resultado = await registroService.validarCampos({ cor });
      if (resultado.existe) {
        setValidaciones(prev => ({
          ...prev,
          email: {
            existe: true,
            mensaje: resultado.mensaje,
            tipo: resultado.tipo
          }
        }));
      } else {
        setValidaciones(prev => ({
          ...prev,
          email: { existe: false }
        }));
      }
    } catch (error) {
      console.error('Error validando email:', error);
    }
  };

  // Validar documento en tiempo real
  const validarDocumento = async (documento) => {
    if (!documento || documento.length < 6) {
      return;
    }

    try {
      const resultado = await registroService.validarCampos({ documento_identidad: documento });
      if (resultado.existe) {
        setValidaciones(prev => ({
          ...prev,
          documento: {
            existe: true,
            mensaje: resultado.mensaje,
            tipo: resultado.tipo
          }
        }));
      } else {
        setValidaciones(prev => ({
          ...prev,
          documento: { existe: false }
        }));
      }
    } catch (error) {
      console.error('Error validando documento:', error);
    }
  };

  // Debounce para validaciones
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.email) {
        validarEmail(formData.email);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.email]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData.documento_identidad) {
        validarDocumento(formData.documento_identidad);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [formData.documento_identidad]);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    }

    if (!formData.apellido.trim()) {
      nuevosErrores.apellido = 'El apellido es obligatorio';
    }

    if (!formData.email.trim()) {
      nuevosErrores.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nuevosErrores.email = 'El email debe tener un formato válido';
    }

    if (!formData.documento_identidad.trim()) {
      nuevosErrores.documento_identidad = 'El documento es obligatorio';
    } else if (formData.documento_identidad.length < 6) {
      nuevosErrores.documento_identidad = 'El documento debe tener al menos 6 caracteres';
    }

    if (!formData.contrasena) {
      nuevosErrores.contrasena = 'La contraseña es obligatoria';
    } else if (formData.contrasena.length < 6) {
      nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (formData.contrasena !== formData.confirmar_contrasena) {
      nuevosErrores.confirmar_contrasena = 'Las contraseñas no coinciden';
    }

    if (formData.rol_solicitado === 'operador' || formData.rol_solicitado === 'administrador') {
      if (!formData.motivacion.trim()) {
        nuevosErrores.motivacion = 'La motivación es obligatoria para operadores y administradores';
      }
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validarFormulario()) {
      return;
    }

    // Verificar validaciones de campos únicos
    if (validaciones.email?.existe || validaciones.documento?.existe) {
      setError('Por favor corrige los errores de validación antes de continuar');
      return;
    }

    setLoading(true);

    try {
      const datosRegistro = {
        nombre: formData.nombre.trim(),
        email: formData.email.trim().toLowerCase(),
        telefono: formData.telefono.trim(),
        documento_identidad: formData.documento_identidad.trim(),
        tipo_documento: formData.tipo_documento,
        rol_solicitado: formData.rol_solicitado,
        motivacion: formData.motivacion.trim(),
        experiencia: formData.experiencia.trim()
      };

      const resultado = await registroService.registrar(datosRegistro);

      if (resultado.success) {
        setSuccess(resultado.message);
        if (onSuccess) {
          onSuccess(resultado);
        }
        if (onClose) {
          setTimeout(() => onClose(), 2000);
        }
      } else {
        setError(resultado.message || 'Error al registrar usuario');
      }
    } catch (error) {
      console.error('Error en registro:', error);
      setError(error.message || 'Error al procesar el registro');
    } finally {
      setLoading(false);
    }
  };

  const renderError = (campo) => {
    if (errores[campo]) {
      return <span className="text-red-500 text-sm mt-1 block">{errores[campo]}</span>;
    }
    return null;
  };

  const renderValidacion = (tipo) => {
    const validacion = validaciones[tipo];
    if (!validacion) return null;

    if (validacion.existe) {
      return (
        <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <span className="text-red-500 text-sm font-medium">
              ⚠️ {validacion.mensaje}
            </span>
          </div>
          <div className="text-red-600 text-xs mt-1">
            Tipo de registro: {validacion.tipo}
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-1 p-2 bg-green-50 border border-green-200 rounded-md">
          <span className="text-green-600 text-sm">✓ {tipo === 'email' ? 'Email' : 'Documento'} disponible</span>
        </div>
      );
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      overflowY: 'auto',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
          }}>
            Registro de Usuario
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ×
          </button>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#166534',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Información Personal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre *
              </label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su nombre"
              />
              {renderError('nombre')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Apellido *
              </label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su apellido"
              />
              {renderError('apellido')}
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su email"
            />
            {renderError('email')}
            {renderValidacion('email')}
          </div>

          {/* Documento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Documento *
              </label>
              <select
                name="tipo_documento"
                value={formData.tipo_documento}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tiposDocumento.map(tipo => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de Documento *
              </label>
              <input
                type="text"
                name="documento_identidad"
                value={formData.documento_identidad}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su número de documento"
              />
              {renderError('documento_identidad')}
              {renderValidacion('documento')}
            </div>
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingrese su teléfono"
            />
          </div>

          {/* Contraseñas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña *
              </label>
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingrese su contraseña"
              />
              {renderError('contrasena')}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar Contraseña *
              </label>
              <input
                type="password"
                name="confirmar_contrasena"
                value={formData.confirmar_contrasena}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirme su contraseña"
              />
              {renderError('confirmar_contrasena')}
            </div>
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Usuario *
            </label>
            <select
              name="rol_solicitado"
              value={formData.rol_solicitado}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map(rol => (
                <option key={rol.value} value={rol.value}>
                  {rol.label}
                </option>
              ))}
            </select>
          </div>

          {/* Motivación (para operadores y administradores) */}
          {(formData.rol_solicitado === 'operador' || formData.rol_solicitado === 'administrador') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivación *
              </label>
              <textarea
                name="motivacion"
                value={formData.motivacion}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Explique por qué desea ser {formData.rol_solicitado}"
              />
              {renderError('motivacion')}
            </div>
          )}

          {/* Experiencia (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experiencia (Opcional)
            </label>
            <textarea
              name="experiencia"
              value={formData.experiencia}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describa su experiencia relevante"
            />
          </div>

          {/* Botón de Registro */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px 18px',
                border: 'medium',
                borderRadius: '10px',
                background: loading 
                  ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                  : 'linear-gradient(135deg, rgb(39, 174, 96) 0%, rgb(46, 204, 113) 100%)',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                boxShadow: 'rgba(39, 174, 96, 0.3) 0px 4px 15px',
                width: '100%',
                fontSize: '16px'
              }}
            >
              {loading ? 'Registrando...' : 'Registrarse'}
            </button>
          </div>
        </form>

        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <p>¿Ya tienes cuenta? <a href="#" style={{ color: '#3b82f6', textDecoration: 'none' }}>Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  );
};

export default RegistroForm;
