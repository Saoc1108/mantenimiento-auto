import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { MaintenanceRecord } from '../types';

interface Props {
  records: MaintenanceRecord[];
}

export const ExpensesChart = ({ records }: Props) => {
  const processData = () => {
    const groupedData: Record<string, number> = {};

    records.forEach(record => {
      const monthKey = record.date.substring(0, 7); 
      
      if (!groupedData[monthKey]) {
        groupedData[monthKey] = 0;
      }
      groupedData[monthKey] += record.cost;
    });

    return Object.entries(groupedData)
      .map(([key, value]) => {
        const [year, month] = key.split('-');
        const dateObj = new Date(parseInt(year), parseInt(month) - 1);
        const label = dateObj.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
        
        return {
          originalDate: key, // Para ordenar
          name: label,       // Para mostrar (Eje X)
          monto: value       // Para la barra (Eje Y)
        };
      })
      .sort((a, b) => a.originalDate.localeCompare(b.originalDate))
      .slice(-6);
  };

  const data = processData();

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 bg-white rounded-xl border border-slate-200">
        <p>No hay datos suficientes para el gráfico</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-bold text-slate-700 mb-4">Gastos por Mes (Últimos 6 meses)</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              tickFormatter={(value) => `$${value / 1000}k`} 
            />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Gasto Total']}
            />
            <Bar dataKey="monto" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#2563eb' : '#93c5fd'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};