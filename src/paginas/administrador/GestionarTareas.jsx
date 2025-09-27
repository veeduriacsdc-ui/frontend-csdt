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
    tit: '',
    des: '',
    pri: 'med',
    est: 'pen',
    fec_ven: '',
    asig_a: ''
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
      setFormData({ tit: '', des: '', pri: 'med', est: 'pen', fec_ven: '', asig_a: '' })
      cargarDatos()
    } catch (error) {
      console.error('Error guardando tarea:', error)
    }
  }

  const handleEdit = (tarea) => {
    setEditingTarea(tarea)
    setFormData({
      tit: tarea.tit || '',
      des: tarea.des || '',
      pri: tarea.pri || 'med',
      est: tarea.est || 'pen',
      fec_ven: tarea.fec_ven || '',
      asig_a: tarea.asig_a || ''
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
    tarea.tit?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tarea.des?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tarea.pri?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'com': return 'bg-green-100 text-green-800'
      case 'pro': return 'bg-blue-100 text-blue-800'
      case 'pen': return 'bg-yellow-100 text-yellow-800'
      case 'can': return 'bg-red-100 text-red-800'
      case 'sus': return 'bg-orange-100 text-orange-800'
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <SelectItem value="pro">En Progreso</SelectItem>
                        <SelectItem value="com">Completada</SelectItem>
                        <SelectItem value="can">Cancelada</SelectItem>
                        <SelectItem value="sus">Suspendida</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fec_ven">Fecha de Vencimiento</Label>
                    <Input
                      id="fec_ven"
                      type="date"
                      value={formData.fec_ven}
                      onChange={(e) => setFormData({ ...formData, fec_ven: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="asig_a">Usuario Asignado</Label>
                    <Select
                      value={formData.asig_a}
                      onValueChange={(value) => setFormData({ ...formData, asig_a: value })}
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
                      setFormData({ tit: '', des: '', pri: 'med', est: 'pen', fec_ven: '', asig_a: '' })
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
                            <User className="h-3 w-3 inline mr-1" />
                            {getUsuarioName(tarea.asig_a)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {formatFecha(tarea.fec_ven)}
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
