import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import './styles/variables.css';
import './styles/Dashboard.css'; 

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: 'none',
          backgroundColor: darkMode ? '#f1c40f' : '#2c3e50',
          color: darkMode ? '#2c3e50' : '#f1c40f',
          fontSize: '1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          zIndex: 1000,
        }}
        title={darkMode ? 'Mode clair' : 'Mode sombre'}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
      <Dashboard />
    </>
  );
};

export default App;
