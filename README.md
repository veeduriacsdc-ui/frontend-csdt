# Sistema CSDT - Consejo Social de Veeduría y Desarrollo Territorial

## 📋 Descripción

Sistema integral para la gestión de veedurías ciudadanas, donaciones y desarrollo territorial. Desarrollado con React.js (Frontend) y Laravel (Backend).

## 🌐 Información del Servidor

- **Servidor:** DigitalOcean Droplet
- **IP Pública:** 104.248.212.204
- **IP Privada:** 10.120.0.2
- **Región:** SFO2 (San Francisco)
- **Email:** veeduriacsdc@gmail.com
- **Repositorio Frontend:** https://github.com/veeduriacsdc-ui/frontend-csdt.git
- **Repositorio Backend:** https://github.com/veeduriacsdc-ui/backend-csdt.git

## 🚀 Características Principales

### Sistema de Roles Jerárquico
- **Cliente (cli)** - Nivel 1: Acceso básico
- **Operador (ope)** - Nivel 2: Cliente + Operador  
- **Administrador (adm)** - Nivel 3: Acceso completo

### Funcionalidades por Rol

#### 👤 Cliente
- Dashboard personal con estadísticas
- Gestión de veedurías propias
- Seguimiento de casos
- Tareas asignadas
- Realización de donaciones

#### ⚙️ Operador
- Dashboard operativo
- Gestión de veedurías asignadas
- Gestión de tareas
- Procesamiento de donaciones
- Gestión de archivos

#### 👑 Administrador
- Dashboard administrativo
- Gestión completa de usuarios
- Gestión de veedurías
- Gestión de donaciones
- Gestión de tareas
- Reportes y estadísticas
- Configuración del sistema

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Herramienta de construcción
- **React Router DOM** - Enrutamiento
- **Tailwind CSS** - Framework de estilos
- **Radix UI** - Componentes de UI
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos

### Backend
- **Laravel 12** - Framework PHP
- **MySQL** - Base de datos
- **Laravel Sanctum** - Autenticación API
- **Eloquent ORM** - ORM de Laravel

## 📁 Estructura del Proyecto

```
frontend-csdt-final/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes de UI base
│   │   ├── LazyLoader.jsx  # Cargador lazy
│   │   ├── Modal.jsx       # Modal reutilizable
│   │   ├── Pagination.jsx  # Componente de paginación
│   │   └── ...
│   ├── contexts/           # Contextos de React
│   │   ├── AuthContext.jsx
│   │   ├── PermisosVistaContext.jsx
│   │   └── NotificationContext.jsx
│   ├── hooks/              # Hooks personalizados
│   │   ├── useAsyncState.js
│   │   ├── useForm.js
│   │   ├── useNotifications.js
│   │   ├── usePagination.js
│   │   ├── useSearchAndFilter.js
│   │   ├── useModal.js
│   │   └── useConfirmation.js
│   ├── services/           # Servicios de API
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── usuarioService.js
│   │   ├── veeduriaService.js
│   │   ├── donacionService.js
│   │   ├── tareaService.js
│   │   ├── archivoService.js
│   │   ├── rolService.js
│   │   ├── configuracionService.js
│   │   └── logService.js
│   ├── paginas/            # Páginas de la aplicación
│   │   ├── publicas/       # Páginas públicas
│   │   ├── auth/           # Páginas de autenticación
│   │   ├── cliente/        # Páginas de cliente
│   │   ├── operador/       # Páginas de operador
│   │   ├── administrador/  # Páginas de administrador
│   │   └── compartidas/    # Páginas compartidas
│   ├── layouts/            # Layouts de la aplicación
│   ├── styles/             # Estilos globales
│   └── App.jsx             # Componente principal
├── public/                 # Archivos estáticos
├── package.json            # Dependencias del proyecto
└── README.md              # Documentación
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Git
- Acceso SSH al servidor DigitalOcean

### Instalación Local (Desarrollo)

```bash
# Clonar el repositorio
git clone https://github.com/veeduriacsdc-ui/frontend-csdt.git
cd frontend-csdt

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con la configuración del backend
VITE_API_URL=http://104.248.212.204:8000/api

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build
```

### Instalación en Servidor DigitalOcean

#### Paso 1: Conectar al Servidor
```bash
# Conectar por SSH al servidor
ssh root@104.248.212.204
# Contraseña: Control-1234
```

#### Paso 2: Instalar Dependencias del Sistema
```bash
# Actualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar Nginx
apt install nginx -y

# Instalar PM2 para gestión de procesos
npm install -g pm2

# Instalar Git
apt install git -y
```

#### Paso 3: Clonar y Configurar Frontend
```bash
# Crear directorio para la aplicación
mkdir -p /var/www/csdt
cd /var/www/csdt

