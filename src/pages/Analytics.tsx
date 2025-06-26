import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, Calendar, Download } from 'lucide-react';

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7d');

  const salesData = [
    { day: 'Mon', sales: 12500, orders: 89 },
    { day: 'Tue', sales: 15200, orders: 102 },
    { day: 'Wed', sales: 11800, orders: 76 },
    { day: 'Thu', sales: 18900, orders: 134 },
    { day: 'Fri', sales: 22100, orders: 156 },
    { day: 'Sat', sales: 25600, orders: 189 },
    { day: 'Sun', sales: 19400, orders: 142 }
  ];

  const topProducts = [
    { name: 'Organic Bananas', sales: 234, revenue: 1169.66, trend: 'up' },
    { name: 'Whole Milk', sales: 189, revenue: 659.61, trend: 'up' },
    { name: 'Artisan Bread', sales: 156, revenue: 934.44, trend: 'down' },
    { name: 'Greek Yogurt', sales: 134, revenue: 936.66, trend: 'up' },
    { name: 'Orange Juice', sales: 98, revenue: 440.02, trend: 'stable' }
  ];

  const customerMetrics = {
    totalCustomers: 1234,
    newCustomers: 89,
    returningCustomers: 1145,
    averageOrderValue: 67.89,
    customerSatisfaction: 4.8
  };

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/manager')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Analytics Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
                <option value="1y">Last Year</option>
              </select>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">$125,486</h3>
            <p className="text-gray-600">Total Revenue</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+8.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">1,888</h3>
            <p className="text-gray-600">Total Orders</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+15.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{customerMetrics.totalCustomers}</h3>
            <p className="text-gray-600">Total Customers</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600">+5.7%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">${customerMetrics.averageOrderValue}</h3>
            <p className="text-gray-600">Avg Order Value</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Sales Overview</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Revenue</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Orders</span>
                  </div>
                </div>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="space-y-4">
                {salesData.map((data, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
                    <div className="flex-1 flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${(data.sales / maxSales) * 100}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white">${data.sales.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-600">{data.orders} orders</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="space-y-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Top Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.sales} units sold</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">${product.revenue.toFixed(2)}</div>
                      <div className={`text-xs ${
                        product.trend === 'up' ? 'text-green-600' :
                        product.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {product.trend === 'up' ? '↗' : product.trend === 'down' ? '↘' : '→'} {product.trend}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Insights */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Insights</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">New Customers</span>
                  <span className="font-bold text-emerald-600">{customerMetrics.newCustomers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Returning Customers</span>
                  <span className="font-bold text-blue-600">{customerMetrics.returningCustomers}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Satisfaction Score</span>
                  <span className="font-bold text-yellow-600">{customerMetrics.customerSatisfaction}/5.0</span>
                </div>
                
                {/* Customer Distribution */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Customer Distribution</span>
                    <span>{((customerMetrics.returningCustomers / customerMetrics.totalCustomers) * 100).toFixed(1)}% returning</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-full"
                      style={{ width: `${(customerMetrics.returningCustomers / customerMetrics.totalCustomers) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-xl border border-emerald-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Growth Rate</h3>
            </div>
            <div className="text-3xl font-bold text-emerald-600 mb-2">+23.5%</div>
            <p className="text-gray-600">Month over month growth</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-xl border border-blue-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Conversion Rate</h3>
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">68.2%</div>
            <p className="text-gray-600">Visitors to customers</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-xl border border-purple-100">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-800">Peak Hours</h3>
            </div>
            <div className="text-3xl font-bold text-purple-600 mb-2">2-4 PM</div>
            <p className="text-gray-600">Highest traffic period</p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Performance Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">94.5%</div>
              <p className="text-gray-600">System Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1.2s</div>
              <p className="text-gray-600">Avg Response Time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">99.1%</div>
              <p className="text-gray-600">Payment Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">4.8/5</div>
              <p className="text-gray-600">User Experience Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;