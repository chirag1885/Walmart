import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Users, BarChart3, Store, Leaf, Scan } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                SmartStore
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Future of Shopping
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionary store management system with smart cart technology, eco-friendly suggestions, 
            and seamless digital payments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Smart Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <Scan className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Smart Cart</h3>
              <p className="text-gray-600 leading-relaxed">
                Scan products to automatically open cart lid and add items. Enhanced confirmation system ensures accuracy.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <ShoppingCart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Product Locator</h3>
              <p className="text-gray-600 leading-relaxed">
                Find any product instantly with our interactive store map and turn-by-turn navigation.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Eco-Friendly</h3>
              <p className="text-gray-600 leading-relaxed">
                Get suggestions for products with lower carbon footprints. Shop sustainably with ease.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Customer Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time assistance with AI chatbot and live employee support for immediate help.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Analytics</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time insights for store managers. Track sales, inventory, and customer behavior.
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Store className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Store Management</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive inventory management, staff coordination, and operational efficiency tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Ready to Transform Your Shopping Experience?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of satisfied customers and store managers who have revolutionized their retail experience.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;