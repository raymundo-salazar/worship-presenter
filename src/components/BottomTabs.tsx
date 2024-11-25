import React from 'react';
import { Library, Book, Film } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface BottomTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const BottomTabs = ({ activeTab, onTabChange }: BottomTabsProps) => {
  const tabs: Tab[] = [
    { id: 'library', label: 'Biblioteca', icon: <Library className="w-4 h-4" /> },
    { id: 'bible', label: 'Biblia', icon: <Book className="w-4 h-4" /> },
    { id: 'multimedia', label: 'Multimedia', icon: <Film className="w-4 h-4" /> },
  ];

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center gap-2
              ${activeTab === tab.id 
                ? 'text-blue-600 border-t-2 border-blue-600 -mt-px bg-blue-50' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};