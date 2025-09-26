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
  BookOpen, 
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
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  Gavel,
  MapPin,
  History,
  Mic,
  Play
} from 'lucide-react';

const NarracionesEtnicas = () => {
  const [narraciones, setNarraciones] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [filtroComunidad, setFiltroComunidad] = useState('todas');
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevaNarracion, setNuevaNarracion] = useState({
    titulo: '',
    contenido: '',
    comunidad: '',
    tipo: 'mito',
    narrador: '',
    idioma: 'espanol',
    fecha: '',
    ubicacion: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const narracionesSimuladas = [
      {
        id: 'narracion_001',
        titulo: 'El origen del mundo según los Nasa',
        contenido: 'En el principio, cuando no había nada, el creador Nasa...',
        comunidad: 'nasa',
        tipo: 'mito',
        narrador: 'Ancestro Nasa',
        idioma: 'nasa_yuwe',
        fecha: '2020-03-15',
        ubicacion: 'Cauca, Colombia',
        duracion: '15 minutos',
        formato: 'audio',
        visitas: 245
      },
      {
        id: 'narracion_002',
        titulo: 'La resistencia Wayuu',
        contenido: 'Los Wayuu siempre han sido un pueblo libre...',
        comunidad: 'wayuu',
        tipo: 'historia',
        narrador: 'Abuela Wayuu',
        idioma: 'wayuunaiki',
        fecha: '2021-08-20',
        ubicacion: 'La Guajira, Colombia',
        duracion: '22 minutos',
        formato: 'video',
        visitas: 189
      }
    ];

    const comunidadesSimuladas = [
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca' },
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira' },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó' },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico' }
    ];

    setNarraciones(narracionesSimuladas);
    setComunidades(comunidadesSimuladas);
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'mito': return 'bg-purple-100 text-purple-800';
      case 'historia': return 'bg-blue-100 text-blue-800';
      case 'leyenda': return 'bg-green-100 text-green-800';
      case 'cuento': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatoColor = (formato) => {
    switch (formato) {
      case 'audio': return 'bg-red-100 text-red-800';
      case 'video': return 'bg-blue-100 text-blue-800';
      case 'texto': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
  };

  const narracionesFiltradas = narraciones.filter(narracion => {
    const cumpleComunidad = filtroComunidad === 'todas' || narracion.comunidad === filtroComunidad;
    const cumpleTipo = filtroTipo === 'todos' || narracion.tipo === filtroTipo;
    const cumpleBusqueda = busqueda === '' || 
      narracion.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      narracion.contenido.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumpleTipo && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Narraciones Étnicas
              </h1>
              <p className="text-gray-600 mt-1">
                Colección de narraciones, mitos y tradiciones orales de las comunidades étnicas
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema preserva y difunde las narraciones ancestrales que transmiten la sabiduría de los pueblos étnicos.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="narraciones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="narraciones">Narraciones</TabsTrigger>
            <TabsTrigger value="nueva">Nueva Narración</TabsTrigger>
            <TabsTrigger value="tipos">Tipos</TabsTrigger>
            <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            <TabsTrigger value="reproductor">Reproductor</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Narraciones */}
          <TabsContent value="narraciones" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar narraciones..."
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
                <Label htmlFor="filtro-tipo">Tipo</Label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    <SelectItem value="mito">Mito</SelectItem>
                    <SelectItem value="historia">Historia</SelectItem>
                    <SelectItem value="leyenda">Leyenda</SelectItem>
                    <SelectItem value="cuento">Cuento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Narraciones */}
            <div className="grid gap-6">
              {narracionesFiltradas.map(narracion => (
                <Card key={narracion.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{narracion.titulo}</CardTitle>
                        <p className="text-gray-600 mb-4 line-clamp-3">{narracion.contenido}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getTipoColor(narracion.tipo)}>
                            {narracion.tipo.toUpperCase()}
                          </Badge>
                          <Badge className={getFormatoColor(narracion.formato)}>
                            {narracion.formato.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {narracion.idioma}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{narracion.narrador}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{narracion.duracion}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{narracion.ubicacion}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Play className="h-4 w-4" />
                            <span>{narracion.visitas} visitas</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevaNarracion(narracion)}
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

          {/* Tab de Nueva Narración */}
          <TabsContent value="nueva" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Narración Étnica</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="titulo">Título de la Narración</Label>
                      <Input
                        id="titulo"
                        value={nuevaNarracion.titulo}
                        onChange={(e) => setNuevaNarracion({...nuevaNarracion, titulo: e.target.value})}
                        placeholder="Título de la narración"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevaNarracion.comunidad} 
                        onValueChange={(value) => setNuevaNarracion({...nuevaNarracion, comunidad: value})}
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
                    <Label htmlFor="contenido">Contenido</Label>
                    <Textarea
                      id="contenido"
                      value={nuevaNarracion.contenido}
                      onChange={(e) => setNuevaNarracion({...nuevaNarracion, contenido: e.target.value})}
                      placeholder="Escriba la narración aquí..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="tipo">Tipo</Label>
                      <Select 
                        value={nuevaNarracion.tipo} 
                        onValueChange={(value) => setNuevaNarracion({...nuevaNarracion, tipo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mito">Mito</SelectItem>
                          <SelectItem value="historia">Historia</SelectItem>
                          <SelectItem value="leyenda">Leyenda</SelectItem>
                          <SelectItem value="cuento">Cuento</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="narrador">Narrador</Label>
                      <Input
                        id="narrador"
                        value={nuevaNarracion.narrador}
                        onChange={(e) => setNuevaNarracion({...nuevaNarracion, narrador: e.target.value})}
                        placeholder="Nombre del narrador"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="idioma">Idioma</Label>
                      <Select 
                        value={nuevaNarracion.idioma} 
                        onValueChange={(value) => setNuevaNarracion({...nuevaNarracion, idioma: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="espanol">Español</SelectItem>
                          <SelectItem value="nasa_yuwe">Nasa Yuwe</SelectItem>
                          <SelectItem value="wayuunaiki">Wayuunaiki</SelectItem>
                          <SelectItem value="embera">Embera</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Narración
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Tipos */}
          <TabsContent value="tipos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { id: 'mito', nombre: 'Mito', color: 'bg-purple-100 text-purple-800', icono: '🌟' },
                { id: 'historia', nombre: 'Historia', color: 'bg-blue-100 text-blue-800', icono: '📚' },
                { id: 'leyenda', nombre: 'Leyenda', color: 'bg-green-100 text-green-800', icono: '🏰' },
                { id: 'cuento', nombre: 'Cuento', color: 'bg-yellow-100 text-yellow-800', icono: '📖' }
              ].map(tipo => (
                <Card key={tipo.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{tipo.icono}</span>
                      <span>{tipo.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      <p>Narraciones de tipo {tipo.nombre.toLowerCase()}</p>
                      <div className="mt-2">
                        <Badge className={tipo.color}>
                          {narraciones.filter(n => n.tipo === tipo.id).length} narraciones
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                      <div className="mt-2">
                        <Badge variant="outline">
                          {narraciones.filter(n => n.comunidad === comunidad.id).length} narraciones
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Reproductor */}
          <TabsContent value="reproductor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reproductor de Narraciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Reproductor de audio y video en desarrollo</p>
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
                    <BookOpen className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{narraciones.length}</p>
                      <p className="text-sm text-gray-600">Total Narraciones</p>
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
                    <Play className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {narraciones.reduce((acc, n) => acc + n.visitas, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Visitas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Mic className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {narraciones.filter(n => n.formato === 'audio').length}
                      </p>
                      <p className="text-sm text-gray-600">Narraciones de Audio</p>
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

export default NarracionesEtnicas;
