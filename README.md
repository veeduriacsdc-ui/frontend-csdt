# 🏛️ CSDT - Consejo Social de Veeduría y Desarrollo Territorial

## 📋 Descripción
Plataforma tecnológica integral para el control social, transparencia y trazabilidad en la gestión territorial, minería y actos administrativos en Colombia.

## 🚀 Características Principales

### **🎮 Sistema Gamificado**
- **Colores Metálicos**: Oro, plata, bronce, diamante, neón
- **Gradientes Animados**: Rainbow, ocean, sunset, forest, fire, ice, cosmic, aurora
- **Efectos Visuales**: Neón, cristal, partículas, sombras coloreadas
- **Animaciones Suaves**: Transiciones elásticas y efectos hover

### **🔧 Tecnologías Utilizadas**
- **React 19** - Framework principal
- **Vite 7** - Herramienta de construcción
- **Tailwind CSS 4** - Framework de estilos
- **Framer Motion** - Animaciones avanzadas
- **Heroicons** - Iconografía moderna
- **React Router DOM** - Enrutamiento
- **JWT Decode** - Autenticación

### **📱 Responsive Design**
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1920px
- **Ultra-wide**: 1920px+

## 🛠️ Instalación y Configuración

### **Prerrequisitos**
- Node.js 18+ 
- npm 9+

### **Instalación**
```bash
# Clonar el repositorio
git clone https://github.com/csdt/frontend-csdt-final.git

# Navegar al directorio
cd frontend-csdt-final

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### **Scripts Disponibles**
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construcción para producción
npm run preview  # Vista previa de producción
npm run lint     # Linter de código
npm run clean    # Limpiar archivos temporales
```

## 🎨 Sistema de Estilos

### **Archivos CSS**
- `src/index.css` - Estilos globales y configuración de Tailwind CSS

### **Componentes UI**
- `MenuPrincipal` - Menú de navegación principal
- `Footer` - Pie de página del sistema
- `AuthContext` - Contexto de autenticación
- `Loading` - Componente de carga
- `Alert` - Sistema de alertas
- `Modal` - Sistema de modales
- `Button` - Botones personalizados
- `Card` - Tarjetas de contenido

## 📁 Estructura del Proyecto

```
frontend-csdt-final/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── compartidas/
│   │   │   └── MenuPrincipal.jsx
│   │   └── Footer.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── paginas/
│   │   ├── publicas/
│   │   │   ├── acciones-constitucionales/
│   │   │   │   ├── AccionTutela.jsx
│   │   │   │   ├── AccionCumplimiento.jsx
│   │   │   │   ├── AccionPopular.jsx
│   │   │   │   ├── AccionGrupo.jsx
│   │   │   │   ├── DemandaJuridica.jsx
│   │   │   │   ├── AccionNulidad.jsx
│   │   │   │   └── AccionReparacionDirecta.jsx
│   │   │   ├── participacion-ciudadana/
│   │   │   │   ├── ConsultaPopular.jsx
│   │   │   │   ├── Referendo.jsx
│   │   │   │   ├── Plebiscito.jsx
│   │   │   │   └── Manifiesto.jsx
│   │   │   ├── control-social/
│   │   │   │   └── PQRSFD.jsx
│   │   │   ├── territoriales/
│   │   │   │   └── ConsejoVeeduriaTerritorial.jsx
│   │   │   ├── innovadores/
│   │   │   │   ├── GeoDashboard.jsx
│   │   │   │   ├── AuditoriaForense.jsx
│   │   │   │   └── Monitor.jsx
│   │   │   ├── etnicos/
│   │   │   │   └── PlanesEtnodesarrollo.jsx
│   │   │   ├── compartidas/
│   │   │   │   ├── Noticias.jsx
│   │   │   │   ├── Documentos.jsx
│   │   │   │   ├── Contacto.jsx
│   │   │   │   ├── Ayuda.jsx
│   │   │   │   └── Terminos.jsx
│   │   │   ├── Inicio.jsx
│   │   │   ├── Proyectos.jsx
│   │   │   ├── Donaciones.jsx
│   │   │   ├── Institucional.jsx
│   │   │   └── ConsejoIA.jsx
│   │   ├── cliente/
│   │   │   └── Dashboard.jsx
│   │   ├── operador/
│   │   │   └── Dashboard.jsx
│   │   └── administrador/
│   │       ├── Dashboard.jsx
│   │       ├── AdminDonaciones.jsx
│   │       ├── AdminRegistros.jsx
│   │       └── PanelActividades.jsx
│   ├── test/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── integration/
│   │   ├── services/
│   │   ├── setup.js
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🎯 Funcionalidades

### **Páginas Principales**
1. **Inicio** - Página principal del sistema
2. **Proyectos** - Lista de proyectos con filtros
3. **Donaciones** - Formulario de donaciones
4. **Institucional** - Información institucional
5. **ConsejoIA** - Sistema de IA forense

### **Acciones Constitucionales y Jurídicas**
1. **Acción de Tutela** - Formulario con análisis de IA
2. **Acción de Cumplimiento** - Formulario con análisis de IA
3. **Acción Popular** - Formulario con análisis de IA
4. **Acción de Grupo** - Formulario con análisis de IA
5. **Demanda Jurídica** - Formulario con análisis de IA
6. **Acción de Nulidad** - Formulario con análisis de IA
7. **Acción de Reparación Directa** - Formulario con análisis de IA

### **Mecanismos de Participación Ciudadana**
1. **Consulta Popular** - Formulario con análisis de IA
2. **Referendo** - Formulario con análisis de IA
3. **Plebiscito** - Formulario con análisis de IA
4. **Manifiesto** - Formulario con análisis de IA

### **Instrumentos de Control Social**
1. **PQRSFD** - Sistema de PQRSFD ciudadano con análisis de IA

### **Mecanismos Territoriales Especializados**
1. **Consejo de Veeduría Territorial** - Sistema especializado

### **Mecanismos Innovadores y de Veeduría Territorial**
1. **Geo Dashboard** - Dashboard geográfico
2. **Auditoría Forense** - Sistema de auditoría
3. **Monitor** - Sistema de monitoreo

### **Mecanismos Étnicos y Diferenciales**
1. **Planes de Etnodesarrollo** - Sistema especializado

### **Páginas Compartidas**
1. **Noticias** - Sistema de noticias
2. **Documentos** - Gestión de documentos
3. **Contacto** - Formulario de contacto
4. **Ayuda** - Sistema de ayuda
5. **Términos** - Términos y condiciones

### **Dashboards por Rol**
1. **Dashboard Cliente** - Panel para clientes
2. **Dashboard Operador** - Panel para operadores
3. **Dashboard Administrador** - Panel para administradores

### **Sistema de Autenticación**
- **JWT** - Tokens seguros
- **Roles** - Cliente, Operador, Administrador
- **Permisos** - Control de acceso granular
- **Context** - Estado global de autenticación

### **Efectos Visuales**
- **Partículas Interactivas** - Fondo animado
- **Efectos de Neón** - Resplandor y animaciones
- **Cristal Esmerilado** - Efectos de vidrio
- **Gradientes Animados** - Colores dinámicos
- **Sombras Coloreadas** - Efectos de profundidad

## 🔧 Configuración

### **Variables de Entorno**
```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=CSDT
VITE_APP_VERSION=1.0.0
```

### **Configuración de Vite**
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### **Configuración de Tailwind**
```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'orbitron': ['Orbitron', 'monospace'],
      },
      colors: {
        primary: { /* ... */ },
        secondary: { /* ... */ },
        gold: { /* ... */ },
        silver: { /* ... */ },
        diamond: { /* ... */ },
      }
    }
  }
}
```

## 🚀 Despliegue

### **Despliegue en Producción**
```bash
# Construir para producción
npm run build

