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
  Clock
} from 'lucide-react';

const ConsultaPreviaEtnica = () => {
  const [consultas, setConsultas] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [filtroComunidad, setFiltroComunidad] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [nuevaConsulta, setNuevaConsulta] = useState({
    tit: '',
    des: '',
    com: '',
    pro: '',
    tip_con: 'informacion',
    fec_ini: '',
    fec_fin: '',
    doc: [],
    est: 'pendiente'
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const consultasSimuladas = [
      {
        id: 'consulta_001',
        titulo: 'Consulta Previa - Proyecto Minero El Cerrejón',
        descripcion: 'Consulta previa para la ampliación del proyecto minero en territorio Wayuu',
        comunidad: 'wayuu',
        proyecto: 'proyecto_001',
        tipoConsulta: 'consulta',
        fechaInicio: '2024-01-15',
        fechaFin: '2024-03-15',
        estado: 'en_proceso',
        participantes: 45,
        documentos: 12,
        avance: 65
      },
      {
        id: 'consulta_002',
        titulo: 'Consulta Previa - Construcción Carretera',
        descripcion: 'Consulta previa para la construcción de carretera que atraviesa territorio Nasa',
        comunidad: 'nasa',
        proyecto: 'proyecto_002',
        tipoConsulta: 'consulta',
        fechaInicio: '2024-02-01',
        fechaFin: '2024-04-01',
        estado: 'pendiente',
        participantes: 32,
        documentos: 8,
        avance: 25
      },
      {
        id: 'consulta_003',
        titulo: 'Consulta Previa - Proyecto Hidroeléctrico',
        descripcion: 'Consulta previa para proyecto hidroeléctrico en territorio Afrocolombiano',
        comunidad: 'afrocolombiana',
        proyecto: 'proyecto_003',
        tipoConsulta: 'consulta',
        fechaInicio: '2024-01-20',
        fechaFin: '2024-05-20',
        estado: 'completada',
        participantes: 78,
        documentos: 15,
        avance: 100
      }
    ];

    const comunidadesSimuladas = [
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira', poblacion: 270000 },
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca', poblacion: 150000 },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico', poblacion: 4500000 },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó', poblacion: 80000 },
      { id: 'kogui', nombre: 'Kogui', territorio: 'Sierra Nevada', poblacion: 12000 }
    ];

    const proyectosSimulados = [
      { id: 'proyecto_001', nombre: 'Proyecto Minero El Cerrejón', tipo: 'mineria', estado: 'activo' },
      { id: 'proyecto_002', nombre: 'Construcción Carretera', tipo: 'infraestructura', estado: 'planificacion' },
      { id: 'proyecto_003', nombre: 'Proyecto Hidroeléctrico', tipo: 'energia', estado: 'ejecucion' }
    ];

    setConsultas(consultasSimuladas);
    setComunidades(comunidadesSimuladas);
    setProyectos(proyectosSimulados);
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

  const getTipoConsultaColor = (tipo) => {
    switch (tipo) {
      case 'consulta': return 'bg-purple-100 text-purple-800';
      case 'informacion': return 'bg-blue-100 text-blue-800';
      case 'participacion': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de envío
  };

  const manejarEdicion = (consulta) => {
    setNuevaConsulta(consulta);
  };

  const manejarEliminacion = (id) => {
    setConsultas(consultas.filter(c => c.id !== id));
  };

  const generarReporte = (consulta) => {
  };

  const consultasFiltradas = consultas.filter(consulta => {
    const cumpleComunidad = filtroComunidad === 'todas' || consulta.comunidad === filtroComunidad;
    const cumpleEstado = filtroEstado === 'todos' || consulta.estado === filtroEstado;
    return cumpleComunidad && cumpleEstado;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Consulta Previa Étnica
              </h1>
              <p className="text-gray-600 mt-1">
                Gestión de consultas previas para comunidades étnicas de Colombia
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema garantiza el derecho fundamental de las comunidades étnicas a la consulta previa, libre e informada.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="consultas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="consultas">Consultas</TabsTrigger>
            <TabsTrigger value="nueva">Nueva Consulta</TabsTrigger>
            <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Consultas */}
          <TabsContent value="consultas" className="space-y-6">
            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-6">
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

            {/* Lista de Consultas */}
            <div className="grid gap-6">
              {consultasFiltradas.map(consulta => (
                <Card key={consulta.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{consulta.titulo}</CardTitle>
                        <p className="text-gray-600 mb-4">{consulta.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(consulta.estado)}>
                            {consulta.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getTipoConsultaColor(consulta.tipoConsulta)}>
                            {consulta.tipoConsulta.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{consulta.participantes} participantes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>{consulta.documentos} documentos</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{consulta.fechaInicio} - {consulta.fechaFin}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{consulta.avance}% completado</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => manejarEdicion(consulta)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generarReporte(consulta)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => manejarEliminacion(consulta.id)}
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

          {/* Tab de Nueva Consulta */}
          <TabsContent value="nueva" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Consulta Previa</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="titulo">Título de la Consulta</Label>
                      <Input
                        id="titulo"
                        value={nuevaConsulta.titulo}
                        onChange={(e) => setNuevaConsulta({...nuevaConsulta, titulo: e.target.value})}
                        placeholder="Ingrese el título de la consulta"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevaConsulta.comunidad} 
                        onValueChange={(value) => setNuevaConsulta({...nuevaConsulta, comunidad: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar comunidad" />
                        </SelectTrigger>
                        <SelectContent>
                          {comunidades.map(comunidad => (
                            <SelectItem key={comunidad.id} value={comunidad.id}>
                              {comunidad.nombre} - {comunidad.territorio}
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
                      value={nuevaConsulta.descripcion}
                      onChange={(e) => setNuevaConsulta({...nuevaConsulta, descripcion: e.target.value})}
                      placeholder="Describa los detalles de la consulta previa"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="proyecto">Proyecto</Label>
                      <Select 
                        value={nuevaConsulta.proyecto} 
                        onValueChange={(value) => setNuevaConsulta({...nuevaConsulta, proyecto: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar proyecto" />
                        </SelectTrigger>
                        <SelectContent>
                          {proyectos.map(proyecto => (
                            <SelectItem key={proyecto.id} value={proyecto.id}>
                              {proyecto.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="tipo-consulta">Tipo de Consulta</Label>
                      <Select 
                        value={nuevaConsulta.tipoConsulta} 
                        onValueChange={(value) => setNuevaConsulta({...nuevaConsulta, tipoConsulta: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="consulta">Consulta Previa</SelectItem>
                          <SelectItem value="informacion">Consulta de Información</SelectItem>
                          <SelectItem value="participacion">Participación Ciudadana</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                      <Input
                        id="fecha-inicio"
                        type="date"
                        value={nuevaConsulta.fechaInicio}
                        onChange={(e) => setNuevaConsulta({...nuevaConsulta, fechaInicio: e.target.value})}
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
                      Crear Consulta
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
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Proyectos */}
          <TabsContent value="proyectos" className="space-y-6">
            <div className="grid gap-6">
              {proyectos.map(proyecto => (
                <Card key={proyecto.id}>
                  <CardHeader>
                    <CardTitle>{proyecto.nombre}</CardTitle>
                    <div className="flex space-x-2">
                      <Badge variant="outline">{proyecto.tipo}</Badge>
                      <Badge className={getEstadoColor(proyecto.estado)}>
                        {proyecto.estado}
                      </Badge>
                    </div>
                  </CardHeader>
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
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{consultas.length}</p>
                      <p className="text-sm text-gray-600">Total Consultas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-green-600" />
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
                    <CheckCircle className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {consultas.filter(c => c.estado === 'completada').length}
                      </p>
                      <p className="text-sm text-gray-600">Completadas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {consultas.filter(c => c.estado === 'en_proceso').length}
                      </p>
                      <p className="text-sm text-gray-600">En Proceso</p>
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

export default ConsultaPreviaEtnica;
