import type { MaintenanceRecord } from '../types';

export const processData = (records: MaintenanceRecord[]) => {
  // 1. Agrupamos los gastos por mes (Clave: "YYYY-MM")
  const groupedData: Record<string, number> = {};

  records.forEach(record => {
    // Tomamos los primeros 7 caracteres de la fecha (ej: "2024-02")
    const monthKey = record.date.substring(0, 7); 
    
    if (!groupedData[monthKey]) {
      groupedData[monthKey] = 0;
    }
    groupedData[monthKey] += record.cost;
  });

  // 2. Convertimos a array y ordenamos
  return Object.entries(groupedData)
    .map(([key, value]) => {
      const [year, month] = key.split('-');
      // Truco: Creamos la fecha con día 15 para evitar problemas de zona horaria al inicio de mes
      const dateObj = new Date(parseInt(year), parseInt(month) - 1, 15);
      const label = dateObj.toLocaleDateString('es-ES', { month: 'short', year: '2-digit' });
      
      return {
        originalDate: key,
        name: label,       
        monto: value       
      };
    })
    .sort((a, b) => a.originalDate.localeCompare(b.originalDate))
    .slice(-6); // Últimos 6 meses
};