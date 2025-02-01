import React from 'react';

export const SessionsGrid = ({ sessions, onJoinSession }) => (
  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {sessions.map(session => (
      <SessionCard 
        key={session.id} 
        session={session} 
        onJoin={onJoinSession}
      />
    ))}
  </div>
);