import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Scan, MapPin, Leaf, CreditCard, Receipt, User, Bell, Search, Grid, List, LogOut } from 'lucide-react';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [cartItems] = useState(3);
  const [notifications] = useState(2);
  const [viewMode, setViewMode] = useState('grid');

  const cartNumber = localStorage.getItem('cartNumber') || 'CART-001';

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('cartNumber');
    navigate('/login');
  };

  const recentPurchases = [
    { id: 1, name: 'Organic Bananas', price: '$4.99', date: '2 days ago', eco: true },
    { id: 2, name: 'Whole Grain Bread', price: '$3.49', date: '1 week ago', eco: true },
    { id: 3, name: 'Greek Yogurt', price: '$5.99', date: '1 week ago', eco: false },
  ];

  const quickActions = [
    { icon: Scan, label: 'Enhanced Scanner', path: '/enhanced-scanner', color: 'from-emerald-500 to-emerald-600' },
    { icon: ShoppingCart, label: 'View Cart', path: '/cart', color: 'from-blue-500 to-blue-600', badge: cartItems },
    { icon: MapPin, label: 'Store Map', path: '/store-map', color: 'from-purple-500 to-purple-600' },
    { icon: Leaf, label: 'Eco Products', path: '/catalog?filter=eco', color: 'from-green-500 to-green-600' },
    { icon: CreditCard, label: 'Payment', path: '/payment', color: 'from-indigo-500 to-indigo-600' },
    { icon: Receipt, label: 'Receipts', path: '/receipts', color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-800">SmartStore</span>
              </button>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600">Customer Portal</span>
              <span className="text-gray-400">|</span>
              <span className="text-sm text-emerald-600 font-medium">Cart: {cartNumber}</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-800 transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-full hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome back, Mahak!</h1>
          <p className="text-gray-600 text-lg">Ready for a smart shopping experience?</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => navigate(action.path)}
                className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800">{action.label}</span>
                {action.badge && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {action.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Products */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Featured Products</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate('/catalog')}
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    View All
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                    <div className="aspect-square bg-gradient-to-br from-emerald-100 to-blue-100 rounded-lg mb-3 flex items-center justify-center">
                      <ShoppingCart className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">Organic Product {item}</h4>
                    <p className="text-sm text-gray-600 mb-2">Fresh, locally sourced</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">$4.99</span>
                      <div className="flex items-center space-x-1">
                        <Leaf className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">Eco-friendly</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Search Products */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Products</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Organic', 'Dairy', 'Bakery', 'Frozen', 'Beverages'].map((category) => (
                  <button
                    key={category}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm hover:bg-emerald-200 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Current Cart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Current Cart</h3>
                <button
                  onClick={() => navigate('/cart')}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  View Cart
                </button>
              </div>
              <div className="space-y-3">
                {cartItems > 0 ? (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">3 items</span>
                      <span className="font-semibold text-gray-800">$24.47</span>
                    </div>
                    <button
                      onClick={() => navigate('/payment')}
                      className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
                    >
                      Proceed to Payment
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                )}
              </div>
            </div>

            {/* Recent Purchases */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Purchases</h3>
              <div className="space-y-3">
                {recentPurchases.map((purchase) => (
                  <div key={purchase.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-gray-800">{purchase.name}</h4>
                        {purchase.eco && <Leaf className="h-4 w-4 text-green-500" />}
                      </div>
                      <p className="text-sm text-gray-600">{purchase.date}</p>
                    </div>
                    <span className="font-semibold text-gray-800">{purchase.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eco Score */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Eco Score</h3>
                  <p className="text-sm text-gray-600">This month</p>
                </div>
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">85/100</div>
              <p className="text-sm text-gray-600">Great job! You're making eco-friendly choices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;