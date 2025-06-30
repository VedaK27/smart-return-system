import React from 'react';
import { Menu } from 'lucide-react';
import '../styles/App.css';

const Navbar = ({ toggleSidebar }) => (
  <header className="navbar">
    <div className="navbar-left">
      <button className="menu-btn" onClick={toggleSidebar}>
        <Menu size={20} />
      </button>
      <h1 className="navbar-title">Reverse Logistics Dashboard</h1>
    </div>
    <div className="navbar-status">
      <div className="status-indicator"></div>
      <span>System Online</span>
    </div>
  </header>
);

export default Navbar;
