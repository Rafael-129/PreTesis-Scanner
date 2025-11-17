# Estructura del Proyecto

## 📂 Arquitectura de Carpetas

```
scanner/
├── public/                      # Archivos públicos estáticos
├── src/
│   ├── assets/                 # Imágenes, iconos, etc.
│   ├── components/             # Componentes React
│   │   ├── ScannerTab.jsx            # Tab de escaneo facial
│   │   ├── RegistroVisitanteTab.jsx  # Formulario de registro
│   │   └── HistorialAccesosTab.jsx   # Historial de accesos
│   ├── context/                # Context API
│   │   └── AppContext.jsx            # Estado global de la app
│   ├── services/               # Servicios de API
│   │   └── api.js                    # Cliente HTTP para backend
│   ├── types/                  # Definiciones de tipos
│   │   └── index.js                  # Constantes y tipos
│   ├── utils/                  # Utilidades
│   │   └── helpers.js                # Funciones auxiliares
│   ├── App.jsx                 # Componente principal
│   ├── App.css                 # Estilos del componente App
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos globales con Tailwind
├── database/                   # Scripts de base de datos
│   └── schema.sql                    # Esquema completo de PostgreSQL
├── docs/                       # Documentación
│   └── BACKEND_INTEGRATION.md        # Guía de integración
├── .env.example                # Plantilla de variables de entorno
├── .gitignore                  # Archivos ignorados por Git
├── eslint.config.js            # Configuración de ESLint
├── index.html                  # HTML principal
├── package.json                # Dependencias del proyecto
├── postcss.config.js           # Configuración de PostCSS
├── README.md                   # Documentación principal
├── tailwind.config.js          # Configuración de Tailwind CSS
└── vite.config.js              # Configuración de Vite
```

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                         USUARIO                                  │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      COMPONENTES REACT                           │
│  ┌────────────────┐  ┌──────────────────┐  ┌─────────────────┐ │
│  │ ScannerTab     │  │ RegistroVisitante│  │ HistorialAccesos│ │
│  └────────────────┘  └──────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APP CONTEXT                                 │
│         (Estado Global - React Context API)                      │
│  • visitantes           • registrarVisitante()                   │
│  • historialAccesos     • cargarHistorialAccesos()               │
│  • estadisticas         • procesarEscaneo()                      │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API SERVICE                                 │
│         (Cliente HTTP - Fetch API)                               │
│  • POST /api/scanner                                             │
│  • POST /api/visitantes                                          │
│  • GET  /api/historial-accesos                                   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (A IMPLEMENTAR)                     │
│         (Node.js/Python + Express/FastAPI)                       │
│  • Controladores                                                 │
│  • Servicios de Reconocimiento Facial                            │
│  • Middleware de Autenticación                                   │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                   BASE DE DATOS POSTGRESQL                       │
│  • usuario             • Camaras                                 │
│  • visitante           • Incidentes                              │
│  • Scanner             • Notificaciones                          │
│  • HistorialAccesos    • Configuracion                           │
└─────────────────────────────────────────────────────────────────┘
```

## 🎨 Componentes Principales

### 1. App.jsx
**Responsabilidad**: Componente raíz, maneja la navegación por tabs

**Estado**:
- `activeTab`: Tab actualmente activa (scanner | registro | historial)

**Características**:
- Header con título del sistema
- Navegación por tabs
- Renderizado condicional de componentes

### 2. ScannerTab.jsx
**Responsabilidad**: Captura de video y escaneo facial

**Componentes hijos**:
- `ScannerFacial`: Captura de cámara web
- `ResultadoEscaneo`: Muestra resultado del escaneo

**Características**:
- Acceso a webcam del usuario
- Captura de foto para análisis
- Simulación de reconocimiento facial
- Visualización de resultados

### 3. RegistroVisitanteTab.jsx
**Responsabilidad**: Formulario de registro de visitantes

**Campos del formulario**:
- Nombre completo
- DNI/Identificación
- Teléfono
- Departamento a visitar
- Fecha y hora de visita
- Válido hasta
- Foto del visitante
- Notas adicionales

**Características**:
- Validación de campos
- Captura de foto mediante webcam
- Preview de foto capturada
- Integración con API para guardar datos

### 4. HistorialAccesosTab.jsx
**Responsabilidad**: Visualización del historial de accesos

**Componentes hijos**:
- `EstadisticaCard`: Tarjetas con métricas (total, autorizados, denegados)
- `AccesoItem`: Item individual del historial

**Características**:
- Búsqueda en tiempo real
- Filtrado de registros
- Estadísticas resumidas
- Scroll virtual para grandes listas

## 🔧 Servicios y Contextos

### AppContext.jsx
**Estado global**:
```javascript
{
  loading: boolean,
  error: string | null,
  visitantes: Array<Visitante>,
  historialAccesos: Array<HistorialAcceso>,
  estadisticas: {
    totalAccesos: number,
    autorizados: number,
    denegados: number
  }
}
```

**Métodos**:
- `cargarVisitantes(filtros)`
- `registrarVisitante(data)`
- `cargarHistorialAccesos(filtros)`
- `registrarAcceso(data)`
- `cargarEstadisticas(fechaDesde, fechaHasta)`
- `procesarEscaneo(data)`

### api.js
**Servicios HTTP**:
- `request(endpoint, options)` - Método genérico
- `procesarEscaneo(data)` - Escaneo facial
- `registrarVisitante(visitante)` - Crear visitante
- `obtenerHistorialAccesos(filtros)` - Listar historial
- `subirFoto(file, tipo)` - Upload de imágenes

## 📦 Dependencias Principales

### Producción
```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "react-webcam": "^7.x",
  "lucide-react": "^0.x",
  "date-fns": "^3.x",
  "tailwindcss": "^3.x"
}
```

### Desarrollo
```json
{
  "vite": "^7.2.2",
  "@vitejs/plugin-react": "^5.1.0",
  "eslint": "^9.x",
  "postcss": "^8.x",
  "autoprefixer": "^10.x"
}
```

## 🎯 Características de UI/UX

### Tema Oscuro
- Background principal: `#0f172a`
- Cards: `#1e293b`
- Borders: `#334155`
- Texto principal: `#e2e8f0`
- Acentos azules para acciones principales

### Componentes Reutilizables
- Inputs con iconos
- Botones con estados (hover, disabled)
- Cards con sombras y borders
- Badges de estado con colores semánticos

### Responsividad
- Mobile-first approach
- Breakpoints de Tailwind
- Grid adaptable en desktop

## 🔐 Seguridad (A Implementar en Backend)

1. **Autenticación JWT**
2. **Validación de datos**
3. **Rate limiting**
4. **Sanitización de inputs**
5. **HTTPS obligatorio**
6. **Encriptación de datos sensibles**

## 🚀 Próximos Pasos

1. **Implementar Backend**
   - Node.js + Express
   - PostgreSQL
   - Reconocimiento facial (Python microservice)

2. **Mejorar Frontend**
   - Paginación
   - Filtros avanzados
   - Notificaciones en tiempo real
   - Dashboard con gráficos

3. **Testing**
   - Unit tests con Vitest
   - Integration tests
   - E2E tests con Playwright

4. **Deployment**
   - Frontend: Vercel/Netlify
   - Backend: Railway/Render
   - DB: Supabase/Railway
