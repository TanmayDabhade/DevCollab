import React, { useState, useEffect } from 'react';
import { Menu, Users, Settings, LogOut, Send, Code, MessageSquare } from 'lucide-react';

// Mock data for demonstration
const mockUsers = [
  { id: 1, initials: 'JD', color: 'bg-blue-500' },
  { id: 2, initials: 'SK', color: 'bg-green-500' },
  { id: 3, initials: 'MP', color: 'bg-purple-500' }
];

const mockChat = [
  { user: 'John Doe', message: 'Just updated the header component', timestamp: '2024-02-01T10:00:00Z' },
  { user: 'Sarah Kim', message: 'Looks good! Can you check the styling?', timestamp: '2024-02-01T10:05:00Z' }
];

// Header Component
const Header = () => {
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
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex -space-x-2">
          {mockUsers.map((user, index) => (
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

// Code Editor Component
const CodeEditor = () => {
  const [code, setCode] = useState('// Start coding here...');
  const [language, setLanguage] = useState('javascript');
  
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];
  
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-gray-800 text-sm border border-gray-700 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
          >
            {languages.map(lang => (
              <option key={lang.value} value={lang.value}>{lang.label}</option>
            ))}
          </select>
          <span className="text-sm text-gray-400">Auto-saving enabled</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">3 people viewing</span>
          <Users size={16} className="text-gray-400" />
        </div>
      </div>
      <div className="flex-1 p-4">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-gray-800 text-gray-100 font-mono p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

// Chat Component
const ChatBox = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState(mockChat);
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  
  const sendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      user: 'You',
      message: message.trim(),
      timestamp: new Date().toISOString()
    };
    
    setChat([...chat, newMessage]);
    setMessage('');
  };
  
  return (
    <div className={`flex flex-col h-full bg-gray-900 border-l border-gray-700 transition-all duration-300 ${isChatExpanded ? 'w-96' : 'w-12'}`}>
      <div className="bg-gray-900 p-3 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setIsChatExpanded(!isChatExpanded)}
            className="p-1 hover:bg-gray-800 rounded-lg"
          >
            <MessageSquare size={20} />
          </button>
          {isChatExpanded && <h2 className="font-bold">Team Chat</h2>}
        </div>
      </div>
      
      {isChatExpanded && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chat.map((msg, i) => (
              <div key={i} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    {msg.user.charAt(0)}
                  </div>
                  <span className="font-medium">{msg.user}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="ml-10 p-3 bg-gray-800 rounded-lg">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <CodeEditor />
        </div>
        <ChatBox />
      </div>
    </div>
  );
};

export default App;