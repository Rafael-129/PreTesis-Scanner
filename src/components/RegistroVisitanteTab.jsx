import { useState, useRef } from 'react';
import { UserPlus, Camera, Calendar, Clock, MapPin, Phone, IdCard, FileText } from 'lucide-react';
import Webcam from 'react-webcam';
import { format } from 'date-fns';

export default function RegistroVisitanteTab() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    fecha_visita: format(new Date(), 'yyyy-MM-dd'),
    hora_visita: format(new Date(), 'HH:mm'),
    validoHasta: '23:59',
    depart_visita: '',
    motivo: '',
    foto: null
  });

  const [showCamera, setShowCamera] = useState(false);
  const [fotoCaptured, setFotoCaptured] = useState(null);
  const webcamRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const capturarFoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setFotoCaptured(imageSrc);
    setFormData(prev => ({ ...prev, foto: imageSrc }));
    setShowCamera(false);
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      fecha_visita: format(new Date(), 'yyyy-MM-dd'),
      hora_visita: format(new Date(), 'HH:mm'),
      validoHasta: '23:59',
      depart_visita: '',
      motivo: '',
      foto: null
    });
    setFotoCaptured(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Aquí iría la lógica para enviar al backend
    console.log('Registrando visitante:', formData);
    
    // Simular registro exitoso
    alert('Visitante registrado exitosamente');
    limpiarFormulario();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="w-6 h-6 text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-200">Registro de Visitante</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda */}
            <div className="space-y-4">
              {/* Nombre Completo */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Ej: Juan Pérez"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* DNI / Identificación */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  DNI / Identificación *
                </label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    name="dni"
                    placeholder="Ej: 12345678"
                    value={formData.dni}
                    onChange={handleInputChange}
                    maxLength={8}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Teléfono
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Ej: +51 999 999 999"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              {/* Departamento a Visitar */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Departamento a Visitar *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select
                    name="depart_visita"
                    value={formData.depart_visita}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="">Selecciona departamento</option>
                    <option value="A-101">A-101</option>
                    <option value="A-102">A-102</option>
                    <option value="A-201">A-201</option>
                    <option value="B-101">B-101</option>
                    <option value="B-201">B-201</option>
                    <option value="B-205">B-205</option>
                  </select>
                </div>
              </div>

              {/* Notas Adicionales */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Notas Adicionales
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <textarea
                    name="motivo"
                    placeholder="Ej: Visitante frecuente, entrega de paquete, etc."
                    value={formData.motivo}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-4">
              {/* Fecha y Hora */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Fecha de Visita
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="date"
                      name="fecha_visita"
                      value={formData.fecha_visita}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hora
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="time"
                      name="hora_visita"
                      value={formData.hora_visita}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Válido Hasta
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="time"
                      name="validoHasta"
                      value={formData.validoHasta}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Hora
                  </label>
                  <input
                    type="text"
                    value={formData.validoHasta}
                    readOnly
                    className="w-full bg-slate-700 border border-slate-700 rounded-lg px-4 py-2.5 text-gray-400"
                  />
                </div>
              </div>

              {/* Foto del Visitante */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Foto del Visitante *
                </label>
                
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center bg-slate-800/50">
                  {showCamera ? (
                    <div className="space-y-4">
                      <Webcam
                        ref={webcamRef}
                        audio={false}
                        screenshotFormat="image/jpeg"
                        className="w-full rounded-lg"
                        videoConstraints={{
                          width: 640,
                          height: 480,
                          facingMode: "user"
                        }}
                      />
                      <button
                        type="button"
                        onClick={capturarFoto}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        📸 Capturar Foto
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCamera(false)}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : fotoCaptured ? (
                    <div className="space-y-4">
                      <img 
                        src={fotoCaptured} 
                        alt="Foto capturada" 
                        className="w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCamera(true)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors"
                      >
                        📸 Tomar Nueva Foto
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Camera className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-400 text-sm mb-4">
                        Captura la foto del visitante para el reconocimiento facial
                      </p>
                      <button
                        type="button"
                        onClick={() => setShowCamera(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                      >
                        <Camera className="w-5 h-5" />
                        Tomar Foto
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-4 mt-8 pt-6 border-t border-dark-border">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Registrar Visitante
            </button>
            
            <button
              type="button"
              onClick={limpiarFormulario}
              className="px-8 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
