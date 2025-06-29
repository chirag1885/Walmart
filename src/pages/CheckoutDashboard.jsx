import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, QrCode, Search, Unlock, CheckCircle, Camera, AlertCircle } from 'lucide-react';
import Notification from '../components/Notification';

const CheckoutDashboard = () => {
  const navigate = useNavigate();
  const [scanMode, setScanMode] = useState('qr');
  const [receiptId, setReceiptId] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [notification, setNotification] = useState({ message: '', isVisible: false });

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const handleScan = () => {
    setIsScanning(true);
    showNotification('Starting QR scan...');
    
    setTimeout(() => {
      const mockReceiptId = 'RCP-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setReceiptId(mockReceiptId);
      setIsScanning(false);
      showNotification('QR code scanned successfully!');
      
      setTimeout(() => {
        navigate(`/receipt/${mockReceiptId}`);
      }, 1000);
    }, 2000);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (receiptId.trim()) {
      showNotification('Opening receipt...');
      setTimeout(() => {
        navigate(`/receipt/${receiptId}`);
      }, 500);
    }
  };

  const handleReceiptClick = (receipt) => {
    showNotification(`Opening receipt ${receipt.id}...`);
    setTimeout(() => navigate(`/receipt/${receipt.id}`), 500);
  };

  const handleModeChange = (mode) => {
    setScanMode(mode);
    const modeMessages = {
      qr: 'QR Scanner mode activated',
      manual: 'Manual entry mode activated'
    };
    showNotification(modeMessages[mode]);
  };

  const recentReceipts = [
    { id: 'RCP-ABC123', customer: 'Sarah Johnson', cart: 'CART-001', time: '2 minutes ago', status: 'pending' },
    { id: 'RCP-DEF456', customer: 'Mike Chen', cart: 'CART-045', time: '5 minutes ago', status: 'checked' },
    { id: 'RCP-GHI789', customer: 'Emma Davis', cart: 'CART-023', time: '8 minutes ago', status: 'checked' },
    { id: 'RCP-JKL012', customer: 'John Smith', cart: 'CART-067', time: '12 minutes ago', status: 'pending' }
  ];

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
              <h1 className="text-xl font-bold text-gray-800">Checkout Dashboard</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mode Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Receipt Scanner</h2>
          
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleModeChange('qr')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                scanMode === 'qr'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <QrCode className="h-5 w-5" />
              <span>QR Scanner</span>
            </button>
            <button
              onClick={() => handleModeChange('manual')}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                scanMode === 'manual'
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Search className="h-5 w-5" />
              <span>Manual Entry</span>
            </button>
          </div>

          {scanMode === 'qr' ? (
            <div className="text-center">
              <div className="bg-gray-100 rounded-2xl p-12 mb-6 border-2 border-dashed border-gray-300">
                {isScanning ? (
                  <div className="animate-pulse">
                    <Camera className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700">Scanning QR Code...</p>
                    <div className="mt-4 flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Position QR code in the frame</p>
                    <p className="text-gray-500">The camera will automatically detect and scan the receipt QR code</p>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleScan}
                disabled={isScanning}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isScanning ? 'Scanning...' : 'Start QR Scan'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Receipt ID</label>
                <input
                  type="text"
                  value={receiptId}
                  onChange={(e) => setReceiptId(e.target.value)}
                  placeholder="Enter receipt ID (e.g., RCP-ABC123)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
              >
                Open Receipt
              </button>
            </form>
          )}
        </div>

        {/* Recent Receipts */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Receipts</h3>
          
          <div className="space-y-4">
            {recentReceipts.map((receipt) => (
              <div
                key={receipt.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleReceiptClick(receipt)}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    receipt.status === 'checked' ? 'bg-green-100' : 'bg-orange-100'
                  }`}>
                    {receipt.status === 'checked' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{receipt.id}</p>
                    <p className="text-sm text-gray-600">{receipt.customer} • {receipt.cart}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-500">{receipt.time}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    receipt.status === 'checked' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-orange-100 text-orange-800'
                  }`}>
                    {receipt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDashboard;