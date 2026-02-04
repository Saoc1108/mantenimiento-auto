// Definimos un tipo personalizado para las categorías (como un Enum)
export type Category = 'Motor' | 'Frenos' | 'Suspensión' | 'Transmisión' | 'Eléctrico' | 'Otros';

// Esta es la estructura de un registro de mantenimiento (Tu Entidad)
export interface MaintenanceRecord {
  id: string;
  date: string;       // Usaremos string ISO para simplificar (YYYY-MM-DD)
  description: string;
  category: Category;
  mileage: number;    // Kilometraje al momento del servicio
  cost: number;
  partBrand?: string; // El ? significa que es opcional (Nullable)
}

// Reglas para saber cuándo disparar una alerta
export interface MaintenanceRule {
  category: Category;
  limitKm: number;    // Límite de KM para alerta roja
  label: string;      // Nombre legible para mostrar en pantalla
}