# Clonar repositorio
git clone https://github.com/veeduriacsdc-ui/frontend-csdt.git frontend
cd frontend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
nano .env
```

#### Configuración del archivo .env en producción:
```env
VITE_API_URL=http://104.248.212.204:8000/api
VITE_APP_NAME="CSDT Sistema"
VITE_APP_VERSION="1.0.0"
VITE_APP_ENV=production
```

#### Paso 4: Construir y Desplegar
```bash
# Construir para producción
npm run build

# Crear configuración de PM2
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'csdt-frontend',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/csdt/frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Paso 5: Configurar Nginx
```bash
# Crear configuración de Nginx
cat > /etc/nginx/sites-available/csdt-frontend << EOF
server {
    listen 80;
    server_name 104.248.212.204;
    root /var/www/csdt/frontend/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://104.248.212.204:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Configuración para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Habilitar sitio
ln -s /etc/nginx/sites-available/csdt-frontend /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default

# Verificar configuración
nginx -t

# Reiniciar Nginx
systemctl restart nginx
systemctl enable nginx
```

#### Paso 6: Configurar SSL (Opcional)
```bash
# Instalar Certbot
apt install certbot python3-certbot-nginx -y

# Obtener certificado SSL
certbot --nginx -d 104.248.212.204

# Verificar renovación automática
certbot renew --dry-run
```

### Instalación Backend

```bash
# Navegar al directorio del backend
cd ../backend-csdt

# Instalar dependencias
composer install

# Configurar variables de entorno
cp .env.example .env

# Editar .env con la configuración del backend
# Ver sección de Backend para configuración completa

# Ejecutar migraciones
php artisan migrate

# Ejecutar servidor
php artisan serve
```

**Nota:** Para la instalación completa del backend, consultar el README del backend en: `backend-csdt/README.md`

## 🔧 Configuración de la Base de Datos

### Tablas Principales
- `usuarios` - Usuarios del sistema
- `veedurias` - Veedurías ciudadanas
- `donaciones` - Donaciones recibidas
- `tareas` - Tareas del sistema
- `archivos` - Gestión de archivos
- `roles` - Roles de usuario
- `configuraciones` - Configuraciones del sistema
- `logs` - Logs del sistema

### Relaciones
- Usuarios → Veedurías (1:N)
- Usuarios → Donaciones (1:N)
- Usuarios → Tareas (1:N)
- Roles → Usuarios (N:N)

## 📚 API Endpoints

### Autenticación
- `POST /login` - Iniciar sesión
- `POST /registro` - Registro de usuarios
- `POST /logout` - Cerrar sesión
- `GET /usuario` - Información del usuario

### CRUD Principal
- `GET /usuarios` - Listar usuarios
- `POST /usuarios` - Crear usuario
- `GET /usuarios/{id}` - Obtener usuario
- `PUT /usuarios/{id}` - Actualizar usuario
- `DELETE /usuarios/{id}` - Eliminar usuario

### Endpoints Específicos
- `PUT /usuarios/{id}/estado` - Cambiar estado
- `POST /usuarios/{id}/rol` - Asignar rol
- `GET /veedurias` - Listar veedurías
- `POST /veedurias` - Crear veeduría
- `PUT /veedurias/{id}/estado` - Cambiar estado
- `POST /veedurias/{id}/asignar-operador` - Asignar operador

## 🎨 Componentes y Hooks

### Hooks Personalizados
- `useAsyncState` - Manejo de estados asíncronos
- `useForm` - Manejo de formularios con validación
- `useNotifications` - Sistema de notificaciones
- `usePagination` - Paginación de datos
- `useSearchAndFilter` - Búsqueda y filtrado
- `useModal` - Manejo de modales
- `useConfirmation` - Confirmaciones

### Componentes Reutilizables
- `LazyLoader` - Carga lazy de componentes
- `Modal` - Modal reutilizable
- `Pagination` - Componente de paginación
- `SearchAndFilter` - Búsqueda y filtros
- `ConfirmationModal` - Modal de confirmación
- `NotificationContainer` - Contenedor de notificaciones

## 🔐 Sistema de Autenticación

### Roles y Permisos
- **Cliente**: Acceso a sus propios datos
- **Operador**: Acceso a datos asignados + funciones de cliente
- **Administrador**: Acceso completo al sistema

### Middleware
- `auth:sanctum` - Verificación de token
- `role:admin` - Solo administradores
- `role:operator` - Operadores y administradores

## 📊 Características Técnicas

### Optimizaciones
- Lazy loading de componentes
- Paginación de datos
- Búsqueda y filtrado en tiempo real
- Caché de datos
- Manejo de errores robusto