# Vista previa
npm run preview

# Desplegar en servidor
# Subir carpeta 'dist' al servidor web
```

### **Variables de Producción**
```env
VITE_API_URL=https://api.csdt.gov.co
VITE_APP_NAME=CSDT
VITE_APP_VERSION=1.0.0
```

## 🧪 Testing

### **Ejecutar Tests**
```bash
npm run test
npm run test:coverage
npm run test:watch
```

### **Linting**
```bash
npm run lint
npm run lint:fix
```

## 📊 Performance

### **Métricas**
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### **Optimizaciones**
- **Code Splitting** - Carga lazy de componentes
- **Tree Shaking** - Eliminación de código no usado
- **Minificación** - Compresión de archivos
- **Gzip** - Compresión de servidor

## 🔒 Seguridad

### **Medidas Implementadas**
- **JWT** - Autenticación segura
- **HTTPS** - Encriptación en tránsito
- **CSP** - Política de seguridad de contenido
- **XSS Protection** - Protección contra ataques XSS
- **CSRF Protection** - Protección contra CSRF

## 🤝 Contribución

### **Cómo Contribuir**
1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

### **Estándares de Código**
- **ESLint** - Linting automático
- **Prettier** - Formateo de código
- **Conventional Commits** - Mensajes de commit estandarizados
- **TypeScript** - Tipado estático (opcional)

## 📝 Changelog

### **v1.0.0** (2024-01-10)
- ✨ Sistema gamificado completo
- 🎨 Efectos visuales avanzados
- 🔐 Sistema de autenticación JWT
- 📱 Diseño responsive
- 🚀 Optimizaciones de performance

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Desarrollador Principal** - Rafael Esteban Tapia
- **Diseñador UI/UX** - Equipo CSDT
- **Arquitecto Frontend** - Equipo CSDT

## 📞 Contacto

- **Email**: info@csdt.gov.co
- **Website**: https://csdt.gov.co
- **GitHub**: https://github.com/csdt/frontend-csdt-final

## 🙏 Agradecimientos

- **React Team** - Por el framework
- **Vite Team** - Por la herramienta de construcción
- **Tailwind CSS Team** - Por el framework de estilos
- **Framer Motion Team** - Por las animaciones
- **Heroicons Team** - Por los iconos

---

**Desarrollado con ❤️ para el Consejo Social de Veeduría y Desarrollo Territorial** 🏛️✨