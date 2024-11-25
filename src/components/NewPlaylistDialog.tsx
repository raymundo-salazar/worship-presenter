import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useStore } from '../store';

interface NewPlaylistDialogProps {
  open: boolean;
  onClose: () => void;
}

export const NewPlaylistDialog = ({ open, onClose }: NewPlaylistDialogProps) => {
  const [name, setName] = useState('');
  const addPlaylist = useStore((state) => state.addPlaylist);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addPlaylist(name.trim());
      setName('');
      onClose();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[400px] max-w-[90vw]">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Nueva Playlist
          </Dialog.Title>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre de la playlist"
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={!name.trim()}
              >
                Crear
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