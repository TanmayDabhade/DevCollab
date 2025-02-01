// src/pages/Editor.jsx
import React from 'react';
import { CodeEditor } from '../components/CodeEditor';
import { ChatBox } from '../components/ChatBox';

export const Editor = () => (
  <div className="flex flex-1">
    <div className="flex-1">
      <CodeEditor />
    </div>
    <ChatBox />
  </div>
);