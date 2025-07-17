import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../styles/App.css';
import LoadingSpinner from '../components/LoadingSpinner';

const Orders1 = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersWithRisk = async () => {
      setLoading(true);
      const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

      const ordersWithRisk = await Promise.all(
  storedOrders.map(async (order) => {
    try {
      const payload = {
        product_type: order.productType || order.productName,
        price: order.price,
        delivery_distance: order.deliveryDistance,
        month: order.month,
        customer_return_rate: order.customerReturnRate
      };

      console.log("📦 Sending to API:", payload);

      const res = await fetch('http://127.0.0.1:8000/predict_return_probability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log("🧠 Prediction response:", data);

      const risk = Math.round(data.return_probability * 100);

      let status = 'low_risk';
      if (risk > 55) status = 'high_risk';
      else if (risk > 40) status = 'medium_risk';

      return {
        ...order,
        risk,
        status
      };
    } catch (error) {
      console.error("API error:", error);
      return {
        ...order,
        risk: 'N/A',
        status: 'error'
      };
    }
  })
);


      setOrders(ordersWithRisk);
      setLoading(false);
    };

    fetchOrdersWithRisk();
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
                  <td>{order.productType || order.productName}</td>
                  <td>{order.customer || 'N/A'}</td>
                  <td>₹{order.price}</td>
                  <td>{order.deliveryDistance} km</td>
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

export default Orders1;
