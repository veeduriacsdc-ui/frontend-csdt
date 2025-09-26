import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
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
  Mountain
} from 'lucide-react';

const TerritoriosAncestrales = () => {
  const [territorios, setTerritorios] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [filtroComunidad, setFiltroComunidad] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoTerritorio, setNuevoTerritorio] = useState({
    nombre: '',
    descripcion: '',
    comunidad: '',
    area: '',
    ubicacion: '',
    tipo: 'resguardo',
    estado: 'reconocido',
    fechaReconocimiento: '',
    documentos: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const territoriosSimulados = [
      {
        id: 'territorio_001',
        nombre: 'Resguardo Indígena Nasa',
        descripcion: 'Territorio ancestral del pueblo Nasa en el departamento del Cauca',
        comunidad: 'nasa',
        area: '15000',
        ubicacion: 'Cauca, Colombia',
        tipo: 'resguardo',
        estado: 'reconocido',
        fechaReconocimiento: '1990-05-15',
        documentos: ['resolucion_001.pdf', 'titulo_colectivo.pdf'],
        poblacion: 15000,
        hectareas: 15000,
        amenazas: 3,
        proyectos: 2
      },
      {
        id: 'territorio_002',
        nombre: 'Territorio Colectivo Afrocolombiano',
        descripcion: 'Territorio ancestral de comunidades afrocolombianas en el Pacífico',
        comunidad: 'afrocolombiana',
        area: '25000',
        ubicacion: 'Chocó, Colombia',
        tipo: 'territorio_colectivo',
        estado: 'reconocido',
        fechaReconocimiento: '1995-08-20',
        documentos: ['titulo_colectivo_afro.pdf', 'resolucion_002.pdf'],
        poblacion: 25000,
        hectareas: 25000,
        amenazas: 5,
        proyectos: 1
      },
      {
        id: 'territorio_003',
        nombre: 'Resguardo Wayuu',
        descripcion: 'Territorio ancestral del pueblo Wayuu en La Guajira',
        comunidad: 'wayuu',
        area: '30000',
        ubicacion: 'La Guajira, Colombia',
        tipo: 'resguardo',
        estado: 'reconocido',
        fechaReconocimiento: '1988-12-10',
        documentos: ['resolucion_wayuu.pdf', 'titulo_wayuu.pdf'],
        poblacion: 270000,
        hectareas: 30000,
        amenazas: 8,
        proyectos: 4
      },
      {
        id: 'territorio_004',
        nombre: 'Territorio Ancestral Embera',
        descripcion: 'Territorio ancestral del pueblo Embera en el Chocó',
        comunidad: 'embera',
        area: '8000',
        ubicacion: 'Chocó, Colombia',
        tipo: 'resguardo',
        estado: 'en_tramite',
        fechaReconocimiento: '',
        documentos: ['solicitud_embera.pdf'],
        poblacion: 8000,
        hectareas: 8000,
        amenazas: 2,
        proyectos: 0
      }
    ];

    const comunidadesSimuladas = [
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca', poblacion: 150000 },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico', poblacion: 4500000 },
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira', poblacion: 270000 },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó', poblacion: 80000 },
      { id: 'kogui', nombre: 'Kogui', territorio: 'Sierra Nevada', poblacion: 12000 }
    ];

    setTerritorios(territoriosSimulados);
    setComunidades(comunidadesSimuladas);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'reconocido': return 'bg-green-100 text-green-800';
      case 'en_tramite': return 'bg-yellow-100 text-yellow-800';
      case 'no_reconocido': return 'bg-red-100 text-red-800';
      case 'amenazado': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'resguardo': return 'bg-blue-100 text-blue-800';
      case 'territorio_colectivo': return 'bg-purple-100 text-purple-800';
      case 'cabildo': return 'bg-indigo-100 text-indigo-800';
      case 'consejo_comunitario': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Enviando territorio ancestral:', nuevoTerritorio);
    // Aquí se implementaría la lógica de envío
  };

  const manejarEdicion = (territorio) => {
    setNuevoTerritorio(territorio);
  };

  const manejarEliminacion = (id) => {
    setTerritorios(territorios.filter(t => t.id !== id));
  };

  const generarReporte = (territorio) => {
    console.log('Generando reporte para territorio:', territorio.nombre);
  };

  const territoriosFiltrados = territorios.filter(territorio => {
    const cumpleComunidad = filtroComunidad === 'todas' || territorio.comunidad === filtroComunidad;
    const cumpleEstado = filtroEstado === 'todos' || territorio.estado === filtroEstado;
    const cumpleBusqueda = busqueda === '' || 
      territorio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      territorio.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      territorio.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumpleEstado && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Territorios Ancestrales
              </h1>
              <p className="text-gray-600 mt-1">
                Gestión y protección de territorios ancestrales de las comunidades étnicas de Colombia
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema protege y gestiona los territorios ancestrales reconocidos por la Constitución y el derecho internacional.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="territorios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="territorios">Territorios</TabsTrigger>
            <TabsTrigger value="nuevo">Nuevo Territorio</TabsTrigger>
            <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            <TabsTrigger value="mapas">Mapas</TabsTrigger>
            <TabsTrigger value="amenazas">Amenazas</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Territorios */}
          <TabsContent value="territorios" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar por nombre, ubicación o descripción..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="filtro-comunidad">Comunidad</Label>
                <Select value={filtroComunidad} onValueChange={setFiltroComunidad}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar comunidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las comunidades</SelectItem>
                    {comunidades.map(comunidad => (
                      <SelectItem key={comunidad.id} value={comunidad.id}>
                        {comunidad.nombre}
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
                    <SelectItem value="reconocido">Reconocido</SelectItem>
                    <SelectItem value="en_tramite">En Trámite</SelectItem>
                    <SelectItem value="no_reconocido">No Reconocido</SelectItem>
                    <SelectItem value="amenazado">Amenazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Territorios */}
            <div className="grid gap-6">
              {territoriosFiltrados.map(territorio => (
                <Card key={territorio.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{territorio.nombre}</CardTitle>
                        <p className="text-gray-600 mb-4">{territorio.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(territorio.estado)}>
                            {territorio.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getTipoColor(territorio.tipo)}>
                            {territorio.tipo.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{territorio.poblacion.toLocaleString()} habitantes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TreePine className="h-4 w-4" />
                            <span>{territorio.hectareas.toLocaleString()} hectáreas</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{territorio.ubicacion}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{territorio.amenazas} amenazas</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Documentos:</p>
                          <div className="flex flex-wrap gap-1">
                            {territorio.documentos.map((doc, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => manejarEdicion(territorio)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generarReporte(territorio)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => manejarEliminacion(territorio.id)}
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

          {/* Tab de Nuevo Territorio */}
          <TabsContent value="nuevo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuevo Territorio Ancestral</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre del Territorio</Label>
                      <Input
                        id="nombre"
                        value={nuevoTerritorio.nombre}
                        onChange={(e) => setNuevoTerritorio({...nuevoTerritorio, nombre: e.target.value})}
                        placeholder="Nombre del territorio ancestral"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevoTerritorio.comunidad} 
                        onValueChange={(value) => setNuevoTerritorio({...nuevoTerritorio, comunidad: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar comunidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {comunidades.map(comunidad => (
                            <SelectItem key={comunidad.id} value={comunidad.id}>
                              {comunidad.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={nuevoTerritorio.descripcion}
                      onChange={(e) => setNuevoTerritorio({...nuevoTerritorio, descripcion: e.target.value})}
                      placeholder="Describa el territorio ancestral"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="area">Área (hectáreas)</Label>
                      <Input
                        id="area"
                        type="number"
                        value={nuevoTerritorio.area}
                        onChange={(e) => setNuevoTerritorio({...nuevoTerritorio, area: e.target.value})}
                        placeholder="Área en hectáreas"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        value={nuevoTerritorio.ubicacion}
                        onChange={(e) => setNuevoTerritorio({...nuevoTerritorio, ubicacion: e.target.value})}
                        placeholder="Departamento, Colombia"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tipo">Tipo de Territorio</Label>
                      <Select 
                        value={nuevoTerritorio.tipo} 
                        onValueChange={(value) => setNuevoTerritorio({...nuevoTerritorio, tipo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="resguardo">Resguardo Indígena</SelectItem>
                          <SelectItem value="territorio_colectivo">Territorio Colectivo</SelectItem>
                          <SelectItem value="cabildo">Cabildo</SelectItem>
                          <SelectItem value="consejo_comunitario">Consejo Comunitario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select 
                        value={nuevoTerritorio.estado} 
                        onValueChange={(value) => setNuevoTerritorio({...nuevoTerritorio, estado: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reconocido">Reconocido</SelectItem>
                          <SelectItem value="en_tramite">En Trámite</SelectItem>
                          <SelectItem value="no_reconocido">No Reconocido</SelectItem>
                          <SelectItem value="amenazado">Amenazado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha-reconocimiento">Fecha de Reconocimiento</Label>
                      <Input
                        id="fecha-reconocimiento"
                        type="date"
                        value={nuevoTerritorio.fechaReconocimiento}
                        onChange={(e) => setNuevoTerritorio({...nuevoTerritorio, fechaReconocimiento: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Territorio
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Comunidades */}
          <TabsContent value="comunidades" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comunidades.map(comunidad => (
                <Card key={comunidad.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      <span>{comunidad.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{comunidad.territorio}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{comunidad.poblacion.toLocaleString()} habitantes</span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline">
                          {territorios.filter(t => t.comunidad === comunidad.id).length} territorios
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
                <CardTitle>Mapa de Territorios Ancestrales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Mapa interactivo de territorios ancestrales</p>
                    <p className="text-sm text-gray-400 mt-2">Integración con servicios de mapas en desarrollo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Amenazas */}
          <TabsContent value="amenazas" className="space-y-6">
            <div className="grid gap-6">
              {territorios.filter(t => t.amenazas > 0).map(territorio => (
                <Card key={territorio.id} className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>{territorio.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{territorio.descripcion}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-orange-600 font-medium">
                          {territorio.amenazas} amenazas identificadas
                        </span>
                        <span className="text-gray-500">
                          {territorio.proyectos} proyectos en el territorio
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
                    <MapPin className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{territorios.length}</p>
                      <p className="text-sm text-gray-600">Total Territorios</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{comunidades.length}</p>
                      <p className="text-sm text-gray-600">Comunidades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TreePine className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {territorios.reduce((acc, t) => acc + parseInt(t.hectareas), 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Hectáreas Totales</p>
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
                        {territorios.reduce((acc, t) => acc + t.amenazas, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Amenazas Totales</p>
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

export default TerritoriosAncestrales;
