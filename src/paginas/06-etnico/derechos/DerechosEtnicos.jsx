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
  Scale, 
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
  Users,
  Gavel,
  BookMarked,
  MapPin
} from 'lucide-react';

const DerechosEtnicos = () => {
  const [derechos, setDerechos] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filtroCom, setFiltroCom] = useState('todas');
  const [filtroCat, setFiltroCat] = useState('todas');
  const [nuevoDerecho, setNuevoDerecho] = useState({
    tit: '',
    des: '',
    com: '',
    cat: 'territorial',
    mar_leg: '',
    est: 'vigente',
    fec_vig: '',
    doc: []
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    // Simular carga de datos
    const derechosSimulados = [
      {
        id: 'derecho_001',
        tit: 'Derecho a la Consulta Previa',
        des: 'Derecho fundamental de las comunidades étnicas a ser consultadas sobre decisiones que las afecten',
        com: 'todas',
        cat: 'participacion',
        mar_leg: 'Convenio 169 OIT, Constitución Política Art. 330',
        est: 'vigente',
        fec_vig: '1991-07-04',
        doc: ['convenio_169_oit.pdf', 'const_art_330.pdf'],
        casos: 45,
        violaciones: 12
      },
      {
        id: 'derecho_002',
        tit: 'Derecho al Territorio Ancestral',
        des: 'Derecho inalienable e imprescriptible de las comunidades étnicas sobre sus territorios ancestrales',
        com: 'wayuu',
        cat: 'territorial',
        mar_leg: 'Ley 70 de 1993, Decreto 2164 de 1995',
        est: 'vigente',
        fec_vig: '1993-08-27',
        doc: ['ley_70_1993.pdf', 'decreto_2164_1995.pdf'],
        casos: 23,
        violaciones: 8
      },
      {
        id: 'derecho_003',
        tit: 'Derecho a la Autonomía',
        des: 'Derecho de las comunidades étnicas a gobernarse según sus usos y costumbres',
        com: 'nasa',
        cat: 'autonomia',
        mar_leg: 'Constitución Política Art. 7, Ley 89 de 1890',
        est: 'vigente',
        fec_vig: '1991-07-04',
        doc: ['const_art_7.pdf', 'ley_89_1890.pdf'],
        casos: 18,
        violaciones: 5
      },
      {
        id: 'derecho_004',
        tit: 'Derecho a la Educación Propia',
        des: 'Derecho a una educación que respete y fortalezca la identidad cultural',
        com: 'embera',
        cat: 'educacion',
        mar_leg: 'Ley 115 de 1994, Decreto 804 de 1995',
        est: 'vigente',
        fec_vig: '1994-02-08',
        doc: ['ley_115_1994.pdf', 'decreto_804_1995.pdf'],
        casos: 32,
        violaciones: 15
      }
    ];

    const comunidadesSimuladas = [
      { id: 'wayuu', nombre: 'Wayuu', territorio: 'La Guajira', poblacion: 270000 },
      { id: 'nasa', nombre: 'Nasa', territorio: 'Cauca', poblacion: 150000 },
      { id: 'afrocolombiana', nombre: 'Afrocolombiana', territorio: 'Pacífico', poblacion: 4500000 },
      { id: 'embera', nombre: 'Embera', territorio: 'Chocó', poblacion: 80000 },
      { id: 'kogui', nombre: 'Kogui', territorio: 'Sierra Nevada', poblacion: 12000 },
      { id: 'todas', nombre: 'Todas las Comunidades', territorio: 'Nacional', poblacion: 0 }
    ];

    const categoriasSimuladas = [
      { id: 'territorial', nombre: 'Territorial', icono: '🏔️', color: 'bg-green-100 text-green-800' },
      { id: 'participacion', nombre: 'Participación', icono: '🗳️', color: 'bg-blue-100 text-blue-800' },
      { id: 'autonomia', nombre: 'Autonomía', icono: '⚖️', color: 'bg-purple-100 text-purple-800' },
      { id: 'educacion', nombre: 'Educación', icono: '📚', color: 'bg-yellow-100 text-yellow-800' },
      { id: 'salud', nombre: 'Salud', icono: '🏥', color: 'bg-red-100 text-red-800' },
      { id: 'cultural', nombre: 'Cultural', icono: '🎭', color: 'bg-pink-100 text-pink-800' },
      { id: 'ambiental', nombre: 'Ambiental', icono: '🌱', color: 'bg-emerald-100 text-emerald-800' }
    ];

    setDerechos(derechosSimulados);
    setComunidades(comunidadesSimuladas);
    setCategorias(categoriasSimuladas);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'vigente': return 'bg-green-100 text-green-800';
      case 'suspendido': return 'bg-yellow-100 text-yellow-800';
      case 'derogado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoriaColor = (categoria) => {
    const cat = categorias.find(c => c.id === categoria);
    return cat ? cat.color : 'bg-gray-100 text-gray-800';
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Aquí se implementaría la lógica de envío
  };

  const manejarEdicion = (derecho) => {
    setNuevoDerecho(derecho);
  };

  const manejarEliminacion = (id) => {
    setDerechos(derechos.filter(d => d.id !== id));
  };

  const generarReporte = (derecho) => {
  };

  const derechosFiltrados = derechos.filter(derecho => {
    const cumpleComunidad = filtroComunidad === 'todas' || derecho.comunidad === filtroComunidad;
    const cumpleCategoria = filtroCategoria === 'todas' || derecho.categoria === filtroCategoria;
    return cumpleComunidad && cumpleCategoria;
  });

  const stats = [
    { icon: Scale, value: derechos.length, label: 'Total Derechos' },
    { icon: Users, value: comunidades.length - 1, label: 'Comunidades' },
    { icon: CheckCircle, value: derechos.filter(d => d.est === 'vigente').length, label: 'Vigentes' },
    { icon: AlertTriangle, value: derechos.reduce((acc, d) => acc + d.violaciones, 0), label: 'Violaciones' }
  ];

  const alerts = [
    {
      icon: Shield,
      message: 'Este sistema protege y difunde los derechos fundamentales de las comunidades étnicas reconocidos por la Constitución y el derecho internacional.'
    }
  ];

  const breadcrumbs = ['Inicio', 'Mecanismos Étnicos', 'Derechos Étnicos'];

  return (
    <PageTemplate
      title="Derechos Étnicos"
      subtitle="Catálogo y gestión de derechos fundamentales"
      description="Sistema integral para la protección, difusión y gestión de los derechos fundamentales de las comunidades étnicas de Colombia, reconocidos por la Constitución y el derecho internacional."
      icon="⚖️"
      category="Mecanismos Étnicos"
      color="purple"
      stats={stats}
      alerts={alerts}
      breadcrumbs={breadcrumbs}
    >
      <Tabs defaultValue="derechos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="derechos">Derechos</TabsTrigger>
          <TabsTrigger value="nuevo">Nuevo Derecho</TabsTrigger>
          <TabsTrigger value="categorias">Categorías</TabsTrigger>
          <TabsTrigger value="comunidades">Comunidades</TabsTrigger>
          <TabsTrigger value="marco-legal">Marco Legal</TabsTrigger>
          <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
        </TabsList>

        {/* Tab de Derechos */}
        <TabsContent value="derechos" className="space-y-6">
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

          {/* Lista de Derechos */}
          <div className="grid gap-6">
            {derechosFiltrados.map(derecho => (
              <Card key={derecho.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{derecho.titulo}</CardTitle>
                      <p className="text-gray-600 mb-4">{derecho.descripcion}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className={getEstadoColor(derecho.estado)}>
                          {derecho.estado.toUpperCase()}
                        </Badge>
                        <Badge className={getCategoriaColor(derecho.categoria)}>
                          {categorias.find(c => c.id === derecho.categoria)?.icono} {categorias.find(c => c.id === derecho.categoria)?.nombre}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <Gavel className="h-4 w-4" />
                          <span>{derecho.casos} casos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4" />
                          <span>{derecho.violaciones} violaciones</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <span>{derecho.documentos.length} documentos</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Desde {derecho.fechaVigencia}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Marco Legal:</p>
                        <p className="text-sm text-gray-600">{derecho.marcoLegal}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => manejarEdicion(derecho)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => generarReporte(derecho)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => manejarEliminacion(derecho.id)}
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

        {/* Tab de Nuevo Derecho */}
        <TabsContent value="nuevo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nuevo Derecho Étnico</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={manejarEnvio} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="titulo">Título del Derecho</Label>
                    <Input
                      id="titulo"
                      value={nuevoDerecho.titulo}
                      onChange={(e) => setNuevoDerecho({...nuevoDerecho, titulo: e.target.value})}
                      placeholder="Ingrese el título del derecho"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="com">Comunidad</Label>
                    <Select 
                      value={nuevoDerecho.com} 
                      onValueChange={(value) => setNuevoDerecho({...nuevoDerecho, com: value})}
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
                    value={nuevoDerecho.descripcion}
                    onChange={(e) => setNuevoDerecho({...nuevoDerecho, descripcion: e.target.value})}
                    placeholder="Describa el derecho étnico"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label htmlFor="cat">Categoría</Label>
                    <Select 
                      value={nuevoDerecho.cat} 
                      onValueChange={(value) => setNuevoDerecho({...nuevoDerecho, cat: value})}
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
                    <Label htmlFor="est">Estado</Label>
                    <Select 
                      value={nuevoDerecho.est} 
                      onValueChange={(value) => setNuevoDerecho({...nuevoDerecho, est: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vigente">Vigente</SelectItem>
                        <SelectItem value="suspendido">Suspendido</SelectItem>
                        <SelectItem value="derogado">Derogado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fec_vig">Fecha de Vigencia</Label>
                    <Input
                      id="fec_vig"
                      type="date"
                      value={nuevoDerecho.fec_vig}
                      onChange={(e) => setNuevoDerecho({...nuevoDerecho, fec_vig: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mar_leg">Marco Legal</Label>
                  <Textarea
                    id="mar_leg"
                    value={nuevoDerecho.mar_leg}
                    onChange={(e) => setNuevoDerecho({...nuevoDerecho, mar_leg: e.target.value})}
                    placeholder="Especifique el marco legal que respalda este derecho"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Derecho
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
                    <p>Derechos relacionados con {categoria.nombre.toLowerCase()}</p>
                    <div className="mt-2">
                      <Badge className={categoria.color}>
                        {derechos.filter(d => d.categoria === categoria.id).length} derechos
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
                        {derechos.filter(d => d.comunidad === comunidad.id || d.comunidad === 'todas').length} derechos
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tab de Marco Legal */}
        <TabsContent value="marco-legal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Marco Legal de los Derechos Étnicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Constitución Política de Colombia</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Artículo 7: Reconocimiento de la diversidad étnica y cultural</li>
                    <li>• Artículo 330: Consulta previa para explotación de recursos naturales</li>
                    <li>• Artículo 329: Territorios indígenas y resguardos</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Convenios Internacionales</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Convenio 169 de la OIT sobre Pueblos Indígenas y Tribales</li>
                    <li>• Declaración de las Naciones Unidas sobre los Derechos de los Pueblos Indígenas</li>
                    <li>• Convención Americana sobre Derechos Humanos</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Leyes Nacionales</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Ley 70 de 1993: Comunidades negras</li>
                    <li>• Ley 89 de 1890: Resguardos indígenas</li>
                    <li>• Ley 115 de 1994: Educación étnica</li>
                    <li>• Decreto 2164 de 1995: Territorios colectivos</li>
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
                  <Scale className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">{derechos.length}</p>
                    <p className="text-sm text-gray-600">Total Derechos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-8 w-8 text-green-600" />
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
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">
                      {derechos.filter(d => d.estado === 'vigente').length}
                    </p>
                    <p className="text-sm text-gray-600">Vigentes</p>
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
                      {derechos.reduce((acc, d) => acc + d.violaciones, 0)}
                    </p>
                    <p className="text-sm text-gray-600">Violaciones</p>
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

export default DerechosEtnicos;
