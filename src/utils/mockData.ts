import type { MaintenanceRecord, MaintenanceRule } from '../types';

// Datos iniciales: Historial ficticio de mi Corsa
export const INITIAL_DATA: MaintenanceRecord[] = [
  {
    id: '1',
    date: '2023-05-10',
    description: 'Cambio de Kit de Embrague',
    category: 'Transmisión',
    mileage: 145000,
    cost: 120000,
    partBrand: 'Valeo'
  },
  {
    id: '2',
    date: '2023-11-15',
    description: 'Cambio de Aceite de Caja 75W-90',
    category: 'Transmisión',
    mileage: 152000,
    cost: 35000,
    partBrand: 'ACDelco'
  },
  {
    id: '3',
    date: '2024-01-20',
    description: 'Cambio de Aceite Motor 10W-40',
    category: 'Motor',
    mileage: 155000,
    cost: 45000,
    partBrand: 'Shell Helix'
  }
];

// Reglas de negocio: Configuración de cuándo avisar
export const MAINTENANCE_RULES: MaintenanceRule[] = [
  { category: 'Motor', limitKm: 10000, label: 'Cambio de Aceite' }, // Alerta cada 10.000 km
  { category: 'Frenos', limitKm: 30000, label: 'Revisión Pastillas' },
  { category: 'Transmisión', limitKm: 50000, label: 'Aceite de Caja' },
];