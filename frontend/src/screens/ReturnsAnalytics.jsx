import React, { useState, useEffect } from 'react';
import { MapPin, RefreshCw, Wrench, Archive } from 'lucide-react';
import '../styles/App.css';

// Card Component
const Card = ({ title, children }) => (
  <div className="card">
    <div className="card-title">{title}</div>
    {children}
  </div>
);

// Loading Spinner
const LoadingSpinner = () => (
  <div className="loading-spinner">
    <div className="spinner"></div>
  </div>
);

// Action Badge Component
const ActionBadge = ({ action, reason }) => {
  const getActionConfig = (action) => {
    switch (action) {
      case 'Restock':
        return { icon: RefreshCw, color: '#10b981', bgColor: '#d1fae5' };
      case 'Repair':
        return { icon: Wrench, color: '#f59e0b', bgColor: '#fef3c7' };
      case 'Dispose':
        return { icon: Archive, color: '#ef4444', bgColor: '#fee2e2' };
      default:
        return { icon: RefreshCw, color: '#6b7280', bgColor: '#f3f4f6' };
    }
  };

  const config = getActionConfig(action);
  const Icon = config.icon;

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
    backgroundColor: config.bgColor,
    color: config.color,
    border: `1px solid ${config.color}20`
  };

  const textStyle = { fontWeight: '600', marginLeft: '4px' };
  const reasonStyle = { fontSize: '11px', opacity: '0.8', marginLeft: '6px' };

  return (
    <div style={badgeStyle}>
      <Icon size={12} />
      <span style={textStyle}>{action}</span>
      {reason && <span style={reasonStyle}>- {reason}</span>}
    </div>
  );
};

const ReturnsAnalytics = () => {
  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);

  const inferAction = (reason) => {
    if (reason.toLowerCase().includes('damage')) return 'Repair';
    if (reason.toLowerCase().includes('wrong') || reason.toLowerCase().includes('changed')) return 'Restock';
    if (reason.toLowerCase().includes('quality')) return 'Dispose';
    return 'Restock';
  };

  useEffect(() => {
  const returnReasons = [
    'Changed mind',
    'Damaged',
    'Late delivery',
    'No longer needed',
    'Quality not as expected',
    'Wrong Item'
  ];

  const getRandomReason = () =>
    returnReasons[Math.floor(Math.random() * returnReasons.length)];

  const fetchReturns = async () => {
    setLoading(true);
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const returnedOrders = orders.filter(order => order.status === 'returned');

    const result = await Promise.all(
      returnedOrders.map(async (order, idx) => {
        const reason = getRandomReason();

        try {
          const res = await fetch('http://127.0.0.1:8000/predict_route', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              return_reason: reason,
              delivery_distance: order.deliveryDistance
            })
          });

          const data = await res.json();

          return {
            id: `RET-${order.id}`,
            productId: order.productId || `PRD-${idx + 1}`,
            product: order.productType,
            distance: order.deliveryDistance,
            customerLocation: order.address,
            returnLocation: data.predicted_route || 'Unknown',
            recommendedAction: inferAction(reason),
            actionReason: reason
          };
        } catch (err) {
          console.error('🔴 Model2 API error:', err);
          return null;
        }
      })
    );

    setReturns(result.filter(Boolean));
    setLoading(false);
  };

  fetchReturns();
}, []);


  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Returns Analytics</h1>
      </div>

      <Card title="Return Destination Optimization">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="table-container">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Return ID</th>
                  <th>Product ID</th>
                  <th>Product</th>
                  <th>Customer Location</th>
                  <th>Distance (km)</th>
                  <th>Recommended Action</th>
                  <th>Optimal Return Location</th>
                </tr>
              </thead>
              <tbody>
                {returns.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.productId}</td>
                    <td>{item.product}</td>
                    <td>{item.customerLocation}</td>
                    <td>{item.distance} km</td>
                    <td>
                      <ActionBadge action={item.recommendedAction} reason={item.actionReason} />
                    </td>
                    <td>
                      <span className="return-location">
                        <MapPin size={14} style={{ marginRight: '4px', color: '#10b981' }} />
                        {item.returnLocation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReturnsAnalytics;
