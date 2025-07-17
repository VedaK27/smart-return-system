import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/OrderProduct.css';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 299, category: 'electronics' },
  { id: 2, name: 'Smartwatch', price: 199, category: 'electronics' },
  { id: 3, name: 'Mixer Grinder', price: 899, category: 'home_appliances' },
  { id: 4, name: 'Bluetooth Speaker', price: 129, category: 'electronics' },
  { id: 5, name: 'Leather Wallet', price: 179, category: 'clothing' },
  { id: 6, name: 'Sneakers', price: 149, category: 'clothing' },
  { id: 7, name: 'Jacket', price: 1099, category: 'clothing' },
  { id: 8, name: 'T-Shirt', price: 499, category: 'clothing' },
  { id: 9, name: 'Cotton Scarf', price: 349, category: 'accessories' },
  { id: 10, name: 'Sunglasses', price: 599, category: 'accessories' },
  { id: 11, name: 'Air Fryer', price: 1599, category: 'home_appliances' }
];

const OrderProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [formData, setFormData] = useState({
    name: '',
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

    if (!formData.name.trim() || !formData.address.trim() || !formData.mobile.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const currentMonth = new Date().getMonth() + 1;

    // 🎲 Controlled random risk generation
    const diceRoll = Math.random();

    let deliveryDistance;
    let customerReturnRate;

    if (diceRoll < 0.3) {
      // Low risk
      deliveryDistance = Math.floor(Math.random() * 10) + 1;  // 1–10 km
      customerReturnRate = parseFloat((Math.random() * 0.2).toFixed(2)); // 0–0.2
    } else if (diceRoll < 0.7) {
      // Medium risk
      deliveryDistance = Math.floor(Math.random() * 40) + 20;  // 20–60 km
      customerReturnRate = parseFloat((Math.random() * 0.4 + 0.2).toFixed(2)); // 0.2–0.6
    } else {
      // High risk
      deliveryDistance = Math.floor(Math.random() * 60) + 60;  // 60–120 km
      customerReturnRate = parseFloat((Math.random() * 0.3 + 0.7).toFixed(2)); // 0.7–1.0
    }

    const order = {
      id: Date.now(),
      productType: product.category,
      price: product?.price,
      deliveryDistance,
      customerReturnRate,
      month: currentMonth,
      address: formData.address,
      mobile: formData.mobile,
      customer: formData.name,
      orderDate: new Date().toISOString(),
      status: 'ordered'
    };

    console.log("🛒 New Order Saved:", order);

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
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>

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
