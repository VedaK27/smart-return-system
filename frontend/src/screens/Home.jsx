import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

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
  { id: 1, name: 'Wireless Headphones', price: 299, image: wirelessheadphones, rating: 4.8, reviews: 324 },
  { id: 2, name: 'Smartwatch', price: 199, image: smartwatch, rating: 4.6, reviews: 156 },
  { id: 3, name: 'Mixer Grinder', price: 899, image: mixergrinder, rating: 4.9, reviews: 89 },
  { id: 4, name: 'Bluetooth Speaker', price: 129, image: speaker, rating: 4.5, reviews: 267 },
  { id: 5, name: 'Leather Wallet', price: 179, image: leatherwallet, rating: 4.7, reviews: 142 },
  { id: 6, name: 'Sneakers', price: 149, image: sneakers, rating: 4.6, reviews: 198 },
  { id: 7, name: 'Jacket', price: 1099, image: jacket, rating: 4.5, reviews: 112 },
  { id: 8, name: 'T-Shirt', price: 499, image: tshirt, rating: 4.3, reviews: 204 },
  { id: 9, name: 'Cotton Scarf', price: 349, image: cottonscarf, rating: 4.2, reviews: 88 },
  { id: 10, name: 'Sunglasses', price: 599, image: sunglasses, rating: 4.6, reviews: 173 },
  { id: 11, name: 'Air Fryer', price: 1599, image: airfryer, rating: 4.8, reviews: 226 }
];

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="nav-left"></div>
        <div className="nav-center">
          <div className="logo">🛒 TechStore</div>
        </div>
        <div className="nav-right">
          <Link to="/orders" className="orders-btn">📦 Orders</Link>
        </div>
      </nav>

      <header className="hero">
        <h1 className="highlight-heading">
          <span>Discover Amazing Products</span>
        </h1>
        <p>Shop the best electronics, clothing, and accessories in one place.</p>
      </header>

      <section className="products-section">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {products.map(product => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>⭐ {product.rating} ({product.reviews} reviews)</p>
              <p className="price">₹{product.price}</p>
              <button className="details-btn">View Details</button>
            </Link>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 TechStore. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
