import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { io } from 'socket.io-client';
import Editor from '@monaco-editor/react';
import axios from 'axios';

// WebSocket connection to backend
const socket = io("https://devcollab-backend.onrender.com");

export const CodeEditor = () => {
  const [code, setCode] = useState('// Start coding here...');
  const [language, setLanguage] = useState('javascript');
  const [sessionId] = useState('test123'); // Session ID (can be dynamic later)
  
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  // Fetch existing code when component mounts
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await axios.get(`https://devcollab-backend.onrender.com/api/session/${sessionId}`);
        if (response.data.code) {
          setCode(response.data.code);
          setLanguage(response.data.language);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
    socket.emit("joinSession", { sessionId });

    socket.on("codeChange", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  // Handle code changes in real-time
  const handleCodeChange = (value) => {
    setCode(value || '');
    socket.emit("codeChange", { sessionId, code: value });

    // Auto-save to backend
    axios.post(`https://devcollab-backend.onrender.com/api/session/${sessionId}`, {
      code: value,
      language,
    }).catch(err => console.error("Error saving session:", err));
  };

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
      
      <div className="flex-1">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={handleCodeChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            formatOnPaste: true,
            formatOnType: true,
          }}
          beforeMount={(monaco) => {
            monaco.editor.defineTheme('my-dark', {
              base: 'vs-dark',
              inherit: true,
              rules: [],
              colors: {
                'editor.background': '#1f2937',
              },
            });
          }}
          onMount={(editor) => {
            editor.focus();
          }}
        />
      </div>
    </div>
  );
};