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
import veeduriaService from '../../services/veeduriaService'

const GestionarVeedurias = () => {
  const { user } = useAuth()
  const [veedurias, setVeedurias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingVeeduria, setEditingVeeduria] = useState(null)
  const [formData, setFormData] = useState({
    tit: '',
    des: '',
    tip: 'pet',
    est: 'pen',
    pri: 'med'
  })

  useEffect(() => {
    cargarVeedurias()
  }, [])

  const cargarVeedurias = async () => {
    try {
      setLoading(true)
      const response = await veeduriaService.obtenerVeedurias()
      setVeedurias(response.data || [])
    } catch (error) {
      console.error('Error cargando veedurías:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingVeeduria) {
        await veeduriaService.actualizarVeeduria(editingVeeduria.id, formData)
      } else {
        await veeduriaService.crearVeeduria(formData)
      }
      setShowForm(false)
      setEditingVeeduria(null)
      setFormData({ tit: '', des: '', tip: 'pet', est: 'pen', pri: 'med' })
      cargarVeedurias()
    } catch (error) {
      console.error('Error guardando veeduría:', error)
    }
  }

  const handleEdit = (veeduria) => {
    setEditingVeeduria(veeduria)
    setFormData({
      tit: veeduria.tit || '',
      des: veeduria.des || '',
      tip: veeduria.tip || 'pet',
      est: veeduria.est || 'pen',
      pri: veeduria.pri || 'med'
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta veeduría?')) {
      try {
        await veeduriaService.eliminarVeeduria(id)
        cargarVeedurias()
      } catch (error) {
        console.error('Error eliminando veeduría:', error)
      }
    }
  }

  const handleChangeEstado = async (id, nuevoEstado) => {
    try {
      await veeduriaService.cambiarEstado(id, { estado: nuevoEstado })
      cargarVeedurias()
    } catch (error) {
      console.error('Error cambiando estado:', error)
    }
  }

  const filteredVeedurias = veedurias.filter(veeduria =>
    veeduria.tit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veeduria.des?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veeduria.tip?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'rad': return 'bg-green-100 text-green-800'
      case 'pen': return 'bg-yellow-100 text-yellow-800'
      case 'pro': return 'bg-blue-100 text-blue-800'
      case 'cer': return 'bg-gray-100 text-gray-800'
      case 'can': return 'bg-red-100 text-red-800'
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

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/admin/dashboard' },
      { title: 'Gestionar Veedurías', href: '/admin/veedurias' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Gestión de Veedurías</h1>
            <p className="text-muted-foreground">
              Administra las veedurías ciudadanas del sistema
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Veeduría
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Veedurías</CardTitle>
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
                {editingVeeduria ? 'Editar Veeduría' : 'Nueva Veeduría'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tit">Título</Label>
                  <Input
                    id="tit"
                    value={formData.tit}
                    onChange={(e) => setFormData({ ...formData, tit: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="des">Descripción</Label>
                  <Textarea
                    id="des"
                    value={formData.des}
                    onChange={(e) => setFormData({ ...formData, des: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tip">Tipo</Label>
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
                    <Label htmlFor="est">Estado</Label>
                    <Select
                      value={formData.est}
                      onValueChange={(value) => setFormData({ ...formData, est: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pen">Pendiente</SelectItem>
                        <SelectItem value="pro">En Proceso</SelectItem>
                        <SelectItem value="rad">Radicada</SelectItem>
                        <SelectItem value="cer">Cerrada</SelectItem>
                        <SelectItem value="can">Cancelada</SelectItem>
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
                    {editingVeeduria ? 'Actualizar' : 'Crear'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingVeeduria(null)
                      setFormData({ tit: '', des: '', tip: 'pet', est: 'pen', pri: 'med' })
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
            <CardTitle>Veedurías ({filteredVeedurias.length})</CardTitle>
            <CardDescription>
              Lista de todas las veedurías del sistema
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
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(veeduria)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(veeduria.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredVeedurias.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron veedurías
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

export default GestionarVeedurias
