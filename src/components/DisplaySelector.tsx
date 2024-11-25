import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Monitor, Check } from 'lucide-react';

interface Display {
  id: number;
  name: string;
  width: number;
  height: number;
  primary: boolean;
}

interface DisplaySelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (displayId: number) => void;
  selectedDisplay: number | null;
}

export const DisplaySelector = ({ open, onClose, onSelect, selectedDisplay }: DisplaySelectorProps) => {
  // In a real implementation, we would use Electron or a similar tool to get actual displays
  // For now, we'll simulate some displays
  const displays: Display[] = [
    { id: 1, name: "Pantalla Principal", width: 1920, height: 1080, primary: true },
    { id: 2, name: "Pantalla Secundaria", width: 1920, height: 1080, primary: false },
    { id: 3, name: "Proyector", width: 1280, height: 720, primary: false },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] max-w-[90vw]">
          <Dialog.Title className="text-sm font-semibold mb-4 flex items-center">
            <Monitor className="w-4 h-4 mr-2" />
            Seleccionar Pantalla
          </Dialog.Title>
          
          <div className="space-y-2 mb-4">
            {displays.map((display) => (
              <button
                key={display.id}
                onClick={() => onSelect(display.id)}
                className={`w-full p-3 rounded-lg border text-left transition-colors flex items-center justify-between
                  ${selectedDisplay === display.id 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-200 hover:border-blue-200 hover:bg-blue-50'
                  }`}
              >
                <div>
                  <div className="text-sm font-medium flex items-center">
                    {display.name}
                    {display.primary && (
                      <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                        Principal
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {display.width} x {display.height}
                  </div>
                </div>
                {selectedDisplay === display.id && (
                  <Check className="w-4 h-4 text-blue-500" />
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded"
            >
              Cerrar
            </button>
          </div>

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