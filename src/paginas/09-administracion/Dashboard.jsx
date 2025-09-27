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
      tit: 'Usuarios Activos',
      val: '0',
      cam: '+0%',
      ico: Users,
      col: 'text-blue-600'
    },
    {
      tit: 'Veedurías Activas',
      val: '0',
      cam: '+0%',
      ico: FileText,
      col: 'text-green-600'
    },
    {
      tit: 'Tareas Pendientes',
      val: '0',
      cam: '+0%',
      ico: Clock,
      col: 'text-yellow-600'
    },
    {
      tit: 'Donaciones Recibidas',
      val: '0',
      cam: '+0%',
      ico: TrendingUp,
      col: 'text-purple-600'
    }
  ])
  const [loading, setLoading] = useState(true)
  const [actRecientes, setActRecientes] = useState([])

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

      // Filtrar usuarios activos según la nomenclatura de estados
      const usuActivos = usuarios.data?.filter(usu => usu.est === 'act') || []
      
      // Filtrar veedurías activas según la nomenclatura de estados
      const veeActivas = veedurias.data?.filter(vee => ['pen', 'pro', 'rad'].includes(vee.est)) || []
      
      // Filtrar tareas pendientes según la nomenclatura de estados
      const tarPendientes = tareas.data?.filter(tar => tar.est === 'pen') || []
      
      // Filtrar donaciones confirmadas según la nomenclatura de estados
      const donConfirmadas = donaciones.data?.filter(don => don.est === 'con') || []

      // Actualizar estadísticas con datos reales
      setStats([
        {
          tit: 'Usuarios Activos',
          val: usuActivos.length.toString(),
          cam: '+0%',
          ico: Users,
          col: 'text-blue-600'
        },
        {
          tit: 'Veedurías Activas',
          val: veeActivas.length.toString(),
          cam: '+0%',
          ico: FileText,
          col: 'text-green-600'
        },
        {
          tit: 'Tareas Pendientes',
          val: tarPendientes.length.toString(),
          cam: '+0%',
          ico: Clock,
          col: 'text-yellow-600'
        },
        {
          tit: 'Donaciones Recibidas',
          val: donConfirmadas.length.toString(),
          cam: '+0%',
          ico: TrendingUp,
          col: 'text-purple-600'
        }
      ])

      // Generar actividades recientes dinámicas
      generarActividadesRecientes(usuarios.data, veedurias.data, tareas.data)
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const generarActividadesRecientes = (usuarios = [], veedurias = [], tareas = []) => {
    const actividades = []
    
    // Actividades de veedurías recientes
    veedurias.slice(0, 2).forEach(vee => {
      if (vee.fec_reg) {
        const fecReg = new Date(vee.fec_reg)
        const tiempoTranscurrido = Math.floor((Date.now() - fecReg.getTime()) / (1000 * 60 * 60))
        
        actividades.push({
          id: `vee_${vee.id}`,
          acc: `Nueva solicitud de veeduría: ${vee.tit}`,
          usu: `${vee.usuario?.nom || 'Usuario'} ${vee.usuario?.ape || ''}`,
          tiem: tiempoTranscurrido < 1 ? 'Hace menos de 1 hora' : `Hace ${tiempoTranscurrido} horas`,
          tip: 'info'
        })
      }
    })

    // Actividades de tareas recientes
    tareas.slice(0, 2).forEach(tar => {
      if (tar.fec_ini) {
        const fecIni = new Date(tar.fec_ini)
        const tiempoTranscurrido = Math.floor((Date.now() - fecIni.getTime()) / (1000 * 60 * 60))
        
        let accion = ''
        let tipo = 'info'
        
        switch (tar.est) {
          case 'pro':
            accion = `Tarea en proceso: ${tar.tit}`
            tipo = 'info'
            break
          case 'com':
            accion = `Tarea completada: ${tar.tit}`
            tipo = 'success'
            break
          case 'pen':
            accion = `Tarea pendiente: ${tar.tit}`
            tipo = 'warning'
            break
          default:
            accion = `Tarea actualizada: ${tar.tit}`
        }
        
        actividades.push({
          id: `tar_${tar.id}`,
          acc: accion,
          usu: `${tar.asignadoA?.nom || 'Usuario'} ${tar.asignadoA?.ape || ''}`,
          tiem: tiempoTranscurrido < 1 ? 'Hace menos de 1 hora' : `Hace ${tiempoTranscurrido} horas`,
          tip: tipo
        })
      }
    })

    // Ordenar por fecha y tomar las 4 más recientes
    actividades.sort((a, b) => {
      const tiempoA = a.tiem.includes('menos') ? 0 : parseInt(a.tiem.match(/\d+/)?.[0] || 0)
      const tiempoB = b.tiem.includes('menos') ? 0 : parseInt(b.tiem.match(/\d+/)?.[0] || 0)
      return tiempoA - tiempoB
    })

    setActRecientes(actividades.slice(0, 4))
  }

  const accRapidas = [
    {
      tit: 'Gestión de Usuarios',
      des: 'Administrar roles y permisos',
      ico: Users,
      col: 'bg-blue-500',
      href: '/admin/usuarios'
    },
    {
      tit: 'Control de Permisos',
      des: 'Configurar acceso a vistas',
      ico: Shield,
      col: 'bg-green-500',
      href: '/admin/roles'
    },
    {
      tit: 'Reportes y Análisis',
      des: 'Ver estadísticas del sistema',
      ico: BarChart3,
      col: 'bg-purple-500',
      href: '/admin/estadisticas'
    },
    {
      tit: 'Configuración',
      des: 'Ajustes del sistema',
      ico: Settings,
      col: 'bg-gray-500',
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
            Bienvenido, {user?.nom} {user?.ape} - Panel de control del CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL
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
                {stat.tit}
              </CardTitle>
              <stat.ico className={`h-4 w-4 ${stat.col}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? '...' : stat.val}
              </div>
              <p className="text-xs text-green-600 flex items-center">
                {stat.cam} desde el mes pasado
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
              {actRecientes.length > 0 ? (
                actRecientes.map((actividad) => (
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
                        {actividad.usu} • {actividad.tiem}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No hay actividades recientes</p>
                </div>
              )}
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

export default Dashboard
