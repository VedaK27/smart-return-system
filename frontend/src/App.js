import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminDashboard from './screens/AdminDashboard'; // 🧠 Add this at the top
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home';
import ProductDetail from './screens/ProductDetail';
import OrderProduct from './screens/OrderProduct';
import Orders from './screens/Orders';
import OrderSuccess from './screens/OrderSuccess'; // add to top


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={() => setIsLoggedIn(true)} />
          }
        />
        <Route path="/signup" element={<Signup onSignup={() => setIsLoggedIn(true)} />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
        <Route path="/product/:id" element={isLoggedIn ? <ProductDetail /> : <Navigate to="/" />} />
        <Route path="/order/:id" element={isLoggedIn ? <OrderProduct /> : <Navigate to="/" />} />
        <Route path="/orders" element={isLoggedIn ? <Orders /> : <Navigate to="/" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/order-success" element={<OrderSuccess />} />

      </Routes>
    </Router>
  );
}

export default App;
