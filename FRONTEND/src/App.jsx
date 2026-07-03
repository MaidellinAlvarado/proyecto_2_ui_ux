import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';
import { Activity, Database, AlertTriangle, Zap, UserCheck, Sun } from 'lucide-react';

const socket = io('http://localhost:3000');

// Colores para la Gráfica de Dona (Estado de Red) 
const COLORS_ESTADO = {
  info: '#10b981',    // Verde (Online)
  warning: '#f59e0b', // Ámbar (Offline/Baja)
  error: '#e11d48'    // Rojo (Alerta)
};

function App() {
  const [logs, setLogs] = useState([]); 
  const [dataGrafica, setDataGrafica] = useState([]); 

  useEffect(() => {
    socket.on('Nueva Métrica', (nuevaMetrica) => {
      setLogs(prev => [nuevaMetrica, ...prev].slice(0, 20));
      
      const punto = {
        hora: new Date(nuevaMetrica.timestamp).toLocaleTimeString([], { second: '2-digit' }),
        vatios: nuevaMetrica.vatios_generados
      };
      setDataGrafica(prev => [...prev, punto].slice(-20));
    });
    return () => socket.off('Nueva Métrica');
  }, []);

  // CÁLCULO PARA GRÁFICA DE DONA (ESTADO DE RED) 
  const dataDona = useMemo(() => {
    const counts = logs.reduce((acc, log) => {
      acc[log.criticidad] = (acc[log.criticidad] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map(key => ({ name: key.toUpperCase(), value: counts[key] }));
  }, [logs]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans p-6">
    

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        
        {/* 1. Gráfica de Línea (Tiempo Real)  */}
        <div className="bg-white p-7 rounded-3xl border border-rose-100 shadow-sm">
          <Activity className="w-8 h-8 text-rose-600 mb-2" />
          <h3 className="font-bold">Potencia Real</h3>
          <div className="h-40 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dataGrafica}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
                <Line type="monotone" dataKey="vatios" stroke="#e11d48" strokeWidth={3} dot={false} isAnimationActive={false} />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Gráfica de Barras (Histórica - Simulación)  */}
        <div className="bg-white p-7 rounded-3xl border border-rose-100 shadow-sm">
          <Database className="w-8 h-8 text-amber-500 mb-2" />
          <h3 className="font-bold">Generación por Mes</h3>
          <div className="h-40 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{name: 'Marzo', v: 4500}, {name: 'Abril', v: 3200}]}>
                <XAxis dataKey="name" fontSize={10} />
                <Bar dataKey="v" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Gráfica de Dona (Estado de Red)  */}
        <div className="bg-white p-7 rounded-3xl border border-rose-100 shadow-sm">
          <Sun className="w-8 h-8 text-emerald-500 mb-2" />
          <h3 className="font-bold">Estado de Nodos</h3>
          <div className="h-40 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataDona} innerRadius={40} outerRadius={60} paddingAngle={5} dataKey="value">
                  {dataDona.map((entry, index) => (
                    <Cell key={index} fill={COLORS_ESTADO[entry.name.toLowerCase()] || '#cbd5e1'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Alertas Sistema */}
        <div className="bg-white p-7 rounded-3xl border border-rose-100 shadow-sm flex flex-col justify-between">
          <AlertTriangle className="w-8 h-8 text-rose-600" />
          <div>
            <span className="text-5xl font-black text-rose-700">
              {logs.filter(l => l.criticidad === 'error').length}
            </span>
            <p className="text-stone-400 text-sm">Alertas Críticas Hoy</p>
          </div>
        </div>
      </div>

      {/* Tabla de Logs Avanzada */}
      <div className="bg-white rounded-3xl border border-rose-100 p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-6">Registro de Logs Avanzado</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-stone-400 text-sm border-b">
                <th className="pb-4">Timestamp </th>
                <th className="pb-4">Nodo </th>
                <th className="pb-4">Vatios </th>
                <th className="pb-4">Criticidad </th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <tr key={i} className="border-b border-stone-50 hover:bg-stone-50">
                  <td className="py-4 text-sm">{new Date(log.timestamp).toLocaleTimeString()}</td>
                  <td className="py-4 text-sm font-mono">{log.nodo_id?.substring(0,8)}...</td>
                  <td className="py-4 text-sm font-bold text-stone-800">{log.vatios_generados}W</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      log.criticidad === 'error' ? 'bg-red-100 text-red-600' : 
                      log.criticidad === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {log.criticidad?.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;