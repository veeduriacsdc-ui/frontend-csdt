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
  History
} from 'lucide-react';

const HistoriaTerritorio = () => {
  const [historias, setHistorias] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [filtroCom, setFiltroCom] = useState('todas');
  const [filtroPer, setFiltroPer] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevaHistoria, setNuevaHistoria] = useState({
    tit: '',
    des: '',
    com: '',
    per: 'precolombino',
    fec: '',
    ubi: '',
    tip: 'evento',
    fue: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const historiasSimuladas = [
      {
        id: 'historia_001',
        titulo: 'Llegada de los Nasa al Cauca',
        descripcion: 'Historia de la migración y asentamiento del pueblo Nasa en el territorio del Cauca',
        comunidad: 'nasa',
        periodo: 'precolombino',
        fecha: '1200',
        ubicacion: 'Cauca, Colombia',
        tipo: 'migracion',
        fuentes: ['tradicion_oral.pdf', 'estudios_arqueologicos.pdf'],
        importancia: 'alta',
        testimonios: 15
      },
      {
        id: 'historia_002',
        titulo: 'Resistencia Wayuu en La Guajira',
        descripcion: 'Historia de la resistencia del pueblo Wayuu durante la colonización española',
        comunidad: 'wayuu',
        periodo: 'colonial',
        fecha: '1600',
        ubicacion: 'La Guajira, Colombia',
        tipo: 'resistencia',
        fuentes: ['cronicas_espanolas.pdf', 'tradicion_oral_wayuu.pdf'],
        importancia: 'muy_alta',
        testimonios: 23
      }
    ];

    const comunidadesSimuladas = [
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca' },
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira' },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó' },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico' }
    ];

    setHistorias(historiasSimuladas);
    setComunidades(comunidadesSimuladas);
  };

  const getPeriodoColor = (periodo) => {
    switch (periodo) {
      case 'precolombino': return 'bg-green-100 text-green-800';
      case 'colonial': return 'bg-red-100 text-red-800';
      case 'republicano': return 'bg-blue-100 text-blue-800';
      case 'contemporaneo': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'migracion': return 'bg-blue-100 text-blue-800';
      case 'resistencia': return 'bg-red-100 text-red-800';
      case 'asentamiento': return 'bg-green-100 text-green-800';
      case 'conflicto': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
  };

  const historiasFiltradas = historias.filter(historia => {
    const cumpleComunidad = filtroComunidad === 'todas' || historia.comunidad === filtroComunidad;
    const cumplePeriodo = filtroPeriodo === 'todos' || historia.periodo === filtroPeriodo;
    const cumpleBusqueda = busqueda === '' || 
      historia.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      historia.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumplePeriodo && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <History className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Historia Territorial
              </h1>
              <p className="text-gray-600 mt-1">
                Registro histórico de los territorios ancestrales de las comunidades étnicas
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema preserva la memoria histórica de los territorios ancestrales y sus comunidades.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="historias" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="historias">Historias</TabsTrigger>
            <TabsTrigger value="nueva">Nueva Historia</TabsTrigger>
            <TabsTrigger value="periodos">Períodos</TabsTrigger>
            <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            <TabsTrigger value="cronologia">Cronología</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Historias */}
          <TabsContent value="historias" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar historias..."
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
                <Label htmlFor="filtro-periodo">Período</Label>
                <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los períodos</SelectItem>
                    <SelectItem value="precolombino">Precolombino</SelectItem>
                    <SelectItem value="colonial">Colonial</SelectItem>
                    <SelectItem value="republicano">Republicano</SelectItem>
                    <SelectItem value="contemporaneo">Contemporáneo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Historias */}
            <div className="grid gap-6">
              {historiasFiltradas.map(historia => (
                <Card key={historia.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{historia.titulo}</CardTitle>
                        <p className="text-gray-600 mb-4">{historia.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getPeriodoColor(historia.periodo)}>
                            {historia.periodo.toUpperCase()}
                          </Badge>
                          <Badge className={getTipoColor(historia.tipo)}>
                            {historia.tipo.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {historia.fecha}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{historia.ubicacion}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>{historia.fuentes.length} fuentes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{historia.testimonios} testimonios</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevaHistoria(historia)}
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

          {/* Tab de Nueva Historia */}
          <TabsContent value="nueva" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Historia Territorial</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="titulo">Título de la Historia</Label>
                      <Input
                        id="titulo"
                        value={nuevaHistoria.titulo}
                        onChange={(e) => setNuevaHistoria({...nuevaHistoria, titulo: e.target.value})}
                        placeholder="Título de la historia"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevaHistoria.comunidad} 
                        onValueChange={(value) => setNuevaHistoria({...nuevaHistoria, comunidad: value})}
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
                      value={nuevaHistoria.descripcion}
                      onChange={(e) => setNuevaHistoria({...nuevaHistoria, descripcion: e.target.value})}
                      placeholder="Describa la historia territorial"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="periodo">Período</Label>
                      <Select 
                        value={nuevaHistoria.periodo} 
                        onValueChange={(value) => setNuevaHistoria({...nuevaHistoria, periodo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar período" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="precolombino">Precolombino</SelectItem>
                          <SelectItem value="colonial">Colonial</SelectItem>
                          <SelectItem value="republicano">Republicano</SelectItem>
                          <SelectItem value="contemporaneo">Contemporáneo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha">Fecha</Label>
                      <Input
                        id="fecha"
                        value={nuevaHistoria.fecha}
                        onChange={(e) => setNuevaHistoria({...nuevaHistoria, fecha: e.target.value})}
                        placeholder="Ej: 1200, 1600-1700"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        value={nuevaHistoria.ubicacion}
                        onChange={(e) => setNuevaHistoria({...nuevaHistoria, ubicacion: e.target.value})}
                        placeholder="Ubicación del evento"
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
                      Crear Historia
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Períodos */}
          <TabsContent value="periodos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[
                { id: 'precolombino', nombre: 'Precolombino', color: 'bg-green-100 text-green-800', icono: '🏛️' },
                { id: 'colonial', nombre: 'Colonial', color: 'bg-red-100 text-red-800', icono: '⚔️' },
                { id: 'republicano', nombre: 'Republicano', color: 'bg-blue-100 text-blue-800', icono: '🏛️' },
                { id: 'contemporaneo', nombre: 'Contemporáneo', color: 'bg-purple-100 text-purple-800', icono: '🌍' }
              ].map(periodo => (
                <Card key={periodo.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{periodo.icono}</span>
                      <span>{periodo.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      <p>Historias del período {periodo.nombre.toLowerCase()}</p>
                      <div className="mt-2">
                        <Badge className={periodo.color}>
                          {historias.filter(h => h.periodo === periodo.id).length} historias
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
                          {historias.filter(h => h.comunidad === comunidad.id).length} historias
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Cronología */}
          <TabsContent value="cronologia" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cronología Histórica</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {historias
                    .sort((a, b) => parseInt(a.fecha) - parseInt(b.fecha))
                    .map(historia => (
                    <div key={historia.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {historia.fecha}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{historia.titulo}</h3>
                        <p className="text-sm text-gray-600">{historia.descripcion}</p>
                        <div className="flex space-x-2 mt-2">
                          <Badge className={getPeriodoColor(historia.periodo)}>
                            {historia.periodo}
                          </Badge>
                          <Badge variant="outline">
                            {historia.comunidad}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
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
                    <History className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{historias.length}</p>
                      <p className="text-sm text-gray-600">Total Historias</p>
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
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {historias.reduce((acc, h) => acc + h.fuentes.length, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Fuentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {historias.reduce((acc, h) => acc + h.testimonios, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Testimonios</p>
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

export default HistoriaTerritorio;
