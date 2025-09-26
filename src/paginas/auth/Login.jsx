import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Checkbox } from '../../components/ui/checkbox'
import AuthLayout from '../../layouts/AuthLayout'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  // Función para copiar credenciales de prueba
  const handleCredentialClick = (email, password) => {
    setEmail(email)
    setPassword(password)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Iniciar Sesión" 
      description="Ingresa tu email y contraseña para acceder a tu cuenta"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={remember}
            onCheckedChange={setRemember}
          />
          <Label htmlFor="remember" className="text-sm">
            Recordarme
          </Label>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
          Iniciar Sesión
        </Button>
      </form>

      <div className="mt-4 text-center text-sm">
        <Link 
          to="/auth/forgot-password" 
          className="text-blue-600 hover:text-blue-800"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        ¿No tienes una cuenta?{' '}
        <Link to="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium">
          Regístrate
        </Link>
      </div>

      {/* Usuarios de Prueba */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">👥 Usuarios de Prueba</h3>
        <div className="space-y-2 text-xs text-gray-600">
          <div 
            className="flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
            onClick={() => handleCredentialClick('superadmin@ejemplo.com', 'superadmin123')}
          >
            <span className="font-medium">👑 Super Admin:</span>
            <span>superadmin@ejemplo.com / superadmin123</span>
          </div>
          <div 
            className="flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
            onClick={() => handleCredentialClick('admin@ejemplo.com', 'admin123')}
          >
            <span className="font-medium">👨‍💼 Administrador:</span>
            <span>admin@ejemplo.com / admin123</span>
          </div>
          <div 
            className="flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
            onClick={() => handleCredentialClick('operador@ejemplo.com', 'operador123')}
          >
            <span className="font-medium">👨‍💻 Operador:</span>
            <span>operador@ejemplo.com / operador123</span>
          </div>
          <div 
            className="flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
            onClick={() => handleCredentialClick('cliente@ejemplo.com', 'cliente123')}
          >
            <span className="font-medium">👤 Cliente:</span>
            <span>cliente@ejemplo.com / cliente123</span>
          </div>
          <div 
            className="flex justify-between cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors"
            onClick={() => handleCredentialClick('esteban.41m@gmail.com', 'password123')}
          >
            <span className="font-medium">👨‍💼 Admin Principal:</span>
            <span>esteban.41m@gmail.com / password123</span>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-500 italic">
          💡 Haz clic en cualquier credencial para copiarla automáticamente
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
