const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockAPI = {
  fetchStats: async () => {
    await delay(800);
    return {
      totalOrders: 12847,
      totalReturns: 1923,
      predictedReturns: 486,
      returnRate: 14.97
    };
  },

  fetchOrders: async (page = 1, filter = 'all') => {
    await delay(600);
    const orders = [/* Same as your original mock data */];
    const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);
    return {
      orders: filtered.slice((page - 1) * 5, page * 5),
      totalPages: Math.ceil(filtered.length / 5),
      currentPage: page
    };
  },

  fetchAnalytics: async () => {
    await delay(700);
    return {
      returnReasons: [/* your pie chart reasons */],
      monthlyTrends: [/* area chart data */],
      riskDistribution: [/* bar chart data */]
    };
  }
};

export default mockAPI;
