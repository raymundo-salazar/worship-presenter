import React from 'react';
import { useStore } from '../store';

export const SlidesPanel = () => {
  const { currentPlaylist, currentSong, setCurrentSlide } = useStore();

  return (
    <div className="h-full overflow-y-auto">
      {currentPlaylist?.songs.map((song) => (
        <div key={song.id} className="mb-6">
          <div className="sticky top-0 bg-white p-4 border-b border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold">{song.title}</h3>
            <p className="text-sm text-gray-600">{song.author}</p>
          </div>
          <div className="p-4 space-y-4">
            {song.slides.map((slide) => (
              <div
                key={slide.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  currentSong?.id === song.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setCurrentSlide(slide)}
              >
                <p className="whitespace-pre-line">{slide.content}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};