### Validaciones
- Validación de formularios en frontend
- Validación de datos en backend
- Sanitización de inputs
- Manejo de errores de API

### UI/UX
- Diseño responsivo
- Componentes accesibles
- Notificaciones en tiempo real
- Estados de carga
- Confirmaciones de acciones

## 🚀 Despliegue

### Frontend (Producción)
```bash
npm run build
# Subir archivos de /dist al servidor web
```

### Backend (Producción)
```bash
composer install --optimize-autoloader --no-dev
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan migrate --force
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para la feature (`git checkout -b feature/AmazingFeature`)
3. Commit los cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🚀 Comandos de Despliegue Automático

### Script de Despliegue Completo
```bash
#!/bin/bash
# Script para desplegar automáticamente el frontend CSDT en DigitalOcean

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Iniciando despliegue del Frontend CSDT...${NC}"

# Actualizar sistema
echo -e "${YELLOW}📦 Actualizando sistema...${NC}"
apt update && apt upgrade -y

# Instalar Node.js 18
echo -e "${YELLOW}📦 Instalando Node.js 18...${NC}"
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Instalar Nginx
echo -e "${YELLOW}📦 Instalando Nginx...${NC}"
apt install nginx -y

# Instalar PM2
echo -e "${YELLOW}📦 Instalando PM2...${NC}"
npm install -g pm2

# Instalar Git
echo -e "${YELLOW}📦 Instalando Git...${NC}"
apt install git -y

# Crear directorio de la aplicación
echo -e "${YELLOW}📁 Creando directorio de la aplicación...${NC}"
mkdir -p /var/www/csdt
cd /var/www/csdt

# Clonar repositorio
echo -e "${YELLOW}📥 Clonando repositorio...${NC}"
git clone https://github.com/veeduriacsdc-ui/frontend-csdt.git frontend
cd frontend

# Instalar dependencias
echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
npm install

# Configurar variables de entorno
echo -e "${YELLOW}⚙️ Configurando variables de entorno...${NC}"
cat > .env << EOF
VITE_API_URL=http://104.248.212.204:8000/api
VITE_APP_NAME="CSDT Sistema"
VITE_APP_VERSION="1.0.0"
VITE_APP_ENV=production
EOF

# Construir para producción
echo -e "${YELLOW}🔨 Construyendo para producción...${NC}"
npm run build

# Configurar PM2
echo -e "${YELLOW}⚙️ Configurando PM2...${NC}"
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'csdt-frontend',
    script: 'npm',
    args: 'run preview',
    cwd: '/var/www/csdt/frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
EOF

# Iniciar con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# Configurar Nginx
echo -e "${YELLOW}⚙️ Configurando Nginx...${NC}"
cat > /etc/nginx/sites-available/csdt-frontend << EOF
server {
    listen 80;
    server_name 104.248.212.204;
    root /var/www/csdt/frontend/dist;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://104.248.212.204:8000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Habilitar sitio
ln -s /etc/nginx/sites-available/csdt-frontend /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Verificar configuración
nginx -t

# Reiniciar Nginx
systemctl restart nginx
systemctl enable nginx

# Configurar Firewall
echo -e "${YELLOW}🔒 Configurando Firewall...${NC}"
ufw allow ssh
ufw allow 80
ufw allow 443
ufw allow 3000
ufw --force enable

echo -e "${GREEN}✅ Despliegue del Frontend completado exitosamente!${NC}"
echo -e "${GREEN}🌐 Frontend disponible en: http://104.248.212.204${NC}"
echo -e "${GREEN}📧 Email: veeduriacsdc@gmail.com${NC}"
echo -e "${GREEN}🔑 Contraseña: Control-1234${NC}"
```

### Comandos de Mantenimiento
```bash
# Verificar estado de los servicios
systemctl status nginx
pm2 status

# Ver logs
pm2 logs csdt-frontend
tail -f /var/log/nginx/error.log

# Reiniciar servicios
systemctl restart nginx
pm2 restart csdt-frontend

# Actualizar código
cd /var/www/csdt/frontend
git pull origin main
npm install
npm run build
pm2 restart csdt-frontend
```

## 📞 Soporte

Para soporte técnico o preguntas, contactar a:
- Email: veeduriacsdc@gmail.com
- Servidor: 104.248.212.204
- Contraseña: Control-1234

## 🔄 Changelog

### v1.0.0 (2024-01-30)
- ✅ Sistema de roles jerárquico
- ✅ CRUD completo para todas las entidades
- ✅ Dashboard por rol
- ✅ Sistema de notificaciones
- ✅ Paginación y filtros
- ✅ Validaciones robustas
- ✅ Interfaz responsiva
- ✅ Optimizaciones de rendimiento