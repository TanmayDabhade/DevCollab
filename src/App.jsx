// src/App.jsx

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Editor } from './pages/Editor';

const App = () => {
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header onNavigate={setCurrentView} view={currentView} />
      <div className="flex flex-1 overflow-hidden">
        {currentView === 'dashboard' ? (
          <Dashboard onJoinSession={() => setCurrentView('editor')} />
        ) : currentView === 'editor' ?(
          <Editor />
        ):(null)}
      </div>
    </div>
  );
};

export default App;