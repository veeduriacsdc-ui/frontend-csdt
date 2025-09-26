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
  Play,
  Target,
  TrendingUp
} from 'lucide-react';

const PlanesEtnodesarrolloAvanzado = () => {
  const [planes, setPlanes] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [filtroComunidad, setFiltroComunidad] = useState('todas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoPlan, setNuevoPlan] = useState({
    nombre: '',
    descripcion: '',
    comunidad: '',
    objetivo: '',
    duracion: '',
    presupuesto: '',
    estado: 'en_desarrollo',
    fechaInicio: '',
    fechaFin: '',
    responsables: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const planesSimulados = [
      {
        id: 'plan_001',
        nombre: 'Plan de Etnodesarrollo Nasa 2024-2028',
        descripcion: 'Plan integral de desarrollo del pueblo Nasa con enfoque en autonomía territorial',
        comunidad: 'nasa',
        objetivo: 'Fortalecer la autonomía territorial y cultural del pueblo Nasa',
        duracion: '4 años',
        presupuesto: '5000000000',
        estado: 'en_desarrollo',
        fechaInicio: '2024-01-01',
        fechaFin: '2028-12-31',
        responsables: ['Consejo Nasa', 'Gobierno Nacional'],
        avance: 35,
        proyectos: 12,
        beneficiarios: 15000
      },
      {
        id: 'plan_002',
        nombre: 'Etnodesarrollo Wayuu Sostenible',
        descripcion: 'Plan de desarrollo sostenible para el pueblo Wayuu en La Guajira',
        comunidad: 'wayuu',
        objetivo: 'Desarrollo sostenible con respeto a la cultura Wayuu',
        duracion: '5 años',
        presupuesto: '7500000000',
        estado: 'aprobado',
        fechaInicio: '2023-06-01',
        fechaFin: '2028-05-31',
        responsables: ['Consejo Wayuu', 'Gobierno Departamental'],
        avance: 60,
        proyectos: 18,
        beneficiarios: 25000
      }
    ];

    const comunidadesSimuladas = [
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca' },
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira' },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó' },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico' }
    ];

    setPlanes(planesSimulados);
    setComunidades(comunidadesSimuladas);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'aprobado': return 'bg-green-100 text-green-800';
      case 'en_desarrollo': return 'bg-yellow-100 text-yellow-800';
      case 'en_revision': return 'bg-blue-100 text-blue-800';
      case 'rechazado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvanceColor = (avance) => {
    if (avance >= 80) return 'bg-green-100 text-green-800';
    if (avance >= 60) return 'bg-yellow-100 text-yellow-800';
    if (avance >= 40) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
  };

  const planesFiltrados = planes.filter(plan => {
    const cumpleComunidad = filtroComunidad === 'todas' || plan.comunidad === filtroComunidad;
    const cumpleEstado = filtroEstado === 'todos' || plan.estado === filtroEstado;
    const cumpleBusqueda = busqueda === '' || 
      plan.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      plan.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumpleEstado && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Planes de Etnodesarrollo Avanzado
              </h1>
              <p className="text-gray-600 mt-1">
                Gestión avanzada de planes de desarrollo étnico con enfoque integral
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema gestiona planes integrales de etnodesarrollo que promueven el desarrollo sostenible de las comunidades étnicas.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="planes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="planes">Planes</TabsTrigger>
            <TabsTrigger value="nuevo">Nuevo Plan</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
            <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
            <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Planes */}
          <TabsContent value="planes" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar planes..."
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
                    <SelectItem value="aprobado">Aprobado</SelectItem>
                    <SelectItem value="en_desarrollo">En Desarrollo</SelectItem>
                    <SelectItem value="en_revision">En Revisión</SelectItem>
                    <SelectItem value="rechazado">Rechazado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Planes */}
            <div className="grid gap-6">
              {planesFiltrados.map(plan => (
                <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{plan.nombre}</CardTitle>
                        <p className="text-gray-600 mb-4">{plan.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(plan.estado)}>
                            {plan.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getAvanceColor(plan.avance)}>
                            {plan.avance}% COMPLETADO
                          </Badge>
                          <Badge variant="outline">
                            {plan.duracion}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Target className="h-4 w-4" />
                            <span>{plan.proyectos} proyectos</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{plan.beneficiarios.toLocaleString()} beneficiarios</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4" />
                            <span>${parseInt(plan.presupuesto).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{plan.fechaInicio} - {plan.fechaFin}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Objetivo:</p>
                          <p className="text-sm text-gray-600">{plan.objetivo}</p>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Responsables:</p>
                          <div className="flex flex-wrap gap-1">
                            {plan.responsables.map((responsable, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {responsable}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevoPlan(plan)}
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

          {/* Tab de Nuevo Plan */}
          <TabsContent value="nuevo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuevo Plan de Etnodesarrollo</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre del Plan</Label>
                      <Input
                        id="nombre"
                        value={nuevoPlan.nombre}
                        onChange={(e) => setNuevoPlan({...nuevoPlan, nombre: e.target.value})}
                        placeholder="Nombre del plan de etnodesarrollo"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevoPlan.comunidad} 
                        onValueChange={(value) => setNuevoPlan({...nuevoPlan, comunidad: value})}
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
                      value={nuevoPlan.descripcion}
                      onChange={(e) => setNuevoPlan({...nuevoPlan, descripcion: e.target.value})}
                      placeholder="Describa el plan de etnodesarrollo"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="objetivo">Objetivo Principal</Label>
                    <Textarea
                      id="objetivo"
                      value={nuevoPlan.objetivo}
                      onChange={(e) => setNuevoPlan({...nuevoPlan, objetivo: e.target.value})}
                      placeholder="Objetivo principal del plan"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="duracion">Duración</Label>
                      <Input
                        id="duracion"
                        value={nuevoPlan.duracion}
                        onChange={(e) => setNuevoPlan({...nuevoPlan, duracion: e.target.value})}
                        placeholder="Ej: 4 años"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="presupuesto">Presupuesto</Label>
                      <Input
                        id="presupuesto"
                        type="number"
                        value={nuevoPlan.presupuesto}
                        onChange={(e) => setNuevoPlan({...nuevoPlan, presupuesto: e.target.value})}
                        placeholder="Presupuesto en pesos"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="estado">Estado</Label>
                      <Select 
                        value={nuevoPlan.estado} 
                        onValueChange={(value) => setNuevoPlan({...nuevoPlan, estado: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar estado" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en_desarrollo">En Desarrollo</SelectItem>
                          <SelectItem value="en_revision">En Revisión</SelectItem>
                          <SelectItem value="aprobado">Aprobado</SelectItem>
                          <SelectItem value="rechazado">Rechazado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fecha-inicio">Fecha de Inicio</Label>
                      <Input
                        id="fecha-inicio"
                        type="date"
                        value={nuevoPlan.fechaInicio}
                        onChange={(e) => setNuevoPlan({...nuevoPlan, fechaInicio: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="fecha-fin">Fecha de Fin</Label>
                      <Input
                        id="fecha-fin"
                        type="date"
                        value={nuevoPlan.fechaFin}
                        onChange={(e) => setNuevoPlan({...nuevoPlan, fechaFin: e.target.value})}
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
                      Crear Plan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Proyectos */}
          <TabsContent value="proyectos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Proyectos de Etnodesarrollo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Módulo de gestión de proyectos en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Seguimiento */}
          <TabsContent value="seguimiento" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seguimiento de Planes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Módulo de seguimiento en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Indicadores */}
          <TabsContent value="indicadores" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores de Etnodesarrollo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Módulo de indicadores en desarrollo</p>
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
                    <Target className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{planes.length}</p>
                      <p className="text-sm text-gray-600">Total Planes</p>
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
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {planes.reduce((acc, p) => acc + p.proyectos, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Proyectos</p>
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
                        {planes.reduce((acc, p) => acc + p.beneficiarios, 0).toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">Total Beneficiarios</p>
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

export default PlanesEtnodesarrolloAvanzado;
