import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import AppLayout from '../../layouts/AppLayout'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign,
  CheckSquare,
  Calendar,
  Download,
  RefreshCw,
  LoaderCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import usuarioService from '../../services/usuarioService'
import veeduriaService from '../../services/veeduriaService'
import donacionService from '../../services/donacionService'
import tareaService from '../../services/tareaService'

const Estadisticas = () => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [periodo, setPeriodo] = useState('mes')
  const [estadisticas, setEstadisticas] = useState({
    usuarios: {
      total: 0,
      activos: 0,
      nuevos: 0,
      porRol: { cli: 0, ope: 0, adm: 0 }
    },
    veedurias: {
      total: 0,
      activas: 0,
      completadas: 0,
      porTipo: { social: 0, ambiental: 0, urbana: 0, rural: 0 }
    },
    donaciones: {
      total: 0,
      montoTotal: 0,
      aprobadas: 0,
      porTipo: { monetaria: 0, especie: 0, servicios: 0 }
    },
    tareas: {
      total: 0,
      completadas: 0,
      pendientes: 0,
      porPrioridad: { alta: 0, media: 0, baja: 0 }
    }
  })

  useEffect(() => {
    cargarEstadisticas()
  }, [periodo])

  const cargarEstadisticas = async () => {
    try {
      setLoading(true)
      
      // Cargar datos en paralelo
      const [usuarios, veedurias, donaciones, tareas] = await Promise.all([
        usuarioService.obtenerUsuarios().catch(() => ({ data: [] })),
        veeduriaService.obtenerVeedurias().catch(() => ({ data: [] })),
        donacionService.obtenerDonaciones().catch(() => ({ data: [] })),
        tareaService.obtenerTareas().catch(() => ({ data: [] }))
      ])

      // Procesar estadísticas de usuarios
      const usuariosData = usuarios.data || []
      const usuariosActivos = usuariosData.filter(u => u.estado === 'activo').length
      const usuariosNuevos = usuariosData.filter(u => {
        const fechaCreacion = new Date(u.created_at)
        const fechaLimite = new Date()
        fechaLimite.setMonth(fechaLimite.getMonth() - 1)
        return fechaCreacion > fechaLimite
      }).length

      const usuariosPorRol = usuariosData.reduce((acc, u) => {
        acc[u.rol] = (acc[u.rol] || 0) + 1
        return acc
      }, {})

      // Procesar estadísticas de veedurías
      const veeduriasData = veedurias.data || []
      const veeduriasActivas = veeduriasData.filter(v => v.estado === 'activa').length
      const veeduriasCompletadas = veeduriasData.filter(v => v.estado === 'completada').length

      const veeduriasPorTipo = veeduriasData.reduce((acc, v) => {
        acc[v.tipo] = (acc[v.tipo] || 0) + 1
        return acc
      }, {})

      // Procesar estadísticas de donaciones
      const donacionesData = donaciones.data || []
      const donacionesAprobadas = donacionesData.filter(d => d.estado === 'aprobada').length
      const montoTotal = donacionesData.reduce((sum, d) => sum + (parseFloat(d.monto) || 0), 0)

      const donacionesPorTipo = donacionesData.reduce((acc, d) => {
        acc[d.tipo] = (acc[d.tipo] || 0) + 1
        return acc
      }, {})

      // Procesar estadísticas de tareas
      const tareasData = tareas.data || []
      const tareasCompletadas = tareasData.filter(t => t.estado === 'completada').length
      const tareasPendientes = tareasData.filter(t => t.estado === 'pendiente').length

      const tareasPorPrioridad = tareasData.reduce((acc, t) => {
        acc[t.prioridad] = (acc[t.prioridad] || 0) + 1
        return acc
      }, {})

      setEstadisticas({
        usuarios: {
          total: usuariosData.length,
          activos: usuariosActivos,
          nuevos: usuariosNuevos,
          porRol: usuariosPorRol
        },
        veedurias: {
          total: veeduriasData.length,
          activas: veeduriasActivas,
          completadas: veeduriasCompletadas,
          porTipo: veeduriasPorTipo
        },
        donaciones: {
          total: donacionesData.length,
          montoTotal,
          aprobadas: donacionesAprobadas,
          porTipo: donacionesPorTipo
        },
        tareas: {
          total: tareasData.length,
          completadas: tareasCompletadas,
          pendientes: tareasPendientes,
          porPrioridad: tareasPorPrioridad
        }
      })
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatMonto = (monto) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(monto || 0)
  }

  const getPorcentaje = (valor, total) => {
    if (total === 0) return 0
    return Math.round((valor / total) * 100)
  }

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/admin/dashboard' },
      { title: 'Estadísticas', href: '/admin/estadisticas' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Estadísticas del Sistema</h1>
            <p className="text-muted-foreground">
              Análisis y reportes del Consejo Social de Veeduría y Desarrollo Territorial
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select value={periodo} onValueChange={setPeriodo}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="semana">Esta semana</SelectItem>
                <SelectItem value="mes">Este mes</SelectItem>
                <SelectItem value="año">Este año</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={cargarEstadisticas} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Actualizar
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Usuarios
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : estadisticas.usuarios.total}
              </div>
              <p className="text-xs text-blue-600">
                {estadisticas.usuarios.activos} activos ({getPorcentaje(estadisticas.usuarios.activos, estadisticas.usuarios.total)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Veedurías
              </CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : estadisticas.veedurias.total}
              </div>
              <p className="text-xs text-green-600">
                {estadisticas.veedurias.activas} activas ({getPorcentaje(estadisticas.veedurias.activas, estadisticas.veedurias.total)}%)
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Donaciones
              </CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : estadisticas.donaciones.total}
              </div>
              <p className="text-xs text-purple-600">
                {formatMonto(estadisticas.donaciones.montoTotal)} recaudado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tareas
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : estadisticas.tareas.total}
              </div>
              <p className="text-xs text-orange-600">
                {estadisticas.tareas.completadas} completadas ({getPorcentaje(estadisticas.tareas.completadas, estadisticas.tareas.total)}%)
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos Detallados */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Usuarios por Rol */}
          <Card>
            <CardHeader>
              <CardTitle>Usuarios por Rol</CardTitle>
              <CardDescription>
                Distribución de usuarios según su rol en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <LoaderCircle className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(estadisticas.usuarios.porRol).map(([rol, cantidad]) => (
                    <div key={rol} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          rol === 'cli' ? 'bg-green-500' :
                          rol === 'ope' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`} />
                        <span className="text-sm font-medium">
                          {rol === 'cli' ? 'Clientes' :
                           rol === 'ope' ? 'Operadores' :
                           'Administradores'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{cantidad}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              rol === 'cli' ? 'bg-green-500' :
                              rol === 'ope' ? 'bg-blue-500' :
                              'bg-purple-500'
                            }`}
                            style={{ width: `${getPorcentaje(cantidad, estadisticas.usuarios.total)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Veedurías por Tipo */}
          <Card>
            <CardHeader>
              <CardTitle>Veedurías por Tipo</CardTitle>
              <CardDescription>
                Distribución de veedurías según su categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <LoaderCircle className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(estadisticas.veedurias.porTipo).map(([tipo, cantidad]) => (
                    <div key={tipo} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${
                          tipo === 'social' ? 'bg-green-500' :
                          tipo === 'ambiental' ? 'bg-blue-500' :
                          tipo === 'urbana' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <span className="text-sm font-medium capitalize">{tipo}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">{cantidad}</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              tipo === 'social' ? 'bg-green-500' :
                              tipo === 'ambiental' ? 'bg-blue-500' :
                              tipo === 'urbana' ? 'bg-purple-500' :
                              'bg-orange-500'
                            }`}
                            style={{ width: `${getPorcentaje(cantidad, estadisticas.veedurias.total)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumen de Actividad */}
        <Card>
          <CardHeader>
            <CardTitle>Resumen de Actividad</CardTitle>
            <CardDescription>
              Estadísticas generales del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <LoaderCircle className="h-8 w-8 animate-spin" />
                <span className="ml-2">Cargando estadísticas...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {estadisticas.usuarios.nuevos}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Usuarios nuevos este {periodo}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">
                    {estadisticas.veedurias.completadas}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Veedurías completadas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {estadisticas.donaciones.aprobadas}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Donaciones aprobadas
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">
                    {estadisticas.tareas.pendientes}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tareas pendientes
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default Estadisticas
