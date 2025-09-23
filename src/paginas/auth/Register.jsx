import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import AuthLayout from '../../layouts/AuthLayout'
import { LoaderCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    nom: '',
    ape: '',
    email: '',
    pass: '',
    pass_confirmation: '',
    rol: 'cli'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { register } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.pass !== formData.pass_confirmation) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    try {
      await register(formData)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout 
      title="Crear Cuenta" 
      description="Ingresa tus datos para crear una nueva cuenta"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="nom">Nombres</Label>
          <Input
            id="nom"
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nombres"
            required
            autoFocus
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="ape">Apellidos</Label>
          <Input
            id="ape"
            type="text"
            name="ape"
            value={formData.ape}
            onChange={handleChange}
            placeholder="Apellidos"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pass">Contraseña</Label>
          <Input
            id="pass"
            type="password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pass_confirmation">Confirmar contraseña</Label>
          <Input
            id="pass_confirmation"
            type="password"
            name="pass_confirmation"
            value={formData.pass_confirmation}
            onChange={handleChange}
            placeholder="Confirmar contraseña"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
          Crear Cuenta
        </Button>
      </form>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Iniciar sesión
        </Link>
      </div>
    </AuthLayout>
  )
}

export default Register
