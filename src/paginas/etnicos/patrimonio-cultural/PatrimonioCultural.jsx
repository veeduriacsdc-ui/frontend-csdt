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
  Camera,
  Music,
  Palette
} from 'lucide-react';

const PatrimonioCultural = () => {
  const [patrimonios, setPatrimonios] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCom, setFiltroCom] = useState('todas');
  const [filtroCat, setFiltroCat] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoPatrimonio, setNuevoPatrimonio] = useState({
    nom: '',
    des: '',
    com: '',
    cat: 'tangible',
    tip: 'arqueologico',
    ubi: '',
    est: 'protegido',
    fec_dec: '',
    doc: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const patrimoniosSimulados = [
      {
        id: 'patrimonio_001',
        nombre: 'Cerámica Nasa',
        descripcion: 'Técnicas ancestrales de cerámica del pueblo Nasa',
        comunidad: 'nasa',
        categoria: 'tangible',
        tipo: 'artesanal',
        ubicacion: 'Cauca, Colombia',
        estado: 'protegido',
        fechaDeclaracion: '2010-03-15',
        documentos: ['declaracion_ceramica.pdf'],
        importancia: 'alta',
        visitantes: 1200,
        exposiciones: 5
      },
      {
        id: 'patrimonio_002',
        nombre: 'Música Wayuu',
        descripcion: 'Tradiciones musicales y cantos ancestrales del pueblo Wayuu',
        comunidad: 'wayuu',
        categoria: 'intangible',
        tipo: 'musical',
        ubicacion: 'La Guajira, Colombia',
        estado: 'protegido',
        fechaDeclaracion: '2015-08-20',
        documentos: ['declaracion_musica.pdf'],
        importancia: 'alta',
        visitantes: 800,
        exposiciones: 3
      },
      {
        id: 'patrimonio_003',
        nombre: 'Sitio Arqueológico San Agustín',
        descripcion: 'Parque arqueológico con estatuas y tumbas precolombinas',
        comunidad: 'nasa',
        categoria: 'tangible',
        tipo: 'arqueologico',
        ubicacion: 'Huila, Colombia',
        estado: 'protegido',
        fechaDeclaracion: '1995-12-10',
        documentos: ['unesco_san_agustin.pdf'],
        importancia: 'muy_alta',
        visitantes: 50000,
        exposiciones: 12
      }
    ];

    const comunidadesSimuladas = [
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca', poblacion: 150000 },
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira', poblacion: 270000 },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico', poblacion: 4500000 },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó', poblacion: 80000 }
    ];

    const categoriasSimuladas = [
      { id: 'tangible', nombre: 'Tangible', icono: '🏛️', color: 'bg-blue-100 text-blue-800' },
      { id: 'intangible', nombre: 'Intangible', icono: '🎭', color: 'bg-purple-100 text-purple-800' },
      { id: 'mixto', nombre: 'Mixto', icono: '🌟', color: 'bg-yellow-100 text-yellow-800' }
    ];

    setPatrimonios(patrimoniosSimulados);
    setComunidades(comunidadesSimuladas);
    setCategorias(categoriasSimuladas);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'protegido': return 'bg-green-100 text-green-800';
      case 'en_riesgo': return 'bg-yellow-100 text-yellow-800';
      case 'critico': return 'bg-red-100 text-red-800';
      case 'desaparecido': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoriaColor = (categoria) => {
    const cat = categorias.find(c => c.id === categoria);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const getImportanciaColor = (importancia) => {
    switch (importancia) {
      case 'muy_alta': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
  };

  const patrimoniosFiltrados = patrimonios.filter(patrimonio => {
    const cumpleComunidad = filtroComunidad === 'todas' || patrimonio.comunidad === filtroComunidad;
    const cumpleCategoria = filtroCategoria === 'todas' || patrimonio.categoria === filtroCategoria;
    const cumpleBusqueda = busqueda === '' || 
      patrimonio.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      patrimonio.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumpleCategoria && cumpleBusqueda;
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
                Patrimonio Cultural
              </h1>
              <p className="text-gray-600 mt-1">
                Catálogo y protección del patrimonio cultural de las comunidades étnicas de Colombia
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema preserva y difunde el patrimonio cultural tangible e intangible de las comunidades étnicas.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="patrimonios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="patrimonios">Patrimonios</TabsTrigger>
            <TabsTrigger value="nuevo">Nuevo Patrimonio</TabsTrigger>
            <TabsTrigger value="categorias">Categorías</TabsTrigger>
            <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            <TabsTrigger value="galeria">Galería</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Patrimonios */}
          <TabsContent value="patrimonios" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar patrimonio cultural..."
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
                <Label htmlFor="filtro-categoria">Categoría</Label>
                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las categorías</SelectItem>
                    {categorias.map(categoria => (
                      <SelectItem key={categoria.id} value={categoria.id}>
                        {categoria.icono} {categoria.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Patrimonios */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {patrimoniosFiltrados.map(patrimonio => (
                <Card key={patrimonio.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{patrimonio.nombre}</CardTitle>
                        <p className="text-sm text-gray-600 mb-4">{patrimonio.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(patrimonio.estado)}>
                            {patrimonio.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getCategoriaColor(patrimonio.categoria)}>
                            {categorias.find(c => c.id === patrimonio.categoria)?.icono} {categorias.find(c => c.id === patrimonio.categoria)?.nombre}
                          </Badge>
                          <Badge className={getImportanciaColor(patrimonio.importancia)}>
                            {patrimonio.importancia.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{patrimonio.ubicacion}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{patrimonio.visitantes} visitantes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Desde {patrimonio.fechaDeclaracion}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Camera className="h-4 w-4" />
                            <span>{patrimonio.exposiciones} exposiciones</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver Detalles
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Nuevo Patrimonio */}
          <TabsContent value="nuevo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuevo Patrimonio Cultural</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre del Patrimonio</Label>
                      <Input
                        id="nombre"
                        value={nuevoPatrimonio.nombre}
                        onChange={(e) => setNuevoPatrimonio({...nuevoPatrimonio, nombre: e.target.value})}
                        placeholder="Nombre del patrimonio cultural"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevoPatrimonio.comunidad} 
                        onValueChange={(value) => setNuevoPatrimonio({...nuevoPatrimonio, comunidad: value})}
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
                      value={nuevoPatrimonio.descripcion}
                      onChange={(e) => setNuevoPatrimonio({...nuevoPatrimonio, descripcion: e.target.value})}
                      placeholder="Describa el patrimonio cultural"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="categoria">Categoría</Label>
                      <Select 
                        value={nuevoPatrimonio.categoria} 
                        onValueChange={(value) => setNuevoPatrimonio({...nuevoPatrimonio, categoria: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categorias.map(categoria => (
                            <SelectItem key={categoria.id} value={categoria.id}>
                              {categoria.icono} {categoria.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tipo">Tipo</Label>
                      <Select 
                        value={nuevoPatrimonio.tipo} 
                        onValueChange={(value) => setNuevoPatrimonio({...nuevoPatrimonio, tipo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arqueologico">Arqueológico</SelectItem>
                          <SelectItem value="artesanal">Artesanal</SelectItem>
                          <SelectItem value="musical">Musical</SelectItem>
                          <SelectItem value="danza">Danza</SelectItem>
                          <SelectItem value="oral">Tradición Oral</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        value={nuevoPatrimonio.ubicacion}
                        onChange={(e) => setNuevoPatrimonio({...nuevoPatrimonio, ubicacion: e.target.value})}
                        placeholder="Ubicación del patrimonio"
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
                      Crear Patrimonio
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Categorías */}
          <TabsContent value="categorias" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categorias.map(categoria => (
                <Card key={categoria.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{categoria.icono}</span>
                      <span>{categoria.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      <p>Patrimonio cultural {categoria.nombre.toLowerCase()}</p>
                      <div className="mt-2">
                        <Badge className={categoria.color}>
                          {patrimonios.filter(p => p.categoria === categoria.id).length} patrimonios
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
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{comunidad.poblacion.toLocaleString()} habitantes</span>
                      </div>
                      <div className="mt-2">
                        <Badge variant="outline">
                          {patrimonios.filter(p => p.comunidad === comunidad.id).length} patrimonios
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Galería */}
          <TabsContent value="galeria" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Galería de Patrimonio Cultural</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {patrimonios.map(patrimonio => (
                    <div key={patrimonio.id} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl mb-2">
                            {patrimonio.categoria === 'tangible' ? '🏛️' : '🎭'}
                          </div>
                          <p className="text-sm font-medium">{patrimonio.nombre}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                        <Button className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Ver Detalles
                        </Button>
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
                    <BookOpen className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{patrimonios.length}</p>
                      <p className="text-sm text-gray-600">Total Patrimonios</p>
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
                    <Camera className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {patrimonios.reduce((acc, p) => acc + p.exposiciones, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Exposiciones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {patrimonios.reduce((acc, p) => acc + p.visitantes, 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Visitantes</p>
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

export default PatrimonioCultural;
