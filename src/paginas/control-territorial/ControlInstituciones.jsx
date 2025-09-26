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
  Building, 
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
  MapPin,
  Scale,
  Eye,
  TrendingUp
} from 'lucide-react';

const ControlInstituciones = () => {
  const [instituciones, setInstituciones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevaInstitucion, setNuevaInstitucion] = useState({
    nombre: '',
    sigla: '',
    tipo: 'publica',
    nivel: 'nacional',
    sector: '',
    ubicacion: '',
    director: '',
    telefono: '',
    email: '',
    sitioWeb: '',
    descripcion: '',
    estado: 'activa'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const institucionesSimuladas = [
      {
        id: 'inst_001',
        nombre: 'Ministerio de Minas y Energía',
        sigla: 'MINMINAS',
        tipo: 'publica',
        nivel: 'nacional',
        sector: 'minas_energia',
        ubicacion: 'Bogotá D.C.',
        director: 'Dr. Andrés Camacho',
        telefono: '601-334-1111',
        email: 'contacto@minminas.gov.co',
        sitioWeb: 'www.minminas.gov.co',
        descripcion: 'Entidad encargada de la formulación y adopción de las políticas, planes y programas del sector minero energético',
        estado: 'activa',
        denuncias: 5,
        investigaciones: 2,
        sanciones: 1,
        calificacion: 4.2
      },
      {
        id: 'inst_002',
        nombre: 'Autoridad Nacional de Licencias Ambientales',
        sigla: 'ANLA',
        tipo: 'publica',
        nivel: 'nacional',
        sector: 'ambiental',
        ubicacion: 'Bogotá D.C.',
        director: 'Dra. Claudia Victoria González',
        telefono: '601-332-3400',
        email: 'contacto@anla.gov.co',
        sitioWeb: 'www.anla.gov.co',
        descripcion: 'Entidad encargada de la evaluación, seguimiento y control de los proyectos que requieren licencia ambiental',
        estado: 'activa',
        denuncias: 8,
        investigaciones: 3,
        sanciones: 2,
        calificacion: 3.8
      },
      {
        id: 'inst_003',
        nombre: 'Corporación Autónoma Regional del Cauca',
        sigla: 'CRC',
        tipo: 'publica',
        nivel: 'regional',
        sector: 'ambiental',
        ubicacion: 'Popayán, Cauca',
        director: 'Dr. Yesid González',
        telefono: '602-820-9900',
        email: 'contacto@crc.gov.co',
        sitioWeb: 'www.crc.gov.co',
        descripcion: 'Autoridad ambiental regional del departamento del Cauca',
        estado: 'activa',
        denuncias: 12,
        investigaciones: 5,
        sanciones: 3,
        calificacion: 3.5
      },
      {
        id: 'inst_004',
        nombre: 'Empresa Minera El Cerrejón',
        sigla: 'CERR',
        tipo: 'privada',
        nivel: 'nacional',
        sector: 'minero',
        ubicacion: 'La Guajira',
        director: 'Ing. Guillermo Fonseca',
        telefono: '605-727-0000',
        email: 'contacto@cerrejon.com',
        sitioWeb: 'www.cerrejon.com',
        descripcion: 'Empresa minera dedicada a la explotación de carbón a cielo abierto',
        estado: 'activa',
        denuncias: 15,
        investigaciones: 8,
        sanciones: 4,
        calificacion: 2.9
      }
    ];

    const tiposSimulados = [
      { id: 'publica', nombre: 'Pública', color: 'bg-blue-100 text-blue-800' },
      { id: 'privada', nombre: 'Privada', color: 'bg-green-100 text-green-800' },
      { id: 'mixta', nombre: 'Mixta', color: 'bg-purple-100 text-purple-800' },
      { id: 'internacional', nombre: 'Internacional', color: 'bg-orange-100 text-orange-800' }
    ];

    setInstituciones(institucionesSimuladas);
    setTipos(tiposSimulados);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activa': return 'bg-green-100 text-green-800';
      case 'suspendida': return 'bg-yellow-100 text-yellow-800';
      case 'liquidada': return 'bg-red-100 text-red-800';
      case 'en_reorganizacion': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo) => {
    const tipoObj = tipos.find(t => t.id === tipo);
    return tipoObj ? tipoObj.color : 'bg-gray-100 text-gray-800';
  };

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'nacional': return 'bg-red-100 text-red-800';
      case 'departamental': return 'bg-blue-100 text-blue-800';
      case 'municipal': return 'bg-green-100 text-green-800';
      case 'regional': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCalificacionColor = (calificacion) => {
    if (calificacion >= 4) return 'bg-green-100 text-green-800';
    if (calificacion >= 3) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Enviando institución:', nuevaInstitucion);
  };

  const institucionesFiltradas = instituciones.filter(institucion => {
    const cumpleTipo = filtroTipo === 'todos' || institucion.tipo === filtroTipo;
    const cumpleEstado = filtroEstado === 'todos' || institucion.estado === filtroEstado;
    const cumpleNivel = filtroNivel === 'todos' || institucion.nivel === filtroNivel;
    const cumpleBusqueda = busqueda === '' || 
      institucion.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      institucion.sigla.toLowerCase().includes(busqueda.toLowerCase()) ||
      institucion.ubicacion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleTipo && cumpleEstado && cumpleNivel && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Control de Instituciones
              </h1>
              <p className="text-gray-600 mt-1">
                Monitoreo y control de instituciones públicas y privadas en el territorio nacional
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema monitorea el desempeño y cumplimiento de las instituciones para garantizar la transparencia y eficiencia.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="instituciones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="instituciones">Instituciones</TabsTrigger>
            <TabsTrigger value="nueva">Nueva Institución</TabsTrigger>
            <TabsTrigger value="tipos">Tipos</TabsTrigger>
            <TabsTrigger value="denuncias">Denuncias</TabsTrigger>
            <TabsTrigger value="calificaciones">Calificaciones</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Instituciones */}
          <TabsContent value="instituciones" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar instituciones..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="filtro-tipo">Tipo</Label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los tipos</SelectItem>
                    {tipos.map(tipo => (
                      <SelectItem key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
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
                    <SelectItem value="activa">Activa</SelectItem>
                    <SelectItem value="suspendida">Suspendida</SelectItem>
                    <SelectItem value="liquidada">Liquidada</SelectItem>
                    <SelectItem value="en_reorganizacion">En Reorganización</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="filtro-nivel">Nivel</Label>
                <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los niveles</SelectItem>
                    <SelectItem value="nacional">Nacional</SelectItem>
                    <SelectItem value="departamental">Departamental</SelectItem>
                    <SelectItem value="municipal">Municipal</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Instituciones */}
            <div className="grid gap-6">
              {institucionesFiltradas.map(institucion => (
                <Card key={institucion.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{institucion.nombre}</CardTitle>
                        <p className="text-gray-600 mb-2">{institucion.sigla} - {institucion.ubicacion}</p>
                        <p className="text-sm text-gray-600 mb-4">{institucion.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(institucion.estado)}>
                            {institucion.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getTipoColor(institucion.tipo)}>
                            {institucion.tipo.toUpperCase()}
                          </Badge>
                          <Badge className={getNivelColor(institucion.nivel)}>
                            {institucion.nivel.toUpperCase()}
                          </Badge>
                          <Badge className={getCalificacionColor(institucion.calificacion)}>
                            {institucion.calificacion}/5
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{institucion.director}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>{institucion.denuncias} denuncias</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Scale className="h-4 w-4" />
                            <span>{institucion.investigaciones} investigaciones</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Gavel className="h-4 w-4" />
                            <span>{institucion.sanciones} sanciones</span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <strong>Teléfono:</strong> {institucion.telefono}
                          </div>
                          <div>
                            <strong>Email:</strong> {institucion.email}
                          </div>
                          <div>
                            <strong>Sitio Web:</strong> {institucion.sitioWeb}
                          </div>
                          <div>
                            <strong>Sector:</strong> {institucion.sector.replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevaInstitucion(institucion)}
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

          {/* Tab de Nueva Institución */}
          <TabsContent value="nueva" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Institución</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre de la Institución</Label>
                      <Input
                        id="nombre"
                        value={nuevaInstitucion.nombre}
                        onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, nombre: e.target.value})}
                        placeholder="Nombre completo de la institución"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="sigla">Sigla</Label>
                      <Input
                        id="sigla"
                        value={nuevaInstitucion.sigla}
                        onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, sigla: e.target.value})}
                        placeholder="Sigla de la institución"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="tipo">Tipo</Label>
                      <Select 
                        value={nuevaInstitucion.tipo} 
                        onValueChange={(value) => setNuevaInstitucion({...nuevaInstitucion, tipo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tipos.map(tipo => (
                            <SelectItem key={tipo.id} value={tipo.id}>
                              {tipo.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="nivel">Nivel</Label>
                      <Select 
                        value={nuevaInstitucion.nivel} 
                        onValueChange={(value) => setNuevaInstitucion({...nuevaInstitucion, nivel: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nacional">Nacional</SelectItem>
                          <SelectItem value="departamental">Departamental</SelectItem>
                          <SelectItem value="municipal">Municipal</SelectItem>
                          <SelectItem value="regional">Regional</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="sector">Sector</Label>
                      <Select 
                        value={nuevaInstitucion.sector} 
                        onValueChange={(value) => setNuevaInstitucion({...nuevaInstitucion, sector: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar sector" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minas_energia">Minas y Energía</SelectItem>
                          <SelectItem value="ambiental">Ambiental</SelectItem>
                          <SelectItem value="salud">Salud</SelectItem>
                          <SelectItem value="educacion">Educación</SelectItem>
                          <SelectItem value="infraestructura">Infraestructura</SelectItem>
                          <SelectItem value="agricultura">Agricultura</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="ubicacion">Ubicación</Label>
                      <Input
                        id="ubicacion"
                        value={nuevaInstitucion.ubicacion}
                        onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, ubicacion: e.target.value})}
                        placeholder="Ciudad, Departamento"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="director">Director/Representante</Label>
                      <Input
                        id="director"
                        value={nuevaInstitucion.director}
                        onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, director: e.target.value})}
                        placeholder="Nombre del director"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input
                        id="telefono"
                        value={nuevaInstitucion.telefono}
                        onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, telefono: e.target.value})}
                        placeholder="Número de teléfono"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={nuevaInstitucion.email}
                        onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, email: e.target.value})}
                        placeholder="correo@institucion.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="sitio-web">Sitio Web</Label>
                      <Input
                        id="sitio-web"
                        value={nuevaInstitucion.sitioWeb}
                        onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, sitioWeb: e.target.value})}
                        placeholder="www.institucion.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={nuevaInstitucion.descripcion}
                      onChange={(e) => setNuevaInstitucion({...nuevaInstitucion, descripcion: e.target.value})}
                      placeholder="Descripción de la institución y sus funciones"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Crear Institución
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Tipos */}
          <TabsContent value="tipos" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {tipos.map(tipo => (
                <Card key={tipo.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <span>{tipo.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      <p>Instituciones de tipo {tipo.nombre.toLowerCase()}</p>
                      <div className="mt-2">
                        <Badge className={tipo.color}>
                          {instituciones.filter(i => i.tipo === tipo.id).length} instituciones
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Denuncias */}
          <TabsContent value="denuncias" className="space-y-6">
            <div className="grid gap-6">
              {instituciones.filter(i => i.denuncias > 0).map(institucion => (
                <Card key={institucion.id} className="border-orange-200">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-orange-800">
                      <AlertTriangle className="h-5 w-5" />
                      <span>{institucion.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{institucion.sigla} - {institucion.ubicacion}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-orange-600 font-medium">
                          {institucion.denuncias} denuncias recibidas
                        </span>
                        <span className="text-blue-600">
                          {institucion.investigaciones} investigaciones activas
                        </span>
                        <span className="text-red-600">
                          {institucion.sanciones} sanciones aplicadas
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Calificaciones */}
          <TabsContent value="calificaciones" className="space-y-6">
            <div className="grid gap-6">
              {instituciones
                .sort((a, b) => b.calificacion - a.calificacion)
                .map(institucion => (
                <Card key={institucion.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{institucion.nombre}</span>
                      <Badge className={getCalificacionColor(institucion.calificacion)}>
                        {institucion.calificacion}/5
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>{institucion.sigla} - {institucion.ubicacion}</p>
                      <div className="flex items-center space-x-4">
                        <span>{institucion.tipo.replace('_', ' ')}</span>
                        <span>{institucion.nivel}</span>
                        <span>{institucion.sector.replace('_', ' ')}</span>
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
                    <Building className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{instituciones.length}</p>
                      <p className="text-sm text-gray-600">Total Instituciones</p>
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
                        {instituciones.filter(i => i.estado === 'activa').length}
                      </p>
                      <p className="text-sm text-gray-600">Activas</p>
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
                        {instituciones.reduce((acc, i) => acc + i.denuncias, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Denuncias</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {(instituciones.reduce((acc, i) => acc + i.calificacion, 0) / instituciones.length).toFixed(1)}
                      </p>
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

export default ControlInstituciones;
