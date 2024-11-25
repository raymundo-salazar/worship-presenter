import React, { useState } from 'react';
import { Plus, Search, Music, Book, ChevronDown, ChevronRight, Library } from 'lucide-react';
import { useStore } from '../store';
import { SongLibrary } from './SongLibrary';
import { NewPlaylistDialog } from './NewPlaylistDialog';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Song } from '../types';

export const PlaylistPanel = () => {
  const { playlists, currentPlaylist, setCurrentPlaylist, songs, reorderPlaylistSongs } = useStore();
  const [showLibrary, setShowLibrary] = useState(true);
  const [showBible, setShowBible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewPlaylistDialogOpen, setIsNewPlaylistDialogOpen] = useState(false);
  const [dragOverPlaylistId, setDragOverPlaylistId] = useState<string | null>(null);
  const [isDraggingOverCurrent, setIsDraggingOverCurrent] = useState(false);

  const handleDragEnd = (result: any) => {
    if (!result.destination || !currentPlaylist) return;
    reorderPlaylistSongs(
      currentPlaylist.id,
      result.source.index,
      result.destination.index
    );
    setDragOverPlaylistId(null);
    setIsDraggingOverCurrent(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, playlistId?: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    if (playlistId) {
      setDragOverPlaylistId(playlistId);
    } else {
      setIsDraggingOverCurrent(true);
    }
  };

  const handleDragLeave = () => {
    setDragOverPlaylistId(null);
    setIsDraggingOverCurrent(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, playlistId: string) => {
    e.preventDefault();
    try {
      const songData = e.dataTransfer.getData('application/json');
      const song = JSON.parse(songData);
      useStore.getState().addSongToPlaylist(playlistId, song);
    } catch (error) {
      console.error('Error adding song to playlist:', error);
    }
    setDragOverPlaylistId(null);
    setIsDraggingOverCurrent(false);
  };

  return (
    <div className="flex flex-col h-full text-sm">
      {/* Playlists Section */}
      <div className="flex flex-col flex-grow min-h-0">
        <div className="p-3 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Music className="w-4 h-4" />
              <h2 className="font-semibold">Playlists</h2>
            </div>
            <button 
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => setIsNewPlaylistDialogOpen(true)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-1">
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                className={`p-2 rounded cursor-pointer transition-colors duration-200 ${
                  currentPlaylist?.id === playlist.id
                    ? 'bg-blue-100'
                    : 'hover:bg-gray-100'
                } ${dragOverPlaylistId === playlist.id ? 'bg-blue-50 border-2 border-blue-300 border-dashed' : 'border-2 border-transparent'}`}
                onClick={() => setCurrentPlaylist(playlist)}
                onDragOver={(e) => handleDragOver(e, playlist.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, playlist.id)}
              >
                <div className="flex items-center justify-between">
                  <span>{playlist.name}</span>
                  <span className="text-xs text-gray-500">{playlist.songs.length}</span>
                </div>
                {dragOverPlaylistId === playlist.id && (
                  <div className="text-xs text-blue-500 mt-1">
                    Soltar para agregar a esta playlist
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Playlist Songs */}
        <div 
          className={`flex-1 min-h-0 p-3 border-b border-gray-200 overflow-hidden transition-colors duration-200
            ${isDraggingOverCurrent ? 'bg-blue-50 border-2 border-blue-300 border-dashed rounded' : 'border-2 border-white'}`}
          onDragOver={(e) => handleDragOver(e)}
          onDragLeave={handleDragLeave}
          onDrop={(e) => currentPlaylist && handleDrop(e, currentPlaylist.id)}
        >
          <h3 className="font-medium mb-2">Canciones en Playlist</h3>
          {isDraggingOverCurrent && (
            <div className="text-sm text-blue-500 mb-2 text-center py-2">
              Soltar para agregar a la playlist actual
            </div>
          )}
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="playlist-songs">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="overflow-y-auto h-full space-y-1"
                >
                  {currentPlaylist?.songs.map((song, index) => (
                    <Draggable key={song.id} draggableId={song.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded group"
                        >
                          <div>
                            <div className="font-medium">{song.title}</div>
                            <div className="text-[11px] text-gray-500">{song.author}</div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      {/* Library Section */}
      <div className="border-b border-gray-200">
        <button
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50"
          onClick={() => setShowLibrary(!showLibrary)}
        >
          <div className="flex items-center gap-2">
            <Library className="w-4 h-4" />
            <h2 className="font-semibold">Biblioteca</h2>
            <span className="text-xs text-gray-500">({songs.length})</span>
          </div>
          {showLibrary ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        
        {showLibrary && (
          <div className="p-3">
            <div className="relative mb-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar canciones..."
                className="w-full pl-8 pr-3 py-1.5 text-sm border rounded"
              />
              <Search className="w-4 h-4 absolute left-2.5 top-2 text-gray-400" />
            </div>
            <div className="max-h-60 overflow-y-auto">
              <SongLibrary songs={songs} />
            </div>
          </div>
        )}
      </div>

      {/* Bible Section */}
      <div>
        <button
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50"
          onClick={() => setShowBible(!showBible)}
        >
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4" />
            <h2 className="font-semibold">Biblia</h2>
          </div>
          {showBible ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
        
        {showBible && (
          <div className="p-3">
            <select className="w-full p-1.5 border rounded mb-2 text-sm">
              <option>Seleccionar libro</option>
            </select>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Capítulo"
                className="w-1/2 p-1.5 border rounded text-sm"
              />
              <input
                type="number"
                placeholder="Versículo"
                className="w-1/2 p-1.5 border rounded text-sm"
              />
            </div>
          </div>
        )}
      </div>

      <NewPlaylistDialog 
        open={isNewPlaylistDialogOpen} 
        onClose={() => setIsNewPlaylistDialogOpen(false)} 
      />
    </div>
  );
};