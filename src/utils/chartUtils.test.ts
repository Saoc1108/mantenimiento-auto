import { describe, it, expect } from 'vitest';
import { processData } from './chartUtils';
import type { MaintenanceRecord } from '../types';

describe('chartUtils - processData', () => {
  it('debería sumar correctamente los costos del mismo mes', () => {
    // Datos de prueba: 2 gastos en Enero y 1 en Febrero
    const mockRecords = [
      { date: '2024-01-05', cost: 100, id: '1', description: 'A', category: 'Motor', mileage: 1000 },
      { date: '2024-01-20', cost: 200, id: '2', description: 'B', category: 'Frenos', mileage: 1100 },
      { date: '2024-02-10', cost: 500, id: '3', description: 'C', category: 'Otros', mileage: 1200 },
    ] as MaintenanceRecord[];

    const result = processData(mockRecords);

    // Enero: 100 + 200 = 300
    // Febrero: 500
    
    expect(result).toHaveLength(2);
    
    // Verificamos Enero
    const enero = result.find(r => r.originalDate === '2024-01');
    expect(enero?.monto).toBe(300);

    // Verificamos Febrero
    const febrero = result.find(r => r.originalDate === '2024-02');
    expect(febrero?.monto).toBe(500);
  });

  it('debería manejar una lista vacía sin errores', () => {
    const result = processData([]);
    expect(result).toEqual([]);
  });
});