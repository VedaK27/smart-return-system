import React, { useEffect, useState } from 'react';
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Package, TrendingDown, AlertTriangle, BarChart3 } from 'lucide-react';
import Card from '../components/Card';
import StatCard from '../components/StatCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(res => setTimeout(res, 500));
      setStats({
        totalOrders: 12847,
        totalReturns: 1923,
        predictedReturns: 486,
        returnRate: 14.97
      });

      setAnalytics({
        returnReasons: [
          { name: 'Defective Product', value: 35 },
          { name: 'Wrong Size/Color', value: 28 },
          { name: 'Not as Described', value: 18 },
          { name: 'Damaged in Transit', value: 12 },
          { name: 'Changed Mind', value: 7 }
        ],
        monthlyTrends: [
          { month: 'Jan', returns: 156, orders: 1200 },
          { month: 'Feb', returns: 189, orders: 1350 },
          { month: 'Mar', returns: 234, orders: 1450 },
          { month: 'Apr', returns: 198, orders: 1380 },
          { month: 'May', returns: 267, orders: 1520 },
          { month: 'Jun', returns: 289, orders: 1650 }
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
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">ReturnIQ</h1>
        <p className="page-description">
          Get comprehensive insights into your e-commerce return patterns with AI-powered predictions. 
          Monitor key metrics, identify trends, and make data-driven decisions to reduce return rates 
          and improve customer satisfaction across your entire product catalog.
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="stats-grid">
        <StatCard 
          title="Total Orders Processed" 
          value={stats.totalOrders} 
          icon={Package} 
          color="blue" 
          trend={8.2}
          description="Total orders placed this month with 8.2% increase from last month" 
        />
        <StatCard 
          title="Total Returns Recorded" 
          value={stats.totalReturns} 
          icon={TrendingDown} 
          color="red" 
          trend={-2.4}
          description="Returns processed with 2.4% decrease indicating improved quality control" 
        />
        <StatCard 
          title="AI Predicted Returns" 
          value={stats.predictedReturns} 
          icon={AlertTriangle} 
          color="yellow" 
          trend={5.1}
          description="High-risk orders identified by our machine learning algorithm" 
        />
        <StatCard 
          title="Overall Return Rate" 
          value={`${stats.returnRate}%`} 
          icon={BarChart3} 
          color="green" 
          trend={-1.3}
          description="Average return rate showing 1.3% improvement over last quarter" 
        />
      </div>

      {/* Detailed Analytics Charts */}
      <div className="charts-grid">
        <Card title="Monthly Order vs Return Trends Analysis">
          <p className="chart-description">
            Track the correlation between order volume and return rates over the past 6 months. 
            This visualization helps identify seasonal patterns and the effectiveness of quality improvements.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={analytics.monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="returns" stackId="1" stroke="#EF4444" fill="#FEE2E2" name="Returns" />
              <Area type="monotone" dataKey="orders" stackId="2" stroke="#3B82F6" fill="#DBEAFE" name="Orders" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Return Reasons Breakdown & Customer Insights">
          <p className="chart-description">
            Understanding why customers return products helps prioritize improvement efforts. 
            Product defects remain the leading cause, followed by sizing and description accuracy issues.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie 
                data={analytics.returnReasons} 
                cx="50%" 
                cy="50%" 
                labelLine={false} 
                outerRadius={100} 
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {analytics.returnReasons.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Return Risk Distribution Across Product Categories">
          <p className="chart-description">
            Our AI model categorizes orders by return probability. Most orders fall into low-risk categories, 
            but high-risk orders (61-100%) require immediate attention to prevent customer dissatisfaction.
          </p>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analytics.riskDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" name="Number of Orders" />
            </BarChart>
          </ResponsiveContainer>
          <div className="risk-insights">
            <h4>Key Insights:</h4>
            <ul>
              <li><strong>Low Risk (0-40%):</strong> 77 orders with minimal return probability</li>
              <li><strong>Medium Risk (41-55%):</strong> 28 orders requiring monitoring</li>
              <li><strong>High Risk (66-100%):</strong> 30 orders needing immediate intervention</li>
            </ul>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default Dashboard;