# Guía de Integración Backend

Esta guía explica cómo integrar un backend con este frontend.

## 🔧 Configuración Inicial

### 1. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 2. Estructura del Backend Recomendada

```
backend/
├── src/
│   ├── controllers/
│   │   ├── scanner.controller.js
│   │   ├── visitante.controller.js
│   │   ├── usuario.controller.js
│   │   └── historial.controller.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Visitante.js
│   │   ├── Scanner.js
│   │   └── HistorialAccesos.js
│   ├── routes/
│   │   ├── scanner.routes.js
│   │   ├── visitante.routes.js
│   │   ├── usuario.routes.js
│   │   └── historial.routes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── services/
│   │   └── faceRecognition.service.js
│   └── app.js
├── database/
│   └── schema.sql
└── package.json
```

## 📡 Endpoints Requeridos

### Scanner Facial

#### POST /api/scanner
Procesar un escaneo facial

**Request Body:**
```json
{
  "foto_capturada": "base64_string",
  "ubicacion": "Entrada Principal"
}
```

**Response:**
```json
{
  "idScanner": 123,
  "tipo_persona": "residente",
  "confianza_reconocimiento": 95.5,
  "autorizado": true,
  "usuario": {
    "idUsuario": 45,
    "nombre": "Juan",
    "apellido": "Pérez",
    "departamento": "A-101"
  }
}
```

#### GET /api/scanner
Obtener lista de escaneos

**Query Params:**
- `fecha_desde`: string (YYYY-MM-DD)
- `fecha_hasta`: string (YYYY-MM-DD)
- `tipo_persona`: string (residente|visitante|desconocido)

**Response:**
```json
{
  "data": [
    {
      "idScanner": 123,
      "tipo_persona": "residente",
      "confianza_reconocimiento": 95.5,
      "fecha": "2025-11-17T10:30:00Z"
    }
  ],
  "total": 150
}
```

### Visitantes

#### POST /api/visitantes
Registrar un nuevo visitante

**Request Body:**
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
  "foto": "base64_string"
}
```

**Response:**
```json
{
  "idVisitante": 456,
  "nombre": "Juan",
  "apellido": "Pérez",
  "estado": "EN ESPERA",
  "encoding_facial": "encoded_vector",
  "created_at": "2025-11-17T10:30:00Z"
}
```

#### GET /api/visitantes
Listar visitantes

**Query Params:**
- `fecha`: string (YYYY-MM-DD)
- `estado`: string (ACTIVO|EN ESPERA|VENCIDO|FINALIZADO)
- `departamento`: string

**Response:**
```json
{
  "data": [
    {
      "idVisitante": 456,
      "nombre": "Juan",
      "apellido": "Pérez",
      "dni": "12345678",
      "depart_visita": "A-101",
      "estado": "EN ESPERA",
      "fecha_visita": "2025-11-17",
      "hora_visita": "14:30"
    }
  ],
  "total": 25
}
```

#### GET /api/visitantes/:id
Obtener un visitante específico

**Response:**
```json
{
  "idVisitante": 456,
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "telefono": "+51 999 999 999",
  "depart_visita": "A-101",
  "residente_anfitrion": {
    "idUsuario": 45,
    "nombre": "María González"
  },
  "estado": "ACTIVO"
}
```

#### PUT /api/visitantes/:id
Actualizar visitante

#### DELETE /api/visitantes/:id
Eliminar visitante

### Usuarios (Residentes)

#### GET /api/usuarios
Listar residentes

**Query Params:**
- `departamento`: string
- `estado`: string (ACTIVO|INACTIVO)

#### GET /api/usuarios/:id
Obtener residente específico

#### GET /api/usuarios/buscar/:dni
Buscar residente por DNI

### Historial de Accesos

#### GET /api/historial-accesos
Listar accesos

**Query Params:**
- `fecha_desde`: string (YYYY-MM-DD)
- `fecha_hasta`: string (YYYY-MM-DD)
- `tipo_persona`: string
- `estado`: string (EXITOSO|DENEGADO)

**Response:**
```json
{
  "data": [
    {
      "idHistorial": 789,
      "tipo_persona": "RESIDENTE",
      "nombre": "María González",
      "departamento": "A-101",
      "accion": "Acceso Autorizado",
      "fecha_entrada": "2025-11-17",
      "hora_entrada": "08:30:00",
      "estado": "EXITOSO"
    }
  ],
  "total": 150
}
```

#### POST /api/historial-accesos
Registrar nuevo acceso

**Request Body:**
```json
{
  "idUsuario": 45,
  "idScanner": 123,
  "tipo_persona": "RESIDENTE",
  "accion": "Acceso Autorizado",
  "fecha_entrada": "2025-11-17",
  "hora_entrada": "08:30:00",
  "estado": "EXITOSO"
}
```

#### GET /api/historial-accesos/estadisticas
Obtener estadísticas

**Query Params:**
- `desde`: string (YYYY-MM-DD)
- `hasta`: string (YYYY-MM-DD)

**Response:**
```json
{
  "totalAccesos": 150,
  "autorizados": 145,
  "denegados": 5,
  "porTipo": {
    "residentes": 120,
    "visitantes": 25,
    "desconocidos": 5
  }
}
```

### Upload de Archivos

#### POST /api/upload/foto
Subir foto

**Request Body (FormData):**
- `foto`: File
- `tipo`: string (visitante|usuario|incidente)

**Response:**
```json
{
  "url": "https://storage.example.com/fotos/123456.jpg",
  "encoding_facial": "encoded_vector"
}
```

## 🔐 Autenticación

### Headers Requeridos

Para endpoints protegidos, incluir:

```
Authorization: Bearer <token>
```

### Login

#### POST /api/auth/login

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "usuario": {
    "idAdmin": 1,
    "username": "admin",
    "rol": "admin"
  }
}
```

