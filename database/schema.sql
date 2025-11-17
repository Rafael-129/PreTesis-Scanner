-- ============================================
-- SCHEMA DE BASE DE DATOS
-- Sistema de Control de Acceso - Condominios
-- ============================================

-- Tabla: usuario (Residentes permanentes)
CREATE TABLE usuario (
  idUsuario SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni CHAR(8) UNIQUE NOT NULL,
  correo VARCHAR(150),
  telefono VARCHAR(20),
  departamento VARCHAR(20) NOT NULL,
  foto TEXT,
  encoding_facial TEXT, -- Vector de características faciales
  estado VARCHAR(20) DEFAULT 'ACTIVO' CHECK (estado IN ('ACTIVO', 'INACTIVO')),
  fecha_registro DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: visitante (Visitantes temporales)
CREATE TABLE visitante (
  idVisitante SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni CHAR(8) NOT NULL,
  telefono VARCHAR(20),
  motivo VARCHAR(255),
  fecha_visita DATE NOT NULL,
  hora_visita TIME NOT NULL,
  depart_visita VARCHAR(20) NOT NULL,
  residente_anfitrion INT REFERENCES usuario(idUsuario),
  foto TEXT,
  encoding_facial TEXT,
  estado VARCHAR(20) DEFAULT 'EN ESPERA' CHECK (estado IN ('ACTIVO', 'EN ESPERA', 'VENCIDO', 'FINALIZADO')),
  tiempo_restante INTERVAL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: Scanner (Registro de escaneos faciales)
CREATE TABLE Scanner (
  idScanner SERIAL PRIMARY KEY,
  idUsuario INT REFERENCES usuario(idUsuario),
  idVisitante INT REFERENCES visitante(idVisitante),
  foto_capturada TEXT,
  tipo_persona VARCHAR(20) CHECK (tipo_persona IN ('residente', 'visitante', 'desconocido')),
  confianza_reconocimiento DECIMAL(5,2), -- Porcentaje 0-100
  ubicacion VARCHAR(100) DEFAULT 'Entrada Principal',
  fecha TIMESTAMP DEFAULT NOW()
);

-- Tabla: HistorialAccesos (Historial completo de accesos)
CREATE TABLE HistorialAccesos (
  idHistorial SERIAL PRIMARY KEY,
  idUsuario INT REFERENCES usuario(idUsuario),
  idVisitante INT REFERENCES visitante(idVisitante),
  idScanner INT REFERENCES Scanner(idScanner),
  tipo_persona VARCHAR(20) CHECK (tipo_persona IN ('RESIDENTE', 'VISITANTE', 'NO IDENTIFICADO')),
  accion VARCHAR(50), -- Acceso Exitoso, Autorizado, Denegado, Salida Registrada
  fecha_entrada DATE NOT NULL,
  hora_entrada TIME NOT NULL,
  hora_salida TIME,
  ubicacion VARCHAR(100) DEFAULT 'Entrada Principal',
  estado VARCHAR(20) NOT NULL CHECK (estado IN ('EXITOSO', 'DENEGADO')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: Camaras (Sistema de vigilancia)
CREATE TABLE Camaras (
  idCamara SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  ubicacion VARCHAR(100) NOT NULL,
  resolucion VARCHAR(20) DEFAULT '1920x1080',
  fps INT DEFAULT 60,
  estado VARCHAR(20) DEFAULT 'OFFLINE' CHECK (estado IN ('ONLINE', 'OFFLINE')),
  url_stream TEXT,
  ultima_conexion TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: Incidentes (Registro de incidentes de seguridad)
CREATE TABLE Incidentes (
  idIncidente SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  descripcion TEXT,
  gravedad VARCHAR(20) DEFAULT 'MEDIA' CHECK (gravedad IN ('BAJA', 'MEDIA', 'ALTA', 'CRÍTICA')),
  idScanner INT REFERENCES Scanner(idScanner),
  idCamara INT REFERENCES Camaras(idCamara),
  foto_evidencia TEXT,
  fecha TIMESTAMP DEFAULT NOW(),
  resuelto BOOLEAN DEFAULT FALSE,
  observaciones TEXT
);

-- Tabla: Notificaciones
CREATE TABLE Notificaciones (
  idNotificacion SERIAL PRIMARY KEY,
  idUsuario INT REFERENCES usuario(idUsuario),
  tipo VARCHAR(50), -- Acceso, Visitante, Incidente, Sistema, Mantenimiento
  titulo VARCHAR(200) NOT NULL,
  mensaje TEXT NOT NULL,
  leida BOOLEAN DEFAULT FALSE,
  fecha TIMESTAMP DEFAULT NOW()
);

-- Tabla: Configuracion (Configuración del sistema)
CREATE TABLE Configuracion (
  idConfig SERIAL PRIMARY KEY,
  parametro VARCHAR(100) UNIQUE NOT NULL,
  valor TEXT NOT NULL,
  descripcion TEXT,
  tipo VARCHAR(20) DEFAULT 'sistema' CHECK (tipo IN ('sistema', 'seguridad', 'camaras', 'notificaciones')),
  ultima_modificacion TIMESTAMP DEFAULT NOW()
);

-- Tabla: Reportes
CREATE TABLE Reportes (
  idReporte SERIAL PRIMARY KEY,
  titulo VARCHAR(200) NOT NULL,
  tipo VARCHAR(50), -- Diario, Semanal, Mensual, Seguridad, etc.
  fecha_desde DATE,
  fecha_hasta DATE,
  formato VARCHAR(20) DEFAULT 'PDF',
  ruta_archivo TEXT,
  tamanio_mb DECIMAL(10,2),
  estado VARCHAR(20) DEFAULT 'COMPLETADO' CHECK (estado IN ('COMPLETADO', 'EN PROCESO', 'ERROR')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: Respaldos (Gestión de backups)
CREATE TABLE Respaldos (
  idRespaldo SERIAL PRIMARY KEY,
  tipo VARCHAR(50) DEFAULT 'Automático',
  tamanio_mb DECIMAL(10,2),
  ruta_archivo TEXT,
  descripcion TEXT,
  estado VARCHAR(20) DEFAULT 'COMPLETADO' CHECK (estado IN ('COMPLETADO', 'EN PROCESO', 'ERROR')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: UsuarioAdmin (Administradores del sistema)
CREATE TABLE UsuarioAdmin (
  idAdmin SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre_completo VARCHAR(200) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  rol VARCHAR(20) DEFAULT 'seguridad' CHECK (rol IN ('admin', 'seguridad', 'supervisor')),
  foto_perfil TEXT,
  idioma VARCHAR(10) DEFAULT 'Español',
  tema VARCHAR(20) DEFAULT 'Claro',
  autenticacion_2fa BOOLEAN DEFAULT FALSE,
  tiempo_sesion_horas INT DEFAULT 8,
  ultimo_acceso TIMESTAMP,
  activo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabla: SesionesAdmin (Sesiones activas)
CREATE TABLE SesionesAdmin (
  idSesion SERIAL PRIMARY KEY,
  idAdmin INT NOT NULL REFERENCES UsuarioAdmin(idAdmin),
  token VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  fecha_inicio TIMESTAMP DEFAULT NOW(),
  fecha_expiracion TIMESTAMP,
  activa BOOLEAN DEFAULT TRUE
);

-- Tabla: EventosSistema (Log de auditoría)
CREATE TABLE EventosSistema (
  idEvento SERIAL PRIMARY KEY,
  tipo VARCHAR(50) NOT NULL,
  descripcion TEXT,
  idAdmin INT REFERENCES UsuarioAdmin(idAdmin),
  ip_address VARCHAR(45),
  nivel VARCHAR(20) DEFAULT 'INFO' CHECK (nivel IN ('INFO', 'WARNING', 'ERROR', 'CRITICAL')),
  fecha TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ÍNDICES PARA OPTIMIZACIÓN
-- ============================================

-- Índices para búsquedas frecuentes
CREATE INDEX idx_usuario_dni ON usuario(dni);
CREATE INDEX idx_usuario_departamento ON usuario(departamento);
CREATE INDEX idx_visitante_dni ON visitante(dni);
CREATE INDEX idx_visitante_fecha ON visitante(fecha_visita);
CREATE INDEX idx_historial_fecha ON HistorialAccesos(fecha_entrada);
CREATE INDEX idx_historial_tipo ON HistorialAccesos(tipo_persona);
CREATE INDEX idx_scanner_fecha ON Scanner(fecha);
CREATE INDEX idx_sesiones_token ON SesionesAdmin(token);

-- ============================================
-- DATOS DE EJEMPLO (OPCIONAL)
-- ============================================

-- Insertar configuraciones por defecto
INSERT INTO Configuracion (parametro, valor, descripcion, tipo) VALUES
  ('umbral_reconocimiento', '0.6', 'Umbral mínimo de confianza para reconocimiento facial', 'seguridad'),
  ('tiempo_sesion_max', '8', 'Horas máximas de sesión activa', 'sistema'),
  ('notificaciones_activas', 'true', 'Activar notificaciones del sistema', 'notificaciones');

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (debe ser hasheada en producción)
INSERT INTO UsuarioAdmin (username, password_hash, nombre_completo, email, rol) VALUES
  ('admin', '$2b$10$ejemplo...', 'Administrador Principal', 'admin@condominio.com', 'admin');

-- Insertar cámara de ejemplo
INSERT INTO Camaras (nombre, ubicacion, resolucion, fps) VALUES
  ('Cámara Principal', 'Entrada Principal', '1920x1080', 30);
