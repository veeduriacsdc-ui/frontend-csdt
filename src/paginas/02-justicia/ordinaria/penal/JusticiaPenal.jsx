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
  Eye,
  Lock
} from 'lucide-react';

const JusticiaPenal = () => {
  const [casos, setCasos] = useState([]);
  const [tiposDelito, setTiposDelito] = useState([]);
  const [estados, setEstados] = useState([]);
  const [filtroTip, setFiltroTip] = useState('todos');
  const [filtroEst, setFiltroEst] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoCaso, setNuevoCaso] = useState({
    num: '',
    imp: '',
    vic: '',
    tip: 'hurto',
    des: '',
    fec_hec: '',
    est: 'investigacion',
    fis: '',
    fis_nom: '',
    def: '',
    jue: '',
    doc: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const casosSimulados = [
      {
        id: 'penal_001',
        numero: 'PEN-2024-001',
        imputado: 'Carlos Rodríguez',
        victima: 'María González',
        tipo: 'hurto',
        descripcion: 'Hurto calificado de celular en vía pública',
        fechaHecho: '2024-01-15',
        estado: 'investigacion',
        fiscalia: 'Fiscalía 1 Seccional',
        fiscal: 'Dr. Ana Martínez',
        defensor: 'Dr. Luis Pérez',
        juez: 'Dr. Roberto Silva',
        documentos: ['denuncia.pdf', 'pruebas.pdf'],
        diasTranscurridos: 30,
        proximaAudiencia: '2024-03-15',
        gravedad: 'media'
      },
      {
        id: 'penal_002',
        numero: 'PEN-2024-002',
        imputado: 'José García',
        victima: 'Empresa ABC S.A.S.',
        tipo: 'fraude',
        descripcion: 'Fraude en proceso de contratación',
        fechaHecho: '2024-02-10',
        estado: 'acusacion',
        fiscalia: 'Fiscalía 2 Seccional',
        fiscal: 'Dra. Carmen López',
        defensor: 'Dr. Miguel Torres',
        juez: 'Dra. Laura Vega',
        documentos: ['denuncia.pdf', 'peritaje.pdf'],
        diasTranscurridos: 45,
        proximaAudiencia: '2024-03-20',
        gravedad: 'alta'
      },
      {
        id: 'penal_003',
        numero: 'PEN-2024-003',
        imputado: 'Pedro Sánchez',
        victima: 'Juan Martínez',
        tipo: 'lesiones',
        descripcion: 'Lesiones personales en riña',
        fechaHecho: '2024-01-20',
        estado: 'sentencia',
        fiscalia: 'Fiscalía 3 Seccional',
        fiscal: 'Dr. Carlos Mendoza',
        defensor: 'Dra. Ana Rodríguez',
        juez: 'Dr. Roberto Vega',
        documentos: ['denuncia.pdf', 'sentencia.pdf'],
        diasTranscurridos: 60,
        proximaAudiencia: null,
        gravedad: 'baja'
      }
    ];

    const tiposSimulados = [
      { id: 'hurto', nombre: 'Hurto', icono: '👜', color: 'bg-yellow-100 text-yellow-800', gravedad: 'media' },
      { id: 'fraude', nombre: 'Fraude', icono: '💳', color: 'bg-red-100 text-red-800', gravedad: 'alta' },
      { id: 'lesiones', nombre: 'Lesiones', icono: '🤕', color: 'bg-orange-100 text-orange-800', gravedad: 'media' },
      { id: 'homicidio', nombre: 'Homicidio', icono: '⚰️', color: 'bg-red-100 text-red-800', gravedad: 'alta' },
      { id: 'violencia', nombre: 'Violencia Intrafamiliar', icono: '👨‍👩‍👧‍👦', color: 'bg-pink-100 text-pink-800', gravedad: 'alta' },
      { id: 'narcotrafico', nombre: 'Narcotráfico', icono: '💊', color: 'bg-purple-100 text-purple-800', gravedad: 'alta' },
      { id: 'corrupcion', nombre: 'Corrupción', icono: '🏛️', color: 'bg-gray-100 text-gray-800', gravedad: 'alta' }
    ];

    const estadosSimulados = [
      { id: 'investigacion', nombre: 'Investigación', color: 'bg-blue-100 text-blue-800' },
      { id: 'acusacion', nombre: 'Acusación', color: 'bg-yellow-100 text-yellow-800' },
      { id: 'juzgamiento', nombre: 'Juzgamiento', color: 'bg-orange-100 text-orange-800' },
      { id: 'sentencia', nombre: 'Sentencia', color: 'bg-green-100 text-green-800' },
      { id: 'apelacion', nombre: 'Apelación', color: 'bg-purple-100 text-purple-800' },
      { id: 'archivado', nombre: 'Archivado', color: 'bg-gray-100 text-gray-800' }
    ];

    setCasos(casosSimulados);
    setTiposDelito(tiposSimulados);
    setEstados(estadosSimulados);
  };

  const getTipoColor = (tipo) => {
    const tipoObj = tiposDelito.find(t => t.id === tipo);
    return tipoObj ? tipoObj.color : 'bg-gray-100 text-gray-800';
  };

  const getEstadoColor = (estado) => {
    const estadoObj = estados.find(e => e.id === estado);
    return estadoObj ? estadoObj.color : 'bg-gray-100 text-gray-800';
  };

  const getGravedadColor = (gravedad) => {
    switch (gravedad) {
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
      caso.imputado.toLowerCase().includes(busqueda.toLowerCase()) ||
      caso.victima.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleTipo && cumpleEstado && cumpleBusqueda;
  });

  const stats = [
    { icon: Scale, value: casos.length, label: 'Total Casos' },
    { icon: Eye, value: casos.filter(c => c.estado === 'investigacion').length, label: 'En Investigación' },
    { icon: Gavel, value: casos.filter(c => c.estado === 'juzgamiento').length, label: 'En Juzgamiento' },
    { icon: CheckCircle, value: casos.filter(c => c.estado === 'sentencia').length, label: 'Sentenciados' }
  ];

  const alerts = [
    {
      icon: Shield,
      message: 'Sistema de gestión de casos penales para el seguimiento y control de procesos judiciales en materia criminal.'
    }
  ];

  const breadcrumbs = ['Inicio', 'Justicia', 'Justicia Ordinaria', 'Penal'];

  return (
    <PageTemplate
      title="Justicia Penal"
      subtitle="Gestión de casos penales ordinarios"
      description="Sistema integral para la gestión, seguimiento y control de casos penales en la justicia ordinaria, incluyendo delitos contra la vida, integridad personal, patrimonio y otros delitos tipificados en el Código Penal."
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
          <TabsTrigger value="tipos">Tipos de Delito</TabsTrigger>
          <TabsTrigger value="fiscalias">Fiscalías</TabsTrigger>
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
                  placeholder="Buscar por número, imputado o víctima..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="filtro-tipo">Tipo de Delito</Label>
              <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los tipos</SelectItem>
                  {tiposDelito.map(tipo => (
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
                        <Shield className="h-6 w-6 text-red-600" />
                        <div>
                          <CardTitle className="text-xl">{caso.numero}</CardTitle>
                          <p className="text-sm text-gray-600">{caso.descripcion}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Imputado:</p>
                          <p className="text-sm text-gray-600">{caso.imputado}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Víctima:</p>
                          <p className="text-sm text-gray-600">{caso.victima}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Fiscalía:</p>
                          <p className="text-sm text-gray-600">{caso.fiscalia}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Fiscal:</p>
                          <p className="text-sm text-gray-600">{caso.fiscal}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getTipoColor(caso.tipo)}>
                          {tiposDelito.find(t => t.id === caso.tipo)?.icono} {tiposDelito.find(t => t.id === caso.tipo)?.nombre}
                        </Badge>
                        <Badge className={getEstadoColor(caso.estado)}>
                          {caso.estado.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Badge className={getGravedadColor(caso.gravedad)}>
                          {caso.gravedad.toUpperCase()}
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
                          <span>{caso.defensor}</span>
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
              <CardTitle>Nuevo Caso Penal</CardTitle>
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
                      placeholder="PEN-2024-XXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tipo">Tipo de Delito</Label>
                    <Select 
                      value={nuevoCaso.tipo} 
                      onValueChange={(value) => setNuevoCaso({...nuevoCaso, tipo: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposDelito.map(tipo => (
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
                    <Label htmlFor="imputado">Imputado</Label>
                    <Input
                      id="imputado"
                      value={nuevoCaso.imputado}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, imputado: e.target.value})}
                      placeholder="Nombre del imputado"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="victima">Víctima</Label>
                    <Input
                      id="victima"
                      value={nuevoCaso.victima}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, victima: e.target.value})}
                      placeholder="Nombre de la víctima"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fecha-hecho">Fecha del Hecho</Label>
                    <Input
                      id="fecha-hecho"
                      type="date"
                      value={nuevoCaso.fechaHecho}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, fechaHecho: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="fiscalia">Fiscalía</Label>
                    <Input
                      id="fiscalia"
                      value={nuevoCaso.fiscalia}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, fiscalia: e.target.value})}
                      placeholder="Nombre de la fiscalía"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="descripcion">Descripción del Hecho</Label>
                  <Textarea
                    id="descripcion"
                    value={nuevoCaso.descripcion}
                    onChange={(e) => setNuevoCaso({...nuevoCaso, descripcion: e.target.value})}
                    placeholder="Describa los hechos del delito"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="fiscal">Fiscal</Label>
                    <Input
                      id="fiscal"
                      value={nuevoCaso.fiscal}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, fiscal: e.target.value})}
                      placeholder="Nombre del fiscal"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="defensor">Defensor</Label>
                    <Input
                      id="defensor"
                      value={nuevoCaso.defensor}
                      onChange={(e) => setNuevoCaso({...nuevoCaso, defensor: e.target.value})}
                      placeholder="Nombre del defensor"
                      required
                    />
                  </div>
                  
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

        {/* Tab de Tipos de Delito */}
        <TabsContent value="tipos" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tiposDelito.map(tipo => (
              <Card key={tipo.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <span className="text-2xl">{tipo.icono}</span>
                    <span>{tipo.nombre}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    <p>Delitos relacionados con {tipo.nombre.toLowerCase()}</p>
                    <div className="mt-2 space-y-1">
                      <Badge className={tipo.color}>
                        {casos.filter(c => c.tipo === tipo.id).length} casos
                      </Badge>
                      <Badge className={getGravedadColor(tipo.gravedad)}>
                        {tipo.gravedad.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Fiscalías */}
        <TabsContent value="fiscalias" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fiscalías Generales de la Nación</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Fiscalías Seccionales</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-red-600" />
                      <span>Fiscalía 1 Seccional</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-red-600" />
                      <span>Fiscalía 2 Seccional</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-red-600" />
                      <span>Fiscalía 3 Seccional</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Competencias</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Investigación de delitos</li>
                    <li>• Acusación ante juzgados</li>
                    <li>• Seguimiento de procesos</li>
                    <li>• Protección de víctimas</li>
                    <li>• Coordinación con autoridades</li>
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
                  <Eye className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{casos.filter(c => c.estado === 'investigacion').length}</p>
                    <p className="text-sm text-gray-600">En Investigación</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Gavel className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">{casos.filter(c => c.estado === 'juzgamiento').length}</p>
                    <p className="text-sm text-gray-600">En Juzgamiento</p>
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
                  <span>Reporte por Fiscalía</span>
                </Button>
                <Button className="h-20 flex flex-col items-center justify-center space-y-2">
                  <Shield className="h-6 w-6" />
                  <span>Reporte de Seguridad</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default JusticiaPenal;
