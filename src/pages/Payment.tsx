import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Smartphone, Shield, Check, Leaf } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [orderComplete, setOrderComplete] = useState(false);
  const [processing, setProcessing] = useState(false);

  const orderSummary = {
    items: [
      { name: 'Organic Bananas', quantity: 2, price: 4.99 },
      { name: 'Whole Milk', quantity: 1, price: 3.49 },
      { name: 'Artisan Bread', quantity: 1, price: 5.99 }
    ],
    subtotal: 14.47,
    tax: 1.16,
    discount: 1.45,
    total: 14.18
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setOrderComplete(true);
    }, 3000);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">Your order has been confirmed and will be ready for pickup in 15 minutes.</p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Order ID</span>
                <span className="font-bold text-gray-800">#SP-2024-001</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Paid</span>
                <span className="font-bold text-emerald-600">${orderSummary.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="h-5 w-5 text-green-500" />
                <span className="font-medium text-gray-800">Eco Impact</span>
              </div>
              <p className="text-sm text-gray-600">You saved 2.5kg CO2 with your eco-friendly choices!</p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => navigate('/customer')}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate('/receipts')}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                View Digital Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/cart')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Secure Payment</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600">SSL Secured</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-300 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <CreditCard className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Credit/Debit Card</span>
                </label>
                <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-emerald-300 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="mobile"
                    checked={paymentMethod === 'mobile'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <Smartphone className="h-5 w-5 text-gray-600" />
                  <span className="font-medium text-gray-800">Mobile Pay</span>
                </label>
              </div>
            </div>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Card Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Pay */}
            {paymentMethod === 'mobile' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Mobile Payment</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-2 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 transition-colors">
                      <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">📱</span>
                      </div>
                      <span className="font-medium text-gray-800">Apple Pay</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-300 transition-colors">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white text-xs font-bold">G</span>
                      </div>
                      <span className="font-medium text-gray-800">Google Pay</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Choose your preferred mobile payment method
                  </p>
                </div>
              </div>
            )}

            {/* Billing Address */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Billing Address</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
                  <input
                    type="text"
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="New York"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                    <input
                      type="text"
                      placeholder="10001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
              <div className="space-y-3">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-gray-600 ml-2">x{item.quantity}</span>
                    </div>
                    <span className="font-medium text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium text-gray-800">${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount (ECO10)</span>
                  <span>-${orderSummary.discount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-xl font-bold text-emerald-600">${orderSummary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Eco Impact */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-xl border border-green-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Eco Impact</h3>
                  <p className="text-sm text-gray-600">Your green contribution</p>
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">2.5kg CO2 Saved</div>
              <p className="text-sm text-gray-600">
                Thanks for choosing eco-friendly products! You're helping reduce carbon emissions.
              </p>
            </div>

            {/* Complete Payment */}
            <button
              onClick={handlePayment}
              disabled={processing}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 ${
                processing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700'
              }`}
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  <span>Complete Payment - ${orderSummary.total.toFixed(2)}</span>
                </>
              )}
            </button>

            {/* Security Notice */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <span className="text-sm font-medium text-blue-800">Secure Payment</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;