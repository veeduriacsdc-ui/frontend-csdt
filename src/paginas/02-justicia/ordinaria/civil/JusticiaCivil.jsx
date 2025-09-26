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
  DollarSign,
  MapPin,
  Phone,
  Mail,
  Building
} from 'lucide-react';

const JusticiaCivil = () => {
  const [casos, setCasos] = useState([]);
  const [tiposCaso, setTiposCaso] = useState([]);
  const [estados, setEstados] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoCaso, setNuevoCaso] = useState({
    numero: '',
    demandante: '',
    demandado: '',
    tipo: 'contratos',
    monto: '',
    descripcion: '',
    fechaInicio: '',
    estado: 'iniciado',
    juzgado: '',
    juez: '',
    abogado: '',
    documentos: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const casosSimulados = [
      {
        id: 'civil_001',
        numero: 'CIV-2024-001',
        demandante: 'María González',
        demandado: 'Constructora ABC S.A.S.',
        tipo: 'contratos',
        monto: 50000000,
        descripcion: 'Incumplimiento de contrato de construcción',
        fechaInicio: '2024-01-15',
        estado: 'en_tramite',
        juzgado: 'Juzgado 1 Civil del Circuito',
        juez: 'Dr. Carlos Mendoza',
        abogado: 'Dr. Ana Rodríguez',
        documentos: ['demanda.pdf', 'contrato.pdf'],
        diasTranscurridos: 45,
        proximaAudiencia: '2024-03-15'
      },
      {
        id: 'civil_002',
        numero: 'CIV-2024-002',
        demandante: 'José Pérez',
        demandado: 'Banco XYZ',
        tipo: 'credito',
        monto: 150000000,
        descripcion: 'Reclamación por cobro indebido',
        fechaInicio: '2024-02-10',
        estado: 'sentencia',
        juzgado: 'Juzgado 2 Civil del Circuito',
        juez: 'Dra. Laura Silva',
        abogado: 'Dr. Miguel Torres',
        documentos: ['demanda.pdf', 'extractos.pdf'],
        diasTranscurridos: 30,
        proximaAudiencia: null
      },
      {
        id: 'civil_003',
        numero: 'CIV-2024-003',
        demandante: 'Empresa DEF Ltda.',
        demandado: 'Juan Martínez',
        tipo: 'daños',
        monto: 25000000,
        descripcion: 'Daños y perjuicios por incumplimiento',
        fechaInicio: '2024-01-20',
        estado: 'iniciado',
        juzgado: 'Juzgado 3 Civil del Circuito',
        juez: 'Dr. Roberto Vega',
        abogado: 'Dra. Carmen López',
        documentos: ['demanda.pdf'],
        diasTranscurridos: 50,
        proximaAudiencia: '2024-03-20'
      }
    ];

    const tiposSimulados = [
      { id: 'contratos', nombre: 'Contratos', icono: '📋', color: 'bg-blue-100 text-blue-800' },
      { id: 'credito', nombre: 'Crédito', icono: '💰', color: 'bg-green-100 text-green-800' },
      { id: 'daños', nombre: 'Daños y Perjuicios', icono: '⚖️', color: 'bg-red-100 text-red-800' },
      { id: 'propiedad', nombre: 'Propiedad', icono: '🏠', color: 'bg-purple-100 text-purple-800' },
      { id: 'familia', nombre: 'Familia', icono: '👨‍👩‍👧‍👦', color: 'bg-pink-100 text-pink-800' },
      { id: 'sucesiones', nombre: 'Sucesiones', icono: '📜', color: 'bg-yellow-100 text-yellow-800' }
    ];

    const estadosSimulados = [
      { id: 'iniciado', nombre: 'Iniciado', color: 'bg-blue-100 text-blue-800' },
      { id: 'en_tramite', nombre: 'En Trámite', color: 'bg-yellow-100 text-yellow-800' },
      { id: 'sentencia', nombre: 'Sentencia', color: 'bg-green-100 text-green-800' },
      { id: 'apelacion', nombre: 'Apelación', color: 'bg-orange-100 text-orange-800' },
      { id: 'archivado', nombre: 'Archivado', color: 'bg-gray-100 text-gray-800' }
    ];

    setCasos(casosSimulados);
    setTiposCaso(tiposSimulados);
    setEstados(estadosSimulados);
  };

  const getTipoColor = (tipo) => {
    const tipoObj = tiposCaso.find(t => t.id === tipo);
    return tipoObj ? tipoObj.color : 'bg-gray-100 text-gray-800';
  };

  const getEstadoColor = (estado) => {
    const estadoObj = estados.find(e => e.id === estado);
    return estadoObj ? estadoObj.color : 'bg-gray-100 text-gray-800';
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Enviando caso civil:', nuevoCaso);
    // Aquí se implementaría la lógica de envío
  };

  const manejarEdicion = (caso) => {
    setNuevoCaso(caso);
  };

  const manejarEliminacion = (id) => {
    setCasos(casos.filter(c => c.id !== id));
  };

  const generarReporte = (caso) => {
    console.log('Generando reporte para caso:', caso.numero);
  };

  const casosFiltrados = casos.filter(caso => {
    const cumpleTipo = filtroTipo === 'todos' || caso.tipo === filtroTipo;
    const cumpleEstado = filtroEstado === 'todos' || caso.estado === filtroEstado;
    const cumpleBusqueda = busqueda === '' || 
      caso.numero.toLowerCase().includes(busqueda.toLowerCase()) ||
      caso.demandante.toLowerCase().includes(busqueda.toLowerCase()) ||
      caso.demandado.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleTipo && cumpleEstado && cumpleBusqueda;
  });

  const stats = [
    { icon: Scale, value: casos.length, label: 'Total Casos' },
    { icon: Clock, value: casos.filter(c => c.estado === 'en_tramite').length, label: 'En Trámite' },
    { icon: CheckCircle, value: casos.filter(c => c.estado === 'sentencia').length, label: 'Sentenciados' },
    { icon: DollarSign, value: `$${casos.reduce((acc, c) => acc + c.monto, 0).toLocaleString()}`, label: 'Monto Total' }
  ];

  const alerts = [
    {
      icon: Scale,
      message: 'Sistema de gestión de casos civiles para el seguimiento y control de procesos judiciales ordinarios.'
    }
  ];

  const breadcrumbs = ['Inicio', 'Justicia', 'Justicia Ordinaria', 'Civil'];

  return (
    <PageTemplate
      title="Justicia Civil"
      subtitle="Gestión de casos civiles ordinarios"
      description="Sistema integral para la gestión, seguimiento y control de casos civiles en la justicia ordinaria, incluyendo contratos, créditos, daños y perjuicios, propiedad y otros asuntos civiles."
      icon="⚖️"
      category="Justicia Ordinaria"
      color="red"
      stats={stats}
      alerts={alerts}
      breadcrumbs={breadcrumbs}
    >
      <Tabs defaultValue="casos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="casos">Casos</TabsTrigger>
          <TabsTrigger value="nuevo">Nuevo Caso</TabsTrigger>
          <TabsTrigger value="tipos">Tipos de Caso</TabsTrigger>
          <TabsTrigger value="juzgados">Juzgados</TabsTrigger>
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
                  placeholder="Buscar por número, demandante o demandado..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="filtro-tipo">Tipo de Caso</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  {tiposCaso.map(tipo => (
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
                        <Gavel className="h-6 w-6 text-red-600" />
                        <div>
                          <CardTitle className="text-xl">{caso.numero}</CardTitle>
                          <p className="text-sm text-gray-600">{caso.descripcion}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Demandante:</p>
                          <p className="text-sm text-gray-600">{caso.demandante}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Demandado:</p>
                          <p className="text-sm text-gray-600">{caso.demandado}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Juzgado:</p>
                          <p className="text-sm text-gray-600">{caso.juzgado}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Juez:</p>
                          <p className="text-sm text-gray-600">{caso.juez}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getTipoColor(caso.tipo)}>
                          {tiposCaso.find(t => t.id === caso.tipo)?.icono} {tiposCaso.find(t => t.id === caso.tipo)?.nombre}
                        </Badge>
                        <Badge className={getEstadoColor(caso.estado)}>
                          {caso.estado.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge variant="outline">
                          ${caso.monto.toLocaleString()}
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
                          <span>{caso.abogado}</span>
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

        {/* Tab de Nuevo Caso */}
        <TabsContent value="nuevo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nuevo Caso Civil</CardTitle>
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
                      placeholder="CIV-2024-XXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tipo">Tipo de Caso</Label>
                    <Select 
                      value={nuevoCaso.tipo} 
                      onValueChange={(value) => setNuevoCaso({...nuevoCaso, tipo: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposCaso.map(tipo => (
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
                    <Label htmlFor="demandante">Demandante</Label>
                    <Input
                      id="demandante"
                      value={nuevoCaso.demandante}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, demandante: e.target.value})}
                      placeholder="Nombre del demandante"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="demandado">Demandado</Label>
                    <Input
                      id="demandado"
                      value={nuevoCaso.demandado}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, demandado: e.target.value})}
                      placeholder="Nombre del demandado"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="monto">Monto (COP)</Label>
                    <Input
                      id="monto"
                      type="number"
                      value={nuevoCaso.monto}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, monto: e.target.value})}
                      placeholder="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                    <Input
                      id="fecha-inicio"
                      type="date"
                      value={nuevoCaso.fechaInicio}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, fechaInicio: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="juzgado">Juzgado</Label>
                    <Input
                      id="juzgado"
                      value={nuevoCaso.juzgado}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, juzgado: e.target.value})}
                      placeholder="Nombre del juzgado"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción del Caso</Label>
                  <Textarea
                    id="descripcion"
                    value={nuevoCaso.descripcion}
                    onChange={(e) => setNuevoCaso({...nuevoCaso, descripcion: e.target.value})}
                    placeholder="Describa los hechos del caso"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="juez">Juez</Label>
                    <Input
                      id="juez"
                      value={nuevoCaso.juez}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, juez: e.target.value})}
                      placeholder="Nombre del juez"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="abogado">Abogado</Label>
                    <Input
                      id="abogado"
                      value={nuevoCaso.abogado}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, abogado: e.target.value})}
                      placeholder="Nombre del abogado"
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
                    Crear Caso
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Tipos de Caso */}
        <TabsContent value="tipos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiposCaso.map(tipo => (
              <Card key={tipo.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{tipo.icono}</span>
                    <span>{tipo.nombre}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Casos relacionados con {tipo.nombre.toLowerCase()}</p>
                    <div className="mt-2">
                      <Badge className={tipo.color}>
                        {casos.filter(c => c.tipo === tipo.id).length} casos
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Juzgados */}
        <TabsContent value="juzgados" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Juzgados Civiles del Circuito</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Juzgados Especializados</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span>Juzgado 1 Civil del Circuito</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span>Juzgado 2 Civil del Circuito</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-blue-600" />
                      <span>Juzgado 3 Civil del Circuito</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Competencias</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Contratos civiles y comerciales</li>
                    <li>• Créditos y obligaciones</li>
                    <li>• Daños y perjuicios</li>
                    <li>• Propiedad y posesión</li>
                    <li>• Sucesiones</li>
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
                  <Scale className="h-8 w-8 text-red-600" />
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
                  <Clock className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">{casos.filter(c => c.estado === 'en_tramite').length}</p>
                    <p className="text-sm text-gray-600">En Trámite</p>
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
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">${(casos.reduce((acc, c) => acc + c.monto, 0) / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-gray-600">Monto Promedio</p>
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
                  <span>Reporte por Juzgado</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Users className="h-6 w-6" />
                  <span>Reporte por Abogado</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default JusticiaCivil;
