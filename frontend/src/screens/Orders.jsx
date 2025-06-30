import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../styles/App.css' ;
import LoadingSpinner from '../components/LoadingSpinner';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await new Promise(res => setTimeout(res, 500));
      setOrders([
        { id: 'ORD-001', product: 'iPhone 15 Pro', customer: 'John Doe', price: 999, distance: 25, risk: 85, status: 'predicted_return' },
        { id: 'ORD-002', product: 'Samsung TV 65"', customer: 'Jane Smith', price: 1299, distance: 45, risk: 12, status: 'low_risk' },
        { id: 'ORD-003', product: 'Nike Air Max', customer: 'Bob Johnson', price: 149, distance: 8, risk: 78, status: 'predicted_return' },
      ]);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <div className="page-container">
      <h2 className="page-title">Orders Overview</h2>
      <Card>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Distance</th>
                <th>Risk</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product}</td>
                  <td>{order.customer}</td>
                  <td>${order.price}</td>
                  <td>{order.distance} km</td>
                  <td>{order.risk}%</td>
                  <td>
                    <span className={`status-badge ${order.status === 'predicted_return' ? 'status-return' : 'status-low'}`}>
                        <span className="status-dot"></span>
                        {order.status.replace('_', ' ')}
                    </span>
                    </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
};

export default Orders;