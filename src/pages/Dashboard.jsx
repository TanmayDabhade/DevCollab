// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { SearchAndFilter } from '../components/SearchAndFilter';
import { SessionsGrid } from '../components/SessionsGrid';
import { mockSessions } from '../data/mockData';

export const Dashboard = ({ onJoinSession }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSessions = mockSessions.filter(session =>
    session.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ErrorBoundary>
      <div>
        <DashboardHeader onCreateSession={() => onJoinSession('new')} />
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <SessionsGrid
          sessions={filteredSessions}
          onJoinSession={onJoinSession}
        />
      </div>
    </ErrorBoundary>
  );
};

// Temporary error boundary component
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    console.error("Error caught:", error, info);
  }
  
  render() {
    if (this.state.hasError) {
      return <h2 style={{ color: 'red' }}>Component Error - Check Console</h2>;
    }
    return this.props.children;
  }
}