import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Orders.css';
import '../styles/ReturnReason.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showReturnDialog, setShowReturnDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedReason, setSelectedReason] = useState('');

  const returnReasons = [
    { value: 'late_delivery', label: 'Late delivery' },
    { value: 'wrong_item', label: 'Wrong Item' },
    { value: 'damaged', label: 'Damaged' },
    { value: 'no_longer_needed', label: 'No longer needed' },
    { value: 'changed_mind', label: 'Changed mind' },
    { value: 'quality_not_expected', label: 'Quality not as expected' }
  ];

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const handleReturnClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowReturnDialog(true);
  };

  const handleReturnSubmit = () => {
    if (!selectedReason) {
      alert('Please select a return reason');
      return;
    }

    const updatedOrders = orders.map(order =>
      order.id === selectedOrderId
        ? {
            ...order,
            status: 'returned',
            returnReason: selectedReason,
            returnDate: new Date().toISOString()
          }
        : order
    );

    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    setShowReturnDialog(false);
    setSelectedOrderId(null);
    setSelectedReason('');

    alert('Product return request submitted successfully!');
  };

  const handleCancelReturn = () => {
    setShowReturnDialog(false);
    setSelectedOrderId(null);
    setSelectedReason('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReasonLabel = (reasonValue) => {
    const reason = returnReasons.find(r => r.value === reasonValue);
    return reason ? reason.label : reasonValue;
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
                      onClick={() => handleReturnClick(order.id)}
                      className="return-btn"
                    >
                      Return Product
                    </button>
                  )}

                  {order.status === 'returned' && (
                    <div className="return-status">
                      <span>Return request submitted</span>
                      {order.returnReason && (
                        <p className="return-reason">
                          <strong>Reason:</strong> {getReasonLabel(order.returnReason)}
                        </p>
                      )}
                      {order.returnDate && (
                        <p className="return-date">
                          <strong>Return Date:</strong> {formatDate(order.returnDate)}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {showReturnDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-header">
              <h3>Return Product</h3>
              <button className="dialog-close-btn" onClick={handleCancelReturn}>×</button>
            </div>

            <div className="dialog-body">
              <p>Please select a reason for returning this product:</p>
              <div className="reason-options">
                {returnReasons.map(reason => (
                  <label key={reason.value} className="reason-option">
                    <input
                      type="radio"
                      name="returnReason"
                      value={reason.value}
                      checked={selectedReason === reason.value}
                      onChange={(e) => setSelectedReason(e.target.value)}
                    />
                    <span className="reason-label">{reason.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="dialog-footer">
              <button className="cancel-btn" onClick={handleCancelReturn}>Cancel</button>
              <button
                className="submit-btn"
                onClick={handleReturnSubmit}
                disabled={!selectedReason}
              >
                Submit Return Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
