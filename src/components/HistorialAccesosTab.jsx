import { useState } from 'react';
import { History, Search, CheckCircle2, XCircle, User, Clock, MapPin, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Datos de ejemplo
const accesosEjemplo = [
  {
    id: 1,
    nombre: 'María González',
    tipo: 'Residente',
    departamento: 'A-101',
    hora: '08:30',
    fecha: '4/11/2025',
    estado: 'Autorizado'
  },
  {
    id: 2,
    nombre: 'Juan Pérez',
    tipo: 'Visitante',
    departamento: 'A-101',
    hora: '09:15',
    fecha: '4/11/2025',
    estado: 'Autorizado'
  },
  {
    id: 3,
    nombre: 'Desconocido',
    tipo: 'Visitante',
    hora: '10:45',
    fecha: '4/11/2025',
    estado: 'Denegado'
  },
  {
    id: 4,
    nombre: 'Carlos Rodríguez',
    tipo: 'Residente',
    departamento: 'B-205',
    hora: '11:20',
    fecha: '4/11/2025',
    estado: 'Autorizado'
  },
  {
    id: 5,
    nombre: 'Laura Torres',
    tipo: 'Visitante',
    departamento: 'B-205',
    hora: '12:00',
    fecha: '4/11/2025',
    estado: 'Autorizado'
  },
];

const EstadisticaCard = ({ titulo, valor, Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-400',
    green: 'bg-green-500/10 text-green-400',
    red: 'bg-red-500/10 text-red-400'
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-lg p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{titulo}</p>
          <p className="text-3xl font-bold text-white">{valor}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
};

const AccesoItem = ({ acceso }) => {
  const esAutorizado = acceso.estado === 'Autorizado';

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className={`p-2 rounded-lg ${esAutorizado ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
            {esAutorizado ? (
              <CheckCircle2 className="w-6 h-6 text-green-400" />
            ) : (
              <XCircle className="w-6 h-6 text-red-400" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-white font-semibold">{acceso.nombre}</h4>
            
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                acceso.tipo === 'Residente' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                {acceso.tipo}
              </span>
              
              {acceso.departamento && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {acceso.departamento}
                </span>
              )}
              
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {acceso.hora}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {acceso.fecha}
              </span>
            </div>
          </div>
        </div>

        <div className={`px-4 py-2 rounded-full text-sm font-medium ${
          esAutorizado 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {acceso.estado}
        </div>
      </div>
    </div>
  );
};

export default function HistorialAccesosTab() {
  const [busqueda, setBusqueda] = useState('');
  const [accesos] = useState(accesosEjemplo);

  const totalAccesos = accesos.length;
  const autorizados = accesos.filter(a => a.estado === 'Autorizado').length;
  const denegados = accesos.filter(a => a.estado === 'Denegado').length;

  const accesosFiltrados = accesos.filter(acceso => 
    acceso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    acceso.departamento?.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <EstadisticaCard
          titulo="Total de Accesos"
          valor={totalAccesos}
          Icon={User}
          color="blue"
        />
        <EstadisticaCard
          titulo="Autorizados"
          valor={autorizados}
          Icon={CheckCircle2}
          color="green"
        />
        <EstadisticaCard
          titulo="Denegados"
          valor={denegados}
          Icon={XCircle}
          color="red"
        />
      </div>

      {/* Lista de Accesos */}
      <div className="bg-dark-card border border-dark-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-gray-200">Historial de Accesos</h2>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por nombre o departamento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Lista de accesos */}
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {accesosFiltrados.length > 0 ? (
            accesosFiltrados.map(acceso => (
              <AccesoItem key={acceso.id} acceso={acceso} />
            ))
          ) : (
            <div className="text-center py-12">
              <History className="w-16 h-16 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
