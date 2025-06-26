import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart, Leaf, Gift, CreditCard } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Organic Bananas',
      price: 4.99,
      quantity: 2,
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=200',
      carbonFootprint: 'Low',
      inStock: true
    },
    {
      id: 2,
      name: 'Whole Milk',
      price: 3.49,
      quantity: 1,
      image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=200',
      carbonFootprint: 'Medium',
      inStock: true
    },
    {
      id: 3,
      name: 'Artisan Bread',
      price: 5.99,
      quantity: 1,
      image: 'https://images.pexels.com/photos/209196/pexels-photo-209196.jpeg?auto=compress&cs=tinysrgb&w=200',
      carbonFootprint: 'Low',
      inStock: true
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discount: number;
    description: string;
  } | null>(null);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'eco10') {
      setAppliedPromo({ code: 'ECO10', discount: 10, description: '10% off eco-friendly products' });
    } else if (promoCode.toLowerCase() === 'welcome') {
      setAppliedPromo({ code: 'WELCOME', discount: 5, description: '$5 off your first order' });
    }
    setPromoCode('');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const discount = appliedPromo ? (appliedPromo.code === 'WELCOME' ? appliedPromo.discount : subtotal * (appliedPromo.discount / 100)) : 0;
  const total = subtotal + tax - discount;

  const ecoFriendlyItems = cartItems.filter(item => item.carbonFootprint === 'Low').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/customer')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Shopping Cart</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-gray-600" />
              <span className="text-gray-600">{cartItems.length} items</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Eco-Friendly Badge */}
              {ecoFriendlyItems > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <Leaf className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Great Choice!</p>
                      <p className="text-sm text-gray-600">
                        {ecoFriendlyItems} eco-friendly item{ecoFriendlyItems > 1 ? 's' : ''} in your cart
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xl font-bold text-emerald-600">${item.price}</span>
                            <div className="flex items-center space-x-1">
                              <Leaf className={`h-4 w-4 ${item.carbonFootprint === 'Low' ? 'text-green-500' : 'text-yellow-500'}`} />
                              <span className="text-xs text-gray-600">{item.carbonFootprint} Carbon</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        {/* <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-lg font-medium text-gray-800 w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div> */}
                        <span className="text-lg font-bold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <button
                onClick={() => navigate('/catalog')}
                className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
              >
                Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Promo Code */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Promo Code</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 text-sm py-2 border border-gray-300 w-0.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {appliedPromo && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Gift className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800 font-medium">{appliedPromo.code} applied!</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">{appliedPromo.description}</p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-800">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-800">${tax.toFixed(2)}</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedPromo.code})</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-emerald-600">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/payment')}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>Proceed to Payment</span>
              </button>

              {/* Eco Impact */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">Eco Impact</h3>
                    <p className="text-sm text-gray-600">Your green choices</p>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {Math.round((ecoFriendlyItems / cartItems.length) * 100)}% Eco-Friendly
                </div>
                <p className="text-sm text-gray-600">
                  You've saved approximately 2.5kg of CO2 with your eco-friendly choices!
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart */
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started with your shopping</p>
            <button
              onClick={() => navigate('/catalog')}
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;