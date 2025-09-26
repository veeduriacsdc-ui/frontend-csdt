import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Badge } from '../../components/ui/badge';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  MapPin, 
  Users, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Download,
  Heart,
  Shield,
  Star,
  Calendar,
  Globe,
  BookOpen,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Gavel,
  TreePine,
  Mountain,
  Pickaxe,
  Factory
} from 'lucide-react';

const ControlMineriaPredios = () => {
  const [predios, setPredios] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [filtroRegion, setFiltroRegion] = useState('todas');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoPredio, setNuevoPredio] = useState({
    nombre: '',
    ubicacion: '',
    region: '',
    tipoActividad: 'mineria_legal',
    estado: 'activo',
    area: '',
    propietario: '',
    licencia: '',
    fechaInicio: '',
    fechaFin: '',
    coordenadas: '',
    observaciones: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const prediosSimulados = [
      {
        id: 'predio_001',
        nombre: 'Mina El Cerrejón - Sector Norte',
        ubicacion: 'La Guajira, Colombia',
        region: 'bajo_cauca',
        tipoActividad: 'mineria_legal',
        estado: 'activo',
        area: '15000',
        propietario: 'Carbones del Cerrejón',
        licencia: 'LIC-001-2020',
        fechaInicio: '2020-01-15',
        fechaFin: '2030-01-15',
        coordenadas: '11.2408, -72.2110',
        observaciones: 'Operación minera a cielo abierto',
        irregularidades: 0,
        inspecciones: 12,
        multas: 0
      },
      {
        id: 'predio_002',
        nombre: 'Explotación Ilegal - Río Cauca',
        ubicacion: 'Cauca, Colombia',
        region: 'cordoba',
        tipoActividad: 'mineria_ilegal',
        estado: 'irregular',
        area: '500',
        propietario: 'Desconocido',
        licencia: 'Sin licencia',
        fechaInicio: '2023-06-01',
        fechaFin: '',
        coordenadas: '2.4448, -76.6147',
        observaciones: 'Actividad minera sin licencia',
        irregularidades: 5,
        inspecciones: 3,
        multas: 2
      },
      {
        id: 'predio_003',
        nombre: 'Proyecto Minero San Jorge',
        ubicacion: 'Córdoba, Colombia',
        region: 'san_jorge',
        tipoActividad: 'exploracion',
        estado: 'en_tramite',
        area: '8000',
        propietario: 'Minera San Jorge S.A.S',
        licencia: 'LIC-003-2023',
        fechaInicio: '2023-03-01',
        fechaFin: '2025-03-01',
        coordenadas: '8.7500, -75.8833',
        observaciones: 'Proyecto en fase de exploración',
        irregularidades: 1,
        inspecciones: 6,
        multas: 0
      }
    ];

    const regionesSimuladas = [
      { id: 'bajo_cauca', nombre: 'Bajo Cauca', departamento: 'Antioquia' },
      { id: 'nordeste_antioquia', nombre: 'Nordeste de Antioquia', departamento: 'Antioquia' },
      { id: 'norte_antioquia', nombre: 'Norte de Antioquia', departamento: 'Antioquia' },
      { id: 'cordoba', nombre: 'Córdoba', departamento: 'Córdoba' },
      { id: 'san_jorge', nombre: 'San Jorge', departamento: 'Sucre' },
      { id: 'sur_colombia', nombre: 'Sur de Colombia', departamento: 'Nariño' }
    ];

    setPredios(prediosSimulados);
    setRegiones(regionesSimuladas);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'suspendido': return 'bg-yellow-100 text-yellow-800';
      case 'cancelado': return 'bg-red-100 text-red-800';
      case 'en_tramite': return 'bg-blue-100 text-blue-800';
      case 'irregular': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'mineria_legal': return 'bg-green-100 text-green-800';
      case 'mineria_ilegal': return 'bg-red-100 text-red-800';
      case 'exploracion': return 'bg-blue-100 text-blue-800';
      case 'explotacion': return 'bg-purple-100 text-purple-800';
      case 'beneficio': return 'bg-orange-100 text-orange-800';
      case 'transporte': return 'bg-indigo-100 text-indigo-800';
      case 'comercializacion': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Enviando predio minero:', nuevoPredio);
  };

  const prediosFiltrados = predios.filter(predio => {
    const cumpleRegion = filtroRegion === 'todas' || predio.region === filtroRegion;
    const cumpleTipo = filtroTipo === 'todos' || predio.tipoActividad === filtroTipo;
    const cumpleEstado = filtroEstado === 'todos' || predio.estado === filtroEstado;
    const cumpleBusqueda = busqueda === '' || 
      predio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      predio.ubicacion.toLowerCase().includes(busqueda.toLowerCase()) ||
      predio.propietario.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleRegion && cumpleTipo && cumpleEstado && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Pickaxe className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Control de Minería en Predios
              </h1>
              <p className="text-gray-600 mt-1">
                Monitoreo y control de actividades mineras en predios del territorio nacional
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema monitorea y controla las actividades mineras para garantizar el cumplimiento de la normativa ambiental y minera.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="predios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="predios">Predios</TabsTrigger>
            <TabsTrigger value="nuevo">Nuevo Predio</TabsTrigger>
            <TabsTrigger value="regiones">Regiones</TabsTrigger>
            <TabsTrigger value="mapas">Mapas</TabsTrigger>
            <TabsTrigger value="irregularidades">Irregularidades</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Predios */}
          <TabsContent value="predios" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar predios..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="filtro-region">Región</Label>
                <Select value={filtroRegion} onValueChange={setFiltroRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar región" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las regiones</SelectItem>
                    {regiones.map(region => (
                      <SelectItem key={region.id} value={region.id}>
                        {region.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="filtro-tipo">Tipo de Actividad</Label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    <SelectItem value="mineria_legal">Minería Legal</SelectItem>
                    <SelectItem value="mineria_ilegal">Minería Ilegal</SelectItem>
                    <SelectItem value="exploracion">Exploración</SelectItem>
                    <SelectItem value="explotacion">Explotación</SelectItem>
                    <SelectItem value="beneficio">Beneficio</SelectItem>
                    <SelectItem value="transporte">Transporte</SelectItem>
                    <SelectItem value="comercializacion">Comercialización</SelectItem>
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
                    <SelectItem value="activo">Activo</SelectItem>
                    <SelectItem value="suspendido">Suspendido</SelectItem>
                    <SelectItem value="cancelado">Cancelado</SelectItem>
                    <SelectItem value="en_tramite">En Trámite</SelectItem>
                    <SelectItem value="irregular">Irregular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Predios */}
            <div className="grid gap-6">
              {prediosFiltrados.map(predio => (
                <Card key={predio.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{predio.nombre}</CardTitle>
                        <p className="text-gray-600 mb-4">{predio.ubicacion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(predio.estado)}>
                            {predio.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getTipoColor(predio.tipoActividad)}>
                            {predio.tipoActividad.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {predio.licencia}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{predio.area} hectáreas</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{predio.propietario}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{predio.irregularidades} irregularidades</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>{predio.inspecciones} inspecciones</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Observaciones:</p>
                          <p className="text-sm text-gray-600">{predio.observaciones}</p>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Coordenadas:</p>
                          <p className="text-sm text-gray-600 font-mono">{predio.coordenadas}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevoPredio(predio)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Nuevo Predio */}
          <TabsContent value="nuevo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuevo Predio Minero</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre del Predio</Label>
                      <Input
                        id="nombre"
                        value={nuevoPredio.nombre}
                        onChange={(e) => setNuevoPredio({...nuevoPredio, nombre: e.target.value})}
                        placeholder="Nombre del predio minero"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        value={nuevoPredio.ubicacion}
                        onChange={(e) => setNuevoPredio({...nuevoPredio, ubicacion: e.target.value})}
                        placeholder="Departamento, Colombia"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="region">Región</Label>
                      <Select 
                        value={nuevoPredio.region} 
                        onValueChange={(value) => setNuevoPredio({...nuevoPredio, region: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar región" />
                        </SelectTrigger>
                        <SelectContent>
                          {regiones.map(region => (
                            <SelectItem key={region.id} value={region.id}>
                              {region.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tipo-actividad">Tipo de Actividad</Label>
                      <Select 
                        value={nuevoPredio.tipoActividad} 
                        onValueChange={(value) => setNuevoPredio({...nuevoPredio, tipoActividad: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mineria_legal">Minería Legal</SelectItem>
                          <SelectItem value="mineria_ilegal">Minería Ilegal</SelectItem>
                          <SelectItem value="exploracion">Exploración</SelectItem>
                          <SelectItem value="explotacion">Explotación</SelectItem>
                          <SelectItem value="beneficio">Beneficio</SelectItem>
                          <SelectItem value="transporte">Transporte</SelectItem>
                          <SelectItem value="comercializacion">Comercialización</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select 
                        value={nuevoPredio.estado} 
                        onValueChange={(value) => setNuevoPredio({...nuevoPredio, estado: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="activo">Activo</SelectItem>
                          <SelectItem value="suspendido">Suspendido</SelectItem>
                          <SelectItem value="cancelado">Cancelado</SelectItem>
                          <SelectItem value="en_tramite">En Trámite</SelectItem>
                          <SelectItem value="irregular">Irregular</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="area">Área (hectáreas)</Label>
                      <Input
                        id="area"
                        type="number"
                        value={nuevoPredio.area}
                        onChange={(e) => setNuevoPredio({...nuevoPredio, area: e.target.value})}
                        placeholder="Área en hectáreas"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="propietario">Propietario/Operador</Label>
                      <Input
                        id="propietario"
                        value={nuevoPredio.propietario}
                        onChange={(e) => setNuevoPredio({...nuevoPredio, propietario: e.target.value})}
                        placeholder="Nombre del propietario o operador"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="licencia">Número de Licencia</Label>
                      <Input
                        id="licencia"
                        value={nuevoPredio.licencia}
                        onChange={(e) => setNuevoPredio({...nuevoPredio, licencia: e.target.value})}
                        placeholder="Número de licencia"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                      <Input
                        id="fecha-inicio"
                        type="date"
                        value={nuevoPredio.fechaInicio}
                        onChange={(e) => setNuevoPredio({...nuevoPredio, fechaInicio: e.target.value})}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha-fin">Fecha de Fin</Label>
                      <Input
                        id="fecha-fin"
                        type="date"
                        value={nuevoPredio.fechaFin}
                        onChange={(e) => setNuevoPredio({...nuevoPredio, fechaFin: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="coordenadas">Coordenadas (lat, lng)</Label>
                    <Input
                      id="coordenadas"
                      value={nuevoPredio.coordenadas}
                      onChange={(e) => setNuevoPredio({...nuevoPredio, coordenadas: e.target.value})}
                      placeholder="Ej: 11.2408, -72.2110"
                    />
                  </div>

                  <div>
                    <Label htmlFor="observaciones">Observaciones</Label>
                    <Textarea
                      id="observaciones"
                      value={nuevoPredio.observaciones}
                      onChange={(e) => setNuevoPredio({...nuevoPredio, observaciones: e.target.value})}
                      placeholder="Observaciones adicionales"
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Predio
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Regiones */}
          <TabsContent value="regiones" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regiones.map(region => (
                <Card key={region.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span>{region.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{region.departamento}</span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline">
                          {predios.filter(p => p.region === region.id).length} predios
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Mapas */}
          <TabsContent value="mapas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapa de Predios Mineros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Mapa interactivo de predios mineros</p>
                    <p className="text-sm text-gray-400 mt-2">Integración con servicios de mapas en desarrollo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Irregularidades */}
          <TabsContent value="irregularidades" className="space-y-6">
            <div className="grid gap-6">
              {predios.filter(p => p.irregularidades > 0).map(predio => (
                <Card key={predio.id} className="border-red-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-red-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>{predio.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{predio.ubicacion}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-red-600 font-medium">
                          {predio.irregularidades} irregularidades detectadas
                        </span>
                        <span className="text-gray-500">
                          {predio.inspecciones} inspecciones realizadas
                        </span>
                        <span className="text-orange-600">
                          {predio.multas} multas aplicadas
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Estadísticas */}
          <TabsContent value="estadisticas" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Pickaxe className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">{predios.length}</p>
                      <p className="text-sm text-gray-600">Total Predios</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {predios.filter(p => p.estado === 'activo').length}
                      </p>
                      <p className="text-sm text-gray-600">Activos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {predios.reduce((acc, p) => acc + p.irregularidades, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Irregularidades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {predios.reduce((acc, p) => acc + p.inspecciones, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Inspecciones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ControlMineriaPredios;
