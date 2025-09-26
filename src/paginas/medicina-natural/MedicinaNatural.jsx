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
  Leaf, 
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
  FlaskConical,
  Zap,
  Filter,
  MapPin
} from 'lucide-react';

const MedicinaNatural = () => {
  const [plantas, setPlantas] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroComunidad, setFiltroComunidad] = useState('todas');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [nuevaPlanta, setNuevaPlanta] = useState({
    nombre: '',
    nombreCientifico: '',
    comunidad: '',
    categoria: 'digestiva',
    propiedades: '',
    preparacion: '',
    dosis: '',
    contraindicaciones: '',
    uso: 'medicinal',
    estacion: 'todo_el_ano',
    parteUsada: 'hojas',
    imagen: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const plantasSimuladas = [
      {
        id: 'planta_001',
        nombre: 'Yerba Buena',
        nombreCientifico: 'Mentha spicata',
        comunidad: 'wayuu',
        categoria: 'digestiva',
        propiedades: 'Digestiva, antiespasmódica, carminativa',
        preparacion: 'Infusión de hojas frescas o secas',
        dosis: '1 taza 3 veces al día',
        contraindicaciones: 'No usar en embarazo',
        uso: 'medicinal',
        estacion: 'todo_el_ano',
        parteUsada: 'hojas',
        imagen: 'yerba_buena.jpg',
        verificada: true,
        casosExito: 45
      },
      {
        id: 'planta_002',
        nombre: 'Coca',
        nombreCientifico: 'Erythroxylum coca',
        comunidad: 'nasa',
        categoria: 'energizante',
        propiedades: 'Energizante, analgésica, estimulante',
        preparacion: 'Masticación de hojas frescas',
        dosis: 'Según necesidad',
        contraindicaciones: 'No usar en exceso',
        uso: 'ritual_medicinal',
        estacion: 'todo_el_ano',
        parteUsada: 'hojas',
        imagen: 'coca.jpg',
        verificada: true,
        casosExito: 78
      },
      {
        id: 'planta_003',
        nombre: 'Jengibre',
        nombreCientifico: 'Zingiber officinale',
        comunidad: 'afrocolombiana',
        categoria: 'digestiva',
        propiedades: 'Digestiva, antiinflamatoria, antimicrobiana',
        preparacion: 'Decocción de rizoma fresco',
        dosis: '1 taza 2 veces al día',
        contraindicaciones: 'No usar en úlceras gástricas',
        uso: 'medicinal',
        estacion: 'todo_el_ano',
        parteUsada: 'rizoma',
        imagen: 'jengibre.jpg',
        verificada: true,
        casosExito: 92
      },
      {
        id: 'planta_004',
        nombre: 'Manzanilla',
        nombreCientifico: 'Matricaria chamomilla',
        comunidad: 'embera',
        categoria: 'relajante',
        propiedades: 'Relajante, antiinflamatoria, digestiva',
        preparacion: 'Infusión de flores secas',
        dosis: '1 taza antes de dormir',
        contraindicaciones: 'Alergias a la familia de las asteráceas',
        uso: 'medicinal',
        estacion: 'primavera_verano',
        parteUsada: 'flores',
        imagen: 'manzanilla.jpg',
        verificada: true,
        casosExito: 67
      }
    ];

    const comunidadesSimuladas = [
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira', poblacion: 270000 },
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca', poblacion: 150000 },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico', poblacion: 4500000 },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó', poblacion: 80000 },
      { id: 'kogui', nombre: 'Kogui', territorio: 'Sierra Nevada', poblacion: 12000 },
      { id: 'rom', nombre: 'Rrom', territorio: 'Nacional', poblacion: 5000 }
    ];

    const categoriasSimuladas = [
      { id: 'digestiva', nombre: 'Digestiva', icono: '🌿', color: 'bg-green-100 text-green-800' },
      { id: 'respiratoria', nombre: 'Respiratoria', icono: '🫁', color: 'bg-blue-100 text-blue-800' },
      { id: 'circulatoria', nombre: 'Circulatoria', icono: '❤️', color: 'bg-red-100 text-red-800' },
      { id: 'nerviosa', nombre: 'Nerviosa', icono: '🧠', color: 'bg-purple-100 text-purple-800' },
      { id: 'energizante', nombre: 'Energizante', icono: '⚡', color: 'bg-yellow-100 text-yellow-800' },
      { id: 'relajante', nombre: 'Relajante', icono: '😌', color: 'bg-pink-100 text-pink-800' },
      { id: 'antiinflamatoria', nombre: 'Antiinflamatoria', icono: '🩹', color: 'bg-orange-100 text-orange-800' },
      { id: 'antimicrobiana', nombre: 'Antimicrobiana', icono: '🦠', color: 'bg-indigo-100 text-indigo-800' }
    ];

    setPlantas(plantasSimuladas);
    setComunidades(comunidadesSimuladas);
    setCategorias(categoriasSimuladas);
  };

  const getCategoriaColor = (categoria) => {
    const cat = categorias.find(c => c.id === categoria);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const getUsoColor = (uso) => {
    switch (uso) {
      case 'medicinal': return 'bg-blue-100 text-blue-800';
      case 'ritual': return 'bg-purple-100 text-purple-800';
      case 'ritual_medicinal': return 'bg-indigo-100 text-indigo-800';
      case 'alimentario': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEstacionColor = (estacion) => {
    switch (estacion) {
      case 'todo_el_ano': return 'bg-green-100 text-green-800';
      case 'primavera_verano': return 'bg-yellow-100 text-yellow-800';
      case 'otono_invierno': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log('Enviando planta medicinal:', nuevaPlanta);
    // Aquí se implementaría la lógica de envío
  };

  const manejarEdicion = (planta) => {
    setNuevaPlanta(planta);
  };

  const manejarEliminacion = (id) => {
    setPlantas(plantas.filter(p => p.id !== id));
  };

  const generarPDF = (planta) => {
    console.log('Generando PDF para planta:', planta.nombre);
  };

  const plantasFiltradas = plantas.filter(planta => {
    const cumpleComunidad = filtroComunidad === 'todas' || planta.comunidad === filtroComunidad;
    const cumpleCategoria = filtroCategoria === 'todas' || planta.categoria === filtroCategoria;
    const cumpleBusqueda = busqueda === '' || 
      planta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      planta.nombreCientifico.toLowerCase().includes(busqueda.toLowerCase()) ||
      planta.propiedades.toLowerCase().includes(busqueda.toLowerCase());
    
    return cumpleComunidad && cumpleCategoria && cumpleBusqueda;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Medicina Natural
              </h1>
              <p className="text-gray-600 mt-1">
                Catálogo de plantas medicinales de las comunidades étnicas de Colombia
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Heart className="h-4 w-4" />
            <AlertDescription>
              Este sistema preserva y difunde el conocimiento ancestral sobre plantas medicinales de las comunidades étnicas.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="plantas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="plantas">Plantas</TabsTrigger>
            <TabsTrigger value="categorias">Categorías</TabsTrigger>
            <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
            <TabsTrigger value="agregar">Agregar</TabsTrigger>
            <TabsTrigger value="buscar">Buscar</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Plantas */}
          <TabsContent value="plantas" className="space-y-6">
            {/* Filtros y Búsqueda */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <Label htmlFor="busqueda">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="busqueda"
                    placeholder="Buscar por nombre, científico o propiedades..."
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

            {/* Lista de Plantas */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plantasFiltradas.map(planta => (
                <Card key={planta.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{planta.nombre}</CardTitle>
                        <p className="text-sm text-gray-600 italic mb-2">{planta.nombreCientifico}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getCategoriaColor(planta.categoria)}>
                            {categorias.find(c => c.id === planta.categoria)?.icono} {categorias.find(c => c.id === planta.categoria)?.nombre}
                          </Badge>
                          <Badge className={getUsoColor(planta.uso)}>
                            {planta.uso.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge className={getEstacionColor(planta.estacion)}>
                            {planta.estacion.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{planta.propiedades}</p>

                        <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                          <div>
                            <strong>Preparación:</strong> {planta.preparacion}
                          </div>
                          <div>
                            <strong>Dosis:</strong> {planta.dosis}
                          </div>
                          <div>
                            <strong>Parte usada:</strong> {planta.parteUsada}
                          </div>
                          <div>
                            <strong>Casos éxito:</strong> {planta.casosExito}
                          </div>
                        </div>

                        {planta.contraindicaciones && (
                          <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                            <p className="text-xs text-yellow-800">
                              <strong>Contraindicaciones:</strong> {planta.contraindicaciones}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex space-x-1 ml-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => manejarEdicion(planta)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => generarPDF(planta)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => manejarEliminacion(planta.id)}
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

          {/* Tab de Categorías */}
          <TabsContent value="categorias" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                      <p>Plantas con propiedades {categoria.nombre.toLowerCase()}</p>
                      <div className="mt-2">
                        <Badge className={categoria.color}>
                          {plantas.filter(p => p.categoria === categoria.id).length} plantas
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
                          {plantas.filter(p => p.comunidad === comunidad.id).length} plantas
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Agregar */}
          <TabsContent value="agregar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nueva Planta Medicinal</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={manejarEnvio} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="nombre">Nombre Común</Label>
                      <Input
                        id="nombre"
                        value={nuevaPlanta.nombre}
                        onChange={(e) => setNuevaPlanta({...nuevaPlanta, nombre: e.target.value})}
                        placeholder="Nombre común de la planta"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="nombre-cientifico">Nombre Científico</Label>
                      <Input
                        id="nombre-cientifico"
                        value={nuevaPlanta.nombreCientifico}
                        onChange={(e) => setNuevaPlanta({...nuevaPlanta, nombreCientifico: e.target.value})}
                        placeholder="Nombre científico de la planta"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="comunidad">Comunidad</Label>
                      <Select 
                        value={nuevaPlanta.comunidad} 
                        onValueChange={(value) => setNuevaPlanta({...nuevaPlanta, comunidad: value})}
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
                    
                    <div>
                      <Label htmlFor="categoria">Categoría</Label>
                      <Select 
                        value={nuevaPlanta.categoria} 
                        onValueChange={(value) => setNuevaPlanta({...nuevaPlanta, categoria: value})}
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
                      <Label htmlFor="uso">Uso</Label>
                      <Select 
                        value={nuevaPlanta.uso} 
                        onValueChange={(value) => setNuevaPlanta({...nuevaPlanta, uso: value})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar uso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="medicinal">Medicinal</SelectItem>
                          <SelectItem value="ritual">Ritual</SelectItem>
                          <SelectItem value="ritual_medicinal">Ritual y Medicinal</SelectItem>
                          <SelectItem value="alimentario">Alimentario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="propiedades">Propiedades Medicinales</Label>
                    <Textarea
                      id="propiedades"
                      value={nuevaPlanta.propiedades}
                      onChange={(e) => setNuevaPlanta({...nuevaPlanta, propiedades: e.target.value})}
                      placeholder="Describa las propiedades medicinales de la planta"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="preparacion">Preparación</Label>
                      <Textarea
                        id="preparacion"
                        value={nuevaPlanta.preparacion}
                        onChange={(e) => setNuevaPlanta({...nuevaPlanta, preparacion: e.target.value})}
                        placeholder="Cómo preparar la planta"
                        rows={2}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="dosis">Dosis</Label>
                      <Input
                        id="dosis"
                        value={nuevaPlanta.dosis}
                        onChange={(e) => setNuevaPlanta({...nuevaPlanta, dosis: e.target.value})}
                        placeholder="Dosis recomendada"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contraindicaciones">Contraindicaciones</Label>
                    <Textarea
                      id="contraindicaciones"
                      value={nuevaPlanta.contraindicaciones}
                      onChange={(e) => setNuevaPlanta({...nuevaPlanta, contraindicaciones: e.target.value})}
                      placeholder="Contraindicaciones y precauciones"
                      rows={2}
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                    <Button type="submit">
                      <Plus className="h-4 w-4 mr-2" />
                      Agregar Planta
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Buscar */}
          <TabsContent value="buscar" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Búsqueda Avanzada</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="busqueda-avanzada">Término de búsqueda</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="busqueda-avanzada"
                        placeholder="Buscar por nombre, propiedades, preparación..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="buscar-comunidad">Comunidad</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquier comunidad" />
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
                    
                    <div>
                      <Label htmlFor="buscar-categoria">Categoría</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquier categoría" />
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
                    
                    <div>
                      <Label htmlFor="buscar-uso">Uso</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Cualquier uso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos los usos</SelectItem>
                          <SelectItem value="medicinal">Medicinal</SelectItem>
                          <SelectItem value="ritual">Ritual</SelectItem>
                          <SelectItem value="ritual_medicinal">Ritual y Medicinal</SelectItem>
                          <SelectItem value="alimentario">Alimentario</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Search className="h-4 w-4 mr-2" />
                    Buscar Plantas
                  </Button>
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
                    <Leaf className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{plantas.length}</p>
                      <p className="text-sm text-gray-600">Total Plantas</p>
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
                    <FlaskConical className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{categorias.length}</p>
                      <p className="text-sm text-gray-600">Categorías</p>
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
                        {plantas.filter(p => p.verificada).length}
                      </p>
                      <p className="text-sm text-gray-600">Verificadas</p>
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

export default MedicinaNatural;
