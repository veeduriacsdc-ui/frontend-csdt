import React, { useState, useEffect } from 'react';
import PageTemplate from '../../../components/compartidas/PageTemplate';
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
  MapPin,
  TreePine,
  Flower2,
  Droplets
} from 'lucide-react';

const MedicinaNatural = () => {
  const [plantas, setPlantas] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCom, setFiltroCom] = useState('todas');
  const [filtroCat, setFiltroCat] = useState('todas');
  const [busqueda, setBusqueda] = useState('');
  const [nuevaPlanta, setNuevaPlanta] = useState({
    nom: '',
    nom_cien: '',
    com: '',
    cat: 'digestiva',
    prop: '',
    prep: '',
    dos: '',
    cont: '',
    uso: 'medicinal',
    est: 'todo_el_ano',
    par_usa: 'hojas',
    img: ''
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const plantasSimuladas = [
      {
        id: 'planta_001',
        nom: 'Manzanilla',
        nom_cien: 'Matricaria chamomilla',
        com: 'todas',
        cat: 'digestiva',
        prop: 'Antiinflamatoria, antiespasmódica, sedante suave',
        prep: 'Infusión de 1 cucharada por taza de agua hirviendo',
        dos: '2-3 tazas al día',
        cont: 'Alergia a las asteráceas',
        uso: 'medicinal',
        est: 'primavera_verano',
        par_usa: 'flores',
        img: '',
        casos: 45,
        efectividad: 95
      },
      {
        id: 'planta_002',
        nom: 'Eucalipto',
        nom_cien: 'Eucalyptus globulus',
        com: 'wayuu',
        cat: 'respiratoria',
        prop: 'Expectorante, antiséptico, descongestionante',
        prep: 'Vaporización o infusión de hojas',
        dos: '2-3 veces al día',
        cont: 'No usar en niños menores de 2 años',
        uso: 'medicinal',
        est: 'todo_el_ano',
        par_usa: 'hojas',
        img: '',
        casos: 32,
        efectividad: 88
      },
      {
        id: 'planta_003',
        nom: 'Aloe Vera',
        nom_cien: 'Aloe barbadensis',
        com: 'embera',
        cat: 'dermatologica',
        prop: 'Cicatrizante, antiinflamatoria, hidratante',
        prep: 'Gel fresco de la hoja',
        dos: 'Aplicar 2-3 veces al día',
        cont: 'No ingerir en grandes cantidades',
        uso: 'medicinal',
        est: 'todo_el_ano',
        par_usa: 'hojas',
        img: '',
        casos: 28,
        efectividad: 92
      },
      {
        id: 'planta_004',
        nom: 'Jengibre',
        nom_cien: 'Zingiber officinale',
        com: 'nasa',
        cat: 'digestiva',
        prop: 'Antiinflamatorio, digestivo, antinauseoso',
        prep: 'Infusión de raíz fresca o seca',
        dos: '1-2 tazas al día',
        cont: 'Evitar en embarazo avanzado',
        uso: 'medicinal',
        est: 'todo_el_ano',
        par_usa: 'raiz',
        img: '',
        casos: 38,
        efectividad: 90
      }
    ];

    const comunidadesSimuladas = [
      { id: 'wayuu', nom: 'Wayuu', territorio: 'La Guajira', poblacion: 270000 },
      { id: 'nasa', nom: 'Nasa', territorio: 'Cauca', poblacion: 150000 },
      { id: 'embera', nom: 'Embera', territorio: 'Chocó', poblacion: 80000 },
      { id: 'kogui', nom: 'Kogui', territorio: 'Sierra Nevada', poblacion: 12000 },
      { id: 'afrocolombiana', nom: 'Afrocolombiana', territorio: 'Pacífico', poblacion: 4500000 },
      { id: 'todas', nom: 'Todas las Comunidades', territorio: 'Nacional', poblacion: 0 }
    ];

    const categoriasSimuladas = [
      { id: 'digestiva', nom: 'Digestiva', icono: '🌿', color: 'bg-green-100 text-green-800' },
      { id: 'respiratoria', nom: 'Respiratoria', icono: '💨', color: 'bg-blue-100 text-blue-800' },
      { id: 'dermatologica', nom: 'Dermatológica', icono: '🌱', color: 'bg-emerald-100 text-emerald-800' },
      { id: 'nerviosa', nom: 'Sistema Nervioso', icono: '🧠', color: 'bg-purple-100 text-purple-800' },
      { id: 'cardiovascular', nom: 'Cardiovascular', icono: '❤️', color: 'bg-red-100 text-red-800' },
      { id: 'inmune', nom: 'Sistema Inmune', icono: '🛡️', color: 'bg-yellow-100 text-yellow-800' },
      { id: 'reproductiva', nom: 'Reproductiva', icono: '🌸', color: 'bg-pink-100 text-pink-800' }
    ];

    setPlantas(plantasSimuladas);
    setComunidades(comunidadesSimuladas);
    setCategorias(categoriasSimuladas);
  };

  const getCategoriaColor = (categoria) => {
    const cat = categorias.find(c => c.id === categoria);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const getEstacionIcon = (estacion) => {
    switch (estacion) {
      case 'primavera_verano': return '🌸';
      case 'otoño_invierno': return '🍂';
      case 'todo_el_ano': return '🌿';
      default: return '🌿';
    }
  };

  const getParteUsadaIcon = (parte) => {
    switch (parte) {
      case 'hojas': return '🍃';
      case 'flores': return '🌸';
      case 'raiz': return '🌱';
      case 'corteza': return '🌳';
      case 'fruto': return '🍎';
      default: return '🌿';
    }
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de envío
  };

  const manejarEdicion = (planta) => {
    setNuevaPlanta(planta);
  };

  const manejarEliminacion = (id) => {
    setPlantas(plantas.filter(p => p.id !== id));
  };

  const generarReporte = (planta) => {
  };

  const plantasFiltradas = plantas.filter(planta => {
    const cumpleComunidad = filtroComunidad === 'todas' || planta.comunidad === filtroComunidad;
    const cumpleCategoria = filtroCategoria === 'todas' || planta.categoria === filtroCategoria;
    const cumpleBusqueda = busqueda === '' || 
      planta.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      planta.nombreCientifico.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleComunidad && cumpleCategoria && cumpleBusqueda;
  });

  const stats = [
    { icon: Leaf, value: plantas.length, label: 'Plantas Medicinales' },
    { icon: Users, value: comunidades.length - 1, label: 'Comunidades' },
    { icon: FlaskConical, value: categorias.length, label: 'Categorías' },
    { icon: Star, value: Math.round(plantas.reduce((acc, p) => acc + p.efectividad, 0) / plantas.length), label: 'Efectividad Promedio' }
  ];

  const alerts = [
    {
      icon: Shield,
      message: 'Este sistema preserva y difunde el conocimiento tradicional de medicina natural de las comunidades étnicas de Colombia.'
    }
  ];

  const breadcrumbs = ['Inicio', 'Medicina Natural', 'Plantas Medicinales'];

  return (
    <PageTemplate
      title="Medicina Natural"
      subtitle="Conocimiento tradicional de plantas medicinales"
      description="Sistema integral para la preservación, difusión y gestión del conocimiento tradicional de medicina natural de las comunidades étnicas de Colombia, incluyendo plantas medicinales, preparaciones y usos terapéuticos."
      icon="🌿"
      category="Medicina Natural"
      color="green"
      stats={stats}
      alerts={alerts}
      breadcrumbs={breadcrumbs}
    >
      <Tabs defaultValue="plantas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="plantas">Plantas</TabsTrigger>
          <TabsTrigger value="nueva">Nueva Planta</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
          <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
          <TabsTrigger value="preparaciones">Preparaciones</TabsTrigger>
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
                  placeholder="Buscar por nombre o nombre científico..."
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
          <div className="grid gap-6">
            {plantasFiltradas.map(planta => (
              <Card key={planta.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getParteUsadaIcon(planta.parteUsada)}</span>
                        <div>
                          <CardTitle className="text-xl">{planta.nombre}</CardTitle>
                          <p className="text-sm text-gray-600 italic">{planta.nombreCientifico}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{planta.propiedades}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getCategoriaColor(planta.categoria)}>
                          {categorias.find(c => c.id === planta.categoria)?.icono} {categorias.find(c => c.id === planta.categoria)?.nombre}
                        </Badge>
                        <Badge variant="outline">
                          {getEstacionIcon(planta.estacion)} {planta.estacion.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {planta.parteUsada}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <FlaskConical className="h-4 w-4" />
                          <span>{planta.casos} casos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4" />
                          <span>{planta.efectividad}% efectividad</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{planta.estacion.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4" />
                          <span>{planta.preparacion.split(' ')[0]}</span>
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-700">Preparación:</p>
                          <p className="text-sm text-gray-600">{planta.preparacion}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Dosis:</p>
                          <p className="text-sm text-gray-600">{planta.dosis}</p>
                        </div>
                        {planta.contraindicaciones && (
                          <div>
                            <p className="text-sm font-medium text-gray-700">Contraindicaciones:</p>
                            <p className="text-sm text-red-600">{planta.contraindicaciones}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
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
                        onClick={() => generarReporte(planta)}
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

        {/* Tab de Nueva Planta */}
        <TabsContent value="nueva" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nueva Planta Medicinal</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={manejarEnvio} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nom">Nombre Común</Label>
                    <Input
                      id="nom"
                      value={nuevaPlanta.nom}
                      onChange={(e) => setNuevaPlanta({...nuevaPlanta, nom: e.target.value})}
                      placeholder="Nombre común de la planta"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="nom_cien">Nombre Científico</Label>
                    <Input
                      id="nom_cien"
                      value={nuevaPlanta.nom_cien}
                      onChange={(e) => setNuevaPlanta({...nuevaPlanta, nom_cien: e.target.value})}
                      placeholder="Nombre científico"
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
                    <Label htmlFor="parte-usada">Parte Usada</Label>
                    <Select 
                      value={nuevaPlanta.parteUsada} 
                      onValueChange={(value) => setNuevaPlanta({...nuevaPlanta, parteUsada: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar parte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hojas">Hojas</SelectItem>
                        <SelectItem value="flores">Flores</SelectItem>
                        <SelectItem value="raiz">Raíz</SelectItem>
                        <SelectItem value="corteza">Corteza</SelectItem>
                        <SelectItem value="fruto">Fruto</SelectItem>
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
                    placeholder="Describa las propiedades medicinales"
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
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dosis">Dosis</Label>
                    <Textarea
                      id="dosis"
                      value={nuevaPlanta.dosis}
                      onChange={(e) => setNuevaPlanta({...nuevaPlanta, dosis: e.target.value})}
                      placeholder="Dosis recomendada"
                      rows={3}
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
                    Crear Planta
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
                    <p>Plantas para el sistema {categoria.nombre.toLowerCase()}</p>
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
            {comunidades.filter(c => c.id !== 'todas').map(comunidad => (
              <Card key={comunidad.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-green-600" />
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
                        {plantas.filter(p => p.comunidad === comunidad.id || p.comunidad === 'todas').length} plantas
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Preparaciones */}
        <TabsContent value="preparaciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Preparaciones Medicinales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-blue-600" />
                    Preparaciones Líquidas
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>Infusión:</strong> Hojas y flores en agua hirviendo</li>
                    <li>• <strong>Decocción:</strong> Raíces y cortezas en agua hirviendo</li>
                    <li>• <strong>Tintura:</strong> Maceración en alcohol</li>
                    <li>• <strong>Jarabe:</strong> Extracto con miel o azúcar</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <FlaskConical className="h-5 w-5 mr-2 text-green-600" />
                    Preparaciones Sólidas
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>Polvo:</strong> Plantas secas molidas</li>
                    <li>• <strong>Cápsulas:</strong> Polvo encapsulado</li>
                    <li>• <strong>Pomada:</strong> Extracto con grasa</li>
                    <li>• <strong>Ungüento:</strong> Preparación semisólida</li>
                  </ul>
                </div>
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
                    <p className="text-sm text-gray-600">Plantas Medicinales</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">{comunidades.length - 1}</p>
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
                  <Star className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.round(plantas.reduce((acc, p) => acc + p.efectividad, 0) / plantas.length)}%
                    </p>
                    <p className="text-sm text-gray-600">Efectividad Promedio</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default MedicinaNatural;
