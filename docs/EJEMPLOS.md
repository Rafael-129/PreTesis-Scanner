# Ejemplos de Uso

Esta guía muestra ejemplos prácticos de cómo usar los diferentes componentes y servicios del sistema.

## 📱 Uso de Componentes

### 1. Scanner Facial

```jsx
import ScannerTab from './components/ScannerTab';

function MiComponente() {
  return <ScannerTab />;
}
```

El componente `ScannerTab` maneja automáticamente:
- Activación de cámara
- Captura de foto
- Procesamiento de escaneo (simulado)
- Visualización de resultados

### 2. Registro de Visitante

```jsx
import RegistroVisitanteTab from './components/RegistroVisitanteTab';

function MiComponente() {
  return <RegistroVisitanteTab />;
}
```

Incluye validaciones automáticas para:
- DNI (8 dígitos)
- Teléfono (formato peruano)
- Fechas y horas
- Campos obligatorios

### 3. Historial de Accesos

```jsx
import HistorialAccesosTab from './components/HistorialAccesosTab';

function MiComponente() {
  return <HistorialAccesosTab />;
}
```

Características:
- Búsqueda en tiempo real
- Estadísticas automáticas
- Scroll virtual para listas grandes

## 🔧 Uso del Context API

### Acceder al Estado Global

```jsx
import { useApp } from './context/AppContext';

function MiComponente() {
  const {
    visitantes,
    historialAccesos,
    loading,
    error,
    registrarVisitante,
    cargarHistorialAccesos
  } = useApp();

  // Usar los datos y métodos...
}
```

### Registrar un Visitante

```jsx
const { registrarVisitante } = useApp();

const handleRegistro = async () => {
  try {
    const nuevoVisitante = await registrarVisitante({
      nombre: 'Juan',
      apellido: 'Pérez',
      dni: '12345678',
      telefono: '+51 999 999 999',
      fecha_visita: '2025-11-17',
      hora_visita: '14:30',
      depart_visita: 'A-101',
      motivo: 'Visita social',
      foto: fotoBase64
    });
    
    console.log('Visitante registrado:', nuevoVisitante);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Cargar Historial con Filtros

```jsx
const { cargarHistorialAccesos } = useApp();

