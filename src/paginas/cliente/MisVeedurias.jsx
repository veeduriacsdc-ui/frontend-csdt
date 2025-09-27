import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import AppLayout from '../../layouts/AppLayout'
import { 
  FileText, 
  Search, 
  Plus,
  Eye,
  Clock,
  CheckCircle,
  XCircle,
  LoaderCircle,
  Calendar,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import veeduriaService from '../../services/veeduriaService'

const MisVeedurias = () => {
  const { user } = useAuth()
  const [veedurias, setVeedurias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEst, setFiltroEst] = useState('todos')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    tit: '',
    des: '',
    tip: 'pet',
    pri: 'med'
  })

  useEffect(() => {
    cargarVeedurias()
  }, [])

  const cargarVeedurias = async () => {
    try {
      setLoading(true)
      const response = await veeduriaService.obtenerVeedurias()
      // Filtrar solo las veedurías del usuario actual
      const veeduriasUsuario = response.data?.filter(v => v.usu_id === user?.id) || []
      setVeedurias(veeduriasUsuario)
    } catch (error) {
      console.error('Error cargando veedurías:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await veeduriaService.crearVeeduria({
        ...formData,
        usu_id: user?.id,
        est: 'pen'
      })
      setShowForm(false)
      setFormData({ tit: '', des: '', tip: 'pet', pri: 'med' })
      cargarVeedurias()
    } catch (error) {
      console.error('Error creando veeduría:', error)
    }
  }

  const filteredVeedurias = veedurias.filter(veeduria => {
    const matchesSearch = veeduria.tit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         veeduria.des?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filtroEst === 'todos' || veeduria.est === filtroEst
    return matchesSearch && matchesFilter
  })

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activa': return 'bg-green-100 text-green-800'
      case 'pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'completada': return 'bg-blue-100 text-blue-800'
      case 'cancelada': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'alt': return 'bg-red-100 text-red-800'
      case 'med': return 'bg-yellow-100 text-yellow-800'
      case 'baj': return 'bg-green-100 text-green-800'
      case 'urg': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoName = (tipo) => {
    switch (tipo) {
      case 'pet': return 'Petición'
      case 'que': return 'Queja'
      case 'rec': return 'Reclamo'
      case 'sug': return 'Sugerencia'
      case 'fel': return 'Felicitación'
      case 'den': return 'Denuncia'
      default: return 'Desconocido'
    }
  }

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'
    return new Date(fecha).toLocaleDateString('es-CO')
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/cliente/dashboard' },
      { title: 'Mis Veedurías', href: '/cliente/veedurias' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Mis Veedurías</h1>
            <p className="text-muted-foreground">
              Gestiona tus veedurías ciudadanas y crea nuevas
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Veeduría
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros de Búsqueda</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por título o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterEstado} onValueChange={setFilterEstado}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="activa">Activa</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Nueva Veeduría</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tit">Título</Label>
                  <Input
                    id="tit"
                    value={formData.tit}
                    onChange={(e) => setFormData({ ...formData, tit: e.target.value })}
                    placeholder="Título de la veeduría"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="des">Descripción</Label>
                  <Textarea
                    id="des"
                    value={formData.des}
                    onChange={(e) => setFormData({ ...formData, des: e.target.value })}
                    placeholder="Describe detalladamente la situación que quieres denunciar o vigilar"
                    required
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tip">Tipo de Veeduría</Label>
                    <Select
                      value={formData.tip}
                      onValueChange={(value) => setFormData({ ...formData, tip: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pet">Petición</SelectItem>
                        <SelectItem value="que">Queja</SelectItem>
                        <SelectItem value="rec">Reclamo</SelectItem>
                        <SelectItem value="sug">Sugerencia</SelectItem>
                        <SelectItem value="fel">Felicitación</SelectItem>
                        <SelectItem value="den">Denuncia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pri">Prioridad</Label>
                    <Select
                      value={formData.pri}
                      onValueChange={(value) => setFormData({ ...formData, pri: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baj">Baja</SelectItem>
                        <SelectItem value="med">Media</SelectItem>
                        <SelectItem value="alt">Alta</SelectItem>
                        <SelectItem value="urg">Urgente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    Enviar Veeduría
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setFormData({ tit: '', des: '', tip: 'pet', pri: 'med' })
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Veedurias List */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Veedurías ({filteredVeedurias.length})</CardTitle>
            <CardDescription>
              Lista de todas tus veedurías ciudadanas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <LoaderCircle className="h-8 w-8 animate-spin" />
                <span className="ml-2">Cargando veedurías...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVeedurias.map((veeduria) => (
                  <div
                    key={veeduria.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {veeduria.tit}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {veeduria.des?.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(veeduria.est)}`}>
                            {veeduria.est}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(veeduria.pri)}`}>
                            {veeduria.pri}
                          </span>
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {getTipoName(veeduria.tip)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {formatFecha(veeduria.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {/* Ver detalles */}}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {veeduria.estado === 'pendiente' && (
                        <span className="text-xs text-yellow-600 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          En revisión
                        </span>
                      )}
                      {veeduria.estado === 'activa' && (
                        <span className="text-xs text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Aprobada
                        </span>
                      )}
                      {veeduria.estado === 'completada' && (
                        <span className="text-xs text-blue-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completada
                        </span>
                      )}
                      {veeduria.estado === 'cancelada' && (
                        <span className="text-xs text-red-600 flex items-center">
                          <XCircle className="h-3 w-3 mr-1" />
                          Cancelada
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {filteredVeedurias.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <p>No tienes veedurías creadas</p>
                    <p className="text-sm">Crea tu primera veeduría ciudadana</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default MisVeedurias
