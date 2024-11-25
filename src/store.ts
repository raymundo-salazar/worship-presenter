import { create } from 'zustand';
import { Song, Playlist, Slide, Display, MediaItem, MediaCategory } from './types';
import { sampleSongs } from './data/sampleSongs';
import { sampleMedia } from './data/sampleMedia';

interface Store {
  songs: Song[];
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  currentSong: Song | null;
  currentSlide: Slide | null;
  selectedDisplay: Display | null;
  mediaCategories: MediaCategory[];
  currentMediaItem: MediaItem | null;
  setCurrentPlaylist: (playlist: Playlist) => void;
  setCurrentSong: (song: Song) => void;
  setCurrentSlide: (slide: Slide) => void;
  setSelectedDisplay: (display: Display | null) => void;
  setCurrentMediaItem: (item: MediaItem | null) => void;
  addPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistId: string, song: Song) => void;
  reorderPlaylistSongs: (playlistId: string, startIndex: number, endIndex: number) => void;
  addMediaCategory: (name: string) => void;
  addMediaItem: (categoryId: string, item: Omit<MediaItem, 'id'>) => void;
}

const initialPlaylists: Playlist[] = [
  {
    id: '1',
    name: 'Servicio Domingo',
    songs: []
  }
];

export const useStore = create<Store>((set) => ({
  songs: sampleSongs,
  playlists: initialPlaylists,
  currentPlaylist: initialPlaylists[0],
  currentSong: null,
  currentSlide: null,
  selectedDisplay: null,
  mediaCategories: sampleMedia,
  currentMediaItem: null,
  setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
  setCurrentSong: (song) => set({ currentSong: song }),
  setCurrentSlide: (slide) => set({ currentSlide: slide }),
  setSelectedDisplay: (display) => set({ selectedDisplay: display }),
  setCurrentMediaItem: (item) => set({ currentMediaItem: item }),
  addPlaylist: (name) => set((state) => {
    const newPlaylist = {
      id: Date.now().toString(),
      name,
      songs: []
    };
    return { 
      playlists: [...state.playlists, newPlaylist],
      currentPlaylist: newPlaylist
    };
  }),
  addSongToPlaylist: (playlistId, song) => set((state) => ({
    playlists: state.playlists.map((playlist) =>
      playlist.id === playlistId
        ? { 
            ...playlist, 
            songs: playlist.songs.find(s => s.id === song.id) 
              ? playlist.songs 
              : [...playlist.songs, song] 
          }
        : playlist
    ),
  })),
  reorderPlaylistSongs: (playlistId, startIndex, endIndex) => set((state) => {
    const playlist = state.playlists.find(p => p.id === playlistId);
    if (!playlist) return state;

    const newSongs = Array.from(playlist.songs);
    const [removed] = newSongs.splice(startIndex, 1);
    newSongs.splice(endIndex, 0, removed);

    return {
      playlists: state.playlists.map(p =>
        p.id === playlistId ? { ...p, songs: newSongs } : p
      )
    };
  }),
  addMediaCategory: (name) => set((state) => ({
    mediaCategories: [
      ...state.mediaCategories,
      { id: Date.now().toString(), name, items: [] }
    ]
  })),
  addMediaItem: (categoryId, item) => set((state) => ({
    mediaCategories: state.mediaCategories.map(category =>
      category.id === categoryId
        ? {
            ...category,
            items: [...category.items, { ...item, id: Date.now().toString() }]
          }
        : category
    )
  }))
}));