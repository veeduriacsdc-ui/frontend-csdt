import React, { useState, useEffect, useRef } from 'react';
import PageTemplate from '../../../components/compartidas/PageTemplate';
import MultiLegalAIComponent from '../../../components/ia/MultiLegalAIComponent';
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
  Cpu, 
  Mic, 
  Square, 
  MapPin, 
  Plus, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Download, 
  Play, 
  User, 
  Phone, 
  MessageCircle,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Shield,
  Brain,
  Zap,
  Target,
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Building,
  Mail,
  Map,
  Eye,
  Bell,
  Trophy,
  Sparkles,
  Layers,
  Activity,
  AlertCircle,
  BookOpen,
  Scale,
  Gavel,
  Landmark,
  FileCheck,
  Search,
  Filter,
  Settings,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

const ConsejoIAAvanzado = () => {
  // Estados principales
  const [datosCliente, setDatosCliente] = useState({
    tipo: 'cliente',
    nombre: '',
    telefono: '',
    whatsapp: '',
    alias: '',
    telefono_contacto: '',
    whatsapp_contacto: ''
  });

  const [ubicacion, setUbicacion] = useState({
    municipio: '',
    departamento: '',
    pais: 'Colombia',
    coordenadas: null,
    codigo: '',
    consecutivo: 1,
    fecha: new Date().toISOString().split('T')[0]
  });

  const [narracionHechos, setNarracionHechos] = useState({
    texto: '',
    timestamp: new Date(),
    version: 1
  });

  const [consejoIA, setConsejoIA] = useState({
    respuestas: [],
    analisis_general: '',
    timestamp: new Date()
  });

  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [activeAnalysisMode, setActiveAnalysisMode] = useState('simple');
  const [territorialAlerts, setTerritorialAlerts] = useState([]);
  const [institutionalStatus, setInstitutionalStatus] = useState({
    igac: { status: 'checking', lastCheck: null },
    ant: { status: 'checking', lastCheck: null },
    catastro: { status: 'checking', lastCheck: null }
  });

  // Refs
  const mediaRecorderRef = useRef(null);

  // Funciones principales
  const generarCodigo = () => {
    if (!ubicacion.municipio || !ubicacion.departamento) return '';

    const mun = ubicacion.municipio.substring(0, 2).toUpperCase();
    const dep = ubicacion.departamento.substring(0, 2).toUpperCase();
    const pais = ubicacion.pais.substring(0, 2).toUpperCase();
    const fecha = ubicacion.fecha.replace(/-/g, '');
    const consecutivo = ubicacion.consecutivo.toString().padStart(4, '0');

    return `${mun}-${dep}-${pais}-${fecha}-${consecutivo}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        transcribirAudio(blob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      toast.success('Grabación iniciada');
    } catch (error) {
      toast.error('Error al acceder al micrófono');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.success('Grabación detenida');
    }
  };

  const transcribirAudio = async (audioBlob) => {
    setIsLoading(true);
    try {
      const textoTranscrito = "[Transcripción simulada del audio - En producción se integrará con servicio de IA]";
      setNarracionHechos(prev => ({
        ...prev,
        texto: `${prev.texto}\n\n${textoTranscrito}`,
        timestamp: new Date(),
        version: prev.version + 1
      }));
      toast.success('Audio transcrito correctamente');
    } catch (error) {
      toast.error('Error en la transcripción');
    } finally {
      setIsLoading(false);
    }
  };

  const generarPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Título principal
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const titulo = 'CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL';
    const tituloWidth = doc.getTextWidth(titulo);
    doc.text(titulo, (pageWidth - tituloWidth) / 2, 25);

    // Subtítulo
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    const subtitulo = 'SISTEMA AVANZADO DE NARRACIÓN DE HECHOS CON MULTI-IA';
    const subtituloWidth = doc.getTextWidth(subtitulo);
    doc.text(subtitulo, (pageWidth - subtituloWidth) / 2, 35);

    // Código del archivo
    doc.setFontSize(10);
    doc.text(`Código: ${ubicacion.codigo}`, pageWidth - 50, 20);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-CO')}`, pageWidth - 50, 25);

    let yPosition = 50;

    // Datos del Cliente
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DATOS DEL SOLICITANTE', 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Tipo: ${datosCliente.tipo === 'cliente' ? 'Cliente Registrado' : 'Anónimo'}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Nombre: ${datosCliente.nombre}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Teléfono: ${datosCliente.telefono}`, 20, yPosition);
    yPosition += 8;
    doc.text(`WhatsApp: ${datosCliente.whatsapp}`, 20, yPosition);
    yPosition += 15;

    // Ubicación
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('UBICACIÓN DEL HECHO', 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Municipio: ${ubicacion.municipio}`, 20, yPosition);
    yPosition += 8;
    doc.text(`Departamento: ${ubicacion.departamento}`, 20, yPosition);
    yPosition += 8;
    doc.text(`País: ${ubicacion.pais}`, 20, yPosition);
    yPosition += 8;
    if (ubicacion.coordenadas) {
      doc.text(`Coordenadas: ${ubicacion.coordenadas[0].toFixed(6)}, ${ubicacion.coordenadas[1].toFixed(6)}`, 20, yPosition);
      yPosition += 8;
    }
    yPosition += 10;

    // Narración de Hechos
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('NARRACIÓN DE HECHOS', 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const narracionLines = doc.splitTextToSize(narracionHechos.texto, pageWidth - 40);
    doc.text(narracionLines, 20, yPosition);
    yPosition += narracionLines.length * 6 + 20;

    // Consejo IA Avanzado
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ANÁLISIS MULTI-IA AVANZADO', 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    consejoIA.respuestas.forEach((respuesta, index) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${index + 1}. ${respuesta.nombre} (${respuesta.clasificacion})`, 20, yPosition);
      yPosition += 10;
      doc.setFont('helvetica', 'normal');
      doc.text(`Confianza: ${respuesta.confianza}%`, 30, yPosition);
      yPosition += 8;
      const respuestaLines = doc.splitTextToSize(respuesta.respuesta, pageWidth - 40);
      doc.text(respuestaLines, 30, yPosition);
      yPosition += respuestaLines.length * 6 + 10;
      
      if (respuesta.recomendaciones && respuesta.recomendaciones.length > 0) {
        doc.text('Recomendaciones:', 30, yPosition);
        yPosition += 8;
        respuesta.recomendaciones.forEach(rec => {
          doc.text(`• ${rec}`, 35, yPosition);
          yPosition += 6;
        });
        yPosition += 5;
      }
    });

    // Análisis General
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('ANÁLISIS GENERAL CONSOLIDADO:', 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const analisisLines = doc.splitTextToSize(consejoIA.analisis_general, pageWidth - 40);
    doc.text(analisisLines, 20, yPosition);
    yPosition += analisisLines.length * 6 + 20;

    // Pie de página
    doc.setFontSize(10);
    const iaNames = consejoIA.respuestas.map(r => r.nombre).join(', ');
    doc.text(`Generado por Multi-IA: ${iaNames}`, 20, yPosition);
    doc.text(`Sistema: CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL`, 20, yPosition + 8);
    doc.text(`Fecha de generación: ${new Date().toLocaleString('es-CO')}`, 20, yPosition + 16);

    // Guardar PDF
    const filename = `${ubicacion.codigo || 'narracion-avanzada'}.pdf`;
    doc.save(filename);
    toast.success(`PDF avanzado generado: ${filename}`);
  };

  const iniciarDependencia = async () => {
    try {
      await generarPDF();
      toast.success('Dependencia iniciada y PDF avanzado guardado');
    } catch (error) {
      toast.error('Error al iniciar dependencia');
    }
  };

  const handleTerritorialAlert = (alert) => {
    setTerritorialAlerts(prev => [alert, ...prev]);
    toast.error(`Alerta territorial ${alert.level.toUpperCase()}: ${alert.location}`, {
      duration: 5000,
      icon: '🚨'
    });
  };

  // Efectos
  useEffect(() => {
    const nuevoCodigo = generarCodigo();
    setUbicacion(prev => ({ ...prev, codigo: nuevoCodigo }));
  }, [ubicacion.municipio, ubicacion.departamento, ubicacion.pais, ubicacion.fecha, ubicacion.consecutivo]);

  const stats = [
    { icon: Cpu, value: consejoIA.respuestas.length, label: 'IA Consultadas' },
    { icon: FileText, value: narracionHechos.version, label: 'Versiones' },
    { icon: Clock, value: Math.floor((new Date() - narracionHechos.timestamp) / 60000), label: 'Minutos' },
    { icon: CheckCircle, value: ubicacion.codigo ? 'Activo' : 'Pendiente', label: 'Estado' },
    { icon: Bell, value: territorialAlerts.length, label: 'Alertas' },
    { icon: MapPin, value: ubicacion.coordenadas ? 'Geo' : 'Sin Geo', label: 'Ubicación' }
  ];

  const alerts = [
    {
      icon: Brain,
      message: 'Sistema avanzado de narración de hechos con múltiples IA especializadas, análisis territorial y monitoreo institucional en tiempo real.'
    },
    {
      icon: Layers,
      message: 'Integración con entidades gubernamentales (IGAC, ANT, Catastro) para verificación de cumplimiento normativo.'
    }
  ];

  const breadcrumbs = ['Inicio', 'Innovación Tecnológica', 'Consejo IA Avanzado'];

  return (
    <PageTemplate
      title="Consejo IA Avanzado"
      subtitle="Sistema Multi-IA con Análisis Territorial y Monitoreo Institucional"
      description="Sistema integral de narración de hechos con múltiples IA especializadas, análisis geoespacial, monitoreo territorial y verificación de cumplimiento institucional."
      icon="🧠"
      category="Innovación Tecnológica"
      color="purple"
      stats={stats}
      alerts={alerts}
      breadcrumbs={breadcrumbs}
    >
      <Tabs defaultValue="narracion" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="narracion">Narración</TabsTrigger>
          <TabsTrigger value="cliente">Cliente</TabsTrigger>
          <TabsTrigger value="ubicacion">Ubicación</TabsTrigger>
          <TabsTrigger value="multi-ia">Multi-IA</TabsTrigger>
          <TabsTrigger value="territorial">Territorial</TabsTrigger>
          <TabsTrigger value="acciones">Acciones</TabsTrigger>
        </TabsList>

        {/* Tab de Narración */}
        <TabsContent value="narracion" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Cpu className="h-6 w-6 text-purple-600" />
                  <span>Narración de Hechos Avanzada</span>
                </CardTitle>
                <div className="flex gap-2">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Mic className="h-4 w-4" />
                      Grabar Voz
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Square className="h-4 w-4" />
                      Detener
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="narracion">Descripción de los Hechos</Label>
                  <Textarea
                    id="narracion"
                    value={narracionHechos.texto}
                    onChange={(e) => setNarracionHechos(prev => ({ ...prev, texto: e.target.value }))}
                    placeholder="Describa los hechos detalladamente. Puede escribir o usar la grabación de voz..."
                    rows={8}
                    className="resize-none"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => setNarracionHechos(prev => ({ ...prev, version: prev.version + 1 }))}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Agregar
                  </Button>

                  <Button
                    onClick={() => setNarracionHechos(prev => ({ ...prev, version: prev.version + 1 }))}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Modificar
                  </Button>

                  <Button
                    onClick={() => setNarracionHechos(prev => ({ ...prev, texto: '', version: prev.version + 1 }))}
                    variant="destructive"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Eliminar
                  </Button>
                </div>

                <div className="text-sm text-gray-600">
                  <p>Versión: {narracionHechos.version}</p>
                  <p>Última modificación: {narracionHechos.timestamp.toLocaleString('es-CO')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Cliente */}
        <TabsContent value="cliente" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Datos del Solicitante</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tipo">Tipo</Label>
                  <Select 
                    value={datosCliente.tipo} 
                    onValueChange={(value) => setDatosCliente(prev => ({ ...prev, tipo: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cliente">Cliente Registrado</SelectItem>
                      <SelectItem value="anonimo">Anónimo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    value={datosCliente.nombre}
                    onChange={(e) => setDatosCliente(prev => ({ ...prev, nombre: e.target.value }))}
                    placeholder="Nombre completo"
                  />
                </div>

                {datosCliente.tipo === 'anonimo' && (
                  <div>
                    <Label htmlFor="alias">Alias/Apodo</Label>
                    <Input
                      id="alias"
                      value={datosCliente.alias}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, alias: e.target.value }))}
                      placeholder="Nombre, apodo o alias"
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="telefono"
                      value={datosCliente.telefono}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, telefono: e.target.value }))}
                      placeholder="Número de teléfono"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="whatsapp"
                      value={datosCliente.whatsapp}
                      onChange={(e) => setDatosCliente(prev => ({ ...prev, whatsapp: e.target.value }))}
                      placeholder="Número de WhatsApp"
                      className="pl-10"
                    />
                  </div>
                </div>

                {datosCliente.tipo === 'anonimo' && (
                  <>
                    <div>
                      <Label htmlFor="telefono_contacto">Teléfono de Contacto</Label>
                      <Input
                        id="telefono_contacto"
                        value={datosCliente.telefono_contacto}
                        onChange={(e) => setDatosCliente(prev => ({ ...prev, telefono_contacto: e.target.value }))}
                        placeholder="Teléfono para contactar"
                      />
                    </div>

                    <div>
                      <Label htmlFor="whatsapp_contacto">WhatsApp de Contacto</Label>
                      <Input
                        id="whatsapp_contacto"
                        value={datosCliente.whatsapp_contacto}
                        onChange={(e) => setDatosCliente(prev => ({ ...prev, whatsapp_contacto: e.target.value }))}
                        placeholder="WhatsApp para contactar"
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Ubicación */}
        <TabsContent value="ubicacion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ubicación del Hecho</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label htmlFor="municipio">Municipio</Label>
                  <Input
                    id="municipio"
                    value={ubicacion.municipio}
                    onChange={(e) => setUbicacion(prev => ({ ...prev, municipio: e.target.value }))}
                    placeholder="Ej: Bogotá"
                  />
                </div>

                <div>
                  <Label htmlFor="departamento">Departamento</Label>
                  <Input
                    id="departamento"
                    value={ubicacion.departamento}
                    onChange={(e) => setUbicacion(prev => ({ ...prev, departamento: e.target.value }))}
                    placeholder="Ej: Cundinamarca"
                  />
                </div>

                <div>
                  <Label htmlFor="pais">País</Label>
                  <Input
                    id="pais"
                    value={ubicacion.pais}
                    onChange={(e) => setUbicacion(prev => ({ ...prev, pais: e.target.value }))}
                    placeholder="Colombia"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label htmlFor="fecha">Fecha del Hecho</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={ubicacion.fecha}
                  onChange={(e) => setUbicacion(prev => ({ ...prev, fecha: e.target.value }))}
                />
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <Label>Coordenadas del Lugar del Hecho</Label>
                  <Button
                    onClick={() => setShowMap(!showMap)}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Map className="h-4 w-4" />
                    {showMap ? 'Ocultar Mapa' : 'Mostrar Mapa'}
                  </Button>
                </div>
                
                {showMap && (
                  <div className="h-64 rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Mapa interactivo</p>
                      <p className="text-sm text-gray-500">En desarrollo - Próximamente</p>
                    </div>
                  </div>
                )}

                {ubicacion.coordenadas && (
                  <p className="mt-2 text-sm text-gray-600">
                    Coordenadas: {ubicacion.coordenadas[0].toFixed(6)}, {ubicacion.coordenadas[1].toFixed(6)}
                  </p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Código Generado Automáticamente</h3>
                <div className="text-2xl font-mono font-bold text-purple-600">
                  {ubicacion.codigo || 'Complete los campos para generar el código'}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Formato: Municipio(2)-Departamento(2)-País(2)-Fecha-Consecutivo
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Multi-IA */}
        <TabsContent value="multi-ia" className="space-y-6">
          <MultiLegalAIComponent
            className="w-full"
            showTitle={false}
            compact={false}
            defaultProviders={['lexisnexis', 'territorial_ai', 'veeduria_ai']}
            enableGeoAnalysis={true}
            enableTerritorialMonitoring={true}
            enableInstitutionalAlerts={true}
            onTerritorialAlert={handleTerritorialAlert}
          />
        </TabsContent>

        {/* Tab de Análisis Territorial */}
        <TabsContent value="territorial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-purple-600" />
                <span>Análisis Territorial y Monitoreo Institucional</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Estado de Cumplimiento Institucional */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Estado de Cumplimiento Institucional
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(institutionalStatus).map(([entity, status]) => (
                      <div key={entity} className={`p-4 rounded-lg border-2 ${
                        status.status === 'compliant'
                          ? 'border-green-200 bg-green-50'
                          : status.status === 'non-compliant'
                          ? 'border-red-200 bg-red-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 uppercase">{entity}</span>
                          <Badge className={
                            status.status === 'compliant'
                              ? 'bg-green-100 text-green-800'
                              : status.status === 'non-compliant'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }>
                            {status.status === 'compliant' ? '✓ Cumple' :
                             status.status === 'non-compliant' ? '✗ No cumple' : 'Verificando'}
                          </Badge>
                        </div>
                        {status.lastCheck && (
                          <p className="text-xs text-gray-500 mt-1">
                            Última verificación: {status.lastCheck.toLocaleTimeString()}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alertas Territoriales */}
                {territorialAlerts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Bell className="h-5 w-5 mr-2 text-red-600" />
                      Alertas Territoriales ({territorialAlerts.length})
                    </h3>
                    <div className="space-y-2">
                      {territorialAlerts.slice(0, 5).map((alert, index) => (
                        <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                              <span className="font-medium text-red-900">
                                {alert.level.toUpperCase()}: {alert.location}
                              </span>
                            </div>
                            <span className="text-xs text-red-600">
                              {alert.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-sm text-red-700 mt-1">
                            {alert.factors?.join(', ') || 'Factores de riesgo detectados'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Monitoreo Continuo */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2" />
                    Monitoreo Continuo
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-900">Sistema de Monitoreo Territorial</p>
                        <p className="text-sm text-blue-700">
                          Vigilancia en tiempo real de cambios normativos y alertas institucionales
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Actualizar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab de Acciones */}
        <TabsContent value="acciones" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Acciones Disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button
                  onClick={generarPDF}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  disabled={!consejoIA.respuestas.length}
                >
                  <Download className="h-6 w-6" />
                  <span>Generar PDF Avanzado</span>
                </Button>

                <Button
                  onClick={iniciarDependencia}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  variant="outline"
                  disabled={!consejoIA.respuestas.length}
                >
                  <Play className="h-6 w-6" />
                  <span>Iniciar Dependencia</span>
                </Button>

                <Button
                  onClick={() => window.print()}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  variant="outline"
                >
                  <FileText className="h-6 w-6" />
                  <span>Imprimir</span>
                </Button>

                <Button
                  onClick={() => setConsejoIA({ respuestas: [], analisis_general: '', timestamp: new Date() })}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  variant="destructive"
                >
                  <Trash2 className="h-6 w-6" />
                  <span>Limpiar Todo</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default ConsejoIAAvanzado;
