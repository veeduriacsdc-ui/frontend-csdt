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
import { Link } from 'react-router-dom';
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
  Factory,
  Building,
  TrendingUp,
  BarChart3
} from 'lucide-react';

const ControlRegional = () => {
  const [regiones, setRegiones] = useState([]);
  const [estadisticas, setEstadisticas] = useState({});
  const [filtroReg, setFiltroReg] = useState('todas');
  const [filtroTip, setFiltroTip] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevaRegion, setNuevaRegion] = useState({
    nom: '',
    dep: '',
    mun: [],
    pob: '',
    are: '',
    coor: '',
    des: '',
    gob: '',
    alc: '',
    tel: '',
    cor: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const regionesSimuladas = [
      {
        id: 'region_001',
        nom: 'Región Caribe',
        dep: 'Atlántico, Bolívar, Cesar, Córdoba, La Guajira, Magdalena, Sucre',
        mun: 150,
        pob: 10000000,
        are: '132000',
        coor: '10.4637, -75.5144',
        des: 'Región del Caribe colombiano con importante actividad minera y portuaria',
        gob: 'Dr. Eduardo Verano',
        alc: 'Dr. Jaime Pumarejo',
        tel: '605-340-0000',
        cor: 'contacto@caribe.gov.co',
        proyectos: 45,
        irregularidades: 12,
        denuncias: 28,
        sanciones: 8,
        calificacion: 3.8
      },
      {
        id: 'region_002',
        nom: 'Región Pacífico',
        dep: 'Chocó, Valle del Cauca, Cauca, Nariño',
        mun: 89,
        pob: 6500000,
        are: '83000',
        coor: '3.4516, -76.5320',
        des: 'Región del Pacífico con alta biodiversidad y actividad minera',
        gob: 'Dr. Dilian Francisca Toro',
        alc: 'Dr. Maurice Armitage',
        tel: '602-524-0000',
        cor: 'contacto@pacifico.gov.co',
        proyectos: 32,
        irregularidades: 18,
        denuncias: 45,
        sanciones: 15,
        calificacion: 3.2
      },
      {
        id: 'region_003',
        nombre: 'Región Andina',
        departamento: 'Antioquia, Boyacá, Caldas, Cundinamarca, Huila, Norte de Santander, Quindío, Risaralda, Santander, Tolima',
        municipios: 320,
        poblacion: 25000000,
        area: '280000',
        coordenadas: '4.7110, -74.0721',
        descripcion: 'Región Andina con importante actividad minera y agrícola',
        gobernador: 'Dr. Nicolás García',
        alcalde: 'Dr. Claudia López',
        telefono: '601-327-0000',
        email: 'contacto@andina.gov.co',
        proyectos: 78,
        irregularidades: 25,
        denuncias: 67,
        sanciones: 22,
        calificacion: 4.1
      },
      {
        id: 'region_004',
        nombre: 'Región Orinoquía',
        departamento: 'Arauca, Casanare, Meta, Vichada',
        municipios: 45,
        poblacion: 1500000,
        area: '310000',
        coordenadas: '4.1420, -73.6268',
        descripcion: 'Región de la Orinoquía con actividad petrolera y ganadera',
        gobernador: 'Dr. Juan Guillermo Zuluaga',
        alcalde: 'Dr. Carlos Fernando Galán',
        telefono: '601-382-0000',
        email: 'contacto@orinoquia.gov.co',
        proyectos: 23,
        irregularidades: 8,
        denuncias: 15,
        sanciones: 3,
        calificacion: 4.3
      },
      {
        id: 'region_005',
        nombre: 'Región Amazonía',
        departamento: 'Amazonas, Caquetá, Guainía, Guaviare, Putumayo, Vaupés',
        municipios: 67,
        poblacion: 1200000,
        area: '420000',
        coordenadas: '-1.8312, -78.1834',
        descripcion: 'Región Amazónica con alta biodiversidad y actividad minera artesanal',
        gobernador: 'Dr. Carlos Eduardo Correa',
        alcalde: 'Dr. Jorge Iván Ospina',
        telefono: '601-330-0000',
        email: 'contacto@amazonia.gov.co',
        proyectos: 19,
        irregularidades: 15,
        denuncias: 32,
        sanciones: 12,
        calificacion: 3.5
      }
    ];

    const estadisticasSimuladas = {
      totalRegiones: regionesSimuladas.length,
      totalProyectos: regionesSimuladas.reduce((acc, r) => acc + r.proyectos, 0),
      totalIrregularidades: regionesSimuladas.reduce((acc, r) => acc + r.irregularidades, 0),
      totalDenuncias: regionesSimuladas.reduce((acc, r) => acc + r.denuncias, 0),
      totalSanciones: regionesSimuladas.reduce((acc, r) => acc + r.sanciones, 0),
      calificacionPromedio: regionesSimuladas.reduce((acc, r) => acc + r.calificacion, 0) / regionesSimuladas.length,
      poblacionTotal: regionesSimuladas.reduce((acc, r) => acc + r.poblacion, 0),
      areaTotal: regionesSimuladas.reduce((acc, r) => acc + parseInt(r.area), 0)
    };

    setRegiones(regionesSimuladas);
    setEstadisticas(estadisticasSimuladas);
  };

  const getCalificacionColor = (calificacion) => {
    if (calificacion >= 4) return 'bg-green-100 text-green-800';
    if (calificacion >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getIrregularidadesColor = (irregularidades) => {
    if (irregularidades === 0) return 'bg-green-100 text-green-800';
    if (irregularidades <= 5) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
  };

  const regionesFiltradas = regiones.filter(region => {
    const cumpleRegion = filtroReg === 'todas' || region.id === filtroReg;
    const cumpleTipo = filtroTip === 'todos' || region.nom.toLowerCase().includes(filtroTip.toLowerCase());
    const cumpleBusqueda = busqueda === '' || 
      region.nom.toLowerCase().includes(busqueda.toLowerCase()) ||
      region.dep.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleRegion && cumpleTipo && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Control Regional
              </h1>
              <p className="text-gray-600 mt-1">
                Monitoreo y control de actividades regionales en el territorio nacional
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema monitorea y controla las actividades regionales para garantizar el desarrollo sostenible y el cumplimiento normativo.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="regiones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="regiones">Regiones</TabsTrigger>
            <TabsTrigger value="nueva">Nueva Región</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="mapas">Mapas</TabsTrigger>
            <TabsTrigger value="alertas">Alertas</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Regiones */}
          <TabsContent value="regiones" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar regiones..."
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
                        {region.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Regiones */}
            <div className="grid gap-6">
              {regionesFiltradas.map(region => (
                <Card key={region.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{region.nom}</CardTitle>
                        <p className="text-gray-600 mb-2">{region.dep}</p>
                        <p className="text-sm text-gray-600 mb-4">{region.des}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getCalificacionColor(region.calificacion)}>
                            {region.calificacion}/5
                          </Badge>
                          <Badge className={getIrregularidadesColor(region.irregularidades)}>
                            {region.irregularidades} IRREGULARIDADES
                          </Badge>
                          <Badge variant="outline">
                            {region.municipios} MUNICIPIOS
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{region.pob.toLocaleString()} habitantes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4" />
                            <span>{region.are} km²</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BarChart3 className="h-4 w-4" />
                            <span>{region.proyectos} proyectos</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{region.denuncias} denuncias</span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Gobernador:</strong> {region.gob}
                          </div>
                          <div>
                            <strong>Alcalde:</strong> {region.alc}
                          </div>
                          <div>
                            <strong>Teléfono:</strong> {region.tel}
                          </div>
                          <div>
                            <strong>Email:</strong> {region.cor}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevaRegion(region)}
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

          {/* Tab de Nueva Región */}
          <TabsContent value="nueva" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Región</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre de la Región</Label>
                      <Input
                        id="nombre"
                        value={nuevaRegion.nombre}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, nombre: e.target.value})}
                        placeholder="Nombre de la región"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="departamento">Departamentos</Label>
                      <Input
                        id="departamento"
                        value={nuevaRegion.departamento}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, departamento: e.target.value})}
                        placeholder="Lista de departamentos"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="municipios">Número de Municipios</Label>
                      <Input
                        id="municipios"
                        type="number"
                        value={nuevaRegion.municipios}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, municipios: e.target.value})}
                        placeholder="Número de municipios"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="poblacion">Población</Label>
                      <Input
                        id="poblacion"
                        type="number"
                        value={nuevaRegion.poblacion}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, poblacion: e.target.value})}
                        placeholder="Población total"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="area">Área (km²)</Label>
                      <Input
                        id="area"
                        type="number"
                        value={nuevaRegion.area}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, area: e.target.value})}
                        placeholder="Área en km²"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={nuevaRegion.descripcion}
                      onChange={(e) => setNuevaRegion({...nuevaRegion, descripcion: e.target.value})}
                      placeholder="Descripción de la región"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="gobernador">Gobernador</Label>
                      <Input
                        id="gobernador"
                        value={nuevaRegion.gobernador}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, gobernador: e.target.value})}
                        placeholder="Nombre del gobernador"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="alcalde">Alcalde</Label>
                      <Input
                        id="alcalde"
                        value={nuevaRegion.alcalde}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, alcalde: e.target.value})}
                        placeholder="Nombre del alcalde"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="coordenadas">Coordenadas</Label>
                      <Input
                        id="coordenadas"
                        value={nuevaRegion.coordenadas}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, coordenadas: e.target.value})}
                        placeholder="Ej: 4.7110, -74.0721"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={nuevaRegion.telefono}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, telefono: e.target.value})}
                        placeholder="Número de teléfono"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={nuevaRegion.email}
                        onChange={(e) => setNuevaRegion({...nuevaRegion, email: e.target.value})}
                        placeholder="correo@region.com"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Región
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Proyectos */}
          <TabsContent value="proyectos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Link to="/control-mineria-predios" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Pickaxe className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Control Minería y Predios</h3>
                    <p className="text-sm text-gray-600">Monitoreo de actividades mineras</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/control-instituciones" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Control Instituciones</h3>
                    <p className="text-sm text-gray-600">Evaluación de entidades públicas</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/geo-dashboard" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MapPin className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">GeoDashboard</h3>
                    <p className="text-sm text-gray-600">Visualización geográfica regional</p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/consejo-ia" className="block">
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Gavel className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Consejo IA</h3>
                    <p className="text-sm text-gray-600">Asistencia inteligente regional</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </TabsContent>

          {/* Tab de Mapas */}
          <TabsContent value="mapas" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapa Regional</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Mapa interactivo regional</p>
                    <p className="text-sm text-gray-400 mt-2">Integración con servicios de mapas en desarrollo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Alertas */}
          <TabsContent value="alertas" className="space-y-6">
            <div className="grid gap-6">
              {regiones.filter(r => r.irregularidades > 0).map(region => (
                <Card key={region.id} className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>{region.nom}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{region.dep}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-orange-600 font-medium">
                          {region.irregularidades} irregularidades detectadas
                        </span>
                        <span className="text-red-600">
                          {region.denuncias} denuncias recibidas
                        </span>
                        <span className="text-purple-600">
                          {region.sanciones} sanciones aplicadas
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
                    <Globe className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{estadisticas.totalRegiones}</p>
                      <p className="text-sm text-gray-600">Total Regiones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{estadisticas.totalProyectos}</p>
                      <p className="text-sm text-gray-600">Total Proyectos</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-8 w-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold">{estadisticas.totalIrregularidades}</p>
                      <p className="text-sm text-gray-600">Irregularidades</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{estadisticas.calificacionPromedio?.toFixed(1)}</p>
                      <p className="text-sm text-gray-600">Calificación Promedio</p>
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

export default ControlRegional;
