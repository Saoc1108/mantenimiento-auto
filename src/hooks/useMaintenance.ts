import { useState, useEffect } from 'react';
import type { MaintenanceRecord } from '../types';
import { INITIAL_DATA, MAINTENANCE_RULES } from '../utils/mockData';

export const useMaintenance = () => {
  // 1. Estados Lazy Load
  const [currentMileage, setCurrentMileage] = useState<number>(() => {
    const stored = localStorage.getItem('current_mileage');
    return stored ? Number(stored) : 166000;
  });
  
  const [records, setRecords] = useState<MaintenanceRecord[]>(() => {
    const stored = localStorage.getItem('maintenance_data');
    return stored ? JSON.parse(stored) : INITIAL_DATA;
  });

  // 2. Efectos de Persistencia
  useEffect(() => {
    localStorage.setItem('current_mileage', currentMileage.toString());
  }, [currentMileage]);

  useEffect(() => {
    localStorage.setItem('maintenance_data', JSON.stringify(records));
  }, [records]);

  // --- CRUD COMPLETO ---

  // CREATE
  const addRecord = (record: Omit<MaintenanceRecord, 'id'>) => {
    const newRecord = { ...record, id: crypto.randomUUID() };
    setRecords(prev => [newRecord, ...prev]);
  };

  // UPDATE 
  const updateRecord = (updatedRecord: MaintenanceRecord) => {
    setRecords(prev => prev.map(record => 
      record.id === updatedRecord.id ? updatedRecord : record
    ));
  };

  // DELETE
  const deleteRecord = (id: string) => {
    setRecords(prev => prev.filter(r => r.id !== id));
  };

  // --- Lógica de Negocio ---
  const getAlerts = () => {
    return MAINTENANCE_RULES.map(rule => {
      const lastRecord = records
        .filter(r => r.category === rule.category)
        .sort((a, b) => b.mileage - a.mileage)[0];

      if (!lastRecord) return { rule, status: 'unknown', diff: 0, kmSinceLast: 0 };

      const kmSinceLast = currentMileage - lastRecord.mileage;
      const isOverdue = kmSinceLast >= rule.limitKm;
      const isClose = kmSinceLast >= (rule.limitKm * 0.9);

      return {
        rule,
        lastMileage: lastRecord.mileage,
        kmSinceLast,
        status: isOverdue ? 'danger' : isClose ? 'warning' : 'ok'
      };
    });
  };

  // --- Funciones de Backup ---
  const exportData = () => {
    const data = { records, currentMileage };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mantenimiento_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        if (data.records && typeof data.currentMileage === 'number') {
          setRecords(data.records);
          setCurrentMileage(data.currentMileage);
          alert('¡Backup restaurado con éxito!');
        } else {
          alert('Formato incorrecto.');
        }
      } catch (error) {
        console.error(error);
        alert('Error al procesar archivo.');
      }
    };
    reader.readAsText(file);
  };

  return {
    records,
    currentMileage,
    setCurrentMileage,
    addRecord,
    updateRecord,
    deleteRecord,
    alerts: getAlerts(),
    exportData,
    importData
  };
};