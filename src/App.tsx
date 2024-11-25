import React, { useState } from 'react';
import { PlaylistPanel } from './components/PlaylistPanel';
import { SlidesPanel } from './components/SlidesPanel';
import { PreviewPanel } from './components/PreviewPanel';
import { BottomTabs } from './components/BottomTabs';
import { MediaPanel } from './components/MediaPanel';

function App() {
  const [activeTab, setActiveTab] = useState('library');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'multimedia':
        return <MediaPanel />;
      // Add other tab contents here
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 flex min-h-0">
        {/* Playlist Panel */}
        <div className="w-80 bg-white border-r border-gray-200">
          <PlaylistPanel />
        </div>

        {/* Slides Panel */}
        <div className="flex-1 border-r border-gray-200 bg-white overflow-hidden">
          <SlidesPanel />
        </div>

        {/* Preview Panel */}
        <div className="w-96 bg-white">
          <PreviewPanel />
        </div>
      </div>

      {/* Bottom Tabs */}
      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Tab Content */}
      <div className="h-60 bg-white border-t border-gray-200">
        {renderTabContent()}
      </div>
    </div>
  );
}

export default App;