import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../styles/ProductDetail.css';

import airfryer from '../assets/images/airfryer.jpg';
import cottonscarf from '../assets/images/cottonscarf.jpg';
import jacket from '../assets/images/jacket.jpg';
import leatherwallet from '../assets/images/leatherwallet.jpg';
import mixergrinder from '../assets/images/mixergrinder.jpg';
import smartwatch from '../assets/images/smartwatch.jpg';
import sneakers from '../assets/images/sneakers.jpg';
import speaker from '../assets/images/speaker.jpg';
import sunglasses from '../assets/images/sunglasses.jpg';
import tshirt from '../assets/images/tshirt.jpg';
import wirelessheadphones from '../assets/images/wirelessheadphones.jpg';

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 299,
    image: wirelessheadphones,
    description: 'Premium wireless headphones with active noise cancellation and superior sound quality.',
    features: ['Active Noise Cancellation', '30-hour battery life', 'Bluetooth 5.0', 'Quick charge'],
    rating: 4.8,
    reviews: 324
  },
  {
    id: 2,
    name: 'Smartwatch',
    category: 'Electronics',
    price: 199,
    image: smartwatch,
    description: 'Advanced smartwatch with health monitoring and fitness tracking capabilities.',
    features: ['Heart rate monitor', 'GPS tracking', 'Water resistant', '7-day battery'],
    rating: 4.6,
    reviews: 156
  },
  {
    id: 3,
    name: 'Mixer Grinder',
    category: 'Home Appliance',
    price: 899,
    image: mixergrinder,
    description: 'Powerful mixer grinder for all your kitchen needs.',
    features: ['750W motor', '3 jars included', 'Overload protection', '2-year warranty'],
    rating: 4.9,
    reviews: 89
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 129,
    image: speaker,
    description: 'Portable Bluetooth speaker with rich bass and stereo sound.',
    features: ['Deep bass', '12-hour playback', 'Bluetooth 5.1', 'Water resistant'],
    rating: 4.5,
    reviews: 267
  },
  {
    id: 5,
    name: 'Leather Wallet',
    category: 'Accessories',
    price: 179,
    image: leatherwallet,
    description: 'Premium leather wallet with multiple card slots and compartments.',
    features: ['Genuine leather', 'RFID blocking', '8 card slots', 'Coin pocket'],
    rating: 4.7,
    reviews: 142
  },
  {
    id: 6,
    name: 'Sneakers',
    category: 'Clothing',
    price: 149,
    image: sneakers,
    description: 'Comfortable sneakers for everyday wear and light activities.',
    features: ['Cushioned sole', 'Breathable material', 'Durable construction', 'Lightweight'],
    rating: 4.6,
    reviews: 198
  },
  {
    id: 7,
    name: 'Jacket',
    category: 'Clothing',
    price: 1099,
    image: jacket,
    description: 'Stylish and warm jacket perfect for cold weather.',
    features: ['Water resistant', 'Insulated lining', 'Multiple pockets', 'Adjustable hood'],
    rating: 4.5,
    reviews: 112
  },
  {
    id: 8,
    name: 'T-Shirt',
    category: 'Clothing',
    price: 499,
    image: tshirt,
    description: 'Comfortable cotton t-shirt perfect for casual wear.',
    features: ['100% cotton', 'Machine washable', 'Available in multiple colors', 'Regular fit'],
    rating: 4.3,
    reviews: 204
  },
  {
    id: 9,
    name: 'Cotton Scarf',
    category: 'Accessories',
    price: 349,
    image: cottonscarf,
    description: 'Soft and comfortable cotton scarf for all seasons.',
    features: ['100% cotton', 'Lightweight', 'Machine washable', 'Multiple colors'],
    rating: 4.2,
    reviews: 88
  },
  {
    id: 10,
    name: 'Sunglasses',
    category: 'Accessories',
    price: 599,
    image: sunglasses,
    description: 'Stylish sunglasses with UV protection and polarized lenses.',
    features: ['UV400 protection', 'Polarized lenses', 'Lightweight frame', 'Case included'],
    rating: 4.6,
    reviews: 173
  },
  {
    id: 11,
    name: 'Air Fryer',
    category: 'Home Appliance',
    price: 1599,
    image: airfryer,
    description: 'Healthy cooking with little to no oil using advanced air circulation.',
    features: ['5L capacity', 'Digital controls', '8 preset modes', 'Easy to clean'],
    rating: 4.8,
    reviews: 226
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="not-found">
          <h2>Product not found</h2>
          <Link to="/" className="back-link">Return to Home</Link>
        </div>
      </div>
    );
  }

  const handleOrderNow = () => {
    navigate(`/order/${product.id}`);
  };

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">← Back to Home</Link>

      <div className="product-layout">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        <div className="product-info-section">
          <div className="product-meta">
            <span className="product-id">Product ID: {product.id}</span>
            <span className="product-category">{product.category}</span>
          </div>

          <h1 className="product-name">{product.name}</h1>

          <div className="product-rating">
            ⭐ <span>{product.rating}</span> <span className="reviews">({product.reviews} reviews)</span>
          </div>

          <div className="product-price">₹{product.price}</div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>

          <div className="product-features">
            <h3>Features</h3>
            <ul>
              {product.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>
          </div>

          <button onClick={handleOrderNow} className="order-now-btn">Order Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
