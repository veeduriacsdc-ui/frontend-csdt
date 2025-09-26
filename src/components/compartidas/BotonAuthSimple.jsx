import React, { useState } from 'react';
import AuthSimple from './AuthSimple';

const BotonAuthSimple = ({ 
  texto = "Iniciar Sesión", 
  estilo = {},
  onSuccess = null
}) => {
  const [mostrarAuth, setMostrarAuth] = useState(false);

  const handleClick = () => {
    setMostrarAuth(true);
  };

  const handleSuccess = (resultado) => {
    setMostrarAuth(false);
    if (onSuccess) {
      onSuccess(resultado);
    }
  };

  const estiloDefault = {
    flex: '1 1 0%',
    padding: '12px 18px',
    border: 'medium',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, rgb(39, 174, 96) 0%, rgb(46, 204, 113) 100%)',
    color: 'white',
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: 'rgba(39, 174, 96, 0.3) 0px 4px 15px',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    ...estilo
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        style={estiloDefault}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = 'rgba(39, 174, 96, 0.4) 0px 6px 20px';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'rgba(39, 174, 96, 0.3) 0px 4px 15px';
        }}
      >
        {texto}
      </button>

      {mostrarAuth && (
        <AuthSimple 
          onClose={() => setMostrarAuth(false)}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};

export default BotonAuthSimple;
