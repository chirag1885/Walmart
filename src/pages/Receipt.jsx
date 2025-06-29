import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, CreditCard, ArrowLeft, Smartphone, Check} from 'lucide-react';
import QRCode from 'react-qr-code';

/**
 * @typedef {Object} ReceiptItem
 * @property {string} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} price
 * @property {number} total
 */

/**
 * @typedef {Object} ReceiptData
 * @property {string} id
 * @property {string} date
 * @property {string} time
 * @property {string} store
 * @property {ReceiptItem[]} items
 * @property {number} subtotal
 * @property {number} tax
 * @property {number} total
 * @property {string} paymentMethod
 * @property {string} transactionId
 */


const Receipts = () => {
  const navigate = useNavigate();
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sentToMobile, setSentToMobile] = useState(false);

  // Mock receipt data - directly set the receipt to display
  useEffect(() => {
    const mockReceipt = {
      id: 'RCP001',
      date: '2025-06-26', // Yesterday
      time: '14:30',
      store: 'SmartMart Supercenter - Main St',
      items: [
        { id: '1', name: 'Organic Bananas', quantity: 6, price: 0.68, total: 4.08 },
        { id: '2', name: 'Whole Milk 1 Gallon', quantity: 1, price: 3.48, total: 3.48 },
        { id: '3', name: 'Bread - Whole Wheat', quantity: 2, price: 2.98, total: 5.96 },
        { id: '4', name: 'Greek Yogurt 4-pack', quantity: 1, price: 4.97, total: 4.97 }
      ],
      subtotal: 18.49,
      tax: 1.11,
      total: 19.60,
      paymentMethod: 'Credit Card',
      transactionId: 'TXN789456123'
    };

    // Simulate loading time
    setTimeout(() => {
      setSelectedReceipt(mockReceipt);
      setIsLoading(false);
    }, 800);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const sendToMobile = () => {
    setSentToMobile(true);
    setTimeout(() => {
      setSentToMobile(false);
    }, 3000);
  };

  const goBackToDashboard = () => {
    navigate('/customer')
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-xl">Loading your receipt...</p>
        </div>
      </div>
    );
  }

  if (selectedReceipt) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={goBackToDashboard}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </button>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Receipt Header */}
            <div className="text-center border-b pb-6 mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-4">
                  <Receipt className="h-12 w-12 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Receipt #{selectedReceipt.id}</h1>
              <p className="text-gray-600 text-lg">{selectedReceipt.store}</p>
              <p className="text-sm text-gray-500 mt-2">
                {formatDate(selectedReceipt.date)} at {selectedReceipt.time}
              </p>
              
              {/* QR Code */}
              <div className="mt-6">
                <div className="bg-white p-3 inline-block rounded-lg border border-gray-200 shadow-sm">
                  <QRCode 
                    value={`${selectedReceipt.id}-${selectedReceipt.transactionId}-${selectedReceipt.total}`}
                    size={140}
                    level="H"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">Scan to verify receipt authenticity</p>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Items Purchased</h3>
              <div className="space-y-3">
                {selectedReceipt.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <p className="font-semibold text-gray-900 text-lg">${item.total.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span className="text-lg">Subtotal:</span>
                <span className="font-medium text-lg">${selectedReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="text-lg">Tax:</span>
                <span className="font-medium text-lg">${selectedReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-bold text-blue-600 border-t pt-4">
                <span>Total:</span>
                <span>${selectedReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className="mt-8 pt-6 border-t bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-gray-600 font-medium">Payment Method:</span>
                </div>
                <span className="font-semibold text-gray-800">{selectedReceipt.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 font-medium">Transaction ID:</span>
                <span className="font-mono text-sm text-gray-800">{selectedReceipt.transactionId}</span>
              </div>
            </div>

            {/* Send to Mobile Button */}
            <div className="mt-8 text-center">
              {sentToMobile ? (
                <div className="inline-flex items-center px-8 py-4 bg-green-100 text-green-800 font-semibold rounded-xl border border-green-200">
                  <Check className="h-5 w-5 mr-2" />
                  Receipt sent to your mobile number!
                </div>
              ) : (
                <button
                  onClick={sendToMobile}
                  className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Send to Mobile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Receipts;