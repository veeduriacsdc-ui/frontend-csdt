import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Badge } from '../../../components/ui/badge';
import { Alert, AlertDescription } from '../../../components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Brain, 
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
  GraduationCap,
  Award,
  Zap
} from 'lucide-react';
import iaService from '../../../services/iaService';

const IaEspecialistas = () => {
  const [especialistas, setEspecialistas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analisis, setAnalisis] = useState(null);
  const [consulta, setConsulta] = useState('');
  const [especialidad, setEspecialidad] = useState('derecho_constitucional');
  const [tipoAnalisis, setTipoAnalisis] = useState('completo');
  const [contexto, setContexto] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('todas');
  const [filtroExperiencia, setFiltroExperiencia] = useState('todas');

  useEffect(() => {
    cargarEspecialistas();
  }, []);

  const cargarEspecialistas = async () => {
    try {
      setLoading(true);
      const response = await iaService.obtenerEspecialistas();
      if (response.success) {
        setEspecialistas(Object.values(response.data.especialistas || {}));
      } else {
        // Datos simulados si el servicio no está disponible
        const especialistasSimulados = [
          {
            id: 'esp_001',
            nombre: 'Dr. María González',
            especialidad: 'derecho_constitucional',
            experiencia: '15 años',
            universidad: 'Universidad Nacional de Colombia',
            casos: 245,
            calificacion: 4.8,
            disponibilidad: 'disponible',
            idiomas: ['Español', 'Inglés'],
            certificaciones: ['Especialista en Derecho Constitucional', 'Magíster en Derecho Público'],
            descripcion: 'Especialista en derecho constitucional con amplia experiencia en consulta previa y derechos étnicos.'
          },
          {
            id: 'esp_002',
            nombre: 'Dr. Carlos Rodríguez',
            especialidad: 'derecho_administrativo',
            experiencia: '12 años',
            universidad: 'Universidad de los Andes',
            casos: 189,
            calificacion: 4.6,
            disponibilidad: 'ocupado',
            idiomas: ['Español', 'Francés'],
            certificaciones: ['Especialista en Derecho Administrativo', 'Doctor en Derecho'],
            descripcion: 'Experto en derecho administrativo y procedimientos de contratación estatal.'
          },
          {
            id: 'esp_003',
            nombre: 'Dra. Ana Martínez',
            especialidad: 'derecho_penal',
            experiencia: '18 años',
            universidad: 'Universidad Externado de Colombia',
            casos: 312,
            calificacion: 4.9,
            disponibilidad: 'disponible',
            idiomas: ['Español', 'Inglés', 'Portugués'],
            certificaciones: ['Especialista en Derecho Penal', 'Magíster en Criminología'],
            descripcion: 'Especialista en derecho penal con enfoque en delitos contra la administración pública.'
          },
          {
            id: 'esp_004',
            nombre: 'Dr. Luis Fernández',
            especialidad: 'derecho_ambiental',
            experiencia: '10 años',
            universidad: 'Universidad del Rosario',
            casos: 156,
            calificacion: 4.7,
            disponibilidad: 'disponible',
            idiomas: ['Español', 'Inglés'],
            certificaciones: ['Especialista en Derecho Ambiental', 'Magíster en Gestión Ambiental'],
            descripcion: 'Experto en derecho ambiental y consulta previa para proyectos de impacto ambiental.'
          },
          {
            id: 'esp_005',
            nombre: 'Dra. Patricia López',
            especialidad: 'derecho_laboral',
            experiencia: '14 años',
            universidad: 'Pontificia Universidad Javeriana',
            casos: 203,
            calificacion: 4.5,
            disponibilidad: 'disponible',
            idiomas: ['Español', 'Inglés'],
            certificaciones: ['Especialista en Derecho Laboral', 'Magíster en Relaciones Laborales'],
            descripcion: 'Especialista en derecho laboral y protección de derechos de trabajadores étnicos.'
          }
        ];
        setEspecialistas(especialistasSimulados);
      }
    } catch (error) {
      console.error('Error cargando especialistas:', error);
    } finally {
      setLoading(false);
    }
  };

  const realizarAnalisis = async () => {
    if (!consulta.trim()) return;

    try {
      setLoading(true);
      const data = {
        consulta: consulta.trim(),
        especialidad,
        tipo_analisis: tipoAnalisis,
        contexto: contexto ? JSON.parse(contexto) : {}
      };

      const response = await iaService.analisisEspecializado(data);
      if (response.success) {
        setAnalisis(response.data);
      }
    } catch (error) {
      console.error('Error realizando análisis:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEspecialidadColor = (especialidad) => {
    switch (especialidad) {
      case 'derecho_constitucional': return 'bg-blue-100 text-blue-800';
      case 'derecho_administrativo': return 'bg-green-100 text-green-800';
      case 'derecho_penal': return 'bg-red-100 text-red-800';
      case 'derecho_civil': return 'bg-purple-100 text-purple-800';
      case 'derecho_laboral': return 'bg-yellow-100 text-yellow-800';
      case 'derecho_ambiental': return 'bg-emerald-100 text-emerald-800';
      case 'derecho_internacional': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDisponibilidadColor = (disponibilidad) => {
    switch (disponibilidad) {
      case 'disponible': return 'bg-green-100 text-green-800';
      case 'ocupado': return 'bg-yellow-100 text-yellow-800';
      case 'no_disponible': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEspecialidadNombre = (especialidad) => {
    const especialidades = {
      'derecho_constitucional': 'Derecho Constitucional',
      'derecho_administrativo': 'Derecho Administrativo',
      'derecho_penal': 'Derecho Penal',
      'derecho_civil': 'Derecho Civil',
      'derecho_laboral': 'Derecho Laboral',
      'derecho_ambiental': 'Derecho Ambiental',
      'derecho_internacional': 'Derecho Internacional',
      'derecho_tributario': 'Derecho Tributario',
      'derecho_procesal': 'Derecho Procesal'
    };
    return especialidades[especialidad] || especialidad;
  };

  const especialistasFiltrados = especialistas.filter(especialista => {
    const cumpleEspecialidad = filtroEspecialidad === 'todas' || especialista.especialidad === filtroEspecialidad;
    const cumpleExperiencia = filtroExperiencia === 'todas' || 
      (filtroExperiencia === 'experto' && parseInt(especialista.experiencia) >= 15) ||
      (filtroExperiencia === 'intermedio' && parseInt(especialista.experiencia) >= 5 && parseInt(especialista.experiencia) < 15) ||
      (filtroExperiencia === 'junior' && parseInt(especialista.experiencia) < 5);
    
    return cumpleEspecialidad && cumpleExperiencia;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Especialistas de IA
              </h1>
              <p className="text-gray-600 mt-1">
                Red de especialistas jurídicos con inteligencia artificial para análisis especializados
              </p>
            </div>
          </div>
          
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Conecta con especialistas jurídicos verificados que utilizan IA para brindar análisis precisos y actualizados.
            </AlertDescription>
          </Alert>
        </div>

        <Tabs defaultValue="especialistas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="especialistas">Especialistas</TabsTrigger>
            <TabsTrigger value="consulta">Consultar</TabsTrigger>
            <TabsTrigger value="areas">Áreas</TabsTrigger>
            <TabsTrigger value="analisis">Análisis</TabsTrigger>
            <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
          </TabsList>

          {/* Tab de Especialistas */}
          <TabsContent value="especialistas" className="space-y-6">
            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                <Select value={filtroEspecialidad} onValueChange={setFiltroEspecialidad}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar especialidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las especialidades</SelectItem>
                    <SelectItem value="derecho_constitucional">Derecho Constitucional</SelectItem>
                    <SelectItem value="derecho_administrativo">Derecho Administrativo</SelectItem>
                    <SelectItem value="derecho_penal">Derecho Penal</SelectItem>
                    <SelectItem value="derecho_civil">Derecho Civil</SelectItem>
                    <SelectItem value="derecho_laboral">Derecho Laboral</SelectItem>
                    <SelectItem value="derecho_ambiental">Derecho Ambiental</SelectItem>
                    <SelectItem value="derecho_internacional">Derecho Internacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-2">Experiencia</label>
                <Select value={filtroExperiencia} onValueChange={setFiltroExperiencia}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar experiencia" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Toda la experiencia</SelectItem>
                    <SelectItem value="experto">Experto (15+ años)</SelectItem>
                    <SelectItem value="intermedio">Intermedio (5-14 años)</SelectItem>
                    <SelectItem value="junior">Junior (0-4 años)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Lista de Especialistas */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {especialistasFiltrados.map(especialista => (
                <Card key={especialista.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{especialista.nombre}</CardTitle>
                        <p className="text-sm text-gray-600 mb-4">{especialista.descripcion}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge className={getEspecialidadColor(especialista.especialidad)}>
                            {getEspecialidadNombre(especialista.especialidad)}
                          </Badge>
                          <Badge className={getDisponibilidadColor(especialista.disponibilidad)}>
                            {especialista.disponibilidad.replace('_', ' ').toUpperCase()}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <GraduationCap className="h-4 w-4" />
                            <span>{especialista.experiencia}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span>{especialista.casos} casos</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Star className="h-4 w-4" />
                            <span>{especialista.calificacion}/5</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <BookOpen className="h-4 w-4" />
                            <span>{especialista.universidad}</span>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Idiomas:</p>
                          <div className="flex flex-wrap gap-1">
                            {especialista.idiomas.map((idioma, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {idioma}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-medium text-gray-700 mb-2">Certificaciones:</p>
                          <div className="space-y-1">
                            {especialista.certificaciones.map((cert, index) => (
                              <p key={index} className="text-xs text-gray-600">• {cert}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      <Button className="flex-1">
                        <Zap className="h-4 w-4 mr-2" />
                        Consultar
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

          {/* Tab de Consulta */}
          <TabsContent value="consulta" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Consulta con Especialista</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => { e.preventDefault(); realizarAnalisis(); }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Especialidad</label>
                    <Select value={especialidad} onValueChange={setEspecialidad}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar especialidad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="derecho_constitucional">Derecho Constitucional</SelectItem>
                        <SelectItem value="derecho_administrativo">Derecho Administrativo</SelectItem>
                        <SelectItem value="derecho_penal">Derecho Penal</SelectItem>
                        <SelectItem value="derecho_civil">Derecho Civil</SelectItem>
                        <SelectItem value="derecho_laboral">Derecho Laboral</SelectItem>
                        <SelectItem value="derecho_ambiental">Derecho Ambiental</SelectItem>
                        <SelectItem value="derecho_internacional">Derecho Internacional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Análisis</label>
                    <Select value={tipoAnalisis} onValueChange={setTipoAnalisis}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completo">Análisis Completo</SelectItem>
                        <SelectItem value="rapido">Análisis Rápido</SelectItem>
                        <SelectItem value="detallado">Análisis Detallado</SelectItem>
                        <SelectItem value="especializado">Análisis Especializado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consulta</label>
                    <Textarea
                      value={consulta}
                      onChange={(e) => setConsulta(e.target.value)}
                      placeholder="Describa su consulta jurídica..."
                      rows={6}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contexto (JSON opcional)</label>
                    <Textarea
                      value={contexto}
                      onChange={(e) => setContexto(e.target.value)}
                      placeholder='{"tipo_caso": "consulta_previa", "comunidad": "wayuu", "proyecto": "minero"}'
                      rows={3}
                    />
                  </div>

                  <Button type="submit" disabled={loading} className="w-full">
                    {loading ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Analizando...
                      </>
                    ) : (
                      <>
                        <Brain className="h-4 w-4 mr-2" />
                        Consultar con Especialista
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab de Áreas */}
          <TabsContent value="areas" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { id: 'derecho_constitucional', nombre: 'Derecho Constitucional', icono: '⚖️', color: 'bg-blue-100 text-blue-800' },
                { id: 'derecho_administrativo', nombre: 'Derecho Administrativo', icono: '🏛️', color: 'bg-green-100 text-green-800' },
                { id: 'derecho_penal', name: 'Derecho Penal', icono: '🔒', color: 'bg-red-100 text-red-800' },
                { id: 'derecho_civil', nombre: 'Derecho Civil', icono: '📋', color: 'bg-purple-100 text-purple-800' },
                { id: 'derecho_laboral', nombre: 'Derecho Laboral', icono: '👷', color: 'bg-yellow-100 text-yellow-800' },
                { id: 'derecho_ambiental', nombre: 'Derecho Ambiental', icono: '🌱', color: 'bg-emerald-100 text-emerald-800' },
                { id: 'derecho_internacional', nombre: 'Derecho Internacional', icono: '🌍', color: 'bg-indigo-100 text-indigo-800' }
              ].map(area => (
                <Card key={area.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span className="text-2xl">{area.icono}</span>
                      <span>{area.nombre}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      <p>Especialistas en {area.nombre.toLowerCase()}</p>
                      <div className="mt-2">
                        <Badge className={area.color}>
                          {especialistas.filter(e => e.especialidad === area.id).length} especialistas
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab de Análisis */}
          <TabsContent value="analisis" className="space-y-6">
            {analisis ? (
              <Card>
                <CardHeader>
                  <CardTitle>Resultado del Análisis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Análisis Jurídico</h3>
                      <p className="text-gray-600">{analisis.analisis || 'Análisis no disponible'}</p>
                    </div>
                    
                    {analisis.recomendaciones && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Recomendaciones</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                          {analisis.recomendaciones.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analisis.marco_legal && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Marco Legal</h3>
                        <p className="text-gray-600">{analisis.marco_legal}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Brain className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Realiza una consulta para ver el análisis aquí</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab de Estadísticas */}
          <TabsContent value="estadisticas" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{especialistas.length}</p>
                      <p className="text-sm text-gray-600">Total Especialistas</p>
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
                        {especialistas.filter(e => e.disponibilidad === 'disponible').length}
                      </p>
                      <p className="text-sm text-gray-600">Disponibles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Award className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">
                        {especialistas.reduce((acc, e) => acc + e.casos, 0)}
                      </p>
                      <p className="text-sm text-gray-600">Total Casos</p>
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
                        {(especialistas.reduce((acc, e) => acc + e.calificacion, 0) / especialistas.length).toFixed(1)}
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

export default IaEspecialistas;