## 🧪 Reconocimiento Facial

### Librerías Recomendadas (Python Backend)

```python
# requirements.txt
face-recognition==1.3.0
dlib==19.24.0
opencv-python==4.8.0
numpy==1.24.0
```

### Ejemplo de Procesamiento

```python
import face_recognition
import numpy as np

def procesar_escaneo(foto_base64):
    # Decodificar imagen
    imagen = decodificar_base64(foto_base64)
    
    # Obtener encoding facial
    encodings = face_recognition.face_encodings(imagen)
    
    if len(encodings) == 0:
        return {"error": "No se detectó ningún rostro"}
    
    encoding = encodings[0]
    
    # Comparar con base de datos
    resultado = comparar_con_bd(encoding)
    
    return resultado

def comparar_con_bd(encoding):
    # Buscar en usuarios y visitantes
    usuarios = obtener_usuarios_activos()
    
    for usuario in usuarios:
        distancia = face_recognition.face_distance(
            [np.array(usuario.encoding_facial)], 
            encoding
        )[0]
        
        if distancia < 0.6:  # Umbral de confianza
            confianza = (1 - distancia) * 100
            return {
                "identificado": True,
                "tipo_persona": "residente",
                "usuario": usuario,
                "confianza": round(confianza, 2)
            }
    
    return {
        "identificado": False,
        "tipo_persona": "desconocido"
    }
```

## 📊 Base de Datos

Ver archivo `database/schema.sql` para el esquema completo.

### Conexión PostgreSQL (Node.js)

```javascript
// database/connection.js
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = pool;
```

## 🚀 Ejemplo de Backend Mínimo (Express.js)

```javascript
// app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Rutas
app.use('/api/scanner', require('./routes/scanner.routes'));
app.use('/api/visitantes', require('./routes/visitante.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/historial-accesos', require('./routes/historial.routes'));

app.listen(3000, () => {
  console.log('Backend ejecutándose en puerto 3000');
});
```

## 📝 Notas Importantes

1. **CORS**: Asegúrate de configurar CORS correctamente
2. **Límite de Tamaño**: Las fotos en base64 pueden ser grandes, ajusta el límite
3. **Validación**: Valida todos los datos de entrada
4. **Seguridad**: Usa HTTPS en producción
5. **Rate Limiting**: Implementa límites de peticiones
6. **Logs**: Mantén logs de todas las operaciones importantes

## 🔄 Flujo de Trabajo Típico

### 1. Escaneo Facial
```
Frontend -> POST /api/scanner (foto) 
         -> Backend procesa reconocimiento
         -> Compara con BD
         -> Retorna resultado
         -> Frontend muestra resultado
         -> Backend registra en HistorialAccesos
```

### 2. Registro de Visitante
```
Frontend -> Usuario completa formulario
         -> Captura foto
         -> POST /api/visitantes
         -> Backend guarda datos
         -> Procesa encoding facial
         -> Notifica al residente anfitrión
         -> Retorna confirmación
```

### 3. Consulta de Historial
```
Frontend -> GET /api/historial-accesos?fecha=2025-11-17
         -> Backend consulta BD
         -> Filtra y pagina resultados
         -> Retorna datos formateados
         -> Frontend muestra en tabla
```
