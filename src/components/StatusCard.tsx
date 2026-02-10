import { AlertTriangle, CheckCircle, Wrench } from 'lucide-react';
import type { MaintenanceAlert } from '../types';

interface Props {
  alert: MaintenanceAlert;
}

export const StatusCard = ({ alert }: Props) => {
  // Tipado estricto: Las llaves DEBEN ser los status posibles
  const colors: Record<MaintenanceAlert['status'], string> = {
    danger: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    ok: 'bg-green-100 border-green-500 text-green-700',
    unknown: 'bg-gray-100 border-gray-400 text-gray-600'
  };
  
  const icons = {
    danger: <AlertTriangle className="w-6 h-6" />,
    warning: <AlertTriangle className="w-6 h-6" />,
    ok: <CheckCircle className="w-6 h-6" />,
    unknown: <Wrench className="w-6 h-6" />
  };

  return (
    <div className={`p-4 border-l-4 rounded shadow-sm flex items-center justify-between ${colors[alert.status]}`}>
      <div>
        <h3 className="font-bold text-lg">{alert.rule.label}</h3>
        <p className="text-sm opacity-90">
            {alert.status === 'unknown' ? 'Sin registros' : `Hace ${alert.kmSinceLast.toLocaleString()} km`}
        </p>
      </div>
      {icons[alert.status]}
    </div>
  );
};