const cargarHistorial = async () => {
  const filtros = {
    fecha_desde: '2025-11-01',
    fecha_hasta: '2025-11-17',
    tipo_persona: 'RESIDENTE',
    estado: 'EXITOSO'
  };
  
  const accesos = await cargarHistorialAccesos(filtros);
  console.log('Accesos:', accesos);
};
```

## 🌐 Uso del Servicio de API

### Importar el Servicio

```jsx
import ApiService from './services/api';
```

### Procesar Escaneo Facial

```jsx
const procesarEscaneo = async (fotoBase64) => {
  try {
    const resultado = await ApiService.procesarEscaneo({
      foto_capturada: fotoBase64,
      ubicacion: 'Entrada Principal'
    });
    
    console.log('Resultado:', resultado);
    // { idScanner, tipo_persona, confianza_reconocimiento, ... }
  } catch (error) {
    console.error('Error en escaneo:', error);
  }
};
```

### Buscar Usuario por DNI

```jsx
const buscarUsuario = async (dni) => {
  try {
    const usuario = await ApiService.buscarUsuarioPorDNI(dni);
    console.log('Usuario encontrado:', usuario);
  } catch (error) {
    console.error('Usuario no encontrado:', error);
  }
};
```

### Obtener Estadísticas

```jsx
const obtenerEstadisticas = async () => {
  try {
    const stats = await ApiService.obtenerEstadisticas(
      '2025-11-01',
      '2025-11-17'
    );
    
    console.log('Estadísticas:', stats);
    // { totalAccesos, autorizados, denegados, porTipo }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

### Subir Foto

```jsx
const subirFoto = async (file) => {
  try {
    const resultado = await ApiService.subirFoto(file, 'visitante');
    console.log('Foto subida:', resultado);
    // { url, encoding_facial }
  } catch (error) {
    console.error('Error al subir foto:', error);
  }
};
```

## 🛠️ Uso de Utilidades

### Importar Helpers

```jsx
import {
  formatearFecha,
  formatearHora,
  validarDNI,
  validarTelefono,
  calcularTiempoRestante,
  obtenerColorEstado
} from './utils/helpers';
```

### Validar DNI

```jsx
const dni = '12345678';
const esValido = validarDNI(dni);
console.log('DNI válido:', esValido); // true
```

### Formatear Fechas

```jsx
const fecha = new Date();
const fechaFormateada = formatearFecha(fecha);
console.log(fechaFormateada); // "17/11/2025"

const hora = '14:30:00';
const horaFormateada = formatearHora(hora);
console.log(horaFormateada); // "14:30"
```

### Calcular Tiempo Restante

```jsx
const fechaExpiracion = new Date('2025-11-17T23:59:00');
const tiempoRestante = calcularTiempoRestante(fechaExpiracion);
console.log(tiempoRestante); // "8h 30m"
```

### Obtener Color por Estado

```jsx
const colores = obtenerColorEstado('AUTORIZADO');
console.log(colores);
// {
//   bg: 'bg-green-500/20',
//   text: 'text-green-400',
//   border: 'border-green-500'
// }
```

### Convertir File a Base64

```jsx
import { fileToBase64 } from './utils/helpers';

const handleFileChange = async (event) => {
  const file = event.target.files[0];
  const base64 = await fileToBase64(file);
  console.log('Imagen en base64:', base64);
};
```

### Debounce para Búsquedas

```jsx
import { debounce } from './utils/helpers';

const buscarVisitantes = debounce((termino) => {
  // Lógica de búsqueda
  console.log('Buscando:', termino);
}, 300);

// Uso en input
<input onChange={(e) => buscarVisitantes(e.target.value)} />
```

## 🎨 Uso de Estilos con Tailwind

### Tarjeta con Tema Oscuro

```jsx
<div className="bg-dark-card border border-dark-border rounded-lg p-6">
  <h3 className="text-white font-semibold mb-4">Título</h3>
  <p className="text-gray-400">Contenido...</p>
</div>
```

### Badge de Estado

```jsx
const estado = 'AUTORIZADO';
const colores = obtenerColorEstado(estado);

<span className={`px-3 py-1 rounded-full text-sm font-medium ${colores.bg} ${colores.text}`}>
  {estado}
</span>
```

### Input con Icono

```jsx
import { User } from 'lucide-react';

<div className="relative">
  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
  <input
    type="text"
    placeholder="Nombre"
    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
  />
</div>
```

### Botón Primario

```jsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
  Registrar
</button>
```

### Botón Secundario

```jsx
<button className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
  Cancelar
</button>
```

## 📸 Uso de Webcam

### Básico

```jsx
import Webcam from 'react-webcam';
import { useRef } from 'react';

function MiComponente() {
  const webcamRef = useRef(null);

  const capturarFoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log('Foto capturada:', imageSrc);
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 1280,
          height: 720,
          facingMode: "user"
        }}
      />
      <button onClick={capturarFoto}>Capturar</button>
    </>
  );
}
```

## 🔄 Manejo de Estados de Carga

```jsx
function MiComponente() {
  const { loading, error } = useApp();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 text-red-400">
        Error: {error}
      </div>
    );
  }

  return <div>Contenido...</div>;
}
```

## 🔔 Mostrar Notificaciones

```jsx
import { useState, useEffect } from 'react';

function MiComponente() {
  const [notificacion, setNotificacion] = useState(null);

  const mostrarNotificacion = (mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

  return (
    <>
      {notificacion && (
        <div className={`fixed top-4 right-4 px-6 py-4 rounded-lg shadow-lg ${
          notificacion.tipo === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          {notificacion.mensaje}
        </div>
      )}
      
      <button onClick={() => mostrarNotificacion('¡Éxito!')}>
        Mostrar Notificación
      </button>
    </>
  );
}
```

## 🎯 Ejemplo Completo: Flujo de Registro

```jsx
import { useState } from 'react';
import { useApp } from './context/AppContext';
import { validarDNI, fileToBase64 } from './utils/helpers';
import Webcam from 'react-webcam';

function RegistroCompleto() {
  const { registrarVisitante, loading } = useApp();
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    foto: null
  });
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!formData.nombre) {
      nuevosErrores.nombre = 'El nombre es requerido';
    }
    
    if (!validarDNI(formData.dni)) {
      nuevosErrores.dni = 'DNI inválido';
    }
    
    if (!formData.foto) {
      nuevosErrores.foto = 'La foto es requerida';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) return;
    
    try {
      await registrarVisitante(formData);
      alert('¡Visitante registrado exitosamente!');
      // Limpiar formulario...
    } catch (error) {
      alert('Error al registrar: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.nombre}
        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        className={errores.nombre ? 'border-red-500' : ''}
      />
      {errores.nombre && <span className="text-red-500">{errores.nombre}</span>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrar'}
      </button>
    </form>
  );
}
```
