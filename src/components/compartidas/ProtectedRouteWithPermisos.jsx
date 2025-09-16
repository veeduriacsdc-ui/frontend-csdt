import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { usePermisosVista } from '../../contexts/PermisosVistaContext';

const ProtectedRouteWithPermisos = ({ 
  children, 
  requiredRole = null, 
  requiredPage = null, 
  requiredAccess = 'ver' 
}) => {
  const { user, isAuthenticated } = useAuth();
  const { puedeVer, puedeEditar, puedeModificar } = usePermisosVista();

  // Verificar autenticación básica
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Verificar rol requerido
  if (requiredRole && user.rol !== requiredRole) {
    // Verificar si el usuario tiene un rol superior
    const rolesHierarchy = {
      'cliente': 1,
      'operador': 2,
      'administrador': 3,
      'administrador_general': 4
    };

    const userLevel = rolesHierarchy[user.rol] || 0;
    const requiredLevel = rolesHierarchy[requiredRole] || 0;

    if (userLevel < requiredLevel) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '90%'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🚫</div>
            <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>Acceso Denegado</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              No tiene el rol necesario para acceder a esta página.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>
              Rol requerido: <strong>{requiredRole}</strong><br />
              Su rol actual: <strong>{user.rol}</strong>
            </p>
            <button
              onClick={() => window.history.back()}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Volver
            </button>
          </div>
        </div>
      );
    }
  }

  // Verificar permisos de vista específicos
  if (requiredPage) {
    let tieneAcceso = false;

    switch (requiredAccess) {
      case 'ver':
        tieneAcceso = puedeVer(requiredPage);
        break;
      case 'editar':
        tieneAcceso = puedeEditar(requiredPage);
        break;
      case 'modificar':
        tieneAcceso = puedeModificar(requiredPage);
        break;
      default:
        tieneAcceso = puedeVer(requiredPage);
    }

    if (!tieneAcceso) {
      return (
        <div style={{ 
          padding: '40px', 
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            maxWidth: '500px',
            width: '90%'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
            <h2 style={{ color: '#dc2626', marginBottom: '16px' }}>Permiso de Vista Requerido</h2>
            <p style={{ color: '#6b7280', marginBottom: '20px' }}>
              No tiene permisos para acceder a esta página.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>
              Página: <strong>{requiredPage}</strong><br />
              Acceso requerido: <strong>{requiredAccess}</strong>
            </p>
            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => window.history.back()}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Volver
              </button>
              <button
                onClick={() => window.location.href = '/admin/control-permisos-vista'}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Solicitar Permiso
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default ProtectedRouteWithPermisos;
