import React from 'react';
import { Code, Plus } from 'lucide-react';

export const DashboardHeader = ({ onNewSession }) => (
  <div className="flex items-center justify-between p-6 border-b border-gray-700">
    <div className="flex items-center space-x-4">
      <div className="p-2 bg-blue-500 rounded-lg">
        <Code size={24} />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Coding Sessions</h1>
        <p className="text-gray-400">Manage and join your collaborative coding sessions</p>
      </div>
    </div>
    <button 
      onClick={onNewSession}
      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
    >
      <Plus size={20} />
      <span>New Session</span>
    </button>
  </div>
);