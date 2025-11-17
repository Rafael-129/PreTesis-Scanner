// Types y interfaces para TypeScript (preparado para migración futura)

/**
 * @typedef {Object} Usuario
 * @property {number} idUsuario
 * @property {string} nombre
 * @property {string} apellido
 * @property {string} dni
 * @property {string} correo
 * @property {string} telefono
 * @property {string} departamento
 * @property {string} foto
 * @property {string} encoding_facial
 * @property {'ACTIVO' | 'INACTIVO'} estado
 * @property {Date} fecha_registro
 * @property {Date} created_at
 */

/**
 * @typedef {Object} Visitante
 * @property {number} idVisitante
 * @property {string} nombre
 * @property {string} apellido
 * @property {string} dni
 * @property {string} telefono
 * @property {string} motivo
 * @property {Date} fecha_visita
 * @property {string} hora_visita
 * @property {string} depart_visita
 * @property {number} residente_anfitrion
 * @property {string} foto
 * @property {string} encoding_facial
 * @property {'ACTIVO' | 'EN ESPERA' | 'VENCIDO' | 'FINALIZADO'} estado
 * @property {string} tiempo_restante
 * @property {Date} created_at
 */

/**
 * @typedef {Object} Scanner
 * @property {number} idScanner
 * @property {number} idUsuario
 * @property {number} idVisitante
 * @property {string} foto_capturada
 * @property {'residente' | 'visitante' | 'desconocido'} tipo_persona
 * @property {number} confianza_reconocimiento
 * @property {string} ubicacion
 * @property {Date} fecha
 */

/**
 * @typedef {Object} HistorialAccesos
 * @property {number} idHistorial
 * @property {number} idUsuario
 * @property {number} idVisitante
 * @property {number} idScanner
 * @property {'RESIDENTE' | 'VISITANTE' | 'NO IDENTIFICADO'} tipo_persona
 * @property {string} accion
 * @property {Date} fecha_entrada
 * @property {string} hora_entrada
 * @property {string} hora_salida
 * @property {string} ubicacion
 * @property {'EXITOSO' | 'DENEGADO'} estado
 * @property {Date} created_at
 */

export const ESTADOS_USUARIO = {
  ACTIVO: 'ACTIVO',
  INACTIVO: 'INACTIVO'
};

export const ESTADOS_VISITANTE = {
  ACTIVO: 'ACTIVO',
  EN_ESPERA: 'EN ESPERA',
  VENCIDO: 'VENCIDO',
  FINALIZADO: 'FINALIZADO'
};

export const TIPOS_PERSONA = {
  RESIDENTE: 'RESIDENTE',
  VISITANTE: 'VISITANTE',
  NO_IDENTIFICADO: 'NO IDENTIFICADO',
  DESCONOCIDO: 'desconocido'
};

export const ESTADOS_ACCESO = {
  EXITOSO: 'EXITOSO',
  DENEGADO: 'DENEGADO'
};
