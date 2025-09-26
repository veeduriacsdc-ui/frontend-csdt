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
  GraduationCap,
  School,
  BookMarked
} from 'lucide-react';

const EducacionPropia = () => {
  const [programas, setProgramas] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [filtroComunidad, setFiltroComunidad] = useState('todas');
  const [filtroNivel, setFiltroNivel] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [nuevoPrograma, setNuevoPrograma] = useState({
    nombre: '',
    descripcion: '',
    comunidad: '',
    nivel: 'basica',
    modalidad: 'presencial',
    duracion: '',
    estado: 'activo',
    fechaInicio: '',
    estudiantes: 0
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const programasSimulados = [
      {
        id: 'programa_001',
        nombre: 'Educación Propia Nasa',
        descripcion: 'Programa de educación propia del pueblo Nasa en el Cauca',
        comunidad: 'nasa',
        nivel: 'basica',
        modalidad: 'presencial',
        duracion: '5 años',
        estado: 'activo',
        fechaInicio: '2020-02-01',
        estudiantes: 150,
        docentes: 8,
        sedes: 3
      },
      {
        id: 'programa_002',
        nombre: 'Saberes Wayuu',
        descripcion: 'Programa de preservación de saberes ancestrales Wayuu',
        comunidad: 'wayuu',
        nivel: 'media',
        modalidad: 'mixta',
        duracion: '3 años',
        estado: 'activo',
        fechaInicio: '2021-08-15',
        estudiantes: 89,
        docentes: 5,
        sedes: 2
      }
    ];

    const comunidadesSimuladas = [
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca' },
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira' },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó' },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico' }
    ];

    setProgramas(programasSimulados);
    setComunidades(comunidadesSimuladas);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activo': return 'bg-green-100 text-green-800';
      case 'inactivo': return 'bg-red-100 text-red-800';
      case 'en_desarrollo': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNivelColor = (nivel) => {
    switch (nivel) {
      case 'basica': return 'bg-blue-100 text-blue-800';
      case 'media': return 'bg-purple-100 text-purple-800';
      case 'superior': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Enviando programa de educación propia:', nuevoPrograma);
  };

  const programasFiltrados = programas.filter(programa => {
    const cumpleComunidad = filtroComunidad === 'todas' || programa.comunidad === filtroComunidad;
    const cumpleNivel = filtroNivel === 'todos' || programa.nivel === filtroNivel;
    const cumpleBusqueda = busqueda === '' || 
      programa.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      programa.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumpleNivel && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Educación Propia
              </h1>
              <p className="text-gray-600 mt-1">
                Programas de educación propia de las comunidades étnicas de Colombia
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Este sistema gestiona los programas de educación propia que preservan y transmiten los saberes ancestrales.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="programas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="programas">Programas</TabsTrigger>
            <TabsTrigger value="nuevo">Nuevo Programa</TabsTrigger>
            <TabsTrigger value="estudiantes">Estudiantes</TabsTrigger>
            <TabsTrigger value="docentes">Docentes</TabsTrigger>
            <TabsTrigger value="recursos">Recursos</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Programas */}
          <TabsContent value="programas" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar programas..."
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
                <Label htmlFor="filtro-nivel">Nivel</Label>
                <Select value={filtroNivel} onValueChange={setFiltroNivel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los niveles</SelectItem>
                    <SelectItem value="basica">Básica</SelectItem>
                    <SelectItem value="media">Media</SelectItem>
                    <SelectItem value="superior">Superior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Programas */}
            <div className="grid gap-6">
              {programasFiltrados.map(programa => (
                <Card key={programa.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{programa.nombre}</CardTitle>
                        <p className="text-gray-600 mb-4">{programa.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEstadoColor(programa.estado)}>
                            {programa.estado.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getNivelColor(programa.nivel)}>
                            {programa.nivel.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {programa.modalidad.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4" />
                            <span>{programa.estudiantes} estudiantes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-4 w-4" />
                            <span>{programa.docentes} docentes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <School className="h-4 w-4" />
                            <span>{programa.sedes} sedes</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>{programa.duracion}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setNuevoPrograma(programa)}
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

          {/* Tab de Nuevo Programa */}
          <TabsContent value="nuevo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nuevo Programa de Educación Propia</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre del Programa</Label>
                      <Input
                        id="nombre"
                        value={nuevoPrograma.nombre}
                        onChange={(e) => setNuevoPrograma({...nuevoPrograma, nombre: e.target.value})}
                        placeholder="Nombre del programa"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevoPrograma.comunidad} 
                        onValueChange={(value) => setNuevoPrograma({...nuevoPrograma, comunidad: value})}
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
                      value={nuevoPrograma.descripcion}
                      onChange={(e) => setNuevoPrograma({...nuevoPrograma, descripcion: e.target.value})}
                      placeholder="Describa el programa de educación propia"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="nivel">Nivel Educativo</Label>
                      <Select 
                        value={nuevoPrograma.nivel} 
                        onValueChange={(value) => setNuevoPrograma({...nuevoPrograma, nivel: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basica">Básica</SelectItem>
                          <SelectItem value="media">Media</SelectItem>
                          <SelectItem value="superior">Superior</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="modalidad">Modalidad</Label>
                      <Select 
                        value={nuevoPrograma.modalidad} 
                        onValueChange={(value) => setNuevoPrograma({...nuevoPrograma, modalidad: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar modalidad" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="presencial">Presencial</SelectItem>
                          <SelectItem value="virtual">Virtual</SelectItem>
                          <SelectItem value="mixta">Mixta</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="duracion">Duración</Label>
                      <Input
                        id="duracion"
                        value={nuevoPrograma.duracion}
                        onChange={(e) => setNuevoPrograma({...nuevoPrograma, duracion: e.target.value})}
                        placeholder="Ej: 5 años"
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
                      Crear Programa
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Estudiantes */}
          <TabsContent value="estudiantes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Estudiantes de Educación Propia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Módulo de gestión de estudiantes en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Docentes */}
          <TabsContent value="docentes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Docentes de Educación Propia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Módulo de gestión de docentes en desarrollo</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Recursos */}
          <TabsContent value="recursos" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recursos Educativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BookMarked className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Módulo de recursos educativos en desarrollo</p>
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
                    <BookOpen className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{programas.length}</p>
                      <p className="text-sm text-gray-600">Total Programas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {programas.reduce((acc, p) => acc + p.estudiantes, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Estudiantes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {programas.reduce((acc, p) => acc + p.docentes, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Docentes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <School className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {programas.reduce((acc, p) => acc + p.sedes, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Sedes</p>
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

export default EducacionPropia;
