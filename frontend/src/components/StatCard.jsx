import React from 'react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => {
  const trendClass = trend > 0 ? 'positive' : 'negative';
  const trendSymbol = trend > 0 ? '↗' : '↘';
  
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <div className="stat-card-title">{title}</div>
        <div className={`stat-card-icon ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="stat-card-value">{value.toLocaleString()}</div>
      <div className={`stat-card-trend ${trendClass}`}>
        <span>{trendSymbol}</span>
        <span>{Math.abs(trend)}%</span>
      </div>
    </div>
  );
};

export default StatCard;