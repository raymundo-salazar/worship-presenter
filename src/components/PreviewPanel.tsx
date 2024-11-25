import React, { useState } from 'react';
import { useStore } from '../store';
import { Monitor, Eye, EyeOff, Eraser, Type, Image, Tv2, BellOff } from 'lucide-react';
import { DisplaySelector } from './DisplaySelector';
import { AlertsPanel } from './AlertsPanel';

export const PreviewPanel = () => {
  const { currentSlide, selectedDisplay } = useStore();
  const [isLive, setIsLive] = useState(false);
  const [isDisplaySelectorOpen, setIsDisplaySelectorOpen] = useState(false);
  const [clearStates, setClearStates] = useState({
    all: false,
    text: false,
    background: false,
    alerts: false
  });

  const toggleLive = () => setIsLive(!isLive);

  const toggleClear = (type: keyof typeof clearStates) => {
    setClearStates(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  // Calculate aspect ratio based on selected display
  const aspectRatio = selectedDisplay 
    ? `${(selectedDisplay.height / selectedDisplay.width) * 100}%`
    : '56.25%'; // Default 16:9

  return (
    <div className="h-full flex flex-col">
      {/* Header with Live Status */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Monitor className="w-4 h-4 mr-2" />
            <h2 className="text-sm font-semibold">Vista Previa</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDisplaySelectorOpen(true)}
              className="flex items-center px-3 py-1.5 rounded text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <Tv2 className="w-3.5 h-3.5 mr-1.5" />
              Pantallas
            </button>
            <button
              onClick={toggleLive}
              className={`flex items-center px-3 py-1.5 rounded-full text-xs font-medium transition-colors
                ${isLive 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {isLive ? (
                <>
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  En Vivo
                </>
              ) : (
                <>
                  <EyeOff className="w-3.5 h-3.5 mr-1.5" />
                  Inactivo
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Area with Dynamic Aspect Ratio */}
      <div className="flex-1 p-4 bg-gray-100 flex">
        <div className="flex-1">
          <div className="relative w-full" style={{ paddingTop: aspectRatio }}>
            <div className="absolute inset-0">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-lg overflow-hidden">
                {currentSlide ? (
                  <p className={`text-white text-center transition-opacity duration-300
                    ${clearStates.all || clearStates.text ? 'opacity-0' : 'opacity-100'}`}
                    style={{ fontSize: 'min(4vh, 1.5rem)' }}
                  >
                    {currentSlide.content}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">
                    Selecciona un slide para previsualizar
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clear Controls - Vertical */}
        <div className="ml-4 flex flex-col gap-2">
          <button
            onClick={() => toggleClear('all')}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              clearStates.all ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
            title="Limpiar Todo"
          >
            <Eraser className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => toggleClear('text')}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              clearStates.text ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
            title="Limpiar Texto"
          >
            <Type className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => toggleClear('background')}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              clearStates.background ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
            title="Quitar Fondo"
          >
            <Image className="w-4 h-4" />
          </button>

          <button
            onClick={() => toggleClear('alerts')}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              clearStates.alerts ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
            }`}
            title="Quitar Alertas"
          >
            <BellOff className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Alerts Panel */}
      <AlertsPanel />

      <DisplaySelector
        open={isDisplaySelectorOpen}
        onClose={() => setIsDisplaySelectorOpen(false)}
        selectedDisplay={selectedDisplay}
      />
    </div>
  );
};