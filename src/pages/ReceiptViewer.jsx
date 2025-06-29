import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Unlock, CheckCircle, ShoppingCart, Calendar, Clock, User } from 'lucide-react';
import Notification from '../components/Notification';

const ReceiptViewer = () => {
  const navigate = useNavigate();
  const { receiptId } = useParams();
  const [lidOpened, setLidOpened] = useState(false);
  const [checked, setChecked] = useState(false);
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  // Mock receipt data
  const receipt = {
    id: receiptId,
    customer: 'Sarah Johnson',
    cartNumber: 'CART-001',
    date: '2024-01-15',
    time: '14:30:25',
    items: [
      { name: 'Organic Milk 1L', price: 4.99, quantity: 2 },
      { name: 'Whole Wheat Bread', price: 3.49, quantity: 1 },
      { name: 'Free Range Eggs (12)', price: 6.99, quantity: 1 },
      { name: 'Greek Yogurt 500g', price: 5.99, quantity: 3 },
      { name: 'Bananas (1kg)', price: 2.99, quantity: 1 }
    ],
    subtotal: 34.43,
    tax: 3.44,
    total: 37.87
  };

  const handleOpenLid = () => {
    setLidOpened(true);
    showNotification('Cart lid opened successfully!');
  };

  const handleMarkChecked = () => {
    setChecked(true);
    showNotification('Receipt marked as checked successfully!');
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
                onClick={() => navigate('/checkout')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Receipt Details</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Receipt Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Receipt #{receipt.id}</h2>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  checked ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {checked ? 'Checked' : 'Pending'}
                </span>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                  <User className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-600 font-medium">Customer</p>
                    <p className="text-blue-800 font-semibold">{receipt.customer}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                  <ShoppingCart className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-600 font-medium">Cart Number</p>
                    <p className="text-purple-800 font-semibold">{receipt.cartNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                  <Calendar className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm text-green-600 font-medium">Date</p>
                    <p className="text-green-800 font-semibold">{receipt.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-orange-50 rounded-xl">
                  <Clock className="h-6 w-6 text-orange-600" />
                  <div>
                    <p className="text-sm text-orange-600 font-medium">Time</p>
                    <p className="text-orange-800 font-semibold">{receipt.time}</p>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Items Purchased</h3>
                <div className="space-y-3">
                  {receipt.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>${receipt.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax:</span>
                    <span>${receipt.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-200 pt-2">
                    <span>Total:</span>
                    <span>${receipt.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Actions</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleOpenLid}
                  disabled={lidOpened}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    lidOpened
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                  }`}
                >
                  <Unlock className="h-5 w-5" />
                  <span>{lidOpened ? 'Lid Opened' : 'Open Cart Lid'}</span>
                </button>

                <button
                  onClick={handleMarkChecked}
                  disabled={checked}
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    checked
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  }`}
                >
                  <CheckCircle className="h-5 w-5" />
                  <span>{checked ? 'Marked as Checked' : 'Mark as Checked'}</span>
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Status</h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${lidOpened ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-sm ${lidOpened ? 'text-green-700' : 'text-gray-500'}`}>
                    Cart lid {lidOpened ? 'opened' : 'locked'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${checked ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className={`text-sm ${checked ? 'text-green-700' : 'text-gray-500'}`}>
                    Receipt {checked ? 'verified' : 'pending verification'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptViewer;