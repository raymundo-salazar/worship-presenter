import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ChevronDown } from 'lucide-react';
import { Alert } from '../types';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (alert: Omit<Alert, 'id'>) => void;
}

export const AlertDialog = ({ open, onClose, onSave }: AlertDialogProps) => {
  const [content, setContent] = useState('');
  const [duration, setDuration] = useState(5);
  const [repetitions, setRepetitions] = useState(1);
  const [animation, setAnimation] = useState<Alert['animation']>('left-right');
  const [style, setStyle] = useState({
    fontFamily: 'Arial',
    fontSize: '24px',
    fontWeight: 'normal',
    fontStyle: 'normal',
    backgroundColor: '#000000',
    textColor: '#ffffff'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      content,
      duration,
      repetitions,
      animation,
      style
    });
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[500px] max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Nueva Alerta
          </Dialog.Title>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  required
                />
              </div>

              {/* Duration and Repetitions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duración (segundos)
                  </label>
                  <input
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    min={1}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repeticiones
                  </label>
                  <input
                    type="number"
                    value={repetitions}
                    onChange={(e) => setRepetitions(Number(e.target.value))}
                    min={1}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Animation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Animación
                </label>
                <select
                  value={animation}
                  onChange={(e) => setAnimation(e.target.value as Alert['animation'])}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="left-right">Izquierda a Derecha</option>
                  <option value="right-left">Derecha a Izquierda</option>
                  <option value="fade">Desvanecer</option>
                  <option value="top-bottom">Arriba a Abajo</option>
                </select>
              </div>

              {/* Style */}
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Estilo</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Fuente
                    </label>
                    <select
                      value={style.fontFamily}
                      onChange={(e) => setStyle({ ...style, fontFamily: e.target.value })}
                      className="w-full p-2 border rounded-md text-sm"
                    >
                      <option value="Arial">Arial</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Helvetica">Helvetica</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Tamaño
                    </label>
                    <select
                      value={style.fontSize}
                      onChange={(e) => setStyle({ ...style, fontSize: e.target.value })}
                      className="w-full p-2 border rounded-md text-sm"
                    >
                      {[16, 20, 24, 28, 32, 36, 40].map(size => (
                        <option key={size} value={`${size}px`}>{size}px</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Color de Fondo
                    </label>
                    <input
                      type="color"
                      value={style.backgroundColor}
                      onChange={(e) => setStyle({ ...style, backgroundColor: e.target.value })}
                      className="w-full p-1 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">
                      Color de Texto
                    </label>
                    <input
                      type="color"
                      value={style.textColor}
                      onChange={(e) => setStyle({ ...style, textColor: e.target.value })}
                      className="w-full p-1 border rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};