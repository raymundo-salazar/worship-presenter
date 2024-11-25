import React, { useState } from 'react';
import { Plus, FolderPlus, Search } from 'lucide-react';
import { useStore } from '../store';
import { MediaItem } from '../types';

export const MediaPanel = () => {
  const { mediaCategories, setCurrentMediaItem } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    mediaCategories[0]?.id || null
  );

  const currentCategory = mediaCategories.find(c => c.id === selectedCategory);

  const filteredItems = currentCategory?.items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Multimedia</h2>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded">
              <FolderPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar archivos..."
            className="w-full pl-8 pr-3 py-1.5 text-sm border rounded"
          />
          <Search className="w-4 h-4 absolute left-2.5 top-2 text-gray-400" />
        </div>
      </div>

      {/* Categories */}
      <div className="flex border-b border-gray-200">
        {mediaCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px ${
              selectedCategory === category.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentMediaItem(item)}
              className="group relative aspect-video rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <img
                src={item.thumbnail || item.url}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white truncate">{item.name}</p>
                {item.type === 'video' && item.duration && (
                  <p className="text-[10px] text-gray-300">{item.duration}s</p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};