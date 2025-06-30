import React from 'react';
import { Home, Package, BarChart3 } from 'lucide-react';
import '../styles/App.css';

const Sidebar = ({ isOpen, toggleSidebar, currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'analytics', icon: BarChart3, label: 'Returns Analytics' }
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <h2 className="sidebar-title">ML Logistics</h2>
        <nav>
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(item.id);
                if (window.innerWidth < 1024) toggleSidebar();
              }}
            >
              <item.icon className="sidebar-icon" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
