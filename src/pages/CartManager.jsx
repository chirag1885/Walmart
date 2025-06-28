import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Unlock, AlertTriangle, Search, Zap } from 'lucide-react';
import Notification from '../components/Notification';

const CartManager = () => {
  const navigate = useNavigate();
  const [cartNumber, setCartNumber] = useState('');
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const [carts] = useState([
    { number: 'CART-001', status: 'active', customer: 'Sarah Johnson', location: 'Aisle 1', battery: 85 },
    { number: 'CART-045', status: 'malfunction', customer: 'Mike Chen', location: 'Aisle 3', battery: 23 },
    { number: 'CART-023', status: 'active', customer: 'Emma Davis', location: 'Aisle 2', battery: 67 },
    { number: 'CART-067', status: 'charging', customer: null, location: 'Charging Station', battery: 45 },
    { number: 'CART-089', status: 'malfunction', customer: 'John Smith', location: 'Checkout', battery: 12 },
    { number: 'CART-012', status: 'active', customer: 'Lisa Brown', location: 'Aisle 5', battery: 92 }
  ]);

  const handleEmergencyUnlock = (e) => {
    e.preventDefault();
    if (cartNumber.trim()) {
      setEmergencyMode(true);
      showNotification('Initiating emergency unlock...');
      
      setTimeout(() => {
        showNotification(`Emergency unlock successful for ${cartNumber}`);
        setEmergencyMode(false);
        setCartNumber('');
      }, 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'malfunction': return 'bg-red-100 text-red-800';
      case 'charging': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = (battery) => {
    if (battery > 50) return 'text-green-600';
    if (battery > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Notification 
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/employee')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Cart Manager</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Controls */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-6">
              <div className="flex items-center space-x-2 mb-6">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-800">Emergency Controls</h2>
              </div>
              
              <form onSubmit={handleEmergencyUnlock} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cart Number</label>
                  <input
                    type="text"
                    value={cartNumber}
                    onChange={(e) => setCartNumber(e.target.value)}
                    placeholder="Enter cart number (e.g., CART-001)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={emergencyMode}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    emergencyMode
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  }`}
                >
                  <Unlock className="h-5 w-5" />
                  <span>{emergencyMode ? 'Unlocking...' : 'Emergency Unlock'}</span>
                </button>
              </form>
              
              <div className="mt-6 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-sm text-red-700">
                  <strong>Warning:</strong> Emergency unlock should only be used when a cart malfunctions and customer assistance is required.
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Cart Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Carts</span>
                  <span className="font-semibold text-gray-800">{carts.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Active</span>
                  <span className="font-semibold text-green-600">
                    {carts.filter(c => c.status === 'active').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Malfunctioning</span>
                  <span className="font-semibold text-red-600">
                    {carts.filter(c => c.status === 'malfunction').length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Charging</span>
                  <span className="font-semibold text-blue-600">
                    {carts.filter(c => c.status === 'charging').length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Cart List */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">All Carts</h2>
                <div className="flex items-center space-x-2">
                  <Search className="h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search carts..."
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                {carts.map((cart) => (
                  <div
                    key={cart.number}
                    className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <ShoppingCart className="h-6 w-6 text-purple-600" />
                        <div>
                          <h4 className="font-semibold text-gray-800">{cart.number}</h4>
                          <p className="text-sm text-gray-600">
                            {cart.customer ? `Customer: ${cart.customer}` : 'No customer assigned'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(cart.status)}`}>
                          {cart.status}
                        </span>
                        
                        <div className="flex items-center space-x-1">
                          <Zap className={`h-4 w-4 ${getBatteryColor(cart.battery)}`} />
                          <span className={`text-sm font-medium ${getBatteryColor(cart.battery)}`}>
                            {cart.battery}%
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Location: {cart.location}</p>
                      
                      {cart.status === 'malfunction' && (
                        <button
                          onClick={() => {
                            setCartNumber(cart.number);
                            showNotification(`Emergency unlock initiated for ${cart.number}`);
                            setTimeout(() => {
                              showNotification(`Emergency unlock successful for ${cart.number}`);
                            }, 2000);
                          }}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Emergency Unlock
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartManager;