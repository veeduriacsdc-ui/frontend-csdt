import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import AppLayout from '../../layouts/AppLayout'
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield,
  LoaderCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import usuarioService from '../../services/usuarioService'

const GestionarUsuarios = () => {
  const { user } = useAuth()
  const [usuarios, setUsuarios] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    nom: '',
    ape: '',
    email: '',
    pass: '',
    rol: 'cli'
  })

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const cargarUsuarios = async () => {
    try {
      setLoading(true)
      const response = await usuarioService.obtenerUsuarios()
      setUsuarios(response.data || [])
    } catch (error) {
      console.error('Error cargando usuarios:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await usuarioService.actualizarUsuario(editingUser.id, formData)
      } else {
        await usuarioService.crearUsuario(formData)
      }
      setShowForm(false)
      setEditingUser(null)
      setFormData({ nom: '', ape: '', email: '', pass: '', rol: 'cli' })
      cargarUsuarios()
    } catch (error) {
      console.error('Error guardando usuario:', error)
    }
  }

  const handleEdit = (usuario) => {
    setEditingUser(usuario)
    setFormData({
      nom: usuario.nom || '',
      ape: usuario.ape || '',
      email: usuario.email || '',
      pass: '',
      rol: usuario.rol || 'cli'
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        await usuarioService.eliminarUsuario(id)
        cargarUsuarios()
      } catch (error) {
        console.error('Error eliminando usuario:', error)
      }
    }
  }

  const handleChangeRole = async (id, newRole) => {
    try {
      await usuarioService.cambiarEstado(id, { estado: 'activo' })
      cargarUsuarios()
    } catch (error) {
      console.error('Error cambiando rol:', error)
    }
  }

  const filteredUsuarios = usuarios.filter(usuario =>
    usuario.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.ape?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleColor = (rol) => {
    switch (rol) {
      case 'adm': return 'bg-purple-100 text-purple-800'
      case 'ope': return 'bg-blue-100 text-blue-800'
      case 'cli': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleName = (rol) => {
    switch (rol) {
      case 'adm': return 'Administrador'
      case 'ope': return 'Operador'
      case 'cli': return 'Cliente'
      default: return 'Desconocido'
    }
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/admin/dashboard' },
      { title: 'Gestionar Usuarios', href: '/admin/usuarios' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Gestión de Usuarios</h1>
            <p className="text-muted-foreground">
              Administra los usuarios del sistema y sus roles
            </p>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, apellido o email..."
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
                {editingUser ? 'Editar Usuario' : 'Nuevo Usuario'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nombres</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ape">Apellidos</Label>
                    <Input
                      id="ape"
                      value={formData.ape}
                      onChange={(e) => setFormData({ ...formData, ape: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pass">Contraseña</Label>
                  <Input
                    id="pass"
                    type="password"
                    value={formData.pass}
                    onChange={(e) => setFormData({ ...formData, pass: e.target.value })}
                    required={!editingUser}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rol">Rol</Label>
                  <Select
                    value={formData.rol}
                    onValueChange={(value) => setFormData({ ...formData, rol: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cli">Cliente</SelectItem>
                      <SelectItem value="ope">Operador</SelectItem>
                      <SelectItem value="adm">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-2">
                  <Button type="submit">
                    {editingUser ? 'Actualizar' : 'Crear'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowForm(false)
                      setEditingUser(null)
                      setFormData({ nom: '', ape: '', email: '', pass: '', rol: 'cli' })
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>Usuarios ({filteredUsuarios.length})</CardTitle>
            <CardDescription>
              Lista de todos los usuarios del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <LoaderCircle className="h-8 w-8 animate-spin" />
                <span className="ml-2">Cargando usuarios...</span>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsuarios.map((usuario) => (
                  <div
                    key={usuario.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {usuario.nom} {usuario.ape}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {usuario.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(usuario.rol)}`}>
                        {getRoleName(usuario.rol)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(usuario)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(usuario.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {filteredUsuarios.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No se encontraron usuarios
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

export default GestionarUsuarios
