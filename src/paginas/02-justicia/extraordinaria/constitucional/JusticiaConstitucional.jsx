import React, { useState, useEffect } from 'react';
import PageTemplate from '../../../../components/compartidas/PageTemplate';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Textarea } from '../../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Badge } from '../../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../../components/ui/tabs';
import { 
  Scale, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Download,
  FileText,
  Calendar,
  Users,
  Gavel,
  BookOpen,
  Clock,
  CheckCircle,
  AlertTriangle,
  Shield,
  MapPin,
  Phone,
  Mail,
  Building,
  Crown,
  Star,
  Globe,
  BookMarked
} from 'lucide-react';

const JusticiaConstitucional = () => {
  const [casos, setCasos] = useState([]);
  const [tiposAccion, setTiposAccion] = useState([]);
  const [estados, setEstados] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoCaso, setNuevoCaso] = useState({
    numero: '',
    accionante: '',
    accionado: '',
    tipo: 'tutela',
    descripcion: '',
    fechaRadicacion: '',
    estado: 'admisibilidad',
    magistrado: '',
    ponente: '',
    secretario: '',
    documentos: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const casosSimulados = [
      {
        id: 'const_001',
        numero: 'T-123456',
        accionante: 'María González',
        accionado: 'EPS Sanitas',
        tipo: 'tutela',
        descripcion: 'Tutela por negación de medicamento oncológico',
        fechaRadicacion: '2024-01-15',
        estado: 'admisibilidad',
        magistrado: 'Dr. Alejandro Linares',
        ponente: 'Dr. Carlos Bernal',
        secretario: 'Dr. Ana Rodríguez',
        documentos: ['tutela.pdf', 'historia_clinica.pdf'],
        diasTranscurridos: 10,
        proximaAudiencia: '2024-03-15',
        urgencia: 'alta'
      },
      {
        id: 'const_002',
        numero: 'C-789012',
        accionante: 'Congreso de la República',
        accionado: 'Gobierno Nacional',
        tipo: 'constitucionalidad',
        descripcion: 'Demanda de inconstitucionalidad contra Ley de Presupuesto',
        fechaRadicacion: '2024-02-10',
        estado: 'estudio',
        magistrado: 'Dra. Diana Fajardo',
        ponente: 'Dr. Antonio José Lizarazo',
        secretario: 'Dr. Miguel Torres',
        documentos: ['demanda.pdf', 'ley.pdf'],
        diasTranscurridos: 20,
        proximaAudiencia: '2024-03-20',
        urgencia: 'media'
      },
      {
        id: 'const_003',
        numero: 'SU-345678',
        accionante: 'Corte Suprema de Justicia',
        accionado: 'Corte Constitucional',
        tipo: 'unificacion',
        descripcion: 'Solicitud de unificación de jurisprudencia',
        fechaRadicacion: '2024-01-20',
        estado: 'sentencia',
        magistrado: 'Dr. José Fernando Reyes',
        ponente: 'Dr. Alberto Rojas',
        secretario: 'Dra. Carmen López',
        documentos: ['solicitud.pdf', 'jurisprudencia.pdf'],
        diasTranscurridos: 30,
        proximaAudiencia: null,
        urgencia: 'baja'
      }
    ];

    const tiposSimulados = [
      { id: 'tutela', nombre: 'Acción de Tutela', icono: '🛡️', color: 'bg-blue-100 text-blue-800', urgencia: 'alta' },
      { id: 'constitucionalidad', nombre: 'Demanda de Inconstitucionalidad', icono: '⚖️', color: 'bg-red-100 text-red-800', urgencia: 'media' },
      { id: 'unificacion', nombre: 'Unificación de Jurisprudencia', icono: '📚', color: 'bg-purple-100 text-purple-800', urgencia: 'baja' },
      { id: 'revision', nombre: 'Revisión de Tutela', icono: '🔄', color: 'bg-orange-100 text-orange-800', urgencia: 'alta' },
      { id: 'cumplimiento', nombre: 'Acción de Cumplimiento', icono: '📋', color: 'bg-green-100 text-green-800', urgencia: 'media' },
      { id: 'popular', nombre: 'Acción Popular', icono: '👥', color: 'bg-yellow-100 text-yellow-800', urgencia: 'media' },
      { id: 'grupo', nombre: 'Acción de Grupo', icono: '👨‍👩‍👧‍👦', color: 'bg-pink-100 text-pink-800', urgencia: 'alta' }
    ];

    const estadosSimulados = [
      { id: 'admisibilidad', nombre: 'Admisibilidad', color: 'bg-blue-100 text-blue-800' },
      { id: 'estudio', nombre: 'En Estudio', color: 'bg-yellow-100 text-yellow-800' },
      { id: 'sentencia', nombre: 'Sentencia', color: 'bg-green-100 text-green-800' },
      { id: 'apelacion', nombre: 'Apelación', color: 'bg-orange-100 text-orange-800' },
      { id: 'archivado', nombre: 'Archivado', color: 'bg-gray-100 text-gray-800' }
    ];

    setCasos(casosSimulados);
    setTiposAccion(tiposSimulados);
    setEstados(estadosSimulados);
  };

  const getTipoColor = (tipo) => {
    const tipoObj = tiposAccion.find(t => t.id === tipo);
    return tipoObj ? tipoObj.color : 'bg-gray-100 text-gray-800';
  };

  const getEstadoColor = (estado) => {
    const estadoObj = estados.find(e => e.id === estado);
    return estadoObj ? estadoObj.color : 'bg-gray-100 text-gray-800';
  };

  const getUrgenciaColor = (urgencia) => {
    switch (urgencia) {
      case 'baja': return 'bg-green-100 text-green-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'alta': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de envío
  };

  const manejarEdicion = (caso) => {
    setNuevoCaso(caso);
  };

  const manejarEliminacion = (id) => {
    setCasos(casos.filter(c => c.id !== id));
  };

  const generarReporte = (caso) => {
  };

  const casosFiltrados = casos.filter(caso => {
    const cumpleTipo = filtroTipo === 'todos' || caso.tipo === filtroTipo;
    const cumpleEstado = filtroEstado === 'todos' || caso.estado === filtroEstado;
    const cumpleBusqueda = busqueda === '' || 
      caso.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      caso.accionante.toLowerCase().includes(busqueda.toLowerCase()) ||
      caso.accionado.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleTipo && cumpleEstado && cumpleBusqueda;
  });

  const stats = [
    { icon: Scale, value: casos.length, label: 'Total Casos' },
    { icon: Shield, value: casos.filter(c => c.tipo === 'tutela').length, label: 'Tutelas' },
    { icon: Gavel, value: casos.filter(c => c.tipo === 'constitucionalidad').length, label: 'Inconstitucionalidades' },
    { icon: CheckCircle, value: casos.filter(c => c.estado === 'sentencia').length, label: 'Sentenciados' }
  ];

  const alerts = [
    {
      icon: Crown,
      message: 'Sistema de gestión de casos constitucionales para el seguimiento y control de procesos ante la Corte Constitucional.'
    }
  ];

  const breadcrumbs = ['Inicio', 'Justicia', 'Justicia Extraordinaria', 'Constitucional'];

  return (
    <PageTemplate
      title="Justicia Constitucional"
      subtitle="Gestión de casos constitucionales"
      description="Sistema integral para la gestión, seguimiento y control de casos constitucionales ante la Corte Constitucional, incluyendo tutelas, demandas de inconstitucionalidad, unificación de jurisprudencia y otras acciones constitucionales."
      icon="👑"
      category="Justicia Extraordinaria"
      color="purple"
      stats={stats}
      alerts={alerts}
      breadcrumbs={breadcrumbs}
    >
      <Tabs defaultValue="casos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="casos">Casos</TabsTrigger>
          <TabsTrigger value="nuevo">Nueva Acción</TabsTrigger>
          <TabsTrigger value="tipos">Tipos de Acción</TabsTrigger>
          <TabsTrigger value="corte">Corte Constitucional</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          <TabsTrigger value="reportes">Reportes</TabsTrigger>
        </TabsList>

        {/* Tab de Casos */}
        <TabsContent value="casos" className="space-y-6">
          {/* Filtros y Búsqueda */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="busqueda">Buscar</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="busqueda"
                  placeholder="Buscar por número, accionante o accionado..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="filtro-tipo">Tipo de Acción</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  {tiposAccion.map(tipo => (
                    <SelectItem key={tipo.id} value={tipo.id}>
                      {tipo.icono} {tipo.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="filtro-estado">Estado</Label>
              <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  {estados.map(estado => (
                    <SelectItem key={estado.id} value={estado.id}>
                      {estado.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de Casos */}
          <div className="grid gap-6">
            {casosFiltrados.map(caso => (
              <Card key={caso.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Crown className="h-6 w-6 text-purple-600" />
                        <div>
                          <CardTitle className="text-xl">{caso.numero}</CardTitle>
                          <p className="text-sm text-gray-600">{caso.descripcion}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Accionante:</p>
                          <p className="text-sm text-gray-600">{caso.accionante}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Accionado:</p>
                          <p className="text-sm text-gray-600">{caso.accionado}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Magistrado:</p>
                          <p className="text-sm text-gray-600">{caso.magistrado}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Ponente:</p>
                          <p className="text-sm text-gray-600">{caso.ponente}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getTipoColor(caso.tipo)}>
                          {tiposAccion.find(t => t.id === caso.tipo)?.icono} {tiposAccion.find(t => t.id === caso.tipo)?.nombre}
                        </Badge>
                        <Badge className={getEstadoColor(caso.estado)}>
                          {caso.estado.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getUrgenciaColor(caso.urgencia)}>
                          {caso.urgencia.toUpperCase()}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{caso.diasTranscurridos} días</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>{caso.documentos.length} documentos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4" />
                          <span>{caso.secretario}</span>
                        </div>
                        {caso.proximaAudiencia && (
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Próxima: {caso.proximaAudiencia}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => manejarEdicion(caso)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generarReporte(caso)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => manejarEliminacion(caso.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Nueva Acción */}
        <TabsContent value="nuevo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Acción Constitucional</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={manejarEnvio} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="numero">Número de Caso</Label>
                    <Input
                      id="numero"
                      value={nuevoCaso.numero}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, numero: e.target.value})}
                      placeholder="T-123456, C-789012, SU-345678"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tipo">Tipo de Acción</Label>
                    <Select 
                      value={nuevoCaso.tipo} 
                      onValueChange={(value) => setNuevoCaso({...nuevoCaso, tipo: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposAccion.map(tipo => (
                          <SelectItem key={tipo.id} value={tipo.id}>
                            {tipo.icono} {tipo.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="accionante">Accionante</Label>
                    <Input
                      id="accionante"
                      value={nuevoCaso.accionante}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, accionante: e.target.value})}
                      placeholder="Nombre del accionante"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="accionado">Accionado</Label>
                    <Input
                      id="accionado"
                      value={nuevoCaso.accionado}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, accionado: e.target.value})}
                      placeholder="Nombre del accionado"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fecha-radicacion">Fecha de Radicación</Label>
                    <Input
                      id="fecha-radicacion"
                      type="date"
                      value={nuevoCaso.fechaRadicacion}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, fechaRadicacion: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="magistrado">Magistrado</Label>
                    <Input
                      id="magistrado"
                      value={nuevoCaso.magistrado}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, magistrado: e.target.value})}
                      placeholder="Nombre del magistrado"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción de la Acción</Label>
                  <Textarea
                    id="descripcion"
                    value={nuevoCaso.descripcion}
                    onChange={(e) => setNuevoCaso({...nuevoCaso, descripcion: e.target.value})}
                    placeholder="Describa los hechos y fundamentos de la acción"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="ponente">Ponente</Label>
                    <Input
                      id="ponente"
                      value={nuevoCaso.ponente}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, ponente: e.target.value})}
                      placeholder="Nombre del ponente"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="secretario">Secretario</Label>
                    <Input
                      id="secretario"
                      value={nuevoCaso.secretario}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, secretario: e.target.value})}
                      placeholder="Nombre del secretario"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Acción
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Tipos de Acción */}
        <TabsContent value="tipos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiposAccion.map(tipo => (
              <Card key={tipo.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{tipo.icono}</span>
                    <span>{tipo.nombre}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Acciones constitucionales de {tipo.nombre.toLowerCase()}</p>
                    <div className="mt-2 space-y-1">
                      <Badge className={tipo.color}>
                        {casos.filter(c => c.tipo === tipo.id).length} casos
                      </Badge>
                      <Badge className={getUrgenciaColor(tipo.urgencia)}>
                        {tipo.urgencia.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Corte Constitucional */}
        <TabsContent value="corte" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Corte Constitucional de Colombia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Magistrados</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-purple-600" />
                      <span>Dr. Alejandro Linares Cantillo</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-purple-600" />
                      <span>Dra. Diana Fajardo Rivera</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-purple-600" />
                      <span>Dr. José Fernando Reyes Cuartas</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Competencias</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Acción de tutela</li>
                    <li>• Demanda de inconstitucionalidad</li>
                    <li>• Unificación de jurisprudencia</li>
                    <li>• Revisión de tutelas</li>
                    <li>• Acción de cumplimiento</li>
                    <li>• Acción popular y de grupo</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Estadísticas */}
        <TabsContent value="estadisticas" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Scale className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{casos.length}</p>
                    <p className="text-sm text-gray-600">Total Casos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Shield className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{casos.filter(c => c.tipo === 'tutela').length}</p>
                    <p className="text-sm text-gray-600">Tutelas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Gavel className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">{casos.filter(c => c.tipo === 'constitucionalidad').length}</p>
                    <p className="text-sm text-gray-600">Inconstitucionalidades</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{casos.filter(c => c.estado === 'sentencia').length}</p>
                    <p className="text-sm text-gray-600">Sentenciados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab de Reportes */}
        <TabsContent value="reportes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generar Reportes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <FileText className="h-6 w-6" />
                  <span>Reporte General</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Calendar className="h-6 w-6" />
                  <span>Reporte por Período</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Scale className="h-6 w-6" />
                  <span>Reporte por Magistrado</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Crown className="h-6 w-6" />
                  <span>Reporte Constitucional</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default JusticiaConstitucional;
