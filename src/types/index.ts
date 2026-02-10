export type Category = 'Motor' | 'Frenos' | 'Suspensión' | 'Transmisión' | 'Eléctrico' | 'Otros';

export interface MaintenanceRecord {
  id: string;
  date: string;
  description: string;
  category: Category;
  mileage: number;
  cost: number;
  partBrand?: string;
}

export interface MaintenanceRule {
  category: Category;
  limitKm: number;
  label: string;
}

export interface MaintenanceAlert {
  rule: MaintenanceRule;
  status: 'danger' | 'warning' | 'ok' | 'unknown';
  kmSinceLast: number;
  lastMileage: number;
}