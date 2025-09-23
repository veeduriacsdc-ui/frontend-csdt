import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import AppLayout from '../../layouts/AppLayout'
import { 
  Users, 
  FileText, 
  CheckSquare, 
  DollarSign,
  Clock,
  TrendingUp,
  Activity,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import veeduriaService from '../../services/veeduriaService'
import donacionService from '../../services/donacionService'
import tareaService from '../../services/tareaService'

const DashboardOperador = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    veedurias: 0,
    donaciones: 0,
    tareas: 0,
    tareasPendientes: 0
  })
  const [loading, setLoading] = useState(true)
  const [recentActivities, setRecentActivities] = useState([])

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

      const tareasPendientes = tareas.data?.filter(t => t.estado === 'pendiente').length || 0

      setStats({
        veedurias: veedurias.data?.length || 0,
        donaciones: donaciones.data?.length || 0,
        tareas: tareas.data?.length || 0,
        tareasPendientes
      })

      // Simular actividades recientes
      setRecentActivities([
        {
          id: 1,
          action: 'Nueva veeduría asignada',
          time: 'Hace 2 horas',
          type: 'info'
        },
        {
          id: 2,
          action: 'Tarea completada',
          time: 'Hace 4 horas',
          type: 'success'
        },
        {
          id: 3,
          action: 'Donación procesada',
          time: 'Hace 6 horas',
          type: 'success'
        },
        {
          id: 4,
          action: 'Veeduría requiere revisión',
          time: 'Hace 8 horas',
          type: 'warning'
        }
      ])
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    {
      title: 'Gestionar Veedurías',
      description: 'Revisar y procesar veedurías',
      icon: FileText,
      color: 'bg-green-500',
      href: '/operador/veedurias'
    },
    {
      title: 'Gestionar Tareas',
      description: 'Ver y asignar tareas',
      icon: CheckSquare,
      color: 'bg-blue-500',
      href: '/operador/tareas'
    },
    {
      title: 'Gestionar Donaciones',
      description: 'Procesar donaciones',
      icon: DollarSign,
      color: 'bg-purple-500',
      href: '/operador/donaciones'
    },
    {
      title: 'Gestionar Archivos',
      description: 'Administrar documentos',
      icon: FileText,
      color: 'bg-orange-500',
      href: '/operador/archivos'
    }
  ]

  return (
    <AppLayout breadcrumbs={[
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Dashboard Operador', href: '/operador/dashboard' }
    ]}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Dashboard Operador</h1>
            <p className="text-muted-foreground">
              Bienvenido, {user?.nom} {user?.ape} - Panel de control para operadores
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
                Veedurías Asignadas
              </CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.veedurias}
              </div>
              <p className="text-xs text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% este mes
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Donaciones Procesadas
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.donaciones}
              </div>
              <p className="text-xs text-blue-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% este mes
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Tareas Totales
              </CardTitle>
              <CheckSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stats.tareas}
              </div>
              <p className="text-xs text-purple-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15% este mes
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
                {loading ? '...' : stats.tareasPendientes}
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
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimas acciones realizadas en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.time}
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
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4"
                    asChild
                  >
                    <a href={action.href}>
                      <div className={`w-8 h-8 rounded-md ${action.color} flex items-center justify-center mr-3`}>
                        <action.icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{action.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {action.description}
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
            <CardTitle>Estado del Sistema</CardTitle>
            <CardDescription>
              Monitoreo de componentes y servicios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Base de Datos</span>
                <span className="text-sm text-green-600 ml-auto">Operativa</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Servicios de IA</span>
                <span className="text-sm text-green-600 ml-auto">Activos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm">Sistema de Archivos</span>
                <span className="text-sm text-green-600 ml-auto">Disponible</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default DashboardOperador
