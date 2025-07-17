import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Dashboard from './Dashboard';
import Orders1 from './Orders1';
import ReturnsAnalytics from './ReturnsAnalytics';
import '../styles/App.css';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin'); // Clear admin session
    navigate('/'); // Redirect to login
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'orders': return <Orders1 />;
      case 'analytics': return <ReturnsAnalytics />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        isOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="main-content">
        <Navbar toggleSidebar={toggleSidebar} />
        
        {/* ✅ Logout Button */}
        <div style={{ textAlign: 'right', padding: '10px 20px' }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '8px 16px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>

        <main className="page-content">
          {renderPage()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;