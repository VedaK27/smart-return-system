import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Package, Clock, ShoppingBag } from 'lucide-react';
import '../styles/OrderSuccess.css'; // 👈 add this CSS file

const OrderSuccess = () => {
  const orderNumber = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="order-success-container">
      <div className="order-box">
        {/* Success Icon */}
        <div className="icon-wrapper">
          <div className="success-icon">
            <CheckCircle size={48} color="white" />
          </div>
          <div className="emoji-bubble">🎉</div>
        </div>

        {/* Message */}
        <h1 className="success-title">Order Placed!</h1>
        <p className="success-message">Your order has been successfully placed and is being processed.</p>

        {/* Details */}
        <div className="order-details">
          <div className="detail-row">
            <span className="label">Order Number:</span>
            <span className="value">{orderNumber}</span>
          </div>
          <div className="detail-row">
            <span className="label">Estimated Delivery:</span>
            <span className="value">{estimatedDelivery}</span>
          </div>
        </div>

        {/* Steps */}
        <h3 className="steps-heading">What's Next?</h3>
        <div className="steps">
          <div className="step">
            <CheckCircle size={20} color="green" />
            <span>Order confirmed</span>
          </div>
          <div className="step spin">
            <Package size={20} color="blue" />
            <span>Preparing your order</span>
          </div>
          <div className="step">
            <Clock size={20} color="gray" />
            <span>Shipping & delivery</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <Link to="/" className="btn primary">
            <ShoppingBag size={18} />
            Continue Shopping <ArrowRight size={18} />
          </Link>
          <button className="btn secondary">Track Your Order</button>
        </div>

        {/* Footer */}
        <p className="thank-you-note">
          Thank you for shopping with us! We'll send you an email with tracking information once your order ships.
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
