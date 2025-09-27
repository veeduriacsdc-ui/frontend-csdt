import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import AppLayout from '../../layouts/AppLayout'
import { 
  FileText, 
  CheckSquare, 
  DollarSign,
  Clock,
  TrendingUp,
  Activity,
  AlertCircle,
  Plus
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import veeduriaService from '../../services/veeduriaService'
import donacionService from '../../services/donacionService'
import tareaService from '../../services/tareaService'

const DashboardCliente = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    vee: 0,
    don: 0,
    tar: 0,
    tarPen: 0
  })
  const [loading, setLoading] = useState(true)
  const [actRecientes, setActRecientes] = useState([])

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      
      // Cargar datos en paralelo
      const [veedurias, donaciones, tareas] = await Promise.all([
        veeduriaService.obtenerVeedurias().catch(() => ({ data: [] })),
        donacionService.obtenerDonaciones().catch(() => ({ data: [] })),
        tareaService.obtenerTareas().catch(() => ({ data: [] }))
      ])

      const tarPen = tareas.data?.filter(t => t.est === 'pen').length || 0

      setStats({
        vee: veedurias.data?.length || 0,
        don: donaciones.data?.length || 0,
        tar: tareas.data?.length || 0,
        tarPen
      })

      // Simular actividades recientes
      setActRecientes([
        {
          id: 1,
          acc: 'Veeduría enviada',
          tiem: 'Hace 2 horas',
          tip: 'success'
        },
        {
          id: 2,
          acc: 'Donación realizada',
          tiem: 'Hace 4 horas',
          tip: 'success'
        },
        {
          id: 3,
          acc: 'Tarea completada',
          tiem: 'Hace 6 horas',
          tip: 'success'
        },
        {
          id: 4,
          acc: 'Veeduría en revisión',
          tiem: 'Hace 8 horas',
          tip: 'info'
        }
      ])
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const accRapidas = [
    {
      tit: 'Crear Veeduría',
      des: 'Enviar nueva veeduría ciudadana',
      ico: FileText,
      col: 'bg-green-500',
      href: '/cliente/veedurias'
    },
    {
      tit: 'Realizar Donación',
      des: 'Contribuir al desarrollo territorial',
      ico: DollarSign,
      col: 'bg-blue-500',
      href: '/cliente/donaciones'
    },
    {
      tit: 'Ver Mis Tareas',
      des: 'Revisar tareas asignadas',
      ico: CheckSquare,
      col: 'bg-purple-500',
      href: '/cliente/tareas'
    },
    {
      tit: 'Seguimiento de Casos',
      des: 'Ver estado de mis solicitudes',
      ico: Activity,
      col: 'bg-orange-500',
      href: '/cliente/seguimiento-casos'
    }
  ]

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Mi Dashboard', href: '/cliente/dashboard' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Mi Dashboard</h1>
            <p className="text-muted-foreground">
              Bienvenido, {user?.nom} {user?.ape} - Panel de control personal
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600 font-medium">Sistema Activo</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mis Veedurías
              </CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.vee}
            </div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +2 este mes
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mis Donaciones
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.don}
            </div>
              <p className="text-xs text-blue-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1 este mes
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Mis Tareas
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.tar}
            </div>
              <p className="text-xs text-purple-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3 este mes
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tareas Pendientes
              </CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
            <div className="text-2xl font-bold">
              {loading ? '...' : stats.tarPen}
            </div>
              <p className="text-xs text-yellow-600 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Requieren atención
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Mi Actividad Reciente</CardTitle>
              <CardDescription>
                Últimas acciones realizadas en tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
              {actRecientes.map((actividad) => (
                <div key={actividad.id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    actividad.tip === 'success' ? 'bg-green-500' :
                    actividad.tip === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {actividad.acc}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {actividad.tiem}
                    </p>
                  </div>
                </div>
              ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Accesos directos a funciones principales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
              {accRapidas.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start h-auto p-4"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`w-8 h-8 rounded-md ${action.col} flex items-center justify-center mr-3`}>
                      <action.ico className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{action.tit}</div>
                      <div className="text-sm text-muted-foreground">
                        {action.des}
                      </div>
                    </div>
                  </a>
                </Button>
              ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Mis Solicitudes</CardTitle>
            <CardDescription>
              Resumen del estado de tus solicitudes y casos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Veedurías Activas</span>
                <span className="text-sm text-green-600 ml-auto">2</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-sm">En Revisión</span>
                <span className="text-sm text-yellow-600 ml-auto">1</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-sm">Completadas</span>
                <span className="text-sm text-blue-600 ml-auto">5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default DashboardCliente
