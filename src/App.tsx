import React, { useState, useRef } from 'react';
import { Plus, CheckCircle, X, Car, Download, Upload, Pencil } from 'lucide-react';
import { useMaintenance } from './hooks/useMaintenance';
import { ExpensesChart } from './components/ExpensesChart';
import { StatusCard } from './components/StatusCard';       // Importado
import { MaintenanceList } from './components/MaintenanceList'; // Importado
import type { Category, MaintenanceRecord } from './types';

function App() {
  const { records, currentMileage, setCurrentMileage, addRecord, updateRecord, deleteRecord, alerts, exportData, importData } = useMaintenance();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Estado del formulario (se mantiene aquí para manejar la lógica de edición vs creación)
  const [form, setForm] = useState({ 
    date: new Date().toISOString().split('T')[0], 
    description: '', 
    category: 'Motor' as Category, 
    mileage: '', 
    cost: '', 
    partBrand: '' 
  });

  const handleImportClick = () => fileInputRef.current?.click();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      importData(file);
      e.target.value = '';
    }
  };

  const handleEditClick = (record: MaintenanceRecord) => {
    setEditingId(record.id);
    setForm({
      date: record.date,
      description: record.description,
      category: record.category,
      mileage: record.mileage.toString(),
      cost: record.cost.toString(),
      partBrand: record.partBrand || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ date: new Date().toISOString().split('T')[0], description: '', category: 'Motor', mileage: '', cost: '', partBrand: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recordData = {
      date: form.date,
      description: form.description,
      category: form.category as Category,
      mileage: Number(form.mileage),
      cost: Number(form.cost),
      partBrand: form.partBrand.trim() === '' ? 'Genérica' : form.partBrand
    };

    if (editingId) {
      updateRecord({ ...recordData, id: editingId });
      setEditingId(null);
    } else {
      addRecord(recordData);
    }
    setForm({ date: new Date().toISOString().split('T')[0], description: '', category: 'Motor', mileage: '', cost: '', partBrand: '' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200 gap-4">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-full text-white shadow-lg shadow-blue-200">
                  <Car size={32} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gestor de Mantenimiento</h1>
                    <p className="text-sm text-slate-500">Chevrolet Chevy (Corsa) 2010</p>
                </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                <div className="flex gap-2">
                  <button onClick={exportData} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Download size={18} /> <span className="hidden sm:inline">Exportar</span>
                  </button>
                  <button onClick={handleImportClick} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
                    <Upload size={18} /> <span className="hidden sm:inline">Importar</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
                </div>
                <div className="h-8 w-[1px] bg-slate-300 hidden sm:block mx-2"></div>
                <div className="flex items-center gap-3 bg-slate-100 p-2 rounded-lg border border-slate-200">
                    <span className="text-sm font-semibold text-slate-600 pl-2">Odómetro:</span>
                    <input type="number" value={currentMileage} onChange={(e) => setCurrentMileage(Number(e.target.value))}
                        className="w-24 bg-white border border-slate-300 rounded px-2 py-1 text-right font-mono font-bold text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="text-sm text-slate-500 pr-2">km</span>
                </div>
            </div>
        </header>

        {/* DASHBOARD & CHART */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert, idx) => <StatusCard key={idx} alert={alert} />)}
        </section>
        <section>
          <ExpensesChart records={records} />
        </section>

        {/* FORMULARIO (Mantenemos aquí por simplicidad del estado 'form') */}
        <section className={`p-6 rounded-xl shadow-sm border transition-colors ${editingId ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
            <h2 className={`text-lg font-bold mb-4 flex items-center gap-2 ${editingId ? 'text-blue-700' : 'text-slate-700'}`}>
              {editingId ? <><Pencil className="w-5 h-5" /> Editando Registro</> : <><Plus className="w-5 h-5 text-blue-600" /> Nuevo Registro</>}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-2">
                   <input required type="date" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div className="lg:col-span-3">
                  <input required placeholder="Descripción" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
                </div>
                <div className="lg:col-span-2">
                  <input placeholder="Marca (Opcional)" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={form.partBrand} onChange={e => setForm({...form, partBrand: e.target.value})} />
                </div>
                <div className="lg:col-span-2">
                  <select className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white" 
                      value={form.category} onChange={e => setForm({...form, category: e.target.value as Category})}>
                      {['Motor', 'Frenos', 'Suspensión', 'Transmisión', 'Eléctrico', 'Otros'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="lg:col-span-1">
                  <input required type="number" placeholder="KM" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={form.mileage} onChange={e => setForm({...form, mileage: e.target.value})} />
                </div>
                <div className="lg:col-span-1">
                  <input required type="number" placeholder="$" className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
                      value={form.cost} onChange={e => setForm({...form, cost: e.target.value})} />
                </div>
                <div className="lg:col-span-1 flex gap-2">
                  <button type="submit" className={`w-full text-white p-2 rounded font-medium transition-colors shadow-sm ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                      {editingId ? <CheckCircle className="w-5 h-5 mx-auto" /> : <Plus className="w-5 h-5 mx-auto" />}
                  </button>
                  {editingId && (
                    <button type="button" onClick={handleCancelEdit} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-600 p-2 rounded font-medium transition-colors">
                        <X className="w-5 h-5 mx-auto" />
                    </button>
                  )}
                </div>
            </form>
        </section>

        {/* LISTADO (Componente Atomizado) */}
        <MaintenanceList 
            records={records} 
            onDelete={deleteRecord} 
            onEdit={handleEditClick}
            filter={filter}
            onFilterChange={setFilter}
            editingId={editingId}
        />
      </div>
    </div>
  );
}

export default App;