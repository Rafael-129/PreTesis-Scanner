// API Service - Preparado para integración con backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiService {
  /**
   * Realiza una petición HTTP genérica
   */
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Error en la petición');
      }

      return await response.json();
    } catch (error) {
      console.error('Error en petición API:', error);
      throw error;
    }
  }

  // ============ SCANNER ============
  async procesarEscaneo(data) {
    return this.request('/scanner', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async obtenerEscaneos(filtros = {}) {
    const params = new URLSearchParams(filtros);
    return this.request(`/scanner?${params}`);
  }

  // ============ VISITANTES ============
  async registrarVisitante(visitante) {
    return this.request('/visitantes', {
      method: 'POST',
      body: JSON.stringify(visitante),
    });
  }

  async obtenerVisitantes(filtros = {}) {
    const params = new URLSearchParams(filtros);
    return this.request(`/visitantes?${params}`);
  }

  async obtenerVisitante(id) {
    return this.request(`/visitantes/${id}`);
  }

  async actualizarVisitante(id, data) {
    return this.request(`/visitantes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async eliminarVisitante(id) {
    return this.request(`/visitantes/${id}`, {
      method: 'DELETE',
    });
  }

  // ============ USUARIOS (RESIDENTES) ============
  async obtenerUsuarios(filtros = {}) {
    const params = new URLSearchParams(filtros);
    return this.request(`/usuarios?${params}`);
  }

  async obtenerUsuario(id) {
    return this.request(`/usuarios/${id}`);
  }

  async buscarUsuarioPorDNI(dni) {
    return this.request(`/usuarios/buscar/${dni}`);
  }

  // ============ HISTORIAL ACCESOS ============
  async obtenerHistorialAccesos(filtros = {}) {
    const params = new URLSearchParams(filtros);
    return this.request(`/historial-accesos?${params}`);
  }

  async registrarAcceso(acceso) {
    return this.request('/historial-accesos', {
      method: 'POST',
      body: JSON.stringify(acceso),
    });
  }

  async obtenerEstadisticas(fechaDesde, fechaHasta) {
    return this.request(`/historial-accesos/estadisticas?desde=${fechaDesde}&hasta=${fechaHasta}`);
  }

  // ============ CÁMARAS ============
  async obtenerCamaras() {
    return this.request('/camaras');
  }

  async obtenerStreamCamara(id) {
    return this.request(`/camaras/${id}/stream`);
  }

  // ============ NOTIFICACIONES ============
  async obtenerNotificaciones(idUsuario) {
    return this.request(`/notificaciones?idUsuario=${idUsuario}`);
  }

  async marcarNotificacionLeida(id) {
    return this.request(`/notificaciones/${id}/leer`, {
      method: 'PATCH',
    });
  }

  // ============ CONFIGURACIÓN ============
  async obtenerConfiguracion() {
    return this.request('/configuracion');
  }

  async actualizarConfiguracion(parametro, valor) {
    return this.request('/configuracion', {
      method: 'PUT',
      body: JSON.stringify({ parametro, valor }),
    });
  }

  // ============ UPLOAD DE ARCHIVOS ============
  async subirFoto(file, tipo = 'visitante') {
    const formData = new FormData();
    formData.append('foto', file);
    formData.append('tipo', tipo);

    return this.request('/upload/foto', {
      method: 'POST',
      headers: {}, // Dejar que el navegador establezca Content-Type para FormData
      body: formData,
    });
  }
}

export default new ApiService();
