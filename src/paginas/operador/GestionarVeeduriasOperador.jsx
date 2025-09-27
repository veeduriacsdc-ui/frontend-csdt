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
  Edit, 
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  LoaderCircle,
  Calendar,
  User
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import veeduriaService from '../../services/veeduriaService'

const GestionarVeeduriasOperador = () => {
  const { user } = useAuth()
  const [veedurias, setVeedurias] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroEst, setFiltroEst] = useState('todos')

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

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      await veeduriaService.cambiarEstado(id, { estado: nuevoEstado })
      cargarVeedurias()
    } catch (error) {
      console.error('Error cambiando estado:', error)
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

  const formatFecha = (fecha) => {
    if (!fecha) return 'Sin fecha'
    return new Date(fecha).toLocaleDateString('es-CO')
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/operador/dashboard' },
      { title: 'Gestionar Veedurías', href: '/operador/veedurias' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Gestionar Veedurías</h1>
            <p className="text-muted-foreground">
              Revisar y procesar veedurías ciudadanas asignadas
            </p>
          </div>
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
                  <SelectItem value="pen">Pendiente</SelectItem>
                  <SelectItem value="pro">En Proceso</SelectItem>
                  <SelectItem value="rad">Radicada</SelectItem>
                  <SelectItem value="cer">Cerrada</SelectItem>
                  <SelectItem value="can">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Veedurias List */}
        <Card>
          <CardHeader>
            <CardTitle>Veedurías Asignadas ({filteredVeedurias.length})</CardTitle>
            <CardDescription>
              Lista de veedurías asignadas para revisión
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
                      {veeduria.est === 'pen' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCambiarEstado(veeduria.id, 'pro')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCambiarEstado(veeduria.id, 'can')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {veeduria.est === 'pro' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCambiarEstado(veeduria.id, 'cer')}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
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

export default GestionarVeeduriasOperador
