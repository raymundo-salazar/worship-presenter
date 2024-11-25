import React, { useState } from 'react';
import { Bell, Plus, Play, Pause, X, Settings } from 'lucide-react';
import { Alert } from '../types';
import { AlertDialog } from './AlertDialog';

export const AlertsPanel = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playMode, setPlayMode] = useState<'sequential' | 'individual'>('sequential');

  const handleSaveAlert = (alertData: Omit<Alert, 'id'>) => {
    const newAlert: Alert = {
      ...alertData,
      id: Date.now().toString()
    };
    setAlerts([...alerts, newAlert]);
  };

  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          <h3 className="text-sm font-semibold">Alertas</h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center px-2 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Nueva Alerta
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded ${
              isPlaying ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
            } hover:bg-opacity-80`}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5" />
            )}
          </button>
          <button
            onClick={() => setPlayMode(mode => mode === 'sequential' ? 'individual' : 'sequential')}
            className="p-1.5 rounded bg-gray-100 text-gray-600 hover:bg-gray-200"
            title={playMode === 'sequential' ? 'Modo Secuencial' : 'Modo Individual'}
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className="space-y-2">
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-2 bg-gray-50 rounded"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{alert.content}</p>
              <p className="text-xs text-gray-500">
                {alert.duration}s × {alert.repetitions} veces
              </p>
            </div>
            <button
              onClick={() => {
                setAlerts(alerts.filter(a => a.id !== alert.id));
              }}
              className="ml-2 p-1 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {alerts.length === 0 && !isCreating && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No hay alertas configuradas</p>
          <button
            onClick={() => setIsCreating(true)}
            className="mt-2 text-xs text-blue-600 hover:text-blue-700"
          >
            Crear nueva alerta
          </button>
        </div>
      )}

      <AlertDialog
        open={isCreating}
        onClose={() => setIsCreating(false)}
        onSave={handleSaveAlert}
      />
    </div>
  );
};