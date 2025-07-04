// OrderProduct.jsx (without Tailwind)
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/OrderProduct.css';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 299 },
  { id: 2, name: 'Smartwatch', price: 199 },
  { id: 3, name: 'Mixer Grinder', price: 899 },
  { id: 4, name: 'Bluetooth Speaker', price: 129 },
  { id: 5, name: 'Leather Wallet', price: 179 },
  { id: 6, name: 'Sneakers', price: 149 },
  { id: 7, name: 'Jacket', price: 1099 },
  { id: 8, name: 'T-Shirt', price: 499 },
  { id: 9, name: 'Cotton Scarf', price: 349 },
  { id: 10, name: 'Sunglasses', price: 599 },
  { id: 11, name: 'Air Fryer', price: 1599 }
];

const OrderProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    address: '',
    mobile: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.address.trim() || !formData.mobile.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const order = {
      id: Date.now(),
      productId: product?.id,
      productName: product?.name,
      price: product?.price,
      address: formData.address,
      mobile: formData.mobile,
      orderDate: new Date().toISOString(),
      status: 'ordered'
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    navigate('/');
  };

  if (!product) {
    return (
      <div className="order-form-container">
        <div className="not-found">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/')} className="back-btn">Return to Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-form-container">
      <header className="form-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
        <h1>Order Details</h1>
      </header>

      <main className="form-content">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-item">
            <span>Product: {product.name}</span>
            <span>Price: ₹{product.price}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="order-form">
          <h2>Delivery Information</h2>

          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter your complete address"
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number *</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleInputChange}
              placeholder="Enter your mobile number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <button type="submit" className="confirm-order-btn">
            Confirm Order
          </button>
        </form>
      </main>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <h2>Product ordered successfully!</h2>
              <p>Your order has been placed and will be delivered soon.</p>
              <button onClick={closePopup} className="popup-close-btn">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProduct;
