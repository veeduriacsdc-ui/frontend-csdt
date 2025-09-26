import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import { 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  RefreshCw,
  Database,
  Server,
  Globe,
  User,
  FileText
} from 'lucide-react';
import connectionService from '../../services/connectionService';

const DiagnosticoConexion = () => {
  const [diagnostico, setDiagnostico] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [estadoConexion, setEstadoConexion] = useState(null);

  useEffect(() => {
    verificarConexionBasica();
  }, []);

  const verificarConexionBasica = async () => {
    setCargando(true);
    try {
      const resultado = await connectionService.checkConnection();
      setEstadoConexion(resultado);
    } catch (error) {
      setEstadoConexion({
        success: false,
        error: error.message
      });
    } finally {
      setCargando(false);
    }
  };

  const ejecutarDiagnosticoCompleto = async () => {
    setCargando(true);
    try {
      const resultado = await connectionService.runFullDiagnostic();
      setDiagnostico(resultado);
    } catch (error) {
      console.error('Error en diagnóstico:', error);
    } finally {
      setCargando(false);
    }
  };

  const getIconoEstado = (success) => {
    return success ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getColorEstado = (success) => {
    return success ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* Estado de Conexión Básica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="h-5 w-5" />
            Estado de Conexión
          </CardTitle>
          <CardDescription>
            Verificación básica de conectividad con el backend
          </CardDescription>
        </CardHeader>
        <CardContent>
          {cargando ? (
            <div className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Verificando conexión...</span>
            </div>
          ) : estadoConexion ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                {getIconoEstado(estadoConexion.success)}
                <span className="font-medium">
                  {estadoConexion.success ? 'Conectado' : 'Desconectado'}
                </span>
                <Badge className={getColorEstado(estadoConexion.success)}>
                  {estadoConexion.success ? 'Activo' : 'Inactivo'}
                </Badge>
              </div>
              
              {estadoConexion.success && estadoConexion.data && (
                <div className="text-sm text-gray-600">
                  <p><strong>Mensaje:</strong> {estadoConexion.data.message}</p>
                  <p><strong>Versión:</strong> {estadoConexion.data.version}</p>
                  <p><strong>Timestamp:</strong> {new Date(estadoConexion.data.timestamp).toLocaleString()}</p>
                </div>
              )}
              
              {!estadoConexion.success && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Error: {estadoConexion.error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="text-sm text-gray-600">
                <p><strong>Configuración:</strong> {estadoConexion.config?.name}</p>
                <p><strong>URL:</strong> {estadoConexion.config?.url}</p>
                <p><strong>Base de datos:</strong> {estadoConexion.config?.database}</p>
              </div>
            </div>
          ) : null}
          
          <div className="mt-4">
            <Button onClick={verificarConexionBasica} disabled={cargando}>
              <RefreshCw className={`h-4 w-4 mr-2 ${cargando ? 'animate-spin' : ''}`} />
              Verificar Conexión
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Diagnóstico Completo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Diagnóstico Completo
          </CardTitle>
          <CardDescription>
            Verificación exhaustiva de todos los componentes del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={ejecutarDiagnosticoCompleto} 
              disabled={cargando}
              className="w-full"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${cargando ? 'animate-spin' : ''}`} />
              Ejecutar Diagnóstico Completo
            </Button>

            {diagnostico && (
              <div className="space-y-4">
                {/* Resumen del Diagnóstico */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Resumen del Diagnóstico</h4>
                  <div className="text-sm text-blue-700">
                    <p><strong>Timestamp:</strong> {new Date(diagnostico.timestamp).toLocaleString()}</p>
                    <p><strong>Configuración:</strong> {diagnostico.config?.name}</p>
                    <p><strong>Base de datos:</strong> {diagnostico.config?.database}</p>
                  </div>
                </div>

                {/* Resultados de Endpoints */}
                {diagnostico.endpoints && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      Endpoints del Sistema
                    </h4>
                    <div className="space-y-2">
                      {diagnostico.endpoints.map((endpoint, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{endpoint.name}</span>
                          <div className="flex items-center gap-2">
                            {getIconoEstado(endpoint.success)}
                            <span className="text-xs text-gray-500">
                              {endpoint.success ? `Status: ${endpoint.status}` : endpoint.error}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Resultado de Registro */}
                {diagnostico.registration && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Registro de Usuario
                    </h4>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      {getIconoEstado(diagnostico.registration.success)}
                      <span className="text-sm">
                        {diagnostico.registration.success ? 'Registro exitoso' : 'Error en registro'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Resultado de Login */}
                {diagnostico.login && (
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Login de Usuario
                    </h4>
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                      {getIconoEstado(diagnostico.login.success)}
                      <span className="text-sm">
                        {diagnostico.login.success ? 'Login exitoso' : 'Error en login'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Información de Configuración */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Información de Configuración
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p><strong>Configuración actual:</strong> {estadoConexion?.config?.name || 'No disponible'}</p>
            <p><strong>URL del backend:</strong> {estadoConexion?.config?.url || 'No disponible'}</p>
            <p><strong>Tipo de base de datos:</strong> {estadoConexion?.config?.database || 'No disponible'}</p>
            <p><strong>Timeout:</strong> {estadoConexion?.config?.timeout || 'No disponible'}ms</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticoConexion;