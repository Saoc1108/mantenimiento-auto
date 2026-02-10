// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMaintenance } from './useMaintenance';

// Simulamos los datos iniciales para tener control total
vi.mock('../utils/mockData', () => ({
  INITIAL_DATA: [],
  MAINTENANCE_RULES: [
    { category: 'Motor', limitKm: 10000, label: 'Cambio de Aceite' }
  ]
}));

describe('useMaintenance Hook', () => {
  
  it('debería iniciar con el kilometraje por defecto (166.000)', () => {
    const { result } = renderHook(() => useMaintenance());
    expect(result.current.currentMileage).toBe(166000); 
  });

  it('debería agregar un registro correctamente', () => {
    const { result } = renderHook(() => useMaintenance());

    // Act: Ejecutamos la acción de agregar
    act(() => {
      result.current.addRecord({
        date: '2024-02-10',
        description: 'Test Aceite',
        category: 'Motor',
        mileage: 160000,
        cost: 50000,
        partBrand: 'Shell'
      });
    });

    // Assert: Verificamos que se guardó
    expect(result.current.records).toHaveLength(1);
    expect(result.current.records[0].description).toBe('Test Aceite');
  });

  it('debería detectar alerta DANGER si pasamos el límite', () => {
    const { result } = renderHook(() => useMaintenance());

    // 1. Subimos el odómetro actual a 180.000
    act(() => {
      result.current.setCurrentMileage(180000); 
    });

    // 2. Agregamos un mantenimiento viejo (a los 160.000)
    // Diferencia: 20.000 km. El límite es 10.000. ¡Debe dar alerta!
    act(() => {
      result.current.addRecord({
        date: '2023-01-01',
        description: 'Cambio Viejo',
        category: 'Motor',
        mileage: 160000,
        cost: 0
      });
    });

    // 3. Buscamos la alerta del Motor
    const alerts = result.current.alerts; 
    // Nota: Como getAlerts se ejecuta en el render, accedemos directo a alerts
    
    const motorAlert = alerts.find(a => a.rule.category === 'Motor');
    
    expect(motorAlert).toBeDefined();
    expect(motorAlert?.status).toBe('danger');
  });
});