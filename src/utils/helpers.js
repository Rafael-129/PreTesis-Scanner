/**
 * Formatea una fecha a formato legible
 * @param {Date|string} fecha
 * @returns {string}
 */
export const formatearFecha = (fecha) => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

/**
 * Formatea una hora
 * @param {string|Date} hora
 * @returns {string}
 */
export const formatearHora = (hora) => {
  if (typeof hora === 'string' && hora.includes(':')) {
    return hora.substring(0, 5); // Devuelve HH:MM
  }
  const date = new Date(hora);
  return date.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Valida un DNI peruano (8 dígitos)
 * @param {string} dni
 * @returns {boolean}
 */
export const validarDNI = (dni) => {
  const regex = /^\d{8}$/;
  return regex.test(dni);
};

/**
 * Valida un teléfono
 * @param {string} telefono
 * @returns {boolean}
 */
export const validarTelefono = (telefono) => {
  const regex = /^(\+51)?[9]\d{8}$/;
  return regex.test(telefono.replace(/\s/g, ''));
};

/**
 * Valida un email
 * @param {string} email
 * @returns {boolean}
 */
export const validarEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Convierte una imagen de File a Base64
 * @param {File} file
 * @returns {Promise<string>}
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

/**
 * Calcula el tiempo restante hasta una fecha/hora
 * @param {Date|string} fechaHora
 * @returns {string}
 */
export const calcularTiempoRestante = (fechaHora) => {
  const ahora = new Date();
  const objetivo = new Date(fechaHora);
  const diferencia = objetivo - ahora;

  if (diferencia <= 0) {
    return 'Vencido';
  }

  const horas = Math.floor(diferencia / (1000 * 60 * 60));
  const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

  if (horas > 24) {
    const dias = Math.floor(horas / 24);
    return `${dias} día${dias > 1 ? 's' : ''}`;
  }

  return `${horas}h ${minutos}m`;
};

/**
 * Formatea un nombre completo
 * @param {string} nombre
 * @param {string} apellido
 * @returns {string}
 */
export const formatearNombreCompleto = (nombre, apellido) => {
  return `${nombre} ${apellido}`.trim();
};

/**
 * Obtiene las iniciales de un nombre
 * @param {string} nombreCompleto
 * @returns {string}
 */
export const obtenerIniciales = (nombreCompleto) => {
  return nombreCompleto
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

/**
 * Trunca un texto largo
 * @param {string} texto
 * @param {number} maxLength
 * @returns {string}
 */
export const truncarTexto = (texto, maxLength = 50) => {
  if (texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength) + '...';
};

/**
 * Obtiene un color basado en el estado
 * @param {string} estado
 * @returns {object}
 */
export const obtenerColorEstado = (estado) => {
  const colores = {
    'ACTIVO': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500' },
    'INACTIVO': { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500' },
    'EN ESPERA': { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500' },
    'VENCIDO': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500' },
    'EXITOSO': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500' },
    'DENEGADO': { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500' },
    'AUTORIZADO': { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500' },
  };

  return colores[estado] || { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500' };
};

/**
 * Genera un color aleatorio para avatares
 * @param {string} texto
 * @returns {string}
 */
export const generarColorAvatar = (texto) => {
  const colores = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
  ];
  
  const index = texto.charCodeAt(0) % colores.length;
  return colores[index];
};

/**
 * Descarga un archivo
 * @param {string} url
 * @param {string} nombre
 */
export const descargarArchivo = (url, nombre) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = nombre;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Copia texto al portapapeles
 * @param {string} texto
 * @returns {Promise<boolean>}
 */
export const copiarAlPortapapeles = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch (err) {
    console.error('Error al copiar:', err);
    return false;
  }
};

/**
 * Debounce para búsquedas
 * @param {Function} func
 * @param {number} delay
 * @returns {Function}
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
