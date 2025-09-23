import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import AppLayout from '../../layouts/AppLayout'
import { 
  DollarSign, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  LoaderCircle,
  Calendar,
  User
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import donacionService from '../../services/donacionService'

const GestionarDonaciones = () => {
  const { user } = useAuth()
  const [donaciones, setDonaciones] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingDonacion, setEditingDonacion] = useState(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    monto: '',
    tipo: 'monetaria',
    estado: 'pendiente',
    fecha_limite: ''
  })

  useEffect(() => {
    cargarDonaciones()
  }, [])

  const cargarDonaciones = async () => {
    try {
      setLoading(true)
      const response = await donacionService.obtenerDonaciones()
      setDonaciones(response.data || [])
    } catch (error) {
      console.error('Error cargando donaciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDonacion) {
        await donacionService.actualizarDonacion(editingDonacion.id, formData)
      } else {
        await donacionService.crearDonacion(formData)
      }
      setShowForm(false)
      setEditingDonacion(null)
      setFormData({ titulo: '', descripcion: '', monto: '', tipo: 'monetaria', estado: 'pendiente', fecha_limite: '' })
      cargarDonaciones()
    } catch (error) {
      console.error('Error guardando donación:', error)
    }
  }

  const handleEdit = (donacion) => {
    setEditingDonacion(donacion)
    setFormData({
      titulo: donacion.titulo || '',
      descripcion: donacion.descripcion || '',
      monto: donacion.monto || '',
      tipo: donacion.tipo || 'monetaria',
      estado: donacion.estado || 'pendiente',
      fecha_limite: donacion.fecha_limite || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta donación?')) {
      try {
        await donacionService.eliminarDonacion(id)
        cargarDonaciones()
      } catch (error) {
        console.error('Error eliminando donación:', error)
      }
    }
  }

  const handleChangeEstado = async (id, nuevoEstado) => {
    try {
      await donacionService.cambiarEstado(id, { estado: nuevoEstado })
      cargarDonaciones()
    } catch (error) {
      console.error('Error cambiando estado:', error)
    }
  }

  const filteredDonaciones = donaciones.filter(donacion =>
    donacion.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donacion.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donacion.tipo?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'aprobada': return 'bg-green-100 text-green-800'
      case 'pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'rechazada': return 'bg-red-100 text-red-800'
      case 'completada': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'monetaria': return 'bg-green-100 text-green-800'
      case 'especie': return 'bg-blue-100 text-blue-800'
      case 'servicios': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTipoName = (tipo) => {
    switch (tipo) {
      case 'monetaria': return 'Monetaria'
      case 'especie': return 'En Especie'
      case 'servicios': return 'Servicios'
      default: return 'Desconocido'
    }
  }

  const formatMonto = (monto) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(monto || 0)
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/admin/dashboard' },
      { title: 'Gestionar Donaciones', href: '/admin/donaciones' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Gestión de Donaciones</h1>
            <p className="text-muted-foreground">
              Administra las donaciones recibidas por el sistema
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Donación
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Donaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, descripción o tipo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>
                {editingDonacion ? 'Editar Donación' : 'Nueva Donación'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monto">Monto</Label>
                    <Input
                      id="monto"
                      type="number"
                      value={formData.monto}
                      onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo</Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) => setFormData({ ...formData, tipo: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monetaria">Monetaria</SelectItem>
                        <SelectItem value="especie">En Especie</SelectItem>
                        <SelectItem value="servicios">Servicios</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={formData.estado}
                      onValueChange={(value) => setFormData({ ...formData, estado: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="aprobada">Aprobada</SelectItem>
                        <SelectItem value="rechazada">Rechazada</SelectItem>
                        <SelectItem value="completada">Completada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha_limite">Fecha Límite</Label>
                    <Input
                      id="fecha_limite"
                      type="date"
                      value={formData.fecha_limite}
                      onChange={(e) => setFormData({ ...formData, fecha_limite: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingDonacion ? 'Actualizar' : 'Crear'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingDonacion(null)
                      setFormData({ titulo: '', descripcion: '', monto: '', tipo: 'monetaria', estado: 'pendiente', fecha_limite: '' })
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Donaciones List */}
        <Card>
          <CardHeader>
            <CardTitle>Donaciones ({filteredDonaciones.length})</CardTitle>
            <CardDescription>
              Lista de todas las donaciones del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <LoaderCircle className="h-8 w-8 animate-spin" />
                <span className="ml-2">Cargando donaciones...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDonaciones.map((donacion) => (
                  <div
                    key={donacion.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {donacion.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {donacion.descripcion?.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-sm font-medium text-green-600">
                            {formatMonto(donacion.monto)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(donacion.estado)}`}>
                            {donacion.estado}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTipoColor(donacion.tipo)}`}>
                            {getTipoName(donacion.tipo)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(donacion)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(donacion.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredDonaciones.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron donaciones
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

export default GestionarDonaciones
