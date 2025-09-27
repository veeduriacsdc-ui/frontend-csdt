import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import AppLayout from '../../layouts/AppLayout'
import DiagnosticoConexion from '../../components/compartidas/DiagnosticoConexion'
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
          acc: 'Nueva veeduría asignada',
          tiem: 'Hace 2 horas',
          tip: 'info'
        },
        {
          id: 2,
          acc: 'Tarea completada',
          tiem: 'Hace 4 horas',
          tip: 'success'
        },
        {
          id: 3,
          acc: 'Donación procesada',
          tiem: 'Hace 6 horas',
          tip: 'success'
        },
        {
          id: 4,
          acc: 'Veeduría requiere revisión',
          tiem: 'Hace 8 horas',
          tip: 'warning'
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
      tit: 'Gestionar Veedurías',
      des: 'Revisar y procesar veedurías',
      ico: FileText,
      col: 'bg-green-500',
      href: '/operador/veedurias'
    },
    {
      tit: 'Gestionar Tareas',
      des: 'Ver y asignar tareas',
      ico: CheckSquare,
      col: 'bg-blue-500',
      href: '/operador/tareas'
    },
    {
      tit: 'Gestionar Donaciones',
      des: 'Procesar donaciones',
      ico: DollarSign,
      col: 'bg-purple-500',
      href: '/operador/donaciones'
    },
    {
      tit: 'Gestionar Archivos',
      des: 'Administrar documentos',
      ico: FileText,
      col: 'bg-orange-500',
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

        {/* Diagnóstico de Conexión - Solo para operadores */}
        <Card>
          <CardHeader>
            <CardTitle>🔧 Diagnóstico del Sistema</CardTitle>
            <CardDescription>
              Herramientas de diagnóstico y monitoreo del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DiagnosticoConexion />
          </CardContent>
        </Card>

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
                {loading ? '...' : stats.vee}
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
                {loading ? '...' : stats.don}
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
                {loading ? '...' : stats.tar}
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
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimas acciones realizadas en el sistema
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

      </div>
    </AppLayout>
  )
}

export default DashboardOperador
