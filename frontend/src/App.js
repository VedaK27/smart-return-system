// // App.jsx
// import React, { useState } from 'react';
// import Sidebar from '../src/components/Sidebar';
// import Navbar from '../src/components/Navbar';
// import Dashboard from '../src/pages/Dashboard'
// import Orders from '../src/pages/Orders';
// import ReturnsAnalytics from '../src/pages/ReturnsAnalytics';
// import './styles/App.css';

// const App = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState('dashboard');

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const renderPage = () => {
//     switch (currentPage) {
//       case 'dashboard': return <Dashboard />;
//       case 'orders': return <Orders />;
//       case 'analytics': return <ReturnsAnalytics />;
//       default: return <Dashboard />;
//     }
//   };

//   return (
//     <div className="app-container">
//       {/* <Sidebar 
//         isOpen={sidebarOpen} 
//         toggleSidebar={toggleSidebar}
//         currentPage={currentPage}
//         setCurrentPage={setCurrentPage}
//       />
//       <div className="main-content">
//         <Navbar toggleSidebar={toggleSidebar} />
//         <main className="page-content">
//           {renderPage()}
//         </main>

        
//       </div> */}
//       {/* <Orders /> */}
//       <Dashboard/>
//       {/* <ReturnsAnalytics / > */}
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import './styles/App.css';

// Import your page components
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import ReturnsAnalytics from './pages/ReturnsAnalytics';

const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', component: Dashboard },
    { id: 'orders', name: 'Orders Management', component: Orders },
    { id: 'analytics', name: 'Returns Analytics', component: ReturnsAnalytics }
  ];

  const currentComponent = navigation.find(nav => nav.id === currentPage)?.component || Dashboard;
  const CurrentPageComponent = currentComponent;

  return (
    <div className="App">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-brand">
            📊 ReturnGuard Analytics
          </div>
          <ul className="navbar-nav">
            {navigation.map(nav => (
              <li key={nav.id}>
                <button
                  className={`nav-link ${currentPage === nav.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(nav.id)}
                >
                  {nav.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <CurrentPageComponent />
      </main>
    </div>
  );
};

export default App;
