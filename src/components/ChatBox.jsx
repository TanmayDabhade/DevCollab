

  // src/components/Chat/ChatBox.jsx
import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { mockChat } from '../data/mockData';

export const ChatBox = () => {
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