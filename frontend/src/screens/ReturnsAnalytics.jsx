import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import '../styles/App.css' ;
const ReturnsAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    const fetchAnalytics = async () => {
      await new Promise(res => setTimeout(res, 500));
      setAnalytics({
        returnReasons: [
          { name: 'Defective Product', value: 35 },
          { name: 'Wrong Size/Color', value: 28 },
          { name: 'Not as Described', value: 18 },
          { name: 'Damaged in Transit', value: 12 },
          { name: 'Changed Mind', value: 7 }
        ],
        riskDistribution: [
          { range: '0-20%', count: 45 },
          { range: '21-40%', count: 32 },
          { range: '41-60%', count: 28 },
          { range: '61-80%', count: 18 },
          { range: '81-100%', count: 12 }
        ]
      });
      setLoading(false);
    };
    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-container">
      <h2 className="page-title">Returns Analytics</h2>

      <div className="charts-grid">
        <Card title="Return Reasons">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={analytics.returnReasons} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {analytics.returnReasons.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Risk Distribution">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default ReturnsAnalytics;