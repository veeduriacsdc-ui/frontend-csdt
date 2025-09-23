import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import AppLayout from '../layouts/AppLayout'
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield, 
  Clock,
  TrendingUp,
  Activity
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import usuarioService from '../services/usuarioService'
import veeduriaService from '../services/veeduriaService'
import donacionService from '../services/donacionService'
import tareaService from '../services/tareaService'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState([
    {
      title: 'Usuarios Activos',
      value: '0',
      change: '+0%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Veedurías Activas',
      value: '0',
      change: '+0%',
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Tareas Pendientes',
      value: '0',
      change: '+0%',
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      title: 'Donaciones Recibidas',
      value: '0',
      change: '+0%',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      
      // Cargar datos en paralelo
      const [usuarios, veedurias, donaciones, tareas] = await Promise.all([
        usuarioService.obtenerUsuarios().catch(() => ({ data: [] })),
        veeduriaService.obtenerVeedurias().catch(() => ({ data: [] })),
        donacionService.obtenerDonaciones().catch(() => ({ data: [] })),
        tareaService.obtenerTareas().catch(() => ({ data: [] }))
      ])

      // Actualizar estadísticas
      setStats([
        {
          title: 'Usuarios Activos',
          value: usuarios.data?.length || 0,
          change: '+0%',
          icon: Users,
          color: 'text-blue-600'
        },
        {
          title: 'Veedurías Activas',
          value: veedurias.data?.length || 0,
          change: '+0%',
          icon: FileText,
          color: 'text-green-600'
        },
        {
          title: 'Tareas Pendientes',
          value: tareas.data?.length || 0,
          change: '+0%',
          icon: Clock,
          color: 'text-yellow-600'
        },
        {
          title: 'Donaciones Recibidas',
          value: donaciones.data?.length || 0,
          change: '+0%',
          icon: TrendingUp,
          color: 'text-purple-600'
        }
      ])
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const recentActivities = [
    {
      id: 1,
      action: 'Nueva solicitud de veeduría',
      user: 'María González',
      time: 'Hace 2 horas',
      type: 'info'
    },
    {
      id: 2,
      action: 'Documento aprobado',
      user: 'Carlos Rodríguez',
      time: 'Hace 4 horas',
      type: 'success'
    },
    {
      id: 3,
      action: 'Revisión requerida',
      user: 'Ana Martínez',
      time: 'Hace 6 horas',
      type: 'warning'
    },
    {
      id: 4,
      action: 'Caso resuelto',
      user: 'Luis Pérez',
      time: 'Hace 8 horas',
      type: 'success'
    }
  ]

  const quickActions = [
    {
      title: 'Gestión de Usuarios',
      description: 'Administrar roles y permisos',
      icon: Users,
      color: 'bg-blue-500',
      href: '/admin/usuarios'
    },
    {
      title: 'Control de Permisos',
      description: 'Configurar acceso a vistas',
      icon: Shield,
      color: 'bg-green-500',
      href: '/admin/roles'
    },
    {
      title: 'Reportes y Análisis',
      description: 'Ver estadísticas del sistema',
      icon: BarChart3,
      color: 'bg-purple-500',
      href: '/admin/estadisticas'
    },
    {
      title: 'Configuración',
      description: 'Ajustes del sistema',
      icon: Settings,
      color: 'bg-gray-500',
      href: '/admin/configuraciones'
    }
  ]

  return (
    <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
      <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user?.nom} {user?.ape} - Panel de control del Consejo Social de Veeduría y Desarrollo Territorial
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-500" />
          <span className="text-sm text-green-600 font-medium">Sistema Activo</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.value}
              </div>
              <p className="text-xs text-green-600 flex items-center">
                {stat.change} desde el mes pasado
              </p>
            </CardContent>
          </Card>
        ))}
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
                      {activity.user} • {activity.time}
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

export default Dashboard
