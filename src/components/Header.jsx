import React, { useState } from 'react';
import { Menu, Settings, LogOut, Code, LayoutGrid } from 'lucide-react';
import { mockUsers } from '../data/mockData';

export const Header = ({ onNavigate, view }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  return (
    <nav className="bg-gray-900 border-b border-gray-700 p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button className="p-1 hover:bg-gray-800 rounded-lg">
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-bold flex items-center space-x-2">
          <Code size={24} className="text-blue-500" />
          <span>DevCollab<span className="text-blue-500">Editor</span></span>
        </h1>
        <div className="flex items-center space-x-2 ml-6">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 ${
              view === 'dashboard' ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
          >
            <LayoutGrid size={16} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => onNavigate('editor')}
            className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 ${
              view === 'editor' ? 'bg-gray-800' : 'hover:bg-gray-800'
            }`}
          >
            <Code size={16} />
            <span>Current Session</span>
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          {mockUsers.map((user) => (
            <div key={user.id} className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center`}>
              {user.initials}
            </div>
          ))}
        </div>
        <button className="p-2 hover:bg-gray-800 rounded-lg" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
          <Settings size={20} />
        </button>
        <button className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg">
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};
