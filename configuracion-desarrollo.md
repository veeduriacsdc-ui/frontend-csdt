# Configuración de Desarrollo - CONSEJO SOCIAL DE VEEDURÍA Y DESARROLLO TERRITORIAL

## Verificación de Conexión

### 1. Verificar Servidor Backend

Ejecuta el script de verificación:
```bash
cd frontend-csdt-final
node verificar-servidor.js
```

### 2. Configuraciones de API Soportadas

El sistema intenta conectarse a estas URLs en orden:

1. **Local (puerto 8000)**: `http://localhost:8000/api`
2. **XAMPP (puerto 8000)**: `http://127.0.0.1:8000/api`
3. **Puerto alternativo (8001)**: `http://localhost:8001/api`
4. **Puerto alternativo (3000)**: `http://localhost:3000/api`

### 3. Configuración Manual

Si necesitas usar una URL específica, puedes:

#### Opción A: Variable de entorno
Crea un archivo `.env` en `frontend-csdt-final/`:
```env
VITE_API_URL=http://tu-servidor:puerto/api
```

#### Opción B: Cambiar en el código
Modifica `frontend-csdt-final/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://tu-servidor:puerto/api';
```

### 4. Iniciar Servidor Backend

#### Con Laravel Artisan:
```bash
cd backend-csdt
php artisan serve --port=8000
```

#### Con XAMPP:
1. Inicia Apache y MySQL
2. Coloca el proyecto en `htdocs`
3. Accede a `http://localhost/backend-csdt/public`

#### Con Docker:
```bash
cd backend-csdt
docker-compose up -d
```

### 5. Verificar Rutas API

El backend debe tener estas rutas configuradas:
- `GET /api/health` - Verificación de salud
- `POST /api/registro/validar-campos` - Validación de campos únicos
- `POST /api/registro/registrar` - Registro de usuarios

### 6. Solución de Problemas

#### Error: "Error de conexión"
1. Verifica que el servidor backend esté ejecutándose
2. Comprueba que el puerto esté disponible
3. Revisa la configuración de CORS
4. Verifica que las rutas API existan

#### Error: "CORS"
Agrega al archivo `backend-csdt/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5173', 'http://127.0.0.1:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
```

#### Error: "404 Not Found"
Verifica que las rutas estén registradas en `backend-csdt/routes/api.php`

### 7. Componente de Diagnóstico

El componente `DiagnosticoConexion` se muestra en la esquina inferior derecha de la página de inicio y te permite:
- Ver el estado de la conexión
- Verificar la URL del servidor
- Reintentar la conexión
- Ver detalles del error

### 8. Logs de Desarrollo

Para ver logs detallados, abre la consola del navegador (F12) y busca:
- Errores de red
- Respuestas del servidor
- Validaciones de campos

### 9. Pruebas de Registro

1. Abre la página de inicio
2. Haz clic en "👤 Registrarse"
3. Llena el formulario
4. Observa las validaciones en tiempo real
5. Verifica que se envíe correctamente al servidor

### 10. Configuración de Producción

Para producción, actualiza:
- `VITE_API_URL` con la URL del servidor de producción
- Configuración de CORS para el dominio de producción
- Certificados SSL si es necesario
