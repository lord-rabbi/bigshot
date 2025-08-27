import React, { useState } from 'react';
import { FiHome, FiFileText, FiClock, FiLock } from 'react-icons/fi';
import './Sidebar.css';

const ArrowIcon = ({ collapsed }: { collapsed: boolean }) => (
  <div
    style={{
      width: '48px',
      height: '48px',
      borderRadius: '50%',
      backgroundColor: 'var(--hover-bg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.3s ease',
    }}
  >
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 0.3s ease',
      }}
    >
      <path
        d="M9 6L15 12L9 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        <ArrowIcon collapsed={collapsed} />
      </button>
      <h2 className="logo">{!collapsed && 'bigshot pro'}</h2>
      <nav>
        <ul>
          <li>
            <FiHome className="icon" />
            {!collapsed && <span className="label">Accueil</span>}
          </li>
          <li>
            <FiFileText className="icon" />
            {!collapsed && <span className="label">Documents</span>}
          </li>
          <li>
            <FiClock className="icon" />
            {!collapsed && <span className="label">Exercices</span>}
          </li>
          <li>
            <FiLock className="icon" />
            {!collapsed && <span className="label">Sécurité</span>}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
