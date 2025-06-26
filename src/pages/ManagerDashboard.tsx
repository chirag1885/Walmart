import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Package, Users, TrendingUp, AlertTriangle, DollarSign, ShoppingCart, Settings } from 'lucide-react';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Daily Revenue', value: '$12,486', change: '+8.2%', color: 'from-emerald-500 to-emerald-600', icon: DollarSign },
    { label: 'Total Orders', value: '347', change: '+12.5%', color: 'from-blue-500 to-blue-600', icon: ShoppingCart },
    { label: 'Active Customers', value: '1,234', change: '+5.3%', color: 'from-purple-500 to-purple-600', icon: Users },
    { label: 'Inventory Items', value: '2,847', change: '-2.1%', color: 'from-orange-500 to-orange-600', icon: Package },
  ];

  const recentOrders = [
    { id: '#1001', customer: 'Sarah Johnson', amount: '$89.50', status: 'Completed', time: '2 min ago' },
    { id: '#1002', customer: 'Mike Chen', amount: '$156.20', status: 'Processing', time: '5 min ago' },
    { id: '#1003', customer: 'Emma Davis', amount: '$73.80', status: 'Completed', time: '8 min ago' },
    { id: '#1004', customer: 'John Smith', amount: '$234.60', status: 'Pending', time: '12 min ago' },
  ];

  const lowStockItems = [
    { name: 'Organic Bananas', current: 5, minimum: 20, status: 'critical' },
    { name: 'Whole Milk', current: 12, minimum: 30, status: 'low' },
    { name: 'Bread Loaves', current: 8, minimum: 25, status: 'critical' },
    { name: 'Greek Yogurt', current: 15, minimum: 40, status: 'low' },
  ];

  const quickActions = [
    { icon: Package, label: 'Inventory', path: '/inventory', color: 'from-blue-500 to-blue-600' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics', color: 'from-purple-500 to-purple-600' },
    { icon: Users, label: 'Customers', path: '/customers', color: 'from-emerald-500 to-emerald-600' },
    { icon: Settings, label: 'Settings', path: '/settings', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">SmartStore</span>
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Manager Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <AlertTriangle className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                <Users className="h-4 w-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Store Management</h1>
          <p className="text-gray-600 text-lg">Monitor and manage your store operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Recent Orders</h3>
                <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-800">{order.id}</td>
                        <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                        <td className="py-3 px-4 font-semibold text-gray-800">{order.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">{order.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Low Stock Alerts */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Low Stock Alert</h3>
                  <p className="text-sm text-gray-600">Items need restocking</p>
                </div>
              </div>
              <div className="space-y-3">
                {lowStockItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.current} / {item.minimum} units</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/inventory')}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
              >
                Manage Inventory
              </button>
            </div>

            {/* Performance Summary */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 shadow-xl border border-emerald-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Today's Performance</h3>
                  <p className="text-sm text-gray-600">Store metrics</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sales Target</span>
                  <span className="font-semibold text-gray-800">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Satisfaction</span>
                  <span className="font-semibold text-emerald-600">9.2/10</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;