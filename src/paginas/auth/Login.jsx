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
  const [cor, setCor] = useState('')
  const [con, setCon] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  // Función para copiar credenciales de prueba
  const handleCredentialClick = (cor, con) => {
    setCor(cor)
    setCon(con)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(cor, con)
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
          <Label htmlFor="cor">Correo electrónico</Label>
          <Input
            id="cor"
            type="email"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="con">Contraseña</Label>
          <Input
            id="con"
            type="password"
            value={con}
            onChange={(e) => setCon(e.target.value)}
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

    </AuthLayout>
  )
}

export default Login
