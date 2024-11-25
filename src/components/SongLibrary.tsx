import React from 'react';
import { MoreVertical } from 'lucide-react';
import { useStore } from '../store';
import { Song } from '../types';
import { ContextMenu } from './ContextMenu';

interface SongLibraryProps {
  songs: Song[];
}

export const SongLibrary = ({ songs }: SongLibraryProps) => {
  const { addSongToPlaylist, currentPlaylist } = useStore();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, song: Song) => {
    e.dataTransfer.setData('application/json', JSON.stringify(song));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="space-y-1">
      {songs.map((song) => (
        <div
          key={song.id}
          draggable
          onDragStart={(e) => handleDragStart(e, song)}
          className="py-2 px-3 bg-white rounded hover:bg-gray-50 transition-colors flex items-center justify-between group cursor-move"
        >
          <div>
            <h3 className="text-sm font-medium">{song.title}</h3>
            <p className="text-[11px] text-gray-500">{song.author}</p>
          </div>
          <ContextMenu song={song}>
            <button className="p-1 rounded hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
          </ContextMenu>
        </div>
      ))}
    </div>
  );
};