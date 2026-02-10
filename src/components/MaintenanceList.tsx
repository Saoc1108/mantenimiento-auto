import { Trash2, Pencil } from 'lucide-react';
import type { MaintenanceRecord, Category } from '../types';

interface Props {
  records: MaintenanceRecord[];
  onDelete: (id: string) => void;
  onEdit: (record: MaintenanceRecord) => void;
  filter: Category | 'Todos';
  onFilterChange: (val: Category | 'Todos') => void;
  editingId: string | null;
}

export const MaintenanceList = ({ records, onDelete, onEdit, filter, onFilterChange, editingId }: Props) => {
  const filteredRecords = filter === 'Todos' ? records : records.filter(r => r.category === filter);

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-700">Historial</h2>
            <select 
              className="border text-sm p-1 rounded bg-white text-slate-600" 
              value={filter} 
              onChange={(e) => onFilterChange(e.target.value as any)}
            >
                <option value="Todos">Todos</option>
                <option value="Motor">Motor</option>
                <option value="Transmisión">Transmisión</option>
                <option value="Frenos">Frenos</option>
                <option value="Suspensión">Suspensión</option>
            </select>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-500 uppercase font-semibold text-xs tracking-wider">
                    <tr>
                        <th className="p-4">Fecha</th>
                        <th className="p-4">Categoría</th>
                        <th className="p-4">Descripción</th>
                        <th className="p-4 text-right">KM</th>
                        <th className="p-4 text-right">Costo</th>
                        <th className="p-4 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredRecords.map(r => (
                        <tr key={r.id} className={`transition-colors ${editingId === r.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                            <td className="p-4 text-slate-600 font-mono">{r.date}</td>
                            <td className="p-4">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                    ${r.category === 'Motor' ? 'bg-orange-100 text-orange-700' : 
                                      r.category === 'Frenos' ? 'bg-red-100 text-red-700' : 
                                      'bg-blue-100 text-blue-700'}`}>
                                    {r.category}
                                </span>
                            </td>
                            <td className="p-4 font-medium text-slate-700">
                                {r.description} 
                                {r.partBrand && <span className="block text-xs text-slate-400 font-normal mt-1">Marca: {r.partBrand}</span>}
                            </td>
                            <td className="p-4 text-right font-mono text-slate-600">{r.mileage.toLocaleString()}</td>
                            <td className="p-4 text-right font-mono text-slate-600">${r.cost.toLocaleString()}</td>
                            <td className="p-4 text-center">
                                <div className="flex justify-center gap-2">
                                  <button onClick={() => onEdit(r)} className="text-slate-400 hover:text-blue-600 transition-colors p-1 rounded hover:bg-blue-50">
                                      <Pencil size={18} />
                                  </button>
                                  <button onClick={() => onDelete(r.id)} className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50">
                                      <Trash2 size={18} />
                                  </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </section>
  );
};