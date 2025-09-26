# Sistema de Registro Mejorado - CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL

## Descripción

Se ha implementado un sistema de registro mejorado que incluye validación en tiempo real de campos únicos (cédula y email) y mensajes de error específicos para datos ya registrados.

## Características Implementadas

### 1. Validación en Tiempo Real
- **Email**: Se valida automáticamente mientras el usuario escribe
- **Documento**: Se valida automáticamente mientras el usuario escribe
- **Debounce**: Las validaciones se ejecutan 500ms después de que el usuario deje de escribir

### 2. Validación de Campos Únicos
El sistema verifica que la cédula y email no estén registrados en ninguna de las siguientes tablas:
- `usuarios_sistema`
- `registros_pendientes`
- `operadores`
- `clientes`

### 3. Mensajes de Error Específicos
- Muestra exactamente dónde está registrado el dato (tipo de usuario)
- Resalta visualmente los campos con problemas
- Proporciona retroalimentación inmediata

### 4. Tipos de Usuario Soportados
- **Cliente**: Aprobación automática
- **Operador**: Requiere aprobación manual
- **Administrador**: Requiere aprobación manual

## Componentes Creados

### 1. RegistroForm.jsx
Formulario completo de registro con:
- Validación en tiempo real
- Campos obligatorios según el tipo de usuario
- Mensajes de error específicos
- Interfaz responsive

### 2. BotonRegistro.jsx
Botón reutilizable que:
- Abre el formulario de registro en modal
- Personalizable (texto, estilo)
- Maneja eventos de éxito

### 3. Servicios Actualizados
- `registroService.js`: Incluye validación de campos únicos
- `RegistroControlador.php`: Nuevo endpoint de validación

## Uso

### Botón de Registro Básico
```jsx
import BotonRegistro from './components/compartidas/BotonRegistro';

<BotonRegistro 
  texto="Registrarse"
  onSuccess={(resultado) => {
    console.log('Registro exitoso:', resultado);
  }}
/>
```

### Botón Personalizado
```jsx
<BotonRegistro 
  texto="👤 Crear Cuenta"
  estilo={{
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
    padding: '15px 30px',
    fontSize: '18px'
  }}
  onSuccess={(resultado) => {
    alert(`¡Registro exitoso! ${resultado.message}`);
  }}
/>
```

### Formulario de Registro Directo
```jsx
import RegistroForm from './components/compartidas/RegistroForm';

<RegistroForm 
  onClose={() => setMostrarRegistro(false)}
  onSuccess={(resultado) => {
    console.log('Usuario registrado:', resultado);
  }}
/>
```

## API Endpoints

### Validar Campos Únicos
```
POST /api/registro/validar-campos
```

**Parámetros:**
- `email` (opcional): Email a validar
- `documento_identidad` (opcional): Documento a validar

**Respuesta:**
```json
{
  "success": true,
  "data": {
    "email": {
      "existe": false,
      "mensaje": "Email disponible"
    },
    "documento": {
      "existe": true,
      "mensaje": "La cédula ya está registrada como operador",
      "tipo": "operador"
    }
  }
}
```

### Registrar Usuario
```
POST /api/registro/registrar
```

**Parámetros:**
- `nombre` (requerido): Nombre del usuario
- `apellido` (requerido): Apellido del usuario
- `email` (requerido): Email del usuario
- `telefono` (opcional): Teléfono del usuario
- `documento_identidad` (requerido): Número de documento
- `tipo_documento` (requerido): Tipo de documento (CC, CE, TI, RC, PA)
- `rol_solicitado` (requerido): Rol solicitado (cliente, operador, administrador)
- `motivacion` (opcional): Motivación para operadores/administradores
- `experiencia` (opcional): Experiencia relevante

## Flujo de Registro

1. **Usuario llena el formulario**
2. **Validación en tiempo real** de email y documento
3. **Validación del formulario** antes del envío
4. **Envío al backend** con validación adicional
5. **Respuesta específica** según el tipo de usuario:
   - **Cliente**: Registro inmediato
   - **Operador/Administrador**: Solicitud pendiente de aprobación

## Mejoras Implementadas

### Frontend
- ✅ Validación en tiempo real
- ✅ Mensajes de error específicos
- ✅ Interfaz responsive
- ✅ Componentes reutilizables
- ✅ Manejo de estados de carga

### Backend
- ✅ Validación de campos únicos
- ✅ Endpoint de validación independiente
- ✅ Mensajes de error específicos
- ✅ Identificación del tipo de registro existente

## Próximos Pasos

1. **Implementar notificaciones por email**
2. **Panel de administración** para aprobar registros
3. **Historial de registros** pendientes
4. **Integración con sistema de roles** existente

## Notas Técnicas

- Las validaciones se ejecutan con debounce de 500ms
- Los clientes se aprueban automáticamente
- Los operadores y administradores requieren aprobación manual
- El sistema mantiene compatibilidad con la estructura de base de datos existente
