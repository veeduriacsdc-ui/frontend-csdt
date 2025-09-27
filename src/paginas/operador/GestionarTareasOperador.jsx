import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import AppLayout from '../../layouts/AppLayout'
import { 
  CheckSquare, 
  Search, 
  Edit, 
  Eye,
  CheckCircle,
  Clock,
  LoaderCircle,
  Calendar,
  User,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import tareaService from '../../services/tareaService'

const GestionarTareasOperador = () => {
  const { user } = useAuth()
  const [tareas, setTareas] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEst, setFiltroEst] = useState('todos')
  const [showForm, setShowForm] = useState(false)
  const [editingTarea, setEditingTarea] = useState(null)
  const [formData, setFormData] = useState({
    tit: '',
    des: '',
    pri: 'med',
    est: 'pen',
    fec_ven: ''
  })

  useEffect(() => {
    cargarTareas()
  }, [])

  const cargarTareas = async () => {
    try {
      setLoading(true)
      const response = await tareaService.obtenerTareas()
      setTareas(response.data || [])
    } catch (error) {
      console.error('Error cargando tareas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingTarea) {
        await tareaService.actualizarTarea(editingTarea.id, formData)
      } else {
        await tareaService.crearTarea(formData)
      }
      setShowForm(false)
      setEditingTarea(null)
      setFormData({ tit: '', des: '', pri: 'med', est: 'pen', fec_ven: '' })
      cargarTareas()
    } catch (error) {
      console.error('Error guardando tarea:', error)
    }
  }

  const handleEdit = (tarea) => {
    setEditingTarea(tarea)
    setFormData({
      tit: tarea.tit || tarea.titulo || '',
      des: tarea.des || tarea.descripcion || '',
      pri: tarea.pri || tarea.prioridad || 'med',
      est: tarea.est || tarea.estado || 'pen',
      fec_ven: tarea.fec_ven || tarea.fecha_vencimiento || ''
    })
    setShowForm(true)
  }

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await tareaService.cambiarEstado(id, { estado: nuevoEstado })
      cargarTareas()
    } catch (error) {
      console.error('Error cambiando estado:', error)
    }
  }

  const filteredTareas = tareas.filter(tarea => {
    const matchesSearch = tarea.tit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tarea.des?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filtroEst === 'todos' || tarea.est === filtroEst
    return matchesSearch && matchesFilter
  })

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completada': return 'bg-green-100 text-green-800'
      case 'en_progreso': return 'bg-blue-100 text-blue-800'
      case 'pendiente': return 'bg-yellow-100 text-yellow-800'
      case 'cancelada': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-100 text-red-800'
      case 'media': return 'bg-yellow-100 text-yellow-800'
      case 'baja': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'
    return new Date(fecha).toLocaleDateString('es-CO')
  }

  const isVencida = (fecha) => {
    if (!fecha) return false
    return new Date(fecha) < new Date()
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/operador/dashboard' },
      { title: 'Gestionar Tareas', href: '/operador/tareas' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Gestionar Tareas</h1>
            <p className="text-muted-foreground">
              Administrar tareas asignadas y crear nuevas
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <CheckSquare className="h-4 w-4 mr-2" />
            Nueva Tarea
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
                  <SelectItem value="en_progreso">En Progreso</SelectItem>
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
              <CardTitle>
                {editingTarea ? 'Editar Tarea' : 'Nueva Tarea'}
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
                    value={formData.des}
                    onChange={(e) => setFormData({ ...formData, des: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Select
                      value={formData.pri}
                      onValueChange={(value) => setFormData({ ...formData, pri: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="alta">Alta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select
                      value={formData.est}
                      onValueChange={(value) => setFormData({ ...formData, est: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendiente">Pendiente</SelectItem>
                        <SelectItem value="en_progreso">En Progreso</SelectItem>
                        <SelectItem value="completada">Completada</SelectItem>
                        <SelectItem value="cancelada">Cancelada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha_vencimiento">Fecha de Vencimiento</Label>
                    <Input
                      id="fecha_vencimiento"
                      type="date"
                      value={formData.fec_ven}
                      onChange={(e) => setFormData({ ...formData, fec_ven: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingTarea ? 'Actualizar' : 'Crear'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingTarea(null)
                      setFormData({ tit: '', des: '', pri: 'med', est: 'pen', fec_ven: '' })
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Tareas List */}
        <Card>
          <CardHeader>
            <CardTitle>Tareas ({filteredTareas.length})</CardTitle>
            <CardDescription>
              Lista de tareas asignadas y creadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <LoaderCircle className="h-8 w-8 animate-spin" />
                <span className="ml-2">Cargando tareas...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTareas.map((tarea) => (
                  <div
                    key={tarea.id}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 ${
                      isVencida(tarea.fecha_vencimiento) && tarea.estado !== 'completada' 
                        ? 'border-red-200 bg-red-50' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {tarea.tit}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tarea.des?.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(tarea.est)}`}>
                            {tarea.est}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(tarea.pri)}`}>
                            {tarea.pri}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {formatFecha(tarea.fec_ven)}
                          </span>
                          {isVencida(tarea.fec_ven) && tarea.est !== 'completada' && (
                            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <AlertCircle className="h-3 w-3 inline mr-1" />
                              Vencida
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(tarea)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {tarea.est === 'pendiente' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCambiarEstado(tarea.id, 'en_progreso')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Clock className="h-4 w-4" />
                        </Button>
                      )}
                      {tarea.est === 'en_progreso' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCambiarEstado(tarea.id, 'completada')}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {filteredTareas.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron tareas
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

export default GestionarTareasOperador
