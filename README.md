# Sistema de Control de Acceso - Reconocimiento Facial

Sistema web de control de acceso para condominios con reconocimiento facial, registro de visitantes y seguimiento de historial de accesos.

## 🚀 Características

- **Scanner Facial**: Reconocimiento facial en tiempo real para residentes y visitantes
- **Registro de Visitantes**: Formulario completo para registrar visitantes temporales
- **Historial de Accesos**: Visualización y búsqueda de todos los accesos registrados
- **Preparado para Base de Datos**: Estructura lista para integración con PostgreSQL

## 📋 Esquema de Base de Datos

El sistema está diseñado para trabajar con las siguientes tablas:

### Tablas Principales:
- **usuario**: Residentes permanentes del condominio
- **visitante**: Visitantes temporales
- **Scanner**: Registro de escaneos faciales
- **HistorialAccesos**: Historial completo de entradas/salidas
- **Camaras**: Gestión de cámaras de seguridad
- **Incidentes**: Registro de incidentes de seguridad
- **Notificaciones**: Sistema de notificaciones
- **Configuracion**: Configuración general del sistema
- **Reportes**: Historial de reportes generados
- **Respaldos**: Gestión de backups
- **UsuarioAdmin**: Administradores del sistema
- **SesionesAdmin**: Control de sesiones
- **EventosSistema**: Log de eventos para auditoría

## 🛠️ Tecnologías

- **Frontend**: React 19 + Vite
- **Estilos**: Tailwind CSS
- **Iconos**: Lucide React
- **Webcam**: react-webcam
- **Fechas**: date-fns
- **Estado Global**: React Context API

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Configuración

Edita el archivo `.env` con tu configuración:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── ScannerTab.jsx
│   ├── RegistroVisitanteTab.jsx
│   └── HistorialAccesosTab.jsx
├── context/             # Context API para estado global
│   └── AppContext.jsx
├── services/            # Servicios para API
│   └── api.js
├── types/              # Definiciones de tipos
│   └── index.js
├── App.jsx             # Componente principal
└── main.jsx           # Punto de entrada
```

## 🔌 Integración con Backend

### Estructura de API Esperada:

```
POST   /api/scanner                    - Procesar escaneo facial
GET    /api/scanner                    - Obtener escaneos

POST   /api/visitantes                 - Registrar visitante
GET    /api/visitantes                 - Listar visitantes
GET    /api/visitantes/:id             - Obtener visitante
PUT    /api/visitantes/:id             - Actualizar visitante
DELETE /api/visitantes/:id             - Eliminar visitante

GET    /api/usuarios                   - Listar residentes
GET    /api/usuarios/:id               - Obtener residente
GET    /api/usuarios/buscar/:dni       - Buscar por DNI

GET    /api/historial-accesos          - Listar accesos
POST   /api/historial-accesos          - Registrar acceso
GET    /api/historial-accesos/estadisticas - Obtener estadísticas

POST   /api/upload/foto                - Subir foto
```

### Ejemplo de Payload - Registrar Visitante:

```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "telefono": "+51 999 999 999",
  "fecha_visita": "2025-11-17",
  "hora_visita": "14:30",
  "depart_visita": "A-101",
  "motivo": "Visita social",
  "foto": "data:image/jpeg;base64,..."
}
```

## 📱 Características Futuras

- [ ] Autenticación de administradores
- [ ] Notificaciones en tiempo real
- [ ] Reportes PDF/Excel
- [ ] Dashboard con métricas
- [ ] Integración con cámaras IP
- [ ] Detección de rostros múltiples
- [ ] Sistema de alertas automáticas
- [ ] Gestión de residentes
- [ ] Aplicación móvil

## 🤝 Contribución

Este es un proyecto de pre-tesis. Para sugerencias o mejoras, contacta al desarrollador.

## 📄 Licencia

Proyecto académico - Tecsup 2025

## 👨‍💻 Autor

Desarrollado como parte del proyecto de pre-tesis en Tecsup.

---

**Nota**: Este frontend está preparado para integrarse con un backend. Actualmente usa datos de ejemplo para demostración.

