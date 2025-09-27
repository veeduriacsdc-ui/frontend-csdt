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
  Handshake,
  MessageCircle
} from 'lucide-react';

const MediacionIntercultural = () => {
  const [mediaciones, setMediaciones] = useState([]);
  const [mediadores, setMediadores] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [filtroCom, setFiltroCom] = useState('todas');
  const [filtroEst, setFiltroEst] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevaMediacion, setNuevaMediacion] = useState({
    tit: '',
    des: '',
    com: '',
    med: '',
    tip: 'conflicto_territorial',
    est: 'pendiente',
    fec_ini: '',
    fec_fin: '',
    res: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const mediacionesSimuladas = [
      {
        id: 'mediacion_001',
        titulo: 'Mediación Territorial Wayuu',
        descripcion: 'Conflicto territorial entre comunidad Wayuu y empresa minera',
        comunidad: 'wayuu',
        mediador: 'mediador_001',
        tipo: 'conflicto_territorial',
        estado: 'en_proceso',
        fechaInicio: '2024-01-15',
        fechaFin: '2024-03-15',
        resultado: '',
        participantes: 25,
        sesiones: 8,
        acuerdos: 3
      },
      {
        id: 'mediacion_002',
        titulo: 'Mediación Cultural Nasa',
        descripcion: 'Conflicto cultural entre comunidad Nasa y entidad estatal',
        comunidad: 'nasa',
        mediador: 'mediador_002',
        tipo: 'conflicto_cultural',
        estado: 'completada',
        fechaInicio: '2023-10-01',
        fechaFin: '2023-12-15',
        resultado: 'Acuerdo satisfactorio alcanzado',
        participantes: 15,
        sesiones: 12,
        acuerdos: 5
      }
    ];

    const mediadoresSimulados = [
      {
        id: 'mediador_001',
        nombre: 'Dr. Carlos Mendez',
        especialidad: 'derecho_etnico',
        experiencia: '10 años',
        comunidades: ['wayuu', 'nasa'],
        casos: 45,
        calificacion: 4.8
      },
      {
        id: 'mediador_002',
        nombre: 'Dra. Ana Rodriguez',
        especialidad: 'mediacion_intercultural',
        experiencia: '8 años',
        comunidades: ['nasa', 'embera'],
        casos: 32,
        calificacion: 4.6
      }
    ];

    const comunidadesSimuladas = [
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira' },
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca' },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó' },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico' }
    ];

    setMediaciones(mediacionesSimuladas);
    setMediadores(mediadoresSimulados);
    setComunidades(comunidadesSimuladas);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800';
      case 'en_proceso': return 'bg-blue-100 text-blue-800';
      case 'completada': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'conflicto_territorial': return 'bg-green-100 text-green-800';
      case 'conflicto_cultural': return 'bg-purple-100 text-purple-800';
      case 'conflicto_economico': return 'bg-blue-100 text-blue-800';
      case 'conflicto_ambiental': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
  };

  const mediacionesFiltradas = mediaciones.filter(mediacion => {
    const cumpleComunidad = filtroComunidad === 'todas' || mediacion.comunidad === filtroComunidad;
    const cumpleEstado = filtroEstado === 'todos' || mediacion.estado === filtroEstado;
    const cumpleBusqueda = busqueda === '' || 
      mediacion.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      mediacion.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumpleEstado && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Handshake className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Mediación Intercultural
              </h1>
              <p className="text-gray-600 mt-1">
                Sistema de mediación para resolver conflictos interculturales de manera pacífica
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema facilita la resolución pacífica de conflictos entre comunidades étnicas y otros actores.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="mediaciones" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="mediaciones">Mediaciones</TabsTrigger>
            <TabsTrigger value="nueva">Nueva Mediación</TabsTrigger>
            <TabsTrigger value="mediadores">Mediadores</TabsTrigger>
            <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            <TabsTrigger value="acuerdos">Acuerdos</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Mediaciones */}
          <TabsContent value="mediaciones" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar mediaciones..."
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
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                    <SelectItem value="completada">Completada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Mediaciones */}
            <div className="grid gap-6">
              {mediacionesFiltradas.map(mediacion => (
                <Card key={mediacion.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{mediacion.titulo}</CardTitle>
                        <p className="text-gray-600 mb-4">{mediacion.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(mediacion.estado)}>
                            {mediacion.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getTipoColor(mediacion.tipo)}>
                            {mediacion.tipo.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{mediacion.participantes} participantes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>{mediacion.sesiones} sesiones</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4" />
                            <span>{mediacion.acuerdos} acuerdos</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{mediacion.fechaInicio} - {mediacion.fechaFin}</span>
                          </div>
                        </div>

                        {mediacion.resultado && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                            <p className="text-sm text-green-800">
                              <strong>Resultado:</strong> {mediacion.resultado}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevaMediacion(mediacion)}
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

          {/* Tab de Nueva Mediación */}
          <TabsContent value="nueva" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Mediación Intercultural</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="titulo">Título de la Mediación</Label>
                      <Input
                        id="titulo"
                        value={nuevaMediacion.titulo}
                        onChange={(e) => setNuevaMediacion({...nuevaMediacion, titulo: e.target.value})}
                        placeholder="Título de la mediación"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevaMediacion.comunidad} 
                        onValueChange={(value) => setNuevaMediacion({...nuevaMediacion, comunidad: value})}
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
                    <Label htmlFor="descripcion">Descripción del Conflicto</Label>
                    <Textarea
                      id="descripcion"
                      value={nuevaMediacion.descripcion}
                      onChange={(e) => setNuevaMediacion({...nuevaMediacion, descripcion: e.target.value})}
                      placeholder="Describa el conflicto que requiere mediación"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="mediador">Mediador</Label>
                      <Select 
                        value={nuevaMediacion.mediador} 
                        onValueChange={(value) => setNuevaMediacion({...nuevaMediacion, mediador: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar mediador" />
                        </SelectTrigger>
                        <SelectContent>
                          {mediadores.map(mediador => (
                            <SelectItem key={mediador.id} value={mediador.id}>
                              {mediador.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tipo">Tipo de Conflicto</Label>
                      <Select 
                        value={nuevaMediacion.tipo} 
                        onValueChange={(value) => setNuevaMediacion({...nuevaMediacion, tipo: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conflicto_territorial">Conflicto Territorial</SelectItem>
                          <SelectItem value="conflicto_cultural">Conflicto Cultural</SelectItem>
                          <SelectItem value="conflicto_economico">Conflicto Económico</SelectItem>
                          <SelectItem value="conflicto_ambiental">Conflicto Ambiental</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                      <Input
                        id="fecha-inicio"
                        type="date"
                        value={nuevaMediacion.fechaInicio}
                        onChange={(e) => setNuevaMediacion({...nuevaMediacion, fechaInicio: e.target.value})}
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
                      Crear Mediación
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Mediadores */}
          <TabsContent value="mediadores" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mediadores.map(mediador => (
                <Card key={mediador.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Handshake className="h-5 w-5 text-blue-600" />
                      <span>{mediador.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{mediador.especialidad.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{mediador.experiencia}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>{mediador.casos} casos</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4" />
                        <span>{mediador.calificacion}/5</span>
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
                          {mediaciones.filter(m => m.comunidad === comunidad.id).length} mediaciones
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Acuerdos */}
          <TabsContent value="acuerdos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acuerdos de Mediación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mediaciones.filter(m => m.acuerdos > 0).map(mediacion => (
                    <div key={mediacion.id} className="p-4 border rounded-lg">
                      <h3 className="font-semibold mb-2">{mediacion.titulo}</h3>
                      <p className="text-sm text-gray-600 mb-2">{mediacion.descripcion}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="text-green-600 font-medium">
                          {mediacion.acuerdos} acuerdos alcanzados
                        </span>
                        <span className="text-gray-500">
                          {mediacion.sesiones} sesiones realizadas
                        </span>
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
                    <Handshake className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{mediaciones.length}</p>
                      <p className="text-sm text-gray-600">Total Mediaciones</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{mediadores.length}</p>
                      <p className="text-sm text-gray-600">Mediadores</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {mediaciones.reduce((acc, m) => acc + m.acuerdos, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Acuerdos Totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {mediaciones.reduce((acc, m) => acc + m.sesiones, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Sesiones Totales</p>
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

export default MediacionIntercultural;
