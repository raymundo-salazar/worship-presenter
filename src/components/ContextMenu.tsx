import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ListPlus, Edit, Trash } from 'lucide-react';
import { Song } from '../types';
import { useStore } from '../store';

interface ContextMenuProps {
  children: React.ReactNode;
  song: Song;
  onAddToPlaylist: () => void;
}

export const ContextMenu = ({ children, song }: ContextMenuProps) => {
  const { playlists, addSongToPlaylist } = useStore();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-white rounded-md shadow-lg p-1 z-50"
          sideOffset={5}
        >
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger className="text-sm flex items-center px-2 py-1.5 hover:bg-blue-50 rounded outline-none cursor-pointer">
              <ListPlus className="w-4 h-4 mr-2" />
              Agregar a playlist
            </DropdownMenu.SubTrigger>
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent
                className="min-w-[200px] bg-white rounded-md shadow-lg p-1 ml-1"
              >
                {playlists.map((playlist) => (
                  <DropdownMenu.Item
                    key={playlist.id}
                    className="text-sm px-2 py-1.5 hover:bg-blue-50 rounded outline-none cursor-pointer"
                    onClick={() => addSongToPlaylist(playlist.id, song)}
                  >
                    {playlist.name}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.SubContent>
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>
          
          <DropdownMenu.Item
            className="text-sm flex items-center px-2 py-1.5 hover:bg-blue-50 rounded outline-none cursor-pointer"
          >
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenu.Item>
          
          <DropdownMenu.Item
            className="text-sm flex items-center px-2 py-1.5 hover:bg-red-50 text-red-600 rounded outline-none cursor-pointer"
          >
            <Trash className="w-4 h-4 mr-2" />
            Eliminar
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};