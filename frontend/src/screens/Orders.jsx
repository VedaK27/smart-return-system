import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleReturnProduct = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId
        ? { ...order, status: 'returned' }
        : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    alert('Product return request submitted successfully!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="orders-container">
      <header className="orders-header">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>My Orders</h1>
      </header>

      <main className="orders-content">
        {orders.length === 0 ? (
          <div className="no-orders">
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet.</p>
            <Link to="/" className="shop-now-btn">Start Shopping</Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">Placed on {formatDate(order.orderDate)}</p>
                  </div>
                  <div className={`order-status ${order.status}`}>
                    {order.status === 'ordered' ? 'Ordered' : 'Returned'}
                  </div>
                </div>

                <div className="order-details">
                  <div className="product-info">
                    <h4>{order.productName}</h4>
                    <p className="product-id">Product ID: {order.productId}</p>
                    <p className="product-price">Price: ₹{order.price}</p>
                  </div>

                  <div className="delivery-info">
                    <p><strong>Delivery Address:</strong> {order.address}</p>
                    <p><strong>Mobile:</strong> {order.mobile}</p>
                  </div>

                  {order.status === 'ordered' && (
                    <button
                      onClick={() => handleReturnProduct(order.id)}
                      className="return-btn"
                    >
                      Return Product
                    </button>
                  )}

                  {order.status === 'returned' && (
                    <div className="return-status">
                      <span>Return request submitted</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
