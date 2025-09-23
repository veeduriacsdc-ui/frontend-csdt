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
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  LoaderCircle,
  Calendar,
  User,
  Clock
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import tareaService from '../../services/tareaService'
import usuarioService from '../../services/usuarioService'

const GestionarTareas = () => {
  const { user } = useAuth()
  const [tareas, setTareas] = useState([])
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingTarea, setEditingTarea] = useState(null)
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    prioridad: 'media',
    estado: 'pendiente',
    fecha_vencimiento: '',
    usuario_asignado: ''
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [tareasResponse, usuariosResponse] = await Promise.all([
        tareaService.obtenerTareas().catch(() => ({ data: [] })),
        usuarioService.obtenerUsuarios().catch(() => ({ data: [] }))
      ])
      setTareas(tareasResponse.data || [])
      setUsuarios(usuariosResponse.data || [])
    } catch (error) {
      console.error('Error cargando datos:', error)
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
      setFormData({ titulo: '', descripcion: '', prioridad: 'media', estado: 'pendiente', fecha_vencimiento: '', usuario_asignado: '' })
      cargarDatos()
    } catch (error) {
      console.error('Error guardando tarea:', error)
    }
  }

  const handleEdit = (tarea) => {
    setEditingTarea(tarea)
    setFormData({
      titulo: tarea.titulo || '',
      descripcion: tarea.descripcion || '',
      prioridad: tarea.prioridad || 'media',
      estado: tarea.estado || 'pendiente',
      fecha_vencimiento: tarea.fecha_vencimiento || '',
      usuario_asignado: tarea.usuario_asignado || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await tareaService.eliminarTarea(id)
        cargarDatos()
      } catch (error) {
        console.error('Error eliminando tarea:', error)
      }
    }
  }

  const handleChangeEstado = async (id, nuevoEstado) => {
    try {
      await tareaService.cambiarEstado(id, { estado: nuevoEstado })
      cargarDatos()
    } catch (error) {
      console.error('Error cambiando estado:', error)
    }
  }

  const handleAsignarUsuario = async (id, usuarioId) => {
    try {
      await tareaService.asignarUsuario(id, { usuario_id: usuarioId })
      cargarDatos()
    } catch (error) {
      console.error('Error asignando usuario:', error)
    }
  }

  const filteredTareas = tareas.filter(tarea =>
    tarea.titulo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tarea.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tarea.prioridad?.toLowerCase().includes(searchTerm.toLowerCase())
  )

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

  const getUsuarioName = (usuarioId) => {
    const usuario = usuarios.find(u => u.id === usuarioId)
    return usuario ? `${usuario.nom} ${usuario.ape}` : 'Sin asignar'
  }

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'
    return new Date(fecha).toLocaleDateString('es-CO')
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/admin/dashboard' },
      { title: 'Gestionar Tareas', href: '/admin/tareas' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Gestión de Tareas</h1>
            <p className="text-muted-foreground">
              Administra las tareas del sistema y sus asignaciones
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nueva Tarea
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Tareas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, descripción o prioridad..."
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
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    required
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prioridad">Prioridad</Label>
                    <Select
                      value={formData.prioridad}
                      onValueChange={(value) => setFormData({ ...formData, prioridad: value })}
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
                      value={formData.estado}
                      onValueChange={(value) => setFormData({ ...formData, estado: value })}
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
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha_vencimiento">Fecha de Vencimiento</Label>
                    <Input
                      id="fecha_vencimiento"
                      type="date"
                      value={formData.fecha_vencimiento}
                      onChange={(e) => setFormData({ ...formData, fecha_vencimiento: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="usuario_asignado">Usuario Asignado</Label>
                    <Select
                      value={formData.usuario_asignado}
                      onValueChange={(value) => setFormData({ ...formData, usuario_asignado: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        {usuarios.map((usuario) => (
                          <SelectItem key={usuario.id} value={usuario.id.toString()}>
                            {usuario.nom} {usuario.ape}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                      setFormData({ titulo: '', descripcion: '', prioridad: 'media', estado: 'pendiente', fecha_vencimiento: '', usuario_asignado: '' })
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
              Lista de todas las tareas del sistema
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
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CheckSquare className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">
                          {tarea.titulo}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {tarea.descripcion?.substring(0, 100)}...
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEstadoColor(tarea.estado)}`}>
                            {tarea.estado}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrioridadColor(tarea.prioridad)}`}>
                            {tarea.prioridad}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <User className="h-3 w-3 inline mr-1" />
                            {getUsuarioName(tarea.usuario_asignado)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {formatFecha(tarea.fecha_vencimiento)}
                          </span>
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(tarea.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

export default GestionarTareas
